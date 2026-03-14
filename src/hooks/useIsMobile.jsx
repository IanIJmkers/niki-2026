import { useState, useEffect } from "react";

const getIsMobile = () =>
  window.innerWidth < 768 ||
  window.matchMedia("(pointer: coarse)").matches;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const update = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
};

export default useIsMobile;
