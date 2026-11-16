'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Calendar as CalendarIcon, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

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
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="ad-badge mb-3">Campaign Scheduler</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          Content <span className="font-serif italic font-normal text-[#8554ff]">Calendar</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Manage scheduled promotional posts, tenant events, and active social media campaigns.
        </p>
      </header>

      {/* Posts List in AdScale Cards */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isPending = post.status === 'pending';
          return (
            <div
              key={post.id}
              className="adscale-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#8554ff]/30 transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-gray-500 font-mono">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#8554ff]" />
                  <span>
                    {new Date(post.scheduled_for).toLocaleString([], {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>
                </div>
                <p className="text-base text-gray-800 font-normal leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    isPending
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {isPending ? (
                    <>
                      <Clock className="w-3 h-3" />
                      PENDING
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3 h-3" />
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
