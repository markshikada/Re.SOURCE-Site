/* The Tweaks drawer reads this: one set card per ring role, carrying the set it holds, a row of
   spacing presets, a title format and a row of element switches. The four spacing presets are the
   four modes, named for what the circles do: Nested (d = R), Interlaced (d = √3R), Kissing (d = 2R),
   Unified (d = 0).

   The sets' positions and scales are laws, not dials (Mark, 2026-09-23: "Remove the scale sliders
   at top, they're not needed. I'd rather establish rules to keep sets snapping to relational
   positions and scales."). The rules, all in geometry.js and the master:
     - Tags is the unit. Its radius is the canvas unit, and the fit chooses the unit per frame.
     - State's radius snaps to the Tags blend, so the two rings share their contacts exactly.
     - Realm's radius is 3 × Tags, the 3 of the 2:3:6 harmonic ratio.
   `hidden` keeps the retired dials (flowerScale, realmScale, and the ring stroke weights, which are
   a universal style) out of the studio while the master still declares them for its own readouts.
   The three title styles are read from their tokens in tokens/typography.css rather than restated
   here. Declared 2026-09-23; values only, the geometry itself stays in geometry.js. Read by
   lib/tweaks-drawer.js; with no config declared a master keeps the flat sections. */
window.RS_TWEAK_CARDS = {
  titleStyles: [
    { label: 'H1', sizeToken: '--title-1-size', weightToken: '--title-1-weight' },
    { label: 'H2', sizeToken: '--title-2-size', weightToken: '--title-2-weight' },
    { label: 'H3', sizeToken: '--title-3-size', weightToken: '--title-3-weight' }
  ],
  hidden: ['flowerScale', 'realmScale', 'realmStrokeWeight', 'stateStrokeWeight', 'tagStrokeWeight'],
  roles: [
    { key: 'outer', label: 'Outer', setProp: 'outerSet', presetProp: 'realmSpacing', propPrefix: 'realm',
      title: { size: 'realmTitleSize', weight: 'realmTitleWeight', pos: 'realmTitlePos', colour: 'realmTitleColour' },
      props: ['realmColourFill', 'realmColourStroke'],
      elements: ['realmShowPlate', 'realmShowStroke', 'realmShowFill', 'realmShowTitle', 'realmShowBlend', 'realmShowDots'],
      presets: [
        { label: 'Nested', mode: 'A', values: { realmSpacing: 'A' } },
        { label: 'Interlaced', mode: 'B', values: { realmSpacing: 'B' } },
        { label: 'Kissing', mode: 'C', values: { realmSpacing: 'C' } },
        { label: 'Unified', mode: 'D', values: { realmSpacing: 'D' } }
      ] },
    { key: 'mid', label: 'Middle', setProp: 'midSet', presetProp: 'stateSpacing', propPrefix: 'state',
      title: { size: 'stateTitleSize', weight: 'stateTitleWeight', pos: 'stateTitlePos', colour: 'stateTitleColour' },
      props: ['stateColourFill', 'stateColourStroke'],
      elements: ['stateShowPlate', 'stateShowStroke', 'stateShowFill', 'stateShowTitle', 'stateShowBlend', 'stateShowDots'],
      presets: [
        { label: 'Nested', mode: 'A', values: { stateSpacing: 'A' } },
        { label: 'Interlaced', mode: 'B', values: { stateSpacing: 'B' } },
        { label: 'Kissing', mode: 'C', values: { stateSpacing: 'C' } },
        { label: 'Unified', mode: 'D', values: { stateSpacing: 'D' } }
      ] },
    { key: 'inner', label: 'Inner', setProp: 'innerSet', presetProp: 'tagSpacing', propPrefix: 'tag',
      title: { size: 'tagTitleSize', weight: 'tagTitleWeight', pos: 'tagTitlePos', colour: 'tagTitleColour' },
      props: ['tagColourFill', 'tagColourStroke'],
      elements: ['tagShowPlate', 'tagShowStroke', 'tagShowFill', 'tagShowTitle', 'tagShowBlend', 'tagShowDots'],
      presets: [
        { label: 'Nested', mode: 'A', values: { tagSpacing: 'A' } },
        { label: 'Interlaced', mode: 'B', values: { tagSpacing: 'B' } },
        { label: 'Kissing', mode: 'C', values: { tagSpacing: 'C' } },
        { label: 'Unified', mode: 'D', values: { tagSpacing: 'D' } }
      ] }
  ]
};
