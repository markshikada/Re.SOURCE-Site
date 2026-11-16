/* The two task-approved interaction symbols. This is a scoped library, not the parked general
   icon/pictogram system. The Flower's outer rotation markers are its own sign, not the card's
   flip glyph: two triangles stacked upright on the ring, pointing up and down, with the clear
   space between them derived from the triangle itself. The card's pair is an SVG. */
(function (root, factory) {
  const symbols = factory();
  if (typeof module === 'object' && module.exports) module.exports = symbols;
  else root.ReSOURCESymbols = symbols;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const round = n => Math.round(n * 100) / 100;
  /* The rotation marker, in Flower units. The triangle's height is also the clear space
     between the two triangles, so the spacing is read off the shape rather than tuned by
     eye: a pair reads as ▲ over ▼ with a whole triangle of air between them. */
  const ROTATE_TRIANGLE = 11;
  const ROTATE_GAP = 11;

  function rotationIndicators(radius) {
    if (!Number.isFinite(radius) || radius <= 0) return '';
    const scale = Math.min(1, radius / (3 * ROTATE_TRIANGLE));
    const size = ROTATE_TRIANGLE * scale;
    const gap = ROTATE_GAP * scale;
    const wing = size / 2;
    const half = size + gap / 2;
    /* The pair is centred ON the guide circle, so the orbit runs through the gap between
       the two triangles. The pair used to sit inside the orbit with its outer edge
       touching it, which read as slightly off. */
    const centre = radius;
    const pair = at => {
      return [
        'M ' + round(at) + ' ' + round(-half) + ' L ' + round(at - wing) + ' ' + round(-gap / 2) + ' L ' + round(at + wing) + ' ' + round(-gap / 2) + ' Z',
        'M ' + round(at) + ' ' + round(half) + ' L ' + round(at - wing) + ' ' + round(gap / 2) + ' L ' + round(at + wing) + ' ' + round(gap / 2) + ' Z'
      ].join(' ');
    };
    return [pair(-centre), pair(centre)].join(' ');
  }

  return Object.freeze({ rotationIndicators });
});
