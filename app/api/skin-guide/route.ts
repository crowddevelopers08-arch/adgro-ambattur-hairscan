import { NextRequest, NextResponse } from "next/server"
import PDFDocument from "pdfkit"

export const runtime = "nodejs"

type SkinGuide = {
  title: string
  summary: string[]
  guidance: string[]
}

const guides: Record<string, SkinGuide> = {
  acne: {
    title: "Acne Skin Report",
    summary: [
      "Visible signs suggest acne-related skin concerns that may be linked to oil imbalance, clogged pores, lifestyle, or irritation.",
      "Understanding the root concern helps avoid random products and improves treatment decisions.",
    ],
    guidance: ["Doctor-guided skincare routine", "Deep cleansing support", "Chemical Peel guidance", "Acne management options"],
  },
  pigmentation: {
    title: "Pigmentation Skin Report",
    summary: [
      "Visible uneven pigment may be related to sun exposure, post-acne marks, hormonal changes, or skin sensitivity.",
      "A proper skin assessment helps match the right care instead of trial-and-error product use.",
    ],
    guidance: ["Sun protection guidance", "Pigmentation care plan", "Chemical Peel support", "Laser-based treatment direction"],
  },
  dullness: {
    title: "Dullness Skin Report",
    summary: [
      "Dullness can be influenced by dehydration, dead skin buildup, stress, or inconsistent skincare habits.",
      "With the right guidance, skin clarity and glow can often improve with a structured routine.",
    ],
    guidance: ["Glow care support", "Hydra Facial guidance", "Doctor-guided home care", "Lifestyle correction tips"],
  },
  tanning: {
    title: "Tanning Skin Report",
    summary: [
      "Visible tanning may be connected to frequent sun exposure and uneven melanin response.",
      "Guided care can help support tone recovery while protecting the skin barrier.",
    ],
    guidance: ["Sun care essentials", "Brightening support", "Hydra Facial guidance", "Professional treatment direction"],
  },
  "uneven-skin-tone": {
    title: "Uneven Skin Tone Report",
    summary: [
      "Uneven tone may be related to tanning, pigmentation, post-acne marks, or skin sensitivity.",
      "Scientific guidance helps identify whether routine care or professional support is more suitable.",
    ],
    guidance: ["Tone-correction guidance", "Routine improvement tips", "Pigmentation support", "Doctor-guided treatment direction"],
  },
  "open-pores": {
    title: "Open Pores Skin Report",
    summary: [
      "Visible pores may be influenced by excess oil, texture changes, or congestion.",
      "Right-care planning can help improve skin texture without over-treating the skin.",
    ],
    guidance: ["Oil-control support", "Texture care guidance", "Deep cleansing direction", "Doctor-guided skincare routine"],
  },
}

function writeBulletList(doc: PDFKit.PDFDocument, items: string[]) {
  items.forEach((item) => {
    doc.text(`- ${item}`, { indent: 12 })
    doc.moveDown(0.5)
  })
}

export async function GET(request: NextRequest) {
  const problem = request.nextUrl.searchParams.get("problem") || "acne"
  const name = request.nextUrl.searchParams.get("name") || "Guest"
  const guide = guides[problem]

  if (!guide) {
    return NextResponse.json({ error: "Invalid problem type" }, { status: 400 })
  }

  const chunks: Buffer[] = []
  const doc = new PDFDocument({ margin: 48, size: "A4" })

  doc.on("data", (chunk) => chunks.push(chunk))

  const bufferPromise = new Promise<Buffer>((resolve, reject) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)))
    doc.on("error", reject)
  })

  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#080b12")
  doc.fillColor("#ddb95a").fontSize(22).font("Helvetica-Bold").text("BONITAA HQ")
  doc.moveDown(0.3)
  doc.fillColor("#f2f0eb").fontSize(18).text(guide.title)
  doc.moveDown(0.5)
  doc.fillColor("#bdb8ae").fontSize(11).font("Helvetica").text(`Prepared for: ${name}`)
  doc.text(`Concern detected: ${problem.replace(/-/g, " ")}`)

  doc.moveDown(1.2)
  doc.fillColor("#ddb95a").fontSize(14).font("Helvetica-Bold").text("Summary")
  doc.moveDown(0.4)
  doc.fillColor("#bdb8ae").fontSize(11).font("Helvetica")
  writeBulletList(doc, guide.summary)

  doc.moveDown(0.6)
  doc.fillColor("#ddb95a").fontSize(14).font("Helvetica-Bold").text("Suggested Direction")
  doc.moveDown(0.4)
  doc.fillColor("#bdb8ae").fontSize(11).font("Helvetica")
  writeBulletList(doc, guide.guidance)

  doc.moveDown(0.6)
  doc.fillColor("#ddb95a").fontSize(14).font("Helvetica-Bold").text("Why Bonitaa HQ")
  doc.moveDown(0.4)
  doc.fillColor("#bdb8ae").fontSize(11).font("Helvetica")
  writeBulletList(doc, [
    "97% success rate",
    "5+ years of experience",
    "2,000+ happy patients",
    "10+ certified doctors",
    "Adgro Hair Ambattur, Ambattur, Thiruvallur",
    "Address: Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053",
    "Email: customercare@adgrohairambattur.in",
    "Contact: +91 7409256789",
  ])

  doc.moveDown(0.8)
  doc.fillColor("#8a8a8a").fontSize(10).text(
    "This guide is informational and supports your next-step understanding. Final treatment decisions should be based on doctor guidance."
  )

  doc.end()
  const pdfBuffer = await bufferPromise

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${guide.title.replace(/\s+/g, "_")}.pdf"`,
    },
  })
}
