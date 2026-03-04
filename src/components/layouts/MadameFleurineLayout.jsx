import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const MadameFleurineLayout = ({ project }) => {
  const [img1, img2] = project.gallery;

  return (
    <>
      {/* Description — top intro */}
      {project.description && (
        <motion.p
          className="px-3 md:px-1 lg:px-1 mt-25 text-[11px] md:text-[16px] leading-relaxed text-black/50 max-w-2xl text-center mx-auto italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          {project.description}
        </motion.p>
      )}

      {/* First image */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 overflow-hidden"
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

      {/* Second image */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-25 overflow-hidden mb-15"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: easeOutQuart }}
      >
        <GalleryMedia item={img2} alt={`${project.title} — 2`} loading="lazy" />
      </motion.div>
    </>
  );
};

export default MadameFleurineLayout;
