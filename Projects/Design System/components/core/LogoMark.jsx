import React from 'react';

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
export const LOGO_MARK_BOX = {
  box: 120, unit: 12, height: 120, width: 104, sideBearing: 8,
  markerCircle: 12, markerCircleAt: 48, triangleSide: 12 * Math.sqrt(3), halfBase: HALF_BASE,
};

export function LogoMark({ size = 120, colour = '#FFFFFF', rotate = 0, stroke = 0, style, ...rest }) {
  /* stroke may arrive as a string from an attribute, so coerce before testing. */
  const sw = Number(stroke) || 0;
  const line = sw > 0;
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      style={{ display: 'block', overflow: 'visible', ...style }}
      {...rest}
    >
      <g transform={`rotate(${rotate} 60 60)`} style={{ transition: 'transform 300ms cubic-bezier(.25,0,0,1)' }}>
        <circle cx="60" cy="60" r={line ? 48 : 42} fill="none" stroke={colour} strokeWidth={line ? sw : 12} />
        {line ? <circle cx="60" cy="60" r="36" fill="none" stroke={colour} strokeWidth={sw} /> : null}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i} d={TRI} transform={`rotate(${i * 60} 60 60)`}
            fill={line ? 'none' : colour}
            stroke={line ? colour : undefined} strokeWidth={line ? sw : undefined}
          />
        ))}
        <circle
          cx="60" cy="60" r="18"
          fill={line ? 'none' : colour}
          stroke={line ? colour : undefined} strokeWidth={line ? sw : undefined}
        />
      </g>
    </svg>
  );
}
