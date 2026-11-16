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
    <div className="p-8 min-h-screen bg-gray-50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-pm-blue mb-8 tracking-tight">Content Studio</h1>
        
        <div className="bg-white/70 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-lg mb-8">
          <textarea 
            className="w-full bg-transparent p-4 outline-none text-lg placeholder:text-gray-400"
            placeholder="What's happening at the mall?"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={generateContent}
            className="w-full mt-4 bg-pm-blue text-white py-4 rounded-2xl font-semibold active:scale-95 transition-transform"
          >
            {loading ? 'Generating...' : 'Magic Generate'}
          </button>
        </div>

        <div className="grid gap-6">
          {variations.map((v, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <p className="text-gray-800 leading-relaxed mb-6">{v.content}</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-medium transition">Preview</button>
                <button className="flex-1 bg-pm-accent text-pm-dark py-3 rounded-xl font-bold transition">Schedule</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
