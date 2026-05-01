
// Sidecar.jsx — scroll-driven sidecar block (text left/right, sticky media)
// Props: slides=[{text, visual}], mediaRight=bool, title, id

function MapPlaceholder({ label, sublabel, color, layers }) {
  const navy = "#1B3A4B";
  return React.createElement("div", {
    style: {
      width: "100%", height: "100%", minHeight: 380,
      background: "#D6D0C8", position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
    }
  },
    // Grid lines
    React.createElement("svg", {
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 },
      viewBox: "0 0 400 300", preserveAspectRatio: "xMidYMid slice"
    },
      React.createElement("defs", null,
        React.createElement("pattern", { id: `grid-${label}`, width: 40, height: 40, patternUnits: "userSpaceOnUse" },
          React.createElement("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: navy, strokeWidth: 0.5 })
        )
      ),
      React.createElement("rect", { width: "100%", height: "100%", fill: `url(#grid-${label})` }),
      // Fake street lines
      React.createElement("line", { x1: 80, y1: 0, x2: 80, y2: 300, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      React.createElement("line", { x1: 200, y1: 0, x2: 200, y2: 300, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      React.createElement("line", { x1: 320, y1: 0, x2: 320, y2: 300, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      React.createElement("line", { x1: 0, y1: 80, x2: 400, y2: 80, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      React.createElement("line", { x1: 0, y1: 160, x2: 400, y2: 160, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      React.createElement("line", { x1: 0, y1: 240, x2: 400, y2: 240, stroke: "#fff", strokeWidth: 2.5, opacity: 0.5 }),
      // Colored sidewalk segments
      ...(layers || []).map((l, i) =>
        React.createElement("line", {
          key: i, x1: l.x1, y1: l.y1, x2: l.x2, y2: l.y2,
          stroke: l.color, strokeWidth: 3, opacity: 0.9
        })
      )
    ),
    React.createElement("div", {
      style: {
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(27,58,75,0.08) 0%, rgba(27,58,75,0.02) 100%)"
      }
    }),
    React.createElement("div", {
      style: {
        background: "rgba(27,58,75,0.82)", color: "#EDE6DA",
        padding: "10px 18px", borderRadius: 6, textAlign: "center",
        fontFamily: "inherit", maxWidth: "80%"
      }
    },
      React.createElement("div", { style: { fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, marginBottom: 4 } }, "MAP PLACEHOLDER"),
      React.createElement("div", { style: { fontSize: 14, fontWeight: 600 } }, label),
      sublabel && React.createElement("div", { style: { fontSize: 12, opacity: 0.75, marginTop: 3 } }, sublabel)
    )
  );
}

function Sidecar({ id, actLabel, title, intro, slides, mediaRight = true, tweaks }) {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const textPanelRef = React.useRef(null);
  const slideRefs = React.useRef([]);

  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = slideRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveSlide(idx);
          }
        });
      },
      { threshold: 0.6, rootMargin: "-20% 0px -20% 0px" }
    );
    slideRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, [slides.length]);

  const textSide = React.createElement("div", {
    ref: textPanelRef,
    style: { flex: "0 0 42%", padding: "0 0 200px 0" }
  },
    actLabel && React.createElement("div", {
      style: {
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
        textTransform: "uppercase", color: rust, marginBottom: 12
      }
    }, actLabel),
    title && React.createElement("h2", {
      style: {
        fontSize: 30, fontWeight: 800, color: navy,
        margin: "0 0 20px 0", lineHeight: 1.15
      }
    }, title),
    intro && React.createElement("p", {
      style: { fontSize: 16, color: "#444", lineHeight: 1.7, marginBottom: 32 }
    }, intro),
    slides.map((slide, i) =>
      React.createElement("div", {
        key: i,
        ref: el => slideRefs.current[i] = el,
        style: { marginBottom: 80, paddingTop: 20 }
      },
        slide.slideLabel && React.createElement("div", {
          style: {
            fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
            color: rust, fontWeight: 700, marginBottom: 8
          }
        }, `0${i + 1}  ${slide.slideLabel}`),
        slide.headline && React.createElement("h3", {
          style: { fontSize: 20, fontWeight: 700, color: navy, margin: "0 0 12px 0", lineHeight: 1.25 }
        }, slide.headline),
        ...(slide.paragraphs || []).map((p, j) =>
          React.createElement("p", {
            key: j,
            style: { fontSize: 15.5, color: "#333", lineHeight: 1.72, marginBottom: 12 }
          }, p)
        ),
        slide.stat && React.createElement("div", {
          style: {
            margin: "20px 0", padding: "16px 20px",
            background: bone, borderLeft: `4px solid ${rust}`,
            borderRadius: "0 6px 6px 0"
          }
        },
          React.createElement("div", { style: { fontSize: 28, fontWeight: 800, color: rust } }, slide.stat),
          React.createElement("div", { style: { fontSize: 13, color: "#555", marginTop: 2 } }, slide.statLabel)
        )
      )
    )
  );

  const mediaSide = React.createElement("div", {
    style: {
      flex: "0 0 52%", position: "sticky", top: 72, alignSelf: "flex-start",
      height: "calc(100vh - 92px)", overflow: "hidden", borderRadius: 10,
      boxShadow: "0 4px 24px rgba(27,58,75,0.12)"
    }
  },
    slides.map((slide, i) =>
      React.createElement("div", {
        key: i,
        style: {
          position: "absolute", inset: 0,
          opacity: activeSlide === i ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: activeSlide === i ? "auto" : "none"
        }
      }, slide.visual)
    ),
    // Slide counter dots
    slides.length > 1 && React.createElement("div", {
      style: {
        position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6, zIndex: 10
      }
    },
      slides.map((_, i) =>
        React.createElement("div", {
          key: i,
          onClick: () => setActiveSlide(i),
          style: {
            width: 8, height: 8, borderRadius: "50%",
            background: activeSlide === i ? rust : "rgba(255,255,255,0.5)",
            cursor: "pointer", transition: "background 0.2s"
          }
        })
      )
    )
  );

  return React.createElement("section", { id },
    React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: mediaRight ? "row" : "row-reverse",
        gap: 40, padding: "60px 48px 0",
        maxWidth: 1200, margin: "0 auto"
      }
    },
      textSide, mediaSide
    )
  );
}

Object.assign(window, { Sidecar, MapPlaceholder });
