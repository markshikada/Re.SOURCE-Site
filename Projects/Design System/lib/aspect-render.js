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
    const hit = t.find(x => x.a === ((a % 360) + 360) % 360);
    return hit ? hit.i : '00';
  },
  get BASE_HEX() { return window.RESOURCE_BASE_HEX; },
  get BLEND_HEX() { return window.RESOURCE_BLEND_HEX; },

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
      const base = (entry.picks || [])[0], blend = (entry.blendPicks || [])[0];
      return inSet.find(x => x.row === 'SINGLE' && (base !== undefined
        ? (x.picks || [])[0] === (base + 3) % 6
        : (x.blendPicks || [])[0] === (blend + 3) % 6)) || null;
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
    const base = [], blend = [];
    (deck || []).filter(c => c.set === set && c.row === 'SINGLE').forEach(c => {
      const w = (c.titles || [])[0] || '';
      (c.picks || []).forEach(i => { base[i] = w; });
      (c.blendPicks || []).forEach(i => { blend[i] = w; });
    });
    return { base, blend };
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
    const LEAD_TONE = '#FFFFFF', TRAIL_TONE = '#FFFFFF';
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
    const spectrum = picks.map(i => ({ a: i * 60, c: hexBase(i) }))
      .concat(blendPicks.map(i => ({ a: i * 60 + 30, c: hexBlend(i) })))
      .sort((x, y) => x.a - y.a).map(x => x.c);
    const vertical = opts.vertical != null ? opts.vertical : titles.length === 2; // pairs stack top/bottom; words and groups sit side by side with the mark
    // Colour follows the word by name, not by array position, so a flip can't
    // mispair a title with the wrong bar/ring colour.
    // Titles align to whichever pick list the entry actually uses, so a Blend
    // pair (no Base picks at all) colours its two words from BLEND_HEX rather
    // than reading undefined off BASE_HEX.
    const titleHexes = picks.length ? picks.map(hexBase) : blendPicks.map(hexBlend);
    const titleColour = {};
    entry.titles.forEach((t, k) => { titleColour[t] = titleHexes[k]; });

    const TITLE = 36, TITLE_GAP = 4, BAR = 3, CORNER = 0;
    const c = size / 2;
    const round = n => Math.round(n * 100) / 100;
    const r = (c - stroke / 2) / 2;
    const core = r;
    const cy = c - core;
    const spin = a => 'rotate(' + a + ' ' + c + ' ' + c + ')';
    const ring = i => ({ cx: c, cy, r, rot: spin(i * 30) });

    const markCircles = [];
    for (let i = 0; i < 12; i++) markCircles.push({ ...ring(i), stroke: '#333333', width: 1 });
    // The core's own marker ring is drawn separately, after the void glow, so
    // it reads on top of the glow rather than under it.
    const coreRing = { cx: c, cy: c, r: core };

    // Whichever pick is currently first in title order (accounting for flip)
    // is the lead: bigger ring, bigger marker. Position, not array order.
    // A Single word gets the same lead emphasis a Pair gives its first pick
    // — bigger ring, bigger marker — since it is, in effect, a one-word Pair.
    const leadIndex = picks.length === 2 ? (flip ? picks[1] : picks[0]) : (picks.length === 1 ? picks[0] : null);
    // A Blend pair carries its lead on the Blend ring instead, same rule.
    const blendLeadIndex = (!picks.length && blendPicks.length === 2) ? (flip ? blendPicks[1] : blendPicks[0])
      : (!picks.length && blendPicks.length === 1 ? blendPicks[0] : null);
    // The lead pick's spot on the twelve-point wheel: Base i sits at i*60,
    // Blend i at i*60+30, numbered P01 at 0 degrees round to P12 at 330.
    const posBase = leadIndex != null ? leadIndex : (picks.length ? picks[0] : null);
    const posBlend = posBase == null ? (blendPicks[0] ?? null) : null;
    const posAngle = posBase != null ? posBase * 60 : posBlend * 60 + 30;
    // Numbered like a clock face: 0 degrees (12 o'clock) is P12, 30 degrees
    // (1 o'clock) is P01, running clockwise from there.
    const posNumber = ((posAngle / 30 + 11) % 12) + 1;
    // The label names the positions the card holds and nothing else, always on
    // the clock face, lead first. Retired 18 August 2026: the angle after a
    // single position, and the count-and-step form a wider card used to take,
    // as 3× 120°. Neither said which positions were held, which is the one
    // thing the label is for.
    const posCount = picks.length + blendPicks.length;
    const pad = n => String(n).padStart(2, '0');
    let posRun = picks.map(i => i * 60).concat(blendPicks.map(i => i * 60 + 30))
      .sort((x, y) => x - y).map(a => ((a / 30 + 11) % 12) + 1);
    const posLeadAt = posRun.indexOf(posNumber);
    if (posLeadAt > 0) posRun = [posRun[posLeadAt]].concat(posRun.slice(0, posLeadAt), posRun.slice(posLeadAt + 1));
    // Numbers are joined by the middle dot, the same separator the polar words
    // and every other metadata line take.
    // A whole ring is a range, since listing twelve numbers would run past the
    // card. Six is the same problem: eighteen characters overran the frame, so
    // a Group prints its span alone. Retired 18 August, the same day it was
    // tried: the EVEN and ODD qualifier after it. Three or fewer list in full.
    const posSorted = posRun.slice().sort((x, y) => x - y);
    const posEvenStep = posSorted.length > 3 &&
      posSorted.every((n, k) => k === 0 || n - posSorted[k - 1] === 2);
    const posLabel = posCount === 0 ? 'VOID'
      : posCount === 12 ? 'P01\u2013P12'
      : posEvenStep
        ? 'P' + pad(posSorted[0]) + '\u2013P' + pad(posSorted[posSorted.length - 1])
        : 'P' + posRun.map(pad).join('\u00b7');
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
    const shadowOf = (w) => {
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
    const markPickedAll = picks.map(i => ({ ...ring(i * 2), stroke: hexBase(i), width: i === leadIndex ? stroke + 2 : stroke, glow: 'none', sh: shadowOf(i === leadIndex ? stroke + 2 : stroke) }))
      .concat(blendPicks.map((i, n) => ({
        cx: c, cy, r, rot: spin(i * 60 + 30), stroke: colours[picks.length + n], width: i === blendLeadIndex ? stroke + 2 : stroke, glow: 'none', sh: shadowOf(i === blendLeadIndex ? stroke + 2 : stroke)
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
    if (pickedAboveCore) markPickedAll.forEach(p => { p.sh = []; });
    const markPicked = pickedAboveCore ? [] : markPickedAll;
    const markPickedTop = pickedAboveCore ? markPickedAll : [];

    const triH = Math.max(6, r * 0.42);
    const triW = triH / Math.sqrt(3);
    const triPath = (h, w) => 'M ' + c + ',' + (cy - h * 2 / 3) +
      ' L ' + (c + w) + ',' + (cy + h / 3) +
      ' L ' + (c - w) + ',' + (cy + h / 3) + ' Z';
    const tri = triPath(triH, triW);
    const triLead = triPath(triH * 1.25, triW * 1.25); // the lead pick's marker is bigger, so a flip visibly moves the emphasis
    const halo = round(Math.max(3, r * 0.18));
    const showBlend = blendPicks.length > 0 || !!opts.showBlend;
    const dotR = Math.max(2.5, r * 0.16);
    const markFaintDots = [], markTris = [], markDots = [];
    // A full Set already lights every ring in colour; triangle and dot
    // markers on top of all twelve just reads as clutter, so it skips them.
    if (entry.type !== 'Set') picks.slice().reverse().forEach(i => markTris.push({ d: i === leadIndex ? triLead : tri, rot: spin(i * 60), halo }));
    if (showBlend && entry.type !== 'Set') {
      blendPicks.slice().reverse().forEach(i => markDots.push({ cx: c, cy, r: i === blendLeadIndex ? dotR * 1.25 : dotR, rot: spin(i * 60 + 30), halo }));
      for (let i = 0; i < 6; i++) if (!blendPicks.includes(i))
        markFaintDots.push({ cx: c, cy, r: dotR, rot: spin(i * 60 + 30), halo });
    }
    const markCentre = { cx: c, cy: c, r: dotR };
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

    const words = titles.length === 2
      ? titles.map((text, k) => ({ text, colours: [titleColour[text]], tone: k === leadTitle ? LEAD_TONE : TRAIL_TONE }))
      // A card holding no position carries no position colour, so its bar is
      // white. Changed 17 August 2026: the Core cards were taking the whole
      // twelve-colour spectrum, which said they held everything rather than
      // nothing. Every other single-title card keeps the spectrum.
      : [{ text: titles[0], colours: (picks.length || blendPicks.length) ? spectrum : ['#FFFFFF'], tone: LEAD_TONE }];

    const bw = opts.baseWords || [], lw = opts.blendWords || [];
    // The word grid is always the whole twelve, in angle order, whatever the
    // card holds. Held positions take their colour and white type; the rest
    // stay in the greyscale, so a Triad reads as three lit out of twelve
    // rather than as three words on their own. Decided 16 August.
    // Interleaved, so index n sits at n * 30 degrees: base at i * 60, blend at i * 60 + 30.
    // Each entry also carries its position index, which is what the grid falls back to when
    // no words are supplied. The system stores no position words, so a card with no LINGO
    // source shows the twelve positions by index rather than showing nothing at all.
    const POS_AT = (deg) => window.AspectRender.POS_AT_ANGLE(deg);
    const grid12 = [];
    for (let i = 0; i < 6; i++) {
      const onB = picks.includes(i), onL = blendPicks.includes(i);
      grid12.push({ w: bw[i] || '', pos: POS_AT(i * 60), col: onB ? hexBase(i) : '#333333', tc: onB ? '#FFFFFF' : '#555555', on: onB });
      grid12.push({ w: lw[i] || '', pos: POS_AT(i * 60 + 30), col: onL ? hexBlend(i) : '#333333', tc: onL ? '#FFFFFF' : '#555555', on: onL });
    }
    grid12.forEach(g => { g.label = g.w || 'P' + g.pos; });
    const hasWords = grid12.some(g => g.w);
    // The six columns are the six polar axes: index k sits at k*30, index k+6
    // at k*30+180. Each column stacks its two words around one shared bar,
    // the same treatment the Pair title takes, top word left and bottom word
    // right so each word sits over its own half of the bar.
    const gridPairs = [];
    for (let k = 0; k < 6; k++) gridPairs.push({ top: grid12[k], bot: grid12[k + 6] });
    const held = picks.map(i => ({ w: bw[i] || '', col: hexBase(i), a: i * 60 }))
      .concat(blendPicks.map(i => ({ w: lw[i] || '', col: hexBlend(i), a: i * 60 + 30 })))
      .sort((x, y) => x.a - y.a);

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
      markCircles, markPicked, markPickedTop, markTris, markDots, markFaintDots, markCentre, coreRing, petalShadow,
      markCentreFill, markCentreHalo, coreGlow, glowR: round(r * 2 * voidGlowSize), coreFillR: round(core * voidGlowSize),
      glowStop0, glowStop55, glowMidOffset,
      barColours: titles.length === 2 ? titles.map(t => titleColour[t]) : ((picks.length || blendPicks.length) ? spectrum : ['#FFFFFF']),
      // What the card holds, in angle order. Words come from the caller
      // (opts.baseWords / opts.blendWords), never from here, since the
      // assignments still move.
      held, heldRun: held.map(x => x.w).join(' \u00b7 '),
      grid12, gridPairs, hasWords,
      topWord: titles[0],
      bottomWord: stacked ? (titles[1] || '') : '',
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
