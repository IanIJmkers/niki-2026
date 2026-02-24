import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const The3rdSpaceLayout = ({ project }) => {
  const [img1, img2, img3, img4] = project.gallery;

  return (
    <>
      {/* third-1 — hero, center stage */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-16 overflow-hidden"
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

      {/* Description */}
      {project.description && (
        <motion.p
          className="px-3 md:px-1 lg:px-1 mt-30 mb-30 text-[11px] md:text-[16px] leading-relaxed text-black/50 max-w-2xl text-center mx-auto italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          {project.description}
        </motion.p>
      )}

      {/* third-2 — full width */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-10 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img2} alt={`${project.title} — 2`} loading="lazy" />
      </motion.div>

      {/* third-3 */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-50 overflow-hidden mb-15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <div className="overflow-hidden">
          <div>
            <GalleryMedia
              item={img3}
              alt={`${project.title} — 3`}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      {/* third-4
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-40 overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img4} alt={`${project.title} — 4`} loading="lazy" />
      </motion.div> */}
    </>
  );
};

export default The3rdSpaceLayout;
