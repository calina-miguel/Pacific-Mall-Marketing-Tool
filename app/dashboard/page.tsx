'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [variations, setVariations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, context: 'Pacific Mall Mandaue' }),
    });
    const data = await res.json();
    setVariations(data.variations || []);
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen bg-[#050505] text-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-pm-accent to-white mb-2">
            PACIFIC MALL CORE
          </h1>
          <p className="text-gray-400 font-mono tracking-widest uppercase text-sm">Marketing Automation Engine v1.0</p>
        </header>
        
        <div className="apple-card p-8 mb-10 border-pm-accent/40">
          <textarea 
            className="w-full bg-transparent p-4 outline-none text-2xl font-light text-white placeholder:text-gray-600"
            placeholder="What's the next big event?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={generateContent}
            className="mt-6 w-full py-4 bg-gradient-to-r from-pm-accent to-amber-500 rounded-2xl text-pm-dark font-bold text-lg hover:shadow-[0_0_20px_rgba(255,204,0,0.3)] transition-all"
          >
            {loading ? 'CALCULATING...' : 'EXECUTE GENERATION'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {variations.map((v, i) => (
            <motion.div 
              key={i} 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="apple-card bg-pm-dark/80 border-white/10 p-6 hover:border-pm-accent/50 transition-colors"
            >
              <p className="text-gray-200 text-sm mb-6 line-clamp-6">{v.content}</p>
              <button className="w-full border border-pm-accent text-pm-accent py-2 rounded-full text-xs font-bold uppercase hover:bg-pm-accent hover:text-pm-dark transition">
                Deploy Variation
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
