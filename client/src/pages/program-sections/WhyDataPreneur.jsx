import { useInView, useCounter } from "../../hooks/useInView";

const GLOBAL_STATS = [
  { num: 2400, suffix: "+", label: "Students Placed", icon: "🎓" },
  { num: 94, suffix: "%",  label: "Placement Rate",   icon: "📈" },
  { num: 180, suffix: "+", label: "Hiring Partners",  icon: "🤝" },
  { num: 49, suffix: "k",  label: "Average Salary (LPA)", icon: "💰" },
];

function AnimNum({ target, inView }) {
  const v = useCounter(target, inView);
  return <>{v}</>;
}

export default function WhyDataPreneur({ course }) {
  const [ref, inView] = useInView(0.1);
  const [refStats, inViewStats] = useInView(0.1);

  const differentiators = [
    { icon: "👥", title: "Tiny Cohorts (Max 25)", desc: "Your mentor knows your name, not just your registration number. Real accountability, real results." },
    { icon: "🏭", title: "Real Company Datasets", desc: "Every project uses data from actual companies — Swiggy, HDFC, Flipkart. Not toy datasets." },
    { icon: "🎙️", title: "Industry Mentors, Not Teachers", desc: "Mentors are working professionals at FAANG and Big-4 who hire people like you." },
    { icon: "💼", title: "Placement Until You're Hired", desc: "We don't stop at program end. Resume reviews, referrals, and coaching until offer letter." },
    { icon: "🏆", title: "Globally Recognized Certs", desc: "Microsoft, Google, LangChain — certificates that actually matter to recruiters." },
    { icon: "📞", title: "Mentor-on-Call Anytime", desc: "Stuck at 11pm on a project? Your mentor is reachable. We don't close at 5pm." },
  ];

  return (
    <section ref={ref} style={{ padding: "6rem 5%", position: "relative", overflow: "hidden" }}>
      {/* Subtle background pattern */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 80% 50%,rgba(${course.accentRgb},.04) 0%,transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="why-layout" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
          {/* LEFT */}
          <div>
            <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)`, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)", transition: "all .5s ease" }}>
              Why DataPreneur
            </div>
            <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(1.9rem,3vw,2.7rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: "1rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all .5s .1s ease" }}>
              We're Not a Course.<br />
              We're a <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Career Accelerator</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)", transition: "all .5s .15s ease" }}>
              Built by people who've hired at Google, JPMorgan and Amazon — not by people who've just taught about it.
            </p>

            {/* Program-specific why points */}
            {course.whyDP && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                {course.whyDP.map((w, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,.85)", borderRadius: 16, padding: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.15)`, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(12px)", transition: `all .5s ${.2 + i * .08}s ease` }}>
                    <div style={{ fontSize: "1.3rem", marginBottom: ".4rem" }}>{w.icon}</div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.5rem", color: course.accent }}>{w.stat}</div>
                    <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#0F172A" }}>{w.label}</div>
                    <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: ".2rem" }}>{w.desc}</div>
                  </div>
                ))}
              </div>
            )}

            <button style={{ padding: ".85rem 2rem", borderRadius: 10, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 6px 20px rgba(${course.accentRgb},.3)`, transition: "all .25s", opacity: inView ? 1 : 0, transition2: "all .5s .4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
              Start Your Journey →
            </button>
          </div>

          {/* RIGHT - differentiators */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {differentiators.map((d, i) => (
              <DiffRow key={i} d={d} index={i} inView={inView} course={course} />
            ))}
          </div>
        </div>

        {/* Global stats bar */}
        <div ref={refStats} style={{ marginTop: "5rem", padding: "2.5rem 3rem", background: "#0F172A", borderRadius: 24, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2rem", boxShadow: "0 20px 60px rgba(0,0,0,.18)", opacity: inViewStats ? 1 : 0, transform: inViewStats ? "none" : "translateY(24px)", transition: "all .7s ease" }}>
          {GLOBAL_STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", opacity: inViewStats ? 1 : 0, transform: inViewStats ? "none" : "translateY(16px)", transition: `all .5s ${i * .1}s ease` }}>
              <div style={{ fontSize: "1.8rem", marginBottom: ".3rem" }}>{s.icon}</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2.5rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>
                <AnimNum target={s.num} inView={inViewStats} />{s.suffix}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: ".3rem" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width:900px) { .why-layout { grid-template-columns:1fr !important; gap:3rem !important; } }`}</style>
    </section>
  );
}

function DiffRow({ d, index, inView, course }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", padding: "1rem 1.2rem", borderRadius: 14, background: hov ? "#fff" : "rgba(255,255,255,.7)", border: `1.5px solid ${hov ? `rgba(${course.accentRgb},.3)` : "#E8EDF5"}`, backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: "all .25s", cursor: "default", opacity: inView ? 1 : 0, transform: inView ? (hov ? "translateX(6px)" : "none") : "translateX(-20px)", transitionDelay: `${.1 + index * .06}s` }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, transition: "transform .3s", transform: hov ? "scale(1.15) rotate(5deg)" : "none" }}>{d.icon}</div>
      <div>
        <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0F172A", marginBottom: ".2rem" }}>{d.title}</div>
        <div style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>{d.desc}</div>
      </div>
    </div>
  );
}

import { useState } from "react";
