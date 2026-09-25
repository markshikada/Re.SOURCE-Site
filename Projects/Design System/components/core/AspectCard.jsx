import React from 'react';
import { Mark } from './Mark.jsx';

/* AspectCard. The printed card: 360 x 504, poker portrait, which is 63 x 88mm
   at roughly 1.5x print scale. One inner hairline frame inset 10px, four mono
   corner labels sitting on that frame line with the card fill masking the line
   behind them, a title band, an optional twelve-word grid, a gloss, a reading,
   a question and a foot row.

   Slack collects in one spacer between the reading and the foot, so a short
   reading never opens a hole in the middle of a card.

   Geometry and the position label come from window.AspectRender, the same
   helper the deck and the flower read, so the three can never disagree. The
   card holds no copy: every sentence arrives on the entry. */

const round = (n) => Math.round(n * 100) / 100;
const MONO = {
  fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-caption)',
  lineHeight: 'var(--lh-caption)', textTransform: 'uppercase',
};
const cornerLabel = (pos) => ({
  position: 'absolute', ...pos, ...MONO, color: 'var(--text-secondary)',
  whiteSpace: 'nowrap', pointerEvents: 'none',
});
/* The fit mark. One hand-read verdict on meaning: does this word mean the right thing at this
   position, in this set. It reads one to five, and 0 for unread. It sits on the frame line at top
   left as a traffic light — a dot is a mark, so it may carry colour; the law forbids colour behind a
   word, not on a mark that is nothing but colour. Unread is a hollow ring, because a word nobody
   has read is not a bad word and should not read as a low score.

   The five colours are five real positions on the wheel, read round the arc from 12 to 06, which
   runs green, yellow-green, yellow, orange, red in the spectrum itself. So the scale borrows a
   progression the system already owns rather than adding five semantic colours to a palette that
   has never had any.

   Retired 28 August 2026: the coloured numeral, and before it the diamond and the fits/off/unread
   strings it was keyed on. A numeral asked to be read where a dot only has to be seen.

   The colour is not judged. It is fixed by the position's place in the spectrum, so there is
   nothing to rate: a control there would invite someone to mark a hex wrong when the hex is the
   one thing on the card that was never a choice. */
