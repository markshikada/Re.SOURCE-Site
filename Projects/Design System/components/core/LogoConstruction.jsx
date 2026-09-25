import React from 'react';

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
const R = { core: 18, ringIn: 36, base: 42, ringOut: 48, apex: 60 };
const HB = (U / 2) * Math.sqrt(3);
const SIX = [0, 1, 2, 3, 4, 5];
const G = '#3d3d3d', W = '#FFFFFF', C = '#888888';
const MONO = { fontFamily: "'JetBrains Mono',ui-monospace,monospace" };
const n2 = (v) => Math.round(v * 100) / 100;
/* The two large triangles are drawn in a counterpart pair, six positions apart, one for the
   upward figure and one for the downward. Indices and hexes only: the words belong to LINGO. */
const BIG = [{ id: 'bigUp', i: 12, hex: '#00D460' }, { id: 'bigDown', i: 6, hex: '#FF0000' }];

/* Hover and pin in one place, so both views and the parts list share a single state. */
function useSchematic() {
  const [hover, setHover] = React.useState(null);
  const [pin, setPin] = React.useState(null);
  const active = hover || pin;
  const toggle = (id) => setPin((p) => (p === id ? null : id));
  return { hover, pin, active, setHover, setPin, toggle };
}

/* One part of a drawing. Visible geometry first, then the same geometry again as a wide
   transparent stroke, because a 1px construction line is otherwise impossible to hit. */
function Part({ id, s, hit, children }) {
  const off = s.active && s.active !== id;
  return (
    <g
      opacity={off ? 0.09 : 1}
      style={{ transition: 'opacity 160ms cubic-bezier(0.25,0,0,1)', cursor: 'pointer' }}
      onPointerEnter={() => s.setHover(id)}
      onPointerLeave={() => s.setHover(null)}
      onClick={(e) => { e.stopPropagation(); s.toggle(id); }}
    >
      {children}
      <g style={{ pointerEvents: 'stroke' }}>{hit}</g>
    </g>
  );
}

/* A label that must cross coloured strokes, so it carries the halo the law asks for. */
function Tag({ x, y, anchor = 'middle', fill = W, children }) {
  return (
    <text
      x={x} y={y} textAnchor={anchor} fill={fill} fontSize="18" style={MONO}
      stroke="#000000" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke fill"
      pointerEvents="none"
    >{children}</text>
  );
}

const FAMILY = [
  { id: 'box', label: 'Box', figure: '120 × 120', units: '10u', note: 'The authoring square. The apex circle is exactly half of it, so the mark is quoted by its box and not by its ink.' },
  { id: 'units', label: 'Unit circles', figure: 'r 12 · 24 · 36 · 48 · 60', units: '1u to 5u', note: 'The five unit steps. Every radius in the mark is one of these or a half-step between two of them.' },
  { id: 'halves', label: 'Half-steps', figure: 'r 18 · r 42', units: '1.5u · 3.5u', note: 'The only two the mark needs: the centre disc, and the circle the triangle bases stand on.' },
  { id: 'spokes', label: 'Spokes', figure: '6 × 60°', units: '—', note: 'The six Base directions, drawn from the centre out to the apex circle.' },
  { id: 'markers', label: 'Marker circles', figure: 'r 12 on r 48', units: '1u', note: 'One per Base position. Each inscribes a triangle, which fixes its apex, its base and all three angles at once.' },
  { id: 'angle', label: 'Angle', figure: '60°', units: '—', note: 'Every angle in an equilateral, and the step from one Base position to the next.' },
  { id: 'core', label: 'Centre disc', figure: 'r 18', units: '1.5u', note: 'The midpoint of 1u and 2u. Its radius is also the width of the annulus around it.' },
  { id: 'ringIn', label: 'Ring inner', figure: 'r 36', units: '3u', note: 'A family step. Taken with the outer ring it gives a stroke of exactly 1u.' },
  { id: 'ringOut', label: 'Ring outer', figure: 'r 48', units: '4u', note: 'A family step, and the circle every marker circle is centred on.' },
  { id: 'tri', label: 'Base triangles', figure: 'apex r 60 · base r 42', units: '—', note: 'Six equilaterals, each inscribed in its own 1u marker circle. Side 12√3, computed at draw time rather than typed.' },
  { id: 'bigUp', label: 'Large triangle · up', figure: 'side 60√3 ≈ 104', units: '5u circumradius', note: 'Corners on three of the six apexes. Its side is the mark’s drawn width, so nothing new is measured. Position 12.' },
  { id: 'bigDown', label: 'Large triangle · down', figure: 'side 60√3 ≈ 104', units: '5u circumradius', note: 'The counterpart, six positions away. The two together close all six apexes. Position 06.' },
];

