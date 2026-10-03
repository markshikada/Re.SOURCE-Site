/* The two task-approved interaction symbols. This is a scoped library, not the parked general
   icon/pictogram system. The Flower's repeated inverse-polarity markers use the flip SVG's exact
   triangle and gap geometry in Flower units, placed on the live orbit; the card pair is an SVG. */
(function (root, factory) {
  const symbols = factory();
  if (typeof module === 'object' && module.exports) module.exports = symbols;
  else root.ReSOURCESymbols = symbols;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const round = n => Math.round(n * 100) / 100;
  const FLIP_TRIANGLE = 11;
  const FLIP_GAP = 2;

  function rotationIndicators(radius) {
    if (!Number.isFinite(radius) || radius <= 0) return '';
    const scale = Math.min(1, radius / (2 * FLIP_TRIANGLE + FLIP_GAP));
    const size = FLIP_TRIANGLE * scale;
    const gap = FLIP_GAP * scale;
    const half = size + gap / 2;
    const centre = radius - half;
    const wing = size / 2;
    const pair = at => {
      const leftTip = at - half, leftBase = leftTip + size;
      const rightTip = at + half, rightBase = rightTip - size;
      return [
        'M ' + round(leftTip) + ' 0 L ' + round(leftBase) + ' ' + round(-wing) + ' L ' + round(leftBase) + ' ' + round(wing) + ' Z',
        'M ' + round(rightTip) + ' 0 L ' + round(rightBase) + ' ' + round(-wing) + ' L ' + round(rightBase) + ' ' + round(wing) + ' Z'
      ].join(' ');
    };
    return [pair(-centre), pair(centre)].join(' ');
  }

  return Object.freeze({ rotationIndicators });
});
