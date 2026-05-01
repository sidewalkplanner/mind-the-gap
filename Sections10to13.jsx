
// Sections 10–13: SIP Today, Eight Pathways, Decision Tree, Credits

function S10SIP({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const sage = "#B6BFB1", green = "#2D6A4F";

  const FeeChart = () =>
    React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#F7F4EF", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "SIP Fee Structure — Post-Initiative 307"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 28 } }, "Annual fee by parcel type · Income-qualified rebates available"),
      [
        { type: "Single-family residential (standard)", fee: "~$50–80/yr", bar: 0.25, note: "Flat rate post-Council refinement" },
        { type: "Multi-family residential", fee: "~$120–200/yr", bar: 0.45, note: "Scaled by frontage" },
        { type: "Commercial", fee: "~$300–600/yr", bar: 0.75, note: "Larger parcels pay more" },
        { type: "Industrial / large institutional", fee: "~$600–1,200/yr", bar: 1.0, note: "Highest frontage exposure" },
      ].map((row, i) =>
        React.createElement("div", { key: i, style: { marginBottom: 20 } },
          React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 6 } },
            React.createElement("span", { style: { fontSize: 13, color: navy, fontWeight: 600 } }, row.type),
            React.createElement("span", { style: { fontSize: 13, color: rust, fontWeight: 700 } }, row.fee)
          ),
          React.createElement("div", { style: { height: 10, background: "rgba(27,58,75,0.08)", borderRadius: 5, overflow: "hidden" } },
            React.createElement("div", { style: { height: "100%", width: `${row.bar * 100}%`, background: navy, borderRadius: 5 } })
          ),
          React.createElement("div", { style: { fontSize: 11, color: "#888", marginTop: 3 } }, row.note)
        )
      ),
      React.createElement("div", { style: { marginTop: 16, padding: "12px 14px", background: "rgba(45,106,79,0.08)", borderRadius: 6, border: `1px solid ${green}` } },
        React.createElement("span", { style: { fontSize: 12, color: green, fontWeight: 700 } }, "Income-qualified rebates: "),
        React.createElement("span", { style: { fontSize: 12, color: "#555" } }, "Eligible households can apply for fee reduction or waiver through the city.")
      )
    );

  const FundingGap = () => {
    const annual = 28; // ~$28M estimated annual revenue
    const need = 1100 / 9; // $1.1B over 9 years
    const pct = annual / need;
    return React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#fff", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "Annual SIP Revenue vs. Need"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 32 } }, "$1.1B total need over 9-year master plan"),
      React.createElement("div", { style: { display: "flex", gap: 24, alignItems: "flex-end", marginBottom: 24 } },
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { height: 200, background: "rgba(27,58,75,0.06)", borderRadius: 6, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" } },
            React.createElement("div", { style: { width: "100%", height: `${pct * 100}%`, background: green, borderRadius: "4px 4px 0 0" } })
          ),
          React.createElement("div", { style: { fontSize: 12, color: green, fontWeight: 700, marginTop: 6, textAlign: "center" } }, `~$${annual}M/yr`),
          React.createElement("div", { style: { fontSize: 11, color: "#888", textAlign: "center" } }, "SIP fee revenue")
        ),
        React.createElement("div", { style: { flex: 1 } },
          React.createElement("div", { style: { height: 200, background: "rgba(27,58,75,0.06)", borderRadius: 6, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end" } },
            React.createElement("div", { style: { width: "100%", height: "100%", background: `repeating-linear-gradient(45deg, rgba(178,84,44,0.15) 0px, rgba(178,84,44,0.15) 4px, transparent 4px, transparent 12px)`, borderRadius: "4px 4px 0 0" } }),
            React.createElement("div", { style: { width: "100%", height: `${pct * 100}%`, background: green, position: "absolute", bottom: 0, borderRadius: "4px 4px 0 0" } })
          ),
          React.createElement("div", { style: { fontSize: 12, color: rust, fontWeight: 700, marginTop: 6, textAlign: "center" } }, `~$${Math.round(need)}M/yr`),
          React.createElement("div", { style: { fontSize: 11, color: "#888", textAlign: "center" } }, "Annualized need")
        )
      ),
      React.createElement("div", { style: { padding: "14px 16px", background: "rgba(178,84,44,0.06)", border: `1px solid ${rust}`, borderRadius: 6 } },
        React.createElement("span", { style: { fontSize: 12, color: rust, fontWeight: 700 } }, "Honest gap: "),
        React.createElement("span", { style: { fontSize: 12, color: "#444" } }, "Annual fee revenue covers an estimated fraction of the annualized $1.1B need. Practitioners should watch how DOTI closes this gap across the 9-year plan.")
      )
    );
  };

  const slides = [
    {
      slideLabel: "The Sidewalk Improvement Program",
      headline: "The Sidewalk Improvement Program",
      paragraphs: [
        "DOTI launched the Sidewalk Improvement Program (SIP) to administer Initiative 307. The program collects the annual fee, prioritizes work, and contracts construction and repair.",
        "Following Council refinements after the 2022 vote, the fee structure for most residential lots became a flat rate. Income-qualified households are eligible for rebates.",
        "Fee collection began in January 2025. The program operates on a 9-year master plan to build and repair a complete, ADA-compliant network."
      ],
      visual: React.createElement(FeeChart)
    },
    {
      slideLabel: "What's working",
      headline: "Three structural elements",
      paragraphs: [
        "First: legal responsibility is the city's, not the homeowner's. Second: funding is dedicated rather than appropriated annually. Third: prioritization is needs-based rather than complaint-driven.",
        "The first two are durable by design. The third is the active question — and it's the one practitioners in other cities should watch most closely as SIP progresses."
      ],
      stat: "9-year", statLabel: "master plan to achieve complete, ADA-compliant network citywide",
      visual: React.createElement(MapPlaceholder, { label: "Denver SIP Construction Districts", sublabel: "Completed / In-progress / Planned" })
    },
    {
      slideLabel: "What's still open",
      headline: "Three things still being worked out",
      paragraphs: [
        "First: how SIP coordinates with utility cuts and curb-ramp ADA work. Sidewalks share the right-of-way with everything else.",
        "Second: how the city closes the gap between annual fee revenue and the $1.1 billion total need over a 9-year plan.",
        "Third: how non-residential parcels — especially institutional and government-owned lots — are brought into compliance.",
        "None of these are reasons to abandon the model. They are reasons to keep paying attention."
      ],
      visual: React.createElement(FundingGap)
    }
  ];

  return React.createElement(Sidecar, {
    id: "s10", tweaks,
    actLabel: "Act III — Reform Pathways",
    title: "Where Denver Stands Today",
    intro: "SIP implementation — where the program stands now.",
    slides
  });
}