const MARKER = [
  { id: 'arcs', label: 'Family arcs', figure: 'r 36 · 42 · 48 · 60', units: '3u to 5u', note: 'The same circles as the family view, seen locally around one position.' },
  { id: 'circle', label: 'Marker circle', figure: 'r 12', units: '1u', note: 'Centred where the spoke crosses r 48. The triangle is inscribed in it.' },
  { id: 'tri', label: 'Triangle', figure: 'side 12√3 ≈ 20.78', units: '—', note: 'Equilateral by construction, not by eye and not by a base width chosen to look right.' },
  { id: 'apex', label: 'Apex reach', figure: '12', units: '1u', note: 'An inscribed equilateral reaches one full radius to its apex, which puts the apex on r 60.' },
  { id: 'base', label: 'Base', figure: '6√3 ≈ 10.39 half', units: '—', note: 'And half a radius the other way, which puts the base on r 42 exactly.' },
];

function Family({ s }) {
  const k = 5, cx = 300, cy = 300, p = (v) => v * k;
  const spin = (a) => `rotate(${a} ${cx} ${cy})`;
  const tri = `M ${cx},${cy - p(R.apex)} L ${n2(cx + p(HB))},${cy - p(R.base)} L ${n2(cx - p(HB))},${cy - p(R.base)} Z`;
  const arc = p(27), hw = R.apex * Math.sin(Math.PI / 3);
  const corner = (a) => {
    const t = (a * Math.PI) / 180;
    return `${n2(cx + p(R.apex) * Math.sin(t))},${n2(cy - p(R.apex) * Math.cos(t))}`;
  };
  const bigPath = (j) => [0, 120, 240].map((a) => corner(a + j * 60))
    .map((pt, i) => (i ? `L ${pt}` : `M ${pt}`)).join(' ') + ' Z';
  const hitW = 22;
  const ring = (r, vis) => [
    <circle key="v" cx={cx} cy={cy} r={p(r)} fill="none" {...vis} />,
    <circle key="h" cx={cx} cy={cy} r={p(r)} fill="none" stroke="transparent" strokeWidth={hitW} />,
  ];
  const lab = s.active && FAMILY.find((f) => f.id === s.active);
  return (
    <svg viewBox="-40 -56 680 700" style={{ display: 'block', width: '100%', height: 'auto', overflow: 'hidden' }}
      onClick={() => s.setPin(null)}>
      <Part id="box" s={s} hit={<rect x={cx - p(60)} y={cy - p(60)} width={p(120)} height={p(120)} fill="none" stroke="transparent" strokeWidth={hitW} />}>
        <rect x={cx - p(60)} y={cy - p(60)} width={p(120)} height={p(120)} fill="none" stroke={G} strokeWidth="1" strokeDasharray="3 5" />
      </Part>
      <Part id="units" s={s} hit={[1, 2, 3, 4, 5].map((i) => <circle key={i} cx={cx} cy={cy} r={p(i * U)} fill="none" stroke="transparent" strokeWidth={hitW} />)}>
        {[1, 2, 3, 4, 5].map((i) => <circle key={i} cx={cx} cy={cy} r={p(i * U)} fill="none" stroke={G} strokeWidth="1" />)}
      </Part>
      <Part id="halves" s={s} hit={[R.core, R.base].map((r) => <circle key={r} cx={cx} cy={cy} r={p(r)} fill="none" stroke="transparent" strokeWidth={hitW} />)}>
        {[R.core, R.base].map((r) => <circle key={r} cx={cx} cy={cy} r={p(r)} fill="none" stroke={G} strokeWidth="1" strokeDasharray="8 6" />)}
      </Part>
      <Part id="spokes" s={s} hit={SIX.map((i) => <line key={i} x1={cx} y1={cy} x2={cx} y2={cy - p(R.apex)} transform={spin(i * 60)} stroke="transparent" strokeWidth={hitW} />)}>
        {SIX.map((i) => <line key={i} x1={cx} y1={cy} x2={cx} y2={cy - p(R.apex)} transform={spin(i * 60)} stroke={G} strokeWidth="1" />)}
      </Part>
      <Part id="markers" s={s} hit={SIX.map((i) => <circle key={i} cx={cx} cy={cy - p(R.ringOut)} r={p(U)} transform={spin(i * 60)} fill="none" stroke="transparent" strokeWidth={hitW} />)}>
        {SIX.map((i) => <circle key={i} cx={cx} cy={cy - p(R.ringOut)} r={p(U)} transform={spin(i * 60)} fill="none" stroke={C} strokeWidth="1" />)}
      </Part>
      {/* Two large equilaterals through alternate apexes. Their corners are the six small apexes at
          r 60, so nothing new is measured: the figure is already in the mark. Drawn under the white
          strokes, so the mark stays the subject and these stay construction. */}
      {BIG.map((b, j) => (
        <Part key={b.id} id={b.id} s={s} hit={<path d={bigPath(j)} fill="none" stroke="transparent" strokeWidth={hitW} />}>
          <path d={bigPath(j)} fill="none" stroke={b.hex} strokeWidth={s.active === b.id ? 3 : 1.5} strokeDasharray="10 8" />
        </Part>
      ))}
      <Part id="angle" s={s} hit={<path d={`M ${cx},${cy - arc} A ${arc} ${arc} 0 0 1 ${n2(cx + arc * Math.sin(Math.PI / 3))},${n2(cy - arc * Math.cos(Math.PI / 3))}`} fill="none" stroke="transparent" strokeWidth={hitW} />}>
        <path d={`M ${cx},${cy - arc} A ${arc} ${arc} 0 0 1 ${n2(cx + arc * Math.sin(Math.PI / 3))},${n2(cy - arc * Math.cos(Math.PI / 3))}`} fill="none" stroke={C} strokeWidth="1" />
        <Tag x={n2(cx + arc * 0.36)} y={n2(cy - arc * 0.98)} anchor="start" fill={C}>60°</Tag>
      </Part>
      <Part id="ringIn" s={s} hit={ring(R.ringIn)[1]}>{ring(R.ringIn, { stroke: W, strokeWidth: s.active === 'ringIn' ? 3 : 1.5 })[0]}</Part>
      <Part id="ringOut" s={s} hit={ring(R.ringOut)[1]}>{ring(R.ringOut, { stroke: W, strokeWidth: s.active === 'ringOut' ? 3 : 1.5 })[0]}</Part>
      <Part id="tri" s={s} hit={SIX.map((i) => <path key={i} d={tri} transform={spin(i * 60)} fill="none" stroke="transparent" strokeWidth={hitW} />)}>
        {SIX.map((i) => <path key={i} d={tri} transform={spin(i * 60)} fill="none" stroke={W} strokeWidth={s.active === 'tri' ? 3 : 1.5} />)}
      </Part>
      <Part id="core" s={s} hit={ring(R.core)[1]}>
        {ring(R.core, { stroke: W, strokeWidth: s.active === 'core' ? 3 : 1.5 })[0]}
        <circle cx={cx} cy={cy} r="3" fill={W} />
      </Part>
      {lab && lab.id !== 'angle' && <Tag x={cx} y={cy + p(60) + 34}>{lab.figure}</Tag>}
    </svg>
  );
}

