import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, X, MessageSquare, Award, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalDivider, RoyalCrest } from './RoyalMotif';
import { MotionFadeIn } from './MotionFadeIn';

interface BlessingEntry {
  id: string;
  name: string;
  city: string;
  occasion: string;
  seal: 'peacock' | 'elephant' | 'lotus' | 'sun';
  message: string;
  date: string;
  imageUrl?: string;
  likes: number;
}

const SEALS = [
  { id: 'lotus', label: 'Golden Lotus', emblem: '🪷', meaning: 'Eternal Love & Purity' },
  { id: 'peacock', label: 'Royal Peacock', emblem: '🦚', meaning: 'Grace & Prosperity' },
  { id: 'elephant', label: 'Imperial Elephant', emblem: '🐘', meaning: 'Strength & Good Fortune' },
  { id: 'sun', label: 'Surya Vansh Sun', emblem: '☀️', meaning: 'Radiance & Joy' },
] as const;

const INITIAL_BLESSINGS: BlessingEntry[] = [
  {
    id: 'blessing-1',
    name: 'Ananya & Siddharth Singhania',
    city: 'Mumbai & London',
    occasion: 'Royal Wedding (November 2025)',
    seal: 'lotus',
    message: 'VIRĀSĀ gave us the wedding of our dreams. Exchanging vows on the Floating Lotus Mandap as the sun slipped beneath the Aravalis was pure poetry. Our guests are still raving about the Sheesh Mahal feast!',
    date: '3 weeks ago',
    imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80',
    likes: 42,
  },
  {
    id: 'blessing-2',
    name: 'Maharaja Digvijay & Radhika',
    city: 'Jaipur',
    occasion: 'Silver Jubilee Celebration',
    seal: 'peacock',
    message: 'The warmth and heritage authenticity here is unparalleled. Every corner of the courtyard resonates with dignity, bespoke hospitality, and the royal grace of Rajputana.',
    date: '1 month ago',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    likes: 38,
  },
  {
    id: 'blessing-3',
    name: 'Devina & Rohan Kapoor',
    city: 'New Delhi & New York',
    occasion: 'Destination Wedding',
    seal: 'elephant',
    message: 'The Baraat with the vintage Rolls-Royce and the rose petal shower from the jharokha balconies was unforgettable. Thank you to the incredible butler team for making magic happen.',
    date: '2 months ago',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
    likes: 56,
  },
  {
    id: 'blessing-4',
    name: 'Alistair & Maya Sterling',
    city: 'Geneva',
    occasion: 'Honeymoon Retreat',
    seal: 'sun',
    message: 'The Shahi Baori pool at midnight with floating candles was heaven. The calm, the sitar melodies, and the royal treatment were unlike anywhere else in the world.',
    date: 'Last month',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    likes: 29,
  },
];

