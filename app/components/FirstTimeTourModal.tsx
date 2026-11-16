'use client';

import { useState, useEffect } from 'react';
import { Compass, Sparkles, X, ArrowRight, Volume2, ShieldCheck } from 'lucide-react';
import { startTour, preloadTourAudio } from '@/lib/useTour';

export default function FirstTimeTourModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Preload voiceover audio files as soon as page is loaded
    preloadTourAudio();

    // Check if user has already seen or dismissed the tour
    const hasSeen = localStorage.getItem('pm_guided_tour_seen');
    if (!hasSeen) {
      // Short delay for smooth entrance after page paints
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStartTour = () => {
    localStorage.setItem('pm_guided_tour_seen', 'true');
    setIsOpen(false);
    // Allow modal fade out then launch tour
    setTimeout(() => {
      startTour();
    }, 150);
  };

  const handleDismiss = () => {
    localStorage.setItem('pm_guided_tour_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-white rounded-3xl p-5 sm:p-8 shadow-[0_24px_70px_rgba(50,28,101,0.25)] border border-[#321c65]/15 animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Subtle decorative brand gradient glow in top right */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br from-[#b60090]/20 to-[#321c65]/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-[#f7f6fa] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Pacific Mall Logo and Brand Badge */}
        <div className="flex items-center gap-3.5 mb-5">
          <img
            src="https://graph.facebook.com/PMMandaueofficial/picture?type=large"
            alt="Pacific Mall Logo"
            className="w-12 h-12 rounded-2xl object-cover border border-[#321c65]/15 shadow-md shadow-[#321c65]/10 shrink-0"
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#321c65]/10 text-[#321c65] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#b60090]" />
              Interactive Walkthrough
            </div>
            <h2 className="text-xl font-bold text-[#1a1429] tracking-tight">
              Welcome to Pacific{' '}<span className="text-[#321c65]">Mall</span>
            </h2>
          </div>
        </div>

        {/* Body Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Take a fast, 30-second guided tour with professional audio walkthrough to explore your retail Content Studio, customer Engagement Hub, and Lead CRM.
        </p>

        {/* Feature Highlights List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-7">
          <div className="p-3 rounded-2xl bg-[#f7f6fa] border border-[#321c65]/10">
            <div className="w-7 h-7 rounded-lg bg-[#321c65]/10 flex items-center justify-center text-[#321c65] mb-2">
              <Sparkles className="w-4 h-4 text-[#321c65]" />
            </div>
            <div className="text-xs font-bold text-[#1a1429]">Content Studio</div>
            <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Campaigns & headlines</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f7f6fa] border border-[#321c65]/10">
            <div className="w-7 h-7 rounded-lg bg-[#b60090]/10 flex items-center justify-center text-[#b60090] mb-2">
              <Volume2 className="w-4 h-4 text-[#b60090]" />
            </div>
            <div className="text-xs font-bold text-[#1a1429]">Audio Guided</div>
            <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Natural voiceover guide</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#f7f6fa] border border-[#321c65]/10">
            <div className="w-7 h-7 rounded-lg bg-[#26aa00]/10 flex items-center justify-center text-[#26aa00] mb-2">
              <ShieldCheck className="w-4 h-4 text-[#26aa00]" />
            </div>
            <div className="text-xs font-bold text-[#1a1429]">Engagement</div>
            <div className="text-[11px] text-gray-500 leading-tight mt-0.5">Direct CRM & replies</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={handleStartTour}
            className="w-full sm:flex-1 ad-btn-purple text-sm py-3 px-5 flex items-center justify-center gap-2 group"
          >
            <Compass className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
            <span>Start Guided Tour</span>
            <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleDismiss}
            className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-[#f7f6fa] border border-gray-200 transition-colors"
          >
            Explore on My Own
          </button>
        </div>
      </div>
    </div>
  );
}
