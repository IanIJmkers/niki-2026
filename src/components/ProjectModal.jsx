import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProjectBySlug, getNextProject } from "../data/projects";
import { easeOutQuart, staggerContainer, staggerChild } from "../animations/variants";
import Modal from "./Modal";

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

  return (
    <Modal onClose={onClose} title={project.title}>
      {/* Hero image */}
      <div className="px-6 md:px-12 lg:px-16 pt-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: easeOutQuart }}
        >
          <div className="w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              decoding="async"
              className="w-full aspect-[16/10] object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Project info */}
      <motion.div
        className="px-6 md:px-12 lg:px-16 py-10 md:py-14"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.p
          className="text-[9px] tracking-[3px] uppercase text-black/40 mb-4"
          variants={staggerChild}
        >
          {project.subtitle}
        </motion.p>
        <motion.h1
          className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[2px] text-black mb-3 leading-tight"
          variants={staggerChild}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className="text-[10px] text-black/40 tracking-[1px]"
          variants={staggerChild}
        >
          {project.date}
        </motion.p>
      </motion.div>

      {/* Gallery */}
      <div className="px-6 md:px-12 lg:px-16 pb-14 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {project.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className={`overflow-hidden ${
                index === 0 && project.gallery.length > 2 ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.08,
                ease: easeOutQuart,
              }}
            >
              <img
                src={item.src}
                alt={`${project.title} — ${index + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Next project */}
      {nextProject && (
        <div className="border-t border-black/10">
          <button
            onClick={() => onOpenModal({ type: "project", slug: nextProject.slug })}
            className="w-full text-left px-6 md:px-12 lg:px-16 py-14 md:py-20 hover:bg-black/5 transition-colors duration-500"
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
