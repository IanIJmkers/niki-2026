export const easeOutQuart = [0.25, 1, 0.5, 1];
export const easeInOutQuart = [0.76, 0, 0.24, 1];
export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutQuart },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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

export const textRevealContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.05 } },
};

export const textRevealChild = {
  initial: { y: "110%" },
  animate: {
    y: "0%",
    transition: { duration: 0.7, ease: easeInOutQuart },
  },
};

export const loaderExit = {
  exit: {
    y: "-100%",
    transition: { duration: 0.8, ease: easeInOutQuart },
  },
};