export const InteractiveGuestBook: React.FC = () => {
  const [blessings, setBlessings] = useState<BlessingEntry[]>(() => {
    try {
      const saved = localStorage.getItem('virasa_guest_book');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to initial
    }
    return INITIAL_BLESSINGS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    occasion: 'Destination Wedding Guest',
    seal: 'lotus' as BlessingEntry['seal'],
    message: '',
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});
  const [submittedBanner, setSubmittedBanner] = useState(false);
  const [reactionsState, setReactionsState] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('virasa_guest_reactions');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {};
  });
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('virasa_guest_reactions', JSON.stringify(reactionsState));
    } catch {}
  }, [reactionsState]);

  const handleAddReaction = (blessingId: string, reactionKey: string) => {
    const key = `${blessingId}_${reactionKey}`;
    if (userReactions[key]) return;
    setReactionsState(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));
    setUserReactions(prev => ({ ...prev, [key]: true }));
  };

  useEffect(() => {
    try {
      localStorage.setItem('virasa_guest_book', JSON.stringify(blessings));
    } catch {
      // ignore
    }
  }, [blessings]);

  const handleLike = (id: string) => {
    if (hasLiked[id]) return;
    setBlessings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
    setHasLiked((prev) => ({ ...prev, [id]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newEntry: BlessingEntry = {
      id: `blessing-${Date.now()}`,
      name: formData.name,
      city: formData.city || 'Honored Guest',
      occasion: formData.occasion,
      seal: formData.seal,
      message: formData.message,
      date: 'Just now',
      likes: 1,
    };

    setBlessings([newEntry, ...blessings]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      city: '',
      occasion: 'Destination Wedding Guest',
      seal: 'lotus',
      message: '',
    });
    setSubmittedBanner(true);
    setTimeout(() => setSubmittedBanner(false), 5000);
  };

  return (
    <section id="guest-book" className="py-14 md:py-24 px-4 md:px-8 bg-[#FBFAF6] text-[#20251F] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <MotionFadeIn yOffset={18}>
          <div className="text-center mb-8 md:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3EFE6] border border-[#C5A059]/40 text-[#17352B] text-[10px] md:text-xs tracking-[0.25em] uppercase font-bold mb-2.5">
              <Award size={13} className="text-[#C5A059]" />
              <span>Digital Souvenirs &amp; Royal Chronicle</span>
            </div>
            <h2 className="font-cinzel text-2xl xs:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase text-[#0E241B]">
              The Royal Guest Book &amp; Blessings
            </h2>
            <RoyalDivider className="my-3 md:my-4" />
            <p className="text-xs md:text-base text-[#20251F]/80 max-w-2xl mx-auto leading-relaxed">
              Memories etched in stone and hearts. Peruse heartfelt congratulations from celebrated royal weddings, or leave your own auspicious seal and digital blessing.
            </p>

            {/* CTA Button to Sign */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-royal-gold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2 shadow-lg"
              >
                <Sparkles size={14} className="text-[#0E241B]" />
                <span>Sign The Royal Guest Book</span>
              </button>
            </div>
          </div>
        </MotionFadeIn>

        {/* Success toast notification */}
        <AnimatePresence>
          {submittedBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-6 p-3 rounded-2xl bg-[#0E241B] text-[#F4E8D1] border border-[#C5A059] flex items-center gap-3 shadow-xl"
            >
              <CheckCircle size={18} className="text-[#D4AF37] shrink-0" />
              <span className="text-xs">Your royal blessing has been recorded into the Palace Chronicle!</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Masonry-Style Animated Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {blessings.map((blessing, idx) => {
            const sealInfo = SEALS.find((s) => s.id === blessing.seal) || SEALS[0];
            const liked = !!hasLiked[blessing.id];

            return (
              <motion.article
                key={blessing.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="palace-card rounded-2xl p-5 flex flex-col justify-between group hover:border-[#C5A059] transition-all"
              >
                <div>
                  {/* Top Header with Seal & Date */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#C5A059]/15">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#0E241B] text-base flex items-center justify-center border border-[#C5A059]/40 shadow-sm">
                        {sealInfo.emblem}
                      </span>
                      <div>
                        <span className="block text-[10px] font-bold text-[#0E241B] uppercase tracking-wider">
                          {sealInfo.label}
                        </span>
                        <span className="text-[9px] text-gray-500">{sealInfo.meaning}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400">{blessing.date}</span>
                  </div>

                  {/* Photo if present */}
                  {blessing.imageUrl && (
                    <div className="mt-3 aspect-[16/10] w-full rounded-xl overflow-hidden bg-gray-100">
                      <img
                        src={blessing.imageUrl}
                        alt="Celebration moment"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                      />
                    </div>
                  )}

                  {/* Message Quote */}
                  <p className="mt-3 text-xs text-[#20251F]/85 italic leading-relaxed font-cormorant text-base">
                    "{blessing.message}"
                  </p>
                </div>

                {/* Footer Signee Info & Lovable Reaction Pills */}
                <div className="mt-4 pt-3 border-t border-[#C5A059]/15">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-cinzel text-xs font-bold text-[#0E241B]">
                        {blessing.name}
                      </h4>
                      <span className="block text-[10px] text-gray-500">
                        {blessing.city} · {blessing.occasion}
                      </span>
                    </div>
                  </div>

                  {/* Adorable Reaction Pills */}
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {[
                      { key: 'love', emoji: '💖', label: 'Love' },
                      { key: 'regal', emoji: '👑', label: 'Regal' },
                      { key: 'magical', emoji: '✨', label: 'Magical' },
                      { key: 'serene', emoji: '🪷', label: 'Serene' }
                    ].map((rx) => {
                      const reactionKey = `${blessing.id}_${rx.key}`;
                      const count = (reactionsState[reactionKey] || 0) + (rx.key === 'love' ? blessing.likes : 0);
                      const isSelected = !!userReactions[reactionKey];

                      return (
                        <motion.button
                          key={rx.key}
                          whileTap={{ scale: 1.25 }}
                          whileHover={{ scale: 1.06 }}
                          onClick={() => handleAddReaction(blessing.id, rx.key)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${
                            isSelected
                              ? 'bg-[#C5A059]/25 text-[#0E241B] border border-[#C5A059] font-bold shadow-sm'
                              : 'bg-[#F3EFE6] text-[#20251F]/75 border border-[#C5A059]/20 hover:border-[#C5A059]/50'
                          }`}
                          title={`Send ${rx.label} reaction`}
                        >
                          <span className="text-xs">{rx.emoji}</span>
                          {count > 0 && <span className="text-[10px] font-semibold">{count}</span>}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>

      {/* Modal: Sign The Royal Guest Book */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md p-4 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0E241B] border border-[#C5A059]/60 rounded-3xl max-w-lg w-full p-6 text-[#FBFAF6] shadow-2xl relative my-8"
            >
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-[#C5A059] hover:text-[#0E241B] transition-colors"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-5">
                <span className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-bold">
                  The Royal Guest Book
                </span>
                <h3 className="font-cinzel text-xl font-bold uppercase text-white mt-1">
                  Bestow Your Sovereign Blessing
                </h3>
                <RoyalDivider className="my-2.5" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Choose Royal Seal */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#DFCEB2] uppercase tracking-wider mb-1.5">
                    Select Your Auspicious Wax Seal
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SEALS.map((s) => (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => setFormData({ ...formData, seal: s.id })}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                          formData.seal === s.id
                            ? 'bg-[#C5A059]/20 border-[#D4AF37] text-white shadow-sm'
                            : 'bg-[#143126] border-[#C5A059]/20 text-gray-300 hover:border-[#C5A059]/50'
                        }`}
                      >
                        <span className="text-xl">{s.emblem}</span>
                        <div>
                          <span className="block text-xs font-semibold text-[#DFCEB2]">{s.label}</span>
                          <span className="block text-[9px] text-gray-400">{s.meaning}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Lovable Animated Wax Stamp Preview */}
                  <div className="mt-2.5 p-3 rounded-2xl bg-[#091913]/70 border border-[#C5A059]/35 flex items-center gap-3">
                    <div 
                      key={formData.seal} 
                      className="w-11 h-11 rounded-full wax-seal-badge animate-wax-press flex items-center justify-center text-xl shrink-0 cursor-pointer shadow-lg"
                      title="Imperial Wax Seal Stamp"
                    >
                      {SEALS.find(s => s.id === formData.seal)?.emblem || '🪷'}
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                        Royal Wax Seal: {SEALS.find(s => s.id === formData.seal)?.label}
                      </span>
                      <span className="text-[11px] text-[#DFCEB2] font-cormorant italic">
                        "{SEALS.find(s => s.id === formData.seal)?.meaning}"
                      </span>
                    </div>
                  </div>
                </div>

                {/* Name & City */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#DFCEB2] uppercase tracking-wider mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika & Vikram"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#143126] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#DFCEB2] uppercase tracking-wider mb-1">
                      City or Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. London & Jaipur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#143126] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#DFCEB2] uppercase tracking-wider mb-1">
                    Occasion / Affiliation
                  </label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full bg-[#143126] border border-[#C5A059]/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Destination Wedding Couple">Destination Wedding Couple</option>
                    <option value="Destination Wedding Guest">Destination Wedding Guest</option>
                    <option value="Honeymooners">Honeymooners</option>
                    <option value="Heritage Vacation Patron">Heritage Vacation Patron</option>
                    <option value="Family Milestone Celebration">Family Milestone Celebration</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#DFCEB2] uppercase tracking-wider mb-1">
                    Your Congratulatory Note or Blessing *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Write a message of love, celebration, or memories of Virāsā Palace..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#143126] border border-[#C5A059]/30 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-royal-gold w-full h-11 rounded-xl text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                  >
                    <Send size={14} className="text-[#0E241B]" />
                    <span>Bestow Royal Blessing</span>
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};