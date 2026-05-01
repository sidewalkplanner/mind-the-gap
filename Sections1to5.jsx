
// Sections 1–5: Cover, About, Network, Era, Equity
// Real map images wired in; city toggles on S3, S4, S5; nav tile fix

// Reusable image map panel
function MapImage({ src, alt, caption, source }) {
  const navy = "#1B3A4B";
  return React.createElement("div", {
    style: { width: "100%", height: "100%", position: "relative", background: "#E8E2D8", display: "flex", flexDirection: "column" }
  },
    React.createElement("img", {
      src, alt,
      style: { width: "100%", flex: 1, objectFit: "cover", objectPosition: "center", display: "block" }
    }),
    (caption || source) && React.createElement("div", {
      style: {
        background: "rgba(27,58,75,0.88)", color: "#EDE6DA",
        padding: "8px 14px", fontSize: 11, lineHeight: 1.5,
        display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
      }
    },
      caption && React.createElement("span", { style: { fontWeight: 600 } }, caption),
      source && React.createElement("span", { style: { opacity: 0.65, fontStyle: "italic" } }, source)
    )
  );
}

// City toggle tabs — used in S3, S4, S5
function CityTabs({ cities, active, onChange, color }) {
  const rust = color || "#B2542C";
  const navy = "#1B3A4B";
  return React.createElement("div", {
    style: {
      position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
      display: "flex", gap: 4, background: "rgba(27,58,75,0.85)",
      borderRadius: 6, padding: 4, zIndex: 10
    }
  },
    cities.map((c, i) =>
      React.createElement("button", {
        key: c,
        onClick: () => onChange(i),
        style: {
          padding: "5px 14px", borderRadius: 4, border: "none",
          background: active === i ? rust : "transparent",
          color: "#EDE6DA", fontSize: 12, fontWeight: active === i ? 700 : 400,
          cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s"
        }
      }, c)
    )
  );
}

function S1Cover({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";

  return React.createElement("section", {
    id: "s1",
    style: {
      minHeight: "100vh", background: navy,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", textAlign: "center",
      padding: "80px 40px 60px"
    }
  },
    React.createElement("svg", {
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.07 },
      viewBox: "0 0 800 600", preserveAspectRatio: "xMidYMid slice"
    },
      React.createElement("defs", null,
        React.createElement("pattern", { id: "sidewalk", width: 60, height: 60, patternUnits: "userSpaceOnUse" },
          React.createElement("rect", { width: 60, height: 60, fill: "none", stroke: "#fff", strokeWidth: 1 }),
          React.createElement("rect", { x: 2, y: 2, width: 56, height: 56, fill: "none", stroke: "#fff", strokeWidth: 0.3 })
        )
      ),
      React.createElement("rect", { width: "100%", height: "100%", fill: "url(#sidewalk)" })
    ),
    React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 6, background: rust } }),
    React.createElement("svg", {
      width: 64, height: 64, viewBox: "0 0 64 64",
      style: { marginBottom: 32, opacity: 0.9 }
    },
      React.createElement("rect", { x: 4, y: 28, width: 24, height: 8, rx: 1, fill: "#B6BFB1", opacity: 0.8 }),
      React.createElement("rect", { x: 32, y: 30, width: 28, height: 8, rx: 1, fill: "#B2542C" }),
      React.createElement("rect", { x: 4, y: 40, width: 56, height: 2, rx: 1, fill: "rgba(255,255,255,0.2)" }),
      React.createElement("path", { d: "M28 27 L31 36 L26 33 L29 42", stroke: "#D89A4E", strokeWidth: 2.5, fill: "none", strokeLinecap: "round" })
    ),
    React.createElement("div", { style: { fontSize: 13, letterSpacing: "0.22em", color: rust, fontWeight: 700, textTransform: "uppercase", marginBottom: 20 } }, "Mind the Gap"),
    React.createElement("h1", {
      style: { fontSize: "clamp(42px, 6vw, 80px)", fontWeight: 900, color: "#EDE6DA", lineHeight: 1.08, margin: "0 0 28px", maxWidth: 760 }
    }, "Lessons from Denver to Rebuild Your Sidewalk Network"),
    React.createElement("p", {
      style: { fontSize: 18, color: "rgba(237,230,218,0.72)", maxWidth: 560, lineHeight: 1.6, marginBottom: 48 }
    }, "Taylor Lucas & Robert Sells · MURP Capstone · University of Colorado Denver · In partnership with Fehr & Peers"),
    React.createElement("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" } },
      [["60%", "Sufficient"], ["30%", "Deficient"], ["10%", "Missing"]].map(([pct, label], i) =>
        React.createElement("div", { key: i,
          style: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "16px 24px", textAlign: "center" }
        },
          React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: i === 0 ? "#B6BFB1" : i === 1 ? "#D89A4E" : rust } }, pct),
          React.createElement("div", { style: { fontSize: 12, color: "rgba(237,230,218,0.6)", marginTop: 4, letterSpacing: "0.06em" } }, label)
        )
      )
    ),
    React.createElement("div", {
      style: { position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "rgba(237,230,218,0.4)", fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }
    }, "Scroll to begin ↓")
  );
}

