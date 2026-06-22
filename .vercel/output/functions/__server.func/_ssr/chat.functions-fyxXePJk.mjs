import { c as createServerRpc } from "./createServerRpc-Cxrr4FRV.mjs";
import { c as createServerFn } from "./server-DuNsQK3D.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, a as arrayType, e as enumType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const Input = objectType({
  message: stringType().min(1).max(2e3),
  history: arrayType(objectType({
    role: enumType(["user", "assistant"]),
    content: stringType()
  })).optional(),
  contextPage: stringType().optional()
});
const askAssistant_createServerFn_handler = createServerRpc({
  id: "d3bfb29af9397275fb28e3d92ee57346e58f10677fecede46abec9f537989187",
  name: "askAssistant",
  filename: "src/lib/chat.functions.ts"
}, (opts) => askAssistant.__executeServer(opts));
const askAssistant = createServerFn({
  method: "POST"
}).inputValidator((input) => Input.parse(input)).handler(askAssistant_createServerFn_handler, async ({
  data
}) => {
  const {
    message,
    history = [],
    contextPage
  } = data;
  let contextInstruction = "";
  if (contextPage) {
    if (contextPage.startsWith("/place/")) {
      const place = decodeURIComponent(contextPage.split("/")[2] || "");
      contextInstruction = ` The user is currently viewing the details page for the heritage site: "${place}". You should provide helpful, context-aware answers about "${place}" when relevant (e.g. if the user says "tell me more" or asks "who built it" or "when to visit").`;
    } else if (contextPage.startsWith("/destination/")) {
      const slug = contextPage.split("/")[2] || "";
      const dest = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      contextInstruction = ` The user is currently viewing the destination guide for: "${dest}". You should provide helpful, context-aware answers about "${dest}" and its heritage attractions when relevant.`;
    } else if (contextPage === "/planner") {
      contextInstruction = ` The user is currently on the AI Itinerary Planner page. Offer to help them plan their next trip or give suggestions about their destinations.`;
    }
  }
  const sys = `You are a world-class heritage guide and friendly travel concierge for HeritageVerse. You help users plan trips, discover history, and learn fascinating facts about forts, temples, palaces, monuments, and UNESCO World Heritage sites globally. Be warm, helpful, and concise (keep answers to 2-3 paragraphs max unless asked for details).${contextInstruction}`;
  const errors = [];
  const geminiKey = process.env.GEMINI_API_KEY || (process.env.AI_API_KEY?.startsWith("AIzaSy") ? process.env.AI_API_KEY : void 0);
  if (geminiKey) {
    try {
      const contents = [...history.map((h) => ({
        role: h.role === "user" ? "user" : "model",
        parts: [{
          text: h.content
        }]
      })), {
        role: "user",
        parts: [{
          text: message
        }]
      }];
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{
              text: sys
            }]
          }
        })
      });
      if (res.ok) {
        const payload = await res.json();
        const content = payload?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        if (content) return content;
      } else {
        errors.push(`Gemini direct error: ${res.status}`);
      }
    } catch (err) {
      errors.push(`Gemini direct exception: ${err.message}`);
    }
  }
  const lovableKey = process.env.AI_API_KEY || process.env.LOVABLE_API_KEY;
  if (lovableKey && !lovableKey.startsWith("AIzaSy")) {
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": lovableKey,
          "X-Lovable-AIG-SDK": "vercel-ai-sdk"
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{
            role: "system",
            content: sys
          }, ...history.map((h) => ({
            role: h.role,
            content: h.content
          })), {
            role: "user",
            content: message
          }]
        })
      });
      if (res.ok) {
        const payload = await res.json();
        const content = payload?.choices?.[0]?.message?.content ?? "";
        if (content) return content;
      } else {
        errors.push(`Lovable gateway error: ${res.status}`);
      }
    } catch (err) {
      errors.push(`Lovable gateway exception: ${err.message}`);
    }
  }
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{
            role: "system",
            content: sys
          }, ...history.map((h) => ({
            role: h.role,
            content: h.content
          })), {
            role: "user",
            content: message
          }]
        })
      });
      if (res.ok) {
        const payload = await res.json();
        const content = payload?.choices?.[0]?.message?.content ?? "";
        if (content) return content;
      } else {
        errors.push(`Groq API error: ${res.status}`);
      }
    } catch (err) {
      errors.push(`Groq API exception: ${err.message}`);
    }
  }
  const openrouterKey = process.env.OPENROUTER_API_KEY;
  if (openrouterKey) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openrouterKey}`
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [{
            role: "system",
            content: sys
          }, ...history.map((h) => ({
            role: h.role,
            content: h.content
          })), {
            role: "user",
            content: message
          }]
        })
      });
      if (res.ok) {
        const payload = await res.json();
        const content = payload?.choices?.[0]?.message?.content ?? "";
        if (content) return content;
      } else {
        errors.push(`OpenRouter API error: ${res.status}`);
      }
    } catch (err) {
      errors.push(`OpenRouter exception: ${err.message}`);
    }
  }
  console.warn("All AI providers failed. Serving chatbot fallback response...", errors);
  return getLocalChatFallback(message);
});
function getLocalChatFallback(message) {
  const m = message.toLowerCase();
  if (m.includes("taj mahal")) {
    return "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in Agra, India. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. It is one of the most famous examples of Mughal architecture, blending Indian, Persian, and Islamic styles, and stands as a UNESCO World Heritage Site.";
  }
  if (m.includes("charminar")) {
    return "The Charminar, constructed in 1591, is a monument and mosque located in Hyderabad, Telangana, India. Built by Sultan Muhammad Quli Qutb Shah to celebrate the end of a deadly plague, the structure is known for its four grand arches and minarets. It sits at the intersection of historic trade routes and is the signature landmark of Hyderabad.";
  }
  if (m.includes("kyoto")) {
    return "Kyoto was the imperial capital of Japan for over a thousand years. It is famous for its thousands of classical Buddhist temples, gardens, imperial palaces, Shinto shrines, and traditional wooden merchant houses. Iconic sites include Fushimi Inari-taisha, Kinkaku-ji (Golden Pavilion), and Kiyomizu-dera temple.";
  }
  if (m.includes("how does") || m.includes("help") || m.includes("work") || m.includes("features")) {
    return "HeritageVerse is an AI-powered travel dashboard! You can use the Search Bar at the top to discover destinations and landmarks. For any location, you will find editorial guides, 360° virtual tours, weather reports, nearby hotels, and customizable itineraries. You can also head over to the 'AI Trip Planner' to generate custom day-by-day itineraries drafted by AI.";
  }
  return "Hello! I am your HeritageVerse Travel Concierge. I can give you historical details, travel guidelines, or itinerary suggestions for destinations worldwide. (Note: My live AI connection is currently offline, but feel free to ask about Taj Mahal, Charminar, Kyoto, or how the site works!)";
}
export {
  askAssistant_createServerFn_handler
};
