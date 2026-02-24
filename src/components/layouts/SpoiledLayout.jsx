import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const SpoiledLayout = ({ project }) => {
  const [img1, img2, img3, img4, img5, img6] = project.gallery;

  return (
    <>
      {/* Hero — full width */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-16 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        {/* <GalleryMedia
          item={img1}
          alt={`${project.title} — 1`}
          loading="eager"
        /> */}
      </motion.div>

      {/* spoiled-1 & spoiled-2 — side by side */}
      <div className="px-5 md:px-20 lg:px-30 mt-16 flex flex-col md:flex-row gap-2 md:gap-3">
        <motion.div
          className="overflow-hidden md:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeOutQuart }}
        >
          <GalleryMedia
            item={img2}
            alt={`${project.title} — 2`}
            loading="lazy"
          />
        </motion.div>
        <motion.div
          className="overflow-hidden md:w-1/2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: easeOutQuart }}
        >
          <GalleryMedia
            item={img3}
            alt={`${project.title} — 3`}
            loading="lazy"
          />
        </motion.div>
      </div>

      {/* spoiled-3 — full width */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-50 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img4} alt={`${project.title} — 4`} loading="lazy" />
      </motion.div>

      {/* spoiled-4 — full width */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-50 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img5} alt={`${project.title} — 5`} loading="lazy" />
      </motion.div>

      {/* spoiled-5 — full width */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-50 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img6} alt={`${project.title} — 6`} loading="lazy" />
      </motion.div>

      {/* Description */}
      {project.description && (
        <motion.p
          className="px-3 md:px-1 lg:px-1 mt-30 mb-15 text-[11px] md:text-[16px] leading-relaxed text-black/50 max-w-2xl text-center mx-auto italic"
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
