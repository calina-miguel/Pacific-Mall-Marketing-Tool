'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MessageSquare, Users, Calendar, Compass } from 'lucide-react';
import { startTour } from '@/lib/useTour';
import FirstTimeTourModal from '@/app/components/FirstTimeTourModal';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Content Studio', icon: Sparkles, id: 'content-studio' },
    { href: '/dashboard/engagement', label: 'Engagement Hub', icon: MessageSquare, id: 'engagement-hub' },
    { href: '/dashboard/leads', label: 'Lead CRM', icon: Users, id: 'lead-crm' },
    { href: '/dashboard/calendar', label: 'Calendar', icon: Calendar, id: 'calendar' },
  ];

  return (
    <html lang="en">
      <body className="flex h-screen bg-[#f7f6fa] text-[#1a1429] antialiased selection:bg-[#321c65] selection:text-white font-sans overflow-hidden">
        {/* First time user guided tour pop-up */}
        <FirstTimeTourModal />

        {/* AdScale Sleek Left Sidebar styled with Pacific Mall Logo Palette */}
        <aside className="w-20 lg:w-72 bg-white border-r border-[#321c65]/10 p-5 flex flex-col justify-between z-40 shadow-[4px_0_24px_rgba(50,28,101,0.02)]">
          <div>
            {/* Top Brand Pill Header with Original Pacific Mall Logo */}
            <Link href="/dashboard" className="flex items-center gap-3 mb-8 p-1">
              <img 
                src="https://graph.facebook.com/PMMandaueofficial/picture?type=large" 
                alt="Pacific Mall Logo" 
                className="w-11 h-11 rounded-2xl object-cover shadow-[0_4px_14px_rgba(50,28,101,0.25)] border border-[#321c65]/15 shrink-0" 
              />
              <div className="hidden lg:flex flex-col">
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
                    href={item.href}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#321c65] text-white shadow-[0_4px_14px_rgba(50,28,101,0.3)]'
                        : 'text-gray-600 hover:text-[#321c65] hover:bg-[#f7f6fa]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[#321c65]/70'}`} />
                    <span className="hidden lg:block">{item.label}</span>
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
              <span className="hidden lg:inline">Guided Tour</span>
            </button>
            <div className="hidden lg:flex items-center justify-between px-2 text-[11px] text-gray-400 font-medium">
              <span>Pacific Mall Mandaue</span>
              <span className="w-2 h-2 rounded-full bg-[#26aa00] animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f7f6fa] relative">
          {children}
        </main>
      </body>
    </html>
  );
}
