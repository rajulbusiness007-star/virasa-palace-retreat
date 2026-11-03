import React, { useState } from 'react';
import { Sparkles, Users, Calendar, Check, ChevronRight, Crown, Shield, ArrowRight, Bed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface ConciergeEstimatorProps {
  onPlanReadyForEnquiry: (details: {
    eventVision: string;
    guests: number;
    days: number;
    privileges: string[];
    summaryNote: string;
  }) => void;
}

interface PrivilegeOption {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  imageUrl: string;
}

const PRIVILEGES: PrivilegeOption[] = [
  {
    id: 'baraat',
    title: 'Imperial Baraat & Vintage Fleet',
    category: 'Procession',
    description: '1948 Rolls-Royce escort with ceremonial brass band & caparisoned royal horses.',
    icon: '👑',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'floating-mandap',
    title: 'Floating Lotus Mandap Floral Water Setup',
    category: 'Vedic Decor',
    description: 'Fresh tuberose & marigold canopies hovering over mirrored water ponds.',
    icon: '🪷',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fireworks',
    title: 'Aravali Ridge Midnight Eco-Fireworks',
    category: 'Night Spectacle',
    description: 'Silent-friendly sky comets illuminating the mountains as vows are sealed.',
    icon: '🎆',
    imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'silver-thali',
    title: 'Master Khansama 7-Course Silver Thali',
    category: 'Royal Banquet',
    description: 'Centuries-old Mewar court recipes served on engraved sterling silver plates.',
    icon: '🍽️',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'sitar-troupe',
    title: 'Classical Sitar, Shehnai & Sufi Troupe',
    category: 'Music & Vibe',
    description: 'Master musicians playing resonant morning ragas and evening starlit Sufi fusion.',
    icon: '🪕',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'baori-spa',
    title: 'Shahi Baori Geothermal Couple Spa Access',
    category: 'Ayurvedic Wellness',
    description: 'Pre-wedding kumkumadi oil massages and private stepwell soaking sessions.',
    icon: '💆',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
  },
];

export const ConciergeEstimator: React.FC<ConciergeEstimatorProps> = ({
  onPlanReadyForEnquiry,
}) => {
  const [vision, setVision] = useState<'wedding' | 'reunion' | 'milestone'>('wedding');
  const [guests, setGuests] = useState<number>(250);
  const [days, setDays] = useState<number>(3);
  const [selectedPrivileges, setSelectedPrivileges] = useState<string[]>([
    'baraat',
    'floating-mandap',
    'silver-thali',
  ]);

  const togglePrivilege = (id: string) => {
    setSelectedPrivileges((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Calculations for recommended suite blocks
  const estimatedSuites = Math.ceil(guests / 2.2);
  const recommendedMaharani = 1;
  const recommendedHeritage = Math.min(12, Math.floor(estimatedSuites * 0.35));
  const recommendedRooms = Math.max(10, estimatedSuites - recommendedMaharani - recommendedHeritage);

  const venueSuitability =
    guests > 450
      ? 'The Durbar Grand Lawn (800 Max) + Sheesh Mahal Ballroom'
      : guests > 200
      ? 'The Floating Lotus Mandap + Sheesh Mahal Mirror Ballroom'
      : 'Zenana Sunken Courtyard & Mewar Bastion Terrace';

  const handleTransferToEnquiry = () => {
    const privilegeTitles = PRIVILEGES.filter((p) =>
      selectedPrivileges.includes(p.id)
    ).map((p) => p.title);

    const summary = `Tailored Plan Generated: Vision: ${
      vision === 'wedding'
        ? 'Royal Destination Wedding'
        : vision === 'milestone'
        ? 'Sovereign Milestone Gala'
        : 'Royal Heritage Retreat'
    } | Guests: ${guests} | Days: ${days} | Recommended Venues: ${venueSuitability} | Privileges: ${privilegeTitles.join(
      ', '
    )}`;

    onPlanReadyForEnquiry({
      eventVision: vision,
      guests,
      days,
      privileges: privilegeTitles,
      summaryNote: summary,
    });
  };

  return (
    <section id="concierge-estimator" className="py-14 md:py-24 px-4 md:px-8 bg-[#091913] text-[#FBFAF6] relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 opacity-[0.035] text-[#D4AF37] pointer-events-none">
        <RoyalCrest size={600} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E241B] border border-[#C5A059]/40 text-[#DFCEB2] text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold mb-2.5">
              <Crown size={13} className="text-[#D4AF37]" />
              <span>Bespoke Concierge Tool</span>
            </div>
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-white drop-shadow">
              Royal Itinerary &amp; Experience Architect
            </h2>
            <RoyalDivider className="my-3 md:my-4" />
            <p className="text-xs md:text-base text-[#FAF8F5]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Craft your bespoke celebration. Adjust guest volumes, days of revelry, and signature privileges to view your tailored palace blueprint.
            </p>
          </div>
        </MotionFadeIn>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Controls (7 Cols on desktop) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Control 1: Vision Picker */}
            <div className="p-5 md:p-6 rounded-3xl bg-[#0E241B] border border-[#C5A059]/30 shadow-xl">
              <label className="block text-xs uppercase tracking-widest text-[#DFCEB2] font-semibold mb-3">
                1. Select Celebration Vision
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'wedding', label: 'Destination Wedding', sub: 'Multi-Day Regal Pheras' },
                  { id: 'milestone', label: 'Milestone Anniversary', sub: 'Imperial Jubilee Gala' },
                  { id: 'reunion', label: 'Heritage Sanctuary', sub: 'Private Family Takeover' },
                ].map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setVision(v.id as typeof vision)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      vision === v.id
                        ? 'bg-[#143126] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-[#091913] border-[#C5A059]/20 text-gray-400 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <span className="block font-cinzel text-xs font-bold text-white mb-0.5">{v.label}</span>
                    <span className="block text-[10px] text-[#DFCEB2]/70">{v.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Interactive Sliders (Guests & Days) */}
            <div className="p-5 md:p-6 rounded-3xl bg-[#0E241B] border border-[#C5A059]/30 shadow-xl space-y-6">
              <label className="block text-xs uppercase tracking-widest text-[#DFCEB2] font-semibold">
                2. Guest Attendance &amp; Celebration Timeline
              </label>

              {/* Guests Slider */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Users size={14} className="text-[#D4AF37]" />
                    <span>Estimated Guest Count:</span>
                  </span>
                  <span className="font-cinzel text-base font-bold text-[#D4AF37]">
                    {guests} Royal Guests
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="800"
                  step="25"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full h-2 bg-[#091913] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>50 (Intimate)</span>
                  <span>350 (Grand)</span>
                  <span>800 (Sovereign Extravaganza)</span>
                </div>
              </div>

              {/* Days Slider */}
              <div>
                <div className="flex items-center justify-between mb-2 text-xs">
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Calendar size={14} className="text-[#D4AF37]" />
                    <span>Celebration Duration:</span>
                  </span>
                  <span className="font-cinzel text-base font-bold text-[#D4AF37]">
                    {days} Days / {days - 1 > 0 ? days - 1 : 1} Nights
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-[#091913] rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>1 Day (Gala)</span>
                  <span>3 Days (Traditional)</span>
                  <span>5 Days (Grand Royal Week)</span>
                </div>
              </div>
            </div>

            {/* Control 3: Curated Privileges Picker */}
            <div className="p-5 md:p-6 rounded-3xl bg-[#0E241B] border border-[#C5A059]/30 shadow-xl">
              <label className="block text-xs uppercase tracking-widest text-[#DFCEB2] font-semibold mb-3">
                3. Choose Signature Royal Privileges (Tap to include)
              </label>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                {PRIVILEGES.map((p) => {
                  const isChecked = selectedPrivileges.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => togglePrivilege(p.id)}
                      className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        isChecked
                          ? 'bg-[#143126] border-[#D4AF37] shadow-sm'
                          : 'bg-[#091913] border-[#C5A059]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        isChecked ? 'bg-[#D4AF37] border-white text-[#0E241B]' : 'border-gray-500'
                      }`}>
                        {isChecked && <Check size={13} strokeWidth={3} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span>{p.icon}</span>
                          <span className="font-cinzel text-xs font-bold text-white">{p.title}</span>
                        </div>
                        <p className="text-[10px] text-[#DFCEB2]/80 mt-1 leading-snug">{p.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Real-Time Dynamic Palace Blueprint & Action (5 Cols on desktop) */}
          <div className="lg:col-span-5 sticky top-20">
            <div className="rounded-3xl p-6 bg-gradient-to-b from-[#143126] to-[#0E241B] border border-[#C5A059]/60 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#C5A059]/30">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Custom Blueprint
                </span>
                <span className="text-xs text-white font-mono">EST. 1892</span>
              </div>

              {/* Vision Title */}
              <div className="mt-4">
                <span className="text-[10px] uppercase text-gray-400">Occasion Architecture</span>
                <h3 className="font-cinzel text-xl font-bold text-white uppercase mt-0.5">
                  {vision === 'wedding'
                    ? 'Imperial Destination Wedding'
                    : vision === 'milestone'
                    ? 'Sovereign Milestone Jubilee'
                    : 'Exclusive Palace Sanctuary Takeover'}
                </h3>
              </div>

              {/* Recommended Venue Match */}
              <div className="mt-4 p-3.5 rounded-2xl bg-[#091913]/70 border border-[#C5A059]/30">
                <span className="block text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                  Recommended Ceremonial Venue
                </span>
                <p className="font-cormorant text-base text-[#F4E8D1] font-semibold mt-0.5">
                  {venueSuitability}
                </p>
              </div>

              {/* Recommended Accommodations Block */}
              <div className="mt-4">
                <span className="block text-[10px] uppercase tracking-wider text-gray-400 mb-2">
                  Recommended Room &amp; Suite Allocation:
                </span>
                <div className="space-y-1.5 text-xs text-[#FAF8F5]/90">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Maharani Presidential Suite</span>
                    <span className="font-bold text-[#D4AF37]">{recommendedMaharani} Suite</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Heritage &amp; Grand Royal Suites</span>
                    <span className="font-bold text-[#D4AF37]">{recommendedHeritage} Suites</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span>Luxury Palace Chambers</span>
                    <span className="font-bold text-[#D4AF37]">{recommendedRooms} Chambers</span>
                  </div>
                </div>
              </div>

              {/* Selected Privileges Count */}
              <div className="mt-4 pt-3 border-t border-[#C5A059]/20 flex items-center justify-between text-xs">
                <span className="text-gray-300">Selected Signature Privileges:</span>
                <span className="font-bold text-[#D4AF37]">{selectedPrivileges.length} Inclusions</span>
              </div>

              {/* Direct Hand-off Button */}
              <div className="mt-6">
                <button
                  onClick={handleTransferToEnquiry}
                  className="btn-royal-gold w-full h-12 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-xl"
                >
                  <Sparkles size={15} className="text-[#0E241B]" />
                  <span>Send Blueprint to Royal Concierge</span>
                  <ArrowRight size={14} className="text-[#0E241B]" />
                </button>
                <p className="text-[10px] text-center text-gray-400 mt-2">
                  Direct transfer into our bespoke wedding enquiry engine with no obligation.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
};
