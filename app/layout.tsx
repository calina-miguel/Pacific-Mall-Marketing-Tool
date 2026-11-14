import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        <nav className="w-64 bg-gray-900 text-white p-6">
          <h1 className="text-xl font-bold mb-8">Pacific Mall Admin</h1>
          <ul className="space-y-4">
            <li><Link href="/dashboard" className="block hover:text-blue-400">Content Studio</Link></li>
            <li><Link href="/dashboard/engagement" className="block hover:text-blue-400">Engagement Hub</Link></li>
            <li><Link href="/dashboard/leads" className="block hover:text-blue-400">Lead CRM</Link></li>
            <li><Link href="/dashboard/calendar" className="block hover:text-blue-400">Content Calendar</Link></li>
          </ul>
        </nav>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </body>
    </html>
  );
}
