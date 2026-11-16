'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Sparkles,
  BarChart3,
  Calendar,
  MessageSquare,
  Users,
  Send,
  Loader2,
  ExternalLink,
  Star,
  Zap,
  TrendingUp,
  ShieldCheck,
  Layers,
  ShoppingBag,
  Target,
  Megaphone,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export default function MarketingLandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Marketing Generator Studio state
  const [promptTopic, setPromptTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  // Newsletter state
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTopic) return;
    setGenerating(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: promptTopic }),
      });
      const data = await res.json();
      setGeneratedResult(data);
    } catch (err) {
      console.error(err);
      // Fallback demo result
      setGeneratedResult({
        caption: `🎉 Discover something extraordinary at Pacific Mall! From curated dining to exclusive seasonal collections, elevate your shopping experience today. #PacificMall #ShoppingMandaue #ElevateStyle`,
        headline: 'Exclusive Weekend Showcase at Pacific Mall',
        hashtags: ['#PacificMall', '#MandaueShopping', '#WeekendVibes', '#RetailTherapy']
      });
    } finally {
      setGenerating(false);
    }
  };

  const testimonials = [
    {
      quote: "Sales doubled in 60 days. Their ads and creatives completely changed our store foot traffic and online engagement.",
      name: "Sarah Jenkins",
      role: "Retail Marketing Director",
      brand: "Pacific Boutique Group"
    },
    {
      quote: "We went from inconsistent mall traffic to a stable 5x return on ad spend. The automated content workflows save us 20 hours every week.",
      name: "Daniel Rivera",
      role: "Commercial Operations Head",
      brand: "Urban Dining Collective"
    },
    {
      quote: "Communication is on point, reporting is crystal clear, and the AI-driven ad strategy actually converts local shoppers into mall visitors.",
      name: "Amina Al-Mansoor",
      role: "Leasing & Events Manager",
      brand: "Pacific Promenade"
    },
    {
      quote: "Within the first month, our customer acquisition cost dropped by 38%. The UGC campaigns and automatic reply bots are remarkable.",
      name: "Lucas Vance",
      role: "Co-Founder",
      brand: "Aura Lifestyle Stores"
    },
  ];

  const faqs = [
    {
      question: "How long does it take to see results?",
      answer: "Most merchant brands and mall campaigns see measurable improvements in foot traffic, social reach, and customer inquiries within 2–4 weeks of deploying automated campaigns."
    },
    {
      question: "Do you manage all ad platforms?",
      answer: "Yes! Our platform orchestrates Facebook, Instagram, Google Ads, TikTok, and local display campaigns all through a unified ad management dashboard."
    },
    {
      question: "What's the minimum budget required to start?",
      answer: "We recommend starting with a minimum test budget of $500–$1,000 for ad spend, allowing our machine learning engine to find high-converting audience segments quickly."
    },
    {
      question: "Can the AI generate tailored ad creatives for specific mall tenants?",
      answer: "Absolutely. You can specify tenant categories (F&B, fashion, entertainment, tech) and generate high-impact visual copy, promotional captions, and scheduled release dates in seconds."
    },
    {
      question: "Do I need a long-term contract?",
      answer: "No long-term lock-in required. Our plans operate month-to-month and you can upgrade, pause, or adjust tenant seats anytime with zero hidden penalty fees."
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] text-[#1a1a1a] selection:bg-[#8554ff] selection:text-white font-sans">
      
      {/* ─────────────────────────────────────────────────────────────
          1. NAVIGATION BAR (Floating Pill Style)
      ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 pt-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <nav className="bg-white/80 backdrop-blur-xl border border-[#1a1a1a]/10 rounded-full px-5 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#8554ff] flex items-center justify-center text-white font-bold text-sm shadow-[0_2px_8px_rgba(133,84,255,0.4)]">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight leading-none text-[#1a1a1a]">
                  Ad<span className="text-[#8554ff]">Scale</span>
                </span>
                <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Pacific Mall</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-gray-600">
              <a href="#services" className="hover:text-[#1a1a1a] transition-colors">Services</a>
              <a href="#process" className="hover:text-[#1a1a1a] transition-colors">Process</a>
              <a href="#pricing" className="hover:text-[#1a1a1a] transition-colors">Pricing</a>
              <a href="#case-studies" className="hover:text-[#1a1a1a] transition-colors">Case Studies</a>
              <a href="#testimonials" className="hover:text-[#1a1a1a] transition-colors">Testimonials</a>
              <a href="#studio" className="hover:text-[#8554ff] text-[#8554ff] font-semibold transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Studio
              </a>
            </div>

            {/* Action Buttons */}
            <div className="hidden sm:flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="text-xs font-semibold px-4 py-2 rounded-full border border-gray-200 hover:border-gray-400 text-gray-700 transition"
              >
                Dashboard
              </Link>
              <a
                href="#studio"
                className="ad-btn-purple !py-2 !px-4 !text-xs !rounded-full shadow-sm"
              >
                Launch Studio
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="md:hidden mt-2 bg-white border border-gray-100 rounded-2xl p-4 shadow-xl flex flex-col gap-3 text-sm font-medium"
              >
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-50 rounded-lg">Services</a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-50 rounded-lg">Process</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-50 rounded-lg">Pricing</a>
                <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-50 rounded-lg">Case Studies</a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 hover:bg-gray-50 rounded-lg">Testimonials</a>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="py-2 px-3 bg-gray-50 text-[#8554ff] font-semibold rounded-lg">Open Tool Dashboard</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>


      {/* ─────────────────────────────────────────────────────────────
          2. HERO SECTION
      ───────────────────────────────────────────────────────────── */}
      <section className="pt-16 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-[#1a1a1a]/10 rounded-full py-1.5 px-4 mb-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)]"
          >
            <span className="font-bold text-[#8554ff] text-xs sm:text-sm">$5M+</span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <span className="text-gray-600 text-xs sm:text-sm font-medium">in ad spend managed</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </motion.div>

          {/* Hero Main Headline with Signature Serif Accent */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] max-w-4xl leading-[1.1] mb-6"
          >
            We turn your Ad spend into{' '}
            <span className="font-serif italic font-normal text-[#8554ff] underline decoration-[#8554ff]/30 decoration-wavy decoration-1 underline-offset-8">
              scalable
            </span>{' '}
            revenue
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-gray-600 max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Performance-driven social media ads and AI content workflows for Pacific Mall retail brands ready to scale foot traffic and transactions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-10"
          >
            <a
              href="#studio"
              className="ad-btn-purple w-full sm:w-auto text-sm !py-3.5 !px-8 shadow-md hover:shadow-lg"
            >
              Launch Generation Studio
              <Sparkles className="w-4 h-4 ml-1" />
            </a>
            <a
              href="#case-studies"
              className="ad-btn-white w-full sm:w-auto text-sm !py-3.5 !px-8"
            >
              See Case Studies
            </a>
          </motion.div>

          {/* Social Proof Star Rating */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3 text-xs text-gray-500 font-medium"
          >
            <div className="flex -space-x-1.5">
              <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">S</div>
              <div className="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">M</div>
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">D</div>
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold border-2 border-white">A</div>
            </div>
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span>Based on 4,572+ merchant reviews</span>
          </motion.div>

          {/* 3D Dashboard Mockup Presentation Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 w-full max-w-4xl relative"
          >
            {/* Glow backdrop */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8554ff]/20 to-purple-400/20 rounded-[32px] blur-xl opacity-70 -z-10" />

            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden">
              {/* Fake Browser / Window Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="bg-[#f7f7f7] text-[11px] font-mono text-gray-500 px-4 py-1 rounded-full border border-gray-200">
                  adscale.pacificmall.app/live-feed
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live System
                </div>
              </div>

              {/* Inside Dashboard Content Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Metric 1 */}
                <div className="bg-[#f7f7f7] border border-gray-200/70 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
                    <span>Ad ROAS Average</span>
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">4.82x</div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>↑ +32%</span> vs last month
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-[#f7f7f7] border border-gray-200/70 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
                    <span>Foot Traffic Inquiries</span>
                    <Users className="w-3.5 h-3.5 text-[#8554ff]" />
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">14,290</div>
                  <div className="text-[11px] text-[#8554ff] font-medium mt-1 flex items-center gap-1">
                    <span>↑ +48%</span> promo conversions
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-[#f7f7f7] border border-gray-200/70 rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-2 font-medium">
                    <span>AI Replies Dispatched</span>
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold text-[#1a1a1a]">1,842</div>
                  <div className="text-[11px] text-gray-500 font-medium mt-1">
                    Instant Facebook reply rate: 99.4%
                  </div>
                </div>
              </div>

              {/* Live Preview Feed Row */}
              <div className="mt-4 p-4 bg-[#1a1a1a] text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#8554ff] flex items-center justify-center font-bold text-white shrink-0">
                    ✨
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Active Campaign: Pacific Mall Grand Weekend</h4>
                    <p className="text-xs text-gray-400">Targeting Mandaue & Metro Cebu shoppers • 3 creative variants running</p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="bg-white/10 hover:bg-white/20 text-xs font-semibold px-4 py-2 rounded-xl transition border border-white/10 whitespace-nowrap"
                >
                  Enter Control Hub →
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. LOGO TICKER / TRUSTED BY TEAMS
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-[#1a1a1a]/5 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h4 className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-8">
            Trusted by teams everywhere & leading retail brands
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="font-bold text-lg tracking-wider text-gray-800">NIKE RETAIL</span>
            <span className="font-semibold text-lg tracking-tight text-gray-800 font-serif">SEPHORA</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">ZARA CEBU</span>
            <span className="font-medium text-lg tracking-widest text-gray-800">H&M MALL</span>
            <span className="font-bold text-lg tracking-tight text-gray-800">STARBUCKS</span>
            <span className="font-semibold text-lg tracking-wider text-gray-800 font-mono">UNIQLO</span>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. SERVICES SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="services" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="ad-badge mb-4">Services</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
              Services designed to grow{' '}
              <span className="font-serif italic font-normal text-[#8554ff]">your</span> sales
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              From automated creative copy to precision demographic targeting, we handle your multichannel paid media and social outreach seamlessly.
            </p>
          </div>

          {/* 4 Core Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Service 1: Meta Ads */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 font-bold">
                  <Megaphone className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#8554ff] uppercase tracking-wider mb-2">Social Scaling</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Meta Ads (Facebook & IG)</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  We create and optimize Facebook & Instagram campaigns that convert cold community audiences into foot-traffic visitors and loyal mall customers, at scale.
                </p>
              </div>
              <div className="bg-[#f7f7f7] border border-gray-100 rounded-xl p-4 flex items-center justify-between text-xs font-medium text-gray-600">
                <span>Audience Precision & Retargeting</span>
                <span className="text-emerald-600 font-bold">Avg 4.6x ROAS</span>
              </div>
            </div>

            {/* Service 2: Google Ads */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6 font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#8554ff] uppercase tracking-wider mb-2">Intent Search</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">Google Ads & Local SEO</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Reach high-intent Cebu & Mandaue buyers searching for dining spots, electronics, and weekend events through targeted local search and Performance Max.
                </p>
              </div>
              <div className="bg-[#f7f7f7] border border-gray-100 rounded-xl p-4 flex items-center justify-between text-xs font-medium text-gray-600">
                <span>Google Maps & Search Discovery</span>
                <span className="text-emerald-600 font-bold">Top 3 Local Placement</span>
              </div>
            </div>

            {/* Service 3: TikTok Ads & Short Video */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6 font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#8554ff] uppercase tracking-wider mb-2">Viral Velocity</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">TikTok & Reels Production</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  High-performing UGC reels and TikTok creative designed specifically to stop the scroll, showcase tenant promotions, and drive fast retail conversions.
                </p>
              </div>
              <div className="bg-[#f7f7f7] border border-gray-100 rounded-xl p-4 flex items-center justify-between text-xs font-medium text-gray-600">
                <span>Micro-Influencers & Viral UGC</span>
                <span className="text-emerald-600 font-bold">+180% Engagement</span>
              </div>
            </div>

            {/* Service 4: Automated Engagement & CRM */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6 font-bold">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-[#8554ff] uppercase tracking-wider mb-2">Automated Retention</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-3">AI Reply Bot & Lead CRM</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  Turn user comments and direct inquiries into confirmed leads automatically. Connected with Gemini AI for human-in-the-loop customer support.
                </p>
              </div>
              <div className="bg-[#f7f7f7] border border-gray-100 rounded-xl p-4 flex items-center justify-between text-xs font-medium text-gray-600">
                <span>Instant Auto-Reply Integration</span>
                <span className="text-emerald-600 font-bold">&lt; 1 min Response</span>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. METRICS / INSTANT TRUST BANNER (Dark Container)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#1a1a1a] text-white rounded-[32px] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
            {/* Subtle glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#8554ff]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 relative z-10">
              <div className="max-w-md">
                <div className="ad-badge-purple mb-3 bg-[#8554ff]/20 text-purple-300 border-[#8554ff]/30">
                  Build Instant Trust
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Join hundreds of merchant brands scaling with Pacific Mall tools
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Proven ad pipelines designed to keep marketing campaigns synchronized, high-converting, and delivered right on schedule.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full lg:w-auto">
                {/* Metric 1 */}
                <div className="border-l border-white/10 pl-6">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">$5M+</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">In ad spend managed</div>
                </div>

                {/* Metric 2 */}
                <div className="border-l border-white/10 pl-6">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-[#8554ff] mb-1">3.4x</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">Average ROAS across brands</div>
                </div>

                {/* Metric 3 */}
                <div className="border-l border-white/10 pl-6">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-1">4.9 / 5</div>
                  <div className="text-xs uppercase tracking-wider text-gray-400 font-medium">5,000+ Verified reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          6. THE PROCESS SECTION (1 -> 2 -> 3 -> 4)
      ───────────────────────────────────────────────────────────── */}
      <section id="process" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="ad-badge mb-4">The Process</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
              How We <span className="font-serif italic font-normal text-[#8554ff]">Work</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              A clear, efficient four-step process built to scale retail revenue with consistency and profitable store momentum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-6 shadow-sm hover:border-[#8554ff]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#8554ff]/10 text-[#8554ff] font-bold text-sm flex items-center justify-center mb-6">
                01
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">Brand Analysis</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We study your tenant niche, target customer demographics, and competitor promotions to build an airtight growth strategy.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-6 shadow-sm hover:border-[#8554ff]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#8554ff]/10 text-[#8554ff] font-bold text-sm flex items-center justify-center mb-6">
                02
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">Creative Production</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We generate scroll-stopping visuals, copy, and promo carousels using AI and high-converting UGC frameworks.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-6 shadow-sm hover:border-[#8554ff]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#8554ff]/10 text-[#8554ff] font-bold text-sm flex items-center justify-center mb-6">
                03
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">Campaign Launch</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We configure, A/B test, and launch automated campaigns across Facebook, Instagram, Google, and TikTok.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] p-6 shadow-sm hover:border-[#8554ff]/40 transition">
              <div className="w-10 h-10 rounded-full bg-[#8554ff]/10 text-[#8554ff] font-bold text-sm flex items-center justify-center mb-6">
                04
              </div>
              <h4 className="text-lg font-bold text-[#1a1a1a] mb-2">Optimization & Scale</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We monitor performance daily, prune underperforming creatives, and scale winning ad sets with precision budget control.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          7. INTERACTIVE AI CONTENT GENERATOR STUDIO (Live Functional Feature)
      ───────────────────────────────────────────────────────────── */}
      <section id="studio" className="py-20 px-4 sm:px-6 bg-white border-y border-[#1a1a1a]/5">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="ad-badge mb-3">Interactive Studio</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1a1a1a] mb-3">
              Generate Ad Creatives in <span className="font-serif italic font-normal text-[#8554ff]">Seconds</span>
            </h2>
            <p className="text-gray-600 text-sm">
              Type any upcoming Pacific Mall sale, food festival, or tenant launch to generate production-ready copy.
            </p>
          </div>

          <div className="bg-[#f7f7f7] border border-[#1a1a1a]/10 rounded-[28px] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Event or Tenant Promotion Details
                </label>
                <div className="relative">
                  <textarea
                    value={promptTopic}
                    onChange={(e) => setPromptTopic(e.target.value)}
                    placeholder="e.g. 3-Day Weekend Flash Sale at Pacific Mall Mandaue with 50% discounts on apparel and free cinema passes..."
                    rows={4}
                    className="w-full bg-white border border-gray-200 rounded-2xl p-4 text-sm text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8554ff] focus:border-transparent transition resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Sparkles className="w-4 h-4 text-[#8554ff]" />
                  <span>Powered by Gemini & Pacific Mall Ad Templates</span>
                </div>
                <button
                  type="submit"
                  disabled={generating || !promptTopic}
                  className="ad-btn-purple w-full sm:w-auto text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Copy...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Generate Ad Campaign
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Generated Output Preview */}
            {generatedResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8554ff] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Generated Campaign Creative
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generatedResult.caption || JSON.stringify(generatedResult));
                      alert('Copied creative to clipboard!');
                    }}
                    className="text-xs font-medium text-gray-500 hover:text-black transition"
                  >
                    Copy to Clipboard
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-sm text-gray-800 space-y-3">
                  {generatedResult.headline && (
                    <div className="font-bold text-base text-[#1a1a1a]">
                      {generatedResult.headline}
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                    {generatedResult.caption || (typeof generatedResult === 'string' ? generatedResult : JSON.stringify(generatedResult, null, 2))}
                  </p>
                  {generatedResult.hashtags && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {generatedResult.hashtags.map((h: string, idx: number) => (
                        <span key={idx} className="text-xs text-[#8554ff] bg-purple-50 px-2 py-0.5 rounded-full font-medium">
                          {h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    href="/dashboard"
                    className="text-xs font-semibold text-[#8554ff] hover:underline flex items-center gap-1"
                  >
                    Open in Full Content Studio Dashboard →
                  </Link>
                </div>
              </motion.div>
            )}

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          8. TESTIMONIALS SECTION (Quotes Slider)
      ───────────────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="ad-badge mb-4">Testimonials</div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
            What <span className="font-serif italic font-normal text-[#8554ff]">Our Clients</span> Say
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-14">
            Real results. Real retail brands. Real stories from businesses we've helped scale with paid ads.
          </p>

          {/* Testimonial Card */}
          <div className="bg-white border border-[#1a1a1a]/10 rounded-[32px] p-8 sm:p-14 shadow-sm relative">
            <div className="text-4xl text-[#8554ff] font-serif mb-6 leading-none select-none">“</div>
            
            <motion.p
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl sm:text-2xl font-normal text-[#1a1a1a] leading-relaxed mb-8 max-w-2xl mx-auto"
            >
              {testimonials[activeTestimonial].quote}
            </motion.p>

            <div className="flex flex-col items-center">
              <span className="font-bold text-base text-[#1a1a1a]">
                {testimonials[activeTestimonial].name}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {testimonials[activeTestimonial].role} • <span className="text-[#8554ff]">{testimonials[activeTestimonial].brand}</span>
              </span>
            </div>

            {/* Navigation Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeTestimonial === i ? 'bg-[#8554ff] w-6' : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          9. PRICING SECTION (Two Distinct Tiers)
      ───────────────────────────────────────────────────────────── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-white border-y border-[#1a1a1a]/5">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="ad-badge mb-4">Pricing</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
              Plans That <span className="font-serif italic font-normal text-[#8554ff]">Scale</span> Your Brand
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Flexible packages designed to grow your mall business and merchant stores at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Plan 1: Ads Accelerator */}
            <div className="bg-[#f7f7f7] border border-[#1a1a1a]/10 rounded-[28px] p-8 flex flex-col justify-between shadow-sm">
              <div>
                <div className="text-sm font-semibold text-gray-500 mb-2">Starter Package</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Ads Accelerator</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">$1,995</span>
                  <span className="text-sm text-gray-500">/ month</span>
                </div>
                <p className="text-xs text-gray-600 mb-8 leading-relaxed">
                  Everything your retail store needs to launch and scale with paid ads & content.
                </p>

                <div className="space-y-3.5 mb-8">
                  {[
                    "Full Ads Management (Meta, TikTok, Google)",
                    "Campaign Setup, Testing & Optimization",
                    "Retargeting + Scaling Strategy",
                    "Monthly Creative Recommendations",
                    "Cancel or pause anytime"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard"
                className="ad-btn-white w-full text-center text-sm !rounded-xl"
              >
                Get Started
              </Link>
            </div>

            {/* Plan 2: Growth Engine (Featured Purple Card) */}
            <div className="bg-white border-2 border-[#8554ff] rounded-[28px] p-8 flex flex-col justify-between shadow-xl relative">
              <div className="absolute -top-3.5 right-8 bg-[#8554ff] text-white text-[11px] font-bold uppercase tracking-wider py-1 px-3.5 rounded-full shadow-sm">
                Most Popular
              </div>

              <div>
                <div className="text-sm font-semibold text-[#8554ff] mb-2">Full Growth System</div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Growth Engine</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl sm:text-5xl font-bold text-[#1a1a1a]">$2,495</span>
                  <span className="text-sm text-gray-500">/ month</span>
                </div>
                <p className="text-xs text-gray-600 mb-8 leading-relaxed">
                  Comprehensive performance ads, custom UGC video production, and real-time CRM reply automation.
                </p>

                <div className="space-y-3.5 mb-8">
                  {[
                    "Full Ads Management (Meta, TikTok, Snapchat, Google)",
                    "Weekly UGC/Reels for High-Converting Creatives",
                    "Content Creation (Posts, Carousels, Stories)",
                    "Daily Optimization & Aggressive Scaling",
                    "Custom Strategy & Monthly Growth Plan",
                    "Analytics Dashboard + Weekly Live Reporting"
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-[#8554ff] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/dashboard"
                className="ad-btn-purple w-full text-center text-sm !rounded-xl shadow-md"
              >
                Book a Free Audit
              </Link>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          10. CASE STUDIES SECTION
      ───────────────────────────────────────────────────────────── */}
      <section id="case-studies" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="ad-badge mb-4">Case Studies</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
              Proven Results Across <span className="font-serif italic font-normal text-[#8554ff]">Retail</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Explore how we help brands scale foot traffic, ROAS, and customer revenue with data-driven advertising.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Case 1 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="h-44 bg-gradient-to-tr from-purple-700 to-indigo-500 p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full w-max mb-2">
                  Meta + TikTok Ads
                </span>
                <h4 className="text-xl font-bold leading-tight">Pacific Glow Skincare</h4>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Retail Showcase • 2 min read</div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    Scaled monthly tenant revenue from $40k/month to $210k/month in 90 days utilizing targeted UGC reels.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8554ff]">
                  <span>View Case Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Case 2 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="h-44 bg-gradient-to-tr from-blue-700 to-teal-500 p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full w-max mb-2">
                  Google Shopping + Meta
                </span>
                <h4 className="text-xl font-bold leading-tight">Apex Athletic Apparel</h4>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Fashion & Apparel • 3 min read</div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    Boosted store foot-traffic visits by 142% and reached 6-figure monthly sales with location-based remarketing.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8554ff]">
                  <span>View Case Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Case 3 */}
            <div className="bg-white border border-[#1a1a1a]/10 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
              <div className="h-44 bg-gradient-to-tr from-amber-600 to-rose-500 p-6 flex flex-col justify-end text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full w-max mb-2">
                  All Platforms + CRM
                </span>
                <h4 className="text-xl font-bold leading-tight">Savory Bistro & Cafe</h4>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-2">Food & Dining • 2 min read</div>
                  <p className="text-xs text-gray-700 leading-relaxed mb-4">
                    Turned around declining weekday covers in 45 days with automated lead reply bots and geo-fenced promo discounts.
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-[#8554ff]">
                  <span>View Case Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          11. FAQS SECTION (Expandable Accordion)
      ───────────────────────────────────────────────────────────── */}
      <section id="faqs" className="py-24 px-4 sm:px-6 bg-white border-y border-[#1a1a1a]/5">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="ad-badge mb-4">FAQs</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a] mb-4">
              Frequently Asked <span className="font-serif italic font-normal text-[#8554ff]">Questions</span>
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Everything you need to know about working with us and how we scale retail brands with paid advertising.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="bg-[#f7f7f7] border border-[#1a1a1a]/10 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1a1a1a] hover:text-[#8554ff] transition"
                  >
                    <span>{faq.question}</span>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#8554ff] text-white flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          12. READY TO SCALE YOUR BRAND (Bottom CTA Card)
      ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a1a1a] text-white rounded-[32px] p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Background lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#8554ff]/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
                Ready to Scale Your{' '}
                <span className="font-serif italic font-normal text-[#8554ff]">Brand?</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
                Let's run high-performing ads and automated content engines that bring you real customers and measurable revenue growth.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link
                  href="/dashboard"
                  className="ad-btn-purple w-full sm:w-auto text-sm !py-3.5 !px-8 shadow-md"
                >
                  Enter Marketing Dashboard
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
                <a
                  href="#studio"
                  className="ad-btn-white w-full sm:w-auto text-sm !py-3.5 !px-8 !bg-white/10 !text-white !border-white/10 hover:!bg-white/20"
                >
                  Test Free Generation
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          13. FOOTER & NEWSLETTER
      ───────────────────────────────────────────────────────────── */}
      <footer className="pt-16 pb-12 px-4 sm:px-6 bg-white border-t border-[#1a1a1a]/5 text-xs text-gray-500">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Newsletter Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-12 border-b border-gray-100 gap-6">
            <div>
              <h5 className="text-base font-bold text-[#1a1a1a] mb-1">Subscribe to our Newsletter</h5>
              <p className="text-xs text-gray-500">Get retail marketing tips, ad frameworks & AI prompt recipes straight to your inbox.</p>
            </div>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) {
                  setSubscribed(true);
                  setEmail('');
                }
              }}
              className="flex w-full md:w-auto gap-2"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="bg-[#f7f7f7] border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#8554ff] w-full md:w-64"
              />
              <button
                type="submit"
                className="ad-btn-purple !py-2.5 !px-5 !text-xs !rounded-xl whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Links & Brand Row */}
          <div className="py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8554ff] flex items-center justify-center text-white font-bold text-xs">
                P
              </div>
              <div>
                <div className="font-bold text-[#1a1a1a] text-sm tracking-tight">AdScale • Pacific Mall</div>
                <div className="text-[11px] text-gray-400">© 2026 Pacific Mall Marketing Tool. All rights reserved.</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-gray-600 font-medium">
              <a href="#services" className="hover:text-[#8554ff] transition">Services</a>
              <a href="#process" className="hover:text-[#8554ff] transition">Process</a>
              <a href="#pricing" className="hover:text-[#8554ff] transition">Pricing</a>
              <a href="#case-studies" className="hover:text-[#8554ff] transition">Case Studies</a>
              <a href="#faqs" className="hover:text-[#8554ff] transition">FAQs</a>
              <Link href="/dashboard" className="text-[#8554ff] font-semibold hover:underline">Control Dashboard</Link>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
            <span>Built with precision matching the AdScale Framer design system.</span>
            <div className="flex gap-4">
              <span className="hover:text-gray-600 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-600 cursor-pointer">Terms & Conditions</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
