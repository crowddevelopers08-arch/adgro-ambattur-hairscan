"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { ArrowLeft, CheckCircle2, Phone, Sparkles } from "lucide-react"
import { HairReportDetails, type HairProblemKey } from "@/components/hair-report-details"

type ReportKind = "hair" | "skin"

type StoredReport = {
  kind: ReportKind
  problem: string
  name?: string
  scannedImage?: string | null
}

const REPORT_STORAGE_KEY = "adgro-current-report"

const hairProblems = new Set<HairProblemKey>([
  "hair-fall",
  "crown-thinning",
  "frontal-hair-loss",
  "dandruff-scalp-issues",
  "low-hair-density",
])

const skinReports = {
  acne: {
    title: "Acne Skin Report",
    detected: "Acne",
    summary: [
      "Visible signs suggest acne-related skin concerns that may be linked to oil imbalance, clogged pores, lifestyle, or irritation.",
      "Understanding the root concern helps avoid random products and improves treatment decisions.",
    ],
    guidance: ["Doctor-guided skincare routine", "Deep cleansing support", "Chemical Peel guidance", "Acne management options"],
  },
  pigmentation: {
    title: "Pigmentation Skin Report",
    detected: "Pigmentation",
    summary: [
      "Visible uneven pigment may be related to sun exposure, post-acne marks, hormonal changes, or skin sensitivity.",
      "A proper skin assessment helps match the right care instead of trial-and-error product use.",
    ],
    guidance: ["Sun protection guidance", "Pigmentation care plan", "Chemical Peel support", "Laser-based treatment direction"],
  },
  dullness: {
    title: "Dullness Skin Report",
    detected: "Dullness",
    summary: [
      "Dullness can be influenced by dehydration, dead skin buildup, stress, or inconsistent skincare habits.",
      "With the right guidance, skin clarity and glow can often improve with a structured routine.",
    ],
    guidance: ["Glow care support", "Hydra Facial guidance", "Doctor-guided home care", "Lifestyle correction tips"],
  },
  tanning: {
    title: "Tanning Skin Report",
    detected: "Tanning",
    summary: [
      "Visible tanning may be connected to frequent sun exposure and uneven melanin response.",
      "Guided care can help support tone recovery while protecting the skin barrier.",
    ],
    guidance: ["Sun care essentials", "Brightening support", "Hydra Facial guidance", "Professional treatment direction"],
  },
  "uneven-skin-tone": {
    title: "Uneven Skin Tone Report",
    detected: "Uneven Skin Tone",
    summary: [
      "Uneven tone may be related to tanning, pigmentation, post-acne marks, or skin sensitivity.",
      "Scientific guidance helps identify whether routine care or professional support is more suitable.",
    ],
    guidance: ["Tone-correction guidance", "Routine improvement tips", "Pigmentation support", "Doctor-guided treatment direction"],
  },
  "open-pores": {
    title: "Open Pores Skin Report",
    detected: "Open Pores",
    summary: [
      "Visible pores may be influenced by excess oil, texture changes, or congestion.",
      "Right-care planning can help improve skin texture without over-treating the skin.",
    ],
    guidance: ["Oil-control support", "Texture care guidance", "Deep cleansing direction", "Doctor-guided skincare routine"],
  },
} as const

type SkinProblemKey = keyof typeof skinReports

function getStoredReport(): StoredReport | null {
  if (typeof window === "undefined") return null

  const raw = window.sessionStorage.getItem(REPORT_STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StoredReport
  } catch {
    return null
  }
}

function isHairProblem(problem: string): problem is HairProblemKey {
  return hairProblems.has(problem as HairProblemKey)
}

function isSkinProblem(problem: string): problem is SkinProblemKey {
  return problem in skinReports
}

