/* The flower's one frame (2026-09-27, Mark: "Match flower size and positioning across
   all views like schematic. I would rather set simple unified directions to direct how the
   flower should be in any view, don't separate.").
   One extent, one fit, one centre, read by the artwork, the construction and the Render
   previews alike. Each view keeps its own band — the band is layout, where the chrome is —
   but the flower inside it answers a single law:
     - the extent is the flower's full span at zoom 1, titles and pad in;
     - Fit is the percent of the band's shorter side the flower fills at rest zoom;
     - X/Y nudge the flower's centre by that percent of the flower's own half-extent.
   At Fit 100, X/Y 0 every view frames the flower exactly as before; the construction's
   old rings-only box sat within a percent of the unified extent at rest, so adopting it
   moves nothing the eye can find. Defaults and design values remain on
   ColourFlower.dc.html; this file holds the law, not the numbers. */
(function (root, factory) {
  const framing = factory();
  if (typeof module === 'object' && module.exports) module.exports = framing;
  else root.FlowerFraming = framing;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const DEFAULTS = { fit: 100, x: 0, y: 0 };
  const num = (v, fb) => (Number.isFinite(v) ? v : fb);
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /* The three directions, sanitised. Fit 50–100 never crops the flower; X/Y ±50 keep
     the flower's centre inside the middle half of the view, so the flower always
     covers the middle of its band. Anything unparsable falls back to the default. */
  function dirs(p) {
    p = p || {};
    return {
      fit: clamp(num(p.frameFit, DEFAULTS.fit), 50, 100),
      x: clamp(num(p.frameX, DEFAULTS.x), -50, 50),
      y: clamp(num(p.frameY, DEFAULTS.y), -50, 50)
    };
  }

  /* One band fit: the flower's extent fills Fit% of the band's shorter side at rest
     zoom, centred on the band plus the X/Y nudge. frameW/H map the box to pixels.
     Positive X moves the flower right, positive Y moves it down. */
  function frameBand({ left, right, top, bottom, frameW, frameH, extent, restZoom, fit, x, y }) {
    if (!Number.isFinite(extent) || extent <= 0) throw new RangeError('A frame needs a positive finite extent');
    if (!Number.isFinite(restZoom) || restZoom <= 0) throw new RangeError('A frame needs a positive finite rest zoom');
    const bandW = Math.max(120, right - left - 24), bandH = Math.max(120, bottom - top);
    const D = Math.min(bandW, bandH);
    const f = clamp(num(fit, DEFAULTS.fit), 50, 100) / 100;
    const s = D * f / (extent * restZoom);
    const nx = clamp(num(x, DEFAULTS.x), -50, 50) / 100;
    const ny = clamp(num(y, DEFAULTS.y), -50, 50) / 100;
    return {
      minX: -((left + right) / 2) / s - nx * extent / 2,
      minY: -((top + bottom) / 2) / s - ny * extent / 2,
      w: frameW / s, h: frameH / s, scale: s, bandW, bandH
    };
  }

  /* One square box: the schematic construction and the Render previews. half is the
     half-side at Fit 100; the nudge reads in the same flower units as frameBand, so
     a direction set here steers the construction and the previews with the artwork.
     Rounded to two decimals: past what the eye or any suite's margin can feel. */
  function squareBox({ half, fit, x, y }) {
    if (!Number.isFinite(half) || half <= 0) throw new RangeError('A square frame needs a positive finite half-side');
    const f = clamp(num(fit, DEFAULTS.fit), 50, 100) / 100;
    const H = half / f;
    const nx = clamp(num(x, DEFAULTS.x), -50, 50) / 100;
    const ny = clamp(num(y, DEFAULTS.y), -50, 50) / 100;
    const r2 = n => Math.round(n * 100) / 100;
    return [r2(-H - nx * half), r2(-H - ny * half), r2(2 * H), r2(2 * H)].join(' ');
  }

  return { DEFAULTS, dirs, frameBand, squareBox };
});
