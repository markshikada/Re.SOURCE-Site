// quota-watch.cjs — actual usage, expressed as % of each model's rolling window.
//
// Reads the local OpenCode database (session_v2.cost — the actual dollars the
// client recorded and billed) and rolls it against Go's own limits:
//   5-hour window = 20% of the model's monthly cap
//   weekly        = 50%
//   monthly       = 100%
//
// The report shows each model's spend as a percentage of the window it is in,
// so a warning is "you are at 78% of Kimi K3's 5-hour window", not a raw sum.
//
// Run `node quota-watch.cjs` for the report; add `--alert` to exit non-zero
// when any model crosses a warning line, for a wrap step or a cron. Add `--json`
// for machine rows on stdout instead (the hq-data snapshot generator reads
// those; the default text output never changes).
//
// The console at opencode.ai is the authoritative cross-client total and needs
// Mark's login; this file is the same usage, read locally, no credentials.

const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const HOME = os.homedir();
const DB = process.env.OPENCODE_DB || path.join(HOME, ".local/share/opencode/opencode.db");
const DB_EXISTS = fs.existsSync(DB);
const ALERT = process.argv.includes("--alert");
const JSON_OUT = process.argv.includes("--json");

// Monthly caps, dollars, from Go's published limits (23 Sep 2026). Free = no cap.
const CAP = {
  "kimi-k3": 15, "kimi-k2.7-code": 60, "kimi-k2.6": 60,
  "glm-5.3": 15, "glm-5.2": 60, "glm-5.1": 60, "glm-5.3-flash": 60,
  "qwen3.8-max": 15, "qwen3.8-flash": 30, "qwen3.7-max": 30,
  "qwen3.7-plus": 60, "qwen3.6-plus": 60,
  "deepseek-v4-pro": 15, "deepseek-v4.1-flash": 60, "deepseek-v4-flash": 30,
  "deepseek-v4-flash-vision-exp": 15,
  "mimo-v2.6-flash": 60, "mimo-v2.6-pro": 15, "mimo-v2.5": 60, "mimo-v2.5-pro": 15,
  "minimax-m3": 60, "minimax-m2.7": 60, "longcat-2.0": 60,
  "gpt-6-luna": 15, "gpt-5.6-luna": 15, "grok-4.7": 15, "grok-4.6": 15,
  "hy4-preview": 30, "hy3": 60,
  "muse-spark-1.3-contributor": 60, "muse-spark-1.2-contributor": 60,
  "space-bunny-free": 0,
  "longcat-2.5-preview-free": 0, "longcat-2.5-free": 0,
};

// FREE SEATS ONLY, permanently, per Mark's ruling of 2 October 2026. Every pin
// in every config is one of the two below. The CAP table above is kept as the
// record of what the paid rungs cost, not as a menu: a session may not dial one
// on its own authority, and there is no credit reset at which the ladder
// returns. Any spend attributed to a model missing from FREE_ROSTER is drift,
// and drift is the thing this file exists to make visible.
//
// The zero-cost seats, named rather than inferred. A model absent from CAP
// prints as "free" because nothing claims it, which is the same word a real
// free seat gets — so a newly available free model is invisible in the report
// until it has been used once. The roster says which free seats exist and which
// are verified working. Verified live 2026-10-01: longcat-2.5-preview-free
// answered on opencode-go.
const FREE_ROSTER = {
  "space-bunny-free": { label: "Space Bunny", ok: true, since: "2026-10-01" },
  "longcat-2.5-preview-free": { label: "Longcat 2.5 preview", ok: true, since: "2026-10-01" },
};
const TRAINER = ["muse-spark-1.3-contributor", "muse-spark-1.2-contributor"];
const UNRECORDED = "(model not recorded)";

// Warning lines, as a percentage of the window used.
const WARN = 60, CRIT = 80, HIT = 100;

const H5 = 5 * 3600 * 1000, D7 = 7 * 86400000, D30 = 30 * 86400000;

function q(sql) {
  const r = spawnSync("sqlite3", [DB, sql], { encoding: "utf8" });
  if (r.error) throw r.error;
  return r.stdout.trim();
}

