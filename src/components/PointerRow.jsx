import { useRef } from "react";
import { Link } from "react-router-dom";
import { useElementPointer } from "../hooks/usePointerVars.js";

/**
 * A link whose background carries a soft light that follows the pointer.
 *
 * This is the "interactive project preview" the brief asks for, done in CSS:
 * a radial-gradient whose centre is driven by `--mm-local-x` / `--mm-local-y`,
 * written by `useElementPointer` via rAF. No React re-render on pointer move.
 *
 * WHY THIS IS DEFENSIBLE RATHER THAN DECORATION
 * It answers "which row am I about to open?" instantly, on a list where every
 * row looks identical at rest. That is hierarchy and feedback, which are the two
 * valid reasons to animate anything. It is also the one accent moment in a
 * section that is otherwise deliberately quiet, so it reads as authored rather
 * than as one of many effects.
 *
 * DEGRADES TO NOTHING: with a coarse pointer or reduced motion the hook never
 * sets the variables, the gradient stays transparent, and the row is a plain
 * hover state. No layout change, no fallback branch to maintain.
 */
export default function PointerRow({ to, children, className = "" }) {
  const ref = useRef(null);
  useElementPointer(ref);

  return (
    <Link
      ref={ref}
      to={to}
      className={`mm-pointer-row group relative block border-b border-mm-line ${className}`}
    >
      {children}
    </Link>
  );
}
