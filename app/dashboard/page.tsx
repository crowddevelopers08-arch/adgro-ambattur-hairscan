import { prisma } from "@/lib/prisma"
import { DateRangePicker } from "@/components/ui/date-range-picker"
import { Download } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0

const problemLabels: Record<string, string> = {
  "hair-fall": "Hair Fall",
  "crown-thinning": "Crown Thinning",
  "frontal-hair-loss": "Frontal Hair Loss",
  "dandruff-scalp-issues": "Dandruff / Scalp Issues",
  "low-hair-density": "Low Hair Density",
  "acne": "Acne",
  "pigmentation": "Pigmentation",
  "dullness": "Dullness",
  "tanning": "Tanning",
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

const telecrmStatusLabels: Record<string, string> = {
  Created: "Created in TeleCRM",
  Updated: "Updated in TeleCRM",
  synced: "Synced to TeleCRM",
  skipped: "TeleCRM skipped",
  error: "TeleCRM error",
  not_synced: "Not synced",
}

type DashboardSearchParams = Promise<{
  q?: string
  problem?: string
  dateFrom?: string
  dateTo?: string
}>

function isHairProblem(problem: string): boolean {
  return hairProblems.includes(problem)
}

function isSkinProblem(problem: string): boolean {
  return skinProblems.includes(problem)
}

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

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: DashboardSearchParams
}) {
  const resolvedSearchParams = (await searchParams) ?? {}
  const query = resolvedSearchParams.q?.trim().toLowerCase() ?? ""
  const selectedProblem = resolvedSearchParams.problem ?? ""
  const selectedDateFrom = resolvedSearchParams.dateFrom ?? ""
  const selectedDateTo = resolvedSearchParams.dateTo ?? ""
  const exportParams = new URLSearchParams()

  if (resolvedSearchParams.q) exportParams.set("q", resolvedSearchParams.q)
  if (selectedProblem) exportParams.set("problem", selectedProblem)
  if (selectedDateFrom) exportParams.set("dateFrom", selectedDateFrom)
  if (selectedDateTo) exportParams.set("dateTo", selectedDateTo)

  const exportHref = `/api/export-leads${exportParams.toString() ? `?${exportParams.toString()}` : ""}`

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

  const hairScans = filteredScans.filter((scan) => isHairProblem(scan.problem))
  const skinScans = filteredScans.filter((scan) => isSkinProblem(scan.problem))
  const syncedScans = filteredScans.filter((scan) => ["created", "updated", "synced"].includes(scan.telecrmStatus.toLowerCase()))
  const telecrmErrorScans = filteredScans.filter((scan) => scan.telecrmStatus.toLowerCase() === "error")

  const renderScanGrid = (scans: typeof hairScans, title: string) => (
    <section className="rounded-3xl border border-border bg-card/60 p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {scans.length} {scans.length === 1 ? "record" : "records"}
          </p>
        </div>
      </div>

      {scans.length === 0 ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-border bg-background/70 text-center text-sm text-muted-foreground">
          No {title.toLowerCase()} match the current filters.
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {scans.map((scan) => (
            <article
              key={scan.id}
              className="overflow-hidden rounded-2xl border border-border bg-background"
            >
              <div className="relative h-52 w-full bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={scan.imageData}
                  alt={`Scan of ${scan.name}`}
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  {problemLabels[scan.problem] ?? scan.problem}
                </span>
              </div>

              <div className="space-y-2 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">{scan.name}</p>
                  <p className="text-xs text-muted-foreground">#{scan.id}</p>
                </div>
                <p className="text-sm text-muted-foreground">{scan.phone}</p>
                {scan.location && (
                  <p className="text-sm text-muted-foreground">{scan.location}</p>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
                    Form: {scan.formName || "website leads"}
                  </span>
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-medium",
                      scan.telecrmStatus.toLowerCase() === "error"
                        ? "border-red-200 bg-red-50 text-red-700"
                        : "border-emerald-200 bg-emerald-50 text-emerald-700",
                    ].join(" ")}
                  >
                    {telecrmStatusLabels[scan.telecrmStatus] ?? scan.telecrmStatus}
                  </span>
                </div>
                {scan.sourceUrl && (
                  <a
                    href={scan.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {scan.sourceUrl}
                  </a>
                )}
                {scan.telecrmLeadIds && (
                  <p className="text-xs text-muted-foreground">TeleCRM lead: {scan.telecrmLeadIds}</p>
                )}
                {scan.telecrmError && (
                  <p className="line-clamp-2 text-xs font-medium text-red-600">
                    TeleCRM: {scan.telecrmError}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {new Date(scan.createdAt).toLocaleString(undefined, { year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scan Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredScans.length} filtered {filteredScans.length === 1 ? "record" : "records"}
              {" "}from {scans.length} total
              {" "} | {syncedScans.length} TeleCRM synced
              {telecrmErrorScans.length > 0 ? ` | ${telecrmErrorScans.length} TeleCRM errors` : ""}
            </p>
          </div>
          <a
            href={exportHref}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <Download className="h-4 w-4" />
            Download Excel
          </a>
        </div>

        <form className="grid gap-4 rounded-3xl border border-border bg-card/60 p-5 shadow-sm md:grid-cols-4">
          <div className="md:col-span-2">
            <label htmlFor="dashboard-search" className="mb-2 block text-sm font-medium text-foreground">
              Search by name or phone
            </label>
            <input
              id="dashboard-search"
              name="q"
              defaultValue={resolvedSearchParams.q ?? ""}
              placeholder="Search leads..."
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="dashboard-problem" className="mb-2 block text-sm font-medium text-foreground">
              Concern
            </label>
            <select
              id="dashboard-problem"
              name="problem"
              defaultValue={selectedProblem}
              className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary"
            >
              <option value="">All concerns</option>
              <optgroup label="Hair leads">
                {hairProblems.map((problem) => (
                  <option key={problem} value={problem}>
                    {problemLabels[problem]}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Skin leads">
                {skinProblems.map((problem) => (
                  <option key={problem} value={problem}>
                    {problemLabels[problem]}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Date range
            </label>
            <DateRangePicker
              defaultFrom={selectedDateFrom}
              defaultTo={selectedDateTo}
            />
          </div>

          <div className="flex flex-wrap items-end gap-3 md:col-span-4">
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Apply Filters
            </button>
            <a
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              Reset
            </a>
          </div>
        </form>

        <div className="grid gap-6 xl:grid-cols-2 xl:items-start">
          {renderScanGrid(hairScans, "Hair Leads")}
          {renderScanGrid(skinScans, "Skin Leads")}
        </div>
      </div>
    </main>
  )
}
