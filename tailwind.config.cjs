/**
 * Tailwind reads the CSS custom properties defined in `src/index.css`.
 * Tokens live in ONE place; Tailwind maps to them rather than redefining them.
 *
 * REMOVED: the old `accent: { 50, 600, 700 }` scale.
 * It was never referenced anywhere, and it coexisted with an unused `vibrant`
 * utility vocabulary that produced no CSS at all. See PORTFOLIO_AUDIT.md §3.
 */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mm: {
          bg: "var(--mm-bg)",
          surface: "var(--mm-surface)",
          raised: "var(--mm-surface-raised)",
          line: "var(--mm-line)",
          // Interactive control borders. Separate from `line` because WCAG 1.4.11
          // requires 3:1 for the boundary that identifies a control.
          "line-control": "var(--mm-line-control)",
          text: "var(--mm-text)",
          muted: "var(--mm-text-muted)",
          accent: "var(--mm-accent)",
          "accent-dim": "var(--mm-accent-dim)",
          // Brand blue, for FILLS only (white label at 4.52:1).
          "accent-fill": "var(--mm-accent-fill)",
          "accent-fill-dim": "var(--mm-accent-fill-dim)",
          danger: "var(--mm-danger)",
        },
      },
      fontFamily: {
        display: "var(--mm-font-display)",
        text: "var(--mm-font-text)",
        mono: "var(--mm-font-mono)",
      },
      fontSize: {
        display: "var(--mm-fs-display)",
        h1: "var(--mm-fs-h1)",
        h2: "var(--mm-fs-h2)",
        h3: "var(--mm-fs-h3)",
        body: "var(--mm-fs-body)",
        small: "var(--mm-fs-small)",
        mono: "var(--mm-fs-mono)",
      },
      letterSpacing: {
        display: "var(--mm-track-display)",
        tight: "var(--mm-track-tight)",
        label: "var(--mm-track-label)",
      },
      spacing: {
        section: "var(--mm-section)",
        "section-lg": "var(--mm-section-lg)",
        gutter: "var(--mm-gutter)",
      },
      maxWidth: {
        shell: "1600px",
        measure: "var(--mm-measure)",
      },
      borderRadius: {
        // One radius. Nothing else is permitted.
        DEFAULT: "var(--mm-radius)",
      },
      transitionTimingFunction: {
        mm: "var(--mm-ease)",
      },
      transitionDuration: {
        fast: "var(--mm-dur-fast)",
        mm: "var(--mm-dur)",
        slow: "var(--mm-dur-slow)",
      },
      zIndex: {
        content: "var(--mm-z-content)",
        sticky: "var(--mm-z-sticky)",
        nav: "var(--mm-z-nav)",
        overlay: "var(--mm-z-overlay)",
      },
    },
  },
  plugins: [],
};
