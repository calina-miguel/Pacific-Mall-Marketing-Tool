'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [topic, setTopic] = useState('');

  return (
    <div className="min-h-screen bg-[#000] text-white p-12">
      <div className="grid grid-cols-12 gap-6 max-w-7xl mx-auto">
        
        {/* Header - Span Full */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-12 mb-8">
            <h1 className="text-6xl font-bold tracking-tighter">Marketing Control</h1>
        </motion.div>

        {/* Studio Card - Bento Box 1 */}
        <div className="col-span-12 lg:col-span-8 apple-card p-8 border border-white/10 bg-[#0a0a0a]">
            <label className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 block">New Content Pipeline</label>
            <textarea 
                className="w-full bg-transparent outline-none text-2xl font-light placeholder:text-gray-700 min-h-[150px]"
                placeholder="Describe your next mall event..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <button className="btn-futuristic w-full mt-4">LAUNCH GENERATION</button>
        </div>

        {/* Engagement Box - Bento Box 2 */}
        <div className="col-span-12 lg:col-span-4 apple-card p-8 border border-white/10 bg-[#0a0a0a] flex flex-col justify-between">
            <h3 className="text-xl font-semibold">Active Engagements</h3>
            <div className="text-5xl font-bold text-pm-accent my-4">12</div>
            <p className="text-gray-400 text-sm">Comments pending human approval</p>
        </div>

        {/* Lead CRM Box - Bento Box 3 */}
        <div className="col-span-12 lg:col-span-6 apple-card p-8 border border-white/10 bg-[#0a0a0a]">
            <h3 className="text-xl font-semibold mb-6">Lead Capture Pipeline</h3>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
                <span>Maria Santos</span>
                <span className="text-pm-accent font-mono text-sm">LEAD_ACTIVE</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-white/5">
                <span>Juan Dela Cruz</span>
                <span className="text-pm-accent font-mono text-sm">LEAD_ACTIVE</span>
            </div>
        </div>

      </div>
    </div>
  );
}
