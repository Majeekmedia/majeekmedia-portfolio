import { useRef } from "react";
import Plate from "./Plate.jsx";
import { useElementPointer } from "../hooks/usePointerVars.js";

/**
 * A project plate with a spotlight border and a very slight tilt.
 *
 * Defaults to the image's NATURAL aspect ratio. Several project screenshots are
 * portrait phone captures (780x1688), and forcing them into a landscape frame
 * would crop them to a strip. Only pass `aspect` when you deliberately want a
 * uniform grid and accept the crop.
 *
 * Two effects, both pointer-driven through CSS variables written on rAF:
 *   1. spotlight border, whose brightness peaks under the cursor
 *   2. tilt, capped at 1.2 degrees
 *
 * The tilt cap is deliberate: the plate holds a screenshot of real software, and
 * a large tilt makes the interface inside it harder to read.
 *
 * DEGRADES TO NOTHING: coarse pointer or reduced motion means the hook never
 * writes the variables, and the CSS defaults leave the plate flat with no
 * spotlight. No separate code path.
 */
export default function TiltPlate({
  src,
  alt,
  sizes = "100vw",
  aspect = "natural",
  ratio,
  className = "",
  priority = false,
}) {
  const ref = useRef(null);
  useElementPointer(ref);

  return (
    <div ref={ref} className={`mm-tilt relative ${className}`}>
      <div className="mm-tilt-inner">
        <Plate src={src} alt={alt} sizes={sizes} aspect={aspect} ratio={ratio} priority={priority} />
      </div>
      {/* Spotlight ring. aria-hidden: purely presentational. */}
      <span className="mm-spotlight" aria-hidden="true" />
    </div>
  );
}
