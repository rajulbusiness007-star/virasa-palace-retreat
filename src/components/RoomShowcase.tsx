import React, { useState, useRef } from 'react';
import { Bed, Maximize2, Users, Check, Sparkles, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ROOMS_DATA, RoomSuite } from '../data/hotelData';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';
import { useTransitionStyle } from '../context/TransitionContext';

interface RoomShowcaseProps {
  onBookRoom: (roomId: string) => void;
  onViewImage: (imageUrl: string, title: string) => void;
}

interface RoomCardParallaxImageProps {
  imageUrl: string;
  name: string;
  category: string;
  tag?: string;
  onViewImage: (imageUrl: string, title: string) => void;
}

const RoomCardParallaxImage: React.FC<RoomCardParallaxImageProps> = ({
  imageUrl,
  name,
  category,
  tag,
  onViewImage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle vertical parallax scroll for suite imagery
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1.02, 1.06]);

  return (
    <div ref={containerRef} className="relative aspect-[16/10] w-full overflow-hidden bg-[#0E241B]">
      <motion.div 
        style={{ y, scale }}
        className="absolute -top-[10%] -bottom-[10%] inset-x-0 w-full h-[120%] will-change-transform"
      >
        <img
          src={imageUrl}
          alt={name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
      
      {/* Luxury Scrim Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 pointer-events-none" />

      {/* Top Badge */}
      {tag && (
        <div className="absolute top-3 left-3 bg-[#0E241B]/95 backdrop-blur-sm border border-[#C5A059]/60 text-[#F4E8D1] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow z-10">
          {tag}
        </div>
      )}

      {/* Lightbox zoom trigger */}
      <button
        onClick={() => onViewImage(imageUrl, name)}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white/90 flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors z-10"
        aria-label={`View photo of ${name}`}
      >
        <Eye size={15} />
      </button>

      {/* Bottom title in image */}
      <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between text-white z-10 pointer-events-none">
        <div>
          <span className="block text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
            {category}
          </span>
          <h3 className="font-cinzel text-base md:text-lg font-bold tracking-wide text-white drop-shadow-md">
            {name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export const RoomShowcase: React.FC<RoomShowcaseProps> = ({ onBookRoom, onViewImage }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedRoomId, setExpandedRoomId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { getTransitionVariants, transitionStyle } = useTransitionStyle();
  const transitionVariants = getTransitionVariants();

  // Subtle ambient backdrop parallax for the entire showcase section
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const ambientBgY = useTransform(sectionProgress, [0, 1], ['-25px', '25px']);

  const categories = ['All', 'Heritage Suites', 'Grand Suites', 'Luxury Rooms', 'Private Haveli'];

  const filteredRooms = selectedCategory === 'All'
    ? ROOMS_DATA
    : ROOMS_DATA.filter((r) => r.category === selectedCategory);


  return (
    <section 
      ref={sectionRef}
      id="rooms" 
      className="relative py-14 md:py-24 px-4 md:px-8 bg-[#FBFAF6] w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative">
      
      {/* Ambient watermark motif with gentle vertical parallax */}
      <motion.div 
        style={{ y: ambientBgY }}
        className="absolute top-10 right-4 pointer-events-none opacity-[0.035] text-[#0E241B]"
      >
        <RoyalCrest size={340} />
      </motion.div>

      {/* Header with Fade-In-Up */}
      <MotionFadeIn yOffset={18}>
        <div className="text-center mb-8 md:mb-12 relative z-10">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#B99560] uppercase font-bold">
            Royal Living Accommodations
          </span>
          <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-[#17352B] tracking-wider uppercase mt-1">
            Suites, Chambers &amp; Haveli
          </h2>
          <RoyalDivider className="my-2.5 md:my-4" />
          <p className="text-xs md:text-sm text-[#20251F]/80 max-w-lg mx-auto leading-relaxed">
            Crafted for noble comfort. Sandstone arches, hand-painted frescoes, antique royal appointments and 24/7 butler service.
          </p>
        </div>
      </MotionFadeIn>

      {/* Category Filter Tabs (Mobile Scrollable & Laptop Centered) */}
      <MotionFadeIn delay={0.1} yOffset={14}>
        <div className="relative z-10 flex items-center justify-center mb-8 md:mb-10">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0 w-full md:w-auto">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all shrink-0 ${
                  selectedCategory === category
                    ? 'bg-[#0E241B] text-[#F4E8D1] border border-[#C5A059]/60 shadow-md font-semibold'
                    : 'bg-[#F3EFE6] text-[#0E241B]/80 hover:bg-[#C5A059]/15 border border-[#C5A059]/20'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </MotionFadeIn>

      {/* Room Cards List with Dynamic Transition Variants */}
      <div className="relative z-10 min-h-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={transitionVariants.initial}
            animate={transitionVariants.animate}
            exit={transitionVariants.exit}
            className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8"
          >
            {filteredRooms.map((room) => {
              const isExpanded = expandedRoomId === room.id;

              return (
                <motion.div
                  key={room.id}
                  layout
                  className="palace-card rounded-2xl overflow-hidden flex flex-col group transition-all"
                >
                  {/* Room Image Container with Subtle Parallax */}
                  <RoomCardParallaxImage
                    imageUrl={room.imageUrl}
                    name={room.name}
                    category={room.category}
                    tag={room.tag}
                    onViewImage={onViewImage}
                  />

                  {/* Room Card Body */}
                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    
                    {/* Room Specs Grid */}
                    <div className="grid grid-cols-3 gap-2 py-2.5 border-b border-[#C5A059]/15 text-center text-xs">
                      <div className="flex flex-col items-center justify-center p-2 bg-[#F3EFE6] border border-[#C5A059]/20 rounded-lg">
                        <Maximize2 size={13} className="text-[#C5A059] mb-0.5" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Space</span>
                        <span className="font-semibold text-[#0E241B]">{room.areaSqFt} sq.ft</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-[#F3EFE6] border border-[#C5A059]/20 rounded-lg">
                        <Users size={13} className="text-[#C5A059] mb-0.5" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Guests</span>
                        <span className="font-semibold text-[#0E241B]">Up to {room.maxGuests}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-2 bg-[#F3EFE6] border border-[#C5A059]/20 rounded-lg">
                        <Bed size={13} className="text-[#C5A059] mb-0.5" />
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">Bed</span>
                        <span className="font-semibold text-[#0E241B] truncate w-full text-center">Royal Bed</span>
                      </div>
                    </div>

                    {/* View description */}
                    <div className="mt-3 text-xs text-[#1D2320]/75 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span><strong>Vista:</strong> {room.view}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-2 text-xs text-[#1D2320]/80 leading-relaxed">
                      {room.description}
                    </p>

                    {/* Actual Amenities */}
                    <div className="mt-3.5 pt-3 border-t border-[#C5A059]/15">
                      <span className="block text-[10px] uppercase tracking-wider text-[#0E241B] font-bold mb-2">
                        Distinguished Amenities:
                      </span>
                      <div className="space-y-1.5">
                        {room.amenities.slice(0, isExpanded ? room.amenities.length : 3).map((amenity, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#1D2320]/85">
                            <Check size={13} className="text-[#C5A059] shrink-0 mt-0.5" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>

                      {room.amenities.length > 3 && (
                        <button
                          onClick={() => setExpandedRoomId(isExpanded ? null : room.id)}
                          className="mt-2 text-[11px] font-semibold text-[#C5A059] hover:underline block"
                        >
                          {isExpanded ? 'Show Fewer Amenities' : `+ ${room.amenities.length - 3} More Amenities`}
                        </button>
                      )}
                    </div>

                    {/* Footer Price & Booking CTA */}
                    <div className="mt-5 pt-3 border-t border-[#C5A059]/15 flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                          Tariff Inquiries
                        </span>
                        <span className="font-cormorant text-base md:text-lg font-semibold text-[#0E241B] italic">
                          Custom Royal Rate
                        </span>
                      </div>

                      <button
                        onClick={() => onBookRoom(room.id)}
                        className="btn-royal-emerald h-10 px-4 rounded-xl font-cinzel text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5"
                      >
                        <span>Reserve Suite</span>
                        <ChevronRight size={14} className="text-[#D4AF37]" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      </div>
    </section>
  );
};
