import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const x = useSpring(cursorX, { stiffness: 800, damping: 40, mass: 0.2 });
  const y = useSpring(cursorY, { stiffness: 800, damping: 40, mass: 0.2 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };
    const onLeave = () => setIsVisible(false);
    const onEnter = () => setIsVisible(true);
    const onOver = (e) => {
      setIsHovering(
        !!e.target.closest(
          'a, button, [data-cursor="pointer"], input, textarea',
        ),
      );
      const forceLight = !!e.target.closest("[data-cursor-light]");
      setIsDark(!forceLight && !!e.target.closest("[data-cursor-dark]"));
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseover", onOver);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY]);

  if (isTouchDevice) return null;

  // On dark backgrounds: show as-is (black sparkle). On light: invert + tint gold.
  const filterNormal = isDark
    ? "none"
    : "invert(88%) sepia(30%) saturate(400%) hue-rotate(10deg) brightness(1.05)";

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <AnimatePresence mode="wait">
          {isHovering ? (
            <motion.div
              key="hover"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 180 }}
              exit={{ scale: 0, rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.img
                src="/images/sparkle.png"
                alt=""
                className="w-12 h-12"
                style={{ filter: filterNormal }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ) : (
            <motion.img
              key="default"
              src="/images/sparkle.png"
              alt=""
              className="w-10 h-10"
              style={{ filter: filterNormal }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
