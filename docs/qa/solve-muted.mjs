// Solve for the minimum lightness that clears 4.5:1, and confirm the fix.
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

// The worst background muted text must survive on is the raised surface.
const WORST_BG = '#202020';

console.log(`Solving for muted text clearing 4.5:1 on ${WORST_BG}\n`);
console.log('candidate  ratio on surfaceRaised   on bg');
console.log('-'.repeat(50));
for (const c of ['#858585', '#8E8E8E', '#949494', '#9A9A9A', '#A0A0A0', '#A6A6A6', '#ABABAB']) {
  const r = ratio(c, WORST_BG);
  const rb = ratio(c, '#101010');
  const flag = r >= 4.5 ? 'OK ' : 'low';
  console.log(`${c}    ${r.toFixed(2).padStart(5)}:1  ${flag}              ${rb.toFixed(2)}:1`);
}

const MUTED = '#9A9A9A'; // first candidate with comfortable headroom
console.log(`\nChosen muted: ${MUTED}`);
console.log(`  on bg            ${ratio(MUTED, '#101010').toFixed(2)}:1`);
console.log(`  on surface       ${ratio(MUTED, '#181818').toFixed(2)}:1`);
console.log(`  on surfaceRaised ${ratio(MUTED, '#202020').toFixed(2)}:1`);

// textFaint must be reclassified. Confirm it is below the 3:1 non-text threshold too,
// which decides whether it may be used for borders at all.
console.log('\ntextFaint candidates as NON-TEXT (borders/dividers, needs >= 3:1 vs bg):');
for (const c of ['#5A5A5A', '#3A3A3A', '#2A2A2A', '#4A4A4A']) {
  console.log(`  ${c}  on bg ${ratio(c, '#101010').toFixed(2)}:1`);
}
