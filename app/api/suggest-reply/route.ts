import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { comment } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey || apiKey === 'your_actual_api_key_here') {
      let demoReply = `Hi there! Thank you for reaching out to Pacific Mall Mandaue! 🛍️ We're open daily from 10:00 AM to 8:00 PM. Feel free to message us for more details!`;
      if (comment?.toLowerCase().includes('promo') || comment?.toLowerCase().includes('off')) {
        demoReply = `Hello! Yes! Our special promos apply to participating stores including the department store and major outlets. Visit us today to check out all the amazing deals! 🎉`;
      } else if (comment?.toLowerCase().includes('park')) {
        demoReply = `Hi! Yes, we have spacious parking areas available for all our valued shoppers. We look forward to seeing you at Pacific Mall Mandaue! 🚗`;
      }
      return NextResponse.json({ reply: demoReply });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a professional social media manager for "Pacific Mall Mandaue".
      The customer said: "${comment}"
      
      Generate a short, friendly, and helpful response. 
      If the customer is asking about mall hours, promo details, or location, 
      provide a polite reply and invite them to check the page pinned posts or send a DM.
      Keep it under 3 sentences.
    `;

    const result = await model.generateContent(prompt);
    return NextResponse.json({ reply: result.response.text().trim() });
  } catch (error) {
    console.error("Error generating suggested reply:", error);
    return NextResponse.json({ reply: "Hi! Thank you for contacting Pacific Mall Mandaue. Please send us a direct message for further assistance!" });
  }
}
