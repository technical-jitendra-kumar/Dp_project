export default function CTASection() {
  return (
    <section style={{ padding: "8rem 5%", textAlign: "center", background: "linear-gradient(135deg,rgba(238,243,255,.9),rgba(245,243,255,.9) 50%,rgba(255,248,236,.9))", position: "relative", overflow: "hidden", borderTop: "1px solid #E8EDF5", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
      <div style={{ position: "absolute", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "rgba(0,87,255,.07)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 250, height: 250, borderRadius: "50%", background: "rgba(124,58,237,.07)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#0057FF", marginBottom: ".8rem" }}>Take the Next Step</div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2.2rem,4vw,3.5rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-1px", maxWidth: 680, margin: "0 auto 1rem", color: "#0F172A" }}>
          Your Data Career<br />Starts <em style={{ fontStyle: "italic", color: "#0057FF" }}>Today</em>
        </h2>
        <p style={{ color: "#64748B", fontSize: "1.05rem", marginBottom: "2.5rem" }}>Book a free 30-minute career counselling session. Honest guidance, zero pressure.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{ padding: ".9rem 2.2rem", borderRadius: 10, border: "none", background: "#0057FF", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,87,255,.35)", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#0047DD"; e.currentTarget.style.transform="translateY(-2px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#0057FF"; e.currentTarget.style.transform="none"; }}>
            Book Free Counselling
          </button>
          <button style={{ padding: ".9rem 2.2rem", borderRadius: 10, border: "1.5px solid #CBD5E1", background: "rgba(255,255,255,.8)", color: "#0F172A", fontSize: "1rem", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", transition: "all .2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor="#0057FF"}
            onMouseLeave={e => e.currentTarget.style.borderColor="#CBD5E1"}>
            Download Brochure ↓
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
          {["✅ No spam, ever","🔒 Your data is safe","📞 Real humans on call","⚡ Reply within 2 hours"].map(i => (
            <span key={i} style={{ fontSize: "0.85rem", color: "#64748B", fontWeight: 500 }}>{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
