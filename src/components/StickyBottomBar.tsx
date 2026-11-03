import React, { useState } from 'react';
import { Calendar, Sparkles, Phone, MessageCircle, Mail, X } from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelData';

interface StickyBottomBarProps {
  onOpenBooking: () => void;
  onOpenWeddingEnquiry: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  onOpenBooking,
  onOpenWeddingEnquiry
}) => {
  const [showQuickContact, setShowQuickContact] = useState(false);

  return (
    <>
      {/* Quick Contact Drawer Popup */}
      {showQuickContact && (
        <div className="fixed inset-0 z-40 flex items-end justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowQuickContact(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-[390px] bg-[#17352B] rounded-2xl border border-[#B99560]/40 p-4 text-[#FBFAF6] shadow-2xl z-10 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#B99560]/20">
              <span className="font-cinzel text-xs font-bold text-[#FBFAF6]">
                Instant Palace Assistance
              </span>
              <button 
                onClick={() => setShowQuickContact(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#DFCEB2]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="py-3 space-y-2.5 text-xs">
              <a
                href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#122820] border border-[#B99560]/30 hover:bg-[#B99560]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B99560]/20 flex items-center justify-center text-[#B99560]">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="font-semibold text-white block">Call Palace Concierge</span>
                  <span className="text-[10px] text-gray-300 font-mono">{HOTEL_CONFIG.phonePlaceholder}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${HOTEL_CONFIG.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=Namaste,%20I%20would%20like%20to%20enquire%20about%20VIRĀSĀ%20Palace%20and%20Retreat.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#122820] border border-[#B99560]/30 hover:bg-[#B99560]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B99560]/20 flex items-center justify-center text-[#B99560]">
                  <MessageCircle size={15} />
                </div>
                <div>
                  <span className="font-semibold text-white block">WhatsApp Wedding Desk</span>
                  <span className="text-[10px] text-gray-300 font-mono">{HOTEL_CONFIG.whatsappPlaceholder}</span>
                </div>
              </a>

              <a
                href={`mailto:${HOTEL_CONFIG.emailPlaceholder}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#122820] border border-[#B99560]/30 hover:bg-[#B99560]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B99560]/20 flex items-center justify-center text-[#B99560]">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="font-semibold text-white block">Email Concierge</span>
                  <span className="text-[10px] text-gray-300 font-mono">{HOTEL_CONFIG.emailPlaceholder}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Bar (Exclusively on mobile viewports; hidden on laptop/desktop) */}
      <nav 
        aria-label="Mobile sticky booking actions"
        className="fixed bottom-0 left-0 right-0 z-30 flex md:hidden justify-center pointer-events-none"
      >
        <div className="w-full max-w-[430px] px-3 pb-3 pt-2 bg-gradient-to-t from-[#111714] via-[#111714]/95 to-transparent pointer-events-auto">
          
          <div className="bg-[#0E241B]/95 backdrop-blur-md rounded-2xl border border-[#C5A059]/40 p-1.5 shadow-2xl flex items-center gap-1.5">
            
            {/* Quick Contact Toggle */}
            <button
              onClick={() => setShowQuickContact(!showQuickContact)}
              className="w-11 h-11 rounded-xl bg-[#091913] border border-[#C5A059]/35 flex items-center justify-center text-[#DFCEB2] hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors shrink-0"
              aria-label="Direct phone and WhatsApp"
              title="Call or WhatsApp Concierge"
            >
              <Phone size={16} />
            </button>

            {/* Book a Stay Action Button */}
            <button
              onClick={onOpenBooking}
              className="btn-royal-outline flex-1 h-11 rounded-xl flex items-center justify-center gap-1.5 px-2 text-center"
            >
              <Calendar size={13} className="text-[#D4AF37] shrink-0" />
              <div className="text-left leading-tight truncate">
                <span className="block text-[10px] font-semibold text-[#DFCEB2] uppercase tracking-wide truncate">
                  Book a Stay
                </span>
                <span className="block text-[8px] text-[#C5A059] font-normal truncate">
                  Palace Suites
                </span>
              </div>
            </button>

            {/* Wedding Enquiry Action Button (Primary Gold) */}
            <button
              onClick={onOpenWeddingEnquiry}
              className="btn-royal-gold flex-1 h-11 rounded-xl flex items-center justify-center gap-1.5 px-2 text-center"
            >
              <Sparkles size={13} className="shrink-0 text-[#0E241B]" />
              <div className="text-left leading-tight truncate">
                <span className="block text-[10px] font-bold text-[#0E241B] uppercase tracking-wider truncate">
                  Wedding Desk
                </span>
                <span className="block text-[8px] text-[#0E241B]/80 font-medium truncate">
                  6 Ceremonies
                </span>
              </div>
            </button>

          </div>

        </div>
      </nav>
    </>
  );
};
