
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

function S1Cover({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";

  return React.createElement("section", {
    id: "s1",
    style: {
      minHeight: "100dvh", background: navy,
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
    React.createElement("div", { style: { fontSize: 32, letterSpacing: "0.22em", color: rust, fontWeight: 700, textTransform: "uppercase", marginBottom: 20 } }, "Mind the Gap"),
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

function S2About({ tweaks, isMobile }) {
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
    style: { background: bone, padding: isMobile ? "60px 20px" : "80px 48px" }
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

function S3Network({ tweaks, isMobile }) {
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
    id: "s3", tweaks, isMobile,
    actLabel: "Act I — The Argument",
    title: "The State of the Network",
    intro: "Three cities, the same issue.",
    slides
  });
}

function S4Era({ tweaks, isMobile }) {
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
    id: "s4", tweaks, isMobile, mediaRight: false,
    actLabel: "Act I — The Argument",
    title: "The Era Determines the Gap",
    intro: "The sidewalk map you see today reflects decisions made 60–80 years ago.",
    slides
  });
}

function S5Equity({ tweaks, isMobile }) {
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
    id: "s5", tweaks, isMobile,
    actLabel: "Act I — The Argument",
    title: "Three Equity Layers",
    intro: "What the data shows — and what it doesn't.",
    slides
  });
}

Object.assign(window, { S1Cover, S2About, S3Network, S4Era, S5Equity, MapImage, CityTabs });


// Sections 6–9: History, Swipe, Timeline, Ballot

function S6History({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  const CharterDoc = () =>
    React.createElement("div", {
      style: {
        width: "100%", height: "100%",
        background: "#F5F0E8",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: 40
      }
    },
      React.createElement("div", {
        style: {
          background: "#FBF7EE", border: "1.5px solid #D4C9A8",
          borderRadius: 4, padding: "32px 36px", maxWidth: 400,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontFamily: "Georgia, serif"
        }
      },
        React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8A7D5A", marginBottom: 12 } }, "Denver Municipal Code · 1881"),
        React.createElement("h3", { style: { fontSize: 17, color: navy, margin: "0 0 16px", lineHeight: 1.3 } }, "An Ordinance Relating to Sidewalks"),
        React.createElement("div", {
          style: {
            background: "rgba(178,84,44,0.08)", border: `1px solid ${rust}`,
            borderRadius: 4, padding: "12px 14px", marginBottom: 14,
            fontSize: 13, lineHeight: 1.6, color: "#333"
          }
        },
          React.createElement("strong", { style: { color: rust } }, "§ 14. Enforcement. "),
          "If any sidewalk shall not be constructed or repaired within sixty (60) days of notice, the City Engineer shall cause the same to be built and the cost thereof shall be assessed as a lien upon the abutting property."
        ),
        React.createElement("div", { style: { fontSize: 12, color: "#666", lineHeight: 1.6 } },
          "Width standards: ",
          React.createElement("strong", null, "12 feet"),
          " in front of commercial properties · ",
          React.createElement("strong", null, "5 feet"),
          " in front of residential lots. Materials: flagstone or cement in the downtown core."
        ),
        React.createElement("div", { style: { marginTop: 16, fontSize: 10, color: "#999", fontStyle: "italic" } },
          "Source: 1881 Denver Charter — Denver Public Library Western History Collection"
        )
      )
    );

  const slides = [
    {
      slideLabel: "A different starting point",
      headline: "Denver did not always have this problem",
      paragraphs: [
        "When the city published its first municipal code in 1881, sidewalks were treated as coordinated public infrastructure. In city designated sidewalk networks, an official sidewalk contractor was selected by competitive bid then a City Engineer inspected and certified completed work.",
        "Enforcement had teeth. If a property was cited and a sidewalk wasn't built within sixty days, the city built it and collected the cost via a lien on the property."
      ],
      visual: React.createElement(CharterDoc)
    },
    {
      slideLabel: "Sidewalk Districts",
      headline: "The mechanism that made it work",
      paragraphs: [
        "The city was divided into geographic districts. All properties in a district paid a coordinated assessment. The city built and the city repaired.",
        "Outside of a designated district, a majority of property owners on a block could petition the city to build sidewalks. Construction costs were collected via property tax lien.",
        "Neighbors did not pay one at a time. They paid together, and the city built together."
      ]
    },
    {
      slideLabel: "Standards and structure",
      headline: "The same elements Denver rebuilt in 2022",
      paragraphs: [
        "Width standards in the 1881 code had 12 feet of uninterrupted sidewalk in front of commercial properties and five feet in front of residential and vacant lots within various areas of town.",
        "By modern standards, these requirements not only meet our requirements, but in some cases even exceed them.",
      ],
      visual: React.createElement(MapPlaceholder, { label: "Historical Denver Sidewalk Network", sublabel: "c. 1880s streetcar-era city extent" })
    }
  ];

  return React.createElement(Sidecar, {
    id: "s6", tweaks, isMobile, mediaRight: true,
    actLabel: "Act II — Denver's Trajectory",
    title: "Denver Had a Better System",
    intro: "This problem wasn't inherited, it was designed.",
    slides
  });
}

function S7Swipe({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const sage = "#B6BFB1", amber = "#D89A4E";

  const [swipePos, setSwipePos] = React.useState(50);
  const containerRef = React.useRef(null);
  const dragging = React.useRef(false);

  const handleMouseDown = () => { dragging.current = true; };
  const handleMouseUp = () => { dragging.current = false; };
  const handleMouseMove = (e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setSwipePos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };
  const handleTouch = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    setSwipePos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  const genStreets = (density, seed) => {
    const streets = [];
    const rng = (n) => ((Math.sin(n * seed) + 1) / 2);
    for (let i = 0; i < density; i++) {
      streets.push({ x1: rng(i * 3) * 100, y1: i * (100 / density), x2: rng(i * 3 + 1) * 100 + rng(i) * 30, y2: i * (100 / density), horiz: true });
      streets.push({ x1: i * (100 / density), y1: 0, x2: i * (100 / density), y2: 100, horiz: false });
    }
    return streets;
  };

  return React.createElement("section", { id: "s7", style: { background: bone, padding: isMobile ? "60px 0 0" : "80px 0 0" } },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px 32px" : "0 48px 40px" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act II — Denver's Trajectory"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px" } }, "How Denver Lost It"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 680, marginBottom: 8 } },
        "What undid the system wasn't neglect. It was sprawling, unchecked growth. As Denver expanded outward in the postwar boom, Sidewalk Districts were phased out. New subdivisions were platted with narrow attached sidewalks or, in many cases, no sidewalks at all."
      ),
      React.createElement("p", { style: { fontSize: 14, color: "#888", fontStyle: "italic", marginBottom: 32 } },
        "Drag the slider — 1880 left, 2025 right (NOTE:DIFFERENT MAP. Maybe a slider showing network within Denver's original boundaries compared with growth?)"
      )
    ),
    React.createElement("div", {
      ref: containerRef,
      style: {
        position: "relative", height: "60vh", minHeight: 420,
        overflow: "hidden", cursor: "ew-resize", userSelect: "none",
        background: "#1B3A4B"
      },
      onMouseDown: handleMouseDown, onMouseUp: handleMouseUp,
      onMouseMove: handleMouseMove, onMouseLeave: handleMouseUp,
      onTouchMove: handleTouch
    },
      // LEFT — 1880s
      React.createElement("div", {
        style: {
          position: "absolute", inset: 0,
          clipPath: `inset(0 ${100 - swipePos}% 0 0)`,
          background: "#2D4A3E", display: "flex", alignItems: "center", justifyContent: "center"
        }
      },
        React.createElement("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.25 }, viewBox: "0 0 600 400", preserveAspectRatio: "xMidYMid slice" },
          Array.from({ length: 12 }).map((_, i) =>
            React.createElement("line", { key: `h${i}`, x1: 0, y1: i * 35, x2: 600, y2: i * 35, stroke: sage, strokeWidth: 2 })
          ),
          Array.from({ length: 16 }).map((_, i) =>
            React.createElement("line", { key: `v${i}`, x1: i * 40, y1: 0, x2: i * 40, y2: 400, stroke: sage, strokeWidth: 2 })
          )
        ),
        React.createElement("div", {
          style: {
            position: "absolute", top: 20, left: 20,
            background: "rgba(45,106,79,0.9)", color: "#EDE6DA",
            padding: "8px 14px", borderRadius: 4, fontSize: 13, fontWeight: 700
          }
        }, "1880s Denver — Continuous Sidewalk Coverage")
      ),
      // RIGHT — 2025
      React.createElement("div", {
        style: {
          position: "absolute", inset: 0,
          clipPath: `inset(0 0 0 ${swipePos}%)`,
          background: "#1B3A4B", display: "flex", alignItems: "center", justifyContent: "center"
        }
      },
        React.createElement("svg", { style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.22 }, viewBox: "0 0 600 400", preserveAspectRatio: "xMidYMid slice" },
          Array.from({ length: 18 }).map((_, i) =>
            React.createElement("line", { key: `h${i}`, x1: 0, y1: i * 24, x2: 600, y2: i * 24, stroke: sage, strokeWidth: i % 3 === 0 ? 2 : 0.5, strokeDasharray: i % 3 !== 0 ? "4,8" : "0" })
          ),
          Array.from({ length: 22 }).map((_, i) =>
            React.createElement("line", { key: `v${i}`, x1: i * 28, y1: 0, x2: i * 28, y2: 400, stroke: sage, strokeWidth: i % 4 === 0 ? 2 : 0.5, strokeDasharray: i % 4 !== 0 ? "4,8" : "0" })
          ),
          Array.from({ length: 40 }).map((_, i) =>
            React.createElement("line", { key: `g${i}`, x1: Math.sin(i * 2.1) * 600 + 300, y1: i * 10, x2: Math.sin(i * 2.1 + 0.5) * 600 + 300, y2: i * 10 + 10, stroke: rust, strokeWidth: 2, opacity: 0.7 })
          )
        ),
        React.createElement("div", {
          style: {
            position: "absolute", top: 20, right: 20,
            background: "rgba(178,84,44,0.9)", color: "#EDE6DA",
            padding: "8px 14px", borderRadius: 4, fontSize: 13, fontWeight: 700
          }
        }, "2025 Denver — Gaps in Car-Era Suburbs")
      ),
      // Divider handle
      React.createElement("div", {
        style: {
          position: "absolute", top: 0, bottom: 0,
          left: `${swipePos}%`, transform: "translateX(-50%)",
          width: 4, background: "#fff", zIndex: 10
        }
      },
        React.createElement("div", {
          style: {
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 36, height: 36, borderRadius: "50%",
            background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, cursor: "ew-resize"
          }
        }, "⟺")
      )
    ),
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "20px 20px 48px" : "32px 48px 60px" } },
      React.createElement("p", { style: { fontSize: 15, color: "#444", lineHeight: 1.75, maxWidth: 680 } },
        "The 1880s footprint sits inside a postwar city that grew far past it without bringing the system along. Most mid-sized American cities followed the same path with a walkable urban core that was then surrounded by decades of car-oriented growth. With no coherent mechanism to extend the sidewalk system outward, the system crumbled."
      )
    )
  );
}

