'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

const DEMO_POSTS = [
  {
    id: 'demo-1',
    content: '🛍️ Weekend Clearance Sale at Pacific Mall Mandaue! Enjoy up to 70% off across participating brands.',
    scheduled_for: new Date(Date.now() + 86400000).toISOString(),
    status: 'pending'
  },
  {
    id: 'demo-2',
    content: '☕ New Dining Spot Alert! Coffee & Bites is officially open on the 2nd Floor.',
    scheduled_for: new Date(Date.now() + 172800000).toISOString(),
    status: 'pending'
  },
  {
    id: 'demo-3',
    content: '🎉 Mid-Month Shopping Festival is live! Check out our store directory for exclusive vouchers.',
    scheduled_for: new Date(Date.now() - 86400000).toISOString(),
    status: 'posted'
  }
];

export default function CalendarView() {
  const [posts, setPosts] = useState<any[]>(DEMO_POSTS);

  useEffect(() => {
    async function fetchScheduled() {
      try {
        const { data } = await supabase
          .from('scheduled_posts')
          .select('*')
          .order('scheduled_for', { ascending: true });
        if (data && data.length > 0) setPosts(data);
      } catch {
        console.log('Using default demo calendar posts');
      }
    }
    fetchScheduled();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="ad-badge mb-2 sm:mb-3">Campaign Scheduler</div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1429]">
          Content <span className="font-serif italic font-normal text-[#321c65]">Calendar</span>
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
          Manage scheduled promotional posts, tenant events, and active social media campaigns.
        </p>
      </header>

      {/* Posts List in AdScale Cards */}
      <div className="space-y-3 sm:space-y-4">
        {posts.map((post) => {
          const isPending = post.status === 'pending';
          return (
            <div
              key={post.id}
              className="adscale-card p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 hover:border-[#321c65]/30 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-[11px] sm:text-xs font-semibold text-gray-500 font-mono">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#b60090] shrink-0" />
                  <span>
                    {new Date(post.scheduled_for).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-800 font-normal leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center gap-3 self-start md:self-center shrink-0">
                <span
                  className={`px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 ${
                    isPending
                      ? 'bg-pink-50 text-[#b60090] border border-pink-200'
                      : 'bg-green-50 text-[#26aa00] border border-green-200'
                  }`}
                >
                  {isPending ? (
                    <>
                      <Clock className="w-3 h-3 text-[#b60090]" />
                      PENDING
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-[#26aa00]" />
                      POSTED
                    </>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
