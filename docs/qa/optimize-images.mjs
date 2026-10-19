/**
 * Asset pipeline. Run: node docs/qa/optimize-images.mjs
 *
 * Produces WebP derivatives at the sizes the layout actually needs, and
 * measures the before/after so the numbers in QA_REPORT.md are real.
 *
 * WHY THIS MATTERS (from PORTFOLIO_AUDIT.md §8.1):
 *  - public/ shipped ~2.9 MB of PNG.
 *  - hero/profile.png was 787 KB at only 819px wide: PNG is the wrong format
 *    for a photograph, and a transparent cut-out can be flattened onto the
 *    page ground because the page ground is a single flat colour.
 *  - logo.png was 4000px wide and 372 KB, displayed at 36px. That is roughly
 *    110x more pixels than needed.
 *
 * The originals are LEFT IN PLACE. Removing them is an explicit decision, not a
 * side effect of running this script, so nothing can break silently.
 */
import { readdir, stat, mkdir, writeFile } from "node:fs/promises";
import { join, basename, extname, dirname } from "node:path";
import sharp from "sharp";

/**
 * SOURCE assets live OUTSIDE `public/` on purpose.
 *
 * Everything under `public/` is copied verbatim into `dist/`. Keeping the
 * 2.9 MB of original PNGs there shipped BOTH the originals and the derivatives,
 * which made the deploy LARGER than before the optimisation (4.3 MB vs 2.9 MB).
 *
 * Source assets stay in the repo, so this script is always re-runnable and
 * nothing is lost. They simply are not deployed.
 */
const SRC = "assets-source";
const OUT = "public/optimized";
const MANIFEST = "src/lib/image-manifest.json";

/**
 * IMPORTANT: there is deliberately NO `flatten()` in this pipeline.
 *
 * An earlier version flattened every image onto a solid page-ground colour.
 * For browser screenshots (fully opaque) that was harmless. For the hero
 * PORTRAIT, which is a cut-out figure on a transparent background, it DESTROYED
 * the alpha channel and baked in a solid rectangle.
 *
 * Worse, the rectangle was baked with the old neutral ground (#101010) and the
 * palette later changed to #0e1116, so the box became visible on the page.
 *
 * Transparency is now preserved. Where an image is fully opaque the alpha
 * channel is dropped purely to save bytes, which is safe because there is
 * nothing to lose.
 */

/**
 * Is this a genuine cut-out FIGURE, whose transparency must survive?
 *
 * DECIDED BY PATH, not by measuring pixels. Here is why that is the honest
 * choice rather than a shortcut.
 *
 * Measuring transparent-pixel percentage cannot separate the two cases. The
 * UniTrade screenshots measure 16-23% transparent because a drop shadow was
 * baked into the PNG, which looks identical, numerically, to the hero portrait's
 * 40% transparent background. Both have transparency around the outside.
 *
 * But the CORRECT TREATMENT is opposite:
 *   - A cut-out FIGURE must keep alpha, or it gets a visible rectangle.
 *   - A SCREENSHOT with a baked shadow must be flattened onto the page ground,
 *     or it floats in a letterboxed box and the shadow reads as a stray halo.
 *
 * So the policy is explicit: only the brand mark and the portrait are cut-outs.
 * Everything under `projects/` is a screenshot and is composited onto the ground.
 */
function isCutoutFigure(relPath) {
  const p = relPath.replace(/\\/g, "/").toLowerCase();
  if (p.includes("logo")) return true;
  if (p.includes("hero/")) return true;
  return false;
}

/** Page ground. Matches --mm-bg in src/index.css. Keep these in sync. */
const PAGE_GROUND = { r: 14, g: 17, b: 22 }; // #0e1116

async function transparencyPct(file) {
  const meta = await sharp(file).metadata();
  if (!meta.hasAlpha) return 0;

  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({
    resolveWithObject: true,
  });

  let transparent = 0;
  let total = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    total++;
    // 250 rather than 255 so near-opaque anti-aliasing is not counted.
    if (data[i + 3] < 250) transparent++;
  }
  return total ? (transparent / total) * 100 : 0;
}

const kb = (n) => Math.round((n / 1024) * 10) / 10;

/** Recursively collect image files. */
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "optimized") continue;
      files.push(...(await walk(full)));
    } else if (/\.(png|jpe?g)$/i.test(e.name)) {
      files.push(full);
    }
  }
  return files;
}

/**
 * Width plan, derived from the SOURCE resolution rather than hard-coded.
 *
 * The assets now vary a lot: VHM desktop screenshots are 1920x891, the mobile
 * app screenshots are 780x1688 portrait, and UniTrade is 1024x576. A fixed plan
 * either upscales the small ones or under-serves the large ones.
 *
 * Returns at most THREE widths: the full source width plus up to two smaller
 * steps. More steps mean more files without meaningfully better delivery.
 */
