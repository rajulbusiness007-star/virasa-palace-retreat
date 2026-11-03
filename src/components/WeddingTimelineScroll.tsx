import React, { useRef, useState } from 'react';
import { Clock, MapPin, Sparkles, ChevronLeft, ChevronRight, Music, Shirt, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface TimelineEvent {
  id: string;
  dayNumber: number;
  dayTitle: string;
  time: string;
  title: string;
  hindiTitle: string;
  venue: string;
  dressCode: string;
  musicMood: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const WEDDING_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'event-1',
    dayNumber: 1,
    dayTitle: 'Day 1: Arrival & Welcome',
    time: '15:30 HRS',
    title: 'The Shahi Swagat & Royal Dhol',
    hindiTitle: 'शाही स्वागत',
    venue: 'The Grand Lion Gate & Central Courtyard',
    dressCode: 'Resort Chic / Light Pastels',
    musicMood: 'Ceremonial Nagada & Shehnai Fanfares',
    description: 'Chauffeured arrival flanked by equestrian escorts. Guests are received with traditional sandalwood tikka, fresh jasmine garlands, and iced saffron-rose sherbet.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
    tag: 'Ceremonial Welcome',
  },
  {
    id: 'event-2',
    dayNumber: 1,
    dayTitle: 'Day 1: Sangeet Night',
    time: '19:30 HRS',
    title: 'Jashn-e-Sangeet Under The Stars',
    hindiTitle: 'जश्न-ए-संगीत',
    venue: 'The Durbar Grand Lawn',
    dressCode: 'Gilded Velvet, Midnight Emerald & Shimmer',
    musicMood: 'Live Sufi-Bollywood Fusion & DJ Set',
    description: 'A starlit amphitheatre of music and dance performances framed by the floodlit 300-year-old palace ramparts, with artisanal cocktail bars and live chaat ateliers.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    tag: 'Evening Soiree',
  },
  {
    id: 'event-3',
    dayNumber: 2,
    dayTitle: 'Day 2: Morning Celebrations',
    time: '10:30 HRS',
    title: 'Phoolon Ki Haldi & Mehendi Mela',
    hindiTitle: 'फूलों की हल्दी',
    venue: 'Zenana Sunken Courtyard & Stepwell',
    dressCode: 'Marigold Yellow, Mustard & Mint Green',
    musicMood: 'Acoustic Rajasthani Folk Singers & Dholak',
    description: 'Organic turmeric paste application replaced by a shower of yellow marigold petals. Intricate organic henna artistry by master artists under silk shamianas.',
    imageUrl: 'https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80',
    tag: 'Sacred Ritual',
  },
  {
    id: 'event-4',
    dayNumber: 2,
    dayTitle: 'Day 2: Royal Procession',
    time: '16:00 HRS',
    title: 'The Royal Baraat Procession',
    hindiTitle: 'शाही बारात',
    venue: 'Palace Avenue to Elephant Gate',
    dressCode: 'Regal Sherwani & Floral Safa (Turbans)',
    musicMood: '18-Piece Brass Band & Dhol Players',
    description: 'The groom departs in our 1948 Rolls-Royce accompanied by an elephant procession and dancing friends. Guests are welcomed at the Toran gate by the bride’s royal family.',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    tag: 'Baraat Joy',
  },
  {
    id: 'event-5',
    dayNumber: 2,
    dayTitle: 'Day 2: Holy Matrimony',
    time: '18:30 HRS',
    title: 'Shubh Vivah at The Floating Mandap',
    hindiTitle: 'शुभ विवाह',
    venue: 'The Floating Lotus Mandap',
    dressCode: 'Royal Heritage Rajputana Splendor',
    musicMood: 'Vedic Chanting & Sitar Resonance',
    description: 'As twilight falls over the Aravalis, the couple takes the sacred seven pheras around the holy fire. The ceremony concludes with quiet eco-fireworks reflecting in the water.',
    imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    tag: 'Vows & Pheras',
  },
  {
    id: 'event-6',
    dayNumber: 3,
    dayTitle: 'Day 3: Imperial Finale',
    time: '20:00 HRS',
    title: 'The Sheesh Mahal Reception Gala',
    hindiTitle: 'राजसी प्रीतिभोज',
    venue: 'The Sheesh Mahal Mirror Ballroom',
    dressCode: 'Black Tie Tuxedo & Imperial Gowns',
    musicMood: 'Chamber String Quartet & Jazz Ensemble',
    description: 'An evening of royal dining featuring a 7-course banquet served on silver platters, wedding cake cutting, heart-warming toasts, and late-night revelry.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    tag: 'Imperial Gala',
  },
];

interface WeddingTimelineScrollProps {
  onOpenWeddingEnquiry: () => void;
}

