const ITEMS = ["📊 Data Analytics","🤖 Agentic AI","🧠 Data Science","💹 Investment Banking","📈 Business Analytics","🚀 Masters Track","✅ 94% Placement Rate","🏆 Microsoft Certified","👥 Small Cohorts","💼 180+ Hiring Partners","📞 Mentor-on-Call"];

export default function TickerSection() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div style={{ background: "#0F172A", overflow: "hidden", padding: ".75rem 0" }}>
      <div style={{ display: "flex", gap: "3rem", animation: "ticker 35s linear infinite", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", color: "#94A3B8", fontSize: "0.82rem", fontWeight: 500, flexShrink: 0 }}>
            <span style={{ color: "#0057FF", fontSize: "0.5rem" }}>●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
