import { useEffect, useCallback, useRef } from "react";
import { useCarousel } from "../hooks/useCarousel";
import { projects } from "../data/projects";
import GridCard from "./GridCard";

const InfiniteGrid = () => {
  const { nudge, goToCard, activeIndex, containerRef, introPhase } = useCarousel();
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchStartPos = useRef(0);
  const isHorizontalSwipe = useRef(null);

  // Wheel: vertical scroll drives horizontal navigation (infinite loop)
  const handleWheel = useCallback(
    (e) => {
      e.preventDefault();
      const delta =
        Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      nudge(delta / 500);
    },
    [nudge]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchStartPos.current = 0;
    isHorizontalSwipe.current = null;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const dx = e.touches[0].clientX - touchStartX.current;
      const dy = e.touches[0].clientY - touchStartY.current;

      if (
        isHorizontalSwipe.current === null &&
        (Math.abs(dx) > 5 || Math.abs(dy) > 5)
      ) {
        isHorizontalSwipe.current = Math.abs(dx) >= Math.abs(dy);
      }

      if (isHorizontalSwipe.current) {
        e.preventDefault();
        const swipeDelta = dx / (window.innerWidth * 0.4);
        const moveDelta = -swipeDelta - touchStartPos.current;
        touchStartPos.current = -swipeDelta;
        nudge(moveDelta);
      }
    },
    [nudge]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, containerRef]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToCard(activeIndex + 1);
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToCard(activeIndex - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goToCard]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-10"
      style={{ pointerEvents: introPhase === "complete" ? "auto" : "none" }}
      aria-roledescription="carousel"
      aria-label="Portfolio grid"
    >
      {projects.map((project, i) => (
        <GridCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
};

export default InfiniteGrid;