const rows = q(`SELECT model, cost, time_created FROM session_v2 WHERE cost > 0`)
  .split("\n").filter(Boolean).map(l => {
    const [model, cost, created] = l.split("|");
    // sqlite prints nothing for NULL, so an unattributed session arrives as an
    // empty string and JSON.parse("") throws into an empty id — which rendered
    // as a blank row in the table. Name it, the way lane-watch already does, so
    // real money is never shown against no model at all.
    let id = UNRECORDED;
    try {
      const parsed = JSON.parse(model);
      if (parsed && parsed.id) id = parsed.id;
    } catch {
      const s = String(model == null ? "" : model).replace(/[{}]/g, "").replace(/"/g, "").trim();
      id = s || UNRECORDED;
    }
    return { id, cost: parseFloat(cost), created: parseInt(created, 10) };
  });

const now = Date.now();
const sum = (r, ms) => r.filter(x => now - x.created <= ms).reduce((s, x) => s + x.cost, 0);
const models = [...new Set(rows.map(r => r.id))];

/* Is this file reading a live feed or a dead one?
   OpenCode was stood down as a driver on 2026-10-01 and OmO took the estate, so
   nothing writes new PAID cost rows to this database any more. The report still
   renders, still totals, and still says "no warnings" — which reads as "there is
   room" when the truth is "this is history".

   The newest row in the database is therefore the wrong freshness test on its own:
   it is old because the money stopped, not because the harness stopped. The live
   harness records its own cost, one message at a time, in its session logs. So
   freshness is measured against THAT feed, and the database keeps doing the one
   job it is still good at — attributing a paid dollar to a model.

   Both ages are reported. A stale database with a live harness is a different
   situation from a stale everything, and collapsing them into one STALE flag is
   what made this page cry wolf for two days. */
const OMO_PROJECTS = path.join(HOME, ".omo/agent/projects");

/* Newest cost row the live harness has written, in ms. Zero means no session log
   was readable at all, which is itself a finding rather than a silent zero.
   Walks only the session logs: 74 files, tail-read, no full parse of the estate. */
function newestLiveCost() {
  let newest = 0;
  let stack = [OMO_PROJECTS];
  while (stack.length) {
    const dir = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch { continue; }
    for (const e of entries) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { stack.push(p); continue; }
      if (!e.name.endsWith(".jsonl")) continue;
      let raw;
      try {
        // The tail is enough: the newest row is the one that answers the question,
        // and a full parse of every session on every run is not worth the seconds.
        const size = fs.statSync(p).size;
        const fd = fs.openSync(p, "r");
        const start = Math.max(0, size - 262144);
        const buf = Buffer.alloc(size - start);
        fs.readSync(fd, buf, 0, buf.length, start);
        fs.closeSync(fd);
        raw = buf.toString("utf8");
      } catch { continue; }
      const lines = raw.split("\n");
      for (let i = lines.length - 1; i >= 0 && i > lines.length - 400; i--) {
        const m = /"timestamp"\s*:\s*"(\d{4}-\d{2}-\d{2}T[^"]+)"/.exec(lines[i]);
        if (!m) continue;
        const t = Date.parse(m[1]);
        if (Number.isFinite(t) && t > newest) newest = t;
        break;
      }
    }
  }
  return newest;
}

const liveNewest = DB_EXISTS ? newestLiveCost() : 0;
const newestPaid = rows.reduce((m, r) => Math.max(m, r.created), 0);
const ageH = newestPaid ? (now - newestPaid) / 3600000 : Infinity;
const liveAgeH = liveNewest ? (now - liveNewest) / 3600000 : Infinity;
const LIVE_HOURS = 12;
// Stale means "nothing anywhere is telling me the current position". A live
// harness with an old paid row is history, correctly labelled, not a dead read.
const STALE = !DB_EXISTS || (liveAgeH > LIVE_HOURS && ageH > LIVE_HOURS);

const report = models.map(id => {
  const cap = CAP[id] ?? null;
  const s5 = sum(rows.filter(r => r.id === id), H5);
  const s7 = sum(rows.filter(r => r.id === id), D7);
  const s30 = sum(rows.filter(r => r.id === id), D30);
  const pct = (spend, window) => window ? Math.round((spend / window) * 100) : null;
  return {
    id, cap, trainer: TRAINER.includes(id),
    p5: cap ? pct(s5, cap * 0.2) : null,
    p7: cap ? pct(s7, cap * 0.5) : null,
    p30: cap ? pct(s30, cap) : null,
    s30,
  };
}).filter(r => r.s30 > 0 || r.trainer).sort((a, b) => (b.p5 ?? 0) - (a.p5 ?? 0));

