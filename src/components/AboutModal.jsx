import Modal from "./Modal";

const AboutModal = ({ onClose, dismissDirection }) => {
  return (
    <Modal onClose={onClose} title="About — Nikoletta Kalmar" dismissDirection={dismissDirection}>
      <div className="px-6 md:px-12 lg:px-16 pt-6 pb-20 md:pb-28">
        <p className="text-[9px] tracking-[3px] uppercase text-gray-mid mb-6">
          About
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[2px] text-black mb-10 leading-tight">
          Nikoletta Kalmar
        </h1>

        <div className="space-y-6 max-w-[640px]">
          <p className="text-sm md:text-base text-gray-dark leading-[1.8] tracking-wide">
            Nikoletta Kalmar is a multidisciplinary designer and creative
            director based in Amsterdam, working at the intersection of strategy
            and visual design.
          </p>
          <p className="text-sm md:text-base text-gray-dark leading-[1.8] tracking-wide">
            With a background in art direction and brand identity, she
            collaborates with forward-thinking brands to create meaningful
            visual experiences that resonate.
          </p>
          <p className="text-sm md:text-base text-gray-dark leading-[1.8] tracking-wide">
            Her work spans editorial design, conceptual photography, and
            spatial identity — always guided by a refined sense of aesthetics
            and a deep understanding of cultural context.
          </p>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-border">
          <p className="text-[9px] tracking-[3px] uppercase text-gray-mid mb-4">
            Services
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {["Art Direction", "Brand Identity", "Editorial Design", "Conceptual Photography"].map((s) => (
              <span key={s} className="text-xs tracking-[1px] text-gray-dark">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
