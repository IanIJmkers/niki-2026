import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Modal from "./Modal";

const SPRING = { stiffness: 120, damping: 30, mass: 0.8 };
const GOLD = "rgb(233, 229, 160)";

const AboutModal = ({ onClose }) => {
  const contentRef = useRef(null);
  const scrollRef = useRef(0);

  // 0 → 1 progress driven by wheel
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, SPRING);

  // h1 moves up
  const h1Y = useTransform(progress, [0, 0.5], [0, -350]);
  // About text scrolls out the top of the modal
  const textY = useTransform(progress, [0.05, 1], [0, -550]);
  // Logo starts much later — clear delay after text
  const logoY = useTransform(progress, [0.05, 1], [0, -750]);
  // Photo starts even later
  const photoY = useTransform(progress, [0.05, 1], [0, -750]);
  // About text padding shrinks from pt-50 (200px) → pt-10 (40px)
  const textPadding = useTransform(progress, [0, 0.3], [200, 40]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      scrollRef.current = Math.max(
        0,
        Math.min(scrollRef.current + e.deltaY * 0.003, 1),
      );
      rawProgress.set(scrollRef.current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [rawProgress]);

  return (
    <Modal
      onClose={onClose}
      title="About — Nikoletta Kalmar"
      contentRef={contentRef}
      bg={GOLD}
    >
      <div className="relative px-6 md:px-12 lg:px-16 overflow-hidden min-h-[80vh] flex flex-col items-start justify-center pt-40">
        {/* Statement header — scrolls up partially */}
        <motion.h1
          className="font-lunette text-[7rem] md:text-[9rem] lg:text-[11rem] uppercase leading-none tracking-wide text-black/90 -mb-6 md:-mb-10 relative z-20 mx-auto"
          style={{ y: h1Y }}
        >
          Where strategy
          <br />
          becomes design
        </motion.h1>

        {/* About text */}
        <motion.div
          className="max-w-[720px] relative z-10 mx-auto"
          style={{ y: textY, paddingTop: textPadding }}
        >
          <p className="text-sm md:text-base text-black/60 leading-[1.8] tracking-wide">
            — a Transformation Designer. I make things that make people pause,
            question, and look twice. Whether it's a fake lychee convincing
            enough to fool you at dinner, a sculptural spine that comments on
            our tech-dependent future, or a brand identity that actually feels
            like someone — my work sits at the intersection of concept, craft,
            and curiosity. I'm equally comfortable getting my hands dirty in a
            workshop as I am diving into philosophical rabbit holes or building
            a brand from scratch. If it involves material experimentation,
            spatial storytelling, or making the overlooked feel unmissable — I'm
            probably already interested.
          </p>
        </motion.div>

        {/* Niki logo — scrolls up over text, stacks on h1 */}
        <motion.img
          className="relative z-50 mt-60 -ml-4 md:-ml-6 w-[40%] md:w-[35%] mx-auto"
          src="/images/niki-logo-text-black.webp"
          alt="Nikoletta"
          style={{ y: logoY }}
        />

        {/* Photo — scrolls up the most, stacks on logo */}
        <motion.img
          className="relative z-40 -mt-3 md:-mt-6 ml-0 md:ml-5 w-32 md:w-40 rounded-lg object-contain mx-auto"
          src="/images/about.webp"
          alt="Nikoletta Kalmar"
          loading="lazy"
          decoding="async"
          style={{ y: photoY }}
        />
      </div>
    </Modal>
  );
};

export default AboutModal;