function S8Timeline({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const sage = "#B6BFB1";
  const [activeIdx, setActiveIdx] = React.useState(null);

  const events = [
    { year: "1881", label: "Denver's First Charter", body: "The city establishes Sidewalk Districts: an official contractor, City Engineer inspection, and a 60-day, automatic tax-lien collection. Hundreds of miles of sidewalk built over the following decades.", type: "positive" },
    { year: "1945–60s", label: "Sidewalk Districts Phased Out", body: "As Denver grows outward, the shared-assessment model is dismantled. Responsibility shifts entirely to individual property owners. New subdivisions built without sidewalks.", type: "negative" },
    { year: "1984", label: "First 'Sidewalk Bill'", body: "City Council introduces a bill giving property owners 'breathing room' on repair timelines. Acknowledges the burden but leaves private-liability model intact.", type: "neutral" },
    { year: "1988", label: "Council Seeks a Rewrite", body: "After years of failed enforcement, a Council panel asks for a complete rewrite. The city effectively walks away from active management.", type: "negative" },
    { year: "2002", label: "Right-of-Way Sidewalk Initiative", body: "City staff propose a fee of $6.60/sq ft and ~20 cents/sq ft annual maintenance charge. The proposal is never adopted.", type: "neutral" },
    { year: "2015", label: "Rethinking Denver Sidewalk Policy", body: "WalkDenver and Mile High Connects publish: 47% of streets in low-income areas lack adequate sidewalks. The 2002 fee proposal is recirculated.", type: "neutral" },
    { year: "2016", label: "Council Declines Reform", body: "After consulting the City Attorney's Office, Council concludes responsibility should remain with property owners 'to protect the city from liability.' The clearest pre-307 chance to act, declined.", type: "negative" },
    { year: "2017", label: "Denver Moves: Pedestrians", body: "City plan identifies a $1.1 billion gap to complete the network.", type: "milestone" },
    { year: "Nov 2017", label: "Elevate Denver Bond", body: "Voters approve $47.7M for sidewalks - a meaningful, but small fraction of the identified $1.1B need.", type: "positive" },
    { year: "2017–20", label: "Neighborhood Sidewalk Repair Program", body: "City launches a proactive inspection-and-bill program. After 1,100 inspections over three years, the pace projects 400 years for citywide completion.", type: "negative" },
    { year: "Nov 2020", label: "Auditor's Report", body: "City Auditor labels the program 'flawed, inefficient, inconsistent, and placing undue burden on residents.", type: "negative" },
    { year: "2022", label: "Denver Deserves Sidewalks", body: "Advocates collect ~20,000 signatures to put a new model on the ballot, bypassing City Council entirely.", type: "positive" },
    { year: "Nov 2022", label: "Initiative 307 Passes", body: "Voters approve a citywide annual fee that funds construction and repair through the city. Repair and construction responsibility shifts to the city.", type: "milestone" },
    { year: "Jan 2025", label: "Fees Begin and SIP Launches", body: "The city begins fee collection. The Sidewalk Improvement Program launches a 9-year master plan to build and repair a complete, ADA-compliant network.", type: "positive" },
  ];

  const typeStyle = {
    positive: { dot: "#2D6A4F", line: "rgba(45,106,79,0.3)" },
    negative: { dot: "#B6B0A6", line: "rgba(182,176,166,0.3)" },
    neutral:  { dot: "#D89A4E", line: "rgba(216,154,78,0.3)" },
    milestone:{ dot: rust,      line: `rgba(178,84,44,0.3)` },
  };

  return React.createElement("section", {
    id: "s8",
    style: { background: "#fff", padding: isMobile ? "60px 20px" : "80px 48px" }
  },
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act II — Denver's Trajectory"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 12px" } }, "The 20-Year Reform Arc"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, marginBottom: 16 } },
        "From the moment Denver named the billion-dollar problem to the moment it acted, eight years passed. From the first failed enforcement bill to the ballot initiative that finally worked, four decades."
      ),
      React.createElement("div", { style: { display: "flex", gap: 16, marginBottom: 44 } },
        [["Positive step", "#2D6A4F"], ["Failed attempt", "#B6B0A6"], ["Neutral / proposal", "#D89A4E"], ["Milestone", rust]].map(([l, c]) =>
          React.createElement("div", { key: l, style: { display: "flex", alignItems: "center", gap: 6 } },
            React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: c } }),
            React.createElement("span", { style: { fontSize: 11, color: "#666" } }, l)
          )
        )
      ),
      // Timeline
      React.createElement("div", { style: { position: "relative" } },
        // Vertical line
        React.createElement("div", {
          style: {
            position: "absolute", left: isMobile ? 72 : 120, top: 0, bottom: 0,
            width: 2, background: "rgba(27,58,75,0.12)"
          }
        }),
        events.map((ev, i) => {
          const ts = typeStyle[ev.type];
          const isActive = activeIdx === i;
          return React.createElement("div", {
            key: i,
            style: { display: "flex", gap: 0, marginBottom: 8, cursor: "pointer" },
            onClick: () => setActiveIdx(isActive ? null : i)
          },
            // Year
            React.createElement("div", {
              style: {
                width: isMobile ? 72 : 120, flexShrink: 0, paddingRight: 12,
                textAlign: "right", fontSize: isMobile ? 10 : 12, fontWeight: 700,
                color: ev.type === "milestone" ? rust : "#888",
                paddingTop: 12, fontVariantNumeric: "tabular-nums"
              }
            }, ev.year),
            // Dot + line
            React.createElement("div", { style: { position: "relative", width: 24, flexShrink: 0, display: "flex", justifyContent: "center" } },
              React.createElement("div", {
                style: {
                  width: 12, height: 12, borderRadius: "50%",
                  background: ts.dot, marginTop: 14, flexShrink: 0,
                  border: ev.type === "milestone" ? `3px solid ${rust}` : "none",
                  boxShadow: isActive ? `0 0 0 4px ${ts.dot}33` : "none",
                  transition: "box-shadow 0.2s", zIndex: 1
                }
              })
            ),
            // Content
            React.createElement("div", {
              style: {
                flex: 1, background: isActive ? (ev.type === "milestone" ? "rgba(178,84,44,0.06)" : "rgba(27,58,75,0.04)") : "transparent",
                borderRadius: 6, padding: isActive ? "12px 16px" : "10px 16px",
                marginLeft: 12, border: isActive ? `1px solid ${ts.dot}44` : "1px solid transparent",
                transition: "all 0.2s"
              }
            },
              React.createElement("div", {
                style: {
                  fontSize: 14, fontWeight: ev.type === "milestone" ? 800 : 600,
                  color: ev.type === "milestone" ? rust : navy, marginBottom: isActive ? 8 : 0
                }
              }, ev.label),
              isActive && React.createElement("p", { style: { fontSize: 13, color: "#555", lineHeight: 1.65, margin: 0 } }, ev.body)
            )
          );
        }),
      ),
      React.createElement("div", {
        style: {
          marginTop: 40, padding: "20px 24px",
          background: bone, borderLeft: `4px solid ${rust}`,
          borderRadius: "0 6px 6px 0", maxWidth: 680
        }
      },
        React.createElement("p", { style: { margin: 0, fontSize: 15, color: "#333", lineHeight: 1.7, fontStyle: "italic" } },
          "The lesson to be learned here is that no amount of planning, enforcement, or bonding would fix Denver's sidewalk network. The system that created the gaps was, without any change, the system that was trying to close them."
        )
      )
    )
  );
}

function S9Ballot({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const sage = "#B6BFB1";

  const ModelComparison = () =>
    React.createElement("div", {
      style: {
        width: "100%", height: "100%", background: "#F7F4EF",
        display: "flex", flexDirection: "column", padding: 40, justifyContent: "center", gap: 24
      }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "Old Model vs. New Model"),
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 } },
        [
          {
            label: "Before Initiative 307", color: "#B6B0A6",
            items: ["Property owner liable for all repairs", "Unpredictable, surprise repair bills", "City inspects → owner pays → gaps persist", "No dedicated funding stream", "Council-appropriated budget only"]
          },
          {
            label: "After Initiative 307", color: "#2D6A4F",
            items: ["City responsible for all construction & repair", "Small, predictable annual fee per parcel", "City builds on needs-based schedule", "Dedicated fee revenue stream", "Voter-mandated, durable beyond political cycles"]
          }
        ].map((col) =>
          React.createElement("div", { key: col.label,
            style: {
              background: "#fff", borderRadius: 8,
              border: `2px solid ${col.color}`, padding: "20px 18px"
            }
          },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 800, color: col.color, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 } }, col.label),
            col.items.map((item, i) =>
              React.createElement("div", { key: i, style: { display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" } },
                React.createElement("div", { style: { width: 6, height: 6, borderRadius: "50%", background: col.color, marginTop: 5, flexShrink: 0 } }),
                React.createElement("span", { style: { fontSize: 12.5, color: "#333", lineHeight: 1.5 } }, item)
              )
            )
          )
        )
      )
    );

  const ThreeChanges = () =>
    React.createElement("div", {
      style: {
        width: "100%", height: "100%", background: navy,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", padding: 40
      }
    },
      React.createElement("div", { style: { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 20 } },
        "Initiative 307 did three things at once"
      ),
      [
        { num: "01", title: "Shifted legal responsibility", body: "From property owner to city, across all parcel types." },
        { num: "02", title: "Created dedicated funding", body: "A recurring fee stream — not a one-time bond. Sidewalk funding stopped competing annually." },
        { num: "03", title: "Required prioritization", body: "Based on need. The implementation language was on the ballot, not added later." },
      ].map((item, i) =>
        React.createElement("div", {
          key: i,
          style: {
            display: "flex", gap: 20, marginBottom: 28, alignItems: "flex-start",
            maxWidth: 440
          }
        },
          React.createElement("div", {
            style: {
              fontSize: 22, fontWeight: 900, color: rust,
              opacity: 0.8, flexShrink: 0, lineHeight: 1
            }
          }, item.num),
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: "#EDE6DA", marginBottom: 4 } }, item.title),
            React.createElement("div", { style: { fontSize: 13, color: "rgba(237,230,218,0.7)", lineHeight: 1.6 } }, item.body)
          )
        )
      )
    );

  const slides = [
    {
      slideLabel: "The bypass",
      headline: "In 2022, advocates took it to the ballot",
      paragraphs: [
        "The Denver Deserves Sidewalks campaign collected nearly 20,000 signatures across roughly six months of fieldwork. This was finally enough to put the question directly to voters.",
        "The proposal fit in one sentence: a small annual fee on every property, scaled to lot frontage, in exchange for the city taking responsibility for sidewalk construction and repair."
      ],
      stat: "~20,000", statLabel: "signatures collected to put the question to voters directly",
      visual: React.createElement(MapPlaceholder, { label: "Campaign Photo, search Instagram, Denverite, etc. for something.", sublabel: "Denver Deserves Sidewalks — 2022" })
    },
    {
      slideLabel: "What voters approved",
      headline: "Initiative 307: November 2022",
      paragraphs: [
        "The vote did three things at once: it shifted legal responsibility from property owner to city, created a dedicated recurring funding stream, and required prioritization based on need.",
      ],
      visual: React.createElement(ThreeChanges)
    },
    {
      slideLabel: "Why this won",
      headline: "Why this one worked",
      paragraphs: [
        "Every prior attempt, from 1984 onward, tried to make the property-owner model work better. Initiative 307, instead, worked to overhaul it.",
        "Property owners gave up a future repair bill they couldn't predict in exchange for a smaller, predictable annual one. City Council wasn't taking action and Denver voters decided it was time for change.",
        "When council action stalls for two decades, a ballot campaign by passionate advocates can feel like the only way forward."
      ],
      visual: React.createElement(ModelComparison)
    }
  ];

  return React.createElement(Sidecar, {
    id: "s9", tweaks, isMobile, mediaRight: false,
    actLabel: "Act II — Denver's Trajectory",
    title: "How Initiative 307 Won",
    intro: "The bypass, the bundle, the ballot.",
    slides
  });
}

Object.assign(window, { S6History, S7Swipe, S8Timeline, S9Ballot });



// Sections 10–13: SIP Today, Eight Pathways, Decision Tree, Credits

