import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, Mail, Calendar, Sparkles, MapPin, ChevronRight, Settings, Volume2, VolumeX, Music } from 'lucide-react';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { HOTEL_CONFIG } from '../data/hotelData';
import { royalSoundscape } from '../utils/royalAudio';

interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenWeddingEnquiry: () => void;
  onOpenConfigGuide: () => void;
}

export const NavDrawer: React.FC<NavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  onOpenWeddingEnquiry,
  onOpenConfigGuide
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const unsubscribe = royalSoundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!isOpen) return null;

  const navLinks = [
    { label: "The Palace", href: "#hero", subtitle: "Grand Entrance & Drone Loop" },
    { label: "Bento Privileges", href: "#bento", subtitle: "The Imperial Crown Jewels" },
    { label: "Suites & Haveli", href: "#rooms", subtitle: "Aristocratic Accommodation" },
    { label: "Estate Grounds Map", href: "#estate-map", subtitle: "Interactive 3D Scrollytelling" },
    { label: "Destination Weddings", href: "#weddings", subtitle: "6 Royal Ceremonies & Mandap" },
    { label: "Wedding Timeline", href: "#wedding-timeline", subtitle: "3-Day Scrollytelling Itinerary" },
    { label: "Annual Royal Calendar", href: "#royal-calendar", subtitle: "Seasonal Festivals & Peak Wedding Dates" },
    { label: "Concierge Architect", href: "#concierge-estimator", subtitle: "Custom Suite & Privilege Builder" },
    { label: "Royal Guest Book", href: "#guest-book", subtitle: "Wax Seals & Congratulatory Wall" },
    { label: "Curated Experiences", href: "#experiences", subtitle: "Fine Dining, Spa & Evenings" },
    { label: "Palace Gallery", href: "#gallery", subtitle: "Visual Tapestry & Lightbox" },
    { label: "Philosophy & Heritage", href: "#about", subtitle: "300 Years of Living Royalty" },
    { label: "Guest FAQs", href: "#faq", subtitle: "Etiquette, Booking & Transfers" },
    { label: "Royal Chronicle", href: "#newsletter", subtitle: "Seasonal Dispatches & Offers" },
    { label: "Concierge & Location", href: "#contact", subtitle: "Rajasthan Heritage Belt" },
  ];

  const handleLinkClick = (href: string) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-[340px] bg-[#091913] text-[#FAF8F5] h-full shadow-2xl flex flex-col z-10 border-l border-[#C5A059]/30 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C5A059]/20 bg-gradient-to-r from-[#091913] via-[#0E241B] to-[#091913]">
          <div className="flex items-center gap-3">
            <RoyalCrest size={32} className="text-[#D4AF37]" />
            <div>
              <span className="block font-cinzel text-sm font-bold tracking-wider gold-foil-text">VIRĀSĀ PALACE</span>
              <span className="block text-[10px] text-[#DFCEB2] tracking-widest uppercase">&amp; Retreat</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#DFCEB2] hover:text-[#D4AF37] hover:bg-white/10 transition-colors"
            aria-label="Close navigation menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content & Links */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1">
          <div className="py-2 text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
            Palace Directory
          </div>

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="group flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#C5A059]/10 transition-colors text-left"
              >
                <div>
                  <span className="block text-sm font-cinzel font-medium text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                    {link.label}
                  </span>
                  <span className="block text-[11px] text-[#FAF8F5]/60">
                    {link.subtitle}
                  </span>
                </div>
                <ChevronRight size={14} className="text-[#C5A059]/40 group-hover:text-[#D4AF37] group-hover:translate-x-0.5 transition-all" />
              </a>
            ))}
          </nav>

          <RoyalDivider className="my-4" />

          {/* Ambient Heritage Audio Controller for Mobile */}
          <div className="py-2.5 px-3 rounded-xl bg-[#0E241B] border border-[#C5A059]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                isPlayingAudio ? 'bg-[#D4AF37] text-[#0E241B]' : 'bg-[#143126] text-[#DFCEB2]'
              }`}>
                {isPlayingAudio ? (
                  <Volume2 size={16} className="animate-pulse" />
                ) : (
                  <VolumeX size={16} />
                )}
              </div>
              <div>
                <span className="font-cinzel text-xs font-semibold block text-white">
                  Ambient Heritage
                </span>
                <span className="text-[10px] text-[#DFCEB2]/70 block">
                  {isPlayingAudio ? "Rajasthani Sitar & Flute Playing" : "Soft Traditional Instrumental Loop"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => royalSoundscape.toggle()}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                isPlayingAudio
                  ? 'bg-[#D4AF37] text-[#0E241B] shadow'
                  : 'bg-[#143126] text-[#DFCEB2] hover:text-white border border-[#C5A059]/40'
              }`}
            >
              {isPlayingAudio ? "Mute" : "Play"}
            </button>
          </div>

          <RoyalDivider className="my-3" />

          {/* Quick Primary Actions in Drawer */}
          <div className="space-y-2.5 pt-1">
            <button
              onClick={() => {
                onClose();
                onOpenWeddingEnquiry();
              }}
              className="btn-royal-gold w-full h-11"
            >
              <Sparkles size={14} />
              <span>Wedding Desk Enquiry</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="btn-royal-outline w-full h-11"
            >
              <Calendar size={14} />
              <span>Reserve a Suite</span>
            </button>
          </div>

          {/* Verified Hotel Contact Info */}
          <div className="pt-4 pb-2 border-t border-[#C5A059]/20 mt-4 space-y-2 text-xs text-[#FAF8F5]/80">
            <div className="flex items-center gap-2.5">
              <MapPin size={14} className="text-[#D4AF37] shrink-0" />
              <span className="truncate">{HOTEL_CONFIG.estateLocation}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#D4AF37] shrink-0" />
              <a href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`} className="truncate hover:text-[#D4AF37] transition-colors font-mono">
                {HOTEL_CONFIG.phonePlaceholder}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#D4AF37] shrink-0" />
              <a href={`mailto:${HOTEL_CONFIG.emailPlaceholder}`} className="truncate hover:text-[#D4AF37] transition-colors font-mono text-[11px]">
                {HOTEL_CONFIG.emailPlaceholder}
              </a>
            </div>
          </div>
        </div>

        {/* Footer info & Dev Integration Guide */}
        <div className="p-4 bg-[#050D0A] border-t border-[#C5A059]/20 flex items-center justify-between text-[11px] text-[#C5A059]/80">
          <button
            onClick={() => {
              onClose();
              onOpenConfigGuide();
            }}
            className="flex items-center gap-1.5 text-[#DFCEB2] hover:text-[#D4AF37] transition-colors text-[11px]"
          >
            <Settings size={12} />
            <span>Config &amp; Credentials Guide</span>
          </button>
          <span className="text-[10px] text-white/40">v1.0 Mewar</span>
        </div>
      </div>
    </div>
  );
};
