"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileText, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import type { SkinFormData } from "./skin-types"
import { REPORT_STORAGE_KEY } from "@/components/report-page"

interface SkinResultsViewProps {
  formData: SkinFormData
  capturedImage: string | null
  onBack: () => void
}

const resultsData = {
  acne: {
    title: "Acne Skin Report",
    description: "Your scan shows visible acne-related concerns. Download the guide to understand likely triggers, care options, and the next steps.",
    docTitle: "Acne Skin Report",
    docDescription: "A skin guide covering acne care, treatment directions, and doctor-guided next steps.",
  },
  pigmentation: {
    title: "Pigmentation Skin Report",
    description: "Your scan suggests visible pigmentation-related concerns. Download the guide for possible causes, care suggestions, and professional options.",
    docTitle: "Pigmentation Skin Report",
    docDescription: "A practical guide for understanding pigmentation and choosing the right care path.",
  },
  dullness: {
    title: "Dullness Skin Report",
    description: "Your scan indicates dull or tired-looking skin. Download the guide to explore likely reasons and better glow-support options.",
    docTitle: "Dullness Skin Report",
    docDescription: "A personalised-looking guide for glow care, hydration support, and doctor-guided recommendations.",
  },
  tanning: {
    title: "Tanning Skin Report",
    description: "Your scan suggests tanning-related changes in skin tone. Download the guide to understand recovery-focused care options.",
    docTitle: "Tanning Skin Report",
    docDescription: "A care guide for tanning recovery, skin clarity support, and treatment planning.",
  },
  "uneven-skin-tone": {
    title: "Uneven Skin Tone Report",
    description: "Your scan indicates uneven skin tone concerns. Download the guide to understand possible reasons and appropriate care options.",
    docTitle: "Uneven Skin Tone Report",
    docDescription: "A clear guide covering tone correction support and personalised next-step guidance.",
  },
  "open-pores": {
    title: "Open Pores Skin Report",
    description: "Your scan suggests visible pore-related concerns. Download the guide for better understanding and care guidance.",
    docTitle: "Open Pores Skin Report",
    docDescription: "A guide focused on pore care, skin texture support, and the right next-step options.",
  },
} as const

type SkinProblemKey = keyof typeof resultsData

