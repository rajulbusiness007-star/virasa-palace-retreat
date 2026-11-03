import React, { useState } from 'react';
import { Utensils, Sparkles, Clock, Check, ChevronRight, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EXPERIENCES_DATA, ExperienceItem } from '../data/hotelData';
import { RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';
import { useTransitionStyle } from '../context/TransitionContext';

interface ExperiencesShowcaseProps {
  onReserveExperience: (experienceTitle: string) => void;
  onViewImage: (imageUrl: string, title: string) => void;
}

export const ExperiencesShowcase: React.FC<ExperiencesShowcaseProps> = ({
  onReserveExperience,
  onViewImage
}) => {
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>(EXPERIENCES_DATA[0].id);
  const activeExp = EXPERIENCES_DATA.find((e) => e.id === selectedExperienceId) || EXPERIENCES_DATA[0];

  const { getTransitionVariants, transitionStyle } = useTransitionStyle();
  const transitionVariants = getTransitionVariants();

  return (
    <section id="experiences" className="py-14 md:py-24 px-4 md:px-8 bg-[#F7F4EC] w-full">
      <div className="max-w-7xl mx-auto">
      
      {/* Section Header */}
      <MotionFadeIn yOffset={18}>
        <div className="text-center mb-8 md:mb-12 max-w-2xl mx-auto">
          <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
            Royal Indulgences
          </span>
          <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E241B] tracking-wider uppercase mt-1">
            Curated Guest Experiences
          </h2>
          <RoyalDivider className="my-2.5 md:my-4" />
          <p className="text-xs md:text-sm text-[#1D2320]/80 max-w-md mx-auto leading-relaxed">
            From dining on ancestral silver thalis under star-filled skies to revitalizing Ayurvedic therapies in ancient sandstone pavilions.
          </p>
        </div>
      </MotionFadeIn>

      {/* Horizontal Experience Filter Buttons */}
      <MotionFadeIn delay={0.1} yOffset={14}>
        <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 md:mb-8 -mx-4 md:mx-0 px-4 md:px-0">
          {EXPERIENCES_DATA.map((exp) => {
            const isActive = exp.id === selectedExperienceId;
            return (
              <motion.button
                key={exp.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedExperienceId(exp.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'btn-royal-emerald shadow-md font-semibold'
                    : 'bg-[#F3EFE6] text-[#0E241B]/80 hover:bg-[#C5A059]/15 border border-[#C5A059]/20'
                }`}
              >
                {exp.category}
              </motion.button>
            );
          })}
        </div>
      </MotionFadeIn>

      {/* Active Featured Experience Spotlight Card with Visual Transition Styles */}
      <div className="relative mb-8 md:mb-10 min-h-[460px] md:min-h-[380px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeExp.id}
            initial={transitionVariants.initial}
            animate={transitionVariants.animate}
            exit={transitionVariants.exit}
            className="palace-card rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2 md:items-stretch"
          >
            <div className="relative aspect-[16/10] md:aspect-auto w-full bg-[#0E241B] min-h-[260px] md:min-h-[380px]">
              <img
                src={activeExp.imageUrl}
                alt={activeExp.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <button
                onClick={() => onViewImage(activeExp.imageUrl, activeExp.title)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
                aria-label={`View photo of ${activeExp.title}`}
              >
                <Eye size={14} />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] md:text-xs uppercase tracking-wider text-[#D4AF37] font-semibold flex items-center gap-1">
                  <Clock size={11} />
                  <span>{activeExp.timing}</span>
                </span>
                <h3 className="font-cinzel text-lg md:text-2xl font-bold text-white mt-0.5 drop-shadow-md">
                  {activeExp.title}
                </h3>
                <span className="block text-xs md:text-sm font-cormorant italic text-[#F4E8D1]">
                  {activeExp.tagline}
                </span>
              </div>
            </div>

            <div className="p-5 md:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-4">
                <p className="text-xs md:text-sm text-[#1D2320]/80 leading-relaxed">
                  {activeExp.description}
                </p>

                <div>
                  <span className="block text-[10px] md:text-xs uppercase tracking-wider text-[#0E241B] font-bold mb-2.5">
                    Signature Highlights:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {activeExp.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-[#1D2320]/85 bg-[#F3EFE6] p-2.5 rounded-lg border border-[#C5A059]/15">
                        <Check size={13} className="text-[#C5A059] shrink-0" />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onReserveExperience(activeExp.title)}
                className="btn-royal-emerald w-full h-11 md:h-12 rounded-xl font-cinzel text-xs md:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
              >
                <Utensils size={14} className="text-[#D4AF37]" />
                <span>Reserve Table / Experience</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid of Other Experiences (2-col mobile, 4-col laptop) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {EXPERIENCES_DATA.filter((e) => e.id !== selectedExperienceId).slice(0, 4).map((exp, idx) => (
          <MotionFadeIn key={exp.id} yOffset={16} delay={idx * 0.08}>
            <div
              onClick={() => setSelectedExperienceId(exp.id)}
              className="palace-card rounded-xl p-3 cursor-pointer flex flex-col justify-between h-full group transition-all"
            >
              <div className="relative aspect-video rounded-lg overflow-hidden mb-2.5 bg-gray-100">
                <img
                  src={exp.imageUrl}
                  alt={exp.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="block text-[9px] md:text-[10px] uppercase tracking-wider text-[#C5A059] font-semibold">
                  {exp.category}
                </span>
                <h4 className="font-cinzel text-xs md:text-sm font-bold text-[#0E241B] line-clamp-1 mt-0.5">
                  {exp.title}
                </h4>
                <span className="block text-[10px] md:text-xs text-gray-500 mt-1 line-clamp-2">
                  {exp.tagline}
                </span>
              </div>
            </div>
          </MotionFadeIn>
        ))}
      </div>

      </div>
    </section>
  );
};
