import { useState } from "react";
import { useInView } from "../hooks/useInView";
import { HIRING_ROWS, LOGO_COLORS } from "../data/companies";

function LogoIcon({ name, size = 44 }) {
  const color = LOGO_COLORS[name];
  const palette = ["#0057FF","#D97706","#059669","#7C3AED","#DC2626","#0891B2","#9B1D6A","#FF5722"];
  const bg = color || palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 10, background: bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 800,
      fontSize: size * 0.3, color: "#fff", letterSpacing: "-0.5px", flexShrink: 0,
      border: name === "Goldman Sachs" || name === "IBM" ? "1px solid #ddd" : "none",
    }}>{initials}</div>
  );
}

function CompanyCard({ company }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: "0.85rem",
        background: hov ? "#fff" : "rgba(255,255,255,.88)",
        border: `1.5px solid ${hov ? "#0057FF44" : "#E2E8F0"}`,
        borderRadius: 14, padding: ".8rem 1.2rem", marginRight: ".85rem",
        flexShrink: 0, cursor: "pointer", transition: "all .22s ease",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 12px 32px rgba(0,87,255,.12),0 2px 8px rgba(0,0,0,.06)" : "0 1px 4px rgba(0,0,0,.06)",
        minWidth: 200, backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 10, background: "#fff", border: "1px solid #E8EDF5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,.08)" }}>
        <LogoIcon name={company.name} size={36} />
      </div>
      <div>
        <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", color: "#0F172A", lineHeight: 1.3, whiteSpace: "nowrap" }}>{company.name}</div>
        <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: ".15rem", whiteSpace: "nowrap", fontWeight: 500 }}>{company.role}</div>
      </div>
    </div>
  );
}

export default function HiringPartners() {
  const [ref, inView] = useInView(0.08);
  const [paused, setPaused] = useState(false);

  return (
    <section id="hiring-partners" ref={ref} style={{
      background: "rgba(240,245,255,.7)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      padding: "6rem 0 5.5rem", overflow: "hidden", position: "relative",
      borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0",
    }}>
      {/* Dot grid bg */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "radial-gradient(circle,#C7D7FF 1px,transparent 1px)", backgroundSize: "28px 28px", opacity: .45 }} />
      {/* Edge fades */}
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 180, background: "linear-gradient(90deg,rgba(240,245,255,.95),transparent)", pointerEvents: "none", zIndex: 3 }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 180, background: "linear-gradient(270deg,rgba(240,245,255,.95),transparent)", pointerEvents: "none", zIndex: 3 }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "3.5rem", position: "relative", zIndex: 4, padding: "0 5%", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity .6s, transform .6s" }}>
        <div style={{ display: "inline-block", background: "#EEF3FF", border: "1.5px solid #C7D7FF", color: "#0057FF", borderRadius: 100, padding: ".35rem 1.1rem", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem" }}>
          Our Hiring Partners
        </div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, lineHeight: 1.1, color: "#0F172A", letterSpacing: "-0.5px", marginBottom: ".9rem" }}>
          Our Graduates Work at{" "}
          <span style={{ background: "linear-gradient(135deg,#0057FF,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Dream Companies</span>
        </h2>
        <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
          180+ companies actively hiring DataPreneur graduates across data, AI, cloud and finance roles.
        </p>
      </div>

      {/* Carousel rows */}
      <div style={{ position: "relative", zIndex: 4 }} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        {HIRING_ROWS.map((row, rowIdx) => {
          const doubled = [...row, ...row];
          const goRight = rowIdx % 2 === 1;
          const dur = 30 + rowIdx * 7;
          return (
            <div key={rowIdx} style={{
              overflow: "hidden", marginBottom: rowIdx === HIRING_ROWS.length - 1 ? 0 : ".85rem",
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(28px)",
              transition: `opacity .5s ${rowIdx*.1}s, transform .5s ${rowIdx*.1}s`,
            }}>
              <div style={{
                display: "flex", width: "max-content", paddingLeft: ".85rem",
                animation: `${goRight ? "marqueeRight" : "marqueeLeft"} ${dur}s linear infinite`,
                animationPlayState: paused ? "paused" : "running",
              }}>
                {doubled.map((company, i) => <CompanyCard key={`${rowIdx}-${i}`} company={company} />)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Stat strip */}
      <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.88rem", color: "#64748B", position: "relative", zIndex: 4, opacity: inView ? 1 : 0, transition: "opacity .6s .5s" }}>
        <span style={{ color: "#0057FF", fontWeight: 700 }}>180+</span> hiring partners &nbsp;·&nbsp;
        <span style={{ color: "#0057FF", fontWeight: 700 }}>94%</span> placement rate &nbsp;·&nbsp;
        New partners added every quarter across <strong style={{ color: "#0F172A" }}>AI, data, cloud, and finance</strong>.
      </div>
    </section>
  );
}
