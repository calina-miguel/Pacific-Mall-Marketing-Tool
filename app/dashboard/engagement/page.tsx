'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="p-8 min-h-screen bg-gray-50">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-pm-blue mb-8">Engagement Hub</h2>
        
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((item: any) => (
              <motion.div 
                key={item.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-pm-blue/10 flex items-center justify-center font-bold text-pm-blue">
                    {item.from?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-bold text-pm-dark">{item.from?.name || "Customer"}</p>
                    <p className="text-xs text-gray-400">Public Comment</p>
                  </div>
                </div>
                
                <p className="text-gray-800 mb-6 bg-gray-50 p-4 rounded-2xl">{item.message}</p>
                
                <button 
                  onClick={() => suggestReply(item.id, item.message)}
                  className="w-full bg-pm-blue text-white py-3 rounded-2xl font-semibold hover:bg-opacity-90 transition active:scale-95"
                >
                  {loading[item.id] ? "Thinking..." : "Generate AI Reply"}
                </button>

                {replies[item.id] && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    className="mt-4 p-4 bg-pm-blue/5 border border-pm-blue/10 rounded-2xl"
                  >
                    <p className="text-sm text-pm-blue font-bold mb-2">Suggested Response:</p>
                    <p className="text-gray-700 mb-4">{replies[item.id]}</p>
                    <button className="text-pm-accent font-bold text-sm hover:underline">Approve & Send</button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
