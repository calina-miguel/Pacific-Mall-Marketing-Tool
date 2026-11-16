'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function EngagementDashboard() {
  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/engagements')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  const suggestReply = async (commentId: string, commentText: string) => {
    setLoading(prev => ({ ...prev, [commentId]: true }));
    const res = await fetch('/api/suggest-reply', {
      method: 'POST',
      body: JSON.stringify({ comment: commentText }),
    });
    const data = await res.json();
    setReplies(prev => ({ ...prev, [commentId]: data.reply }));
    setLoading(prev => ({ ...prev, [commentId]: false }));
  };

  return (
    <div className="min-h-screen bg-[#000] text-white p-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h2 className="text-sm font-medium text-pm-accent uppercase tracking-[0.2em] mb-2">Social Command</h2>
          <h1 className="text-6xl font-light tracking-tighter">Engagement Hub</h1>
        </header>

        <div className="grid grid-cols-1 gap-6">
          {comments.map((item: any) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="apple-card bg-[#0a0a0a] border border-white/10 p-8 hover:border-pm-accent/30 transition-all"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pm-blue to-black flex items-center justify-center font-bold text-xl border border-white/10">
                  {item.from?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-semibold text-lg">{item.from?.name || "Customer"}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Incoming Comment</p>
                </div>
              </div>
              
              <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 mb-6">
                <p className="text-xl font-light italic text-gray-300">"{item.message}"</p>
              </div>
              
              <button 
                onClick={() => suggestReply(item.id, item.message)}
                className="w-full btn-futuristic"
              >
                {loading[item.id] ? "ANALYZING..." : "GENERATE INTELLIGENT REPLY"}
              </button>

              {replies[item.id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="mt-6 p-6 bg-pm-blue/10 border border-pm-blue/30 rounded-2xl"
                >
                  <p className="text-xs font-bold text-pm-accent uppercase mb-2 tracking-widest">Suggested Response</p>
                  <p className="text-white text-lg mb-6">{replies[item.id]}</p>
                  <button className="w-full py-3 bg-white text-black rounded-full font-bold hover:bg-pm-accent transition">APPROVE & SEND</button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
