import React, { useState } from 'react';
import { Eye, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_DATA, GalleryImage } from '../data/hotelData';
import { RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface GalleryLightboxProps {
  initialActiveImage?: { url: string; title: string } | null;
  onClearInitial?: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  initialActiveImage,
  onClearInitial
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Weddings', 'Suites', 'Architecture', 'Dining'];

  const filteredImages = selectedCategory === 'All'
    ? GALLERY_DATA
    : GALLERY_DATA.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (onClearInitial) onClearInitial();
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const activeImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-10 md:py-20 px-4 md:px-8 lg:px-12 bg-[#F7F4EC]">
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-6 md:mb-10">
            <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              Visual Tapestry
            </span>
            <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-[#143126] tracking-wider uppercase mt-1">
              Palace &amp; Wedding Gallery
            </h2>
            <RoyalDivider className="my-2.5 md:my-4" />
            <p className="text-xs md:text-sm text-[#1D2320]/80 max-w-md mx-auto leading-relaxed">
              Glimpses of royal ceremonies, illuminated palace courtyards, and artisanal Rajputana architecture.
            </p>
          </div>
        </MotionFadeIn>

        {/* Category Pills */}
        <MotionFadeIn delay={0.1} yOffset={14}>
          <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 px-4 md:mx-0">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs md:text-sm font-cinzel transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'btn-royal-emerald shadow-md'
                    : 'bg-[#F3EFE6] text-[#143126] border border-[#C5A059]/20 hover:border-[#C5A059]/60'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </MotionFadeIn>

        {/* Gallery Grid with PopLayout Animated Transitions */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((img, idx) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[#0E241B] border border-[#C5A059]/30 cursor-pointer shadow-md hover:shadow-2xl transition-all"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div>
                    <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wider uppercase block">{img.category}</span>
                    <span className="text-xs md:text-sm font-medium text-white line-clamp-1">{img.title}</span>
                  </div>
                </div>
                
                <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/50 text-white/90 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                  <Eye size={14} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Fullscreen Mobile & Laptop Lightbox with Smooth Scale Zoom */}
      <AnimatePresence>
        {(lightboxIndex !== null || initialActiveImage) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white/90 py-2 max-w-5xl mx-auto w-full">
              <span className="font-cinzel text-xs md:text-sm font-semibold text-[#DFCEB2]">
                {activeImage?.title || initialActiveImage?.title}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"
                aria-label="Close photo lightbox"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Centered Image with Scale and Slide Micro-interactions */}
            <div className="relative flex-1 flex items-center justify-center overflow-hidden my-auto max-h-[75vh] max-w-5xl mx-auto w-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage?.imageUrl || initialActiveImage?.url}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  src={activeImage?.imageUrl || initialActiveImage?.url}
                  alt={activeImage?.title || initialActiveImage?.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                />
              </AnimatePresence>

              {/* Navigation buttons */}
              {lightboxIndex !== null && filteredImages.length > 1 && (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-[#B99560] hover:text-[#17352B] transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft size={22} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-2 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-[#B99560] hover:text-[#17352B] transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight size={22} />
                  </motion.button>
                </>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="py-3 text-center text-xs text-white/80 max-w-sm mx-auto">
              <p className="line-clamp-2">
                {activeImage?.caption || "VIRĀSĀ Palace & Retreat luxury heritage visual record."}
              </p>
              {lightboxIndex !== null && (
                <span className="block text-[10px] text-[#B99560] mt-1 font-mono">
                  {lightboxIndex + 1} of {filteredImages.length}
                </span>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
