import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import { easeOutQuart } from "../animations/variants";
import Modal from "./Modal";

/* Layout pattern: 1 full → 2 side-by-side → repeat */
const buildRows = (images) => {
  const rows = [];
  let i = 0;
  let full = true;
  while (i < images.length) {
    if (full || i + 1 >= images.length) {
      rows.push([images[i]]);
      i += 1;
    } else {
      rows.push([images[i], images[i + 1]]);
      i += 2;
    }
    full = !full;
  }
  return rows;
};

const ProjectModal = ({ slug, onClose, onOpenModal }) => {
  const topRef = useRef(null);
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <Modal onClose={onClose} title="Not found">
        <div className="flex items-center justify-center py-24">
          <p className="text-black/40 text-sm">Project not found.</p>
        </div>
      </Modal>
    );
  }
  const hasDescription = !!project.description;
  const rows = hasDescription ? null : buildRows(project.gallery);

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <Modal onClose={onClose} title={project.title}>
      <div ref={topRef} />

      {/* Project info — shared across all projects */}
      <div className="px-5 md:px-10 lg:px-14 pt-8 pb-6 md:pt-10 md:pb-8">
        <motion.p
          className="text-[9px] tracking-[3px] uppercase text-black/40 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOutQuart }}
        >
          {project.subtitle}
        </motion.p>
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[2px] text-black mb-2 leading-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: easeOutQuart }}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className="text-[10px] text-black/40 tracking-[1px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: easeOutQuart }}
        >
          {project.date}
        </motion.p>
        {project.description && (
          <motion.p
            className="mt-16 mb-10 text-[11px] md:text-xs leading-relaxed text-black/50 max-w-2xl text-center mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: easeOutQuart }}
          >
            {project.description}
          </motion.p>
        )}
      </div>

      {/* Gallery */}
      {hasDescription ? (
        <div className="px-5 md:px-20 lg:px-30 pb-0 flex flex-col gap-4 md:gap-18">
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
              <img
                src={item.src}
                alt={`${project.title} — ${idx + 1}`}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="px-5 md:px-10 lg:px-14 pb-0 flex flex-col gap-2 md:gap-3">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`flex flex-col ${row.length === 2 ? "md:flex-row" : ""} gap-2 md:gap-3`}
            >
              {row.map((item, colIdx) => (
                <motion.div
                  key={item.id}
                  className={`overflow-hidden ${row.length === 2 ? "md:w-1/2" : "w-full"}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.6,
                    delay: colIdx * 0.08,
                    ease: easeOutQuart,
                  }}
                >
                  <img
                    src={item.src}
                    alt={`${project.title} — ${rowIdx * 2 + colIdx + 1}`}
                    loading={rowIdx === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-center gap-6 py-8 md:py-12">
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-black/30 hover:text-black/60 transition-colors"
          data-cursor="pointer"
        >
          <ArrowUp size={12} strokeWidth={1.5} />
          Top
        </button>
        <span> </span>
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-black/30 hover:text-black/60 transition-colors"
          data-cursor="pointer"
        >
          Close
          <X size={12} strokeWidth={1.5} />
        </button>
      </div>
    </Modal>
  );
};

export default ProjectModal;
