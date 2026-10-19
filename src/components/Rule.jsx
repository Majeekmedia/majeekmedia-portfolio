import { useEffect, useRef, useState } from "react";

/**
 * A hairline rule.
 *
 * `draw` makes it scale in from the left as it enters the viewport. That single
 * gesture is what opens each section, and it uses the same IntersectionObserver
 * mechanism as `Reveal` rather than introducing a second animation system.
 *
 * HISTORY, worth keeping: this briefly used CSS `animation-timeline: view()` to
 * tie the draw to scroll position on the compositor. It parsed correctly and even
 * reported a valid view timeline, but the animation never advanced (progress
 * stayed pinned at 0.5 across 1400px of scrolling in the Chromium in use). A
 * scroll effect that silently does nothing is worse than no effect, and review
 * cannot catch it because the element exists and claims to be running. It now
 * uses the verified IntersectionObserver path.
 */
export default function Rule({ className = "", strong = false, draw = false }) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!draw) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return undefined;

    // Already on screen at load: leave it drawn rather than animating it in,
    // which would otherwise flash on first paint.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return undefined;

    setArmed(true);
    return undefined;
  }, [draw]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [armed]);

  return (
    <hr
      ref={ref}
      data-armed={armed ? "true" : undefined}
      data-visible={visible ? "true" : undefined}
      className={`mm-rule ${strong ? "mm-rule-strong" : ""} ${
        draw ? "mm-rule-draw" : ""
      } ${className}`}
    />
  );
}
