import React, { useState } from 'react';
import { PhoneCall, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openEnquiryModal } = useEnquiryModal();

  const whatsappUrl = `https://wa.me/919655364707?text=${encodeURIComponent(
    'Hello GV DESIGN TECH, I would like to enquire about technical courses in Oddanchatram.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Contact Options with 21st.dev Popover Physics */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-xl shadow-elevated border border-slate-200 p-3.5 space-y-2.5 w-60 text-xs backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                Quick Admissions Help
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition-all group/wa"
            >
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 group-hover/wa:scale-110 transition-transform">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block text-xs">WhatsApp Us</span>
                <span className="text-[10px] text-emerald-600 font-normal">Immediate Chat</span>
              </div>
            </a>

            <a
              href="tel:+919655364707"
              className="btn-tactile flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold transition-all group/call"
            >
              <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center flex-shrink-0 group-hover/call:scale-110 transition-transform">
                <PhoneCall className="w-3.5 h-3.5 text-accent-red" />
              </div>
              <div>
                <span className="block text-xs">+91 96553 64707</span>
                <span className="text-[10px] text-slate-500 font-normal">Direct Call (9 AM - 9 PM)</span>
              </div>
            </a>

            <button
              onClick={() => {
                setIsOpen(false);
                openEnquiryModal();
              }}
              className="btn-shimmer btn-tactile w-full py-2 px-3 rounded bg-slate-950 hover:bg-[#DC2626] text-white font-bold text-[11px] uppercase tracking-wider text-center transition-all shadow-xs"
            >
              Online Enquiry Form
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Pill with Uiverse.io Tactile Lift */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`btn-tactile flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-850 text-white shadow-elevated border border-slate-800 transition-all group ${
          !isOpen ? 'animate-float' : ''
        }`}
        aria-label="Contact GV DESIGN TECH"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {isOpen ? 'Close' : 'Chat / Call'}
        </span>
        <MessageCircle className="w-4 h-4 text-accent-red group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

