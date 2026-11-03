import React, { useState, useEffect } from 'react';
import { Menu, Phone, Sparkles, Calendar, Volume2, VolumeX, Music } from 'lucide-react';
import { RoyalCrest } from './RoyalMotif';
import { HOTEL_CONFIG } from '../data/hotelData';
import { royalSoundscape } from '../utils/royalAudio';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenWeddingEnquiry: () => void;
  onOpenContactQuick: () => void;
  onOpenBooking?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMenu,
  onOpenWeddingEnquiry,
  onOpenContactQuick,
  onOpenBooking
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Subscribe to ambient audio state
    const unsubscribe = royalSoundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);


  const navLinks = [
    { label: "The Palace", href: "#hero" },
    { label: "Suites", href: "#rooms" },
    { label: "Weddings", href: "#weddings" },
    { label: "Calendar", href: "#royal-calendar" },
    { label: "Venues", href: "#venues" },
    { label: "Experiences", href: "#experiences" },
    { label: "Gallery", href: "#gallery" },
    { label: "Heritage", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];


  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0E241B]/95 backdrop-blur-md border-b border-[#C5A059]/35 shadow-lg py-2.5 md:py-3.5' 
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-3.5 md:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand identity */}
        <a 
          href="#hero" 
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2.5 group focus:outline-none shrink-0"
          aria-label="VIRĀSĀ Palace & Retreat Home"
        >
          <RoyalCrest size={30} className="text-[#D4AF37] transition-transform duration-300 group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="font-cinzel text-xs md:text-sm font-bold tracking-widest text-[#FBFAF6] uppercase leading-tight">
              VIRĀSĀ PALACE
            </span>
            <span className="text-[9px] md:text-[10px] gold-foil-text tracking-widest uppercase font-medium leading-tight">
              &amp; Retreat
            </span>
          </div>
        </a>

        {/* Zone 2: Laptop Top Navigation Links (Taj Inspired) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-[#DFCEB2]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-[#F4E8D1] transition-colors relative py-1 group whitespace-nowrap"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#DFCEB2] to-[#C5A059] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: Actions (Mobile vs Laptop) */}
        <div className="flex items-center gap-2.5 shrink-0">
          
          {/* Laptop Direct Book Button */}
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="btn-royal-outline hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase"
            >
              <Calendar size={13} className="text-[#D4AF37]" />
              <span>Book Stay</span>
            </button>
          )}

          {/* Wedding Enquiry Button (Mobile + Laptop) */}
          <button
            onClick={onOpenWeddingEnquiry}
            className="btn-royal-gold flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs tracking-wider uppercase"
            title="Destination Wedding Enquiry"
          >
            <Sparkles size={13} className="text-[#0E241B]" />
            <span>Wedding Desk</span>
          </button>

          {/* Subtle 'Ambient Heritage' Audio Toggle (Rajasthani Sitar & Flute) */}
          <button
            type="button"
            onClick={() => royalSoundscape.toggle()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 md:px-3 md:py-2 rounded-full text-xs transition-all duration-300 group ${
              isPlayingAudio
                ? 'bg-[#143126] text-[#F4E8D1] border border-[#D4AF37] shadow-[0_0_14px_rgba(212,175,55,0.35)]'
                : 'bg-[#0E241B]/90 hover:bg-[#143126] text-[#DFCEB2]/80 hover:text-white border border-[#C5A059]/40 hover:border-[#D4AF37]'
            }`}
            aria-label={isPlayingAudio ? "Mute Ambient Heritage Music" : "Play Ambient Heritage Music"}
            title={isPlayingAudio ? "Mute Ambient Heritage (Sitar & Bamboo Flute)" : "Play Ambient Heritage (Soft Rajasthani Sitar & Flute)"}
          >
            {isPlayingAudio ? (
              <div className="flex items-center gap-1">
                <Volume2 size={13} className="text-[#D4AF37] animate-pulse" />
                {/* 3 Animated Equalizer Wave Bars */}
                <div className="flex items-end gap-[1.5px] h-3 px-0.5">
                  <span className="w-[2px] h-full bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDuration: '0.8s' }} />
                  <span className="w-[2px] h-2 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDuration: '1.1s', animationDelay: '0.2s' }} />
                  <span className="w-[2px] h-2.5 bg-[#D4AF37] rounded-full animate-bounce" style={{ animationDuration: '0.9s', animationDelay: '0.4s' }} />
                </div>
              </div>
            ) : (
              <VolumeX size={13} className="text-[#DFCEB2]/60 group-hover:text-[#D4AF37] transition-colors" />
            )}
            <span className="hidden sm:inline font-cinzel text-[10px] tracking-wider uppercase font-semibold">
              {isPlayingAudio ? "Heritage Audio" : "Ambient"}
            </span>
          </button>

          {/* Direct phone icon / call modal */}
          <button
            onClick={onOpenContactQuick}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[#DFCEB2] bg-white/10 hover:bg-[#C5A059]/25 border border-white/15 transition-colors"
            aria-label="Direct Concierge Phone"
            title={`Concierge: ${HOTEL_CONFIG.phonePlaceholder}`}
          >
            <Phone size={15} />
          </button>

          {/* Mobile hamburger menu trigger (visible on mobile, hidden on wide screens) */}
          <button
            onClick={onOpenMenu}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center text-[#FBFAF6] bg-[#0E241B]/90 hover:bg-[#C5A059] hover:text-[#0E241B] border border-[#C5A059]/40 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu size={18} />
          </button>
        </div>

      </div>
    </header>
  );
};
