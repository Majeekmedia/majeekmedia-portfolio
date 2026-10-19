/**
 * Diagnose why the hero portrait shows a visible background rectangle.
 *
 * SUSPECTED CAUSE: `optimize-images.mjs` calls `.flatten({ background })`, which
 * composites a transparent PNG onto a solid colour and REMOVES the alpha channel.
 * The portrait is a cut-out figure, so flattening gives it a baked-in rectangle.
 *
 * It was generated with PAGE_GROUND = #101010 (neutral), but the palette was later
 * changed to #0e1116 (blue-tinted). So the baked rectangle no longer matches the
 * page ground, and it is now visible.
 *
 * Run: node docs/qa/diagnose-hero-alpha.mjs
 */
import sharp from "sharp";

const SRC = "assets-source/images/hero/profile.png";
const OUT = "public/optimized/images/hero/profile-819.webp";

const report = async (label, path) => {
  const meta = await sharp(path).metadata();
  const stats = await sharp(path).stats();
  // stats.channels[3] is alpha, present only when the image has one.
  const alpha = stats.channels[3];
  return {
    label,
    path,
    format: meta.format,
    width: meta.width,
    height: meta.height,
    hasAlpha: meta.hasAlpha,
    channels: meta.channels,
    alphaMin: alpha ? alpha.min : null,
    alphaMax: alpha ? alpha.max : null,
    isFullyOpaque: alpha ? alpha.min === 255 : true,
  };
};

const src = await report("SOURCE", SRC);
const out = await report("DERIVATIVE", OUT);

console.log("HERO PORTRAIT — alpha channel check\n");
console.log("                     source            derivative");
console.log("-".repeat(58));
console.log(`format               ${String(src.format).padEnd(18)}${out.format}`);
console.log(`has alpha channel    ${String(src.hasAlpha).padEnd(18)}${out.hasAlpha}`);
console.log(`channels             ${String(src.channels).padEnd(18)}${out.channels}`);
console.log(`alpha min            ${String(src.alphaMin).padEnd(18)}${out.alphaMin}`);
console.log(`alpha max            ${String(src.alphaMax).padEnd(18)}${out.alphaMax}`);
console.log(`fully opaque         ${String(src.isFullyOpaque).padEnd(18)}${out.isFullyOpaque}`);

console.log("\n--- what the transparent region became ---");
/*
 * NOTE: the RGB of a fully transparent pixel is meaningless and reading it is a
 * trap. A PNG cut-out typically stores 0,0,0 there; a flattened one stores the
 * composite colour. Testing the ALPHA value is the only valid check, so that is
 * what this does.
 */
const px = await sharp(OUT).extract({ left: 4, top: 4, width: 1, height: 1 })
  .ensureAlpha().raw().toBuffer();
const [r, g, b, a] = px;
console.log(`derivative top-left pixel: rgba(${r}, ${g}, ${b}, ${a})`);
console.log(
  a === 0
    ? "alpha = 0 -> the region is still TRANSPARENT, so no box can be drawn."
    : `alpha = ${a} -> the region is OPAQUE, so a rectangle IS baked in.`
);

console.log("\n--- VERDICT ---");
const ok = out.hasAlpha && src.hasAlpha && a === 0;
console.log(
  ok
    ? "PASS: source and derivative both carry alpha, and the cut-out region is transparent."
    : "FAIL: transparency was lost somewhere. Check for a flatten() call in the pipeline."
);

console.log("\n--- UI layer, checked separately ---");
console.log(
  "Transparency surviving is necessary but NOT sufficient: a container with a\n" +
    "background colour still paints a box behind the cut-out. `.mm-cutout` in\n" +
    "src/index.css exists for exactly that reason, and Plate.jsx selects it from\n" +
    "the manifest's `transparent` flag."
);
