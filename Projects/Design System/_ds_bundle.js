/* @ds-bundle: {"format":4,"namespace":"ReSOURCEDesignSystem_36d802","components":[{"name":"AspectCard","sourcePath":"components/core/AspectCard.jsx"},{"name":"AspectCardBlank","sourcePath":"components/core/AspectCard.jsx"},{"name":"ASPECT_CARD_SIZE","sourcePath":"components/core/AspectCard.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"CodeBlock","sourcePath":"components/core/CodeBlock.jsx"},{"name":"ColourWheel","sourcePath":"components/core/ColourWheel.jsx"},{"name":"Control","sourcePath":"components/core/Control.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"LogoConstruction","sourcePath":"components/core/LogoConstruction.jsx"},{"name":"LOGO_MARK_BOX","sourcePath":"components/core/LogoMark.jsx"},{"name":"LogoMark","sourcePath":"components/core/LogoMark.jsx"},{"name":"Mark","sourcePath":"components/core/Mark.jsx"},{"name":"Note","sourcePath":"components/core/Note.jsx"},{"name":"Pill","sourcePath":"components/core/Pill.jsx"},{"name":"PillSet","sourcePath":"components/core/PillSet.jsx"},{"name":"PositionNode","sourcePath":"components/core/PositionNode.jsx"},{"name":"SetLabel","sourcePath":"components/core/SetLabel.jsx"},{"name":"SpecTable","sourcePath":"components/core/SpecTable.jsx"},{"name":"Specimen","sourcePath":"components/core/Specimen.jsx"},{"name":"SwatchRow","sourcePath":"components/core/SwatchRow.jsx"},{"name":"POSITIONS","sourcePath":"components/core/positions.js"},{"name":"BASE_HEX","sourcePath":"components/core/positions.js"},{"name":"BLEND_HEX","sourcePath":"components/core/positions.js"}],"sourceHashes":{"components/core/AspectCard.jsx":"db5c8f5e4e72","components/core/Card.jsx":"30d5e96dc800","components/core/CodeBlock.jsx":"c9dfefa55971","components/core/ColourWheel.jsx":"2e42a757f6ab","components/core/Control.jsx":"792144f6e67b","components/core/Eyebrow.jsx":"a5650657a314","components/core/LogoConstruction.jsx":"21b4313d67e5","components/core/LogoMark.jsx":"ef0e37c033f3","components/core/Mark.jsx":"2883096fc14f","components/core/Note.jsx":"3cab488bbc4a","components/core/Pill.jsx":"ed001f0bf123","components/core/PillSet.jsx":"ecb56b232209","components/core/PositionNode.jsx":"b266448644ce","components/core/SetLabel.jsx":"4519f0897632","components/core/SpecTable.jsx":"8092424ed825","components/core/Specimen.jsx":"7631b9b832bf","components/core/SwatchRow.jsx":"ad3b39d05c16","components/core/positions.js":"a5f3db9d012b","data/aspect-states.js":"a09c17cd1647","data/deck-data.js":"6fb6823cace3","lib/aspect-render.js":"3e5a4d08d3b7","lib/masters-nav.js":"2a8994e71f4a","lib/sets.js":"7c4210b34b9e"},"inlinedExternals":[],"unexposedExports":[{"name":"polarOf","sourcePath":"components/core/positions.js"},{"name":"positionAt","sourcePath":"components/core/positions.js"}]} */

