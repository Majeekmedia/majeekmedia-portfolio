import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Container from "./Container.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import { useTheme } from "../hooks/useTheme.js";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${
    isActive
      ? "text-accent-700 dark:text-accent-50"
      : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
  }`;

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const NavItems = ({ onClick }) => (
    <>
      <NavLink to="/services" className={navLinkClass} onClick={onClick}>Services</NavLink>
      <NavLink to="/portfolio" className={navLinkClass} onClick={onClick}>Portfolio</NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={onClick}>About</NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={onClick}>Contact</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur dark:border-slate-900 dark:bg-slate-950/70">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 p-1 dark:bg-slate-50 dark:ring-slate-800">
              <img
                src="/logo.png"
                alt="Majeek Media"
                className="h-7 w-7 rounded-full object-cover"
              />
            </span>
            <span className="font-semibold tracking-tight text-slate-900 dark:text-white truncate">
              Majeek Media
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-4">
              <NavItems />
            </nav>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2
                         text-slate-700 hover:bg-slate-50 transition
                         dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open ? (
          <div className="md:hidden mt-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
            <nav className="flex flex-col gap-3">
              <NavItems onClick={() => setOpen(false)} />
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}