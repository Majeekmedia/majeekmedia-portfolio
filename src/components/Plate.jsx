import { derivative, PLATE_RATIO } from "../lib/images.js";

/**
 * A project image.
 *
 * Two DISTINCT treatments, decided from the manifest rather than from a prop:
 *
 *   `.mm-plate`   opaque screenshot. Framed by the shared radius, cropped to fill.
 *   `.mm-cutout`  transparent cut-out figure. No background, no radius, no crop.
 *
 * ASPECT RATIO IS DERIVED, NOT IMPOSED. The assets are genuinely mixed: VHM
 * desktop captures are 1920x891 landscape, the Expo app captures are 780x1688
 * PORTRAIT, and UniTrade is 1024x576. Wrapping a portrait phone screenshot in a
 * landscape frame crops it to a ribbon, which is what this prevents. Each image
 * gets its own intrinsic ratio unless the caller explicitly forces one.
 *
 * ALPHA BUG, recorded so it does not return: an earlier pipeline applied
 * `.flatten()` to every asset, destroying the hero portrait's transparency and
 * baking in a solid rectangle. The UI half of that bug was `.mm-plate`'s
 * `background-color`, which paints a box behind a cut-out. Both are fixed, and
 * `optimize-images.mjs` now throws if a derivative loses alpha.
 */
export default function Plate({
  src,
  alt,
  sizes = "100vw",
  priority = false,
  className = "",
  imgClassName = "",
  /**
   * "natural" (default) uses the image's own aspect ratio.
   * A class string such as "aspect-[16/10]" forces that ratio and crops to fill.
   */
  aspect = "natural",
  /**
   * Ceiling for a NATURAL-ratio image, as a CSS length.
   *
   * Without this, a portrait source renders at its own ratio inside a full-width
   * column, which on a 1440px viewport produced a 495x1071px block: nearly TWO
   * viewport heights for one screenshot. The cap keeps any single image to a
   * comfortable share of the screen while leaving landscape shots large.
   */
  maxHeight = "78vh",
  ratio,
  children,
}) {
  const img = derivative(src);

  const forced = aspect !== "natural";
  const dims = ratio ?? (forced ? PLATE_RATIO : { width: img.width, height: img.height });

  // A cut-out is always contained, never cropped: cropping a figure cuts it off.
  const objectFit = forced || img.transparent ? "object-contain" : "object-cover";

  /*
   * Portrait handling for NATURAL aspect.
   *
   * A portrait image plus `w-full` gives it the column width and therefore its
   * full intrinsic height. Instead the figure takes the image's aspect ratio and
   * `w-auto`, so `max-height` actually constrains it and the width follows. The
   * element is then centred rather than stretched.
   *
   * Landscape images are unaffected: they fill the column as before.
   */
  const portraitNatural = !forced && img.portrait;

  const figureStyle = portraitNatural
    ? { aspectRatio: `${dims.width} / ${dims.height}`, maxHeight }
    : undefined;

  return (
    <figure
      className={`${img.transparent ? "mm-cutout" : "mm-plate"} ${
        forced ? aspect : ""
      } ${portraitNatural ? "w-auto mx-auto" : ""} ${className}`}
      style={figureStyle}
    >
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        alt={alt}
        width={dims.width}
        height={dims.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={`${objectFit} h-full w-full ${imgClassName}`}
      />
      {children}
    </figure>
  );
}
