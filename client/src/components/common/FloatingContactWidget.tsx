import React, { useState } from 'react';
import { PhoneCall, MessageCircle, X } from 'lucide-react';
import { useEnquiryModal } from '../../context/EnquiryModalContext';

export const FloatingContactWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openEnquiryModal } = useEnquiryModal();

  const whatsappUrl = `https://wa.me/919655364707?text=${encodeURIComponent(
    'Hello GV DESIGN TECH, I would like to enquire about technical courses in Oddanchatram.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Expanded Quick Contact Options */}
      {isOpen && (
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-3.5 space-y-2.5 w-60 animate-fadeIn text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">
              Quick Admissions Help
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="block text-xs">WhatsApp Us</span>
              <span className="text-[10px] text-emerald-600 font-normal">Immediate Chat</span>
            </div>
          </a>

          <a
            href="tel:+919655364707"
            className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-slate-950 text-white flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-3.5 h-3.5 text-accent-orange" />
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
            className="w-full py-2 px-3 rounded bg-slate-950 hover:bg-slate-800 text-white font-bold text-[11px] uppercase tracking-wider text-center transition-colors"
          >
            Online Enquiry Form
          </button>
        </div>
      )}

      {/* Floating Action Trigger Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white shadow-lg border border-slate-800 transition-all group"
        aria-label="Contact GV DESIGN TECH"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {isOpen ? 'Close' : 'Chat / Call'}
        </span>
        <MessageCircle className="w-4 h-4 text-accent-orange group-hover:scale-110 transition-transform" />
      </button>
    </div>
  );
};

