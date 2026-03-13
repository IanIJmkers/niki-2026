import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const Sparkle = ({ color }) => (
  <motion.svg
    width="36"
    height="36"
    viewBox="0 0 100 100"
    fill={color}
    initial={{ scale: 0, rotate: 0 }}
    animate={{ scale: 1, rotate: 180 }}
    exit={{ scale: 0, rotate: 0 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <path d="M50 0 C52 38 62 48 100 50 C62 52 52 62 50 100 C48 62 38 52 0 50 C38 48 48 38 50 0Z" />
  </motion.svg>
);

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50, mass: 0.2 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50, mass: 0.2 });
  const ringX = useSpring(cursorX, { stiffness: 400, damping: 30, mass: 0.4 });
  const ringY = useSpring(cursorY, { stiffness: 400, damping: 30, mass: 0.4 });

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
      setIsDark(!!e.target.closest("[data-cursor-dark]"));
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

  const cursorColor = isDark ? "black" : "rgb(233, 229, 160)";

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* Dot — hidden when hovering */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div
          className={`w-[5px] h-[5px] rounded-full ${isDark ? "bg-black" : "bg-gold"}`}
        />
      </motion.div>

      {/* Ring — transforms into sparkle on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {isHovering ? (
            <motion.div
              key="sparkle"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkle color={cursorColor} />
            </motion.div>
          ) : (
            <motion.div
              key="ring"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={`w-[36px] h-[36px] rounded-full border ${isDark ? "border-black" : "border-gold"}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CustomCursor;
