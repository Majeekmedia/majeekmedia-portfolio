import { useEffect, useState } from "react";

/**
 * Back-to-top control.
 *
 * Fixed from the audit:
 *  - The old version used `window.addEventListener('scroll')`, which the brief
 *    bans outright: it fires on every frame and forces a re-render each time.
 *    This uses an IntersectionObserver on a sentinel instead.
 *  - The old version applied `animate-in fade-in zoom-in`, which are
 *    `tailwindcss-animate` utilities for a package that is not installed. They
 *    produced no CSS at all, so the entrance animation never ran.
 *  - The old version had no visible focus ring, because `ring-vibrant` resolved
 *    to no CSS.
 *
 * This version is keyboard reachable, has the standard focus ring, and honours
 * reduced motion by simply appearing rather than scaling in.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:600px;left:0;height:1px;width:1px;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="fixed bottom-6 right-6 z-overlay flex h-11 w-11 items-center justify-center border border-mm-line-control bg-mm-surface text-mm-text transition-colors duration-fast ease-mm hover:border-mm-accent hover:text-mm-accent"
    >
      <span className="sr-only">Back to top</span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" />
      </svg>
    </button>
  );
}
