import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  destination: z.string().min(1).max(120),
  days: z.number().int().min(1).max(14),
  budget: z.enum(["budget", "mid", "luxury"]),
  interests: z.array(z.string().min(1).max(40)).min(1).max(8),
  style: z.string().min(1).max(40),
});

export type PlannerInput = z.infer<typeof Input>;

export interface Itinerary {
  destination: string;
  summary: string;
  estimatedCostUSD: { low: number; high: number };
  bestTime: string;
  days: Array<{
    day: number;
    theme: string;
    morning: string;
    afternoon: string;
    evening: string;
    food: string;
    estimatedCostUSD: number;
  }>;
  tips: string[];
}

export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<Itinerary> => {
    const sys = `You are a meticulous heritage-travel concierge. Produce a realistic, culturally rich itinerary focused on heritage, history and authentic local experiences. Respond with ONLY valid JSON matching the provided schema — no markdown, no commentary.`;

    const user = `Plan a ${data.days}-day trip to ${data.destination}.
Budget level: ${data.budget}.
Travel style: ${data.style}.
Interests: ${data.interests.join(", ")}.

Return JSON with this exact shape:
{
  "destination": string,
  "summary": string (1 short sentence),
  "estimatedCostUSD": { "low": number, "high": number },
  "bestTime": string,
  "days": [
    { "day": number, "theme": string, "morning": string (1 short sentence, max 10 words), "afternoon": string (1 short sentence, max 10 words), "evening": string (1 short sentence, max 10 words), "food": string (1-2 words), "estimatedCostUSD": number }
  ],
  "tips": [string, string]
}
Generate exactly ${data.days} days. Keep all text descriptions extremely short, concise, and minimal (max 10 words per activity/time slot) so that the entire output remains very compact.`;

    const errors: string[] = [];

    // 1. Try Gemini API directly
    const geminiKey = process.env.GEMINI_API_KEY || (process.env.AI_API_KEY?.startsWith("AIzaSy") ? process.env.AI_API_KEY : undefined);
    if (geminiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: user }] }],
              systemInstruction: { parts: [{ text: sys }] },
              generationConfig: { responseMimeType: "application/json" },
            }),
          }
        );
        if (res.ok) {
          const payload = await res.json();
          const content = payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (content) return parseAIResult(content);
        } else {
          errors.push(`Gemini direct error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Gemini direct exception: ${err.message}`);
      }
    }

    // 2. Try Lovable AI Gateway
    const lovableKey = process.env.AI_API_KEY || process.env.LOVABLE_API_KEY;
    if (lovableKey && !lovableKey.startsWith("AIzaSy")) {
      try {
        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": lovableKey,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              { role: "system", content: sys },
              { role: "user", content: user },
            ],
            response_format: { type: "json_object" },
          }),
        });
        if (res.ok) {
          const payload = await res.json();
          const content = payload?.choices?.[0]?.message?.content ?? "";
          if (content) return parseAIResult(content);
        } else {
          errors.push(`Lovable gateway error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Lovable gateway exception: ${err.message}`);
      }
    }

    // 3. Try Groq API
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: sys },
              { role: "user", content: user },
            ],
            response_format: { type: "json_object" },
          }),
        });
        if (res.ok) {
          const payload = await res.json();
          const content = payload?.choices?.[0]?.message?.content ?? "";
          if (content) return parseAIResult(content);
        } else {
          errors.push(`Groq API error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Groq API exception: ${err.message}`);
      }
    }

    // 4. Try OpenRouter
    const openrouterKey = process.env.OPENROUTER_API_KEY;
    if (openrouterKey) {
      try {
        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openrouterKey}`,
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            messages: [
              { role: "system", content: sys },
              { role: "user", content: user },
            ],
            response_format: { type: "json_object" },
          }),
        });
        if (res.ok) {
          const payload = await res.json();
          const content = payload?.choices?.[0]?.message?.content ?? "";
          if (content) return parseAIResult(content);
        } else {
          errors.push(`OpenRouter API error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`OpenRouter exception: ${err.message}`);
      }
    }

    // fallback to static mock content for local college projects
    console.warn("All AI providers failed. Falling back to local database...", errors);
    return getFallbackItinerary(data.destination, data.days, data.budget);
  });

function parseAIResult(content: string): Itinerary {
  try {
    return JSON.parse(content) as Itinerary;
  } catch {
    const cleaned = content.replace(/```json\s*|\s*```/g, "").trim();
    return JSON.parse(cleaned) as Itinerary;
  }
}

function getFallbackItinerary(destination: string, days: number, budget: string): Itinerary {
  const isHyderabad = destination.toLowerCase().includes("hyderabad") || destination.toLowerCase().includes("birla");
  
  if (isHyderabad) {
    return {
      destination: "Hyderabad Heritage Tour",
      summary: "Explore the historic palaces, forts, and temple architectures of the Nizam's city.",
      estimatedCostUSD: { low: 150, high: 450 },
      bestTime: "October – March",
      days: Array.from({ length: days }, (_, idx) => {
        const dayNum = idx + 1;
        if (dayNum === 1) {
          return {
            day: 1,
            theme: "The Old City & Charminar",
            morning: "Visit the iconic Charminar and pray at Mecca Masjid.",
            afternoon: "Walk through Laad Bazaar and have Biryani.",
            evening: "Explore Chowmahalla Palace's clock tower.",
            food: "Hyderabadi Biryani.",
            estimatedCostUSD: 40
          };
        }
        if (dayNum === 2) {
          return {
            day: 2,
            theme: "Fortresses & Sunset Vistas",
            morning: "Visit Golconda Fort and experience acoustic clapping.",
            afternoon: "Explore Qutb Shahi Tombs adjacent to the fort.",
            evening: "Take a sunset boat ride on Hussain Sagar Lake.",
            food: "Irani Chai and Osmania Biscuits.",
            estimatedCostUSD: 50
          };
        }
        return {
          day: dayNum,
          theme: `Day ${dayNum}: Museum & Modern Heritage`,
          morning: "Visit the Salar Jung Museum collection.",
          afternoon: "Lunch at Jewel of Nizams, shop pearls.",
          evening: "Relax at NTR Gardens and watch laser show.",
          food: "Qubani Ka Meetha dessert.",
          estimatedCostUSD: 60
        };
      }),
      tips: [
        "Travel via local auto-rickshaw.",
        "Buy pearls only from certified outlets.",
        "Try Irani Chai near Charminar."
      ]
    };
  }

  // Generic fallback for other locations
  return {
    destination: destination,
    summary: `A carefully designed ${days}-day plan to experience the best heritage landmarks of ${destination}.`,
    estimatedCostUSD: { low: 200, high: 600 },
    bestTime: "Year-round",
    days: Array.from({ length: days }, (_, idx) => ({
      day: idx + 1,
      theme: `Day ${idx + 1}: Discover Historic Landmarks`,
      morning: `Explore central monument and museum.`,
      afternoon: `Lunch at heritage cafe, stroll gardens.`,
      evening: `Visit old market and local sunset spot.`,
      food: `Sample traditional dishes.`,
      estimatedCostUSD: 50
    })),
    tips: [
      "Carry cash for entry fees.",
      "Stay hydrated and wear walking shoes.",
      "Start early to beat the crowds."
    ]
  };
}
