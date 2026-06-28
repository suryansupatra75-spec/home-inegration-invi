"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

export default function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items: GalleryItem[] = [
    {
      id: 0,
      src: "/real_house.jpg",
      alt: "Patro Residence - Our New Home",
      title: "Patro Residence",
      description: "A dream realized in brick and stone. A modern, warm sanctuary built for our family and friends.",
    },
    {
      id: 1,
      src: "/construction.png",
      alt: "Foundation and Journey",
      title: "The Construction Journey",
      description: "From laying the foundation stones to watching the structure rise brick by brick, honoring the soil.",
    },
    {
      id: 2,
      src: "/home_entrance.png",
      alt: "Welcoming Decorated Entrance",
      title: "Traditional Welcoming Gate",
      description: "Invoking peace and goodness at our front door with holy marigold torans and traditional brass lamps.",
    },
  ];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedId === null) return;
    setSelectedId(selectedId === 0 ? items.length - 1 : selectedId - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedId === null) return;
    setSelectedId(selectedId === items.length - 1 ? 0 : selectedId + 1);
  };

  const selectedItem = selectedId !== null ? items[selectedId] : null;

  return (
    <section className="relative w-full py-24 px-6 bg-cream text-maroon overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <span className="text-gold-dark uppercase tracking-widest text-xs font-semibold mb-3 font-body">
          Visual Memories
        </span>
        <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-maroon text-center mb-16">
          Capture the Journey
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {items.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col cursor-pointer group rounded-lg overflow-hidden border border-gold/25 shadow-lg bg-[#fffdfa]"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-maroon-deep">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gold Highlight Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <span className="px-4 py-1.5 bg-gold text-maroon-deep font-display text-xs font-bold tracking-wider uppercase border border-gold-light rounded">
                    View Close-Up
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 border-t border-gold/10 flex flex-col">
                <h3 className="font-display text-lg font-bold text-maroon group-hover:text-gold-dark transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-maroon/70 font-body mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal using AnimatePresence */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 text-cream hover:text-gold w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 shadow-lg transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-lg overflow-hidden glass-dark border border-gold/40 bg-maroon-deep shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible"
            >
              {/* Image Section */}
              <div className="relative flex-1 aspect-[4/3] md:aspect-auto md:h-[500px] bg-black">
                <Image
                  src={selectedItem.src}
                  alt={selectedItem.alt}
                  fill
                  className="object-contain"
                />

                {/* Left/Right Navigation inside image */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-gold/30 text-gold flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-gold/30 text-gold flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next image"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Text Description Section */}
              <div className="p-6 md:w-[320px] flex flex-col justify-center text-cream border-t md:border-t-0 md:border-l border-gold/25">
                <span className="text-gold text-xs font-semibold tracking-wider font-body uppercase mb-2">
                  Gallery Showcase
                </span>
                <h3 className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-light to-gold-dark mb-4">
                  {selectedItem.title}
                </h3>
                <p className="text-sm text-cream/80 leading-relaxed font-body">
                  {selectedItem.description}
                </p>

                {/* Dots Indicator */}
                <div className="flex gap-2 mt-8 justify-center md:justify-start">
                  {items.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setSelectedId(it.id)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                        it.id === selectedId ? "bg-gold" : "bg-cream/20 hover:bg-cream/40"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
