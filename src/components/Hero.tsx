"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const ganeshaVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background Image with Dark Vignette/Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home_entrance.png"
          alt="Beautifully decorated home entrance for Griha Pravesh"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transform scale-105 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep via-maroon/85 to-black/60 dark:from-black dark:via-maroon-deep/90 dark:to-black/85" />
      </div>

      {/* Decorative Temple Frame Border overlay */}
      <div className="absolute inset-6 border border-gold/30 rounded-lg pointer-events-none z-10 hidden sm:block">
        <div className="absolute inset-1 border border-gold/15 rounded" />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 flex flex-col items-center text-center max-w-4xl px-6 py-12 text-cream"
      >
        {/* Lord Ganesha Icon / Emblem */}
        <motion.div
          variants={ganeshaVariants}
          className="w-24 h-24 sm:w-32 sm:h-32 mb-6 relative drop-shadow-[0_0_15px_rgba(200,155,60,0.5)]"
        >
          <Image
            src="/ganesha.png"
            alt="Lord Ganesha Golden Art"
            fill
            sizes="(max-width: 640px) 96px, 128px"
            className="object-contain animate-float"
          />
        </motion.div>

        {/* Shloka Header */}
        <motion.p
          variants={itemVariants}
          className="font-display text-xl sm:text-2xl font-semibold tracking-wider text-gold-light mb-2"
        >
          ॥ श्री गणेशाय नमः ॥
        </motion.p>

        {/* Sanskrit Shloka */}
        <motion.div
          variants={itemVariants}
          className="max-w-2xl mx-auto my-3 relative py-4 px-6 glass-light text-cream rounded-lg mb-8 overflow-hidden"
        >
          {/* Animated drawing top/bottom borders */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
          />
          <p className="font-display text-base sm:text-lg italic leading-relaxed text-cream/90 tracking-wide">
            "गृह प्रवेशाय शुभं करोति कल्याणं। <br />
            समृद्धिं सुख शान्तिं च देहि मे गृह देवते॥"
          </p>
          <p className="text-xs uppercase tracking-widest text-gold mt-2 font-body">
            May the deity of this home bestow prosperity, happiness, and peace.
          </p>
        </motion.div>

        {/* Griha Pratishtha Title */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-2 text-shimmer drop-shadow"
        >
          Griha Pravesh
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-script text-3xl sm:text-4xl md:text-5xl text-gold mb-6"
        >
          & Vastu Puja Ceremony
        </motion.p>

        {/* Family Name */}
        <motion.div variants={itemVariants} className="mb-6">
          <p className="text-sm sm:text-md uppercase tracking-[0.25em] text-cream/80 font-body">
            With the blessings of Almighty,
          </p>
          <p className="text-lg sm:text-xl font-medium tracking-wide text-cream mt-1 font-body">
            The <span className="font-display font-semibold text-gold text-2xl">Patro</span> Family
          </p>
        </motion.div>

        {/* Invitation Text */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-sm sm:text-base leading-relaxed text-cream/80 mb-10 font-body"
        >
          Warmly invites you to celebrate the auspicious inauguration of our new home. Join us as we step into our dream house and begin a new chapter of our lives.
        </motion.p>

        {/* Invitation Call to Action */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mb-12"
        >
          <a
            href="#invitation"
            className="inline-block px-8 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-dark hover:from-gold hover:to-gold-light text-maroon-deep font-display font-bold uppercase text-sm tracking-widest rounded shadow-xl border border-gold-light transition-all duration-300"
          >
            You're Invited
          </a>
        </motion.div>

        {/* Animated Chevron Down */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 flex flex-col items-center gap-1 opacity-70"
        >
          <span className="text-xs uppercase tracking-widest font-body text-cream/60">Scroll Down</span>
          <FaChevronDown className="w-4 h-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
