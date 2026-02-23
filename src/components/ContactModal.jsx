import Modal from "./Modal";

const ContactModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="Contact">
      <div className="px-6 md:px-12 lg:px-16 pt-6 pb-20 md:pb-28">
        <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-6">
          Get in touch
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-[2px] text-black mb-10 leading-tight">
          Contact
        </h1>

        <p className="text-sm md:text-base text-black/60 leading-[1.8] tracking-wide max-w-160 mb-14">
          For inquiries, collaborations, or just to say hello — feel free to
          reach out.
        </p>

        <div className="space-y-10">
          <div>
            <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-3">
              Email
            </p>
            <a
              href="mailto:hello@nikolettakalmar.com"
              className="text-base md:text-lg tracking-[1px] text-black hover:text-black/50 transition-colors duration-300"
              data-cursor="pointer"
            >
              hello@nikolettakalmar.com
            </a>
          </div>
          <div>
            <p className="text-[9px] tracking-[3px] uppercase text-black/40 mb-3">
              Instagram
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base md:text-lg tracking-[1px] text-black hover:text-black/50 transition-colors duration-300"
              data-cursor="pointer"
            >
              @nikolettakalmar
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ContactModal;
