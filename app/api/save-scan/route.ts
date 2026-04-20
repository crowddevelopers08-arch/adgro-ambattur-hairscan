import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { name, phone, location, problem, imageData } = await req.json()

    if (!name || !phone || !problem || !imageData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const normalizedPhone = String(phone).trim()

    const existing = await prisma.scan.findFirst({
      where: { phone: normalizedPhone },
      select: { id: true },
    })

    if (existing) {
      return NextResponse.json(
        { error: "This mobile number has already been used to submit a lead." },
        { status: 409 },
      )
    }

    const scan = await prisma.scan.create({
      data: { name, phone: normalizedPhone, location: location ?? "", problem, imageData },
    })

    return NextResponse.json({ success: true, id: scan.id })
  } catch (error) {
    console.error("Failed to save scan:", error)
    const message =
      error instanceof Error && process.env.NODE_ENV !== "production"
        ? `Failed to save scan: ${error.message}`
        : "Failed to save scan"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
