import { motion } from "framer-motion";
import { easeOutQuart } from "../../animations/variants";
import GalleryMedia from "../GalleryMedia";

const buildRows = (items) => {
  const rows = [];
  let i = 0;
  let full = true;
  while (i < items.length) {
    if (full || i + 1 >= items.length) {
      rows.push([items[i]]);
      i += 1;
    } else {
      rows.push([items[i], items[i + 1]]);
      i += 2;
    }
    full = !full;
  }
  return rows;
};

const LiminalLayout = ({ project }) => {
  const rows = buildRows(project.gallery);

  return (
    <>
      <div className="mt-20 px-5 md:px-20 lg:px-30 pb-0 flex flex-col gap-4">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className={`flex flex-col ${row.length === 2 ? "md:flex-row" : ""} gap-2 md:gap-3 ${rowIdx < rows.length - 1 ? "md:mb-50" : ""}`}
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
                <GalleryMedia
                  item={item}
                  alt={`${project.title} — ${rowIdx * 2 + colIdx + 1}`}
                  loading={rowIdx === 0 ? "eager" : "lazy"}
                />
              </motion.div>
            ))}
          </div>
        ))}

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
      </div>
    </>
  );
};

export default LiminalLayout;
