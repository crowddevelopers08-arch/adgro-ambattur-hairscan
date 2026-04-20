"use client";
import { useState, useEffect, useRef } from "react";
import { Reveal } from "./animation";

const defaultReels = [
  { id: "DV8yZqREhRL", type: "reel" as const },
  { id: "DVbNAaKjEMv", type: "reel" as const },
  { id: "DVRDCC-Ep8c", type: "reel" as const },
  { id: "DVGnHLtEkDs", type: "reel" as const },
  { id: "DTpRjmfklOc", type: "reel" as const },
];

type ReelItem = {
  id: string;
  type?: "p" | "reel";
};

interface VideoCarouselProps {
  reels?: ReelItem[];
}

export default function VideoCarousel({ reels = defaultReels }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [perView, setPerView] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = reels.length;
  const maxIndex = total - perView;

  const goTo = (idx: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(Math.max(0, Math.min(idx, maxIndex)));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const resetAuto = (idx: number) => {
    if (autoRef.current) clearInterval(autoRef.current);
    goTo(idx);
    autoRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
  };

  useEffect(() => {
    autoRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [maxIndex]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) resetAuto(diff > 0 ? current + 1 : current - 1);
    touchStartX.current = null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        @keyframes glowPulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .vc-glow-dot { animation: glowPulse 2s ease-in-out infinite; }

        .vc-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .vc-card:hover {
          transform: translateY(-6px) scale(1.01);
          box-shadow: 0 28px 60px rgba(0,0,0,0.15), 0 0 40px rgba(234,36,36,0.1) !important;
        }

        .vc-track { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }

        .vc-skeleton {
          background: linear-gradient(90deg, rgba(234,36,36,0.03) 25%, rgba(234,36,36,0.07) 50%, rgba(234,36,36,0.03) 75%);
          background-size: 400px 100%;
          animation: shimmer 1.8s infinite;
        }

        .vc-dot-btn { transition: all 0.3s ease; cursor: pointer; border: none; padding: 0; background: none; }

        .vc-arrow {
          transition: all 0.25s ease;
          cursor: pointer;
        }
        .vc-arrow:hover:not(:disabled) {
          background: rgba(234,36,36,0.15) !important;
          transform: scale(1.08);
        }
        .vc-arrow:disabled {
          cursor: not-allowed;
          opacity: 0.3;
        }

        .vc-iframe-wrap iframe {
          border: none !important;
          border-radius: 0 !important;
        }
      `}</style>

      <section
        id="reels"
        className="relative w-full overflow-hidden"
        style={{ background: "#fafafa", fontFamily: "'Outfit',sans-serif" }}
      >
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(300px,38vw,500px)", height:"clamp(300px,38vw,500px)", top:"-10%", left:"-5%", background:"radial-gradient(circle,rgba(234,36,36,0.05) 0%,transparent 70%)", filter:"blur(90px)", borderRadius:"50%" }}/>
        <div className="absolute pointer-events-none z-0" style={{ width:"clamp(220px,28vw,380px)", height:"clamp(220px,28vw,380px)", bottom:"-8%", right:"3%", background:"radial-gradient(circle,rgba(234,36,36,0.04) 0%,transparent 70%)", filter:"blur(70px)", borderRadius:"50%" }}/>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ea2424,transparent)" }}/>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-14">
          <div className="text-center mb-12 max-sm:mb-8">
            <Reveal dir="down" delay={0.0} className="mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ border:"1px solid rgba(234,36,36,0.25)", background:"rgba(234,36,36,0.05)" }}>
                <div className="w-2 h-2 rounded-full vc-glow-dot" style={{ background:"#ea2424" }}/>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color:"#ea2424" }}>The Voice of Adgro Hair Excellence</span>
              </div>
            </Reveal>

            <Reveal dir="up" delay={0.1}>
              <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(1.7rem,3.5vw,3rem)", fontWeight:700, color:"#1a1a1a", lineHeight:1.2 }}>
                Real Journey <span style={{ color:"#ea2424", fontStyle:"italic" }}>of Our Clients</span>
              </h2>
            </Reveal>

            <Reveal dir="fade" delay={0.18} className="mt-5 flex items-center justify-center gap-3">
              <div className="h-px w-14" style={{ background:"linear-gradient(to right,transparent,#ea2424)" }}/>
              <div className="w-1.5 h-1.5 rotate-45 flex-shrink-0" style={{ background:"#ea2424" }}/>
              <div className="h-px w-14" style={{ background:"linear-gradient(to left,transparent,#ea2424)" }}/>
            </Reveal>
          </div>

          <Reveal dir="up" delay={0.22} className="w-full overflow-hidden">
            <div
              className="vc-track flex"
              style={{ gap: 16, transform: `translateX(calc(-${current} * ((100% + 16px) / ${perView})))` }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {reels.map((reel, i) => (
                <div
                  key={reel.id}
                  className="flex-shrink-0"
                  style={{ width: `calc((100% - ${(perView - 1) * 16}px) / ${perView})` }}
                >
                  <div
                    className="vc-card relative rounded-2xl overflow-hidden"
                    style={{
                      aspectRatio: "9/16",
                      border: "1.5px solid rgba(234,36,36,0.12)",
                      boxShadow: "0 10px 36px rgba(0,0,0,0.08)",
                      background: "#f5f5f5",
                    }}
                  >
                    <div className="vc-skeleton absolute inset-0 z-[1]"/>

                    <div className="vc-iframe-wrap absolute inset-0 z-[2]">
                      <iframe
                        src={`https://www.instagram.com/${reel.type ?? "p"}/${reel.id}/embed/`}
                        width="100%"
                        height="100%"
                        loading="lazy"
                        scrolling="no"
                        allow="autoplay; encrypted-media"
                        style={{
                          display: "block",
                          border: "none",
                          background: "transparent",
                        }}
                        title={`Instagram reel ${i + 1}`}
                      />
                    </div>

                    <div className="absolute top-0 left-0 z-[3] pointer-events-none" style={{ width:40, height:40, borderTop:"2px solid rgba(234,36,36,0.35)", borderLeft:"2px solid rgba(234,36,36,0.35)", borderTopLeftRadius:14 }}/>
                    <div className="absolute bottom-0 right-0 z-[3] pointer-events-none" style={{ width:40, height:40, borderBottom:"2px solid rgba(234,36,36,0.35)", borderRight:"2px solid rgba(234,36,36,0.35)", borderBottomRightRadius:14 }}/>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="flex items-center justify-center gap-2.5 mt-10">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className="vc-dot-btn"
                onClick={() => resetAuto(i)}
                aria-label={`Go to reel ${i + 1}`}
              >
                <div style={{
                  width: current === i ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: current === i ? "#ea2424" : "rgba(234,36,36,0.2)",
                  transition: "all 0.3s ease",
                }}/>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center justify-center gap-4 mt-6">
            <button
              className="vc-arrow flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background:"rgba(234,36,36,0.06)", border:"1.5px solid rgba(234,36,36,0.18)" }}
              onClick={() => resetAuto(current - 1)}
              disabled={current === 0}
              aria-label="Previous"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea2424" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <button
              className="vc-arrow flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background:"rgba(234,36,36,0.06)", border:"1.5px solid rgba(234,36,36,0.18)" }}
              onClick={() => resetAuto(current + 1)}
              disabled={current >= maxIndex}
              aria-label="Next"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea2424" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>

        </div>

        <div className="w-full h-px" style={{ background:"linear-gradient(90deg,transparent,#ea2424,transparent)" }}/>
      </section>
    </>
  );
}
