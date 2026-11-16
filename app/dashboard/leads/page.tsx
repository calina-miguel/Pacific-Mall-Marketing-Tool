'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, Mail, Phone, Calendar, ArrowRight, UserCheck } from 'lucide-react';

const DEMO_LEADS = [
  { id: '1', name: 'Maria Santos', interaction_type: 'comment_replied', last_contacted: new Date().toISOString() },
  { id: '2', name: 'Juan Dela Cruz', interaction_type: 'promo_inquiry', last_contacted: new Date(Date.now() - 86400000).toISOString() },
  { id: '3', name: 'Angela Reyes', interaction_type: 'event_rsvp', last_contacted: new Date(Date.now() - 172800000).toISOString() },
];

export default function LeadsPage() {
  const [leads, setLeads] = useState<any[]>(DEMO_LEADS);

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

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="ad-badge mb-3">Customer Intelligence</div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#1a1a1a]">
          Lead CRM & <span className="font-serif italic font-normal text-[#8554ff]">Contacts</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Automate customer retention, promo invitations, and direct outreach for Pacific Mall Mandaue.
        </p>
      </header>

      {/* CRM Table in AdScale Card */}
      <div className="adscale-card overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </span>
            <span className="font-bold text-sm text-[#1a1a1a]">Captured Mall Shoppers</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
            {leads.length} Active Leads
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#f7f7f7] text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-100">
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
                      <div className="w-9 h-9 rounded-full bg-purple-50 text-[#8554ff] font-bold text-xs flex items-center justify-center border border-purple-100">
                        {lead.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-gray-900">{lead.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-purple-50 text-[#8554ff] border border-purple-100 text-xs font-semibold px-3 py-1 rounded-full">
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
                      onClick={() => alert(`Sending promotional voucher to ${lead.name}`)}
                      className="ad-btn-purple !py-1.5 !px-3.5 !text-xs !rounded-full"
                    >
                      Send Promo DM
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