export const WeddingTimelineScroll: React.FC<WeddingTimelineScrollProps> = ({
  onOpenWeddingEnquiry,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');

  const filteredEvents = selectedDay === 'all'
    ? WEDDING_TIMELINE_EVENTS
    : WEDDING_TIMELINE_EVENTS.filter((e) => e.dayNumber === selectedDay);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="wedding-timeline" className="py-14 md:py-24 px-4 md:px-8 bg-[#0E241B] text-[#FBFAF6] relative overflow-hidden">
      
      {/* Ambient background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] text-[#D4AF37] pointer-events-none">
        <RoyalCrest size={480} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#143126] border border-[#C5A059]/40 text-[#DFCEB2] text-[10px] md:text-xs tracking-[0.25em] uppercase font-semibold mb-2.5">
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>Scrollytelling Itinerary</span>
            </div>
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-white drop-shadow">
              The 3-Day Royal Wedding Journey
            </h2>
            <RoyalDivider className="my-3 md:my-4" />
            <p className="text-xs md:text-base text-[#FAF8F5]/80 max-w-2xl mx-auto leading-relaxed font-light">
              Swipe sideways across hours and ceremonial chapters. Experience how every ritual is orchestrated into an unforgettable symphony of love, music, and heritage.
            </p>
          </div>
        </MotionFadeIn>

        {/* Day Selector & Scroll Controls Toolbar */}
        <div className="flex flex-col xs:flex-row items-center justify-between gap-3 mb-6 pb-2 border-b border-[#C5A059]/20">
          
          {/* Day Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full xs:w-auto">
            <button
              onClick={() => setSelectedDay('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedDay === 'all'
                  ? 'bg-[#C5A059] text-[#0E241B] font-bold shadow'
                  : 'bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/20'
              }`}
            >
              All Celebrations
            </button>
            <button
              onClick={() => setSelectedDay(1)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedDay === 1
                  ? 'bg-[#C5A059] text-[#0E241B] font-bold shadow'
                  : 'bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/20'
              }`}
            >
              Day 1: Swagat &amp; Sangeet
            </button>
            <button
              onClick={() => setSelectedDay(2)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedDay === 2
                  ? 'bg-[#C5A059] text-[#0E241B] font-bold shadow'
                  : 'bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/20'
              }`}
            >
              Day 2: Haldi, Baraat &amp; Vivah
            </button>
            <button
              onClick={() => setSelectedDay(3)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedDay === 3
                  ? 'bg-[#C5A059] text-[#0E241B] font-bold shadow'
                  : 'bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/20'
              }`}
            >
              Day 3: Imperial Gala
            </button>
          </div>

          {/* Directional Chevron Buttons */}
          <div className="hidden xs:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full bg-[#143126] border border-[#C5A059]/30 text-[#DFCEB2] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
              aria-label="Scroll timeline left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full bg-[#143126] border border-[#C5A059]/30 text-[#DFCEB2] flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
              aria-label="Scroll timeline right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Cards Track */}
        <div 
          ref={scrollRef}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {filteredEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="w-[290px] xs:w-[320px] md:w-[360px] shrink-0 rounded-2xl md:rounded-3xl overflow-hidden bg-[#143126] border border-[#C5A059]/35 shadow-2xl flex flex-col group hover:border-[#D4AF37] transition-all"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Event Image Banner with Time Pill */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#091913]">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#143126] via-black/30 to-black/30" />
                
                {/* Time & Day Pill */}
                <div className="absolute top-3 left-3 bg-[#0E241B]/95 border border-[#C5A059]/60 text-[#DFCEB2] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow">
                  <Clock size={11} className="text-[#D4AF37]" />
                  <span>{event.time}</span>
                </div>

                <div className="absolute top-3 right-3 text-[#DFCEB2]/80 text-xs font-serif">
                  {event.hindiTitle}
                </div>

                {/* Day Marker */}
                <div className="absolute bottom-2 left-3 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                  {event.dayTitle}
                </div>
              </div>

              {/* Event Body */}
              <div className="p-4 md:p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-cinzel text-base md:text-lg font-bold text-white tracking-wide leading-snug group-hover:text-[#F4E8D1] transition-colors">
                    {event.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-[#DFCEB2]/90">
                    <MapPin size={12} className="text-[#D4AF37] shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>

                  <p className="mt-2.5 text-xs text-[#FAF8F5]/80 font-light leading-relaxed">
                    {event.description}
                  </p>
                </div>

                {/* Styling Guidance & Music Vibe Pills */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/20 space-y-2 text-[11px]">
                  <div className="flex items-start gap-1.5 text-[#DFCEB2]/85">
                    <Shirt size={12} className="text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>Attire:</strong> {event.dressCode}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-[#DFCEB2]/85">
                    <Music size={12} className="text-[#C5A059] shrink-0 mt-0.5" />
                    <span><strong>Acoustics:</strong> {event.musicMood}</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA for Wedding Enquiry */}
        <div className="mt-6 text-center">
          <button
            onClick={onOpenWeddingEnquiry}
            className="btn-royal-gold px-7 py-3 rounded-xl text-xs uppercase tracking-wider font-semibold inline-flex items-center gap-2"
          >
            <Sparkles size={15} className="text-[#0E241B]" />
            <span>Customize This Itinerary For Your Wedding</span>
          </button>
        </div>

      </div>

    </section>
  );
};
