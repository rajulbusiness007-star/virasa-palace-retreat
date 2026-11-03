import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string>('all');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const interests = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'retreats', label: 'Seasonal Royal Retreats' },
    { id: 'weddings', label: 'Destination Weddings' },
    { id: 'culinary', label: 'Royal Khansama Dining' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid royal correspondence email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate luxury dispatch registration
    setTimeout(() => {
      setStatus('success');
    }, 700);
  };

  return (
    <section id="newsletter" className="py-12 md:py-20 px-4 md:px-8 bg-[#FAF8F5] border-t border-[#C5A059]/20 relative overflow-hidden">
      {/* Subtle watermark crest */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none text-[#C5A059]">
        <RoyalCrest size={400} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <MotionFadeIn yOffset={20}>
          <div className="palace-card-dark text-[#FBFAF6] rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden">
            
            {/* Top Decorative Border Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 md:w-64 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-b-full opacity-80" />

            {status === 'success' ? (
              /* Success Royal Confirmation */
              <div className="text-center py-6 md:py-8 space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center mx-auto text-[#D4AF37]">
                  <CheckCircle size={32} />
                </div>
                <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold block">
                  Royal Privilege Confirmed
                </span>
                <h3 className="font-cinzel text-xl md:text-3xl font-bold text-[#FBFAF6] uppercase tracking-wide">
                  Welcome to The Virāsā Gazette
                </h3>
                <RoyalDivider className="my-2 max-w-xs mx-auto" />
                <p className="font-cormorant text-base md:text-xl italic text-[#F4E8D1] max-w-lg mx-auto leading-relaxed">
                  "It is our solemn privilege to welcome you to our inner circle of noble patronage."
                </p>
                <p className="text-xs md:text-sm text-[#FAF8F5]/80 max-w-md mx-auto">
                  A personalized welcome communique has been directed to <span className="font-mono text-[#D4AF37] font-semibold">{email}</span>. You will receive private seasonal portfolios, festive banquet invitations, and wedding privileges.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[#091913] border border-[#C5A059]/40 text-[#DFCEB2] text-xs font-semibold tracking-wider uppercase hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
                >
                  Register Another Address
                </button>
              </div>
            ) : (
              /* Subscription Form */
              <div className="space-y-6 md:space-y-8">
                {/* Header */}
                <div className="text-center space-y-2 max-w-xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#091913] border border-[#C5A059]/40 text-[#D4AF37] text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold">
                    <Sparkles size={12} />
                    <span>The Virāsā Chronicle</span>
                  </div>
                  <h3 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-[#FBFAF6] uppercase mt-2">
                    Heritage News &amp; Seasonal Privileges
                  </h3>
                  <RoyalDivider className="my-2" />
                  <p className="text-xs md:text-sm text-[#DFCEB2]/85 leading-relaxed">
                    Be the first to receive private invitations to royal monsoon banquets, winter heritage soirees, exclusive suite tariffs, and destination wedding dossiers.
                  </p>
                </div>

                {/* Preference Pills */}
                <div className="space-y-2">
                  <span className="block text-center text-[10px] md:text-xs text-[#C5A059] uppercase tracking-widest font-semibold">
                    Select Your Area of Patronage
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {interests.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedInterest(item.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedInterest === item.id
                            ? 'btn-royal-gold shadow-sm font-bold'
                            : 'bg-[#091913] text-[#DFCEB2]/85 border border-[#C5A059]/30 hover:border-[#C5A059]/70'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-2">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#C5A059]">
                        <Mail size={16} />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (status === 'error') setStatus('idle');
                        }}
                        placeholder="Enter your private email address..."
                        className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#091913] border border-[#C5A059]/40 text-[#FBFAF6] placeholder:text-[#DFCEB2]/40 text-xs md:text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-royal-gold h-12 px-7 rounded-xl font-cinzel text-xs md:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shrink-0 disabled:opacity-70"
                    >
                      {status === 'loading' ? (
                        <span>Enrolling...</span>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight size={14} className="text-[#0E241B]" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Error Notification */}
                  {status === 'error' && (
                    <p className="text-amber-300 text-[11px] text-center font-medium animate-in fade-in">
                      {errorMessage}
                    </p>
                  )}

                  {/* Privacy Charter Assurance */}
                  <div className="flex items-center justify-center gap-1.5 text-[10px] md:text-[11px] text-[#DFCEB2]/60 pt-1">
                    <ShieldCheck size={12} className="text-[#D4AF37]" />
                    <span>Noble discretion assured. No unsolicited correspondence or third-party sharing.</span>
                  </div>
                </form>

              </div>
            )}

          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
};
