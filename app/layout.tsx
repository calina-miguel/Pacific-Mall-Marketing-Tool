'use client';
import './globals.css';
import Link from 'next/link';
import { startTour } from '@/lib/useTour';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-pm-bg text-pm-dark">
        <nav className="w-64 bg-pm-blue text-white p-6 flex flex-col">
          <h1 className="text-xl font-bold mb-8">
             <img src="https://graph.facebook.com/PMMandaueofficial/picture?type=large" alt="Pacific Mall Mandaue" className="w-16 h-16 rounded-full border-2 border-white mb-4" />
             Pacific Mall Admin
          </h1>
          <ul className="space-y-4 flex-grow">
            <li id="content-studio"><Link href="/dashboard" className="block hover:text-pm-accent transition">Content Studio</Link></li>
            <li id="engagement-hub"><Link href="/dashboard/engagement" className="block hover:text-pm-accent transition">Engagement Hub</Link></li>
            <li id="lead-crm"><Link href="/dashboard/leads" className="block hover:text-pm-accent transition">Lead CRM</Link></li>
            <li><Link href="/dashboard/calendar" className="block hover:text-pm-accent transition">Content Calendar</Link></li>
          </ul>
          <button 
            onClick={startTour}
            className="bg-pm-accent text-pm-dark font-bold py-2 px-4 rounded-full text-sm hover:scale-105 transition"
          >
            Start Guided Tour 🎧
          </button>
        </nav>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
