import { useRef, useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";

const LEVEL_LABELS = { 90: "Expert", 80: "Advanced", 65: "Intermediate", 40: "Basics" };

function getLevel(n) {
  if (n >= 88) return "Expert";
  if (n >= 75) return "Advanced";
  if (n >= 55) return "Intermediate";
  return "Basics";
}

const LEVEL_COLORS = {
  Expert: "#059669",
  Advanced: "#0057FF",
  Intermediate: "#D97706",
  Basics: "#94A3B8",
};

export default function ToolsSection({ course }) {
  const [ref, inView] = useInView(0.1);
  const trackRef = useRef(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [hovTool, setHovTool] = useState(null);

  // Horizontal scroll on vertical scroll
  useEffect(() => {
    if (!inView) return;
    const section = ref.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      // When section is in view, map scroll progress 0→1
      const start = rect.top + window.scrollY - winH * 0.8;
      const end = rect.bottom + window.scrollY - winH * 0.5;
      const progress = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      setScrollPct(progress);

      if (trackRef.current) {
        const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
        trackRef.current.scrollLeft = maxScroll * progress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [inView]);

  return (
    <section ref={ref} style={{ padding: "6rem 0 4rem", overflow: "hidden", position: "relative" }}>
      {/* Full-width accent stripe */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,transparent 0%,${course.accent} 30%,${course.accent} 70%,transparent 100%)` }} />

      {/* Header */}
      <div style={{ padding: "0 5%", marginBottom: "3rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
        <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
          Tools You'll Master
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px" }}>
            Your <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Tech Stack</span>
          </h2>
          {/* Scroll progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ width: 120, height: 6, borderRadius: 3, background: "#E2E8F0", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${scrollPct * 100}%`, background: course.accent, borderRadius: 3, transition: "width .1s linear" }} />
            </div>
            <span style={{ fontSize: "0.78rem", color: "#94A3B8" }}>Scroll to explore →</span>
          </div>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={trackRef} style={{ overflow: "hidden", paddingBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1.2rem", paddingLeft: "5%", paddingRight: "5%", transition: "all .3s" }}>
          {course.tools.map((tool, i) => {
            const level = getLevel(tool.level);
            const levelColor = LEVEL_COLORS[level];
            const isHov = hovTool === i;
            return (
              <div key={i}
                onMouseEnter={() => setHovTool(i)}
                onMouseLeave={() => setHovTool(null)}
                style={{
                  flexShrink: 0, width: 180, background: isHov ? "#fff" : "rgba(255,255,255,.85)",
                  borderRadius: 20, padding: "1.5rem",
                  border: `2px solid ${isHov ? `rgba(${course.accentRgb},.3)` : "#E8EDF5"}`,
                  boxShadow: isHov ? `0 16px 40px rgba(${course.accentRgb},.12)` : "0 2px 8px rgba(0,0,0,.04)",
                  transition: "all .3s ease",
                  transform: inView ? (isHov ? "translateY(-10px) scale(1.04)" : "none") : "translateY(30px)",
                  opacity: inView ? 1 : 0,
                  transitionDelay: `${i * .04}s`,
                  cursor: "default",
                  backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Tool icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${tool.color}18`, border: `2px solid ${tool.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem", transition: "transform .3s", transform: isHov ? "scale(1.15)" : "none" }}>
                  {tool.icon}
                </div>

                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A", marginBottom: ".3rem" }}>{tool.name}</div>

                {/* Level badge */}
                <span style={{ display: "inline-block", padding: ".2rem .65rem", borderRadius: 100, background: `${levelColor}18`, color: levelColor, fontSize: "0.7rem", fontWeight: 700, marginBottom: "1rem" }}>{level}</span>

                {/* Skill bar */}
                <div style={{ height: 6, borderRadius: 3, background: "#F1F5F9", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${tool.color},${tool.color}aa)`, width: inView ? `${tool.level}%` : "0%", transition: `width .8s ${.3 + i * .05}s ease`, }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: ".4rem" }}>
                  <span style={{ fontSize: "0.68rem", color: "#94A3B8" }}>Proficiency</span>
                  <span style={{ fontSize: "0.68rem", color: tool.color, fontWeight: 700 }}>{tool.level}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* All levels legend */}
      <div style={{ padding: "0 5%", marginTop: "1rem", display: "flex", gap: "1.5rem", flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "opacity .6s .5s ease" }}>
        {Object.entries(LEVEL_COLORS).map(([label, color]) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: color }} />
            <span style={{ fontSize: "0.78rem", color: "#64748B", fontWeight: 500 }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
