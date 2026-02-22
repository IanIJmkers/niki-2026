import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useMotionValue, useSpring, animate } from "framer-motion";
import { projects } from "../data/projects";

const CarouselContext = createContext(null);
const N = projects.length;

// Tuned for flat horizontal grid — softer springs, more damping
const SPRING = { stiffness: 100, damping: 30, mass: 0.5 };

export const CarouselProvider = ({ children, introPhase }) => {
  const getInitialPosition = () => {
    const saved = sessionStorage.getItem("carouselIndex");
    if (saved) {
      sessionStorage.removeItem("carouselIndex");
      return parseInt(saved, 10);
    }
    return 0;
  };

  const rawPosition = useMotionValue(getInitialPosition());
  const springPosition = useSpring(rawPosition, SPRING);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const unsub = springPosition.on("change", (v) => {
      setActiveIndex(((Math.round(v) % N) + N) % N);
    });
    return unsub;
  }, [springPosition]);

  const nudge = useCallback(
    (delta) => {
      if (introPhase !== "complete" || isAnimatingRef.current) return;
      rawPosition.set(rawPosition.get() + delta);

      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        animate(rawPosition, Math.round(rawPosition.get()), {
          type: "spring",
          ...SPRING,
        });
      }, 150);
    },
    [rawPosition, introPhase]
  );

  const goToCard = useCallback(
    (targetIndex) => {
      if (introPhase !== "complete" || isAnimatingRef.current) return;

      const target = ((targetIndex % N) + N) % N;
      const cur = rawPosition.get();
      const curMod = ((cur % N) + N) % N;

      let delta = target - curMod;
      if (delta > N / 2) delta -= N;
      if (delta < -N / 2) delta += N;

      isAnimatingRef.current = true;
      animate(rawPosition, cur + delta, {
        type: "spring",
        ...SPRING,
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
    },
    [rawPosition, introPhase]
  );

  useEffect(() => {
    return () => {
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, []);

  return (
    <CarouselContext.Provider
      value={{
        rawPosition,
        springPosition,
        activeIndex,
        goToCard,
        nudge,
        containerRef,
        N,
        introPhase,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
};

export const useCarousel = () => {
  const ctx = useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within CarouselProvider");
  return ctx;
};
