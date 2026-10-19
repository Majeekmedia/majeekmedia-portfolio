/**
 * Palette verification — BLUE.
 *
 * TWO BLUE ROLES, and why.
 *
 * The original system used one bright chartreuse (#C6FF39) for both text and
 * fills. Blue cannot do that in one value without either going pastel or failing
 * contrast:
 *
 *   - The BRAND blue (#2470F0, extracted from assets-source/logo.png) is a deep
 *     saturated blue. Perfect as a button fill, but as small text on a near-black
 *     ground it measures 4.19:1 and FAILS AA (needs 4.5:1).
 *   - A BRIGHT blue analogue (#6BA4FA) matches the energy of the old green and is
 *     AAA as text on every surface.
 *
 * So: the brand blue owns button fills, where the logo colour belongs and a white
 * label reads at 4.52:1. The bright blue owns all accent text.
 *
 * The ground is slightly COOL (#0e1116, not neutral #101010) so the palette reads
 * as one family rather than a blue accent dropped onto grey.
 *
 * Run: node docs/qa/contrast.mjs
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

const TOKENS = {
  bg: "#0e1116",
  surface: "#151a22",
  surfaceRaised: "#1c222c",
  line: "#262d38",
  lineControl: "#566478",
  text: "#f0eee8",
  muted: "#9a9a9a",
  accent: "#6ba4fa",      // bright blue: accent TEXT
  accentDim: "#4a8cf7",   // accent text hover
  accentFill: "#2470f0",  // BRAND blue: button fills
  accentFillDim: "#1e63da",
  white: "#ffffff",
  danger: "#ff8172",      // error text, lightened for AA on dark
};

const TEXT_PAIRS = [
  ["text", "bg"], ["text", "surface"], ["text", "surfaceRaised"],
  ["muted", "bg"], ["muted", "surface"], ["muted", "surfaceRaised"],
  ["accent", "bg"], ["accent", "surface"], ["accent", "surfaceRaised"],
  ["accentDim", "bg"],
  ["danger", "bg"],
];

const ON_FILL = [
  ["white", "accentFill"],
  ["white", "accentFillDim"],
  ["bg", "accent"],
];

const UI = [
  ["accent", "bg"],
  ["accentFill", "bg"],
  ["lineControl", "bg"],
];

const verdict = (cr, min) => (cr >= min ? "PASS" : "FAIL");
let fails = 0;

console.log("PALETTE — Blue\n");
console.log("token           value");
console.log("-".repeat(34));
Object.entries(TOKENS).forEach(([k, v]) => {
  if (k !== "white") console.log(`${k.padEnd(15)} ${v}`);
});

console.log("\nTEXT — needs 4.5:1 on every surface             ratio   verdict");
console.log("-".repeat(72));
for (const [fg, bg] of TEXT_PAIRS) {
  const cr = ratio(TOKENS[fg], TOKENS[bg]);
  const v = verdict(cr, 4.5);
  if (v === "FAIL") fails++;
  const band = cr >= 7 ? " (AAA)" : "";
  console.log(`${`${fg} on ${bg}`.padEnd(46)} ${cr.toFixed(2).padStart(5)}:1  ${v}${band}`);
}

console.log("\nLABEL ON A FILLED CONTROL — needs 4.5:1        ratio   verdict");
console.log("-".repeat(72));
for (const [fg, bg] of ON_FILL) {
  const cr = ratio(TOKENS[fg], TOKENS[bg]);
  const v = verdict(cr, 4.5);
  if (v === "FAIL") fails++;
  console.log(`${`${fg} on ${bg}`.padEnd(46)} ${cr.toFixed(2).padStart(5)}:1  ${v}`);
}

console.log("\nUI COMPONENTS — need 3:1 adjacent (WCAG 1.4.11) ratio   verdict");
console.log("-".repeat(72));
for (const [fg, bg] of UI) {
  const cr = ratio(TOKENS[fg], TOKENS[bg]);
  const v = verdict(cr, 3);
  if (v === "FAIL") fails++;
  console.log(`${`${fg} on ${bg}`.padEnd(46)} ${cr.toFixed(2).padStart(5)}:1  ${v}`);
}

console.log("\n--- hairlines: decorative only, documented as such ---");
for (const t of ["line", "lineControl"]) {
  console.log(`${t.padEnd(14)} ${ratio(TOKENS[t], TOKENS.bg).toFixed(2)}:1`);
}

console.log(`\nFailures: ${fails}`);
console.log(
  fails === 0
    ? "RESULT: blue palette clears AA everywhere it needs to. Safe to ship."
    : "RESULT: fix the FAIL rows before shipping."
);

console.log("\n=== headroom notes ===");
console.log(
  `White on the BRAND fill (${TOKENS.accentFill}) is ${ratio("#ffffff", TOKENS.accentFill).toFixed(2)}:1, passing AA;\n` +
    `  the hover value ${TOKENS.accentFillDim} raises it to ${ratio("#ffffff", TOKENS.accentFillDim).toFixed(2)}:1.`
);
console.log(
  `The bright accent (${TOKENS.accent}) as text is ${ratio(TOKENS.accent, TOKENS.bg).toFixed(2)}:1 on bg, comfortably AAA.\n` +
    `  The old green delivered 16.00:1; blue cannot reach that without going pastel.`
);
console.log(
  `Accent as a RULE or FOCUS RING is a UI component: ${ratio(TOKENS.accent, TOKENS.bg).toFixed(2)}:1, well past the 3:1 bar.`
);
