"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";

export default function VenueMap() {
  const navigateUrl = "https://www.google.com/maps/dir/?api=1&destination=Ganapati+Nagar+1st+line+Berhampur+Odisha+760006";

  return (
    <section className="relative w-full py-24 px-6 bg-gradient-to-b from-maroon-deep to-maroon text-cream overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 font-body">
          Getting There
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-cream text-center mb-6">
          Venue & Directions
        </h2>
        <p className="text-sm text-cream/70 text-center max-w-md font-body mb-12">
          Our new home is located in Berhampur. Below is the interactive location map to guide you.
        </p>

        {/* Map and Info Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-stretch">
          {/* Address Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-lg glass-dark border border-gold/30 bg-maroon-deep/50 shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center mb-6 text-gold">
                <FaMapMarkerAlt className="w-6 h-6 animate-bounce" />
              </div>
              <h3 className="font-display text-xl font-bold text-gold mb-4 tracking-wide">
                Ceremony Venue
              </h3>
              <p className="font-display text-lg font-bold text-cream mb-2">
                Patro Residence
              </p>
              <p className="text-sm text-cream/80 leading-relaxed font-body mb-6">
                Ganapati Nagar 1st line,<br />
                Near Sarguna street, Aska Road,<br />
                Berhampur, Odisha - 760006
              </p>
              <div className="border-t border-gold/25 pt-6 flex flex-col gap-3 font-body">
                <div className="text-xs text-cream/60">
                  <span className="text-gold font-semibold">Landmark:</span> Near Sarguna street, Aska Road
                </div>
                <div className="text-xs text-cream/60">
                  <span className="text-gold font-semibold">Parking:</span> Guest parking available at the venue
                </div>
              </div>
            </div>

            {/* Navigation Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8"
            >
              <a
                href={navigateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-gold-dark via-gold to-gold-dark text-maroon-deep font-display text-xs font-bold tracking-widest uppercase rounded border border-gold-light shadow-xl transition-transform"
              >
                <FaRoute className="w-4 h-4" />
                Open Navigation
              </a>
            </motion.div>
          </motion.div>

          {/* Google Maps Embed Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-lg overflow-hidden border border-gold/30 shadow-2xl relative min-h-[350px] bg-maroon-deep"
          >
            {/* Elegant double border frame inside map */}
            <div className="absolute inset-2 border border-gold/15 rounded pointer-events-none z-10" />

            <iframe
              title="Ceremony Venue Map"
              src="https://maps.google.com/maps?q=Ganapati%20Nagar%20Berhampur%20Odisha%20760006&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-125 brightness-95 opacity-85 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