function S2About({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  // FIXED: "Why should the city pay?" now links to S9 (ballot/economic case)
  const tiles = [
    { label: "Why are sidewalks like this?", dest: "s4", audience: "For the curious reader", sub: "Path dependency & development eras" },
    { label: "Why should the city pay?", dest: "s9", audience: "For the skeptical council member", sub: "The economic case for Initiative 307" },
    { label: "What model fits my city?", dest: "s11", audience: "For the practitioner", sub: "Eight reform pathways compared" },
    { label: "Where do I start?", dest: "s12", audience: "For the advocate", sub: "Interactive diagnostic decision tree" },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  return React.createElement("section", {
    id: "s2",
    style: { background: bone, padding: "80px 48px" }
  },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto" } },
      React.createElement("div", { style: { maxWidth: 680, marginBottom: 48 } },
        React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "About This Guide"),
        React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 20px", lineHeight: 1.2 } }, "About This Guide"),
        React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, marginBottom: 14 } },
          "Incomplete networks. Code non-compliance. Deferred maintenance. These are all well known issues that sidewalk networks across the nation face. As walkable and safe pedestrian networks have returned to the forefront of planners minds, reforming the governance structure of these networks has become vital."
        ),
        React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, marginBottom: 14 } },
          "Denver's two-decade reform effort is the most fully documented case of a major city escaping that system. This Story Map walks through the analysis — what made Denver's network look the way it does, what the city tried, what failed, and what finally worked."
        ),
       // React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75 } },
         // React.createElement("strong", null, "The focus is Denver. The field guide at the end is for everyone.")
        )
      ),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 } },
        tiles.map((t, i) =>
          React.createElement("button", {
            key: i,
            onClick: () => scrollTo(t.dest),
            style: {
              background: "#fff", border: "1.5px solid rgba(27,58,75,0.12)",
              borderRadius: 10, padding: "24px 20px", textAlign: "left",
              cursor: "pointer", fontFamily: "inherit",
              transition: "all 0.18s", boxShadow: "0 2px 8px rgba(27,58,75,0.06)"
            },
            onMouseEnter: e => { e.currentTarget.style.borderColor = rust; e.currentTarget.style.boxShadow = "0 4px 16px rgba(178,84,44,0.15)"; },
            onMouseLeave: e => { e.currentTarget.style.borderColor = "rgba(27,58,75,0.12)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(27,58,75,0.06)"; }
          },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", marginBottom: 8, fontWeight: 600 } }, t.audience),
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: navy, lineHeight: 1.3, marginBottom: 8 } }, t.label),
            React.createElement("div", { style: { fontSize: 12, color: "#777", lineHeight: 1.4, marginBottom: 12 } }, t.sub),
            React.createElement("div", { style: { fontSize: 12, color: rust, fontWeight: 600 } }, "Jump to section →")
          )
        )
      )
    )
  );
}

