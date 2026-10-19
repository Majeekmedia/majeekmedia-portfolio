import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Container from "./Container.jsx";

/**
 * Navigation.
 *
 * Constraints held from the brief and the audit:
 *  - ONE line at desktop. Five items, short labels, 1.2rem gaps. Never wraps.
 *  - Height 72px desktop / 60px mobile, and it SHRINKS on scroll rather than
 *    growing. The audit measured the old header at a flat 69px with no state.
 *  - The active item is marked by the accent underline, which is the site's
 *    single interaction signature. No coloured status dots.
 *  - Route slugs and labels are unchanged, per the preservation contract.
 *
 * The scroll listener is an IntersectionObserver on a sentinel element, not a
 * `window.scroll` listener. The brief bans scroll listeners explicitly, and
 * they run on every frame.
 */

const NAV = [
  { to: "/", label: "Home", end: true },
  { to: "/portfolio", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile panel on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll state via a sentinel + IntersectionObserver. No scroll listener.
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = "position:absolute;top:0;left:0;height:1px;width:1px;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  // Trap nothing, but allow Escape to close the panel.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-nav border-b transition-[height,border-color,background-color] duration-mm ease-mm ${
        scrolled
          ? "border-mm-line bg-mm-bg/95 backdrop-blur-[2px]"
          : "border-transparent bg-mm-bg"
      }`}
    >
      <Container>
        <div
          className={`flex items-center justify-between gap-6 transition-[height] duration-mm ease-mm ${
            scrolled ? "h-[60px] md:h-[64px]" : "h-[60px] md:h-[72px]"
          }`}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center gap-3"
            aria-label="Majeek Media, home"
          >
            <img
              src="/optimized/logo-128.webp"
              alt=""
              width={28}
              height={28}
              decoding="async"
              className="h-7 w-7 rounded-[2px] object-cover"
            />
            <span className="text-[0.95rem] font-bold tracking-tight">Majeek Media</span>
          </Link>

          {/* Desktop: one line, always. */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className="mm-underline inline-flex min-h-6 items-center py-1 text-small font-medium"
                  >
                    {({ isActive }) => (
                      <span data-active={isActive ? "true" : undefined}>{item.label}</span>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Link
              to="/contact"
              className="mm-underline inline-flex min-h-6 items-center py-1 text-small font-medium"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mm-mobile-nav"
            className="flex h-10 w-10 items-center justify-center border border-mm-line text-mm-text md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              {open ? (
                <path d="M4 4l10 10M14 4L4 14" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile panel */}
      {open ? (
        <div id="mm-mobile-nav" className="border-t border-mm-line bg-mm-bg md:hidden">
          <Container>
            <nav aria-label="Primary mobile" className="py-4">
              <ul>
                {NAV.map((item) => (
                  <li key={item.to} className="border-b border-mm-line last:border-b-0">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className="block py-4 text-lg font-medium"
                      data-active={undefined}
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="mm-btn mm-btn-accent mt-5 w-full"
                onClick={() => setOpen(false)}
              >
                Get in touch
              </Link>            </nav>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
