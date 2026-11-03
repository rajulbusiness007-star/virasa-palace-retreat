import React, { useState } from 'react';
import { Calendar, Sparkles, Phone, MessageCircle, Mail, X, CheckCircle2 } from 'lucide-react';
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
  const [callbackPhone, setCallbackPhone] = useState('');
  const [callbackSent, setCallbackSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickCallback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackPhone) return;

    setIsSubmitting(true);
    const payload = {
      _subject: `🚨 Mobile Bar Callback Request: ${callbackPhone}`,
      _template: 'table',
      _captcha: 'false',
      phone_number: callbackPhone,
      request_source: 'Mobile Sticky Bottom Bar',
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${HOTEL_CONFIG.emailPlaceholder}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch {
      // offline fallback
    }

    setIsSubmitting(false);
    setCallbackSent(true);
  };

  const whatsappQuickMessage = encodeURIComponent('Namaste! I am on the VIRĀSĀ Palace website and would like to speak with the Owner/Concierge regarding booking & wedding details.');
  const whatsappUrl = `https://wa.me/${HOTEL_CONFIG.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=${whatsappQuickMessage}`;

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
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-[#122820] border border-[#B99560]/30 hover:bg-[#B99560]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B99560]/20 flex items-center justify-center text-[#B99560]">
                  <MessageCircle size={15} />
                </div>
                <div>
                  <span className="font-semibold text-white block">WhatsApp Palace Owner Desk</span>
                  <span className="text-[10px] text-gray-300 font-mono">{HOTEL_CONFIG.whatsappPlaceholder}</span>
                </div>
              </a>

              <a
                href={`mailto:${HOTEL_CONFIG.emailPlaceholder}?subject=${encodeURIComponent('Inquiry from VIRĀSĀ Palace Website')}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-[#122820] border border-[#B99560]/30 hover:bg-[#B99560]/20 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#B99560]/20 flex items-center justify-center text-[#B99560]">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="font-semibold text-white block">Email Owner / Concierge</span>
                  <span className="text-[10px] text-gray-300 font-mono">{HOTEL_CONFIG.emailPlaceholder}</span>
                </div>
              </a>

              {/* Instant Callback Form inside Mobile Drawer */}
              <div className="mt-3 pt-3 border-t border-[#B99560]/20">
                {callbackSent ? (
                  <div className="p-2.5 bg-[#122820] rounded-xl border border-emerald-400/40 text-[11px] text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Callback request sent to Owner Desk!</span>
                  </div>
                ) : (
                  <form onSubmit={handleQuickCallback} className="flex gap-1.5">
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="Enter mobile for instant callback..."
                      className="flex-1 h-9 px-2.5 rounded-lg bg-[#0E241B] border border-[#B99560]/40 text-xs text-white placeholder:text-gray-400 focus:outline-none focus:border-[#B99560]"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-royal-gold px-3 h-9 rounded-lg text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                    >
                      {isSubmitting ? 'Sending...' : 'Request Call'}
                    </button>
                  </form>
                )}
              </div>
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
