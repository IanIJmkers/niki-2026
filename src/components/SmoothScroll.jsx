import { ReactLenis } from "lenis/react";

const SmoothScroll = ({ children }) => (
  <ReactLenis
    root
    options={{
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    }}
  >
    {children}
  </ReactLenis>
);

export default SmoothScroll;
