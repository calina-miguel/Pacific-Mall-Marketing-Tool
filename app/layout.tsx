'use client';
import './globals.css';
import Link from 'next/link';
import { startTour } from '@/lib/useTour';

import CyberFooter from './components/CyberFooter';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-[#020202] text-white">
        <nav className="w-20 lg:w-72 border-r border-white/10 p-6 flex flex-col z-40 bg-[#050505]/50 backdrop-blur-3xl">
          <div className="flex items-center gap-3 mb-12">
            <img src="https://graph.facebook.com/PMMandaueofficial/picture?type=large" alt="Logo" className="w-10 h-10 rounded-xl" />
            <span className="hidden lg:block font-bold tracking-tight text-lg">PMM CORE</span>
          </div>
          <ul className="space-y-6 flex-grow">
            <li id="content-studio"><Link href="/dashboard" className="flex items-center gap-4 text-gray-400 hover:text-pm-accent transition"><span className="text-xl">✨</span><span className="hidden lg:block">Content Studio</span></Link></li>
            <li id="engagement-hub"><Link href="/dashboard/engagement" className="flex items-center gap-4 text-gray-400 hover:text-pm-accent transition"><span className="text-xl">💬</span><span className="hidden lg:block">Engagement</span></Link></li>
            <li id="lead-crm"><Link href="/dashboard/leads" className="flex items-center gap-4 text-gray-400 hover:text-pm-accent transition"><span className="text-xl">📊</span><span className="hidden lg:block">Lead CRM</span></Link></li>
            <li><Link href="/dashboard/calendar" className="flex items-center gap-4 text-gray-400 hover:text-pm-accent transition"><span className="text-xl">📅</span><span className="hidden lg:block">Calendar</span></Link></li>
          </ul>
          <button onClick={startTour} className="bg-white/5 border border-white/10 rounded-2xl py-3 text-xs uppercase tracking-widest hover:bg-pm-accent hover:text-black transition">Tour</button>
        </nav>
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pm-blue/10 via-black to-black">{children}</main>
      </body>
    </html>
  );
}
