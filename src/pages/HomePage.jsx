import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import InfiniteGrid from "../components/InfiniteGrid";
import CarouselNav from "../components/CarouselNav";
import { CarouselProvider } from "../hooks/useCarousel";

const PHASE_SCHEDULE = {
  globe:    { next: "text",     delay: 1000 },
  text:     { next: "carousel", delay: 2000 },
  carousel: { next: "complete", delay: 2800 },
};

const HomePage = () => {
  const [introPhase, setIntroPhase] = useState(() =>
    sessionStorage.getItem("carouselIndex") ? "complete" : "globe"
  );

  // Lock body scroll — fullscreen grid experience
  useEffect(() => {
    document.body.classList.add("carousel-active");
    return () => document.body.classList.remove("carousel-active");
  }, []);

  // Phase timeline — each phase advances to the next after its duration
  useEffect(() => {
    const step = PHASE_SCHEDULE[introPhase];
    if (!step) return;

    const timer = setTimeout(() => setIntroPhase(step.next), step.delay);
    return () => clearTimeout(timer);
  }, [introPhase]);

  return (
    <>
      <HeroSection introPhase={introPhase} />

      <CarouselProvider introPhase={introPhase}>
        <InfiniteGrid />
        <CarouselNav />
      </CarouselProvider>
    </>
  );
};

export default HomePage;
