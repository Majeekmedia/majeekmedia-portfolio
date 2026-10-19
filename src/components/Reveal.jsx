import { useEffect, useRef, useState } from "react";

/**
 * Fade-and-rise entrance on scroll.
 *
 * CRITICAL DESIGN RULE (fixes PORTFOLIO_AUDIT.md A5):
 * Content is VISIBLE BY DEFAULT. The entrance state (`opacity: 0`) is only
 * armed after we have confirmed, in the browser, both that the element is not
 * already on screen and that motion is permitted.
 *
 * The previous implementation rendered `opacity: 0` immediately and relied on a
 * later IntersectionObserver callback to reveal it. Two consequences:
 *   - If JS failed, or the observer never fired for a region, the content was
 *     PERMANENTLY invisible.
 *   - Any tooling that stitches a full-page capture without a real scrolling
 *     viewport produced blank bands.
 *
 * Arming inside `useEffect` also means the first paint is visible, so there is
 * no flash of content that then disappears.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  disabled = false,
  /**
   * `lines` reveals each direct child in sequence, for headings.
   *
   * The AUTHOR writes the line breaks, so there is no measuring script guessing
   * where lines fall and no split-text library. That also means the reveal
   * cannot break on reflow, and it survives with JavaScript disabled because the
   * content is a normal block element either way.
   */
  variant = "block",
  ...rest
}) {
  const ref = useRef(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled) return undefined;

    const el = ref.current;
    if (!el) return undefined;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // No IntersectionObserver, or motion is not wanted: stay visible.
    if (reduce || typeof IntersectionObserver === "undefined") return undefined;

    const rect = el.getBoundingClientRect();
    const alreadyOnScreen = rect.top < window.innerHeight * 0.9;

    // Already visible on first paint means the user should simply see it.
    // Arming here would cause a flash on load.
    if (alreadyOnScreen) return undefined;

    setArmed(true);
    return undefined;
  }, [disabled]);

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
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [armed]);

  const style = delay && armed && visible ? { transitionDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref}
      data-armed={armed ? "true" : undefined}
      data-visible={visible ? "true" : undefined}
      className={`${variant === "lines" ? "mm-reveal-lines" : "mm-reveal"} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
