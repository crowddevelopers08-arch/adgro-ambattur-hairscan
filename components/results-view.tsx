"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Loader2, Phone } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormData } from "./form-modal"
import type { HairProblemKey } from "./hair-report-details"
import { REPORT_STORAGE_KEY } from "./report-page"

interface ResultsViewProps {
  formData: FormData
  capturedImage: string | null
  onBack: () => void
}

const resultsData: Record<HairProblemKey, {
  title: string
  subtitle: string
  description: string
  tag: string
  docTitle: string
  docDescription: string
}> = {
  "hair-fall": {
    title: "Hair Fall Analysis",
    subtitle: "Excessive Hair Shedding Detected",
    description: "Based on our AI analysis, we have identified specific issues related to hair fall. Your personalized report below outlines the solutions and treatment path.",
    tag: "Hair Fall",
    docTitle: "Hair Fall Report",
    docDescription: "Detailed treatment and stage-wise guidance for hair fall.",
  },
  "crown-thinning": {
    title: "Crown Thinning Analysis",
    subtitle: "Density Loss at Crown Area",
    description: "Hair density is reducing at the crown area, often an early sign of pattern baldness. Your report contains a restoration roadmap.",
    tag: "Crown Thinning",
    docTitle: "Crown Thinning Report",
    docDescription: "Stage-based restoration plan for crown thinning and pattern hair loss.",
  },
  "frontal-hair-loss": {
    title: "Frontal Hair Loss Analysis",
    subtitle: "Hairline Recession Detected",
    description: "Hairline recession or thinning in the front area is noticed, often caused by genetics, stress, or hormonal changes.",
    tag: "Frontal Loss",
    docTitle: "Frontal Hair Loss Report",
    docDescription: "Plan to control recession and restore frontal hairline density.",
  },
  "dandruff-scalp-issues": {
    title: "Scalp Health Analysis",
    subtitle: "Scalp Inflammation Detected",
    description: "Flaky scalp, itching, or irritation is affecting your hair health and growth. Your report outlines targeted scalp therapies.",
    tag: "Scalp Issues",
    docTitle: "Dandruff / Scalp Issues Report",
    docDescription: "Scalp-focused report with therapy suggestions and stage-wise care.",
  },
  "low-hair-density": {
    title: "Hair Density Analysis",
    subtitle: "Low Follicle Activity Detected",
    description: "Hair appears thin, flat, and lacks volume due to weak or inactive follicles. Your report details a density restoration plan.",
    tag: "Low Density",
    docTitle: "Lower Hair Density Report",
    docDescription: "Density restoration report with treatment path by stage.",
  },
}