function Marker({ s }) {
  const k = 12, bx = 250, by = 800, p = (v) => v * k;
  const ax = by - p(R.apex), bsY = by - p(R.base), mc = by - p(R.ringOut);
  const hitW = 26;
  const arcD = (r) => {
    const rr = p(r), a = Math.asin(Math.min(1, 560 / rr));
    return `M ${n2(bx - rr * Math.sin(a))},${n2(by - rr * Math.cos(a))} A ${rr} ${rr} 0 0 1 ${n2(bx + rr * Math.sin(a))},${n2(by - rr * Math.cos(a))}`;
  };
  const tx = n2(bx + p(HB)), tx2 = n2(bx - p(HB));
  const arcs = [[R.apex, false], [R.base, true], [R.ringIn, false], [R.ringOut, false]];
  const lab = s.active && MARKER.find((m) => m.id === s.active);
  return (
    <svg viewBox="-210 40 900 660" style={{ display: 'block', width: '100%', height: 'auto', overflow: 'hidden' }}
      onClick={() => s.setPin(null)}>
      <Part id="arcs" s={s} hit={arcs.map(([r]) => <path key={r} d={arcD(r)} fill="none" stroke="transparent" strokeWidth={hitW} />)}>
        {arcs.map(([r, dash], i) => (
          <path key={r} d={arcD(r)} fill="none"
            stroke={i > 1 ? W : G} strokeWidth={i > 1 ? 1.5 : 1}
            strokeDasharray={dash ? '8 6' : undefined} />
        ))}
      </Part>
      <Part id="circle" s={s} hit={<circle cx={bx} cy={mc} r={p(U)} fill="none" stroke="transparent" strokeWidth={hitW} />}>
        <circle cx={bx} cy={mc} r={p(U)} fill="none" stroke={C} strokeWidth={s.active === 'circle' ? 3 : 1.5} />
        <circle cx={bx} cy={mc} r="3" fill={C} />
      </Part>
      <Part id="apex" s={s} hit={<line x1={bx} y1={ax} x2={bx} y2={mc} stroke="transparent" strokeWidth={hitW} />}>
        <line x1={bx} y1={ax} x2={bx} y2={bsY} stroke={G} strokeWidth="1" />
        <line x1={bx - 46} y1={mc} x2={bx - 46} y2={ax} stroke={C} strokeWidth="1" />
        <line x1={bx - 56} y1={mc} x2={bx} y2={mc} stroke={G} strokeWidth="1" />
        <line x1={bx - 56} y1={ax} x2={bx} y2={ax} stroke={G} strokeWidth="1" />
        <Tag x={bx - 64} y={n2((mc + ax) / 2 + 6)} anchor="end">1u</Tag>
      </Part>
      <Part id="tri" s={s} hit={<path d={`M ${bx},${ax} L ${tx},${bsY} L ${tx2},${bsY} Z`} fill="none" stroke="transparent" strokeWidth={hitW} />}>
        <path d={`M ${bx},${ax} L ${tx},${bsY} L ${tx2},${bsY} Z`} fill="none" stroke={W} strokeWidth={s.active === 'tri' ? 3 : 1.5} />
      </Part>
      <Part id="base" s={s} hit={<line x1={tx2} y1={bsY + 120} x2={tx} y2={bsY + 120} stroke="transparent" strokeWidth={hitW} />}>
        <line x1={tx2} y1={bsY} x2={tx2} y2={bsY + 130} stroke={G} strokeWidth="1" />
        <line x1={tx} y1={bsY} x2={tx} y2={bsY + 130} stroke={G} strokeWidth="1" />
        <line x1={tx2} y1={bsY + 120} x2={tx} y2={bsY + 120} stroke={C} strokeWidth="1" />
        <Tag x={bx} y={bsY + 148}>base 12√3</Tag>
      </Part>
      {lab && <Tag x={n2(bx + p(HB) + 24)} y={n2(bsY + 26)} anchor="start">{lab.figure}</Tag>}
    </svg>
  );
}

