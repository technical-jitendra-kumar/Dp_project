import { useState, useEffect } from "react";
import { useInView } from "../../hooks/useInView";

function CertCard({ cert, index, inView, course }) {
  const [flipped, setFlipped] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);

  // Auto-rotate animation
  useEffect(() => {
    if (!inView) return;
    const delay = setTimeout(() => setAutoRotate(true), 800 + index * 400);
    return () => clearTimeout(delay);
  }, [inView]);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = setTimeout(() => {
      setFlipped(true);
      setTimeout(() => setAutoRotate(false), 1000);
    }, 600);
    return () => clearTimeout(timer);
  }, [autoRotate]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateY(((x - cx) / cx) * 12);
    setRotateX(-((y - cy) / cy) * 12);
  };

  const handleMouseLeave = () => { setRotateX(0); setRotateY(0); };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(30px)",
        transition: `opacity .6s ${index * .15}s ease, transform .6s ${index * .15}s ease`,
        cursor: "pointer",
      }}
      onClick={() => setFlipped(!flipped)}
    >
      <div style={{
        position: "relative", width: "100%", paddingTop: "62%",
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) rotateY(${flipped ? 180 + rotateY : rotateY}deg)`,
        transition: "transform .6s cubic-bezier(.4,0,.2,1)",
      }}>

        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          background: cert.bg, borderRadius: 24,
          padding: "2rem",
          border: `2px solid ${cert.color}33`,
          boxShadow: `0 20px 50px rgba(0,0,0,.08),0 0 0 1px ${cert.color}18`,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: `${cert.color}18` }} />
          <div style={{ position: "absolute", bottom: -20, left: -20, width: 80, height: 80, borderRadius: "50%", background: `${cert.color}12` }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            {cert.badge && (
              <div style={{ display: "inline-block", padding: ".2rem .7rem", borderRadius: 100, background: "#FCD34D", color: "#92400E", fontSize: "0.68rem", fontWeight: 700, marginBottom: "1rem" }}>{cert.badge}</div>
            )}
            <div style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>{cert.icon}</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.1rem", color: cert.textColor, lineHeight: 1.3, marginBottom: ".4rem" }}>{cert.name}</div>
            <div style={{ fontSize: "0.78rem", color: cert.textColor === "#fff" ? "rgba(255,255,255,.6)" : "#94A3B8", fontWeight: 500 }}>Issued by {cert.issuer}</div>
          </div>

          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: ".4rem" }}>
              {[...Array(4)].map((_, i) => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: cert.color, opacity: .6 + i * .1 }} />)}
            </div>
            <div style={{ fontSize: "0.72rem", color: cert.textColor === "#fff" ? "rgba(255,255,255,.5)" : "#94A3B8" }}>Click to flip ↻</div>
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          background: "#0F172A", borderRadius: 24,
          padding: "2rem",
          border: `2px solid ${cert.color}55`,
          boxShadow: `0 20px 50px rgba(0,0,0,.15),0 0 0 1px ${cert.color}22`,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -30, left: -30, width: 140, height: 140, borderRadius: "50%", background: `${cert.color}15` }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff", marginBottom: "1rem", lineHeight: 1.3 }}>{cert.name}</div>
            <p style={{ fontSize: "0.87rem", color: "#94A3B8", lineHeight: 1.7 }}>{cert.desc}</p>
          </div>

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1rem" }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${cert.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{cert.icon}</div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "#64748B" }}>Issued by</div>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#E2E8F0" }}>{cert.issuer}</div>
              </div>
            </div>
            <button style={{ width: "100%", padding: ".6rem", borderRadius: 8, border: "none", background: cert.color, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}
              onClick={e => { e.stopPropagation(); setFlipped(false); }}>
              ↩ Flip Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications({ course }) {
  const [ref, inView] = useInView(0.1);

  const flipAll = () => {
    // Broadcast event — handled by individual cards via a shared state
  };

  return (
    <section ref={ref} style={{ padding: "6rem 5%", background: "rgba(248,250,255,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid #E8EDF5", borderBottom: "1px solid #E8EDF5", overflow: "hidden", position: "relative" }}>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            Certifications
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: ".8rem" }}>
            Credentials That{" "}
            <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Open Doors</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.75, maxWidth: 500, margin: "0 auto 1.5rem" }}>
            Graduate with certificates that recruiters at top companies actively search for.
          </p>
          <div style={{ display: "flex", gap: ".75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <div style={{ padding: ".4rem 1rem", borderRadius: 100, background: "#F8FAFF", border: "1.5px solid #E2E8F0", fontSize: "0.82rem", color: "#475569", fontWeight: 500 }}>
              🖱️ Click any card to flip it
            </div>
            <div style={{ padding: ".4rem 1rem", borderRadius: 100, background: "#F8FAFF", border: "1.5px solid #E2E8F0", fontSize: "0.82rem", color: "#475569", fontWeight: 500 }}>
              🖱️ Hover to tilt in 3D
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${course.certifications.length},1fr)`, gap: "2rem" }}>
          {course.certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} inView={inView} course={course} />
          ))}
        </div>

        {/* Info strip */}
        <div style={{ marginTop: "2.5rem", padding: "1.5rem 2rem", background: "rgba(255,255,255,.85)", borderRadius: 16, border: "1.5px solid #E8EDF5", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap", opacity: inView ? 1 : 0, transition: "opacity .6s .5s ease", backdropFilter: "blur(10px)" }}>
          <div style={{ fontSize: "1.4rem" }}>🏆</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A" }}>All certificates are immediately shareable on LinkedIn</div>
            <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: ".2rem" }}>Add them to your profile with one click. Verified credentials with unique certificate IDs.</div>
          </div>
          <button style={{ marginLeft: "auto", padding: ".6rem 1.4rem", borderRadius: 8, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.87rem", fontWeight: 700, cursor: "pointer", flexShrink: 0, transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "none"}>
            Enroll to Earn Them →
          </button>
        </div>
      </div>

      <style>{`@media (max-width:800px) { section .certs-grid { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}
