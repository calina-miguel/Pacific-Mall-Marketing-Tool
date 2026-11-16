// app/api/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { topic, context } = await req.json();

    // 1. Fetch recent successful posts for style reference (if FB credentials exist)
    let styleReferences = "Polite, community-focused, and retail-oriented.";
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

    if (PAGE_ID && ACCESS_TOKEN && !ACCESS_TOKEN.includes('your_')) {
      try {
        const response = await fetch(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed?limit=3&access_token=${ACCESS_TOKEN}`);
        const data = await response.json();
        styleReferences = data.data.map((post: any) => post.message).join(' | ');
      } catch (err) {
        console.error("Could not fetch style references:", err);
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a social media expert for "Pacific Mall Mandaue".
      
      Your writing style should emulate these recent successful posts:
      "${styleReferences}"
      
      Topic: ${topic}
      Context: ${context}
      
      Generate 3 distinct social media post variations. Each variation must include:
      1. Engaging hook.
      2. Main body content.
      3. A list of 5-7 trending, relevant hashtags for the Philippine mall retail context.
      4. A call to action.
      
      Return the output as a clean JSON object with an array called "variations".
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();
    
    return NextResponse.json(JSON.parse(cleanJson));
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}
