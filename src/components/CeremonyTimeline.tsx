"use client";

import { motion, Variants } from "framer-motion";
import { FaFire, FaHands, FaSun, FaUtensils } from "react-icons/fa";

interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function CeremonyTimeline() {
  const events: TimelineEvent[] = [
    {
      time: "09:15 AM",
      title: "🪔 Vastu Puja & Dwar Puja",
      description:
        "Welcoming the deities and purifying the home entrance. Rituals to invoke the blessings of Vastu Purush for peace and harmony.",
      icon: <FaSun className="w-5 h-5 text-gold-dark" />,
    },
    {
      time: "10:30 AM",
      title: "🔥 Holy Havan & Aarti",
      description:
        "Sacred fire sacrifice with chanting of Vedic hymns to cleanse the atmosphere and invoke divine energy throughout the home.",
      icon: <FaFire className="w-5 h-5 text-gold-dark" />,
    },
    {
      time: "12:30 PM onwards",
      title: "🍛 Mahaprasadam (Lunch)",
      description:
        "A celebration of love and togetherness over a traditional satvik lunch. Join us for a feast in our new courtyard.",
      icon: <FaUtensils className="w-5 h-5 text-gold-dark" />,
    },
    {
      time: "All Day",
      title: "🙏 Blessings & Meet",
      description:
        "Welcoming friends, family, and loved ones. Sharing stories, laughter, and wishes for a prosperous future in our new abode.",
      icon: <FaHands className="w-5 h-5 text-gold-dark" />,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariantsLeft: Variants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const cardVariantsRight: Variants = {
    hidden: { x: 40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full py-24 px-6 bg-gradient-to-b from-maroon to-maroon-deep text-cream overflow-hidden">
      {/* Background Mandala overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-gold">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 0L60 30L90 30L65 50L75 80L50 60L25 80L35 50L10 30L40 30Z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 font-body">
          Ceremony Schedule
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-cream mb-16">
          Timeline of Events
        </h2>

        {/* Timeline Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative w-full flex flex-col items-center"
        >
          {/* Vertical Center Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute top-0 bottom-0 left-[18px] md:left-1/2 w-0.5 bg-gradient-to-b from-gold-light via-gold to-gold-dark/20 transform -translate-x-1/2 origin-top pointer-events-none"
          />

          {events.map((event, index) => {
            const isLeft = index % 2 === 0;
            const cardVariants = isLeft ? cardVariantsLeft : cardVariantsRight;

            return (
              <div
                key={event.title}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-12 last:mb-0 relative group"
              >
                {/* Timeline Node Circle */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                  className="absolute left-[18px] md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-maroon border-2 border-gold flex items-center justify-center z-20 shadow-[0_0_12px_rgba(200,155,60,0.4)] group-hover:scale-110 transition-transform duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="w-2.5 h-2.5 rounded-full bg-gold animate-flicker"
                  />
                </motion.div>

                {/* Event Card Wrapper */}
                <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${isLeft ? "md:text-right" : "md:order-last md:text-left"}`}>
                  <motion.div
                    variants={cardVariants}
                    viewport={{ once: true }}
                    className="p-4 sm:p-6 rounded-lg glass-dark border border-gold/20 bg-maroon-deep/40 shadow-xl relative hover:border-gold/50 transition-all duration-300 group-hover:shadow-[0_10px_30px_rgba(122,31,31,0.2)]"
                  >
                    {/* Time Label (Floating) */}
                    <div className={`inline-block px-3 py-1 bg-maroon-light border border-gold/30 rounded-full text-xs font-semibold font-body tracking-wider text-gold-light mb-3`}>
                      {event.time}
                    </div>

                    <h3 className="font-display text-lg font-bold text-gold mb-2 tracking-wide">
                      {event.title}
                    </h3>
                    
                    <p className="text-sm text-cream/80 leading-relaxed font-body">
                      {event.description}
                    </p>

                    {/* Miniature Floating Icon */}
                    <div className={`absolute top-4 ${isLeft ? "right-4" : "right-4"} w-8 h-8 rounded-full bg-cream/5 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity`}>
                      {event.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for MD screens to align timeline */}
                <div className="hidden md:block w-[45%]" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
