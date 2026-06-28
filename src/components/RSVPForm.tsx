"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaCheckCircle, FaHeart, FaUserFriends } from "react-icons/fa";

export default function RSVPForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    guests: "1",
    attending: "Yes",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate database network delay or call Supabase if set up
    setTimeout(() => {
      // LocalStorage fallback storage
      try {
        const existingRSVPs = JSON.parse(localStorage.getItem("griha_rsvps") || "[]");
        const newRSVP = {
          ...formData,
          timestamp: new Date().toISOString(),
        };
        existingRSVPs.push(newRSVP);
        localStorage.setItem("griha_rsvps", JSON.stringify(existingRSVPs));
        console.log("RSVP stored locally:", newRSVP);
      } catch (err) {
        console.error("Local storage error:", err);
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="rsvp" className="relative w-full py-24 px-6 bg-cream text-maroon overflow-hidden">
      {/* Decorative lotus line designs in corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/45 rounded-tl-xl pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-gold/45 rounded-br-xl pointer-events-none" />

      <div className="max-w-xl mx-auto flex flex-col items-center">
        <span className="text-gold-dark uppercase tracking-widest text-xs font-semibold mb-3 font-body">
          R.S.V.P
        </span>
        
        <h2 className="font-display text-3xl font-bold tracking-wide text-maroon text-center mb-4">
          Will You Join Us?
        </h2>
        
        <p className="text-sm text-maroon/75 text-center leading-relaxed font-body mb-10 max-w-sm">
          Please let us know your plans by <span className="font-semibold text-gold-dark">July 10, 2026</span> so we can prepare the feast and welcome you with warm hearts.
        </p>

        {/* RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full rounded-lg border-2 border-gold/30 bg-[#fffdfa] p-4 sm:p-10 shadow-2xl relative"
        >
          {/* Double inner border lines */}
          <div className="absolute inset-2.5 border border-gold/15 rounded-md pointer-events-none" />

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center py-4 font-body"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                className="text-gold mb-4"
              >
                <FaCheckCircle className="w-16 h-16 text-gold" />
              </motion.div>
              
              <h3 className="font-display text-2xl font-bold text-maroon mb-2">
                {formData.attending === "Yes" ? "Auspicious Confirmation!" : "Response Saved"}
              </h3>

              <p className="text-sm text-maroon/80 max-w-xs leading-relaxed mb-6">
                {formData.attending === "Yes"
                  ? `Thank you, ${formData.name}! We are absolutely delighted to celebrate our Griha Pravesh with you.`
                  : `Thank you for letting us know, ${formData.name}. We will miss your presence but request your blessings from afar.`}
              </p>

              {/* RSVP SUMMARY CARD */}
              <div className="w-full max-w-sm rounded-lg border border-gold/20 bg-cream/20 p-5 text-left mb-6 text-sm relative">
                <div className="absolute top-2 right-2 text-xs font-bold uppercase tracking-widest text-gold-dark">
                  Summary
                </div>
                <div className="flex flex-col gap-2.5">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Guest Name</span>
                    <span className="font-medium text-maroon">{formData.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Contact Number</span>
                    <span className="font-medium text-maroon">{formData.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Attending?</span>
                      <span className="font-semibold text-maroon">{formData.attending === "Yes" ? "Yes, Attending" : "No, Sorry"}</span>
                    </div>
                    {formData.attending === "Yes" && (
                      <div>
                        <span className="text-[10px] uppercase font-bold text-gold-dark tracking-wider block">Total Guests</span>
                        <span className="font-semibold text-maroon">{formData.guests} {formData.guests === "1" ? "Person" : "People"}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 font-semibold text-xs uppercase tracking-wider">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-gold-dark hover:text-maroon transition-colors cursor-pointer"
                >
                  Edit RSVP Details
                </button>
                <span className="text-gold/30">|</span>
                <button
                  onClick={() => {
                    setFormData({ name: "", phone: "", guests: "1", attending: "Yes" });
                    setIsSubmitted(false);
                  }}
                  className="text-maroon/60 hover:text-maroon transition-colors cursor-pointer"
                >
                  Submit Another RSVP
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10 font-body">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs uppercase tracking-wider font-semibold text-gold-dark">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded border border-gold/40 bg-cream/30 text-maroon focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-sm transition-all placeholder:text-maroon/30"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs uppercase tracking-wider font-semibold text-gold-dark">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 rounded border border-gold/40 bg-cream/30 text-maroon focus:outline-none focus:border-maroon focus:ring-1 focus:ring-maroon text-sm transition-all placeholder:text-maroon/30"
                />
              </div>

              {/* Guests Count & Attending Radio Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Attending Status */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-wider font-semibold text-gold-dark">
                    Will You Attend?
                  </span>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-maroon">
                      <input
                        type="radio"
                        name="attending"
                        value="Yes"
                        checked={formData.attending === "Yes"}
                        onChange={() => setFormData({ ...formData, attending: "Yes" })}
                        className="accent-maroon h-4 w-4 cursor-pointer"
                      />
                      Yes, gladly
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm text-maroon">
                      <input
                        type="radio"
                        name="attending"
                        value="No"
                        checked={formData.attending === "No"}
                        onChange={() => setFormData({ ...formData, attending: "No" })}
                        className="accent-maroon h-4 w-4 cursor-pointer"
                      />
                      No, sorry
                    </label>
                  </div>
                </div>

                {/* Number of Guests */}
                {formData.attending === "Yes" && (
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="guests" className="text-xs uppercase tracking-wider font-semibold text-gold-dark flex items-center gap-1">
                      <FaUserFriends className="w-3.5 h-3.5" />
                      Number of Guests
                    </label>
                    <select
                      id="guests"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full px-4 py-2.5 rounded border border-gold/40 bg-cream/30 text-maroon focus:outline-none focus:border-maroon text-sm cursor-pointer transition-all"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 gold-shimmer-sweep text-maroon-deep font-display font-semibold tracking-widest uppercase text-sm rounded border border-gold-light shadow-lg transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                    Saving RSVP...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <FaHeart className="w-4 h-4 text-gold animate-pulse" />
                    Confirm Attendance
                  </div>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
