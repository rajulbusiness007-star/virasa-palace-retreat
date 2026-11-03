import React, { useState } from 'react';
import { Sparkles, Utensils, Plane, Flame, Wine, Compass, ChevronRight, X, Shield, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface BentoItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  description: string;
  fullStory: string;
  imageUrl: string;
  icon: React.ReactNode;
  specs: { label: string; value: string }[];
  colSpan?: string; // desktop col span
  rowSpan?: string;
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'sheesh-mahal',
    title: 'The Sheesh Mahal Private Dining',
    subtitle: 'Mirrored Hall of Sovereign Gastronomy',
    category: 'Epicurean Heritage',
    tag: 'Signature Dining',
    description: 'Dine surrounded by tens of thousands of hand-cut concave Belgian mirrors reflecting warm candlelight, accompanied by a 7-course royal thali.',
    fullStory: 'Originally commissioned in 1892 as the private banquet salon for visiting dignitaries, the Sheesh Mahal has been lovingly preserved. Each mirror fragment was hand-faceted to amplify candle flame into thousands of dancing stars. Our Master Khansamas prepare secret Mewar court recipes passed down across five generations, served on engraved silver plate.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
    icon: <Utensils size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Setting', value: 'Belgian Mirror Hall' },
      { label: 'Menu', value: '7-Course Royal Thali' },
      { label: 'Service', value: 'Personal Sommelier' },
    ],
    colSpan: 'md:col-span-2 md:row-span-2',
  },
  {
    id: 'vintage-fleet',
    title: 'Royal Helipad & Vintage Fleet',
    subtitle: 'Ceremonial Arrivals',
    category: 'Chauffeur & Aviation',
    tag: 'Imperial Arrival',
    description: 'Land on the private palace helipad or arrive in our pristine 1948 Rolls-Royce Silver Cloud with royal equestrian escort.',
    fullStory: 'From the moment your chartered helicopter touches down overlooking the Aravali ridge or the gleaming grille of our vintage Rolls-Royce sweeps through the Lion Gate, your sovereign journey begins with ceremonial trumpet fanfares and a shower of fresh rose petals.',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80',
    icon: <Plane size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Helipad', value: 'Twin-engine certified' },
      { label: 'Fleet', value: '1948 Rolls-Royce' },
    ],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'baori-pool',
    title: 'The Shahi Baori Stepwell Pool',
    subtitle: 'Sacred Water Architecture',
    category: 'Wellness & Sanctuaries',
    tag: 'Architectural Gem',
    description: 'Immerse in geothermal waters within a hand-carved red sandstone stepwell adorned with floating oil lamps and marigold garlands.',
    fullStory: 'Conceived in homage to Rajasthan’s ancient stepped baoris, this temperature-controlled aquatic oasis is fed by mineral spring waters. At twilight, hundreds of brass lamps are set afloat as local musicians play the sitar from carved jharokha balconies overhead.',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80',
    icon: <Sparkles size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Water', value: 'Natural Mineral Spring' },
      { label: 'Temp', value: 'Heated to 29°C' },
    ],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'aravali-fireworks',
    title: 'Aravali Ridge Midnight Fireworks',
    subtitle: 'Celebratory Splendor',
    category: 'Spectacle & Weddings',
    tag: 'Wedding Highlight',
    description: 'Illuminate the rugged desert sky with a bespoke, silent-friendly eco pyrotechnic display synchronized to classical melodies.',
    fullStory: 'As the wedding pheras conclude or your anniversary toast is raised, the southern bastions ignite with a symphony of gold, emerald, and silver comets cascading above the ancient Aravali silhouette.',
    imageUrl: 'https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?auto=format&fit=crop&w=900&q=80',
    icon: <Flame size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Duration', value: '5-12 Minutes Custom' },
      { label: 'Vantage', value: 'Zenana Terrace' },
    ],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'mewar-cellar',
    title: 'The Mewar Royal Vault & Cellar',
    subtitle: 'Rare Vintages & Single Malts',
    category: 'Private Tasting',
    tag: 'Connoisseur Reserve',
    description: 'Descend into subterranean stone vaults housing over 1,400 rare vintages, ancient Indian heritage liqueurs, and private reserve malts.',
    fullStory: 'Carved directly into granite bedrocks beneath the main courtyard, our cellar maintains natural subterranean humidity and cool temperatures year-round. Guided private tastings are accompanied by Rajasthan artisanal cheeses and saffron smoked delicacies.',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80',
    icon: <Wine size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Collection', value: '1,400+ Bottles' },
      { label: 'Experience', value: 'Cellar Master Tour' },
    ],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'attar-perfumery',
    title: 'Imperial Attar & Royal Fragrance Studio',
    subtitle: 'Bespoke Scent Atelier',
    category: 'Artisanal Craft',
    tag: 'Sensory Alchemy',
    description: 'Distill your own commemorative wedding fragrance using Damask rose oils, wild Himalayan vetiver, and pure Mysore sandalwood.',
    fullStory: 'Rajasthan’s royal courts were legendary patrons of ittar distillation. In our courtyard perfume studio, Master Perfumers guide couples in blending their signature sovereign aroma, bottled in hand-blown crystal flacons sealed with gold foil wax.',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=900&q=80',
    icon: <Compass size={18} className="text-[#D4AF37]" />,
    specs: [
      { label: 'Materials', value: '100% Pure Botanical' },
      { label: 'Gift', value: 'Custom Crystal Flacon' },
    ],
    colSpan: 'md:col-span-1',
  },
];

interface LuxuryBentoGridProps {
  onReserveExperience: (title: string) => void;
  onOpenWeddingEnquiry: () => void;
}

