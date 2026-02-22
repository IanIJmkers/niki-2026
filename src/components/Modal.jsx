import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

const DISMISS_THRESHOLD = 120;
const VELOCITY_THRESHOLD = 500;

const modalVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: (direction) => ({
    opacity: 0,
    y: direction !== 0 ? direction * window.innerHeight : 40,
    scale: direction !== 0 ? 1 : 0.97,
  }),
};

const Modal = ({ children, onClose, title = "Untitled", dismissDirection = 0 }) => {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleDragEnd = (event, info) => {
    const shouldDismiss =
      Math.abs(info.offset.y) > DISMISS_THRESHOLD ||
      Math.abs(info.velocity.y) > VELOCITY_THRESHOLD;

    if (shouldDismiss) {
      const direction = info.offset.y > 0 ? 1 : -1;
      onClose(direction);
    }
  };

  return (
    <>
      {/* Backdrop — visual overlay only, events pass through to carousel */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/60 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Drag constraints area */}
      <div ref={constraintsRef} className="fixed inset-0 z-[70] pointer-events-none" />

      {/* Draggable window */}
      <motion.div
        className="fixed z-[70] pointer-events-auto"
        style={{ top: "3%", left: "50%", x: "-50%" }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0.3}
        custom={dismissDirection}
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onDragEnd={handleDragEnd}
      >
        <div className="w-[92vw] max-w-[1100px] max-h-[92vh] flex flex-col bg-off-white shadow-2xl border border-black/10" data-cursor-dark>
          {/* Title bar — drag handle */}
          <div
            className="flex items-center justify-between px-3 py-2 bg-gray-light border-b border-black/10 select-none shrink-0"
            onPointerDown={(e) => dragControls.start(e)}
            style={{ touchAction: "none" }}
            data-cursor="pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[1.5px] uppercase text-gray-mid font-light">
                {title}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-red-500/10 transition-colors group"
                aria-label="Close"
                data-cursor="pointer"
              >
                <X size={12} strokeWidth={1.5} className="text-gray-mid group-hover:text-red-500 transition-colors" />
              </button>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto overscroll-contain flex-1">
            {children}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Modal;
