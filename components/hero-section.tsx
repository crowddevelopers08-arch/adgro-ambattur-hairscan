"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BadgeCheck, Building2, CreditCard, Headphones, HeartHandshake, Phone, Scan, ShieldCheck, Sparkles, ChevronRight } from "lucide-react"
import type { FormData } from "./form-modal"

interface HeroSectionProps {
  onStartScan: (data: FormData) => void
}

export function HeroSection({ onStartScan }: HeroSectionProps) {
  const [showForm, setShowForm] = useState(false)
  const [problem, setProblem] = useState<FormData["problem"]>("")
  const [error, setError] = useState("")

  const validate = () => {
    if (!problem) { setError("Please select a concern"); return false }
    setError(""); return true
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    onStartScan({ name: "", phone: "", problem })
    setShowForm(false)
  }

  const stats = [
    { icon: ShieldCheck, value: "97%", label: "Success Rate" },
    { icon: Building2, value: "5+", label: "Years Of Experience" },
    { icon: HeartHandshake, value: "2,000+", label: "Happy Patients" },
    { icon: BadgeCheck, value: "10+", label: "Certified Doctors" },
  ]

  return (
    <>
      {/* ══════════════════════════════════════════
          STICKY NAVBAR
      ══════════════════════════════════════════ */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(234,36,36,0.1)",
        boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src="/adgrologo.png" alt="Adgro Hair Ambattur" style={{ height: 42, width: "auto", objectFit: "contain" }} />
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ fontSize: "0.8rem", color: "#6b6b6b", fontWeight: 500, display: "none" }} className="sm:block">Free AI Hair Analysis</span>
            <a href="tel:+917409256789" style={{
              display: "flex", alignItems: "center", gap: "7px",
              background: "linear-gradient(135deg,#ea2424,#c91f1f)", color: "#fff",
              borderRadius: "100px", padding: "9px 20px",
              fontSize: "0.875rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 4px 16px rgba(234,36,36,0.3)",
              transition: "all 0.2s",
            }}>
              <Phone style={{ width: 14, height: 14 }} />
              +91 7409256789
            </a>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="hair-hero-bg" style={{ position: "relative", overflow: "hidden", padding: "30px 20px 72px", background: "#fff", fontFamily: "var(--font-outfit,'Outfit',sans-serif)" }}>
        <style>{`
          .hero-stats-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:14px; width:100%; max-width:980px; margin:0 auto; }
          .hero-stat-card { min-height:146px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; padding:22px 14px; text-align:center; border-radius:20px; border:1px solid rgba(234,36,36,0.16); background:linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,245,241,0.82)); box-shadow:0 18px 54px rgba(83,27,20,0.10), inset 0 1px 0 rgba(255,255,255,0.92); backdrop-filter:blur(14px); transition:transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; position:relative; overflow:hidden; }
          .hero-stat-card::before { content:""; position:absolute; inset:0; background:radial-gradient(circle at 20% 0%,rgba(234,36,36,0.10),transparent 7rem), radial-gradient(circle at 90% 100%,rgba(13,148,136,0.08),transparent 7rem); pointer-events:none; }
          .hero-stat-card:hover { transform:translateY(-5px); border-color:rgba(234,36,36,0.28); box-shadow:0 26px 68px rgba(83,27,20,0.16), 0 0 0 4px rgba(234,36,36,0.04); }
          .hero-stat-icon { position:relative; width:46px; height:46px; border-radius:16px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,rgba(234,36,36,0.12),rgba(255,255,255,0.84)); border:1px solid rgba(234,36,36,0.18); box-shadow:0 12px 28px rgba(234,36,36,0.12); flex-shrink:0; }
          .hero-stat-value { position:relative; margin:2px 0 0; font-size:clamp(1.15rem,2vw,1.45rem); font-weight:900; line-height:1; color:#161313; font-variant-numeric:tabular-nums; overflow-wrap:anywhere; }
          .hero-stat-label { position:relative; margin:0; min-height:2.2em; display:flex; align-items:center; justify-content:center; font-size:0.72rem; font-weight:800; line-height:1.18; color:#6b5f5a; text-transform:uppercase; letter-spacing:0.06em; }
          @media (max-width:760px) { .hero-stats-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; max-width:520px; } .hero-stat-card { min-height:132px; padding:18px 10px; border-radius:18px; } }
          @media (max-width:380px) { .hero-stats-grid { grid-template-columns:1fr; } .hero-stat-card { min-height:112px; flex-direction:row; justify-content:flex-start; text-align:left; padding:16px; } .hero-stat-label { min-height:auto; justify-content:flex-start; } }
        `}</style>

        {/* ── BG LAYER 1: Large mesh gradient base ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 70% -10%, rgba(234,36,36,0.09) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 110%, rgba(234,36,36,0.06) 0%, transparent 55%)",
        }} />

        {/* ── BG LAYER 2: Dot grid ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.18) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          opacity: 0.5,
        }} />

        {/* ── BG LAYER 3: Large decorative concentric rings (top-right) ── */}
        <div style={{ position: "absolute", top: "-120px", right: "-120px", pointerEvents: "none" }}>
          {[300, 420, 540, 660].map((size, i) => (
            <div key={i} style={{
              position: "absolute",
              width: size, height: size,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              border: `1px solid rgba(234,36,36,${0.12 - i * 0.025})`,
            }} />
          ))}
          {/* Filled core glow */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 180, height: 180, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,36,36,0.14) 0%, transparent 70%)",
            filter: "blur(24px)",
          }} />
        </div>

        {/* ── BG LAYER 4: Decorative rings (bottom-left) ── */}
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", pointerEvents: "none" }}>
          {[200, 300, 400].map((size, i) => (
            <div key={i} style={{
              position: "absolute",
              width: size, height: size,
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              border: `1px solid rgba(234,36,36,${0.09 - i * 0.025})`,
            }} />
          ))}
        </div>

        {/* ── BG LAYER 5: Morphing red blob top-right ── */}
        <div className="animate-morph animate-drift" style={{
          position: "absolute", top: "-60px", right: "5%",
          width: 340, height: 340, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(234,36,36,0.1) 0%, rgba(234,36,36,0.04) 50%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        {/* ── BG LAYER 6: Morphing blob bottom-left ── */}
        <div className="animate-morph animate-drift2" style={{
          position: "absolute", bottom: "0px", left: "0%",
          width: 260, height: 260, pointerEvents: "none",
          background: "radial-gradient(circle, rgba(234,36,36,0.07) 0%, transparent 65%)",
          filter: "blur(32px)",
          animationDelay: "4s",
        }} />

        {/* ── BG LAYER 7: Orbiting small dot top-right ── */}
        <div style={{ position: "absolute", top: "18%", right: "12%", pointerEvents: "none" }}>
          <div className="animate-orbit" style={{
            width: 10, height: 10, borderRadius: "50%",
            background: "#ea2424", opacity: 0.5,
            boxShadow: "0 0 12px rgba(234,36,36,0.6)",
          }} />
        </div>
        <div style={{ position: "absolute", top: "60%", left: "8%", pointerEvents: "none" }}>
          <div className="animate-orbit-rev" style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "#ea2424", opacity: 0.35,
            boxShadow: "0 0 8px rgba(234,36,36,0.5)",
          }} />
        </div>

        {/* ── BG LAYER 8: Floating geometric shapes ── */}
        {/* Top-left square rotated */}
        <div className="animate-float" style={{
          position: "absolute", top: "10%", left: "5%", pointerEvents: "none",
          width: 48, height: 48, borderRadius: "10px",
          border: "1.5px solid rgba(234,36,36,0.18)",
          transform: "rotate(20deg)",
          background: "rgba(234,36,36,0.04)",
        }} />
        {/* Small triangle-ish shape */}
        <div className="animate-float-delayed" style={{
          position: "absolute", top: "20%", right: "18%", pointerEvents: "none",
          width: 32, height: 32, borderRadius: "6px",
          border: "1.5px solid rgba(234,36,36,0.15)",
          transform: "rotate(-15deg)",
          background: "rgba(234,36,36,0.04)",
        }} />
        {/* Bottom-right square */}
        <div className="animate-drift" style={{
          position: "absolute", bottom: "18%", right: "8%", pointerEvents: "none",
          width: 56, height: 56, borderRadius: "14px",
          border: "1.5px solid rgba(234,36,36,0.12)",
          transform: "rotate(10deg)",
          background: "rgba(234,36,36,0.03)",
        }} />
        {/* Small circle mid-left */}
        <div className="animate-drift2" style={{
          position: "absolute", top: "50%", left: "3%", pointerEvents: "none",
          width: 22, height: 22, borderRadius: "50%",
          background: "rgba(234,36,36,0.12)",
          boxShadow: "0 0 16px rgba(234,36,36,0.2)",
        }} />

        {/* ── BG LAYER 9: Spinning large ring outline ── */}
        <div className="animate-spin-slow" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 900, height: 900,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          border: "1px dashed rgba(234,36,36,0.06)",
          pointerEvents: "none",
        }} />
        <div className="animate-spin-slow-rev" style={{
          position: "absolute", top: "50%", left: "50%",
          width: 700, height: 700,
          transform: "translate(-50%,-50%)",
          borderRadius: "50%",
          border: "1px dashed rgba(234,36,36,0.05)",
          pointerEvents: "none",
        }} />

        {/* ── BG LAYER 10: SVG wave bottom ── */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, pointerEvents: "none", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: 80, display: "block" }}>
            <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40 L1440,80 L0,80 Z" fill="rgba(234,36,36,0.04)" />
            <path d="M0,60 C200,20 400,80 600,50 C800,20 1000,70 1200,50 C1300,40 1380,55 1440,60 L1440,80 L0,80 Z" fill="rgba(234,36,36,0.03)" />
          </svg>
        </div>

        {/* ── BG LAYER 11: Horizontal light sweep ── */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(255,245,245,0.4) 0%, transparent 50%, rgba(255,245,245,0.2) 100%)",
        }} />

        {/* Hero logo row */}
        <div style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1100px",
          margin: "0 auto 28px",
          display: "flex",
          justifyContent: "center",
        }}>
          <img
            src="/adgrologo.png"
            alt="Adgro Hair Ambattur"
            style={{ height: 74, width: "auto", maxWidth: "min(300px, 72vw)", objectFit: "contain" }}
          />
        </div>

        {/* ══ CONTENT ══ */}
        <div style={{ position: "relative", zIndex: 10, maxWidth: "860px", margin: "0 auto", textAlign: "center" }}>
          {/* AI Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(255,255,255,0.9)",
            border: "1px solid rgba(234,36,36,0.25)",
            borderRadius: "100px",
            padding: "6px 16px 6px 8px",
            marginBottom: "28px",
            boxShadow: "0 4px 20px rgba(234,36,36,0.1), 0 0 0 4px rgba(234,36,36,0.04)",
            backdropFilter: "blur(8px)",
          }}>
            <span style={{
              background: "linear-gradient(135deg,#ea2424,#c91f1f)", color: "#fff",
              borderRadius: "100px", padding: "3px 10px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>NEW</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#ea2424", display: "flex", alignItems: "center", gap: "5px" }}>
              <Sparkles style={{ width: 13, height: 13 }} />
              AI-Powered Hair Analysis
            </span>
          </div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)",
            fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-0.03em", color: "#1a1a1a",
            marginBottom: "22px",
          }}>
            Adgro Hair Ambattur{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ background: "linear-gradient(135deg,#ea2424 0%,#ff6b6b 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Understands
              </span>
              <span style={{
                position: "absolute", bottom: "-4px", left: 0, right: 0,
                height: "3px", borderRadius: "2px",
                background: "linear-gradient(90deg, #ea2424, rgba(234,36,36,0.15))",
              }} />
            </span>{" "}
            Indian Hair Problems
          </h1>

          {/* Sub text */}
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)", lineHeight: 1.8,
            color: "#5a5a5a", maxWidth: "600px",
            margin: "0 auto 40px", fontWeight: 400,
          }}>
            Trusted by <strong style={{ color: "#1a1a1a", fontWeight: 700 }}>2,000+ happy patients</strong> with{" "}
            <strong style={{ color: "#1a1a1a", fontWeight: 700 }}>10+ certified doctors</strong>, 5+ years of experience, and a 97% success rate.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "64px" }}>
            <button
              onClick={() => setShowForm(true)}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "linear-gradient(135deg,#ea2424 0%,#c91f1f 100%)",
                color: "#fff", border: "none", borderRadius: "100px",
                padding: "17px 38px", fontSize: "1.05rem", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 8px 32px rgba(234,36,36,0.38), 0 2px 8px rgba(234,36,36,0.2), inset 0 1px 0 rgba(255,255,255,0.2)",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-2px)"; b.style.boxShadow = "0 14px 44px rgba(234,36,36,0.48), 0 4px 12px rgba(234,36,36,0.25), inset 0 1px 0 rgba(255,255,255,0.2)" }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(0)"; b.style.boxShadow = "0 8px 32px rgba(234,36,36,0.38), 0 2px 8px rgba(234,36,36,0.2), inset 0 1px 0 rgba(255,255,255,0.2)" }}
            >
              <Scan style={{ width: 20, height: 20 }} />
              Start Free Scan
              <ChevronRight style={{ width: 18, height: 18, opacity: 0.8 }} />
            </button>

            <a
              href="tel:+917409256789"
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "rgba(255,255,255,0.9)", color: "#1a1a1a",
                border: "1.5px solid #e0e0e0", borderRadius: "100px",
                padding: "16px 32px", fontSize: "1.05rem", fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                backdropFilter: "blur(8px)",
                transition: "all 0.25s",
              }}
              onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "#ea2424"; a.style.color = "#ea2424"; a.style.boxShadow = "0 4px 24px rgba(234,36,36,0.15)" }}
              onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.borderColor = "#e0e0e0"; a.style.color = "#1a1a1a"; a.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)" }}
            >
              <Phone style={{ width: 18, height: 18 }} />
              Call Now
            </a>
          </div>

          {/* Stats Row */}
          <div className="hero-stats-grid">
            {stats.map(({ icon: Icon, value, label }, i) => (
              <div
                key={i}
                className="hero-stat-card"
              >
                <div className="hero-stat-icon">
                  <Icon style={{ width: 20, height: 20, color: "#ea2424" }} />
                </div>
                <div style={{ position: "relative" }}>
                  <p className="hero-stat-value">{value}</p>
                  <p className="hero-stat-label">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SCAN FORM DIALOG ══ */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent
          className="border-0 bg-white sm:max-w-md"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.14), 0 0 0 1px rgba(234,36,36,0.1)", borderRadius: "24px", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg,#ea2424,#f87171,#ea2424)" }} />
          {/* Dialog background decoration */}
          <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.06), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.04), transparent 70%)", pointerEvents: "none" }} />

          <DialogHeader className="pt-4" style={{ position: "relative" }}>
            <div style={{
              width: 52, height: 52, borderRadius: "14px",
              background: "rgba(234,36,36,0.08)", border: "1px solid rgba(234,36,36,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
            }}>
              <Scan style={{ width: 24, height: 24, color: "#ea2424" }} />
            </div>
            <DialogTitle className="text-center text-2xl font-bold" style={{ fontWeight: 800, color: "#1a1a1a" }}>
              Start Hair Analysis
            </DialogTitle>
            <DialogDescription className="text-center text-sm" style={{ color: "#6b6b6b" }}>
              Select your concern to begin the AI scan
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="mt-2 flex flex-col gap-5 px-1 pb-2" style={{ position: "relative" }}>
            <div className="flex flex-col gap-2">
              <Label htmlFor="hero-problem" style={{ fontWeight: 600, fontSize: "0.85rem", color: "#1a1a1a" }}>
                Your Hair Concern
              </Label>
              <Select
                value={problem}
                onValueChange={(value: "hair-fall" | "crown-thinning" | "frontal-hair-loss" | "dandruff-scalp-issues" | "low-hair-density") => setProblem(value)}
              >
                <SelectTrigger id="hero-problem" style={{ height: 48, borderRadius: "12px", borderColor: "rgba(234,36,36,0.2)", background: "#fafafa", fontFamily: "inherit" }}>
                  <SelectValue placeholder="Choose a hair concern" />
                </SelectTrigger>
                <SelectContent style={{ borderRadius: "14px" }}>
                  <SelectItem value="hair-fall">Hair Fall</SelectItem>
                  <SelectItem value="crown-thinning">Crown Thinning</SelectItem>
                  <SelectItem value="frontal-hair-loss">Frontal Hair Loss</SelectItem>
                  <SelectItem value="dandruff-scalp-issues">Dandruff / Scalp Issues</SelectItem>
                  <SelectItem value="low-hair-density">Low Hair Density</SelectItem>
                </SelectContent>
              </Select>
              {error && <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#ea2424" }}>{error}</p>}
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "linear-gradient(135deg,#ea2424 0%,#c91f1f 100%)",
                color: "#fff", border: "none", borderRadius: "12px",
                padding: "14px", fontSize: "1rem", fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(234,36,36,0.3)",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                fontFamily: "inherit",
              }}
            >
              <Scan style={{ width: 18, height: 18 }} />
              Continue to Camera
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