const FIT_COLOUR = { 5: 'var(--cl-12-life)', 4: 'var(--cl-01-tone)', 3: 'var(--cl-02-flux)', 2: 'var(--cl-04-love)', 1: 'var(--cl-06-fire)' };
const TITLE = { fontWeight: 'var(--fw-h1)', fontSize: '36px', lineHeight: '36px', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', transition: 'color 300ms cubic-bezier(.25,0,0,1)' };

export function AspectCard({
  entry, baseWords = [], blendWords = [], size = 120, flipped = false, onFlip,
  showGrid = false, scale = 1, setLabel, badge, markRotate = 0, fit, style,
  /* Passed straight through to the mark. Undefined here means Mark's own defaults apply,
     so a caller that never mentions these draws exactly as before. */
  petalShadowSize, petalShadowDepth, petalShadowDrop, voidGlowSize, voidGlowDepth,
  ...rest
}) {
  const R = typeof window !== 'undefined' ? window.AspectRender : null;
  if (!entry || !R) return <div style={{ width: 360, height: 504, ...style }} />;
  const v = R.build(entry, { size, flipped, baseWords, blendWords });
  /* The inner frame carries the card's accent: the colour of the position it leads with. Only a
     card that leads with one position has one — a Single or a Pair. A Core holds none, and a
     Triad, a Group and a Set hold a span rather than a position, so their frame is a white
     hairline. The
     card's own edge is a plain hairline throughout. This is the one place a card's accent is
     decided, so every card in the deck follows it. */
  const accent = entry.holds <= 2 ? ((v.barColours || [])[0] || 'var(--surface-border)') : '#FFFFFF';
  /* A Pair holds two positions and leads with one, so its frame is split diagonally between
     their two colours, laid out the way the titles are: the leading word's colour on the top
     left, the trailing word's on the bottom right. A flip swaps the titles, and the frame turns
     with them. */
  const split = entry.holds === 2 && (v.barColours || []).length === 2 ? v.barColours : null;
  const frame = { position: 'absolute', inset: 10, borderRadius: 4, pointerEvents: 'none' };

  /* The label at top left names the ring, REALM, STATE or TAG. A Set card is
     the one case that shows the adjective instead, since the adjective is the
     part its own title does not say. */
  const setWords = String(entry.set || '').split(' ');
  const label = setLabel != null ? setLabel
    : (entry.holds === 12 ? setWords[0] : setWords[setWords.length - 1]).toUpperCase();
  /* The badge says how much of the ring the card holds. Base and Blend are
     both Group: the title already says which six. */
  const kind = badge != null ? badge
    : (entry.type === 'Base' || entry.type === 'Blend' ? 'GROUP' : String(entry.type || '').toUpperCase());

  // The grid draws whenever it is asked for. With no LINGO source it labels the twelve by
  // position index rather than rendering empty, which is what used to make the toggle look
  // broken. Retired: gating the grid on hasWords.
  const grid = showGrid;

  return (
    <article
      data-card=""
      style={{
        position: 'relative', width: 360, height: 504, flex: '0 0 auto',
        background: 'var(--surface-card)', border: '1px solid var(--surface-border)',
        borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 12,
        overflow: 'hidden',
        /* A narrow screen scales the card whole rather than reflowing it, so
           the printed proportions hold. */
        transform: scale === 1 ? undefined : `scale(${scale})`,
        transformOrigin: 'top left',
        ...style,
      }}
      {...rest}
    >
      {split ? (
        <>
          <div style={{ ...frame, border: `1px solid ${split[0]}`, clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}></div>
          <div style={{ ...frame, border: `1px solid ${split[1]}`, clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}></div>
        </>
      ) : (
        <div style={{ ...frame, border: `1px solid ${accent}` }}></div>
      )}
      {fit ? (
        <span style={{ ...cornerLabel({ top: 5, left: 16 }) }}>
          <span style={{ background: 'var(--surface-card)', padding: '0 8px', display: 'inline-flex', alignItems: 'center' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: FIT_COLOUR[fit] || 'transparent', border: FIT_COLOUR[fit] ? 'none' : '1px solid #333333', boxSizing: 'border-box' }}></span>
          </span>
        </span>
      ) : null}
      <span style={{ ...cornerLabel({ top: 5, right: 24 }), width: size, textAlign: 'center' }}><span style={{ background: 'var(--surface-card)', padding: '0 8px' }}>{kind}</span></span>
      <span style={{ ...cornerLabel({ bottom: 5, right: 24 }), width: size, textAlign: 'center' }}><span style={{ background: 'var(--surface-card)', padding: '0 8px' }}>{v.posLabel}</span></span>

      <div style={{ position: 'relative', flexShrink: 0, height: v.bandHeight, display: 'grid', gridTemplateColumns: '156px minmax(0,1fr)', alignItems: 'start' }}>
        {/* The control shows whenever a counter exists, which only the parent knows: a Pair
            swaps which word leads, and a Single, Triad or Group turns over to its counterpart
            card. Retired: gating on canFlip, which limited the flip to a Pair. */}
        {onFlip ? (
          <button
            type="button" onClick={onFlip} aria-label="Flip"
            style={{ position: 'absolute', left: 160, top: `calc(${v.columnTop}px + 42px)`, transform: 'translateY(-50%)', zIndex: 5, width: 28, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 0, padding: 0, cursor: 'pointer', color: '#555555' }}
          >
            <svg viewBox="0 0 12 26" style={{ display: 'block', width: 12, height: 26 }}>
              <path d="M 6,0.5 L 11.2,9.5 L 0.8,9.5 Z" fill="currentColor"></path>
              <path d="M 6,25.5 L 0.8,16.5 L 11.2,16.5 Z" fill="currentColor"></path>
            </svg>
          </button>
        ) : null}

        <div style={{ order: 1, paddingTop: Math.max(0, v.columnTop - 14), display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: v.titleBoxWidth, maxWidth: 156, gap: 4 }}>
            {/* The set label names the ring the card belongs to. It sits above the title, in the
                same stack rhythm as the title and its bar. */}
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '12px', fontWeight: 'var(--fw-h1)', textTransform: 'uppercase', color: 'var(--text-secondary)', whiteSpace: 'nowrap', marginBottom: -2 }}>{label}</span>
            {v.isHorizontal ? (
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', minWidth: 0 }}>
                {v.words.map((w) => (
                  <div key={w.text} style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                    <h3 style={{ ...TITLE, color: w.tone }}>{w.text}</h3>
                    <div style={{ display: 'flex', height: 3, gap: 2 }}>
                      {w.colours.map((col, n) => <div key={n} style={{ flex: '1 1 0', background: col }}></div>)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h3 style={{ ...TITLE, color: v.topTone }}>{v.topWord}</h3>
                <div style={{ display: 'flex', height: 3, gap: 2 }}>
                  {v.barColours.map((col, n) => <div key={n} style={{ flex: '1 1 0', background: col }}></div>)}
                </div>
                <h3 style={{ ...TITLE, color: v.bottomTone, textAlign: 'right' }}>{v.bottomWord}</h3>
              </>
            )}
          </div>
        </div>

        <div style={{ order: 2, justifySelf: 'end', width: size, height: size, marginTop: v.markTop }}>
          <Mark
            size={size}
            picks={entry.picks || []}
            blendPicks={entry.blendPicks || []}
            white={!!entry.white}
            full={entry.type === 'Set'}
            {...(petalShadowSize != null ? { petalShadow: petalShadowSize } : {})}
            {...(petalShadowDepth != null ? { petalShadowDepth } : {})}
            {...(petalShadowDrop != null ? { petalShadowDrop } : {})}
            {...(voidGlowSize != null ? { voidGlowSize } : {})}
            {...(voidGlowDepth != null ? { voidGlowDepth } : {})}
            /* A Pair holds an axis, two positions opposite each other, so flipping it turns the
               mark half a turn: the lead position physically moves to the other end, the way it
               would on the flower. Every other card's mark stands still. */
            rotate={markRotate + (flipped && entry.titles && entry.titles.length === 2 ? 180 : 0)}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {grid ? (
        <div style={{ position: 'relative', flexShrink: 0, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', columnGap: 6 }}>
          {v.gridPairs.map((p, n) => (
            <span key={n} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-h1)', fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-caption)', textTransform: 'uppercase', color: p.top.tc }}>{p.top.label}</span>
              <span style={{ display: 'flex', height: 3, gap: 2 }}>
                <span style={{ flex: '1 1 0', background: p.top.col }}></span>
                <span style={{ flex: '1 1 0', background: p.bot.col }}></span>
              </span>
              <span style={{ textAlign: 'right', fontFamily: 'var(--font-sans)', fontWeight: 'var(--fw-h1)', fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-caption)', textTransform: 'uppercase', color: p.bot.tc }}>{p.bot.label}</span>
            </span>
          ))}
        </div>
      ) : null}

      <div style={{ flex: '1 1 auto', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
        <p style={{ flex: '0 0 auto', maxHeight: 24, fontSize: 'var(--fs-body)', lineHeight: '24px', fontWeight: 'var(--fw-h1)', color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textWrap: 'pretty' }}>{v.gloss}</p>
        <p style={{ flex: '1 1 auto', minHeight: 0, fontSize: 'var(--fs-body)', lineHeight: '24px', fontWeight: 'var(--fw-body)', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textWrap: 'pretty' }}>{v.reading}</p>
      </div>

      {v.question ? (
        <p style={{ position: 'relative', flexShrink: 0, paddingTop: 12, borderTop: '1px solid var(--surface-border)', fontSize: 'var(--fs-caption)', lineHeight: 'var(--lh-caption)', color: 'var(--text-primary)', margin: 0 }}>{v.question}</p>
      ) : null}

      {v.last ? (
        <div style={{ position: 'relative', flexShrink: 0, display: 'flex', gap: 12, alignItems: 'baseline', paddingTop: 12, borderTop: '1px solid var(--surface-border)' }}>
          <span style={{ flex: '0 0 auto', ...MONO, color: 'var(--text-secondary)' }}>{v.lastLabel}</span>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', lineHeight: '12px', fontWeight: 'var(--fw-h1)', color: 'var(--text-primary)' }}>{v.last}</span>
        </div>
      ) : null}
    </article>
  );
}

/* The blank slot. A selection with no card gets this and one plain line, never
   a nearest match: three positions with no card between them is a real fact
   about the deck, and the slot reports it. */
export function AspectCardBlank({ positions = '', line = 'No card holds these positions.', size = 120, style, ...rest }) {
  return (
    <article
      style={{
        position: 'relative', width: 360, height: 504, flex: '0 0 auto',
        background: 'var(--surface-page)', border: '1px solid var(--surface-border)',
        borderRadius: 14, padding: 24, display: 'flex', flexDirection: 'column', gap: 12,
        ...style,
      }}
      {...rest}
    >
      <div style={{ position: 'absolute', inset: 10, border: '1px solid var(--surface-border)', borderRadius: 4, borderStyle: 'dashed', pointerEvents: 'none' }}></div>
      <span style={{ ...cornerLabel({ top: 5, left: 16 }) }}><span style={{ background: 'var(--surface-page)', padding: '0 8px' }}>NO CARD</span></span>
      <span style={{ ...cornerLabel({ bottom: 5, right: 24 }), width: size, textAlign: 'center' }}><span style={{ background: 'var(--surface-page)', padding: '0 8px' }}>{positions}</span></span>
      <p style={{ margin: 'auto 0', fontSize: 'var(--fs-body)', lineHeight: '24px', color: 'var(--text-secondary)' }}>{line}</p>
    </article>
  );
}

export const ASPECT_CARD_SIZE = { w: 360, h: 504, radius: 14, frameInset: 10, pad: 24, gap: 12, band: round(120) };
