import React, { useState } from 'react';
import { X, Code, CheckCircle, Database, Server, Smartphone, ExternalLink, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HOTEL_CONFIG } from '../data/hotelData';

interface IntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationGuideModal: React.FC<IntegrationGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'placeholders' | 'booking-engine' | 'wedding-crm'>('placeholders');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          {/* Backdrop with Fade */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container with Scale and Slide Transition */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[440px] bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#C5A059]/40 max-h-[90vh] flex flex-col z-10 text-[#1D2320] overflow-hidden"
          >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#091913] via-[#0E241B] to-[#091913] text-[#FAF8F5] border-b border-[#C5A059]/30">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-[#D4AF37]" />
            <div>
              <h3 className="font-cinzel text-xs font-bold gold-foil-text">Property Setup &amp; Integrations</h3>
              <span className="block text-[10px] text-[#DFCEB2]">VIRĀSĀ Hotel Engineering Guide</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#DFCEB2] hover:text-[#D4AF37]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 bg-[#F3F0E8] text-xs">
          <button
            onClick={() => setActiveTab('placeholders')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors ${
              activeTab === 'placeholders'
                ? 'border-b-2 border-[#17352B] bg-[#FBFAF6] text-[#17352B]'
                : 'text-gray-600 hover:text-[#17352B]'
            }`}
          >
            Placeholders
          </button>
          <button
            onClick={() => setActiveTab('booking-engine')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors ${
              activeTab === 'booking-engine'
                ? 'border-b-2 border-[#17352B] bg-[#FBFAF6] text-[#17352B]'
                : 'text-gray-600 hover:text-[#17352B]'
            }`}
          >
            Booking Engine
          </button>
          <button
            onClick={() => setActiveTab('wedding-crm')}
            className={`flex-1 py-2.5 font-semibold text-center transition-colors ${
              activeTab === 'wedding-crm'
                ? 'border-b-2 border-[#17352B] bg-[#FBFAF6] text-[#17352B]'
                : 'text-gray-600 hover:text-[#17352B]'
            }`}
          >
            Wedding CRM
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          
          {activeTab === 'placeholders' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px]">
                <strong className="block mb-1">Section 13 Strict Accuracy Compliance:</strong>
                All unverified details (phone, exact address, room rates, guest capacities) are centralized in <code className="bg-amber-100 px-1 rounded font-mono">src/data/hotelData.ts</code> so hoteliers can populate genuine verified details without modifying UI logic.
              </div>

              <div className="space-y-2">
                <span className="font-cinzel text-xs font-bold text-[#17352B] block">Current Configured Placeholders:</span>
                
                <div className="p-2.5 bg-white rounded-lg border border-gray-200 space-y-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="text-[#17352B] font-semibold">{HOTEL_CONFIG.phonePlaceholder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="text-[#17352B] font-semibold">{HOTEL_CONFIG.emailPlaceholder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">WhatsApp:</span>
                    <span className="text-[#17352B] font-semibold">{HOTEL_CONFIG.whatsappPlaceholder}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-[#20251F]/80 space-y-1.5">
                  <p><strong>To supply verified hotel credentials:</strong></p>
                  <ol className="list-decimal pl-4 space-y-1">
                    <li>Edit <code className="bg-gray-100 px-1 rounded font-mono">src/data/hotelData.ts</code>.</li>
                    <li>Update the <code className="bg-gray-100 px-1 rounded font-mono">HOTEL_CONFIG</code> object with the genuine phone, email, and Google Maps embed URL.</li>
                    <li>Customize <code className="bg-gray-100 px-1 rounded font-mono">capacityNote</code> in <code className="bg-gray-100 px-1 rounded font-mono">WEDDING_VENUES</code> once architectural fire-safety occupancy limits are supplied.</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'booking-engine' && (
            <div className="space-y-3">
              <p className="text-xs text-[#20251F]/80">
                VIRĀSĀ Palace is architected to hook into industry-standard hospitality reservation engines:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-[#17352B] flex items-center gap-1.5">
                    <Server size={14} className="text-[#B99560]" />
                    <span>Sabre SynXis / TravelClick (iHotelier)</span>
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Pass <code className="bg-gray-100 px-1 rounded font-mono">checkIn</code>, <code className="bg-gray-100 px-1 rounded font-mono">checkOut</code>, and <code className="bg-gray-100 px-1 rounded font-mono">adults</code> parameters directly to your property URL booking redirect.
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-[#17352B] flex items-center gap-1.5">
                    <Database size={14} className="text-[#B99560]" />
                    <span>Oracle Hospitality OPERA Cloud API</span>
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Connect real-time room availability, rate codes, and guest folio generation via REST endpoints.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gray-100 rounded-xl text-[10px] font-mono text-gray-700 overflow-x-auto">
                <p className="font-bold text-[#17352B] mb-1">// Example Booking Engine Redirect URL:</p>
                <code>https://be.synxis.com/?hotel=VIRASA_PROPERTY_ID&amp;arrive=2026-11-20&amp;depart=2026-11-23&amp;adult=2</code>
              </div>
            </div>
          )}

          {activeTab === 'wedding-crm' && (
            <div className="space-y-3">
              <p className="text-xs text-[#20251F]/80">
                Wedding dossiers collected via the luxury enquiry modal can be dispatched immediately to your sales CRM:
              </p>

              <div className="space-y-2">
                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-[#17352B] flex items-center gap-1.5">
                    <Sparkles size={14} className="text-[#B99560]" />
                    <span>Salesforce / HubSpot Wedding Pipeline</span>
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Auto-creates an Inbound Lead with custom properties: <code className="bg-gray-100 px-1 rounded font-mono">wedding_ceremonies_selected</code>, <code className="bg-gray-100 px-1 rounded font-mono">guest_count_bracket</code>, and <code className="bg-gray-100 px-1 rounded font-mono">preferred_celebration_date</code>.
                  </p>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <h4 className="font-semibold text-[#17352B] flex items-center gap-1.5">
                    <Smartphone size={14} className="text-[#B99560]" />
                    <span>WhatsApp Business Cloud API</span>
                  </h4>
                  <p className="text-[11px] text-gray-600 mt-1">
                    Instant automated royal greeting dispatch to the couple's phone number with PDF bridal lookbook.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-gray-100 rounded-xl text-[10px] font-mono text-gray-700">
                <p className="font-bold text-[#17352B] mb-1">// Webhook Payload Schema:</p>
                <pre className="whitespace-pre-wrap">{`{
  "dossierId": "VP-WED-84291",
  "clientName": "...",
  "preferredDate": "2027-02-14",
  "guestRange": "100-250",
  "celebrationDays": 3,
  "venues": ["Floating Mandap", "Darbar Lawn"]
}`}</pre>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-[#F7F4EC] border-t border-[#C5A059]/20 text-center">
          <button
            onClick={onClose}
            className="btn-royal-gold w-full h-10"
          >
            Close Engineering Dossier
          </button>
        </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
