import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { content, imageUrl, scheduledFor } = await req.json();

  const { data, error } = await supabase
    .from('scheduled_posts')
    .insert([{ content, image_url: imageUrl, scheduled_for: scheduledFor }]);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
