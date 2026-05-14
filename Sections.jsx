
// Sections 1–5: Cover, About, Network, Era, Equity
// Real map images wired in; city toggles on S3, S4, S5; nav tile fix

// Reusable image map panel
function MapImage({ src, alt, caption, source, fit = "contain" }) {
  const navy = "#1B3A4B";
  return React.createElement("div", {
    style: { width: "100%", height: "100%", position: "relative", background: "#E8E2D8", display: "flex", flexDirection: "column" }
  },
    React.createElement("img", {
      src, alt,
      style: { width: "100%", height: "100%", flex: 1, objectFit: fit, objectPosition: "center", display: "block", background: "#D9D2C5" }
    }),
    (caption || source) && React.createElement("div", {
      style: {
        background: "rgba(27,58,75,0.88)", color: "#EDE6DA",
        padding: "10px 14px", fontSize: 12.5, lineHeight: 1.55,
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
          padding: "7px 16px", borderRadius: 4, border: "none",
          background: active === i ? rust : "transparent",
          color: "#EDE6DA", fontSize: 13.5, fontWeight: active === i ? 700 : 500,
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
      height: "calc(100dvh - 55px)", background: navy,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", textAlign: "center",
      padding: "40px 40px 80px"
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
      width: isMobile ? 72 : 112, height: isMobile ? 72 : 112, viewBox: "0 0 64 64",
      style: { marginBottom: isMobile ? 18 : 24, opacity: 0.95 }
    },
      React.createElement("rect", { x: 4, y: 28, width: 24, height: 8, rx: 1, fill: "#B6BFB1", opacity: 0.8 }),
      React.createElement("rect", { x: 32, y: 30, width: 28, height: 8, rx: 1, fill: "#B2542C" }),
      React.createElement("rect", { x: 4, y: 40, width: 56, height: 2, rx: 1, fill: "rgba(255,255,255,0.2)" }),
      React.createElement("path", { d: "M28 27 L31 36 L26 33 L29 42", stroke: "#D89A4E", strokeWidth: 2.5, fill: "none", strokeLinecap: "round" })
    ),
    React.createElement("div", {
      style: {
        fontSize: isMobile ? "clamp(22px, 6vw, 30px)" : "clamp(34px, 3vw, 48px)",
        letterSpacing: "0.22em",
        color: rust,
        fontWeight: 800,
        textTransform: "uppercase",
        marginBottom: isMobile ? 14 : 22
      }
    }, "Mind the Gap"),
    React.createElement("h1", {
      style: {
        fontSize: isMobile ? "clamp(36px, 10vw, 54px)" : "clamp(40px, 4.7vw, 68px)",
        fontWeight: 900,
        color: "#EDE6DA",
        lineHeight: 1.1,
        margin: "0 0 28px",
        maxWidth: 860
      }
    }, "Lessons from Denver to Rebuild Your Sidewalk Network"),
    React.createElement("p", {
      style: { fontSize: isMobile ? 16 : 20, color: "rgba(237,230,218,0.8)", maxWidth: 560, lineHeight: 1.7, marginBottom: 0 }
    },
      React.createElement("span", null, "Robert Sells & Taylor Lucas · MURP Capstone"),
      React.createElement("br", null),
      React.createElement("span", null, "University of Colorado Denver · In partnership with Fehr & Peers")
    ),
    React.createElement("div", {
      style: { position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)", color: "rgba(237,230,218,0.65)", fontSize: 14, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, whiteSpace: "nowrap" }
    }, "Scroll to Begin ↓")
  );
}

function S2About({ tweaks, isMobile }) {
  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  const scrollToModels = () => {
    const el = document.getElementById("s11");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  return React.createElement("section", {
    id: "s2",
    style: { background: bone, padding: isMobile ? "60px 20px" : "80px 48px" }
  },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto" } },
      React.createElement("div", { style: { maxWidth: 680 } },
        React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "About This Guide"),
        React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 20px", lineHeight: 1.2 } }, "About This Guide"),
        React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, marginBottom: 14 } },
          "Incomplete networks. Code non-compliance. Deferred maintenance. These are all well known issues that sidewalk networks across the nation face. As walkable and safe pedestrian networks have returned to the forefront of planners minds, reforming the governance structure of these networks has become vital."
        ),
        React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, marginBottom: 20 } },
          "Denver's two-decade reform effort is the most fully documented case of a major city escaping that system. This Story Map walks through the analysis — what made Denver's network look the way it does, what the city tried, what failed, and what finally worked."
        ),
        React.createElement("div", { style: { textAlign: "right" } },
          React.createElement("button", {
            onClick: scrollToModels,
            style: {
              background: "none", border: "none", padding: 0, cursor: "pointer",
              fontSize: 14, color: rust, fontWeight: 600, fontFamily: "inherit",
              textDecoration: "none"
            },
            onMouseEnter: e => { e.currentTarget.style.textDecoration = "underline"; },
            onMouseLeave: e => { e.currentTarget.style.textDecoration = "none"; }
          }, "Skip to the eight models →")
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
      headline: "The sidewalk network in 2026",
      paragraphs: [
        "These maps seperate sidewalk networks into three conditions: sufficient sidewalks, sidewalks that exist but don't meet accessibility standards, and streets where sidewalks are missing altogether.",
        "In Denver, 57% of the network is sufficient, 34% is too narrow, and 9% is missing outright. Toggle between cities to compare."
      ],
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative", paddingTop: 52, boxSizing: "border-box" } },
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
    React.createElement(MapImage, {
      src: "uploads/Sidewalks -Development Eras.png",
      alt: "Pre-car and car-era sidewalk cross-section comparison",
      caption: "Why retrofit is harder: pre-car vs car-era development pattern",
      fit: "contain"
    });

  const slides = [
    {
      slideLabel: "Development era × gaps",
      headline: "Sidewalk gaps don't appear randomly",
      paragraphs: [
        "They appear where a neighborhood was built without sidewalks and stay there because retrofit is far harder than original construction.",
        "Sidewalk gaps in Denver cluster most heavily in post-1940 neighborhoods. In the city’s older, prewar areas, the sidewalk network is far more continuous. The overlap is hard to miss: where development happened in the auto era, pedestrian infrastructure was more likely to be omitted or built to lower standards, and those gaps have persisted.",
		"Toggle between cities to compare how closely sidewalk gaps track development era."
      ],
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative", paddingTop: 52, boxSizing: "border-box" } },
        React.createElement(CityTabs, { cities: eraMaps.map(m => m.city), active: eraCity, onChange: setEraCity, color: rust }),
        React.createElement(MapImage, eraMaps[eraCity])
      )
    },
    {
      slideLabel: "The numbers",
      headline: "Three cities, similar patterns",
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
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative", paddingTop: 52, boxSizing: "border-box" } },
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
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative", paddingTop: 52, boxSizing: "border-box" } },
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
      visual: React.createElement("div", { style: { width: "100%", height: "100%", position: "relative", paddingTop: 52, boxSizing: "border-box" } },
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
      visual: React.createElement("figure", { style: { margin: 0, width: "100%", height: "100%" } },
        React.createElement("img", {
          src: "uploads/sidewalkdistricts1890_wikimedia.jpg",
          alt: "Map of Denver sidewalk districts, 1890",
          style: { width: "100%", height: "100%", objectFit: "contain", display: "block" }
        }),
        React.createElement("figcaption", { style: { fontSize: 11, color: "#888", textAlign: "center", marginTop: 6 } }, "Denver sidewalk districts, 1890 — Wikimedia Commons")
      )
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

  // ── ZONE A: 6 cols × 4 rows, tightly packed, x: 20–548 ──
  // Each block 68w × 115h, street gap 16px
  const BW_A = 68, BH_A = 115, GAP_A = 16;
  const ORIG_A_X = 20, ORIG_A_Y = 55;
  const zoneABlocks = [], zoneASidewalks = [], trees = [];
  for (let c = 0; c < 6; c++) {
    for (let r = 0; r < 4; r++) {
      const x = ORIG_A_X + c * (BW_A + GAP_A);
      const y = ORIG_A_Y + r * (BH_A + GAP_A);
      zoneABlocks.push({ x, y, w: BW_A, h: BH_A });
      // All 4 edges — sidewalk
      zoneASidewalks.push(
        { x1: x,        y1: y,        x2: x + BW_A, y2: y        }, // top
        { x1: x,        y1: y + BH_A, x2: x + BW_A, y2: y + BH_A }, // bottom
        { x1: x,        y1: y,        x2: x,         y2: y + BH_A }, // left
        { x1: x + BW_A, y1: y,        x2: x + BW_A,  y2: y + BH_A }, // right
      );
      // Trees on top edge of rows 0–2, cols 0–4
      if (r < 3 && c < 5) {
        trees.push({ cx: x + BW_A * 0.3, cy: y - 5 });
        trees.push({ cx: x + BW_A * 0.7, cy: y - 5 });
      }
    }
  }

  // ── ZONE B: 4 cols × 3 rows, larger blocks, x: 568–1048 ──
  // Col widths vary slightly; row heights vary slightly
  const BW_B = [96, 104, 98, 100];
  const BH_B = [145, 155, 140];
  const GAP_B = 22;
  const ORIG_B_X = 568, ORIG_B_Y = 55;
  // Compute col x-starts
  const colStartB = [];
  let bx = ORIG_B_X;
  for (let c = 0; c < 4; c++) { colStartB.push(bx); bx += BW_B[c] + GAP_B; }
  const rowStartB = [];
  let by = ORIG_B_Y;
  for (let r = 0; r < 3; r++) { rowStartB.push(by); by += BH_B[r] + GAP_B; }

  const zoneBBlocks = [], zoneBSidewalks = [];
  // Gaps: omit specific edges to show transition (use "c-r-edge" keys)
  const bGaps = new Set(["1-0-bottom", "2-1-left", "3-2-top", "0-2-right"]);
  for (let c = 0; c < 4; c++) {
    for (let r = 0; r < 3; r++) {
      const x = colStartB[c], y = rowStartB[r];
      const w = BW_B[c], h = BH_B[r];
      zoneBBlocks.push({ x, y, w, h });
      [
        { key: `${c}-${r}-top`,    x1: x,   y1: y,   x2: x+w, y2: y   },
        { key: `${c}-${r}-bottom`, x1: x,   y1: y+h, x2: x+w, y2: y+h },
        { key: `${c}-${r}-left`,   x1: x,   y1: y,   x2: x,   y2: y+h },
        { key: `${c}-${r}-right`,  x1: x+w, y1: y,   x2: x+w, y2: y+h },
      ].forEach(e => { if (!bGaps.has(e.key)) zoneBSidewalks.push(e); });
    }
  }

  // ── ZONE C layout constants ──
  // Zone C occupies x: 1068–1590, y: 30–590
  // Design: one horizontal collector spine + two cul-de-sacs + one loop street
  // All coordinates are explicit and hand-tuned to be clean and readable.
  //
  // Street geometry (drawn as thick strokes, no fill):
  //   Collector: horizontal band y≈310, x 1068–1590
  //   Cul-de-sac A (upper, NO sidewalks): spine from collector up, bulb at top
  //   Cul-de-sac B (lower, partial sidewalk): spine from collector down, bulb
  //   Loop street (right side): oval loop off collector, partial sidewalk
  //
  // Blocks sit between streets as filled rects/paths.
  // Sidewalks are thin strokes just inside street-facing edges, present ~45%.

  return React.createElement("section", { id: "s7", style: { background: bone, padding: isMobile ? "60px 0 0" : "80px 0 0" } },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px 32px" : "0 48px 40px" } },
      React.createElement("div", { style: { fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Act II — Denver's Trajectory"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: navy, margin: "0 0 16px" } }, "How Denver Lost It"),
      React.createElement("p", { style: { fontSize: 16, color: "#444", lineHeight: 1.75, maxWidth: 680, marginBottom: 8 } },
        "What undid the system wasn't neglect. It was sprawling, unchecked growth. As Denver expanded outward in the postwar boom, Sidewalk Districts were phased out. New subdivisions were platted with narrow attached sidewalks or, in many cases, no sidewalks at all."
      )
    ),
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 20px 0" : "0 48px 0" } },
      React.createElement("svg", {
        viewBox: "0 0 1600 620",
        width: "100%",
        height: "auto",
        preserveAspectRatio: "xMidYMid meet",
        style: { display: "block" }
      },
        React.createElement("defs", null,
          React.createElement("style", null,
            ".sw{stroke:#1E4D40;stroke-width:3.5;stroke-linecap:round;fill:none}" +
            ".blk{fill:#E8DFCB;fill-opacity:0.6;stroke:#C4B89A;stroke-width:1}" +
            ".rd{fill:none;stroke:#C8BBAA;stroke-width:20;stroke-linecap:round}" +
            ".tree{fill:#7A8B5C;opacity:0.8}" +
            ".era-lbl{font-family:Georgia,serif;font-size:18px;fill:#5A5447;text-anchor:middle}" +
            ".era-ln{stroke:#5A5447;stroke-width:1;stroke-opacity:0.35}"
          )
        ),

        // ── ZONE A ──
        React.createElement("g", { className: "zone-streetcar-core" },
          React.createElement("g", null, ...zoneABlocks.map((b, i) =>
            React.createElement("rect", { key: `a${i}`, x: b.x, y: b.y, width: b.w, height: b.h, className: "blk" })
          )),
          React.createElement("g", null, ...zoneASidewalks.map((s, i) =>
            React.createElement("line", { key: `as${i}`, x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2, className: "sw" })
          )),
        ),

        // ── ZONE B ──
        React.createElement("g", { className: "zone-streetcar-suburbs" },
          React.createElement("g", null, ...zoneBBlocks.map((b, i) =>
            React.createElement("rect", { key: `b${i}`, x: b.x, y: b.y, width: b.w, height: b.h, className: "blk" })
          )),
          React.createElement("g", null, ...zoneBSidewalks.map((s, i) =>
            React.createElement("line", { key: `bs${i}`, x1: s.x1, y1: s.y1, x2: s.x2, y2: s.y2, className: "sw" })
          ))
        ),

        // ── ZONE C — Postwar Auto Suburbs ──
        // Concept: one horizontal collector bisects the zone. Three disconnected
        // residential streets branch off it — two cul-de-sacs (up) and one dead-end
        // stub (down). Everything else is large featureless superblock. Roads are
        // filled rects; turnarounds are concentric circles. Sidewalks ~40%, sparse.
        //
        // Zone x: 1078–1590  y: 50–560
        // Collector: y 295–321
        // Cul-A (upper-left,  NO sidewalks):  stem x 1128–1154, bulb cy=100
        // Cul-B (upper-right, NO sidewalks):  stem x 1440–1466, bulb cy=100
        // Stub  (lower-center, partial SW):   stem x 1284–1310, dead-end y=490
        React.createElement("g", { className: "zone-postwar" },

          // ── SUPERBLOCKS (under roads) ──
          // Upper-left block: left of cul-A stem, above collector
          React.createElement("rect", { x: 1078, y: 50,  width: 48,  height: 245, className: "blk" }),
          // Upper-center block: between cul-A and cul-B stems, above collector
          React.createElement("rect", { x: 1156, y: 50,  width: 282, height: 245, className: "blk" }),
          // Upper-right block: right of cul-B stem, above collector
          React.createElement("rect", { x: 1468, y: 50,  width: 120, height: 245, className: "blk" }),
          // Lower-left block: below collector, left of stub stem
          React.createElement("rect", { x: 1078, y: 323, width: 204, height: 237, className: "blk" }),
          // Lower-right block: below collector, right of stub stem
          React.createElement("rect", { x: 1312, y: 323, width: 276, height: 237, className: "blk" }),

          // ── ROADS (over blocks) ──
          // Collector
          React.createElement("rect", { x: 1068, y: 295, width: 522, height: 26, fill: "#D0C5B0" }),

          // Cul-de-sac A — upper-left, NO sidewalks
          // Stem runs from collector (y=295) up to bulb bottom (y=150); bulb cy=112
          React.createElement("rect", { x: 1128, y: 150, width: 26, height: 145, fill: "#D0C5B0" }),
          React.createElement("circle", { cx: 1141, cy: 120, r: 38, fill: "#D0C5B0" }),
          React.createElement("circle", { cx: 1141, cy: 120, r: 20, fill: "#EDE6DA" }),

          // Cul-de-sac B — upper-right, NO sidewalks
          React.createElement("rect", { x: 1440, y: 150, width: 26, height: 145, fill: "#D0C5B0" }),
          React.createElement("circle", { cx: 1453, cy: 120, r: 38, fill: "#D0C5B0" }),
          React.createElement("circle", { cx: 1453, cy: 120, r: 20, fill: "#EDE6DA" }),

          // Dead-end stub — lower-center, partial sidewalk one side
          React.createElement("rect", { x: 1284, y: 321, width: 26, height: 168, fill: "#D0C5B0" }),
          // Blunt end cap (small rect to square off the terminus)
          React.createElement("rect", { x: 1272, y: 487, width: 50,  height: 14,  fill: "#D0C5B0" }),

          // ── SIDEWALKS — ~40% coverage, fragmented ──
          React.createElement("g", { className: "sidewalks" },
            // Collector north side — left segment only (up to cul-A)
            React.createElement("line", { x1: 1078, y1: 294, x2: 1126, y2: 294, className: "sw" }),
            // Collector south side — right segment only (right of stub)
            React.createElement("line", { x1: 1312, y1: 322, x2: 1588, y2: 322, className: "sw" }),
            // Left outer edge — upper block only (not lower)
            React.createElement("line", { x1: 1078, y1: 50,  x2: 1078, y2: 294, className: "sw" }),
            // Stub — right side only (one side = partial)
            React.createElement("line", { x1: 1312, y1: 323, x2: 1312, y2: 487, className: "sw" }),
            // NO sidewalks: cul-A stem/bulb, cul-B stem/bulb, lower-left block, upper-right block
          )
        ),

        // ── ERA LABELS ──
        React.createElement("line", { x1: 20,   y1: 578, x2: 546,  y2: 578, className: "era-ln" }),
        React.createElement("line", { x1: 568,  y1: 578, x2: 1046, y2: 578, className: "era-ln" }),
        React.createElement("line", { x1: 1068, y1: 578, x2: 1590, y2: 578, className: "era-ln" }),
        React.createElement("text", { x: 283,  y: 600, className: "era-lbl" }, "1880s — Streetcar Core"),
        React.createElement("text", { x: 807,  y: 600, className: "era-lbl" }, "1900–1940 — Streetcar Suburbs"),
        React.createElement("text", { x: 1329, y: 600, className: "era-lbl" }, "Postwar — Auto Suburbs"),
      )
    ),
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: isMobile ? "16px 20px 48px" : "20px 48px 60px" } },
      React.createElement("p", { style: { fontSize: 14, color: "#5A5447", fontStyle: "italic", marginBottom: 20 } },
        "Schematic: Denver’s sidewalk network across three eras of platting. As development moved outward, continuous coverage gave way to fragmentary, auto-oriented patterns."
      ),
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
    { year: "2022", label: "Denver Deserves Sidewalks", body: "Advocates collect 19,197 signatures to put a new model on the ballot, bypassing City Council entirely.", type: "positive" },
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
      React.createElement("h2", { style: { fontSize: isMobile ? 32 : 38, fontWeight: 800, color: navy, margin: "0 0 12px" } }, "The 20-Year Reform Arc"),
      React.createElement("p", { style: { fontSize: 17, color: "#444", lineHeight: 1.75, marginBottom: 10 } },
        "From the moment Denver named the billion-dollar problem to the moment it acted, eight years passed. From the first failed enforcement bill to the ballot initiative that finally worked, four decades."
      ),
      React.createElement("div", {
        style: {
          fontSize: 14, color: navy, marginBottom: 14, fontWeight: 700,
          background: "rgba(216,154,78,0.18)", border: "1px solid rgba(216,154,78,0.45)",
          borderRadius: 8, padding: "10px 12px", display: "inline-flex", alignItems: "center", gap: 8
        }
      }, "👇 Click any timeline row to expand details"),
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
                flex: 1, background: isActive ? (ev.type === "milestone" ? "rgba(178,84,44,0.08)" : "rgba(27,58,75,0.06)") : "rgba(27,58,75,0.015)",
                borderRadius: 6, padding: isActive ? "12px 16px" : "10px 16px",
                marginLeft: 12, border: isActive ? `1px solid ${ts.dot}66` : "1px dashed rgba(27,58,75,0.2)",
                transition: "all 0.2s"
              }
            },
              React.createElement("div", {
                style: {
                  fontSize: 14, fontWeight: ev.type === "milestone" ? 800 : 600,
                  color: ev.type === "milestone" ? rust : navy, marginBottom: isActive ? 8 : 0, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12
                }
              },
                React.createElement("span", null, ev.label),
                React.createElement("span", { style: { fontSize: 11, color: "#888", letterSpacing: "0.04em", textTransform: "uppercase", fontWeight: 700 } }, isActive ? "Hide" : "Click to expand")
              ),
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
            label: "Before Initiative 307", color: "#B2542C",
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
        "As implemented by City Council, Initiative 307 does three things"
      ),
      [
        { num: "01", title: "Shifted legal responsibility", body: "From property owner to city, across all parcel types." },
        { num: "02", title: "Created dedicated funding", body: "A recurring fee stream — not a one-time bond. Sidewalk funding stopped competing annually." },
        { num: "03", title: "Required prioritization", body: "Based on need and the 2019 Denver Moves Pedestrians Plan." },
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
              opacity: 0.8, flexShrink: 0, lineHeight: 1,
              width: 36, textAlign: "left"
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
        "The Denver Deserves Sidewalks campaign collected nearly 20,000 signatures across roughly six months of fieldwork. This was more than double the amount required to put the question directly to voters.",
        "The proposal was simple: a small annual fee on every property, scaled to lot frontage, in exchange for the city taking responsibility for sidewalk construction and repair."
      ],
      stat: "19,197", statLabel: "signatures collected to put the question to voters directly",
      visual: React.createElement(MapImage, {
        src: "uploads/ddscampaign.jpg",
        alt: "Denver Deserves Sidewalks campaign celebration after qualifying for the ballot",
        caption: "Denver Deserves Sidewalks campaign celebration after getting on the ballot",
        source: "Instagram — Denver Streets Partnership",
        fit: "cover"
      })
    },
    {
      slideLabel: "What voters approved",
      headline: "Initiative 307: November 2022",
      paragraphs: [
        "In November 2022, Initiative 307 passed with a winning vote of 56%. Once the vote was one, three things happened: legal responsibility from property owner to city, a dedicated recurring funding stream had to be created, and prioritization had to be based on need.",
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
    );

    const FundingGap = () => {
    const sources = [
      { label: "SIP annual fee revenue", sublabel: "Dedicated stream, first in Denver's history", color: green, note: "~$40 M/yr" },
      { label: "Development-triggered construction", sublabel: "Owners build when property redevelops (D.R.M.C. 49-84)", color: "#4A90A4", note: "Ongoing, unquantified" },
      { label: "Federal & state grants", sublabel: "BUILD, CDBG, CDOT - competitive, variable", color: "#D89A4E", note: "Variable, project-by-project" },
      { label: "Future bond measures", sublabel: "Precedent: Elevate Denver ($47.7M, 2017)", color: "#B6BFB1", note: "Not yet committed" },
    ];
    return React.createElement("div", {
      style: { width: "100%", height: "100%", background: "#fff", padding: 40, display: "flex", flexDirection: "column", justifyContent: "center" }
    },
      React.createElement("div", { style: { fontSize: 13, fontWeight: 700, color: navy, marginBottom: 4 } }, "How SIP Fits Into the Funding Picture"),
      React.createElement("div", { style: { fontSize: 11, color: "#888", marginBottom: 28, lineHeight: 1.6 } },
        "The fee sets the foundation for the program and other potential revenue sources. Total network need was last estimated at $1.1B (Denver Moves, 2017)."
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
      visual: React.createElement(MapImage, {
        src: "uploads/berkleyrepair.jpg",
        alt: "Crews preparing concrete forms for a sidewalk repair project in Denver's Berkeley neighborhood",
        caption: "Crews prepare to pour concrete for a Berkeley neighborhood sidewalk repair project (Oct. 14, 2025)",
        source: "Photo by RJ Sangosti / The Denver Post",
        fit: "cover"
      })
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
  const [question, setQuestion] = React.useState("");
  const [chatState, setChatState] = React.useState({ answer: "", loading: false, error: "" });
  const previousModelRef = React.useRef(activeModel);

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
      cities: ["Denver, CO"],
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

  React.useEffect(() => {
    if (previousModelRef.current !== activeModel) {
      setQuestion("");
      setChatState({ answer: "", loading: false, error: "" });
      previousModelRef.current = activeModel;
    }
  }, [activeModel]);

  const askModelAssistant = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || chatState.loading) return;

    const selectedModel = models[activeModel];
    setChatState({ answer: "", loading: true, error: "" });

    try {
      const configuredEndpoint = window.__MODEL_CHAT_API_ENDPOINT__;
      const endpoint = configuredEndpoint || "https://ai-proxy.robertsells32.workers.dev";

      const systemPrompt = [
        `You are an expert advisor on sidewalk governance and municipal infrastructure policy.`,
        `The user is currently viewing the "${selectedModel.name}" reform pathway on a tool that helps cities plan new sidewalk funding and maintenance frameworks.`,
        `When the user refers to "this model," "this pathway," or asks general questions, they are asking about the ${selectedModel.name} model specifically.`,
        `Here is the full context for this pathway:`,
        `- Mechanism: ${selectedModel.mechanism}`,
        `- Tradeoffs: ${selectedModel.tradeoff}`,
        `- Example cities that use this model: ${selectedModel.cities.join(", ")}`,
        `Answer questions about how this governance model works, how cities could adopt it, what it would take to implement, and how it compares to other sidewalk funding approaches.`,
        `Keep answers concise, practical, and grounded in this model's real-world constraints.`
      ].join("\n");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: systemPrompt,
          messages: [
            { role: "user", content: trimmedQuestion }
          ]
        })
      });

      if (!response.ok) throw new Error("Assistant request failed");
      const data = await response.json();
      const reply = data?.answer || data?.content?.[0]?.text;
      if (!reply) throw new Error("No answer returned");

      setChatState({ answer: reply, loading: false, error: "" });
      setQuestion("");
    } catch (error) {
      setChatState({
        answer: "",
        loading: false,
        error: "Sorry — I couldn't reach the model assistant right now. Please try again."
      });
    }
  };

  const handleQuestionKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      askModelAssistant();
    }
  };

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
        "Click any pathway to explore the model."
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
            React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", fontWeight: 700, marginBottom: 6 } }, "Tradeoffs"),
            React.createElement("p", { style: { fontSize: 14, color: "#555", lineHeight: 1.65, margin: 0 } }, models[activeModel].tradeoff)
          ),
          React.createElement("div", {
            style: {
              marginTop: 28, padding: "16px 16px 14px",
              border: "1px solid rgba(27,58,75,0.12)", borderRadius: 10,
              background: "#F8F6F2"
            }
          },
            React.createElement("div", { style: { fontSize: 15, fontWeight: 700, color: navy, marginBottom: 6 } }, `Ask about the ${models[activeModel].name} pathway`),
            React.createElement("div", { style: { fontSize: 12.5, color: "#6D6A62", marginBottom: 10 } }, "Tell me about your city. I'll explain how this governance model works, what it takes to implement, and whether it fits your city's context."),
            React.createElement("textarea", {
              value: question,
              onChange: e => setQuestion(e.target.value),
              onKeyDown: handleQuestionKeyDown,
              placeholder: `Ask about ${models[activeModel].name}...`,
              rows: 3,
              style: {
                width: "100%", resize: "vertical", minHeight: 72, fontFamily: "inherit", fontSize: 13.5,
                border: "1px solid rgba(27,58,75,0.2)", borderRadius: 8, padding: "10px 12px",
                outline: "none", boxSizing: "border-box", background: "#fff", color: "#1f1f1f"
              }
            }),
            React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10, gap: 12 } },
              React.createElement("div", { style: { fontSize: 11.5, color: "#6D6A62" } }, "Press Ctrl/Cmd + Enter to submit."),
              React.createElement("button", {
                onClick: askModelAssistant,
                disabled: chatState.loading || !question.trim(),
                style: {
                  border: "none", borderRadius: 7, padding: "8px 14px",
                  background: chatState.loading || !question.trim() ? "#9EA7AD" : models[activeModel].color,
                  color: "#fff", fontWeight: 700, cursor: chatState.loading || !question.trim() ? "not-allowed" : "pointer",
                  fontFamily: "inherit", fontSize: 12.5
                }
              }, chatState.loading ? "Asking..." : "Ask AI")
            ),
            chatState.error && React.createElement("div", { style: { marginTop: 10, fontSize: 12.5, color: "#B2542C" } }, chatState.error),
            chatState.answer && React.createElement("div", {
              className: "ai-response",
              style: {
                marginTop: 12, borderRadius: 8, background: "#fff", border: "1px solid rgba(27,58,75,0.12)",
                padding: "12px 13px", fontSize: 13.5, color: "#2A2A2A", lineHeight: 1.65
              },
              dangerouslySetInnerHTML: { __html: marked.parse(chatState.answer) }
            })
          )
        ),
        // Right: US map with example cities
        React.createElement("div", {
          style: {
            background: "#F0EDE8", padding: "40px 32px",
            display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 24
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
          React.createElement(USCityMap, { models, activeModel })
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
  const [resultsChatMessages, setResultsChatMessages] = React.useState([]);
  const [resultsChatInput, setResultsChatInput] = React.useState("");
  const [resultsChatLoading, setResultsChatLoading] = React.useState(false);
  const [resultsChatError, setResultsChatError] = React.useState("");
  const [resultsChatCity, setResultsChatCity] = React.useState("");

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
      if (taxRegime === "tax_vote") pathways = ["council_referred_ballot", "citizen_initiative", "phased_approach"];
      else pathways = ["council_ordinance", "council_referred_ballot", "citizen_initiative", "phased_approach"];
    } else if (modelKey === "utility_fee") {
      pathways = ["council_ordinance", "council_referred_ballot", "phased_approach"];
    }

    // Prop 13: millage essentially blocked (would need supermajority + state-law workarounds)
    if (taxRegime === "property_supermajority" && modelKey === "millage") return [];

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
      label: "Current rules",
      text: "Where is sidewalk responsibility written down today?",
      subtitle: "Where it's written determines how to change it: charter rules typically go to voters, ordinances don't.",
      options: [
        { id: "charter_codified", label: "In our city charter", icon: "📜" },
        { id: "ordinance", label: "In an ordinance — council could change it", icon: "📋" },
        { id: "practice", label: "Just how it's always been done — not much on the books", icon: "🗂" },
        { id: "mixed", label: "A mix of charter, ordinance, and practice", icon: "🔀" },
        { id: "unclear_q1", label: "Not sure", icon: "❓" }
      ]
    },
    {
      id: "q2",
      label: "State law",
      text: "What revenue-raising constraints apply in your state?",
      subtitle: "The fee-versus-tax distinction often determines whether voter approval is required.",
      options: [
        { id: "none", label: "No major state-level revenue constraints", icon: "🏛" },
        { id: "tax_vote", label: "Voter approval required for general tax increases (Colorado TABOR or similar)", icon: "📊" },
        { id: "property_supermajority", label: "Voter approval and supermajority required for property taxes (California Prop 13/218 or similar)", icon: "⚖" },
        { id: "millage_cap", label: "Property tax rate or levy capped with automatic rollback (Michigan Headlee or similar)", icon: "📉" },
        { id: "state_auth_required", label: "Limited taxing authority — most new revenue requires state legislative authorization", icon: "📜" },
        { id: "unsure_q2", label: "Not sure", icon: "❓" }
      ]
    },
    {
      id: "q3",
      label: "Network needs",
      text: "What does your network need?",
      subtitle: "New construction and ongoing maintenance usually come from different funding sources.",
      options: [
        { id: "build_out", label: "Build out — lots of missing sidewalks, especially in post-1940 neighborhoods", icon: "🚧" },
        { id: "maintenance", label: "Fix what we have — network is mostly complete but in disrepair", icon: "🔧" },
        { id: "both", label: "Both — gaps to fill and a backlog to repair", icon: "🌐" },
        { id: "no_inventory", label: "Not sure — we don't have a current inventory", icon: "📊" }
      ]
    },
    {
      id: "q4",
      label: "Geography",
      text: "Where are the worst sidewalks?",
      subtitle: "This affects both fee structure and which neighborhoods get work first.",
      options: [
        { id: "redlined_central", label: "Historically disinvested neighborhoods (former redlined areas, lower-income cores)", icon: "🏘" },
        { id: "periphery", label: "Post-1940 car-era neighborhoods on the edges of the city", icon: "🚗" },
        { id: "dispersed_equity", label: "Spread fairly evenly across the city", icon: "🗺" },
        { id: "corridors_use", label: "Specific corridors — schools, transit, commercial streets", icon: "🚌" },
        { id: "spatial_unknown", label: "Not mapped yet", icon: "❓" }
      ]
    },
    {
      id: "q5",
      label: "Leadership",
      text: "Is anyone in city leadership willing to champion this?",
      subtitle: "Reform usually moves either through a champion inside city leadership or through sustained outside organizing.",
      options: [
        { id: "council_high", label: "Yes — leadership is on board and ready to move this term", icon: "🟢" },
        { id: "council_mid", label: "Some interest, but it needs more groundwork to move", icon: "🟡" },
        { id: "council_low", label: "No — leadership isn't interested or has stalled on it", icon: "🔴" },
        { id: "council_unknown", label: "Haven't really tested it", icon: "❓" }
      ]
    },
    {
      id: "q6",
      label: "Scale",
      text: "How much money does the program need?",
      subtitle: "Different funding tools raise different amounts. Bonds and grants can multiply whatever base mechanism you start with.",
      options: [
        { id: "modest", label: "A few million a year would be meaningful", icon: "💧" },
        { id: "substantial", label: "Tens of millions a year for major build-out", icon: "💰" },
        { id: "very_high", label: "Hundreds of millions over a decade (Denver-scale)", icon: "🏛" },
        { id: "scale_unknown", label: "Don't know — we'd need a needs assessment first", icon: "❓" }
      ]
    },
    {
      id: "q8",
      label: "Delivery",
      text: "Who will build and maintain it?",
      subtitle: "A funded program still needs people to do the work — public works staff, contractors, or both.",
      options: [
        { id: "robust", label: "Strong public works — could take it on in-house", icon: "🏗" },
        { id: "mid", label: "Mid-capacity — could handle it with new staff or contractors", icon: "⚙" },
        { id: "limited", label: "Limited — would need to contract most of it out", icon: "📋" },
        { id: "district_oriented", label: "Decentralized — we already work by district or neighborhood", icon: "🏘" },
        { id: "delivery_unknown", label: "Not formally assessed", icon: "❓" }
      ]
    }
  ];

  // ══════════════════════════════════════════════════════════════════════════
  // MODEL SCORING — seven questions × eight models
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
      none:                    { public_ownership: 2, utility_fee: 3, dedicated_fee: 3, millage: 2, parcel_tax: -1, improvement_district: 2, inspection_bill: 2, general_levy: 2 },
      tax_vote:                { public_ownership: 1, utility_fee: 2, dedicated_fee: 3, millage: 1, parcel_tax: -1, improvement_district: 1, inspection_bill: 2, general_levy: 2 },
      property_supermajority:  { public_ownership: 1, utility_fee: 1, dedicated_fee: -1, millage: -5, parcel_tax: 7, improvement_district: 1, inspection_bill: 1, general_levy: 2 },
      millage_cap:             { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: -1, parcel_tax: 1, improvement_district: 2, inspection_bill: 2, general_levy: 1 },
      state_auth_required:     { public_ownership: 1, utility_fee: 1, dedicated_fee: -1, millage: 1, parcel_tax: -2, improvement_district: 0, inspection_bill: 2, general_levy: 0 },
      unsure_q2:               { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 0, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
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
    q6: { // revenue scale
      modest:         { public_ownership: 2, utility_fee: 4, dedicated_fee: 0, millage: 0, parcel_tax: 0, improvement_district: 2, inspection_bill: 3, general_levy: 0 },
      substantial:    { public_ownership: 2, utility_fee: 1, dedicated_fee: 3, millage: 3, parcel_tax: 3, improvement_district: 2, inspection_bill: 0, general_levy: 3 },
      very_high:      { public_ownership: 1, utility_fee: -1, dedicated_fee: 4, millage: 3, parcel_tax: 3, improvement_district: 1, inspection_bill: -2, general_levy: 4 },
      scale_unknown:  { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 }
    },
    q7: { // delivery capacity
      robust:            { public_ownership: 2, utility_fee: 2, dedicated_fee: 2, millage: 2, parcel_tax: 2, improvement_district: 1, inspection_bill: 2, general_levy: 2 },
      mid:               { public_ownership: 1, utility_fee: 2, dedicated_fee: 2, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 2, general_levy: 1 },
      limited:           { public_ownership: 0, utility_fee: 2, dedicated_fee: 1, millage: 0, parcel_tax: 0, improvement_district: 1, inspection_bill: 2, general_levy: 0 },
      district_oriented: { public_ownership: 0, utility_fee: 0, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 5, inspection_bill: 1, general_levy: 0 },
      delivery_unknown:  { public_ownership: 1, utility_fee: 1, dedicated_fee: 1, millage: 1, parcel_tax: 1, improvement_district: 1, inspection_bill: 1, general_levy: 1 }
    }
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PATHWAY SCORING removed — implementation route is presented narratively
  // rather than scored. Pathway choice depends on local governance facts
  // (state law, charter, council rules) that vary too much to score generally.
  // ══════════════════════════════════════════════════════════════════════════

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

  // Returns the list of authorization routes that are legally available
  // for the top model, given the user's state-law and charter answers.
  // Used to populate the "Implementation routes" narrative callout —
  // NOT to rank or recommend a specific route.
  const viableRoutesFor = (modelKey) => {
    if (!modelKey) return [];
    return legallyViable(modelKey, answers.q2, answers.q1);
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
      if (overlay.bestFor.includes(answers.q6)) score += 1;
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
    if (answers.q2 === "unsure_q2") flags.push({ q: "State revenue constraints", action: "Engage municipal counsel to identify which state-level constraints apply — voter-approval requirements, property tax caps, or limits on taxing authority — and how they affect whether your proposed charge qualifies as a fee or a tax." });
    if (answers.q3 === "no_inventory") flags.push({ q: "Network inventory", action: "Commission a citywide sidewalk inventory before scoping the program. Without one, downstream decisions are calibrated to guesses." });
    if (answers.q4 === "spatial_unknown") flags.push({ q: "Spatial pattern", action: "Map sidewalk conditions against demographic and historical data (HOLC, development era, income). The geography of need shapes both mechanism and sequencing." });
    if (answers.q5 === "council_unknown") flags.push({ q: "Council appetite", action: "Test council appetite through a targeted briefing with key members before committing to a direction." });
    if (answers.q6 === "scale_unknown") flags.push({ q: "Revenue scale", action: "Develop a needs-assessment that translates network condition into annual revenue requirements before designing a mechanism." });
    if (answers.q7 === "delivery_unknown") flags.push({ q: "Delivery capacity", action: "Audit current sidewalk delivery (in-house staff, contractor pipeline, inspection cycle) before scaling up." });
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
  const nextSteps = (topModelKey) => {
    const steps = [];

    if (answers.q1 === "charter_codified" && ["public_ownership", "utility_fee", "dedicated_fee", "millage", "parcel_tax", "general_levy"].includes(topModelKey)) {
      steps.push("Draft the charter amendment language and the funding mechanism in parallel. They will move together politically and legally; designing one without the other creates implementation gaps.");
    }
    if (answers.q2 === "tax_vote" && (topModelKey === "utility_fee" || topModelKey === "dedicated_fee")) {
      steps.push("Engage a municipal attorney early to structure the mechanism as a service fee rather than a tax. The fee-vs-tax classification determines whether council can adopt by ordinance or whether voter approval is required — and the legal standard varies significantly by state.");
    }
    if (answers.q2 === "property_supermajority" && topModelKey === "parcel_tax") {
      steps.push("Confirm the simple-majority vs. supermajority threshold for your specific parcel tax structure. Prop 218 distinctions between general and special taxes matter, and recent court decisions have narrowed some routes.");
    }
    if (topModelKey === "improvement_district") {
      steps.push("Define district boundaries before designing the fee structure. Boundaries determine who pays for what; getting them wrong embeds inequities the funding mechanism can't correct.");
    }
    if (topModelKey === "inspection_bill") {
      steps.push("Audit inspection capacity and assessment-billing infrastructure. The model only works if the city can run a rotating cycle that meaningfully covers the network within a defined timeframe.");
    }
    if (answers.q7 === "limited") {
      steps.push("Plan delivery as carefully as funding. A funded program with no contractor pipeline produces visible failure within the first program cycle.");
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
      setTimeout(() => {
        setRevealed(true);
        const el = document.getElementById("s12");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
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
  let suggestedOverlays = [];
  let flags = [];
  let conSet = [];
  let steps = [];
  let topModelRoutes = [];

  if (revealed) {
    const modelScores = computeModelScores();

    modelScoresSorted = Object.entries(modelScores)
      .map(([k, v]) => ({ key: k, score: v, ...models[k] }))
      .sort((a, b) => b.score - a.score);

    tiers = computeTiers(modelScoresSorted);

    const topModelKey = tiers.strong[0]?.key || modelScoresSorted[0].key;
    suggestedOverlays = suggestOverlays(topModelKey);
    flags = uncertaintyFlags();
    conSet = considerations();
    steps = nextSteps(topModelKey);
    topModelRoutes = viableRoutesFor(topModelKey);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RESULTS CHATBOT SEND
  // ══════════════════════════════════════════════════════════════════════════
  const sendResultsChat = async (inputText) => {
    const text = inputText.trim();
    if (!text || resultsChatLoading) return;

    let cityForPrompt = resultsChatCity;
    if (!resultsChatMessages.length && !resultsChatCity) {
      cityForPrompt = text;
      setResultsChatCity(text);
    }

    const newMessages = [...resultsChatMessages, { role: "user", content: text }];
    setResultsChatMessages(newMessages);
    setResultsChatInput("");
    setResultsChatLoading(true);
    setResultsChatError("");

    try {
      const endpoint = window.__MODEL_CHAT_API_ENDPOINT__ || "https://ai-proxy.robertsells32.workers.dev";
      const strongNames = tiers ? tiers.strong.map(m => m.name).join(", ") : "unknown";
      const possibleNames = tiers ? tiers.possible.map(m => m.name).join(", ") : "";
      const answerSummary = questions.map(q => {
        const chosen = q.options.find(o => o.id === answers[q.id]);
        return `${q.label}: ${chosen ? chosen.label : "not answered"}`;
      }).join("\n");

      const systemPrompt = [
        "You are a municipal sidewalk policy advisor helping a user understand and act on their diagnostic results from the Mind the Gap sidewalk governance tool.",
        "",
        "DIAGNOSTIC RESULTS:",
        `Strong-fit model(s): ${strongNames || "none"}`,
        possibleNames ? `Possible-fit model(s): ${possibleNames}` : "",
        "",
        "USER'S QUIZ ANSWERS:",
        answerSummary,
        "",
        cityForPrompt ? `The user's city: ${cityForPrompt}` : "The user has not yet provided their city.",
        "",
        "Your job: help the user understand what their results mean in practice, how to move forward, what their state's legal framework means for the recommended model, and how to compare options.",
        "If you don't yet know what city they're in, ask for it — it helps you verify whether the recommended model is legally viable and cite relevant local precedents.",
        "Be concise, practical, and specific. Avoid generic advice. Reference the actual models and answers from the diagnostic when relevant.",
        "Format responses in Markdown for readability."
      ].filter(Boolean).join("\n");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: systemPrompt, messages: newMessages })
      });

      if (!response.ok) throw new Error("Request failed");
      const data = await response.json();
      const reply = data?.answer || data?.content?.[0]?.text;
      if (!reply) throw new Error("No response");

      setResultsChatMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch {
      setResultsChatError("Couldn't reach the advisor — please try again.");
    } finally {
      setResultsChatLoading(false);
    }
  };

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
        "Seven questions about your city's legal context, network condition, political landscape, fiscal scale, and operational capacity. Models are scored against your answers. How to authorize whichever model you pick is a separate question that depends on your state and charter — addressed at the end of the results."
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
        "Every recommendation it produces requires verification by municipal counsel, a financial advisor familiar with local revenue mechanisms, and engagement with your specific charter, state statutes, and political context."
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
          tiers.strong.map((m, i) =>
            React.createElement("div", {
              key: m.key,
              style: {
                marginBottom: i < tiers.strong.length - 1 ? 24 : 0,
                padding: "20px 24px",
                background: `${m.color}08`,
                borderLeft: `4px solid ${m.color}`,
                borderRadius: "0 8px 8px 0"
              }
            },
              React.createElement("h3", { style: { fontSize: 22, fontWeight: 800, color: navy, margin: "0 0 10px" } }, m.name),
              React.createElement("p", { style: { fontSize: 14, color: "#333", lineHeight: 1.65, margin: "0 0 12px" } }, m.summary),
              React.createElement("div", { style: { fontSize: 13, color: "#555", lineHeight: 1.6 } },
                React.createElement("strong", { style: { color: green } }, "Why this fits: "),
                m.fits
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
                  ["Model", "Liability", "Revenue scale", "Time to revenue", "Cost distribution", "Equity scaling", "Renewal"].map(h =>
                    React.createElement("th", {
                      key: h,
                      style: { padding: "10px 8px", textAlign: "left", fontSize: 10, color: navy, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }
                    }, h)
                  )
                )
              ),
              React.createElement("tbody", null,
                [...tiers.strong, ...tiers.possible].map((m, i) => {
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
                    React.createElement("td", { style: { padding: "12px 8px", verticalAlign: "top", color: "#333" } }, m.renewalShort)
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

        // ── IMPLEMENTATION ROUTES (narrative, not scored) ──────────────────
        topModelRoutes.length > 0 && React.createElement("div", {
          style: { background: "rgba(45,106,79,0.05)", border: "1px solid rgba(27,58,75,0.15)", borderTop: "none", padding: "24px 32px" }
        },
          React.createElement("div", { style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: green, fontWeight: 700, marginBottom: 8 } },
            "Implementation routes"
          ),
          React.createElement("p", { style: { fontSize: 13, color: "#444", lineHeight: 1.65, margin: "0 0 16px" } },
            "Once you've picked a direction, the route to authorize it depends on your state, your charter, and what your city has done before. The routes below are legally available for the top-ranked model given your answers, but which one fits is a local political-legal judgment, not a scored output."
          ),
          React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 } },
            topModelRoutes.map(routeKey => {
              const p = pathways[routeKey];
              if (!p) return null;
              return React.createElement("div", {
                key: routeKey,
                style: { padding: "14px 18px", background: "#fff", borderRadius: 8, border: "1px solid rgba(27,58,75,0.1)" }
              },
                React.createElement("div", { style: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 4 } }, p.icon, " ", p.name),
                React.createElement("div", { style: { fontSize: 11.5, color: muted, fontWeight: 600, marginBottom: 8, letterSpacing: "0.03em" } }, p.timeline),
                React.createElement("p", { style: { fontSize: 12.5, color: "#444", lineHeight: 1.55, margin: 0 } }, p.description)
              );
            })
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
            React.createElement("div", { style: { marginTop: 14 } },
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
              )
            )
          )
        )
      ),

      // ── RESULTS CHATBOT ──────────────────────────────────────────────────
      revealed && React.createElement("div", {
        style: {
          marginTop: 36, padding: isMobile ? "24px 20px" : "32px 36px",
          background: "#fff", borderRadius: 12,
          boxShadow: "0 4px 24px rgba(27,58,75,0.1)",
          border: `1px solid rgba(27,58,75,0.12)`
        }
      },
        React.createElement("div", { style: { marginBottom: 18 } },
          React.createElement("div", {
            style: { fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 6 }
          }, "Results Advisor"),
          React.createElement("div", { style: { fontSize: 18, fontWeight: 800, color: navy, marginBottom: 8 } },
            "Talk through your results"
          ),
          React.createElement("p", { style: { fontSize: 13.5, color: "#555", lineHeight: 1.65, margin: 0 } },
            "Ask me anything about your diagnostic — what the top model means for your city, how to get started, or how it compares to alternatives."
          )
        ),

        // Opening message from the bot (shown once, before any conversation)
        resultsChatMessages.length === 0 && React.createElement("div", {
          style: {
            marginBottom: 16, padding: "14px 16px",
            background: `rgba(27,58,75,0.04)`, borderRadius: 8,
            borderLeft: `3px solid ${navy}`, fontSize: 13.5, color: "#2A2A2A", lineHeight: 1.65
          }
        },
          "I've reviewed your diagnostic answers. Before we go deeper — ",
          React.createElement("strong", null, "what city are you working in?"),
          " That lets me check whether the recommended model actually fits your state's legal framework and give you more specific guidance."
        ),

        // Conversation thread
        resultsChatMessages.length > 0 && React.createElement("div", {
          style: { marginBottom: 16, display: "flex", flexDirection: "column", gap: 12 }
        },
          resultsChatMessages.map((msg, i) =>
            React.createElement("div", {
              key: i,
              style: {
                padding: "12px 16px", borderRadius: 8,
                background: msg.role === "user" ? `rgba(27,58,75,0.06)` : `rgba(178,84,44,0.05)`,
                borderLeft: msg.role === "user" ? `3px solid ${navy}` : `3px solid ${rust}`,
                fontSize: 13.5, color: "#2A2A2A", lineHeight: 1.65,
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "90%"
              }
            },
              msg.role === "user"
                ? React.createElement("span", null, msg.content)
                : React.createElement("div", {
                    dangerouslySetInnerHTML: { __html: typeof marked !== "undefined" ? marked.parse(msg.content) : msg.content }
                  })
            )
          )
        ),

        resultsChatError && React.createElement("div", {
          style: { marginBottom: 12, fontSize: 12.5, color: rust }
        }, resultsChatError),

        // Input row
        React.createElement("div", { style: { display: "flex", gap: 10, alignItems: "flex-end" } },
          React.createElement("textarea", {
            value: resultsChatInput,
            onChange: e => setResultsChatInput(e.target.value),
            onKeyDown: e => {
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                sendResultsChat(resultsChatInput);
              }
            },
            placeholder: resultsChatMessages.length === 0
              ? "Tell me your city, then ask anything about your results..."
              : "Ask a follow-up question... (Ctrl/Cmd + Enter to send)",
            rows: 3,
            style: {
              flex: 1, resize: "vertical", minHeight: 64,
              fontFamily: "inherit", fontSize: 13.5,
              border: `1px solid rgba(27,58,75,0.2)`, borderRadius: 8,
              padding: "10px 12px", outline: "none",
              boxSizing: "border-box", background: "#fff", color: "#1f1f1f"
            }
          }),
          React.createElement("button", {
            disabled: resultsChatLoading || !resultsChatInput.trim(),
            onClick: () => sendResultsChat(resultsChatInput),
            style: {
              padding: "10px 18px", borderRadius: 8, border: "none",
              background: resultsChatLoading || !resultsChatInput.trim() ? "#9EA7AD" : rust,
              color: "#fff", fontWeight: 700, fontSize: 13,
              cursor: resultsChatLoading || !resultsChatInput.trim() ? "not-allowed" : "pointer",
              fontFamily: "inherit", flexShrink: 0, alignSelf: "flex-end"
            }
          }, resultsChatLoading ? "Asking..." : "Send")
        ),
        React.createElement("div", { style: { fontSize: 11, color: muted, marginTop: 8 } },
          "Press Ctrl/Cmd + Enter to send."
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
    style: { background: navy, padding: isMobile ? "60px 20px" : "80px 48px", color: "#EDE6DA", position: "relative" }
  },
    React.createElement("div", { style: { position: "absolute", top: 0, left: 0, right: 0, height: 6, background: rust } }),
    React.createElement("div", { style: { maxWidth: 900, margin: "0 auto" } },
      React.createElement("div", { style: { fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase", color: rust, fontWeight: 700, marginBottom: 12 } }, "Resources & Credits"),
      React.createElement("h2", { style: { fontSize: 34, fontWeight: 800, color: "#EDE6DA", margin: "0 0 32px" } }, "The Full Report & Credits"),

      React.createElement("div", { style: { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 32 : 40 } },
        React.createElement("div", null,
          React.createElement("p", { style: { fontSize: 16, lineHeight: 1.75, opacity: 0.85, marginBottom: 24 } },
            "This guide is the public face of a longer capstone report: ",
            React.createElement("em", null, "Mind the Gap: Lessons from Denver to Rebuild Your Sidewalk Network"),
            ", produced for Fehr & Peers in partnership with the University of Colorado Denver MURP program."
          ),
          React.createElement("p", { style: { fontSize: 15, lineHeight: 1.75, opacity: 0.75, marginBottom: 32 } },
            "The report contains the full methodology, comparative spatial analysis of Denver, Seattle, and Minneapolis, historical research on Denver's reform trajectory, and citations behind every figure."
          ),
          React.createElement("a", {
            href: "https://drive.google.com/uc?export=download&id=1FnC-zLYs4j6Qguu5lgMPiVEYWouK_q25",
            download: true,
            style: {
              display: "inline-block", padding: "14px 28px", background: rust, color: "#fff",
              borderRadius: 6, fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit", textDecoration: "none"
            }
          }, "Download the full report — PDF →")
        ),
        React.createElement("div", null,
          [
            { label: "Authors", body: "Robert Sells and Taylor Lucas, MURP candidates, University of Colorado Denver College of Architecture and Planning" },
            { label: "Client", body: "Fehr & Peers" },
            { label: "Suggested citation", body: "Sells, R., & Lucas, T. (2026). Mind the Gap: Lessons from Denver to Rebuild Your Sidewalk Network. MURP Capstone, University of Colorado Denver." },
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