/* The readout and the parts list. Both drive the same state as the drawing, so a part can be
   found either by pointing at it or by reading down the list. The list stays visible next to the
   drawing rather than under it: half its use is as a glossary, fixing what each part is called so
   the same word gets used everywhere. */
function PartsList({ s, parts }) {
  const row = (x) => {
    const on = s.active === x.id;
    return (
      <button
        key={x.id} type="button" aria-pressed={s.pin === x.id}
        onPointerEnter={() => s.setHover(x.id)} onPointerLeave={() => s.setHover(null)}
        onClick={() => s.toggle(x.id)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          minHeight: 44, padding: '4px 12px', textAlign: 'left', cursor: 'pointer',
          background: on ? '#0d0d0d' : 'transparent',
          border: 0, borderLeft: `2px solid ${on ? W : 'transparent'}`,
          color: on ? W : C, ...MONO, fontSize: 12, lineHeight: '18px',
          transition: 'color 120ms, background 120ms',
        }}
      >
        <span>{x.label}</span>
        <span style={{ color: on ? W : '#555555', whiteSpace: 'nowrap' }}>{x.figure}</span>
      </button>
    );
  };
  return (
    <div style={{ display: 'grid', gap: 4, alignContent: 'start' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', gap: 12, padding: '0 12px 8px',
        borderBottom: '1px solid #333333', ...MONO, fontSize: 12, lineHeight: '18px',
        textTransform: 'uppercase', color: '#555555',
      }}>
        <span>Part</span><span>{parts.length} in this view</span>
      </div>
      {parts.map(row)}
    </div>
  );
}