function S10SIP({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const sage = "#B6BFB1", green = "#2D6A4F";

  const FeeChart = () =>
    React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#F7F4EF", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "SIP Fee Structure: Post-Initiative 307"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 28 } }, "Annual fee by development type* · Income-qualified rebates available"),
      [
        { type: "Single-family residential (standard)", fee: "~$150/yr", bar: 0.25, note: "Flat rate post-Council refinement" },
        { type: "Large multi-family residential", fee: "~$500-2500/yr", bar: 0.45, note: "Scaled by frontage" },
        { type: "Whole block development", fee: "~$4000/yr", bar: 0.75, note: "Larger parcels pay more" },
        { type: "Industrial / large institutional", fee: "~$4000+/yr", bar: 1.0, note: "Highest frontage exposure" },
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
    const sources = [
      { label: "SIP annual fee revenue", sublabel: "Dedicated stream, first in Denver's history", color: green, note: "~$XX M/yr NEED TO CONFIRM REVENUE" },
      { label: "Development-triggered construction", sublabel: "Owners build when property redevelops (D.R.M.C. 49-84)", color: "#4A90A4", note: "Ongoing, unquantified" },
      { label: "Federal & state grants", sublabel: "RAISE, CDBG, CDOT — competitive, variable", color: "#D89A4E", note: "Variable, project-by-project" },
      { label: "Future bond measures", sublabel: "Precedent: Elevate Denver ($47.7M, 2017)", color: "#B6BFB1", note: "Not yet committed" },
    ];
    return React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#fff", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "How SIP Fits Into the Funding Picture"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 28, lineHeight: 1.6 } },
        "The fee is the foundation — not the whole structure. Total network need was last estimated at $1.1B (Denver Moves, 2017)."
      ),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 } },
        ...sources.map((s, i) =>
          React.createElement("div", {
            key: i,
            style: { display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderRadius: 6, background: "rgba(27,58,75,0.03)", border: "1px solid rgba(27,58,75,0.08)" }
          },
            React.createElement("div", { style: { width: 10, height: 10, borderRadius: "50%", background: s.color, flexShrink: 0 } }),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 12, fontWeight: 700, color: navy } }, s.label),
              React.createElement("div", { style: { fontSize: 11, color: "#888", marginTop: 1 } }, s.sublabel)
            ),
            React.createElement("div", { style: { fontSize: 11, color: "#aaa", fontStyle: "italic", whiteSpace: "nowrap" } }, s.note)
          )
        )
      ),
      React.createElement("div", { style: { padding: "12px 16px", background: "rgba(27,58,75,0.04)", border: "1px solid rgba(27,58,75,0.12)", borderRadius: 6 } },
        React.createElement("span", { style: { fontSize: 12, color: navy, fontWeight: 700 } }, "What we know: "),
        React.createElement("span", { style: { fontSize: 12, color: "#444" } },
          "The SIP fee is the first dedicated, recurring revenue stream for sidewalks in Denver's history. The $1.1B total network need — a 2017 estimate — will require multiple funding sources over many years. No single source has been sized against a verified annual target."
        )
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
        "First, legal responsibility is  now the city's, not the homeowner's. Second, funding is dedicated rather than appropriated annually. Third, prioritization is needs-based rather than complaint-driven.",
        "The legal and funding pieces are now built into the model. The harder part is delivery: deciding where work happens first, and whether those choices hold up as the program moves from policy to pavement."
      ],
      stat: "9-year", statLabel: "master plan to achieve complete, ADA-compliant network citywide",
      visual: React.createElement(MapPlaceholder, { label: "SIP Construction Program or other similar maps", sublabel: "Other ideas?" })
    },
    {
      slideLabel: "What's still open",
      headline: "Three things still being worked out",
      paragraphs: [
        "First: how SIP coordinates with utilities, curb ramps, drainage, trees, and street projects. Sidewalks share the right-of-way with everything else.",
        "Second: how the city assembles the full funding picture (fee revenue, development-triggered construction, grants, and future bonds) to address a network need last estimated at $1.1 billion in 2017.",
        "Third: how the city applies responsibility across commercial, institutional, tax-exempt, and government-owned parcels.",
        "None of these are insurmountable. As Denver continues to work out its programs kinks, practitioners can see how they overcome these challenges and how those solutions can apply to your own city."
      ],
      visual: React.createElement(FundingGap)
    }
  ];

  return React.createElement(Sidecar, {
    id: "s10", tweaks, isMobile,
    actLabel: "Act III — Reform Pathways",
    title: "Where Denver Stands Today",
    intro: "SIP implementation: where the program stands.",
    slides
  });
}

function S11Pathways({ tweaks, isMobile }) {
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
    style: { background: bone, padding: isMobile ? "60px 0 60px" : "80px 0 80px" }
  },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px" : "0 48px" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act III — Reform Pathways"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px" } }, "The Eight Reform Pathways"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 680, marginBottom: 8 } },
        "Initiative 307 is one of at least eight ways cities have restructured how sidewalks get funded, built, and maintained. Which model fits depends on three things: a city's legal authority, its political environment, and the condition of the network it already has."
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
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 32,
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

