import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-lab.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Medical Biotechnology Laboratory"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Animated DNA Helix & Molecules */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 opacity-20 animate-[spin_20s_linear_infinite]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="20" r="8" fill="currentColor" className="text-primary" />
            <circle cx="50" cy="80" r="8" fill="currentColor" className="text-primary" />
            <path d="M 50 20 Q 30 50 50 80" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            <path d="M 50 20 Q 70 50 50 80" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
            <circle cx="35" cy="40" r="5" fill="currentColor" className="text-accent" />
            <circle cx="65" cy="60" r="5" fill="currentColor" className="text-accent" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 w-24 h-24 opacity-15 animate-[spin_15s_linear_infinite_reverse]">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="3" className="text-secondary" />
            <circle cx="50" cy="50" r="8" fill="currentColor" className="text-secondary" />
            <circle cx="50" cy="20" r="6" fill="currentColor" className="text-accent" />
            <circle cx="80" cy="50" r="6" fill="currentColor" className="text-accent" />
            <circle cx="50" cy="80" r="6" fill="currentColor" className="text-accent" />
          </svg>
        </div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 opacity-10 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="15" fill="currentColor" className="text-primary" />
            <circle cx="25" cy="35" r="8" fill="currentColor" className="text-accent" />
            <circle cx="75" cy="35" r="8" fill="currentColor" className="text-accent" />
            <circle cx="35" cy="70" r="8" fill="currentColor" className="text-secondary" />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="container relative z-10 py-20">
        <div className="max-w-3xl">
          <div className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5">
            <span className="text-sm font-medium text-primary">
              Medical Biotechnology with Information Technology
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Connecting Medical Biotechnology and Technology
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl max-w-2xl">
            MUMBSO is the official student-run organization at Maseno University empowering the next generation of biotechnology researchers and innovators.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/join">Join MUMBSO</Link>
            </Button>
            <Button asChild variant="secondary" size="xl">
              <Link to="/events">Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
