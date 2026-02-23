import { useState } from "react";
import { useInView } from "../../hooks/useInView";

const DIFF_COLORS = { Expert: "#DC2626", Advanced: "#D97706", Intermediate: "#059669" };

export default function ProjectsSection({ course }) {
  const [ref, inView] = useInView(0.1);
  const [active, setActive] = useState(0);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", background: "rgba(248,250,255,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid #E8EDF5", borderBottom: "1px solid #E8EDF5", overflow: "hidden", position: "relative" }}>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            Real Projects
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: ".8rem" }}>
            Build. Ship. <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Get Hired.</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.75, maxWidth: 500, margin: "0 auto" }}>
            Every project in this program uses real company data. Your portfolio will stand out because it's built on actual business problems.
          </p>
        </div>

        {/* Project tabs */}
        <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
          {course.projects.map((p, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ padding: ".6rem 1.5rem", borderRadius: 100, border: `2px solid ${active === i ? course.accent : "#E2E8F0"}`, background: active === i ? course.accent : "rgba(255,255,255,.85)", color: active === i ? "#fff" : "#64748B", fontSize: "0.87rem", fontWeight: 700, cursor: "pointer", transition: "all .25s", backdropFilter: "blur(8px)" }}>
              {p.icon} Project {i + 1}
            </button>
          ))}
        </div>

        {/* Active project card */}
        {course.projects.map((proj, i) => (
          active === i && (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", animation: "projIn .35s ease" }}>
              {/* Main card */}
              <div style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: `2px solid ${proj.color}33`, boxShadow: `0 20px 60px rgba(0,0,0,.08)` }}>
                {/* Top banner */}
                <div style={{ background: `linear-gradient(135deg,${proj.color},${proj.color}cc)`, padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", right: -20, top: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,.1)" }} />
                  <div style={{ position: "absolute", right: 30, bottom: -30, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,.07)" }} />
                  <div style={{ fontSize: "3rem", position: "relative", zIndex: 1 }}>{proj.icon}</div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <span style={{ background: "rgba(255,255,255,.2)", color: "#fff", fontSize: "0.72rem", fontWeight: 700, padding: ".25rem .7rem", borderRadius: 100, letterSpacing: "1px" }}>
                      {proj.company}
                    </span>
                    <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.6rem", fontWeight: 900, color: "#fff", marginTop: ".75rem", lineHeight: 1.25, letterSpacing: "-0.3px" }}>{proj.title}</h3>
                  </div>
                </div>

                <div style={{ padding: "2rem" }}>
                  <p style={{ fontSize: "0.95rem", color: "#475569", lineHeight: 1.75, marginBottom: "1.5rem" }}>{proj.desc}</p>

                  <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
                    {proj.tags.map(t => (
                      <span key={t} style={{ padding: ".3rem .8rem", borderRadius: 8, background: "#F8FAFC", border: "1px solid #E2E8F0", fontSize: "0.78rem", fontWeight: 600, color: "#475569" }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <span style={{ padding: ".3rem .9rem", borderRadius: 100, background: `${DIFF_COLORS[proj.difficulty]}18`, color: DIFF_COLORS[proj.difficulty], fontSize: "0.75rem", fontWeight: 700 }}>
                      {proj.difficulty === "Expert" ? "🔴" : proj.difficulty === "Advanced" ? "🟡" : "🟢"} {proj.difficulty}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#94A3B8" }}>difficulty level</span>
                  </div>
                </div>
              </div>

              {/* Right: what you'll build */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ background: "#fff", borderRadius: 20, padding: "1.8rem", border: "1.5px solid #E8EDF5" }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A", marginBottom: "1rem" }}>🎯 What You'll Build</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                    {["Complete working solution from scratch", "Clean, documented, production-grade code", "Business insights report with recommendations", "Shareable GitHub repository + live demo"].map((item, j) => (
                      <div key={j} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start", animation: `topicIn .3s ${j * .07}s ease both` }}>
                        <span style={{ color: course.accent, fontWeight: 800, fontSize: "1rem", lineHeight: 1 }}>✓</span>
                        <span style={{ fontSize: "0.88rem", color: "#374151", lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ background: `linear-gradient(135deg,${course.accentBg},${course.accentBg}aa)`, borderRadius: 20, padding: "1.8rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
                  <div style={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A", marginBottom: ".8rem" }}>💡 Skills You'll Gain</div>
                  <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
                    {proj.tags.concat(["Business Thinking", "Data Storytelling", "Code Review"]).map(s => (
                      <span key={s} style={{ padding: ".3rem .8rem", borderRadius: 8, background: "rgba(255,255,255,.7)", border: `1px solid rgba(${course.accentRgb},.2)`, fontSize: "0.78rem", fontWeight: 600, color: "#374151" }}>{s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: "#fff", borderRadius: 20, padding: "1.5rem", border: "1.5px solid #E8EDF5", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>🎓</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>Mentor-Reviewed</div>
                    <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: ".1rem" }}>Every project is reviewed by an industry mentor before it goes in your portfolio.</div>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>

      <style>{`
        @keyframes projIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes topicIn { from{opacity:0;transform:translateX(8px)} to{opacity:1;transform:none} }
        @media (max-width:860px) { section>div>div:last-child { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
