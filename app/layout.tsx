'use client';

import './globals.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, MessageSquare, Users, Calendar, Compass, ArrowUpRight } from 'lucide-react';
import { startTour } from '@/lib/useTour';

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
      <body className="flex h-screen bg-[#f7f7f7] text-[#1a1a1a] antialiased selection:bg-[#8554ff] selection:text-white font-sans overflow-hidden">
        {/* AdScale Sleek Left Sidebar */}
        <aside className="w-20 lg:w-72 bg-white border-r border-[#1a1a1a]/10 p-5 flex flex-col justify-between z-40 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
          <div>
            {/* Top Brand Pill Header */}
            <Link href="/dashboard" className="flex items-center gap-3 mb-8 p-1">
              <div className="w-10 h-10 rounded-2xl bg-[#8554ff] flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_14px_rgba(133,84,255,0.35)] shrink-0">
                P
              </div>
              <div className="hidden lg:flex flex-col">
                <span className="font-bold text-base tracking-tight text-[#1a1a1a] leading-tight">
                  Pacific<span className="text-[#8554ff]">Mall</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
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
                        ? 'bg-[#8554ff] text-white shadow-[0_4px_14px_rgba(133,84,255,0.3)]'
                        : 'text-gray-600 hover:text-[#1a1a1a] hover:bg-[#f7f7f7]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="hidden lg:block">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Tool section & tour */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <button
              onClick={startTour}
              className="w-full flex items-center justify-center gap-2 bg-[#f7f7f7] border border-gray-200/80 hover:border-[#8554ff]/40 rounded-2xl py-2.5 text-xs font-semibold text-gray-700 hover:text-[#8554ff] transition shadow-sm"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">System Tour</span>
            </button>
            <div className="hidden lg:flex items-center justify-between px-2 text-[11px] text-gray-400 font-medium">
              <span>Pacific Mall Mandaue</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#f7f7f7] relative">
          {children}
        </main>
      </body>
    </html>
  );
}
