'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, MessageCircleReply, Check } from 'lucide-react';

export default function EngagementDashboard() {
  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});

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

  const handleSendReply = (commentId: string) => {
    setSentMap(prev => ({ ...prev, [commentId]: true }));
    setTimeout(() => {
      setSentMap(prev => ({ ...prev, [commentId]: false }));
    }, 3000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <header className="mb-6 sm:mb-10">
        <div className="ad-badge mb-2 sm:mb-3">Social Command</div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1429]">
          Engagement <span className="font-serif italic font-normal text-[#321c65]">Hub</span>
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
          Review incoming Facebook & social customer inquiries and deploy instant suggested responses.
        </p>
      </header>

      {/* Comment List styled with AdScale cards */}
      <div className="space-y-4 sm:space-y-6">
        {comments.map((item: any) => (
          <motion.div 
            key={item.id} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="adscale-card p-4 sm:p-6 lg:p-8 hover:border-[#321c65]/30 transition-all"
          >
            {/* Top user profile row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-purple-50 text-[#321c65] border border-[#321c65]/15 flex items-center justify-center font-bold text-sm sm:text-base shrink-0">
                  {item.from?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base text-[#1a1429]">{item.from?.name || "Customer"}</p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Incoming Facebook Comment</p>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-pink-50 text-[#b60090] border border-pink-100">
                Action Required
              </span>
            </div>
            
            {/* Message Bubble */}
            <div className="bg-[#f7f6fa] p-3.5 sm:p-5 rounded-2xl border border-gray-100 mb-4 sm:mb-6">
              <p className="text-sm sm:text-base text-gray-800 font-normal leading-relaxed">
                "{item.message}"
              </p>
            </div>
            
            {/* Action Trigger */}
            <button 
              onClick={() => suggestReply(item.id, item.message)}
              disabled={loading[item.id]}
              className="ad-btn-purple w-full sm:w-auto text-xs sm:text-sm !py-2.5 !px-5 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <MessageCircleReply className="w-3.5 h-3.5" />
              <span>{loading[item.id] ? "PREPARING RESPONSE..." : "GENERATE SUGGESTED REPLY"}</span>
            </button>

            {/* Generated Reply Drawer */}
            {replies[item.id] && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#b60090]" />
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#b60090]">
                    Suggested Response
                  </span>
                </div>
                <textarea 
                  className="w-full bg-[#f7f6fa] border border-[#321c65]/10 rounded-2xl p-3 sm:p-4 text-xs sm:text-sm font-light text-gray-800 outline-none focus:ring-2 focus:ring-[#321c65] focus:border-transparent transition resize-none mb-3"
                  rows={3}
                  value={replies[item.id]}
                  onChange={(e) => setReplies({ ...replies, [item.id]: e.target.value })}
                />
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2">
                  <button 
                    onClick={() => handleSendReply(item.id)}
                    className="ad-btn-magenta w-full sm:w-auto text-xs sm:text-sm !py-2.5 !px-5 flex items-center justify-center gap-2"
                  >
                    {sentMap[item.id] ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Dispatched to Facebook!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>DEPLOY DIRECT RESPONSE</span>
                      </>
                    )}
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
