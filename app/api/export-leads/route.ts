import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const problemLabels: Record<string, string> = {
  "hair-fall": "Hair Fall",
  "crown-thinning": "Crown Thinning",
  "frontal-hair-loss": "Frontal Hair Loss",
  "dandruff-scalp-issues": "Dandruff / Scalp Issues",
  "low-hair-density": "Low Hair Density",
  acne: "Acne",
  pigmentation: "Pigmentation",
  dullness: "Dullness",
  tanning: "Tanning",
  "uneven-skin-tone": "Uneven Skin Tone",
  "open-pores": "Open Pores",
}

const hairProblems = [
  "hair-fall",
  "crown-thinning",
  "frontal-hair-loss",
  "dandruff-scalp-issues",
  "low-hair-density",
]

const skinProblems = [
  "acne",
  "pigmentation",
  "dullness",
  "tanning",
  "uneven-skin-tone",
  "open-pores",
]

function matchesDateFilter(scanDate: Date, dateFrom: string, dateTo: string) {
  const scanDay = new Date(scanDate)
  scanDay.setHours(0, 0, 0, 0)

  if (dateFrom) {
    const from = new Date(dateFrom)
    from.setHours(0, 0, 0, 0)
    if (scanDay < from) return false
  }

  if (dateTo) {
    const to = new Date(dateTo)
    to.setHours(23, 59, 59, 999)
    if (scanDay > to) return false
  }

  return true
}

function getLeadType(problem: string) {
  if (hairProblems.includes(problem)) return "Hair"
  if (skinProblems.includes(problem)) return "Skin"
  return "Other"
}

function csvCell(value: unknown) {
  const text = value == null ? "" : String(value)
  return `"${text.replace(/"/g, '""')}"`
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get("q")?.trim().toLowerCase() ?? ""
  const selectedProblem = searchParams.get("problem") ?? ""
  const selectedDateFrom = searchParams.get("dateFrom") ?? ""
  const selectedDateTo = searchParams.get("dateTo") ?? ""

  const scans = await prisma.scan.findMany({
    orderBy: { createdAt: "desc" },
  })

  const filteredScans = scans.filter((scan) => {
    const matchesQuery =
      !query ||
      scan.name.toLowerCase().includes(query) ||
      scan.phone.toLowerCase().includes(query)

    const matchesProblem = !selectedProblem || scan.problem === selectedProblem
    const matchesDate = matchesDateFilter(scan.createdAt, selectedDateFrom, selectedDateTo)

    return matchesQuery && matchesProblem && matchesDate
  })

  const headers = [
    "ID",
    "Name",
    "Phone",
    "Location",
    "Concern",
    "Lead Type",
    "Form Name",
    "Source URL",
    "TeleCRM Status",
    "TeleCRM Lead IDs",
    "TeleCRM Error",
    "Created At",
  ]

  const rows = filteredScans.map((scan) => [
    scan.id,
    scan.name,
    scan.phone,
    scan.location,
    problemLabels[scan.problem] ?? scan.problem,
    getLeadType(scan.problem),
    scan.formName || "website leads",
    scan.sourceUrl,
    scan.telecrmStatus,
    scan.telecrmLeadIds,
    scan.telecrmError,
    scan.createdAt.toLocaleString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  ])

  const csv = [
    headers.map(csvCell).join(","),
    ...rows.map((row) => row.map(csvCell).join(",")),
  ].join("\r\n")

  const today = new Date().toISOString().slice(0, 10)
  const filename = `leads-${today}.xls`

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "application/vnd.ms-excel; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  })
}
