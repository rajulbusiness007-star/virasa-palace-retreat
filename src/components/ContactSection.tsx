import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Clock, ExternalLink, ShieldCheck, FileText, ChevronRight, X } from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface ContactSectionProps {
  onOpenWeddingEnquiry: () => void;
  onOpenConfigGuide: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  onOpenWeddingEnquiry,
  onOpenConfigGuide
}) => {
  const [showLegalModal, setShowLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [showMapModal, setShowMapModal] = useState<boolean>(false);

  return (
    <footer id="contact" className="bg-[#091913] text-[#FBFAF6] pt-12 md:pt-20 pb-24 md:pb-16 border-t border-[#C5A059]/30 relative overflow-hidden">
      
      {/* Background Decorative Arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 md:w-96 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-b-full opacity-60" />

      <div className="px-5 md:px-8 lg:px-12 max-w-6xl mx-auto">
        
        {/* Laptop 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 items-start">
          
          {/* Column 1: Brand & Heritage Identity */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <MotionFadeIn yOffset={18}>
              <div className="w-16 h-16 rounded-full bg-[#0E241B] border border-[#C5A059]/60 flex items-center justify-center mx-auto md:mx-0 shadow-[0_0_25px_rgba(197,160,89,0.25)]">
                <RoyalCrest size={38} className="text-[#D4AF37]" />
              </div>
              <h2 className="font-cinzel text-lg md:text-xl font-bold tracking-widest text-[#FBFAF6] uppercase mt-3">
                VIRĀSĀ PALACE &amp; RETREAT
              </h2>
              <p className="font-cormorant text-base italic text-[#F4E8D1]">
                "A Royal Story. Yours to Live."
              </p>
              <p className="text-xs text-[#FAF8F5]/75 leading-relaxed mt-3">
                An authentic 18th-century Rajputana heritage fortress and destination wedding landmark nestled in the Mewar royal corridor, Rajasthan.
              </p>
              
              <div className="pt-2 flex items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] text-[#D4AF37] bg-[#0E241B] border border-[#C5A059]/40 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                  Royal Heritage Grade I
                </span>
                <span className="text-[10px] text-[#DFCEB2] bg-[#0E241B] border border-[#C5A059]/30 px-2.5 py-1 rounded-full font-serif">
                  Est. 1748
                </span>
              </div>
            </MotionFadeIn>
          </div>

          {/* Column 2: Palace Directory & Inquiries */}
          <div className="md:col-span-5">
            <MotionFadeIn yOffset={20} delay={0.15}>
              <div className="palace-card-dark rounded-2xl p-5 md:p-6 space-y-4 shadow-2xl">
                <span className="block text-[10px] md:text-xs uppercase tracking-widest text-[#D4AF37] font-bold pb-2 border-b border-[#C5A059]/20">
                  Palace Directory &amp; Inquiries
                </span>

                <div className="space-y-3.5 text-xs text-[#FAF8F5]/85">
                  {/* Location */}
                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Estate Location</span>
                      <span className="text-[11px] text-[#DFCEB2]/80">{HOTEL_CONFIG.fullAddressPlaceholder}</span>
                      <button
                        onClick={() => setShowMapModal(true)}
                        className="mt-1 text-[11px] text-[#D4AF37] font-semibold underline block hover:text-[#F4E8D1]"
                      >
                        View Coordinates &amp; Airport Route
                      </button>
                    </div>
                  </div>

                  {/* Direct Phone */}
                  <div className="flex items-start gap-3 pt-2.5 border-t border-[#C5A059]/15">
                    <Phone size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Concierge &amp; Reservations</span>
                      <a href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`} className="text-[11px] text-[#DFCEB2]/90 hover:text-[#D4AF37] transition-colors font-mono font-medium">
                        {HOTEL_CONFIG.phonePlaceholder}
                      </a>
                      <span className="block text-[10px] text-gray-400">24/7 Royal Khansama Service Desk</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 pt-2.5 border-t border-[#C5A059]/15">
                    <Mail size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Electronic Correspondence</span>
                      <a href={`mailto:${HOTEL_CONFIG.emailPlaceholder}`} className="text-[11px] text-[#DFCEB2]/90 hover:text-[#D4AF37] transition-colors font-mono font-medium">
                        {HOTEL_CONFIG.emailPlaceholder}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3 pt-2.5 border-t border-[#C5A059]/15">
                    <MessageCircle size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-white block">Instant Wedding Concierge</span>
                      <a 
                        href={`https://wa.me/${HOTEL_CONFIG.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=Namaste,%20I%20would%20like%20to%20enquire%20about%20VIRĀSĀ%20Palace%20and%20Retreat.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[#DFCEB2]/90 hover:text-[#D4AF37] transition-colors font-mono font-medium"
                      >
                        {HOTEL_CONFIG.whatsappPlaceholder}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quick Communication Action Buttons */}
                <div className="pt-3 border-t border-[#C5A059]/20 grid grid-cols-2 gap-2.5">
                  <a
                    href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
                    className="btn-royal-outline h-10 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <Phone size={13} className="text-[#D4AF37]" />
                    <span>Call Concierge</span>
                  </a>

                  <button
                    onClick={onOpenWeddingEnquiry}
                    className="btn-royal-gold h-10 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={13} className="text-[#0E241B]" />
                    <span>Wedding Desk</span>
                  </button>
                </div>
              </div>
            </MotionFadeIn>
          </div>

          {/* Column 3: Integrations & Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <MotionFadeIn yOffset={14} delay={0.2}>
              <div className="p-4 bg-[#17352B]/70 rounded-2xl border border-[#B99560]/25 space-y-3">
                <div>
                  <span className="font-cinzel text-xs font-bold text-[#DFCEB2] block">
                    Property Configuration
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-1">
                    Sabre SynXis, Opera Cloud &amp; CRM Webhook Endpoints
                  </span>
                </div>
                <button
                  onClick={onOpenConfigGuide}
                  className="w-full py-2 rounded-xl bg-[#B99560]/20 text-[#DFCEB2] hover:bg-[#B99560] hover:text-[#17352B] transition-colors text-xs font-semibold text-center border border-[#B99560]/40"
                >
                  Developer &amp; PMS Guide
                </button>
              </div>
            </MotionFadeIn>

            {/* Quick Palace Protocols */}
            <div className="p-4 bg-[#17352B]/40 rounded-2xl border border-[#B99560]/15 space-y-2 text-xs text-[#DFCEB2]/80">
              <span className="font-cinzel text-xs font-semibold text-white block">Palace Protocols</span>
              <p className="text-[11px]">Check-in: 2:00 PM</p>
              <p className="text-[11px]">Check-out: 11:00 AM</p>
              <p className="text-[11px]">Sole wedding exclusivity guaranteed per date.</p>
            </div>
          </div>

        </div>

        {/* Legal & Policy Links Row */}
        <div className="mt-10 pt-6 border-t border-[#B99560]/20 flex flex-wrap items-center justify-between gap-4 text-xs text-[#DFCEB2]/70">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLegalModal('privacy')}
              className="hover:text-[#B99560] transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button 
              onClick={() => setShowLegalModal('terms')}
              className="hover:text-[#B99560] transition-colors"
            >
              Terms of Residence
            </button>
            <span>·</span>
            <button 
              onClick={() => setShowMapModal(true)}
              className="hover:text-[#B99560] transition-colors"
            >
              Location Map
            </button>
          </div>

          {/* Copyright */}
          <div className="text-right text-[11px] text-[#DFCEB2]/60">
            <p>© {new Date().getFullYear()} VIRĀSĀ PALACE &amp; RETREAT. All rights reserved.</p>
          </div>
        </div>

      </div>

      {/* Map & Directions Modal */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-[420px] bg-[#FBFAF6] rounded-t-3xl sm:rounded-2xl p-5 text-[#20251F] shadow-2xl border border-[#B99560]/40">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-cinzel text-sm font-bold text-[#17352B]">Estate Location &amp; Route</h3>
              <button onClick={() => setShowMapModal(false)} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                <X size={16} />
              </button>
            </div>
            
            <div className="py-4 space-y-3 text-xs">
              <div className="aspect-video w-full rounded-xl bg-[#17352B] border border-[#B99560]/30 flex flex-col items-center justify-center text-center p-4 text-[#FBFAF6]">
                <MapPin size={28} className="text-[#B99560] mb-1" />
                <span className="font-cinzel font-bold text-sm">Rajasthan Heritage Belt</span>
                <span className="text-[11px] text-[#DFCEB2]">Coordinates: 24°35'N, 73°41'E</span>
                <span className="text-[10px] text-gray-400 mt-2">[Interactive Google Map embed placeholder]</span>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#20251F]/80">
                <p><strong>Nearest Airport:</strong> Maharana Pratap Airport (45 min via private sedan).</p>
                <p><strong>Private Helipad:</strong> Available on estate premises by prior 24h notification.</p>
                <p><strong>Arrival Protocol:</strong> Traditional royal welcome aarti, marigold blessings and dhol ensemble.</p>
              </div>

              <button
                onClick={() => setShowMapModal(false)}
                className="w-full h-10 rounded-xl bg-[#17352B] text-white font-cinzel text-xs font-semibold uppercase mt-2"
              >
                Close Map
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy / Terms Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="relative w-full max-w-[420px] bg-[#FBFAF6] rounded-t-3xl sm:rounded-2xl p-5 text-[#20251F] shadow-2xl border border-[#B99560]/40 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h3 className="font-cinzel text-sm font-bold text-[#17352B]">
                {showLegalModal === 'privacy' ? 'Guest Privacy Charter' : 'Terms of Palace Residence'}
              </h3>
              <button onClick={() => setShowLegalModal(null)} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                <X size={16} />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs text-[#20251F]/80 leading-relaxed">
              {showLegalModal === 'privacy' ? (
                <>
                  <p>At VIRĀSĀ PALACE &amp; RETREAT, the confidentiality of our noble guests, wedding parties, and dignitaries is held with paramount dignity.</p>
                  <p><strong>Data Processing:</strong> Inquiries submitted via this portal are strictly utilized to coordinate room availability, bespoke wedding portfolios, and dining reservations.</p>
                  <p><strong>No Third-Party Brokers:</strong> We do not market, lease, or share personal contact identifiers with non-affiliated entities.</p>
                </>
              ) : (
                <>
                  <p><strong>Heritage Conservation:</strong> VIRĀSĀ is a designated 300-year-old architectural landmark. Guests are requested to respect historical masonry and palace antiquities.</p>
                  <p><strong>Wedding Exclusivity:</strong> Only one signature wedding celebration is hosted at any given period, securing full venue dedication.</p>
                  <p><strong>Check-In &amp; Check-Out:</strong> Formal check-in is from 2:00 PM and check-out is at 11:00 AM.</p>
                </>
              )}

              <button
                onClick={() => setShowLegalModal(null)}
                className="w-full h-10 rounded-xl bg-[#17352B] text-white font-cinzel text-xs font-semibold uppercase mt-4"
              >
                Acknowledge &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