function S12Decision({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";
  const green = "#2D6A4F";
  const amber = "#D89A4E";
  const muted = "#8A857A";

  const [answers, setAnswers] = React.useState({});
  const [revealed, setRevealed] = React.useState(false);
  const [showMatrix, setShowMatrix] = React.useState(true);

  // ══════════════════════════════════════════════════════════════════════════
  // MODEL CATALOG — eight governance/funding structures
  // ══════════════════════════════════════════════════════════════════════════
  const models = {
    public_ownership: {
      name: "Public Ownership",
      short: "Public Ownership",
      color: "#1B3A4B",
      liabilityFrame: "Replaces private liability",
      liabilityIcon: "🔄",
      revenueScale: "Variable — depends on annual appropriation",
      revenueScaleShort: "Variable",
      timeToRevenue: "Next budget cycle (months)",
      timeShort: "Months",
      costDistribution: "General taxpayers, proportional to existing tax base",
      costShort: "General tax base",
      adminComplexity: "Low — uses existing public works",
      equityScalability: "Inherits the progressivity of the overall tax structure",
      equityShort: "Inherits tax structure",
      renewal: "Annual budget appropriation",
      renewalShort: "Annual",
      summary: "Sidewalks treated as core infrastructure like streets. Construction and maintenance funded from the general fund alongside other public works.",
      cities: [
        { name: "Boston, MA", note: "Public ownership integrated with street work" },
        { name: "Lincoln, NE", note: "General fund covers full sidewalk program" },
        { name: "Spanish Fork, UT", note: "Small-city public ownership" },
        { name: "Maitland, FL", note: "Florida home-rule public ownership" }
      ],
      fits: "Council willing to defend a sidewalk line item annually; general fund has headroom; want simplicity over revenue protection.",
      risk: "No dedicated revenue means sidewalks compete with every other priority every year. Vulnerable to recession-era cuts. Maintenance backlog can accumulate without a political champion.",
      avoidWhen: "Tight general fund; need for protected multi-year revenue; cannot guarantee year-over-year council support."
    },
    utility_fee: {
      name: "Utility Fee",
      short: "Utility Fee",
      color: "#2D5F7A",
      liabilityFrame: "Typically replaces private liability for funded scope",
      liabilityIcon: "🔄",
      revenueScale: "Low to moderate — modest per-household revenue",
      revenueScaleShort: "Low–moderate",
      timeToRevenue: "1–6 months after authorization",
      timeShort: "1–6 months",
      costDistribution: "Flat per-customer (regressive unless income rebates added)",
      costShort: "Flat per-customer",
      adminComplexity: "Low — uses existing utility billing",
      equityScalability: "Low (flat structure); income-based discounts possible",
      equityShort: "Low (rebates possible)",
      renewal: "None — runs until ordinance changed",
      renewalShort: "Ongoing",
      summary: "Flat monthly charge billed alongside water, sewer, or trash. Englewood's opt-in version sees ~95% participation. Westminster and Payette use mandatory rates.",
      cities: [
        { name: "Payette, ID", note: "$1/month residential, $2/month commercial" },
        { name: "Westminster, CO", note: "$6/month residential" },
        { name: "Englewood, CO", note: "~$0.12/sq ft opt-in concrete utility" },
        { name: "Baker City, OR", note: "Utility fee funds homeowner repair grants" }
      ],
      fits: "Existing utility billing can carry a new line item; want fastest path to protected revenue; smaller cities where modest scale is sufficient.",
      risk: "Flat fees are regressive without rebates. Per-household revenue is modest — may not fund significant build-out. Some states classify utility fees as taxes requiring voter approval.",
      avoidWhen: "Need large-scale build-out revenue; equity is a top constraint and rebate structure isn't viable; state classifies as tax with no political ballot path."
    },
    dedicated_fee: {
      name: "Dedicated Annual Fee",
      short: "Dedicated Fee",
      color: "#B2542C",
      liabilityFrame: "Replaces private liability",
      liabilityIcon: "🔄",
      revenueScale: "High",
      revenueScaleShort: "High",
      timeToRevenue: "1–2 yrs council; 2–5+ yrs initiative",
      timeShort: "1–5+ yrs",
      costDistribution: "Scaled by frontage; income rebates possible",
      costShort: "Frontage-scaled",
      adminComplexity: "Moderate — new billing system, frontage data, rebate administration",
      equityScalability: "High — frontage scaling plus income rebates",
      equityShort: "High",
      renewal: "None after authorization — durable",
      renewalShort: "Durable",
      summary: "Parcel-based fee scaled by frontage, dedicated to a sidewalk program. Denver's Initiative 307 (2022) is the leading recent example. Funds a multi-year build-out and repair plan directly.",
      cities: [
        { name: "Denver, CO", note: "Initiative 307 (2022); 9-year Sidewalk Implementation Plan" }
      ],
      fits: "Substantial revenue need beyond utility-fee scale; want durability past political cycles; willing to design rebate structure for equity.",
      risk: "Long timeline if going through citizen initiative. Legal structure must be carefully drafted to avoid tax-vote triggers. Frontage scaling can be politically contested.",
      avoidWhen: "Modest revenue need that a utility fee could meet; no infrastructure for rebate administration."
    },
    millage: {
      name: "Property Tax Millage",
      short: "Millage",
      color: "#4A7C59",
      liabilityFrame: "Replaces private liability for funded scope",
      liabilityIcon: "🔄",
      revenueScale: "High",
      revenueScaleShort: "High",
      timeToRevenue: "1–2 years (election cycle)",
      timeShort: "1–2 yrs",
      costDistribution: "Proportional to assessed property value",
      costShort: "Proportional to value",
      adminComplexity: "Low — uses existing property tax system",
      equityScalability: "Moderate (proportional, not graduated)",
      equityShort: "Moderate",
      renewal: "Periodic ballot (typically 5–10 years)",
      renewalShort: "Periodic ballot",
      summary: "Dedicated property-tax millage approved by voters and renewed on a fixed cycle. Ann Arbor passed a 0.125-mill levy specifically for sidewalks in 2011.",
      cities: [
        { name: "Ann Arbor, MI", note: "0.125-mill sidewalk levy (2011, renewed)" },
        { name: "East Grand Rapids, MI", note: "2-mill combined streets/sidewalks levy" }
      ],
      fits: "State allows millage without supermajority hurdles; reliable property tax base; voters periodically renew infrastructure measures.",
      risk: "Renewal cycles create funding cliffs. Not viable in California under Prop 13. Michigan's Headlee Amendment imposes rollback formulas. Renters pay through pass-through but don't vote directly.",
      avoidWhen: "California or other states with supermajority requirements; severe millage caps; no appetite for periodic ballot reauthorization."
    },
    parcel_tax: {
      name: "Parcel Tax",
      short: "Parcel Tax",
      color: "#7B5EA7",
      liabilityFrame: "Replaces private liability for funded scope",
      liabilityIcon: "🔄",
      revenueScale: "Moderate to high",
      revenueScaleShort: "Moderate–high",
      timeToRevenue: "1–2 years (election cycle)",
      timeShort: "1–2 yrs",
      costDistribution: "Per-parcel or per-square-foot, often tiered by use",
      costShort: "Per-parcel / per-sqft",
      adminComplexity: "Moderate — separate billing from property tax",
      equityScalability: "Moderate — can scale by sqft or property class",
      equityShort: "Moderate",
      renewal: "Typically time-limited",
      renewalShort: "Time-limited",
      summary: "Per-parcel or per-square-foot tax. Berkeley's Measure FF (2024) generates ~$15M annually for 14 years at $0.17/sq ft residential, $0.25/sq ft non-residential.",
      cities: [
        { name: "Berkeley, CA", note: "Measure FF, 2024; $15M/year for 14 years" }
      ],
      fits: "California cities specifically — Prop 13 makes millages require supermajority, but parcel taxes are the established workaround.",
      risk: "Designed around California's constraints; outside CA, a millage or dedicated fee is usually simpler. Time-limited unless reauthorized.",
      avoidWhen: "Outside California (use millage or dedicated fee); when voter supermajority requirement is unreachable."
    },
    improvement_district: {
      name: "Improvement District",
      short: "Improvement District",
      color: "#5A7A6A",
      liabilityFrame: "Hybrid — district pays for funded scope; underlying liability varies",
      liabilityIcon: "🔀",
      revenueScale: "Moderate (varies by district scope)",
      revenueScaleShort: "Moderate",
      timeToRevenue: "1–3 years (district formation)",
      timeShort: "1–3 yrs",
      costDistribution: "Scaled by property class, frontage, and geography",
      costShort: "Geographic + class scaling",
      adminComplexity: "High — district formation, boundary politics, differentiated billing",
      equityScalability: "High — geographic and classification scaling",
      equityShort: "High",
      renewal: "Varies by state — annual to permanent",
      renewalShort: "Varies",
      summary: "Geographic districts with annual fees scaled by property classification. Ithaca, NY operates five Sidewalk Improvement Districts. Maintenance costs socialized across properties within each district.",
      cities: [
        { name: "Ithaca, NY", note: "Five SIDs with tiered fees by property class" }
      ],
      fits: "Significant variation in conditions across neighborhoods; equity scaling by geography is a priority; capacity to administer differentiated assessments.",
      risk: "District boundaries are politically negotiated and can entrench inequities if drawn poorly. Administrative complexity is meaningfully higher. Some states require property-owner consent.",
      avoidWhen: "Citywide uniform approach is the political target; limited administrative capacity; state law makes district formation procedurally heavy."
    },
    inspection_bill: {
      name: "Inspection-and-Bill",
      short: "Inspection-and-Bill",
      color: "#8A6A3A",
      liabilityFrame: "Preserves private liability — owner remains legally responsible",
      liabilityIcon: "⚖",
      revenueScale: "Low to moderate — offsets repair, doesn't fund build-out",
      revenueScaleShort: "Low–moderate",
      timeToRevenue: "Ongoing — each repair generates an assessment",
      timeShort: "Ongoing",
      costDistribution: "Owner pays for their own segment",
      costShort: "Owner-pays (per segment)",
      adminComplexity: "Moderate — inspection cycle, contracting, billing",
      equityScalability: "Low — preserves regressive surprise-bill pattern",
      equityShort: "Low",
      renewal: "Ongoing inspection cycle",
      renewalShort: "Ongoing",
      summary: "City inspects on a rotating cycle, makes repairs, and bills the abutting owner. Minneapolis is the leading example. Preserves owner liability while ensuring repairs proceed on schedule.",
      cities: [
        { name: "Minneapolis, MN", note: "Rotating inspection cycle citywide" }
      ],
      fits: "Network largely intact but maintenance has lapsed; ballot reform isn't viable; want repair coordination without changing liability framework; tight budget constrains new revenue.",
      risk: "Preserves the surprise-bill problem at the household level. Doesn't fund new build-out. Doesn't address equity in cost burden across income levels. Owner liability persists.",
      avoidWhen: "Goal is to replace private-liability framework; need to fund significant build-out; equity in cost burden is a top priority."
    },
    general_levy: {
      name: "General Transportation Levy",
      short: "Transportation Levy",
      color: "#3A6A8A",
      liabilityFrame: "Replaces private liability within funded scope",
      liabilityIcon: "🔄",
      revenueScale: "Very high — broader transportation funding",
      revenueScaleShort: "Very high",
      timeToRevenue: "1–2 years (election cycle)",
      timeShort: "1–2 yrs",
      costDistribution: "Varies by levy type (property, sales, utility tax)",
      costShort: "Varies by type",
      adminComplexity: "Moderate — sidewalks compete within the levy",
      equityScalability: "Moderate–high — depends on equity index",
      equityShort: "Moderate–high",
      renewal: "Periodic ballot (typically 5–10 years)",
      renewalShort: "Periodic ballot",
      summary: "Voter-approved levy funding streets and sidewalks together, often with an equity index directing capital. Seattle's transportation levy is the largest example.",
      cities: [
        { name: "Seattle, WA", note: "Transportation levy with equity index" },
        { name: "Cheney, WA", note: "4% utility fee for combined streets/sidewalks" },
        { name: "East Grand Rapids, MI", note: "2-mill combined levy" }
      ],
      fits: "Political coalition for transportation broadly is stronger than for sidewalks specifically; comfortable with sidewalks sharing a fund with streets.",
      risk: "Sidewalks compete with streets inside the same fund and can be deprioritized at implementation. Renewal cycles create planning uncertainty.",
      avoidWhen: "Sidewalks need dedicated protected revenue; advocacy is specifically sidewalk-focused; no appetite for repeated ballot cycles."
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // FUNDING OVERLAYS — layer on top of any base model (grants, bonds, etc.)
  // ══════════════════════════════════════════════════════════════════════════
  const overlays = {
    ss4a: {
      name: "SS4A Federal Grant",
      type: "Grant",
      useFor: "Build-out acceleration, planning, demonstration projects",
      detail: "Federal Safe Streets and Roads for All competitive grant. Action plan grants and implementation grants available. Best layered on top of a dedicated revenue stream that demonstrates local commitment.",
      bestWith: ["dedicated_fee", "general_levy", "public_ownership"],
      bestFor: ["build_out", "both"]
    },
    cdbg: {
      name: "CDBG Funds",
      type: "Federal block grant",
      useFor: "Sidewalk improvements in qualifying low-to-moderate-income neighborhoods",
      detail: "Community Development Block Grant funds can pay for sidewalks in eligible areas. Useful for early equity-focused work but typically too small to fund a citywide program.",
      bestWith: ["public_ownership", "improvement_district", "dedicated_fee"],
      bestFor: ["redlined_central"]
    },
    state_atp: {
      name: "State Active Transportation Grants",
      type: "State grant program",
      useFor: "Capital projects, often pedestrian and bicycle infrastructure together",
      detail: "Most states have active transportation grant programs (CA ATP, CO Multimodal, WSDOT Pedestrian/Bicycle). Competitive, project-by-project, with planning and design cycles measured in years.",
      bestWith: ["public_ownership", "dedicated_fee", "general_levy"],
      bestFor: ["build_out", "corridors_use"]
    },
    go_bond: {
      name: "General Obligation Bond",
      type: "Debt instrument",
      useFor: "Initial program capitalization and accelerated build-out",
      detail: "Voter-approved GO bond backed by general taxing authority. Allows front-loading a build-out program against a longer-term revenue stream. Useful where time-to-completion matters politically.",
      bestWith: ["public_ownership", "millage", "general_levy"],
      bestFor: ["build_out", "very_high"]
    },
    revenue_bond: {
      name: "Revenue Bond",
      type: "Debt instrument",
      useFor: "Accelerating build-out against a dedicated fee or assessment stream",
      detail: "Bond repayment backed by a specific revenue source (utility fee, dedicated fee, special district assessment). Lets a city compress a 20-year build-out into 5–10 years.",
      bestWith: ["utility_fee", "dedicated_fee", "improvement_district"],
      bestFor: ["build_out", "very_high"]
    },
    tif: {
      name: "Tax Increment Financing",
      type: "Captured tax increment",
      useFor: "Sidewalks in redevelopment / urban renewal areas",
      detail: "TIF/URA captures property tax increment within a defined area for infrastructure. Only relevant where redevelopment districts overlap with sidewalk-priority areas.",
      bestWith: ["improvement_district", "public_ownership"],
      bestFor: ["corridors_use"]
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // AUTHORIZATION PATHWAYS — separate from models
  // ══════════════════════════════════════════════════════════════════════════
  const pathways = {
    council_ordinance: {
      name: "Council ordinance",
      short: "Council ordinance",
      icon: "🏛",
      timeline: "3–12 months",
      description: "Council adopts the funding mechanism by ordinance under existing authority. Fastest pathway; relies on council majority and on state law treating the mechanism as a fee rather than a tax.",
      requirements: "Council majority • Public hearings • State law and charter must permit council adoption without voter approval",
      risk: "Less democratic legitimacy than ballot pathways; can be undone by future councils; vulnerable to legal challenge if state law treats the mechanism as a tax."
    },
    charter_amendment: {
      name: "Charter amendment",
      short: "Charter amendment",
      icon: "📜",
      timeline: "1–2 years",
      description: "Reform that requires changing the city charter — typically because sidewalk responsibility is codified there. Almost always voter-approved.",
      requirements: "Council referral or citizen initiative • Voter approval • Election cycle timing",
      risk: "Charter changes are politically heavier than ordinance changes and harder to refine after passage. Requires high coalition discipline."
    },
    council_referred_ballot: {
      name: "Council-referred ballot",
      short: "Council-referred ballot",
      icon: "🗳",
      timeline: "1–2 years (next election cycle)",
      description: "Council places the measure on the ballot for voter approval. Combines council leadership with democratic legitimacy and protects against future repeal.",
      requirements: "Council majority to refer • Voter approval • Election cycle timing",
      risk: "Voter rejection sends council back to drawing board; tied to election cycles; campaign requires political capital and resources."
    },
    citizen_initiative: {
      name: "Citizen-initiated ballot",
      short: "Citizen initiative",
      icon: "✊",
      timeline: "2–5+ years (advocacy + signatures + campaign)",
      description: "An advocacy coalition collects signatures to place the measure directly on the ballot, bypassing a stalled council. Denver's Initiative 307 is the leading recent example.",
      requirements: "Signature threshold • Sustained advocacy coalition • Campaign funding • Legal drafting capacity",
      risk: "Long timeline. Coalition fatigue. Legal challenges to ballot language. Can be perceived as adversarial to council and complicate implementation."
    },
    phased_approach: {
      name: "Phased: pilot first, scale later",
      short: "Phased pilot → scale",
      icon: "📈",
      timeline: "2–4 years total",
      description: "Begin with a council-adopted pilot or partial program to prove the model, then ask voters for full-scale dedicated revenue once results are visible.",
      requirements: "Council willingness to pilot • Demonstrable early results • Advocacy coalition for later ballot push",
      risk: "Pilot scope may be too small to show meaningful results; second-stage ballot can stall after pilot succeeds; takes longer than direct routes."
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // LEGAL VIABILITY — which pathways are available for a model given context
  // ══════════════════════════════════════════════════════════════════════════
  const legallyViable = (modelKey, taxRegime, liabilityFramework) => {
    // Charter-codified liability adds charter_amendment as a needed pathway
    // for any model that replaces private liability
    const replacesLiability = ["public_ownership", "utility_fee", "dedicated_fee", "millage", "parcel_tax", "general_levy"];
    const needsCharterChange = liabilityFramework === "charter_codified" && replacesLiability.includes(modelKey);

    let pathways = [];

    if (modelKey === "public_ownership") pathways = ["council_ordinance"];
    else if (modelKey === "inspection_bill") pathways = ["council_ordinance"];
    else if (modelKey === "improvement_district") pathways = ["council_ordinance", "phased_approach"];
    else if (modelKey === "parcel_tax") pathways = ["council_referred_ballot", "citizen_initiative"];
    else if (modelKey === "millage" || modelKey === "general_levy") pathways = ["council_referred_ballot", "citizen_initiative", "phased_approach"];
    else if (modelKey === "dedicated_fee") {
      if (taxRegime === "tabor") pathways = ["council_referred_ballot", "citizen_initiative", "phased_approach"];
      else pathways = ["council_ordinance", "council_referred_ballot", "citizen_initiative", "phased_approach"];
    } else if (modelKey === "utility_fee") {
      pathways = ["council_ordinance", "council_referred_ballot", "phased_approach"];
    }

    // Prop 13: millage essentially blocked (would need supermajority + state-law workarounds)
    if (taxRegime === "prop13" && modelKey === "millage") return [];

    // If a charter amendment is needed, that becomes the primary or paired pathway
    if (needsCharterChange) {
      // Charter amendment is always voter-approved, so council_ordinance alone won't work
      pathways = pathways.filter(p => p !== "council_ordinance");
      if (!pathways.includes("charter_amendment")) pathways.unshift("charter_amendment");
    }

    return pathways;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // QUESTIONS — eight diagnostic questions
  // ══════════════════════════════════════════════════════════════════════════
  const questions = [
    {
      id: "q1",
      label: "Current liability framework",
      text: "How is sidewalk responsibility currently structured in your city?",
      subtitle: "Reform looks different if responsibility is codified in your charter (requires amendment), set by ordinance (council can change), or just operational practice (most flexible). This shapes which pathways are even available.",
      options: [
        { id: "charter_codified", label: "Codified in city charter — owners hold responsibility by charter provision", icon: "📜" },
        { id: "ordinance", label: "Established by ordinance — council could change it", icon: "📋" },
        { id: "practice", label: "Operational practice — no explicit charter or ordinance codification", icon: "🗂" },
        { id: "mixed", label: "Mixed — some elements in charter, others in ordinance or practice", icon: "🔀" },
        { id: "unclear_q1", label: "Unclear — need municipal counsel to verify", icon: "❓" }
      ]
    },
    {
      id: "q2",
      label: "State revenue framework",
      text: "What state-level constraints apply to new sidewalk revenue?",
      subtitle: "Whether a mechanism counts as a 'fee' or 'tax' often determines whether council can act alone or whether voter approval is required. State law sets the outer bounds; charter and ordinance work within them.",
      options: [
        { id: "broad_home_rule", label: "Home rule with no significant tax-vote requirements — broad authority over fees and most assessments", icon: "🏛" },
        { id: "tabor", label: "Tax increases require voter approval (Colorado TABOR or similar) — fees can be council-adopted if properly structured", icon: "📊" },
        { id: "prop13", label: "Property-tax supermajority required (California Prop 13/218) — parcel tax is the established workaround", icon: "⚖" },
        { id: "millage_cap", label: "Millage rate caps with rollback formulas (Michigan Headlee or similar)", icon: "📉" },
        { id: "dillons", label: "Dillon's Rule — most revenue mechanisms need explicit state authorization", icon: "📜" },
        { id: "unsure_q2", label: "Unsure — need to verify with municipal counsel", icon: "❓" }
      ]
    },
    {
      id: "q3",
      label: "Network state",
      text: "What does your sidewalk network actually need?",
      subtitle: "Build-out and maintenance have different revenue scales and very different cost curves. A network needing $1B of new construction is not the same problem as one needing a rotating repair cycle.",
      options: [
        { id: "build_out", label: "Build out — significant missing sidewalks, especially in post-1940 car-era neighborhoods", icon: "🚧" },
        { id: "maintenance", label: "Fix what exists — network largely complete but in deferred-maintenance disrepair", icon: "🔧" },
        { id: "both", label: "Both — meaningful gaps AND meaningful maintenance backlog", icon: "🌐" },
        { id: "no_inventory", label: "Not sure — we don't have a current network inventory", icon: "📊" }
      ]
    },
    {
      id: "q4",
      label: "Spatial pattern",
      text: "Where are gaps and disrepair concentrated?",
      subtitle: "Spatial pattern affects whether a uniform citywide mechanism fits or whether geographic/income scaling is essential. Equity emphasis can be addressed through structure (rebates, scaling) or geography (sequencing).",
      options: [
        { id: "redlined_central", label: "Historically disinvested neighborhoods (former HOLC C/D areas, lower-income cores)", icon: "🏘" },
        { id: "periphery", label: "Post-1940 car-era peripheral neighborhoods — gap-heavy by development era", icon: "🚗" },
        { id: "dispersed_equity", label: "Dispersed across the city — no strong spatial concentration", icon: "🗺" },
        { id: "corridors_use", label: "Specific corridors (schools, transit, commercial) by use prioritization", icon: "🚌" },
        { id: "spatial_unknown", label: "Not yet mapped — pattern unclear", icon: "❓" }
      ]
    },
    {
      id: "q5",
      label: "Council feasibility",
      text: "How feasible is council action on a new sidewalk mechanism?",
      subtitle: "Be honest about your council. Council action is faster but limited in scope; if they won't act, you're routed to a ballot pathway. Council appetite is separable from voter appetite.",
      options: [
        { id: "council_high", label: "High — council has majority support and political will to act this term", icon: "🟢" },
        { id: "council_mid", label: "Moderate — council is interested but needs a stronger public case or coalition", icon: "🟡" },
        { id: "council_low", label: "Low — council has stalled for years; political will is not there", icon: "🔴" },
        { id: "council_unknown", label: "Don't know — hasn't been seriously tested", icon: "❓" }
      ]
    },
    {
      id: "q6",
      label: "Voter & advocacy capacity",
      text: "How feasible is a ballot pathway?",
      subtitle: "Ballot pathways depend on more than voter sentiment — sustained advocacy infrastructure, signature capacity, and campaign resources matter. Denver's reform took two decades of organizing.",
      options: [
        { id: "ballot_high", label: "High — strong advocacy coalition; voters likely receptive; campaign capacity exists", icon: "🟢" },
        { id: "ballot_mid", label: "Moderate — some capacity; voter support uncertain; campaign would need to be built", icon: "🟡" },
        { id: "ballot_low", label: "Low — no organized advocacy; voter awareness minimal", icon: "🔴" },
        { id: "ballot_proven", label: "Proven — past sidewalk or transportation measures have passed", icon: "✅" },
        { id: "ballot_unknown", label: "Don't know — no recent test of voter sentiment", icon: "❓" }
      ]
    },
    {
      id: "q7",
      label: "Revenue scale needed",
      text: "What scale of revenue does the program need?",
      subtitle: "Available mechanisms vary by an order of magnitude. A program needing $5M/year and one needing $100M/year are not the same problem. Bonds and grants can stretch any base mechanism further.",
      options: [
        { id: "modest", label: "Modest — a few million per year would meaningfully advance the program", icon: "💧" },
        { id: "substantial", label: "Substantial — tens of millions per year for a major build-out", icon: "💰" },
        { id: "very_high", label: "Very high — hundreds of millions over a decade (Denver-scale)", icon: "🏛" },
        { id: "scale_unknown", label: "Don't know — need a needs-assessment first", icon: "❓" }
      ]
    },
    {
      id: "q8",
      label: "Delivery capacity",
      text: "How is sidewalk delivery currently organized?",
      subtitle: "Operational capacity determines what a reformed program can actually build. Funding a program the city can't staff or contract for is a common failure mode.",
      options: [
        { id: "robust", label: "Robust public works — could absorb citywide sidewalk delivery in-house", icon: "🏗" },
        { id: "mid", label: "Mid-capacity — could deliver with new staff or contractor partnerships", icon: "⚙" },
        { id: "limited", label: "Limited — would need to contract construction and inspection out", icon: "📋" },
        { id: "district_oriented", label: "Decentralized — district-based or neighborhood delivery fits city structure", icon: "🏘" },
        { id: "delivery_unknown", label: "Don't know — capacity hasn't been formally assessed", icon: "❓" }
      ]
    }
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // MODEL SCORING — eight questions × eight models
  // Unknown answers score neutrally (+1 across most models)
  // ══════════════════════════════════════════════════════════════════════════
  const MODEL_SCORES = {
    q1: { // current liability framework
      charter_codified: { public_ownership: 0, utility_fee: 1, dedicated_fee: 2, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 },
      ordinance:        { public_ownership: 2, utility_fee: 3, dedicated_fee: 3, millage: 2, parcel_tax: 2, improvement_district: 2, inspection_bill: 2, general_levy: 2 },
      practice:         { public_ownership: 3, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 2, inspection_bill: 1, general_levy: 2 },
      mixed:            { public_ownership: 1, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 2, inspection_bill: 2, general_levy: 2 },
      unclear_q1:       { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
    },
    q2: { // state revenue framework
      broad_home_rule: { public_ownership: 2, utility_fee: 3, dedicated_fee: 3, millage: 2, parcel_tax: -1, improvement_district: 2, inspection_bill: 2, general_levy: 2 },
      tabor:           { public_ownership: 1, utility_fee: 2, dedicated_fee: 3, millage: 1, parcel_tax: -1, improvement_district: 1, inspection_bill: 2, general_levy: 2 },
      prop13:          { public_ownership: 1, utility_fee: 1, dedicated_fee: -1, millage: -5, parcel_tax: 7, improvement_district: 1, inspection_bill: 1, general_levy: 2 },
      millage_cap:     { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: -1, parcel_tax: 1, improvement_district: 2, inspection_bill: 2, general_levy: 1 },
      dillons:         { public_ownership: 1, utility_fee: 1, dedicated_fee: -1, millage: 1, parcel_tax: -2, improvement_district: 0, inspection_bill: 2, general_levy: 0 },
      unsure_q2:       { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 0, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
    },
    q3: { // network state
      build_out:    { public_ownership: 2, utility_fee: 1, dedicated_fee: 3, millage: 2, parcel_tax: 2, improvement_district: 2, inspection_bill: -2, general_levy: 3 },
      maintenance:  { public_ownership: 1, utility_fee: 2, dedicated_fee: 1, millage: 2, parcel_tax: 1, improvement_district: 1, inspection_bill: 4, general_levy: 1 },
      both:         { public_ownership: 2, utility_fee: 2, dedicated_fee: 3, millage: 2, parcel_tax: 2, improvement_district: 2, inspection_bill: 1, general_levy: 2 },
      no_inventory: { public_ownership: 1, utility_fee: 1, dedicated_fee: 0, millage: 0, parcel_tax: 0, improvement_district: 1, inspection_bill: 2, general_levy: 0 }
    },
    q4: { // spatial pattern
      redlined_central:  { public_ownership: 1, utility_fee: 0, dedicated_fee: 2, millage: 1, parcel_tax: 1, improvement_district: 3, inspection_bill: 0, general_levy: 2 },
      periphery:         { public_ownership: 1, utility_fee: 1, dedicated_fee: 3, millage: 2, parcel_tax: 1, improvement_district: 1, inspection_bill: -1, general_levy: 3 },
      dispersed_equity:  { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 1, inspection_bill: 1, general_levy: 1 },
      corridors_use:     { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 2, inspection_bill: 1, general_levy: 2 },
      spatial_unknown:   { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 1, general_levy: 1 }
    },
    q5: { // council appetite
      council_high:    { public_ownership: 3, utility_fee: 3, dedicated_fee: 1, millage: 0, parcel_tax: 0, improvement_district: 3, inspection_bill: 3, general_levy: 1 },
      council_mid:     { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: 1, parcel_tax: 1, improvement_district: 2, inspection_bill: 2, general_levy: 1 },
      council_low:     { public_ownership: -2, utility_fee: 0, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: -1, inspection_bill: 1, general_levy: 2 },
      council_unknown: { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
    },
    q6: { // ballot capacity
      ballot_high:    { public_ownership: 0, utility_fee: 1, dedicated_fee: 3, millage: 3, parcel_tax: 3, improvement_district: 1, inspection_bill: 0, general_levy: 3 },
      ballot_mid:     { public_ownership: 1, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 1, inspection_bill: 1, general_levy: 2 },
      ballot_low:     { public_ownership: 2, utility_fee: 2, dedicated_fee: 0, millage: 0, parcel_tax: 0, improvement_district: 2, inspection_bill: 3, general_levy: 0 },
      ballot_proven:  { public_ownership: 1, utility_fee: 2, dedicated_fee: 3, millage: 3, parcel_tax: 3, improvement_district: 1, inspection_bill: 1, general_levy: 3 },
      ballot_unknown: { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 1, general_levy: 1 }
    },
    q7: { // revenue scale
      modest:         { public_ownership: 2, utility_fee: 4, dedicated_fee: 0, millage: 0, parcel_tax: 0, improvement_district: 2, inspection_bill: 3, general_levy: 0 },
      substantial:    { public_ownership: 2, utility_fee: 1, dedicated_fee: 3, millage: 3, parcel_tax: 3, improvement_district: 2, inspection_bill: 0, general_levy: 3 },
      very_high:      { public_ownership: 1, utility_fee: -1, dedicated_fee: 4, millage: 3, parcel_tax: 3, improvement_district: 1, inspection_bill: -2, general_levy: 4 },
      scale_unknown:  { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
    },
    q8: { // delivery capacity
      robust:            { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 1, inspection_bill: 2, general_levy: 2 },
      mid:               { public_ownership: 1, utility_fee: 2, dedicated_fee: 2, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 },
      limited:           { public_ownership: 0, utility_fee: 2, dedicated_fee: 1, millage: 0, parcel_tax: 0, improvement_district: 1, inspection_bill: 2, general_levy: 0 },
      district_oriented: { public_ownership: 0, utility_fee: 0, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 5, inspection_bill: 1, general_levy: 0 },
      delivery_unknown:  { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 1, general_levy: 1 }
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PATHWAY SCORING
  // ══════════════════════════════════════════════════════════════════════════
  const PATHWAY_SCORES = {
    q1: { // current liability framework
      charter_codified: { council_ordinance: -2, charter_amendment: 4, council_referred_ballot: 2, citizen_initiative: 2, phased_approach: 1 },
      ordinance:        { council_ordinance: 3, charter_amendment: 0, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 },
      practice:         { council_ordinance: 3, charter_amendment: -1, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 },
      mixed:            { council_ordinance: 1, charter_amendment: 2, council_referred_ballot: 2, citizen_initiative: 1, phased_approach: 2 },
      unclear_q1:       { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 }
    },
    q2: { // state revenue framework
      broad_home_rule: { council_ordinance: 3, charter_amendment: 0, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 },
      tabor:           { council_ordinance: 1, charter_amendment: 0, council_referred_ballot: 2, citizen_initiative: 2, phased_approach: 2 },
      prop13:          { council_ordinance: 0, charter_amendment: 0, council_referred_ballot: 2, citizen_initiative: 2, phased_approach: 1 },
      millage_cap:     { council_ordinance: 1, charter_amendment: 0, council_referred_ballot: 2, citizen_initiative: 1, phased_approach: 2 },
      dillons:         { council_ordinance: 1, charter_amendment: 0, council_referred_ballot: 1, citizen_initiative: 0, phased_approach: 1 },
      unsure_q2:       { council_ordinance: 1, charter_amendment: 0, council_referred_ballot: 1, citizen_initiative: 0, phased_approach: 1 }
    },
    q5: { // council appetite
      council_high:    { council_ordinance: 4, charter_amendment: 2, council_referred_ballot: 3, citizen_initiative: -2, phased_approach: 3 },
      council_mid:     { council_ordinance: 2, charter_amendment: 1, council_referred_ballot: 3, citizen_initiative: 1, phased_approach: 3 },
      council_low:     { council_ordinance: -3, charter_amendment: 0, council_referred_ballot: 0, citizen_initiative: 4, phased_approach: 0 },
      council_unknown: { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 }
    },
    q6: { // ballot capacity
      ballot_high:    { council_ordinance: 0, charter_amendment: 2, council_referred_ballot: 3, citizen_initiative: 3, phased_approach: 2 },
      ballot_mid:     { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 2, citizen_initiative: 1, phased_approach: 2 },
      ballot_low:     { council_ordinance: 3, charter_amendment: -2, council_referred_ballot: -1, citizen_initiative: -3, phased_approach: 2 },
      ballot_proven:  { council_ordinance: 1, charter_amendment: 2, council_referred_ballot: 4, citizen_initiative: 2, phased_approach: 2 },
      ballot_unknown: { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 2 }
    },
    q7: { // revenue scale
      modest:        { council_ordinance: 3, charter_amendment: 0, council_referred_ballot: 1, citizen_initiative: 0, phased_approach: 2 },
      substantial:   { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 3, citizen_initiative: 2, phased_approach: 2 },
      very_high:     { council_ordinance: 0, charter_amendment: 2, council_referred_ballot: 3, citizen_initiative: 3, phased_approach: 1 },
      scale_unknown: { council_ordinance: 1, charter_amendment: 1, council_referred_ballot: 1, citizen_initiative: 1, phased_approach: 3 }
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // SCORE COMPUTATION
  // ══════════════════════════════════════════════════════════════════════════
  const computeModelScores = () => {
    const totals = {};
    Object.keys(models).forEach(k => { totals[k] = 0; });
    Object.entries(answers).forEach(([qid, optId]) => {
      const c = MODEL_SCORES[qid] && MODEL_SCORES[qid][optId];
      if (!c) return;
      Object.entries(c).forEach(([k, v]) => { totals[k] += v; });
    });
    return totals;
  };

  const computePathwayScores = () => {
    const totals = {};
    Object.keys(pathways).forEach(k => { totals[k] = 0; });
    Object.entries(answers).forEach(([qid, optId]) => {
      const c = PATHWAY_SCORES[qid] && PATHWAY_SCORES[qid][optId];
      if (!c) return;
      Object.entries(c).forEach(([k, v]) => { totals[k] += v; });
    });
    return totals;
  };

  const bestPathwayForModel = (modelKey, pathwayScores) => {
    const viable = legallyViable(modelKey, answers.q2, answers.q1);
    if (viable.length === 0) return null;
    return viable
      .map(p => ({ key: p, score: pathwayScores[p] || 0 }))
      .sort((a, b) => b.score - a.score)[0];
  };

  // ══════════════════════════════════════════════════════════════════════════
  // TIER COMPUTATION
  // ══════════════════════════════════════════════════════════════════════════
  const computeTiers = (modelScoresSorted) => {
    const top = modelScoresSorted[0].score;
    const blocked = [];
    const strong = [];
    const possible = [];
    const poor = [];

    modelScoresSorted.forEach(m => {
      const viable = legallyViable(m.key, answers.q2, answers.q1);
      if (viable.length === 0) {
        blocked.push(m);
      } else if (m.score >= top - 3) {
        strong.push(m);
      } else if (m.score >= top - 7) {
        possible.push(m);
      } else {
        poor.push(m);
      }
    });
    return { strong, possible, poor, blocked };
  };

  // ══════════════════════════════════════════════════════════════════════════
  // OVERLAY SUGGESTIONS — grants and bonds that layer on top
  // ══════════════════════════════════════════════════════════════════════════
  const suggestOverlays = (topModelKey) => {
    const suggested = [];
    Object.entries(overlays).forEach(([key, overlay]) => {
      let score = 0;
      if (overlay.bestWith.includes(topModelKey)) score += 2;
      if (overlay.bestFor.includes(answers.q3)) score += 1;
      if (overlay.bestFor.includes(answers.q4)) score += 1;
      if (overlay.bestFor.includes(answers.q7)) score += 1;
      if (score > 0) suggested.push({ key, ...overlay, score });
    });
    return suggested.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // UNCERTAINTY FLAGS — what answers couldn't be determined
  // ══════════════════════════════════════════════════════════════════════════
  const uncertaintyFlags = () => {
    const flags = [];
    if (answers.q1 === "unclear_q1") flags.push({ q: "Current liability framework", action: "Verify with municipal counsel whether sidewalk responsibility is in your charter, ordinance, or operational practice. This determines whether reform requires charter amendment vs. ordinance vs. policy change." });
    if (answers.q2 === "unsure_q2") flags.push({ q: "State revenue framework", action: "Engage municipal counsel to identify state-level tax-vote requirements and the legal classification of fees vs. taxes in your jurisdiction." });
    if (answers.q3 === "no_inventory") flags.push({ q: "Network inventory", action: "Commission a citywide sidewalk inventory before scoping the program. Without one, downstream decisions are calibrated to guesses." });
    if (answers.q4 === "spatial_unknown") flags.push({ q: "Spatial pattern", action: "Map sidewalk conditions against demographic and historical data (HOLC, development era, income). The geography of need shapes both mechanism and sequencing." });
    if (answers.q5 === "council_unknown") flags.push({ q: "Council appetite", action: "Test council appetite through a targeted briefing with key members before committing to a pathway." });
    if (answers.q6 === "ballot_unknown") flags.push({ q: "Voter capacity", action: "Commission polling or convene advocacy partners to assess voter sentiment and campaign infrastructure realistically." });
    if (answers.q7 === "scale_unknown") flags.push({ q: "Revenue scale", action: "Develop a needs-assessment that translates network condition into annual revenue requirements before designing a mechanism." });
    if (answers.q8 === "delivery_unknown") flags.push({ q: "Delivery capacity", action: "Audit current sidewalk delivery (in-house staff, contractor pipeline, inspection cycle) before scaling up." });
    return flags;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // CONSIDERATIONS — gap/repair consolidation, equity, etc.
  // ══════════════════════════════════════════════════════════════════════════
  const considerations = () => {
    const items = [];

    // Gap/repair consolidation
    if (answers.q3 === "both") {
      items.push({
        title: "Consolidate gap and repair programs",
        body: "If your city currently runs separate gap-closure and repair programs, the recommended approach assumes consolidation. Running them under different mechanisms creates administrative overhead and erodes the cost-distribution logic. Treat new construction and maintenance as one funded responsibility."
      });
    }

    // Equity overlay based on spatial pattern
    if (answers.q4 === "redlined_central") {
      items.push({
        title: "Equity is foundational here",
        body: "Sequence repairs from highest-need neighborhoods first and embed a low-income rebate program in the fee structure regardless of which model you adopt. Document the historical disinvestment pattern explicitly in the policy rationale — it strengthens both the legal case and public communication. Repairing redlined cores first does not automatically protect low-income owners from regressive charges; those need parallel design."
      });
    } else if (answers.q4 === "periphery") {
      items.push({
        title: "Peripheral retrofits have a different cost curve",
        body: "Car-era peripheral retrofits are often more expensive per linear foot due to drainage and curb-and-gutter requirements. Frontage-based fees will charge peripheral lots more because they have longer frontages — model the distributional impact before finalizing rate structure. Seattle's walkway program offers an interim model for the highest-cost areas."
      });
    } else if (answers.q4 === "dispersed_equity") {
      items.push({
        title: "Equity through structure, not geography",
        body: "With dispersed gaps, equity is best embedded in fee structure rather than geographic targeting. Income rebates, frontage scaling, and tiered property-class rates are your main tools. Verify whether renter populations are being indirectly charged through pass-through — the visible payer often differs from the actual burden-bearer."
      });
    } else if (answers.q4 === "corridors_use") {
      items.push({
        title: "Corridor prioritization can be equity-aligned or equity-blind",
        body: "Use-based prioritization (schools, transit, commercial) can serve equity or work against it depending on which corridors are selected. Audit your corridor list against demographic data before committing. Improvement-district structures map well to corridor prioritization if the political environment supports differentiated assessments."
      });
    }

    // Charter amendment heads-up
    if (answers.q1 === "charter_codified") {
      items.push({
        title: "Charter codification raises the procedural bar",
        body: "If sidewalk responsibility is codified in your city charter, any model that replaces private liability will likely require a charter amendment in addition to a funding mechanism. Charter amendments are nearly always voter-approved and politically heavier than ordinance changes. Plan for a two-part legal package."
      });
    }

    return items;
  };

  // ══════════════════════════════════════════════════════════════════════════
  // NEXT STEPS — combinatorial based on answers + top recommendation
  // ══════════════════════════════════════════════════════════════════════════
  const nextSteps = (topModelKey, topPathwayKey) => {
    const steps = [];

    if (answers.q1 === "charter_codified" && ["public_ownership", "utility_fee", "dedicated_fee", "millage", "parcel_tax", "general_levy"].includes(topModelKey)) {
      steps.push("Draft the charter amendment language and the funding mechanism in parallel. They will move together politically and legally; designing one without the other creates implementation gaps.");
    }
    if (answers.q2 === "tabor" && (topModelKey === "utility_fee" || topModelKey === "dedicated_fee")) {
      steps.push("Engage a TABOR-experienced attorney early to structure the mechanism as a service fee rather than a tax. The fee-vs-tax classification determines whether council can adopt by ordinance or whether voter approval is required.");
    }
    if (answers.q2 === "prop13" && topModelKey === "parcel_tax") {
      steps.push("Confirm the simple-majority vs. supermajority threshold for your specific parcel tax structure. Prop 218 distinctions between general and special taxes matter, and recent court decisions have narrowed some pathways.");
    }
    if (topPathwayKey === "citizen_initiative") {
      steps.push("Begin coalition-building immediately. Successful citizen initiatives are products of sustained organizing across disability rights, pedestrian safety, and neighborhood groups — not single campaign cycles.");
    } else if (topPathwayKey === "council_referred_ballot") {
      steps.push("Build the council-to-ballot bridge deliberately. The council vote to refer is its own political moment requiring different organizing than the voter-approval campaign that follows.");
    } else if (topPathwayKey === "council_ordinance") {
      steps.push("Draft ordinance language alongside a phased implementation plan. Council pathways move faster, but front-loading operational details prevents post-passage stalls.");
    } else if (topPathwayKey === "charter_amendment") {
      steps.push("Treat the charter amendment as the political headline, not the funding mechanism. Voters respond to the substantive change in responsibility; the financing follows.");
    } else if (topPathwayKey === "phased_approach") {
      steps.push("Design the pilot to produce measurable, communicable results within 18 months. A pilot without visible outcomes can't carry a second-stage ballot campaign.");
    }
    if (topModelKey === "improvement_district") {
      steps.push("Define district boundaries before designing the fee structure. Boundaries determine who pays for what; getting them wrong embeds inequities the funding mechanism can't correct.");
    }
    if (topModelKey === "inspection_bill") {
      steps.push("Audit inspection capacity and assessment-billing infrastructure. The model only works if the city can run a rotating cycle that meaningfully covers the network within a defined timeframe.");
    }
    if (answers.q8 === "limited") {
      steps.push("Plan delivery as carefully as funding. A passed measure with no contractor pipeline produces visible failure within the first program cycle.");
    }
    if (answers.q4 === "redlined_central" && !steps.some(s => s.includes("rebate"))) {
      steps.push("Design the rebate program in parallel with the fee structure. Charging equitably while building inequitably (or vice versa) creates a credibility problem that's hard to recover from.");
    }
    return steps.slice(0, 5);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // HANDLERS
  // ══════════════════════════════════════════════════════════════════════════
  const answer = (qid, val) => {
    const next = { ...answers, [qid]: val };
    setAnswers(next);
    if (Object.keys(next).length === questions.length) {
      setTimeout(() => setRevealed(true), 250);
    }
  };
  const goBackTo = (qid) => {
    const idx = questions.findIndex(q => q.id === qid);
    if (idx < 0) return;
    const trimmed = {};
    for (let i = 0; i < idx; i++) {
      const key = questions[i].id;
      if (answers[key]) trimmed[key] = answers[key];
    }
    setAnswers(trimmed);
    setRevealed(false);
  };
  const reset = () => { setAnswers({}); setRevealed(false); };
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" }); };

  const currentQId = !revealed ? (questions.find(q => !answers[q.id])?.id || null) : null;
  const completedCount = Object.keys(answers).length;
  const progressPct = (completedCount / questions.length) * 100;

  // ══════════════════════════════════════════════════════════════════════════
  // RESULT COMPUTATION
  // ══════════════════════════════════════════════════════════════════════════
  let tiers = null;
  let modelScoresSorted = [];
  let pathwayScoresSorted = [];
  let strongPaired = [];
  let suggestedOverlays = [];
  let flags = [];
  let conSet = [];
  let steps = [];

  if (revealed) {
    const modelScores = computeModelScores();
    const pathwayScores = computePathwayScores();

    modelScoresSorted = Object.entries(modelScores)
      .map(([k, v]) => ({ key: k, score: v, ...models[k] }))
      .sort((a, b) => b.score - a.score);

    pathwayScoresSorted = Object.entries(pathwayScores)
      .map(([k, v]) => ({ key: k, score: v, ...pathways[k] }))
      .sort((a, b) => b.score - a.score);

    tiers = computeTiers(modelScoresSorted);

    // Pair each strong-tier model with its best legally-viable pathway
    strongPaired = tiers.strong.map(m => ({
      model: m,
      pathway: bestPathwayForModel(m.key, pathwayScores)
    }));

    const topModelKey = tiers.strong[0]?.key || modelScoresSorted[0].key;
    const topPathwayKey = strongPaired[0]?.pathway?.key;
    suggestedOverlays = suggestOverlays(topModelKey);
    flags = uncertaintyFlags();
    conSet = considerations();
    steps = nextSteps(topModelKey, topPathwayKey);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return React.createElement("section", {
    id: "s12",
    style: { background: "#fff", padding: isMobile ? "60px 20px" : "80px 48px" }
  },
    React.createElement("div", { style: { maxWidth: 1080, margin: "0 auto" } },

      // ── Header ──────────────────────────────────────────────────────────
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } },
        "Act IV — A Pathway For Your City"
      ),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px", lineHeight: 1.2 } },
        "Diagnose Your Starting Point"
      ),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 760, marginBottom: 12 } },
        "A planner-focused diagnostic. Eight questions cover the legal, physical, political, fiscal, and operational dimensions. Models are scored against your context; authorization pathways are evaluated separately and paired with the strongest-fitting models."
      ),

      // ── General disclaimer ──────────────────────────────────────────────
      React.createElement("div", {
        style: {
          padding: "14px 20px",
          background: "rgba(216,154,78,0.08)",
          border: "1px solid rgba(216,154,78,0.3)",
          borderRadius: 8,
          marginBottom: 40,
          fontSize: 13,
          color: "#5C4A28",
          lineHeight: 1.6
        }
      },
        React.createElement("strong", null, "This tool is for educational and exploratory use. "),
        "Every recommendation it produces requires verification by municipal counsel, a financial advisor familiar with local revenue mechanisms, and engagement with your specific charter, state statutes, and political context. Outputs are starting points for further investigation — not implementation guidance."
      ),

      // ── Progress bar ─────────────────────────────────────────────────────
      !revealed && React.createElement("div", { style: { marginBottom: 36 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: 8 } },
          React.createElement("div", { style: { fontSize: 12, color: muted, fontWeight: 600, letterSpacing: "0.04em" } },
            `Question ${Math.min(completedCount + 1, questions.length)} of ${questions.length}`
          ),
          React.createElement("div", { style: { fontSize: 12, color: muted, fontWeight: 600 } },
            `${Math.round(progressPct)}% complete`
          )
        ),
        React.createElement("div", { style: { height: 4, background: "rgba(27,58,75,0.08)", borderRadius: 2, overflow: "hidden" } },
          React.createElement("div", {
            style: { height: "100%", width: `${progressPct}%`, background: rust, transition: "width 0.4s ease" }
          })
        ),
        React.createElement("div", {
          style: { display: "flex", justifyContent: "space-between", marginTop: 14, gap: 4 }
        },
          questions.map(q => {
            const done = !!answers[q.id];
            const active = currentQId === q.id;
            return React.createElement("button", {
              key: q.id,
              onClick: () => done && goBackTo(q.id),
              style: {
                flex: 1, textAlign: "center", background: "transparent",
                border: "none", padding: 0,
                cursor: done ? "pointer" : "default",
                fontFamily: "inherit"
              },
              title: done ? "Click to edit this answer" : ""
            },
              React.createElement("div", {
                style: {
                  width: 22, height: 22, borderRadius: "50%",
                  background: done ? green : active ? navy : "rgba(27,58,75,0.1)",
                  color: done || active ? "#fff" : "#aaa",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, marginBottom: 6, transition: "all 0.2s"
                }
              }, done ? "✓" : q.id.replace("q", "")),
              React.createElement("div", {
                style: { fontSize: 10, color: done ? green : active ? navy : "#aaa", fontWeight: done || active ? 600 : 400, letterSpacing: "0.02em", lineHeight: 1.3 }
              }, q.label)
            );
          })
        )
      ),

      // ── Questions ────────────────────────────────────────────────────────
      !revealed && questions.map(q => {
        const isActive = currentQId === q.id;
        const answered = !!answers[q.id];
        if (!isActive && !answered) return null;

        return React.createElement("div", {
          key: q.id,
          style: {
            marginBottom: 24, padding: isMobile ? "20px 16px" : "28px 32px",
            background: isActive ? bone : "#F7F9F7",
            borderRadius: 10,
            border: isActive ? `2px solid ${navy}` : `1.5px solid ${green}33`,
            transition: "all 0.2s"
          }
        },
          React.createElement("div", { style: { display: "flex", alignItems: "flex-start", gap: 16, marginBottom: isActive ? 14 : 0 } },
            React.createElement("div", {
              style: {
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: answered ? green : navy, color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700
              }
            }, answered ? "✓" : q.id.replace("q", "")),
            React.createElement("div", { style: { flex: 1 } },
              React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 4 } }, q.label),
              React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: navy, marginBottom: 6, lineHeight: 1.35 } }, q.text),
              isActive && React.createElement("div", { style: { fontSize: 13.5, color: "#666", lineHeight: 1.6 } }, q.subtitle)
            )
          ),
          answered && !isActive && React.createElement("div", {
            style: { paddingLeft: 48, marginTop: 8, fontSize: 13, color: green, fontWeight: 600 }
          },
            "→ " + q.options.find(o => o.id === answers[q.id])?.label
          ),
          isActive && React.createElement("div", {
            style: { display: "flex", flexDirection: "column", gap: 10, paddingLeft: 48, marginTop: 16 }
          },
            q.options.map(opt =>
              React.createElement("button", {
                key: opt.id,
                onClick: () => answer(q.id, opt.id),
                style: {
                  display: "flex", alignItems: "flex-start", gap: 14,
                  padding: "14px 18px", borderRadius: 8,
                  border: `1.5px solid rgba(27,58,75,0.15)`,
                  background: "#fff", cursor: "pointer",
                  fontFamily: "inherit", textAlign: "left",
                  transition: "all 0.15s"
                },
                onMouseEnter: e => {
                  e.currentTarget.style.borderColor = navy;
                  e.currentTarget.style.background = "rgba(27,58,75,0.03)";
                  e.currentTarget.style.transform = "translateX(2px)";
                },
                onMouseLeave: e => {
                  e.currentTarget.style.borderColor = "rgba(27,58,75,0.15)";
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              },
                React.createElement("span", { style: { fontSize: 20, flexShrink: 0, lineHeight: 1.4 } }, opt.icon),
                React.createElement("span", { style: { fontSize: 14, color: navy, fontWeight: 500, lineHeight: 1.5 } }, opt.label)
              )
            )
          )
        );
      }),

      // ══════════════════════════════════════════════════════════════════════
      // RESULT PANEL — TIERED
      // ══════════════════════════════════════════════════════════════════════
      revealed && tiers && React.createElement("div", null,

        // ── Header bar with reset
        React.createElement("div", {
          style: {
            padding: "18px 24px", background: navy, color: "#fff",
            borderRadius: "10px 10px 0 0",
            display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12
          }
        },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.7, fontWeight: 700, marginBottom: 4 } },
              "Diagnostic results"
            ),
            React.createElement("div", { style: { fontSize: 18, fontWeight: 700 } },
              tiers.strong.length === 0
                ? "No strong fit — see possible options below"
                : tiers.strong.length === 1
                ? `${tiers.strong[0].name} is the strongest fit`
                : `${tiers.strong.length} models fit your context strongly`
            )
          ),
          React.createElement("button", {
            onClick: reset,
            style: {
              padding: "8px 16px", background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)", color: "#fff",
              borderRadius: 6, fontSize: 12, fontWeight: 600,
              cursor: "pointer", fontFamily: "inherit"
            }
          }, "↺ Start over")
        ),

        // ── STRONG FIT TIER ─────────────────────────────────────────────────
        React.createElement("div", {
          style: { background: "#fff", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "28px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: green, fontWeight: 700, marginBottom: 16 } },
            "Strong fit — within scoring threshold of the top option"
          ),
          tiers.strong.length === 0 && React.createElement("p", { style: { fontSize: 14, color: muted, fontStyle: "italic" } },
            "No models scored within the strong-fit range. This often means your answers describe an ambiguous or contested context. Check the 'Possible fits' below and the uncertainty flags."
          ),
          strongPaired.map((pair, i) =>
            React.createElement("div", {
              key: pair.model.key,
              style: {
                marginBottom: i < strongPaired.length - 1 ? 24 : 0,
                padding: "20px 24px",
                background: `${pair.model.color}08`,
                borderLeft: `4px solid ${pair.model.color}`,
                borderRadius: "0 8px 8px 0"
              }
            },
              React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 } },
                React.createElement("h3", { style: { fontSize: 22, fontWeight: 800, color: navy, margin: 0 } }, pair.model.name),
                pair.pathway && React.createElement("div", { style: { fontSize: 13, color: muted } },
                  React.createElement("strong", { style: { color: pair.model.color, fontWeight: 600 } }, pair.pathway.icon, " ", pathways[pair.pathway.key].name),
                  " · ", pathways[pair.pathway.key].timeline
                )
              ),
              React.createElement("p", { style: { fontSize: 14, color: "#333", lineHeight: 1.65, margin: "0 0 12px" } }, pair.model.summary),
              React.createElement("div", { style: { fontSize: 13, color: "#555", lineHeight: 1.6 } },
                React.createElement("strong", { style: { color: green } }, "Why this fits: "),
                pair.model.fits
              )
            )
          )
        ),

        // ── COMPARISON MATRIX ───────────────────────────────────────────────
        (tiers.strong.length + tiers.possible.length) > 0 && React.createElement("div", {
          style: { background: "#fff", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "8px 32px 28px" }
        },
          React.createElement("div", {
            style: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0 14px", cursor: "pointer" },
            onClick: () => setShowMatrix(!showMatrix)
          },
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: navy, fontWeight: 700 } },
              "Side-by-side comparison · Strong + possible fits"
            ),
            React.createElement("div", { style: { fontSize: 12, color: muted } },
              showMatrix ? "Hide ↑" : "Show ↓"
            )
          ),
          showMatrix && React.createElement("div", { style: { overflowX: "auto", marginTop: 4 } },
            React.createElement("table", {
              style: {
                width: "100%", borderCollapse: "collapse", fontSize: 12,
                minWidth: 720
              }
            },
              React.createElement("thead", null,
                React.createElement("tr", { style: { borderBottom: `2px solid ${navy}` } },
                  ["Model", "Liability", "Revenue scale", "Time to revenue", "Cost distribution", "Equity scaling", "Renewal", "Best pathway"].map(h =>
                    React.createElement("th", {
                      key: h,
                      style: { padding: "10px 8px", textAlign: "left", fontSize: 10, color: navy, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }
                    }, h)
                  )
                )
              ),
              React.createElement("tbody", null,
                [...tiers.strong, ...tiers.possible].map((m, i) => {
                  const path = bestPathwayForModel(m.key, computePathwayScores());
                  const isStrong = tiers.strong.some(s => s.key === m.key);
                  return React.createElement("tr", {
                    key: m.key,
                    style: {
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                      background: isStrong ? "transparent" : "rgba(0,0,0,0.015)"
                    }
                  },
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top" } },
                      React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                        React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: m.color, flexShrink: 0 } }),
                        React.createElement("div", null,
                          React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy } }, m.short),
                          React.createElement("div", { style: { fontSize: 10, color: isStrong ? green : muted, fontWeight: 600, letterSpacing: "0.04em", marginTop: 1 } },
                            isStrong ? "STRONG FIT" : "POSSIBLE"
                          )
                        )
                      )
                    ),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } },
                      React.createElement("span", { style: { marginRight: 4 } }, m.liabilityIcon),
                      m.liabilityFrame.split("—")[0].trim()
                    ),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.revenueScaleShort),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.timeShort),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.costShort),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.equityShort),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.renewalShort),
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } },
                      path ? React.createElement("div", null,
                        React.createElement("div", { style: { fontWeight: 600 } }, pathways[path.key].icon, " ", pathways[path.key].short),
                        React.createElement("div", { style: { fontSize: 10.5, color: muted, marginTop: 1 } }, pathways[path.key].timeline)
                      ) : React.createElement("div", { style: { color: rust, fontStyle: "italic" } }, "No viable pathway")
                    )
                  );
                })
              )
            )
          )
        ),

        // ── POSSIBLE TIER (compact) ────────────────────────────────────────
        tiers.possible.length > 0 && React.createElement("div", {
          style: { background: "#FAFAF7", borderLeft: "1px solid rgba(27,58,75,0.15)", borderRight: "1px solid rgba(27,58,75,0.15)", padding: "20px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: amber, fontWeight: 700, marginBottom: 12 } },
            "Possible fit — meaningful trade-offs but within consideration"
          ),
          tiers.possible.map((m, i) =>
            React.createElement("div", {
              key: m.key,
              style: { marginBottom: i < tiers.possible.length - 1 ? 12 : 0, paddingLeft: 12, borderLeft: `2px solid ${m.color}55` }
            },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 3 } }, m.name),
              React.createElement("p", { style: { fontSize: 13, color: "#555", lineHeight: 1.55, margin: 0 } }, m.summary)
            )
          )
        ),

        // ── FUNDING OVERLAYS ────────────────────────────────────────────────
        suggestedOverlays.length > 0 && React.createElement("div", {
          style: { background: "#fff", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 6 } },
            "Funding stack — overlays for any base model"
          ),
          React.createElement("p", { style: { fontSize: 13, color: muted, lineHeight: 1.55, margin: "0 0 16px" } },
            "Bonds and grants layer on top of any base mechanism. They don't replace the model — they extend its reach. Most reform efforts use a stack rather than a single source."
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 } },
            suggestedOverlays.map(o =>
              React.createElement("div", {
                key: o.key,
                style: { padding: "14px 18px", background: bone, borderRadius: 8 }
              },
                React.createElement("div", { style: { fontSize: 9.5, color: rust, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 } }, o.type),
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 5 } }, o.name),
                React.createElement("div", { style: { fontSize: 12, color: "#444", fontWeight: 600, marginBottom: 6 } }, o.useFor),
                React.createElement("p", { style: { fontSize: 12, color: "#555", lineHeight: 1.55, margin: 0 } }, o.detail)
              )
            )
          )
        ),

        // ── CONSIDERATIONS ──────────────────────────────────────────────────
        conSet.length > 0 && React.createElement("div", {
          style: { background: "rgba(216,154,78,0.06)", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#A6772E", fontWeight: 700, marginBottom: 14 } },
            "Considerations for your context"
          ),
          conSet.map((c, i) =>
            React.createElement("div", { key: i, style: { marginBottom: i < conSet.length - 1 ? 14 : 0 } },
              React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 4 } }, c.title),
              React.createElement("p", { style: { fontSize: 13, color: "#444", lineHeight: 1.65, margin: 0 } }, c.body)
            )
          )
        ),

        // ── UNCERTAINTY FLAGS ───────────────────────────────────────────────
        flags.length > 0 && React.createElement("div", {
          style: { background: "rgba(178,84,44,0.05)", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 6 } },
            "What couldn't be determined — research priorities"
          ),
          React.createElement("p", { style: { fontSize: 12.5, color: muted, lineHeight: 1.55, margin: "0 0 14px", fontStyle: "italic" } },
            "These dimensions were marked as unknown. Resolving them sharpens the recommendation meaningfully."
          ),
          flags.map((f, i) =>
            React.createElement("div", {
              key: i,
              style: { marginBottom: i < flags.length - 1 ? 12 : 0, display: "flex", gap: 14, alignItems: "baseline" }
            },
              React.createElement("div", { style: { minWidth: 160, fontSize: 12.5, color: navy, fontWeight: 700 } }, f.q),
              React.createElement("p", { style: { fontSize: 13, color: "#444", lineHeight: 1.6, margin: 0, flex: 1 } }, f.action)
            )
          )
        ),

        // ── CONTRAINDICATED ─────────────────────────────────────────────────
        (tiers.blocked.length + tiers.poor.length) > 0 && React.createElement("div", {
          style: { background: "#FAFAF7", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: muted, fontWeight: 700, marginBottom: 14 } },
            "Models contraindicated by your context"
          ),
          tiers.blocked.map(m =>
            React.createElement("div", {
              key: m.key,
              style: { marginBottom: 10, display: "flex", gap: 14, alignItems: "baseline" }
            },
              React.createElement("div", { style: { minWidth: 180 } },
                React.createElement("div", { style: { fontSize: 13, color: navy, fontWeight: 700 } }, m.name),
                React.createElement("div", { style: { fontSize: 10, color: rust, fontWeight: 700, letterSpacing: "0.06em", marginTop: 2 } },
                  "LEGALLY BLOCKED"
                )
              ),
              React.createElement("p", { style: { fontSize: 12.5, color: "#666", lineHeight: 1.55, margin: 0, flex: 1 } },
                "Your state legal framework makes this mechanism non-viable without significant legal restructuring."
              )
            )
          ),
          tiers.poor.slice(0, 3).map(m =>
            React.createElement("div", {
              key: m.key,
              style: { marginBottom: 10, display: "flex", gap: 14, alignItems: "baseline" }
            },
              React.createElement("div", { style: { minWidth: 180, fontSize: 13, color: navy, fontWeight: 700 } }, m.name),
              React.createElement("p", { style: { fontSize: 12.5, color: "#666", lineHeight: 1.55, margin: 0, flex: 1 } }, m.avoidWhen)
            )
          )
        ),

        // ── NEXT STEPS ──────────────────────────────────────────────────────
        steps.length > 0 && React.createElement("div", {
          style: { background: bone, border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: navy, fontWeight: 700, marginBottom: 14 } },
            "What to do next"
          ),
          steps.map((step, i) =>
            React.createElement("div", {
              key: i,
              style: { display: "flex", gap: 14, marginBottom: i < steps.length - 1 ? 12 : 0 }
            },
              React.createElement("div", {
                style: {
                  width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                  background: navy, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700
                }
              }, i + 1),
              React.createElement("p", { style: { fontSize: 13.5, color: "#333", lineHeight: 1.65, margin: 0 } }, step)
            )
          )
        ),

        // ── FULL SCORING (collapsible) ─────────────────────────────────────
        React.createElement("div", {
          style: { background: "#fff", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", borderRadius: "0 0 10px 10px", padding: "16px 32px 24px" }
        },
          React.createElement("details", null,
            React.createElement("summary", {
              style: { fontSize: 11, color: muted, fontWeight: 600, cursor: "pointer", padding: "6px 0", letterSpacing: "0.06em", textTransform: "uppercase" }
            }, "Show full scoring →"),
            React.createElement("div", { style: { marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 } },
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: navy, marginBottom: 10, letterSpacing: "0.05em" } }, "MODEL FIT"),
                modelScoresSorted.map((p, i) =>
                  React.createElement("div", {
                    key: p.key,
                    style: {
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "7px 0",
                      borderBottom: i < modelScoresSorted.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                    }
                  },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: navy, fontWeight: i === 0 ? 700 : 500 } },
                      React.createElement("div", { style: { width: 7, height: 7, borderRadius: "50%", background: p.color } }),
                      p.short
                    ),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                      React.createElement("div", { style: { width: 60, height: 5, background: "rgba(0,0,0,0.06)", borderRadius: 3, overflow: "hidden" } },
                        React.createElement("div", {
                          style: {
                            height: "100%",
                            width: `${Math.max(0, Math.min(100, (p.score / Math.max(1, modelScoresSorted[0].score)) * 100))}%`,
                            background: p.color
                          }
                        })
                      ),
                      React.createElement("span", { style: { fontSize: 11, color: muted, fontWeight: 600, minWidth: 22, textAlign: "right" } }, p.score > 0 ? `+${p.score}` : p.score)
                    )
                  )
                )
              ),
              React.createElement("div", null,
                React.createElement("div", { style: { fontSize: 11, fontWeight: 700, color: navy, marginBottom: 10, letterSpacing: "0.05em" } }, "PATHWAY FIT"),
                pathwayScoresSorted.map((p, i) =>
                  React.createElement("div", {
                    key: p.key,
                    style: {
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "7px 0",
                      borderBottom: i < pathwayScoresSorted.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none"
                    }
                  },
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: navy, fontWeight: i === 0 ? 700 : 500 } },
                      React.createElement("span", null, p.icon),
                      p.short
                    ),
                    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
                      React.createElement("div", { style: { width: 60, height: 5, background: "rgba(0,0,0,0.06)", borderRadius: 3, overflow: "hidden" } },
                        React.createElement("div", {
                          style: {
                            height: "100%",
                            width: `${Math.max(0, Math.min(100, (p.score / Math.max(1, pathwayScoresSorted[0].score)) * 100))}%`,
                            background: navy
                          }
                        })
                      ),
                      React.createElement("span", { style: { fontSize: 11, color: muted, fontWeight: 600, minWidth: 22, textAlign: "right" } }, p.score > 0 ? `+${p.score}` : p.score)
                    )
                  )
                )
              )
            )
          )
        )
      ),

      // ── Closing ──────────────────────────────────────────────────────────
      React.createElement("div", {
        style: {
          marginTop: 48, padding: "24px 28px", background: bone,
          borderLeft: `4px solid ${rust}`, borderRadius: "0 8px 8px 0"
        }
      },
        React.createElement("p", { style: { margin: 0, fontSize: 15, color: "#333", lineHeight: 1.7, fontStyle: "italic" } },
          "Reform requires recognition, diagnosis, and the political will to get it done. This diagnostic is a starting point — not a substitute for the legal review, fiscal analysis, and coalition work each combination demands."
        )
      )
    )
  );
}

function S13Credits({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  return React.createElement("section", {
    id: "s13",
    style: { background: navy, padding: isMobile ? "60px 20px" : "80px 48px", color: "#EDE6DA" }
  },
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act IV — Resources & Credits"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: "#EDE6DA", margin: "0 0 32px" } }, "The Full Report & Credits"),

      React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 40 } },
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
            { label: "Authors", body: "Robert Sells and Taylor Lucas, MURP candidates, University of Colorado Denver College of Architecture and Planning" },
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