(() => {

const __ds_ns = (window.ReSOURCEDesignSystem_36d802 = window.ReSOURCEDesignSystem_36d802 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Card. Surface g06 on the black page, one structural border, radius-md. */
function Card({
  padding = 'lg',
  as: Tag = 'div',
  style,
  children,
  ...rest
}) {
  const pad = {
    sm: 'var(--space-sm)',
    md: 'var(--space-md)',
    lg: 'var(--space-lg)'
  }[padding];
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-md)',
      padding: pad,
      color: 'var(--text-primary)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/CodeBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* CodeBlock. Page-black inset on a card, mono at caption size. */
function CodeBlock({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("pre", _extends({
    style: {
      background: 'var(--surface-page)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-md)',
      overflowX: 'auto',
      margin: 'var(--space-md) 0 0',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-primary)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { CodeBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/CodeBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Control.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Control. The system's only button, lifted from Colour FLOWER, 19 August
   2026, which is where it was first defined. Page-black fill, one 1px g24
   border, radius-sm, mono caption uppercase, 44px minimum in both directions
   because input is touch first.

   Three states and nothing else. Off is g48 text on a g24 border, on is white
   text on the same border, and active, meaning the option currently in force,
   lifts the border to g66. Unavailable holds its state and drops to 0.4
   opacity rather than changing colour. Colour never enters a control: a
   position colour is a stroke on a diagram shape, not a UI accent.

   Retired: the claim that Re.SOURCE has never defined a button. The Flower
   defines one, so it is recorded here rather than reinvented per build. */

function Control({
  on = true,
  active = false,
  disabled = false,
  square = false,
  row = false,
  meta,
  as: Tag = 'button',
  style,
  children,
  ...rest
}) {
  const shared = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-sm)',
    minHeight: 44,
    font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
    textTransform: 'uppercase',
    color: on || active ? 'var(--text-primary)' : 'var(--g48)',
    borderRadius: 'var(--radius-sm)',
    opacity: disabled ? 0.4 : 1,
    cursor: disabled ? 'default' : 'pointer',
    touchAction: 'manipulation',
    transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease), background var(--dur) var(--ease)'
  };
  const box = row ? {
    ...shared,
    justifyContent: 'space-between',
    width: '100%',
    padding: '0 var(--space-md)',
    background: 'transparent',
    border: 0,
    textAlign: 'left'
  } : {
    ...shared,
    justifyContent: 'center',
    height: 44,
    minWidth: 44,
    width: square ? 44 : undefined,
    padding: square ? 0 : '0 var(--space-md)',
    background: 'var(--surface-page)',
    border: `1px solid ${active ? 'var(--g66)' : 'var(--surface-border)'}`
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    type: Tag === 'button' ? 'button' : undefined,
    disabled: Tag === 'button' ? disabled : undefined,
    style: {
      ...box,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", null, children), row && meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--g48)'
    }
  }, meta) : null);
}
Object.assign(__ds_scope, { Control });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Control.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Eyebrow. Mono, caption size, uppercase, secondary grey. The small meta layer. */
function Eyebrow({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      margin: 0,
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      fontWeight: 400,
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/LogoConstruction.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* LogoConstruction. The construction drawing for LogoMark, derived from the same
   numbers the mark itself is drawn from. Two views, 'family' and 'marker', both
   interactive: hovering a part lights it and drops everything else back, clicking
   pins it, and the readout under the drawing carries that part's figure, its units
   and the one line that explains it.

   The pattern is meant to be copied. A schematic is a PARTS array — each entry an
   id, a label, a figure, its units, a note and an anchor for its label — plus a
   render that wraps each piece in <Part>. Nothing about the interaction knows what
   it is drawing, so any other schematic in the system can adopt it by supplying a
   different PARTS array and geometry.

   Nothing here is a literal copy of the mark's figures. U is the unit and every
   radius is a multiple or half-multiple of it, so if the mark's unit changes the
   drawing follows. */

const U = 12;
const R = {
  core: 18,
  ringIn: 36,
  base: 42,
  ringOut: 48,
  apex: 60
};
const HB = U / 2 * Math.sqrt(3);
const SIX = [0, 1, 2, 3, 4, 5];
const G = '#3d3d3d',
  W = '#FFFFFF',
  C = '#888888';
const MONO = {
  fontFamily: "'JetBrains Mono',ui-monospace,monospace"
};
const n2 = v => Math.round(v * 100) / 100;
/* The two large triangles are drawn in a counterpart pair, six positions apart, one for the
   upward figure and one for the downward. Indices and hexes only: the words belong to LINGO. */
const BIG = [{
  id: 'bigUp',
  i: 12,
  hex: '#00D460'
}, {
  id: 'bigDown',
  i: 6,
  hex: '#FF0000'
}];

/* Hover and pin in one place, so both views and the parts list share a single state. */
function useSchematic() {
  const [hover, setHover] = React.useState(null);
  const [pin, setPin] = React.useState(null);
  const active = hover || pin;
  const toggle = id => setPin(p => p === id ? null : id);
  return {
    hover,
    pin,
    active,
    setHover,
    setPin,
    toggle
  };
}

/* One part of a drawing. Visible geometry first, then the same geometry again as a wide
   transparent stroke, because a 1px construction line is otherwise impossible to hit. */
function Part({
  id,
  s,
  hit,
  children
}) {
  const off = s.active && s.active !== id;
  return /*#__PURE__*/React.createElement("g", {
    opacity: off ? 0.09 : 1,
    style: {
      transition: 'opacity 160ms cubic-bezier(0.25,0,0,1)',
      cursor: 'pointer'
    },
    onPointerEnter: () => s.setHover(id),
    onPointerLeave: () => s.setHover(null),
    onClick: e => {
      e.stopPropagation();
      s.toggle(id);
    }
  }, children, /*#__PURE__*/React.createElement("g", {
    style: {
      pointerEvents: 'stroke'
    }
  }, hit));
}

/* A label that must cross coloured strokes, so it carries the halo the law asks for. */
function Tag({
  x,
  y,
  anchor = 'middle',
  fill = W,
  children
}) {
  return /*#__PURE__*/React.createElement("text", {
    x: x,
    y: y,
    textAnchor: anchor,
    fill: fill,
    fontSize: "18",
    style: MONO,
    stroke: "#000000",
    strokeWidth: "6",
    strokeLinejoin: "round",
    paintOrder: "stroke fill",
    pointerEvents: "none"
  }, children);
}
const FAMILY = [{
  id: 'box',
  label: 'Box',
  figure: '120 × 120',
  units: '10u',
  note: 'The authoring square. The apex circle is exactly half of it, so the mark is quoted by its box and not by its ink.'
}, {
  id: 'units',
  label: 'Unit circles',
  figure: 'r 12 · 24 · 36 · 48 · 60',
  units: '1u to 5u',
  note: 'The five unit steps. Every radius in the mark is one of these or a half-step between two of them.'
}, {
  id: 'halves',
  label: 'Half-steps',
  figure: 'r 18 · r 42',
  units: '1.5u · 3.5u',
  note: 'The only two the mark needs: the centre disc, and the circle the triangle bases stand on.'
}, {
  id: 'spokes',
  label: 'Spokes',
  figure: '6 × 60°',
  units: '—',
  note: 'The six Base directions, drawn from the centre out to the apex circle.'
}, {
  id: 'markers',
  label: 'Marker circles',
  figure: 'r 12 on r 48',
  units: '1u',
  note: 'One per Base position. Each inscribes a triangle, which fixes its apex, its base and all three angles at once.'
}, {
  id: 'angle',
  label: 'Angle',
  figure: '60°',
  units: '—',
  note: 'Every angle in an equilateral, and the step from one Base position to the next.'
}, {
  id: 'core',
  label: 'Centre disc',
  figure: 'r 18',
  units: '1.5u',
  note: 'The midpoint of 1u and 2u. Its radius is also the width of the annulus around it.'
}, {
  id: 'ringIn',
  label: 'Ring inner',
  figure: 'r 36',
  units: '3u',
  note: 'A family step. Taken with the outer ring it gives a stroke of exactly 1u.'
}, {
  id: 'ringOut',
  label: 'Ring outer',
  figure: 'r 48',
  units: '4u',
  note: 'A family step, and the circle every marker circle is centred on.'
}, {
  id: 'tri',
  label: 'Base triangles',
  figure: 'apex r 60 · base r 42',
  units: '—',
  note: 'Six equilaterals, each inscribed in its own 1u marker circle. Side 12√3, computed at draw time rather than typed.'
}, {
  id: 'bigUp',
  label: 'Large triangle · up',
  figure: 'side 60√3 ≈ 104',
  units: '5u circumradius',
  note: 'Corners on three of the six apexes. Its side is the mark’s drawn width, so nothing new is measured. Position 12.'
}, {
  id: 'bigDown',
  label: 'Large triangle · down',
  figure: 'side 60√3 ≈ 104',
  units: '5u circumradius',
  note: 'The counterpart, six positions away. The two together close all six apexes. Position 06.'
}];
const MARKER = [{
  id: 'arcs',
  label: 'Family arcs',
  figure: 'r 36 · 42 · 48 · 60',
  units: '3u to 5u',
  note: 'The same circles as the family view, seen locally around one position.'
}, {
  id: 'circle',
  label: 'Marker circle',
  figure: 'r 12',
  units: '1u',
  note: 'Centred where the spoke crosses r 48. The triangle is inscribed in it.'
}, {
  id: 'tri',
  label: 'Triangle',
  figure: 'side 12√3 ≈ 20.78',
  units: '—',
  note: 'Equilateral by construction, not by eye and not by a base width chosen to look right.'
}, {
  id: 'apex',
  label: 'Apex reach',
  figure: '12',
  units: '1u',
  note: 'An inscribed equilateral reaches one full radius to its apex, which puts the apex on r 60.'
}, {
  id: 'base',
  label: 'Base',
  figure: '6√3 ≈ 10.39 half',
  units: '—',
  note: 'And half a radius the other way, which puts the base on r 42 exactly.'
}];
function Family({
  s
}) {
  const k = 5,
    cx = 300,
    cy = 300,
    p = v => v * k;
  const spin = a => `rotate(${a} ${cx} ${cy})`;
  const tri = `M ${cx},${cy - p(R.apex)} L ${n2(cx + p(HB))},${cy - p(R.base)} L ${n2(cx - p(HB))},${cy - p(R.base)} Z`;
  const arc = p(27),
    hw = R.apex * Math.sin(Math.PI / 3);
  const corner = a => {
    const t = a * Math.PI / 180;
    return `${n2(cx + p(R.apex) * Math.sin(t))},${n2(cy - p(R.apex) * Math.cos(t))}`;
  };
  const bigPath = j => [0, 120, 240].map(a => corner(a + j * 60)).map((pt, i) => i ? `L ${pt}` : `M ${pt}`).join(' ') + ' Z';
  const hitW = 22;
  const ring = (r, vis) => [/*#__PURE__*/React.createElement("circle", _extends({
    key: "v",
    cx: cx,
    cy: cy,
    r: p(r),
    fill: "none"
  }, vis)), /*#__PURE__*/React.createElement("circle", {
    key: "h",
    cx: cx,
    cy: cy,
    r: p(r),
    fill: "none",
    stroke: "transparent",
    strokeWidth: hitW
  })];
  const lab = s.active && FAMILY.find(f => f.id === s.active);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "-40 -56 680 700",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      overflow: 'hidden'
    },
    onClick: () => s.setPin(null)
  }, /*#__PURE__*/React.createElement(Part, {
    id: "box",
    s: s,
    hit: /*#__PURE__*/React.createElement("rect", {
      x: cx - p(60),
      y: cy - p(60),
      width: p(120),
      height: p(120),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("rect", {
    x: cx - p(60),
    y: cy - p(60),
    width: p(120),
    height: p(120),
    fill: "none",
    stroke: G,
    strokeWidth: "1",
    strokeDasharray: "3 5"
  })), /*#__PURE__*/React.createElement(Part, {
    id: "units",
    s: s,
    hit: [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: cx,
      cy: cy,
      r: p(i * U),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, [1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: cx,
    cy: cy,
    r: p(i * U),
    fill: "none",
    stroke: G,
    strokeWidth: "1"
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "halves",
    s: s,
    hit: [R.core, R.base].map(r => /*#__PURE__*/React.createElement("circle", {
      key: r,
      cx: cx,
      cy: cy,
      r: p(r),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, [R.core, R.base].map(r => /*#__PURE__*/React.createElement("circle", {
    key: r,
    cx: cx,
    cy: cy,
    r: p(r),
    fill: "none",
    stroke: G,
    strokeWidth: "1",
    strokeDasharray: "8 6"
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "spokes",
    s: s,
    hit: SIX.map(i => /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: cx,
      y1: cy,
      x2: cx,
      y2: cy - p(R.apex),
      transform: spin(i * 60),
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, SIX.map(i => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: cx,
    y1: cy,
    x2: cx,
    y2: cy - p(R.apex),
    transform: spin(i * 60),
    stroke: G,
    strokeWidth: "1"
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "markers",
    s: s,
    hit: SIX.map(i => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: cx,
      cy: cy - p(R.ringOut),
      r: p(U),
      transform: spin(i * 60),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, SIX.map(i => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: cx,
    cy: cy - p(R.ringOut),
    r: p(U),
    transform: spin(i * 60),
    fill: "none",
    stroke: C,
    strokeWidth: "1"
  }))), BIG.map((b, j) => /*#__PURE__*/React.createElement(Part, {
    key: b.id,
    id: b.id,
    s: s,
    hit: /*#__PURE__*/React.createElement("path", {
      d: bigPath(j),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("path", {
    d: bigPath(j),
    fill: "none",
    stroke: b.hex,
    strokeWidth: s.active === b.id ? 3 : 1.5,
    strokeDasharray: "10 8"
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "angle",
    s: s,
    hit: /*#__PURE__*/React.createElement("path", {
      d: `M ${cx},${cy - arc} A ${arc} ${arc} 0 0 1 ${n2(cx + arc * Math.sin(Math.PI / 3))},${n2(cy - arc * Math.cos(Math.PI / 3))}`,
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("path", {
    d: `M ${cx},${cy - arc} A ${arc} ${arc} 0 0 1 ${n2(cx + arc * Math.sin(Math.PI / 3))},${n2(cy - arc * Math.cos(Math.PI / 3))}`,
    fill: "none",
    stroke: C,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement(Tag, {
    x: n2(cx + arc * 0.36),
    y: n2(cy - arc * 0.98),
    anchor: "start",
    fill: C
  }, "60\xB0")), /*#__PURE__*/React.createElement(Part, {
    id: "ringIn",
    s: s,
    hit: ring(R.ringIn)[1]
  }, ring(R.ringIn, {
    stroke: W,
    strokeWidth: s.active === 'ringIn' ? 3 : 1.5
  })[0]), /*#__PURE__*/React.createElement(Part, {
    id: "ringOut",
    s: s,
    hit: ring(R.ringOut)[1]
  }, ring(R.ringOut, {
    stroke: W,
    strokeWidth: s.active === 'ringOut' ? 3 : 1.5
  })[0]), /*#__PURE__*/React.createElement(Part, {
    id: "tri",
    s: s,
    hit: SIX.map(i => /*#__PURE__*/React.createElement("path", {
      key: i,
      d: tri,
      transform: spin(i * 60),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, SIX.map(i => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: tri,
    transform: spin(i * 60),
    fill: "none",
    stroke: W,
    strokeWidth: s.active === 'tri' ? 3 : 1.5
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "core",
    s: s,
    hit: ring(R.core)[1]
  }, ring(R.core, {
    stroke: W,
    strokeWidth: s.active === 'core' ? 3 : 1.5
  })[0], /*#__PURE__*/React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: "3",
    fill: W
  })), lab && lab.id !== 'angle' && /*#__PURE__*/React.createElement(Tag, {
    x: cx,
    y: cy + p(60) + 34
  }, lab.figure));
}
function Marker({
  s
}) {
  const k = 12,
    bx = 250,
    by = 800,
    p = v => v * k;
  const ax = by - p(R.apex),
    bsY = by - p(R.base),
    mc = by - p(R.ringOut);
  const hitW = 26;
  const arcD = r => {
    const rr = p(r),
      a = Math.asin(Math.min(1, 560 / rr));
    return `M ${n2(bx - rr * Math.sin(a))},${n2(by - rr * Math.cos(a))} A ${rr} ${rr} 0 0 1 ${n2(bx + rr * Math.sin(a))},${n2(by - rr * Math.cos(a))}`;
  };
  const tx = n2(bx + p(HB)),
    tx2 = n2(bx - p(HB));
  const arcs = [[R.apex, false], [R.base, true], [R.ringIn, false], [R.ringOut, false]];
  const lab = s.active && MARKER.find(m => m.id === s.active);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "-210 40 900 660",
    style: {
      display: 'block',
      width: '100%',
      height: 'auto',
      overflow: 'hidden'
    },
    onClick: () => s.setPin(null)
  }, /*#__PURE__*/React.createElement(Part, {
    id: "arcs",
    s: s,
    hit: arcs.map(([r]) => /*#__PURE__*/React.createElement("path", {
      key: r,
      d: arcD(r),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    }))
  }, arcs.map(([r, dash], i) => /*#__PURE__*/React.createElement("path", {
    key: r,
    d: arcD(r),
    fill: "none",
    stroke: i > 1 ? W : G,
    strokeWidth: i > 1 ? 1.5 : 1,
    strokeDasharray: dash ? '8 6' : undefined
  }))), /*#__PURE__*/React.createElement(Part, {
    id: "circle",
    s: s,
    hit: /*#__PURE__*/React.createElement("circle", {
      cx: bx,
      cy: mc,
      r: p(U),
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("circle", {
    cx: bx,
    cy: mc,
    r: p(U),
    fill: "none",
    stroke: C,
    strokeWidth: s.active === 'circle' ? 3 : 1.5
  }), /*#__PURE__*/React.createElement("circle", {
    cx: bx,
    cy: mc,
    r: "3",
    fill: C
  })), /*#__PURE__*/React.createElement(Part, {
    id: "apex",
    s: s,
    hit: /*#__PURE__*/React.createElement("line", {
      x1: bx,
      y1: ax,
      x2: bx,
      y2: mc,
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("line", {
    x1: bx,
    y1: ax,
    x2: bx,
    y2: bsY,
    stroke: G,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: bx - 46,
    y1: mc,
    x2: bx - 46,
    y2: ax,
    stroke: C,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: bx - 56,
    y1: mc,
    x2: bx,
    y2: mc,
    stroke: G,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: bx - 56,
    y1: ax,
    x2: bx,
    y2: ax,
    stroke: G,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement(Tag, {
    x: bx - 64,
    y: n2((mc + ax) / 2 + 6),
    anchor: "end"
  }, "1u")), /*#__PURE__*/React.createElement(Part, {
    id: "tri",
    s: s,
    hit: /*#__PURE__*/React.createElement("path", {
      d: `M ${bx},${ax} L ${tx},${bsY} L ${tx2},${bsY} Z`,
      fill: "none",
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("path", {
    d: `M ${bx},${ax} L ${tx},${bsY} L ${tx2},${bsY} Z`,
    fill: "none",
    stroke: W,
    strokeWidth: s.active === 'tri' ? 3 : 1.5
  })), /*#__PURE__*/React.createElement(Part, {
    id: "base",
    s: s,
    hit: /*#__PURE__*/React.createElement("line", {
      x1: tx2,
      y1: bsY + 120,
      x2: tx,
      y2: bsY + 120,
      stroke: "transparent",
      strokeWidth: hitW
    })
  }, /*#__PURE__*/React.createElement("line", {
    x1: tx2,
    y1: bsY,
    x2: tx2,
    y2: bsY + 130,
    stroke: G,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: tx,
    y1: bsY,
    x2: tx,
    y2: bsY + 130,
    stroke: G,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("line", {
    x1: tx2,
    y1: bsY + 120,
    x2: tx,
    y2: bsY + 120,
    stroke: C,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement(Tag, {
    x: bx,
    y: bsY + 148
  }, "base 12\u221A3")), lab && /*#__PURE__*/React.createElement(Tag, {
    x: n2(bx + p(HB) + 24),
    y: n2(bsY + 26),
    anchor: "start"
  }, lab.figure));
}

/* The readout and the parts list. Both drive the same state as the drawing, so a part can be
   found either by pointing at it or by reading down the list. The list stays visible next to the
   drawing rather than under it: half its use is as a glossary, fixing what each part is called so
   the same word gets used everywhere. */
function PartsList({
  s,
  parts
}) {
  const row = x => {
    const on = s.active === x.id;
    return /*#__PURE__*/React.createElement("button", {
      key: x.id,
      type: "button",
      "aria-pressed": s.pin === x.id,
      onPointerEnter: () => s.setHover(x.id),
      onPointerLeave: () => s.setHover(null),
      onClick: () => s.toggle(x.id),
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        minHeight: 44,
        padding: '4px 12px',
        textAlign: 'left',
        cursor: 'pointer',
        background: on ? '#0d0d0d' : 'transparent',
        border: 0,
        borderLeft: `2px solid ${on ? W : 'transparent'}`,
        color: on ? W : C,
        ...MONO,
        fontSize: 12,
        lineHeight: '18px',
        transition: 'color 120ms, background 120ms'
      }
    }, /*#__PURE__*/React.createElement("span", null, x.label), /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? W : '#555555',
        whiteSpace: 'nowrap'
      }
    }, x.figure));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 4,
      alignContent: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '0 12px 8px',
      borderBottom: '1px solid #333333',
      ...MONO,
      fontSize: 12,
      lineHeight: '18px',
      textTransform: 'uppercase',
      color: '#555555'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Part"), /*#__PURE__*/React.createElement("span", null, parts.length, " in this view")), parts.map(row));
}
function Readout({
  s,
  parts
}) {
  const cur = parts.find(x => x.id === s.active);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8,
      minHeight: 132,
      alignContent: 'start',
      borderTop: '1px solid #333333',
      paddingTop: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...MONO,
      fontSize: 24,
      lineHeight: '36px',
      color: cur ? W : '#555555'
    }
  }, cur ? cur.label : 'No part selected'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12,
      flexWrap: 'wrap',
      minHeight: 18
    }
  }, cur && /*#__PURE__*/React.createElement("span", {
    style: {
      ...MONO,
      fontSize: 18,
      lineHeight: '30px',
      color: W
    }
  }, cur.figure), cur && /*#__PURE__*/React.createElement("span", {
    style: {
      ...MONO,
      fontSize: 12,
      lineHeight: '18px',
      color: '#888888'
    }
  }, cur.units)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: '62ch',
      fontSize: 18,
      lineHeight: '30px',
      color: '#888888',
      textWrap: 'pretty'
    }
  }, cur ? cur.note : 'Point at the drawing or read down the list. Clicking pins a part, so its name and figure stay put.'));
}
function LogoConstruction({
  view = 'family'
}) {
  const s = useSchematic();
  const marker = view === 'marker';
  const parts = marker ? MARKER : FAMILY;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 24,
      fontFamily: "'Figtree',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 24,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 300px',
      minWidth: 260,
      maxWidth: marker ? 560 : 520
    }
  }, marker ? /*#__PURE__*/React.createElement(Marker, {
    s: s
  }) : /*#__PURE__*/React.createElement(Family, {
    s: s
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 1 288px',
      minWidth: 240
    }
  }, /*#__PURE__*/React.createElement(PartsList, {
    s: s,
    parts: parts
  }))), /*#__PURE__*/React.createElement(Readout, {
    s: s,
    parts: parts
  }));
}
Object.assign(__ds_scope, { LogoConstruction });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LogoConstruction.jsx", error: String((e && e.message) || e) }); }

// components/core/LogoMark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* LogoMark. The logo's mark, and only the logo's mark. The card Mark is a
   diagram — twelve rings, colour, markers where a reading holds a position —
   and it is drawn to be read at 120. This is the same idea reduced to the two
   things that survive at 12: the core, and the six Base triangles on it.

   Circles first, and every shape derived from them. One unit, u = 12 on the
   120 box, generates the family:

     r 18   1.5u   centre disc
     r 36   3u     ring inner edge
     r 42   3.5u   ring centreline, and the triangle bases
     r 48   4u     ring outer edge, and the marker circle centres
     r 60   5u     apex circle, and half the box

   The ring stroke is one unit — the gap between 3u and 4u — and the black
   annulus between disc and ring is 18, the same figure as the disc's radius.

   The markers are equilateral, and equilateral by construction rather than by
   eye. Each is inscribed in a circle of radius 1u centred on r 48, apex facing
   out. An inscribed equilateral puts its apex one radius out and its base half
   a radius in, so the apex lands exactly on r 60 and the base exactly on the
   ring centreline r 42. Its half-width is therefore 6 root 3 — computed, never
   typed, because an equilateral triangle on a whole-number circle cannot have a
   whole-number base and stay equilateral. Its base sits on the ring centreline,
   so the outer half of the band is under a triangle at six places and mark and
   markers are one welded form at any size.

   The apex touching the box means the drawn height is the box height, so `size`
   is the mark's real height with no hidden margin. Six point-up triangles give
   a drawn width of 104 — 2 x 60 sin 60 — leaving an 8-unit side bearing that
   lockups have to account for. */

const HALF_BASE = 6 * Math.sqrt(3);
const TRI = `M 60,0 L ${60 + HALF_BASE},18 L ${60 - HALF_BASE},18 Z`;

/** Drawn extents and derived figures on the 120 box, for lockups and drawings. */
const LOGO_MARK_BOX = {
  box: 120,
  unit: 12,
  height: 120,
  width: 104,
  sideBearing: 8,
  markerCircle: 12,
  markerCircleAt: 48,
  triangleSide: 12 * Math.sqrt(3),
  halfBase: HALF_BASE
};
function LogoMark({
  size = 120,
  colour = '#FFFFFF',
  rotate = 0,
  stroke = 0,
  style,
  ...rest
}) {
  /* stroke may arrive as a string from an attribute, so coerce before testing. */
  const sw = Number(stroke) || 0;
  const line = sw > 0;
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 120 120",
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${rotate} 60 60)`,
    style: {
      transition: 'transform 300ms cubic-bezier(.25,0,0,1)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: line ? 48 : 42,
    fill: "none",
    stroke: colour,
    strokeWidth: line ? sw : 12
  }), line ? /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "36",
    fill: "none",
    stroke: colour,
    strokeWidth: sw
  }) : null, [0, 1, 2, 3, 4, 5].map(i => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: TRI,
    transform: `rotate(${i * 60} 60 60)`,
    fill: line ? 'none' : colour,
    stroke: line ? colour : undefined,
    strokeWidth: line ? sw : undefined
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "18",
    fill: line ? 'none' : colour,
    stroke: line ? colour : undefined,
    strokeWidth: line ? sw : undefined
  })));
}
Object.assign(__ds_scope, { LOGO_MARK_BOX, LogoMark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/LogoMark.jsx", error: String((e && e.message) || e) }); }

// components/core/Note.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Note. A caption-size aside marked by a 2px structural rule, not a coloured bar. */
function Note({
  label,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    style: {
      borderLeft: '2px solid var(--g24)',
      padding: 'var(--space-sm) 0 var(--space-sm) var(--space-md)',
      margin: 'var(--space-md) 0 0',
      maxWidth: '62ch',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-primary)',
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600
    }
  }, label) : null, label ? ' ' : null, children);
}
Object.assign(__ds_scope, { Note });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Note.jsx", error: String((e && e.message) || e) }); }

// components/core/Pill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Pill. Black fill, position colour on the stroke, white label.
   Width is the set's longest word x 18px, so width to height is characters to 2. */
function Pill({
  colour = 'var(--cl-12-life)',
  chars = 4,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: `calc(${chars} * var(--pill-char))`,
      height: 'var(--pill-height)',
      borderRadius: 'var(--pill-radius)',
      background: 'var(--surface-page)',
      border: `var(--stroke) solid ${colour}`,
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      textTransform: 'uppercase',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Pill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Pill.jsx", error: String((e && e.message) || e) }); }

// components/core/PillSet.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PillSet. Twelve positions arranged so polar pairs stay together.
   Two columns flowing down puts each pair in a row on a phone;
   six columns flowing across puts each pair in a column on a wide canvas.
   One DOM order serves both, because the list is sorted by angle.

   The run leads with P12 at 0 degrees and follows the clock from there, so a
   six-column grid stacks P12 over P06 and every other pair falls in line under
   it. Every twelve-item run in the system starts at the same place. */
function PillSet({
  items = [],
  chars = 4,
  columns = 6,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'grid',
      gap: 'var(--space-sm)',
      justifyContent: 'center',
      gridTemplateColumns: `repeat(${columns}, calc(${chars} * var(--pill-char)))`,
      gridAutoFlow: 'row',
      ...style
    }
  }, rest), items.map((it, i) => /*#__PURE__*/React.createElement(__ds_scope.Pill, {
    key: i,
    colour: it.colour,
    chars: chars
  }, it.label)));
}
Object.assign(__ds_scope, { PillSet });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PillSet.jsx", error: String((e && e.message) || e) }); }

// components/core/PositionNode.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PositionNode. A wheel node: dark fill, position colour as a 3px stroke,
   white label. Size is 3u on whatever unit the canvas has chosen. */
function PositionNode({
  colour = 'var(--cl-12-life)',
  size = 48,
  label,
  sublabel,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: 'var(--surface-page)',
      border: `var(--stroke) solid ${colour}`,
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      ...style
    }
  }, rest), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, label) : null, sublabel ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-secondary)'
    }
  }, sublabel) : null);
}
Object.assign(__ds_scope, { PositionNode });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PositionNode.jsx", error: String((e && e.message) || e) }); }

// components/core/SetLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SetLabel. The label a diagram's set carries, lifted from Colour FLOWER.
   It sits outside the geometry and is tied to its ring by a hairline leader,
   never laid inside a word band.

   Page-black fill so the rings do not read through it, one 1px border with the
   top edge removed where the leader meets it, and the bottom two corners
   rounded at radius-sm. Mono caption uppercase, 28px tall, 2px by 8px padding:
   smaller than a Control on purpose, since it labels rather than invites. When
   its set is in view the border lifts from g24 to g66. */

function SetLabel({
  on = false,
  leader = 'top',
  length = 22,
  style,
  children,
  ...rest
}) {
  const vertical = leader === 'top' || leader === 'bottom';
  const line = /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--g48)',
      flex: '0 0 auto',
      width: vertical ? 1 : length,
      height: vertical ? length : 1
    }
  });
  const edge = `1px solid ${on ? 'var(--g66)' : 'var(--surface-border)'}`;
  const sm = 'var(--radius-sm)';
  const radius = {
    top: `0 0 ${sm} ${sm}`,
    bottom: `${sm} ${sm} 0 0`,
    left: `0 ${sm} ${sm} 0`,
    right: `${sm} 0 0 ${sm}`
  }[leader];
  const box = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      minHeight: 28,
      padding: '2px 8px',
      background: 'var(--surface-page)',
      borderTop: leader === 'top' ? 0 : edge,
      borderBottom: leader === 'bottom' ? 0 : edge,
      borderLeft: leader === 'left' ? 0 : edge,
      borderRight: leader === 'right' ? 0 : edge,
      borderRadius: radius,
      whiteSpace: 'nowrap',
      font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
      textTransform: 'uppercase',
      color: 'var(--text-primary)',
      transition: 'border-color var(--dur) var(--ease)'
    }
  }, children);
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: vertical ? 'column' : 'row',
      alignItems: 'center',
      gap: 6,
      ...style
    }
  }, rest), leader === 'bottom' || leader === 'right' ? /*#__PURE__*/React.createElement(React.Fragment, null, box, line) : /*#__PURE__*/React.createElement(React.Fragment, null, line, box));
}
Object.assign(__ds_scope, { SetLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SetLabel.jsx", error: String((e && e.message) || e) }); }

// components/core/SpecTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SpecTable. Value columns hug their content so the description column absorbs
   the rest. Width goes on the cells only, never on the header. */
function SpecTable({
  columns = [],
  rows = [],
  style,
  ...rest
}) {
  const cell = {
    borderBottom: '1px solid var(--surface-border)',
    padding: 'var(--space-sm) var(--space-sm) var(--space-sm) 0',
    verticalAlign: 'middle',
    lineHeight: 'var(--lh-caption)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      overflowX: 'auto',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      borderCollapse: 'collapse',
      width: '100%',
      fontSize: 'var(--fs-caption)'
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: i,
    style: {
      ...cell,
      textAlign: 'left',
      whiteSpace: 'nowrap',
      fontWeight: 400,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, ri) => /*#__PURE__*/React.createElement("tr", {
    key: ri
  }, columns.map((c, ci) => {
    const mono = c.kind === 'value';
    return /*#__PURE__*/React.createElement("td", {
      key: ci,
      style: {
        ...cell,
        width: c.kind === 'text' ? 'auto' : '1%',
        whiteSpace: c.kind === 'text' ? 'normal' : 'nowrap',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
        fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
        color: 'var(--text-primary)'
      }
    }, r[c.key]);
  }))))));
}
Object.assign(__ds_scope, { SpecTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SpecTable.jsx", error: String((e && e.message) || e) }); }

// components/core/Specimen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Specimen. A type sample set at its real size and weight, with the spec as
   its caption. The system shows type rather than describing it in a table. */
function Specimen({
  spec,
  size = 18,
  weight = 400,
  leading = 30,
  font = 'sans',
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      borderBottom: '1px solid var(--surface-border)',
      padding: 'var(--space-md) 0',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 var(--space-sm)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)'
    }
  }, spec), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: font === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
      fontSize: size,
      fontWeight: weight,
      lineHeight: `${leading}px`,
      color: 'var(--text-primary)'
    }
  }, children));
}
Object.assign(__ds_scope, { Specimen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Specimen.jsx", error: String((e && e.message) || e) }); }

// components/core/SwatchRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* SwatchRow. A grey or surface value shown at its real value, with its name
   and its use. Structural greys are shown as fills; position colours are not. */
function SwatchRow({
  swatch,
  name,
  use,
  stroke = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-md)',
      border: '1px solid var(--surface-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-sm) var(--space-md)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 32,
      flex: '0 0 48px',
      borderRadius: 'var(--radius-sm)',
      background: stroke ? 'var(--surface-page)' : swatch,
      border: stroke ? `var(--stroke) solid ${swatch}` : '1px solid var(--surface-border)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-secondary)'
    }
  }, use)));
}
Object.assign(__ds_scope, { SwatchRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SwatchRow.jsx", error: String((e && e.message) || e) }); }

// components/core/positions.js
try { (() => {
/* The twelve positions, once. This is the only place the index, angle and hex
   of a position are written down in this project. Every wheel, mark, pill set,
   card, template and surface reads them from here.

   A static, computed-once picture of these values plotted against Colour LINGO's
   settled words used to live at reference/ColourFlowerGroundTruth.html; retired
   2026-09-03 now that Colour FLOWER itself is the live, authoritative diagram.

   Order: every run of the twelve leads with P12 at 0° and follows the clock,
   so a six by two grid stacks a position over its polar pair. Base sits at
   k × 60°, Blend at k × 60 + 30°. Position 00, the core, is a void and carries
   no colour, so it is not in the list.

   No word is recorded here. A position is an index, an angle and a hex, and
   whichever word sits at it is read from the Colour LINGO source at the
   moment a build needs it. Token stems like cl-01-tone are legacy labels. */

const POSITIONS = [{
  i: '12',
  a: 0,
  hex: '#00D460',
  c: 'var(--cl-12-life)',
  kind: 'base',
  k: 0
}, {
  i: '01',
  a: 30,
  hex: '#99DD00',
  c: 'var(--cl-01-tone)',
  kind: 'blend',
  k: 0
}, {
  i: '02',
  a: 60,
  hex: '#FFD100',
  c: 'var(--cl-02-flux)',
  kind: 'base',
  k: 1
}, {
  i: '03',
  a: 90,
  hex: '#FFB000',
  c: 'var(--cl-03-flow)',
  kind: 'blend',
  k: 1
}, {
  i: '04',
  a: 120,
  hex: '#FF7700',
  c: 'var(--cl-04-love)',
  kind: 'base',
  k: 2
}, {
  i: '05',
  a: 150,
  hex: '#FF5500',
  c: 'var(--cl-05-bond)',
  kind: 'blend',
  k: 2
}, {
  i: '06',
  a: 180,
  hex: '#FF0000',
  c: 'var(--cl-06-fire)',
  kind: 'base',
  k: 3
}, {
  i: '07',
  a: 210,
  hex: '#E02888',
  c: 'var(--cl-07-path)',
  kind: 'blend',
  k: 3
}, {
  i: '08',
  a: 240,
  hex: '#9933CC',
  c: 'var(--cl-08-time)',
  kind: 'base',
  k: 4
}, {
  i: '09',
  a: 270,
  hex: '#6655FF',
  c: 'var(--cl-09-meta)',
  kind: 'blend',
  k: 4
}, {
  i: '10',
  a: 300,
  hex: '#2277FF',
  c: 'var(--cl-10-form)',
  kind: 'base',
  k: 5
}, {
  i: '11',
  a: 330,
  hex: '#00BBDD',
  c: 'var(--cl-11-type)',
  kind: 'blend',
  k: 5
}];

/* The six and the six, in k order, which is the order a mark and a card index
   their picks by. Derived, never written out a second time. */
const BASE_HEX = POSITIONS.filter(p => p.kind === 'base').map(p => p.hex);
const BLEND_HEX = POSITIONS.filter(p => p.kind === 'blend').map(p => p.hex);
const positionAt = i => POSITIONS.find(p => p.i === i) || POSITIONS[0];
const polarOf = i => POSITIONS[(POSITIONS.indexOf(positionAt(i)) + 6) % 12];

/* Plain scripts, specimen cards and template logic classes cannot import an
   ES module, so the same objects are published on the window as well. */
if (typeof window !== 'undefined') {
  window.RESOURCE_POSITIONS = POSITIONS;
  window.RESOURCE_BASE_HEX = BASE_HEX;
  window.RESOURCE_BLEND_HEX = BLEND_HEX;
}
Object.assign(__ds_scope, { POSITIONS, BASE_HEX, BLEND_HEX, positionAt, polarOf });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/positions.js", error: String((e && e.message) || e) }); }

// components/core/ColourWheel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ColourWheel. Twelve positions at 30 degree steps, placed by rotation so no
   decimal coordinate is ever authored. Position 12 sits at 0 degrees, at the
   top, and the count runs clockwise. Core is a void and carries no colour.
   The positions themselves come from positions.js, which is the only place
   an index, an angle or a hex is written down. */

function ColourWheel({
  unit = 24,
  showAngles = true,
  onSelect,
  selected,
  style,
  ...rest
}) {
  const radius = unit * 6;
  const node = unit * 3;
  const box = radius * 2 + node;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: box,
      height: box,
      margin: '0 auto',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: node / 2,
      borderRadius: '50%',
      border: '1px solid var(--surface-border)'
    }
  }), __ds_scope.POSITIONS.map(p => {
    const active = selected === p.i;
    return /*#__PURE__*/React.createElement("button", {
      key: p.i,
      onClick: onSelect ? () => onSelect(p) : undefined,
      "aria-label": `Position ${p.i}, ${p.a} degrees`,
      style: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        width: node,
        height: node,
        margin: `${-node / 2}px 0 0 ${-node / 2}px`,
        transform: `rotate(${p.a}deg) translateY(${-radius}px) rotate(${-p.a}deg)`,
        borderRadius: '50%',
        background: active ? 'var(--surface-raised)' : 'var(--surface-page)',
        border: `var(--stroke) solid ${p.c}`,
        color: 'var(--text-primary)',
        font: `700 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onSelect ? 'pointer' : 'default',
        padding: 0,
        transition: 'background var(--dur) var(--ease)'
      }
    }, /*#__PURE__*/React.createElement("span", null, p.i), showAngles ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-secondary)',
        fontWeight: 400
      }
    }, p.a, "\xB0") : null);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      width: node,
      height: node,
      margin: `${-node / 2}px 0 0 ${-node / 2}px`,
      borderRadius: '50%',
      background: 'var(--surface-page)',
      border: '1px dashed var(--surface-border)',
      color: 'var(--text-secondary)',
      font: `400 var(--fs-caption)/var(--lh-caption) var(--font-mono)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "00"));
}
Object.assign(__ds_scope, { ColourWheel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/ColourWheel.jsx", error: String((e && e.message) || e) }); }

// components/core/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Mark. The flower in miniature, and the system's icon language. Twelve rings
   on a core the same size as one of them, a triangle at each held Base position
   and a dot at each held Blend, a dashed core ring, and a void wash so the
   pupil still reads through a crowded mark.

   Every node is placed by rotating one radius through a whole angle, so no
   decimal coordinate is ever authored. Base sits at i x 60 degrees, Blend at
   i x 60 + 30, numbered P01 at 30 degrees round to P12 at 0.

   Geometry lifted from the deck's aspect-render helper, 19 August 2026.
   Colours come from positions.js, in k order, like every other diagram. */

const STROKE = 3;
const PG_STEPS = 8;
const round = n => Math.round(n * 100) / 100;
function Mark({
  size = 120,
  picks = [],
  blendPicks = [],
  white = false,
  showBlend,
  voidWash = true,
  petalShadow = 12,
  /* Depth and Drop match the card mark's own reference call in lib/aspect-render.js
     (petalShadowDepth, petalShadowDrop) — added so every surface that tunes this mark's
     shadow and glow (Word CARD's own tweaks included) shares the same three knobs, not a
     size-only subset. Defaults reproduce the mark exactly as it drew before either existed. */
  petalShadowDepth = 1,
  petalShadowDrop = 0,
  voidGlowSize = 1,
  voidGlowDepth = 1.25,
  rotate = 0,
  full = false,
  style,
  ...rest
}) {
  const uid = React.useId().replace(/:/g, '');
  const c = size / 2;
  const r = (c - STROKE / 2) / 2;
  const core = r;
  const cy = c - core;
  const spin = a => `rotate(${a} ${c} ${c})`;
  const hexBase = i => white ? '#FFFFFF' : __ds_scope.BASE_HEX[i];
  const hexBlend = i => white ? '#FFFFFF' : __ds_scope.BLEND_HEX[i];
  const count = picks.length + blendPicks.length;
  const blendOn = showBlend != null ? showBlend : blendPicks.length > 0;

  /* Whichever pick leads is bigger, ring and marker both, so a flip visibly
     moves the emphasis. A Single is a one-word Pair and takes the same lead. */
  const lead = picks.length <= 2 && picks.length ? picks[0] : null;
  const blendLead = !picks.length && blendPicks.length <= 2 && blendPicks.length ? blendPicks[0] : null;

  /* The shadow separates petals that overlap. One or two petals overlap
     nothing, so a Single and a Pair take none. Spread is quoted at size 120
     and scales with the mark, or an icon-sized mark would be swamped by it. */
  const pgSize = count > 2 ? petalShadow * (size / 120) : 0;
  const shadowOf = w => {
    if (pgSize <= 0) return [];
    const ramp = [];
    for (let k = PG_STEPS; k >= 1; k--) ramp.push(Math.pow(1 - (k - 0.5) / PG_STEPS, 2));
    const sum = ramp.reduce((a, b) => a + b, 0);
    return ramp.map((v, n) => ({
      w: round(w + pgSize * 2 * (1 - (n + 0.5) / PG_STEPS)),
      o: round(v / sum * petalShadowDepth * 1000) / 1000,
      cy: round(cy + pgSize * petalShadowDrop)
    }));
  };
  const faint = [];
  for (let i = 0; i < 12; i++) faint.push({
    i,
    rot: spin(i * 30)
  });
  const lit = picks.map(i => ({
    k: `b${i}`,
    rot: spin(i * 60),
    stroke: hexBase(i),
    width: i === lead ? STROKE + 2 : STROKE
  })).concat(blendPicks.map(i => ({
    k: `l${i}`,
    rot: spin(i * 60 + 30),
    stroke: hexBlend(i),
    width: i === blendLead ? STROKE + 2 : STROKE
  }))).reverse().map(p => ({
    ...p,
    sh: shadowOf(p.width)
  }));

  /* A Single lights one ring, too little to survive the void wash washing over it, so it draws
     above the core. A Pair and wider stay under the wash: the mark is the flower in miniature,
     and on the flower the wash crosses every petal. */
  const above = count === 1;
  const triH = Math.max(6, r * 0.42);
  const triW = triH / Math.sqrt(3);
  const triPath = (h, w) => `M ${c},${cy - h * 2 / 3} L ${c + w},${cy + h / 3} L ${c - w},${cy + h / 3} Z`;
  const halo = round(Math.max(3, r * 0.18));
  const dotR = Math.max(2.5, r * 0.16);

  /* A full Set already lights every ring in colour. Markers on top of all
     twelve read as clutter, so it skips them. */
  const markers = !full;
  const litRings = above ? [] : lit;
  const topRings = above ? lit : [];
  const coreFillR = round(core * voidGlowSize);
  const glowR = round(r * 2 * voidGlowSize);
  const stop0 = round(Math.min(1, voidGlowDepth + 0.35));
  const stopMid = round(Math.min(1, voidGlowDepth));
  const midOffset = round(55 + Math.max(0, voidGlowDepth - 1) * 25);
  const ring = (p, extra) => /*#__PURE__*/React.createElement("circle", _extends({
    cx: c,
    cy: p.cy ?? cy,
    r: r,
    transform: p.rot,
    fill: "none"
  }, extra));
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: `-2 -2 ${size + 4} ${size + 4}`,
    width: size,
    height: size,
    style: {
      display: 'block',
      overflow: 'visible',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("g", {
    transform: `rotate(${rotate} ${c} ${c})`,
    style: {
      transition: 'transform 300ms cubic-bezier(.25,0,0,1)'
    }
  }, faint.map(f => ring(f, {
    key: `f${f.i}`,
    stroke: 'var(--surface-border)',
    strokeWidth: 1
  })), blendOn && markers ? [0, 1, 2, 3, 4, 5].filter(i => !blendPicks.includes(i)).map(i => /*#__PURE__*/React.createElement("circle", {
    key: `fd${i}`,
    cx: c,
    cy: cy,
    r: dotR,
    transform: spin(i * 60 + 30),
    fill: "var(--surface-border)"
  })) : null, litRings.map(p => /*#__PURE__*/React.createElement(React.Fragment, {
    key: p.k
  }, p.sh.map((s, n) => ring({
    ...p,
    cy: s.cy
  }, {
    key: `${p.k}s${n}`,
    stroke: '#000000',
    strokeOpacity: s.o,
    strokeWidth: s.w
  })), ring(p, {
    stroke: p.stroke,
    strokeWidth: p.width
  }))), voidWash ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: coreFillR,
    fill: "#000000"
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: `mark-void-${uid}`
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#000000",
    stopOpacity: stop0
  }), /*#__PURE__*/React.createElement("stop", {
    offset: `${midOffset}%`,
    stopColor: "#000000",
    stopOpacity: stopMid
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#000000",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: glowR,
    fill: `url(#mark-void-${uid})`
  })) : null, /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: core,
    fill: "none",
    stroke: "#FFFFFF",
    strokeWidth: "1",
    strokeDasharray: "1 3",
    strokeLinecap: "round"
  }), topRings.map(p => ring(p, {
    key: p.k,
    stroke: p.stroke,
    strokeWidth: p.width
  })), markers ? picks.slice().reverse().map(i => /*#__PURE__*/React.createElement("path", {
    key: `t${i}`,
    d: i === lead ? triPath(triH * 1.25, triW * 1.25) : triPath(triH, triW),
    transform: spin(i * 60),
    fill: "#FFFFFF",
    stroke: "#000000",
    strokeWidth: halo,
    strokeLinejoin: "round",
    paintOrder: "stroke fill"
  })) : null, blendOn && markers ? blendPicks.slice().reverse().map(i => /*#__PURE__*/React.createElement("circle", {
    key: `d${i}`,
    cx: c,
    cy: cy,
    r: i === blendLead ? dotR * 1.25 : dotR,
    transform: spin(i * 60 + 30),
    fill: "#FFFFFF",
    stroke: "#000000",
    strokeWidth: halo,
    paintOrder: "stroke fill"
  })) : null, /*#__PURE__*/React.createElement("circle", {
    cx: c,
    cy: c,
    r: dotR,
    fill: "#FFFFFF",
    stroke: "#000000",
    strokeWidth: halo,
    paintOrder: "stroke fill"
  })));
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Mark.jsx", error: String((e && e.message) || e) }); }

// components/core/AspectCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* AspectCard. The printed card: 360 x 504, poker portrait, which is 63 x 88mm
   at roughly 1.5x print scale. One inner hairline frame inset 10px, four mono
   corner labels sitting on that frame line with the card fill masking the line
   behind them, a title band, an optional twelve-word grid, a gloss, a reading,
   a question and a foot row.

   Slack collects in one spacer between the reading and the foot, so a short
   reading never opens a hole in the middle of a card.

   Geometry and the position label come from window.AspectRender, the same
   helper the deck and the flower read, so the three can never disagree. The
   card holds no copy: every sentence arrives on the entry. */

const round = n => Math.round(n * 100) / 100;
const MONO = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-caption)',
  lineHeight: 'var(--lh-caption)',
  textTransform: 'uppercase'
};
const cornerLabel = pos => ({
  position: 'absolute',
  ...pos,
  ...MONO,
  color: 'var(--text-secondary)',
  whiteSpace: 'nowrap',
  pointerEvents: 'none'
});
/* The fit mark. One hand-read verdict on meaning: does this word mean the right thing at this
   position, in this set. It reads one to five, and 0 for unread. It sits on the frame line at top
   left as a traffic light — a dot is a mark, so it may carry colour; the law forbids colour behind a
   word, not on a mark that is nothing but colour. Unread is a hollow ring, because a word nobody
   has read is not a bad word and should not read as a low score.

   The five colours are five real positions on the wheel, read round the arc from 12 to 06, which
   runs green, yellow-green, yellow, orange, red in the spectrum itself. So the scale borrows a
   progression the system already owns rather than adding five semantic colours to a palette that
   has never had any.

   Retired 28 August 2026: the coloured numeral, and before it the diamond and the fits/off/unread
   strings it was keyed on. A numeral asked to be read where a dot only has to be seen.

   The colour is not judged. It is fixed by the position's place in the spectrum, so there is
   nothing to rate: a control there would invite someone to mark a hex wrong when the hex is the
   one thing on the card that was never a choice. */
const FIT_COLOUR = {
  5: 'var(--cl-12-life)',
  4: 'var(--cl-01-tone)',
  3: 'var(--cl-02-flux)',
  2: 'var(--cl-04-love)',
  1: 'var(--cl-06-fire)'
};
const TITLE = {
  fontWeight: 'var(--fw-h1)',
  fontSize: '36px',
  lineHeight: '36px',
  margin: 0,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  transition: 'color 300ms cubic-bezier(.25,0,0,1)'
};
function AspectCard({
  entry,
  baseWords = [],
  blendWords = [],
  size = 120,
  flipped = false,
  onFlip,
  showGrid = false,
  scale = 1,
  setLabel,
  badge,
  markRotate = 0,
  fit,
  style,
  /* Passed straight through to the mark. Undefined here means Mark's own defaults apply,
     so a caller that never mentions these draws exactly as before. */
  petalShadowSize,
  petalShadowDepth,
  petalShadowDrop,
  voidGlowSize,
  voidGlowDepth,
  ...rest
}) {
  const R = typeof window !== 'undefined' ? window.AspectRender : null;
  if (!entry || !R) return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      height: 504,
      ...style
    }
  });
  const v = R.build(entry, {
    size,
    flipped,
    baseWords,
    blendWords
  });
  /* The inner frame carries the card's accent: the colour of the position it leads with. Only a
     card that leads with one position has one — a Single or a Pair. A Core holds none, and a
     Triad, a Group and a Set hold a span rather than a position, so their frame is a white
     hairline. The
     card's own edge is a plain hairline throughout. This is the one place a card's accent is
     decided, so every card in the deck follows it. */
  const accent = entry.holds <= 2 ? (v.barColours || [])[0] || 'var(--surface-border)' : '#FFFFFF';
  /* A Pair holds two positions and leads with one, so its frame is split diagonally between
     their two colours, laid out the way the titles are: the leading word's colour on the top
     left, the trailing word's on the bottom right. A flip swaps the titles, and the frame turns
     with them. */
  const split = entry.holds === 2 && (v.barColours || []).length === 2 ? v.barColours : null;
  const frame = {
    position: 'absolute',
    inset: 10,
    borderRadius: 4,
    pointerEvents: 'none'
  };

  /* The label at top left names the ring, REALM, STATE or TAG. A Set card is
     the one case that shows the adjective instead, since the adjective is the
     part its own title does not say. */
  const setWords = String(entry.set || '').split(' ');
  const label = setLabel != null ? setLabel : (entry.holds === 12 ? setWords[0] : setWords[setWords.length - 1]).toUpperCase();
  /* The badge says how much of the ring the card holds. Base and Blend are
     both Group: the title already says which six. */
  const kind = badge != null ? badge : entry.type === 'Base' || entry.type === 'Blend' ? 'GROUP' : String(entry.type || '').toUpperCase();

  // The grid draws whenever it is asked for. With no LINGO source it labels the twelve by
  // position index rather than rendering empty, which is what used to make the toggle look
  // broken. Retired: gating the grid on hasWords.
  const grid = showGrid;
  return /*#__PURE__*/React.createElement("article", _extends({
    "data-card": "",
    style: {
      position: 'relative',
      width: 360,
      height: 504,
      flex: '0 0 auto',
      background: 'var(--surface-card)',
      border: '1px solid var(--surface-border)',
      borderRadius: 14,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflow: 'hidden',
      /* A narrow screen scales the card whole rather than reflowing it, so
         the printed proportions hold. */
      transform: scale === 1 ? undefined : `scale(${scale})`,
      transformOrigin: 'top left',
      ...style
    }
  }, rest), split ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...frame,
      border: `1px solid ${split[0]}`,
      clipPath: 'polygon(0 0, 100% 0, 0 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      ...frame,
      border: `1px solid ${split[1]}`,
      clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
    }
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      ...frame,
      border: `1px solid ${accent}`
    }
  }), fit ? /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerLabel({
        top: 5,
        left: 16
      })
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-card)',
      padding: '0 8px',
      display: 'inline-flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: FIT_COLOUR[fit] || 'transparent',
      border: FIT_COLOUR[fit] ? 'none' : '1px solid #333333',
      boxSizing: 'border-box'
    }
  }))) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerLabel({
        top: 5,
        right: 24
      }),
      width: size,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-card)',
      padding: '0 8px'
    }
  }, kind)), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerLabel({
        bottom: 5,
        right: 24
      }),
      width: size,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-card)',
      padding: '0 8px'
    }
  }, v.posLabel)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0,
      height: v.bandHeight,
      display: 'grid',
      gridTemplateColumns: '156px minmax(0,1fr)',
      alignItems: 'start'
    }
  }, onFlip ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onFlip,
    "aria-label": "Flip",
    style: {
      position: 'absolute',
      left: 160,
      top: `calc(${v.columnTop}px + 42px)`,
      transform: 'translateY(-50%)',
      zIndex: 5,
      width: 28,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'none',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      color: '#555555'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 12 26",
    style: {
      display: 'block',
      width: 12,
      height: 26
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 6,0.5 L 11.2,9.5 L 0.8,9.5 Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 6,25.5 L 0.8,16.5 L 11.2,16.5 Z",
    fill: "currentColor"
  }))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      order: 1,
      paddingTop: Math.max(0, v.columnTop - 14),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      width: v.titleBoxWidth,
      maxWidth: 156,
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      lineHeight: '12px',
      fontWeight: 'var(--fw-h1)',
      textTransform: 'uppercase',
      color: 'var(--text-secondary)',
      whiteSpace: 'nowrap',
      marginBottom: -2
    }
  }, label), v.isHorizontal ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-end',
      minWidth: 0
    }
  }, v.words.map(w => /*#__PURE__*/React.createElement("div", {
    key: w.text,
    style: {
      flex: '1 1 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...TITLE,
      color: w.tone
    }
  }, w.text), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 3,
      gap: 2
    }
  }, w.colours.map((col, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      flex: '1 1 0',
      background: col
    }
  })))))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    style: {
      ...TITLE,
      color: v.topTone
    }
  }, v.topWord), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 3,
      gap: 2
    }
  }, v.barColours.map((col, n) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      flex: '1 1 0',
      background: col
    }
  }))), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...TITLE,
      color: v.bottomTone,
      textAlign: 'right'
    }
  }, v.bottomWord)))), /*#__PURE__*/React.createElement("div", {
    style: {
      order: 2,
      justifySelf: 'end',
      width: size,
      height: size,
      marginTop: v.markTop
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Mark, _extends({
    size: size,
    picks: entry.picks || [],
    blendPicks: entry.blendPicks || [],
    white: !!entry.white,
    full: entry.type === 'Set'
  }, petalShadowSize != null ? {
    petalShadow: petalShadowSize
  } : {}, petalShadowDepth != null ? {
    petalShadowDepth
  } : {}, petalShadowDrop != null ? {
    petalShadowDrop
  } : {}, voidGlowSize != null ? {
    voidGlowSize
  } : {}, voidGlowDepth != null ? {
    voidGlowDepth
  } : {}, {
    /* A Pair holds an axis, two positions opposite each other, so flipping it turns the
       mark half a turn: the lead position physically moves to the other end, the way it
       would on the flower. Every other card's mark stands still. */
    rotate: markRotate + (flipped && entry.titles && entry.titles.length === 2 ? 180 : 0),
    style: {
      width: '100%',
      height: '100%'
    }
  })))), grid ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0,
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      columnGap: 6
    }
  }, v.gridPairs.map((p, n) => /*#__PURE__*/React.createElement("span", {
    key: n,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-h1)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      textTransform: 'uppercase',
      color: p.top.tc
    }
  }, p.top.label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      height: 3,
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '1 1 0',
      background: p.top.col
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '1 1 0',
      background: p.bot.col
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'right',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-h1)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      textTransform: 'uppercase',
      color: p.bot.tc
    }
  }, p.bot.label)))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 auto',
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      flex: '0 0 auto',
      maxHeight: 24,
      fontSize: 'var(--fs-body)',
      lineHeight: '24px',
      fontWeight: 'var(--fw-h1)',
      color: 'var(--text-primary)',
      margin: 0,
      overflow: 'hidden',
      textWrap: 'pretty'
    }
  }, v.gloss), /*#__PURE__*/React.createElement("p", {
    style: {
      flex: '1 1 auto',
      minHeight: 0,
      fontSize: 'var(--fs-body)',
      lineHeight: '24px',
      fontWeight: 'var(--fw-body)',
      color: 'var(--text-secondary)',
      margin: 0,
      overflow: 'hidden',
      textWrap: 'pretty'
    }
  }, v.reading)), v.question ? /*#__PURE__*/React.createElement("p", {
    style: {
      position: 'relative',
      flexShrink: 0,
      paddingTop: 12,
      borderTop: '1px solid var(--surface-border)',
      fontSize: 'var(--fs-caption)',
      lineHeight: 'var(--lh-caption)',
      color: 'var(--text-primary)',
      margin: 0
    }
  }, v.question) : null, v.last ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flexShrink: 0,
      display: 'flex',
      gap: 12,
      alignItems: 'baseline',
      paddingTop: 12,
      borderTop: '1px solid var(--surface-border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: '0 0 auto',
      ...MONO,
      color: 'var(--text-secondary)'
    }
  }, v.lastLabel), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: '12px',
      lineHeight: '12px',
      fontWeight: 'var(--fw-h1)',
      color: 'var(--text-primary)'
    }
  }, v.last)) : null);
}

