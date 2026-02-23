import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import HiringPartners from "../components/HiringPartners";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import { COURSES } from "../data/courses";

export default function ProgramPage() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const course    = COURSES.find(c => c.slug === slug);

  useEffect(() => { if (!course) navigate("/"); }, [course, navigate]);
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!course) return null;

  const related = COURSES.filter(c => c.slug !== slug && c.cat.split(" ").some(cat => course.cat.split(" ").includes(cat))).slice(0, 3);

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section style={{ minHeight: "60vh", display: "flex", alignItems: "center", padding: "140px 5% 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 60% at 80% 40%,${course.accent}10 0%,transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, animation: "fadeUp .6s ease both" }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: "1.5rem", fontSize: "0.83rem", color: "#64748B" }}>
            <Link to="/" style={{ color: "#0057FF", textDecoration: "none", fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <Link to="/#programs" style={{ color: "#0057FF", textDecoration: "none", fontWeight: 600 }}>Programs</Link>
            <span>›</span>
            <span style={{ color: "#94A3B8" }}>{course.title}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
            <span style={{ padding: ".3rem .9rem", borderRadius: 100, background: course.accentBg, color: course.tagColor, fontSize: "0.75rem", fontWeight: 700 }}>{course.tag}</span>
            {course.badge && <span style={{ padding: ".3rem .9rem", borderRadius: 100, background: "#0F172A", color: "#fff", fontSize: "0.75rem", fontWeight: 700 }}>{course.badge}</span>}
          </div>

          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2.4rem,4vw,3.8rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-1px", color: "#0F172A", marginBottom: "1.2rem" }}>
            {course.icon} {course.title}
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#475569", lineHeight: 1.75, maxWidth: 600, marginBottom: "2rem" }}>{course.longDesc}</p>

          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {[{ icon: "⏱", v: course.duration }, { icon: "🎥", v: course.mode }, { icon: "💰", v: course.price }].map(({ icon, v }) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: ".4rem", padding: ".5rem 1.1rem", borderRadius: 100, background: "rgba(255,255,255,.85)", border: "1.5px solid #E2E8F0", fontSize: "0.87rem", fontWeight: 600, color: "#0F172A", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                {icon} {v}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button style={{ padding: ".9rem 2.2rem", borderRadius: 10, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${course.accent}55`, transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform="none"}>
              Enroll Now — {course.price}
            </button>
            <button style={{ padding: ".9rem 2.2rem", borderRadius: 10, border: "1.5px solid #CBD5E1", background: "rgba(255,255,255,.8)", color: "#0F172A", fontSize: "1rem", fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)", transition: "all .2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor=course.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor="#CBD5E1"}>
              Book Free Counselling
            </button>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <div style={{ padding: "0 5% 6rem" }}>
        <div className="dp-prog-layout" style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", maxWidth: 1200, margin: "0 auto", alignItems: "start" }}>

          {/* LEFT */}
          <div>
            {/* Curriculum */}
            <div style={{ background: "rgba(255,255,255,.85)", borderRadius: 20, padding: "2rem", border: "1.5px solid #E8EDF5", marginBottom: "1.5rem", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.2rem" }}>What You'll Learn</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {course.curriculum.map(item => (
                  <div key={item} style={{ display: "flex", gap: ".75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "#0057FF", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: "0.95rem", color: "#374151", lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div style={{ background: "rgba(255,255,255,.85)", borderRadius: 20, padding: "2rem", border: "1.5px solid #E8EDF5", marginBottom: "1.5rem", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.2rem" }}>Career Outcomes</h2>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                {course.outcomes.map(o => (
                  <span key={o} style={{ padding: ".4rem 1rem", borderRadius: 8, background: course.accentBg, border: `1.5px solid ${course.accent}33`, fontSize: "0.87rem", fontWeight: 600, color: course.tagColor }}>{o}</span>
                ))}
              </div>
            </div>

            {/* Mentors */}
            <div style={{ background: "rgba(255,255,255,.85)", borderRadius: 20, padding: "2rem", border: "1.5px solid #E8EDF5", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.2rem" }}>Your Mentors</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {course.mentors.map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.2rem", borderRadius: 12, background: "#F8FAFF", border: "1.5px solid #E8EDF5" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: `hsl(${i*80+220},80%,55%)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", color: "#fff", flexShrink: 0 }}>{m[0]}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#0F172A" }}>{m.split(" – ")[0]}</div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B", marginTop: ".1rem" }}>{m.split(" – ")[1] || ""}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div style={{ marginTop: "2rem" }}>
                <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.5rem", fontWeight: 800, color: "#0F172A", marginBottom: "1.2rem" }}>Related Programs</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: "1rem" }}>
                  {related.map(rc => (
                    <Link key={rc.slug} to={`/programs/${rc.slug}`} style={{ textDecoration: "none" }}>
                      <div style={{ background: "rgba(255,255,255,.85)", borderRadius: 16, padding: "1.5rem", border: "1.5px solid #E8EDF5", cursor: "pointer", transition: "all .2s", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor=rc.accent+"77"; e.currentTarget.style.transform="translateY(-3px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.08)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor="#E8EDF5"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                        <div style={{ fontSize: "1.4rem", marginBottom: ".6rem" }}>{rc.icon}</div>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A", marginBottom: ".3rem" }}>{rc.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{rc.duration} · {rc.price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT sticky card */}
          <div style={{ position: "sticky", top: 90 }}>
            <div style={{ background: "rgba(255,255,255,.92)", borderRadius: 20, padding: "2rem", border: "1.5px solid #E8EDF5", boxShadow: "0 20px 60px rgba(0,0,0,.1)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "0.78rem", color: "#94A3B8", fontWeight: 600, marginBottom: ".3rem" }}>PROGRAM FEE</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2.5rem", fontWeight: 900, color: "#0F172A" }}>{course.price}</div>
                <div style={{ fontSize: "0.82rem", color: "#64748B", marginTop: ".3rem" }}>EMI available from ₹3,000/month</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid #F1F5F9" }}>
                {[["⏱ Duration", course.duration], ["🎥 Format", course.mode], ["👥 Batch Size", "Max 25 students"], ["🏆 Certificate", "Microsoft Certified"]].map(([lbl, val]) => (
                  <div key={lbl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "#64748B" }}>{lbl}</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#0F172A" }}>{val}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: ".75rem" }}>
                <button style={{ width: "100%", padding: ".9rem", borderRadius: 10, border: "none", background: course.accent, color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${course.accent}44`, transition: "all .2s" }}
                  onMouseEnter={e => e.currentTarget.style.transform="translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform="none"}>
                  Enroll Now
                </button>
                <button style={{ width: "100%", padding: ".9rem", borderRadius: 10, border: `1.5px solid ${course.accent}55`, background: course.accentBg, color: course.tagColor, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all .2s" }}>
                  Book Free Counselling
                </button>
              </div>

              <div style={{ textAlign: "center", marginTop: "1.2rem", fontSize: "0.78rem", color: "#94A3B8" }}>🔒 Secure checkout · No spam · EMI available</div>
            </div>

            <div style={{ marginTop: "1rem", padding: "1.2rem 1.5rem", borderRadius: 16, background: "linear-gradient(135deg,#EEF3FF,#F5F3FF)", border: "1.5px solid #C7D7FF" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A", marginBottom: ".4rem" }}>💼 100% Placement Support</div>
              <div style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>Resume reviews, mock interviews & direct referrals to 180+ hiring partners.</div>
            </div>
          </div>
        </div>
      </div>

      <HiringPartners />
      <Footer />
      <FloatingCTA />

      <style>{`
        @media (max-width: 900px) { .dp-prog-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </>
  );
}