export function ResultsView({ formData, capturedImage, onBack }: ResultsViewProps) {
  const router = useRouter()
  const [detailsFormOpen, setDetailsFormOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [detailsForm, setDetailsForm] = useState({ name: formData.name || "", phone: formData.phone || "", location: "" })
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [locationSelect, setLocationSelect] = useState("")

  const problem = (formData.problem || "hair-fall") as HairProblemKey
  const data = resultsData[problem] ?? resultsData["hair-fall"]
  const RED = "#ea2424"

  const handleViewReport = () => {
    setDetailsForm({ name: formData.name || "", phone: formData.phone || "", location: "" })
    setLocationSelect("")
    setSubmitError(null)
    setDetailsFormOpen(true)
  }

  const handleDetailsSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!detailsForm.name.trim() || !detailsForm.phone.trim() || !detailsForm.location.trim()) return
    setSubmitting(true)
    try {
      const saveRes = await fetch("/api/save-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: detailsForm.name,
          phone: detailsForm.phone,
          location: detailsForm.location,
          problem,
          imageData: capturedImage ?? "",
        }),
      })
      if (!saveRes.ok) {
        const payload = await saveRes.json().catch(() => ({ error: "Failed to save scan" }))
        throw new Error(payload?.error || "Failed to save scan")
      }
      setDetailsFormOpen(false)
      window.sessionStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify({
        kind: "hair",
        problem,
        name: detailsForm.name.trim(),
        scannedImage: capturedImage,
      }))
      router.push("/report")
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong"
      if (msg.includes("already been used")) {
        setSubmitError("This mobile number has already been used. Please use a different number.")
      } else {
        setSubmitError("Something went wrong. Please try again.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="hair-results-page" style={{ minHeight: "100vh", background: "#f8f8f8", fontFamily: "var(--font-outfit, 'Outfit', sans-serif)", color: "#1a1a1a", position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", right: "-80px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.05) 0%, transparent 65%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-80px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.04) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.25 }} />
      </div>

      <div style={{
        position: "sticky", top: 0, zIndex: 40,
        background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(234,36,36,0.1)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
      }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "1px solid #e8e8e8", cursor: "pointer",
              color: "#6b6b6b", fontSize: "0.875rem", fontWeight: 600,
              padding: "6px 12px", borderRadius: "100px",
              transition: "all 0.2s", fontFamily: "inherit",
            }}
          >
            <ArrowLeft style={{ width: 15, height: 15 }} />
            Back to Home
          </button>
          <img src="/adgrologo.png" alt="Adgro Hair Ambattur" style={{ height: 36, width: "auto", objectFit: "contain" }} />
        </div>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "32px 16px 80px", position: "relative", zIndex: 1 }}>
        <div style={{
          background: "linear-gradient(135deg, #ea2424 0%, #c91f1f 100%)",
          borderRadius: "24px", padding: "36px 32px",
          marginBottom: "20px", position: "relative", overflow: "hidden",
          boxShadow: "0 12px 48px rgba(234,36,36,0.25)",
        }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 24px)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />

          <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "18px",
              background: "rgba(255,255,255,0.2)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <CheckCircle2 style={{ width: 30, height: 30, color: "#fff" }} />
            </div>
            <div>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(255,255,255,0.2)", borderRadius: "100px",
                padding: "3px 12px", marginBottom: "8px",
                fontSize: "11px", fontWeight: 700, color: "#fff",
                textTransform: "uppercase", letterSpacing: "0.08em",
              }}>
                AI Analysis Complete | {data.tag}
              </div>
              <h1 style={{ fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800, color: "#fff", marginBottom: "6px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                {data.title}
              </h1>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.8)", fontWeight: 400 }}>
                {data.subtitle}
                {formData.name && <span> | Personalized for <strong style={{ color: "#fff", fontWeight: 700 }}>{formData.name}</strong></span>}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: "20px", padding: "28px 30px",
          marginBottom: "16px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${RED}, rgba(234,36,36,0.1))` }} />
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED, marginBottom: "10px" }}>AI Scan Summary</p>
          <p style={{ lineHeight: 1.8, color: "#5a5a5a", fontSize: "0.95rem" }}>{data.description}</p>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(234,36,36,0.04), rgba(234,36,36,0.01))",
          border: "1.5px dashed rgba(234,36,36,0.3)",
          borderRadius: "20px", padding: "28px 30px",
          marginBottom: "16px",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
            <div style={{
              width: 56, height: 56, borderRadius: "16px",
              background: "rgba(234,36,36,0.08)",
              border: "1px solid rgba(234,36,36,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <FileText style={{ width: 26, height: 26, color: RED }} />
            </div>
            <div style={{ flex: 1, minWidth: "180px" }}>
              <p style={{ fontWeight: 800, fontSize: "1rem", color: "#1a1a1a", marginBottom: "4px" }}>{data.docTitle}</p>
              <p style={{ fontSize: "0.82rem", color: "#6b6b6b", lineHeight: 1.5 }}>{data.docDescription}</p>
            </div>
            <button
              onClick={handleViewReport}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #ea2424, #c91f1f)",
                color: "#fff",
                border: "none", borderRadius: "100px",
                padding: "12px 24px", fontSize: "0.9rem", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(234,36,36,0.3)",
                transition: "all 0.2s",
                fontFamily: "inherit",
                flexShrink: 0,
              }}
            >
              <FileText style={{ width: 16, height: 16 }} />
              View Full Report
              <ChevronRight style={{ width: 15, height: 15, opacity: 0.8 }} />
            </button>
          </div>
        </div>

        <div style={{
          background: "#fff", border: "1px solid #eee",
          borderRadius: "20px", padding: "28px 30px",
          boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "20px", flexWrap: "wrap",
        }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1a1a", marginBottom: "4px" }}>Speak with a Specialist</p>
            <p style={{ fontSize: "0.85rem", color: "#6b6b6b" }}>Get expert advice for your hair condition. Book a free consultation now.</p>
          </div>
          <a
            href="tel:+917409256789"
            style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #ea2424, #c91f1f)",
              color: "#fff",
              borderRadius: "100px", padding: "13px 28px",
              fontSize: "0.95rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 6px 20px rgba(234,36,36,0.3)",
              transition: "all 0.2s", flexShrink: 0,
            }}
          >
            <Phone style={{ width: 17, height: 17 }} />
            Book Consultation
          </a>
          <div style={{ flexBasis: "100%", color: "#6b6b6b", fontSize: "0.82rem", lineHeight: 1.6 }}>
            <p style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "3px" }}>Adgro Hair Ambattur</p>
            <p>Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053</p>
            <p>
              <a href="mailto:customercare@adgrohairambattur.in" style={{ color: RED, textDecoration: "none", fontWeight: 700 }}>customercare@adgrohairambattur.in</a>
              {" | "}
              <a href="tel:+917409256789" style={{ color: RED, textDecoration: "none", fontWeight: 700 }}>+91 7409256789</a>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={detailsFormOpen} onOpenChange={(open) => !submitting && setDetailsFormOpen(open)}>
        <DialogContent
          className="border-0 bg-white sm:max-w-md"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(234,36,36,0.08)", borderRadius: "24px", fontFamily: "inherit" }}
        >
          <DialogHeader className="pt-4">
            <div style={{
              width: 52, height: 52, borderRadius: "14px",
              background: "rgba(234,36,36,0.08)",
              border: "1px solid rgba(234,36,36,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
            }}>
              <FileText style={{ width: 24, height: 24, color: RED }} />
            </div>
            <DialogTitle className="text-center text-xl font-bold" style={{ fontWeight: 800, color: "#1a1a1a" }}>
              View Your Hair Report
            </DialogTitle>
            <DialogDescription className="text-center text-sm" style={{ color: "#6b6b6b" }}>
              {submitting ? "Saving your details..." : "Enter your details to access the full personalized report"}
            </DialogDescription>
          </DialogHeader>

          {submitting ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: "rgba(234,36,36,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Loader2 className="animate-spin" style={{ width: 28, height: 28, color: RED }} />
              </div>
              <p style={{ fontSize: "0.9rem", color: "#6b6b6b" }}>Preparing your personalized report...</p>
            </div>
          ) : (
            <form onSubmit={handleDetailsSubmit} className="mt-2 flex flex-col gap-4 px-1 pb-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-name" style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Your Name</Label>
                <Input
                  id="report-name"
                  placeholder="Enter your full name"
                  value={detailsForm.name}
                  onChange={(e) => setDetailsForm({ ...detailsForm, name: e.target.value })}
                  style={{ height: 44, borderRadius: "10px", fontFamily: "inherit", fontSize: "0.9rem" }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-phone" style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Phone Number</Label>
                <Input
                  id="report-phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={detailsForm.phone}
                  onChange={(e) => { setSubmitError(null); setDetailsForm({ ...detailsForm, phone: e.target.value }) }}
                  style={{
                    height: 44, borderRadius: "10px", fontFamily: "inherit", fontSize: "0.9rem",
                    borderColor: submitError ? "#ea2424" : undefined,
                  }}
                />
                {submitError && <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#ea2424" }}>{submitError}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="report-location" style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>Location</Label>
                <select
                  id="report-location"
                  value={locationSelect}
                  onChange={(e) => {
                    setLocationSelect(e.target.value)
                    setDetailsForm({ ...detailsForm, location: e.target.value })
                  }}
                  style={{
                    height: 44, width: "100%", borderRadius: "10px",
                    border: "1px solid #e0e0e0", background: "#fafafa",
                    padding: "0 12px", fontSize: "0.9rem", color: "#1a1a1a",
                    outline: "none", fontFamily: "inherit",
                  }}
                >
                  <option value="">Select your nearest location</option>
                  <option value="Ambattur">Ambattur</option>
                  <option value="Velachery">Velachery</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={!detailsForm.name.trim() || !detailsForm.phone.trim() || !detailsForm.location.trim()}
                style={{
                  marginTop: "4px", width: "100%",
                  background: "linear-gradient(135deg, #ea2424, #c91f1f)",
                  color: "#fff", border: "none", borderRadius: "12px",
                  padding: "14px", fontSize: "0.95rem", fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 20px rgba(234,36,36,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  opacity: (!detailsForm.name.trim() || !detailsForm.phone.trim() || !detailsForm.location.trim()) ? 0.5 : 1,
                  transition: "all 0.2s",
                  fontFamily: "inherit",
                }}
              >
                <FileText style={{ width: 17, height: 17 }} />
                View Full Report
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
