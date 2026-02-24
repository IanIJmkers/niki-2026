import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const SpinalFractureLayout = ({ project }) => (
  <>
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
    <div className="px-5 md:px-20 lg:px-30 pb-0 flex flex-col gap-4 md:gap-50">
      {project.gallery.map((item, idx) => (
        <motion.div
          key={item.id}
          className="overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: idx * 0.05,
            ease: easeOutQuart,
          }}
        >
          <GalleryMedia
            item={item}
            alt={`${project.title} — ${idx + 1}`}
            loading={idx === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}
    </div>
  </>
);

export default SpinalFractureLayout;
