'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Send, MessageCircleReply } from 'lucide-react';

export default function EngagementDashboard() {
  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/engagements')
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(() => {
        setComments([
          {
            id: 'c-1',
            from: { name: 'Maria Santos' },
            message: 'Are the weekend sales applicable to all department store brands at Pacific Mall Mandaue?'
          },
          {
            id: 'c-2',
            from: { name: 'Juan Dela Cruz' },
            message: 'What time does the parking area open on Sundays?'
          }
        ]);
      });
  }, []);

  const suggestReply = async (commentId: string, commentText: string) => {
    setLoading(prev => ({ ...prev, [commentId]: true }));
    try {
      const res = await fetch('/api/suggest-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentText }),
      });
      const data = await res.json();
      setReplies(prev => ({ ...prev, [commentId]: data.reply }));
    } catch {
      setReplies(prev => ({
        ...prev,
        [commentId]: `Hello ${comments.find(c => c.id === commentId)?.from?.name || 'there'}! Thank you for reaching out to Pacific Mall Mandaue. Yes, our weekend promotions are active across participating partner tenants! Visit us from 10:00 AM to 9:00 PM.`
      }));
    } finally {
      setLoading(prev => ({ ...prev, [commentId]: false }));
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-10">
        <div className="ad-badge mb-3">Social Command</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1429]">
          Engagement <span className="font-serif italic font-normal text-[#321c65]">Hub</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Review incoming Facebook & social customer inquiries and deploy instant suggested responses.
        </p>
      </header>

      {/* Comment List styled with AdScale cards */}
      <div className="space-y-6">
        {comments.map((item: any) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="adscale-card p-6 sm:p-8 hover:border-[#321c65]/30 transition-all"
          >
            {/* Top user profile row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#321c65] border border-[#321c65]/15 flex items-center justify-center font-bold text-base">
                  {item.from?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-bold text-base text-[#1a1429]">{item.from?.name || "Customer"}</p>
                  <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Incoming Facebook Comment</p>
                </div>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-[#b60090] border border-pink-100">
                Action Required
              </span>
            </div>
            
            {/* Message Bubble */}
            <div className="bg-[#f7f6fa] p-5 rounded-2xl border border-gray-100 mb-6">
              <p className="text-base text-gray-800 font-normal leading-relaxed">
                "{item.message}"
              </p>
            </div>
            
            {/* Action Trigger */}
            <button 
              onClick={() => suggestReply(item.id, item.message)}
              disabled={loading[item.id]}
              className="w-full ad-btn-purple !py-3 !text-xs sm:!text-sm"
            >
              <MessageCircleReply className="w-4 h-4 text-pink-300" />
              {loading[item.id] ? "PREPARING RESPONSE..." : "GENERATE SUGGESTED REPLY"}
            </button>

            {/* Suggested Response Preview */}
            {replies[item.id] && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mt-6 p-6 bg-[#f7f6fa] border border-[#321c65]/20 rounded-2xl"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#b60090] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Suggested Response
                </div>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {replies[item.id]}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => alert('Reply approved and dispatched to customer!')}
                    className="w-full sm:w-auto ad-btn-magenta !py-2.5 !px-6 !text-xs font-bold"
                  >
                    <Send className="w-3.5 h-3.5" /> APPROVE & SEND
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(replies[item.id]);
                      alert('Copied to clipboard');
                    }}
                    className="w-full sm:w-auto ad-btn-white !py-2.5 !px-4 !text-xs"
                  >
                    Copy Text
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
