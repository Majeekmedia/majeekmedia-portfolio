import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import BackToTop from "./components/BackToTop.jsx";
import SkipLink from "./components/SkipLink.jsx";
import { usePointerVars } from "./hooks/usePointerVars.js";

import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Project from "./pages/Project.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  // Publishes --mm-px / --mm-py for the ambient ground light. Writes to CSS
  // variables on rAF, so pointer movement never re-renders React.
  usePointerVars();

  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      {/* Ambient light. Fixed, behind everything, pointer-events: none. */}
      <div className="mm-ambient" aria-hidden="true" />

      <SkipLink />
      <ScrollToTop />
      <BackToTop />
      <Navbar />

      <main id="main" className="relative z-content flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:slug" element={<Project />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}