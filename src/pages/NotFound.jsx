import Container from "../components/Container.jsx";
import { ButtonLink } from "../components/Button.jsx";
import Seo from "../components/Seo.jsx";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — Majeek Media" path="/404" />
      <section className="bg-black min-h-[70vh] flex items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-vibrant/20 rounded-full blur-[100px] pointer-events-none" />
        
        <Container>
          <div className="text-center relative z-10 max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-vibrant/10 border border-vibrant/20 mb-6 animate-bounce-slow">
              <AlertTriangle size={40} className="text-vibrant" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Page <span className="text-vibrant">Not Found</span>
            </h1>
            
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <ButtonLink to="/" variant="vibrant">
                Return Home
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                View Services
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}