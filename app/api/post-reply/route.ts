import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; 

export async function POST(req: Request) {
  try {
    const { commentId, replyText, userDetails } = await req.json();
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

    if (ACCESS_TOKEN && !ACCESS_TOKEN.includes('your_')) {
      const url = `https://graph.facebook.com/v21.0/${commentId}/comments`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: replyText, access_token: ACCESS_TOKEN }),
      });
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error.message);
      }
    }

    // Save lead if Supabase is configured
    if (userDetails) {
      try {
        await supabase.from('leads').upsert([
          { 
            fb_user_id: userDetails.id || `user_${Date.now()}`, 
            name: userDetails.name || 'Anonymous Customer', 
            interaction_type: 'comment_replied',
            last_contacted: new Date().toISOString()
          }
        ], { onConflict: 'fb_user_id' });
      } catch (dbErr) {
        console.log("Supabase lead save skipped or error:", dbErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
