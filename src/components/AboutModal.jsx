import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Splitting from "splitting";
import Modal from "./Modal";
import useIsMobile from "../hooks/useIsMobile";
import useModalLenis from "../hooks/useModalLenis";

gsap.registerPlugin(ScrollTrigger);

const GOLD = "rgb(233, 229, 160)";

const AboutModal = ({ onClose }) => {
  const contentRef = useRef(null);
  const scrollRef = useRef(0);
  const isMobile = useIsMobile();

  const h1Ref = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const photoRef = useRef(null);
  const progressLineRef = useRef(null);
  const timelineRef = useRef(null);
  const sparkle1Ref = useRef(null);
  const sparkle2Ref = useRef(null);
  const sparkle3Ref = useRef(null);

  // Lenis smooth scroll on desktop
  useModalLenis(contentRef, { enabled: !isMobile });

  useGSAP(
    () => {
      const scroller = contentRef.current;
      if (!scroller) return;

      const ctx = gsap.context(() => {
        // Paragraph starts hidden — revealed on scroll
        gsap.set(textRef.current, { opacity: 0 });

        // Timeline starts hidden — revealed on first scroll
        if (timelineRef.current) {
          gsap.set(timelineRef.current, { opacity: 0 });
        }

        if (!isMobile) {
          // --- Desktop: wheel-driven 0→1 progress via GSAP ---
          const proxy = { p: 0 };

          const onWheel = (e) => {
            e.preventDefault();
            scrollRef.current = Math.max(
              0,
              Math.min(scrollRef.current + e.deltaY * 0.0015, 1),
            );

            gsap.to(proxy, {
              p: scrollRef.current,
              duration: 1.2,
              ease: "power2.out",
              overwrite: true,
              onUpdate: () => {
                const p = proxy.p;

                // h1 moves up: 0→0.5 maps to y 0→-150
                const h1Y = gsap.utils.interpolate(
                  0,
                  -150,
                  gsap.utils.clamp(0, 1, p / 0.5),
                );
                // text scrolls out: 0.05→1 maps to y 0→-200
                const textP = gsap.utils.clamp(0, 1, (p - 0.05) / 0.95);
                const textY = gsap.utils.interpolate(0, -200, textP);
                // padding shrinks: 0→0.3 maps to 120→40
                const padP = gsap.utils.clamp(0, 1, p / 0.3);
                const textPad = gsap.utils.interpolate(120, 40, padP);
                // logo + photo: 0.05→1 maps to y 0→-250
                const logoP = gsap.utils.clamp(0, 1, (p - 0.05) / 0.95);
                const logoY = gsap.utils.interpolate(0, -250, logoP);
                const photoY = gsap.utils.interpolate(0, -250, logoP);

                gsap.set(h1Ref.current, { y: h1Y });
                gsap.set(textRef.current, { y: textY, paddingTop: textPad });
                gsap.set(logoRef.current, { y: logoY });
                gsap.set(photoRef.current, { y: photoY });

                // Progress line fill
                if (progressLineRef.current) {
                  gsap.set(progressLineRef.current, { scaleY: p });
                }

                // Position sparkles to track their elements
                if (timelineRef.current) {
                  const tlRect = timelineRef.current.getBoundingClientRect();
                  const tlH = tlRect.height;
                  const tlTop = tlRect.top;

                  [
                    { ref: sparkle1Ref, el: h1Ref },
                    { ref: sparkle2Ref, el: textRef },
                    { ref: sparkle3Ref, el: logoRef },
                  ].forEach(({ ref, el }) => {
                    if (!ref.current || !el.current) return;
                    const elRect = el.current.getBoundingClientRect();
                    const elCenter = elRect.top + elRect.height / 2 - tlTop;
                    const pct = gsap.utils.clamp(
                      0,
                      100,
                      (elCenter / tlH) * 100,
                    );
                    gsap.set(ref.current, { top: `${pct}%` });
                    const active = p >= pct / 100;
                    gsap.to(ref.current, {
                      scale: active ? 1 : 0.5,
                      opacity: active ? 1 : 0.3,
                      duration: 0.4,
                      ease: "power2.out",
                      overwrite: "auto",
                    });
                  });
                }

                // Reveal paragraph + timeline once user starts scrolling
                if (p > 0.02) {
                  gsap.to(textRef.current, {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                  if (timelineRef.current) {
                    gsap.to(timelineRef.current, {
                      opacity: 1,
                      duration: 1,
                      ease: "power3.out",
                      overwrite: "auto",
                    });
                  }
                }
              },
            });
          };

          scroller.addEventListener("wheel", onWheel, { passive: false });

          // Splitting — staggered character reveal on headline
          const split = Splitting({ target: h1Ref.current, by: "chars" });
          const chars = split[0]?.chars || [];
          if (chars.length) {
            gsap.set(chars, { opacity: 0, y: 40 });
            gsap.to(chars, {
              opacity: 1,
              y: 0,
              stagger: 0.03,
              duration: 1,
              ease: "power4.out",
              delay: 0.4,
            });
          }

          // Cleanup
          return () => {
            scroller.removeEventListener("wheel", onWheel);
          };
        } else {
          // --- Mobile: GSAP ScrollTrigger reveals ---

          // h1 fade-up on mount
          gsap.from(h1Ref.current, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power3.out",
          });

          // Splitting on mobile headline
          const split = Splitting({ target: h1Ref.current, by: "chars" });
          const chars = split[0]?.chars || [];
          if (chars.length) {
            gsap.from(chars, {
              opacity: 0,
              y: 20,
              stagger: 0.02,
              duration: 0.6,
              ease: "power3.out",
              delay: 0.1,
            });
          }

          // Paragraph — revealed on scroll (opacity only, no position change)
          gsap.to(textRef.current, {
            opacity: 1,
            duration: 0.8,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              scroller,
              start: "top 95%",
              toggleActions: "play none none none",
            },
          });

          // Logo — reveal on scroll
          gsap.from(logoRef.current, {
            opacity: 0,
            y: 15,
            duration: 2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logoRef.current,
              scroller,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });

          // Photo — reveal on scroll
          gsap.from(photoRef.current, {
            opacity: 0,
            y: 15,
            duration: 2,
            delay: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoRef.current,
              scroller,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          });
        }

        ScrollTrigger.refresh();
      }, scroller);

      return () => ctx.revert();
    },
    { scope: contentRef, dependencies: [isMobile] },
  );

  // Refresh after modal enter animation settles
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 450);
    return () => clearTimeout(id);
  }, []);

  return (
    <Modal onClose={onClose} title="About me" contentRef={contentRef} bg={GOLD}>
      {isMobile ? (
        <>
          {/* Mobile: heading + text together */}
          <div className="relative px-6 flex flex-col justify-center mt-12">
            <h1
              ref={h1Ref}
              className="font-lunette text-[3.5rem] sm:text-[5rem] uppercase leading-none tracking-wide text-black/90"
            >
              Where strategy
              <br />
              becomes design
            </h1>

            <p
              ref={textRef}
              className="text-xs sm:text-sm text-black/60 leading-[1.8] tracking-wide mt-8 mb-4"
            >
              I started my career in design the way most people don't - by
              designing a logo for a solar-powered international car race
              competition. These days the projects are less solar-powered but
              more pixel-perfect. You'll find me buried in Pinterest, building
              moodboards like my life depends on it, and quietly rearranging
              things until they feel right. I’ve worked across branding,
              packaging, and visual identity, helping shape creative direction
              at a studio, and leading the design side of a tech-hackathon
              exploring AI in urban infrastructure. Majoring in Transformation
              Design, and minoring in Critical Studies, my practice operates
              somewhere between a strategy board and a workshop table - I'm
              comfortable in both. This mostly means I have an unreasonably
              strong opinion about white spaces and I'll debate colour theory
              until someone changes the subject. People tell me I'm relentlessly
              optimistic. My portfolio, ironically, didn't get the memo - it's
              all moody palettes and dystopian undertones. I contain multitudes
              - I just believe good design should make you pause, and sometimes
              a little darkness is the best way to get someone's attention.
            </p>
          </div>

          {/* Mobile: logo and photo below */}
          <div className="px-6 pb-8">
            <img
              ref={logoRef}
              className="relative z-10 mt-4 w-[40%]"
              src="/images/niki-logo-text-black.webp"
              alt="Nikoletta"
            />

            <img
              ref={photoRef}
              className="relative z-0 -mt-2 w-32 ml-10 rounded-lg object-contain"
              src="/images/portrait.webp"
              alt="Nikoletta Kalmar"
              loading="lazy"
              decoding="async"
            />
          </div>
        </>
      ) : (
        /* Desktop: wheel-driven scroll animation */
        <div className="relative">
          {/* Scroll progress line — outside overflow-hidden */}
          <div
            ref={timelineRef}
            className="absolute left-10 top-12 bottom-12 z-30 pointer-events-none overflow-visible w-16"
          >
            {/* Background line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-black/10" />
            {/* Filled progress line */}
            <div
              ref={progressLineRef}
              className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-black/60 origin-top h-full"
              style={{ scaleY: 0 }}
            />
            {/* Sparkle 1 — tracks h1 */}
            <img
              ref={sparkle1Ref}
              src="/images/sta2.png"
              alt=""
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-30 scale-50"
              aria-hidden="true"
            />
            {/* Sparkle 2 — tracks paragraph */}
            <img
              ref={sparkle2Ref}
              src="/images/sta3.png"
              alt=""
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-30 scale-50"
              aria-hidden="true"
            />
            {/* Sparkle 3 — tracks logo */}
            <img
              ref={sparkle3Ref}
              src="/images/sta4.png"
              alt=""
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 opacity-30 scale-50"
              aria-hidden="true"
            />
          </div>

          <div className="px-6 md:px-12 lg:px-16 overflow-hidden flex flex-col items-start justify-start pt-24 pb-8">
            <h1
              ref={h1Ref}
              className="font-lunette text-[7rem] md:text-[9rem] lg:text-[11rem] uppercase leading-none tracking-wide text-black/90 -mb-6 md:-mb-10 relative z-20 mx-auto text-left"
            >
              Where strategy
              <br />
              becomes design
            </h1>

            <div
              ref={textRef}
              className="w-[85%] relative z-10 mx-auto"
              style={{ paddingTop: 120 }}
            >
              <p className="text-sm md:text-base text-black/60 leading-[1.8] tracking-wide">
                I started my career in design the way most people don't - by
                designing a logo for a solar-powered international car race
                competition. These days the projects are less solar-powered but
                more pixel-perfect. You'll find me buried in Pinterest, building
                moodboards like my life depends on it, and quietly rearranging
                things until they feel right.
                <br />
                <br />
                I’ve worked across branding, packaging, and visual identity,
                helping shape creative direction at a studio, and leading the
                design side of a tech-hackathon exploring AI in urban
                infrastructure. Majoring in Transformation Design, and minoring
                in Critical Studies, my practice operates somewhere between a
                strategy board and a workshop table - I'm comfortable in both.
                This mostly means I have an unreasonably strong opinion about
                white spaces and I'll debate colour theory until someone changes
                the subject.
                <br />
                <br />
                People tell me I'm relentlessly optimistic. My portfolio,
                ironically, didn't get the memo - it's all moody palettes and
                dystopian undertones. I contain multitudes - I just believe good
                design should make you pause, and sometimes a little darkness is
                the best way to get someone's attention.
              </p>
            </div>

            <img
              ref={logoRef}
              className="relative z-50 mt-16 w-[40%] md:w-[35%] ml-auto mr-4 md:mr-6"
              src="/images/niki-logo-text-black.webp"
              alt="Nikoletta"
            />

            <img
              ref={photoRef}
              className="relative z-40 -mt-3 md:-mt-6 w-32 md:w-40 rounded-lg object-contain ml-auto mr-10 md:mr-15"
              src="/images/portrait.webp"
              alt="Nikoletta Kalmar"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AboutModal;
