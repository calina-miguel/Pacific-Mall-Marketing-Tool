'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [variations, setVariations] = useState<any[]>([]);

  return (
    <div className="min-h-screen bg-[#000] text-white p-12 overflow-hidden selection:bg-pm-accent">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pm-blue/20 via-black to-black -z-0" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-end mb-12">
            <div>
                <h2 className="text-sm font-medium text-pm-accent uppercase tracking-[0.2em] mb-2">Pacific Mall Mandaue</h2>
                <h1 className="text-7xl font-light tracking-tighter">Content Studio</h1>
            </div>
            <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center animate-pulse">
                <div className="h-3 w-3 rounded-full bg-pm-accent" />
            </div>
        </div>

        {/* The "Liquid" Input Field */}
        <div className="group relative bg-white/[0.03] border border-white/10 rounded-[40px] p-8 hover:border-pm-accent/50 transition-all duration-500">
            <textarea 
                className="w-full bg-transparent p-4 outline-none text-3xl font-light placeholder:text-white/20"
                placeholder="What's the next big event?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <div className="flex justify-end mt-4">
                <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-pm-accent transition-all hover:scale-105 active:scale-95">
                    GENERATE
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
