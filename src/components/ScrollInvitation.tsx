"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { FaScroll } from "react-icons/fa";

export default function ScrollInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Auto-open when scroll into view
  if (isInView && !isOpen) {
    setIsOpen(true);
  }

  const scrollVariants: Variants = {
    closed: { height: 0, opacity: 0 },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 0.8 },
      },
    },
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section
      id="invitation"
      ref={containerRef}
      className="relative w-full py-24 px-6 bg-cream text-maroon flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background soft marigold overlay design */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10 pointer-events-none transform rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon">
          <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C28 90 10 72 10 50S28 10 50 10s40 18 40 40-18 40-40 40z" />
        </svg>
      </div>

      <div className="max-w-3xl w-full flex flex-col items-center">
        {/* Toggle Scroll Button */}
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 z-30 flex items-center gap-3 px-6 py-2.5 bg-maroon text-gold rounded border border-gold font-display text-sm font-semibold tracking-widest uppercase shadow-lg transition-colors hover:bg-maroon-light"
        >
          <FaScroll className="w-5 h-5 text-gold" />
          {isOpen ? "Roll Up Invitation" : "Unroll Invitation"}
        </motion.button>

        {/* Scroll Container */}
        <div className="w-full flex flex-col items-center">
          {/* Top Scroll Handle */}
          <motion.div
            animate={{ rotate: isOpen ? 720 : 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[550px] h-[22px] bg-gradient-to-r from-gold-dark via-gold to-gold-dark rounded-full shadow-md z-20 flex items-center justify-between px-3 border border-gold-light"
          >
            <div className="w-4 h-4 bg-maroon-dark rounded-full border border-gold" />
            <div className="w-32 h-[3px] bg-maroon-dark/20 rounded" />
            <div className="w-4 h-4 bg-maroon-dark rounded-full border border-gold" />
          </motion.div>

          {/* Scroll Content Body */}
          <motion.div
            variants={scrollVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            className="w-full max-w-[526px] overflow-hidden z-10 mx-auto origin-top relative shadow-2xl"
          >
            <div className="parchment-bg text-maroon border-x-8 sm:border-x-[12px] border-double border-gold/40 px-4 sm:px-12 py-8 sm:py-10 flex flex-col items-center text-center relative">
              {/* Inner Decorative Borders */}
              <div className="absolute inset-2 sm:inset-4 border border-gold/25 pointer-events-none" />
              <div className="absolute inset-[10px] sm:inset-[18px] border-2 border-double border-gold/15 pointer-events-none" />

              {/* Shloka Emblem */}
              <div className="text-gold text-2xl mb-2 z-10">۩</div>

              <span className="font-display text-xs tracking-[0.25em] font-semibold text-gold-dark uppercase mb-1">
                Griha Pratishtha Invitation
              </span>
              
              <h3 className="font-display text-3xl font-bold tracking-wide text-maroon mb-6">
                शुभ गृह प्रवेश
              </h3>

              <div className="w-12 h-[1px] bg-gold/50 my-2" />

              <p className="font-body text-sm leading-relaxed text-maroon/90 max-w-sm mb-6">
                "By the grace of Lord Ganesha, we invite you to share our joy as we inaugurate our new home. Your presence and blessings will make this day truly memorable."
              </p>

              {/* Detail Sections */}
              <div className="flex flex-col gap-6 w-full max-w-xs font-body z-10 my-4">
                {/* Date */}
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">Date</span>
                  <span className="font-display text-lg font-bold text-maroon mt-1">
                    Thursday, July 16, 2026
                  </span>
                  <span className="text-xs text-maroon/70 italic">Ashadha Shukla Dwitiya</span>
                </div>

                {/* Separator */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent w-full" />

                {/* Time */}
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">Puja & Ceremony Timings</span>
                  <span className="font-display text-md font-bold text-maroon mt-1">
                    Gruha Pravesh Puja: 9:15 AM
                  </span>
                  <span className="font-display text-md font-bold text-maroon">
                    Mahaprasadam (Lunch): 12:30 PM onwards
                  </span>
                </div>

                {/* Separator */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent w-full" />

                {/* Venue */}
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase tracking-widest text-gold-dark font-semibold">Venue</span>
                  <span className="text-sm text-maroon/95 text-center leading-normal mt-2">
                    Ganapati Nagar Ist line,<br />
                    Near Sarguna street, Aska Road,<br />
                    Berhampur, Odisha - 760006
                  </span>
                </div>
              </div>

              <div className="w-12 h-[1px] bg-gold/50 my-4" />

              {/* RSVP Footer */}
              <p className="font-script text-3xl text-gold-dark mt-2 mb-1">
                With Best Compliments From
              </p>
              <p className="font-display text-sm font-semibold tracking-wider text-maroon">
                Sri G. Gouri Sankar Patro & Family
              </p>
            </div>
          </motion.div>

          {/* Bottom Scroll Handle */}
          <motion.div
            animate={{ rotate: isOpen ? -720 : 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[550px] h-[22px] bg-gradient-to-r from-gold-dark via-gold to-gold-dark rounded-full shadow-md z-20 flex items-center justify-between px-3 border border-gold-light"
          >
            <div className="w-4 h-4 bg-maroon-dark rounded-full border border-gold" />
            <div className="w-32 h-[3px] bg-maroon-dark/20 rounded" />
            <div className="w-4 h-4 bg-maroon-dark rounded-full border border-gold" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
