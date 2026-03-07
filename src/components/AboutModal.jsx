import Modal from "./Modal";

const AboutModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="About — Nikoletta Kalmar">
      <div className="px-6 md:px-12 lg:px-16 pt-6 pb-20 md:pb-28">
        <div className="max-w-[720px] mx-auto">
          <p className="text-sm md:text-base text-black/60 leading-[1.8] tracking-wide">
            — a Transformation Designer. I make things that make people pause,
            question, and look twice. Whether it's a fake lychee convincing
            enough to fool you at dinner, a sculptural spine that comments on
            our tech-dependent future, or a brand identity that actually feels
            like someone — my work sits at the intersection of concept, craft,
            and curiosity. I'm equally comfortable getting my hands dirty in a
            workshop as I am diving into philosophical rabbit holes or building
            a brand from scratch. If it involves material experimentation,
            spatial storytelling, or making the overlooked feel unmissable — I'm
            probably already interested.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-16 -ml-4 md:-ml-6">
          <img
            className="w-[40%] md:w-[35%]"
            src="/images/niki-logo-text-black.webp"
            alt="Nikoletta"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
