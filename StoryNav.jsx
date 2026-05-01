
// StoryNav — sticky top nav + progress bar + jump links
const SECTIONS = [
  { id: "s1",  label: "Cover" },
  { id: "s2",  label: "About" },
  { id: "s3",  label: "The Network" },
  { id: "s4",  label: "Era & Gap" },
  { id: "s5",  label: "Equity" },
  { id: "s6",  label: "History" },
  { id: "s7",  label: "Lost It" },
  { id: "s8",  label: "Timeline" },
  { id: "s9",  label: "307 Won" },
  { id: "s10", label: "Today" },
  { id: "s11", label: "Pathways" },
  { id: "s12", label: "Diagnose" },
  { id: "s13", label: "Credits" },
];

function StoryNav({ tweaks }) {
  const [progress, setProgress] = React.useState(0);
  const [active, setActive] = React.useState("s1");
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? scrolled / total : 0);

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
    setMenuOpen(false);
  };

  const navy = tweaks?.primaryColor || "#1B3A4B";
  const rust = tweaks?.accentColor || "#B2542C";
  const bone = tweaks?.bgColor || "#EDE6DA";

  return React.createElement(React.Fragment, null,
    // Top nav bar
    React.createElement("nav", {
      style: {
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: navy, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 52, fontFamily: "inherit",
        boxShadow: "0 2px 12px rgba(0,0,0,0.18)"
      }
    },
      React.createElement("span", { style: { fontWeight: 700, fontSize: 15, letterSpacing: "0.04em", opacity: 0.95 } }, "MIND THE GAP"),
      // Desktop links
      React.createElement("div", { style: { display: "flex", gap: 4, alignItems: "center" } },
        SECTIONS.map(s =>
          React.createElement("button", {
            key: s.id,
            onClick: () => scrollTo(s.id),
            style: {
              background: active === s.id ? rust : "transparent",
              border: "none", color: "#fff", cursor: "pointer",
              padding: "4px 9px", borderRadius: 4, fontSize: 11.5,
              fontFamily: "inherit", fontWeight: active === s.id ? 700 : 400,
              opacity: active === s.id ? 1 : 0.72, transition: "all 0.15s",
              letterSpacing: "0.02em"
            }
          }, s.label)
        )
      )
    ),
    // Progress bar
    React.createElement("div", {
      style: {
        position: "fixed", top: 52, left: 0, right: 0, zIndex: 999,
        height: 3, background: "rgba(255,255,255,0.15)"
      }
    },
      React.createElement("div", {
        style: {
          height: "100%", background: rust,
          width: `${progress * 100}%`, transition: "width 0.1s"
        }
      })
    )
  );
}

Object.assign(window, { StoryNav, STORY_SECTIONS: SECTIONS });
