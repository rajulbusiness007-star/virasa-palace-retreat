import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Phone, Clock, 
  Check, User, BellRing, Compass, Utensils, Coffee, ShieldCheck, RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoyalCrest, RoyalDivider } from './RoyalMotif';
import { HOTEL_CONFIG } from '../data/hotelData';

interface ChatMessage {
  id: string;
  sender: 'concierge' | 'guest';
  text: string;
  timestamp: string;
  isServiceRequest?: boolean;
  requestRef?: string;
  actionType?: 'wedding' | 'booking';
}

interface DigitalConciergeModalProps {
  onOpenBooking?: () => void;
  onOpenWeddingEnquiry?: () => void;
}

export const DigitalConciergeModal: React.FC<DigitalConciergeModalProps> = ({
  onOpenBooking,
  onOpenWeddingEnquiry
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialWelcomeMessage: ChatMessage = {
    id: 'msg-welcome',
    sender: 'concierge',
    text: 'Khammaghani & welcome to VIRĀSĀ PALACE. I am Padmanabh, your Chief Heritage Concierge. How may the royal household assist your stay today?',
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialWelcomeMessage]);

  const quickPrompts = [
    { label: '🏛️ Palace History Tour', query: 'Can you tell me about the palace history and architecture tour?' },
    { label: '🍽️ Royal Dining Hours', query: 'What are the dining hours and can I book the Royal Thali banquet?' },
    { label: '🪷 Jharokha Spa Menu', query: 'What Ayurvedic therapies and wellness sessions are available?' },
    { label: '🛎️ Request Room Butler', query: 'I would like to request in-suite tea and turndown service.' },
    { label: '💍 Destination Wedding', query: 'Can I enquire about hosting a destination wedding at Virāsā Palace?' },
    { label: '🚗 Vintage Fleet & Transfers', query: 'How can I arrange airport transfers with the vintage fleet?' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setTimeout(scrollToBottom, 200);
    }
  }, [isOpen, messages, isTyping]);

  const handleResetConversation = () => {
    setMessages([initialWelcomeMessage]);
    setInputText('');
    setIsTyping(false);
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const guestMsg: ChatMessage = {
      id: `guest-${Date.now()}`,
      sender: 'guest',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, guestMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Knowledge-based concierge response engine
    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseText = '';
      let isService = false;
      let refId = '';
      let action: 'wedding' | 'booking' | undefined = undefined;

      if (lower.includes('history') || lower.includes('tour') || lower.includes('palace') || lower.includes('architecture')) {
        responseText = 'VIRĀSĀ Palace dates to 1742 AD, built from carved golden Dholpur sandstone. We host private curatorial tours daily at 10:30 AM and 5:00 PM exploring the ancestral armoury, zenana jharokhas, and stepwell.';
      } else if (lower.includes('dining') || lower.includes('thali') || lower.includes('food') || lower.includes('restaurant') || lower.includes('breakfast') || lower.includes('menu')) {
        responseText = 'The Royal Khansama serves breakfast from 7:00 AM – 10:30 AM, high tea at 4:30 PM on the lake terrace, and Imperial Rajputana Thali dinner with Sufi musicians from 7:30 PM – 11:00 PM. Silver service dining can also be set in your suite.';
      } else if (lower.includes('spa') || lower.includes('massage') || lower.includes('wellness') || lower.includes('ayurveda')) {
        responseText = 'The Jharokha Ayurvedic Spa features authentic 90-minute Abhyanga oil therapies, Shirodhara meditation baths, and sunset yoga over the lake ramparts. Appointments run daily from 8:00 AM to 9:00 PM.';
      } else if (lower.includes('butler') || lower.includes('service') || lower.includes('turndown') || lower.includes('tea') || lower.includes('room service') || lower.includes('pillow') || lower.includes('towel')) {
        isService = true;
        refId = `ROYAL-SRV-${Math.floor(1000 + Math.random() * 9000)}`;
        responseText = `Certainly! Your request has been logged under dispatch reference #${refId}. A senior palace butler and footman are en route to attend to your chambers within 10–15 minutes.`;
      } else if (lower.includes('wedding') || lower.includes('mandap') || lower.includes('bride') || lower.includes('groom') || lower.includes('marriage') || lower.includes('sangeet')) {
        responseText = 'Our royal wedding director curates exclusive ceremonies across the Floating Vedic Mandap, Zenana Gardens, and Darbar Hall. We maintain a strict charter of hosting only 1 wedding at a time for absolute privacy.';
        action = 'wedding';
      } else if (lower.includes('book') || lower.includes('room') || lower.includes('suite') || lower.includes('stay') || lower.includes('price') || lower.includes('rate') || lower.includes('availability')) {
        responseText = 'VIRĀSĀ Palace offers 44 heritage suites including the Maharani Presidential Jharokha, Rawal Royal Suite, and Heritage Lake Chambers. You can check availability or enquire directly with our reservation team.';
        action = 'booking';
      } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('call') || lower.includes('email') || lower.includes('number') || lower.includes('whatsapp')) {
        responseText = `You can reach our Palace Concierge directly at ${HOTEL_CONFIG.phonePlaceholder} (call/WhatsApp) or via email at ${HOTEL_CONFIG.emailPlaceholder}. Our Royal Desk is at your service 24/7.`;
      } else if (lower.includes('car') || lower.includes('transfer') || lower.includes('airport') || lower.includes('vintage') || lower.includes('driver')) {
        responseText = 'Our chauffeured vintage fleet (1938 Rolls-Royce & classic limousines) and modern luxury Mercedes-Maybachs provide bespoke transfers to Udaipur and Jaipur airports. The concierge desk is happy to confirm your schedule.';
      } else {
        responseText = `Thank you for sharing your wish with the Palace Desk. I have noted this directly for your personal butler and the chief duty manager. Is there any particular time you would like this attended to?`;
      }

      const conciergeMsg: ChatMessage = {
        id: `concierge-${Date.now()}`,
        sender: 'concierge',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isServiceRequest: isService,
        requestRef: refId,
        actionType: action
      };

      setMessages((prev) => [...prev, conciergeMsg]);
      setIsTyping(false);
    }, 850);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <div className="fixed z-40 bottom-20 md:bottom-8 right-4 md:right-8 transition-all duration-300">
        <motion.button
          type="button"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0E241B] to-[#143126] text-[#FBFAF6] border border-[#C5A059]/75 shadow-2xl hover:shadow-[#C5A059]/30 transition-all group"
          aria-label="Open Digital Concierge"
        >
          {/* Animated Gold Aura / Glow */}
          <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#DFCEB2] opacity-35 group-hover:opacity-85 blur-sm transition-opacity" />
          
          <div className="relative flex items-center gap-2">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#D4AF37]">
                <RoyalCrest size={18} />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-[#0E241B] animate-pulse" />
            </div>

            <div className="text-left hidden sm:block">
              <span className="block text-[9px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">
                24/7 Royal Desk
              </span>
              <span className="block font-cinzel text-xs font-semibold text-white">
                Digital Concierge
              </span>
            </div>

            {unreadCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0E241B] text-[10px] font-bold flex items-center justify-center shadow">
                {unreadCount}
              </span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Chat-Style Concierge Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-end p-0 sm:p-6 pointer-events-none">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto"
              aria-hidden="true"
            />

            {/* Chat Window Container */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full sm:w-[410px] h-[92vh] sm:h-[620px] bg-[#FAF8F5] rounded-t-3xl sm:rounded-2xl shadow-2xl border-t sm:border border-[#C5A059]/45 flex flex-col z-10 overflow-hidden pointer-events-auto"
            >
              
              {/* Header */}
              <div className="px-4 py-3.5 bg-[#0E241B] text-[#FBFAF6] border-b border-[#C5A059]/35 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#091913] border border-[#C5A059] flex items-center justify-center text-[#D4AF37]">
                      <RoyalCrest size={22} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#0E241B]" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xs md:text-sm font-bold text-white tracking-wide">
                      Palace Digital Concierge
                    </h3>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#DFCEB2]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Padmanabh · Chief Butler Desk</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetConversation}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B99560]/20 flex items-center justify-center text-[#DFCEB2] transition-colors"
                    title="Restart Conversation"
                    aria-label="Restart conversation"
                  >
                    <RotateCcw size={13} />
                  </button>
                  <a
                    href={`tel:${HOTEL_CONFIG.phonePlaceholder.replace(/[^0-9+]/g, '')}`}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#B99560] hover:text-[#17352B] flex items-center justify-center text-[#DFCEB2] transition-colors"
                    title="Direct Phone Line"
                  >
                    <Phone size={14} />
                  </a>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Close concierge chat"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Notice Banner */}
              <div className="bg-[#122820] px-3.5 py-1.5 border-b border-[#B99560]/20 flex items-center justify-between text-[10px] text-[#DFCEB2]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-[#B99560]" />
                  <span>Private Palace Guest Encryption</span>
                </div>
                <span className="text-[#B99560] font-mono">24/7 Live Desk</span>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#F7F5F0]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 shadow-sm leading-relaxed ${
                        msg.sender === 'guest'
                          ? 'bg-[#17352B] text-white rounded-tr-none'
                          : 'bg-white text-[#20251F] border border-[#B99560]/25 rounded-tl-none'
                      }`}
                    >
                      <p className="text-[12px]">{msg.text}</p>

                      {msg.isServiceRequest && msg.requestRef && (
                        <div className="mt-2.5 p-2 bg-[#F3F0E8] rounded-lg border border-[#B99560]/30 text-[11px] space-y-1">
                          <div className="flex items-center justify-between font-mono text-[#17352B] font-bold">
                            <span>Ticket Reference:</span>
                            <span className="text-[#B99560]">{msg.requestRef}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-emerald-700">
                            <Check size={12} />
                            <span>Dispatched to Floor Butler (Chamber Service)</span>
                          </div>
                        </div>
                      )}

                      {msg.actionType === 'wedding' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenWeddingEnquiry?.();
                          }}
                          className="mt-2.5 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#B99560] to-[#DFCEB2] text-[#17352B] font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <Sparkles size={13} />
                          <span>Open Royal Wedding Enquiry Desk</span>
                        </button>
                      )}

                      {msg.actionType === 'booking' && (
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenBooking?.();
                          }}
                          className="mt-2.5 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#B99560] to-[#DFCEB2] text-[#17352B] font-semibold text-[11px] flex items-center justify-center gap-1.5 shadow hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                        >
                          <span>Check Suite Availability &amp; Rates</span>
                        </button>
                      )}

                      <span
                        className={`block text-[9px] mt-1.5 text-right ${
                          msg.sender === 'guest' ? 'text-white/60' : 'text-gray-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Butler Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-gray-500 text-[11px] bg-white border border-[#B99560]/20 w-fit px-3 py-2 rounded-xl rounded-tl-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99560] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99560] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B99560] animate-bounce [animation-delay:0.4s]" />
                    <span className="italic text-[10px] text-gray-500">Concierge consulting palace records...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Inquiry Chips */}
              <div className="p-2.5 bg-white border-t border-[#B99560]/20 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendMessage(p.query)}
                    className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] bg-[#F3F0E8] text-[#17352B] hover:bg-[#B99560] hover:text-[#17352B] transition-colors border border-[#B99560]/20 font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-white border-t border-gray-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Ask about amenities, dining, or request service..."
                  className="flex-1 h-11 px-3.5 rounded-xl bg-[#F7F5F0] border border-[#B99560]/30 text-xs text-[#20251F] focus:outline-none focus:border-[#B99560]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="w-11 h-11 rounded-xl bg-[#17352B] text-[#FBFAF6] flex items-center justify-center hover:bg-[#1f4639] active:scale-95 transition-all disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send size={15} className="text-[#B99560]" />
                </button>
              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