function grade(p) {
  if (p == null) return { t: "·", s: 0 };
  if (p >= HIT) return { t: "HIT", s: 3 };
  if (p >= CRIT) return { t: "CRIT", s: 2 };
  if (p >= WARN) return { t: "warn", s: 1 };
  return { t: "·", s: 0 };
}

/* ---- companies to be careful around, and why -------------------------------
   Mark, 2026-09-23: "I'm not a fan of unscrupulous companies. I'm more careful
   around Open AI and Meta, though I still keep tabs on their quality ... All my
   work is unreleased and preciously novel."
   So the watch carries two grades, not one: capability (whether a model is good)
   and safety (whether the company's terms respect unreleased work). A model can
   be excellent and still refuse. */
const CARE = {
  meta: {
    label: "META · MUSE SPARK",
    why: "discounted in exchange for permission to train on your prompts and completions",
    verb: "DO NOT USE",
  },
  openai: {
    label: "OPENAI · GPT 5.6 LUNA",
    why: "30-day retention; abuse-monitoring logs retained, not zero-retention",
    verb: "CAREFUL",
  },
  xai: {
    label: "XAI · GROK",
    why: "30-day retention; ZDR disables stateful API features",
    verb: "CAREFUL",
  },
};
const COMPANY = {
  "muse-spark-1.3-contributor": "meta", "muse-spark-1.2-contributor": "meta",
  "gpt-6-luna": "openai", "gpt-5.6-luna": "openai",
  "grok-4.7": "xai", "grok-4.6": "xai",
};
const BANNED = Object.keys(COMPANY).filter(k => COMPANY[k] === "meta");

const alerts = [];
const line = (p) => (p == null ? "  ·  " : String(p).padStart(3) + "%");

/* A stale database is itself the alert. Before the credit wall of 1-4 October
   2026 this file reported 0% on every model, a $28.50 total, and both free seats
   "verified working", through a 402 storm that was filling the OmO fallback log
   at the time. Every number was correct and the conclusion was wrong, because
   the spend being incurred was never in this database. Silence was the defect. */
if (STALE) {
  const ageTxt = newestPaid
    ? "newest spend row " + ageH.toFixed(1) + "h old (" +
      new Date(newestPaid).toISOString().slice(0, 16).replace("T", " ") + " UTC)"
    : "no spend rows at all";
  alerts.unshift("STALE READ — " + ageTxt + "; the live harness is OmO and its spend is NOT in this file");
} else if (ageH > LIVE_HOURS) {
  // Not stale: the harness is alive and writing. Say plainly that the paid table
  // underneath is history, so nobody reads a frozen dollar as a live one.
  alerts.push(
    "paid rows are history (newest " + ageH.toFixed(1) + "h old) but the live harness is writing " +
    "(" + liveAgeH.toFixed(1) + "h ago); live cost is on free seats, so $0 is the true figure, not a gap"
  );
}

// Alerts are computed in their own pass, not as a side effect of printing, so
// the --json rows carry the same warnings the text report shows.
for (const r of report) {
  if (r.trainer && r.s30 > 0) alerts.push(r.id + ": $ " + r.s30.toFixed(2) + " on a trainer");
  for (const [p, w] of [[r.p5, "5h"], [r.p7, "7d"], [r.p30, "30d"]]) {
    if (p >= WARN) alerts.push(r.id + ": " + p + "% of " + w + (p >= HIT ? " — HIT" : p >= CRIT ? " — critical" : " — warn"));
  }
}

const total30 = report.reduce((s, r) => s + r.s30, 0);
const careFlags = Object.entries(CARE).filter(([k]) =>
  report.some(r => COMPANY[r.id] === k && r.s30 > 0));

