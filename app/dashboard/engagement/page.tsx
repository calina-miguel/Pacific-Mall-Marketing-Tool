'use client';
import { useEffect, useState } from 'react';

export default function EngagementDashboard() {
  const [comments, setComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch('/api/engagements')
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  const suggestReply = async (commentId: string, commentText: string) => {
    setLoading(prev => ({ ...prev, [commentId]: true }));
    
    const res = await fetch('/api/suggest-reply', {
      method: 'POST',
      body: JSON.stringify({ comment: commentText }),
    });
    
    const data = await res.json();
    setReplies(prev => ({ ...prev, [commentId]: data.reply }));
    setLoading(prev => ({ ...prev, [commentId]: false }));
  };

  const approveAndSend = async (commentId: string, replyText: string, userDetails: any) => {
    const res = await fetch('/api/post-reply', {
      method: 'POST',
      body: JSON.stringify({ commentId, replyText, userDetails }),
    });
    
    const data = await res.json();
    if (data.success) {
      alert("Reply posted successfully!");
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Inbox: Customer Interactions</h2>
      <div className="space-y-4">
        {comments.map((item: any) => (
          <div key={item.id} className="p-4 border rounded bg-white shadow-sm">
            <p className="font-semibold">{item.from?.name || "Customer"}</p>
            <p className="text-gray-700">{item.message}</p>
            
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => suggestReply(item.id, item.message)}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
              >
                {loading[item.id] ? "Generating..." : "Suggest Reply"}
              </button>
            </div>

            {replies[item.id] && (
              <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded text-sm">
                <p className="font-bold text-blue-800">Suggested Response:</p>
                <p>{replies[item.id]}</p>
                <button 
                  onClick={() => approveAndSend(item.id, replies[item.id], item.from)}
                  className="mt-2 text-blue-600 font-bold hover:underline"
                >
                  Approve & Send
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