function S3Network({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const sage = "#B6BFB1", amber = "#D89A4E";

  // City toggle for slide 1
  const [city1, setCity1] = React.useState(0);

  const networkMaps = [
    { src: "uploads/Sidewalks -Denver.jpg", city: "Denver", caption: "Denver sidewalk network status", source: "City and County of Denver Sidewalks Asset, Feb 2025" },
    { src: "uploads/Sidewalks -Seattle.jpg", city: "Seattle", caption: "Seattle sidewalk network status", source: "Seattle Sidewalks Capacity Layers 2023, updated March 2026" },
    { src: "uploads/Sidewalks -Minneapolis.jpg", city: "Minneapolis", caption: "Minneapolis sidewalk network status", source: "University of Minnesota and City of Minneapolis Sidewalk Gaps, 2018" },
  ];

  const slides = [
    {
      slideLabel: "See the gap",
      headline: "The sidewalk network in 2025",
      paragraphs: [
        "These maps seperate sidewalk networks into three conditions: sufficient sidewalks, sidewalks that exist but don't meet accessibility standards, and streets where sidewalks are missing altogether.",
        "In Denver, 60% of the network is sufficient, 30% is too narrow, and 10% is missing outright. Toggle between cities to compare."
      ],
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
        React.createElement(CityTabs, {
          cities: networkMaps.map(m => m.city),
          active: city1,
          onChange: setCity1,
          color: rust
        }),
        React.createElement(MapImage, networkMaps[city1])
      )
    },
    {
      slideLabel: "The structure behind the map",
      headline: "This is a structure problem",
      paragraphs: [
        "Streets are maintained publicly. Wastewater is maintained publicly. Street lighting is maintained publicly.",
        "Sidewalks are the exception as the only piece of the public right-of-way for which the abutting property owner has historically been responsible.",
        "This is not a funding problem or a planning problem. It is funadmentally a structural problem with political solutions. Denver spent two decades learning the difference."
      ],
      visual: React.createElement("div", {
        style: { width: "100%", height: "100%", background: navy, display: "flex", alignItems: "center", justifyContent: "center" }
      },
        React.createElement("div", { style: { display: "flex", gap: 20, padding: 32 } },
          [
            { label: "Streets", icon: "🚦", pub: true },
            { label: "Water", icon: "💧", pub: true },
            { label: "Lighting", icon: "💡", pub: true },
            { label: "Sidewalks", icon: "🚶", pub: false }
          ].map((item, i) =>
            React.createElement("div", { key: i,
              style: {
                flex: 1,
                background: item.pub ? "rgba(45,106,79,0.15)" : "rgba(178,84,44,0.18)",
                border: `2px solid ${item.pub ? "rgba(45,106,79,0.55)" : rust}`,
                borderRadius: 8, padding: "28px 16px", textAlign: "center",
                boxShadow: item.pub ? "0 0 0 0px transparent" : `0 0 16px rgba(178,84,44,0.25)`
              }
            },
              React.createElement("div", { style: { fontSize: 28, marginBottom: 10 } }, item.icon),
              React.createElement("div", { style: { fontSize: 13, color: "#EDE6DA", fontWeight: 700, marginBottom: 14, letterSpacing: "0.04em" } }, item.label),
              React.createElement("div", {
                style: {
                  fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: item.pub ? "#6FCF97" : rust, fontWeight: 700,
                  background: item.pub ? "rgba(45,106,79,0.25)" : "rgba(178,84,44,0.2)",
                  padding: "6px 10px", borderRadius: 4
                }
              }, item.pub ? "Public" : "Private")
            )
          )
        )
      )
    }
  ];

  return React.createElement(Sidecar, {
    id: "s3", tweaks,
    actLabel: "Act I — The Argument",
    title: "The State of the Network",
    intro: "Three cities, the same issue.",
    slides
  });
}

