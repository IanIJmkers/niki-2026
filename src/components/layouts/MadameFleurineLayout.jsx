import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const MadameFleurineLayout = ({ project }) => {
  const [img1, img2, img3, img4, img5] = project.gallery;

  return (
    <>
      {/* Row 1 — full-width image 1 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-20 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia
          item={img1}
          alt={`${project.title} — 1`}
          loading="eager"
        />
      </motion.div>

      {/* Row 2 — full-width image 2 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-2 md:mt-3 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia
          item={img2}
          alt={`${project.title} — 2`}
          loading="eager"
        />
      </motion.div>

      {/* Row 2 — full-width image 3 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-2 md:mt-3 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia
          item={img3}
          alt={`${project.title} — 3`}
          loading="lazy"
        />
      </motion.div>

      {/* Description */}
      {project.description && (
        <motion.p
          className="px-3 md:px-1 lg:px-1 mt-25 mb-25 text-[11px] md:text-[16px] leading-relaxed text-black/50 max-w-2xl text-center mx-auto italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          {project.description}
        </motion.p>
      )}

      {/* Row 3 — full-width image 4 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia
          item={img4}
          alt={`${project.title} — 4`}
          loading="lazy"
        />
      </motion.div>

      {/* Row 4 — full-width image 5 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-2 md:mt-3 overflow-hidden mb-15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia
          item={img5}
          alt={`${project.title} — 5`}
          loading="lazy"
        />
      </motion.div>
    </>
  );
};

export default MadameFleurineLayout;
