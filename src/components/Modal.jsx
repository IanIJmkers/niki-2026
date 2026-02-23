import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({ children, onClose, title = "Untitled" }) => {
  const dragControls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      {/* Backdrop — visual only, events pass through to carousel */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black/60 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Draggable window — no constraints, can be dragged freely */}
      <motion.div
        className="fixed z-[70] pointer-events-auto"
        style={{ top: "3%", left: "50%", x: "-50%" }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
      >
        <div
          className="w-[92vw] max-w-[1100px] max-h-[92vh] flex flex-col rounded-2xl overflow-hidden border border-white/50 shadow-[0_8px_60px_rgba(0,0,0,0.25)]"
          data-cursor-dark
          style={{
            background: "rgba(255, 255, 255, 1)",
            backdropFilter: isDragging ? "blur(20px)" : "blur(40px)",
            WebkitBackdropFilter: isDragging ? "blur(20px)" : "blur(40px)",
          }}
        >
          {/* Title bar — drag handle */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b border-black/5 select-none shrink-0"
            onPointerDown={(e) => dragControls.start(e)}
            style={{ touchAction: "none" }}
            data-cursor="pointer"
          >
            <span className="text-[10px] tracking-[1.5px] uppercase text-black/40 font-light">
              {title}
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-7 h-7 rounded-full border border-black/10 bg-black/5 hover:bg-black/20 transition-colors"
              aria-label="Close"
              data-cursor="pointer"
            >
              <X size={12} strokeWidth={1.5} className="text-black/50" />
            </button>
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
