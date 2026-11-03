import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransitionStyle, TRANSITION_CATALOG } from '../context/TransitionContext';
import { RoyalCrest } from './RoyalMotif';
import { Sparkles } from 'lucide-react';

export const RoyalTransitionCurtain: React.FC = () => {
  const { isWiping, transitionStyle, wipeTitle } = useTransitionStyle();
  const currentMeta = TRANSITION_CATALOG.find((t) => t.id === transitionStyle) || TRANSITION_CATALOG[0];

  return (
    <AnimatePresence>
      {isWiping && (
        <motion.div
          key="royal-curtain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
          aria-live="polite"
        >
          {/* Animated Background Veil based on current transition style */}
          {transitionStyle === 'slide' && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-[#091913]/95 via-[#0E241B]/95 to-[#091913]/95 border-y-2 border-[#C5A059]/60 backdrop-blur-md"
            />
          )}

          {transitionStyle === 'cube' && (
            <motion.div
              initial={{ rotateY: 90, scale: 0.8, opacity: 0 }}
              animate={{ rotateY: 0, scale: 1, opacity: 1 }}
              exit={{ rotateY: -90, scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-4 md:inset-12 rounded-3xl bg-gradient-to-br from-[#143126] via-[#0E241B] to-[#091913] border-2 border-[#C5A059]/70 shadow-[0_0_80px_rgba(212,175,55,0.35)] backdrop-blur-xl flex items-center justify-center"
            />
          )}

          {transitionStyle === 'scale' && (
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-radial from-[#143126]/95 via-[#0E241B]/95 to-[#091913]/95 backdrop-blur-md border border-[#C5A059]/40"
            />
          )}

          {transitionStyle === 'mask' && (
            <motion.div
              initial={{ clipPath: 'polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)' }}
              animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
              exit={{ clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[#091913]/95 backdrop-blur-lg border-2 border-[#D4AF37]/50"
            />
          )}

          {transitionStyle === 'fade' && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[#091913]/90"
            />
          )}

          {/* Central Royal Sovereign Medallion Announcing the Active Transition */}
          <motion.div
            initial={{ scale: 0.8, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: -10, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 flex flex-col items-center text-center p-6 rounded-3xl bg-[#0E241B]/90 border border-[#D4AF37]/70 shadow-[0_0_50px_rgba(212,175,55,0.4)] backdrop-blur-xl max-w-sm mx-4"
          >
            <div className="relative mb-2">
              <RoyalCrest size={44} className="text-[#D4AF37]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-2 rounded-full border border-dashed border-[#D4AF37]/30"
              />
            </div>

            <div className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold mb-1">
              <Sparkles size={12} />
              <span>Royal Visual Transition</span>
            </div>

            <h3 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-[#FAF8F5] uppercase">
              {wipeTitle || currentMeta.label}
            </h3>

            <span className="text-xs text-[#DFCEB2]/85 font-cormorant italic mt-0.5">
              {currentMeta.tagline}
            </span>

            <div className="mt-2.5 px-3 py-1 rounded-full bg-[#143126] border border-[#C5A059]/40 text-[11px] text-[#DFCEB2] font-mono">
              Effect: {currentMeta.icon} {transitionStyle.toUpperCase()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