function S4Era({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const sage = "#B6BFB1", amber = "#D89A4E";

  const [eraCity, setEraCity] = React.useState(0);

  const eraMaps = [
    { src: "uploads/Development Eras -Denver.jpg", city: "Denver", caption: "Development era × sidewalk gaps — Denver", source: "City and County of Denver, Existing Land Use 2020, updated Aug 2024" },
    { src: "uploads/Sidewalks -Development Eras.jpg", city: "Seattle", caption: "Development era × sidewalk gaps — Seattle", source: "Seattle Zoned Development Capacity Layers 2016, updated Oct 2024" },
    { src: "uploads/Development Eras-Minneapolis.jpg", city: "Minneapolis", caption: "Development era × sidewalk gaps — Minneapolis", source: "City of Minneapolis Future Land Use and Built Form, updated Feb 2026" },
  ];

  const EraChart = () => {
    const data = [
      { city: "Denver", streetcar: 16, car: 35, ungraded: 49 },
      { city: "Seattle", streetcar: 15, car: 74, ungraded: 11 },
      { city: "Minneapolis", streetcar: 18, car: 41, ungraded: 41 },
    ];
    const barColors = { streetcar: sage, car: rust, ungraded: amber };
    const [hovered, setHovered] = React.useState(null);

    return React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", padding: 40, justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "Share of missing sidewalk by development era"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 24 } }, "Percentage of total gaps in each city"),
      React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 } },
        [["Pre-car era (pre-1940)", sage], ["Car era (1940–1990)", rust], ["Ungraded / other", amber]].map(([l, c]) =>
          React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 6 } },
            React.createElement("div", { style: { width: 12, height: 12, background: c, borderRadius: 2 } }),
            React.createElement("span", { style: { fontSize: 11, color: "#555" } }, l)
          )
        )
      ),
      data.map((d, i) =>
        React.createElement("div", { key: d.city, style: { marginBottom: 24 } },
          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 8 } }, d.city),
          React.createElement("div", { style: { display: "flex", gap: 2, height: 34, borderRadius: 4, overflow: "hidden" } },
            [["streetcar", d.streetcar], ["car", d.car], ["ungraded", d.ungraded]].map(([era, val]) =>
              React.createElement("div", {
                key: era,
                onMouseEnter: () => setHovered(`${d.city}-${era}`),
                onMouseLeave: () => setHovered(null),
                style: {
                  width: `${(val / (d.streetcar + d.car + d.ungraded)) * 100}%`,
                  background: barColors[era],
                  transition: "opacity 0.15s",
                  opacity: hovered && hovered !== `${d.city}-${era}` ? 0.4 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }
              },
                val >= 15 && React.createElement("span", { style: { fontSize: 11, fontWeight: 700, color: era === "streetcar" ? navy : "#fff" } }, `${val}%`)
              )
            )
          )
        )
      ),
      React.createElement("div", {
        style: { marginTop: 8, padding: "14px 16px", background: "#FFF5EF", border: `1px solid ${rust}`, borderRadius: 6 }
      },
        React.createElement("span", { style: { fontSize: 13, color: rust, fontWeight: 700 } }, "Key finding: "),
        React.createElement("span", { style: { fontSize: 13, color: "#444" } }, "In Seattle, 74% of all gaps fall in car-era neighborhoods. The era a neighborhood was built is the strongest single predictor of whether it has a complete sidewalk today.")
      )
    );
  };

  const CrossSection = () =>
    React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#F7F4EF", display: "flex", flexDirection: "column", padding: 40, justifyContent: "center", gap: 28 }
    },
      ["Pre-car Era (pre-1940)", "Car Era (1940–1990)"].map((era, idx) =>
        React.createElement("div", { key: era },
          React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: navy, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" } }, era),
          React.createElement("svg", { viewBox: "0 0 320 80", style: { width: "100%", height: 76 } },
            React.createElement("rect", { x: 0, y: 30, width: 320, height: 36, fill: "#8C8C8C" }),
            React.createElement("line", { x1: 160, y1: 42, x2: 160, y2: 54, stroke: "#FFD700", strokeWidth: 2, strokeDasharray: "6,4" }),
            idx === 0 ? [
              React.createElement("rect", { key: "lot1", x: 0, y: 0, width: 55, height: 30, fill: "#C8D5B9", stroke: "#888", strokeWidth: 0.5 }),
              React.createElement("rect", { key: "sw1", x: 52, y: 22, width: 12, height: 8, fill: sage }),
              React.createElement("rect", { key: "curb1", x: 64, y: 25, width: 4, height: 5, fill: "#aaa" }),
              React.createElement("rect", { key: "lot2", x: 252, y: 0, width: 68, height: 30, fill: "#C8D5B9", stroke: "#888", strokeWidth: 0.5 }),
              React.createElement("rect", { key: "sw2", x: 256, y: 22, width: 12, height: 8, fill: sage }),
              React.createElement("rect", { key: "curb2", x: 252, y: 25, width: 4, height: 5, fill: "#aaa" }),
              React.createElement("text", { key: "t1", x: 22, y: 15, fontSize: 8, fill: "#555", textAnchor: "middle" }, "Narrow lot"),
              React.createElement("text", { key: "t2", x: 58, y: 15, fontSize: 7, fill: navy, textAnchor: "middle" }, "Sidewalk ✓"),
            ] : [
              React.createElement("rect", { key: "lot1", x: 0, y: 0, width: 100, height: 30, fill: "#C8D5B9", stroke: "#888", strokeWidth: 0.5 }),
              React.createElement("path", { key: "swale", d: "M100 30 Q110 36 120 30", fill: "none", stroke: "#6BA3BE", strokeWidth: 2 }),
              React.createElement("rect", { key: "lot2", x: 210, y: 0, width: 110, height: 30, fill: "#C8D5B9", stroke: "#888", strokeWidth: 0.5 }),
              React.createElement("path", { key: "swale2", d: "M200 30 Q210 36 220 30", fill: "none", stroke: "#6BA3BE", strokeWidth: 2 }),
              React.createElement("text", { key: "t1", x: 50, y: 15, fontSize: 8, fill: "#555", textAnchor: "middle" }, "Wide lot"),
              React.createElement("text", { key: "t2", x: 160, y: 19, fontSize: 7, fill: rust, textAnchor: "middle" }, "No sidewalk · No curb"),
              React.createElement("text", { key: "t3", x: 160, y: 28, fontSize: 6, fill: "#6BA3BE", textAnchor: "middle" }, "drainage swale"),
            ]
          ),
          React.createElement("div", { style: { fontSize: 11, color: idx === 0 ? "#2D6A4F" : rust, marginTop: 4, fontWeight: 600 } },
            idx === 0 ? "✓ Sidewalk integrated at initial construction" : "✗ Retrofit requires drainage + right-of-way reclaim"
          )
        )
      )
    );

  const slides = [
    {
      slideLabel: "Development era × gaps",
      headline: "Sidewalk gaps don't appear randomly",
      paragraphs: [
        "They appear where a neighborhood was built without sidewalks and stay there because retrofit is far harder than original construction.",
        "Sidewalk gaps in Denver cluster most heavily in post-1940 neighborhoods. In the city’s older, prewar areas, the sidewalk network is far more continuous. The overlap is hard to miss: where development happened in the auto era, pedestrian infrastructure was more likely to be omitted or built to lower standards, and those gaps have persisted.",
		"Toggle between cities to compare how closely sidewalk gaps track development era."
      ],
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
        React.createElement(CityTabs, { cities: eraMaps.map(m => m.city), active: eraCity, onChange: setEraCity, color: rust }),
        React.createElement(MapImage, eraMaps[eraCity])
      )
    },
    {
      slideLabel: "The numbers",
      headline: "Three cities, same pattern",
      paragraphs: [
        "Across all three peer cities, car-era neighborhoods are the largest single source of missing sidewalk.",
        "In Seattle, 74% of all gaps fall in car-era neighborhoods. In Denver, 35%. In Minneapolis, 41%.",
        "The era a neighborhood was built is the strongest single predictor of whether it has a complete sidewalk today."
      ],
      visual: React.createElement(EraChart)
    },
    {
      slideLabel: "Why retrofit is harder",
      headline: "Path dependency in practice",
      paragraphs: [
        "Installing sidewalks during initial development is when its least expensive: the right-of-way is open, drainage is being graded.",
        "Retrofitting a car-era neighborhood is several times more expensive: no curb-and-gutter, stormwater drainage and engineering required, informal right-of-way claims, and utility conflicts.",
        "Every year a city defers reform, the cost of fixing what's missing grows."
      ],
      visual: React.createElement(CrossSection)
    }
  ];

  return React.createElement(Sidecar, {
    id: "s4", tweaks, mediaRight: false,
    actLabel: "Act I — The Argument",
    title: "The Era Determines the Gap",
    intro: "The sidewalk map you see today reflects decisions made 60–80 years ago.",
    slides
  });
}

