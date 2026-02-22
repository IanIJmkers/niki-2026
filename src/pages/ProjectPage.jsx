import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getProjectBySlug, getNextProject } from "../data/projects";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import {
  staggerContainer,
  staggerChild,
  easeOutQuart,
} from "../animations/variants";

const ProjectPage = () => {
  const { slug } = useParams();
  const { lenis } = useSmoothScroll();
  const project = getProjectBySlug(slug);
  const nextProject = project ? getNextProject(project.id) : null;

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [slug, lenis]);

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-mid text-sm">Project not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-off-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: easeOutQuart }}
    >
      {/* Top nav */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-off-white/80 backdrop-blur-md border-b border-gray-border">
        <div className="flex justify-between items-center px-5 md:px-8 lg:px-12 py-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-[9px] tracking-[2px] uppercase text-black hover:opacity-40 transition-opacity"
            data-cursor="pointer"
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            Back
          </Link>
          <span className="text-base font-gloved tracking-[3px] text-black">
            Nikoletta Kalmar
          </span>
          <div className="w-12" />
        </div>
      </nav>

      {/* Hero image */}
      <div className="pt-16 md:pt-20">
        <motion.div
          className="w-full px-5 md:px-8 lg:px-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutQuart }}
        >
          <div className="w-full max-w-[1200px] mx-auto overflow-hidden">
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
        className="px-5 md:px-8 lg:px-16 py-10 md:py-16 max-w-[1200px] mx-auto"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          className="text-xl md:text-2xl lg:text-3xl font-normal uppercase tracking-[2px] text-black mb-3"
          variants={staggerChild}
        >
          {project.title}
        </motion.h1>
        <motion.p
          className="text-[10px] md:text-xs text-gray-mid tracking-[1px] mb-2"
          variants={staggerChild}
        >
          {project.subtitle}
        </motion.p>
        <motion.p
          className="text-[10px] text-gray-mid tracking-[1px]"
          variants={staggerChild}
        >
          {project.date}
        </motion.p>
      </motion.div>

      {/* Gallery */}
      <div className="px-5 md:px-8 lg:px-16 pb-16 md:pb-24 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {project.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              className={`overflow-hidden ${
                index === 0 && project.gallery.length > 2 ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
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
        <motion.div
          className="border-t border-gray-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to={`/project/${nextProject.slug}`}
            className="block px-5 md:px-8 lg:px-16 py-16 md:py-24 hover:bg-gray-light/50 transition-colors duration-500"
            data-cursor="pointer"
          >
            <div className="max-w-[1200px] mx-auto flex items-center justify-between">
              <div>
                <p className="text-[9px] tracking-[3px] uppercase text-gray-mid mb-3">
                  Next Project
                </p>
                <h3 className="text-lg md:text-xl lg:text-2xl font-normal uppercase tracking-[2px] text-black">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-[10px] text-gray-mid tracking-[1px]">
                  {nextProject.subtitle}
                </p>
              </div>
              <ArrowRight size={20} strokeWidth={1} className="text-gray-mid" />
            </div>
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectPage;
