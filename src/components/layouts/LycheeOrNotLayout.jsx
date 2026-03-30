import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, delay, ease: easeOutQuart },
});

const LycheeOrNotLayout = ({ project }) => {
  const [img1, ...rest] = project.gallery;

  return (
    <>
      {/* First image */}
      <motion.div
        className="px-5 md:px-20 lg:px-30 mt-6 md:mt-20 overflow-hidden"
        {...anim()}
      >
        <GalleryMedia
          item={img1}
          alt={`${project.title} — 1`}
          loading="eager"
        />
      </motion.div>

      {/* Description — after first image */}
      {project.description && (
        <motion.p
          className="px-5 md:px-20 lg:px-45 mb-10 mt-10 md:mb-22 md:mt-22 text-[11px] md:text-[16px] leading-relaxed text-black/50 text-justify italic"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOutQuart }}
        >
          {project.description}
        </motion.p>
      )}

      {/* Remaining images */}
      {rest.map((img, i) => {
        const isImg14 = i === rest.length - 3;
        const isLastTwo = i >= rest.length - 2;
        return (
          <motion.div
            key={img.id}
            className={`px-5 md:px-20 lg:px-30 -mb-4 md:-mb-10 overflow-hidden ${isImg14 ? "mt-5 mx-3.5 md:mt-9 md:mx-9 mb-1" : isLastTwo ? "mt-5 mx-3.5 mb-4 md:mt-20 md:mx-9" : ""}`}
            {...anim()}
          >
            <GalleryMedia
              item={img}
              alt={`${project.title} — ${i + 2}`}
              loading="lazy"
            />
          </motion.div>
        );
      })}
    </>
  );
};

export default LycheeOrNotLayout;
