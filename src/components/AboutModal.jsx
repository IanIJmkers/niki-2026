import Modal from "./Modal";

const AboutModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="About — Nikoletta Kalmar">
      <div className="px-6 md:px-12 lg:px-16 pt-6 pb-20 md:pb-28">
        {/* Statement header */}
        <h1 className="font-lunette text-3xl md:text-4xl lg:text-5xl uppercase leading-tight tracking-wide text-black/90 mb-10 md:mb-14">
          Where strategy
          <br />
          becomes design
        </h1>

        {/* About text */}
        <div className="max-w-[720px]">
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

        {/* Signature + photo */}
        <div className="relative mt-16 -ml-4 md:-ml-6">
          <img
            className="relative z-10 w-[40%] md:w-[35%]"
            src="/images/niki-logo-text-black.webp"
            alt="Nikoletta"
          />
          <img
            className="relative z-0 -mt-3 md:-mt-5 ml-4 md:ml-8 w-32 md:w-40 rounded-lg object-contain"
            src="/images/about.webp"
            alt="Nikoletta Kalmar"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AboutModal;
