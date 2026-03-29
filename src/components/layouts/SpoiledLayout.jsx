import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: easeOutQuart },
});

const SpoiledLayout = ({ project }) => {
  const [img1, img2, img3, img4, img5, img6] = project.gallery;

  return (
    <>
      {/* Row 1 — glitchy red (img3) + text page (img2) side by side */}
      <div className="px-5 md:px-20 lg:px-30 mt-6 flex flex-col md:flex-row gap-10">
        <motion.div className=" overflow-hidden md:w-1/2" {...anim()}>
          <GalleryMedia
            item={img3}
            alt={`${project.title} — 1`}
            loading="eager"
          />
        </motion.div>
        <motion.div className=" overflow-hidden md:w-1/2" {...anim(0.08)}>
          <GalleryMedia
            item={img2}
            alt={`${project.title} — 2`}
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Row 2 — SPOILED cover (narrower, centered) */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-12 md:mt-40 flex justify-center"
        {...anim()}
      >
        <GalleryMedia item={img4} alt={`${project.title} — 3`} loading="lazy" />
      </motion.div>

      {/* Row 3 — 4 exhibits composite (full width) */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-12 md:mt-40  overflow-hidden"
        {...anim()}
      >
        <GalleryMedia item={img5} alt={`${project.title} — 4`} loading="lazy" />
      </motion.div>

      {/* Row 4 — publication spread (full width) */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-12 md:mt-40  overflow-hidden"
        {...anim()}
      >
        <GalleryMedia item={img6} alt={`${project.title} — 5`} loading="lazy" />
      </motion.div>

      {/* Description */}
      {project.description && (
        <motion.p
          className="px-3 md:px-1 lg:px-1 mt-10 md:mt-30 mb-12 text-[11px] md:text-[16px] leading-relaxed text-black/50 max-w-2xl text-center mx-auto italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          {project.description}
        </motion.p>
      )}
    </>
  );
};

export default SpoiledLayout;
