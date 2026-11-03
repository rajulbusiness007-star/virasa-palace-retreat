import React, { useState } from 'react';
import { MapPin, Users, Sun, Moon, Sparkles, ChevronRight, Compass, Maximize2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface EstateZone {
  id: string;
  name: string;
  hindiTitle: string;
  category: string;
  capacity: number;
  areaSqFt: string;
  idealCeremony: string;
  bestTiming: string;
  coordinates: { x: number; y: number }; // Percentage positions on map
  description: string;
  highlights: string[];
  dayImageUrl: string;
  nightImageUrl: string;
}

const ESTATE_ZONES: EstateZone[] = [
  {
    id: 'durbar-lawn',
    name: 'The Durbar Grand Lawn',
    hindiTitle: 'दरबार उद्यान',
    category: 'Outdoor Grandeur',
    capacity: 800,
    areaSqFt: '32,000',
    idealCeremony: 'Baraat Welcome, Grand Sangeet & Reception',
    bestTiming: '19:00 - Midnight (Starlit Twilight)',
    coordinates: { x: 32, y: 64 },
    description: 'A manicured emerald lawn framed by 17th-century sandstone bastions and royal torchlit pathways. Accommodates grand stages, full orchestra setups, and sovereign wedding receptions.',
    highlights: ['Unobstructed view of illuminated palace facade', 'Capacity for grand fireworks staging', 'Dedicated royal banquet buffet colonnade'],
    dayImageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'floating-mandap',
    name: 'The Floating Lotus Mandap',
    hindiTitle: 'कमल मण्डप',
    category: 'Water Pavilion',
    capacity: 350,
    areaSqFt: '9,500',
    idealCeremony: 'Shubh Vivah & Twilight Vedic Pheras',
    bestTiming: '17:30 - 20:00 (Sunset Golden Hour)',
    coordinates: { x: 68, y: 72 },
    description: 'An ethereal marble platform floating amidst reflective lily ponds, adorned with cascading tuberose and marigold canopies where holy wedding vows are solemnized.',
    highlights: ['360-degree mirrored water reflections', 'Acoustically tuned for Vedic chanting & shehnai', 'Seating pavilions with silk bolsters'],
    dayImageUrl: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'sheesh-mahal-ballroom',
    name: 'The Sheesh Mahal Mirror Ballroom',
    hindiTitle: 'शीश महल सभा',
    category: 'Imperial Indoor Salon',
    capacity: 450,
    areaSqFt: '14,000',
    idealCeremony: 'Sangeet Gala, Imperial Banquet & After-Party',
    bestTiming: '20:00 - 03:00 (Evening & Late Night)',
    coordinates: { x: 50, y: 38 },
    description: 'Fully climate-controlled royal ballroom adorned with thousands of hand-cut Belgian mirrors, antique crystal chandeliers, and teak parquet flooring for world-class celebratory performances.',
    highlights: ['Zero acoustic reverberation with state-of-the-art audio', 'Private royal dressing suites adjoining', 'Dedicated banquet service kitchen'],
    dayImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'zenana-courtyard',
    name: 'Zenana Sunken Courtyard & Baori',
    hindiTitle: 'ज़नाना प्रांगण',
    category: 'Heritage Courtyard',
    capacity: 220,
    areaSqFt: '7,800',
    idealCeremony: 'Phoolon Ki Haldi & Festive Mehendi',
    bestTiming: '10:00 - 15:00 (Morning & Afternoon Sun)',
    coordinates: { x: 28, y: 32 },
    description: 'An intimate red-sandstone courtyard enclosed by intricately carved jharokha balconies and cooling fountains. Perfect for marigold-filled Haldi ceremonies and bohemian Mehendi festivities.',
    highlights: ['Naturally shaded by ancient Banyan tree canopies', 'Traditional Rajasthani folk singer alcoves', 'Direct access to Ayurvedic herbal spa'],
    dayImageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'maharani-suite',
    name: 'Maharani Presidential Bridal Pavilion',
    hindiTitle: 'महारानी प्रासाद',
    category: 'Bridal Haven & Terrace',
    capacity: 40,
    areaSqFt: '4,500',
    idealCeremony: 'Bridal Prep, Family Blessings & High Tea',
    bestTiming: 'All Day (Private Sanctuary)',
    coordinates: { x: 74, y: 26 },
    description: 'The crowning suite of Virāsā Palace. Offers 270-degree panoramic Aravali views, a private gold-leafed salon, makeup dressing studio, and an exclusive sunset terrace for pre-wedding portraits.',
    highlights: ['Dedicated bridal butler and wellness masseuse', 'Private open-air rooftop whirlpool', 'Secure royal jewelry safe & dressing room'],
    dayImageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'mewar-terrace',
    name: 'Mewar Terrace & Dining Gazebos',
    hindiTitle: 'मेवाड़ वेधशाला',
    category: 'Panoramic Dining',
    capacity: 180,
    areaSqFt: '6,200',
    idealCeremony: 'Cocktail Soiree, Welcome Dinner & Farewell Brunch',
    bestTiming: '16:00 - 22:00 (Sunset & Starlight)',
    coordinates: { x: 52, y: 82 },
    description: 'Elevated bastion terrace jutting into the valley breeze, peppered with stone cupolas (chhatris) and custom brass fire pits for intimate evenings of live ghazals and vintage champagne.',
    highlights: ['Unrivaled Aravali ridge sunsets', 'Live charcoal sigri & tandoor live stations', 'Wind-protected heating for winter evenings'],
    dayImageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    nightImageUrl: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
  },
];

interface InteractiveEstateMapProps {
  onSelectZoneForEnquiry: (zoneName: string) => void;
}

export const InteractiveEstateMap: React.FC<InteractiveEstateMapProps> = ({
  onSelectZoneForEnquiry,
}) => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('durbar-lawn');
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('night');

  const selectedZone = ESTATE_ZONES.find((z) => z.id === selectedZoneId) || ESTATE_ZONES[0];

  return (
    <section id="estate-map" className="py-14 md:py-24 px-4 md:px-8 bg-[#FBFAF6] text-[#20251F] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#C5A059]/40 text-[#17352B] text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold mb-2.5">
              <Compass size={13} className="text-[#C5A059]" />
              <span>Architectural Scrollytelling</span>
            </div>
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-[#0E241B]">
              The Virāsā Estate Grounds
            </h2>
            <RoyalDivider className="my-3 md:my-4" />
            <p className="text-xs md:text-base text-[#20251F]/80 max-w-2xl mx-auto leading-relaxed">
              Explore our 60-acre ancestral sanctuary. Tap any ceremonial zone to inspect its venue dimensions, capacity, ideal lighting hours, and celebratory vantage.
            </p>
          </div>
        </MotionFadeIn>

        {/* Lighting Mode Switcher Bar */}
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-[#C5A059]/20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#17352B]" />
            <span className="text-xs font-semibold text-[#0E241B] uppercase tracking-wider">
              Estate Perspective: {selectedZone.name}
            </span>
          </div>

          {/* Day / Night Lighting Simulator */}
          <div className="flex items-center gap-1 bg-[#F3EFE6] p-1 rounded-full border border-[#C5A059]/30">
            <button
              onClick={() => setLightingMode('day')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                lightingMode === 'day'
                  ? 'bg-[#C5A059] text-[#0E241B] shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Sun size={12} />
              <span>Day Sun</span>
            </button>
            <button
              onClick={() => setLightingMode('night')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                lightingMode === 'night'
                  ? 'bg-[#0E241B] text-[#F4E8D1] shadow-sm'
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Moon size={12} className="text-[#D4AF37]" />
              <span>Night Lights</span>
            </button>
          </div>
        </div>

        {/* Two-Column Interactive Layout: Map / Floorplan Canvas + Dynamic Zone Perspective Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Interactive Vector Ground Plan (7 Cols on desktop) */}
          <div className="lg:col-span-7 bg-[#0E241B] rounded-3xl p-4 md:p-6 border border-[#C5A059]/40 shadow-xl relative overflow-hidden flex flex-col justify-between">
            
            {/* Map Canvas Header Info */}
            <div className="flex items-center justify-between text-xs text-[#DFCEB2] mb-3">
              <span className="tracking-widest uppercase font-semibold text-[10px]">
                VIRĀSĀ Master Property Sketch · 60 Acres
              </span>
              <span className="text-[10px] text-[#DFCEB2]/70">
                Tap pins to swing perspective
              </span>
            </div>

            {/* Simulated Architectural Floorplan Canvas */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#091913] via-[#0E241B] to-[#143126] border border-[#C5A059]/30 shadow-inner flex items-center justify-center">
              
              {/* Floorplan architectural decorative lines */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#C5A059" strokeWidth="0.3" strokeDasharray="1,1" />
                <circle cx="50" cy="50" r="28" fill="none" stroke="#C5A059" strokeWidth="0.4" />
                <path d="M 10 50 L 90 50 M 50 10 L 50 90" stroke="#C5A059" strokeWidth="0.2" />
                <rect x="20" y="20" width="60" height="60" fill="none" stroke="#C5A059" strokeWidth="0.3" strokeDasharray="2,2" />
                {/* Bastion circles */}
                <circle cx="20" cy="20" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                <circle cx="80" cy="20" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                <circle cx="20" cy="80" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
                <circle cx="80" cy="80" r="4" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
              </svg>

              {/* Water feature indicator for floating mandap */}
              <div className="absolute right-[22%] bottom-[16%] w-24 h-24 rounded-full bg-cyan-950/40 border border-cyan-400/20 blur-[1px] pointer-events-none" />

              {/* Zone Pins */}
              {ESTATE_ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{
                      left: `${zone.coordinates.x}%`,
                      top: `${zone.coordinates.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-transform z-20 ${
                      isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                    }`}
                    aria-label={`Select ${zone.name}`}
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulse beacon */}
                      {isSelected && (
                        <span className="absolute -inset-2 rounded-full bg-[#D4AF37] opacity-35 animate-ping" />
                      )}
                      
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1.5 shadow-lg border transition-all ${
                        isSelected 
                          ? 'bg-[#D4AF37] text-[#0E241B] border-white scale-105 shadow-[0_0_15px_rgba(212,175,55,0.7)]'
                          : 'bg-[#0E241B]/95 text-[#DFCEB2] border-[#C5A059]/60 hover:border-[#D4AF37]'
                      }`}>
                        <MapPin size={11} className={isSelected ? 'text-[#0E241B]' : 'text-[#D4AF37]'} />
                        <span className="hidden xs:inline whitespace-nowrap">{zone.name.split(' ')[1] || zone.name}</span>
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Subtle watermark in map */}
              <div className="opacity-10 text-[#C5A059] pointer-events-none">
                <RoyalCrest size={140} />
              </div>
            </div>

            {/* Zone Quick Selector Tabs */}
            <div className="mt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {ESTATE_ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap shrink-0 transition-all ${
                    zone.id === selectedZoneId
                      ? 'bg-[#C5A059] text-[#0E241B] font-bold shadow-sm'
                      : 'bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/20'
                  }`}
                >
                  {zone.name}
                </button>
              ))}
            </div>

          </div>

          {/* Dynamic Zone Perspective Showcase Card (5 Cols on desktop) */}
          <div className="lg:col-span-5 palace-card rounded-3xl overflow-hidden flex flex-col shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedZone.id}-${lightingMode}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full"
              >
                {/* Zone Photo with Lighting Mode */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0E241B]">
                  <img
                    src={lightingMode === 'day' ? selectedZone.dayImageUrl : selectedZone.nightImageUrl}
                    alt={selectedZone.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#0E241B]/90 backdrop-blur-sm border border-[#C5A059]/60 text-[#F4E8D1] text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full">
                    {selectedZone.category}
                  </div>

                  {/* Hindi Calligraphic Subtitle */}
                  <div className="absolute top-3 right-3 text-[#DFCEB2] text-xs font-serif opacity-80">
                    {selectedZone.hindiTitle}
                  </div>

                  {/* Bottom title in image */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                      Zone Capacity: Up to {selectedZone.capacity} Guests
                    </span>
                    <h3 className="font-cinzel text-lg md:text-xl font-bold tracking-wide text-white drop-shadow">
                      {selectedZone.name}
                    </h3>
                  </div>
                </div>

                {/* Zone Details */}
                <div className="p-5 flex flex-col flex-1">
                  
                  {/* Metrics bar */}
                  <div className="grid grid-cols-2 gap-2.5 pb-3 border-b border-[#C5A059]/20 text-xs">
                    <div className="bg-[#F3EFE6] p-2 rounded-xl border border-[#C5A059]/20 text-center">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Gross Area</span>
                      <span className="font-semibold text-[#0E241B]">{selectedZone.areaSqFt} sq.ft</span>
                    </div>
                    <div className="bg-[#F3EFE6] p-2 rounded-xl border border-[#C5A059]/20 text-center">
                      <span className="block text-[10px] text-gray-500 uppercase tracking-wider">Optimal Lighting</span>
                      <span className="font-semibold text-[#0E241B] text-[11px] truncate block">{selectedZone.bestTiming.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Ideal Ceremony */}
                  <div className="mt-3.5 text-xs text-[#0E241B]">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-[#B99560] block mb-1">
                      Premier Ceremony Suitability:
                    </span>
                    <span className="font-medium text-gray-800">{selectedZone.idealCeremony}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-2.5 text-xs text-[#20251F]/80 leading-relaxed font-light">
                    {selectedZone.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mt-3 space-y-1.5">
                    {selectedZone.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#20251F]/90">
                        <Check size={13} className="text-[#C5A059] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Booking / Enquiry Action */}
                  <div className="mt-5 pt-3 border-t border-[#C5A059]/20 flex items-center gap-3">
                    <button
                      onClick={() => onSelectZoneForEnquiry(selectedZone.name)}
                      className="btn-royal-emerald w-full h-11 rounded-xl text-xs font-cinzel font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
                    >
                      <Sparkles size={14} className="text-[#D4AF37]" />
                      <span>Inquire for {selectedZone.name}</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>

    </section>
  );
};
