import { useState, useEffect } from "react";
import { motion, useTransform } from "framer-motion";
import { useCarousel } from "../hooks/useCarousel";

const GAP_VW = 2;
const CARD_SLIDE_OFFSET_VW = -60;
const CARD_STAGGER_DELAY = 0.12;

const GridCard = ({ project, index }) => {
  const { springPosition, N, introPhase, onOpenModal } = useCarousel();
  const [isHovered, setIsHovered] = useState(false);
  const [cardWidthVW, setCardWidthVW] = useState(30);

  // Responsive card width
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setCardWidthVW(w < 768 ? 58 : w < 1024 ? 40 : 26);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const strideVW = cardWidthVW + GAP_VW;

  // Infinite wrapping: maps position to offset in [-N/2, N/2]
  // This is what makes the loop seamless — cards wrap to the other side
  const offset = useTransform(springPosition, (pos) => {
    const raw = index - pos;
    return (((raw % N) + N + N / 2) % N) - N / 2;
  });

  // Flat linear positioning — each offset unit = one card stride apart
  const x = useTransform(offset, (o) => `calc(-50% + ${o * strideVW}vw)`);

  const handleClick = () => {
    onOpenModal({ type: "project", slug: project.slug });
  };

  const isCarouselPhase = introPhase === "carousel" || introPhase === "complete";
  const skipAnimation = introPhase === "complete";

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 will-change-transform"
      style={{ x, y: "-50%" }}
    >
      {/* Intro slide-in wrapper */}
      <motion.div
        initial={
          skipAnimation
            ? { x: 0, opacity: 1 }
            : { x: `${CARD_SLIDE_OFFSET_VW}vw`, opacity: 0 }
        }
        animate={
          isCarouselPhase
            ? { x: 0, opacity: 1 }
            : { x: `${CARD_SLIDE_OFFSET_VW}vw`, opacity: 0 }
        }
        transition={
          skipAnimation
            ? { duration: 0 }
            : { duration: 1.8, delay: index * CARD_STAGGER_DELAY, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {/* Image container */}
        <div
          className="overflow-hidden relative cursor-pointer"
          style={{ width: `${cardWidthVW}vw`, aspectRatio: "540 / 700" }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          data-cursor="pointer"
          role="link"
          tabIndex={0}
          aria-label={`View project: ${project.title}`}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover absolute inset-0"
          />
          <motion.img
            src={project.hoverImage}
            alt={`${project.title} alternate`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover absolute inset-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Title + date */}
        <div className="mt-3 cursor-pointer" onClick={handleClick} data-cursor="pointer">
          <p className="text-[11px] md:text-xs tracking-[2px] uppercase text-white/90 font-light">
            {project.title}
          </p>
          <p className="mt-1 text-[9px] md:text-[10px] tracking-[1px] text-white/50">
            {project.date}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GridCard;
