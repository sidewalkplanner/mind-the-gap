// ─────────────────────────────────────────────────────────────────────────────
// USCityMap — drop-in locator map for S11Pathways "Eight Reform Pathways"
// Renders all 16 example cities; cities in the active model recolor to rust
// with a halo. Smooth 0.3s crossfade on toggle.
//
// US outline derived from US Census Bureau cartographic boundaries
// (us-atlas@3.0.1, projected with d3.geoAlbersUsa, simplified to ~250 points)
// Continental US only; viewBox matches d3's default 975×610.
//
// INTEGRATION (Sections.jsx):
//   1. Paste this component above S11Pathways
//   2. In S11Pathways, replace the placeholder SVG block (~lines 1301–1311):
//        the inline <svg viewBox="0 0 400 250"> with the polygon path and
//        the italic "Map: example cities..." caption
//      with a single call:
//        React.createElement(USCityMap, { models, activeModel })
//      Keep the surrounding container and the bulleted "Example cities" list.
// ─────────────────────────────────────────────────────────────────────────────

function USCityMap({ models, activeModel }) {
  // Active highlight: single rust color across all models.
  // To switch to per-model color instead, swap the line below for:
  //   const activeColor = models[activeModel].color;
  const activeColor = "#B2542C";

  const inactiveColor = "#A8A39A";
  const outlineFill   = "rgba(190,185,175,0.22)";
  const outlineStroke = "rgba(80,75,65,0.40)";
  const dotStroke     = "#F0EDE8";   // matches S11 right-column bg

  // d3.geoAlbersUsa projection, default 975×610 viewport.
  // Denver/Westminster/Englewood manually spread for visual separation
  // (real coords are within ~4px of each other; offset to ~13px for legibility).
  const cities = {
    "Spanish Fork, UT": [266.9, 260.1],
    "Maitland, FL": [727.0, 475.8],
    "Lincoln, NE": [477.7, 265.1],
    "Boston, MA": [825.5, 191.5],
    "Payette, ID": [209.9, 173.1],
    "Westminster, CO": [350.8, 270.4],
    "Englewood, CO": [368.8, 288.4],
    "Baker City, OR": [201.1, 157.7],
    "Denver, CO (post-Initiative 307)": [359.8, 279.4],
    "Ann Arbor, MI": [655.3, 226.7],
    "East Grand Rapids, MI": [628.5, 217.4],
    "Berkeley, CA (Measure FF)": [108.8, 267.9],
    "Ithaca, NY (five Sidewalk Improvement Districts)": [752.6, 207.2],
    "Minneapolis, MN": [523.6, 186.5],
    "Cheney, WA": [215.8, 109.2],
    "Seattle, WA": [157.9, 92.1],
  };

  // Continental US outline — US Census cartographic boundaries 2017,
  // simplified to ~250 points. AK and HI omitted (no example cities there).
  const usPath = "M66.0 23.6L68.6 19.3L76.9 27.1L88.9 30.7L92.0 35.6L94.6 32.9L95.3 39.1L91.0 42.7L91.1 40.4L83.8 48.2L85.7 48.9L87.7 48.6L84.6 47.6L96.6 39.0L92.4 52.4L90.1 50.6L89.1 55.2L87.6 51.3L87.0 53.6L89.4 55.7L96.1 51.9L96.5 44.8L101.5 38.7L100.5 32.6L100.0 36.3L98.2 34.1L100.9 30.4L97.5 26.4L102.4 24.4L100.0 14.4L210.5 41.7L326.0 60.5L404.4 67.8L484.0 70.8L510.8 70.8L510.7 62.2L513.7 62.5L518.6 76.5L530.7 78.8L531.5 81.3L543.7 78.5L549.1 80.2L553.4 87.3L558.1 84.0L565.8 90.7L576.0 85.7L578.1 88.9L597.6 89.5L577.1 101.1L558.9 119.4L561.1 121.7L578.3 114.6L577.0 122.8L580.2 120.5L585.0 123.2L606.9 111.9L621.7 99.8L625.9 101.1L618.6 106.1L615.6 116.6L620.1 111.5L618.2 114.7L624.0 112.5L633.1 120.8L641.8 121.6L651.8 115.2L666.6 111.5L670.0 111.0L669.8 117.6L676.5 118.3L683.4 114.8L682.5 123.0L689.0 126.3L693.2 123.6L694.8 127.1L681.2 128.8L676.5 126.6L675.7 131.6L662.9 127.3L660.4 130.5L651.3 131.9L646.8 140.0L647.3 133.5L641.4 138.5L639.9 135.4L626.9 162.1L628.1 166.1L641.6 147.6L635.5 165.1L630.8 195.3L634.7 218.8L640.4 229.8L644.9 231.4L655.1 224.2L659.8 210.2L658.9 198.0L652.4 184.3L654.9 159.7L664.8 147.2L666.1 157.6L667.3 145.5L674.2 141.9L670.5 138.3L671.7 133.8L684.6 135.1L698.8 141.7L702.4 162.5L694.1 177.1L699.0 180.2L702.4 172.1L709.9 167.7L715.2 172.4L721.5 191.2L720.9 199.8L718.5 202.2L719.1 198.7L716.3 199.4L708.5 222.3L725.6 227.4L737.5 223.2L776.4 192.1L780.3 186.1L774.8 176.0L783.8 171.7L809.0 169.2L819.3 161.1L816.9 154.4L819.3 152.5L814.7 150.3L815.0 146.4L832.3 124.4L886.1 110.5L887.8 103.3L891.8 101.2L894.8 103.1L900.0 86.1L897.7 79.7L899.1 67.5L905.9 47.6L912.5 52.3L919.7 45.9L929.7 49.7L938.7 79.9L944.6 79.9L946.1 87.0L949.5 89.7L952.0 88.1L957.1 94.8L955.0 99.4L951.5 99.6L950.2 105.6L946.8 104.3L943.8 110.3L941.4 109.7L942.2 113.0L938.9 113.7L938.1 109.7L935.4 111.3L937.3 119.8L931.0 110.1L928.5 112.6L930.2 122.9L927.1 126.5L924.8 124.8L919.7 132.2L918.1 130.9L911.2 143.3L909.6 155.2L914.3 158.4L910.0 168.6L915.0 169.0L921.7 177.7L928.8 175.1L923.6 170.0L926.7 169.7L930.1 174.2L931.0 176.8L930.6 179.8L929.7 177.6L924.7 179.9L922.7 182.4L916.1 187.6L920.0 183.3L917.9 179.4L915.4 185.3L911.8 187.6L910.5 184.0L909.1 188.3L910.5 183.2L906.7 181.2L907.6 190.7L884.7 198.4L874.2 207.9L873.0 213.0L894.7 199.6L899.5 201.8L903.1 198.9L895.5 205.8L883.4 214.4L871.7 219.3L869.2 216.4L866.5 221.8L871.5 221.5L873.2 237.3L864.4 258.6L862.9 253.8L850.4 249.5L849.4 244.3L848.6 245.5L849.3 249.3L854.8 258.0L861.3 262.7L863.8 271.1L854.2 304.2L852.6 296.6L855.5 283.6L851.6 285.3L850.2 275.4L848.9 278.3L847.7 275.6L847.6 278.7L844.0 277.6L841.8 271.3L846.4 271.3L840.3 269.8L841.6 263.9L839.0 266.3L839.4 261.7L840.1 262.9L841.9 262.2L839.3 259.3L842.6 248.9L838.5 255.8L836.8 254.0L836.3 258.8L833.5 257.8L838.0 262.7L836.2 268.8L843.8 284.2L829.9 277.6L826.1 279.8L827.5 273.7L824.5 278.6L825.8 280.9L829.6 278.7L831.9 282.6L845.9 287.3L845.1 294.0L833.9 287.2L846.4 294.9L848.0 300.4L845.1 298.9L846.9 301.5L844.5 302.6L849.0 307.5L841.9 303.8L836.6 304.6L841.3 304.4L846.3 310.5L854.9 308.3L868.4 331.7L859.7 318.9L856.8 316.9L862.3 326.4L854.4 322.8L857.3 325.6L850.1 326.4L853.3 327.6L848.7 330.8L845.5 325.1L847.4 332.7L858.0 329.2L859.9 336.6L861.9 328.7L865.7 336.1L859.7 344.3L853.4 344.7L850.9 342.0L853.1 340.5L850.1 342.1L851.6 344.7L843.0 343.4L854.2 347.1L849.6 355.0L846.2 354.7L850.5 355.8L855.0 351.4L858.7 352.1L855.9 360.3L853.1 360.2L856.1 360.9L857.5 357.7L862.3 349.7L862.9 350.0L856.1 362.4L846.8 362.6L838.0 370.5L833.4 384.1L825.4 384.5L818.2 389.5L811.0 407.9L806.9 408.6L800.6 419.0L792.2 422.9L793.0 426.9L787.4 428.4L789.5 429.8L781.4 442.3L781.3 454.4L778.3 460.2L782.8 475.7L792.8 496.3L806.1 513.6L806.6 521.9L822.1 549.0L823.8 574.5L821.8 573.7L820.9 583.7L824.0 577.8L823.8 580.3L821.6 586.6L817.9 591.7L816.1 593.1L819.7 586.1L806.9 589.7L800.6 577.8L791.9 575.4L786.5 564.2L779.2 558.4L780.4 552.0L777.3 557.8L765.2 540.9L767.0 541.0L770.6 531.9L767.9 533.5L764.7 529.8L767.4 534.3L765.1 539.2L761.9 533.4L761.9 510.2L758.9 505.1L754.0 506.1L739.3 489.9L727.4 487.4L726.4 492.2L711.8 498.0L714.2 499.9L720.1 496.0L713.7 500.8L707.4 499.8L705.7 493.6L688.8 486.2L655.2 492.0L659.1 490.2L653.4 481.7L651.6 490.2L628.5 490.7L618.5 499.8L621.9 502.7L625.7 497.6L628.2 501.3L631.1 499.7L627.3 507.2L622.5 508.2L626.3 513.4L636.6 517.3L628.8 523.6L631.1 517.7L619.8 515.3L612.6 521.1L608.1 515.4L599.9 522.5L591.5 518.6L594.3 516.3L587.7 513.7L584.2 507.9L579.1 508.6L580.0 505.9L572.8 507.9L576.1 511.6L572.0 512.8L547.7 508.4L522.2 518.2L527.7 514.4L522.1 514.3L522.5 508.6L518.4 510.5L519.9 519.4L514.6 523.9L523.1 518.8L482.1 546.6L473.5 558.1L470.0 570.2L474.2 592.2L470.1 581.5L471.3 581.0L469.5 574.0L470.4 563.6L476.2 551.0L489.0 539.7L484.3 542.0L482.5 539.9L479.3 546.3L473.6 547.0L477.4 548.1L474.1 553.0L467.5 552.3L472.7 555.8L469.4 564.3L465.0 566.0L469.2 565.7L468.5 580.3L474.4 595.1L468.2 597.4L464.1 593.5L451.8 592.1L434.9 584.3L427.9 569.9L427.1 557.7L412.0 540.8L405.1 521.7L391.5 506.3L373.4 502.6L366.4 505.5L356.8 521.6L350.7 519.8L330.0 503.6L324.4 481.9L297.7 452.6L264.2 448.2L262.9 458.4L208.2 450.5L142.3 411.7L145.1 407.0L99.5 401.7L96.5 382.3L87.9 371.0L82.1 369.3L81.7 362.5L71.0 358.1L65.0 349.3L48.8 344.3L46.5 340.5L49.8 328.1L46.4 325.7L46.9 320.1L34.8 296.1L39.2 282.7L31.4 274.3L33.3 260.8L39.3 270.3L35.8 257.2L38.9 254.7L35.7 253.7L33.2 259.9L26.2 253.5L28.5 247.8L20.1 229.8L24.0 209.2L18.9 193.1L31.3 172.9L32.8 139.9L45.4 120.7L63.8 68.9L71.0 70.1L63.0 67.6L65.5 59.8L64.7 65.5L65.6 65.8L69.7 59.0L65.9 57.2L66.3 53.6L70.7 53.9L67.5 50.7L65.8 52.9L66.0 23.6Z";

  const activeCities = new Set(models[activeModel].cities);

  return React.createElement("div",
    { style: { position: "relative", width: "100%" } },

    React.createElement("svg", {
      viewBox: "0 0 975 610",
      style: { width: "100%", height: "auto", display: "block" },
      xmlns: "http://www.w3.org/2000/svg",
      role: "img",
      "aria-label": `US locator map highlighting example cities for ${models[activeModel].name} model`
    },
      React.createElement("path", {
        d: usPath,
        fill: outlineFill,
        stroke: outlineStroke,
        strokeWidth: 1.2,
        strokeLinejoin: "round"
      }),

      // Inactive dots
      Object.entries(cities).map(([name, [x, y]]) => {
        if (activeCities.has(name)) return null;
        return React.createElement("circle", {
          key: `i-${name}`,
          cx: x, cy: y, r: 5,
          fill: inactiveColor,
          stroke: dotStroke,
          strokeWidth: 1.5,
          style: { transition: "all 0.3s ease" }
        },
          React.createElement("title", null, name)
        );
      }),

      // Active dots: halo + filled core
      Object.entries(cities).map(([name, [x, y]]) => {
        if (!activeCities.has(name)) return null;
        return React.createElement("g", { key: `a-${name}` },
          React.createElement("circle", {
            cx: x, cy: y, r: 17,
            fill: activeColor,
            opacity: 0.18,
            style: { transition: "all 0.3s ease" }
          }),
          React.createElement("circle", {
            cx: x, cy: y, r: 8,
            fill: activeColor,
            stroke: dotStroke,
            strokeWidth: 2,
            style: { transition: "all 0.3s ease" }
          },
            React.createElement("title", null, name)
          )
        );
      })
    ),

    React.createElement("div", {
      style: {
        fontSize: 11, color: "#999", fontStyle: "italic",
        textAlign: "center", marginTop: 8
      }
    }, "Example cities for the selected model")
  );
}
