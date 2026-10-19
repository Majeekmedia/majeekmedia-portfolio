/**
 * Solve for the BLUE ANALOGUE of the original accent #C6FF39.
 *
 * The original system used ONE bright chartreuse (#C6FF39) that did both jobs:
 *   - text/links on the dark ground  (16.10:1)
 *   - button fill, carrying a near-black label (16.10:1)
 *
 * The owner wants the same thing in blue: "the blue version of this green".
 * So the target is a bright, high-luminance blue safe as BOTH a text colour and
 * a fill. That is a different requirement from the logo blue (#2470F0), which is
 * a deep saturated blue and fails as small text at 4.21:1.
 *
 * Run: node docs/qa/solve-blue.mjs
 */

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
const lin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
const L = (h) => {
  const [r, g, b] = hex(h).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const la = L(a), lb = L(b);
  const hi = Math.max(la, lb), lo = Math.min(la, lb);
  return (hi + 0.05) / (lo + 0.05);
};

const BG = "#0e1116";
const SURFACE = "#151a22";
const RAISED = "#1c222c";

const GREEN = "#c6ff39";
console.log("=== REFERENCE: the original accent #C6FF39 ===\n");
console.log(`  as text on bg          ${ratio(GREEN, BG).toFixed(2)}:1`);
console.log(`  near-black label on it ${ratio(BG, GREEN).toFixed(2)}:1`);
console.log(`  one colour did both jobs\n`);

const CANDIDATES = [
  "#5b98f8", "#6ba4fa", "#7aadfb", "#8bb8fc",
  "#9ac2fd", "#a8ccfd", "#b4d4fe", "#8ab4ff",
  "#7db0ff", "#9cc4ff", "#aacdff", "#b8d6ff",
];

console.log("candidate   on bg   on surf  on raised   dark-on-it   verdict");
console.log("-".repeat(70));

const passing = [];
for (const c of CANDIDATES) {
  const onBg = ratio(c, BG);
  const onSurf = ratio(c, SURFACE);
  const onRaised = ratio(c, RAISED);
  const darkOn = ratio(BG, c);
  const textOk = onBg >= 4.5 && onSurf >= 4.5 && onRaised >= 4.5;
  const fillOk = darkOn >= 4.5;
  const aaa = onBg >= 7;
  const ok = textOk && fillOk && aaa;
  if (ok) passing.push({ c, onBg, onSurf, onRaised, darkOn, aaa });
  console.log(
    `${c}   ${onBg.toFixed(2).padStart(5)}  ${onSurf.toFixed(2).padStart(6)}  ${onRaised.toFixed(2).padStart(7)}  ${darkOn.toFixed(2).padStart(9)}   ${ok ? "PASS (AAA)" : "fail"}`
  );
}

console.log(`\n${passing.length} candidates are AAA as text AND safe as a fill.\n`);

function hsl(h) {
  const [r, g, b] = hex(h);
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  let hh = 0;
  if (d !== 0) {
    if (max === r) hh = ((g - b) / d) % 6;
    else if (max === g) hh = (b - r) / d + 2;
    else hh = (r - g) / d + 4;
    hh *= 60;
    if (hh < 0) hh += 360;
  }
  return { h: Math.round(hh), s: Math.round(s * 100), l: Math.round(l * 100) };
}

console.log("candidate   hue   sat   light");
console.log("-".repeat(34));
for (const p of passing) {
  const { h, s, l } = hsl(p.c);
  console.log(`${p.c}   ${String(h).padStart(3)}   ${String(s).padStart(3)}%  ${String(l).padStart(3)}%`);
}

/*
 * A washed-out pastel would be a poor accent: it loses the vividness that made
 * the green work. So prefer the MOST SATURATED candidate that is still AAA as
 * text, keeping the accent alive while remaining safely readable.
 */
const best = passing.slice().sort((a, b) => hsl(b.c).s - hsl(a.c).s)[0];
const ch = hsl(best.c);

console.log(`\nCHOSEN ACCENT: ${best.c}`);
console.log(`  hue ${ch.h}, sat ${ch.s}%, light ${ch.l}%`);
console.log(`  as text on bg          ${best.onBg.toFixed(2)}:1  AAA`);
console.log(`  as text on surface     ${best.onSurf.toFixed(2)}:1  AAA`);
console.log(`  as text on raised      ${best.onRaised.toFixed(2)}:1  AAA`);
console.log(`  near-black label on it ${best.darkOn.toFixed(2)}:1  AA`);

console.log("\n=== hover / dim variant candidate ===");
for (const d of ["#5b98f8", "#4a8cf7", "#3d82f5", "#2f76f2"]) {
  console.log(`${d}  text-on-bg ${ratio(d, BG).toFixed(2)}:1   label-on-it ${ratio(BG, d).toFixed(2)}:1`);
}

console.log("\n=== deep logo blue, reference only ===");
console.log(`#2470f0 as text on bg ${ratio("#2470f0", BG).toFixed(2)}:1`);
console.log("Fails small text. It stays inside the logo mark, which is an image.");
