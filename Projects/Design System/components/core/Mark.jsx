import React from 'react';
import { BASE_HEX, BLEND_HEX } from './positions.js';

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
const round = (n) => Math.round(n * 100) / 100;

export function Mark({
  size = 120, picks = [], blendPicks = [], white = false,
  showBlend, voidWash = true, petalShadow = 12,
  /* Depth and Drop match the card mark's own reference call in lib/aspect-render.js
     (petalShadowDepth, petalShadowDrop) — added so every surface that tunes this mark's
     shadow and glow (Word CARD's own tweaks included) shares the same three knobs, not a
     size-only subset. Defaults reproduce the mark exactly as it drew before either existed. */
  petalShadowDepth = 1, petalShadowDrop = 0, voidGlowSize = 1, voidGlowDepth = 1.25, rotate = 0,
  full = false, style, ...rest
}) {
  const uid = React.useId().replace(/:/g, '');
  const c = size / 2;
  const r = (c - STROKE / 2) / 2;
  const core = r;
  const cy = c - core;
  const spin = (a) => `rotate(${a} ${c} ${c})`;

  const hexBase = (i) => (white ? '#FFFFFF' : BASE_HEX[i]);
  const hexBlend = (i) => (white ? '#FFFFFF' : BLEND_HEX[i]);
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
  const shadowOf = (w) => {
    if (pgSize <= 0) return [];
    const ramp = [];
    for (let k = PG_STEPS; k >= 1; k--) ramp.push(Math.pow(1 - (k - 0.5) / PG_STEPS, 2));
    const sum = ramp.reduce((a, b) => a + b, 0);
    return ramp.map((v, n) => ({
      w: round(w + pgSize * 2 * (1 - (n + 0.5) / PG_STEPS)),
      o: round((v / sum) * petalShadowDepth * 1000) / 1000,
      cy: round(cy + pgSize * petalShadowDrop),
    }));
  };

  const faint = [];
  for (let i = 0; i < 12; i++) faint.push({ i, rot: spin(i * 30) });

  const lit = picks
    .map((i) => ({ k: `b${i}`, rot: spin(i * 60), stroke: hexBase(i), width: i === lead ? STROKE + 2 : STROKE }))
    .concat(blendPicks.map((i) => ({
      k: `l${i}`, rot: spin(i * 60 + 30), stroke: hexBlend(i), width: i === blendLead ? STROKE + 2 : STROKE,
    })))
    .reverse()
    .map((p) => ({ ...p, sh: shadowOf(p.width) }));

  /* A Single lights one ring, too little to survive the void wash washing over it, so it draws
     above the core. A Pair and wider stay under the wash: the mark is the flower in miniature,
     and on the flower the wash crosses every petal. */
  const above = count === 1;

  const triH = Math.max(6, r * 0.42);
  const triW = triH / Math.sqrt(3);
  const triPath = (h, w) =>
    `M ${c},${cy - (h * 2) / 3} L ${c + w},${cy + h / 3} L ${c - w},${cy + h / 3} Z`;
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

  const ring = (p, extra) => (
    <circle cx={c} cy={p.cy ?? cy} r={r} transform={p.rot} fill="none" {...extra} />
  );

  return (
    <svg
      viewBox={`-2 -2 ${size + 4} ${size + 4}`}
      width={size}
      height={size}
      style={{ display: 'block', overflow: 'visible', ...style }}
      {...rest}
    >
      <g transform={`rotate(${rotate} ${c} ${c})`} style={{ transition: 'transform 300ms cubic-bezier(.25,0,0,1)' }}>
        {faint.map((f) => ring(f, { key: `f${f.i}`, stroke: 'var(--surface-border)', strokeWidth: 1 }))}

        {blendOn && markers
          ? [0, 1, 2, 3, 4, 5]
              .filter((i) => !blendPicks.includes(i))
              .map((i) => (
                <circle key={`fd${i}`} cx={c} cy={cy} r={dotR} transform={spin(i * 60 + 30)} fill="var(--surface-border)" />
              ))
          : null}

        {litRings.map((p) => (
          <React.Fragment key={p.k}>
            {p.sh.map((s, n) => ring({ ...p, cy: s.cy }, { key: `${p.k}s${n}`, stroke: '#000000', strokeOpacity: s.o, strokeWidth: s.w }))}
            {ring(p, { stroke: p.stroke, strokeWidth: p.width })}
          </React.Fragment>
        ))}

        {voidWash ? (
          <>
            <circle cx={c} cy={c} r={coreFillR} fill="#000000" />
            <defs>
              <radialGradient id={`mark-void-${uid}`}>
                <stop offset="0%" stopColor="#000000" stopOpacity={stop0} />
                <stop offset={`${midOffset}%`} stopColor="#000000" stopOpacity={stopMid} />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx={c} cy={c} r={glowR} fill={`url(#mark-void-${uid})`} />
          </>
        ) : null}

        <circle
          cx={c} cy={c} r={core} fill="none" stroke="#FFFFFF" strokeWidth="1"
          strokeDasharray="1 3" strokeLinecap="round"
        />

        {topRings.map((p) => ring(p, { key: p.k, stroke: p.stroke, strokeWidth: p.width }))}

        {markers
          ? picks
              .slice()
              .reverse()
              .map((i) => (
                <path
                  key={`t${i}`}
                  d={i === lead ? triPath(triH * 1.25, triW * 1.25) : triPath(triH, triW)}
                  transform={spin(i * 60)}
                  fill="#FFFFFF" stroke="#000000" strokeWidth={halo}
                  strokeLinejoin="round" paintOrder="stroke fill"
                />
              ))
          : null}

        {blendOn && markers
          ? blendPicks
              .slice()
              .reverse()
              .map((i) => (
                <circle
                  key={`d${i}`}
                  cx={c} cy={cy} r={i === blendLead ? dotR * 1.25 : dotR}
                  transform={spin(i * 60 + 30)}
                  fill="#FFFFFF" stroke="#000000" strokeWidth={halo} paintOrder="stroke fill"
                />
              ))
          : null}

        <circle
          cx={c} cy={c} r={dotR}
          fill="#FFFFFF" stroke="#000000" strokeWidth={halo} paintOrder="stroke fill"
        />
      </g>
    </svg>
  );
}