export const LuxuryBentoGrid: React.FC<LuxuryBentoGridProps> = ({
  onReserveExperience,
  onOpenWeddingEnquiry,
}) => {
  const [activeItem, setActiveItem] = useState<BentoItem | null>(null);

  return (
    <section id="bento" className="py-14 md:py-24 px-4 md:px-8 bg-[#091913] text-[#FBFAF6] relative overflow-hidden">
      
      {/* Subtle gold watermark accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-[#D4AF37]">
        <RoyalCrest size={560} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <MotionFadeIn yOffset={20}>
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E241B] border border-[#C5A059]/40 text-[#DFCEB2] text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold mb-3">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>The Crown Jewels of Virāsā</span>
            </div>
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-white drop-shadow-md">
              The Imperial Bento Collection
            </h2>
            <RoyalDivider className="my-3 md:my-5" />
            <p className="text-xs md:text-base text-[#FAF8F5]/80 max-w-2xl mx-auto leading-relaxed font-light">
              An interactive constellation of bespoke palace privileges, transcendent culinary theatre, and ceremonial spectacles crafted for our most discerning patrons.
            </p>

            {/* Adorable Floating Privilege Pills */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {[
                { emoji: '🪷', label: 'Lotus Scented' },
                { emoji: '👑', label: '24/7 Sovereign Butler' },
                { emoji: '✨', label: 'Starlight Dining' },
                { emoji: '🎺', label: 'Trumpet Fanfares' },
                { emoji: '🕊️', label: 'Royal Exclusivity' }
              ].map((pill) => (
                <motion.span
                  key={pill.label}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E241B]/90 border border-[#C5A059]/40 text-[#DFCEB2] text-[11px] font-medium shadow-sm hover:border-[#D4AF37] hover:text-[#F4E8D1] transition-all cursor-default"
                >
                  <span>{pill.emoji}</span>
                  <span>{pill.label}</span>
                </motion.span>
              ))}
            </div>
          </div>
        </MotionFadeIn>

        {/* Asymmetrical Luxury Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[280px] md:auto-rows-[300px]">
          {BENTO_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => setActiveItem(item)}
              className={`group relative rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer border border-[#C5A059]/30 bg-[#0E241B] shadow-[0_12px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ${
                item.colSpan || ''
              }`}
            >
              {/* Background Photography with Zoom Effect */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                {/* Velvet emerald and charcoal gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#091913] via-[#0E241B]/80 to-black/35 group-hover:via-[#0E241B]/60 transition-colors duration-500" />
                {/* Gold reflection highlight on hover */}
                <div className="absolute inset-0 bg-radial from-[#D4AF37]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>

              {/* Card Header Badges */}
              <div className="relative z-10 p-5 md:p-6 flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider bg-[#0E241B]/90 border border-[#C5A059]/60 text-[#DFCEB2] backdrop-blur-md">
                  {item.tag}
                </span>

                <div className="w-8 h-8 rounded-full bg-[#0E241B]/80 border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#C5A059] group-hover:text-[#0E241B] transition-colors">
                  {item.icon}
                </div>
              </div>

              {/* Card Bottom Body */}
              <div className="absolute bottom-0 inset-x-0 z-10 p-5 md:p-6 flex flex-col justify-end bg-gradient-to-t from-[#091913] via-[#091913]/90 to-transparent">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {item.category}
                </span>
                <h3 className="font-cinzel text-lg md:text-xl font-bold text-white tracking-wide mt-1 leading-snug drop-shadow-sm group-hover:text-[#F4E8D1] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#FAF8F5]/80 line-clamp-2 mt-1.5 font-light leading-relaxed">
                  {item.description}
                </p>

                {/* Tactile Action Link */}
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#DFCEB2] group-hover:text-[#D4AF37] transition-colors">
                  <span>Explore Privilege</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail Modal for Selected Bento Privilege */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0E241B] border border-[#C5A059]/60 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative text-[#FBFAF6] max-h-[90vh] flex flex-col"
            >
              {/* Header Image */}
              <div className="relative h-56 w-full shrink-0">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E241B] via-black/40 to-black/30" />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
                  aria-label="Close detail modal"
                >
                  <X size={18} />
                </button>
                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[10px] tracking-widest text-[#D4AF37] uppercase font-bold">
                    {activeItem.category}
                  </span>
                  <h3 className="font-cinzel text-xl md:text-2xl font-bold text-white uppercase mt-0.5">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <p className="font-cormorant text-lg italic text-[#F4E8D1]">
                  "{activeItem.subtitle}"
                </p>
                <p className="text-xs md:text-sm text-[#FAF8F5]/85 leading-relaxed font-light">
                  {activeItem.fullStory}
                </p>

                {/* Specs Pill Grid */}
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2.5 pt-2">
                  {activeItem.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#143126] border border-[#C5A059]/30 text-center">
                      <span className="block text-[10px] uppercase tracking-wider text-[#DFCEB2]/70">{spec.label}</span>
                      <span className="text-xs font-semibold text-[#F4E8D1]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="pt-4 border-t border-[#C5A059]/20 flex flex-col xs:flex-row gap-3">
                  <button
                    onClick={() => {
                      const itemTitle = activeItem.title;
                      setActiveItem(null);
                      onReserveExperience(itemTitle);
                    }}
                    className="btn-royal-gold flex-1 h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} className="text-[#0E241B]" />
                    <span>Reserve Privilege</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveItem(null);
                      onOpenWeddingEnquiry();
                    }}
                    className="btn-royal-outline flex-1 h-11 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>Add to Wedding Plan</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};