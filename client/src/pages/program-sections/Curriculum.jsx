import { useState } from "react";
import { useInView } from "../../hooks/useInView";

export default function Curriculum({ course }) {
  const [ref, inView] = useInView(0.05);
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", background: "rgba(248,250,255,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid #E8EDF5", borderBottom: "1px solid #E8EDF5", overflow: "hidden", position: "relative" }}>

      {/* Big number watermark */}
      <div style={{ position: "absolute", right: "-2%", top: "10%", fontFamily: "'Fraunces',serif", fontSize: "20vw", fontWeight: 900, color: `rgba(${course.accentRgb},.03)`, lineHeight: 1, userSelect: "none", pointerEvents: "none", zIndex: 0 }}>
        {course.curriculum.length}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            Curriculum
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            What You'll <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Learn & Build</span>
          </h2>
        </div>

        <div className="curr-layout" style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Left: module tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", position: "sticky", top: 100 }}>
            {course.curriculum.map((mod, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                textAlign: "left", padding: "1rem 1.2rem", borderRadius: 14,
                border: `2px solid ${active === i ? mod.color : "#E8EDF5"}`,
                background: active === i ? `${mod.color}11` : "rgba(255,255,255,.85)",
                cursor: "pointer", transition: "all .25s",
                opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-20px)",
                transitionDelay: `${i * .07}s`,
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: mod.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "0.8rem", flexShrink: 0 }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: "0.72rem", color: active === i ? mod.color : "#94A3B8", fontWeight: 600, marginBottom: ".1rem" }}>{mod.week}</div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: active === i ? "#0F172A" : "#374151", lineHeight: 1.25 }}>{mod.title}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right: expanded module */}
          {course.curriculum.map((mod, i) => (
            active === i && (
              <div key={i} style={{ background: "rgba(255,255,255,.92)", borderRadius: 24, padding: "2.5rem", border: `2px solid ${mod.color}33`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", animation: "currSlide .3s ease" }}>
                {/* Module header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: `2px solid ${mod.color}22` }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: mod.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.4rem" }}>{i + 1}</div>
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: mod.color, marginBottom: ".2rem", letterSpacing: "1.5px", textTransform: "uppercase" }}>{mod.week}</div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.5rem", color: "#0F172A" }}>{mod.title}</div>
                  </div>
                </div>

                {/* Topics */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {mod.topics.map((topic, j) => (
                    <div key={j} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", padding: "1rem", borderRadius: 12, background: `${mod.color}08`, border: `1px solid ${mod.color}22`, animation: `topicIn .3s ${j * .06}s ease both` }}>
                      <div style={{ width: 26, height: 26, borderRadius: 6, background: mod.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                      <span style={{ fontSize: "0.9rem", color: "#374151", lineHeight: 1.5, fontWeight: 500 }}>{topic}</span>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F1F5F9" }}>
                  <button onClick={() => setActive(Math.max(0, i - 1))} disabled={i === 0} style={{ padding: ".65rem 1.4rem", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "transparent", color: i === 0 ? "#CBD5E1" : "#374151", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, cursor: i === 0 ? "not-allowed" : "pointer", transition: "all .2s" }}>
                    ← Previous
                  </button>
                  <span style={{ fontSize: "0.82rem", color: "#94A3B8", alignSelf: "center" }}>{i + 1} of {course.curriculum.length}</span>
                  <button onClick={() => setActive(Math.min(course.curriculum.length - 1, i + 1))} disabled={i === course.curriculum.length - 1} style={{ padding: ".65rem 1.4rem", borderRadius: 8, border: "none", background: i === course.curriculum.length - 1 ? "#E2E8F0" : mod.color, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: i === course.curriculum.length - 1 ? "not-allowed" : "pointer", transition: "all .2s" }}>
                    Next →
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <style>{`
        @keyframes currSlide { from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:none} }
        @keyframes topicIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @media (max-width:860px) { .curr-layout { grid-template-columns:1fr !important; } .curr-layout>:first-child { position:static !important; } }
      `}</style>
    </section>
  );
}
