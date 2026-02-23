import { useState } from "react";
import { useInView } from "../../hooks/useInView";

function OfferCard({ offer, index, inView, course }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#fff" : "rgba(255,255,255,.8)",
        borderRadius: 20, padding: "2rem",
        border: `1.5px solid ${hov ? `rgba(${course.accentRgb},.35)` : "#E8EDF5"}`,
        boxShadow: hov ? `0 20px 50px rgba(${course.accentRgb},.1),0 4px 16px rgba(0,0,0,.06)` : "0 2px 8px rgba(0,0,0,.04)",
        transform: inView ? (hov ? "translateY(-8px)" : "none") : "translateY(28px)",
        opacity: inView ? 1 : 0,
        transition: `all .5s ${index * .08}s ease`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        cursor: "default", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: 60, height: 60, background: `radial-gradient(circle at 0 0,rgba(${course.accentRgb},.08),transparent 70%)`, borderRadius: "20px 0 0 0" }} />
      <div style={{ width: 52, height: 52, borderRadius: 14, background: course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.15)`, transition: "transform .3s", transform: hov ? "scale(1.1) rotate(5deg)" : "none" }}>
        {offer.icon}
      </div>
      <h3 style={{ fontWeight: 800, fontSize: "1rem", color: "#0F172A", marginBottom: ".5rem", lineHeight: 1.3 }}>{offer.title}</h3>
      <p style={{ fontSize: "0.87rem", color: "#64748B", lineHeight: 1.7 }}>{offer.desc}</p>
      <div style={{ height: 2, background: course.accent, borderRadius: 2, marginTop: "1.2rem", transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .35s ease", width: "100%" }} />
    </div>
  );
}

export default function WhatItOffers({ course }) {
  const [ref, inView] = useInView(0.08);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,transparent,${course.accent},transparent)` }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(24px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            What You Get
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: ".8rem" }}>
            Everything in This{" "}
            <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Program</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.75, maxWidth: 520, margin: "0 auto" }}>
            Every element of this program is designed around one goal — getting you placed at a top company.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {course.offers.map((offer, i) => (
            <OfferCard key={i} offer={offer} index={i} inView={inView} course={course} />
          ))}
        </div>
      </div>
      <style>{`@media (max-width:900px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr 1fr !important}} @media (max-width:600px){div[style*="repeat(3,1fr)"]{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
}
