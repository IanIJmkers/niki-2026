export const easeOutQuart = [0.25, 1, 0.5, 1];
export const easeInOutQuart = [0.76, 0, 0.24, 1];
export const easeOutExpo = [0.16, 1, 0.3, 1];

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerChild = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutQuart },
  },
};

