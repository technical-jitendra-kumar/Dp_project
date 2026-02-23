import { Link } from "react-router-dom";

const cols = [
  { title: "Programs", links: ["Data Analytics","Business Analytics","Data Science & AI","Agentic AI","Investment Banking","Masters Track"] },
  { title: "Resources", links: ["Blog","Free Workshops","Interview Prep Guide","Career Roadmaps","Alumni Stories","Case Studies"] },
  { title: "Company",   links: ["About Us","Our Mentors","Hiring Partners","Events","Contact Us","Privacy Policy"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0F172A", padding: "5rem 5% 2rem", borderTop: "1px solid #1E293B", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <div className="dp-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
        <div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 900, letterSpacing: "-0.5px", marginBottom: "1rem" }}>
            <span style={{ color: "#fff" }}>Data</span><span style={{ color: "#60A5FA" }}>Preneur</span>
          </div>
          <p style={{ fontSize: "0.87rem", color: "#64748B", lineHeight: 1.75, maxWidth: 300, marginBottom: "1.5rem" }}>
            Empowering the next generation of data professionals and financial analysts across India since 2020.
          </p>
          <div style={{ display: "flex", gap: ".6rem" }}>
            {["in","𝕏","▶","📸"].map((s,i) => (
              <div key={i} style={{ width: 38, height: 38, borderRadius: 9, border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", color: "#64748B", cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="#60A5FA"; e.currentTarget.style.color="#60A5FA"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="#334155"; e.currentTarget.style.color="#64748B"; }}>
                {s}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>📍 Sector-62, Noida, UP 201301</span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>📞 +91-98100-00000</span>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>✉️ hello@datapreneur.in</span>
          </div>
        </div>

        {cols.map((col) => (
          <div key={col.title}>
            <div style={{ fontWeight: 700, fontSize: "0.82rem", color: "#E2E8F0", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "1.2rem" }}>{col.title}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: ".6rem" }}>
              {col.links.map(l => (
                <li key={l}>
                  <span style={{ fontSize: "0.87rem", color: "#64748B", cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color="#60A5FA"}
                    onMouseLeave={e => e.currentTarget.style.color="#64748B"}>
                    {l}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", borderTop: "1px solid #1E293B", fontSize: "0.8rem", color: "#475569", flexWrap: "wrap", gap: "1rem" }}>
        <span>© 2025 DataPreneur Education Pvt. Ltd. All rights reserved.</span>
        <span>Made with ❤️ for aspiring data professionals across India</span>
      </div>

      <style>{`
        @media (max-width: 768px) { .dp-footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .dp-footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
