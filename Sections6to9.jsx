
// Sections 6–9: History, Swipe, Timeline, Ballot

function S6History({ tweaks }) {
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
    id: "s6", tweaks, mediaRight: true,
    actLabel: "Act II — Denver's Trajectory",
    title: "Denver Had a Better System",
    intro: "This problem wasn't inherited, it was designed.",
    slides
  });
}

function S7Swipe({ tweaks }) {
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

  return React.createElement("section", { id: "s7", style: { background: bone, padding: "80px 0 0" } },
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "0 48px 40px" } },
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
    React.createElement("div", { style: { maxWidth: 1200, margin: "0 auto", padding: "32px 48px 60px" } },
      React.createElement("p", { style: { fontSize: 15, color: "#444", lineHeight: 1.75, maxWidth: 680 } },
        "The 1880s footprint sits inside a postwar city that grew far past it without bringing the system along. Most mid-sized American cities followed the same path with a walkable urban core that was then surrounded by decades of car-oriented growth. With no coherent mechanism to extend the sidewalk system outward, the system crumbled."
      )
    )
  );
}

function S8Timeline({ tweaks }) {
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
    style: { background: "#fff", padding: "80px 48px" }
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
            position: "absolute", left: 120, top: 0, bottom: 0,
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
                width: 120, flexShrink: 0, paddingRight: 20,
                textAlign: "right", fontSize: 12, fontWeight: 700,
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

function S9Ballot({ tweaks }) {
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
      React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 } },
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
    id: "s9", tweaks, mediaRight: false,
    actLabel: "Act II — Denver's Trajectory",
    title: "How Initiative 307 Won",
    intro: "The bypass, the bundle, the ballot.",
    slides
  });
}

Object.assign(window, { S6History, S7Swipe, S8Timeline, S9Ballot });
