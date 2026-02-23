import { useInView } from "../../hooks/useInView";
import { STEPS } from "../../data/companies";

export default function ProcessSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="process" ref={ref} style={{ padding: "6rem 5%", background: "#0F172A", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: "rgba(0,87,255,.08)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: "rgba(124,58,237,.07)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 580, marginBottom: "3.5rem" }}>
          <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#60A5FA", marginBottom: ".6rem" }}>How It Works</div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.5px", color: "#fff", marginBottom: ".8rem" }}>
            Your Path from <em style={{ fontStyle: "italic", color: "#60A5FA" }}>Student</em> to <em style={{ fontStyle: "italic", color: "#A78BFA" }}>Professional</em>
          </h2>
          <p style={{ fontSize: "1rem", color: "#94A3B8", lineHeight: 1.75 }}>A structured 4-step journey designed so you never feel lost, overwhelmed, or alone.</p>
        </div>

        <div className="dp-steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
          {STEPS.map((step, i) => (
            <div key={step.n} style={{
              background: "rgba(30,41,59,.8)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              borderRadius: 20, padding: "2rem", border: "1px solid rgba(51,65,85,.8)",
              transition: `opacity .5s ${i*.1}s, transform .5s ${i*.1}s`,
              opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -10, right: -5, fontFamily: "'Fraunces',serif", fontSize: "5rem", fontWeight: 900, color: "rgba(255,255,255,.03)", lineHeight: 1, userSelect: "none" }}>{step.n}</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2.5rem", fontWeight: 900, color: "#1E40AF", lineHeight: 1, marginBottom: ".8rem" }}>{step.n}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "#fff", marginBottom: ".5rem" }}>{step.title}</div>
              <div style={{ fontSize: "0.84rem", color: "#94A3B8", lineHeight: 1.65 }}>{step.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "3rem", padding: "2rem 2.5rem", background: "rgba(30,41,59,.6)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 16, border: "1px solid rgba(51,65,85,.8)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", opacity: inView ? 1 : 0, transition: "opacity .6s .45s" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", fontWeight: 800, color: "#fff", marginBottom: ".3rem" }}>Ready to start your journey?</div>
            <div style={{ fontSize: "0.88rem", color: "#94A3B8" }}>Book a free 30-min session — no pressure, just honest career guidance.</div>
          </div>
          <button style={{ padding: ".85rem 2rem", borderRadius: 10, border: "none", background: "#0057FF", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,87,255,.4)", transition: "all .2s", whiteSpace: "nowrap" }}
            onMouseEnter={e => { e.currentTarget.style.background="#0047DD"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#0057FF"; e.currentTarget.style.transform="none"; }}>
            Book Free Counselling →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .dp-steps-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .dp-steps-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
