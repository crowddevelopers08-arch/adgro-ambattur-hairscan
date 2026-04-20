"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ScanLoaderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  capturedImage: string | null
  onComplete: () => void
}

const STEPS = [
  { label: "Initializing AI engine…",          pct: 0  },
  { label: "Detecting hair structure…",        pct: 25 },
  { label: "Analysing texture & density…",    pct: 50 },
  { label: "Processing algorithms…",           pct: 72 },
  { label: "Generating personalised report…", pct: 90 },
  { label: "Analysis complete!",               pct: 100 },
]

export function ScanLoader({ open, onOpenChange, capturedImage, onComplete }: ScanLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [stepLabel, setStepLabel] = useState(STEPS[0].label)

  useEffect(() => {
    if (!open) {
      setProgress(0)
      setIsComplete(false)
      setStepLabel(STEPS[0].label)
      return
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 2.2 + 0.6
        if (next >= 100) {
          clearInterval(interval)
          setIsComplete(true)
          setStepLabel(STEPS[STEPS.length - 1].label)
          return 100
        }
        const step = [...STEPS].reverse().find((s) => s.pct <= next) ?? STEPS[0]
        setStepLabel(step.label)
        return next
      })
    }, 140)

    return () => clearInterval(interval)
  }, [open])

  const RED = "#ea2424"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="border-0 bg-white sm:max-w-sm"
        style={{
          borderRadius: "28px",
          boxShadow: "0 24px 80px rgba(0,0,0,0.16), 0 0 0 1px rgba(234,36,36,0.1)",
          fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
          overflow: "hidden",
          background: "linear-gradient(135deg, #fff 60%, rgba(255,245,245,0.6) 100%)",
        }}
      >
        {/* Top gradient bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: `linear-gradient(90deg, ${RED}, #f87171, ${RED})` }} />
        {/* Decorative bg rings */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: -100, right: -100, width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.04)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.06)", pointerEvents: "none" }} />
        {/* Dot pattern bg */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px", opacity: 0.5, pointerEvents: "none" }} />

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 28px 28px", position: "relative", zIndex: 1 }}>
          <DialogTitle style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1a1a1a", marginBottom: "4px", textAlign: "center" }}>
            AI Hair Analysis
          </DialogTitle>
          <DialogDescription style={{ fontSize: "0.85rem", color: "#6b6b6b", marginBottom: "28px", textAlign: "center" }}>
            Please wait while we analyse your hair
          </DialogDescription>

          {/* Image ring */}
          <div style={{ position: "relative", width: 180, height: 180, marginBottom: "28px" }}>
            {/* Pulsing ring */}
            {!isComplete && (
              <div className="animate-pulse-ring" style={{
                position: "absolute", inset: -8,
                borderRadius: "50%",
                border: `2px solid rgba(234,36,36,0.3)`,
              }} />
            )}
            {/* Outer ring */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "50%",
              border: `3px solid ${isComplete ? "#22c55e" : RED}`,
              boxShadow: `0 0 0 4px ${isComplete ? "rgba(34,197,94,0.1)" : "rgba(234,36,36,0.1)"}`,
              transition: "border-color 0.4s, box-shadow 0.4s",
            }} />
            {/* Photo */}
            <div style={{
              position: "absolute", inset: "6px",
              borderRadius: "50%",
              overflow: "hidden",
              background: "#f5f5f5",
            }}>
              {capturedImage && (
                <img src={capturedImage} alt="Captured" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              )}
            </div>

            {/* Scanning line */}
            {!isComplete && (
              <div style={{ position: "absolute", inset: "6px", borderRadius: "50%", overflow: "hidden", pointerEvents: "none" }}>
                <div
                  className="animate-scan-slow"
                  style={{
                    position: "absolute", left: 0, right: 0, height: "2px",
                    background: `linear-gradient(90deg, transparent, ${RED}, transparent)`,
                    boxShadow: `0 0 12px ${RED}`,
                    opacity: 0.85,
                  }}
                />
              </div>
            )}

            {/* Complete checkmark */}
            {isComplete && (
              <div style={{
                position: "absolute", inset: "6px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 8px 24px rgba(34,197,94,0.4)",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>

          {/* Progress */}
          <div style={{ width: "100%", marginBottom: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <span style={{ fontSize: "0.82rem", color: "#6b6b6b", fontWeight: 500 }}>{stepLabel}</span>
              <span style={{
                fontSize: "0.82rem", fontWeight: 800,
                color: isComplete ? "#22c55e" : RED,
                fontVariantNumeric: "tabular-nums",
              }}>{Math.round(progress)}%</span>
            </div>
            <div style={{ height: "8px", borderRadius: "100px", background: "#f0f0f0", overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: "100px",
                width: `${progress}%`,
                background: isComplete
                  ? "linear-gradient(90deg, #22c55e, #16a34a)"
                  : `linear-gradient(90deg, ${RED}, #f87171)`,
                transition: "width 0.3s ease, background 0.4s",
                position: "relative", overflow: "hidden",
              }}>
                {!isComplete && (
                  <div className="animate-shimmer-x" style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
                  }} />
                )}
              </div>
            </div>
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: "6px", marginBottom: isComplete ? "20px" : "0" }}>
            {STEPS.slice(0, -1).map((s, i) => (
              <div key={i} style={{
                width: progress >= s.pct + 1 ? 20 : 7,
                height: 7, borderRadius: "100px",
                background: progress >= s.pct + 1 ? RED : "#e8e8e8",
                transition: "all 0.3s ease",
              }} />
            ))}
          </div>

          {/* See results button */}
          {isComplete && (
            <button
              onClick={onComplete}
              className="animate-fade-up"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #ea2424, #c91f1f)",
                color: "#fff", border: "none", borderRadius: "14px",
                padding: "16px", fontSize: "1rem", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 28px rgba(234,36,36,0.35)",
                transition: "transform 0.2s, box-shadow 0.2s",
                fontFamily: "inherit",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(234,36,36,0.45)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(234,36,36,0.35)" }}
            >
              View Your Results →
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
