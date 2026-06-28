"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Countdown() {
  const targetDate = "2026-07-16T09:15:00"; // Event on 16 July 2026 at 9:15 AM

  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null; // Avoid hydration mismatch

  const timeItems = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section className="relative w-full py-16 px-6 bg-gradient-to-b from-maroon-deep to-maroon text-cream overflow-hidden">
      {/* Decorative lotus background graphic element */}
      <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
        <svg
          className="w-96 h-96 text-gold fill-current"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50 15c-4-8-12-11-12-11s-2 8 2 13c-7-5-16-4-16-4s2 8 8 10c-9-1-17 3-17 3s6 7 12 7c-10 4-15 11-15 11s8 4 14 0c-8 7-9 15-9 15s9 1 13-6c-4 9-1 17-1 17s8-3 9-12c1 10 7 15 7 15s5-7 3-15c4 9 10 11 10 11s3-9-2-15c6 7 13 6 13 6s-2-8-9-10c8 1 15-3 15-3s-6-7-12-7c10-4 15-11 15-11s-8-4-14 0c8-7 9-15 9-15s-9-1-13 6c4-9 1-17 1-17s-8 3-9 12c-1-10-7-15-7-15s-5 7-3 15c-4-9-10-11-10-11s-3 9 2 15z" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-gold uppercase tracking-widest text-xs font-semibold mb-3 font-body"
        >
          Countdown to the Auspicious Ceremony
        </motion.p>
        
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl font-bold tracking-wide text-cream mb-8"
        >
          Inauguration Begins In
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl px-4">
          {timeItems.map((item, index) => (
            <motion.div
              key={item.label}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg glass-dark border border-gold/30 bg-maroon-deep/60 shadow-2xl relative group overflow-hidden"
            >
              {/* Card Gold reflection shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
              
              {/* Golden Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-light via-gold to-gold-dark" />

              <div className="h-12 sm:h-16 overflow-hidden flex items-center justify-center relative w-full">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={item.value}
                    initial={{ y: -25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 25, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-light to-gold-dark inline-block"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>

              <span className="text-xs uppercase tracking-widest text-cream/70 mt-2 font-body font-medium">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-cream/60 text-xs sm:text-sm font-body tracking-wider"
        >
          Ceremony Date: <span className="text-gold font-medium">Thursday, July 16, 2026</span> at <span className="text-gold font-medium">9:15 AM IST</span>
        </motion.div>
      </div>
    </section>
  );
}
