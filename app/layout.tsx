'use client';

import './globals.css';
import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MessageSquare, Users, Calendar, Compass } from 'lucide-react';
import { startTour } from '@/lib/useTour';
import FirstTimeTourModal from '@/app/components/FirstTimeTourModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Embedded authorship & ownership watermark
        Object.defineProperty(window, '__AUTHOR__', {
          value: 'Miguel Calina',
          writable: false,
          configurable: false,
        });
        Object.defineProperty(window, '__SIGNATURE__', {
          value: 'calina-miguel-pm-2026-auth',
          writable: false,
          configurable: false,
        });
      } catch {
        // Ignore if already defined
      }
    }
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Content Studio', shortLabel: 'Studio', icon: Sparkles, id: 'content-studio', tour: 'studio' },
    { href: '/dashboard/engagement', label: 'Engagement Hub', shortLabel: 'Engagement', icon: MessageSquare, id: 'engagement-hub', tour: 'engagement' },
    { href: '/dashboard/leads', label: 'Lead CRM', shortLabel: 'Leads', icon: Users, id: 'lead-crm', tour: 'crm' },
    { href: '/dashboard/calendar', label: 'Calendar', shortLabel: 'Calendar', icon: Calendar, id: 'calendar', tour: 'calendar' },
  ];

  return (
    <html lang="en">
      <head>
        <meta name="author" content="Miguel Calina" />
        <meta name="copyright" content="Copyright (c) 2026 Miguel Calina. All Rights Reserved." />
        <meta name="creator" content="Miguel Calina" />
        <meta name="publisher" content="Miguel Calina" />
        <meta name="signature" content="calina-miguel-auth-2026" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
      </head>
      <body className="flex flex-col lg:flex-row h-screen bg-[#f7f6fa] text-[#1a1429] antialiased selection:bg-[#321c65] selection:text-white font-sans overflow-hidden">
        {/* Invisible DOM Authorship Watermark: Miguel Calina */}
        <div hidden aria-hidden="true" data-author="Miguel Calina" data-signature="calina-miguel-pm-2026" className="sr-only" />

        {/* First time user guided tour pop-up */}
        <FirstTimeTourModal />

        {/* ============================================================ */}
        {/* MOBILE TOP BAR (visible on < lg screens)                     */}
        {/* ============================================================ */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#321c65]/10 px-4 py-2.5 flex items-center justify-between shadow-[0_2px_12px_rgba(50,28,101,0.03)] shrink-0">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <img 
              src="https://graph.facebook.com/PMMandaueofficial/picture?type=large" 
              alt="Pacific Mall Logo" 
              className="w-8 h-8 rounded-xl object-cover border border-[#321c65]/15 shadow-sm shrink-0" 
            />
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight text-[#1a1429] leading-tight">
                Pacific{' '}<span className="text-[#321c65]">Mall</span>
              </span>
              <span className="text-[9px] text-[#b60090] font-bold uppercase tracking-wider">
                Marketing System
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={startTour}
              className="flex items-center gap-1.5 bg-[#f7f6fa] hover:bg-purple-50 border border-[#321c65]/15 hover:border-[#b60090]/40 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-[#321c65] hover:text-[#b60090] transition shadow-xs"
              aria-label="Start Guided Tour"
            >
              <Compass className="w-3.5 h-3.5 text-[#b60090]" />
              <span>Tour</span>
            </button>
            <div className="flex items-center pl-1">
              <span className="w-2 h-2 rounded-full bg-[#26aa00] animate-pulse" title="System Live" />
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/* DESKTOP SIDEBAR (visible on >= lg screens)                   */}
        {/* ============================================================ */}
        <aside className="hidden lg:flex w-72 bg-white border-r border-[#321c65]/10 p-5 flex-col justify-between z-40 shadow-[4px_0_24px_rgba(50,28,101,0.02)] shrink-0">
          <div>
            {/* Top Brand Pill Header with Original Pacific Mall Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 mb-8 p-1">
              <img 
                src="https://graph.facebook.com/PMMandaueofficial/picture?type=large" 
                alt="Pacific Mall Logo" 
                className="w-11 h-11 rounded-2xl object-cover shadow-[0_4px_14px_rgba(50,28,101,0.25)] border border-[#321c65]/15 shrink-0" 
              />
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight text-[#1a1429] leading-tight">
                  Pacific{' '}<span className="text-[#321c65]">Mall</span>
                </span>
                <span className="text-[10px] text-[#b60090] font-bold uppercase tracking-wider">
                  Marketing System
                </span>
              </div>
            </Link>

            {/* Navigation links styled in AdScale pill aesthetics */}
            <nav className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    id={item.id}
                    data-tour={item.tour}
                    href={item.href}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#321c65] text-white shadow-[0_4px_14px_rgba(50,28,101,0.3)]'
                        : 'text-gray-600 hover:text-[#321c65] hover:bg-[#f7f6fa]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#321c65]/70'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Tool section & Guided Tour button */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <button
              onClick={startTour}
              className="w-full flex items-center justify-center gap-2 bg-[#f7f6fa] border border-[#321c65]/15 hover:border-[#b60090]/50 rounded-2xl py-2.5 text-xs font-semibold text-[#321c65] hover:text-[#b60090] transition shadow-sm group"
            >
              <Compass className="w-3.5 h-3.5 text-[#b60090] group-hover:rotate-45 transition-transform" />
              <span>Guided Tour</span>
            </button>
            <div className="flex items-center justify-between px-2 text-[11px] text-gray-400 font-medium">
              <span>Pacific Mall Mandaue</span>
              <span className="w-2 h-2 rounded-full bg-[#26aa00] animate-pulse" />
            </div>
          </div>
        </aside>

        {/* ============================================================ */}
        {/* MAIN CONTENT AREA                                            */}
        {/* ============================================================ */}
        <main className="flex-1 overflow-y-auto bg-[#f7f6fa] relative pb-24 lg:pb-0">
          {children}
        </main>

        {/* ============================================================ */}
        {/* MOBILE BOTTOM NAVIGATION BAR (visible on < lg screens)       */}
        {/* ============================================================ */}
        <nav 
          aria-label="Mobile Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#321c65]/10 px-2 py-1.5 flex items-center justify-around shadow-[0_-4px_20px_rgba(50,28,101,0.06)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                data-tour={item.tour}
                href={item.href}
                className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-w-[64px] ${
                  isActive
                    ? 'bg-[#321c65] text-white shadow-sm'
                    : 'text-gray-500 hover:text-[#321c65]'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-white' : 'text-[#321c65]/70'}`} />
                <span className="text-[10px] font-semibold leading-none">{item.shortLabel}</span>
              </Link>
            );
          })}
        </nav>
      </body>
    </html>
  );
}