/* The blank slot. A selection with no card gets this and one plain line, never
   a nearest match: three positions with no card between them is a real fact
   about the deck, and the slot reports it. */
function AspectCardBlank({
  positions = '',
  line = 'No card holds these positions.',
  size = 120,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("article", _extends({
    style: {
      position: 'relative',
      width: 360,
      height: 504,
      flex: '0 0 auto',
      background: 'var(--surface-page)',
      border: '1px solid var(--surface-border)',
      borderRadius: 14,
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 10,
      border: '1px solid var(--surface-border)',
      borderRadius: 4,
      borderStyle: 'dashed',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerLabel({
        top: 5,
        left: 16
      })
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-page)',
      padding: '0 8px'
    }
  }, "NO CARD")), /*#__PURE__*/React.createElement("span", {
    style: {
      ...cornerLabel({
        bottom: 5,
        right: 24
      }),
      width: size,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: 'var(--surface-page)',
      padding: '0 8px'
    }
  }, positions)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 'auto 0',
      fontSize: 'var(--fs-body)',
      lineHeight: '24px',
      color: 'var(--text-secondary)'
    }
  }, line));
}
const ASPECT_CARD_SIZE = {
  w: 360,
  h: 504,
  radius: 14,
  frameInset: 10,
  pad: 24,
  gap: 12,
  band: round(120)
};
Object.assign(__ds_scope, { AspectCard, AspectCardBlank, ASPECT_CARD_SIZE });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/AspectCard.jsx", error: String((e && e.message) || e) }); }

