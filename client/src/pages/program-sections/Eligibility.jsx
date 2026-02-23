import { useInView } from "../../hooks/useInView";

export default function Eligibility({ course }) {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", background: "rgba(248,250,255,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid #E8EDF5", borderBottom: "1px solid #E8EDF5", position: "relative", overflow: "hidden" }}>

      {/* Floating shapes */}
      <div style={{ position: "absolute", top: "20%", right: "8%", width: 160, height: 160, borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%", background: `rgba(${course.accentRgb},.06)`, animation: "eligFloat 6s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 100, height: 100, borderRadius: "50%", background: `rgba(${course.accentRgb},.05)`, animation: "eligFloat 8s ease-in-out infinite .5s", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            Eligibility Check
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            Is This Program for <em style={{ fontStyle: "italic", color: course.accent }}>You?</em>
          </h2>
        </div>

        <div className="elig-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "2rem" }}>
          {/* This IS for you */}
          <div style={{ gridColumn: "span 1", background: "rgba(255,255,255,.92)", borderRadius: 24, padding: "2rem", border: "2px solid #DCFCE7", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s .1s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>✅</div>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#059669" }}>This IS for you if…</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".85rem" }}>
              {course.forYou.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-12px)", transition: `all .4s ${.15 + i * .08}s ease` }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#DCFCE7", border: "2px solid #059669", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", color: "#059669", fontWeight: 900, flexShrink: 0, marginTop: 2 }}>✓</span>
                  <span style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* NOT for you */}
          <div style={{ background: "rgba(255,255,255,.92)", borderRadius: 24, padding: "2rem", border: "2px solid #FEE2E2", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s .2s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FEE2E2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>❌</div>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#DC2626" }}>Skip this if…</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".85rem" }}>
              {course.notForYou.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-12px)", transition: `all .4s ${.25 + i * .08}s ease` }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#FEE2E2", border: "2px solid #DC2626", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", color: "#DC2626", fontWeight: 900, flexShrink: 0, marginTop: 2 }}>✕</span>
                  <span style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div style={{ background: "rgba(255,255,255,.92)", borderRadius: 24, padding: "2rem", border: `2px solid rgba(${course.accentRgb},.2)`, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s .3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.5rem" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>📋</div>
              <span style={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A" }}>Requirements</span>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".85rem" }}>
              {course.requirements.map((item, i) => (
                <li key={i} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateX(-12px)", transition: `all .4s ${.35 + i * .08}s ease` }}>
                  <span style={{ width: 22, height: 22, borderRadius: "50%", background: course.accentBg, border: `2px solid ${course.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.6rem", color: course.accent, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>→</span>
                  <span style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.55 }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div style={{ marginTop: "1.5rem", padding: "1rem", borderRadius: 12, background: course.accentBg, border: `1px solid rgba(${course.accentRgb},.2)`, textAlign: "center" }}>
              <p style={{ fontSize: "0.82rem", color: "#475569", marginBottom: ".75rem", lineHeight: 1.5 }}>Not sure if you qualify?</p>
              <button style={{ padding: ".6rem 1.4rem", borderRadius: 8, border: "none", background: course.accent, color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                Talk to an Advisor
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes eligFloat { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(5deg)} }
        @media (max-width:900px) { .elig-grid { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
