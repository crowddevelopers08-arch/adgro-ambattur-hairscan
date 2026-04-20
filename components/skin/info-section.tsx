"use client"

import { Smartphone, FlaskConical, Leaf, Zap, Users, Award, MapPin, Phone } from "lucide-react"
import { SkinVideoSection } from "./video-section"

interface SkinInfoSectionProps {
  onStartScan: () => void
}

export function SkinInfoSection({ onStartScan: _onStartScan }: SkinInfoSectionProps) {
  return (
    <div style={{ background: "#080b12", color: "#f2f0eb" }}>
      <style>{`
        .info-section { padding: 40px 16px; }
        .info-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .info-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 60px; align-items: center; }
        .info-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .info-cta-card { padding: 36px 32px; }
        .info-cta-btns { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; }
        .info-cta-btn { width: auto; }
        .info-side-images { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; margin: 0 auto 28px; max-width: 560px; }
        .info-side-image { width: 100%; height: 280px; object-fit: cover; border-radius: 16px; border: 1px solid rgba(221,185,90,0.25); box-shadow: 0 6px 24px rgba(0,0,0,0.35); }

        @media (max-width: 1024px) {
          .info-grid-4 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .info-section { padding: 28px 16px; }
          .info-grid-3 { grid-template-columns: 1fr; }
          .info-grid-2 { grid-template-columns: 1fr; gap: 36px; }
          .info-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .info-cta-card { padding: 24px 16px; }
          .info-side-images { max-width: 440px; }
          .info-side-image { height: 240px; }
        }
        @media (max-width: 480px) {
          .info-section { padding: 20px 12px; }
          .info-grid-4 { grid-template-columns: 1fr 1fr; gap: 12px; }
          .info-cta-btns { flex-direction: column; align-items: stretch; }
          .info-cta-btn { justify-content: center; }
          .info-side-images { grid-template-columns: 1fr; gap: 12px; max-width: 280px; }
          .info-side-image { height: 280px; }
        }
      `}</style>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ddb95a55, transparent)" }} />

      <section className="info-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(221,185,90,0.08), transparent)", pointerEvents: "none" }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", border: "1px solid rgba(221,185,90,0.35)", borderRadius: "999px", background: "rgba(221,185,90,0.08)", padding: "6px 18px", fontSize: "13px", fontWeight: 600, color: "#ddb95a", marginBottom: "28px", boxShadow: "0 0 20px rgba(221,185,90,0.1)" }}>
            <Award style={{ width: 14, height: 14 }} />
            Trusted by thousands across Tamil Nadu
          </div>

          <div className="info-side-images">
            <img src="sone.jpg" alt="Skin treatment visual one" className="info-side-image" />
            <img src="stwo.jpg" alt="Skin treatment visual two" className="info-side-image" />
          </div>

          <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1.2, marginBottom: "20px", letterSpacing: "-0.02em" }}>
            Skin Problems?{" "}
            <span style={{ background: "linear-gradient(90deg, #ddb95a, #f5e199)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Bonitaa HQ Has the Right Solution
            </span>
          </h2>

          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#8a8a8a", maxWidth: "680px", margin: "0 auto" }}>
            Are you dealing with acne, pigmentation, dullness, tanning, uneven skin tone, or open pores? Trying random products without knowing what your skin really needs can waste both time and money. At Bonitaa HQ, we help you understand your skin better with an online skin analysis process that identifies the <span style={{ color: "#ddb95a", fontWeight: 600 }}>real concern</span> behind your skin issues.
          </p>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.2), transparent)" }} />

      <SkinVideoSection />

      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ddb95a", marginBottom: "10px" }}>How It Works</p>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>Three Steps to Better Skin Clarity</h2>
          </div>

          <div className="info-grid-3">
            {[
              { icon: <Smartphone style={{ width: 28, height: 28, color: "#ddb95a" }} />, step: "01", title: "Scan It Yourself Online!", desc: "No matter where you are, you can scan and analyse your skin using your phone and instantly access a personalised skin report." },
              { icon: <FlaskConical style={{ width: 28, height: 28, color: "#ddb95a" }} />, step: "02", title: "When It Comes to Treatment... We Guide You Scientifically", desc: "Whether your skin needs Hydra Facial, Chemical Peel, Laser-based treatment, pigmentation care, acne management, or skin glow solutions, we guide you based on your condition." },
              { icon: <Leaf style={{ width: 28, height: 28, color: "#ddb95a" }} />, step: "03", title: "Looking for Simple Care Tips? We Help With That Too", desc: "Not every skin concern needs an advanced procedure immediately. The right skincare routine, lifestyle correction, and doctor-guided home care can make a real difference." },
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(145deg, #0e1118, #0a0d15)", border: "1px solid rgba(221,185,90,0.22)", borderRadius: "20px", padding: "36px 32px", position: "relative", overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(221,185,90,0.08)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)" }} />
                <div style={{ position: "absolute", top: 16, right: 20, fontSize: "56px", fontWeight: 900, color: "rgba(221,185,90,0.07)", lineHeight: 1, userSelect: "none" }}>{item.step}</div>
                <div style={{ width: 56, height: 56, borderRadius: "14px", border: "1px solid rgba(221,185,90,0.3)", background: "rgba(221,185,90,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "22px", boxShadow: "0 0 18px rgba(221,185,90,0.12)" }}>
                  {item.icon}
                </div>

                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "12px", color: "#f2f0eb" }}>{item.title}</h3>
                <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#8a8a8a" }}>{item.desc}</p>
                <div style={{ marginTop: "24px", height: "1px", background: "linear-gradient(90deg, rgba(221,185,90,0.4), transparent)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.2), transparent)" }} />

      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 80% 50%, rgba(221,185,90,0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div className="info-grid-2">
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ddb95a", marginBottom: "14px" }}>Your Benefits</p>
              <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "18px" }}>
                What Will You Get at{" "}
                <span style={{ background: "linear-gradient(90deg, #ddb95a, #f5e199)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Bonitaa HQ?
                </span>
              </h2>
              <p style={{ color: "#8a8a8a", lineHeight: 1.8, fontSize: "1rem" }}>
                Fast and clear skin analysis, personalised guidance, and expert support from basic skincare advice to advanced treatment options.
              </p>
              <div style={{ marginTop: "28px", display: "flex", gap: "8px", alignItems: "center" }}>
                <div style={{ width: 48, height: 3, borderRadius: 4, background: "#ddb95a" }} />
                <div style={{ width: 24, height: 3, borderRadius: 4, background: "rgba(221,185,90,0.4)" }} />
                <div style={{ width: 12, height: 3, borderRadius: 4, background: "rgba(221,185,90,0.2)" }} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { icon: <Zap style={{ width: 18, height: 18, color: "#ddb95a" }} />, title: "Fast & Clear Skin Analysis", desc: "We help identify visible skin concerns with a simple, easy online process." },
                { icon: <Users style={{ width: 18, height: 18, color: "#ddb95a" }} />, title: "Personalised Guidance", desc: "Your skin is different. So the solution should be different too." },
                { icon: <Award style={{ width: 18, height: 18, color: "#ddb95a" }} />, title: "Expert Support", desc: "From basic skincare advice to advanced treatment options, we guide you based on your skin's needs." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", background: "linear-gradient(145deg, #0e1118, #0a0d15)", border: "1px solid rgba(221,185,90,0.18)", borderRadius: "14px", padding: "20px 22px", boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(221,185,90,0.06)" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "10px", flexShrink: 0, border: "1px solid rgba(221,185,90,0.28)", background: "rgba(221,185,90,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "4px", color: "#f2f0eb" }}>{item.title}</p>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.65, color: "#8a8a8a" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.2), transparent)" }} />

      <section className="info-section" style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(221,185,90,0.05), transparent)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "#ddb95a", marginBottom: "10px" }}>Why Choose Us</p>
            <h2 style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
              What Makes{" "}
              <span style={{ background: "linear-gradient(90deg, #ddb95a, #f5e199)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Bonitaa HQ Different?
              </span>
            </h2>
          </div>

          <div className="info-grid-4">
            {[
              { icon: <Award style={{ width: 32, height: 32, color: "#ddb95a" }} />, stat: "97%", sub: "Success Rate", desc: "Guidance focused on clear skin-care outcomes and reliable follow-up." },
              { icon: <Zap style={{ width: 32, height: 32, color: "#ddb95a" }} />, stat: "5+", sub: "Years Of Experience", desc: "Experience in handling concerns commonly seen in Indian skin types." },
              { icon: <Users style={{ width: 32, height: 32, color: "#ddb95a" }} />, stat: "2,000+", sub: "Happy Patients", desc: "Patients supported through their skin and aesthetic care journey." },
              { icon: <MapPin style={{ width: 32, height: 32, color: "#ddb95a" }} />, stat: "10+", sub: "Certified Doctors", desc: "Certified doctors guiding skin analysis, care plans, and next steps." },
            ].map((item, i) => (
              <div key={i} style={{ background: "linear-gradient(160deg, #0e1118, #080b12)", border: "1px solid rgba(221,185,90,0.22)", borderRadius: "20px", padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 4px 30px rgba(0,0,0,0.45), inset 0 1px 0 rgba(221,185,90,0.08)" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)" }} />
                <div style={{ width: 64, height: 64, borderRadius: "50%", margin: "0 auto 18px", border: "1px solid rgba(221,185,90,0.3)", background: "rgba(221,185,90,0.08)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(221,185,90,0.15)" }}>
                  {item.icon}
                </div>

                <p style={{ fontSize: "1.5rem", fontWeight: 900, color: "#ddb95a", lineHeight: 1 }}>{item.stat}</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#f2f0eb", margin: "4px 0 10px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.sub}</p>
                <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "#8a8a8a" }}>- {item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.2), transparent)" }} />

      <section className="info-section" style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(221,185,90,0.08), transparent)", pointerEvents: "none" }} />

        <div className="info-cta-card" style={{ maxWidth: "860px", margin: "0 auto", position: "relative", background: "linear-gradient(145deg, #0e1118, #0a0d15)", border: "1px solid rgba(221,185,90,0.3)", borderRadius: "28px", textAlign: "center", boxShadow: "0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(221,185,90,0.1)" }}>
          <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, transparent, #ddb95a, transparent)", borderRadius: "2px" }} />

          <p style={{ color: "#8a8a8a", lineHeight: 1.8, fontSize: "1rem", marginBottom: "32px", maxWidth: "640px", margin: "0 auto 32px" }}>
            At Bonitaa HQ, we understand that Indian skin faces unique concerns such as tanning, pigmentation, acne marks, excess oil, uneven tone, and sensitivity due to climate, sun exposure, and lifestyle. Through our online skin analysis experience, we help identify possible concerns and guide you toward the right next step.
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "28px" }}>
            <div style={{ height: "1px", width: 48, background: "linear-gradient(90deg, transparent, rgba(221,185,90,0.5))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ddb95a", boxShadow: "0 0 8px rgba(221,185,90,0.8)" }} />
            <div style={{ height: "1px", width: 48, background: "linear-gradient(270deg, transparent, rgba(221,185,90,0.5))" }} />
          </div>

          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Ready to Take Better Care of Your{" "}
            <span style={{ background: "linear-gradient(90deg, #ddb95a, #f5e199)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Skin?
            </span>
          </h2>
          <p style={{ color: "#8a8a8a", marginBottom: "36px", fontSize: "1rem" }}>
            Do not let skin concerns affect your confidence. Start with a better understanding of your skin and take the next step with expert guidance.
          </p>

          <div className="info-cta-btns">
            <a
              href="tel:+917409256789"
              className="info-cta-btn"
              style={{ display: "flex", alignItems: "center", gap: "10px", background: "transparent", color: "#ddb95a", border: "1px solid rgba(221,185,90,0.4)", borderRadius: "12px", padding: "14px 32px", fontSize: "1rem", fontWeight: 700, textDecoration: "none", backdropFilter: "blur(8px)", transition: "all 0.2s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(221,185,90,0.08)"
                e.currentTarget.style.borderColor = "rgba(221,185,90,0.7)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.borderColor = "rgba(221,185,90,0.4)"
              }}
            >
              <Phone style={{ width: 20, height: 20 }} />
              +91 7409256789
            </a>
          </div>
          <div style={{ marginTop: "22px", color: "#8a8a8a", fontSize: "0.86rem", lineHeight: 1.7 }}>
            <p style={{ fontWeight: 700, color: "#f2f0eb", marginBottom: "4px" }}>Adgro Hair Ambattur</p>
            <p>Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053</p>
            <p>
              <a href="mailto:customercare@adgrohairambattur.in" style={{ color: "#ddb95a", textDecoration: "none", fontWeight: 700 }}>customercare@adgrohairambattur.in</a>
            </p>
          </div>

          <p style={{ marginTop: "20px", fontSize: "0.82rem", color: "rgba(221,185,90,0.5)", fontStyle: "italic" }}>
            One scan... for better skin clarity.
          </p>
        </div>
      </section>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, #ddb95a55, transparent)" }} />
    </div>
  )
}
