'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Users, TrendingUp, CheckCircle2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  const handleLaunchGeneration = async () => {
    if (!topic) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, context: 'Pacific Mall Mandaue' }),
      });
      const data = await res.json();
      setGeneratedResult(data);
    } catch (err) {
      console.error(err);
      setGeneratedResult({
        caption: `🎉 Big things are happening at Pacific Mall! Discover special deals, weekend dining, and family fun today. #PacificMall #MandaueShopping`,
        headline: 'Upcoming Mall Highlight',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="ad-badge mb-3">Pacific Mall Mandaue</div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Marketing <span className="font-serif italic font-normal text-[#8554ff]">Control</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200/80 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-700 shadow-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Marketing Pipeline
          </div>
        </div>
      </div>

      {/* Bento Grid Layout - Styled with AdScale aesthetics */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* Studio Card - Bento Box 1 (Span 8) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-12 lg:col-span-8 adscale-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#8554ff] flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="font-bold text-base text-[#1a1a1a]">New Content Pipeline</h3>
                  <p className="text-xs text-gray-400">Draft promotions, mall announcements, and tenant spotlights</p>
                </div>
              </div>
              <span className="text-xs text-[#8554ff] font-medium bg-purple-50 px-3 py-1 rounded-full">
                AI Powered
              </span>
            </div>

            <textarea 
              className="w-full bg-[#f7f7f7] border border-gray-200/80 rounded-2xl p-4 text-base sm:text-lg font-light placeholder:text-gray-400 min-h-[160px] outline-none focus:ring-2 focus:ring-[#8554ff] focus:border-transparent transition resize-none"
              placeholder="Describe your next mall event, weekend sale, or tenant launch..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-gray-400 font-medium">Generates Facebook copy, headlines & hashtags</span>
            <button
              onClick={handleLaunchGeneration}
              disabled={loading || !topic}
              className="ad-btn-purple w-full sm:w-auto text-xs sm:text-sm !py-3 !px-6 disabled:opacity-50"
            >
              {loading ? (
                <>Calculating AI Strategy...</>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  LAUNCH GENERATION
                </>
              )}
            </button>
          </div>

          {/* Generated Result Feedback */}
          {generatedResult && (
            <div className="mt-6 p-5 bg-[#f7f7f7] border border-purple-100 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#8554ff] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Generated Campaign Copy
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedResult.caption || JSON.stringify(generatedResult));
                    alert('Copied to clipboard!');
                  }}
                  className="text-xs text-gray-500 hover:text-black font-semibold"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {generatedResult.caption || (typeof generatedResult === 'string' ? generatedResult : JSON.stringify(generatedResult))}
              </p>
            </div>
          )}
        </motion.div>

        {/* Engagement Box - Bento Box 2 (Span 4) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-12 lg:col-span-4 adscale-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                Attention Required
              </span>
            </div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-2">Active Engagements</h3>
            <div className="text-6xl font-bold tracking-tight text-[#1a1a1a] my-2">12</div>
            <p className="text-gray-500 text-sm">Comments pending human review and approval</p>
          </div>

          <Link
            href="/dashboard/engagement"
            className="mt-6 flex items-center justify-between text-xs font-semibold text-[#8554ff] bg-purple-50 hover:bg-purple-100 p-3.5 rounded-xl transition"
          >
            <span>Open Social Command</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Lead CRM Box - Bento Box 3 (Span 6) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-12 lg:col-span-6 adscale-card p-6 sm:p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </span>
              <h3 className="text-lg font-bold text-[#1a1a1a]">Lead Capture Pipeline</h3>
            </div>
            <Link href="/dashboard/leads" className="text-xs text-[#8554ff] font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3.5 bg-[#f7f7f7] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                  MS
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#1a1a1a] block">Maria Santos</span>
                  <span className="text-[11px] text-gray-400">Comment replied • 2 hours ago</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                LEAD_ACTIVE
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 bg-[#f7f7f7] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#8554ff] font-bold text-xs flex items-center justify-center">
                  JD
                </div>
                <div>
                  <span className="font-semibold text-sm text-[#1a1a1a] block">Juan Dela Cruz</span>
                  <span className="text-[11px] text-gray-400">Promo inquiry • Yesterday</span>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                LEAD_ACTIVE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Calendar Quick Glance - Bento Box 4 (Span 6) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-12 lg:col-span-6 adscale-card p-6 sm:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-bold text-[#1a1a1a]">Scheduled Mall Promos</h3>
              </div>
              <Link href="/dashboard/calendar" className="text-xs text-[#8554ff] font-semibold hover:underline">
                View Calendar
              </Link>
            </div>

            <div className="p-4 bg-[#1a1a1a] text-white rounded-2xl">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2 font-mono">
                <span>NEXT QUEUED RELEASE</span>
                <span className="text-[#8554ff] font-bold">AUTOMATED</span>
              </div>
              <p className="text-sm font-medium line-clamp-2">
                🛍️ Weekend Clearance Sale at Pacific Mall Mandaue! Enjoy up to 70% off across participating brands.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-xs text-gray-500 font-medium">
            <span>2 more campaigns queued for this week</span>
            <Link href="/dashboard/calendar" className="text-[#8554ff] hover:underline font-semibold flex items-center gap-1">
              Manage Queue →
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
