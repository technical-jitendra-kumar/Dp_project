import { useState } from "react";
import { useInView } from "../../hooks/useInView";

function FAQItem({ faq, index, inView, course }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: open ? "#fff" : "rgba(255,255,255,.8)",
        borderRadius: 16,
        border: `2px solid ${open ? `rgba(${course.accentRgb},.35)` : "#E8EDF5"}`,
        overflow: "hidden",
        transition: "all .3s ease",
        boxShadow: open ? `0 12px 32px rgba(${course.accentRgb},.1)` : "0 2px 8px rgba(0,0,0,.04)",
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(18px)",
        transitionDelay: `${index * .07}s`,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "1.3rem 1.6rem", background: "none", border: "none", cursor: "pointer",
          textAlign: "left", gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", flex: 1 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: open ? course.accent : course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s", flexShrink: 0 }}>
            <span style={{ color: open ? "#fff" : course.accent, fontWeight: 900, fontSize: "0.85rem", transition: "all .3s" }}>?</span>
          </div>
          <span style={{ fontWeight: 700, fontSize: "0.97rem", color: open ? "#0F172A" : "#374151", lineHeight: 1.4 }}>{faq.q}</span>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: "50%",
          background: open ? course.accent : "#F1F5F9",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, transition: "all .3s",
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transition: "transform .3s", transform: open ? "rotate(45deg)" : "none" }}>
            <path d="M7 1v12M1 7h12" stroke={open ? "#fff" : "#64748B"} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* Answer */}
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: "hidden",
        transition: "max-height .4s cubic-bezier(.4,0,.2,1)",
      }}>
        <div style={{ padding: "0 1.6rem 1.4rem", paddingLeft: "calc(1.6rem + 48px)" }}>
          <p style={{ fontSize: "0.92rem", color: "#475569", lineHeight: 1.75, margin: 0 }}>{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ course }) {
  const [ref, inView] = useInView(0.05);
  const [openAll, setOpenAll] = useState(false);

  return (
    <section ref={ref} style={{ padding: "6rem 5%", position: "relative", overflow: "hidden" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 70% 50%,rgba(${course.accentRgb},.04) 0%,transparent 60%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)", transition: "all .6s ease" }}>
          <div style={{ display: "inline-block", padding: ".35rem 1.1rem", borderRadius: 100, background: course.accentBg, color: course.accent, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: "1.2rem", border: `1.5px solid rgba(${course.accentRgb},.2)` }}>
            FAQ
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 900, color: "#0F172A", lineHeight: 1.1, letterSpacing: "-0.5px", marginBottom: ".8rem" }}>
            Got{" "}
            <span style={{ background: `linear-gradient(135deg,${course.accent},${course.accent}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Questions?</span>
          </h2>
          <p style={{ color: "#64748B", fontSize: "1rem", lineHeight: 1.75, maxWidth: 440, margin: "0 auto" }}>
            Everything you need to know before enrolling. Can't find your answer? Talk to our team.
          </p>
        </div>

        {/* FAQ list */}
        <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
          {course.faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} inView={inView} course={course} />
          ))}
        </div>

        {/* Still have questions */}
        <div style={{ marginTop: "3rem", padding: "2rem 2.5rem", background: `linear-gradient(135deg,${course.accentBg},rgba(255,255,255,.8))`, borderRadius: 20, border: `2px solid rgba(${course.accentRgb},.2)`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(16px)", transition: "all .6s .5s ease" }}>
          <div>
            <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 900, fontSize: "1.2rem", color: "#0F172A", marginBottom: ".35rem" }}>Still have questions?</div>
            <p style={{ fontSize: "0.88rem", color: "#64748B", margin: 0 }}>Our team responds within 2 hours. No bots, no scripts — just honest answers.</p>
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
            <button style={{ padding: ".75rem 1.5rem", borderRadius: 10, border: `2px solid rgba(${course.accentRgb},.3)`, background: "rgba(255,255,255,.8)", color: course.accent, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}>
              📞 Call Us
            </button>
            <button style={{ padding: ".75rem 1.5rem", borderRadius: 10, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 6px 18px rgba(${course.accentRgb},.3)`, transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 24px rgba(${course.accentRgb},.4)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 6px 18px rgba(${course.accentRgb},.3)`; }}>
              💬 Chat Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
