"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun, FaArrowDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Import all custom premium components
import AudioPlayer from "@/components/AudioPlayer";
import Blessings from "@/components/Blessings";
import CeremonyTimeline from "@/components/CeremonyTimeline";
import Contact from "@/components/Contact";
import Countdown from "@/components/Countdown";
import DiyaParticles from "@/components/DiyaParticles";
import FlowerPetals from "@/components/FlowerPetals";
import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";
import RSVPForm from "@/components/RSVPForm";
import ScrollInvitation from "@/components/ScrollInvitation";
import VenueMap from "@/components/VenueMap";
import EntranceGate from "@/components/EntranceGate";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [hasEntered, setHasEntered] = useState(false);
  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Freeze page scroll until the doors have fully opened
  useEffect(() => {
    if (!hasUnlocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [hasUnlocked]);

  // Handle entering the website
  const handleEnter = () => {
    setHasEntered(true);
    
    // Unlock scrolling and render heavy assets after transition finishes (1.8s)
    setTimeout(() => {
      setHasUnlocked(true);
    }, 1800);
  };

  // Toggle theme handler
  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="relative min-h-screen bg-cream text-maroon dark:bg-maroon-deep dark:text-cream transition-colors duration-500 overflow-x-hidden">
      {/* ⛩️ Interactive Entrance Gate Cover Page */}
      <EntranceGate
        onEnter={handleEnter}
        isMuted={isMuted}
        onMuteToggle={() => setIsMuted(!isMuted)}
      />

      {/* Background ambient animations - ONLY mount after entering to save CPU during transition */}
      {hasUnlocked && (
        <>
          <FlowerPetals />
          <DiyaParticles />
        </>
      )}

      {/* Floating Audio Player */}
      <AudioPlayer
        forcePlay={hasEntered}
        isMuted={isMuted}
        onMuteToggle={(muted) => setIsMuted(muted)}
      />

      {/* Floating Theme Toggle (Dark/Light mode) - ONLY mount after entering */}
      {hasUnlocked && (
        <div className="fixed top-6 right-6 z-50">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-gold bg-cream text-maroon dark:bg-maroon dark:text-gold shadow-lg cursor-pointer transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <FaMoon className="w-4 h-4 text-maroon" />
            ) : (
              <FaSun className="w-4 h-4 text-gold" />
            )}
          </motion.button>
        </div>
      )}

      {/* Page Sections */}
      <main className="flex flex-col w-full">
        {/* 🏠 Hero Section (Rendered immediately so it is visible right behind opening doors) */}
        <Hero />

        {/* 📅 Countdown Timer (Rendered immediately) */}
        <Countdown />

        {/* Heavy content is deferred to mount AFTER the doors open. 
            This prevents background compilation and rendering blocks, 
            making the entrance transition buttery smooth (60 FPS). */}
        {hasUnlocked && (
          <>
            {/* 📖 Scroll Opening Invitation Card */}
            <ScrollInvitation />

            {/* 📅 Event Schedule Timeline */}
            <CeremonyTimeline />

            {/* 📷 Photo Gallery */}
            <Gallery />

            {/* 📍 Google Maps Venue */}
            <VenueMap />

            {/* 💌 RSVP Form */}
            <RSVPForm />

            {/* 🎁 Blessings Section */}
            <Blessings />

            {/* 📞 Contacts & WhatsApp share */}
            <Contact />
          </>
        )}
      </main>

      {/* Floating Scroll Indicator Cue after unlocking */}
      <AnimatePresence>
        {hasUnlocked && !hasEntered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 0.7, 0], y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-gold pointer-events-none"
          >
            <span className="text-[10px] uppercase tracking-widest font-body">Scroll to Explore</span>
            <FaArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