// data/aspect-states.js
try { (() => {
// Single source for the Aspect States 13-card sequence: the six words, the
// four named subsets, and the three polar pairs. Introduction.dc.html renders
// all 13 from this list; Master.dc.html's specimen picker looks entries up
// by id. Edit copy here once and both pages update.
//
// type is the only axis a card sorts on: Core, Single, Pair, Triad, Base,
// Blend, Set or Shape. Core, Set and Shape have no entries of their own in
// this file. Pair, Triad, Base and Blend are Multi, collectively.
// Every entry here belongs to one Set. Cards name it on the frame line at
// their foot, so it costs the reading no height.
window.ASPECT_SET = {
  conceptName: 'Aspect',
  setName: 'State'
};

// The words at each position, Base at 0°, 60°, 120°, 180°, 240°, 300° and
// Blend at 30°, 90°, 150°, 210°, 270°, 330°. Passed into aspect-render so a
// card that holds several positions can show them: a Triad as a mono sub
// line, Base, Blend and a Set as the six-column grid. Kept here rather than
// in the render helper because these assignments still move.
window.ASPECT_WORDS = {
  base: ['BODY', 'HIGH', 'SOUL', 'WILL', 'MIND', 'SELF'],
  blend: ['MOOD', 'TRUE', 'NEED', 'WANT', 'VIEW', 'MODE']
};
window.ASPECT_STATES = [{
  id: 'word-self',
  type: 'Single',
  picks: [5],
  titles: ['SELF'],
  gloss: 'The individual boundary separates the observer from the whole.',
  reading: 'An internal anchor that defines personal territory. It is the conscious witness of experience, maintaining a distinct perspective.',
  question: 'How much space are you claiming for yourself here?',
  lastLabel: 'Polar',
  last: 'SOUL'
}, {
  id: 'word-will',
  type: 'Single',
  picks: [3],
  titles: ['WILL'],
  gloss: 'The focused engine drives deliberate intent forward.',
  reading: 'An internal command that refuses to yield. It marshals available energy to break through obstacles, imposing its own order on the world.',
  question: 'What are you determined to bring about?',
  lastLabel: 'Polar',
  last: 'BODY'
}, {
  id: 'word-high',
  type: 'Single',
  picks: [1],
  titles: ['HIGH'],
  gloss: 'Peak intensity elevates perspective above the baseline.',
  reading: 'An amplification of state that brings clarity or intoxication. It marks the maximum threshold, a vivid contrast to the ordinary routine.',
  question: 'Where is the current surge of energy taking you?',
  lastLabel: 'Polar',
  last: 'MIND'
}, {
  id: 'word-mind',
  type: 'Single',
  picks: [4],
  titles: ['MIND'],
  gloss: 'The internal processor analyzes and structures information.',
  reading: 'The active space of logic, strategy, and calculation. It translates raw data into concepts, seeking to comprehend and control the environment.',
  question: 'What calculation is running through your thoughts?',
  lastLabel: 'Polar',
  last: 'HIGH'
}, {
  id: 'word-body',
  type: 'Single',
  picks: [0],
  titles: ['BODY'],
  gloss: 'The physical vessel anchors experience in concrete reality.',
  reading: 'The tangible weight of existence demands attention. It acts as the primary interface, registering every impact with literal presence.',
  question: 'What sensation is the physical self holding right now?',
  lastLabel: 'Polar',
  last: 'WILL'
}, {
  id: 'word-soul',
  type: 'Single',
  picks: [2],
  titles: ['SOUL'],
  gloss: 'The essential spark defines individual character.',
  reading: 'An internal depth that resists external formatting. It holds the unique resonance of identity, independent of social utility or role.',
  question: 'What speaks to your innermost nature in this choice?',
  lastLabel: 'Polar',
  last: 'SELF'
}, {
  id: 'set-prime',
  type: 'Triad',
  picks: [5, 3, 1],
  titles: ['PRIME'],
  gloss: 'One triad of Base, four steps apart.',
  reading: 'Being seen, getting something done, and standing far enough out to judge it. None of the three answers another directly, so the set holds without argument.',
  question: 'Which of the three are you leaning on today?',
  lastLabel: 'COUNTER',
  last: 'PART'
}, {
  id: 'set-part',
  type: 'Triad',
  picks: [4, 0, 2],
  titles: ['PART'],
  gloss: 'The triad PRIME leaves, four steps apart.',
  reading: 'Turning a question over before deciding, the plain fact of the body, and what refuses to perform. Together they hold what image and effort do not reach.',
  question: 'Which of the three is doing the most work?',
  lastLabel: 'COUNTER',
  last: 'PRIME'
}, {
  id: 'set-base',
  type: 'Base',
  picks: [0, 1, 2, 3, 4, 5],
  titles: ['BASE'],
  gloss: 'Prime and Part together, six words most days fit inside.',
  reading: 'An image, an effort, a distance, a thought, a fact and a private ground. Most of what happens in a day sits somewhere across these six before anything more specific gets said about it.',
  question: 'Which two feel furthest apart to you?',
  lastLabel: 'COUNTER',
  last: 'BLEND'
}, {
  id: 'set-blend',
  type: 'Blend',
  blendPicks: [0, 1, 2, 3, 4, 5],
  titles: ['BLEND'],
  gloss: 'The six words Base leaves unnamed, each its own position.',
  reading: 'A Blend position sits where two Base words meet, but isn\u2019t the two of them mixed together. It shows up only once you\u2019re already between two of the six you already have names for.',
  question: 'Which of the six is hardest to name?',
  lastLabel: 'COUNTER',
  last: 'BASE'
}, {
  id: 'pair-body-will',
  type: 'Pair',
  picks: [0, 3],
  titles: ['BODY', 'WILL'],
  gloss: 'Doing runs the show, meaning to catches up after.',
  reading: 'The plain fact of what\u2019s happening physically is running the show. Effort and intention are still there, just behind it, waiting to catch up.',
  question: 'What is your body doing without your say?',
  lastLabel: 'Polar',
  last: 'WILL \u2022 BODY',
  counterId: 'pair-will-body'
}, {
  id: 'pair-will-body',
  type: 'Pair',
  picks: [3, 0],
  titles: ['WILL', 'BODY'],
  gloss: 'Meaning to runs the show, doing catches up after.',
  reading: 'The effort behind an intention is running the show. What\u2019s happening physically is still there, just behind it, waiting to catch up.',
  question: 'What are you willing your body hasn\u2019t met?',
  lastLabel: 'Polar',
  last: 'BODY \u2022 WILL',
  counterId: 'pair-body-will'
}, {
  id: 'pair-mind-high',
  type: 'Pair',
  picks: [4, 1],
  titles: ['MIND', 'HIGH'],
  gloss: 'Reasoning runs first, letting go waits its turn.',
  reading: 'Working the question over from every side comes first. The view that doesn\u2019t argue with itself is what\u2019s left for afterward, if it\u2019s needed at all.',
  question: 'What could you just let go of?',
  lastLabel: 'Polar',
  last: 'HIGH \u2022 MIND',
  counterId: 'pair-high-mind'
}, {
  id: 'pair-high-mind',
  type: 'Pair',
  picks: [1, 4],
  titles: ['HIGH', 'MIND'],
  gloss: 'Letting go runs first, reasoning waits its turn.',
  reading: 'The view from outside your own stake in it comes first. The arguing and re-arguing is what\u2019s left for afterward, if it happens at all.',
  question: 'What have you let go of too fast?',
  lastLabel: 'Polar',
  last: 'MIND \u2022 HIGH',
  counterId: 'pair-mind-high'
}, {
  id: 'pair-self-soul',
  type: 'Pair',
  picks: [5, 2],
  titles: ['SELF', 'SOUL'],
  gloss: 'Image runs the show, what\u2019s underneath waits behind it.',
  reading: 'How you come across is running the show. What you actually care about is still there, just behind it, not yet asked.',
  question: 'What are you presenting right now?',
  lastLabel: 'Polar',
  last: 'SOUL \u2022 SELF',
  counterId: 'pair-soul-self'
}, {
  id: 'pair-soul-self',
  type: 'Pair',
  picks: [2, 5],
  titles: ['SOUL', 'SELF'],
  gloss: 'What\u2019s underneath runs the show, image waits behind it.',
  reading: 'What you actually care about is running the show. How you come across is still there, just behind it, not doing the deciding.',
  question: 'What haven\u2019t you let show yet?',
  lastLabel: 'Polar',
  last: 'SELF \u2022 SOUL',
  counterId: 'pair-self-soul'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "data/aspect-states.js", error: String((e && e.message) || e) }); }

// data/deck-data.js
try { (() => {
// The whole printed deck, on one axis: how much of the ring a card holds.
// Set is a property, never a group. Generated 15 August 2026 from the approved
// single-word copy plus the drafted wider readings lifted from overview-data.js.
// holds: 0 Core, 1 Single, 2 Pair, 3 Triad, 6 Base or Blend, 12 the whole Set.
window.DECK_CARDS = [{
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-core",
  "holds": 0,
  "row": "CORE",
  "type": "Core",
  "titles": ["ZONE"],
  "picks": [],
  "blendPicks": [],
  "gloss": "All potential, before orientation",
  "reading": "Nothing here has taken a direction yet. What follows arises from this quiet centre, which carries no colour of its own because it is looking rather than being looked at.",
  "question": "Is anything pointing anywhere yet?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-core",
  "holds": 0,
  "row": "CORE",
  "type": "Core",
  "titles": ["HERE"],
  "picks": [],
  "blendPicks": [],
  "gloss": "Still, under every passing mood",
  "reading": "Nothing has to be felt for this to be present. It sits behind whatever passes, unchanged by any of it.",
  "question": "What is here when the feeling goes?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-core",
  "holds": 0,
  "row": "CORE",
  "type": "Core",
  "titles": ["YOU"],
  "picks": [],
  "blendPicks": [],
  "gloss": "Witness with no label attached",
  "reading": "Perception arrives before naming does. This is the point that observes and takes no category of its own.",
  "question": "Who is doing the looking?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-12",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["LIFE"],
  "picks": [0],
  "blendPicks": [],
  "gloss": "Raw animation, before intent",
  "reading": "It beats without asking permission and continues whether or not anything is decided. The plainest sign of it is movement that nobody ordered.",
  "question": "What is alive in this moment?",
  "lastLabel": "Polar",
  "last": "FIRE",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-01",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["TONE"],
  "picks": [],
  "blendPicks": [0],
  "gloss": "The pitch a place is set at",
  "reading": "A room is already saying its piece before anyone speaks in it, and whatever is said next is heard through it.",
  "question": "Which tone dominates the current environment?",
  "lastLabel": "Polar",
  "last": "PATH",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-02",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["FLUX"],
  "picks": [1],
  "blendPicks": [],
  "gloss": "Nothing holds its shape long",
  "reading": "Boundaries dissolve and reform without waiting to be understood. What looks like instability is usually the rate at which things are actually moving.",
  "question": "What is shifting out of your control?",
  "lastLabel": "Polar",
  "last": "TIME",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-03",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["FLOW"],
  "picks": [],
  "blendPicks": [1],
  "gloss": "Movement without resistance",
  "reading": "Action and attention stop arguing and run as one thing. Effort does not disappear, it stops being spent on friction.",
  "question": "Where is nothing in your way?",
  "lastLabel": "Polar",
  "last": "META",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-04",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["LOVE"],
  "picks": [2],
  "blendPicks": [],
  "gloss": "The gravity that ends isolation",
  "reading": "It pulls separate things into one thing and holds them there. Less a feeling than a structural necessity, which is why its absence shows up as drift.",
  "question": "What is drawing you closer right now?",
  "lastLabel": "Polar",
  "last": "FORM",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-05",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["BOND"],
  "picks": [],
  "blendPicks": [2],
  "gloss": "A tie chosen, then honoured",
  "reading": "Fastening two things together makes a shared history neither can edit alone. It buys stability and spends freedom.",
  "question": "Which commitment is holding your focus?",
  "lastLabel": "Polar",
  "last": "TYPE",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-06",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["FIRE"],
  "picks": [3],
  "blendPicks": [],
  "gloss": "Energy that consumes to clear",
  "reading": "It insists on full expression and takes the obsolete with it. What is left afterwards is heat and space.",
  "question": "Where is the sudden spark coming from?",
  "lastLabel": "Polar",
  "last": "LIFE",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-07",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["PATH"],
  "picks": [],
  "blendPicks": [3],
  "gloss": "A line forward, made of steps",
  "reading": "Each step narrows what comes next, which is what makes a direction out of a series. It is only visible once a few have been taken.",
  "question": "What is opening up ahead?",
  "lastLabel": "Polar",
  "last": "TONE",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-08",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["TIME"],
  "picks": [4],
  "blendPicks": [],
  "gloss": "The one thing that never waits",
  "reading": "It measures all else and negotiates with none of it. Its pressure is what makes anything feel urgent, or already gone.",
  "question": "How is the clock affecting your pace?",
  "lastLabel": "Polar",
  "last": "FLUX",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-09",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["META"],
  "picks": [],
  "blendPicks": [4],
  "gloss": "The view that shows the rules",
  "reading": "Stepping back costs the detail and buys the structure. From here the game is legible and the moves are not.",
  "question": "What does the framework itself make clear?",
  "lastLabel": "Polar",
  "last": "FLOW",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-10",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["FORM"],
  "picks": [5],
  "blendPicks": [],
  "gloss": "The edge that makes a thing",
  "reading": "Nothing can be handled until it has a limit. Definition is the price of being recognisable.",
  "question": "What gives this its shape?",
  "lastLabel": "Polar",
  "last": "LOVE",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-single-11",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["TYPE"],
  "picks": [],
  "blendPicks": [5],
  "gloss": "Sorting variation into kinds",
  "reading": "Grouping by shared traits makes a crowd handleable. What survives is the template, and what is lost is the exception.",
  "question": "Which category best fits the pattern you see?",
  "lastLabel": "Polar",
  "last": "BOND",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-12",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["BODY"],
  "picks": [0],
  "blendPicks": [],
  "gloss": "Experience, held as weight",
  "reading": "It registers everything first and reports in sensation rather than words. The most literal interface there is.",
  "question": "Which signal has the floor?",
  "lastLabel": "Polar",
  "last": "WILL",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-01",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["MOOD"],
  "picks": [],
  "blendPicks": [0],
  "gloss": "The climate you perceive through",
  "reading": "It settles quietly and filters what arrives without announcing itself. Nothing is received neutrally while it lasts.",
  "question": "What is the real temperature in you?",
  "lastLabel": "Polar",
  "last": "WANT",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-02",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["HIGH"],
  "picks": [1],
  "blendPicks": [],
  "gloss": "Intensity above the baseline",
  "reading": "The threshold where perception widens, whether by clarity or by intoxication. Vivid, and by definition temporary.",
  "question": "How high is this running?",
  "lastLabel": "Polar",
  "last": "MIND",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-03",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["TRUE"],
  "picks": [],
  "blendPicks": [1],
  "gloss": "What survives every illusion",
  "reading": "It needs no defending and does not move when tested. Whatever remains after the stripping is where to stand.",
  "question": "What is impossible to deny right now?",
  "lastLabel": "Polar",
  "last": "VIEW",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-04",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["SOUL"],
  "picks": [2],
  "blendPicks": [],
  "gloss": "Depth that resists formatting",
  "reading": "The part that will not be made useful. Its resonance answers to neither role nor function.",
  "question": "What matters here with no purpose behind it?",
  "lastLabel": "Polar",
  "last": "SELF",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-05",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["NEED"],
  "picks": [],
  "blendPicks": [2],
  "gloss": "The deficit that cannot wait",
  "reading": "Everything secondary falls away in its presence. The requirement is not negotiable, only met or unmet.",
  "question": "What is the minimum that sustains you here?",
  "lastLabel": "Polar",
  "last": "MODE",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-06",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["WILL"],
  "picks": [3],
  "blendPicks": [],
  "gloss": "Intent that refuses to yield",
  "reading": "It gathers what energy there is and drives at the obstacle. Order gets imposed rather than found.",
  "question": "Which outcome will not be let go?",
  "lastLabel": "Polar",
  "last": "BODY",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-07",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["WANT"],
  "picks": [],
  "blendPicks": [3],
  "gloss": "Desire with an object in view",
  "reading": "A pull towards something specific and outside. Survival does not depend on it, though it shapes preference completely.",
  "question": "What has your appetite right now?",
  "lastLabel": "Polar",
  "last": "MOOD",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-08",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["MIND"],
  "picks": [4],
  "blendPicks": [],
  "gloss": "Data turned into concepts",
  "reading": "The working space of logic and strategy. It seeks to understand in order to control.",
  "question": "Which idea is being assembled?",
  "lastLabel": "Polar",
  "last": "HIGH",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-09",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["VIEW"],
  "picks": [],
  "blendPicks": [4],
  "gloss": "Where you stand sets the horizon",
  "reading": "Position decides what can be seen at all. A small move reveals a landscape that was there the whole time.",
  "question": "What does your angle leave out?",
  "lastLabel": "Polar",
  "last": "TRUE",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-10",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["SELF"],
  "picks": [5],
  "blendPicks": [],
  "gloss": "The boundary around the watcher",
  "reading": "It marks where personal territory begins and keeps a distinct perspective. The witness, holding itself separate.",
  "question": "How much space are you claiming?",
  "lastLabel": "Polar",
  "last": "SOUL",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-single-11",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["MODE"],
  "picks": [],
  "blendPicks": [5],
  "gloss": "The setting you are running in",
  "reading": "How energy is spent, and on what terms. Changing it changes the whole method without changing the intent.",
  "question": "How are you configured right now?",
  "lastLabel": "Polar",
  "last": "NEED",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-12",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["ECO"],
  "picks": [0],
  "blendPicks": [],
  "gloss": "Nothing here operates alone",
  "reading": "Every action ripples through what surrounds it. Dependence is mutual whether or not it gets acknowledged.",
  "question": "How is the wider world answering you?",
  "lastLabel": "Polar",
  "last": "MAX",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-01",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["FUN"],
  "picks": [],
  "blendPicks": [0],
  "gloss": "Play that seeks no outcome",
  "reading": "It disrupts the formal without meaning to, and finds its value in the doing. Nothing needs to come of it.",
  "question": "Which part of this serves no purpose?",
  "lastLabel": "Polar",
  "last": "WAY",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-02",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["JOY"],
  "picks": [1],
  "blendPicks": [],
  "gloss": "Radiance, arriving unasked",
  "reading": "It arrives without warning and eclipses whatever anxiety was there. Unforced, and never scheduled.",
  "question": "What is elevating your spirit right now?",
  "lastLabel": "Polar",
  "last": "WIT",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-03",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["ART"],
  "picks": [],
  "blendPicks": [1],
  "gloss": "Experience, turned into form",
  "reading": "A medium worked on purpose until it carries meaning. What was private becomes something others can hold.",
  "question": "What pattern are you consciously shaping here?",
  "lastLabel": "Polar",
  "last": "AIM",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-04",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["GOD"],
  "picks": [2],
  "blendPicks": [],
  "gloss": "The standard above all others",
  "reading": "A placeholder for the highest principle, whatever fills it. Effort gets measured against it.",
  "question": "What authority is guiding your devotion?",
  "lastLabel": "Polar",
  "last": "EGO",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-05",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["SEX"],
  "picks": [],
  "blendPicks": [2],
  "gloss": "Attraction driving union",
  "reading": "A pull that works below argument and breaks down barriers. It seeks fusion rather than proximity.",
  "question": "What is pulling you in?",
  "lastLabel": "Polar",
  "last": "POP",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-06",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["MAX"],
  "picks": [3],
  "blendPicks": [],
  "gloss": "Capacity, at its own edge",
  "reading": "Full output, with no margin left. Integrity gets tested at exactly that point.",
  "question": "What is stretched to its limit right now?",
  "lastLabel": "Polar",
  "last": "ECO",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-07",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["WAY"],
  "picks": [],
  "blendPicks": [3],
  "gloss": "The method that became yours",
  "reading": "A route developed over time until it stopped being chosen. Style is what a practice turns into.",
  "question": "Whose habit is this, really?",
  "lastLabel": "Polar",
  "last": "FUN",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-08",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["WIT"],
  "picks": [4],
  "blendPicks": [],
  "gloss": "Speed that cuts complexity",
  "reading": "Quick perception finding the unexpected connection. It handles difficulty with a light touch.",
  "question": "What did you catch straight away?",
  "lastLabel": "Polar",
  "last": "JOY",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-09",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["AIM"],
  "picks": [],
  "blendPicks": [4],
  "gloss": "Scatter, pulled to one point",
  "reading": "A target selected so that action stops drifting. Everything immediate lines up behind it.",
  "question": "Where exactly is your focus pointing?",
  "lastLabel": "Polar",
  "last": "ART",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-10",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["EGO"],
  "picks": [5],
  "blendPicks": [],
  "gloss": "The persona that guards status",
  "reading": "Built to navigate other people, and useful for it. It defends standing and marks the boundary.",
  "question": "Which identity are you defending?",
  "lastLabel": "Polar",
  "last": "GOD",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-single-11",
  "holds": 1,
  "row": "SINGLE",
  "type": "Single",
  "titles": ["POP"],
  "picks": [],
  "blendPicks": [5],
  "gloss": "What the crowd catches first",
  "reading": "Immediate resonance moving through shared culture. It ignores the gatekeepers and lands directly.",
  "question": "What common signal is catching your attention?",
  "lastLabel": "Polar",
  "last": "SEX",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-1206",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["LIFE", "FIRE"],
  "picks": [0, 3],
  "blendPicks": [],
  "gloss": "Ground first, then the burning",
  "reading": "Vitality keeps its footing while what is finished is consumed. Nothing essential goes with it.",
  "question": "What survives the clearing?",
  "lastLabel": "Polar",
  "last": "FIRE • LIFE",
  "drafted": true,
  "counterId": "r-pair-0612"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0107",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["TONE", "PATH"],
  "picks": [],
  "blendPicks": [0, 3],
  "gloss": "Conditions precede the route",
  "reading": "Nobody sets the atmosphere deliberately, and yet the going takes its character from it. What predates the choice shapes it.",
  "question": "What was already true when this started?",
  "lastLabel": "Polar",
  "last": "PATH • TONE",
  "drafted": true,
  "counterId": "r-pair-0701"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0208",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["FLUX", "TIME"],
  "picks": [1, 4],
  "blendPicks": [],
  "gloss": "Change, with the clock behind it",
  "reading": "Instability sets the terms and duration keeps the record. Passage gets marked without being slowed.",
  "question": "What is moving faster than expected?",
  "lastLabel": "Polar",
  "last": "TIME • FLUX",
  "drafted": true,
  "counterId": "r-pair-0802"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0309",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["FLOW", "META"],
  "picks": [],
  "blendPicks": [1, 4],
  "gloss": "Move now, understand later",
  "reading": "The current carries and the overview waits. Explanation arriving early is what stalls it.",
  "question": "Is thinking about it slowing it down?",
  "lastLabel": "Polar",
  "last": "META • FLOW",
  "drafted": true,
  "counterId": "r-pair-0903"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0410",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["LOVE", "FORM"],
  "picks": [2, 5],
  "blendPicks": [],
  "gloss": "Attraction, then the vessel",
  "reading": "What gathers decides the shape that ends up holding it. Structure is the consequence, not the cause.",
  "question": "What is being drawn together here?",
  "lastLabel": "Polar",
  "last": "FORM • LOVE",
  "drafted": true,
  "counterId": "r-pair-1004"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0511",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["BOND", "TYPE"],
  "picks": [],
  "blendPicks": [2, 5],
  "gloss": "The particular over the general",
  "reading": "One tie carries a history no classification can hold. A shared trait is thinner than a shared past.",
  "question": "Which connection resists being filed?",
  "lastLabel": "Polar",
  "last": "TYPE • BOND",
  "drafted": true,
  "counterId": "r-pair-1105"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0612",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["FIRE", "LIFE"],
  "picks": [3, 0],
  "blendPicks": [],
  "gloss": "The clearing, then what remains",
  "reading": "Something insists on burning, and what lies underneath keeps going. Renewal needs the order kept.",
  "question": "What is asking to end?",
  "lastLabel": "Polar",
  "last": "LIFE • FIRE",
  "drafted": true,
  "counterId": "r-pair-1206"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0701",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["PATH", "TONE"],
  "picks": [],
  "blendPicks": [3, 0],
  "gloss": "Direction changes the air",
  "reading": "Steps carve a route, and the surroundings take their character from where it goes. Choice leaves a residue.",
  "question": "How has the going changed the feel?",
  "lastLabel": "Polar",
  "last": "TONE • PATH",
  "drafted": true,
  "counterId": "r-pair-0107"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0802",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["TIME", "FLUX"],
  "picks": [4, 1],
  "blendPicks": [],
  "gloss": "Rhythm over restlessness",
  "reading": "Sequence imposes a beat on something that will not settle. The drift continues, made bearable.",
  "question": "What is steadying the churn?",
  "lastLabel": "Polar",
  "last": "FLUX • TIME",
  "drafted": true,
  "counterId": "r-pair-0208"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-0903",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["META", "FLOW"],
  "picks": [],
  "blendPicks": [4, 1],
  "gloss": "Read the map, then walk",
  "reading": "The structure is grasped before the current is entered. Understanding first costs time and saves it.",
  "question": "What did stepping back show you?",
  "lastLabel": "Polar",
  "last": "FLOW • META",
  "drafted": true,
  "counterId": "r-pair-0309"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-1004",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["FORM", "LOVE"],
  "picks": [5, 2],
  "blendPicks": [],
  "gloss": "A container, then closeness",
  "reading": "Limits hold a space, and what grows inside is safe because the space is held. Definition protects.",
  "question": "What is your structure making room for?",
  "lastLabel": "Polar",
  "last": "LOVE • FORM",
  "drafted": true,
  "counterId": "r-pair-0410"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-pair-1105",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["TYPE", "BOND"],
  "picks": [],
  "blendPicks": [5, 2],
  "gloss": "The template, then the tie",
  "reading": "Sorting shows where an attachment belongs before one is made. Pattern does the discarding, quietly and early.",
  "question": "Which category is choosing for you?",
  "lastLabel": "Polar",
  "last": "BOND • TYPE",
  "drafted": true,
  "counterId": "r-pair-0511"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-1206",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["BODY", "WILL"],
  "picks": [0, 3],
  "blendPicks": [],
  "gloss": "Flesh moves before the decision",
  "reading": "What happens is often already under way when intent catches up. Deciding can be retrospective.",
  "question": "What began without your say-so?",
  "lastLabel": "Polar",
  "last": "WILL • BODY",
  "drafted": true,
  "counterId": "s-pair-0612"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0107",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["MOOD", "WANT"],
  "picks": [],
  "blendPicks": [0, 3],
  "gloss": "Weather decides the appetite",
  "reading": "What appeals is settled by the climate it is seen through. Desire inherits the temperature.",
  "question": "What looks good only because of today?",
  "lastLabel": "Polar",
  "last": "WANT • MOOD",
  "drafted": true,
  "counterId": "s-pair-0701"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0208",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["HIGH", "MIND"],
  "picks": [1, 4],
  "blendPicks": [],
  "gloss": "Lift first, reason after",
  "reading": "The peak widens perception before analysis has anything to say. The account comes later.",
  "question": "What did the surge show you?",
  "lastLabel": "Polar",
  "last": "MIND • HIGH",
  "drafted": true,
  "counterId": "s-pair-0802"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0309",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["TRUE", "VIEW"],
  "picks": [],
  "blendPicks": [1, 4],
  "gloss": "Fact holds, the angle moves",
  "reading": "What is real stays put under any perspective. Looking is what adjusts.",
  "question": "What refuses to shift?",
  "lastLabel": "Polar",
  "last": "VIEW • TRUE",
  "drafted": true,
  "counterId": "s-pair-0903"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0410",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["SOUL", "SELF"],
  "picks": [2, 5],
  "blendPicks": [],
  "gloss": "Depth under the image",
  "reading": "Resonance governs from inside while the outward identity keeps the border. Character is unaffected by presentation.",
  "question": "What guides you beneath appearances?",
  "lastLabel": "Polar",
  "last": "SELF • SOUL",
  "drafted": true,
  "counterId": "s-pair-1004"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0511",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["NEED", "MODE"],
  "picks": [],
  "blendPicks": [2, 5],
  "gloss": "The requirement resets the method",
  "reading": "A deficit overrides preference and the way of working reconfigures around it. Comfort is dropped first.",
  "question": "What must be met before anything else?",
  "lastLabel": "Polar",
  "last": "MODE • NEED",
  "drafted": true,
  "counterId": "s-pair-1105"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0612",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["WILL", "BODY"],
  "picks": [3, 0],
  "blendPicks": [],
  "gloss": "Resolve, carried on weight",
  "reading": "Determination sets the direction and something physical does the carrying. Intent alone stays intent.",
  "question": "How much is actually behind this?",
  "lastLabel": "Polar",
  "last": "BODY • WILL",
  "drafted": true,
  "counterId": "s-pair-1206"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0701",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["WANT", "MOOD"],
  "picks": [],
  "blendPicks": [3, 0],
  "gloss": "The object tints the climate",
  "reading": "Desire for one particular thing colours all that sits near it. Feeling arranges itself around the target.",
  "question": "What are you reaching for?",
  "lastLabel": "Polar",
  "last": "MOOD • WANT",
  "drafted": true,
  "counterId": "s-pair-0107"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0802",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["MIND", "HIGH"],
  "picks": [4, 1],
  "blendPicks": [],
  "gloss": "Order, then the lift",
  "reading": "Methodical work builds the surface insight lands on. Nothing arrives out of nowhere.",
  "question": "Where is the slow part right now?",
  "lastLabel": "Polar",
  "last": "HIGH • MIND",
  "drafted": true,
  "counterId": "s-pair-0208"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-0903",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["VIEW", "TRUE"],
  "picks": [],
  "blendPicks": [4, 1],
  "gloss": "The angle finds the ground",
  "reading": "Sustained looking wears down what was assumed. Perspective is the route, not the destination.",
  "question": "What has staying with it revealed?",
  "lastLabel": "Polar",
  "last": "TRUE • VIEW",
  "drafted": true,
  "counterId": "s-pair-0309"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-1004",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["SELF", "SOUL"],
  "picks": [5, 2],
  "blendPicks": [],
  "gloss": "The border, then the depth",
  "reading": "Identity fences a territory that resonance can later use. Protection comes before expression.",
  "question": "What needs the boundary right now?",
  "lastLabel": "Polar",
  "last": "SOUL • SELF",
  "drafted": true,
  "counterId": "s-pair-0410"
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-pair-1105",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["MODE", "NEED"],
  "picks": [],
  "blendPicks": [5, 2],
  "gloss": "Method, judged by what it meets",
  "reading": "How a thing runs matters only against what has to be satisfied. Configuration serves the requirement.",
  "question": "Is your current setting serving you?",
  "lastLabel": "Polar",
  "last": "NEED • MODE",
  "drafted": true,
  "counterId": "s-pair-0511"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-1206",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["ECO", "MAX"],
  "picks": [0, 3],
  "blendPicks": [],
  "gloss": "The web takes the strain",
  "reading": "Surroundings spread a load no single point could hold. The limit tests what is around it.",
  "question": "Who else is carrying this?",
  "lastLabel": "Polar",
  "last": "MAX • ECO",
  "drafted": true,
  "counterId": "t-pair-0612"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0107",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["FUN", "WAY"],
  "picks": [],
  "blendPicks": [0, 3],
  "gloss": "Play, hardening into method",
  "reading": "What began without purpose becomes standard practice. Discipline often starts as amusement.",
  "question": "What turned into a habit?",
  "lastLabel": "Polar",
  "last": "WAY • FUN",
  "drafted": true,
  "counterId": "t-pair-0701"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0208",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["JOY", "WIT"],
  "picks": [1, 4],
  "blendPicks": [],
  "gloss": "Delight, then the phrasing",
  "reading": "The lightness arrives first and quickness gives it words. Speech follows feeling.",
  "question": "What made you laugh before you thought?",
  "lastLabel": "Polar",
  "last": "WIT • JOY",
  "drafted": true,
  "counterId": "t-pair-0802"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0309",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["ART", "AIM"],
  "picks": [],
  "blendPicks": [1, 4],
  "gloss": "Making, then the target",
  "reading": "Direction becomes clear in the work rather than before it. The goal is discovered, not set.",
  "question": "What has the doing revealed?",
  "lastLabel": "Polar",
  "last": "AIM • ART",
  "drafted": true,
  "counterId": "t-pair-0903"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0410",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["GOD", "EGO"],
  "picks": [2, 5],
  "blendPicks": [],
  "gloss": "The higher standard, then the self",
  "reading": "Something above keeps personal standing in proportion. Reverence is what stops the persona expanding.",
  "question": "What outranks you right now?",
  "lastLabel": "Polar",
  "last": "EGO • GOD",
  "drafted": true,
  "counterId": "t-pair-1004"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0511",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["SEX", "POP"],
  "picks": [],
  "blendPicks": [2, 5],
  "gloss": "Private charge, public signal",
  "reading": "An instinctual pull gets broadcast and picked up widely. What is intimate becomes cultural.",
  "question": "What is spreading from something personal?",
  "lastLabel": "Polar",
  "last": "POP • SEX",
  "drafted": true,
  "counterId": "t-pair-1105"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0612",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["MAX", "ECO"],
  "picks": [3, 0],
  "blendPicks": [],
  "gloss": "The limit, held by the web",
  "reading": "Full output is only sustainable where a reserve absorbs it. Effort needs a buffer.",
  "question": "What is absorbing your exertion?",
  "lastLabel": "Polar",
  "last": "ECO • MAX",
  "drafted": true,
  "counterId": "t-pair-1206"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0701",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["WAY", "FUN"],
  "picks": [],
  "blendPicks": [3, 0],
  "gloss": "Method, loosened by play",
  "reading": "Routine holds while enjoyment stops it setting hard. Discipline lasts longer when it is not grim.",
  "question": "What would make this lighter?",
  "lastLabel": "Polar",
  "last": "FUN • WAY",
  "drafted": true,
  "counterId": "t-pair-0107"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0802",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["WIT", "JOY"],
  "picks": [4, 1],
  "blendPicks": [],
  "gloss": "Insight, then the laugh",
  "reading": "A problem solved quickly turns into shared lightness. Cleverness is social before it is useful.",
  "question": "What broke the tension?",
  "lastLabel": "Polar",
  "last": "JOY • WIT",
  "drafted": true,
  "counterId": "t-pair-0208"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-0903",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["AIM", "ART"],
  "picks": [],
  "blendPicks": [4, 1],
  "gloss": "The target, given a form",
  "reading": "Purpose becomes something that can be looked at. Intention takes a shape in order to be shared.",
  "question": "What is your intent turning into?",
  "lastLabel": "Polar",
  "last": "ART • AIM",
  "drafted": true,
  "counterId": "t-pair-0309"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-1004",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["EGO", "GOD"],
  "picks": [5, 2],
  "blendPicks": [],
  "gloss": "Defence, yielding to devotion",
  "reading": "The boundary stands until a larger claim arrives. Surrender is late and deliberate.",
  "question": "What still refuses to give way?",
  "lastLabel": "Polar",
  "last": "GOD • EGO",
  "drafted": true,
  "counterId": "t-pair-0410"
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-pair-1105",
  "holds": 2,
  "row": "PAIR",
  "type": "Pair",
  "titles": ["POP", "SEX"],
  "picks": [],
  "blendPicks": [5, 2],
  "gloss": "Wide reach, deeper pull",
  "reading": "A shared signal gathers attention, and instinct keeps it there. Exposure is the doorway.",
  "question": "What drew the crowd in first?",
  "lastLabel": "Polar",
  "last": "SEX • POP",
  "drafted": true,
  "counterId": "t-pair-0511"
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-triad-prime",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PRIME"],
  "picks": [1, 3, 5],
  "blendPicks": [],
  "grid": [{
    "w": "FLUX",
    "col": "#FFD100"
  }, {
    "w": "FIRE",
    "col": "#FF0000"
  }, {
    "w": "FORM",
    "col": "#2277FF"
  }],
  "gloss": "A triangle, held in balance",
  "reading": "No position here opposes another. The weight sits evenly rather than pulling to one side.",
  "question": "Which of the three anchors holds your focus?",
  "lastLabel": "Counter",
  "last": "PART",
  "counterId": "r-triad-part",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-triad-part",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PART"],
  "picks": [0, 2, 4],
  "blendPicks": [],
  "grid": [{
    "w": "LIFE",
    "col": "#00D460"
  }, {
    "w": "LOVE",
    "col": "#FF7700"
  }, {
    "w": "TIME",
    "col": "#9933CC"
  }],
  "gloss": "The triangle the first leaves",
  "reading": "The positions the other arrangement passes over. Between them the structure closes.",
  "question": "Which quieter anchor steadies the noise?",
  "lastLabel": "Counter",
  "last": "PRIME",
  "counterId": "r-triad-prime",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-triad-prime",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PRIME"],
  "picks": [1, 3, 5],
  "blendPicks": [],
  "grid": [{
    "w": "HIGH",
    "col": "#FFD100"
  }, {
    "w": "WILL",
    "col": "#FF0000"
  }, {
    "w": "SELF",
    "col": "#2277FF"
  }],
  "gloss": "The anchors doing the work",
  "reading": "None of them can take over. Stability comes from the distribution rather than from a single hold.",
  "question": "Which anchor carries the weight today?",
  "lastLabel": "Counter",
  "last": "PART",
  "counterId": "s-triad-part",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-triad-part",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PART"],
  "picks": [0, 2, 4],
  "blendPicks": [],
  "grid": [{
    "w": "BODY",
    "col": "#00D460"
  }, {
    "w": "SOUL",
    "col": "#FF7700"
  }, {
    "w": "MIND",
    "col": "#9933CC"
  }],
  "gloss": "Quiet ground under the effort",
  "reading": "It carries on where visible work stops. Unseen, and load bearing.",
  "question": "What is holding you up unnoticed?",
  "lastLabel": "Counter",
  "last": "PRIME",
  "counterId": "s-triad-prime",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-triad-prime",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PRIME"],
  "picks": [1, 3, 5],
  "blendPicks": [],
  "grid": [{
    "w": "JOY",
    "col": "#FFD100"
  }, {
    "w": "MAX",
    "col": "#FF0000"
  }, {
    "w": "EGO",
    "col": "#2277FF"
  }],
  "gloss": "The marks that face outward",
  "reading": "In balance, and fastening the main relational structure. Even distribution across what shows.",
  "question": "Which anchor holds your activity?",
  "lastLabel": "Counter",
  "last": "PART",
  "counterId": "t-triad-part",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-triad-part",
  "holds": 3,
  "row": "TRIAD",
  "type": "Triad",
  "titles": ["PART"],
  "picks": [0, 2, 4],
  "blendPicks": [],
  "grid": [{
    "w": "ECO",
    "col": "#00D460"
  }, {
    "w": "GOD",
    "col": "#FF7700"
  }, {
    "w": "WIT",
    "col": "#9933CC"
  }],
  "gloss": "The subtler marks, easily missed",
  "reading": "They handle what falls between the obvious ones, and ground what those leave open.",
  "question": "Which subtle mark grounds this?",
  "lastLabel": "Counter",
  "last": "PRIME",
  "counterId": "t-triad-prime",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-base",
  "holds": 6,
  "row": "BASE",
  "type": "Base",
  "titles": ["BASE"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [],
  "grid": [{
    "w": "LIFE",
    "col": "#00D460"
  }, {
    "w": "FLUX",
    "col": "#FFD100"
  }, {
    "w": "LOVE",
    "col": "#FF7700"
  }, {
    "w": "FIRE",
    "col": "#FF0000"
  }, {
    "w": "TIME",
    "col": "#9933CC"
  }, {
    "w": "FORM",
    "col": "#2277FF"
  }],
  "gloss": "Where each circle is centred",
  "reading": "These map the main outline. The rest take their bearings from them.",
  "question": "Which centre are you standing on?",
  "lastLabel": "Counter",
  "last": "BLEND",
  "counterId": "r-blend",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-blend",
  "holds": 6,
  "row": "BLEND",
  "type": "Blend",
  "titles": ["BLEND"],
  "picks": [],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "TONE",
    "col": "#99DD00"
  }, {
    "w": "FLOW",
    "col": "#FFB000"
  }, {
    "w": "BOND",
    "col": "#FF5500"
  }, {
    "w": "PATH",
    "col": "#E02888"
  }, {
    "w": "META",
    "col": "#6655FF"
  }, {
    "w": "TYPE",
    "col": "#00BBDD"
  }],
  "gloss": "Where two circles cross",
  "reading": "Two overlapping fields make a third thing that belongs to neither. The geometry has a name for it before language does.",
  "question": "Which meeting point are you at?",
  "lastLabel": "Counter",
  "last": "BASE",
  "counterId": "r-base",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-base",
  "holds": 6,
  "row": "BASE",
  "type": "Base",
  "titles": ["BASE"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [],
  "grid": [{
    "w": "BODY",
    "col": "#00D460"
  }, {
    "w": "HIGH",
    "col": "#FFD100"
  }, {
    "w": "SOUL",
    "col": "#FF7700"
  }, {
    "w": "WILL",
    "col": "#FF0000"
  }, {
    "w": "MIND",
    "col": "#9933CC"
  }, {
    "w": "SELF",
    "col": "#2277FF"
  }],
  "gloss": "The steady points, not the transit",
  "reading": "These frame ordinary experience, and give a day a scale to read against.",
  "question": "Which of them are you nearest?",
  "lastLabel": "Counter",
  "last": "BLEND",
  "counterId": "s-blend",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-blend",
  "holds": 6,
  "row": "BLEND",
  "type": "Blend",
  "titles": ["BLEND"],
  "picks": [],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "MOOD",
    "col": "#99DD00"
  }, {
    "w": "TRUE",
    "col": "#FFB000"
  }, {
    "w": "NEED",
    "col": "#FF5500"
  }, {
    "w": "WANT",
    "col": "#E02888"
  }, {
    "w": "VIEW",
    "col": "#6655FF"
  }, {
    "w": "MODE",
    "col": "#00BBDD"
  }],
  "gloss": "The states found only in transit",
  "reading": "Each one sits on the way to somewhere else, rarely a place to stop. Brief, and easy to mistake for the state just left.",
  "question": "Which in-between are you in today?",
  "lastLabel": "Counter",
  "last": "BASE",
  "counterId": "s-base",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-base",
  "holds": 6,
  "row": "BASE",
  "type": "Base",
  "titles": ["BASE"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [],
  "grid": [{
    "w": "ECO",
    "col": "#00D460"
  }, {
    "w": "JOY",
    "col": "#FFD100"
  }, {
    "w": "GOD",
    "col": "#FF7700"
  }, {
    "w": "MAX",
    "col": "#FF0000"
  }, {
    "w": "WIT",
    "col": "#9933CC"
  }, {
    "w": "EGO",
    "col": "#2277FF"
  }],
  "gloss": "Plain marks for what is outside",
  "reading": "Ordinary words for ordinary circumstances, which is why they get reached for first.",
  "question": "Which mark describes your surroundings?",
  "lastLabel": "Counter",
  "last": "BLEND",
  "counterId": "t-blend",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-blend",
  "holds": 6,
  "row": "BLEND",
  "type": "Blend",
  "titles": ["BLEND"],
  "picks": [],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "FUN",
    "col": "#99DD00"
  }, {
    "w": "ART",
    "col": "#FFB000"
  }, {
    "w": "SEX",
    "col": "#FF5500"
  }, {
    "w": "WAY",
    "col": "#E02888"
  }, {
    "w": "AIM",
    "col": "#6655FF"
  }, {
    "w": "POP",
    "col": "#00BBDD"
  }],
  "gloss": "Marks for what sits in between",
  "reading": "Ordinary speech runs out here, so these get described by what they sit near. Useful anyway, and often the most accurate.",
  "question": "Which condition has no plain word?",
  "lastLabel": "Counter",
  "last": "BASE",
  "counterId": "t-base",
  "drafted": true
}, {
  "set": "Abstract REALM",
  "setKey": "r",
  "ring": "outer",
  "id": "r-set",
  "holds": 12,
  "row": "SET",
  "type": "Set",
  "titles": ["REALM"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "LIFE",
    "col": "#00D460"
  }, {
    "w": "TONE",
    "col": "#99DD00"
  }, {
    "w": "FLUX",
    "col": "#FFD100"
  }, {
    "w": "FLOW",
    "col": "#FFB000"
  }, {
    "w": "LOVE",
    "col": "#FF7700"
  }, {
    "w": "BOND",
    "col": "#FF5500"
  }, {
    "w": "FIRE",
    "col": "#FF0000"
  }, {
    "w": "PATH",
    "col": "#E02888"
  }, {
    "w": "TIME",
    "col": "#9933CC"
  }, {
    "w": "META",
    "col": "#6655FF"
  }, {
    "w": "FORM",
    "col": "#2277FF"
  }, {
    "w": "TYPE",
    "col": "#00BBDD"
  }],
  "gloss": "The world a thing belongs to",
  "reading": "Realm names the widest frame, with nobody in it. The answer stays true whether anyone is standing there or not.",
  "question": "Where does this belong?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}, {
  "set": "Aspect STATE",
  "setKey": "s",
  "ring": "mid",
  "id": "s-set",
  "holds": 12,
  "row": "SET",
  "type": "Set",
  "titles": ["STATE"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "BODY",
    "col": "#00D460"
  }, {
    "w": "MOOD",
    "col": "#99DD00"
  }, {
    "w": "HIGH",
    "col": "#FFD100"
  }, {
    "w": "TRUE",
    "col": "#FFB000"
  }, {
    "w": "SOUL",
    "col": "#FF7700"
  }, {
    "w": "NEED",
    "col": "#FF5500"
  }, {
    "w": "WILL",
    "col": "#FF0000"
  }, {
    "w": "WANT",
    "col": "#E02888"
  }, {
    "w": "MIND",
    "col": "#9933CC"
  }, {
    "w": "VIEW",
    "col": "#6655FF"
  }, {
    "w": "SELF",
    "col": "#2277FF"
  }, {
    "w": "MODE",
    "col": "#00BBDD"
  }],
  "gloss": "Something you are in, not near",
  "reading": "State is the condition, not the object sitting in it. It moves fastest of the three, and it colours everything attention lands on while it lasts.",
  "question": "What are you in, right now?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}, {
  "set": "Anchor TAG",
  "setKey": "t",
  "ring": "inner",
  "id": "t-set",
  "holds": 12,
  "row": "SET",
  "type": "Set",
  "titles": ["TAG"],
  "picks": [0, 1, 2, 3, 4, 5],
  "blendPicks": [0, 1, 2, 3, 4, 5],
  "grid": [{
    "w": "ECO",
    "col": "#00D460"
  }, {
    "w": "FUN",
    "col": "#99DD00"
  }, {
    "w": "JOY",
    "col": "#FFD100"
  }, {
    "w": "ART",
    "col": "#FFB000"
  }, {
    "w": "GOD",
    "col": "#FF7700"
  }, {
    "w": "SEX",
    "col": "#FF5500"
  }, {
    "w": "MAX",
    "col": "#FF0000"
  }, {
    "w": "WAY",
    "col": "#E02888"
  }, {
    "w": "WIT",
    "col": "#9933CC"
  }, {
    "w": "AIM",
    "col": "#6655FF"
  }, {
    "w": "EGO",
    "col": "#2277FF"
  }, {
    "w": "POP",
    "col": "#00BBDD"
  }],
  "gloss": "What a thing gets called",
  "reading": "The name comes from whatever it attaches to, in ordinary speech. Easiest of the three to say out loud.",
  "question": "What would you call this?",
  "lastLabel": "",
  "last": "",
  "drafted": true
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "data/deck-data.js", error: String((e && e.message) || e) }); }

