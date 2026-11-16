import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pacific Mall Marketing Tool | AdScale Performance Engine',
  description: 'AI-driven social media ads, content generation, and customer engagement for Pacific Mall.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen bg-[#f7f7f7] text-[#1a1a1a] antialiased selection:bg-[#8554ff] selection:text-white">
        {children}
      </body>
    </html>
  );
}
