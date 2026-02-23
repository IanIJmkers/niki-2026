import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUp, X } from "lucide-react";
import { getProjectBySlug } from "../data/projects";
import { easeOutQuart } from "../animations/variants";
import Modal from "./Modal";
import { projectLayouts } from "./layouts";

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
  const Layout = projectLayouts[project.slug];

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

      {/* Gallery — per-project layout */}
      <Layout project={project} />

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
