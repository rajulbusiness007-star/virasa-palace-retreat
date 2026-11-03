import React, { useState } from 'react';
import { Sparkles, Heart, Clock, MapPin, ChevronRight, Check, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { WEDDING_CEREMONIES, WEDDING_VENUES, WeddingCeremony, WeddingVenue } from '../data/hotelData';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';
import { useTransitionStyle } from '../context/TransitionContext';
import { RoyalAmbientParticles } from './RoyalAmbientParticles';

interface WeddingExperienceProps {
  onOpenWeddingEnquiry: () => void;
  onViewImage: (imageUrl: string, title: string) => void;
}

export const WeddingExperience: React.FC<WeddingExperienceProps> = ({
  onOpenWeddingEnquiry,
  onViewImage
}) => {
  const [activeCeremonyId, setActiveCeremonyId] = useState<string>(WEDDING_CEREMONIES[0].id);
  const activeCeremony = WEDDING_CEREMONIES.find((c) => c.id === activeCeremonyId) || WEDDING_CEREMONIES[0];

  const { getTransitionVariants, transitionStyle } = useTransitionStyle();
  const transitionVariants = getTransitionVariants();

  return (
    <section id="weddings" className="py-12 bg-gradient-to-b from-[#091913] via-[#0E241B] to-[#091913] text-[#FBFAF6] relative overflow-hidden">
      
      {/* Background Decorative Subtle Texture & Floating Particles */}
      <div className="absolute inset-0 opacity-10 pointer-events-none jali-texture" />
      <RoyalAmbientParticles particleCount={24} className="opacity-40" />

      <div className="px-4 md:px-8 max-w-7xl mx-auto relative z-10 w-full">

        
        {/* Section Header with Motion */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#D4AF37] mb-3">
              <Heart size={20} />
            </div>
            <span className="block text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              The Royal Destination Wedding
            </span>
            <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-[#FBFAF6] uppercase mt-1">
              Palace Weddings &amp; Celebrations
            </h2>
            <RoyalDivider className="my-2.5 md:my-4" />
            <p className="text-xs md:text-sm text-[#DFCEB2]/90 max-w-md mx-auto leading-relaxed">
              Where ancestral royal romance meets modern couture grandeur. An immortal palace realm to solemnize your eternal vows.
            </p>
          </div>
        </MotionFadeIn>

        {/* Wedding Highlights Carousel / Hero Card */}
        <MotionFadeIn yOffset={20} delay={0.1}>
          <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/40 mb-10 md:mb-16 shadow-2xl md:flex md:flex-row md:items-stretch palace-card-dark">
          <div className="relative aspect-[16/11] md:aspect-auto md:w-3/5 bg-[#091913]">
            <img
              src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85"
              alt="Floating mandap at dusk with floral canopy and reflection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover min-h-[260px] md:min-h-[360px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091913] via-[#0E241B]/40 to-transparent" />
            
            <div className="absolute top-3 right-3">
              <button
                onClick={() => onViewImage(
                  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=85",
                  "The Royal Floating Mandap at Twilight"
                )}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C5A059] transition-colors"
                aria-label="Enlarge mandap photo"
              >
                <Eye size={14} />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-left">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Signature Setting
              </span>
              <h3 className="font-cinzel text-base md:text-xl font-bold text-white leading-tight mt-0.5">
                The Lotus Lake Floating Mandap
              </h3>
              <p className="text-[11px] md:text-xs text-[#DFCEB2] line-clamp-2 mt-1">
                Vows echoed over calm waters as twilight descends over Aravali hills and conches sound across illuminated ramparts.
              </p>
            </div>
          </div>

          <div className="p-5 md:p-8 bg-[#091913]/90 flex flex-col justify-between md:w-2/5 border-t md:border-t-0 md:border-l border-[#C5A059]/30 space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] md:text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">
                Exclusivity Charter
              </span>
              <h4 className="font-cinzel text-lg md:text-xl font-bold text-[#FBFAF6]">
                Only 1 Wedding at a Time
              </h4>
              <p className="text-xs md:text-sm text-[#DFCEB2]/80 leading-relaxed">
                VIRĀSĀ guarantees total estate privacy for the wedding party. All historical courtyards, ballrooms, and 100+ palace artisans are dedicated exclusively to your celebrations.
              </p>
              <div className="pt-2 space-y-1.5 text-xs text-[#DFCEB2]">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4AF37]" />
                  <span>Floating Vedic Mandap over Lotus Waters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4AF37]" />
                  <span>Helipad &amp; Vintage Royal Procession Fleet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-[#D4AF37]" />
                  <span>Imperial Silver Dining &amp; Royal Khansama Service</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenWeddingEnquiry}
              className="btn-royal-gold w-full h-11 md:h-12 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles size={14} className="text-[#0E241B]" />
              <span>Inquire Wedding Dates</span>
            </motion.button>
          </div>
        </div>
        </MotionFadeIn>

        {/* 6 Dedicated Ceremonies Section Header */}
        <MotionFadeIn yOffset={18}>
          <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                <h3 className="font-cinzel text-base md:text-lg font-bold tracking-wider text-[#FBFAF6] uppercase">
                  The Six Sacred Ceremonies
                </h3>
              </div>
              <p className="text-xs text-[#DFCEB2]/80">
                A bespoke royal itinerary crafted for your multi-day destination wedding celebration.
              </p>
            </div>
            
            {/* Quick Prev / Next Ceremony Controls */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] md:text-xs text-[#D4AF37] font-medium tracking-wide">
                Live Effect: <strong className="font-cinzel uppercase text-white bg-[#091913] px-2 py-0.5 rounded border border-[#C5A059]/40">{transitionStyle}</strong>
              </span>

              <div className="flex items-center gap-1 ml-1">
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = WEDDING_CEREMONIES.findIndex((c) => c.id === activeCeremonyId);
                    const prevIndex = (currentIndex - 1 + WEDDING_CEREMONIES.length) % WEDDING_CEREMONIES.length;
                    setActiveCeremonyId(WEDDING_CEREMONIES[prevIndex].id);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#091913] border border-[#C5A059]/40 hover:border-[#D4AF37] text-[#DFCEB2] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="Previous Ceremony"
                  aria-label="Previous Ceremony"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = WEDDING_CEREMONIES.findIndex((c) => c.id === activeCeremonyId);
                    const nextIndex = (currentIndex + 1) % WEDDING_CEREMONIES.length;
                    setActiveCeremonyId(WEDDING_CEREMONIES[nextIndex].id);
                  }}
                  className="w-7 h-7 rounded-lg bg-[#091913] border border-[#C5A059]/40 hover:border-[#D4AF37] text-[#DFCEB2] hover:text-white flex items-center justify-center text-xs transition-colors"
                  title="Next Ceremony"
                  aria-label="Next Ceremony"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </MotionFadeIn>

        {/* Horizontal Ceremony Selector Buttons with Micro-Interactions */}
        <MotionFadeIn delay={0.1} yOffset={14}>
          <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 md:mx-0 px-4 md:px-0">
            {WEDDING_CEREMONIES.map((ceremony, idx) => {
              const isActive = ceremony.id === activeCeremonyId;
              return (
                <motion.button
                  key={ceremony.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveCeremonyId(ceremony.id)}
                  className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                    isActive
                      ? 'btn-royal-gold shadow-md'
                      : 'bg-[#091913] text-[#DFCEB2] border border-[#C5A059]/30 hover:border-[#C5A059]/70'
                  }`}
                >
                  <span className="opacity-75">0{idx + 1}.</span>
                  <span>{ceremony.id.charAt(0).toUpperCase() + ceremony.id.slice(1)}</span>
                </motion.button>
              );
            })}
          </div>
        </MotionFadeIn>


        {/* Active Ceremony Card Display with Animated Transitions */}
        <div className="relative mb-12 md:mb-16 min-h-[460px] md:min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCeremony.id}
              initial={transitionVariants.initial}
              animate={transitionVariants.animate}
              exit={transitionVariants.exit}
              className="palace-card-dark rounded-2xl overflow-hidden md:grid md:grid-cols-2 md:items-stretch"
            >
              <div className="relative aspect-[16/10] md:aspect-auto w-full bg-black/40 min-h-[260px] md:min-h-[380px]">
                <img
                  src={activeCeremony.imageUrl}
                  alt={activeCeremony.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091913] via-black/40 to-transparent" />
                
                <button
                  onClick={() => onViewImage(activeCeremony.imageUrl, activeCeremony.title)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C5A059] transition-colors"
                  aria-label={`Enlarge photo for ${activeCeremony.title}`}
                >
                  <Eye size={14} />
                </button>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1">
                    <Clock size={11} />
                    <span>{activeCeremony.timing}</span>
                  </span>
                  <h4 className="font-cinzel text-lg md:text-2xl font-bold text-white mt-1 drop-shadow-md">
                    {activeCeremony.title}
                  </h4>
                  <span className="block text-xs md:text-sm font-cormorant italic text-[#F4E8D1]">
                    {activeCeremony.subtitle}
                  </span>
                </div>
              </div>

              <div className="p-5 md:p-8 flex flex-col justify-between space-y-4">
                <div className="space-y-4">
                  <p className="text-xs md:text-sm text-[#F7F4EC]/90 leading-relaxed">
                    {activeCeremony.description}
                  </p>

                  <div className="bg-[#091913]/90 p-3.5 rounded-xl border border-[#C5A059]/30 space-y-2 text-xs md:text-sm">
                    <div className="flex items-start gap-2 text-[#DFCEB2]">
                      <MapPin size={15} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      <span><strong>Palace Venue:</strong> {activeCeremony.setting}</span>
                    </div>
                    <div className="text-[11px] md:text-xs text-[#DFCEB2]/80">
                      <strong>Atmosphere:</strong> {activeCeremony.ambience}
                    </div>
                  </div>

                  {/* Bespoke Features List */}
                  <div>
                    <span className="block text-[10px] md:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold mb-2.5">
                      Curated Ceremonial Inclusions:
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      {activeCeremony.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[11px] md:text-xs text-[#F4E8D1] bg-[#0E241B]/80 p-2.5 rounded-lg border border-[#C5A059]/20">
                          <Check size={13} className="text-[#D4AF37] shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenWeddingEnquiry}
                  className="btn-royal-gold w-full h-11 md:h-12 rounded-xl text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2"
                >
                  <span>Enquire for {activeCeremony.id.toUpperCase()}</span>
                  <ChevronRight size={14} className="text-[#0E241B]" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Section: Palace Wedding Venues (Lawns & Halls) with Explicit Placeholders */}
        <div id="venues" className="pt-2">
          <MotionFadeIn yOffset={18}>
            <div className="text-center mb-6">
              <span className="text-[10px] tracking-[0.25em] text-[#B99560] uppercase font-bold">
                Celebration Spaces &amp; Lawns
              </span>
              <h3 className="font-cinzel text-lg xs:text-xl font-bold tracking-wider text-[#FBFAF6] uppercase mt-0.5">
                Imperial Wedding Venues
              </h3>
              <p className="text-xs text-[#DFCEB2]/80 mt-1">
                From open-air ramparts under starlit skies to ornate ancestral ballroom halls.
              </p>
            </div>
          </MotionFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-4">
            {WEDDING_VENUES.map((venue, idx) => (
              <MotionFadeIn key={venue.id} yOffset={18} delay={idx * 0.08}>
                <div
                  className="bg-[#122820] rounded-xl border border-[#B99560]/30 overflow-hidden shadow-lg flex flex-col"
                >
                  <div className="relative aspect-[16/9] w-full bg-black/40">
                    <img
                      src={venue.imageUrl}
                      alt={venue.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#122820] via-transparent to-transparent" />
                    
                    <div className="absolute top-2.5 left-2.5 bg-[#17352B]/90 border border-[#B99560]/40 text-[#DFCEB2] text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {venue.type}
                    </div>

                    <button
                      onClick={() => onViewImage(venue.imageUrl, venue.name)}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#B99560]"
                      aria-label={`Enlarge photo for ${venue.name}`}
                    >
                      <Eye size={13} />
                    </button>

                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h4 className="font-cinzel text-sm font-bold text-white">
                        {venue.name}
                      </h4>
                    </div>
                  </div>

                  <div className="p-3.5 space-y-2 text-xs">
                    <p className="text-[#DFCEB2]/85 text-[11px] leading-relaxed">
                      {venue.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-[#B99560]/20 text-[11px]">
                      <span className="text-[#B99560] font-medium">Ideal For: {venue.idealFor}</span>
                    </div>

                    {/* Section 13 Capacity Placeholder */}
                    <div className="p-2 bg-[#17352B] rounded-lg border border-[#B99560]/20 text-[10px] text-[#DFCEB2]/70 font-mono">
                      {venue.capacityNote}
                    </div>
                  </div>
                </div>
              </MotionFadeIn>
            ))}
          </div>

          {/* Wedding Bottom Banner CTA */}
          <MotionFadeIn yOffset={20} delay={0.1}>
            <div className="mt-8 p-6 md:p-8 bg-gradient-to-r from-[#091913] via-[#0E241B] to-[#091913] rounded-2xl border border-[#C5A059]/40 text-center space-y-3.5 shadow-2xl">
              <RoyalCrest size={36} className="mx-auto text-[#D4AF37]" />
              <h4 className="font-cinzel text-base md:text-xl font-bold text-[#FBFAF6] tracking-wide uppercase">
                Begin Your Royal Wedding Story
              </h4>
              <p className="text-xs md:text-sm text-[#DFCEB2]/90 max-w-sm mx-auto">
                Our dedicated royal wedding specialists curate bespoke menus, Vedic decor, and ancestral hospitality.
              </p>
              <button
                onClick={onOpenWeddingEnquiry}
                className="btn-royal-gold w-full max-w-xs mx-auto h-12 rounded-xl text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Sparkles size={15} className="text-[#0E241B]" />
                <span>Submit Wedding Enquiry</span>
              </button>
            </div>
          </MotionFadeIn>

        </div>

      </div>
    </section>
  );
};
