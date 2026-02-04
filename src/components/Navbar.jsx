import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

import Container from "./Container.jsx";

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "text-vibrant"
      : "text-white/80 hover:text-vibrant"
  }`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const NavItems = ({ onClick }) => (
    <>
      <NavLink to="/services" className={navLinkClass} onClick={onClick}>Services</NavLink>
      <NavLink to="/portfolio" className={navLinkClass} onClick={onClick}>Portfolio</NavLink>
      <NavLink to="/about" className={navLinkClass} onClick={onClick}>About</NavLink>
      <NavLink to="/contact" className={navLinkClass} onClick={onClick}>Contact</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-2 min-w-0">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-vibrant p-1">
              <img
                src="/logo.png"
                alt="Majeek Media"
                className="h-7 w-7 rounded-full object-cover"
              />
            </span>
            <span className="font-bold tracking-tight text-white truncate">
              Majeek Media
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <NavItems />
            </nav>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 p-2
                         text-white hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        {open ? (
          <div className="md:hidden mt-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
            <nav className="flex flex-col gap-3">
              <NavItems onClick={() => setOpen(false)} />
            </nav>
          </div>
        ) : null}
      </Container>
    </header>
  );
}