import Modal from "./Modal";

const AboutModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="About — Nikoletta Kalmar">
      <div className="px-6 md:px-12 lg:px-16 pt-6 pb-20 md:pb-28">
        <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-6">
          About
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[2px] text-black mb-10 leading-tight">
          Nikoletta Kalmar
        </h1>

        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
          <div className="space-y-6 max-w-[640px]">
            <p className="text-sm md:text-base text-black/60 leading-[1.8] tracking-wide">
              Hi, I'm Niki — a Transformation Designer. I make things that make
              people pause, question, and look twice. Whether it's a fake lychee
              convincing enough to fool you at dinner, a sculptural spine that
              comments on our tech-dependent future, or a brand identity that
              actually feels like someone — my work sits at the intersection of
              concept, craft, and curiosity. I'm equally comfortable getting my
              hands dirty in a workshop as I am diving into philosophical rabbit
              holes or building a brand from scratch. If it involves material
              experimentation, spatial storytelling, or making the overlooked feel
              unmissable — I'm probably already interested.
            </p>
          </div>
          <img
            src="/images/niki-draw.png"
            alt="Niki illustration"
            className="w-48 md:w-56 lg:w-64 shrink-0 object-contain"
          />
        </div>

        <div className="mt-16 pt-8 border-t border-black/10">
          <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-4">
            Services
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              "Material Research",
              "Branding",
              "Spatial Design",
              "Editorial Design",
              "Critical Discourse",
            ].map((s) => (
              <span key={s} className="text-xs tracking-[1px] text-black/50">
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
