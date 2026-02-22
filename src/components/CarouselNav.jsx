import { motion } from "framer-motion";
import { useCarousel } from "../hooks/useCarousel";
import { projects } from "../data/projects";

const CarouselNav = () => {
  const { activeIndex, goToCard, introPhase } = useCarousel();

  const showNav = introPhase === "carousel" || introPhase === "complete";

  return (
    <motion.nav
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 md:gap-4"
      aria-label="Portfolio navigation"
      initial={{ opacity: introPhase === "complete" ? 1 : 0 }}
      animate={{ opacity: showNav ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {projects.map((project, i) => (
        <button
          key={project.id}
          onClick={() => goToCard(i)}
          className="group flex flex-col items-center gap-1.5 p-1"
          aria-label={`Go to ${project.title}`}
          aria-current={activeIndex === i ? "true" : undefined}
        >
          <motion.div
            className="h-px rounded-full"
            animate={{
              width: activeIndex === i ? 24 : 16,
              backgroundColor:
                activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.3)",
            }}
            transition={{ duration: 0.3 }}
          />
          <span className="text-[6px] md:text-[7px] tracking-[1.5px] uppercase text-transparent group-hover:text-white/70 transition-colors duration-300 whitespace-nowrap">
            {project.title}
          </span>
        </button>
      ))}
    </motion.nav>
  );
};

export default CarouselNav;
