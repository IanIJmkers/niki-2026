import { useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { easeOutQuart } from "../animations/variants";
import Modal from "./Modal";
import useIsMobile from "../hooks/useIsMobile";

const PINK = "#F8C8DC";
const CIRCLE_R = 420;
const CIRCLE_CX = 500;
const CIRCLE_CY = 500;

const circlePath = `M ${CIRCLE_CX},${CIRCLE_CY - CIRCLE_R} a ${CIRCLE_R},${CIRCLE_R} 0 1,1 0,${CIRCLE_R * 2} a ${CIRCLE_R},${CIRCLE_R} 0 1,1 0,-${CIRCLE_R * 2}`;

const baseText = "CONTACT ME! ";
const repeatedRaw = baseText.repeat(6);
const repeatedParts = repeatedRaw.split(/(!)/).map((part, i) =>
  part === "!" ? (
    <tspan
      key={i}
      style={{
        fontFamily:
          "'Didot', 'Bodoni MT', 'Playfair Display', 'Times New Roman', serif",
      }}
    >
      !
    </tspan>
  ) : (
    part
  ),
);

const BASE_SPEED = 0.08; // degrees per frame — fast continuous spin
const WHEEL_BOOST = 0.4; // extra degrees per pixel of wheel delta

const fade = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay, ease: easeOutQuart },
});

const ContactModal = ({ onClose }) => {
  const contentRef = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const velocityRef = useRef(BASE_SPEED);
  const isMobile = useIsMobile();

  const rawRotate = useMotionValue(0);
  const rotate = useSpring(rawRotate, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    const el = contentRef.current;

    const onWheel = (e) => {
      e.preventDefault();
      // Scroll down → spin backwards, scroll up → spin forwards
      velocityRef.current += -e.deltaY * WHEEL_BOOST * 0.01;
    };

    if (el && !isMobile) {
      el.addEventListener("wheel", onWheel, { passive: false });
    }

    const tick = () => {
      // Gradually decay velocity back towards BASE_SPEED
      velocityRef.current += (BASE_SPEED - velocityRef.current) * 0.02;

      angleRef.current += velocityRef.current;
      rawRotate.set(angleRef.current);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (el) el.removeEventListener("wheel", onWheel);
    };
  }, [rawRotate, isMobile]);

  return (
    <Modal
      onClose={onClose}
      title="Contact Me"
      contentRef={contentRef}
      bg={PINK}
    >
      {isMobile ? (
        /* Mobile layout — stacked, circle overflows */
        <div className="relative min-h-[80vh] overflow-x-clip overflow-y-visible">
          {/* Rotating circle — large, bleeds out of modal */}
          <motion.svg
            viewBox="0 0 1000 1000"
            className="absolute -right-[80%] -top-[10%] w-[180vw] h-[180vw] pointer-events-none"
            style={{ rotate }}
          >
            <defs>
              <path id="contactCircle" d={circlePath} />
            </defs>
            <text
              className="font-lunette"
              fill="rgba(0,0,0,0.48)"
              fontSize="86"
              letterSpacing="8"
              textAnchor="start"
            >
              <textPath href="#contactCircle">{repeatedParts}</textPath>
            </text>
          </motion.svg>

          {/* Content — stacked vertically */}
          <div className="relative z-10 px-6 pt-22 pb-12">
            <motion.p
              className="font-body uppercase text-[17px] leading-relaxed tracking-[1px] text-black/50 font-light mb-10 text-right"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              For any enquiry or
              <br />
              just to say hello
              <br />
              reach out here!
            </motion.p>

            <motion.div
              className="grid grid-cols-1 gap-6 text-right mt-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Name
                </p>
                <p className="text-[12px] tracking-[1px] text-black/60">
                  Nikoletta Kalmar
                </p>
                <p className="text-[12px] tracking-[1px] text-black/60 mt-1">
                  (Niki)
                </p>
              </div>
              <motion.div
                className="w-[50%] h-px bg-black/10  ml-auto"
                {...fade(0.2)}
              />

              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Info
                </p>
                <a
                  href="mailto:nikoletta.k.d@gmail.com"
                  className="block text-[12px] tracking-[1px] text-black/60"
                  data-cursor="pointer"
                >
                  nikoletta.k.d@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/nikoletta-kalmar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[12px] tracking-[1px] text-black/60 mt-1"
                  data-cursor="pointer"
                >
                  @nikoletta-kalmar
                </a>
              </div>
              <motion.div
                className="w-[50%] h-px bg-black/10  ml-auto"
                {...fade(0.35)}
              />
              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Location
                </p>
                <p className="text-[12px] tracking-[1px] text-black/60">
                  The Hague
                </p>
                <p className="text-[12px] tracking-[1px] text-black/60 mt-1">
                  Netherlands
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Desktop layout — original */
        <div className="relative h-full min-h-[80vh] flex items-center justify-end">
          <motion.svg
            viewBox="0 0 1000 1000"
            className="absolute -right-[15%] top-1/2 -translate-y-1/2 w-275 h-275 pointer-events-none"
            style={{ rotate }}
          >
            <defs>
              <path id="contactCircle" d={circlePath} />
            </defs>
            <text
              className="font-lunette"
              fill="rgba(0,0,0,0.48)"
              fontSize="72"
              letterSpacing="8"
              textAnchor="start"
            >
              <textPath href="#contactCircle">{repeatedParts}</textPath>
            </text>
          </motion.svg>

          <motion.p
            className="absolute top-26 right-28 lg:right-29.5 z-10 font-body text-[20px] leading-relaxed tracking-[1px] text-black/50 max-w-xs text-right font-light"
            {...fade(0.1)}
          >
            For any enquiry or just to say hello reach out here!
          </motion.p>

          <div className="relative z-10 w-full max-w-xl mr-28 lg:mr-30 text-right">
            <motion.div
              className="w-full h-px bg-black/10 mb-8"
              {...fade(0.2)}
            />

            <motion.div
              className="grid grid-cols-3 gap-20 w-full text-left"
              {...fade(0.3)}
            >
              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Name
                </p>
                <p className="text-[11px] tracking-[1px] text-black/60">
                  Nikoletta Kalmar
                </p>
                <p className="text-[11px] tracking-[1px] text-black/60 mt-1">
                  (Niki)
                </p>
              </div>

              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Info
                </p>
                <a
                  href="mailto:nikoletta.k.d@gmail.com"
                  className="block text-[11px] tracking-[1px] text-black/60 hover:text-black hover:italic hover:font-bold transition-colors"
                  data-cursor="pointer"
                >
                  nikoletta.k.d@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/nikoletta-kalmar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-[11px] tracking-[1px] text-black/60 hover:text-black hover:italic hover:font-bold transition-colors mt-1"
                  data-cursor="pointer"
                >
                  @nikoletta-kalmar
                </a>
              </div>

              <div className="whitespace-nowrap">
                <p className="text-[8px] tracking-[3px] uppercase text-black/30 mb-3">
                  Location
                </p>
                <p className="text-[11px] tracking-[1px] text-black/60">
                  The Hague
                </p>
                <p className="text-[11px] tracking-[1px] text-black/60 mt-1">
                  Netherlands
                </p>
              </div>
            </motion.div>

            <motion.div
              className="w-full h-px bg-black/10 mt-8"
              {...fade(0.35)}
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ContactModal;