function SkinReportDetails({ problem, scannedImage }: { problem: SkinProblemKey; scannedImage?: string | null }) {
  const report = skinReports[problem]

  return (
    <section className="skin-report-details">
      <style>{`
        .skin-report-details {
          border-radius: 22px;
          border: 1px solid rgba(221,185,90,0.22);
          background: linear-gradient(145deg, rgba(14,17,24,0.98), rgba(10,13,21,0.96));
          box-shadow: 0 24px 68px rgba(0,0,0,0.28), inset 0 1px 0 rgba(221,185,90,0.12);
          overflow: hidden;
        }

        .skin-report-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 146px;
          gap: 24px;
          align-items: center;
          padding: 28px 30px;
          border-bottom: 1px solid rgba(221,185,90,0.16);
          background: linear-gradient(135deg, rgba(221,185,90,0.11), rgba(255,255,255,0.02));
        }

        .skin-report-scan {
          justify-self: end;
          width: 146px;
        }

        .skin-report-scan-frame {
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 18px;
          border: 3px solid rgba(221,185,90,0.24);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 14px 34px rgba(0,0,0,0.22);
        }

        .skin-report-scan-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .skin-report-kicker {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-bottom: 10px;
          color: #ddb95a;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        .skin-report-title {
          margin: 0 0 10px;
          color: #f2f0eb;
          font-size: clamp(1.45rem, 3vw, 2rem);
          font-weight: 900;
          line-height: 1.12;
        }

        .skin-report-detected,
        .skin-report-summary p,
        .skin-guidance-card p,
        .skin-report-note {
          color: #bdb8ae;
          line-height: 1.72;
        }

        .skin-report-body {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 26px 30px 30px;
        }

        .skin-report-section-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin: 0 0 14px;
          color: #f2f0eb;
          font-size: 1.02rem;
          font-weight: 900;
        }

        .skin-guidance-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .skin-guidance-card {
          border: 1px solid rgba(221,185,90,0.16);
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          padding: 18px;
        }

        .skin-guidance-card h4 {
          margin: 0 0 7px;
          color: #ddb95a;
          font-size: 0.95rem;
          font-weight: 850;
        }

        .skin-report-note {
          border-radius: 14px;
          border: 1px dashed rgba(221,185,90,0.32);
          background: rgba(221,185,90,0.07);
          padding: 14px 16px;
          font-size: 0.9rem;
          font-weight: 700;
        }

        @media (max-width: 680px) {
          .skin-report-header,
          .skin-report-body {
            padding-left: 20px;
            padding-right: 20px;
          }

          .skin-report-header {
            grid-template-columns: 1fr;
            gap: 18px;
            text-align: center;
            justify-items: center;
          }

          .skin-report-scan {
            order: -1;
            justify-self: center;
            width: 132px;
          }

          .skin-report-kicker {
            justify-content: center;
          }

          .skin-guidance-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="skin-report-header">
        <div>
          <p className="skin-report-kicker">
            <Sparkles style={{ width: 15, height: 15 }} />
            Personalized Skin Report
          </p>
          <h2 className="skin-report-title">{report.title}</h2>
          <p className="skin-report-detected">
            <strong>Concern Detected:</strong> {report.detected}
          </p>
        </div>
        {scannedImage && (
          <div className="skin-report-scan">
            <div className="skin-report-scan-frame">
              <img src={scannedImage} alt="User scanned skin image" />
            </div>
          </div>
        )}
      </div>

      <div className="skin-report-body">
        <div className="skin-report-summary">
          {report.summary.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div>
          <h3 className="skin-report-section-title">
            <CheckCircle2 style={{ width: 18, height: 18, color: "#ddb95a" }} />
            Suggested Direction
          </h3>
          <div className="skin-guidance-grid">
            {report.guidance.map((item, index) => (
              <article className="skin-guidance-card" key={item}>
                <h4>Step {index + 1}</h4>
                <p>{item}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="skin-report-note">
          This report is informational and supports your next-step understanding. Final treatment decisions should be based on doctor guidance.
        </div>
      </div>
    </section>
  )
}

export function ReportPage() {
  const searchParams = useSearchParams()
  const [storedReport, setStoredReport] = useState<StoredReport | null>(null)

  useEffect(() => {
    setStoredReport(getStoredReport())
  }, [])

  const report = useMemo<StoredReport | null>(() => {
    if (storedReport) return storedReport

    const kind = searchParams.get("type")
    const problem = searchParams.get("problem")
    const name = searchParams.get("name") ?? undefined

    if ((kind === "hair" || kind === "skin") && problem) {
      return { kind, problem, name, scannedImage: null }
    }

    return null
  }, [searchParams, storedReport])

  const isSkin = report?.kind === "skin"
  const background = isSkin ? "#080b12" : "#f8f8f8"
  const foreground = isSkin ? "#f2f0eb" : "#1a1a1a"
  const accent = isSkin ? "#ddb95a" : "#ea2424"
  const backHref = isSkin ? "/skin" : "/"

  if (!report) {
    return (
      <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f8f8f8", padding: 20, color: "#1a1a1a" }}>
        <div style={{ maxWidth: 460, textAlign: "center", background: "#fff", border: "1px solid #eee", borderRadius: 18, padding: 30, boxShadow: "0 16px 50px rgba(0,0,0,0.08)" }}>
          <h1 style={{ margin: "0 0 10px", fontSize: "1.55rem", fontWeight: 850 }}>Report not found</h1>
          <p style={{ margin: "0 0 20px", color: "#6b6b6b", lineHeight: 1.7 }}>Please complete a scan first so we can prepare your personalized report.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, background: "#ea2424", color: "#fff", padding: "12px 20px", fontWeight: 800, textDecoration: "none" }}>
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Start Scan
          </Link>
        </div>
      </main>
    )
  }

  const hairProblem = report.kind === "hair" && isHairProblem(report.problem) ? report.problem : null
  const skinProblem = report.kind === "skin" && isSkinProblem(report.problem) ? report.problem : null

  return (
    <main style={{ minHeight: "100vh", background, color: foreground, fontFamily: "var(--font-outfit, 'Outfit', sans-serif)" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: isSkin ? "rgba(8,11,18,0.9)" : "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${isSkin ? "rgba(221,185,90,0.14)" : "rgba(234,36,36,0.1)"}` }}>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
          <Link href={backHref} style={{ display: "inline-flex", alignItems: "center", gap: 7, color: isSkin ? "#bdb8ae" : "#6b6b6b", border: `1px solid ${isSkin ? "rgba(221,185,90,0.18)" : "#e8e8e8"}`, borderRadius: 999, padding: "7px 13px", textDecoration: "none", fontSize: "0.875rem", fontWeight: 700 }}>
            <ArrowLeft style={{ width: 15, height: 15 }} />
            Back
          </Link>
          <img src="/adgrologo.png" alt="Adgro Hair Ambattur" style={{ height: 36, width: "auto", objectFit: "contain" }} />
        </div>
      </div>

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px 80px" }}>
        <div style={{ marginBottom: 18, borderRadius: 24, padding: "30px 28px", background: isSkin ? "linear-gradient(135deg, rgba(221,185,90,0.16), rgba(221,185,90,0.05))" : "linear-gradient(135deg, #ea2424 0%, #c91f1f 100%)", border: isSkin ? "1px solid rgba(221,185,90,0.22)" : "none", boxShadow: isSkin ? "0 18px 60px rgba(0,0,0,0.24)" : "0 12px 48px rgba(234,36,36,0.25)" }}>
          <p style={{ margin: "0 0 8px", color: isSkin ? accent : "#fff", fontSize: 11, fontWeight: 850, letterSpacing: "0.14em", textTransform: "uppercase" }}>Your Report Is Ready</p>
          <h1 style={{ margin: "0 0 6px", color: isSkin ? "#f2f0eb" : "#fff", fontSize: "clamp(1.55rem, 4vw, 2.2rem)", fontWeight: 900, lineHeight: 1.15 }}>Personalized Scan Report</h1>
          {report.name && (
            <p style={{ margin: 0, color: isSkin ? "#bdb8ae" : "rgba(255,255,255,0.82)", fontSize: "0.96rem" }}>
              Prepared for <strong style={{ color: isSkin ? accent : "#fff" }}>{report.name}</strong>
            </p>
          )}
        </div>

        {hairProblem && <HairReportDetails problem={hairProblem} scannedImage={report.scannedImage} />}
        {skinProblem && <SkinReportDetails problem={skinProblem} scannedImage={report.scannedImage} />}

        {!hairProblem && !skinProblem && (
          <div style={{ borderRadius: 18, border: `1px solid ${isSkin ? "rgba(221,185,90,0.18)" : "#eee"}`, background: isSkin ? "#0e1118" : "#fff", padding: 26 }}>
            <p style={{ margin: 0, color: isSkin ? "#bdb8ae" : "#6b6b6b" }}>This report type is unavailable. Please start a new scan.</p>
          </div>
        )}

        <div style={{ marginTop: 16, borderRadius: 20, padding: "26px 28px", background: isSkin ? "linear-gradient(145deg, #0e1118, #0a0d15)" : "#fff", border: `1px solid ${isSkin ? "rgba(221,185,90,0.15)" : "#eee"}`, boxShadow: isSkin ? "0 4px 20px rgba(0,0,0,0.3)" : "0 2px 16px rgba(0,0,0,0.04)" }}>
          <p style={{ margin: "0 0 6px", fontWeight: 800, color: foreground }}>Speak with a Specialist</p>
          <p style={{ margin: "0 0 16px", color: isSkin ? "#8a8a8a" : "#6b6b6b", fontSize: "0.9rem", lineHeight: 1.6 }}>Get expert advice for your scan results. Book a free consultation now.</p>
          <a href="tel:+917409256789" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: accent, color: isSkin ? "#080b12" : "#fff", borderRadius: 999, padding: "12px 24px", fontSize: "0.95rem", fontWeight: 800, textDecoration: "none" }}>
            <Phone style={{ width: 17, height: 17 }} />
            Book Consultation
          </a>
        </div>
      </div>
    </main>
  )
}

export { REPORT_STORAGE_KEY }
