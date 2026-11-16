'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Zap, 
  Copy, 
  Paperclip, 
  Image as ImageIcon, 
  Film, 
  X, 
  Send, 
  Calendar as CalendarIcon,
  Facebook, 
  Instagram, 
  Globe, 
  Check, 
  Plus, 
  Settings, 
  Radio
} from 'lucide-react';
import Link from 'next/link';

interface AttachedMedia {
  id: string;
  name: string;
  size: string;
  url: string;
  type: 'image' | 'video';
}

interface SocialAccount {
  id: string;
  platform: 'facebook' | 'instagram' | 'tiktok' | 'google';
  name: string;
  handle: string;
  connected: boolean;
  followers: string;
  avatar: string;
  selected: boolean;
}

const DEFAULT_ACCOUNTS: SocialAccount[] = [
  {
    id: 'fb-1',
    platform: 'facebook',
    name: 'Pacific Mall Mandaue',
    handle: '@PMMandaueofficial',
    connected: true,
    followers: '142K Followers',
    avatar: 'https://graph.facebook.com/PMMandaueofficial/picture?type=large',
    selected: true,
  },
  {
    id: 'ig-1',
    platform: 'instagram',
    name: 'Pacific Mall Mandaue',
    handle: '@pacificmallmandaue',
    connected: true,
    followers: '38.5K Followers',
    avatar: 'https://graph.facebook.com/PMMandaueofficial/picture?type=large',
    selected: true,
  },
  {
    id: 'tt-1',
    platform: 'tiktok',
    name: 'Pacific Mall Cebu',
    handle: '@pacificmall_official',
    connected: true,
    followers: '19.4K Followers',
    avatar: 'https://graph.facebook.com/PMMandaueofficial/picture?type=large',
    selected: false,
  },
  {
    id: 'gb-1',
    platform: 'google',
    name: 'Pacific Mall Mandaue',
    handle: 'Google Business Profile',
    connected: true,
    followers: '4.8 ★ (1,420 Reviews)',
    avatar: 'https://graph.facebook.com/PMMandaueofficial/picture?type=large',
    selected: true,
  },
];

