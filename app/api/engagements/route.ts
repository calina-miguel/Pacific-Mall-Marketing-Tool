import { NextResponse } from 'next/server';

export async function GET() {
  const PAGE_ID = process.env.FB_PAGE_ID;
  const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

  if (!PAGE_ID || !ACCESS_TOKEN || ACCESS_TOKEN.includes('your_')) {
    // Return sample demo comments for testing before Meta Graph API is connected
    return NextResponse.json([
      {
        id: "demo_comment_1",
        message: "Hi! What are your opening hours for this upcoming holiday weekend?",
        from: { id: "user_101", name: "Maria Santos" }
      },
      {
        id: "demo_comment_2",
        message: "Is the 50% off promo available at the appliance center as well?",
        from: { id: "user_102", name: "Juan Dela Cruz" }
      },
      {
        id: "demo_comment_3",
        message: "Do you have free parking available during mall sale events?",
        from: { id: "user_103", name: "Angela Reyes" }
      }
    ]);
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/feed?fields=comments{message,from,id}&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data.data || []);
  } catch (error) {
    console.error("Error fetching Facebook comments:", error);
    return NextResponse.json([]);
  }
}
