"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCalendarPlus, FaPhoneAlt, FaShareAlt, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // Dynamically retrieve URL on client side
    if (typeof window !== "undefined") {
      setShareUrl(window.location.origin);
    }
  }, []);

  const hosts = [
    { name: "Sri G. Gouri Sankar Patro", role: "Host / Contact", phone: "+91 97789 85318", tel: "+919778985318" },
    { name: "Patro Family", role: "Host / Contact", phone: "+91 94384 30457", tel: "+919438430457" },
  ];

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `🙏 ॥ श्री गणेशाय नमः ॥\n\n*Griha Pravesh & Vastu Puja Invitation*\n\nWe cordially invite you to celebrate the auspicious inauguration of our new home on *Thursday, July 16, 2026* starting at *9:15 AM*.\n\nYour presence and blessings will double our joy!\n\nVenue:\nGanapati Nagar 1st line, Near Sarguna street, Aska Road, Berhampur - 760006\n\nView details, map & RSVP here:\n${shareUrl || "https://patro-house-invite.vercel.app"}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const calendarUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Griha+Pravesh+%26+Vastu+Puja&dates=20260716T034500Z%2F20260716T093000Z&details=You+are+cordially+invited+to+celebrate+the+auspicious+inauguration+of+our+new+home.+Ceremonies+include+Dwar+Puja%2C+Vastu+Puja%2C+Havan%2C+and+Mahaprasadam+Lunch.&location=Ganapati+Nagar+1st+line%2C+Near+Sarguna+street%2C+Aska+Road%2C+Berhampur%2C+Odisha+-+760006";

  return (
    <section className="relative w-full py-24 px-6 bg-cream text-maroon overflow-hidden">
      {/* Decorative framing */}
      <div className="absolute inset-x-6 bottom-6 h-[1px] bg-gold/30 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-gold-dark uppercase tracking-widest text-xs font-semibold mb-3 font-body">
          Reach Us
        </span>
        <h2 className="font-display text-3xl font-bold tracking-wide text-maroon text-center mb-16">
          Contact & Invitation Info
        </h2>

        {/* Action Buttons Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full max-w-lg justify-center font-body">
          {/* Add to Google Calendar */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-6 py-3.5 gold-shimmer-sweep text-maroon-deep rounded font-display text-xs font-bold tracking-widest uppercase transition-all shadow-lg cursor-pointer"
            >
              <FaCalendarPlus className="w-4 h-4 text-maroon-deep" />
              Add to Calendar
            </a>
          </motion.div>

          {/* Share invitation on WhatsApp */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
            <button
              onClick={handleWhatsAppShare}
              className="w-full flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded font-display text-xs font-bold tracking-widest uppercase border border-teal-500 shadow-lg hover:brightness-105 transition-all cursor-pointer"
            >
              <FaWhatsapp className="w-4.5 h-4.5" />
              Share on WhatsApp
            </button>
          </motion.div>
        </div>

        {/* Host Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl">
          {hosts.map((host, index) => (
            <motion.div
              key={host.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="p-6 rounded-lg border border-gold/25 bg-[#fffdfa] shadow-xl flex flex-col items-center text-center relative group"
            >
              {/* Inner outline */}
              <div className="absolute inset-1.5 border border-gold/10 rounded pointer-events-none" />

              <span className="text-xs uppercase tracking-widest text-gold-dark font-body font-semibold mb-1">
                {host.role}
              </span>
              <h3 className="font-display text-lg font-bold text-maroon mb-4">
                {host.name}
              </h3>

              {/* Call Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href={`tel:${host.tel}`}
                  className="flex items-center gap-2 px-5 py-2.5 bg-maroon text-gold font-body text-xs font-bold tracking-wider rounded border border-gold shadow-md hover:bg-maroon-light transition-colors"
                >
                  <FaPhoneAlt className="w-3.5 h-3.5 text-gold" />
                  {host.phone}
                </a>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Elegant Footer logo / design */}
        <div className="flex flex-col items-center mt-20 text-maroon/40 text-center font-display">
          <div className="w-8 h-8 relative mb-2 opacity-50">
            {/* Elegant Lotus outline or icon symbol */}
            <svg viewBox="0 0 100 100" className="w-full h-full fill-maroon">
              <path d="M50 20c-5 0-10 10-10 15 0 5 10 10 10 10s10-5 10-10c0-5-5-15-10-15zm-20 20c-5 0-10 10-10 15 0 5 10 10 10 10s10-5 10-10c0-5-5-15-10-15zm40 0c-5 0-10 10-10 15 0 5 10 10 10 10s10-5 10-10c0-5-5-15-10-15z" />
            </svg>
          </div>
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-gold-dark">
            ॥ मङ्गलम् मङ्गलम् ॥
          </span>
          <span className="text-[10px] font-body mt-2 text-maroon/30">
            © 2026 Griha Pravesh Invitation Website. Built with love and devotion.
          </span>
        </div>
      </div>
    </section>
  );
}
