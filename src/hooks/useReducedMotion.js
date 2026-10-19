import { useEffect, useState } from "react";

/**
 * Detects the user's reduced-motion preference and keeps it current.
 *
 * Why a hook rather than only a CSS media query: CSS can hide the *effect* of
 * motion, but it cannot stop the component from arming an entrance state. If
 * the element is armed (`opacity: 0`) and the reduced-motion override is what
 * makes it visible, then any CSS regression silently hides content again.
 *
 * By reading the preference in JS, reduced-motion takes the SIMPLER code path:
 * the entrance state is never armed at all, so there is nothing to override.
 */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event) => setReduced(event.matches);

    // Safari below 14 only supports the deprecated addListener form.
    if (query.addEventListener) {
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    }
    query.addListener(onChange);
    return () => query.removeListener(onChange);
  }, []);

  return reduced;
}
