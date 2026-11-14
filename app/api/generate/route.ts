import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, context } = await req.json();

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    if (!apiKey || apiKey === 'your_actual_api_key_here') {
      // Fallback demo content when API key is not yet set up
      return NextResponse.json({
        variations: [
          {
            content: `🛍️ Big news at Pacific Mall Mandaue! 🎉\n\nAre you ready for the ultimate experience? ${topic || 'Grand Shopping Event'} is finally here! Bring your family and friends for exclusive deals, delicious dining, and great vibes.\n\n📍 Visit us today at Pacific Mall Mandaue!\n\n#PacificMallMandaue #MandaueShopping #CebuPromos #MallSale #CebuLife #ShopMandaue`,
          },
          {
            content: `✨ Exciting updates coming your way! 🛍️\n\nPacific Mall Mandaue presents: ${topic || 'Weekend Extravaganza'}. Don't miss out on special discounts, family fun, and trendy finds.\n\n👉 Tag a friend you're coming with below!\n\n#PacificMall #MandaueCity #ShoppingMall #CebuEvents #WeekendVibes #DiscountsPh`,
          },
          {
            content: `🔥 Highlight of the Week at Pacific Mall Mandaue! 🏬\n\nExperience the best in shopping, food, and entertainment with ${topic || 'our latest offerings'}. Quality, convenience, and fun all under one roof!\n\n🕒 Open daily! See you at Pacific Mall!\n\n#PacificMallMandaue #CebuMall #MandauePromos #ShopLocalCebu #MallDeals #CebuShopping`,
          }
        ]
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a social media expert for "Pacific Mall Mandaue".
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
