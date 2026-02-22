import { useLenis } from "lenis/react";

export const useSmoothScroll = () => {
  const lenis = useLenis();

  const scrollTo = (target, options = {}) => {
    if (lenis) {
      lenis.scrollTo(target, {
        offset: 0,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        ...options,
      });
    }
  };

  return { lenis, scrollTo };
};
