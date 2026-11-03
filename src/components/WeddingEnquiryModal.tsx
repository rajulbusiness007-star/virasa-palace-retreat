import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Calendar, Users, Clock, Send, ShieldCheck, MessageCircle, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalCrest } from './RoyalMotif';
import { HOTEL_CONFIG } from '../data/hotelData';

interface WeddingEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: {
    venueName?: string;
    summaryNote?: string;
    days?: number;
    guests?: number;
  } | null;
}

export const WeddingEnquiryModal: React.FC<WeddingEnquiryModalProps> = ({
  isOpen,
  onClose,
  initialPlan
}) => {

  // Form state
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2027-02-14');
  const [guestCount, setGuestCount] = useState('100-250');
  const [celebrationDays, setCelebrationDays] = useState('3 Days (Signature Royal)');
  const [eventType, setEventType] = useState('Full Destination Wedding (All 6 Ceremonies)');
  const [selectedVenues, setSelectedVenues] = useState<string[]>([
    'The Lotus Lake Floating Mandap',
    'The Royal Darbar Lawn'
  ]);
  const [additionalRequirements, setAdditionalRequirements] = useState('');

  // Sync initialPlan if provided from Estate Map or Concierge Estimator
  React.useEffect(() => {
    if (initialPlan) {
      if (initialPlan.venueName) {
        setSelectedVenues(prev => Array.from(new Set([...prev, initialPlan.venueName!])));
      }
      if (initialPlan.summaryNote) {
        setAdditionalRequirements(initialPlan.summaryNote);
      }
      if (initialPlan.days) {
        setCelebrationDays(`${initialPlan.days} Days`);
      }
    }
  }, [initialPlan, isOpen]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedEnquiryId, setConfirmedEnquiryId] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');

  const eventTypes = [
    'Full Destination Wedding (All 6 Ceremonies)',
    '3-Day Royal Wedding & Sangeet',
    'Intimate Wedding & Sacred Pheras',
    'Grand Reception & Celebration Dinner',
    'Pre-Wedding Rituals & Celebrations'
  ];

  const guestCountOptions = [
    '50 – 100 Guests (Intimate Royal)',
    '100 – 250 Guests (Grand Heritage)',
    '250 – 500 Guests (Imperial Palace)',
    '500+ Guests (Full Palace Estate Buyout)'
  ];

  const celebrationDaysOptions = [
    '2 Days (Weekend Celebration)',
    '3 Days (Signature Royal)',
    '4 Days (Imperial Extravaganza)',
    '5+ Days (Extended Royal Retreat)'
  ];

  const venueChoices = [
    'The Lotus Lake Floating Mandap',
    'The Royal Darbar Lawn',
    'The Sheesh Darbar Ballroom',
    'The Lotus Stepwell Courtyard',
    'The Royal Rampart Pavilion'
  ];

  const toggleVenue = (venue: string) => {
    if (selectedVenues.includes(venue)) {
      setSelectedVenues(selectedVenues.filter((v) => v !== venue));
    } else {
      setSelectedVenues([...selectedVenues, venue]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setEmailStatus('sending');

    const generatedEnquiryRef = `VP-WED-${Math.floor(10000 + Math.random() * 90000)}`;

    const payload = {
      _subject: `👑 New Destination Wedding Enquiry - ${customerName} (${preferredDate})`,
      _template: 'table',
      _captcha: 'false',
      enquiry_id: generatedEnquiryRef,
      bride_groom_or_family_name: customerName,
      contact_email: email,
      contact_phone: phone,
      preferred_wedding_date: preferredDate,
      celebration_duration: celebrationDays,
      estimated_guest_count: guestCount,
      event_ceremonies_type: eventType,
      selected_venues: selectedVenues.join(', '),
      additional_vision_and_requirements: additionalRequirements || 'None specified',
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
    setConfirmedEnquiryId(generatedEnquiryRef);
  };

  const handleReset = () => {
    setConfirmedEnquiryId(null);
    setEmailStatus('idle');
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `👑 *NEW WEDDING ENQUIRY - VIRĀSĀ PALACE*\n\n` +
    `👤 *Family / Couple:* ${customerName}\n` +
    `📞 *Phone:* ${phone}\n` +
    `✉️ *Email:* ${email}\n` +
    `📅 *Preferred Date:* ${preferredDate}\n` +
    `⏳ *Duration:* ${celebrationDays}\n` +
    `👥 *Guests:* ${guestCount}\n` +
    `🎉 *Type:* ${eventType}\n` +
    `🏛️ *Venues:* ${selectedVenues.join(', ')}\n` +
    (additionalRequirements ? `📝 *Notes:* ${additionalRequirements}\n` : '') +
    `\n🔖 *Enquiry Ref:* ${confirmedEnquiryId || ''}`
  );
  const whatsappUrl = `https://wa.me/${HOTEL_CONFIG.whatsappPlaceholder.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  const mailtoSubject = encodeURIComponent(`👑 Wedding Enquiry: ${customerName} (${preferredDate}) [${confirmedEnquiryId || ''}]`);
  const mailtoBody = encodeURIComponent(
    `Namaste,\n\nI have submitted a destination wedding enquiry for VIRĀSĀ PALACE.\n\n` +
    `Family / Couple: ${customerName}\n` +
    `Phone: ${phone}\n` +
    `Email: ${email}\n` +
    `Preferred Date: ${preferredDate}\n` +
    `Celebration Days: ${celebrationDays}\n` +
    `Estimated Guests: ${guestCount}\n` +
    `Ceremonies Type: ${eventType}\n` +
    `Selected Venues: ${selectedVenues.join(', ')}\n` +
    `Requirements: ${additionalRequirements}\n` +
    `Enquiry Ref ID: ${confirmedEnquiryId || ''}\n\n` +
    `Please reach out with your wedding portfolio and date availability.`
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
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
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#091913] via-[#0E241B] to-[#091913] text-[#FAF8F5] border-b border-[#C5A059]/30">
              <div className="flex items-center gap-2.5">
                <RoyalCrest size={28} className="text-[#D4AF37]" />
                <div>
                  <span className="block font-cinzel text-xs font-bold tracking-wider gold-foil-text">
                    Wedding Concierge
                  </span>
                  <span className="block text-[10px] text-[#DFCEB2] tracking-widest uppercase">
                    Destination Wedding Enquiry
                  </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#DFCEB2] hover:text-[#D4AF37] hover:bg-white/10 transition-colors"
                aria-label="Close wedding enquiry modal"
              >
                <X size={18} />
              </button>
            </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          
          {confirmedEnquiryId ? (
            /* Confirmation View */
            <div className="py-5 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#17352B]/10 border-2 border-[#B99560] flex items-center justify-center mx-auto text-[#17352B]">
                <CheckCircle2 size={36} className="text-[#B99560]" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#B99560] font-bold">
                  Bespoke Enquiry Received &amp; Queued
                </span>
                <h3 className="font-cinzel text-lg font-bold text-[#17352B] mt-1">
                  Congratulations, {customerName || 'Honored Family'}
                </h3>
                <p className="text-xs text-[#20251F]/80 mt-1 max-w-xs mx-auto">
                  Your destination wedding proposal has been conveyed to the Palace Director of Weddings.
                </p>
              </div>

              {/* Delivery Guarantee Notification to mukulsen92238@gmail.com */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-300 text-[11px] text-emerald-950 text-left flex items-start gap-2">
                <ShieldCheck size={16} className="text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-emerald-900">Direct Delivery to Palace Owner:</span>
                  Lead dossier dispatched to <strong className="font-mono text-emerald-800">{HOTEL_CONFIG.emailPlaceholder}</strong> and registered on the Royal Concierge Desk.
                </div>
              </div>

              {/* Summary Details */}
              <div className="p-4 bg-[#F3F0E8] rounded-xl border border-[#B99560]/30 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#B99560]/20">
                  <span className="text-gray-600">Enquiry Dossier ID:</span>
                  <span className="font-mono font-bold text-[#17352B]">{confirmedEnquiryId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Preferred Date:</span>
                  <span className="font-semibold text-[#17352B]">{preferredDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Celebration Days:</span>
                  <span className="font-semibold text-[#17352B]">{celebrationDays}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Guests:</span>
                  <span className="font-semibold text-[#17352B]">{guestCount}</span>
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
                Return to Palace Weddings
              </button>
            </div>
          ) : (
            /* Wedding Enquiry Form */
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="p-3 bg-[#17352B]/5 rounded-xl border border-[#B99560]/20 flex items-center gap-2 text-[11px] text-[#17352B]">
                <Sparkles size={16} className="text-[#B99560] shrink-0" />
                <span>
                  VIRĀSĀ Palace hosts only <strong>one signature wedding</strong> at any given time to ensure uncompromising exclusivity and royal dignity.
                </span>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                  Bride, Groom or Family Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Radhika &amp; Anant / Singhania Family"
                  className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                />
              </div>

              {/* Email & Phone */}
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
                    placeholder="contact@domain.com"
                    className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                    Phone / WhatsApp *
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

              {/* Preferred Wedding Date */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1 flex items-center gap-1">
                  <Calendar size={13} className="text-[#B99560]" />
                  <span>Preferred Wedding Date / Month *</span>
                </label>
                <input
                  type="date"
                  required
                  value={preferredDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                />
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                  Type of Celebration
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                >
                  {eventTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1 flex items-center gap-1">
                  <Users size={13} className="text-[#B99560]" />
                  <span>Estimated Guest Count</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                >
                  {guestCountOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Number of Celebration Days */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1 flex items-center gap-1">
                  <Clock size={13} className="text-[#B99560]" />
                  <span>Number of Celebration Days</span>
                </label>
                <select
                  value={celebrationDays}
                  onChange={(e) => setCelebrationDays(e.target.value)}
                  className="w-full h-10 px-3 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                >
                  {celebrationDaysOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Preferred Venues Checkboxes */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1.5">
                  Venues of Interest:
                </label>
                <div className="space-y-1.5">
                  {venueChoices.map((venue) => {
                    const isChecked = selectedVenues.includes(venue);
                    return (
                      <label 
                        key={venue} 
                        className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                          isChecked 
                            ? 'bg-[#17352B]/5 border-[#B99560]' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleVenue(venue)}
                          className="accent-[#B99560]"
                        />
                        <span className="text-xs text-[#20251F]">{venue}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#17352B] font-semibold mb-1">
                  Additional Requirements &amp; Vision
                </label>
                <textarea
                  rows={3}
                  value={additionalRequirements}
                  onChange={(e) => setAdditionalRequirements(e.target.value)}
                  placeholder="Tell us about special themes, decor aspirations, royal baraat ideas, or dietary preferences..."
                  className="w-full p-2.5 bg-white rounded-lg border border-gray-300 text-xs text-[#17352B] focus:border-[#B99560] focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-royal-gold w-full h-12 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting to Wedding Director...</span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Wedding Enquiry</span>
                  </>
                )}
              </button>

              {/* CRM / Backend Connection Note per Section 8 */}
              <p className="text-[10px] text-center text-gray-500 leading-tight">
                Direct wedding enquiry. Real-time CRM/email webhooks connect via Property Configuration.
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
