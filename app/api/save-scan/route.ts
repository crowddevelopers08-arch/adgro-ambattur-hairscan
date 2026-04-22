import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { syncLeadToTelecrm } from "@/lib/telecrm"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, location, problem, imageData, sourceUrl } = await req.json()

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

    const [telecrmSync, scan] = await Promise.all([
      syncLeadToTelecrm({
        name,
        phone: normalizedPhone,
        email: typeof email === "string" ? email.trim() : "",
        location,
        problem,
        formName,
        sourceUrl: normalizedSourceUrl,
      }),
      prisma.scan
        .create({
          data: {
            name,
            phone: normalizedPhone,
            email: typeof email === "string" ? email.trim() : "",
            location: location ?? "",
            problem,
            imageData,
            formName,
            sourceUrl: normalizedSourceUrl,
          },
        })
        .catch((error) => {
          databaseError = error instanceof Error ? error.message : "Database save failed."
          console.error("Failed to save scan in database:", error)
          return null
        }),
    ])

    const database = {
      status: scan ? "saved" : "error",
      id: scan?.id ?? null,
      error: scan ? "" : databaseError,
    }
    const telecrmStatus = telecrmSync.status.toLowerCase()
    const telecrmSubmitted = telecrmStatus !== "error" && telecrmStatus !== "skipped"

    const databaseSaved = Boolean(scan)

    if (scan) {
      await prisma.scan
        .update({
          where: { id: scan.id },
          data: {
            telecrmStatus: telecrmSync.status,
            telecrmLeadIds: telecrmSync.leadIds.join(", "),
            telecrmError: telecrmSync.error,
          },
        })
        .catch((error) => {
          console.error("Failed to update TeleCRM status in database:", error)
        })
    }

    if (!databaseSaved || !telecrmSubmitted) {
      return NextResponse.json(
        {
          success: false,
          partial: databaseSaved || telecrmSubmitted,
          error:
            databaseSaved && !telecrmSubmitted
              ? "Lead saved in database, but TeleCRM sync failed."
              : !databaseSaved && telecrmSubmitted
                ? "Lead sent to TeleCRM, but database save failed."
                : "Failed to save lead in database and TeleCRM.",
          telecrm: telecrmSync,
          database,
        },
        { status: databaseSaved || telecrmSubmitted ? 207 : 500 },
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
