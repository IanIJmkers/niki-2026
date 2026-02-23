import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProjectBySlug, getNextProject } from "../data/projects";
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
  const project = getProjectBySlug(slug);
  const nextProject = project ? getNextProject(project.id) : null;

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

  return (
    <Modal onClose={onClose} title={project.title}>
      {hasDescription ? (
        <>
          {/* Centered title */}
          <div className="text-center pt-12 md:pt-16 pb-2">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-normal capitalize text-black leading-tight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeOutQuart }}
            >
              {project.title}
            </motion.h1>
          </div>

          {/* Description */}
          <div className="text-center px-10 md:px-20 lg:px-28 pt-6 pb-10 md:pt-8 md:pb-14">
            <motion.p
              className="text-[11px] md:text-xs leading-relaxed text-black/50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: easeOutQuart }}
            >
              {project.description}
            </motion.p>
          </div>

          {/* Stacked gallery with rounded images */}
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
        </>
      ) : (
        <>
          {/* Project info */}
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
          </div>

          {/* Gallery — 1/2/1/2 on desktop, stacked on mobile */}
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
        </>
      )}

      {/* Next project footer */}
      {nextProject && (
        <div className="mt-2 md:mt-3 border-t border-black/10">
          <button
            onClick={() =>
              onOpenModal({ type: "project", slug: nextProject.slug })
            }
            className="w-full text-left px-5 md:px-10 lg:px-14 py-10 md:py-14 hover:bg-black/5 transition-colors duration-500"
            data-cursor="pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-3">
                  Next Project
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-normal uppercase tracking-[2px] text-black">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-[10px] text-black/40 tracking-[1px]">
                  {nextProject.subtitle}
                </p>
              </div>
              <ArrowRight size={20} strokeWidth={1} className="text-black/40" />
            </div>
          </button>
        </div>
      )}
    </Modal>
  );
};

export default ProjectModal;
