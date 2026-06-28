"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaDoorOpen, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface EntranceGateProps {
  onEnter: () => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export default function EntranceGate({ onEnter, isMuted, onMuteToggle }: EntranceGateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleEnter = () => {
    setIsOpen(true);
    onEnter(); // Play music and trigger parent transitions

    // Remove the gate from DOM after doors slide open
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex overflow-hidden select-none">
      {/* LEFT DOOR PANEL */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-maroon-deep border-r-2 border-gold/40 relative flex items-center justify-end"
        style={{
          backgroundImage: "radial-gradient(circle at 100% 50%, #4a1010 0%, #1f0505 100%)",
        }}
      >
        {/* Left Temple Arch Corner */}
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-gold/20 rounded-tr-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-gold/20 rounded-br-full pointer-events-none" />

        {/* Traditional Gold Patterns on door */}
        <div className="mr-8 flex flex-col gap-12 opacity-15 text-gold hidden sm:flex">
          <span className="text-4xl text-right">शुभ</span>
          <span className="text-4xl text-right">❀</span>
          <span className="text-4xl text-right">卐</span>
        </div>
      </motion.div>

      {/* RIGHT DOOR PANEL */}
      <motion.div
        initial={{ x: 0 }}
        animate={isOpen ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-maroon-deep border-l-2 border-gold/40 relative flex items-center justify-start"
        style={{
          backgroundImage: "radial-gradient(circle at 0% 50%, #4a1010 0%, #1f0505 100%)",
        }}
      >
        {/* Right Temple Arch Corner */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-gold/20 rounded-tl-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-gold/20 rounded-bl-full pointer-events-none" />

        {/* Traditional Gold Patterns on door */}
        <div className="ml-8 flex flex-col gap-12 opacity-15 text-gold hidden sm:flex">
          <span className="text-4xl text-left">लाभ</span>
          <span className="text-4xl text-left">❀</span>
          <span className="text-4xl text-left">卐</span>
        </div>
      </motion.div>

      {/* CENTER GLOWING SHIELD & BUTTON (Overlapping both doors) */}
      <motion.div
        animate={isOpen ? { scale: 0.8, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center z-50 p-4 sm:p-6 pointer-events-none"
      >
        <div className="glass-dark border-2 border-gold p-6 sm:p-12 rounded-[2rem] sm:rounded-full flex flex-col items-center text-center shadow-[0_0_50px_rgba(200,155,60,0.55)] max-w-[90%] sm:max-w-md pointer-events-auto relative group overflow-hidden">
          {/* Circular Shine reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-gold/5 via-transparent to-gold/10 pointer-events-none" />
          <div className="absolute inset-2 border border-gold/20 rounded-full pointer-events-none" />

          {/* Mute Toggle on Gate */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMuteToggle();
            }}
            className="absolute top-4 right-4 text-cream hover:text-gold z-30 transition-colors w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer shadow-md"
            aria-label="Toggle music before entering"
          >
            {isMuted ? (
              <FaVolumeMute className="w-4.5 h-4.5 text-gold/60" />
            ) : (
              <FaVolumeUp className="w-4.5 h-4.5 text-gold" />
            )}
          </button>

          {/* Ganesha Emblem */}
          <motion.div
            animate={{
              scale: [1, 1.06, 1],
              y: [0, -8, 0]
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-20 h-20 sm:w-28 sm:h-28 mb-4 relative drop-shadow-[0_0_10px_rgba(200,155,60,0.4)]"
          >
            <Image
              src="/ganesha.png"
              alt="Lord Ganesha Emblem"
              fill
              sizes="(max-width: 640px) 80px, 112px"
              className="object-contain"
            />
          </motion.div>

          <h1 className="font-display text-gold-light text-xs tracking-[0.25em] font-semibold uppercase mb-1">
            Griha Pravesh Invitation
          </h1>
          
          <h2 className="font-display text-cream text-2xl sm:text-3xl font-bold mb-4 tracking-wide">
            The Patro Family
          </h2>

          <div className="w-24 h-[1px] bg-gold/40 my-1" />

          <p className="font-body text-[11px] text-cream/70 leading-relaxed max-w-[280px] mb-6">
            Enter the auspicious portal to celebrate the inauguration of our new home.
          </p>

          {/* Tap to Enter Button */}
          <motion.button
            onClick={handleEnter}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-2.5 gold-shimmer-sweep text-maroon-deep font-display text-[10px] font-bold tracking-widest uppercase rounded border border-gold-light shadow-xl transition-all cursor-pointer"
          >
            <FaDoorOpen className="w-4 h-4 text-maroon-deep" />
            Tap to Open Gate
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
