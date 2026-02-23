import { useState, useEffect } from "react";

export default function FloatingCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  if (!show) return null;
  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 999 }}>
      <button
        style={{ padding: "1rem 1.6rem", borderRadius: 12, border: "none", background: "#0057FF", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 30px rgba(0,87,255,.4)", animation: "fadeUp .3s ease", transition: "all .2s" }}
        onMouseEnter={e => { e.currentTarget.style.background="#0047DD"; e.currentTarget.style.transform="translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.background="#0057FF"; e.currentTarget.style.transform="none"; }}>
        🎓 Book Free Session
      </button>
    </div>
  );
}