function Readout({ s, parts }) {
  const cur = parts.find((x) => x.id === s.active);
  return (
    <div style={{ display: 'grid', gap: 8, minHeight: 132, alignContent: 'start', borderTop: '1px solid #333333', paddingTop: 12 }}>
      <div style={{ ...MONO, fontSize: 24, lineHeight: '36px', color: cur ? W : '#555555' }}>
        {cur ? cur.label : 'No part selected'}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', minHeight: 18 }}>
        {cur && <span style={{ ...MONO, fontSize: 18, lineHeight: '30px', color: W }}>{cur.figure}</span>}
        {cur && <span style={{ ...MONO, fontSize: 12, lineHeight: '18px', color: '#888888' }}>{cur.units}</span>}
      </div>
      <p style={{ margin: 0, maxWidth: '62ch', fontSize: 18, lineHeight: '30px', color: '#888888', textWrap: 'pretty' }}>
        {cur ? cur.note : 'Point at the drawing or read down the list. Clicking pins a part, so its name and figure stay put.'}
      </p>
    </div>
  );
}

export function LogoConstruction({ view = 'family' }) {
  const s = useSchematic();
  const marker = view === 'marker';
  const parts = marker ? MARKER : FAMILY;
  return (
    <div style={{ display: 'grid', gap: 24, fontFamily: "'Figtree',sans-serif" }}>
      {/* Drawing and list side by side, wrapping to a stack only when there is genuinely no room. */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 300px', minWidth: 260, maxWidth: marker ? 560 : 520 }}>
          {marker ? <Marker s={s} /> : <Family s={s} />}
        </div>
        <div style={{ flex: '0 1 288px', minWidth: 240 }}>
          <PartsList s={s} parts={parts} />
        </div>
      </div>
      <Readout s={s} parts={parts} />
    </div>
  );
}