function S11Pathways({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const [activeModel, setActiveModel] = React.useState(0);

  const models = [
    {
      num: 1, name: "Public Ownership",
      mechanism: "General fund covers construction and maintenance. The city treats sidewalks as core infrastructure, like streets.",
      cities: ["Spanish Fork, UT", "Maitland, FL", "Lincoln, NE", "Boston, MA"],
      auth: "Council action",
      tradeoff: "Simple administration. Funding competes annually with every other priority and can be cut during downturns.",
      verdict: "Cleanest model on paper; fragile in recession years without a dedicated revenue stream.",
      color: "#1B3A4B"
    },
    {
      num: 2, name: "Utility Fee",
      mechanism: "Flat monthly charge billed alongside water, sewer, or trash. Englewood's opt-in version sits at ~$0.12/sq ft and runs at 95% voluntary participation.",
      cities: ["Payette, ID", "Westminster, CO", "Englewood, CO", "Baker City, OR"],
      auth: "Council action",
      tradeoff: "Predictable revenue, low administrative cost. Flat fees are regressive without an income-based structure.",
      verdict: "The fastest path to dedicated revenue when council is willing to act.",
      color: "#2D5F7A"
    },
    {
      num: 3, name: "Dedicated Annual Fee",
      mechanism: "Parcel-based fee outside utility billing, scaled by property type and frontage. Funds a dedicated sidewalk program directly.",
      cities: ["Denver, CO (post-Initiative 307)"],
      auth: "Voter mandate",
      tradeoff: "Strong revenue protection, durable beyond political cycles. Long advocacy timeline to pass.",
      verdict: "The Denver model. Best fit when council action has stalled and ballot capacity exists.",
      color: rust
    },
    {
      num: 4, name: "Property Tax Millage",
      mechanism: "Dedicated millage rate. Ann Arbor's 0.125-mill levy was approved in 2011; East Grand Rapids uses a broader 2-mill levy.",
      cities: ["Ann Arbor, MI", "East Grand Rapids, MI"],
      auth: "Voter mandate, periodic renewal",
      tradeoff: "Substantial revenue, strong legal foundation. Subject to renewal cycles and competing tax pressures.",
      verdict: "Reliable in states without constitutional millage limits; less viable where supermajority requirements apply.",
      color: "#4A7C59"
    },
    {
      num: 5, name: "Parcel Tax",
      mechanism: "Flat per-parcel or per-square-foot tax. Berkeley's 2024 Measure FF generates ~$15M annually for 14 years at $0.17/sqft residential, $0.25/sqft non-residential.",
      cities: ["Berkeley, CA (Measure FF)"],
      auth: "Voter mandate (simple majority under CA Prop 13)",
      tradeoff: "Workable in states where millages face supermajority hurdles. Distributional impact depends on rate structure.",
      verdict: "The structural workaround for California-style legal constraints. Berkeley is the contemporary model.",
      color: "#7B5EA7"
    },
    {
      num: 6, name: "Improvement District",
      mechanism: "Geographic districts with annual fees scaled by property classification. Maintenance costs socialized across all properties in the district.",
      cities: ["Ithaca, NY (five Sidewalk Improvement Districts)"],
      auth: "Council action",
      tradeoff: "Equity scaling possible; finer-grained than citywide fees. Administrative complexity higher.",
      verdict: "Best for cities with significant variation in conditions across neighborhoods.",
      color: "#5A7A6A"
    },
    {
      num: 7, name: "Inspection-and-Bill",
      mechanism: "City inspects on a rotating cycle, makes repairs, and bills the property owner. Preserves property-owner liability while ensuring repairs proceed on a predictable schedule.",
      cities: ["Minneapolis, MN"],
      auth: "Council action",
      tradeoff: "Doesn't require ballot or new revenue. Still places cost on individual owners — surprise-bill problem isn't solved.",
      verdict: "The hybrid pathway. Right answer when ballot reform isn't viable but operational improvement is achievable.",
      color: "#8A6A3A"
    },
    {
      num: 8, name: "General Levy (Streets + Sidewalks)",
      mechanism: "Voter-approved levy funding streets and sidewalks together. Seattle's transportation levy is the largest example.",
      cities: ["Cheney, WA", "East Grand Rapids, MI", "Seattle, WA"],
      auth: "Voter mandate, periodic renewal",
      tradeoff: "Larger revenue pool. Sidewalks compete with street priorities inside the same fund.",
      verdict: "Works where the political coalition for transportation broadly is stronger than for sidewalks specifically.",
      color: "#3A6A8A"
    }
  ];

  const authIcon = (auth) => auth.startsWith("Council") ? "🏛" : "🗳";

  return React.createElement("section", {
    id: "s11",
    style: { background: bone, padding: "80px 0 80px" }
  },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 48px" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act III — Reform Pathways"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px" } }, "The Eight Reform Pathways"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 680, marginBottom: 8 } },
        "Initiative 307 is one of eight recognizable pathways out of the property-owner model. Cities have chosen between them based on three things: their existing legal authority, their political environment, and what their network actually looks like."
      ),
      React.createElement("p", { style: { fontSize: 14, color: "#666", marginBottom: 40 } },
        "None of these models is universally correct. Click any pathway to explore it."
      ),
      // Model selector tabs
      React.createElement("div", {
        style: {
          display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32
        }
      },
        models.map((m, i) =>
          React.createElement("button", {
            key: i,
            onClick: () => setActiveModel(i),
            style: {
              padding: "8px 14px", borderRadius: 6, border: "none",
              background: activeModel === i ? m.color : "#fff",
              color: activeModel === i ? "#fff" : navy,
              fontFamily: "inherit", fontSize: 13, fontWeight: activeModel === i ? 700 : 500,
              cursor: "pointer", transition: "all 0.18s",
              boxShadow: activeModel === i ? `0 2px 8px ${m.color}55` : "0 1px 4px rgba(0,0,0,0.08)"
            }
          },
            React.createElement("span", { style: { opacity: 0.7, marginRight: 4 } }, `${m.num}.`), m.name
          )
        )
      ),
      // Active model detail
      React.createElement("div", {
        style: {
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32,
          background: "#fff", borderRadius: 12,
          boxShadow: "0 4px 24px rgba(27,58,75,0.1)",
          overflow: "hidden"
        }
      },
        // Left: content
        React.createElement("div", { style: { padding: "40px 36px" } },
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 20 } },
            React.createElement("div", {
              style: {
                width: 44, height: 44, borderRadius: "50%",
                background: models[activeModel].color, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, flexShrink: 0
              }
            }, models[activeModel].num),
            React.createElement("h3", { style: { fontSize: 22, fontWeight: 800, color: navy, margin: 0 } }, models[activeModel].name)
          ),
          React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "Mechanism"),
            React.createElement("p", { style: { fontSize: 14.5, color: "#333", lineHeight: 1.7, margin: 0 } }, models[activeModel].mechanism)
          ),
          React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "Authorization pathway"),
            React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
              React.createElement("span", { style: { fontSize: 16 } }, authIcon(models[activeModel].auth)),
              React.createElement("span", { style: { fontSize: 14, color: navy, fontWeight: 600 } }, models[activeModel].auth)
            )
          ),
          React.createElement("div", { style: { marginBottom: 20 } },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "Key tradeoff"),
            React.createElement("p", { style: { fontSize: 14, color: "#555", lineHeight: 1.65, margin: 0 } }, models[activeModel].tradeoff)
          ),
          React.createElement("div", {
            style: {
              padding: "14px 16px", borderRadius: 6,
              background: `${models[activeModel].color}12`,
              border: `1.5px solid ${models[activeModel].color}44`
            }
          },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: models[activeModel].color, fontWeight: 700, marginBottom: 6 } }, "Verdict"),
            React.createElement("p", { style: { fontSize: 14, color: "#333", lineHeight: 1.65, margin: 0, fontWeight: 500 } }, models[activeModel].verdict)
          )
        ),
        // Right: US map with example cities
        React.createElement("div", {
          style: {
            background: "#F0EDE8", padding: "40px 32px",
            display: "flex", flexDirection: "column", justifyContent: "space-between"
          }
        },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 12 } }, "Example cities"),
            models[activeModel].cities.map((city, i) =>
              React.createElement("div", { key: i,
                style: {
                  display: "flex", alignItems: "center", gap: 10,
                  marginBottom: 10
                }
              },
                React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: models[activeModel].color, flexShrink: 0 } }),
                React.createElement("span", { style: { fontSize: 14, color: navy, fontWeight: 600 } }, city)
              )
            )
          ),
          React.createElement("div", null,
            React.createElement("svg", { viewBox: "0 0 400 250", style: { width: "100%", opacity: 0.25 } },
              React.createElement("path", {
                d: "M50,50 L350,50 L370,150 L320,200 L250,220 L100,210 L40,160 Z",
                fill: "none", stroke: navy, strokeWidth: 2
              }),
              React.createElement("text", { x: 200, y: 130, textAnchor: "middle", fontSize: 14, fill: navy, opacity: 0.5 }, "United States")
            ),
            React.createElement("div", { style: { fontSize: 11, color: "#999", fontStyle: "italic", textAlign: "center" } },
              "Map: example cities, color-coded by model"
            )
          )
        )
      ),
      // Authorization spectrum
      React.createElement("div", { style: { marginTop: 32, display: "flex", gap: 0, background: "#fff", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.08)" } },
        React.createElement("div", { style: { padding: "14px 20px", flex: 1, borderRight: "1px solid rgba(0,0,0,0.06)" } },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "🏛 Council Action Models"),
          React.createElement("div", { style: { fontSize: 12, color: "#555" } }, "Public Ownership · Utility Fee · Improvement District · Inspection-and-Bill")
        ),
        React.createElement("div", { style: { padding: "14px 20px", flex: 1 } },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "🗳 Voter Mandate Models"),
          React.createElement("div", { style: { fontSize: 12, color: "#555" } }, "Dedicated Annual Fee · Property Tax Millage · Parcel Tax · General Levy")
        )
      )
    )
  );
}

