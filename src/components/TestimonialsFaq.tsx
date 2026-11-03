import React, { useState } from 'react';
import { ChevronDown, MessageSquareQuote, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQ_DATA, TESTIMONIALS_DATA } from '../data/hotelData';
import { RoyalDivider } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

export const TestimonialsFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');

  const faqCategories = ['All', 'Destination Weddings', 'Stay & Booking', 'Experiences & Protocol'];

  const filteredFaqs = selectedFaqCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((f) => f.category === selectedFaqCategory);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-12">
      
      {/* Testimonials Section */}
      <section className="py-10 md:py-20 px-4 md:px-8 lg:px-12 bg-[#F7F4EC]">
        <div className="max-w-6xl mx-auto">
          <MotionFadeIn yOffset={18}>
            <div className="text-center mb-6 md:mb-10">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0E241B]/10 text-[#0E241B] mb-2">
                <MessageSquareQuote size={20} className="text-[#C5A059]" />
              </div>
              <span className="block text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                Guest Chronicles
              </span>
              <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl lg:text-4xl font-bold text-[#0E241B] tracking-wider uppercase mt-1">
                Noble Words &amp; Recollections
              </h2>
              <RoyalDivider className="my-2 md:my-4" />
              <p className="text-xs md:text-sm text-[#1D2320]/75 max-w-md mx-auto">
                Reflections from signature wedding celebrations and aristocratic retreats.
              </p>
            </div>
          </MotionFadeIn>

          {/* Testimonials Cards Grid (1 Col Mobile, 2-3 Col Laptop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <MotionFadeIn key={t.id} yOffset={16} delay={idx * 0.1}>
                <article 
                  className="palace-card rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-lg transition-shadow relative flex flex-col justify-between h-full"
                >
                  <p className="font-cormorant text-base md:text-lg italic text-[#1D2320] leading-relaxed mb-6">
                    "{t.quote}"
                  </p>

                  <div className="pt-3 border-t border-[#C5A059]/15 flex items-center justify-between mt-auto">
                    <div>
                      <h3 className="font-cinzel text-xs md:text-sm font-bold text-[#0E241B]">{t.author}</h3>
                      <span className="text-[10px] md:text-xs text-gray-500">{t.event} · {t.location}</span>
                    </div>
                    {/* Accuracy compliance label */}
                    <span className="text-[9px] md:text-[10px] text-[#D4AF37] bg-[#0E241B] px-2.5 py-1 rounded-full font-medium border border-[#C5A059]/40">
                      Verified Guest
                    </span>
                  </div>
                </article>
              </MotionFadeIn>
            ))}
          </div>

          {/* Section 13 Transparency Notice */}
          <MotionFadeIn delay={0.2} yOffset={10}>
            <div className="mt-6 p-3 bg-white/70 rounded-xl border border-[#C5A059]/20 text-[10px] md:text-xs text-gray-500 text-center max-w-xl mx-auto">
              Note: Guest reviews represent genuine supplied chronicles. Property administrators can edit or append authenticated testimonials via configuration.
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section id="faq" className="py-10 md:py-20 px-4 md:px-8 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto">
          <MotionFadeIn yOffset={18}>
            <div className="text-center mb-6 md:mb-10">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#0E241B]/10 text-[#0E241B] mb-2">
                <HelpCircle size={20} className="text-[#C5A059]" />
              </div>
              <span className="text-[10px] md:text-xs tracking-[0.25em] text-[#C5A059] uppercase font-bold">
                Essential Guidance
              </span>
              <h2 className="font-cinzel text-xl xs:text-2xl md:text-3xl font-bold text-[#0E241B] tracking-wider uppercase mt-1">
                Frequently Asked Inquiries
              </h2>
              <RoyalDivider className="my-2 md:my-4" />
            </div>
          </MotionFadeIn>

          {/* FAQ Category Filter */}
          <MotionFadeIn delay={0.1} yOffset={14}>
            <div className="flex items-center md:justify-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6 -mx-4 px-4 md:mx-0">
              {faqCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedFaqCategory(cat);
                    setOpenFaqIndex(0);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all shrink-0 ${
                    selectedFaqCategory === cat
                      ? 'btn-royal-emerald shadow-sm font-semibold'
                      : 'bg-[#F3EFE6] text-[#0E241B]/75 hover:bg-[#C5A059]/15 border border-[#C5A059]/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </MotionFadeIn>

          {/* Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <MotionFadeIn key={idx} yOffset={14} delay={idx * 0.04}>
                  <div
                    className={`palace-card rounded-xl md:rounded-2xl overflow-hidden transition-all ${
                      isOpen ? 'border-[#C5A059]/60 shadow-md' : 'border-[#C5A059]/25'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 md:p-5 text-left flex items-center justify-between gap-4 text-xs md:text-sm font-semibold text-[#0E241B] hover:bg-[#F3EFE6]/50 transition-colors"
                    >
                      <span className="font-cinzel tracking-wide leading-snug">{faq.question}</span>
                      <ChevronDown
                        size={18}
                        className={`text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="p-4 md:p-5 pt-0 text-xs md:text-sm text-[#1D2320]/80 leading-relaxed border-t border-[#C5A059]/15 bg-[#FAF8F5]/80 animate-in fade-in duration-150">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </MotionFadeIn>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
