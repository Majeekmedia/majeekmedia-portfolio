import { derivative } from "../lib/images.js";

/**
 * A phone bezel around a portrait app screenshot.
 *
 * WHY THIS EXISTS
 * A bare portrait screenshot on a web page reads as "a tall image". The same shot
 * inside a device frame reads as "an app", because the frame supplies the context
 * the screenshot cannot: which platform, which screen, what scale. It also solves
 * the sizing problem, because the bezel gives a fixed, predictable box that the
 * screenshot sits inside rather than stretching to fill.
 *
 * NO IMAGE ASSETS, NO HAND-ROLLED DECORATIVE SVG. The bezel is CSS geometry:
 * nested border-radius, a 1px border, and a small pill for the speaker. That is a
 * simple geometric shape, which is the documented exception to the
 * no-hand-rolled-SVG rule. A photographed device mockup would be worse: it would
 * carry its own lighting, reflections and aspect ratio, none of which match this
 * page, and it would need a new asset per screen.
 *
 * RADIUS IS A DELIBERATE EXCEPTION to the single-2px-radius rule. The system's 2px
 * is for page plates. This is a physical object, and a phone with 2px corners would
 * read as a bug rather than as a device. The exception is confined to this one
 * component.
 */
export default function PhoneFrame({
  src,
  alt,
  width = 220,
  sizes = "220px",
  priority = false,
  className = "",
}) {
  const img = derivative(src);

  /* The bezel is designed at a 9:19.5 body ratio, close to a modern phone. */
  const bodyRatio = "9 / 19.5";

  return (
    <figure
      className={`mm-phone relative shrink-0 ${className}`}
      style={{ width: `${width}px` }}
    >
      <div className="mm-phone-body" style={{ aspectRatio: bodyRatio }}>
        {/* Speaker pill. Purely presentational. */}
        <span className="mm-phone-speaker" aria-hidden="true" />

        <div className="mm-phone-screen">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes={sizes}
            alt={alt}
            width={img.width}
            height={img.height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </figure>
  );
}