// lib/aspect-render.js
try { (() => {
// Shared mark + word-block geometry for an Aspect States card, given a content
// entry from aspect-states-data.js. Used by Introduction.dc.html (13 cards,
// looped) and Master.dc.html (one specimen card, picked by id). Keeping the
// geometry here means a layout change (mark size, corner, title size) only
// has to be made once.
window.AspectRender = {
  // The six and the six, read from the one position table in
  // components/core/positions.js rather than written out again here.
  // The position index at an angle, read from the one position table.
  POS_AT_ANGLE(a) {
    const t = window.RESOURCE_POSITIONS || [];
    const hit = t.find(x => x.a === (a % 360 + 360) % 360);
    return hit ? hit.i : '00';
  },
  get BASE_HEX() {
    return window.RESOURCE_BASE_HEX;
  },
  get BLEND_HEX() {
    return window.RESOURCE_BLEND_HEX;
  },
  /* The counter card: what a flip turns over to. A Single turns to the position opposite
     it, three steps of six round, base to base and blend to blend. A Triad turns between
     Prime and Part, a Group between Base and Blend: two cards each, so the counter is the
     other one. Core and Set stand alone. Stated here once; the master card, the deck and the flower
     all read it from here. */
  counterOf(entry, deck) {
    if (!entry || !deck) return null;
    const inSet = deck.filter(c => c.set === entry.set);
    // A card that names its counter in the data is believed: a Pair's counter is the same axis
    // read from the other end, which is a card of its own rather than a swap of two words.
    if (entry.counterId) return inSet.find(x => x.id === entry.counterId) || null;
    if (entry.titles && entry.titles.length === 2) return null;
    if (entry.row === 'SINGLE') {
      const base = (entry.picks || [])[0],
        blend = (entry.blendPicks || [])[0];
      return inSet.find(x => x.row === 'SINGLE' && (base !== undefined ? (x.picks || [])[0] === (base + 3) % 6 : (x.blendPicks || [])[0] === (blend + 3) % 6)) || null;
    }
    if (entry.row === 'TRIAD') return inSet.find(x => x.row === 'TRIAD' && x.id !== entry.id) || null;
    if (entry.row === 'BASE' || entry.row === 'BLEND') {
      return inSet.find(x => (x.row === 'BASE' || x.row === 'BLEND') && x.id !== entry.id) || null;
    }
    return null;
  },
  /* A set's own twelve words, read from its Single cards: each Single names one position
     and says which one through picks or blendPicks. The system records no position words
     of its own, so the grid is filled from the deck data the card already draws from. */
  wordsFor(set, deck) {
    const base = [],
      blend = [];
    (deck || []).filter(c => c.set === set && c.row === 'SINGLE').forEach(c => {
      const w = (c.titles || [])[0] || '';
      (c.picks || []).forEach(i => {
        base[i] = w;
      });
      (c.blendPicks || []).forEach(i => {
        blend[i] = w;
      });
    });
    return {
      base,
      blend
    };
  },
  build(entry, opts) {
    opts = opts || {};
    const size = opts.size ?? 120;
    const stroke = 3;
    const flip = !!opts.flipped && entry.titles.length === 2;
    // A flip swaps the two words over, and the bar swaps with them, since each
    // colour belongs to its word by name. Both words stay white: the lead reads
    // from its place at the top, not from a change of tone. The mark itself
    // never turns, so the axis stays where the axis really is; only the lead
    // ring and marker grow. Retired 17 August: the 180 turn of the whole mark,
    // and the g48 trailing word that followed it.
    const titles = flip ? entry.titles.slice().reverse() : entry.titles;
    const leadTitle = 0;
    const LEAD_TONE = '#FFFFFF',
      TRAIL_TONE = '#FFFFFF';
    const picks = entry.picks || [];
    const blendPicks = entry.blendPicks || [];
    // A word-free card (geometry, shape) draws its picked rings in white
    // instead of position colour, since it describes the wheel rather than
    // any one position on it.
    const white = !!entry.white;
    const hexBase = i => white ? '#FFFFFF' : this.BASE_HEX[i];
    const hexBlend = i => white ? '#FFFFFF' : this.BLEND_HEX[i];
    const colours = picks.map(hexBase).concat(blendPicks.map(hexBlend));
    // A bar carrying more than one colour runs as the spectrum, in wheel
    // order, not in pick order: base at i*60, blend at i*60+30, sorted by
    // angle. Pick order put all six bases before all six blends, which read
    // as two ramps rather than one ring.
    const spectrum = picks.map(i => ({
      a: i * 60,
      c: hexBase(i)
    })).concat(blendPicks.map(i => ({
      a: i * 60 + 30,
      c: hexBlend(i)
    }))).sort((x, y) => x.a - y.a).map(x => x.c);
    const vertical = opts.vertical != null ? opts.vertical : titles.length === 2; // pairs stack top/bottom; words and groups sit side by side with the mark
    // Colour follows the word by name, not by array position, so a flip can't
    // mispair a title with the wrong bar/ring colour.
    // Titles align to whichever pick list the entry actually uses, so a Blend
    // pair (no Base picks at all) colours its two words from BLEND_HEX rather
    // than reading undefined off BASE_HEX.
    const titleHexes = picks.length ? picks.map(hexBase) : blendPicks.map(hexBlend);
    const titleColour = {};
    entry.titles.forEach((t, k) => {
      titleColour[t] = titleHexes[k];
    });
    const TITLE = 36,
      TITLE_GAP = 4,
      BAR = 3,
      CORNER = 0;
    const c = size / 2;
    const round = n => Math.round(n * 100) / 100;
    const r = (c - stroke / 2) / 2;
    const core = r;
    const cy = c - core;
    const spin = a => 'rotate(' + a + ' ' + c + ' ' + c + ')';
    const ring = i => ({
      cx: c,
      cy,
      r,
      rot: spin(i * 30)
    });
    const markCircles = [];
    for (let i = 0; i < 12; i++) markCircles.push({
      ...ring(i),
      stroke: '#333333',
      width: 1
    });
    // The core's own marker ring is drawn separately, after the void glow, so
    // it reads on top of the glow rather than under it.
    const coreRing = {
      cx: c,
      cy: c,
      r: core
    };

    // Whichever pick is currently first in title order (accounting for flip)
    // is the lead: bigger ring, bigger marker. Position, not array order.
    // A Single word gets the same lead emphasis a Pair gives its first pick
    // — bigger ring, bigger marker — since it is, in effect, a one-word Pair.
    const leadIndex = picks.length === 2 ? flip ? picks[1] : picks[0] : picks.length === 1 ? picks[0] : null;
    // A Blend pair carries its lead on the Blend ring instead, same rule.
    const blendLeadIndex = !picks.length && blendPicks.length === 2 ? flip ? blendPicks[1] : blendPicks[0] : !picks.length && blendPicks.length === 1 ? blendPicks[0] : null;
    // The lead pick's spot on the twelve-point wheel: Base i sits at i*60,
    // Blend i at i*60+30, numbered P01 at 0 degrees round to P12 at 330.
    const posBase = leadIndex != null ? leadIndex : picks.length ? picks[0] : null;
    const posBlend = posBase == null ? blendPicks[0] ?? null : null;
    const posAngle = posBase != null ? posBase * 60 : posBlend * 60 + 30;
    // Numbered like a clock face: 0 degrees (12 o'clock) is P12, 30 degrees
    // (1 o'clock) is P01, running clockwise from there.
    const posNumber = (posAngle / 30 + 11) % 12 + 1;
    // The label names the positions the card holds and nothing else, always on
    // the clock face, lead first. Retired 18 August 2026: the angle after a
    // single position, and the count-and-step form a wider card used to take,
    // as 3× 120°. Neither said which positions were held, which is the one
    // thing the label is for.
    const posCount = picks.length + blendPicks.length;
    const pad = n => String(n).padStart(2, '0');
    let posRun = picks.map(i => i * 60).concat(blendPicks.map(i => i * 60 + 30)).sort((x, y) => x - y).map(a => (a / 30 + 11) % 12 + 1);
    const posLeadAt = posRun.indexOf(posNumber);
    if (posLeadAt > 0) posRun = [posRun[posLeadAt]].concat(posRun.slice(0, posLeadAt), posRun.slice(posLeadAt + 1));
    // Numbers are joined by the middle dot, the same separator the polar words
    // and every other metadata line take.
    // A whole ring is a range, since listing twelve numbers would run past the
    // card. Six is the same problem: eighteen characters overran the frame, so
    // a Group prints its span alone. Retired 18 August, the same day it was
    // tried: the EVEN and ODD qualifier after it. Three or fewer list in full.
    const posSorted = posRun.slice().sort((x, y) => x - y);
    const posEvenStep = posSorted.length > 3 && posSorted.every((n, k) => k === 0 || n - posSorted[k - 1] === 2);
    const posLabel = posCount === 0 ? 'VOID' : posCount === 12 ? 'P01\u2013P12' : posEvenStep ? 'P' + pad(posSorted[0]) + '\u2013P' + pad(posSorted[posSorted.length - 1]) : 'P' + posRun.map(pad).join('\u00b7');
    const isPair = picks.length === 2 || blendPicks.length === 2;
    // A soft black shadow under each lit ring, drawn as three black strokes of
    // decreasing width and rising opacity rather than a blur filter, and
    // interleaved so each petal's shadow lands on the petals drawn before it.
    // Eight steps, not three: three banded and read as concentric rings rather
    // than a fade.
    // That is where the depth reads: a shadow on the near-black card itself has
    // only 1px grey rings to darken. Size is the spread in mark px, 0 off, drop
    // the offset down as a fraction of the spread, depth the opacity.
    // Retired 18 August, all tried the same day: a coloured blur, a coloured
    // glow with no offset, one hard under-ring with no fade, a whole-group
    // drop-shadow filter, which was invisible, and a per-ring drop-shadow
    // filter, twelve of which cost more to raster than the effect was worth.
    const pgSize = opts.petalShadowSize ?? 0;
    const pgDepth = opts.petalShadowDepth ?? 0.9;
    const pgDrop = opts.petalShadowDrop ?? 0.33;
    const petalShadow = 'none';
    const PG_STEPS = 8;
    const shadowOf = w => {
      if (pgSize <= 0) return [];
      // The layers stack, so each one's opacity is a share of the total rather
      // than a value in its own right: at 0.9 a share the eight together read
      // as solid black and smoked the petals out.
      const ramp = [];
      for (let k = PG_STEPS; k >= 1; k--) ramp.push(Math.pow(1 - (k - 0.5) / PG_STEPS, 2));
      const sum = ramp.reduce((a, b) => a + b, 0);
      return ramp.map((v, n) => ({
        w: round(w + pgSize * 2 * (1 - (n + 0.5) / PG_STEPS)),
        o: round(pgDepth * (v / sum) * 1000) / 1000,
        cy: round(cy + pgSize * pgDrop)
      }));
    };
    const markPickedAll = picks.map(i => ({
      ...ring(i * 2),
      stroke: hexBase(i),
      width: i === leadIndex ? stroke + 2 : stroke,
      glow: 'none',
      sh: shadowOf(i === leadIndex ? stroke + 2 : stroke)
    })).concat(blendPicks.map((i, n) => ({
      cx: c,
      cy,
      r,
      rot: spin(i * 60 + 30),
      stroke: colours[picks.length + n],
      width: i === blendLeadIndex ? stroke + 2 : stroke,
      glow: 'none',
      sh: shadowOf(i === blendLeadIndex ? stroke + 2 : stroke)
    }))).reverse();
    // A Single or a Pair holds few enough rings that the void glow washing over
    // them loses the selection. Those draw above the core instead. A Triad or
    // wider keeps the rings under the glow, so the pupil still reads through a
    // crowded mark. The core dot itself is drawn last either way.
    const pickedAboveCore = posCount > 0 && posCount <= 2;
    // The shadow's whole job is to separate petals that overlap. One or two
    // petals overlap nothing, so a Single and a Pair take none: at any spread
    // wide enough to read on a crowded Set mark, two lit rings read as black
    // discs with a coloured edge.
    if (pickedAboveCore) markPickedAll.forEach(p => {
      p.sh = [];
    });
    const markPicked = pickedAboveCore ? [] : markPickedAll;
    const markPickedTop = pickedAboveCore ? markPickedAll : [];
    const triH = Math.max(6, r * 0.42);
    const triW = triH / Math.sqrt(3);
    const triPath = (h, w) => 'M ' + c + ',' + (cy - h * 2 / 3) + ' L ' + (c + w) + ',' + (cy + h / 3) + ' L ' + (c - w) + ',' + (cy + h / 3) + ' Z';
    const tri = triPath(triH, triW);
    const triLead = triPath(triH * 1.25, triW * 1.25); // the lead pick's marker is bigger, so a flip visibly moves the emphasis
    const halo = round(Math.max(3, r * 0.18));
    const showBlend = blendPicks.length > 0 || !!opts.showBlend;
    const dotR = Math.max(2.5, r * 0.16);
    const markFaintDots = [],
      markTris = [],
      markDots = [];
    // A full Set already lights every ring in colour; triangle and dot
    // markers on top of all twelve just reads as clutter, so it skips them.
    if (entry.type !== 'Set') picks.slice().reverse().forEach(i => markTris.push({
      d: i === leadIndex ? triLead : tri,
      rot: spin(i * 60),
      halo
    }));
    if (showBlend && entry.type !== 'Set') {
      blendPicks.slice().reverse().forEach(i => markDots.push({
        cx: c,
        cy,
        r: i === blendLeadIndex ? dotR * 1.25 : dotR,
        rot: spin(i * 60 + 30),
        halo
      }));
      for (let i = 0; i < 6; i++) if (!blendPicks.includes(i)) markFaintDots.push({
        cx: c,
        cy,
        r: dotR,
        rot: spin(i * 60 + 30),
        halo
      });
    }
    const markCentre = {
      cx: c,
      cy: c,
      r: dotR
    };
    // A full set lights every position at once, which buries the core. Mark
    // it properly — white, haloed, like any other marker — and add a soft
    // black void glow behind the rings so the pupil still reads.
    // The void wash: a black disc at the core with a blurred edge, so the pupil
    // reads through the rings crossing it. Off shows the coloured petals all the
    // way in to the centre.
    const coreGlow = opts.voidWash !== false;
    const markCentreHalo = halo;
    const markCentreFill = '#FFFFFF';
    const voidGlowSize = opts.voidGlowSize ?? 1;
    const voidGlowDepth = opts.voidGlowDepth ?? 0.6;
    const glowStop0 = round(Math.min(1, voidGlowDepth + 0.35) * 100) / 100;
    const glowStop55 = round(Math.min(1, voidGlowDepth) * 100) / 100;
    const glowMidOffset = round(55 + Math.max(0, voidGlowDepth - 1) * 25);
    const words = titles.length === 2 ? titles.map((text, k) => ({
      text,
      colours: [titleColour[text]],
      tone: k === leadTitle ? LEAD_TONE : TRAIL_TONE
    }))
    // A card holding no position carries no position colour, so its bar is
    // white. Changed 17 August 2026: the Core cards were taking the whole
    // twelve-colour spectrum, which said they held everything rather than
    // nothing. Every other single-title card keeps the spectrum.
    : [{
      text: titles[0],
      colours: picks.length || blendPicks.length ? spectrum : ['#FFFFFF'],
      tone: LEAD_TONE
    }];
    const bw = opts.baseWords || [],
      lw = opts.blendWords || [];
    // The word grid is always the whole twelve, in angle order, whatever the
    // card holds. Held positions take their colour and white type; the rest
    // stay in the greyscale, so a Triad reads as three lit out of twelve
    // rather than as three words on their own. Decided 16 August.
    // Interleaved, so index n sits at n * 30 degrees: base at i * 60, blend at i * 60 + 30.
    // Each entry also carries its position index, which is what the grid falls back to when
    // no words are supplied. The system stores no position words, so a card with no LINGO
    // source shows the twelve positions by index rather than showing nothing at all.
    const POS_AT = deg => window.AspectRender.POS_AT_ANGLE(deg);
    const grid12 = [];
    for (let i = 0; i < 6; i++) {
      const onB = picks.includes(i),
        onL = blendPicks.includes(i);
      grid12.push({
        w: bw[i] || '',
        pos: POS_AT(i * 60),
        col: onB ? hexBase(i) : '#333333',
        tc: onB ? '#FFFFFF' : '#555555',
        on: onB
      });
      grid12.push({
        w: lw[i] || '',
        pos: POS_AT(i * 60 + 30),
        col: onL ? hexBlend(i) : '#333333',
        tc: onL ? '#FFFFFF' : '#555555',
        on: onL
      });
    }
    grid12.forEach(g => {
      g.label = g.w || 'P' + g.pos;
    });
    const hasWords = grid12.some(g => g.w);
    // The six columns are the six polar axes: index k sits at k*30, index k+6
    // at k*30+180. Each column stacks its two words around one shared bar,
    // the same treatment the Pair title takes, top word left and bottom word
    // right so each word sits over its own half of the bar.
    const gridPairs = [];
    for (let k = 0; k < 6; k++) gridPairs.push({
      top: grid12[k],
      bot: grid12[k + 6]
    });
    const held = picks.map(i => ({
      w: bw[i] || '',
      col: hexBase(i),
      a: i * 60
    })).concat(blendPicks.map(i => ({
      w: lw[i] || '',
      col: hexBlend(i),
      a: i * 60 + 30
    }))).sort((x, y) => x.a - y.a);
    const stacked = vertical;
    const aboveBar = TITLE + TITLE_GAP + BAR / 2;
    const belowBar = stacked ? BAR / 2 + TITLE_GAP + TITLE : BAR / 2;
    const axis = Math.max(aboveBar, size / 2 - CORNER);
    return {
      id: entry.id,
      type: entry.type,
      posLabel,
      markSize: size,
      markBox: '-2 -2 ' + (size + 4) + ' ' + (size + 4),
      markCircles,
      markPicked,
      markPickedTop,
      markTris,
      markDots,
      markFaintDots,
      markCentre,
      coreRing,
      petalShadow,
      markCentreFill,
      markCentreHalo,
      coreGlow,
      glowR: round(r * 2 * voidGlowSize),
      coreFillR: round(core * voidGlowSize),
      glowStop0,
      glowStop55,
      glowMidOffset,
      barColours: titles.length === 2 ? titles.map(t => titleColour[t]) : picks.length || blendPicks.length ? spectrum : ['#FFFFFF'],
      // What the card holds, in angle order. Words come from the caller
      // (opts.baseWords / opts.blendWords), never from here, since the
      // assignments still move.
      held,
      heldRun: held.map(x => x.w).join(' \u00b7 '),
      grid12,
      gridPairs,
      hasWords,
      topWord: titles[0],
      bottomWord: stacked ? titles[1] || '' : '',
      topTone: leadTitle === 0 ? LEAD_TONE : TRAIL_TONE,
      bottomTone: leadTitle === 1 ? LEAD_TONE : TRAIL_TONE,
      // A one-word title takes a bar the width of its own word. Two words share
      // one bar, so a Pair keeps the full 156px column.
      titleBoxWidth: titles.length > 1 ? '156px' : 'max-content',
      // A Pair swaps which of its two words leads. Every other card with a counter turns
      // over to it: a Single to the position opposite, a Triad between Prime and Part, a
      // Group between Base and Blend. Core and Set stand alone.
      canFlip: entry.titles.length === 2 || ['Single', 'Triad', 'Base', 'Blend'].includes(entry.type),
      isHorizontal: !vertical,
      isVertical: vertical,
      words,
      columnTop: round(axis - aboveBar),
      markTop: round(axis - size / 2),
      bandHeight: round(Math.max(axis - size / 2 + size, axis + belowBar)),
      // The mark never turns. Its axis is where the axis really is.
      markRotate: 0,
      gloss: entry.gloss,
      reading: entry.reading,
      question: entry.question,
      lastLabel: entry.lastLabel,
      last: entry.last
    };
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/aspect-render.js", error: String((e && e.message) || e) }); }

// lib/masters-nav.js
try { (() => {
(function () {
  var THIS_SCRIPT = document.currentScript;
  var pendingSections = [],
    navList = null,
    navEl = null,
    addedTitles = {};
  window.rsNavAddSection = function (title, items) {
    if (addedTitles[title]) return;
    addedTitles[title] = true;
    if (navList) {
      renderSection(title, items);
    } else {
      pendingSections.push([title, items]);
    }
  };
  function renderSection(title, items) {
    var hr = document.createElement('div');
    hr.className = 'rsnav-divider';
    var h = document.createElement('div');
    h.className = 'rsnav-heading';
    h.textContent = title;
    navList.appendChild(hr);
    navList.appendChild(h);
    var hashLinks = [];
    items.forEach(function (it) {
      var a = document.createElement(it.href ? 'a' : 'button');
      a.className = 'rsnav-link';
      a.textContent = it.label;
      if (it.href) a.href = it.href;
      if (it.onClick) a.addEventListener('click', it.onClick);
      navList.appendChild(a);
      if (it.href && it.href.charAt(0) === '#') hashLinks.push(a);
    });
    if (hashLinks.length) setupScrollSpy(hashLinks);
  }
  var scrollSpyLinks = [];
  function setupScrollSpy(links) {
    scrollSpyLinks = scrollSpyLinks.concat(links);
    if (scrollSpyLinks.__wired) return;
    scrollSpyLinks.__wired = true;
    var ticking = false;
    function update() {
      ticking = false;
      var line = window.innerHeight * 0.25,
        bestId = null,
        bestTop = -Infinity,
        minTop = Infinity,
        fallbackId = null;
      scrollSpyLinks.forEach(function (a) {
        var id = a.getAttribute('href').slice(1),
          el = document.getElementById(id);
        if (!el) return;
        var top = el.getBoundingClientRect().top;
        if (top <= line && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
        if (top < minTop) {
          minTop = top;
          fallbackId = id;
        }
      });
      var activeId = bestId || fallbackId;
      scrollSpyLinks.forEach(function (a) {
        a.classList.toggle('rsnav-section-active', a.getAttribute('href').slice(1) === activeId);
      });
    }
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    window.addEventListener('resize', onScroll);
    update();
    [400, 1000, 2000].forEach(function (ms) {
      setTimeout(update, ms);
    });
  }
  var MASTERS = [{
    name: 'Colour FLOWER',
    path: 'templates/colour-flower/ColourFlower.dc.html'
  }, {
    name: 'Colour LINGO',
    path: 'templates/colour-lingo/ColourLingo.dc.html'
  }, {
    name: 'Colour WHEEL',
    path: 'templates/colour-wheel/ColourWheel.dc.html'
  }, {
    name: 'Word CARD',
    path: 'templates/word-card/WordCard.dc.html'
  }, {
    name: 'Word DECK',
    path: 'templates/word-deck/WordDeck.dc.html'
  }, {
    name: 'Brand LOGO',
    path: 'templates/brand-logo/BrandLogo.dc.html'
  }, {
    name: 'Brand STYLE',
    path: 'templates/brand-style/BrandStyle.dc.html'
  }, {
    name: 'Brand MASTERS',
    path: 'Masters.html'
  }];
  function init() {
    if (document.getElementById('rsMastersNav')) return;
    var root = (THIS_SCRIPT && THIS_SCRIPT.src ? THIS_SCRIPT.src : '').replace(/lib\/masters-nav\.js(\?.*)?$/, '');
    var here = location.pathname.replace(/^\//, '');
    var current = null;
    MASTERS.forEach(function (m) {
      if (here.indexOf(m.path) >= 0) current = m;
    });
    var style = document.createElement('style');
    style.textContent = '.rsnav{position:fixed;top:24px;right:24px;padding:0;font-family:"JetBrains Mono",ui-monospace,monospace;font-size:12px;line-height:18px;text-align:right;z-index:99999;display:flex;flex-direction:column;align-items:flex-end;gap:8px;opacity:0;transform:translateY(-8px);animation:rsnavIn 180ms cubic-bezier(0,0,0.5,1) 120ms both}' + '.rsnav-trigger{background:none;border:0;padding:0;font:inherit;color:#888888;cursor:pointer;text-transform:uppercase;transition:color 180ms cubic-bezier(0,0,0.5,1);display:flex;align-items:center;gap:6px}' + '.rsnav-trigger:hover{color:#FFFFFF}' + '.rsnav-trigger,.rsnav-link,.rsnav-heading{text-shadow:0 0 2px #000000,0 0 6px #000000,0 0 14px #000000,0 0 24px #000000}' + '.rsnav-divider{box-shadow:0 0 10px 5px #000000}' + '.rsnav.rsnav-open .rsnav-trigger{color:#FFFFFF}' + '.rsnav-chevron{transition:transform 180ms cubic-bezier(0,0,0.5,1)}' + '.rsnav.rsnav-open .rsnav-chevron{transform:rotate(180deg)}' + '.rsnav-list{position:absolute;top:100%;right:0;width:max-content;margin-top:0;padding:20px 16px 12px;background-clip:padding-box;background:#000000;border:1px solid #333333;border-radius:12px;box-shadow:0 0 24px 8px #000000;display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:8px;opacity:0;visibility:hidden;transform:translateY(-6px);pointer-events:none;transition:opacity 180ms cubic-bezier(0,0,0.5,1),transform 180ms cubic-bezier(0,0,0.5,1),visibility 0ms 180ms}' + '.rsnav.rsnav-open .rsnav-list{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto;transition-delay:0ms}' + '.rsnav-trigger{width:max-content;padding:6px 12px;background:#000000;border:1px solid #333333;border-radius:8px;box-shadow:0 0 24px 8px #000000}' + '.rsnav-link{color:#888888;text-decoration:none;text-transform:uppercase;text-align:left;background:none;border:0;padding:0;font:inherit;cursor:pointer;transition:color 180ms cubic-bezier(0,0,0.5,1)}' + '.rsnav-link:hover{color:#FFFFFF}' + '.rsnav-link.rsnav-current{color:#E8A33D;cursor:default}' + '.rsnav-link.rsnav-section-active{color:#FFFFFF;font-weight:700}' + '.rsnav-divider{width:100%;height:1px;background:#333333;margin:2px 0}' + '.rsnav-heading{color:#555555;font-size:10px;letter-spacing:normal}' + '@keyframes rsnavIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}' + '@media (prefers-reduced-motion:reduce){.rsnav,.rsnav-trigger,.rsnav-chevron,.rsnav-list,.rsnav-link{animation:none!important;transition-duration:120ms!important}}';
    document.head.appendChild(style);
    var nav = document.createElement('nav');
    nav.id = 'rsMastersNav';
    nav.className = 'rsnav';
    nav.setAttribute('aria-label', 'Masters navigator');
    var trigger = document.createElement('button');
    trigger.className = 'rsnav-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.innerHTML = '<span>' + (current ? current.name : 'Masters') + '</span><span class="rsnav-chevron">▾</span>';
    var list = document.createElement('div');
    list.className = 'rsnav-list';
    navList = list;
    MASTERS.forEach(function (m) {
      var isHere = current === m;
      var a = document.createElement(isHere ? 'span' : 'a');
      a.className = 'rsnav-link' + (isHere ? ' rsnav-current' : '');
      a.textContent = m.name;
      if (!isHere) {
        a.href = root + m.path;
      }
      list.appendChild(a);
    });
    function setOpen(open) {
      nav.classList.toggle('rsnav-open', open);
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(!nav.classList.contains('rsnav-open'));
    });
    var closeTimer = null;
    function hold(open) {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      if (open) {
        setOpen(true);
      } else {
        closeTimer = setTimeout(function () {
          setOpen(false);
        }, 120);
      }
    }
    nav.addEventListener('mouseenter', function () {
      hold(true);
    });
    nav.addEventListener('mouseleave', function () {
      hold(false);
    });
    nav.addEventListener('focusin', function () {
      hold(true);
    });
    nav.addEventListener('focusout', function (e) {
      if (!nav.contains(e.relatedTarget)) hold(false);
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) nav.classList.remove('rsnav-open');
    });
    nav.appendChild(trigger);
    nav.appendChild(list);
    document.body.appendChild(nav);
    pendingSections.forEach(function (s) {
      renderSection(s[0], s[1]);
    });
    pendingSections = [];
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);else init();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/masters-nav.js", error: String((e && e.message) || e) }); }

// lib/sets.js
try { (() => {
/* The canonical set catalog. One entry per set, in the order the sheet settled them:
   Abstract REALM, Aspect STATE, Anchor TAG, Arrow KEY (Colour LINGO, lingo-seed.js).
   Adding a set to the system starts here: give it a key, a name, its word length, and
   whether it prints cards. Everything downstream (Colour FLOWER's ring pickers, Word
   CARD/DECK) reads the list from this one place rather than each hardcoding its own.
   field: which per-position word field a master's own POS-style array uses for this
   set (Colour FLOWER's static POS entries key by these letters: rl/s/tag/key). */
window.RS_SETS = [{
  key: 'r',
  name: 'Abstract REALM',
  wordLength: 4,
  carded: true,
  field: 'rl'
}, {
  key: 's',
  name: 'Aspect STATE',
  wordLength: 4,
  carded: true,
  field: 's'
}, {
  key: 't',
  name: 'Anchor TAG',
  wordLength: 3,
  carded: true,
  field: 'tag'
}, {
  key: 'k',
  name: 'Arrow KEY',
  wordLength: 2,
  carded: true,
  field: 'key'
}];
})(); } catch (e) { __ds_ns.__errors.push({ path: "lib/sets.js", error: String((e && e.message) || e) }); }

__ds_ns.AspectCard = __ds_scope.AspectCard;

__ds_ns.AspectCardBlank = __ds_scope.AspectCardBlank;

__ds_ns.ASPECT_CARD_SIZE = __ds_scope.ASPECT_CARD_SIZE;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.CodeBlock = __ds_scope.CodeBlock;

__ds_ns.ColourWheel = __ds_scope.ColourWheel;

__ds_ns.Control = __ds_scope.Control;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.LogoConstruction = __ds_scope.LogoConstruction;

__ds_ns.LOGO_MARK_BOX = __ds_scope.LOGO_MARK_BOX;

__ds_ns.LogoMark = __ds_scope.LogoMark;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.Note = __ds_scope.Note;

__ds_ns.Pill = __ds_scope.Pill;

__ds_ns.PillSet = __ds_scope.PillSet;

__ds_ns.PositionNode = __ds_scope.PositionNode;

__ds_ns.SetLabel = __ds_scope.SetLabel;

__ds_ns.SpecTable = __ds_scope.SpecTable;

__ds_ns.Specimen = __ds_scope.Specimen;

__ds_ns.SwatchRow = __ds_scope.SwatchRow;

__ds_ns.POSITIONS = __ds_scope.POSITIONS;

__ds_ns.BASE_HEX = __ds_scope.BASE_HEX;

__ds_ns.BLEND_HEX = __ds_scope.BLEND_HEX;

})();
