import React, { useState } from "react";

const accent = "#D4763B";
const bg = "#F8FAFC";
const border = "#E2E8F0";

const categories = [
  {
    id: "flights",
    emoji: "✈️",
    title: "Flights",
    color: "#2E7DAF",
    bg: "#EFF6FC",
    border: "#B8D8EF",
    items: [
      { label: "Delta DL1859: JFK to SJU", detail: "July 14 · departs 7:29pm, arrives 11:53pm · nonstop · 4 passengers", amount: 2944.00, booked: true, paid: true },
      { label: "Delta DL1757: SJU to ATL", detail: "July 21 · departs 12:50pm, arrives 4:40pm · nonstop · 4 passengers", amount: null, booked: true, paid: true, range: "included above" },
      { label: "Delta DL997: ATL to LGA", detail: "July 23 · departs 5:00pm, arrives 7:20pm · nonstop · 3 passengers", amount: 730.20, booked: true, paid: true },
      { label: "Delta DL5379+DL434: MGM to LGA", detail: "July 27 · departs 2:50pm, arrives 8:27pm · 1 stop Atlanta · Alfred only", amount: 337.90, booked: true, paid: true },
    ],
  },
  {
    id: "accommodation",
    emoji: "🏠",
    title: "Accommodation",
    color: "#7B2D8B",
    bg: "#FAF5FC",
    border: "#E2C8F0",
    items: [
      { label: "The Smyth Tribeca — first NYC leg", detail: "July 9-12 · 3 nights · Deluxe King · Alfred + Joycie · I Prefer Member Rate · 85 West Broadway, NY 10007", amount: 1095.00, booked: true },
      { label: "Hamptons Airbnb", detail: "July 12-14 · 2 nights · Alfred, Joycie, Wanda, Steph (4 × $361) · 19 Oceanview Rd, Hampton Bays, NY 11946", amount: 1444.00, booked: true, paid: true },
      { label: "PR Airbnb", detail: "July 14-21 · 7 nights · group · 818 Avenida Juan Ponce de León, San Juan, PR 00907", amount: 3459.31, booked: true, paid: true },
      { label: "Atlanta Airbnb", detail: "July 21-23 · 2 nights · 4 guests · 505 Pharr Rd NE, Buckhead, Atlanta GA 30305", amount: 486.95, booked: true },
      { label: "The Frederick Hotel — last NYC leg", detail: "July 27-30 · 3 nights · Studio 1 King Bed · Best Flexible Rate · Alfred + Joycie · 95 West Broadway", amount: 1705.36, booked: true },
    ],
  },
  {
    id: "dinner",
    emoji: "🎂🎷",
    title: "Birthday Concert",
    color: "#A07800",
    bg: "#FFFBEB",
    border: "#F5E4A0",
    items: [
      { label: "Lionel Richie and EWF Tickets", detail: "July 11 · Standard Admission · $300.50 × 6 plus $324.60 service fee", amount: 2127.60, booked: true, paid: true },
    ],
  },
  {
    id: "hamptons",
    emoji: "🍷",
    title: "Hamptons Extras",
    color: "#5A8A5E",
    bg: "#F1F7F2",
    border: "#C2DBC4",
    items: [
      { label: "Wolffer Winery Tour and Tasting", detail: "July 12 · 4 × $150 · Alfred, Joycie, Wanda, Steph · booking to be made and charged on June 28", amount: 600.00, booked: false },
      { label: "Car 1 — Avis Standard Elite SUV", detail: "July 12-14 · pickup 106 York St Brooklyn at 8:30am, drop-off JFK July 14 at 5pm", amount: 462.31, booked: true },
    ],
  },
];

const paidTotal = categories.flatMap(c => c.items).filter(i => i.paid && i.amount).reduce((s, i) => s + i.amount, 0);
const toBePaidTotal = categories.flatMap(c => c.items).filter(i => i.booked && !i.paid && i.amount).reduce((s, i) => s + i.amount, 0);
const allPricedTotal = categories.flatMap(c => c.items).filter(i => i.amount).reduce((s, i) => s + i.amount, 0);

