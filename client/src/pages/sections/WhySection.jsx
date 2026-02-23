import { useInView, useCounter } from "../../hooks/useInView";
import { FEATURES } from "../../data/companies";

function Num({ target, inView }) {
  const v = useCounter(target, inView);
  return <>{v}</>;
}

export default function WhySection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="why" ref={ref} style={{ background: "rgba(248,250,255,.6)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", borderTop: "1px solid #E8EDF5", borderBottom: "1px solid #E8EDF5", padding: "6rem 5%", position: "relative" }}>
      <div className="dp-why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#0057FF", marginBottom: ".6rem" }}>Why DataPreneur</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.5px", color: "#0F172A", marginBottom: "1rem" }}>
            Built for{" "}
            <span style={{ background: "linear-gradient(135deg,#0057FF,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Real Outcomes</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.75, maxWidth: 480 }}>We're not a course platform. We're a career accelerator built by people who've hired at Google, JPMorgan, and Amazon.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "2.5rem" }}>
            {FEATURES.map((feat, i) => (
              <div key={feat.title} style={{ background: "rgba(255,255,255,.85)", borderRadius: 16, padding: "1.5rem", border: "1.5px solid #E8EDF5", boxShadow: "0 2px 8px rgba(0,0,0,.04)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", transition: `opacity .5s ${i*.1}s, transform .5s ${i*.1}s`, opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: ".8rem" }}>{feat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A", marginBottom: ".3rem" }}>{feat.title}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.65 }}>{feat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Metrics */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ background: "linear-gradient(135deg,#0057FF,#3B82F6)", borderRadius: 20, padding: "2rem", color: "#fff", textAlign: "center", boxShadow: "0 12px 40px rgba(0,87,255,.25)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "opacity .6s, transform .6s" }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: "3.5rem", fontWeight: 900, lineHeight: 1 }}>
              {inView ? <><Num target={94} inView={inView} />%</> : "0%"}
            </div>
            <div style={{ fontSize: "0.9rem", opacity: .85, marginTop: ".4rem" }}>Overall Placement Rate</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            {[{ n: 2400, suf: "+", lbl: "Alumni" }, { n: 180, suf: "+", lbl: "Partners" }, { n: 5, suf: ".0★", lbl: "Rating" }].map((m, i) => (
              <div key={m.lbl} style={{ background: "rgba(255,255,255,.85)", borderRadius: 16, padding: "1.3rem", border: "1.5px solid #E8EDF5", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,.04)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: `opacity .6s ${.2+i*.1}s, transform .6s ${.2+i*.1}s` }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 900, color: "#0F172A" }}>
                  {m.lbl === "Rating" ? "4.9★" : <>{inView ? <Num target={m.n} inView={inView} /> : 0}{m.suf}</>}
                </div>
                <div style={{ fontSize: "0.72rem", color: "#94A3B8", marginTop: ".2rem" }}>{m.lbl}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,.85)", borderRadius: 16, padding: "1.5rem", border: "1.5px solid #E8EDF5", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", opacity: inView ? 1 : 0, transition: "opacity .6s .4s" }}>
            <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0F172A", marginBottom: "1rem" }}>Recognized & Trusted By</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".6rem" }}>
              {["🏆 Microsoft Learning Partner","🌍 ISO 9001 Certified","📋 NASSCOM Member","⭐ 4.9 on Google Reviews"].map(b => (
                <span key={b} style={{ padding: ".3rem .8rem", borderRadius: 6, background: "#EEF3FF", border: "1px solid #C7D7FF", fontSize: "0.75rem", fontWeight: 600, color: "#0057FF" }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .dp-why-grid { grid-template-columns: 1fr !important; gap: 3rem !important; } }`}</style>
    </section>
  );
}
