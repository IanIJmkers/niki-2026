import { motion } from "framer-motion";

const HeroSection = ({ introPhase }) => {
  const skipped = introPhase === "complete";
  const showText = introPhase === "text";
  const showNav = introPhase === "carousel" || introPhase === "complete";

  return (
    <>
      {/* Background layer — globe fades in during "globe" phase */}
      <div className="fixed inset-0 z-0 bg-black overflow-hidden">
        <motion.img
          src="/images/globes.webp"
          alt="Hero background"
          decoding="async"
          className="absolute top-0 left-0 w-full h-full object-cover"
          initial={{ opacity: skipped ? 0.7 : 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: skipped ? 0 : 1.5, ease: "easeOut" }}
        />
      </div>

      {/* "Niki" background text — sits between globe and carousel (z-[5]) */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[5] flex justify-center pointer-events-none pt-4 md:pt-6 lg:pt-8"
        initial={{ opacity: skipped ? 1 : 0 }}
        animate={{ opacity: showNav ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <span className="font-gluten text-[clamp(8rem,22vw,20rem)] text-white/90 uppercase leading-none select-none">
          Niki
        </span>
      </motion.div>

      {/* Header nav — appears with carousel */}
      <motion.div
        className="fixed inset-x-0 top-0 z-20 pointer-events-none"
        initial={{ opacity: skipped ? 1 : 0 }}
        animate={{ opacity: showNav ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex justify-between items-center px-4 py-3 md:px-6 md:py-4 lg:px-10 lg:py-5">
          <span className="text-[9px] font-light text-white tracking-[1.5px] uppercase">
            About
          </span>
          <span className="text-[9px] font-light text-white tracking-[1.5px] uppercase">
            Contact
          </span>
        </div>
      </motion.div>

      {/* Text overlay — fades in during "text" phase, fades out when carousel starts */}
      <motion.div
        className="fixed inset-0 z-20 flex flex-col pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: showText ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Headline — bottom right */}
        <div className="absolute right-4 bottom-13 max-w-[50%] text-right md:max-w-none md:bottom-8 md:right-6 lg:bottom-10 lg:right-10">
          <motion.h1
            className="font-lunette text-[clamp(2.8rem,8vw,8rem)] font-[300] text-gold m-0 uppercase leading-[0.82] tracking-[2.5px] md:tracking-[3px]"
            style={{ transformOrigin: "bottom right" }}
            initial={{ y: 30, scaleY: 1.9 }}
            animate={{
              y: showText ? 0 : 30,
              scaleY: 1.9,
            }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          >
            Where strategy
            <br />
            becomes design.
          </motion.h1>
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;
