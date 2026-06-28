"use client";

import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";

export default function Blessings() {
  return (
    <section className="relative w-full py-24 px-6 bg-gradient-to-b from-maroon to-maroon-deep text-cream overflow-hidden">
      {/* Background floral overlays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-gold">
          <path d="M50 0C60 20 80 40 100 50C80 60 60 80 50 100C40 80 20 60 0 50C20 40 40 20 50 0Z" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Sacred Icon Symbol */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-gold text-3xl mb-6 drop-shadow-[0_0_10px_rgba(200,155,60,0.4)]"
        >
          🌸
        </motion.div>

        {/* Sanskrit Blessing Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-8"
        >
          <p className="font-display text-lg sm:text-xl font-medium tracking-wide text-gold-light italic max-w-xl mx-auto leading-relaxed">
            "धर्मार्थाकाममोक्षाणां निमित्तं गृहमुच्यते।"
          </p>
          <p className="text-xs uppercase tracking-widest text-cream/60 mt-2 font-body">
            A home is the foundation for righteousness, wealth, desires, and spiritual liberation.
          </p>
        </motion.div>

        {/* Double border line break */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 120 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent mb-10"
        />

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-display text-sm tracking-[0.25em] font-semibold text-gold uppercase">
            A Gentle Note
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-wide text-cream max-w-md leading-snug">
            Your Presence is Our Greatest Gift
          </h2>
          <p className="font-body text-sm sm:text-base text-cream/80 max-w-lg leading-relaxed mt-2">
            No gifts are requested. We only seek your warm smiles, shared laughter, and loving blessings to fill our new home with positive energies as we embark on this new journey.
          </p>
        </motion.div>

        {/* Heart Icon pulse */}
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mt-10"
        >
          <FaHeart className="w-5 h-5 text-gold/80" />
        </motion.div>
      </div>
    </section>
  );
}
