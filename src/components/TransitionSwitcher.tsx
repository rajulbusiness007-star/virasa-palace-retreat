import React, { useState } from 'react';
import { ChevronDown, Check, Play, Pause, Zap, Sparkles, Sliders } from 'lucide-react';
import { useTransitionStyle, TRANSITION_CATALOG, TransitionStyle } from '../context/TransitionContext';
import { motion, AnimatePresence } from 'framer-motion';

export const TransitionSwitcher: React.FC<{ variant?: 'header' | 'floating' }> = ({ variant = 'header' }) => {
  const {
    transitionStyle,
    setTransitionStyle,
    triggerTransitionWipe,
    isAutoTouring,
    toggleAutoTour,
  } = useTransitionStyle();
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = TRANSITION_CATALOG.find((opt) => opt.id === transitionStyle) || TRANSITION_CATALOG[0];

  const handleSelect = (id: TransitionStyle) => {
    setTransitionStyle(id);
    triggerTransitionWipe(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-30">
      {/* Trigger Button with Micro-Interaction */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#0E241B]/95 border border-[#C5A059]/60 text-[#DFCEB2] text-xs font-medium shadow-lg backdrop-blur-md hover:border-[#D4AF37] transition-all group"
        aria-label="Select Visual Transition Style"
        title="Change Scene Transition Effect"
      >
        <span className="w-5 h-5 rounded-full bg-[#143126] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] text-xs font-mono group-hover:scale-110 transition-transform">
          {currentOption.icon}
        </span>
        <span className="hidden sm:inline text-[9px] uppercase tracking-wider font-cinzel text-[#FAF8F5]/80">
          Transition:
        </span>
        <span className="font-semibold text-white text-[11px] truncate max-w-[90px] sm:max-w-none">
          {currentOption.label}
        </span>
        <ChevronDown
          size={12}
          className={`text-[#D4AF37] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click dismiss */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#091913] border border-[#C5A059]/60 p-2.5 text-[#FAF8F5] shadow-2xl z-50 overflow-hidden"
            >
              {/* Header with Auto-Tour & Test Wipe Controls */}
              <div className="px-3 py-2 border-b border-[#C5A059]/25 mb-1.5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold block">
                    Visual Transition Engine
                  </span>
                  <span className="text-[10px] text-[#DFCEB2]/70 block">
                    Live effects for suites, ceremonies &amp; state shifts
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    triggerTransitionWipe();
                  }}
                  className="px-2 py-1 rounded-lg bg-[#143126] hover:bg-[#C5A059] hover:text-[#0E241B] border border-[#C5A059]/40 text-[#D4AF37] text-[10px] font-semibold flex items-center gap-1 transition-colors"
                  title="Test Current Transition Effect"
                >
                  <Zap size={11} />
                  <span>Preview</span>
                </button>
              </div>

              {/* Transition Style Options */}
              <div className="space-y-1">
                {TRANSITION_CATALOG.map((opt) => {
                  const isSelected = opt.id === transitionStyle;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelect(opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl flex items-center justify-between text-xs transition-all ${
                        isSelected
                          ? 'btn-royal-gold font-bold shadow-md'
                          : 'hover:bg-[#143126] text-[#FAF8F5]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs shrink-0 ${
                            isSelected
                              ? 'bg-[#091913] text-[#D4AF37]'
                              : 'bg-[#143126] text-[#D4AF37] border border-[#C5A059]/30'
                          }`}
                        >
                          {opt.icon}
                        </span>
                        <div>
                          <span className="block font-cinzel text-xs">{opt.label}</span>
                          <span
                            className={`block text-[10px] ${
                              isSelected ? 'text-[#091913]/90 font-medium' : 'text-[#DFCEB2]/70'
                            }`}
                          >
                            {opt.description}
                          </span>
                        </div>
                      </div>

                      {isSelected && <Check size={14} className="text-[#0E241B] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Tour Button */}
              <div className="mt-2 pt-2 border-t border-[#C5A059]/20 flex items-center justify-between px-2">
                <span className="text-[10px] text-[#DFCEB2]/70">Auto-Cycle Showcase</span>
                <button
                  type="button"
                  onClick={toggleAutoTour}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isAutoTouring
                      ? 'bg-[#D4AF37] text-[#0E241B]'
                      : 'bg-[#143126] text-[#DFCEB2] hover:text-white border border-[#C5A059]/30'
                  }`}
                >
                  {isAutoTouring ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isAutoTouring ? 'Touring...' : 'Tour All Types'}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Floating Dock for Visual Transition Styles
 * Appears docked subtly on screen so guests can effortlessly cycle through
 * all types of transitions (Fade, Slide, Scale, Cube, Arch Mask) with 1 click.
 */
export const FloatingTransitionDock: React.FC = () => {
  const {
    transitionStyle,
    setTransitionStyle,
    triggerTransitionWipe,
    isAutoTouring,
    toggleAutoTour,
  } = useTransitionStyle();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <aside 
      aria-label="Visual Transition Styles Floating Dock"
      className="fixed bottom-20 left-4 z-35 hidden md:block"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="rounded-2xl bg-[#091913]/95 border border-[#C5A059]/50 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md p-2 text-[#FAF8F5] flex flex-col gap-1.5 max-w-[280px]"
      >
        <div className="flex items-center justify-between px-2 py-1 border-b border-[#C5A059]/25 text-[10px] uppercase font-bold tracking-wider text-[#D4AF37]">
          <div className="flex items-center gap-1.5">
            <Sparkles size={11} />
            <span>Transitions Studio</span>
          </div>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-[#DFCEB2]/60 hover:text-white text-[10px] px-1"
            title="Toggle dock size"
          >
            {isMinimized ? 'Expand' : 'Hide'}
          </button>
        </div>

        {!isMinimized && (
          <>
            <div className="grid grid-cols-5 gap-1 pt-1">
              {TRANSITION_CATALOG.map((opt) => {
                const isActive = opt.id === transitionStyle;
                return (
                  <motion.button
                    key={opt.id}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setTransitionStyle(opt.id);
                      triggerTransitionWipe(opt.id);
                    }}
                    title={`${opt.label} - ${opt.tagline}`}
                    className={`h-9 rounded-xl flex flex-col items-center justify-center font-mono text-xs transition-all ${
                      isActive
                        ? 'btn-royal-gold text-[#0E241B] shadow-md scale-105'
                        : 'bg-[#143126] text-[#DFCEB2] hover:bg-[#C5A059]/20 border border-[#C5A059]/30'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span className="text-[8px] font-sans uppercase font-bold tracking-tighter truncate w-full px-0.5 text-center">
                      {opt.id}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 px-1 text-[10px]">
              <button
                onClick={() => triggerTransitionWipe()}
                className="text-[#DFCEB2]/80 hover:text-[#D4AF37] flex items-center gap-1 font-medium"
              >
                <Zap size={10} className="text-[#D4AF37]" />
                <span>Wipe Preview</span>
              </button>

              <button
                onClick={toggleAutoTour}
                className="text-[#DFCEB2]/80 hover:text-[#D4AF37] flex items-center gap-1 font-medium"
              >
                {isAutoTouring ? <Pause size={10} /> : <Play size={10} />}
                <span>{isAutoTouring ? 'Touring' : 'Auto Tour'}</span>
              </button>
            </div>
          </>
        )}
      </motion.div>
    </aside>
  );
};
