"use client";

import { useEffect, useRef, useState } from "react";
import { FaMusic, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

interface AudioPlayerProps {
  forcePlay?: boolean;
  isMuted?: boolean;
  onMuteToggle?: (muted: boolean) => void;
}

export default function AudioPlayer({ forcePlay = false, isMuted = false, onMuteToggle }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioRef | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToast, setShowToast] = useState(true);

  // Initialize Audio
  useEffect(() => {
    // We use the locally hosted high-quality Hindustani classical instrumental flute/sitar track
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = isMuted ? 0 : 0.8;
    audioRef.current = audio;

    // Fade toast after 8 seconds
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 8000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Sync volume with isMuted prop
  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0;
        audioRef.current.pause();
        setIsPlaying(false);
      } else if (isPlaying) {
        audioRef.current.volume = 0.8;
      }
    }
  }, [isMuted]);

  // Volume fade-in function
  const fadeInVolume = () => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0;
    audioRef.current.play()
      .then(() => {
        setIsPlaying(true);
        setShowToast(false);
        
        let vol = 0;
        const interval = setInterval(() => {
          if (!audioRef.current) {
            clearInterval(interval);
            return;
          }
          vol += 0.05;
          if (vol >= 0.8) {
            audioRef.current.volume = 0.8;
            clearInterval(interval);
          } else {
            audioRef.current.volume = vol;
          }
        }, 150); // Fades in over ~2.4 seconds
      })
      .catch((err) => {
        console.log("Autoplay forced play error:", err);
      });
  };

  // Force play when parent component triggers it (e.g. on opening the entrance gate)
  useEffect(() => {
    if (forcePlay && audioRef.current && !isPlaying && !isMuted) {
      fadeInVolume();
    }
  }, [forcePlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (onMuteToggle) onMuteToggle(true);
    } else {
      if (onMuteToggle) onMuteToggle(false);
      // Fade in on manual play too
      fadeInVolume();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showToast && !isPlaying && (
        <div className="animate-bounce bg-cream text-maroon border border-gold px-4 py-2 rounded-full shadow-lg text-xs font-semibold tracking-wider font-display glass-light flex items-center gap-2">
          <span>🌸 Tap screen to play devotional music</span>
        </div>
      )}
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-gold shadow-2xl transition-all duration-300 ${
          isPlaying && !isMuted
            ? "bg-maroon text-gold rotate-360 animate-pulse-slow"
            : "bg-cream text-maroon hover:bg-gold hover:text-maroon"
        }`}
        aria-label="Toggle background music"
      >
        {isPlaying && !isMuted ? (
          <div className="relative">
            <FaVolumeUp className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full animate-ping" />
          </div>
        ) : (
          <div className="relative">
            <FaVolumeMute className="w-5 h-5 text-gray-500" />
            <FaMusic className="absolute -top-1 -right-1 w-3 h-3 text-gold opacity-50" />
          </div>
        )}
      </button>
    </div>
  );
}

// Inline declaration of typing helper for HTMLAudioElement
type HTMLAudioRef = HTMLAudioElement;
