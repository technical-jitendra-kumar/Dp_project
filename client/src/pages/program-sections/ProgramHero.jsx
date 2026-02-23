import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function ProgramHero({ course }) {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const parallax = scrollY * 0.25;

  return (
    <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 5% 60px", position: "relative", overflow: "hidden" }}>

      {/* Animated gradient orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle,rgba(${course.accentRgb},.12),transparent 70%)`, top: "5%", right: "-10%", transform: `translateY(${parallax}px)`, transition: "transform .1s linear", animation: "heroBlob1 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle,rgba(${course.accentRgb},.07),transparent 70%)`, bottom: "10%", left: "-5%", transform: `translateY(-${parallax * 0.6}px)`, transition: "transform .1s linear", animation: "heroBlob2 10s ease-in-out infinite" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(148,163,184,.06) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        {/* Diagonal lines */}
        <svg style={{ position: "absolute", top: 0, right: 0, opacity: .06, width: 500, height: 500 }} viewBox="0 0 500 500">
          {[0,40,80,120,160,200,240,280,320,360,400].map(y => (
            <line key={y} x1="0" y1={y} x2={500-y} y2="500" stroke={course.accent} strokeWidth="1"/>
          ))}
        </svg>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "2rem", fontSize: "0.82rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(10px)", transition: "all .4s ease" }}>
          <Link to="/" style={{ color: course.accent, textDecoration: "none", fontWeight: 600 }}>Home</Link>
          <span style={{ color: "#94A3B8" }}>›</span>
          <Link to="/#programs" style={{ color: course.accent, textDecoration: "none", fontWeight: 600 }}>Programs</Link>
          <span style={{ color: "#94A3B8" }}>›</span>
          <span style={{ color: "#94A3B8" }}>{course.title}</span>
        </div>

        <div className="hero-layout" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "4rem", alignItems: "center" }}>
          {/* LEFT CONTENT */}
          <div>
            {/* Tags */}
            <div style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "1.5rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all .5s .1s ease" }}>
              <span style={{ padding: ".3rem 1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.75rem", fontWeight: 700, border: `1.5px solid rgba(${course.accentRgb},.25)` }}>{course.icon} {course.tag}</span>
              {course.badge && <span style={{ padding: ".3rem 1rem", borderRadius: 100, background: "#0F172A", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{course.badge}</span>}
            </div>

            {/* Headline */}
            <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2.8rem,4.5vw,4.2rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1.5px", color: "#0F172A", marginBottom: "1rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "all .6s .15s ease" }}>
              {course.title}
              <br />
              <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}bb)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontStyle: "italic" }}>
                {course.subtitle.split(" ").slice(-3).join(" ")}
              </span>
            </h1>

            <p style={{ fontSize: "1.08rem", color: "#475569", lineHeight: 1.8, maxWidth: 560, marginBottom: "2.5rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all .5s .25s ease" }}>
              {course.longDesc}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all .5s .35s ease" }}>
              <button style={{ padding: "1rem 2.4rem", borderRadius: 12, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 8px 24px rgba(${course.accentRgb},.35)`, transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 14px 32px rgba(${course.accentRgb},.45)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 8px 24px rgba(${course.accentRgb},.35)`; }}>
                Enroll Now — {course.price}
              </button>
              <button style={{ padding: "1rem 2.4rem", borderRadius: 12, border: "2px solid #CBD5E1", background: "rgba(255,255,255,.85)", color: "#0F172A", fontSize: "1rem", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)", transition: "all .25s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = course.accent; e.currentTarget.style.color = course.accent; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#CBD5E1"; e.currentTarget.style.color = "#0F172A"; }}>
                Book Free Session
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(16px)", transition: "all .5s .45s ease" }}>
              {course.heroStats.map((s, i) => (
                <div key={i}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2.2rem", fontWeight: 900, color: course.accent, lineHeight: 1 }}>
                    {s.num}{s.suffix}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#94A3B8", marginTop: ".25rem", fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CARD */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(30px)", transition: "all .7s .3s ease" }}>
            <div style={{ background: "rgba(255,255,255,.92)", borderRadius: 24, padding: "2rem", border: "2px solid #E8EDF5", boxShadow: "0 24px 70px rgba(0,0,0,.1)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
              {/* Price */}
              <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".35rem 1rem", borderRadius: 100, background: course.accentBg, marginBottom: ".7rem" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, color: course.accent, letterSpacing: "2px", textTransform: "uppercase" }}>Program Fee</span>
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "3rem", fontWeight: 900, color: "#0F172A", lineHeight: 1 }}>{course.price}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: ".4rem" }}>EMI from ₹3,000/month · 0% interest</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: ".7rem", marginBottom: "1.5rem" }}>
                {[
                  ["⏱", "Duration", course.duration],
                  ["🎥", "Format", course.mode],
                  ["👥", "Batch Size", "Max 25 students"],
                  ["🏆", "Certificate", "Industry Recognized"],
                ].map(([ic, k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".6rem .8rem", borderRadius: 10, background: "#F8FAFF" }}>
                    <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{ic} {k}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>{v}</span>
                  </div>
                ))}
              </div>

              <button style={{ width: "100%", padding: ".95rem", borderRadius: 12, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", marginBottom: ".75rem", transition: "all .2s", boxShadow: `0 6px 20px rgba(${course.accentRgb},.3)` }}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                Enroll Now
              </button>
              <button style={{ width: "100%", padding: ".85rem", borderRadius: 12, border: `2px solid rgba(${course.accentRgb},.35)`, background: course.accentBg, color: course.accent, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
                Book Free Counselling 🎯
              </button>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#94A3B8", marginTop: ".8rem" }}>🔒 Secure checkout · No spam · EMI available</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroBlob1 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
        @keyframes heroBlob2 { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(20px) scale(.95)} }
        @media (max-width:960px) { .hero-layout { grid-template-columns:1fr !important; } }
      `}</style>
    </section>
  );
}
