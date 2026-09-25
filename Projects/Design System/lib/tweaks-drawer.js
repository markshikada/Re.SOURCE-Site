/* The tweaks drawer — the masters' dial surface, rebuilt for standalone use.
   The Tweaks panel that surrounded these masters in Claude Design was the platform's own,
   and with the subscription gone (13 September 2026) the schema each master declares in its
   data-props had nothing left to render it: the values were dialled by nobody, at their
   declared defaults, with no way to see what a change would do before it was written into
   the file.
   This file is the replacement. It reads the schema straight off the runtime's registry
   and pushes live values through the runtime's own setProps bridge — the same host API the
   old panel called — so the mounted master re-renders on every change, no reload.

   One file, shared: every master declares its tweaks the same way, in its own data-props,
   so each gets this drawer with a single script tag and no per-master code. Colour FLOWER
   carries it first (Mark's ruling, 19 September 2026); the other six pick it up once it is
   tuned to feel right.

   Deliberately no persistence: the master's file owns the values, and a dialed-in value
   remembered across reloads would be a second source of truth, which is exactly the drift
   the August audit was about. What the drawer is for is working — dial it, look, and when
   a value is right it is stamped into the file's declared defaults, the way every other
   value on a master changes.

   Edition v11.1 (compact modern law, safe-area, 2026-09-22): triggers and panels share the same
   compact treatment as the masters nav — 32px rows, 6px 10px padding, 11px mono,
   0.02em tracking, surface-card / surface-border, 8px radius, subtle shadow.
   Desktop and mobile are identical in density; only the fold differs. No heavy
   glows, no large paddings, no obstructions. Masters and pages fit together
   because every chrome uses the same tokens.
*/
(function () {
  'use strict';

  var LABELS = { outerSet: 'Outer set', midSet: 'Middle set', innerSet: 'Inner set' };

  function labelFor(key) {
    if (LABELS[key]) return LABELS[key];
    return key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, function (c) { return c.toUpperCase(); });
  }

  var VIEW_MODES = { schematicMode: { label: 'Schematics' }, walkthroughMode: { label: 'Walkthrough' } };

  /* A spacing preset's own glyph: two circles drawn at the preset's real centre distance, so
     the row shows the geometry it sets rather than naming it twice. A is nested (centres one
     radius apart), B interlaced (√3), C kissing (2r), D unified (one circle). */
  /* A named style's own values, read from the tokens rather than restated in the config. */
  function tokenNum(name, fallback) {
    if (!name || typeof document === 'undefined') return fallback;
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name));
    return isFinite(v) && v > 0 ? v : fallback;
  }

  function spacingGlyph(mode) {
    var r = 6, cy = 10, cx = 12;
    if (mode === 'D') {
      return '<svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">' +
        '<circle cx="12" cy="10" r="8" stroke="currentColor" stroke-width="1.2"/></svg>';
    }
    var ratio = mode === 'A' ? 1 : mode === 'B' ? Math.sqrt(3) : 2;
    var half = (r * ratio) / 2;
    return '<svg width="24" height="20" viewBox="0 0 24 20" fill="none" aria-hidden="true">' +
      '<circle cx="' + (cx - half) + '" cy="' + cy + '" r="' + r + '" stroke="currentColor" stroke-width="1.2"/>' +
      '<circle cx="' + (cx + half) + '" cy="' + cy + '" r="' + r + '" stroke="currentColor" stroke-width="1.2"/></svg>';
  }

  var CSS =
    '[data-rf-drawer]{position:fixed;inset:0;z-index:99990;pointer-events:none;font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace)}' +
    /* No dimming: Tweaks is a visual assist, so the artwork stays at full strength and stays
       live under it. The panel is non-modal, the same way the Flower's own Render drawer is.
       Close paths are the panel's own × and Escape. */
    '[data-rf-drawer] .tk-veil{display:none}' +
    '[data-rf-drawer] .tk-trigger,[data-rf-drawer] .tk-panel,[data-rf-drawer] .tk-view{pointer-events:auto}' +
    /* Master-specific options — compact modern, same as rsnav trigger */
    '[data-rf-drawer] .tk-trigger{position:absolute;top:calc(60px + env(safe-area-inset-top,0px));right:max(20px,env(safe-area-inset-right,0px));z-index:2;display:flex;align-items:center;gap:6px;min-height:32px;padding:6px 10px;background:var(--surface-card,#111111);border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px);color:var(--text-secondary,#888888);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive);box-shadow:0 2px 12px rgba(0,0,0,0.3);touch-action:manipulation}' +
    '[data-rf-drawer] .tk-trigger:hover,[data-rf-drawer] .tk-trigger[aria-expanded=true]{color:var(--text-primary,#ffffff);border-color:var(--g66,#666666);background:var(--surface-raised,#1a1a1a)}' +
    '[data-rf-drawer] .tk-trigger:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    /* View-mode toggle — same cluster, 40px steps (was 44px) */
    '[data-rf-drawer] .tk-view{position:absolute;top:calc(100px + env(safe-area-inset-top,0px));right:max(20px,env(safe-area-inset-right,0px));z-index:2;display:flex;align-items:center;gap:6px;min-height:32px;padding:6px 10px;background:var(--surface-card,#111111);border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px);color:var(--text-secondary,#888888);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive);touch-action:manipulation}' +
    '[data-rf-drawer] .tk-view:hover{color:var(--text-primary,#ffffff);border-color:var(--g66,#666666);background:var(--surface-raised,#1a1a1a)}' +
    '[data-rf-drawer] .tk-view[aria-pressed=true]{color:var(--text-primary,#ffffff);border-color:var(--text-secondary,#888888);background:var(--surface-raised,#1a1a1a)}' +
    '[data-rf-drawer] .tk-view:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-chevron{transition:transform var(--dur-md) var(--ease-arrive);font-size:10px;opacity:0.7}' +
    '[data-rf-drawer] .tk-trigger[aria-expanded=true] .tk-chevron{transform:rotate(180deg);opacity:1}' +
    /* Panel — a sheet at the foot on a phone, the corner card from 720. The sheet takes at
       most half the frame so the instrument keeps the band above it, and its body is the one
       part that scrolls, so the head's close control and the foot's Reset stay in reach.
       Universal brand-style mobile law, 2026-09-23. */
    '[data-rf-drawer] .tk-panel{position:absolute;left:0;right:0;top:auto;bottom:0;z-index:1;max-height:50%;overflow:hidden;display:flex;flex-direction:column;padding:0 0 env(safe-area-inset-bottom,0px);background:var(--surface-card,#111111);border:0;border-top:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-md,12px) var(--radius-md,12px) 0 0;visibility:hidden;opacity:0;transform:translateY(8px);transition:opacity var(--dur-md) var(--ease-arrive),transform var(--dur-md) var(--ease-arrive),visibility 0ms var(--dur-md);box-shadow:0 -8px 32px rgba(0,0,0,0.4)}' +
    '[data-rf-drawer] .tk-panel[data-open=true]{visibility:visible;opacity:1;transform:none;transition-delay:0ms}' +
    '@media (min-width:720px){[data-rf-drawer] .tk-panel{left:auto;right:max(20px,env(safe-area-inset-right,0px));top:calc(100px + env(safe-area-inset-top,0px));bottom:auto;width:300px;max-height:calc(100% - 124px - env(safe-area-inset-bottom,0px));border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px);box-shadow:0 8px 32px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.04) inset}}' +
    '@media (min-width:720px){[data-rf-drawer][data-has-view=\"true\"] .tk-panel{top:calc(140px + env(safe-area-inset-top,0px));max-height:calc(100% - 164px - env(safe-area-inset-bottom,0px))}}' +
    '@media (min-width:720px){[data-rf-drawer][data-view-count=\"2\"] .tk-panel{top:calc(220px + env(safe-area-inset-top,0px));max-height:calc(100% - 244px - env(safe-area-inset-bottom,0px))}}' +
    /* A short, wide frame (a phone on its side) folds the cluster to one chip ending near 100,
       so its panel can start higher than the two-toggle desktop offset and take the room: the
       same corner card, just taller. A narrow frame's panel is the foot sheet above. */
    '@media (min-width:720px) and (max-height:575px){[data-rf-drawer] .tk-panel,[data-rf-drawer][data-has-view=\"true\"] .tk-panel,[data-rf-drawer][data-view-count=\"2\"] .tk-panel{top:calc(112px + env(safe-area-inset-top,0px));max-height:calc(100% - 132px - env(safe-area-inset-bottom,0px))}}' +
    '[data-rf-drawer] .tk-head{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:12px 14px 8px;border-bottom:1px solid var(--surface-border,#2a2a2a);flex:0 0 auto}' +
    /* The one scrolling part of a sheet: everything between the head and the foot. */
    '[data-rf-drawer] .tk-body{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;display:flex;flex-direction:column;gap:12px;padding:12px 14px}' +
    '[data-rf-drawer] .tk-head-label{font-size:10px;line-height:14px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-dim,#555555)}' +
    '[data-rf-drawer] .tk-close{display:flex;align-items:center;justify-content:center;min-width:32px;min-height:32px;padding:0;border:0;background:none;color:var(--text-dim,#555555);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:16px;line-height:1;cursor:pointer;transition:color var(--dur-sm) var(--ease-arrive);border-radius:6px}' +
    '[data-rf-drawer] .tk-close:hover{color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a)}' +
    '[data-rf-drawer] .tk-close:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-sec{display:flex;flex-direction:column;gap:8px}' +
    '[data-rf-drawer] .tk-sec-label{font-size:10px;line-height:14px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-dim,#555555)}' +
    '[data-rf-drawer] .tk-row{display:flex;flex-direction:column;gap:4px}' +
    '[data-rf-drawer] .tk-name{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;color:var(--text-secondary,#888888)}' +
    '[data-rf-drawer] .tk-val{color:var(--text-primary,#ffffff);font-variant-numeric:tabular-nums}' +
    '[data-rf-drawer] .tk-brow{display:flex;align-items:center;justify-content:space-between;gap:8px}' +
    '[data-rf-drawer] .tk-bname{font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;color:var(--text-secondary,#888888)}' +
    '[data-rf-drawer] .tk-enum{display:flex;flex-wrap:wrap;gap:4px}' +
    '[data-rf-drawer] .tk-enum .tk-btn{flex:1 1 auto;text-align:center}' +
    '[data-rf-drawer] .tk-enum-wide .tk-btn{flex:1 1 calc(50% - 2px);text-align:left;white-space:normal}' +
    '[data-rf-drawer] .tk-btn{padding:5px 10px;min-height:30px;background:transparent;border:1px solid var(--surface-border,#2a2a2a);border-radius:6px;color:var(--text-dim,#555555);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive)}' +
    '[data-rf-drawer] .tk-btn:hover{border-color:var(--text-secondary,#888888);color:var(--text-secondary,#888888);background:var(--g12,#1a1a1a)}' +
    '[data-rf-drawer] .tk-btn[aria-pressed=true]{border-color:var(--text-primary,#ffffff);color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a)}' +
    '[data-rf-drawer] .tk-btn[aria-pressed=true]:hover{border-color:var(--text-primary,#ffffff);color:var(--text-primary,#ffffff)}' +
    '[data-rf-drawer] .tk-btn:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:2px;margin:8px 0;border-radius:1px;background:var(--g48,#555555);cursor:pointer;touch-action:manipulation}' +
    '[data-rf-drawer] input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:14px;height:14px;border-radius:50%;background:var(--text-primary,#ffffff);border:0;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.3)}' +
    '[data-rf-drawer] input[type=range]::-moz-range-thumb{width:14px;height:14px;border-radius:50%;background:var(--text-primary,#ffffff);border:0;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.3)}' +
    '[data-rf-drawer] input[type=range]:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-foot{display:flex;gap:6px;padding:8px 14px 12px;border-top:1px solid var(--surface-border,#2a2a2a);flex:0 0 auto}' +
    '[data-rf-drawer] .tk-reset{flex:1 1 0}' +
    /* Fold — compact chip, same as nav trigger */
    '[data-rf-drawer] .tk-fold{position:absolute;top:calc(60px + env(safe-area-inset-top,0px));right:max(20px,env(safe-area-inset-right,0px));z-index:3;display:flex;align-items:center;gap:6px;min-height:32px;padding:6px 10px;pointer-events:auto;background:var(--surface-card,#111111);border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px);color:var(--text-secondary,#888888);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive);box-shadow:0 2px 12px rgba(0,0,0,0.3);touch-action:manipulation}' +
    '[data-rf-drawer] .tk-fold:hover,[data-rf-drawer] .tk-fold[aria-expanded=true],[data-rf-drawer][data-fold-live=true] .tk-fold{color:var(--text-primary,#ffffff);border-color:var(--text-secondary,#888888);background:var(--surface-raised,#1a1a1a)}' +
    '[data-rf-drawer] .tk-fold:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-fold[aria-expanded=true] .tk-chevron{transform:rotate(180deg);opacity:1}' +
    '[data-rf-drawer][data-folded=true] .tk-trigger,[data-rf-drawer][data-folded=true] .tk-view,body[data-rf-folded=true] [data-rf-render-drawer]>summary{visibility:hidden;opacity:0;transform:translateY(-6px);transition:opacity var(--dur-md) var(--ease-arrive),transform var(--dur-md) var(--ease-arrive),visibility 0ms var(--dur-md)}' +
    '[data-rf-drawer][data-folded=false] .tk-trigger,[data-rf-drawer][data-folded=false] .tk-view,body[data-rf-folded=false] [data-rf-render-drawer]>summary{visibility:visible;opacity:1;transform:none;transition:opacity var(--dur-md) var(--ease-arrive),transform var(--dur-md) var(--ease-arrive)}' +
    'body[data-rf-folded] [data-rf-render-panel]{top:calc(100px + env(safe-area-inset-top,0px));max-height:none}' +
    '@media (min-width:720px) and (min-height:576px){[data-rf-drawer] .tk-fold{display:none}}' +
    /* The set card (2026-09-23): one card per ring role, carrying the set it holds, a compact
       row of connected presets, and that set's own dials. The drawer reads per set rather than
       per property, so a set is tuned in one place. A master declares the cards in
       window.RS_TWEAK_CARDS; with none declared the flat sections render as before. */
    '[data-rf-drawer] .tk-card{display:flex;flex-direction:column;gap:10px;padding:10px;background:var(--surface-raised,#1a1a1a);border:1px solid var(--surface-border,#2a2a2a);border-radius:var(--radius-sm,8px)}' +
    '[data-rf-drawer] .tk-card-head{display:flex;align-items:center;justify-content:space-between;gap:8px}' +
    '[data-rf-drawer] .tk-role{font-size:10px;line-height:14px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-dim,#555555)}' +
    '[data-rf-drawer] .tk-select{position:relative;display:inline-flex;align-items:center}' +
    '[data-rf-drawer] .tk-select select{appearance:none;-webkit-appearance:none;min-height:28px;max-width:170px;padding:4px 22px 4px 8px;background:var(--surface-card,#111111);border:1px solid var(--surface-border,#2a2a2a);border-radius:6px;color:var(--text-secondary,#888888);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;touch-action:manipulation}' +
    '[data-rf-drawer] .tk-select select:hover{border-color:var(--g66,#666666);color:var(--text-primary,#ffffff)}' +
    '[data-rf-drawer] .tk-select select:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-select::after{content:"▾";position:absolute;right:8px;top:50%;transform:translateY(-50%);font-size:10px;opacity:0.7;pointer-events:none;color:var(--text-dim,#555555)}' +
    '[data-rf-drawer] .tk-presets{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px}' +
    '[data-rf-drawer] .tk-preset{display:flex;align-items:center;gap:5px;min-height:32px;padding:5px 6px;background:transparent;border:1px solid var(--surface-border,#2a2a2a);border-radius:6px;color:var(--text-secondary,#888888);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:11px;line-height:16px;letter-spacing:0.02em;text-transform:uppercase;text-align:left;cursor:pointer;touch-action:manipulation;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive)}' +
    '[data-rf-drawer] .tk-preset:hover{border-color:var(--g66,#666666);color:var(--text-primary,#ffffff)}' +
    '[data-rf-drawer] .tk-preset[aria-pressed=true]{border-color:var(--text-primary,#ffffff);color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a)}' +
    '[data-rf-drawer] .tk-preset:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '[data-rf-drawer] .tk-glyph{display:inline-flex;flex:0 0 auto;opacity:0.9}' +
    '[data-rf-drawer] .tk-glyph svg{display:block}' +
    '[data-rf-drawer] .tk-preset-name{min-width:0;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    /* A title's format block: the three named styles as chips, then the format itself as a row
       of selects, the way a design tool shows a text style. */
    '[data-rf-drawer] .tk-type{display:flex;flex-direction:column;gap:6px}' +
    '[data-rf-drawer] .tk-styles{grid-template-columns:repeat(3,minmax(0,1fr))}' +
    '[data-rf-drawer] .tk-style{flex-direction:column;align-items:flex-start;gap:2px}' +
    '[data-rf-drawer] .tk-style-wrap{position:relative;display:flex}' +
    '[data-rf-drawer] .tk-style-wrap .tk-style{flex:1 1 0;padding-right:16px}' +
    '[data-rf-drawer] .tk-colour-dot{position:absolute;top:3px;right:3px;width:10px;height:10px;padding:0;background:transparent;border:1px solid var(--g48,#333333);border-radius:50%;cursor:pointer;touch-action:manipulation;transition:background var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive)}' +
    '[data-rf-drawer] .tk-colour-dot:hover{border-color:var(--g88,#cccccc)}' +
    '[data-rf-drawer] .tk-colour-dot[aria-pressed=true]{background:var(--text-primary,#ffffff);border-color:var(--text-primary,#ffffff)}' +
    '[data-rf-drawer] .tk-colour-dot:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:1px}' +
    '[data-rf-drawer] .tk-style-spec{font-size:10px;line-height:14px;color:var(--text-dim,#555555);font-variant-numeric:tabular-nums}' +
    '[data-rf-drawer] .tk-preset[aria-pressed=true] .tk-style-spec{color:var(--text-secondary,#888888)}' +
    '[data-rf-drawer] .tk-type-row{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px}' +
    '[data-rf-drawer] .tk-type-row .tk-select select{width:100%;max-width:none;padding:4px 20px 4px 8px}' +
    '[data-rf-drawer] .tk-copy{flex:1 1 0}' +
    /* A set's elements, each with its own compact show/hide switch. */
    '[data-rf-drawer] .tk-elements{display:flex;flex-wrap:wrap;gap:4px}' +
    '[data-rf-drawer] .tk-el{padding:4px 7px;min-height:26px;background:transparent;border:1px solid var(--surface-border,#2a2a2a);border-radius:6px;color:var(--text-dim,#555555);font-family:var(--font-mono,\"JetBrains Mono\",ui-monospace,monospace);font-size:10px;line-height:14px;letter-spacing:0.02em;text-transform:uppercase;cursor:pointer;touch-action:manipulation;transition:color var(--dur-sm) var(--ease-arrive),border-color var(--dur-sm) var(--ease-arrive),background var(--dur-sm) var(--ease-arrive)}' +
    '[data-rf-drawer] .tk-el:hover{border-color:var(--g66,#666666);color:var(--text-secondary,#888888)}' +
    '[data-rf-drawer] .tk-el[aria-pressed=true]{border-color:var(--text-primary,#ffffff);color:var(--text-primary,#ffffff);background:var(--g12,#1a1a1a)}' +
    '[data-rf-drawer] .tk-el:focus-visible{outline:2px solid var(--g88,#cccccc);outline-offset:2px}' +
    '@media (prefers-reduced-motion:reduce){[data-rf-drawer] .tk-panel,[data-rf-drawer] .tk-trigger,[data-rf-drawer] .tk-view,[data-rf-drawer] .tk-btn,[data-rf-drawer] .tk-preset,[data-rf-drawer] .tk-chevron,[data-rf-drawer] .tk-colour-dot,[data-rf-drawer] .tk-close,[data-rf-drawer] .tk-el,[data-rf-drawer] .tk-fold,[data-rf-drawer][data-folded=true] .tk-trigger,[data-rf-drawer][data-folded=true] .tk-view,[data-rf-drawer][data-folded=false] .tk-trigger,[data-rf-drawer][data-folded=false] .tk-view,body[data-rf-folded=true] [data-rf-render-drawer]>summary,body[data-rf-folded=false] [data-rf-render-drawer]>summary{transition-duration:1ms!important;transition-delay:0ms!important}}';

  function boot(tries) {
    var api = window;
    if (!api.__dcSetProps || !api.__dcRootName || !api.__dcRegistry) {
      if (tries < 200) setTimeout(function () { boot(tries + 1); }, 50);
      return;
    }
    var rootName = api.__dcRootName();
    var entry = api.__dcRegistry[rootName];
    var schema = entry && entry.propsMeta;
    if (!schema) return;

    var keys = Object.keys(schema).filter(function (k) { return k.charAt(0) !== '$' && !VIEW_MODES[k]; });
    var viewKeys = Object.keys(VIEW_MODES).filter(function (k) { return schema[k]; });
    if (!keys.length && !viewKeys.length) return;
    var defaults = {};
    keys.forEach(function (k) { defaults[k] = schema[k].default; });
    var current = {};
    keys.forEach(function (k) {
      current[k] = (entry.propOverrides && entry.propOverrides[k] !== undefined)
        ? entry.propOverrides[k] : defaults[k];
    });

    var viewCurrent = {};
    viewKeys.forEach(function (k) {
      var d = schema[k].default;
      viewCurrent[k] = (entry.propOverrides && entry.propOverrides[k] !== undefined) ? entry.propOverrides[k] : d;
    });

    function fmt(key, v) {
      var n = Number(v);
      var t = Math.abs(n - Math.round(n)) < 1e-9 ? String(Math.round(n)) : String(Math.round(n * 100) / 100);
      return t + (schema[key].unit ? ' ' + schema[key].unit : '');
    }

    var existing = document.querySelector('[data-rf-drawer]');
    if (existing) existing.remove();

    var el = document.createElement('div');
    el.setAttribute('data-rf-drawer', '');
    el.setAttribute('data-open', 'false');
    el.setAttribute('data-has-view', viewKeys.length ? 'true' : 'false');
    el.setAttribute('data-view-count', String(viewKeys.length));
    var styleTag = document.createElement('style');
    styleTag.textContent = CSS;
    el.appendChild(styleTag);

    var open = false;
    var veil = document.createElement('div');
    veil.className = 'tk-veil';
    veil.setAttribute('aria-hidden', 'true');
    el.appendChild(veil);

    var fold = document.createElement('button');
    fold.type = 'button';
    fold.className = 'tk-fold';
    fold.setAttribute('aria-expanded', 'false');
    fold.setAttribute('aria-label', 'Show the options for this master');
    fold.innerHTML = '<span>Options</span><span class="tk-chevron" aria-hidden="true">▾</span>';
    el.appendChild(fold);

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'tk-trigger';
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-controls', 'rf-tweaks-panel');
    trigger.innerHTML = '<span>Tweaks</span><span class="tk-chevron" aria-hidden="true">▾</span>';
    el.appendChild(trigger);

    var viewBtns = {};
    viewKeys.forEach(function (k, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tk-view';
      b.setAttribute('aria-pressed', viewCurrent[k] ? 'true' : 'false');
      b.setAttribute('aria-label', 'Toggle ' + VIEW_MODES[k].label + ' view');
      b.textContent = VIEW_MODES[k].label;
      if (i > 0) b.style.top = 'calc(' + (100 + i * 40) + 'px + env(safe-area-inset-top,0px))';
      el.appendChild(b);
      viewBtns[k] = b;
    });

    var narrowQuery = window.matchMedia('(max-width:719px), (max-height:575px)');
    var folded = true;
    var viewList = viewKeys.map(function (k) { return viewBtns[k]; });
    function renderSummary() { return document.querySelector('[data-rf-render-drawer] > summary'); }
    function anyViewOn() { return viewKeys.some(function (k) { return !!viewCurrent[k]; }); }
    function layoutFold() {
      var narrow = narrowQuery.matches;
      var rs = renderSummary();
      if (!narrow) {
        el.removeAttribute('data-folded');
        el.removeAttribute('data-fold-live');
        document.body.removeAttribute('data-rf-folded');
        trigger.style.top = '';
        viewList.forEach(function (b, i) { b.style.top = i > 0 ? (100 + i * 40) + 'px' : ''; });
        if (rs) rs.style.top = '';
        return;
      }
      el.setAttribute('data-folded', folded ? 'true' : 'false');
      el.setAttribute('data-fold-live', anyViewOn() ? 'true' : 'false');
      document.body.setAttribute('data-rf-folded', folded ? 'true' : 'false');
      fold.setAttribute('aria-expanded', folded ? 'false' : 'true');
      var safeTop = 0;
      try { var m = getComputedStyle(document.documentElement).getPropertyValue('--rs-safe-top'); if (m) safeTop = parseInt(m,10)||0; } catch(e){}
      // Use env(safe-area-inset-top) approximated via CSS calc already, but JS needs offset for narrow stack
      var envTop = 0;
      try { envTop = parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)'),10)||0; } catch(e){}
      // Simpler: read computed top of fold chip as reference
      var top = 100;
      trigger.style.top = 'calc(' + top + 'px + env(safe-area-inset-top,0px))'; top += 40;
      viewList.forEach(function (b) { b.style.top = 'calc(' + top + 'px + env(safe-area-inset-top,0px))'; top += 40; });
      if (rs) rs.style.top = 'calc(' + top + 'px + env(safe-area-inset-top,0px))';
    }
    function setFolded(v) {
      folded = !!v;
      layoutFold();
    }
    fold.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); setFolded(!folded); });
    if (narrowQuery.addEventListener) narrowQuery.addEventListener('change', layoutFold);
    else if (narrowQuery.addListener) narrowQuery.addListener(layoutFold);
    document.addEventListener('pointerdown', function (e) {
      if (folded || !narrowQuery.matches) return;
      var t = e.target;
      if (t.closest && (t.closest('[data-rf-drawer] .tk-fold') || t.closest('[data-rf-drawer] .tk-trigger') || t.closest('[data-rf-drawer] .tk-view') || t.closest('[data-rf-render-drawer] > summary'))) return;
      setFolded(true);
    }, true);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !folded) setFolded(true); });
    var foldObserver = new MutationObserver(function () { if (narrowQuery.matches) layoutFold(); });
    foldObserver.observe(document.body, { childList: true, subtree: true });
    document.addEventListener('toggle', function (e) {
      var d = e.target;
      if (d && d.matches && d.matches('[data-rf-render-drawer]')) {
        if (d.open) {
          setOpen(false);
          if (narrowQuery.matches) setFolded(true);
        }
      }
    }, true);

    var panel = document.createElement('div');
    panel.id = 'rf-tweaks-panel';
    panel.className = 'tk-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Tweaks');
    panel.setAttribute('data-open', 'false');
    el.appendChild(panel);

    var header = document.createElement('div');
    header.className = 'tk-head';
    var headLabel = document.createElement('span');
    headLabel.className = 'tk-head-label';
    headLabel.textContent = 'Tweaks';
    var closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'tk-close';
    closeBtn.textContent = '×';
    closeBtn.setAttribute('aria-label', 'Close tweaks');
    header.appendChild(headLabel);
    header.appendChild(closeBtn);
    panel.appendChild(header);

    var body = document.createElement('div');
    body.className = 'tk-body';
    panel.appendChild(body);

    /* The sheet's own height, published for the surface behind it: the mobile law draws an
       instrument to the band above the sheet, and the surface reads --rf-drawer-h when this
       event fires rather than guessing. Zero whenever the sheet is shut or the frame is wide. */
    function announceChrome() {
      var h = 0;
      if (open && panel.getBoundingClientRect) h = Math.round(panel.getBoundingClientRect().height);
      try { document.documentElement.style.setProperty('--rf-drawer-h', h + 'px'); } catch (e) {}
      window.dispatchEvent(new Event('rf-chrome'));
    }

    function setOpen(v) {
      open = !!v;
      el.setAttribute('data-open', open ? 'true' : 'false');
      trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.setAttribute('data-open', open ? 'true' : 'false');
      if (open) {
        var rd = document.querySelector('[data-rf-render-drawer]');
        if (rd) rd.open = false;
        if (narrowQuery.matches) setFolded(true);
      }
      announceChrome();
    }
    trigger.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); setOpen(!open); });
    closeBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });

    function pushTweaks() {
      var o = viewOverrides(null);
      api.__dcSetProps(rootName, Object.keys(o).length ? o : null);
      syncPresets();
    }

    function viewOverrides(extraKey, extraVal) {
      var o = {};
      keys.forEach(function (k) { if (current[k] !== schema[k].default) o[k] = current[k]; });
      viewKeys.forEach(function (k) {
        if (k === extraKey) o[k] = extraVal;
        else if (viewCurrent[k] !== schema[k].default) o[k] = viewCurrent[k];
      });
      return o;
    }

    function pushView(key, next) {
      next = !!next;
      viewCurrent[key] = next;
      if (viewBtns[key]) viewBtns[key].setAttribute('aria-pressed', next ? 'true' : 'false');
      if (next) {
        viewKeys.forEach(function (other) {
          if (other !== key && viewCurrent[other] !== schema[other].default) {
            viewCurrent[other] = schema[other].default;
            if (viewBtns[other]) viewBtns[other].setAttribute('aria-pressed', viewCurrent[other] ? 'true' : 'false');
          }
        });
      }
      var o = viewOverrides(key, next);
      api.__dcSetProps(rootName, Object.keys(o).length ? o : null);
      setOpen(false);
      var rd2 = document.querySelector('[data-rf-render-drawer]');
      if (rd2) rd2.open = false;
      if (narrowQuery.matches) setFolded(true); else layoutFold();
    }

    document.addEventListener('rf-view-exit', function (e) {
      var k = e && e.detail && e.detail.key;
      if (k && viewKeys.indexOf(k) >= 0 && viewCurrent[k] !== schema[k].default) pushView(k, schema[k].default);
    });
    /* The other direction of the same handshake (Master FLOWER's URL law, lane 24, 2026-09-24):
       a master that has been asked to open on a view — by a share link naming one — asks here,
       and the drawer stays the only thing that writes a view prop. Entering is a no-op when the
       view is already on. */
    document.addEventListener('rf-view-enter', function (e) {
      var k = e && e.detail && e.detail.key;
      if (k && viewKeys.indexOf(k) >= 0 && !viewCurrent[k]) pushView(k, true);
    });

    Object.keys(viewBtns).forEach(function (k) {
      viewBtns[k].addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        pushView(k, !viewCurrent[k]);
      });
    });
    var syncViews = function () {
      var moved = false;
      viewKeys.forEach(function (k) {
        var live = entry.propOverrides && entry.propOverrides[k] !== undefined ? entry.propOverrides[k] : schema[k].default;
        if (live !== viewCurrent[k]) {
          viewCurrent[k] = !!live;
          viewBtns[k].setAttribute('aria-pressed', viewCurrent[k] ? 'true' : 'false');
          moved = true;
        }
      });
      if (moved && narrowQuery.matches) layoutFold();
    };
    setInterval(syncViews, 400);
    var origSet = api.__dcSetProps;
    api.__dcSetProps = function (n, p) {
      var r = origSet.apply(this, arguments);
      if (n === rootName) syncViews();
      return r;
    };

    var controls = [];
    var presetButtons = [];
    var styleButtons = [];
    var cards = (window.RS_TWEAK_CARDS && window.RS_TWEAK_CARDS.roles && window.RS_TWEAK_CARDS.roles.length) ? window.RS_TWEAK_CARDS : null;
    var carded = {};
    if (cards) cards.roles.forEach(function (role) {
      (role.props || []).forEach(function (k) { carded[k] = true; });
      if (role.presetProp) carded[role.presetProp] = true;
      if (role.setProp) carded[role.setProp] = true;
      if (role.title) Object.keys(role.title).forEach(function (t) { if (typeof role.title[t] === 'string') carded[role.title[t]] = true; });
      if (role.elements) role.elements.forEach(function (k) { carded[k] = true; });
    });
    /* Props the master still declares for the surface's own readouts, but that the studio no
       longer dials (a universal style, say). Carded so they do not fall into the flat sections,
       never rendered. */
    if (cards && cards.hidden) cards.hidden.forEach(function (k) { carded[k] = true; });

    /* One control row, built the same way wherever it lands: a range, a boolean or an enum. */
    function buildRow(k, wrap, shownLabel) {
      var def = schema[k];
      var shown = shownLabel || labelFor(k);
      var row = document.createElement('div');
      row.className = 'tk-row';
        if (def.editor === 'range') {
          var nameRow = document.createElement('div');
          nameRow.className = 'tk-name';
          var nl = document.createElement('span');
          nl.textContent = shown;
          var val = document.createElement('span');
          val.className = 'tk-val';
          val.textContent = fmt(k, current[k]);
          nameRow.appendChild(nl);
          nameRow.appendChild(val);
          row.appendChild(nameRow);
          var input = document.createElement('input');
          input.type = 'range';
          input.min = def.min;
          input.max = def.max;
          input.step = def.step;
          input.value = current[k];
          input.setAttribute('aria-label', labelFor(k));
          input.addEventListener('input', function () {
            current[k] = parseFloat(input.value);
            val.textContent = fmt(k, current[k]);
            pushTweaks();
          });
          row.appendChild(input);
          controls.push([k, function (v) { input.value = v; val.textContent = fmt(k, v); }]);
        } else if (def.editor === 'boolean') {
          var brow = document.createElement('div');
          brow.className = 'tk-brow';
          var bname = document.createElement('span');
          bname.className = 'tk-bname';
          bname.textContent = shown;
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'tk-btn';
          btn.setAttribute('aria-pressed', current[k] ? 'true' : 'false');
          btn.textContent = current[k] ? 'On' : 'Off';
          btn.addEventListener('click', function () {
            current[k] = !current[k];
            btn.setAttribute('aria-pressed', current[k] ? 'true' : 'false');
            btn.textContent = current[k] ? 'On' : 'Off';
            pushTweaks();
          });
          brow.appendChild(bname);
          brow.appendChild(btn);
          row.appendChild(brow);
          controls.push([k, function (v) {
            btn.setAttribute('aria-pressed', v ? 'true' : 'false');
            btn.textContent = v ? 'On' : 'Off';
          }]);
        } else {
          var label = document.createElement('span');
          label.className = 'tk-name';
          label.textContent = shown;
          row.appendChild(label);
          var grp = document.createElement('div');
          grp.className = 'tk-enum' + (def.options && def.options.length > 3 ? ' tk-enum-wide' : '');
          grp.setAttribute('role', 'group');
          grp.setAttribute('aria-label', labelFor(k));
          (def.options || []).forEach(function (opt) {
            var b = document.createElement('button');
            b.type = 'button';
            b.className = 'tk-btn';
            b.textContent = (def.optionLabels && def.optionLabels[opt]) || opt;
            b.dataset.value = opt;
            b.setAttribute('aria-pressed', current[k] === opt ? 'true' : 'false');
            b.addEventListener('click', function () {
              current[k] = opt;
              Array.prototype.forEach.call(grp.children, function (c) {
                c.setAttribute('aria-pressed', c === b ? 'true' : 'false');
              });
              pushTweaks();
            });
            grp.appendChild(b);
          });
          row.appendChild(grp);
          controls.push([k, function (v) {
            Array.prototype.forEach.call(grp.children, function (c) {
              c.setAttribute('aria-pressed', c.dataset.value === String(v) ? 'true' : 'false');
            });
          }]);
        }
        wrap.appendChild(row);
    }

    /* A title's format, shown the way a design tool shows a text style: the named styles as
       chips, then size, weight and position as selects. A chip writes the size and the weight
       its style names, so a style is a preset for the format rather than a separate law. */
    function buildTitleBlock(role, card) {
      var cfg = role.title;
      /* Each H keeps its own full config (Mark, 2026-09-24: "I want each H to be a separate
         preset of their current config"). A chip's bundle holds size, weight, position and the
         colour dot. It is initialised once per card: the style whose size and weight are
         currently selected inherits the card's live values as-is; every other style starts at
         the values its name carries. Selecting a chip applies the whole bundle at once; a
         select dial writes the bundle of the style that is currently selected. */
      var chipCfg = null;
      var chipStyles = cards.titleStyles || [];
      var hasColour = cfg.colour && schema[cfg.colour];
      if ((cfg.size || cfg.weight || cfg.colour) && chipStyles.length) {
        card.__tkChipCfg = card.__tkChipCfg || {};
        if (!card.__tkChipCfg[role.key]) {
          var initCfg = {};
          chipStyles.forEach(function (st) {
            var iSz = tokenNum(st.sizeToken, st.size), iW = tokenNum(st.weightToken, st.weight);
            var selected = cfg.size && cfg.weight && current[cfg.size] === iSz && current[cfg.weight] === iW;
            initCfg[st.label] = selected ? {
              size: current[cfg.size],
              weight: current[cfg.weight],
              pos: cfg.pos && schema[cfg.pos] ? current[cfg.pos] : null,
              colour: cfg.colour ? !!current[cfg.colour] : false
            } : {
              size: iSz,
              weight: iW,
              pos: cfg.pos && schema[cfg.pos] ? schema[cfg.pos].default : null,
              colour: false
            };
          });
          card.__tkChipCfg[role.key] = initCfg;
        }
        chipCfg = card.__tkChipCfg[role.key];
      }
      var wrap = document.createElement('div');
      wrap.className = 'tk-type';
      var label = document.createElement('span');
      label.className = 'tk-sec-label';
      label.textContent = role.titleLabel || 'Title';
      wrap.appendChild(label);
      var chips = document.createElement('div');
      chips.className = 'tk-presets tk-styles';
      chips.setAttribute('role', 'group');
      chips.setAttribute('aria-label', role.label + ' title style');
      chipStyles.forEach(function (st) {
        var chip = chipCfg ? chipCfg[st.label] : null;
        var chipWrap = document.createElement('span');
        chipWrap.className = 'tk-style-wrap';
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tk-preset tk-style';
        b.innerHTML = '<span class="tk-preset-name">' + st.label + '</span><span class="tk-style-spec">' + chip.size + ' / ' + chip.weight + '</span>';
        b.setAttribute('aria-pressed', 'false');
        b.setAttribute('aria-label', role.label + ' title style ' + st.label);
        b.addEventListener('click', function () {
          current[cfg.size] = chip.size;
          current[cfg.weight] = chip.weight;
          if (cfg.pos && chip.pos != null) current[cfg.pos] = chip.pos;
          if (cfg.colour) current[cfg.colour] = !!chip.colour;
          controls.forEach(function (c) {
            if (c[0] === cfg.size) c[1](chip.size);
            if (c[0] === cfg.weight) c[1](chip.weight);
            if (c[0] === cfg.pos) c[1](chip.pos);
          });
          pushTweaks();
        });
        chipWrap.appendChild(b);
        /* The colour dot is the chip's own colour preset value: on it, the style carries its
           colour; applying a style applies its dot with it. */
        if (cfg.colour) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'tk-colour-dot';
          dot.setAttribute('aria-pressed', chip.colour ? 'true' : 'false');
          dot.setAttribute('aria-label', role.label + ' ' + st.label + ' title coloured');
          dot.setAttribute('title', role.label + ' ' + st.label + ' title coloured');
          dot.addEventListener('click', function (e) {
            e.stopPropagation();
            chip.colour = !chip.colour;
            dot.setAttribute('aria-pressed', chip.colour ? 'true' : 'false');
            var selected = current[cfg.size] === chip.size && current[cfg.weight] === chip.weight;
            if (selected) current[cfg.colour] = chip.colour;
            pushTweaks();
          });
          chipWrap.appendChild(dot);
        }
        chips.appendChild(chipWrap);
        styleButtons.push({ size: chip.size, weight: chip.weight, btn: b, sizeKey: cfg.size, weightKey: cfg.weight });
      });
      wrap.appendChild(chips);
      var row = document.createElement('div');
      row.className = 'tk-type-row';
      [['Size', cfg.size], ['Weight', cfg.weight], ['Position', cfg.pos]].forEach(function (t) {
        var key = t[1];
        if (!key || !schema[key]) return;
        var lab = document.createElement('label');
        lab.className = 'tk-select';
        var sel = document.createElement('select');
        sel.setAttribute('aria-label', role.label + ' title ' + t[0].toLowerCase());
        (schema[key].options || []).forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt;
          o.textContent = (schema[key].optionLabels && schema[key].optionLabels[opt]) || opt;
          if (String(current[key]) === String(opt)) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', function () {
          var first = schema[key].options && schema[key].options[0];
          var val = typeof first === 'number' ? parseFloat(sel.value) : sel.value;
          current[key] = val;
          /* The dial writes the bundle of the style that is currently selected, so that style's
             preset keeps everything its chip now stands for. */
          if (chipCfg) {
            var selChip = chipStyles.map(function (st) { return chipCfg[st.label]; })
              .find(function (ch) { return current[cfg.size] === ch.size && current[cfg.weight] === ch.weight; });
            if (selChip) {
              if (key === cfg.size) selChip.size = val;
              else if (key === cfg.weight) selChip.weight = val;
              else if (key === cfg.pos) selChip.pos = val;
            }
          }
          pushTweaks();
        });
        controls.push([key, function (v) { sel.value = v; }]);
        lab.appendChild(sel);
        row.appendChild(lab);
      });
      wrap.appendChild(row);
      card.appendChild(wrap);
    }

    /* A set's elements, each with its own show/hide switch, so a set can be read without one of
       them (Mark, 2026-09-23: "Add compact show/hide toggles for all elements per set. I want to
       see what outer looks without stroke"). */
    function buildElements(role, card) {
      var row = document.createElement('div');
      row.className = 'tk-elements';
      row.setAttribute('role', 'group');
      row.setAttribute('aria-label', role.label + ' elements');
      (role.elements || []).forEach(function (k) {
        if (!schema[k]) return;
        var name = labelFor(k).replace(new RegExp('^' + (role.propPrefix || '') + '\\s*Show\\s*', 'i'), '');
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'tk-el';
        b.textContent = name;
        b.setAttribute('aria-pressed', current[k] ? 'true' : 'false');
        b.setAttribute('aria-label', role.label + ' ' + name + ' ' + (current[k] ? 'on' : 'off'));
        b.addEventListener('click', function () {
          current[k] = !current[k];
          b.setAttribute('aria-pressed', current[k] ? 'true' : 'false');
          b.setAttribute('aria-label', role.label + ' ' + name + ' ' + (current[k] ? 'on' : 'off'));
          pushTweaks();
        });
        row.appendChild(b);
        controls.push([k, function (v) { b.setAttribute('aria-pressed', v ? 'true' : 'false'); }]);
      });
      card.appendChild(row);
    }

    /* The set card: the ring role, the set it holds, a row of connected presets, then that
       set's own dials. A preset writes its whole bundle at once, so one click sets a coherent
       spacing and stroke for the set rather than moving one property at a time. */
    function buildCard(role) {
      var card = document.createElement('div');
      card.className = 'tk-card';
      card.setAttribute('data-role', role.key);
      var head = document.createElement('div');
      head.className = 'tk-card-head';
      var roleLabel = document.createElement('span');
      roleLabel.className = 'tk-role';
      roleLabel.textContent = role.label;
      head.appendChild(roleLabel);
      var setDef = schema[role.setProp];
      if (setDef) {
        var selWrap = document.createElement('label');
        selWrap.className = 'tk-select';
        var sel = document.createElement('select');
        sel.setAttribute('aria-label', role.label + ' set');
        (setDef.options || []).forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt;
          o.textContent = (setDef.optionLabels && setDef.optionLabels[opt]) || opt;
          if (current[role.setProp] === opt) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', function () { current[role.setProp] = sel.value; pushTweaks(); });
        controls.push([role.setProp, function (v) { sel.value = v; }]);
        selWrap.appendChild(sel);
        head.appendChild(selWrap);
      }
      card.appendChild(head);
      if (role.presets && role.presets.length) {
        if (role.presetLabel) {
          var pLabel = document.createElement('span');
          pLabel.className = 'tk-sec-label';
          pLabel.textContent = role.presetLabel;
          card.appendChild(pLabel);
        }
        var prow = document.createElement('div');
        prow.className = 'tk-presets';
        prow.setAttribute('role', 'group');
        prow.setAttribute('aria-label', role.label + ' spacing preset');
        role.presets.forEach(function (preset) {
          var b = document.createElement('button');
          b.type = 'button';
          b.className = 'tk-preset';
          b.innerHTML = '<span class="tk-glyph">' + spacingGlyph(preset.mode) + '</span><span class="tk-preset-name">' + preset.label + '</span>';
          b.setAttribute('aria-pressed', 'false');
          b.setAttribute('aria-label', role.label + ' set, ' + preset.label);
          b.addEventListener('click', function () {
            var vs = preset.values || {};
            Object.keys(vs).forEach(function (pk) { current[pk] = vs[pk]; });
            controls.forEach(function (c) { if (vs[c[0]] !== undefined) c[1](vs[c[0]]); });
            pushTweaks();
          });
          prow.appendChild(b);
          presetButtons.push({ preset: preset, btn: b });
        });
        card.appendChild(prow);
      }
      if (role.title && role.title.size) buildTitleBlock(role, card);
      (role.props || []).forEach(function (k) {
        if (!schema[k]) return;
        var shown = role.propPrefix
          ? labelFor(k).replace(new RegExp('^' + role.propPrefix + '\\s+', 'i'), '')
          : labelFor(k);
        buildRow(k, card, shown);
      });
      if (role.elements && role.elements.length) buildElements(role, card);
      body.appendChild(card);
    }

    /* A preset reads as pressed while the set's live values still match it, and lets go the
       moment a dial moves off the bundle. */
    function syncPresets() {
      presetButtons.forEach(function (p) {
        var vs = p.preset.values || {};
        var match = Object.keys(vs).every(function (k) { return current[k] === vs[k]; });
        p.btn.setAttribute('aria-pressed', match ? 'true' : 'false');
      });
      styleButtons.forEach(function (s) {
        var match = current[s.sizeKey] === s.size && current[s.weightKey] === s.weight;
        s.btn.setAttribute('aria-pressed', match ? 'true' : 'false');
      });
    }

    var rest = keys.filter(function (k) { return !carded[k]; });
    var sections = [];
    rest.forEach(function (k) {
      var name = schema[k].section || 'General';
      var sec = null;
      sections.forEach(function (x) { if (x.name === name) sec = x; });
      if (!sec) { sec = { name: name, keys: [] }; sections.push(sec); }
      sec.keys.push(k);
    });
    sections.forEach(function (sec) {
      var wrap = document.createElement('div');
      wrap.className = 'tk-sec';
      var head = document.createElement('span');
      head.className = 'tk-sec-label';
      head.textContent = sec.name;
      wrap.appendChild(head);
      sec.keys.forEach(function (k) { buildRow(k, wrap); });
      body.appendChild(wrap);
    });
    if (cards) cards.roles.forEach(buildCard);
    syncPresets();

    var foot = document.createElement('div');
    foot.className = 'tk-foot';
    /* A way out of the studio: the dialled values as the master's own data-props, on the
       clipboard. The drawer holds no store by design, so saving means stamping the values into
       the file; this makes that one paste rather than a transcription. */
    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'tk-btn tk-copy';
    copyBtn.textContent = 'Copy settings';
    copyBtn.addEventListener('click', function () {
      var o = {};
      keys.forEach(function (k) { if (current[k] !== schema[k].default) o[k] = current[k]; });
      var text = Object.keys(o).length
        ? '/* Colour FLOWER tweaks: paste into the master data-props defaults. */\n' + JSON.stringify(o, null, 2)
        : '/* Colour FLOWER tweaks: every value is at its declared default. */';
      var say = function (msg) {
        copyBtn.textContent = msg;
        setTimeout(function () { copyBtn.textContent = 'Copy settings'; }, 1200);
      };
      /* Navigator's clipboard can refuse its permission or its focus, and a silent rejection
         left the button reading Copied while the paste held nothing but whatever was on the
         clipboard before. A refused write falls back to the select-and-copy path, and a failure
         is said, never claimed as copied. */
      var legacyCopy = function () {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        var done = false;
        try { done = document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        say(done ? 'Copied' : 'Copy denied');
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
          .then(function () { say('Copied'); })
          .catch(function () { legacyCopy(); });
      } else legacyCopy();
    });
    var resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'tk-btn tk-reset';
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', function () {
      keys.forEach(function (k) { current[k] = defaults[k]; });
      controls.forEach(function (c) { c[1](defaults[c[0]]); });
      syncPresets();
      viewKeys.forEach(function (k) {
        viewCurrent[k] = schema[k].default;
        if (viewBtns[k]) viewBtns[k].setAttribute('aria-pressed', viewCurrent[k] ? 'true' : 'false');
      });
      var o2 = viewOverrides(null);
      api.__dcSetProps(rootName, Object.keys(o2).length ? o2 : null);
    });
    foot.appendChild(copyBtn);
    foot.appendChild(resetBtn);
    panel.appendChild(foot);

    document.body.appendChild(el);
    layoutFold();
    window.addEventListener('resize', announceChrome);
    announceChrome();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { boot(0); });
  else boot(0);
})();
