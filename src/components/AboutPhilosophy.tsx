import React from 'react';
import { Crown, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

export const AboutPhilosophy: React.FC = () => {
  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#091913] via-[#0E241B] to-[#091913] text-[#FBFAF6] relative overflow-hidden">
      
      {/* Background Subtle Watermark */}
      <div className="absolute -bottom-10 -right-10 opacity-5 pointer-events-none text-[#C5A059]">
        <RoyalCrest size={340} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header with Motion */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 text-[#D4AF37] mb-3">
              <Crown size={20} />
            </div>
            <span className="block text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
              Ancestry &amp; Heritage
            </span>
            <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-[#FBFAF6] uppercase mt-1">
              The Living Royal Palace
            </h2>
            <RoyalDivider className="my-2.5 md:my-4" />
            <p className="font-cormorant text-lg md:text-2xl italic text-[#F4E8D1] max-w-2xl mx-auto">
              "Where History Does Not Sleep, But Welcomes You as Royalty."
            </p>
          </div>
        </MotionFadeIn>

        {/* Narrative Box with Motion - Split into 2 columns on laptop */}
        <MotionFadeIn yOffset={20} delay={0.15}>
          <div className="palace-card-dark rounded-2xl md:rounded-3xl p-5 md:p-8 lg:p-10 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              
              {/* Left Column: Lineage Narrative */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b border-[#C5A059]/20">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0E241B] border border-[#C5A059]/60 flex items-center justify-center shrink-0">
                    <RoyalCrest size={22} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="block font-cinzel text-xs md:text-sm font-bold text-[#FBFAF6]">VIRĀSĀ PALACE &amp; RETREAT</span>
                    <span className="block text-[10px] md:text-xs text-[#D4AF37] tracking-wider uppercase">Est. Circa 1748 · Mewar Heritage Corridor, Rajasthan</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-[#FAF8F5]/85 leading-relaxed">
                  Erected in the golden era of Rajput chivalry, VIRĀSĀ served as the esteemed summer residence of the Mewar noble lineage. Restored meticulously over a decade in collaboration with traditional master stonecarvers and conservation architects, the estate preserves its authentic cusped arches, carved jharokha balconies, and hand-plastered lime chuna walls.
                </p>

                <p className="text-xs md:text-sm text-[#FAF8F5]/85 leading-relaxed">
                  Unlike modern establishments that simulate grandeur, VIRĀSĀ offers the rare privilege of residence within living history—where each flagstone has borne the footsteps of kings, and every celebration inherits sovereign grace.
                </p>
              </div>

              {/* Right Column: Pillars of Royal Hospitality */}
              <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3.5">
                <div className="p-4 bg-[#091913]/90 rounded-xl md:rounded-2xl border border-[#C5A059]/30 space-y-1.5 transition-colors hover:border-[#C5A059]/70">
                  <div className="flex items-center gap-2">
                    <HeartHandshake size={18} className="text-[#D4AF37]" />
                    <h3 className="font-cinzel text-xs md:text-sm font-bold text-white">Atithi Devo Bhava</h3>
                  </div>
                  <p className="text-[11px] md:text-xs text-[#DFCEB2]/80 leading-normal">
                    The Vedic principle that the guest is sacred. We treat every visitor with sovereign deference, heartfelt warmth, and unobtrusive care.
                  </p>
                </div>

                <div className="p-4 bg-[#091913]/90 rounded-xl md:rounded-2xl border border-[#C5A059]/30 space-y-1.5 transition-colors hover:border-[#C5A059]/70">
                  <div className="flex items-center gap-2">
                    <Shield size={18} className="text-[#D4AF37]" />
                    <h3 className="font-cinzel text-xs md:text-sm font-bold text-white">Royal Khansama Butler</h3>
                  </div>
                  <p className="text-[11px] md:text-xs text-[#DFCEB2]/80 leading-normal">
                    Dedicated round-the-clock royal attendants and wedding concierges trained in noble palace etiquette and bespoke hospitality.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </MotionFadeIn>

      </div>
    </section>
  );
};
