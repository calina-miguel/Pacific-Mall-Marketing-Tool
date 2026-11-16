'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MessageSquare, Users, TrendingUp, CheckCircle2, Zap, Copy } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

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
      if (data && (data.caption || (data.variations && data.variations.length > 0))) {
        setGeneratedResult(data);
      } else {
        throw new Error('Fallback needed');
      }
    } catch (err) {
      console.error(err);
      setGeneratedResult({
        caption: `🛍️ Don't miss the latest updates at Pacific Mall Mandaue!\n\n${topic}\n\nVisit us today and enjoy exclusive shopping, great food, and fun with the whole family!\n\n#PacificMall #MandaueShopping #CebuDeals`,
        headline: topic || 'Upcoming Mall Highlight',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = generatedResult?.caption || (typeof generatedResult === 'string' ? generatedResult : JSON.stringify(generatedResult));
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="ad-badge mb-2 sm:mb-3">Pacific Mall Mandaue</div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1429]">
            Marketing <span className="font-serif italic font-normal text-[#321c65]">Control</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="bg-white border border-[#321c65]/10 rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#321c65] shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#26aa00] animate-pulse" />
            Live Marketing Pipeline
          </div>
        </div>
      </div>

      {/* Bento Grid Layout - Fully Responsive across Phone, Tablet, & Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* Studio Card - Bento Box 1 (Span 8 on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-1 lg:col-span-8 adscale-card p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#321c65] flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="w-4 h-4 text-[#b60090]" />
                </span>
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#1a1429]">New Content Pipeline</h3>
                  <p className="text-[11px] sm:text-xs text-gray-400">Draft promotions, mall announcements, & tenant spotlights</p>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs text-[#b60090] font-semibold bg-pink-50 border border-pink-100 px-2.5 py-0.5 rounded-full shrink-0">
                Instant Engine
              </span>
            </div>

            <textarea 
              className="w-full bg-[#f7f6fa] border border-[#321c65]/10 rounded-2xl p-3.5 sm:p-4 text-sm sm:text-base font-light placeholder:text-gray-400 min-h-[130px] sm:min-h-[160px] outline-none focus:ring-2 focus:ring-[#321c65] focus:border-transparent transition resize-none"
              placeholder="Describe your next mall event, weekend sale, or tenant launch..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <span className="text-xs text-gray-400 font-medium text-center sm:text-left">
              Generates Facebook copy, headlines & hashtags
            </span>
            <button
              onClick={handleLaunchGeneration}
              disabled={loading || !topic}
              className="ad-btn-purple w-full sm:w-auto text-xs sm:text-sm !py-3 !px-6 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Preparing Campaign Strategy...</span>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-pink-300" />
                  <span>LAUNCH GENERATION</span>
                </>
              )}
            </button>
          </div>

          {/* Generated Result Feedback */}
          {generatedResult && (
            <div className="mt-5 p-4 sm:p-5 bg-[#f7f6fa] border border-[#321c65]/15 rounded-2xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#b60090] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#26aa00]" /> Generated Campaign Copy
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#321c65] hover:text-[#b60090] font-semibold transition flex items-center gap-1 px-2 py-1 rounded-lg bg-white border border-[#321c65]/10 shadow-xs"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                {generatedResult.caption || (typeof generatedResult === 'string' ? generatedResult : JSON.stringify(generatedResult))}
              </p>
            </div>
          )}
        </motion.div>

        {/* Engagement Box - Bento Box 2 (Span 4 on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-4 adscale-card p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#321c65] flex items-center justify-center font-bold">
                <MessageSquare className="w-4 h-4 text-[#321c65]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#b60090] bg-pink-50 border border-pink-100 px-2.5 py-1 rounded-full">
                Attention Required
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400 mb-1 sm:mb-2">Active Engagements</h3>
            <div className="text-5xl sm:text-6xl font-bold tracking-tight text-[#321c65] my-2">12</div>
            <p className="text-gray-500 text-xs sm:text-sm">Comments pending human review and approval</p>
          </div>

          <Link
            href="/dashboard/engagement"
            className="mt-5 sm:mt-6 flex items-center justify-between text-xs font-semibold text-[#321c65] bg-purple-50 hover:bg-purple-100 p-3 sm:p-3.5 rounded-xl transition border border-[#321c65]/10"
          >
            <span>Open Social Command</span>
            <ArrowRight className="w-4 h-4 text-[#b60090]" />
          </Link>
        </motion.div>

        {/* Lead CRM Box - Bento Box 3 (Span 6 on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="col-span-1 lg:col-span-6 adscale-card p-5 sm:p-7 lg:p-8"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-green-50 text-[#26aa00] flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#1a1429]">Lead Capture Pipeline</h3>
            </div>
            <Link href="/dashboard/leads" className="text-xs text-[#321c65] font-semibold hover:text-[#b60090] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 bg-[#f7f6fa] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 text-[#321c65] font-bold text-xs flex items-center justify-center shrink-0">
                  MS
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-[#1a1429] block">Maria Santos</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">Comment replied • 2 hours ago</span>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-mono font-semibold text-[#26aa00] bg-green-50 border border-green-200/60 px-2.5 py-0.5 rounded-full">
                LEAD_ACTIVE
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 sm:p-3.5 bg-[#f7f6fa] rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 text-[#b60090] font-bold text-xs flex items-center justify-center shrink-0">
                  JD
                </div>
                <div>
                  <span className="font-semibold text-xs sm:text-sm text-[#1a1429] block">Juan Dela Cruz</span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400">Promo inquiry • Yesterday</span>
                </div>
              </div>
              <span className="self-start sm:self-auto text-[10px] sm:text-[11px] font-mono font-semibold text-[#26aa00] bg-green-50 border border-green-200/60 px-2.5 py-0.5 rounded-full">
                LEAD_ACTIVE
              </span>
            </div>
          </div>
        </motion.div>

        {/* Calendar Quick Glance - Bento Box 4 (Span 6 on desktop, full width on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="col-span-1 lg:col-span-6 adscale-card p-5 sm:p-7 lg:p-8 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#321c65] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4 text-[#b60090]" />
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#1a1429]">Scheduled Mall Promos</h3>
              </div>
              <Link href="/dashboard/calendar" className="text-xs text-[#321c65] font-semibold hover:text-[#b60090] hover:underline">
                View Calendar
              </Link>
            </div>

            <div className="p-3.5 sm:p-4 bg-[#321c65] text-white rounded-2xl shadow-sm">
              <div className="flex items-center justify-between text-[11px] text-purple-200 mb-2 font-mono">
                <span>NEXT QUEUED RELEASE</span>
                <span className="text-[#b60090] bg-white px-2 py-0.5 rounded-full font-bold text-[9px] sm:text-[10px]">AUTOMATED</span>
              </div>
              <p className="text-xs sm:text-sm font-medium line-clamp-2 leading-relaxed">
                🛍️ Weekend Clearance Sale at Pacific Mall Mandaue! Enjoy up to 70% off across participating brands.
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-500 font-medium">
            <span>2 more campaigns queued for this week</span>
            <Link href="/dashboard/calendar" className="text-[#321c65] hover:text-[#b60090] font-semibold flex items-center gap-1 self-start sm:self-auto">
              Manage Queue →
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
