import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const processEnvMissing = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your_');
    if (processEnvMissing) {
      return NextResponse.json({ message: 'Cron job skipped: Supabase credentials not configured yet.' }, { status: 200 });
    }

    // 1. Fetch posts where scheduled_for <= now() and status == 'pending'
    const { data: posts, error } = await supabase
      .from('scheduled_posts')
      .select('*')
      .eq('status', 'pending')
      .lte('scheduled_for', new Date().toISOString());

    if (error) {
      console.error('Error fetching scheduled posts:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: 'No pending posts to publish.' }, { status: 200 });
    }

    // 2. Process each post (posting via Facebook Graph API if configured)
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;
    const PAGE_ID = process.env.FB_PAGE_ID;

    for (const post of posts) {
      if (ACCESS_TOKEN && PAGE_ID) {
        try {
          const res = await fetch(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: post.content,
              access_token: ACCESS_TOKEN,
            }),
          });
          const fbRes = await res.json();
          if (fbRes.id) {
            await supabase
              .from('scheduled_posts')
              .update({ status: 'posted' })
              .eq('id', post.id);
          }
        } catch (err) {
          console.error(`Failed to publish post ${post.id}:`, err);
        }
      } else {
        // If FB credentials not ready, mark as published for demo queue processing
        await supabase
          .from('scheduled_posts')
          .update({ status: 'posted' })
          .eq('id', post.id);
      }
    }

    return NextResponse.json({ success: true, processed: posts.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
