'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

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
        const { data, error } = await supabase.from('leads').select('*');
        if (data && data.length > 0) setLeads(data);
      } catch (err) {
        console.log('Using default demo leads array');
      }
    }
    fetchLeads();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Lead CRM & Customer Contacts</h2>
      <p className="text-gray-600 mb-6">Automate your customer retention and direct outreach for Pacific Mall Mandaue.</p>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white border-b">
              <th className="p-4 font-semibold">Customer Name</th>
              <th className="p-4 font-semibold">Interaction Type</th>
              <th className="p-4 font-semibold">Last Contact Date</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-900">{lead.name}</td>
                <td className="p-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {lead.interaction_type}
                  </span>
                </td>
                <td className="p-4 text-gray-600">
                  {new Date(lead.last_contacted || lead.created_at || Date.now()).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs">
                    Send Promo DM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