function S12Decision({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const green = "#2D6A4F";
  const amber = "#D89A4E";

  const [answers, setAnswers] = React.useState({});
  const [result, setResult] = React.useState(null);

  const questions = {
    q1: {
      text: "Where are your city's gaps concentrated?",
      subtitle: "Look at your existing sidewalk data by development era and HOLC grade.",
      options: [
        { id: "cores", label: "Older redlined cores (streetcar-era neighborhoods)", icon: "🏙" },
        { id: "periphery", label: "Car-era peripheral neighborhoods (post-1940)", icon: "🚗" },
        { id: "both", label: "Both — dispersed across the network", icon: "🗺" },
        { id: "operational", label: "Gaps are manageable — I need better operations, not new funding", icon: "🔧" },
      ]
    },
    q2: {
      text: "Do you have legal authority to assess a property-based fee?",
      subtitle: "In most states, yes. In California, Prop 13 limits millages — check with municipal counsel.",
      options: [
        { id: "yes", label: "Yes — standard state law (most states)", icon: "✅" },
        { id: "ca", label: "No — California-style supermajority limits apply", icon: "⚖" },
      ]
    },
    q3: {
      text: "Can your council act on its own, or do you need a ballot?",
      subtitle: "Political diagnosis: has your council moved on sidewalks in the last decade?",
      options: [
        { id: "council", label: "Council can and will act — plausibly within 2 years", icon: "🏛" },
        { id: "ballot", label: "Council has stalled for a decade — ballot is the path", icon: "🗳" },
      ]
    }
  };

  const outcomes = {
    "cores-yes-council":   { pathway: "Public Ownership or Utility Fee", cities: "Boston, MA · Westminster, CO", color: "#1B3A4B", section: "s11" },
    "cores-yes-ballot":    { pathway: "Dedicated Annual Fee or Property Tax Millage", cities: "Denver, CO · Ann Arbor, MI", color: rust, section: "s11" },
    "cores-ca-council":    { pathway: "Parcel Tax (simple majority)", cities: "Berkeley, CA — Measure FF", color: "#7B5EA7", section: "s11" },
    "cores-ca-ballot":     { pathway: "Parcel Tax (simple majority)", cities: "Berkeley, CA — Measure FF", color: "#7B5EA7", section: "s11" },
    "periphery-yes-council": { pathway: "Public Ownership + Interim Walkway Program", cities: "Boston, MA + Seattle, WA walkway program", color: "#1B3A4B", section: "s11" },
    "periphery-yes-ballot":  { pathway: "Dedicated Annual Fee + Interim Walkway Program", cities: "Denver, CO + Seattle, WA walkway program", color: rust, section: "s11" },
    "periphery-ca-council":  { pathway: "Parcel Tax + Interim Walkway Program", cities: "Berkeley, CA + Seattle, WA model", color: "#7B5EA7", section: "s11" },
    "periphery-ca-ballot":   { pathway: "Parcel Tax + Interim Walkway Program", cities: "Berkeley, CA + Seattle, WA model", color: "#7B5EA7", section: "s11" },
    "both-yes-council":    { pathway: "Improvement District + Utility Fee", cities: "Ithaca, NY · Westminster, CO", color: "#5A7A6A", section: "s11" },
    "both-yes-ballot":     { pathway: "Dedicated Annual Fee (the Denver model)", cities: "Denver, CO", color: rust, section: "s11" },
    "both-ca-council":     { pathway: "Parcel Tax + Improvement District", cities: "Berkeley, CA + Ithaca, NY model", color: "#7B5EA7", section: "s11" },
    "both-ca-ballot":      { pathway: "Parcel Tax + Improvement District", cities: "Berkeley, CA + Ithaca, NY model", color: "#7B5EA7", section: "s11" },
    "operational-yes-council": { pathway: "Inspection-and-Bill", cities: "Minneapolis, MN", color: "#8A6A3A", section: "s11" },
    "operational-yes-ballot":  { pathway: "Inspection-and-Bill", cities: "Minneapolis, MN", color: "#8A6A3A", section: "s11" },
    "operational-ca-council":  { pathway: "Inspection-and-Bill", cities: "Minneapolis, MN", color: "#8A6A3A", section: "s11" },
    "operational-ca-ballot":   { pathway: "Inspection-and-Bill", cities: "Minneapolis, MN", color: "#8A6A3A", section: "s11" },
  };

  const answer = (qid, val) => {
    const next = { ...answers, [qid]: val };
    setAnswers(next);

    // Check if we should skip Q2/Q3 for operational
    if (qid === "q1" && val === "operational") {
      setResult(outcomes["operational-yes-council"]);
    } else if (next.q1 && next.q2 && next.q3) {
      const key = `${next.q1}-${next.q2}-${next.q3}`;
      setResult(outcomes[key] || null);
    }
  };

  const reset = () => { setAnswers({}); setResult(null); };
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); };

  const currentQ = !answers.q1 ? "q1" : answers.q1 === "operational" ? null : !answers.q2 ? "q2" : !answers.q3 ? "q3" : null;

  return React.createElement("section", {
    id: "s12",
    style: { background: "#fff", padding: "80px 48px" }
  },
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act IV — A Pathway For Your City"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px" } }, "Diagnose Your Starting Point"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 640, marginBottom: 8 } },
        "The question is not 'what should every city do.' The question is 'what should my city do, given where it is starting from.' Three diagnostic questions narrow the field."
      ),
      React.createElement("p", { style: { fontSize: 14, color: "#888", marginBottom: 44 } },
        "Answer each question and the right pathway comes into focus."
      ),

      // Progress dots
      React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 36, alignItems: "center" } },
        ["Gap profile", "Legal authority", "Council or ballot?"].map((label, i) => {
          const qKey = `q${i + 1}`;
          const done = !!answers[qKey];
          const active = currentQ === qKey;
          return React.createElement("div", { key: i, style: { display: "flex", alignItems: "center", gap: 8 } },
            React.createElement("div", {
              style: {
                width: 28, height: 28, borderRadius: "50%",
                background: done ? green : active ? navy : "rgba(27,58,75,0.1)",
                color: done || active ? "#fff" : "#999",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, transition: "all 0.2s"
              }
            }, done ? "✓" : i + 1),
            React.createElement("span", { style: { fontSize: 12, color: done ? green : active ? navy : "#aaa", fontWeight: done || active ? 600 : 400 } }, label),
            i < 2 && React.createElement("div", { style: { width: 24, height: 2, background: done ? green : "rgba(27,58,75,0.12)", marginLeft: 4 } })
          );
        })
      ),

      // Questions
      !result && Object.entries(questions).map(([qid, q]) => {
        if (answers.q1 === "operational" && qid !== "q1") return null;
        const isActive = currentQ === qid;
        const answered = !!answers[qid];
        if (!isActive && !answered) return null;

        return React.createElement("div", {
          key: qid,
          style: {
            marginBottom: 28, padding: "28px 32px",
            background: isActive ? bone : answered ? "#F7F9F7" : "#fff",
            borderRadius: 10,
            border: isActive ? `2px solid ${navy}` : `1.5px solid ${answered ? green : "rgba(27,58,75,0.12)"}`,
            transition: "all 0.2s"
          }
        },
          React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: answered && !isActive ? 0 : 20 } },
            React.createElement("div", {
              style: {
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: answered ? green : navy, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700
              }
            }, answered ? "✓" : qid.replace("q", "")),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 17, fontWeight: 700, color: navy, marginBottom: 4 } }, q.text),
              React.createElement("div", { style: { fontSize: 13, color: "#777" } }, q.subtitle)
            )
          ),
          answered && !isActive && React.createElement("div", { style: { paddingLeft: 48, fontSize: 13, color: green, fontWeight: 600 } },
            "→ " + q.options.find(o => o.id === answers[qid])?.label
          ),
          isActive && React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, paddingLeft: 48 } },
            q.options.map(opt =>
              React.createElement("button", {
                key: opt.id,
                onClick: () => answer(qid, opt.id),
                style: {
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 18px", borderRadius: 8,
                  border: `1.5px solid rgba(27,58,75,0.15)`,
                  background: "#fff", cursor: "pointer",
                  fontFamily: "inherit", textAlign: "left",
                  transition: "all 0.15s"
                },
                onMouseEnter: e => { e.currentTarget.style.borderColor = navy; e.currentTarget.style.background = "rgba(27,58,75,0.03)"; },
                onMouseLeave: e => { e.currentTarget.style.borderColor = "rgba(27,58,75,0.15)"; e.currentTarget.style.background = "#fff"; }
              },
                React.createElement("span", { style: { fontSize: 20 } }, opt.icon),
                React.createElement("span", { style: { fontSize: 14, color: navy, fontWeight: 500, lineHeight: 1.4 } }, opt.label)
              )
            )
          )
        );
      }),

      // Result
      result && React.createElement("div", {
        style: {
          padding: "36px 40px", borderRadius: 12,
          background: `${result.color}0D`,
          border: `2.5px solid ${result.color}`,
          textAlign: "center", marginBottom: 32
        }
      },
        React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: result.color, fontWeight: 700, marginBottom: 12 } }, "Recommended Pathway"),
        React.createElement("h3", { style: { fontSize: 26, fontWeight: 900, color: navy, margin: "0 0 10px" } }, result.pathway),
        React.createElement("div", { style: { fontSize: 14, color: "#666", marginBottom: 24 } }, `Example cities: ${result.cities}`),
        React.createElement("div", { style: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" } },
          React.createElement("button", {
            onClick: () => scrollTo("s11"),
            style: {
              padding: "12px 24px", background: result.color, color: "#fff",
              border: "none", borderRadius: 6, fontSize: 14, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit"
            }
          }, "Explore this pathway →"),
          React.createElement("button", {
            onClick: reset,
            style: {
              padding: "12px 24px", background: "transparent",
              border: `1.5px solid ${result.color}`, color: result.color,
              borderRadius: 6, fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit"
            }
          }, "Start over")
        )
      ),

      // Closing
      React.createElement("div", {
        style: {
          marginTop: 40, padding: "24px 28px", background: bone,
          borderLeft: `4px solid ${rust}`, borderRadius: "0 8px 8px 0"
        }
      },
        React.createElement("p", { style: { margin: 0, fontSize: 15, color: "#333", lineHeight: 1.7, fontStyle: "italic" } },
          "Reform doesn't require luck. It requires diagnosis, the right pathway for the diagnosis, and the political conditions your city actually has — not the ones you wish it had."
        )
      )
    )
  );
}

