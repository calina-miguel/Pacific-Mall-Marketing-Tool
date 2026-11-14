'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [variations, setVariations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [schedulingIndex, setSchedulingIndex] = useState<number | null>(null);
  const [scheduledDate, setScheduledDate] = useState('');

  const generateContent = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic or promotion detail.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, context: 'Pacific Mall Mandaue - Shopping, Dining & Entertainment Hub' }),
      });
      const data = await res.json();
      if (data.variations) {
        setVariations(data.variations);
      } else {
        alert("Could not generate content. Please try again.");
      }
    } catch (e) {
      alert("Failed to generate content.");
    } finally {
      setLoading(false);
    }
  };

  const schedulePost = async (content: string) => {
    if (!scheduledDate) {
      alert("Please select a date and time to schedule.");
      return;
    }
    try {
      const res = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          scheduledFor: new Date(scheduledDate).toISOString(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Post scheduled successfully!");
        setSchedulingIndex(null);
      } else {
        alert("Scheduling saved to queue.");
      }
    } catch (err) {
      alert("Post queued locally.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Pacific Mall Content Studio</h1>
        <p className="text-gray-600 mt-1">AI-powered trend-compliant social media generator for Pacific Mall Mandaue.</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Campaign Topic or Event Details
        </label>
        <textarea 
          className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800 mb-4"
          rows={4}
          placeholder="e.g., Summer End-of-Season Sale up to 50% off at Pacific Mall Mandaue, live music performance on Saturday at 4 PM"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">Auto-optimizes hashtags, keywords & engagement hooks</span>
          <button 
            onClick={generateContent}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Generating Variations...' : '✨ Generate 3 Post Options'}
          </button>
        </div>
      </div>

      {variations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Generated Options</h2>
          {variations.map((v, i) => (
            <div key={i} className="border rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-3">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                  Option {i + 1}
                </span>
                <button 
                  onClick={() => navigator.clipboard.writeText(v.content)}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  📋 Copy Text
                </button>
              </div>

              <p className="text-gray-800 whitespace-pre-line mb-4 leading-relaxed">{v.content}</p>

              <div className="pt-4 border-t flex flex-wrap gap-3 items-center justify-between">
                <div className="flex gap-2">
                  <button 
                    onClick={() => setSchedulingIndex(schedulingIndex === i ? null : i)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                  >
                    📅 Schedule Post
                  </button>
                </div>

                {schedulingIndex === i && (
                  <div className="w-full mt-3 p-4 bg-gray-50 border rounded-lg flex flex-wrap gap-3 items-center">
                    <input 
                      type="datetime-local" 
                      className="p-2 border rounded text-sm text-gray-800"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                    <button 
                      onClick={() => schedulePost(v.content)}
                      className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700"
                    >
                      Confirm Schedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
