import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { syncLeadToTelecrm } from "@/lib/telecrm"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { name, phone, location, problem, imageData, sourceUrl } = await req.json()

    if (!name || !phone || !problem || !imageData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const normalizedPhone = String(phone).trim()
    const formName = "website leads"
    const normalizedSourceUrl = typeof sourceUrl === "string" ? sourceUrl.trim() : ""

    let databaseError = ""

    const existing = await prisma.scan
      .findFirst({
        where: { phone: normalizedPhone },
        select: { id: true },
      })
      .catch((error) => {
        databaseError = error instanceof Error ? error.message : "Database duplicate check failed."
        console.error("Failed to check existing scan:", error)
        return null
      })

    if (existing) {
      return NextResponse.json(
        { error: "This mobile number has already been used to submit a lead." },
        { status: 409 },
      )
    }

    const telecrmSync = await syncLeadToTelecrm({
      name,
      phone: normalizedPhone,
      location,
      problem,
      formName,
      sourceUrl: normalizedSourceUrl,
    })

    const scan = await prisma.scan
      .create({
        data: {
          name,
          phone: normalizedPhone,
          location: location ?? "",
          problem,
          imageData,
          formName,
          sourceUrl: normalizedSourceUrl,
          telecrmStatus: telecrmSync.status,
          telecrmLeadIds: telecrmSync.leadIds.join(", "),
          telecrmError: telecrmSync.error,
        },
      })
      .catch((error) => {
        databaseError = error instanceof Error ? error.message : "Database save failed."
        console.error("Failed to save scan in database:", error)
        return null
      })

    const database = {
      status: scan ? "saved" : "error",
      id: scan?.id ?? null,
      error: scan ? "" : databaseError,
    }
    const telecrmStatus = telecrmSync.status.toLowerCase()
    const telecrmSubmitted = telecrmStatus !== "error" && telecrmStatus !== "skipped"

    if (!scan && !telecrmSubmitted) {
      return NextResponse.json(
        {
          error: "Failed to submit lead to TeleCRM and database.",
          telecrm: telecrmSync,
          database,
        },
        { status: 500 },
      )
    }

    return NextResponse.json({ success: true, id: scan?.id ?? null, telecrm: telecrmSync, database })
  } catch (error) {
    console.error("Failed to save scan:", error)
    const message =
      error instanceof Error && process.env.NODE_ENV !== "production"
        ? `Failed to save scan: ${error.message}`
        : "Failed to save scan"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
