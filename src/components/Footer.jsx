import { Instagram, Linkedin, Twitter, Facebook } from "lucide-react";
import Container from "./Container.jsx";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <Container className="py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 text-sm text-white/60">
          <span>© {year} Majeek Media</span>
          <span className="hidden md:inline">•</span>
          <span>Built for performance</span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="http://x.com/majeekmedia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-vibrant transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter size={18} />
          </a>
          <a
            href="https://web.facebook.com/majeekmedia/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-vibrant transition-colors duration-200"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.instagram.com/preyetekenah/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-vibrant transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/preye-tekenah-a5799313a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-vibrant transition-colors duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </Container>
    </footer>
  );
}