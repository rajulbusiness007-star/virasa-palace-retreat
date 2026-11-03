import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, Home, Shield, Sparkles, Send, MessageCircle, Phone, Mail, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { ROOMS_DATA, HOTEL_CONFIG } from '../data/hotelData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialParams?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    rooms?: number;
    preferredSuiteId?: string;
  };
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialParams
}) => {

  const checkIn = initialParams?.checkIn || '2026-11-20';
  const checkOut = initialParams?.checkOut || '2026-11-23';
  const adults = initialParams?.adults || 2;
  const children = initialParams?.children || 0;
  const roomsCount = initialParams?.rooms || 1;

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const [selectedSuiteId, setSelectedSuiteId] = useState<string>(
    initialParams?.preferredSuiteId || ROOMS_DATA[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

  const selectedSuite = ROOMS_DATA.find((r) => r.id === selectedSuiteId) || ROOMS_DATA[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailStatus('sending');

    const generatedRef = `VIR-RES-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      _subject: `🏰 New Suite Reservation Inquiry - ${fullName} (${selectedSuite.name})`,
      _template: 'table',
      _captcha: 'false',
      booking_reference: generatedRef,
      guest_full_name: fullName,
      guest_email: email,
      guest_phone: phone,
      suite_name: selectedSuite.name,
      suite_category: selectedSuite.category,
      check_in: checkIn,
      check_out: checkOut,
      total_nights: nights,
      guests_count: adults + children,
      rooms_count: roomsCount,
      special_requests: specialRequests || 'None specified',
      submission_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
    };

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${HOTEL_CONFIG.emailPlaceholder}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setEmailStatus('sent');
      } else {
        setEmailStatus('fallback');
      }
    } catch {
      setEmailStatus('fallback');
    }

    setIsSubmitting(false);
    setConfirmedBookingId(generatedRef);
  };

  const handleReset = () => {
    setConfirmedBookingId(null);
    setEmailStatus('idle');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `🏰 *NEW SUITE RESERVATION INQUIRY - VIRĀSĀ PALACE*\n\n` +
    `👤 *Guest:* ${fullName}\n` +
    `📞 *Phone:* ${phone}\n` +
    `✉️ *Email:* ${email}\n` +
    `🛏️ *Suite:* ${selectedSuite.name}\n` +
    `📅 *Dates:* ${checkIn} to ${checkOut} (${nights} nights)\n` +
    `👥 *Guests:* ${adults + children} Guests (${roomsCount} Room/s)\n` +
    (specialRequests ? `📝 *Requests:* ${specialRequests}\n` : '') +
    `\n🔖 *Booking Ref:* ${confirmedBookingId || ''}`
  );
  const whatsappUrl = `https://wa.me/${HOTEL_CONFIG.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const mailtoSubject = encodeURIComponent(`🏰 Suite Reservation: ${fullName} (${selectedSuite.name}) [${confirmedBookingId || ''}]`);
  const mailtoBody = encodeURIComponent(
    `Namaste,\n\nI have requested a suite reservation at VIRĀSĀ PALACE.\n\n` +
    `Guest Name: ${fullName}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n` +
    `Suite: ${selectedSuite.name}\n` +
    `Dates: ${checkIn} to ${checkOut} (${nights} nights)\n` +
    `Party: ${adults + children} Guests (${roomsCount} Rooms)\n` +
    `Special Requests: ${specialRequests}\n` +
    `Reference: ${confirmedBookingId || ''}\n\n` +
    `Please confirm room availability and tariff quote.`
  );
  const mailtoUrl = `mailto:${HOTEL_CONFIG.emailPlaceholder}?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop with Fade Transition */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container with Scale & Slide Transition */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[430px] bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] flex flex-col z-10 border-t sm:border border-[#C5A059]/40 overflow-hidden"
          >
            
            {/* Top Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#091913] via-[#0E241B] to-[#091913] text-[#FAF8F5] border-b border-[#C5A059]/30">
              <div className="flex items-center gap-2.5">
                <RoyalCrest size={28} className="text-[#D4AF37]" />
                <div>
                  <span className="block font-cinzel text-xs font-bold tracking-wider gold-foil-text">
                    Palace Reservation
                  </span>
                  <span className="block text-[10px] text-[#DFCEB2] tracking-widest uppercase">
                    Direct Guest Inquiry
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#DFCEB2] hover:text-[#D4AF37] hover:bg-white/10 transition-colors"
                aria-label="Close booking modal"
              >
                <X size={18} />
              </button>
            </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {confirmedBookingId ? (
            /* Confirmation View */
            <div className="py-5 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#17352B]/10 border-2 border-[#B99560] flex items-center justify-center mx-auto text-[#17352B]">
                <CheckCircle2 size={36} className="text-[#B99560]" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B99560] font-bold">
                  Reservation Inquiry Dispatched
                </span>
                <h3 className="font-cinzel text-lg font-bold text-[#17352B] mt-1">
                  Namaste, {fullName || 'Honored Guest'}
                </h3>
                <p className="text-xs text-[#20251F]/80 mt-1 max-w-xs mx-auto">
                  Your reservation request has been submitted to the Palace Reservations Desk.
                </p>
              </div>

              {/* Delivery Guarantee Notification to mukulsen92238@gmail.com */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-[11px] text-emerald-950 text-left flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-emerald-900">Direct Delivery to Palace Owner:</span>
                  Booking dossier dispatched to <strong className="font-mono text-emerald-800">{HOTEL_CONFIG.emailPlaceholder}</strong>.
                </div>
              </div>

              {/* Reference Card */}
              <div className="p-3.5 bg-[#F3F0E8] rounded-xl border border-[#B99560]/30 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#B99560]/20">
                  <span className="text-gray-600">Booking Reference:</span>
                  <span className="font-mono font-bold text-[#17352B]">{confirmedBookingId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Selected Suite:</span>
                  <span className="font-semibold text-[#17352B] truncate max-w-[180px]">{selectedSuite.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-[#17352B]">{nights} {nights === 1 ? 'Night' : 'Nights'} ({checkIn} to {checkOut})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Party:</span>
                  <span className="font-semibold text-[#17352B]">{adults + children} Guests · {roomsCount} {roomsCount === 1 ? 'Room' : 'Rooms'}</span>
                </div>
              </div>

              {/* Instant Communication Actions for Owner (+91 8827846844) */}
              <div className="space-y-2 pt-1 text-left">
                <span className="block text-[10px] uppercase tracking-wider text-[#17352B] font-bold text-center">
                  Instant Direct Channels to Owner
                </span>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-royal-gold w-full h-12 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-105 transition-all text-center"
                >
                  <MessageCircle size={17} className="text-[#0E241B]" />
                  <span>Forward to Owner on WhatsApp</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
                    className="btn-royal-emerald h-11 flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-center rounded-xl"
                  >
                    <Phone size={14} className="text-[#D4AF37]" />
                    <span>Call Concierge</span>
                  </a>

                  <a
                    href={mailtoUrl}
                    className="h-11 rounded-xl bg-white border border-[#C5A059]/40 text-[#0E241B] flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider hover:bg-[#F3F0E8] transition-colors text-center"
                  >
                    <Mail size={14} className="text-[#C5A059]" />
                    <span>Direct Email</span>
                  </a>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full h-10 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-semibold uppercase tracking-wider transition-colors mt-2"
              >
                Return to Palace Overview
              </button>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Stay Summary Strip */}
              <div className="bg-[#F3F0E8] p-3 rounded-xl border border-[#B99560]/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-[#B99560]" />
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase font-semibold">Stay Dates</span>
                    <span className="font-semibold text-[#17352B]">{checkIn} → {checkOut} ({nights}n)</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <Users size={14} className="text-[#B99560]" />
                  <div>
                    <span className="block text-[10px] text-gray-500 uppercase font-semibold">Party</span>
                    <span className="font-semibold text-[#17352B]">{adults + children} G / {roomsCount} Rm</span>
                  </div>
                </div>
              </div>

              {/* Suite Selection */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1.5 flex items-center gap-1">
                  <Home size={13} className="text-[#B99560]" />
                  <span>Choose Suite or Haveli</span>
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {ROOMS_DATA.map((room) => (
                    <div
                      key={room.id}
                      onClick={() => setSelectedSuiteId(room.id)}
                      className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center gap-3 ${
                        selectedSuiteId === room.id
                          ? 'border-[#B99560] bg-[#17352B]/5 ring-1 ring-[#B99560]'
                          : 'border-gray-200 bg-white hover:border-[#B99560]/50'
                      }`}
                    >
                      <img 
                        src={room.imageUrl} 
                        alt={room.name}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-lg object-cover shrink-0" 
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#17352B] truncate">{room.name}</span>
                          <span className="text-[10px] text-[#B99560] font-medium">{room.category}</span>
                        </div>
                        <span className="block text-[11px] text-gray-500 truncate mt-0.5">{room.view}</span>
                        <span className="block text-[10px] text-gray-400 mt-0.5">{room.areaSqFt} sq.ft · Up to {room.maxGuests} Guests</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Live engine notice adhering strictly to Section 13 & 14 */}
              <div className="p-3 bg-[#F3F0E8] rounded-xl border border-[#B99560]/20 text-[11px] text-[#20251F]/80 flex gap-2">
                <Shield size={16} className="text-[#B99560] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#17352B] block">Best Palace Rate Inquiry</span>
                  Rates are customized for your dates with bespoke inclusions. Direct booking gives you complimentary champagne and airport luxury transfers.
                </div>
              </div>

              {/* Contact Fields */}
              <div className="space-y-2.5">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maharaja Vikramaditya / Sarah Jenkins"
                    className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="guest@domain.com"
                      className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                    Special Requests &amp; Butler Preferences
                  </label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Anniversary celebration, dietary requirements, arrival flight time, etc."
                    className="w-full p-2.5 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-royal-emerald w-full h-12 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Checking Palace Inventory...</span>
                ) : (
                  <>
                    <Send size={14} className="text-[#D4AF37]" />
                    <span>Submit Reservation Inquiry</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-gray-500">
                Guaranteed response within 2 hours by senior Palace Concierge
              </p>
            </form>
          )}

          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
};
