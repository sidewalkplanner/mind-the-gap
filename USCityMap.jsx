function USCityMap({ models, activeModel }) {
  const activeColor = "#B2542C";
  const inactiveColor = "#A8A39A";
  const outlineFill = "rgba(190,185,175,0.22)";
  const outlineStroke = "rgba(80,75,65,0.40)";
  const dotStroke = "#F0EDE8";
  const cities = {
    "Spanish Fork, UT": [266.9, 260.1], "Maitland, FL": [727.0, 475.8], "Lincoln, NE": [477.7, 265.1], "Boston, MA": [825.5, 191.5],
    "Payette, ID": [209.9, 173.1], "Westminster, CO": [350.8, 270.4], "Englewood, CO": [368.8, 288.4], "Baker City, OR": [201.1, 157.7],
    "Denver, CO (post-Initiative 307)": [359.8, 279.4], "Ann Arbor, MI": [655.3, 226.7], "East Grand Rapids, MI": [628.5, 217.4],
    "Berkeley, CA (Measure FF)": [108.8, 267.9], "Ithaca, NY (five Sidewalk Improvement Districts)": [752.6, 207.2], "Minneapolis, MN": [523.6, 186.5],
    "Cheney, WA": [215.8, 109.2], "Seattle, WA": [157.9, 92.1]
  };
  const usPath = "M73 118 L92 89 L150 98 L196 85 L255 100 L323 103 L397 126 L455 129 L506 126 L560 149 L615 155 L651 138 L706 150 L762 133 L806 155 L862 158 L896 181 L905 228 L879 254 L886 297 L863 330 L814 359 L768 374 L709 385 L648 399 L614 420 L565 426 L505 420 L460 434 L389 440 L332 448 L274 434 L229 414 L182 391 L152 356 L119 336 L91 294 L85 256 L58 218 Z";
  const activeCities = new Set(models[activeModel].cities);
  return React.createElement("div", { style: { position: "relative", width: "100%" } },
    React.createElement("svg", { viewBox: "0 0 975 610", style: { width: "100%", height: "auto", display: "block" }, role: "img", "aria-label": `US locator map highlighting example cities for ${models[activeModel].name} model` },
      React.createElement("path", { d: usPath, fill: outlineFill, stroke: outlineStroke, strokeWidth: 1.2, strokeLinejoin: "round" }),
      Object.entries(cities).map(([name, [x, y]]) => activeCities.has(name) ? null : React.createElement("circle", { key: `i-${name}`, cx: x, cy: y, r: 5, fill: inactiveColor, stroke: dotStroke, strokeWidth: 1.5 })),
      Object.entries(cities).map(([name, [x, y]]) => !activeCities.has(name) ? null : React.createElement("g", { key: `a-${name}` },
        React.createElement("circle", { cx: x, cy: y, r: 17, fill: activeColor, opacity: 0.18 }),
        React.createElement("circle", { cx: x, cy: y, r: 8, fill: activeColor, stroke: dotStroke, strokeWidth: 2 })
      ))
    ),
    React.createElement("div", { style: { fontSize: 11, color: "#999", fontStyle: "italic", textAlign: "center", marginTop: 8 } }, "Example cities for the selected model")
  );
}


