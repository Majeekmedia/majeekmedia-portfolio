import manifest from "./image-manifest.json";

/**
 * Image helpers.
 *
 * The available derivatives are described by `src/lib/image-manifest.json`,
 * which `docs/qa/optimize-images.mjs` writes on every run. That makes the
 * pipeline the single source of truth: this module cannot request a width that
 * was never produced.
 *
 * HISTORY — why the manifest exists. An earlier version hard-coded the widths
 * here and defaulted the largest candidate to 1024. The hero portrait only gets
 * 480 and 819 derivatives, so every hero request 404'd. The manifest removes the
 * whole class of bug.
 */

/** Intrinsic aspect ratio of the project screenshots, for space reservation. */
export const PLATE_RATIO = { width: 1024, height: 640 };

/** Aspect ratio of the hero portrait. Only two derivatives exist for it. */
export const PORTRAIT_RATIO = { width: 819, height: 1024 };

/**
 * Build `src` + `srcSet` for a source path, using only width candidates that
 * actually exist on disk.
 *
 * Also returns the image's TRUE dimensions from the manifest. That matters
 * because the assets are genuinely mixed: VHM desktop captures are 1920x891
 * landscape, the Expo app captures are 780x1688 PORTRAIT, and UniTrade is
 * 1024x576. Forcing all of them into one landscape frame crops the phone
 * screenshots to ribbons, which is the bug this prevents.
 *
 * @param {string} sourcePath e.g. "/projects/notes-app/01-notes-list.png"
 * @returns {{ src: string, srcSet: string|undefined, largest: number,
 *            transparent: boolean, width: number, height: number, portrait: boolean }}
 */
export function derivative(sourcePath) {
  const entry = manifest[sourcePath];

  // A missing entry means the pipeline has not run for this asset, or a new
  // image was added without running it. Fall back to the ORIGINAL source rather
  // than emitting a path that would 404: a heavier image beats no image.
  if (!entry || !entry.files || !entry.files.length) {
    console.warn(
      `[images] No optimized derivatives for "${sourcePath}". Falling back to the original. ` +
        `Run: node docs/qa/optimize-images.mjs`
    );
    return {
      src: sourcePath,
      srcSet: undefined,
      largest: 0,
      transparent: false,
      ...PLATE_RATIO,
      portrait: false,
    };
  }

  const last = entry.files.length - 1;
  const width = entry.width ?? PLATE_RATIO.width;
  const height = entry.height ?? PLATE_RATIO.height;

  return {
    src: entry.files[last],
    srcSet: entry.files.map((file, i) => `${file} ${entry.widths[i]}w`).join(", "),
    largest: entry.widths[last],
    // Cut-out images must not sit on a background box. See Plate.jsx.
    transparent: entry.transparent === true,
    width,
    height,
    // Portrait means taller than wide. A single check used by the layout code.
    portrait: height > width,
  };
}

/**
 * The SMALLEST available derivative, for thumbnails.
 *
 * WHY THIS EXISTS: the project thumbnail strip was using `derivative().src`,
 * which returns the LARGEST variant. A 96px thumbnail was therefore downloading
 * a 1920px image. Measured on /portfolio at a phone viewport, that was ~180 KB of
 * pure waste: three VHM desktop captures fetched at full size to fill 96x56px.
 *
 * A thumbnail can also outsource the choice to `srcSet` with a small `sizes`,
 * which is what the caller does. This just guarantees the fallback `src` is small
 * rather than enormous.
 */
export function thumbnail(sourcePath) {
  const entry = manifest[sourcePath];

  if (!entry || !entry.files || !entry.files.length) {
    return { src: sourcePath, srcSet: undefined, width: 96, height: 56 };
  }

  const w = entry.width ?? PLATE_RATIO.width;
  const h = entry.height ?? PLATE_RATIO.height;

  return {
    // First entry is always the smallest, because the pipeline emits ascending widths.
    src: entry.files[0],
    srcSet: entry.files.map((file, i) => `${file} ${entry.widths[i]}w`).join(", "),
    // Keep the true ratio so the thumbnail box is not distorted.
    width: w,
    height: h,
  };
}
