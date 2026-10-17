/* snapshot-age.js - one renderer for how old a baked reading is.
 *
 * 5 October 2026. Every page in this estate that shows a number somebody else
 * measured reads it from a JSON snapshot under Projects/HQ/_data/. Each of those
 * files carries a stamp, and each page printed the raw ISO string. A raw stamp is
 * not an age: on 3 October it read exactly as it does today, and a reader had no
 * way to tell a reading from an hour ago from one that predates two days of work.
 *
 * So the age is computed here, once, in the reader's own clock, and a reading past
 * its expected cadence says the word STALE on the page. A missing or unparseable
 * stamp is NOT a fresh reading: it prints as unknown and is marked bad, because an
 * absent value that renders like a present one reads as fine.
 *
 * Loaded as a plain script (no module, no fetch) so every consumer works from
 * file:// as well as http, and so a consumer that fails to load it degrades to
 * showing the raw stamp rather than to nothing.
 *
 * Cadence lives in EXPECTED below and nowhere else. It is the one fact about a
 * snapshot that is not in the snapshot, which is why it is written in one place.
 */
(function (global) {
  'use strict';

  var MIN = 60 * 1000, HOUR = 60 * MIN, DAY = 24 * HOUR;

  /* How old a reading of this source may get before the page calls it stale.
     Each figure is the source's real refresh cadence, not a round number. */
  var EXPECTED = {
    lanes:   { ms: 3 * HOUR,  why: 'lane-map.cjs runs hourly' },
    feed:    { ms: 26 * HOUR, why: 'feed.cjs runs on the nightly sweep' },
    sweep:   { ms: 26 * HOUR, why: 'feed.cjs runs on the nightly sweep' },
    pages:   { ms: 26 * HOUR, why: 'hq-data.cjs runs on the nightly sweep' },
    now:     { ms: 26 * HOUR, why: 'hq-data.cjs runs on the nightly sweep' },
    tips:    { ms: 8 * DAY,   why: 'the catalogue only changes when the binary does' },
    /* Not a collector. interfaces.html reads nothing: its windows, lanes and
       model seats were read by hand off the running estate, and the page is
       revised when that estate changes shape. A week is the honest window for a
       hand-made reading - long enough not to cry wolf, short enough that a map
       which has drifted says so. */
    interfaces: { ms: 7 * DAY, why: 'a hand-written reading, revised when the estate changes' },
    quota:   { ms: 26 * HOUR, why: 'quota-watch.cjs runs on the nightly sweep' }
  };
  var DEFAULT_EXPECTED = { ms: 26 * HOUR, why: 'no cadence declared for this source' };

  function parse(iso) {
    if (!iso) return null;
    var t = Date.parse(iso);
    return isNaN(t) ? null : t;
  }

  /* "4m", "3h", "2d 4h". A reading under a minute says "just now" so a page
     reloaded inside the write window does not claim a precision it lacks. */
  function age(ms) {
    if (ms < MIN) return 'just now';
    if (ms < HOUR) return Math.floor(ms / MIN) + 'm';
    if (ms < DAY) {
      var h = Math.floor(ms / HOUR), m = Math.floor((ms % HOUR) / MIN);
      return m ? h + 'h ' + m + 'm' : h + 'h';
    }
    var d = Math.floor(ms / DAY), rh = Math.floor((ms % DAY) / HOUR);
    return rh ? d + 'd ' + rh + 'h' : d + 'd';
  }

  var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function clock(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(iso || ''));
    if (!m) return String(iso || '');
    return Number(m[3]) + ' ' + MONTHS[Number(m[2]) - 1] + ' ' + m[1] + ' \u00b7 ' + m[4] + ':' + m[5] + ' UTC';
  }

  /* The whole contract in one function.
     Returns { text, state } where state is 'fresh' | 'stale' | 'unknown'.
     Callers set textContent from text and data-freshness from state; nothing
     else in the page has to know how an age is phrased. */
  function describe(iso, opts) {
    opts = opts || {};
    var label = opts.label || 'reading';
    var cadence = EXPECTED[opts.source] || DEFAULT_EXPECTED;
    var t = parse(iso);
    if (t === null) {
      return {
        state: 'unknown',
        text: label + ' \u00b7 age unknown \u00b7 this snapshot carries no usable stamp, so nothing on this page is a current fact'
      };
    }
    var ms = Math.max(0, Date.now() - t);
    var stale = ms > cadence.ms;
    return {
      state: stale ? 'stale' : 'fresh',
      text: label
        + ' \u00b7 ' + (ms < MIN ? 'read just now' : 'read ' + age(ms) + ' ago')
        + ' \u00b7 ' + clock(iso)
        + (stale ? ' \u00b7 STALE, past the ' + age(cadence.ms) + ' cadence (' + cadence.why + ')' : '')
    };
  }

  /* Paint one stamp element. Safe to call with a missing element: returns the
     description so a caller can log it rather than throwing inside a render. */
  function paint(node, iso, opts) {
    var d = describe(iso, opts);
    if (node) {
      node.textContent = d.text;
      node.setAttribute('data-freshness', d.state);
    }
    return d;
  }

  global.SnapshotAge = {
    describe: describe,
    paint: paint,
    age: age,
    EXPECTED: EXPECTED
  };
})(typeof window !== 'undefined' ? window : this);
