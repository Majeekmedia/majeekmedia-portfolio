import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white text-vibrant shadow-lg 
                 hover:bg-vibrant hover:text-black transition-all duration-300 hover:scale-110 hover:-translate-y-1
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vibrant animate-in fade-in zoom-in duration-300"
      aria-label="Scroll to top"
    >
      <ArrowUp size={24} />
    </button>
  );
}
