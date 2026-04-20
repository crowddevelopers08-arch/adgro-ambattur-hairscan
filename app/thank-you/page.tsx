import Script from "next/script"
import { CheckCircle2 } from "lucide-react"

export default function ThankYouPage() {
  return (
    <>
      <Script id="meta-pixel-submit-application" strategy="afterInteractive">
        {`fbq('track', 'SubmitApplication');`}
      </Script>
      <main style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
        background: "#f8f8f8",
        fontFamily: "var(--font-outfit, 'Outfit', sans-serif)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Background decor */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(234,36,36,0.1) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.35, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.07) 0%, transparent 65%)", filter: "blur(60px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-60px", left: "-60px", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(234,36,36,0.05) 0%, transparent 65%)", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", border: "1px dashed rgba(234,36,36,0.06)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", border: "1px dashed rgba(234,36,36,0.05)", pointerEvents: "none" }} />

        <div style={{
          width: "100%", maxWidth: "520px",
          borderRadius: "28px",
          padding: "52px 40px",
          textAlign: "center",
          background: "#fff",
          border: "1.5px solid rgba(234,36,36,0.12)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.08)",
          position: "relative", overflow: "hidden",
        }}>
          {/* Top gradient bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "linear-gradient(90deg, #ea2424, #f87171, #ea2424)" }} />

          {/* Success icon */}
          <div style={{
            width: 80, height: 80, margin: "0 auto 24px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 12px 36px rgba(34,197,94,0.3)",
          }}>
            <CheckCircle2 style={{ width: 40, height: 40, color: "#fff" }} />
          </div>

          {/* Logo */}
          <img src="/adgrologo.png" alt="Adgro Hair Ambattur" style={{ height: 44, width: "auto", objectFit: "contain", margin: "0 auto 24px", display: "block" }} />

          <h1 style={{ margin: "0 0 12px", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: "#1a1a1a", letterSpacing: "-0.025em" }}>
            Thank You!
          </h1>
          <p style={{ margin: "0 auto 32px", maxWidth: "380px", lineHeight: 1.75, color: "#6b6b6b", fontSize: "0.98rem" }}>
            Your details have been submitted successfully. Our specialist team will connect with you shortly.
          </p>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "28px" }}>
            <div style={{ height: "1px", width: 48, background: "linear-gradient(to right, transparent, rgba(234,36,36,0.3))" }} />
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ea2424", boxShadow: "0 0 8px rgba(234,36,36,0.4)" }} />
            <div style={{ height: "1px", width: 48, background: "linear-gradient(to left, transparent, rgba(234,36,36,0.3))" }} />
          </div>

          <a
            href="tel:+917409256789"
            style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg, #ea2424, #c91f1f)",
              color: "#fff",
              borderRadius: "100px", padding: "14px 32px",
              fontSize: "1rem", fontWeight: 700, textDecoration: "none",
              boxShadow: "0 8px 28px rgba(234,36,36,0.3)",
            }}
          >
            Call Us: +91 7409256789
          </a>

          <div style={{ marginTop: "22px", color: "#6b6b6b", fontSize: "0.82rem", lineHeight: 1.65 }}>
            <p style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>Adgro Hair Ambattur</p>
            <p>Sai Health and Beauty Ventures, KAVITHA RAVIKUMAR, New No 122/124/1, New No 124/102, Redhills Main Road, Vijaylakshmipuram, NVA FTTH RSU, Ambattur, Thiruvallur, Tamil Nadu 600053</p>
            <p>
              <a href="mailto:customercare@adgrohairambattur.in" style={{ color: "#ea2424", textDecoration: "none", fontWeight: 700 }}>customercare@adgrohairambattur.in</a>
            </p>
          </div>

          <p style={{ marginTop: "20px", fontSize: "0.8rem", color: "rgba(234,36,36,0.45)", fontStyle: "italic" }}>
            Adgro Hair Ambattur — A call for a clear solution!
          </p>
        </div>
      </main>
    </>
  )
}
