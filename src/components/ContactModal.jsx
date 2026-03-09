import { motion } from "framer-motion";
import { easeOutQuart } from "../animations/variants";
import Modal from "./Modal";

const fade = (delay) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.8, delay, ease: easeOutQuart },
});

const ContactModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose} title="Contact">
      <div className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 lg:py-40">
        <motion.p
          className="text-[9px] tracking-[3px] uppercase text-black/30 mb-10"
          {...fade(0.1)}
        >
          Say hello
        </motion.p>

        <motion.a
          href="mailto:hello@nikolettakalmar.com"
          className="font-lunette text-2xl md:text-4xl lg:text-5xl text-black/80 tracking-wide hover:text-gold transition-colors duration-500"
          data-cursor="pointer"
          {...fade(0.25)}
        >
          hello@nikolettakalmar.com
        </motion.a>

        <motion.div
          className="w-6 h-px bg-black/10 my-8 md:my-10"
          {...fade(0.35)}
        />

        <motion.a
          href="https://instagram.com/nikolettakalmar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm tracking-[2px] text-black/30 hover:text-gold transition-colors duration-500"
          data-cursor="pointer"
          {...fade(0.45)}
        >
          @nikolettakalmar
        </motion.a>
      </div>
    </Modal>
  );
};

export default ContactModal;
