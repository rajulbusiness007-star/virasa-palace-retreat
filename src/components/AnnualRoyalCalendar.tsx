import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Sparkles, MapPin, Check, Eye, Compass, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ROYAL_CALENDAR_EVENTS, RoyalCalendarEvent } from '../data/calendarData';
import { RoyalCrest, RoyalDivider, RoyalCorner } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';
import { useTransitionStyle } from '../context/TransitionContext';
import { RoyalAmbientParticles } from './RoyalAmbientParticles';

interface AnnualRoyalCalendarProps {
  onOpenWeddingEnquiryWithDate?: (dateTitle: string, month: string) => void;
  onOpenBookingWithDate?: (dateTitle: string, month: string) => void;
  onViewImage?: (imageUrl: string, title: string) => void;
}

export const AnnualRoyalCalendar: React.FC<AnnualRoyalCalendarProps> = ({
  onOpenWeddingEnquiryWithDate,
  onOpenBookingWithDate,
  onViewImage,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'wedding' | 'festival' | 'culture'>('all');
  const [selectedMonth, setSelectedMonth] = useState<string>('ALL');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const { getTransitionVariants, transitionStyle } = useTransitionStyle();
  const transitionVariants = getTransitionVariants();

  const filteredEvents = ROYAL_CALENDAR_EVENTS.filter((evt) => {
    const matchesCategory = selectedCategory === 'all' || evt.category === selectedCategory;
    const matchesMonth = selectedMonth === 'ALL' || evt.shortMonth === selectedMonth;
    return matchesCategory && matchesMonth;
  });

  const months = ['ALL', 'JAN', 'FEB', 'MAR', 'APR', 'JUL', 'OCT', 'NOV', 'DEC'];

  const categoryTabs = [
    { id: 'all', label: 'All Occasions', count: ROYAL_CALENDAR_EVENTS.length },
    { id: 'wedding', label: 'Peak Wedding Dates', count: ROYAL_CALENDAR_EVENTS.filter(e => e.category === 'wedding').length },
    { id: 'festival', label: 'Seasonal Festivals', count: ROYAL_CALENDAR_EVENTS.filter(e => e.category === 'festival').length },
    { id: 'culture', label: 'Cultural Performances', count: ROYAL_CALENDAR_EVENTS.filter(e => e.category === 'culture').length },
  ];

  // Update scroll indicator position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
    }
  };

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollOffset = scrollContainerRef.current.clientWidth * 0.8;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollOffset : scrollOffset,
      behavior: 'smooth',
    });
  };

  const scrollToMonth = (monthCode: string) => {
    setSelectedMonth(monthCode);
    if (monthCode === 'ALL') {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetEl = document.getElementById(`cal-card-${monthCode.toLowerCase()}`);
    if (targetEl && scrollContainerRef.current) {
      const containerLeft = scrollContainerRef.current.getBoundingClientRect().left;
      const targetLeft = targetEl.getBoundingClientRect().left;
      const offset = targetLeft - containerLeft + scrollContainerRef.current.scrollLeft - 16;
      scrollContainerRef.current.scrollTo({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="royal-calendar" 
      className="py-14 md:py-24 bg-gradient-to-b from-[#091913] via-[#0E241B] to-[#091913] text-[#FBFAF6] relative overflow-hidden"
    >
      {/* Decorative ambient subtle backdrop & floating embers */}
      <div className="absolute inset-0 opacity-10 pointer-events-none jali-texture" />
      <RoyalAmbientParticles particleCount={22} className="opacity-35" />

      {/* Ambient watermark crest */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-[0.025] pointer-events-none text-[#D4AF37]">
        <RoyalCrest size={480} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full">
        
        {/* Section Header */}
        <MotionFadeIn yOffset={20}>
          <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#143126] border border-[#C5A059]/40 text-[#DFCEB2] text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              <Calendar size={13} className="text-[#D4AF37]" />
              <span>A Celestial Heritage Itinerary</span>
            </div>
            
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-[#FAF8F5] drop-shadow-md">
              Annual Royal Calendar
            </h2>
            <RoyalDivider className="my-3 md:my-5" />
            <p className="text-xs md:text-sm text-[#DFCEB2]/85 max-w-xl mx-auto leading-relaxed font-light">
              A sacred chronology of peak Vedic wedding muhurats, ancestral court festivals, and starlit galas curated across the 12 sovereign months of Rajasthan.
            </p>
          </div>
        </MotionFadeIn>

        {/* Filter Bar & Controls */}
        <MotionFadeIn delay={0.1} yOffset={14}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto pb-1 md:pb-0 -mx-4 md:mx-0 px-4 md:px-0">
              {categoryTabs.map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all shrink-0 flex items-center gap-2 ${
                      isActive
                        ? 'btn-royal-gold shadow-md font-bold'
                        : 'bg-[#091913] text-[#DFCEB2] border border-[#C5A059]/30 hover:border-[#C5A059]/70'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? 'bg-[#0E241B] text-[#D4AF37]' : 'bg-[#143126] text-[#DFCEB2]/80'
                      }`}
                    >
                      {tab.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Scroll Navigation Arrows (Desktop & Tablet) */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-[#DFCEB2]/70 font-mono mr-1">
                Explore Months
              </span>
              <button
                onClick={() => scrollByAmount('left')}
                className="w-9 h-9 rounded-full bg-[#091913] border border-[#C5A059]/40 hover:border-[#D4AF37] hover:bg-[#143126] text-[#DFCEB2] hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
                aria-label="Scroll left in calendar"
                title="Scroll Left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                className="w-9 h-9 rounded-full bg-[#091913] border border-[#C5A059]/40 hover:border-[#D4AF37] hover:bg-[#143126] text-[#DFCEB2] hover:text-white flex items-center justify-center transition-all shadow active:scale-95"
                aria-label="Scroll right in calendar"
                title="Scroll Right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Month Quick Navigation Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 md:mx-0 px-4 md:px-0 border-b border-[#C5A059]/20">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold mr-2 hidden sm:inline shrink-0">
              Timeline:
            </span>
            {months.map((m) => {
              const isSelected = selectedMonth === m;
              return (
                <button
                  key={m}
                  onClick={() => scrollToMonth(m)}
                  className={`text-[11px] font-cinzel font-semibold px-2.5 py-1 rounded-lg transition-all shrink-0 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-[#091913] shadow'
                      : 'text-[#DFCEB2]/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {m}
                </button>
              );
            })}
          </div>
        </MotionFadeIn>

        {/* Horizontal Scroll Track with Gold-Framed Date Cards */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 pt-2 scroll-smooth -mx-4 md:mx-0 px-4 md:px-0"
            style={{ scrollPaddingLeft: '16px' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event) => {
                const isWedding = event.category === 'wedding';

                return (
                  <motion.div
                    key={event.id}
                    id={`cal-card-${event.shortMonth.toLowerCase()}`}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="snap-center shrink-0 w-[84vw] xs:w-[320px] sm:w-[360px] md:w-[390px] flex flex-col"
                  >
                    {/* The Gold-Framed Luxury Card */}
                    <article className="relative h-full flex flex-col rounded-3xl bg-gradient-to-b from-[#143126] via-[#0E241B] to-[#091913] border-2 border-[#C5A059]/50 hover:border-[#D4AF37] shadow-[0_12px_36px_rgba(0,0,0,0.65)] hover:shadow-[0_16px_48px_rgba(212,175,55,0.22)] transition-all duration-300 overflow-hidden group">
                      
                      {/* Four Royal Brass Corner Flourishes */}
                      <RoyalCorner position="top-left" size={14} className="text-[#D4AF37] z-20" />
                      <RoyalCorner position="top-right" size={14} className="text-[#D4AF37] z-20" />
                      <RoyalCorner position="bottom-left" size={14} className="text-[#D4AF37] z-20" />
                      <RoyalCorner position="bottom-right" size={14} className="text-[#D4AF37] z-20" />

                      {/* Card Header: Gold-Embossed Date Medallion & Category Badge */}
                      <div className="p-4 sm:p-5 border-b border-[#C5A059]/25 flex items-center justify-between bg-[#091913]/70 backdrop-blur-md">
                        {/* Gold Date Block */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#DFCEB2] to-[#C5A059] text-[#091913] flex flex-col items-center justify-center shadow-md border border-[#FAF8F5]/80 shrink-0">
                            <span className="text-[9px] uppercase font-bold tracking-wider leading-none font-sans">
                              {event.shortMonth}
                            </span>
                            <span className="font-cinzel text-base font-extrabold leading-none mt-0.5">
                              {event.days.split(' ')[0]}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                                {event.month} {event.year}
                              </span>
                              <span className="text-sm" title={event.categoryLabel}>
                                {event.auspiciousSymbol}
                              </span>
                            </div>
                            <span className="text-[10px] text-[#D4AF37] font-medium block">
                              Days: {event.days}
                            </span>
                          </div>
                        </div>

                        {/* Category & Season Badges */}
                        <div className="flex flex-col items-end gap-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold border ${
                              isWedding
                                ? 'bg-[#1A3E31] text-[#F4E8D1] border-[#D4AF37]'
                                : event.category === 'festival'
                                ? 'bg-[#3A2A14] text-[#DFCEB2] border-[#C5A059]'
                                : 'bg-[#1E293B] text-[#E2E8F0] border-slate-600'
                            }`}
                          >
                            {event.categoryLabel}
                          </span>
                          <span className="text-[10px] text-[#DFCEB2]/70 font-mono">
                            {event.weatherNote.split('•')[0].trim()}
                          </span>
                        </div>
                      </div>

                      {/* Visual Photography Window with Lightbox Trigger */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#091913]">
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E241B] via-transparent to-transparent pointer-events-none" />

                        {/* Lightbox photo zoom button */}
                        {onViewImage && (
                          <button
                            onClick={() => onViewImage(event.imageUrl, `${event.title} (${event.month})`)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors z-10"
                            aria-label={`Enlarge photo for ${event.title}`}
                          >
                            <Eye size={14} />
                          </button>
                        )}

                        {/* Atmosphere Tag overlay */}
                        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] text-[#DFCEB2] z-10">
                          <span className="px-2 py-0.5 rounded-full bg-[#091913]/90 backdrop-blur-sm border border-[#C5A059]/40 truncate max-w-[240px]">
                            {event.atmosphere}
                          </span>
                        </div>
                      </div>

                      {/* Card Content & Details */}
                      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-4">
                        <div className="space-y-2.5">
                          <h3 className="font-cinzel text-base md:text-lg font-bold text-white uppercase tracking-wide leading-snug group-hover:text-[#F4E8D1] transition-colors">
                            {event.title}
                          </h3>

                          <p className="font-cormorant text-xs md:text-sm italic text-[#DFCEB2] leading-tight">
                            "{event.subtitle}"
                          </p>

                          {/* Astrological note for weddings */}
                          {event.astrologicalNote && (
                            <div className="px-2.5 py-1 rounded-lg bg-[#143126] border border-[#C5A059]/40 flex items-center gap-2 text-[10px] text-[#D4AF37] font-medium">
                              <Moon size={11} className="shrink-0" />
                              <span className="truncate">{event.astrologicalNote}</span>
                            </div>
                          )}

                          <p className="text-[11px] md:text-xs text-[#FAF8F5]/80 leading-relaxed font-light line-clamp-3">
                            {event.description}
                          </p>

                          {/* Palace Setting */}
                          <div className="flex items-start gap-1.5 text-[11px] text-[#DFCEB2]/90 pt-1">
                            <MapPin size={13} className="text-[#D4AF37] shrink-0 mt-0.5" />
                            <span className="truncate font-medium">{event.palaceSetting}</span>
                          </div>

                          {/* Curated Highlights List */}
                          <div className="space-y-1 pt-1.5">
                            {event.highlights.slice(0, 3).map((item, i) => (
                              <div key={i} className="flex items-center gap-2 text-[10px] sm:text-[11px] text-[#FAF8F5]/85">
                                <Check size={12} className="text-[#D4AF37] shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer Availability Pill & Action Button */}
                        <div className="pt-3 border-t border-[#C5A059]/25 flex items-center justify-between gap-2">
                          <div>
                            <span className="block text-[8px] uppercase tracking-wider text-[#DFCEB2]/60">
                              Status
                            </span>
                            <span
                              className={`text-[10px] font-semibold ${
                                event.availabilityStatus.includes('Final')
                                  ? 'text-amber-300'
                                  : 'text-[#D4AF37]'
                              }`}
                            >
                              {event.availabilityStatus}
                            </span>
                          </div>

                          {isWedding ? (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                if (onOpenWeddingEnquiryWithDate) {
                                  onOpenWeddingEnquiryWithDate(event.title, `${event.month} (${event.days})`);
                                }
                              }}
                              className="btn-royal-gold px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1 font-bold"
                            >
                              <Sparkles size={12} className="text-[#0E241B]" />
                              <span>Reserve Muhurat</span>
                            </motion.button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => {
                                if (onOpenBookingWithDate) {
                                  onOpenBookingWithDate(event.title, `${event.month} (${event.days})`);
                                }
                              }}
                              className="btn-royal-outline px-3 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-1"
                            >
                              <span>Enquire Dates</span>
                              <ArrowUpRight size={13} className="text-[#D4AF37]" />
                            </motion.button>
                          )}
                        </div>

                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Horizontal Scroll Progress Bar */}
          <div className="mt-2 w-full max-w-md mx-auto flex items-center gap-3">
            <span className="text-[10px] text-[#DFCEB2]/60 font-mono">01 JAN</span>
            <div className="flex-1 h-1 rounded-full bg-[#143126] overflow-hidden border border-[#C5A059]/20">
              <motion.div
                style={{ width: `${Math.max(scrollProgress, 12)}%` }}
                className="h-full bg-gradient-to-r from-[#C5A059] to-[#D4AF37] rounded-full transition-all duration-150"
              />
            </div>
            <span className="text-[10px] text-[#DFCEB2]/60 font-mono">31 DEC</span>
          </div>
        </div>

      </div>
    </section>
  );
};