if (JSON_OUT) {
  // Machine rows for the hq-data snapshot generator. `stale` is the honest
  // marker: the database this report reads was not there, so the numbers are
  // only as good as the stamp says.
  console.log(JSON.stringify({
    stamp: new Date().toISOString(),
    db: { path: DB, exists: DB_EXISTS },
    // The same STALE verdict the text report prints, not the old database-only
    // test: a field that says stale:false while the page shouts STALE READ is the
    // sort of split verdict that makes a reader trust neither.
    stale: STALE,
    // Two ages, because they answer different questions: `paidAgeHours` says how
    // old the money is, `liveAgeHours` says whether the harness is still running.
    // Reporting only the first made a healthy estate look dead for two days.
    paidAgeHours: Number.isFinite(ageH) ? Math.round(ageH * 10) / 10 : null,
    liveAgeHours: Number.isFinite(liveAgeH) ? Math.round(liveAgeH * 10) / 10 : null,
    liveNewest: liveNewest ? new Date(liveNewest).toISOString() : null,
    models: report,
    total30: Math.round(total30 * 100) / 100,
    alerts: [...new Set(alerts)],
  }, null, 2));
} else {
  console.log("OpenCode Go · actual usage · % of rolling window");
  console.log("window = 5h / 7d / 30d, against each model's own cap (5h is 20% of monthly)");
  if (STALE) {
    console.log("");
    const w = 64, bar = "=".repeat(w);
    console.log(bar);
    console.log("STALE READ — these numbers are HISTORY, not the live position.");
    console.log("The database this file reads stopped receiving spend rows when");
    console.log("OpenCode was stood down on 2026-10-01. OmO is the live harness and");
    console.log("its spend is not recorded here. A clean table below means this");
    console.log("file is quiet, NOT that the account has room. For the live answer");
    console.log("read the OmO fallback log: ~/.omo/agent/logs/fallback.log");
    console.log(bar);
  }
  console.log("");
  console.log("model".padEnd(27) + "5h".padStart(6) + "7d".padStart(7) + "30d".padStart(7) + "  note");
  for (const r of report) {
    const g5 = grade(r.p5), g7 = grade(r.p7), g30 = grade(r.p30);
    const note = r.trainer ? "TRAINS ON PROMPTS" : r.cap ? "$" + r.cap + " cap" : "free";
    const company = COMPANY[r.id];
    console.log(
      r.id.padEnd(27) + line(r.p5) + line(r.p7) + line(r.p30) + "  " +
      (company ? "[" + company.toUpperCase() + "] " : "") + note
    );
  }

  console.log("");
  console.log("30-day total  $" + total30.toFixed(2));
  console.log("");

  /* The free rung, named explicitly. "free" in the table above can mean either a
     verified zero-cost seat or a model this file has never heard of, and those
     are very different things to pin a lane to.
     The roster is a dated human judgement, not a probe. It is printed with the
     date it was last checked so a stale "working" cannot be read as a live
     green light: longcat-2.5-preview-free was verified on 2026-10-01 and then
     threw ten "Insufficient account funds" 402s that same night. */
  console.log("free seats (zero cost, no cap):");
  for (const [id, f] of Object.entries(FREE_ROSTER)) {
    const used = report.some((r) => r.id === id);
    console.log("  " + id.padEnd(27) + (f.ok ? "verified " + f.since : "UNVERIFIED").padEnd(22) +
      (used ? "in use" : "no spend recorded") + "  (dated check, not a live probe)");
  }
  console.log("");

  /* The safety board. Printed whenever any careful company's model was used, so
     the warning is impossible to miss even when the spend itself is trivial. */
  if (careFlags.length) {
    const w = 64;
    const bar = "!".repeat(w);
    console.log("!" + bar + "!");
    console.log("!!" + " UNRELEASED WORK — COMPANY SAFETY".padEnd(w) + "!!");
    console.log("!" + bar + "!");
    for (const [k, c] of careFlags) {
      console.log("!! " + c.verb.padEnd(w - 2) + " !!");
      console.log("!!   " + c.label.padEnd(w - 4) + "!!");
      console.log("!!   " + c.why.slice(0, w - 6).padEnd(w - 4) + "!!");
    }
    console.log("!!" + " ".repeat(w) + "!!");
    console.log("!! " + "Unreleased and novel work does not go near these.".padEnd(w - 2) + "!!");
    console.log("!" + bar + "!");
    console.log("");
  }

  if (alerts.length) {
    console.log("warnings");
    for (const a of [...new Set(alerts)]) console.log("  " + a);
  } else {
    console.log("no warnings · every model inside 60% of its window");
  }
}

if (ALERT && alerts.length) process.exit(1);