export function SkinResultsView({ formData, capturedImage, onBack }: SkinResultsViewProps) {
  const router = useRouter()
  const [pdfFormOpen, setPdfFormOpen] = useState(false)
  const [pdfGenerating, setPdfGenerating] = useState(false)
  const [pdfForm, setPdfForm] = useState({ name: formData.name || "", phone: formData.phone || "" })

  const problem = (formData.problem || "acne") as SkinProblemKey
  const data = resultsData[problem]

  const handleDownload = () => {
    setPdfForm({ name: formData.name || "", phone: formData.phone || "" })
    setPdfFormOpen(true)
  }

  const handlePdfFormSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!pdfForm.name.trim() || !pdfForm.phone.trim()) return

    setPdfGenerating(true)
    try {
      const saveRes = await fetch("/api/save-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: pdfForm.name,
          phone: pdfForm.phone,
          problem,
          imageData: capturedImage ?? "",
          sourceUrl: window.location.href,
        }),
      })

      if (!saveRes.ok) {
        const payload = await saveRes.json().catch(() => ({ error: "Failed to save scan" }))
        throw new Error(payload?.error || "Failed to save scan")
      }

      setPdfFormOpen(false)
      window.sessionStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify({
        kind: "skin",
        problem,
        name: pdfForm.name.trim(),
        scannedImage: capturedImage,
      }))
      router.push("/report")
    } catch (err) {
      console.error("Submit/report open failed:", err)
      if (err instanceof Error && err.message.includes("Failed to save scan")) {
        alert(`Database save failed: ${err.message}`)
      } else {
        alert("Unable to open the report right now.")
      }
    } finally {
      setPdfGenerating(false)
    }
  }

  return (
    <div className="skin-results-page" style={{ minHeight: "100vh", background: "#080b12", color: "#f2f0eb", padding: "0" }}>
      <style>{`
        .pdf-card-inner { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
        .pdf-dl-btn { display: flex; flex-shrink: 0; }
        .mobile-dl-btn { display: none; }
        @media (max-width: 480px) {
          .pdf-card-inner { flex-direction: column; align-items: stretch; }
          .pdf-dl-btn { display: none; }
          .mobile-dl-btn { display: flex; }
        }
      `}</style>
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(221,185,90,0.07), transparent)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: "720px", margin: "0 auto", padding: "32px 16px 60px" }}>
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#8a8a8a", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", marginBottom: "32px", padding: "0" }}>
          <ArrowLeft style={{ width: 16, height: 16 }} />
          Back to Home
        </button>

        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 16px", border: "1px solid rgba(221,185,90,0.4)", background: "rgba(221,185,90,0.1)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(221,185,90,0.2)" }}>
            <CheckCircle2 style={{ width: 30, height: 30, color: "#ddb95a" }} />
          </div>
          <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 800, marginBottom: "8px", letterSpacing: "-0.02em" }}>{data.title}</h1>
          {formData.name && (
            <p style={{ color: "#8a8a8a", fontSize: "0.95rem" }}>
              Personalized for <span style={{ color: "#ddb95a", fontWeight: 600 }}>{formData.name}</span>
            </p>
          )}
          <div style={{ margin: "20px auto 0", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <div style={{ height: "1px", width: 40, background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.5))" }} />
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#ddb95a", boxShadow: "0 0 6px rgba(221,185,90,0.8)" }} />
            <div style={{ height: "1px", width: 40, background: "linear-gradient(270deg, transparent, rgba(221,185,90,0.5))" }} />
          </div>
        </div>

        <button onClick={handleDownload} disabled={pdfGenerating} className="mobile-dl-btn" style={{ alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", marginBottom: "20px", background: "#ddb95a", color: "#080b12", border: "none", borderRadius: "12px", padding: "14px", fontSize: "1rem", fontWeight: 700, cursor: pdfGenerating ? "not-allowed" : "pointer", opacity: pdfGenerating ? 0.7 : 1, boxShadow: "0 0 24px rgba(221,185,90,0.3)" }}>
          {pdfGenerating ? <Loader2 style={{ width: 18, height: 18, animation: "spin 1s linear infinite" }} /> : <FileText style={{ width: 18, height: 18 }} />}
          {pdfGenerating ? "Preparing..." : "View Report"}
        </button>

        <div style={{ background: "linear-gradient(145deg, #0e1118, #0a0d15)", border: "1px solid rgba(221,185,90,0.2)", borderRadius: "18px", padding: "28px", marginBottom: "20px", position: "relative", overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(221,185,90,0.07)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)" }} />
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#ddb95a", marginBottom: "10px" }}>
            your AI Scan Report is Ready
          </p>
          <p style={{ lineHeight: 1.8, color: "#9a9a9a", fontSize: "0.95rem" }}>{data.description}</p>
        </div>

        <div style={{ background: "linear-gradient(135deg, rgba(221,185,90,0.12), rgba(221,185,90,0.04))", border: "1px solid rgba(221,185,90,0.35)", borderRadius: "18px", padding: "24px 28px", marginBottom: "20px", position: "relative", overflow: "hidden", boxShadow: "0 4px 30px rgba(221,185,90,0.08)" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)" }} />
          <div className="pdf-card-inner">
            <div style={{ width: 52, height: 52, borderRadius: "14px", flexShrink: 0, border: "1px solid rgba(221,185,90,0.4)", background: "rgba(221,185,90,0.12)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 18px rgba(221,185,90,0.15)" }}>
              <FileText style={{ width: 24, height: 24, color: "#ddb95a" }} />
            </div>
            <div style={{ flex: 1, minWidth: "160px" }}>
              <p style={{ fontWeight: 700, fontSize: "0.97rem", color: "#f2f0eb", marginBottom: "4px" }}>{data.docTitle}</p>
              <p style={{ fontSize: "0.82rem", color: "#8a8a8a", lineHeight: 1.5 }}>{data.docDescription}</p>
            </div>
            <button onClick={handleDownload} disabled={pdfGenerating} className="pdf-dl-btn" style={{ alignItems: "center", gap: "8px", background: "#ddb95a", color: "#080b12", border: "none", borderRadius: "10px", padding: "11px 22px", fontSize: "0.9rem", fontWeight: 700, cursor: pdfGenerating ? "not-allowed" : "pointer", opacity: pdfGenerating ? 0.7 : 1, boxShadow: "0 0 20px rgba(221,185,90,0.3)", transition: "all 0.2s" }}>
              {pdfGenerating ? <Loader2 style={{ width: 16, height: 16, animation: "spin 1s linear infinite" }} /> : <FileText style={{ width: 16, height: 16 }} />}
              {pdfGenerating ? "Preparing..." : "View Report"}
            </button>
          </div>
        </div>

        <div style={{ background: "linear-gradient(145deg, #0e1118, #0a0d15)", border: "1px solid rgba(221,185,90,0.15)", borderRadius: "18px", padding: "28px", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          <p style={{ color: "#8a8a8a", fontSize: "0.9rem", marginBottom: "16px" }}>
            Want to speak with a specialist about your results?
          </p>
          <a href="tel:+917409256789" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#ddb95a", color: "#080b12", borderRadius: "10px", padding: "12px 28px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", boxShadow: "0 0 24px rgba(221,185,90,0.3)", transition: "all 0.2s" }}>
            Book a Consultation
          </a>
          <div style={{ marginTop: "20px", color: "#8a8a8a", fontSize: "0.82rem", lineHeight: 1.65 }}>
            <p style={{ fontWeight: 700, color: "#f2f0eb", marginBottom: "4px" }}>Adgro Hair Ambattur</p>
            <p>Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053</p>
            <p>
              <a href="mailto:customercare@adgrohairambattur.in" style={{ color: "#ddb95a", textDecoration: "none", fontWeight: 700 }}>customercare@adgrohairambattur.in</a>
              {" | "}
              <a href="tel:+917409256789" style={{ color: "#ddb95a", textDecoration: "none", fontWeight: 700 }}>+91 7409256789</a>
            </p>
          </div>
        </div>
      </div>

      <Dialog open={pdfFormOpen} onOpenChange={(open) => !pdfGenerating && setPdfFormOpen(open)}>
        <DialogContent data-pdf-dialog className="border-primary/20 bg-card/95 backdrop-blur-xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-foreground">View Your Guide</DialogTitle>
            <DialogDescription className="text-center text-sm text-muted-foreground">
              {pdfGenerating ? "Preparing your report, please wait..." : "Enter your name and phone number to open the report"}
            </DialogDescription>
          </DialogHeader>

          {pdfGenerating ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Opening your personalized guide...</p>
            </div>
          ) : (
            <form onSubmit={handlePdfFormSubmit} className="mt-4 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="skin-pdf-name" className="text-foreground">Name</Label>
                <Input id="skin-pdf-name" placeholder="Enter your name" value={pdfForm.name} onChange={(e) => setPdfForm({ ...pdfForm, name: e.target.value })} className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="skin-pdf-phone" className="text-foreground">Phone Number</Label>
                <Input id="skin-pdf-phone" type="tel" placeholder="Enter your phone number" value={pdfForm.phone} onChange={(e) => setPdfForm({ ...pdfForm, phone: e.target.value })} className="border-border/50 bg-background/50 focus:border-primary focus:ring-primary" />
              </div>
              <Button type="submit" disabled={!pdfForm.name.trim() || !pdfForm.phone.trim()} className="mt-2 w-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(221,185,90,0.4)] disabled:opacity-50">
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
