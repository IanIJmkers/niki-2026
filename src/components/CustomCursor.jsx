import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const dotX = useSpring(cursorX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(cursorY, { stiffness: 500, damping: 28, mass: 0.5 });
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.8 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.8 });

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
          'a, button, [data-cursor="pointer"], input, textarea'
        )
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

  return (
    <>
      <style>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      {/* Dot */}
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

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 1.5 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className={`w-[36px] h-[36px] rounded-full border ${isDark ? "border-black" : "border-gold"}`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
