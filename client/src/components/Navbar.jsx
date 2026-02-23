import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { COURSES } from "../data/courses";

const MEGA_MENU = [
  {
    label: "Programs",
    categories: [
      { key: "data",     label: "Data & Analytics",    icon: "📊", courses: COURSES.filter(c => c.cat.includes("data")) },
      { key: "ai",       label: "AI & Machine Learning",icon: "🤖", courses: COURSES.filter(c => c.cat.includes("ai")) },
      { key: "finance",  label: "Finance & Banking",    icon: "💹", courses: COURSES.filter(c => c.cat.includes("finance")) },
      { key: "business", label: "Business Analytics",   icon: "📈", courses: COURSES.filter(c => c.cat.includes("business")) },
    ],
  },
  {
    label: "Why DataPreneur", simple: true,
    links: [
      { icon: "🎯", title: "Our Approach",       sub: "Small cohorts, real outcomes" },
      { icon: "🏆", title: "Microsoft Certified", sub: "Globally recognized credentials" },
      { icon: "💼", title: "Placement Support",   sub: "180+ hiring partners" },
      { icon: "👥", title: "Our Mentors",          sub: "Industry professionals, not teachers" },
      { icon: "📈", title: "Student Outcomes",     sub: "94% placement rate" },
      { icon: "🌟", title: "Success Stories",      sub: "Real journeys, real salaries" },
    ],
  },
  {
    label: "Resources", simple: true,
    links: [
      { icon: "📝", title: "Blog",            sub: "Data career insights & tutorials" },
      { icon: "🎓", title: "Free Workshops",  sub: "Live sessions every weekend" },
      { icon: "📋", title: "Interview Prep",  sub: "Curated question banks & tips" },
      { icon: "🗺️", title: "Career Roadmaps", sub: "Step-by-step role guides" },
      { icon: "💡", title: "Case Studies",    sub: "Real business problems solved" },
      { icon: "🎙️", title: "Podcast",         sub: "Career stories from alumni" },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [openMenu, setOpenMenu]   = useState(null);
  const [activeCat, setActiveCat] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const navigate   = useNavigate();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const open  = useCallback((lbl) => { clearTimeout(closeTimer.current); setOpenMenu(lbl); }, []);
  const close = useCallback(() => { closeTimer.current = setTimeout(() => setOpenMenu(null), 130); }, []);
  const stay  = useCallback(() => clearTimeout(closeTimer.current), []);

  const scrollTo = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else { navigate("/"); setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100); }
  };

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      {/* ── Nav bar ── */}
      <nav style={{
        display: "flex", alignItems: "center", padding: "0 3%", height: 68,
        background: scrolled ? "rgba(255,255,255,.97)" : "rgba(255,255,255,.92)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid #E2E8F0" : "1px solid #F1F5F9",
        boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,.08)" : "0 2px 8px rgba(0,0,0,.04)",
        transition: "all .25s", gap: 0,
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", flexShrink: 0, marginRight: "2.5rem" }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1.65rem", fontWeight: 900, letterSpacing: "-0.5px", color: "#0F172A", userSelect: "none" }}>
            Data<span style={{ color: "#0057FF" }}>Preneur</span>
          </span>
        </Link>

        {/* Center nav - desktop */}
        <div className="dp-nav-center" style={{ display: "flex", alignItems: "stretch", flex: 1, height: "100%" }}>
          {MEGA_MENU.map((item) => {
            const isOpen = openMenu === item.label;
            return (
              <div key={item.label} style={{ position: "relative", display: "flex", alignItems: "center" }}
                onMouseEnter={() => open(item.label)} onMouseLeave={close}>
                <button style={{
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: ".35rem",
                  padding: "0 1.1rem", height: "100%",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  fontSize: "0.9rem", fontWeight: isOpen ? 700 : 600,
                  color: isOpen ? "#0057FF" : "#1E293B",
                  borderBottom: isOpen ? "2.5px solid #0057FF" : "2.5px solid transparent",
                  transition: "all .2s", whiteSpace: "nowrap",
                }}>
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                    style={{ transition: "transform .2s", transform: isOpen ? "rotate(180deg)" : "none" }}>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            );
          })}

          {[["About Us", "why"], ["Contact", "process"]].map(([lbl, id]) => (
            <button key={lbl} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "0 1.1rem", height: "100%",
              fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontSize: "0.9rem", fontWeight: 600, color: "#1E293B",
              borderBottom: "2.5px solid transparent", transition: "all .2s", whiteSpace: "nowrap",
            }}
              onMouseEnter={e => { e.currentTarget.style.color="#0057FF"; e.currentTarget.style.borderBottomColor="#0057FF"; }}
              onMouseLeave={e => { e.currentTarget.style.color="#1E293B"; e.currentTarget.style.borderBottomColor="transparent"; }}>
              {lbl}
            </button>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem", flexShrink: 0 }}>
          <a href="tel:+919810000000" className="dp-nav-phone" style={{
            display: "flex", alignItems: "center", gap: ".35rem",
            fontSize: "0.82rem", fontWeight: 600, color: "#0057FF",
            textDecoration: "none", padding: ".4rem .8rem",
            border: "1.5px solid #C7D7FF", borderRadius: 8, background: "#F0F5FF",
            transition: "background .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background="#E0EBFF"}
            onMouseLeave={e => e.currentTarget.style.background="#F0F5FF"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12.1 19.79 19.79 0 0 1 1.63 3.58 2 2 0 0 1 3.6 1.37h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/>
            </svg>
            +91-98100-00000
          </a>

          <button style={{ padding: ".5rem 1.2rem", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "transparent", color: "#0F172A", fontSize: "0.87rem", fontWeight: 600, cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor="#0057FF"; e.currentTarget.style.color="#0057FF"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor="#E2E8F0"; e.currentTarget.style.color="#0F172A"; }}>
            Sign In
          </button>

          <button style={{ padding: ".55rem 1.4rem", borderRadius: 8, border: "none", background: "#0057FF", color: "#fff", fontSize: "0.87rem", fontWeight: 700, cursor: "pointer", transition: "all .2s", boxShadow: "0 4px 14px rgba(0,87,255,.28)" }}
            onMouseEnter={e => { e.currentTarget.style.background="#0047DD"; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#0057FF"; e.currentTarget.style.transform="none"; }}>
            Enroll Now
          </button>

          {/* Hamburger */}
          <button className="dp-hamburger" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: ".4rem", alignItems: "center", color: "#0F172A" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>}
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mega dropdowns ── */}
      {MEGA_MENU.map((item) => {
        if (openMenu !== item.label) return null;

        if (item.simple) {
          return (
            <div key={item.label} onMouseEnter={stay} onMouseLeave={close} style={{
              position: "absolute", left: 0, right: 0,
              background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid #E8EDF5", boxShadow: "0 20px 60px rgba(0,0,0,.10)",
              padding: "2rem 5%", animation: "dropdownIn .18s ease",
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", maxWidth: 800 }}>
                {item.links.map((lnk, i) => (
                  <div key={i} style={{ display: "flex", gap: ".8rem", alignItems: "flex-start", padding: ".9rem 1rem", borderRadius: 10, cursor: "pointer", transition: "background .15s" }}
                    onMouseEnter={e => e.currentTarget.style.background="#F0F5FF"}
                    onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "#EEF3FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{lnk.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0F172A", marginBottom: ".15rem" }}>{lnk.title}</div>
                      <div style={{ fontSize: "0.77rem", color: "#94A3B8" }}>{lnk.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        const currentCatKey = activeCat[item.label] || item.categories[0].key;
        const currentCat = item.categories.find(c => c.key === currentCatKey) || item.categories[0];

        return (
          <div key={item.label} onMouseEnter={stay} onMouseLeave={close} style={{
            position: "absolute", left: 0, right: 0,
            background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderTop: "3px solid #0057FF",
            boxShadow: "0 24px 60px rgba(0,0,0,.13)",
            display: "flex", animation: "dropdownIn .18s ease", minHeight: 340,
          }}>
            {/* Category sidebar */}
            <div style={{ width: 240, flexShrink: 0, background: "#F8FAFF", borderRight: "1px solid #E8EDF5", padding: "1.5rem 0" }}>
              <div style={{ padding: "0 1.5rem .75rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94A3B8" }}>Categories</div>
              {item.categories.map((cat) => {
                const isActive = currentCatKey === cat.key;
                return (
                  <div key={cat.key} onMouseEnter={() => setActiveCat(p => ({ ...p, [item.label]: cat.key }))} style={{
                    display: "flex", alignItems: "center", gap: ".8rem", padding: ".85rem 1.5rem",
                    cursor: "pointer", background: isActive ? "#fff" : "transparent",
                    borderLeft: isActive ? "3px solid #0057FF" : "3px solid transparent",
                    transition: "all .15s", position: "relative",
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: isActive ? "#EEF3FF" : "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>{cat.icon}</div>
                    <div>
                      <div style={{ fontWeight: isActive ? 700 : 600, fontSize: "0.88rem", color: isActive ? "#0057FF" : "#374151" }}>{cat.label}</div>
                      <div style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{cat.courses.length} programs</div>
                    </div>
                    {isActive && <svg style={{ position: "absolute", right: 12 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>}
                  </div>
                );
              })}
              <div style={{ padding: "1rem 1.5rem 0", borderTop: "1px solid #E8EDF5", marginTop: ".5rem" }}>
                <Link to="/#programs" onClick={() => setOpenMenu(null)} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontSize: "0.83rem", fontWeight: 700, color: "#0057FF", textDecoration: "none" }}>
                  View All Programs <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>

            {/* Course cards */}
            <div style={{ flex: 1, padding: "1.5rem 2.5rem 2rem" }}>
              <div style={{ marginBottom: "1.2rem" }}>
                <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#94A3B8", marginBottom: ".3rem" }}>{currentCat.label}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", fontWeight: 800, color: "#0F172A" }}>Find Your Program</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: "1rem" }}>
                {currentCat.courses.map((course) => (
                  <Link key={course.slug} to={`/programs/${course.slug}`} style={{ textDecoration: "none" }} onClick={() => setOpenMenu(null)}>
                    <div style={{ background: "#F8FAFF", border: "1.5px solid #E8EDF5", borderRadius: 14, padding: "1.2rem", cursor: "pointer", transition: "all .2s", position: "relative" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor=course.accent+"88"; e.currentTarget.style.background="#fff"; e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.08)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor="#E8EDF5"; e.currentTarget.style.background="#F8FAFF"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
                      {course.badge && <div style={{ position: "absolute", top: 10, right: 10, background: "#0F172A", color: "#fff", fontSize: "0.62rem", fontWeight: 700, padding: ".2rem .5rem", borderRadius: 100 }}>{course.badge}</div>}
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: course.accent+"18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: ".75rem" }}>{course.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A", marginBottom: ".3rem", lineHeight: 1.3 }}>{course.title}</div>
                      <div style={{ fontSize: "0.74rem", color: "#94A3B8", marginBottom: ".75rem" }}>{course.duration} · {course.mode}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: ".3rem", fontSize: "0.78rem", fontWeight: 700, color: course.accent }}>
                        Explore <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "linear-gradient(135deg,#EEF3FF,#F5F3FF)", borderRadius: 12, border: "1px solid #C7D7FF", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: "#0F172A" }}>🎯 Not sure which program fits you?</div>
                  <div style={{ fontSize: "0.78rem", color: "#64748B", marginTop: ".2rem" }}>Book a free 30-min career counselling session with our experts.</div>
                </div>
                <button style={{ padding: ".5rem 1.2rem", borderRadius: 8, border: "none", background: "#0057FF", color: "#fff", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 4px 12px rgba(0,87,255,.25)" }}>
                  Book Free Session
                </button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Mobile nav */}
      {mobileOpen && (
        <div style={{ background: "#fff", borderBottom: "1px solid #E8EDF5", padding: "1rem 5%", boxShadow: "0 8px 24px rgba(0,0,0,.1)", maxHeight: "80vh", overflowY: "auto" }}>
          {MEGA_MENU.map((item) => (
            <div key={item.label} style={{ marginBottom: ".5rem" }}>
              <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A", padding: ".5rem 0" }}>{item.label}</div>
              {item.simple && item.links?.map(l => (
                <div key={l.title} style={{ padding: ".3rem 1rem", fontSize: "0.85rem", color: "#64748B" }}>{l.icon} {l.title}</div>
              ))}
              {!item.simple && item.categories?.flatMap(cat => cat.courses).map(c => (
                <Link key={c.slug} to={`/programs/${c.slug}`} style={{ display: "block", padding: ".3rem 1rem", fontSize: "0.85rem", color: "#0057FF", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                  {c.icon} {c.title}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ display: "flex", gap: ".75rem", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #E8EDF5" }}>
            <button style={{ flex: 1, padding: ".7rem", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "transparent", color: "#0F172A", fontWeight: 600, cursor: "pointer" }}>Sign In</button>
            <button style={{ flex: 1, padding: ".7rem", borderRadius: 8, border: "none", background: "#0057FF", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Enroll Now</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .dp-nav-center { display: none !important; }
          .dp-nav-phone  { display: none !important; }
          .dp-hamburger  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