function S13Credits({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  return React.createElement("section", {
    id: "s13",
    style: { background: navy, padding: "80px 48px", color: "#EDE6DA" }
  },
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act IV — Resources & Credits"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: "#EDE6DA", margin: "0 0 32px" } }, "The Full Report & Credits"),

      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 } },
        React.createElement("div", null,
          React.createElement("p", { style: { fontSize: 16, lineHeight: 1.75, opacity: 0.85, marginBottom: 24 } },
            "This Story Map is the public face of a longer capstone report: ",
            React.createElement("em", null, "Mind the Gap: Lessons from Denver to Rebuild Your Sidewalk Network"),
            ", produced for Fehr & Peers in partnership with the University of Colorado Denver MURP program."
          ),
          React.createElement("p", { style: { fontSize: 15, lineHeight: 1.75, opacity: 0.75, marginBottom: 32 } },
            "The report contains the full methodology, comparative spatial analysis of Denver, Seattle, and Minneapolis, historical research on Denver's reform trajectory, and citations behind every figure."
          ),
          React.createElement("button", {
            style: {
              padding: "14px 28px", background: rust, color: "#fff",
              border: "none", borderRadius: 6, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit"
            }
          }, "Download the full report — PDF →")
        ),
        React.createElement("div", null,
          [
            { label: "Authors", body: "Taylor Lucas and Robert Sells, MURP candidates, University of Colorado Denver College of Architecture and Planning" },
            { label: "Client", body: "Fehr & Peers" },
            { label: "Suggested citation", body: "Lucas, T., & Sells, R. (2026). Mind the Gap: Lessons from Denver to Rebuild Your Sidewalk Network. MURP Capstone, University of Colorado Denver." },
          ].map((item, i) =>
            React.createElement("div", { key: i, style: { marginBottom: 24 } },
              React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 6 } }, item.label),
              React.createElement("p", { style: { fontSize: 14, opacity: 0.8, lineHeight: 1.65, margin: 0 } }, item.body)
            )
          ),
          React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 10 } }, "Data Sources"),
          [
            "Denver sidewalk network: City and County of Denver Open Data Portal",
            "HOLC redlining: Mapping Inequality, University of Richmond Digital Scholarship Lab",
            "Historical Denver codes: Denver Public Library Western History Collection",
            "Governance typology: Denver City Council Legislative Services (2019) + this project"
          ].map((s, i) =>
            React.createElement("div", { key: i, style: { fontSize: 12, opacity: 0.65, marginBottom: 4 } }, `· ${s}`)
          )
        )
      )
    )
  );
}

Object.assign(window, { S10SIP, S11Pathways, S12Decision, S13Credits });
