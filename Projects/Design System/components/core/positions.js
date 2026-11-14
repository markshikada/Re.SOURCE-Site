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

export const POSITIONS = [
  { i: '12', a: 0,   hex: '#00D460', c: 'var(--cl-12-life)', kind: 'base',  k: 0 },
  { i: '01', a: 30,  hex: '#99DD00', c: 'var(--cl-01-tone)', kind: 'blend', k: 0 },
  { i: '02', a: 60,  hex: '#FFD100', c: 'var(--cl-02-flux)', kind: 'base',  k: 1 },
  { i: '03', a: 90,  hex: '#FFB000', c: 'var(--cl-03-flow)', kind: 'blend', k: 1 },
  { i: '04', a: 120, hex: '#FF7700', c: 'var(--cl-04-love)', kind: 'base',  k: 2 },
  { i: '05', a: 150, hex: '#FF5500', c: 'var(--cl-05-bond)', kind: 'blend', k: 2 },
  { i: '06', a: 180, hex: '#FF0000', c: 'var(--cl-06-fire)', kind: 'base',  k: 3 },
  { i: '07', a: 210, hex: '#E02888', c: 'var(--cl-07-path)', kind: 'blend', k: 3 },
  { i: '08', a: 240, hex: '#9933CC', c: 'var(--cl-08-time)', kind: 'base',  k: 4 },
  { i: '09', a: 270, hex: '#6655FF', c: 'var(--cl-09-meta)', kind: 'blend', k: 4 },
  { i: '10', a: 300, hex: '#2277FF', c: 'var(--cl-10-form)', kind: 'base',  k: 5 },
  { i: '11', a: 330, hex: '#00BBDD', c: 'var(--cl-11-type)', kind: 'blend', k: 5 },
];

/* The six and the six, in k order, which is the order a mark and a card index
   their picks by. Derived, never written out a second time. */
export const BASE_HEX = POSITIONS.filter((p) => p.kind === 'base').map((p) => p.hex);
export const BLEND_HEX = POSITIONS.filter((p) => p.kind === 'blend').map((p) => p.hex);

export const positionAt = (i) => POSITIONS.find((p) => p.i === i) || POSITIONS[0];
export const polarOf = (i) => POSITIONS[(POSITIONS.indexOf(positionAt(i)) + 6) % 12];

/* Plain scripts, specimen cards and template logic classes cannot import an
   ES module, so the same objects are published on the window as well. */
if (typeof window !== 'undefined') {
  window.RESOURCE_POSITIONS = POSITIONS;
  window.RESOURCE_BASE_HEX = BASE_HEX;
  window.RESOURCE_BLEND_HEX = BLEND_HEX;
}