function planWidths(file, width) {
  const name = basename(file).toLowerCase();
  if (name === "logo.png") return [64, 128, 256];
  if (file.includes("hero")) return [480, 819];

  const steps = [480, 640, 1024, 1600, 1920];
  const usable = steps.filter((w) => w <= width);
  if (!usable.length) return [width];

  const smaller = usable.filter((w) => w < width).slice(-2);
  const plan = [...smaller, width];
  // De-duplicate: a 640px source would otherwise emit 640 twice.
  return [...new Set(plan)];
}

async function main() {
  await mkdir(OUT, { recursive: true });

  const files = [
    ...(await walk(join(SRC, "images"))),
    ...(await walk(join(SRC, "projects"))),
    join(SRC, "logo.png"),
  ];

  const rows = [];
  const manifest = {};
  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const before = (await stat(file)).size;
    totalBefore += before;

    const meta = await sharp(file).metadata();
    const widths = planWidths(file, meta.width ?? 0);
    // Source paths are recorded relative to assets-source so the manifest keys
    // match the paths components use (which are public-relative).
    const rel = file.replace(/\\/g, "/").replace(new RegExp(`^${SRC}/`), "");
    const stem = basename(file, extname(file));

    // Measure transparency for the record, then decide treatment by PATH.
    // See isCutoutFigure() above for why the measurement cannot make this call.
    const transparency = await transparencyPct(file);
    const keepAlpha = isCutoutFigure(rel);

    if (meta.hasAlpha) {
      console.log(
        `  ${transparency.toFixed(1).padStart(5)}% transparent  ` +
          `${keepAlpha ? "CUT-OUT (alpha kept)" : "screenshot (flattened)"}  ${rel}`
      );
    }

    // Record the plan keyed by the SOURCE path the components reference.
    const sourceKey = "/" + rel;
    const dir = dirname(rel).replace(/\\/g, "/");
    manifest[sourceKey] = {
      widths,
      // TRUE aspect ratio of this specific image. Consumed by Plate.jsx so a
      // portrait phone screenshot is never stretched into a landscape frame.
      width: meta.width,
      height: meta.height,
      // Consumed by Plate.jsx to choose between `.mm-cutout` and `.mm-plate`.
      transparent: keepAlpha,
      transparencyPct: Math.round(transparency * 10) / 10,
      files: widths.map((w) =>
        dir === "." ? `/optimized/${stem}-${w}.webp` : `/optimized/${dir}/${stem}-${w}.webp`
      ),
    };

    let bestOutput = 0;

    for (const w of widths) {
      let pipeline = sharp(file).resize({ width: w, withoutEnlargement: true });

      if (keepAlpha) {
        // Preserve transparency untouched.
      } else if (meta.hasAlpha) {
        // A screenshot with a baked shadow: composite onto the page ground so it
        // sits on the page instead of floating in a letterbox.
        pipeline = pipeline.flatten({ background: PAGE_GROUND });
      } else {
        pipeline = pipeline.removeAlpha();
      }

      const buf = await pipeline
        .webp({ quality: 82, effort: 5, alphaQuality: 100 })
        .toBuffer();

      const outPath = join(OUT, dirname(rel), `${stem}-${w}.webp`);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, buf);

      // Guard: a cut-out must never lose its alpha channel.
      if (keepAlpha) {
        const outMeta = await sharp(buf).metadata();
        if (!outMeta.hasAlpha) {
          throw new Error(
            `REGRESSION: ${outPath} lost its alpha channel. A cut-out must never be flattened.`
          );
        }
      }

      if (w === Math.max(...widths)) bestOutput = buf.length;
    }

    totalAfter += bestOutput;

    rows.push({
      file: rel,
      srcW: meta.width,
      srcKB: kb(before),
      primaryW: Math.max(...widths),
      outKB: kb(bestOutput),
      saving: Math.round((1 - bestOutput / before) * 100),
    });
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");

  console.log("IMAGE OPTIMISATION\n");
  console.log("asset".padEnd(46) + "src".padEnd(12) + "-> out".padEnd(12) + "saved");
  console.log("-".repeat(84));
  for (const r of rows) {
    const src = `${r.srcW}px ${r.srcKB}KB`;
    const out = `${r.primaryW}px ${r.outKB}KB`;
    console.log(
      r.file.padEnd(46) + src.padEnd(12) + out.padEnd(12) + `${r.saving}%`
    );
  }
  console.log("-".repeat(84));
  console.log(
    `TOTAL source ${kb(totalBefore)} KB -> primary derivatives ${kb(totalAfter)} KB ` +
      `(${Math.round((1 - totalAfter / totalBefore) * 100)}% smaller)`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
