// app/api/generate/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, context } = await req.json();
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // Graceful fallback if no API key is provided
    if (!apiKey || apiKey.includes("your_") || apiKey.trim() === "") {
      const fallbackVariations = [
        {
          hook: `🛍️ Big news for shoppers in Mandaue!`,
          body: `Don't miss out on ${topic || "our latest seasonal promotions"} at Pacific Mall Mandaue! Explore exclusive merchant discounts, mouthwatering dining options, and fun entertainment for the whole family.`,
          hashtags: ["#PacificMall", "#MandaueShopping", "#CebuPromos", "#MallDeals", "#WeekendVibes"],
          call_to_action: "Visit Pacific Mall Mandaue today and discover the best deals in town!",
          caption: `🛍️ Big news for shoppers in Mandaue!\n\nDon't miss out on ${topic || "our latest seasonal promotions"} at Pacific Mall Mandaue! Explore exclusive merchant discounts, mouthwatering dining options, and fun entertainment for the whole family.\n\n👉 Visit Pacific Mall Mandaue today and discover the best deals in town!\n\n#PacificMall #MandaueShopping #CebuPromos #MallDeals #WeekendVibes`
        },
        {
          hook: `✨ Your favorite shopping destination is ready for you!`,
          body: `Elevate your shopping day at Pacific Mall! Discover ${topic || "special weekend highlights, store sales, and fresh flavors"}. Bring family and friends for a complete lifestyle and dining experience.`,
          hashtags: ["#PacificMallMandaue", "#ShopMandaue", "#WeekendShopping", "#CebuEats", "#RetailTherapy"],
          call_to_action: "Head over to Pacific Mall and tag us in your mall moments!",
          caption: `✨ Your favorite shopping destination is ready for you!\n\nElevate your shopping day at Pacific Mall! Discover ${topic || "special weekend highlights, store sales, and fresh flavors"}. Bring family and friends for a complete lifestyle and dining experience.\n\n📍 Head over to Pacific Mall and tag us in your mall moments!\n\n#PacificMallMandaue #ShopMandaue #WeekendShopping #CebuEats #RetailTherapy`
        },
        {
          hook: `🔥 Exclusive alert for Pacific Mall shoppers!`,
          body: `Experience unbeatable value with ${topic || "our newest store offers and limited-time tenant specials"}. Everything you need under one roof—fashion, dining, tech, and everyday essentials.`,
          hashtags: ["#PacificMallDeals", "#MandaueCity", "#CebuShopping", "#MallEvents", "#ShopLocal"],
          call_to_action: "Drop by Pacific Mall Mandaue today—we're excited to welcome you!",
          caption: `🔥 Exclusive alert for Pacific Mall shoppers!\n\nExperience unbeatable value with ${topic || "our newest store offers and limited-time tenant specials"}. Everything you need under one roof—fashion, dining, tech, and everyday essentials.\n\n🏬 Drop by Pacific Mall Mandaue today—we're excited to welcome you!\n\n#PacificMallDeals #MandaueCity #CebuShopping #MallEvents #ShopLocal`
        }
      ];

      return NextResponse.json({
        headline: `${topic || "Pacific Mall Highlight"}`,
        caption: fallbackVariations[0].caption,
        variations: fallbackVariations
      });
    }

    // 1. Fetch recent successful posts for style reference (if FB credentials exist)
    let styleReferences = "Polite, community-focused, and retail-oriented.";
    const PAGE_ID = process.env.FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.FB_PAGE_ACCESS_TOKEN;

    if (PAGE_ID && ACCESS_TOKEN && !ACCESS_TOKEN.includes('your_')) {
      try {
        const response = await fetch(`https://graph.facebook.com/v21.0/${PAGE_ID}/feed?limit=3&access_token=${ACCESS_TOKEN}`);
        const data = await response.json();
        if (data && data.data) {
          styleReferences = data.data.map((post: any) => post.message).filter(Boolean).join(' | ');
        }
      } catch (err) {
        console.error("Could not fetch style references:", err);
      }
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Act as a social media expert for "Pacific Mall Mandaue".
      
      Your writing style should emulate these recent successful posts:
      "${styleReferences}"
      
      Topic: ${topic}
      Context: ${context || "Pacific Mall Mandaue Philippines retail mall"}
      
      Generate 3 distinct social media post variations. Each variation must include:
      1. Engaging hook.
      2. Main body content.
      3. A list of 5-7 trending, relevant hashtags for the Philippine mall retail context.
      4. A call to action.
      5. Full assembled caption combining hook, body, call to action, and hashtags.
      
      Return ONLY a clean JSON object with this exact structure:
      {
        "headline": "Brief headline for the campaign",
        "caption": "The primary recommended assembled caption",
        "variations": [
          {
            "hook": "...",
            "body": "...",
            "hashtags": ["#tag1", "#tag2"],
            "call_to_action": "...",
            "caption": "..."
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanJson = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error generating content:", error);
    // Return a guaranteed quality campaign copy instead of a raw 500 error
    const fallback = {
      headline: "Pacific Mall Mandaue Campaign",
      caption: `🎉 Discover something extraordinary at Pacific Mall Mandaue!\n\nEnjoy exclusive shopping discounts, delightful dining, and exciting family activities throughout the week.\n\n📍 Visit Pacific Mall Mandaue today!\n\n#PacificMall #MandaueShopping #CebuRetail #WeekendSpecial #MallLife`,
      variations: [
        {
          hook: "🎉 Discover something extraordinary at Pacific Mall Mandaue!",
          body: "Enjoy exclusive shopping discounts, delightful dining, and exciting family activities throughout the week.",
          hashtags: ["#PacificMall", "#MandaueShopping", "#CebuRetail", "#WeekendSpecial"],
          call_to_action: "Visit Pacific Mall Mandaue today!",
          caption: `🎉 Discover something extraordinary at Pacific Mall Mandaue!\n\nEnjoy exclusive shopping discounts, delightful dining, and exciting family activities throughout the week.\n\n📍 Visit Pacific Mall Mandaue today!\n\n#PacificMall #MandaueShopping #CebuRetail #WeekendSpecial #MallLife`
        }
      ]
    };
    return NextResponse.json(fallback);
  }
}
