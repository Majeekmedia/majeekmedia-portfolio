import { useEffect } from "react";

/**
 * Tracks the pointer and publishes it as CSS custom properties.
 *
 * WHY CSS VARIABLES RATHER THAN REACT STATE
 * A pointer moves at up to 120+ events per second. Putting that in `useState`
 * re-renders the whole React tree on every event, which is the single most
 * common way this kind of effect destroys a page's performance. Instead this
 * writes two numbers to `document.documentElement.style`, and CSS consumes them.
 * React never re-renders. Zero reconciliation cost.
 *
 * WHY requestAnimationFrame
 * The listener only records the latest coordinates and schedules a single rAF
 * write. Multiple pointer events inside one frame collapse into one write, so a
 * 120Hz mouse still produces at most 60 writes per second.
 *
 * WHY NOT `window.addEventListener('scroll')`
 * Not used here, and the brief bans it. This is `pointermove`, which is passive
 * and cheap, and the listener is attached once for the whole document rather
 * than per component.
 *
 * DISABLED WHEN:
 *  - the pointer is coarse (touch). There is no hover on a phone, and running
 *    the maths would waste battery for an effect nobody can see.
 *  - `prefers-reduced-motion: reduce`. Pointer-reactive lighting is exactly the
 *    kind of ambient movement that setting exists to suppress.
 */
export function usePointerVars({ enabled = true } = {}) {
  useEffect(() => {
    if (!enabled) return undefined;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No hover-capable pointer, or motion is unwanted: leave the variables unset
    // so CSS falls back to its static default.
    if (!fine || reduce) return undefined;

    const root = document.documentElement;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let queued = false;

    const write = () => {
      queued = false;
      root.style.setProperty("--mm-px", `${x}px`);
      root.style.setProperty("--mm-py", `${y}px`);
    };

    const onMove = (event) => {
      x = event.clientX;
      y = event.clientY;
      if (!queued) {
        queued = true;
        requestAnimationFrame(write);
      }
    };

    // Seed the values so the first paint has something sensible rather than 0,0.
    write();

    // `passive: true` tells the browser it never needs to wait for this handler
    // before scrolling, so it cannot cause scroll jank.
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onMove);
      root.style.removeProperty("--mm-px");
      root.style.removeProperty("--mm-py");
    };
  }, [enabled]);
}

/**
 * Per-element pointer position, for spotlight borders and tilt.
 *
 * Publishes:
 *   --mm-local-x / --mm-local-y   position within the element, as percentages.
 *                                 What a radial-gradient needs for a spotlight.
 *   --mm-tx / --mm-ty             tilt angles in degrees, derived from how far
 *                                 the pointer is from the element's centre.
 *
 * Same rAF discipline as above, and the listener is scoped to the element rather
 * than the document.
 *
 * @param {React.RefObject} ref     element to track
 * @param {object}          options
 * @param {number}          options.maxTilt  degrees at the edge. Default 1.2,
 *                                           deliberately small: the plate holds
 *                                           a real screenshot and a large tilt
 *                                           makes it harder to read.
 */
export function useElementPointer(ref, { enabled = true, maxTilt = 1.2 } = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return undefined;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return undefined;

    let queued = false;
    let px = 50;
    let py = 50;

    const write = () => {
      queued = false;
      el.style.setProperty("--mm-local-x", `${px}%`);
      el.style.setProperty("--mm-local-y", `${py}%`);

      // Map 0-100% to -maxTilt..+maxTilt. Pointer right of centre rotates
      // toward the pointer, so the Y axis uses the horizontal position and the
      // X axis uses the vertical position (inverted, so it feels like pushing).
      const tx = ((px - 50) / 50) * maxTilt;
      const ty = -((py - 50) / 50) * maxTilt;
      el.style.setProperty("--mm-tx", `${tx.toFixed(2)}deg`);
      el.style.setProperty("--mm-ty", `${ty.toFixed(2)}deg`);
    };

    const onMove = (event) => {
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      px = ((event.clientX - rect.left) / rect.width) * 100;
      py = ((event.clientY - rect.top) / rect.height) * 100;
      if (!queued) {
        queued = true;
        requestAnimationFrame(write);
      }
    };

    // Reset to flat when the pointer leaves, so the plate settles rather than
    // freezing at its last angle.
    const onLeave = () => {
      el.style.removeProperty("--mm-local-x");
      el.style.removeProperty("--mm-local-y");
      el.style.setProperty("--mm-tx", "0deg");
      el.style.setProperty("--mm-ty", "0deg");
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref, enabled, maxTilt]);
}
