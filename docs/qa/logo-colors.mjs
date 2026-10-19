/**
 * Extract the dominant colours from the logo so the palette can be built around
 * the owner's ACTUAL brand blue rather than a guessed one.
 *
 * Run: node docs/qa/logo-colors.mjs
 */
import sharp from "sharp";

const LOGO = "assets-source/logo.png";

const { data, info } = await sharp(LOGO)
  .resize({ width: 200 }) // downscale: we want dominant colour, not detail
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const counts = new Map();

for (let i = 0; i < data.length; i += info.channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = info.channels === 4 ? data[i + 3] : 255;

  // Ignore transparent and near-transparent pixels.
  if (a < 200) continue;

  // Quantise to 16 steps so similar pixels group together.
  const q = (v) => Math.round(v / 16) * 16;
  const key = `${q(r)},${q(g)},${q(b)}`;
  counts.set(key, (counts.get(key) || 0) + 1);
}

const total = [...counts.values()].reduce((a, b) => a + b, 0);

const hex = (rgb) =>
  "#" + rgb.map((v) => Math.min(255, v).toString(16).padStart(2, "0")).join("");

const ranked = [...counts.entries()]
  .map(([key, n]) => ({ rgb: key.split(",").map(Number), n, pct: (n / total) * 100 }))
  .sort((a, b) => b.n - a.n);

console.log(`Logo: ${LOGO}`);
console.log(`Opaque pixels sampled: ${total}\n`);
console.log("rank  colour     share   rgb");
console.log("-".repeat(46));
ranked.slice(0, 12).forEach((c, i) => {
  console.log(
    `${String(i + 1).padStart(4)}  ${hex(c.rgb)}  ${c.pct.toFixed(1).padStart(5)}%  ${c.rgb.join(", ")}`
  );
});

// Also report the most saturated colour, which is usually the brand hue.
const saturated = ranked
  .filter((c) => {
    const [r, g, b] = c.rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    return max - min > 40 && c.pct > 0.5;
  })
  .slice(0, 6);

console.log("\nMost saturated (likely the brand hue):");
saturated.forEach((c) => {
  console.log(`  ${hex(c.rgb)}  ${c.pct.toFixed(1)}%  ${c.rgb.join(", ")}`);
});