function S5Equity({ tweaks }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const sage = "#B6BFB1", amber = "#D89A4E";

  const [holcCity, setHolcCity] = React.useState(0);
  const [streetcarCity, setStreetcarCity] = React.useState(0);

  const holcMaps = [
    { src: "uploads/Redlining -Denver.jpg", city: "Denver", caption: "HOLC grades × sidewalk gaps — Denver", source: "University of Richmond Digital Scholarship Lab: Mapping Inequality" },
    { src: "uploads/Redlining-Minneapolis.jpg", city: "Minneapolis", caption: "HOLC grades × sidewalk gaps — Minneapolis", source: "University of Richmond Digital Scholarship Lab: Mapping Inequality" },
    { src: "uploads/Seattle -Redlining.jpg", city: "Seattle", caption: "HOLC grades × sidewalk gaps — Seattle", source: "University of Richmond Digital Scholarship Lab: Mapping Inequality" },
  ];

  const streetcarMaps = [
    { src: "uploads/Streetcars -Denver.jpg", city: "Denver", caption: "Historic streetcar network × sidewalk gaps — Denver", source: "City and County of Denver Abandoned Trolley Tracks, May 2024" },
    { src: "uploads/Seattle -streetcars.jpg", city: "Seattle", caption: "Historic streetcar network × sidewalk gaps — Seattle", source: "Tundria, Seattle Tram Map 1931; OpenStreetMap contributors" },
    { src: "uploads/Streetcars -Minneapolis.jpg", city: "Minneapolis", caption: "Historic streetcar network × sidewalk gaps — Minneapolis", source: "University of Minnesota Streetcar data, August 2021" },
  ];

  const VennDiagram = () =>
    React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#F7F4EF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }
    },
      React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 28, textAlign: "center" } },
        "Three equity layers — where your city's gaps live"
      ),
      React.createElement("svg", { viewBox: "0 0 300 210", style: { width: "100%", maxWidth: 360 } },
        React.createElement("circle", { cx: 120, cy: 90, r: 72, fill: "#C47B6B", opacity: 0.28 }),
        React.createElement("circle", { cx: 180, cy: 90, r: 72, fill: amber, opacity: 0.28 }),
        React.createElement("circle", { cx: 150, cy: 145, r: 72, fill: sage, opacity: 0.28 }),
        React.createElement("text", { x: 85, y: 66, fontSize: 9.5, fill: navy, textAnchor: "middle", fontWeight: 700 }, "Redlined"),
        React.createElement("text", { x: 85, y: 78, fontSize: 9.5, fill: navy, textAnchor: "middle" }, "Cores"),
        React.createElement("text", { x: 215, y: 66, fontSize: 9.5, fill: navy, textAnchor: "middle", fontWeight: 700 }, "Car-era"),
        React.createElement("text", { x: 215, y: 78, fontSize: 9.5, fill: navy, textAnchor: "middle" }, "Peripheries"),
        React.createElement("text", { x: 150, y: 182, fontSize: 9.5, fill: navy, textAnchor: "middle", fontWeight: 700 }, "Transit Corridors"),
        React.createElement("text", { x: 150, y: 110, fontSize: 8, fill: "#555", textAnchor: "middle" }, "All three layers")
      ),
      React.createElement("div", { style: { fontSize: 13, color: "#666", textAlign: "center", marginTop: 16, maxWidth: 300, lineHeight: 1.55 } },
        "Where your city's gaps live shapes which layer matters most for prioritization."
      )
    );

  const slides = [
    {
      slideLabel: "Redlined cores",
      headline: "Layer 1: Historical disinvestment",
      paragraphs: [
        "In Denver and Minneapolis, neighborhoods graded C and D under the 1930s redlining maps show notably higher rates of missing sidewalks than A or B areas.",
        "In Denver, C and D areas account for 26% of total gaps; A and B areas account for only 13%. Toggle to see how Minneapolis and Seattle compare. Seattle tells us what happened in other cities."
      ],
      stat: "26%", statLabel: "of Denver's gaps in HOLC C+D areas (vs. 13% in A+B)",
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
        React.createElement(CityTabs, { cities: holcMaps.map(m => m.city), active: holcCity, onChange: setHolcCity, color: rust }),
        React.createElement(MapImage, holcMaps[holcCity])
      )
    },
    {
      slideLabel: "Seattle complicates the picture",
      headline: "Layer 2: Car-era ungraded areas",
      paragraphs: [
        "Seattle's Grade D areas account for only 7% of gaps - the neighborhoods that were redlined in 1938 were already built out with sidewalks during streetcar-era construction.",
        "In Seattle, 62% of all sidewalk gaps fall in HOLC-ungraded areas. In Denver, 61%. In Minneapolis, 39%.",
        "This is the second equity layer: the legacy of car-era development standards in places that weren't developed during the initial redlining period."
      ],
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
        React.createElement(CityTabs, { cities: holcMaps.map(m => m.city), active: holcCity, onChange: setHolcCity, color: rust }),
        React.createElement(MapImage, holcMaps[holcCity])
      )
    },
    {
      slideLabel: "Transit-proximity layer",
      headline: "Layer 3: Transit corridors",
      paragraphs: [
        "Even within a quarter mile of historic streetcar lines, sidewalk completeness was never uniform.",
        "In Denver, 65% of sidewalk gaps fall within a quarter mile of a historic streetcar line. In Minneapolis, 66%.",
        "As cities expand bus rapid transit and light rail, the assumption that nearby pedestrian infrastructure already exists is often wrong."
      ],
      stat: "65%", statLabel: "of Denver's gaps within ¼ mile of a historic streetcar line",
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative" } },
        React.createElement(CityTabs, { cities: streetcarMaps.map(m => m.city), active: streetcarCity, onChange: setStreetcarCity, color: rust }),
        React.createElement(MapImage, streetcarMaps[streetcarCity])
      )
    },
    {
      slideLabel: "What this means",
      headline: "All three layers matter. None are the whole picture.",
      paragraphs: [
        "Any equity-based prioritization focused only on historically redlined areas will miss the majority of a network's gaps.",
        "Any prioritization that ignores transit corridors will rebuild infrastructure that doesn't reach where people are trying to go.",
        "Effective reforms recognize which layers are most pronounced in each city and prioritizes them accordingly."
      ],
      visual: React.createElement(VennDiagram)
    }
  ];

  return React.createElement(Sidecar, {
    id: "s5", tweaks,
    actLabel: "Act I — The Argument",
    title: "Three Equity Layers",
    intro: "What the data shows — and what it doesn't.",
    slides
  });
}

Object.assign(window, { S1Cover, S2About, S3Network, S4Era, S5Equity, MapImage, CityTabs });