function fmt(n) {
  return "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function CategorySection({ cat }) {
  const [open, setOpen] = useState(true);
  const subtotal = cat.items.filter(i => i.amount).reduce((s, i) => s + i.amount, 0);
  return (
    <div style={{ background: "white", borderRadius: "14px", border: "1px solid " + cat.border, overflow: "hidden", marginBottom: "14px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
      <div onClick={() => setOpen(!open)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", cursor: "pointer", background: cat.bg, borderBottom: open ? "1px solid " + cat.border : "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "18px" }}>{cat.emoji}</span>
          <span style={{ fontSize: "14px", fontWeight: "700", color: "#1E293B" }}>{cat.title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {subtotal > 0 && <span style={{ fontSize: "13px", fontWeight: "700", color: cat.color }}>{fmt(subtotal)}</span>}
          <span style={{ color: "#94A3B8", fontSize: "13px", transform: open ? "rotate(0deg)" : "rotate(-90deg)", transition: "transform 0.2s", display: "inline-block" }}>▾</span>
        </div>
      </div>
      {open && (
        <div style={{ padding: "4px 20px 14px" }}>
          {cat.items.map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: i < cat.items.length - 1 ? "1px solid #F1F5F9" : "none", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#1E293B", lineHeight: "1", marginBottom: (item.paid || item.booked) ? "0px" : "6px" }}>{item.label}</div>
                {item.paid && <span style={{ display: "inline-block", fontSize: "10px", fontWeight: "700", color: "#2E7D32", background: "#E8F5E9", padding: "1px 7px", borderRadius: "5px", marginBottom: "4px", lineHeight: "1.4" }}>Paid</span>}
                {!item.paid && item.booked && <span style={{ display: "inline-block", fontSize: "10px", fontWeight: "700", color: "#2E7DAF", background: "#EFF6FC", padding: "1px 7px", borderRadius: "5px", marginBottom: "4px", lineHeight: "1.4" }}>Booked</span>}
                <div style={{ fontSize: "11.5px", color: "#64748B", lineHeight: 1.45, fontStyle: "italic" }}>{item.detail}</div>
              </div>
              <div style={{ whiteSpace: "nowrap", flexShrink: 0, fontSize: "13px", fontWeight: "600", color: "#475569", lineHeight: "1" }}>
                {item.amount != null ? fmt(item.amount) : (item.range || "TBD")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CostEstimate() {
  React.useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: bg, padding: "36px 20px 60px", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <div style={{ maxWidth: "660px", margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{ display: "inline-block", fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", textTransform: "uppercase", color: accent, background: "#FFF0E6", border: "1px solid #F5D5B8", borderRadius: "20px", padding: "4px 14px", marginBottom: "14px" }}>
            For Alfred + Joycie
          </div>
          <h1 style={{ fontSize: "clamp(26px, 6vw, 38px)", fontWeight: "800", color: "#0F172A", margin: "0 0 6px", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
            💰 Wanda&apos;s 30th — Cost Estimate (as of 06-22)
          </h1>
          <p style={{ color: "#64748B", fontSize: "13px", margin: "6px 0 0" }}>
            Wanda's 30th Birthday Trip · All amounts in USD
          </p>
          <div style={{ fontSize: "11px", color: "#94A3B8", marginTop: "8px", letterSpacing: "0.03em" }}>Last updated June 22, 2026</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          {[
            { label: "Paid so far", value: fmt(paidTotal), color: "#2E7D32" },
            { label: "To be paid later", value: fmt(toBePaidTotal), color: "#D4763B" },
            { label: "Total", value: fmt(allPricedTotal), color: "#7B2D8B" },
          ].map((card, i) => (
            <div key={i} style={{ background: "white", borderRadius: "12px", border: "1px solid " + border, padding: "14px 12px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
              <div style={{ fontSize: "15px", fontWeight: "800", color: card.color, marginBottom: "4px" }}>{card.value}</div>
              <div style={{ fontSize: "10px", color: "#64748B", lineHeight: 1.3 }}>{card.label}</div>
            </div>
          ))}
        </div>

        {categories.map(cat => <CategorySection key={cat.id} cat={cat} />)}

        <div style={{ background: "white", borderRadius: "14px", border: "1px solid " + border, padding: "16px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: "11px", fontWeight: "800", letterSpacing: "0.12em", textTransform: "uppercase", color: accent, marginBottom: "12px" }}>Notes</div>
          {[
            "Items marked Booked (not yet Paid) will be charged to card a few days prior to service or on arrival.",
            "Money should arrive in Wanda's account by July 1 ideally. Prioritize the items that have been paid so far—we can split up the transfers for those into multiple payments. For the items that will be charged later the money should arrive in Wanda's account by July 8.",
            "Wanda and Steph can cover PR and Atlanta meals, transport and activities—not included above.",
            "Wanda will arrange a car pickup for Alfred from LGA on July 27.",
          ].map((note, i, arr) => (
            <div key={i} style={{ display: "flex", gap: "8px", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid #F1F5F9" : "none", alignItems: "flex-start" }}>
              <span style={{ color: accent, fontWeight: "800", fontSize: "16px", lineHeight: 1, flexShrink: 0, marginTop: "1px" }}>·</span>
              <div style={{ fontSize: "12.5px", color: "#475569", lineHeight: 1.5 }}>{note}</div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
