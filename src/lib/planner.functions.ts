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
  estimatedCostINR: { low: number; high: number };
  bestTime: string;
  days: Array<{
    day: number;
    theme: string;
    morning: string;
    afternoon: string;
    evening: string;
    food: string;
    estimatedCostINR: number;
  }>;
  tips: string[];
}

export const generateItinerary = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<Itinerary> => {
    const sys = `You are a meticulous heritage-travel concierge specializing in Indian and South Asian destinations. Produce a realistic, culturally rich itinerary focused on heritage, history and authentic local experiences. ALL costs must be in Indian Rupees (INR/₹) and must be realistic for the Indian market. Respond with ONLY valid JSON matching the provided schema — no markdown, no commentary.`;

    const user = `Plan a ${data.days}-day trip to ${data.destination}.
Budget level: ${data.budget} (budget = ₹1500-3000/day, mid = ₹3000-8000/day, luxury = ₹8000-20000/day).
Travel style: ${data.style}.
Interests: ${data.interests.join(", ")}.

Return JSON with this exact shape:
{
  "destination": string,
  "summary": string (1 engaging summary sentence, max 20 words),
  "estimatedCostINR": { "low": number, "high": number },
  "bestTime": string,
  "days": [
    { 
      "day": number, 
      "theme": string, 
      "morning": string (1-2 sentences describing the activity; 15-20 words max), 
      "afternoon": string (1-2 sentences describing the activity; 15-20 words max), 
      "evening": string (1-2 sentences describing the activity; 15-20 words max), 
      "food": string (recommend a local dish; max 8 words), 
      "estimatedCostINR": number (realistic daily cost in Indian Rupees)
    }
  ],
  "tips": [string, string, string]
}
Generate exactly ${data.days} days. All costs MUST be in Indian Rupees (₹). Keep all activity descriptions short but high quality and informative (15-20 words max per time slot).`;

    const errors: string[] = [];

    // 1. Try OpenRouter first (primary provider)
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
          if (content) return normalizeItinerary(parseAIResult(content));
        } else {
          errors.push(`OpenRouter API error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`OpenRouter exception: ${err.message}`);
      }
    }

    // 2. Try Groq API
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
          if (content) return normalizeItinerary(parseAIResult(content));
        } else {
          errors.push(`Groq API error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Groq API exception: ${err.message}`);
      }
    }

    // 3. Try Gemini API directly
    const geminiKey =
      process.env.GEMINI_API_KEY?.startsWith("AIzaSy") ? process.env.GEMINI_API_KEY :
      (process.env.AI_API_KEY?.startsWith("AIzaSy") ? process.env.AI_API_KEY : undefined);
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
          },
        );
        if (res.ok) {
          const payload = await res.json();
          const content = payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (content) return normalizeItinerary(parseAIResult(content));
        } else {
          errors.push(`Gemini direct error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Gemini direct exception: ${err.message}`);
      }
    }

    // 4. Try Lovable AI Gateway
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
          if (content) return normalizeItinerary(parseAIResult(content));
        } else {
          errors.push(`Lovable gateway error: ${res.status}`);
        }
      } catch (err: any) {
        errors.push(`Lovable gateway exception: ${err.message}`);
      }
    }

    // fallback to static mock content for local college projects
    console.warn("All AI providers failed. Falling back to local database...", errors);
    return getFallbackItinerary(data.destination, data.days, data.budget);
  });

function parseAIResult(content: string): any {
  try {
    return JSON.parse(content);
  } catch {
    const cleaned = content.replace(/```json\s*|\s*```/g, "").trim();
    return JSON.parse(cleaned);
  }
}

/**
 * Normalizes AI response to ensure INR fields exist.
 * If the AI returned USD fields, convert them to INR (1 USD ≈ 85 INR).
 */
function normalizeItinerary(raw: any): Itinerary {
  const USD_TO_INR = 85;

  // Handle case where AI returned USD fields instead of INR
  const estimatedCostINR = raw.estimatedCostINR ?? {
    low: (raw.estimatedCostUSD?.low ?? 200) * USD_TO_INR,
    high: (raw.estimatedCostUSD?.high ?? 600) * USD_TO_INR,
  };

  const days = (raw.days ?? []).map((d: any) => ({
    day: d.day,
    theme: d.theme,
    morning: d.morning,
    afternoon: d.afternoon,
    evening: d.evening,
    food: d.food,
    estimatedCostINR: d.estimatedCostINR ?? (d.estimatedCostUSD ?? 50) * USD_TO_INR,
  }));

  return {
    destination: raw.destination,
    summary: raw.summary,
    estimatedCostINR,
    bestTime: raw.bestTime,
    days,
    tips: raw.tips ?? [],
  };
}

function getFallbackItinerary(destination: string, days: number, budget: string): Itinerary {
  const isHyderabad =
    destination.toLowerCase().includes("hyderabad") || destination.toLowerCase().includes("birla");

  const costPerDay = budget === "budget" ? 2000 : budget === "mid" ? 5000 : 12000;

  if (isHyderabad) {
    return {
      destination: "Hyderabad Heritage Tour",
      summary: "Explore the historic palaces, forts, and temple architectures of the Nizam's city.",
      estimatedCostINR: { low: costPerDay * days * 0.8, high: costPerDay * days * 1.3 },
      bestTime: "October – March",
      days: Array.from({ length: days }, (_, idx) => {
        const dayNum = idx + 1;
        if (dayNum === 1) {
          return {
            day: 1,
            theme: "The Old City & Charminar",
            morning: "Visit the iconic Charminar and pray at Mecca Masjid.",
            afternoon: "Walk through Laad Bazaar and have Biryani at Paradise.",
            evening: "Explore Chowmahalla Palace's clock tower and courtyards.",
            food: "Hyderabadi Dum Biryani at Paradise.",
            estimatedCostINR: costPerDay,
          };
        }
        if (dayNum === 2) {
          return {
            day: 2,
            theme: "Fortresses & Sunset Vistas",
            morning: "Visit Golconda Fort and experience the famous acoustic clapping dome.",
            afternoon: "Explore the serene Qutb Shahi Tombs adjacent to the fort.",
            evening: "Take a sunset boat ride on Hussain Sagar Lake near Tank Bund.",
            food: "Irani Chai and Osmania Biscuits at Nimrah Café.",
            estimatedCostINR: costPerDay,
          };
        }
        return {
          day: dayNum,
          theme: `Day ${dayNum}: Museum & Modern Heritage`,
          morning: "Visit the Salar Jung Museum's vast antiques collection.",
          afternoon: "Lunch at Jewel of Nizams restaurant, shop for Hyderabadi pearls.",
          evening: "Relax at NTR Gardens and watch the Lumbini Park laser show.",
          food: "Qubani Ka Meetha and Haleem.",
          estimatedCostINR: costPerDay,
        };
      }),
      tips: [
        "Travel via local auto-rickshaw — negotiate ₹30-80 per ride.",
        "Buy pearls only from certified outlets in Laad Bazaar.",
        "Try Irani Chai at Nimrah Café near Charminar for ₹25.",
      ],
    };
  }

  // Generic fallback for other locations
  return {
    destination: destination,
    summary: `A carefully designed ${days}-day plan to experience the best heritage landmarks of ${destination}.`,
    estimatedCostINR: { low: costPerDay * days * 0.8, high: costPerDay * days * 1.3 },
    bestTime: "Year-round",
    days: Array.from({ length: days }, (_, idx) => ({
      day: idx + 1,
      theme: `Day ${idx + 1}: Discover Historic Landmarks`,
      morning: `Explore central monument, museum and heritage quarter.`,
      afternoon: `Lunch at a heritage café, stroll through local gardens.`,
      evening: `Visit old market bazaar and enjoy a local sunset viewpoint.`,
      food: `Sample traditional regional dishes.`,
      estimatedCostINR: costPerDay,
    })),
    tips: [
      "Carry cash for entry fees at heritage monuments.",
      "Stay hydrated and wear comfortable walking shoes.",
      "Start early morning to beat the crowds at popular sites.",
    ],
  };
}
