import { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../../hooks/useInView";
import { COURSES, TABS } from "../../data/courses";



function CourseCard({ course, index, inView }) {
  const [hov, setHov] = useState(false);
  return (
    <Link to={`/programs/${course.slug}`} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "#fff" : "rgba(255,255,255,.85)",
          border: `1.5px solid ${hov ? course.accent+"55" : "#E8EDF5"}`,
          borderRadius: 20, padding: "2rem",
          boxShadow: hov ? `0 20px 60px rgba(0,0,0,.1),0 4px 16px ${course.accent}22` : "0 2px 12px rgba(0,0,0,.05)",
          transition: "all .3s",
          opacity: inView ? 1 : 0,
          transform: inView ? (hov ? "translateY(-6px)" : "none") : "translateY(24px)",
          transitionDelay: `${index*.08}s`,
          cursor: "pointer", position: "relative", overflow: "hidden",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: course.accent, borderRadius: "20px 20px 0 0" }} />
        {course.badge && <div style={{ position: "absolute", top: 16, right: 16, padding: ".25rem .7rem", borderRadius: 100, background: "#0F172A", color: "#fff", fontSize: "0.7rem", fontWeight: 700 }}>{course.badge}</div>}

        <div style={{ width: 52, height: 52, borderRadius: 14, background: course.accentBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", marginBottom: "1rem" }}>{course.icon}</div>
        <span style={{ display: "inline-block", padding: ".25rem .8rem", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700, background: course.accentBg, color: course.tagColor, marginBottom: ".7rem" }}>{course.tag}</span>

        <h3 style={{ fontFamily: "'Fraunces',serif", fontWeight: 800, fontSize: "1.2rem", color: "#0F172A", marginBottom: ".6rem", lineHeight: 1.25 }}>{course.title}</h3>
        <p style={{ fontSize: "0.87rem", color: "#64748B", lineHeight: 1.7, marginBottom: "1.2rem" }}>{course.desc}</p>

        <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "1.4rem" }}>
          {course.outcomes?.map(o => <span key={o} style={{ padding: ".25rem .6rem", borderRadius: 6, background: "#F8FAFC", border: "1px solid #E2E8F0", fontSize: "0.72rem", fontWeight: 500, color: "#475569" }}>{o}</span>)}
        </div>

        <div style={{ display: "flex", gap: "1rem", padding: "1rem 0 1.2rem", borderTop: "1px solid #F1F5F9", fontSize: "0.78rem", color: "#94A3B8" }}>
          <span>⏱ {course.duration}</span><span>🎥 {course.mode}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1.4rem", fontWeight: 900, color: "#0F172A" }}>{course.price}</span>
          <button style={{ padding: ".65rem 1.4rem", borderRadius: 8, border: "none", background: course.accent, color: "#fff", fontSize: "0.87rem", fontWeight: 700, cursor: "pointer", transition: "all .2s", boxShadow: `0 4px 12px ${course.accent}44` }}>
            Enroll Now →
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function CoursesSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [ref, inView] = useInView(0.05);

  const filtered = activeTab === "all" ? COURSES : COURSES.filter(c => c.cat.includes(activeTab));

  return (
    <section id="programs" ref={ref} style={{ padding: "6rem 5%", position: "relative" }}>
      <div style={{ maxWidth: 640, marginBottom: "2.5rem" }}>
        <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#0057FF", marginBottom: ".6rem" }}>Our Programs</div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.5px", color: "#0F172A", marginBottom: "1rem" }}>
          Choose Your{" "}
          <span style={{ background: "linear-gradient(135deg,#0057FF,#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Career Path</span>
        </h2>
        <p style={{ fontSize: "1rem", color: "#64748B", lineHeight: 1.75 }}>From analytics to AI, each program is designed with one goal — getting you hired at your dream company.</p>
      </div>

      <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: ".5rem 1.2rem", borderRadius: 100,
            border: `1.5px solid ${activeTab===tab.id ? "#0057FF" : "#E2E8F0"}`,
            background: activeTab===tab.id ? "#0057FF" : "rgba(255,255,255,.85)",
            color: activeTab===tab.id ? "#fff" : "#64748B",
            fontSize: "0.85rem", fontWeight: 600, cursor: "pointer", transition: "all .2s",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
        {filtered.map((course, i) => <CourseCard key={course.id} course={course} index={i} inView={inView} />)}
      </div>
    </section>
  );
}
