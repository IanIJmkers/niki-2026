import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Modal from "./Modal";
import useIsMobile from "../hooks/useIsMobile";

const SPRING = { stiffness: 120, damping: 30, mass: 0.8 };
const GOLD = "rgb(233, 229, 160)";

const AboutModal = ({ onClose }) => {
  const contentRef = useRef(null);
  const scrollRef = useRef(0);
  const isMobile = useIsMobile();

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
    if (isMobile) return;
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
  }, [rawProgress, isMobile]);

  return (
    <Modal onClose={onClose} title="About me" contentRef={contentRef} bg={GOLD}>
      {isMobile ? (
        <>
          {/* Mobile: heading + text together */}
          <div className="relative px-6 min-h-[75vh] flex flex-col justify-center mt-10">
            <motion.h1
              className="font-lunette text-[7.5rem] uppercase leading-none tracking-wide text-black/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
              Where strategy
              <br />
              becomes design
            </motion.h1>

            <motion.p
              className="text-sm text-black/60 leading-[1.8] tracking-wide  max-w-[720px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{
                duration: 2.5,
                delay: 0.4,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              — a Transformation Designer. I make things that make people pause,
              question, and look twice. Whether it's a fake lychee convincing
              enough to fool you at dinner, a sculptural spine that comments on
              our tech-dependent future, or a brand identity that actually feels
              like someone — my work sits at the intersection of concept, craft,
              and curiosity. I'm equally comfortable getting my hands dirty in a
              workshop as I am diving into philosophical rabbit holes or
              building a brand from scratch. If it involves material
              experimentation, spatial storytelling, or making the overlooked
              feel unmissable — I'm probably already interested.
            </motion.p>
          </div>

          {/* Mobile: logo and photo below */}
          <div className="px-6 pb-12">
            <motion.img
              className="relative mt-4 w-[40%] "
              src="/images/niki-logo-text-black.webp"
              alt="Nikoletta"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
            />

            <motion.img
              className="relative -mt-2 w-32 ml-10 rounded-lg object-contain"
              src="/images/about.webp"
              alt="Nikoletta Kalmar"
              loading="lazy"
              decoding="async"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          </div>
        </>
      ) : (
        /* Desktop: wheel-driven scroll animation */
        <div className="relative px-6 md:px-12 lg:px-16 overflow-hidden min-h-[80vh] flex flex-col items-start justify-center pt-40">
          <motion.h1
            className="font-lunette text-[7rem] md:text-[9rem] lg:text-[11rem] uppercase leading-none tracking-wide text-black/90 -mb-6 md:-mb-10 relative z-20 mx-auto"
            style={{ y: h1Y }}
          >
            Where strategy
            <br />
            becomes design
          </motion.h1>

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
              workshop as I am diving into philosophical rabbit holes or
              building a brand from scratch. If it involves material
              experimentation, spatial storytelling, or making the overlooked
              feel unmissable — I'm probably already interested.
            </p>
          </motion.div>

          <motion.img
            className="relative z-50 mt-60 -ml-4 md:-ml-6 w-[40%] md:w-[35%] mx-auto"
            src="/images/niki-logo-text-black.webp"
            alt="Nikoletta"
            style={{ y: logoY }}
          />

          <motion.img
            className="relative z-40 -mt-3 md:-mt-6 ml-0 md:ml-5 w-32 md:w-40 rounded-lg object-contain mx-auto"
            src="/images/about.webp"
            alt="Nikoletta Kalmar"
            loading="lazy"
            decoding="async"
            style={{ y: photoY }}
          />
        </div>
      )}
    </Modal>
  );
};

export default AboutModal;
