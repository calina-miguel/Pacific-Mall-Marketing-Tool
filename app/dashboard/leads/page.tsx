'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Send, Check } from 'lucide-react';

const DEMO_LEADS = [
  { id: '1', name: 'Maria Santos', interaction_type: 'comment_replied', last_contacted: new Date().toISOString() },
  { id: '2', name: 'Juan Dela Cruz', interaction_type: 'promo_inquiry', last_contacted: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', name: 'Angela Reyes', interaction_type: 'event_rsvp', last_contacted: new Date(Date.now() - 172800000).toISOString() },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>(DEMO_LEADS);
  const [sentLeadId, setSentLeadId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const { data } = await supabase.from('leads').select('*');
        if (data && data.length > 0) setLeads(data);
      } catch {
        console.log('Using default demo leads array');
      }
    }
    fetchLeads();
  }, []);

  const handleSendPromo = (lead: any) => {
    setSentLeadId(lead.id);
    alert(`Sending promotional voucher DM to ${lead.name}`);
    setTimeout(() => setSentLeadId(null), 2500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-6 sm:mb-8">
        <div className="ad-badge mb-2 sm:mb-3">Customer Intelligence</div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1a1429]">
          Lead CRM & <span className="font-serif italic font-normal text-[#321c65]">Contacts</span>
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mt-1 sm:mt-2">
          Automate customer retention, promo invitations, and direct outreach for Pacific Mall Mandaue.
        </p>
      </header>

      {/* CRM Card Container */}
      <div className="adscale-card overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-purple-50 text-[#321c65] flex items-center justify-center font-bold shrink-0">
              <Users className="w-4 h-4 text-[#b60090]" />
            </span>
            <span className="font-bold text-xs sm:text-sm text-[#1a1429]">Captured Mall Shoppers</span>
          </div>
          <span className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 bg-purple-50 text-[#321c65] border border-purple-100 rounded-full">
            {leads.length} Active Leads
          </span>
        </div>

        {/* ========================================================= */}
        {/* MOBILE VIEW (< sm): Stacked Touch-Friendly Lead Cards    */}
        {/* ========================================================= */}
        <div className="block sm:hidden divide-y divide-gray-100">
          {leads.map((lead) => (
            <div key={lead.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-[#321c65] font-bold text-xs flex items-center justify-center border border-purple-200 shrink-0">
                    {lead.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <span className="font-bold text-sm text-gray-900 block">{lead.name}</span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(lead.last_contacted || lead.created_at || Date.now()).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <span className="bg-pink-50 text-[#b60090] border border-pink-100 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shrink-0">
                  {lead.interaction_type}
                </span>
              </div>

              <button
                onClick={() => handleSendPromo(lead)}
                className="ad-btn-purple w-full !py-2 !text-xs !rounded-xl flex items-center justify-center gap-1.5"
              >
                {sentLeadId === lead.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Sent!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Promo DM</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* TABLET / DESKTOP VIEW (>= sm): Full Data Table            */}
        {/* ========================================================= */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#f7f6fa] text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
                <th className="py-4 px-6">Customer Name</th>
                <th className="py-4 px-6">Interaction Type</th>
                <th className="py-4 px-6">Last Contact Date</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-purple-100 text-[#321c65] font-bold text-xs flex items-center justify-center border border-purple-200">
                        {lead.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-gray-900">{lead.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-pink-50 text-[#b60090] border border-pink-100 text-xs font-semibold px-3 py-1 rounded-full">
                      {lead.interaction_type}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-500 text-xs font-mono">
                    {new Date(lead.last_contacted || lead.created_at || Date.now()).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleSendPromo(lead)}
                      className="ad-btn-purple !py-1.5 !px-3.5 !text-xs !rounded-full inline-flex items-center gap-1.5"
                    >
                      {sentLeadId === lead.id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Sent</span>
                        </>
                      ) : (
                        <span>Send Promo DM</span>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
