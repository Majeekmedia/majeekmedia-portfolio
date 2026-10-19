/**
 * Reliable full-page capture harness.
 *
 * WHY THIS EXISTS
 * ---------------
 * A naive `fullPage: true` screenshot of this site produces big blank bands.
 * Two independent causes, both must be handled:
 *
 *  1. Entrance animations. Components start at `opacity: 0` / `translateY` and
 *     only reveal when an IntersectionObserver fires. Playwright's fullPage
 *     capture stitches the document WITHOUT scrolling a real viewport through
 *     it, so the observer never fires for off-screen regions and the content
 *     is captured at opacity 0.
 *
 *  2. Lazy-loaded images plus font swap, which resolve after the capture.
 *
 * The fix is to settle the page before capturing: scroll it slowly so every
 * observer fires, wait for images/fonts, THEN strip transform/opacity/
 * transition/animation so the capture is deterministic. Assertions run after
 * settling too, so measured geometry matches what a user eventually sees.
 */

export const VIEWPORTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'large', width: 1920, height: 1080 },
];

/** Injected before capture. Removes motion so pixels are deterministic. */
export const SETTLE_CSS = `
  *, *::before, *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
    scroll-behavior: auto !important;
  }
  /* Reverse the "hidden until revealed" default so nothing captures blank. */
  [data-reveal], .reveal {
    opacity: 1 !important;
    transform: none !important;
    will-change: auto !important;
  }
`;

/** Scroll the whole document so every IntersectionObserver has fired. */
export async function settlePage(page, { step = 300, pause = 90, settleMs = 1200 } = {}) {
  await page.evaluate(async ({ step, pause }) => {
    const doc = document.documentElement;
    const total = doc.scrollHeight;
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, pause));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  }, { step, pause });

  // Let fonts swap and lazy images decode.
  await page.evaluate(() => document.fonts?.ready);
  await page.evaluate(async () => {
    const imgs = Array.from(document.images).filter((i) => !i.complete);
    await Promise.all(
      imgs.map((i) => new Promise((res) => {
        i.addEventListener('load', res, { once: true });
        i.addEventListener('error', res, { once: true });
        setTimeout(res, 4000);
      }))
    );
  });
  await page.waitForTimeout(settleMs);
}

/** Assert no blank bands: every section must paint content. */
export async function detectBlankBands(page) {
  return page.evaluate(() => {
    const out = [];
    const sections = Array.from(document.querySelectorAll('main > section, body > section'));
    sections.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.height < 40) return;
      const visible = Array.from(s.querySelectorAll('*')).some((el) => {
        const cs = getComputedStyle(el);
        const b = el.getBoundingClientRect();
        const hasText = (el.textContent || '').trim().length > 0 && el.children.length === 0;
        const isImg = el.tagName === 'IMG' || el.tagName === 'svg';
        return (hasText || isImg) &&
          parseFloat(cs.opacity) > 0.9 &&
          cs.visibility !== 'hidden' &&
          b.height > 2 && b.width > 2;
      });
      out.push({ index: i, height: Math.round(r.height), painted: visible });
    });
    return out;
  });
}
