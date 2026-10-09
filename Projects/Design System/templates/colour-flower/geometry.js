/* Flower's analytic geometry. Defaults and design values remain on ColourFlower.dc.html.
   Rounding is for displayed measurements, never for shared contact coordinates. */
(function (root, factory) {
  const geometry = factory();
  if (typeof module === 'object' && module.exports) module.exports = geometry;
  else root.FlowerGeometry = geometry;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';
  const SQRT3 = Math.sqrt(3);
  const EPS = 1e-12;
  const point = (radius, degrees) => {
    const angle = degrees * Math.PI / 180;
    return { x: radius * Math.sin(angle), y: -radius * Math.cos(angle) };
  };
  const blendPoints = radius => Array.from({ length: 6 }, (_, i) => point(radius, 30 + i * 60));

  function set(size, mode, spread = SQRT3) {
    if (!Number.isFinite(size) || size <= 0) throw new RangeError('A set needs a positive finite size');
    if (mode === 'D') return { r: size * (SQRT3 + 1), d: 0, mode };
    const ratio = mode === 'A' ? 1 : mode === 'C' ? 2 : spread;
    if (!Number.isFinite(ratio) || ratio < 0) throw new RangeError('Invalid centre-distance ratio');
    return { r: size, d: size * ratio, mode };
  }

  function crossings(r, d) {
    // Coincident circles have no unique intersection. Tangency has one, not two dots.
    if (!(r > 0) || !(d > 0) || !Number.isFinite(r + d)) return null;
    const q = d / r;
    if (q > 2 + EPS) return null;
    if (Math.abs(q - 1) < EPS) return { inner: 0, outer: SQRT3 * r, tangent: false };
    if (Math.abs(q - SQRT3) < EPS) return { inner: r, outer: 2 * r, tangent: false };
    if (Math.abs(q - 2) < EPS) return { inner: SQRT3 * r, outer: SQRT3 * r, tangent: true };
    const midpoint = d * SQRT3 / 2;
    const height = Math.sqrt(Math.max(0, r * r - d * d / 4));
    return { inner: midpoint - height, outer: midpoint + height, tangent: false };
  }

  function family({ tagBase, realmRatio, tagMode, stateMode, realmMode, tagSpread, stateSpread, realmSpread }) {
    const tags = set(tagBase, tagMode, tagSpread);
    const tagCross = crossings(tags.r, tags.d);
    const unitState = set(1, stateMode, stateSpread);
    const unitCross = crossings(unitState.r, unitState.d);
    const canMatch = !!(tagCross && unitCross && unitCross.inner > EPS);
    // With B spacing this is R_state = C_tags. With C it is C_tags / sqrt(3).
    // An impossible snap is disclosed, not silently called aligned or converted into NaN.
    const stateBase = canMatch ? tagCross.outer / unitCross.inner : tagBase * SQRT3;
    const state = set(stateBase, stateMode, stateSpread);
    const realmBase = tagBase * realmRatio;
    const realm = set(realmBase, realmMode, realmSpread);
    const stateCross = crossings(state.r, state.d);
    const shared = canMatch ? blendPoints(tagCross.outer) : [];
    const reason = !tagCross ? 'Tags has no distinct blend crossings in this spacing.'
      : !unitCross ? 'State has no distinct inner crossings in this spacing.'
      : unitCross.inner <= EPS ? 'State inner crossings meet at the centre in this spacing.' : '';
    return {
      tags, state, realm, tagBase, stateBase, realmBase, tagCross, stateCross,
      snap: { matched: canMatch, radius: canMatch ? tagCross.outer : null, points: shared, reason },
      // Every Base, Blend and Core circle gets the same radius, including collapsed spacing.
      shapes: Object.fromEntries([['tags', tags], ['state', state], ['realm', realm]].map(([key, g]) => [key,
        Array.from({ length: 13 }, (_, i) => ({ ...(i === 12 ? { x: 0, y: 0 } : point(g.d, i * 30)), r: g.r }))
      ]))
    };
  }
  return { SQRT3, point, blendPoints, set, crossings, family };
});
