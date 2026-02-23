import { useState, useEffect, useRef } from "react";
import { useInView } from "../../hooks/useInView";

export default function SuccessStories({ course }) {
  const [ref, inView] = useInView(0.1);
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState(0);
  const timer = useRef(null);
  const total = course.testimonials.length;

  useEffect(() => {
    if (isPlaying) {
      timer.current = setInterval(() => setCurrent(c => (c + 1) % total), 4500);
    }
    return () => clearInterval(timer.current);
  }, [isPlaying, total]);

  const goTo = (i) => { setCurrent(i); setIsPlaying(false); };
  const prev = () => { setCurrent(c => (c - 1 + total) % total); setIsPlaying(false); };
  const next = () => { setCurrent(c => (c + 1) % total); setIsPlaying(false); };

  // Drag/swipe
  const onMouseDown = (e) => { setDragStart(e.clientX); setIsPlaying(false); };
  const onMouseMove = (e) => { if (dragStart !== null) setDragOffset(e.clientX - dragStart); };
  const onMouseUp = () => {
    if (dragOffset > 60) prev();
    else if (dragOffset < -60) next();
    setDragStart(null); setDragOffset(0);
  };

  return (
    <section ref={ref} style={{ padding: "6rem 5%", background: "#0F172A", position: "relative", overflow: "hidden" }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: 400, height: 400, borderRadius: "50%", background: `rgba(${course.accentRgb},.07)`, filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: `rgba(${course.accentRgb},.05)`, filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: `rgba(${course.accentRgb},.15)`, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.25)` }}>
            Success Stories
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            Real People,{" "}
            <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}aa)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dream Careers</span>
          </h2>
        </div>

        {/* Main carousel */}
        <div
          style={{ position: "relative", cursor: "grab", userSelect: "none" }}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
        >
          {/* Cards container */}
          <div style={{ position: "relative", minHeight: 320 }}>
            {course.testimonials.map((t, i) => {
              const offset = ((i - current + total) % total);
              const isActive = offset === 0;
              const isNext = offset === 1;
              const isPrev = offset === total - 1;

              if (!isActive && !isNext && !isPrev) return null;

              return (
                <div key={i} style={{
                  position: "absolute", top: 0, left: "50%",
                  width: "calc(100% - 4rem)",
                  transform: isActive
                    ? `translateX(calc(-50% + ${dragOffset}px)) scale(1)`
                    : isNext
                    ? "translateX(calc(-50% + 55%)) scale(0.88)"
                    : "translateX(calc(-50% - 55%)) scale(0.88)",
                  opacity: isActive ? 1 : 0.45,
                  transition: dragStart ? "none" : "all .55s cubic-bezier(.4,0,.2,1)",
                  zIndex: isActive ? 2 : 1,
                  pointerEvents: isActive ? "auto" : "none",
                }}>
                  <div style={{ background: "rgba(30,41,59,.95)", borderRadius: 24, padding: "3rem", border: `2px solid ${isActive ? `rgba(${course.accentRgb},.35)` : "rgba(51,65,85,.5)"}`, backdropFilter: "blur(12px)" }}>
                    {/* Stars */}
                    <div style={{ color: "#FCD34D", fontSize: "1rem", letterSpacing: "3px", marginBottom: "1.5rem" }}>{"★".repeat(t.stars)}</div>

                    {/* Quote */}
                    <blockquote style={{ fontFamily: "'Fraunces',serif", fontSize: "1.15rem", fontWeight: 600, color: "#E2E8F0", lineHeight: 1.7, fontStyle: "italic", marginBottom: "2rem", position: "relative" }}>
                      <span style={{ position: "absolute", top: -20, left: -10, fontFamily: "'Fraunces',serif", fontSize: "5rem", color: `rgba(${course.accentRgb},.2)`, lineHeight: 1, userSelect: "none" }}>"</span>
                      {t.text}
                    </blockquote>

                    {/* Author */}
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${t.color},${t.color}cc)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", color: "#fff", flexShrink: 0, boxShadow: `0 4px 14px rgba(${course.accentRgb},.3)` }}>
                        {t.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: "1rem", color: "#fff" }}>{t.name}</div>
                        <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: ".15rem" }}>{t.role}</div>
                      </div>
                      <div style={{ marginLeft: "auto", padding: ".3rem .9rem", borderRadius: 100, background: `rgba(${course.accentRgb},.15)`, color: course.accent, fontSize: "0.72rem", fontWeight: 700 }}>
                        Alumni ✓
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2.5rem" }}>
            <button onClick={prev} style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", color: "#fff", fontSize: "1rem", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${course.accentRgb},.3)`; e.currentTarget.style.borderColor = course.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
              ←
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: ".5rem" }}>
              {course.testimonials.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 28 : 8, height: 8, borderRadius: 4, border: "none", background: i === current ? course.accent : "rgba(255,255,255,.2)", cursor: "pointer", transition: "all .35s", padding: 0 }} />
              ))}
            </div>

            <button onClick={next} style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid rgba(255,255,255,.15)", background: "rgba(255,255,255,.05)", color: "#fff", fontSize: "1rem", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={e => { e.currentTarget.style.background = `rgba(${course.accentRgb},.3)`; e.currentTarget.style.borderColor = course.accent; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,.15)"; }}>
              →
            </button>

            <button onClick={() => setIsPlaying(!isPlaying)} style={{ width: 46, height: 46, borderRadius: "50%", border: `2px solid rgba(${course.accentRgb},.3)`, background: `rgba(${course.accentRgb},.1)`, color: course.accent, fontSize: "0.85rem", cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {isPlaying ? "⏸" : "▶"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
