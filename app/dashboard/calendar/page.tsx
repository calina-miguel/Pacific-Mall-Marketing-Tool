'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
        const { data, error } = await supabase
          .from('scheduled_posts')
          .select('*')
          .order('scheduled_for', { ascending: true });
        if (data && data.length > 0) setPosts(data);
      } catch (err) {
        console.log('Using default demo calendar posts');
      }
    }
    fetchScheduled();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Content Calendar</h2>
      <p className="text-gray-600 mb-6">Manage scheduled promotional posts and active campaigns.</p>

      <div className="grid gap-4">
        {posts.map((post) => (
          <div key={post.id} className="apple-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-900">
                  📅 {new Date(post.scheduled_for).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                post.status === 'pending' 
                  ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {post.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
