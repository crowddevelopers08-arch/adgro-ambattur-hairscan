"use client"

import { BadgeCheck, Building2, CreditCard, Headphones, HeartHandshake, Smartphone, FlaskConical, Leaf, Zap, Award, Phone, CheckCircle2, ShieldCheck } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const treatmentImages = [
  { src: "/one.jpg", alt: "Adgro hair treatment result one" },
  { src: "/two.jpg", alt: "Adgro hair treatment result two" },
  { src: "/three.jpg", alt: "Adgro hair treatment result three" },
  { src: "/four.jpg", alt: "Adgro hair treatment result four" },
  { src: "/five.jpg", alt: "Adgro hair treatment result five" },
]

interface InfoSectionProps {
  onStartScan: () => void
}

export function InfoSection({ onStartScan }: InfoSectionProps) {
  const RED = "#ea2424"

  return (
    <div style={{ fontFamily: "var(--font-outfit, 'Outfit', sans-serif)", background: "#fff", color: "#1a1a1a" }}>
      <style>{`
        /* ── Layout helpers ── */
        .is-grid-3  { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .is-grid-2  { display:grid; grid-template-columns:repeat(2,1fr); gap:64px; align-items:center; }
        .is-grid-4  { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; }
        .is-pad     { padding:64px 20px; }
        .is-pad-sm  { padding:48px 20px; }
        .is-cta-btns{ display:flex; flex-wrap:wrap; gap:14px; justify-content:center; }
        .is-cta-btn { width:auto; }
        .is-images  { max-width:760px; margin:0 auto 36px; }
        .is-image   { width:100%; height:360px; object-fit:cover; border-radius:24px; border:1px solid rgba(234,36,36,0.15); box-shadow:0 8px 32px rgba(0,0,0,0.1); }
        .is-image-frame { position:relative; overflow:hidden; border-radius:26px; background:linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,241,236,0.72)); padding:10px; border:1px solid rgba(234,36,36,0.16); box-shadow:0 22px 70px rgba(83,27,20,0.13); }
        .is-image-label { position:absolute; bottom:22px; left:22px; background:rgba(234,36,36,0.9); color:#fff; font-size:11px; font-weight:800; padding:5px 12px; border-radius:999px; letter-spacing:0.08em; text-transform:uppercase; box-shadow:0 8px 22px rgba(234,36,36,0.24); }
        .is-carousel-nav { height:42px !important; width:42px !important; border-radius:999px !important; border:1px solid rgba(234,36,36,0.22) !important; background:rgba(255,255,255,0.92) !important; color:#ea2424 !important; box-shadow:0 12px 32px rgba(83,27,20,0.14) !important; }
        .is-step-card { background:#fff; border:1px solid #eee; border-radius:24px; padding:36px 30px; position:relative; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.04); transition:all 0.3s ease; }
        .is-step-card:hover { transform:translateY(-4px); box-shadow:0 16px 48px rgba(0,0,0,0.1); border-color:rgba(234,36,36,0.2); }
        .is-benefit-card { display:flex; gap:16px; background:#fff; border:1px solid #eee; border-radius:16px; padding:22px 24px; box-shadow:0 2px 12px rgba(0,0,0,0.04); transition:all 0.2s ease; }
        .is-benefit-card:hover { border-color:rgba(234,36,36,0.2); box-shadow:0 8px 28px rgba(234,36,36,0.08); }
        .is-stat-card { background:#fff; border:1px solid #eee; border-radius:20px; padding:32px 20px; text-align:center; position:relative; overflow:hidden; transition:all 0.3s ease; box-shadow:0 4px 16px rgba(0,0,0,0.04); }
        .is-stat-card:hover { transform:translateY(-3px); box-shadow:0 12px 40px rgba(234,36,36,0.1); border-color:rgba(234,36,36,0.2); }

        @media (max-width:1024px) { .is-grid-4 { grid-template-columns:repeat(2,1fr); } }
        @media (max-width:768px)  {
          .is-pad { padding:48px 16px; }
          .is-pad-sm { padding:36px 16px; }
          .is-grid-3 { grid-template-columns:1fr; }
          .is-grid-2 { grid-template-columns:1fr; gap:40px; }
          .is-grid-4 { grid-template-columns:repeat(2,1fr); gap:14px; }
          .is-images { max-width:520px; }
          .is-image  { height:280px; }
          .is-carousel-nav { display:none !important; }
        }
        @media (max-width:480px)  {
          .is-pad { padding:36px 14px; }
          .is-pad-sm { padding:28px 14px; }
          .is-grid-4 { grid-template-columns:1fr 1fr; gap:12px; }
          .is-cta-btns { flex-direction:column; align-items:stretch; }
          .is-cta-btn  { justify-content:center; }
          .is-images   { max-width:320px; }
          .is-image    { height:240px; }
        }
      `}</style>

      {/* ══ SECTION 1 – INTRO ══ */}
      <section className="is-pad" style={{ position: "relative", overflow: "hidden", background: "#fafafa" }}>
        {/* BG: cross dot pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.15) 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: 0.4, pointerEvents: "none" }} />
        {/* BG: large red radial top-left */}
        <div style={{ position: "absolute", top: "-100px", left: "-80px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.07) 0%, transparent 65%)", filter: "blur(48px)", pointerEvents: "none" }} />
        {/* BG: soft glow center */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(234,36,36,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
        {/* BG: decorative arc bottom-right */}
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.1)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "-100px", width: 400, height: 400, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.06)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          {/* Label */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            background: "rgba(234,36,36,0.06)", border: "1px solid rgba(234,36,36,0.18)",
            borderRadius: "100px", padding: "5px 14px",
            fontSize: "12px", fontWeight: 700, color: RED,
            textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: "28px",
          }}>
            <Award style={{ width: 13, height: 13 }} />
            97% Success Rate With Expert-Led Hair Care
          </div>

          <Carousel className="is-images" opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {treatmentImages.map((image, index) => (
                <CarouselItem key={image.src} className="basis-full md:basis-1/2">
                  <div className="is-image-frame">
                    <img src={image.src} alt={image.alt} className="is-image" />
                    <div className="is-image-label">Result {index + 1}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="is-carousel-nav -left-5" />
            <CarouselNext className="is-carousel-nav -right-5" />
          </Carousel>

          <h2 style={{ fontSize: "clamp(1.8rem, 4.5vw, 3rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "20px", letterSpacing: "-0.025em", color: "#1a1a1a" }}>
            Hair Fall Problems?{" "}
            <span style={{ background: "linear-gradient(135deg, #ea2424, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Adgro Hair Ambattur
            </span>{" "}
            Has the Solution!
          </h2>

          <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#6b6b6b", maxWidth: "640px", margin: "0 auto 0" }}>
            Is hair fall increasing every day? Using products but seeing no results? Without understanding the root cause,
            it&apos;s a waste to keep trying. At Adgro Hair Ambattur, we identify the{" "}
            <strong style={{ color: RED, fontWeight: 700 }}>real reason</strong> behind your hair loss — online, instantly.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,36,36,0.2), transparent)" }} />

      {/* ══ SECTION 2 – 3-STEP PROCESS ══ */}
      <section className="is-pad" style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
        {/* BG: diagonal mesh lines */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg, rgba(234,36,36,0.03) 0px, rgba(234,36,36,0.03) 1px, transparent 1px, transparent 40px)", pointerEvents: "none" }} />
        {/* BG: large concentric rings center */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }}>
          {[600, 800, 1000].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: s, height: s, top: "50%", left: "50%", transform: "translate(-50%,-50%)", borderRadius: "50%", border: `1px solid rgba(234,36,36,${0.05 - i * 0.012})` }} />
          ))}
        </div>
        {/* BG: glow top-right */}
        <div style={{ position: "absolute", top: "-60px", right: "-40px", width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.06) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(234,36,36,0.06)", border: "1px solid rgba(234,36,36,0.15)",
              borderRadius: "100px", padding: "4px 14px",
              fontSize: "11px", fontWeight: 700, color: RED,
              textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px",
            }}>How It Works</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#1a1a1a" }}>
              Three Simple Steps to{" "}
              <span style={{ background: "linear-gradient(135deg, #ea2424, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Healthier Hair
              </span>
            </h2>
          </div>

          <div className="is-grid-3">
            {[
              {
                icon: <Smartphone style={{ width: 26, height: 26, color: RED }} />,
                step: "01", title: "Scan It Yourself Online 📱",
                desc: "Wherever you are, analyze your hair using your phone and instantly view a personalized report designed just for you.",
                points: ["Works on any smartphone", "Instant AI analysis", "No appointment needed"],
              },
              {
                icon: <FlaskConical style={{ width: 26, height: 26, color: RED }} />,
                step: "02", title: "Get the Right Treatment 🔬",
                desc: "Growth Refactor, GFC, or Hair Transplant? We guide you to the right treatment, decided scientifically based on your condition.",
                points: ["FDA-approved therapies", "Scientific diagnosis", "Stage-wise treatment plan"],
              },
              {
                icon: <Leaf style={{ width: 26, height: 26, color: RED }} />,
                step: "03", title: "Natural Solutions Too 🌿",
                desc: "Not every treatment is necessary. Simple natural solutions with proper doctor guidance to improve hair health.",
                points: ["Doctor-guided advice", "Natural alternatives", "Lifestyle recommendations"],
              },
            ].map((item, i) => (
              <div key={i} className="is-step-card">
                {/* Top gradient line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${RED}, rgba(234,36,36,0.1))` }} />
                {/* Step watermark */}
                <div style={{ position: "absolute", top: 20, right: 22, fontSize: "4.5rem", fontWeight: 900, color: "rgba(234,36,36,0.05)", lineHeight: 1, userSelect: "none", fontFamily: "inherit" }}>{item.step}</div>

                {/* Icon */}
                <div style={{
                  width: 52, height: 52, borderRadius: "14px",
                  border: "1px solid rgba(234,36,36,0.18)",
                  background: "rgba(234,36,36,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  {item.icon}
                </div>

                <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "10px", color: "#1a1a1a" }}>{item.title}</h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: "#6b6b6b", marginBottom: "20px" }}>{item.desc}</p>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                  {item.points.map((pt, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "#4a4a4a", fontWeight: 500 }}>
                      <CheckCircle2 style={{ width: 15, height: 15, color: RED, flexShrink: 0 }} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,36,36,0.2), transparent)" }} />

      {/* ══ SECTION 3 – BENEFITS (2-col) ══ */}
      <section className="is-pad" style={{ background: "#fafafa", position: "relative", overflow: "hidden" }}>
        {/* BG: soft vertical gradient left stripe */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: "35%", background: "linear-gradient(90deg, rgba(234,36,36,0.03) 0%, transparent 100%)", pointerEvents: "none" }} />
        {/* BG: radial glow right */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 55% 70% at 85% 50%, rgba(234,36,36,0.06) 0%, transparent 55%)", pointerEvents: "none" }} />
        {/* BG: grid dots */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.12) 1px, transparent 1px)", backgroundSize: "40px 40px", opacity: 0.3, pointerEvents: "none" }} />
        {/* BG: large ring bottom-left */}
        <div style={{ position: "absolute", bottom: "-80px", left: "-80px", width: 360, height: 360, borderRadius: "50%", border: "1.5px solid rgba(234,36,36,0.08)", pointerEvents: "none" }} />
        {/* BG: small floating square */}
        <div className="animate-float" style={{ position: "absolute", top: "15%", right: "5%", width: 40, height: 40, borderRadius: "10px", border: "1.5px solid rgba(234,36,36,0.12)", transform: "rotate(22deg)", pointerEvents: "none", background: "rgba(234,36,36,0.03)" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div className="is-grid-2">
            {/* Left */}
            <div>
              <div style={{
                display: "inline-block",
                background: "rgba(234,36,36,0.06)", border: "1px solid rgba(234,36,36,0.15)",
                borderRadius: "100px", padding: "4px 14px",
                fontSize: "11px", fontWeight: 700, color: RED,
                textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "20px",
              }}>Your Benefits</div>

              <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.18, letterSpacing: "-0.025em", marginBottom: "18px", color: "#1a1a1a" }}>
                What Will You Get at{" "}
                <span style={{ background: "linear-gradient(135deg, #ea2424, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Adgro Hair Ambattur?
                </span>
              </h2>
              <p style={{ color: "#6b6b6b", lineHeight: 1.8, fontSize: "0.98rem", marginBottom: "28px" }}>
                Every client gets a tailored experience — no generic solutions, only what works for your specific hair condition.
              </p>

              {/* Decorative bar */}
              <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                <div style={{ width: 56, height: 4, borderRadius: 4, background: RED }} />
                <div style={{ width: 28, height: 4, borderRadius: 4, background: "rgba(234,36,36,0.3)" }} />
                <div style={{ width: 14, height: 4, borderRadius: 4, background: "rgba(234,36,36,0.1)" }} />
              </div>
            </div>

            {/* Right */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {[
                { icon: <Zap style={{ width: 20, height: 20, color: RED }} />, title: "Fast & Accurate Results", desc: "Using the latest AI technology, we identify the cause of your hair loss with precision and speed." },
                { icon: <HeartHandshake style={{ width: 20, height: 20, color: RED }} />, title: "Personalized Treatment Plans", desc: "Special plans tailored for your exact hair type — no generic advice, only what works for you." },
                { icon: <Award style={{ width: 20, height: 20, color: RED }} />, title: "Expert Medical Guidance", desc: "Home remedies or advanced treatments — professional doctor advice at every step of the journey." },
              ].map((item, i) => (
                <div key={i} className="is-benefit-card">
                  <div style={{
                    width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                    border: "1px solid rgba(234,36,36,0.18)",
                    background: "rgba(234,36,36,0.06)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "5px", color: "#1a1a1a" }}>{item.title}</p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#6b6b6b" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,36,36,0.2), transparent)" }} />

      {/* ══ SECTION 4 – STATS ══ */}
      <section className="is-pad" style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
        {/* BG: wave SVG top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: 60, display: "block" }}>
            <path d="M0,0 C360,60 720,0 1080,40 C1260,60 1380,20 1440,30 L1440,0 L0,0 Z" fill="rgba(234,36,36,0.03)" />
          </svg>
        </div>
        {/* BG: two large spinning rings */}
        <div className="animate-spin-slow" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 900, borderRadius: "50%", border: "1px dashed rgba(234,36,36,0.05)", pointerEvents: "none" }} />
        <div className="animate-spin-slow-rev" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 680, height: 680, borderRadius: "50%", border: "1px dashed rgba(234,36,36,0.04)", pointerEvents: "none" }} />
        {/* BG: center radial glow */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(234,36,36,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />
        {/* BG: floating dots */}
        <div className="animate-drift" style={{ position: "absolute", top: "20%", left: "4%", width: 16, height: 16, borderRadius: "50%", background: "rgba(234,36,36,0.15)", boxShadow: "0 0 12px rgba(234,36,36,0.2)", pointerEvents: "none" }} />
        <div className="animate-drift2" style={{ position: "absolute", bottom: "25%", right: "4%", width: 12, height: 12, borderRadius: "50%", background: "rgba(234,36,36,0.12)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{
              display: "inline-block",
              background: "rgba(234,36,36,0.06)", border: "1px solid rgba(234,36,36,0.15)",
              borderRadius: "100px", padding: "4px 14px",
              fontSize: "11px", fontWeight: 700, color: RED,
              textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "14px",
            }}>Why Choose Us</div>
            <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.025em", color: "#1a1a1a" }}>
              What Makes{" "}
              <span style={{ background: "linear-gradient(135deg, #ea2424, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Adgro Hair Ambattur
              </span>{" "}
              Different?
            </h2>
          </div>

          <div className="is-grid-4">
            {[
              { icon: <ShieldCheck style={{ width: 32, height: 32, color: RED }} />, stat: "97%", sub: "Success Rate", desc: "Treatment journeys focused on clear outcomes and reliable follow-up." },
              { icon: <Building2 style={{ width: 32, height: 32, color: RED }} />, stat: "5+", sub: "Years Of Experience", desc: "Experienced hair-care guidance for common Indian hair concerns." },
              { icon: <HeartHandshake style={{ width: 32, height: 32, color: RED }} />, stat: "2,000+", sub: "Happy Patients", desc: "Patient journeys supported with expert-guided hair care." },
              { icon: <BadgeCheck style={{ width: 32, height: 32, color: RED }} />, stat: "10+", sub: "Certified Doctors", desc: "Consultations and treatment plans guided by certified doctors." },
            ].map((item, i) => (
              <div key={i} className="is-stat-card">
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${RED}, rgba(234,36,36,0.1))` }} />
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px",
                  border: "1.5px solid rgba(234,36,36,0.2)",
                  background: "rgba(234,36,36,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {item.icon}
                </div>
                <p style={{ fontSize: "1.6rem", fontWeight: 900, color: RED, lineHeight: 1, marginBottom: "4px" }}>{item.stat}</p>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1a1a1a", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{item.sub}</p>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#6b6b6b" }}>✓ {item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,36,36,0.2), transparent)" }} />

      {/* ══ SECTION 5 – CTA ══ */}
      <section className="is-pad-sm" style={{ position: "relative", overflow: "hidden", background: "#fafafa" }}>
        {/* BG: dot pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.12) 1px, transparent 1px)", backgroundSize: "32px 32px", opacity: 0.35, pointerEvents: "none" }} />
        {/* BG: large blobs */}
        <div className="animate-drift" style={{ position: "absolute", top: "-80px", left: "-60px", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.07) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div className="animate-drift2" style={{ position: "absolute", bottom: "-60px", right: "-40px", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.06) 0%, transparent 65%)", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{
          maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1,
          background: "#fff",
          border: "1.5px solid rgba(234,36,36,0.15)",
          borderRadius: "28px",
          padding: "52px 40px",
          textAlign: "center",
          boxShadow: "0 16px 72px rgba(0,0,0,0.08), 0 0 0 4px rgba(234,36,36,0.04)",
          overflow: "hidden",
        }}>
          {/* Top gradient bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #ea2424, #f87171, #ea2424)" }} />
          {/* Card inner bg decoration */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.08)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.05)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 180, height: 180, borderRadius: "50%", border: "1px solid rgba(234,36,36,0.07)", pointerEvents: "none" }} />
          {/* Corner decorations */}
          <div style={{ position: "absolute", top: 20, right: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(234,36,36,0.04)", filter: "blur(20px)" }} />
          <div style={{ position: "absolute", bottom: 20, left: 20, width: 60, height: 60, borderRadius: "50%", background: "rgba(234,36,36,0.04)", filter: "blur(16px)" }} />

          <div style={{
            width: 64, height: 64, borderRadius: "50%",
            background: "linear-gradient(135deg, #ea2424, #c91f1f)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: "0 8px 24px rgba(234,36,36,0.3)",
          }}>
            <Phone style={{ width: 28, height: 28, color: "#fff" }} />
          </div>

          <h2 style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: "14px", color: "#1a1a1a" }}>
            Ready to{" "}
            <span style={{ background: "linear-gradient(135deg, #ea2424, #f87171)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Restore Your Hair?
            </span>
          </h2>
          <p style={{ color: "#6b6b6b", marginBottom: "16px", fontSize: "1rem", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto 16px" }}>
            At Adgro Hair Ambattur, we understand Indian hair problems with a 97% success rate, 5+ years of experience, 2,000+ happy patients, and 10+ certified doctors.
          </p>

          {/* Dot divider */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", margin: "24px auto" }}>
            <div style={{ height: "1px", width: 50, background: "linear-gradient(to right, transparent, rgba(234,36,36,0.4))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: RED, boxShadow: "0 0 8px rgba(234,36,36,0.5)" }} />
            <div style={{ height: "1px", width: 50, background: "linear-gradient(to left, transparent, rgba(234,36,36,0.4))" }} />
          </div>

          <div className="is-cta-btns">
            <a
              href="tel:+917409256789"
              className="is-cta-btn"
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                background: "linear-gradient(135deg, #ea2424, #c91f1f)",
                color: "#fff",
                border: "none", borderRadius: "100px",
                padding: "16px 36px", fontSize: "1rem", fontWeight: 700,
                textDecoration: "none",
                boxShadow: "0 8px 28px rgba(234,36,36,0.3)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 12px 36px rgba(234,36,36,0.4)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 28px rgba(234,36,36,0.3)" }}
            >
              <Phone style={{ width: 20, height: 20 }} />
              Call +91 7409256789
            </a>
          </div>
          <div style={{ marginTop: "22px", color: "#6b6b6b", fontSize: "0.86rem", lineHeight: 1.7 }}>
            <p style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Adgro Hair Ambattur</p>
            <p>Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053</p>
            <p>
              <a href="mailto:customercare@adgrohairambattur.in" style={{ color: RED, textDecoration: "none", fontWeight: 700 }}>customercare@adgrohairambattur.in</a>
            </p>
          </div>
          <p style={{ marginTop: "18px", fontSize: "0.82rem", color: "rgba(234,36,36,0.5)", fontStyle: "italic" }}>
            A call... for a clear solution!
          </p>
        </div>
      </section>

      {/* Bottom divider */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(234,36,36,0.3), transparent)" }} />
    </div>
  )
}
