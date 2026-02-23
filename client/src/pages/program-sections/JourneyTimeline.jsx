import { useState } from "react";
import { useInView } from "../../hooks/useInView";

export default function JourneyTimeline({ course }) {
  const [ref, inView] = useInView(0.05);
  const [hovStep, setHovStep] = useState(null);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", position: "relative", overflow: "hidden" }}>
      {/* Accent bg */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 50% 50%,rgba(${course.accentRgb},.03) 0%,transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            Your Journey
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: ".8rem" }}>
            From Enrolled to <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Employed</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>
            A detailed map of every milestone, so you always know where you are and what's next.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,${course.accent}33,${course.accent},${course.accent}33)`, transform: "translateX(-50%)", borderRadius: 2 }}>
            {/* Animated progress */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: course.accent, borderRadius: 2, height: inView ? "100%" : "0%", transition: "height 2.5s ease" }} />
          </div>

          {course.journey.map((step, i) => {
            const isLeft = i % 2 === 0;
            const isHov = hovStep === i;
            return (
              <div key={i} style={{ display: "flex", justifyContent: isLeft ? "flex-start" : "flex-end", marginBottom: i < course.journey.length - 1 ? "3rem" : 0, position: "relative", opacity: inView ? 1 : 0, transform: inView ? "none" : `translateX(${isLeft ? -30 : 30}px)`, transition: `all .6s ${i * .1}s ease` }}>
                {/* Card — left or right */}
                <div
                  onMouseEnter={() => setHovStep(i)}
                  onMouseLeave={() => setHovStep(null)}
                  style={{
                    width: "calc(50% - 3rem)",
                    background: isHov ? "#fff" : "rgba(255,255,255,.85)",
                    borderRadius: 20, padding: "1.5rem 1.8rem",
                    border: `2px solid ${isHov ? course.accent : "#E8EDF5"}`,
                    boxShadow: isHov ? `0 16px 40px rgba(${course.accentRgb},.12)` : "0 4px 16px rgba(0,0,0,.05)",
                    transition: "all .3s ease",
                    transform: isHov ? (isLeft ? "translateX(-6px)" : "translateX(6px)") : "none",
                    backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                    cursor: "default", textAlign: isLeft ? "right" : "left",
                  }}
                >
                  {/* Phase badge */}
                  <div style={{ display: "inline-block", padding: ".2rem .75rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.7rem", fontWeight: 700, marginBottom: ".6rem", border: `1px solid rgba(${course.accentRgb},.2)` }}>
                    {step.phase}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "1.08rem", color: "#0F172A", marginBottom: ".4rem", lineHeight: 1.3 }}>{step.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "#64748B", lineHeight: 1.65 }}>{step.desc}</p>
                </div>

                {/* Center node */}
                <div style={{
                  position: "absolute", left: "50%", top: "50%",
                  transform: "translate(-50%,-50%)",
                  width: isHov ? 56 : 48, height: isHov ? 56 : 48,
                  borderRadius: "50%",
                  background: isHov ? course.accent : "#fff",
                  border: `3px solid ${course.accent}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: isHov ? "1.3rem" : "1.1rem",
                  boxShadow: isHov ? `0 6px 20px rgba(${course.accentRgb},.4)` : "0 4px 12px rgba(0,0,0,.1)",
                  transition: "all .3s ease", zIndex: 2,
                }}>
                  {step.icon}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA at bottom */}
        <div style={{ textAlign: "center", marginTop: "4rem", padding: "2.5rem", background: `linear-gradient(135deg,${course.accentBg},rgba(255,255,255,.6))`, borderRadius: 24, border: `2px solid rgba(${course.accentRgb},.2)`, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s .7s ease" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.4rem", fontWeight: 900, color: "#0F172A", marginBottom: ".5rem" }}>
            Ready to start your journey?
          </div>
          <p style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: "1.5rem" }}>Join the next cohort — only {25} seats available.</p>
          <button style={{ padding: ".95rem 2.5rem", borderRadius: 12, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 8px 24px rgba(${course.accentRgb},.3)`, transition: "all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
            Enroll Now — {course.price}
          </button>
        </div>
      </div>

      <style>{`@media (max-width:700px) { .timeline-card { width: calc(100% - 3rem) !important; margin-left: 3rem !important; text-align: left !important; } }`}</style>
    </section>
  );
}
