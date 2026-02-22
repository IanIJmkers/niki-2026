import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import HeroSection from "../components/HeroSection";
import InfiniteGrid from "../components/InfiniteGrid";
import CarouselNav from "../components/CarouselNav";
import ProjectModal from "../components/ProjectModal";
import AboutModal from "../components/AboutModal";
import ContactModal from "../components/ContactModal";
import { CarouselProvider } from "../hooks/useCarousel";

const PHASE_SCHEDULE = {
  globe:    { next: "text",     delay: 1000 },
  text:     { next: "carousel", delay: 3000 },
  carousel: { next: "complete", delay: 2800 },
};

const HomePage = () => {
  const [introPhase, setIntroPhase] = useState(() =>
    sessionStorage.getItem("carouselIndex") ? "complete" : "globe"
  );

  // activeModal: null | "about" | "contact" | { type: "project", slug: string }
  const [activeModal, setActiveModal] = useState(null);

  const openModal = useCallback((modal) => setActiveModal(modal), []);
  const closeModal = useCallback(() => setActiveModal(null), []);

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

  const modalSlug = activeModal?.type === "project" ? activeModal.slug : null;

  return (
    <>
      <HeroSection introPhase={introPhase} onOpenModal={openModal} />

      <CarouselProvider introPhase={introPhase} onOpenModal={openModal}>
        <InfiniteGrid />
        <CarouselNav />
      </CarouselProvider>

      <AnimatePresence mode="wait">
        {activeModal === "about" && (
          <AboutModal key="about" onClose={closeModal} />
        )}
        {activeModal === "contact" && (
          <ContactModal key="contact" onClose={closeModal} />
        )}
        {modalSlug && (
          <ProjectModal
            key={modalSlug}
            slug={modalSlug}
            onClose={closeModal}
            onOpenModal={openModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomePage;