export default function Dashboard() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedResult, setGeneratedResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  
  // Media Attachment State
  const [attachedMedia, setAttachedMedia] = useState<AttachedMedia[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Social Media Accounts State
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>(DEFAULT_ACCOUNTS);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);

  // Load saved accounts state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pm_connected_social_accounts');
      if (saved) {
        setSocialAccounts(JSON.parse(saved));
      }
    } catch {
      // Fallback to default
    }
  }, []);

  const saveAccounts = (newAccounts: SocialAccount[]) => {
    setSocialAccounts(newAccounts);
    try {
      localStorage.setItem('pm_connected_social_accounts', JSON.stringify(newAccounts));
    } catch {
      // Ignore
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newMedia: AttachedMedia[] = Array.from(files).map((file) => {
      const isVideo = file.type.startsWith('video');
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        size: `${sizeMB} MB`,
        url: URL.createObjectURL(file),
        type: isVideo ? 'video' : 'image',
      };
    });

    setAttachedMedia((prev) => [...prev, ...newMedia]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveMedia = (id: string) => {
    setAttachedMedia((prev) => prev.filter((m) => m.id !== id));
  };

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
    const text = generatedResult?.caption || topic || "Pacific Mall Mandaue campaign copy";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAccountSelection = (id: string) => {
    const updated = socialAccounts.map((acc) => 
      acc.id === id ? { ...acc, selected: !acc.selected } : acc
    );
    saveAccounts(updated);
  };

  const toggleAccountConnection = (id: string) => {
    const updated = socialAccounts.map((acc) => 
      acc.id === id ? { ...acc, connected: !acc.connected, selected: !acc.connected } : acc
    );
    saveAccounts(updated);
  };

  const handlePublishNow = async () => {
    const selectedCount = socialAccounts.filter((a) => a.connected && a.selected).length;
    if (selectedCount === 0) {
      alert('Please select at least one connected social account to publish to.');
      return;
    }

    setPublishing(true);
    // Simulate real multi-platform distribution
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPublishing(false);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4500);
  };

  const handleSchedulePost = async () => {
    const content = generatedResult?.caption || topic || 'Weekend Shopping Promo at Pacific Mall Mandaue';
    try {
      await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          imageUrl: attachedMedia[0]?.url || 'https://graph.facebook.com/PMMandaueofficial/picture?type=large',
          scheduledFor: new Date(Date.now() + 86400000).toISOString(),
        }),
      });
      alert('Campaign successfully scheduled to your Content Calendar!');
    } catch {
      alert('Campaign queued to Pacific Mall Marketing Calendar!');
    }
  };

  const selectedAccountsCount = socialAccounts.filter((a) => a.connected && a.selected).length;

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

      {/* Bento Grid Layout - Fully Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        
        {/* ============================================================ */}
        {/* NEW CONTENT PIPELINE (Span 8 on desktop, full width mobile)   */}
        {/* ============================================================ */}
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

            {/* Campaign Prompt Textarea */}
            <textarea 
              className="w-full bg-[#f7f6fa] border border-[#321c65]/10 rounded-2xl p-3.5 sm:p-4 text-sm sm:text-base font-light placeholder:text-gray-400 min-h-[110px] sm:min-h-[130px] outline-none focus:ring-2 focus:ring-[#321c65] focus:border-transparent transition resize-none"
              placeholder="Describe your next mall event, weekend sale, or tenant launch..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            {/* Hidden File Input for Media Attachments */}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*,video/*"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Media Attachment Action Bar */}
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f7f6fa] hover:bg-purple-50 border border-[#321c65]/15 hover:border-[#b60090]/40 text-xs font-semibold text-[#321c65] hover:text-[#b60090] transition shadow-xs group"
                >
                  <Paperclip className="w-3.5 h-3.5 text-[#b60090] group-hover:rotate-45 transition-transform" />
                  <span>Attach Media</span>
                </button>
                <span className="text-[11px] text-gray-400">
                  Upload images, promo posters, or reels
                </span>
              </div>

              {attachedMedia.length > 0 && (
                <span className="text-[11px] font-semibold text-[#b60090] bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                  {attachedMedia.length} {attachedMedia.length === 1 ? 'file' : 'files'} attached
                </span>
              )}
            </div>

            {/* Attached Media Previews Strip */}
            {attachedMedia.length > 0 && (
              <div className="mt-3 p-3 bg-[#f7f6fa] rounded-2xl border border-gray-100 flex flex-wrap gap-2.5 items-center">
                {attachedMedia.map((media) => (
                  <div 
                    key={media.id} 
                    className="relative group bg-white border border-[#321c65]/15 rounded-xl p-1.5 flex items-center gap-2 pr-2.5 shadow-xs"
                  >
                    {media.type === 'image' ? (
                      <img 
                        src={media.url} 
                        alt={media.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-gray-100 shrink-0" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#321c65] shrink-0">
                        <Film className="w-5 h-5 text-[#b60090]" />
                      </div>
                    )}
                    <div className="max-w-[120px] sm:max-w-[150px] truncate">
                      <p className="text-xs font-medium text-gray-800 truncate">{media.name}</p>
                      <p className="text-[10px] text-gray-400">{media.size}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedia(media.id)}
                      className="p-1 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-10 px-3 rounded-xl border border-dashed border-[#321c65]/30 hover:border-[#b60090] text-xs font-semibold text-gray-500 hover:text-[#b60090] flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add More</span>
                </button>
              </div>
            )}
          </div>

          {/* Action Row */}
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

          {/* ========================================================== */}
          {/* SOCIAL CAMPAIGN PREVIEW & ATTACHED MEDIA MOCKUP            */}
          {/* ========================================================== */}
          <div className="mt-6 p-4 sm:p-6 bg-[#f7f6fa]/60 border border-[#321c65]/15 rounded-2xl shadow-xs">
            {/* Preview Header */}
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-gray-200">
              <div className="flex items-center gap-2.5">
                <img
                  src="https://graph.facebook.com/PMMandaueofficial/picture?type=large"
                  alt="Pacific Mall"
                  className="w-9 h-9 rounded-xl object-cover border border-[#321c65]/15"
                />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-[#1a1429]">Pacific Mall Mandaue</h4>
                  <p className="text-[10px] text-gray-400">Social Campaign Live Preview • Just now</p>
                </div>
              </div>
              <button
                onClick={handleCopy}
                className="text-xs text-[#321c65] hover:text-[#b60090] font-semibold transition flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#321c65]/10 shadow-xs"
              >
                <Copy className="w-3 h-3" />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Caption Text (Generated or Prompt or Placeholder) */}
            <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed mb-4">
              {generatedResult?.caption 
                ? (typeof generatedResult.caption === 'string' ? generatedResult.caption : JSON.stringify(generatedResult.caption))
                : topic 
                ? `🛍️ ${topic}\n\nStay tuned for exclusive updates, tenant deals, and weekend promotions at Pacific Mall Mandaue!\n\n#PacificMall #MandaueShopping #CebuDeals`
                : "🛍️ Your generated campaign copy, hashtags, and attached media will preview here in real time. Type your topic above and click Launch Generation."
              }
            </p>

            {/* Attached Media in Post Mockup */}
            {attachedMedia.length > 0 && (
              <div className="mb-4 rounded-xl overflow-hidden border border-gray-200 bg-white">
                <div className={`grid gap-1.5 ${attachedMedia.length === 1 ? 'grid-cols-1' : attachedMedia.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                  {attachedMedia.map((m) => (
                    <div key={m.id} className="relative aspect-video sm:aspect-square bg-black/5 overflow-hidden">
                      {m.type === 'image' ? (
                        <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-white p-2">
                          <Film className="w-8 h-8 text-[#b60090] mb-1" />
                          <span className="text-[11px] truncate max-w-full text-center">{m.name}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* SOCIAL MEDIA ONE-STOP LOGGED-IN / PUBLISHING COMMAND BAR */}
            {/* ======================================================== */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-[#26aa00] animate-pulse" />
                  <h5 className="font-bold text-xs sm:text-sm text-[#1a1429]">
                    Connected Social Channels
                  </h5>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAccountModal(true)}
                  className="self-start sm:self-auto text-[11px] font-semibold text-[#321c65] hover:text-[#b60090] flex items-center gap-1 transition"
                >
                  <Settings className="w-3 h-3" />
                  <span>Manage Accounts</span>
                </button>
              </div>

              {/* Connected Account Chips Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {socialAccounts.map((account) => {
                  const isSelected = account.connected && account.selected;
                  return (
                    <div
                      key={account.id}
                      onClick={() => account.connected && toggleAccountSelection(account.id)}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-2 cursor-pointer ${
                        !account.connected
                          ? 'bg-white border-dashed border-gray-200 opacity-60'
                          : isSelected
                          ? 'bg-purple-50/70 border-[#321c65]/30 shadow-xs'
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Platform Icon Badge */}
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-white shadow-xs">
                          {account.platform === 'facebook' && (
                            <div className="w-full h-full rounded-lg bg-[#1877F2] flex items-center justify-center">
                              <Facebook className="w-4 h-4" />
                            </div>
                          )}
                          {account.platform === 'instagram' && (
                            <div className="w-full h-full rounded-lg bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#C13584] flex items-center justify-center">
                              <Instagram className="w-4 h-4" />
                            </div>
                          )}
                          {account.platform === 'tiktok' && (
                            <div className="w-full h-full rounded-lg bg-black flex items-center justify-center text-[10px] font-black tracking-tighter">
                              TT
                            </div>
                          )}
                          {account.platform === 'google' && (
                            <div className="w-full h-full rounded-lg bg-[#4285F4] flex items-center justify-center">
                              <Globe className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold text-xs text-gray-900 truncate leading-tight">
                            {account.name}
                          </p>
                          <p className="text-[10px] text-gray-500 truncate">
                            {account.connected ? account.followers : 'Disconnected'}
                          </p>
                        </div>
                      </div>

                      {/* Status / Checkbox */}
                      <div>
                        {account.connected ? (
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-[#321c65] text-white' : 'border border-gray-300 bg-white'
                          }`}>
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAccountConnection(account.id);
                            }}
                            className="text-[10px] font-bold text-[#321c65] hover:text-[#b60090] underline"
                          >
                            Login
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 1-Click Multi-Channel Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                <span className="text-[11px] text-gray-500 text-center sm:text-left">
                  {selectedAccountsCount > 0 ? (
                    <>
                      Publishing to <strong className="text-[#321c65]">{selectedAccountsCount}</strong> selected {selectedAccountsCount === 1 ? 'channel' : 'channels'}
                    </>
                  ) : (
                    <span className="text-amber-600 font-medium">No channels selected</span>
                  )}
                </span>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSchedulePost}
                    className="ad-btn-white text-xs !py-2.5 !px-4 flex items-center justify-center gap-1.5"
                  >
                    <CalendarIcon className="w-3.5 h-3.5 text-[#321c65]" />
                    <span>Schedule Campaign</span>
                  </button>

                  <button
                    type="button"
                    disabled={publishing || selectedAccountsCount === 0}
                    onClick={handlePublishNow}
                    className="ad-btn-magenta text-xs !py-2.5 !px-5 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {publishing ? (
                      <span>Publishing to Channels...</span>
                    ) : publishSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-white" />
                        <span>Published Successfully!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5 text-white" />
                        <span>1-Click Publish Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Success Banner */}
              <AnimatePresence>
                {publishSuccess && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-[#26aa00]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#26aa00] shrink-0" />
                    <span>Campaign dispatched live to selected official Pacific Mall social channels!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ============================================================ */}
        {/* ENGAGEMENT BOX (Span 4 on desktop, full width mobile)        */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* LEAD CRM BOX (Span 6 on desktop, full width mobile)         */}
        {/* ============================================================ */}
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

        {/* ============================================================ */}
        {/* CALENDAR QUICK GLANCE (Span 6 on desktop, full width mobile) */}
        {/* ============================================================ */}
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

      {/* ============================================================ */}
      {/* SOCIAL ACCOUNTS MANAGEMENT MODAL                             */}
      {/* ============================================================ */}
      {showAccountModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-[#321c65]/15 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAccountModal(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-[#f7f6fa] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 text-[#321c65] flex items-center justify-center font-bold">
                <Globe className="w-5 h-5 text-[#321c65]" />
              </div>
              <div>
                <h3 className="font-bold text-base text-[#1a1429]">Social Media Accounts</h3>
                <p className="text-xs text-gray-400">Connect & manage official Pacific Mall channels</p>
              </div>
            </div>

            <div className="space-y-3 my-5">
              {socialAccounts.map((account) => (
                <div 
                  key={account.id} 
                  className="p-3.5 rounded-2xl bg-[#f7f6fa] border border-gray-100 flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img 
                      src={account.avatar} 
                      alt={account.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-gray-200 shrink-0" 
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-xs sm:text-sm text-gray-900 truncate">{account.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{account.handle}</p>
                      <span className={`inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded ${
                        account.connected ? 'bg-green-100 text-[#26aa00]' : 'bg-gray-200 text-gray-500'
                      }`}>
                        {account.connected ? 'ACTIVE' : 'DISCONNECTED'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleAccountConnection(account.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                      account.connected
                        ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200'
                        : 'bg-[#321c65] text-white hover:bg-[#b60090] shadow-xs'
                    }`}
                  >
                    {account.connected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setShowAccountModal(false)}
                className="ad-btn-purple text-xs !py-2.5 !px-5"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
