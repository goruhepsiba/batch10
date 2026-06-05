# Chapter 14: Implementation

This chapter analyzes the actual codebase implementation of HeritageVerse's core modules.

## 14.1 Search Engine & Geocoding System
The geocoding system, implemented in [geocode.ts](file:///c:/Users/thati/Desktop/globe-treks-genius-main/src/lib/geocode.ts), queries coordinates by running two API lookup methods in parallel:
1. **Open-Meteo Geocoding API:** Optimizes city name lookups.
2. **OpenStreetMap Nominatim API:** Optimizes specific monument, temple, and district searches.

```typescript
export async function geocodePlace(query: string, count = 6): Promise<GeoResult[]> {
  const q = query.trim();
  if (!q) return [];

  // Run both providers in parallel and merge results
  const [a, b] = await Promise.all([fromOpenMeteo(q, count), fromNominatim(q, count)]);

  const seen = new Set<string>();
  const merged: GeoResult[] = [];
  for (const r of [...a, ...b]) {
    const key = `${r.name.toLowerCase()}|${r.country}|${r.latitude.toFixed(2)},${r.longitude.toFixed(2)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(r);
    if (merged.length >= count) break;
  }
  return merged;
}
```

## 14.2 AI Landmark Description Engine
The place compiling flow runs inside `describePlace` in [place.functions.ts](file:///c:/Users/thati/Desktop/globe-treks-genius-main/src/lib/place.functions.ts).
It tries the following models sequentially:
1. **Gemini API:** Direct request using `generativelanguage.googleapis.com`.
2. **Lovable AI Gateway:** Intermediate gateway requesting `google/gemini-3-flash-preview`.
3. **Groq API:** Requests using `llama-3.3-70b-versatile`.
4. **OpenRouter API:** Requests using `google/gemini-2.5-flash`.
5. **Local static fallbacks:** Calls `getFallbackPlaceInfo(name)` if all APIs fail.

```typescript
// Example from describePlace model cascade:
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
    }
  } catch (err: any) {
    errors.push(`Gemini direct exception: ${err.message}`);
  }
}
```

## 14.3 AI Itinerary Planner
The itinerary planner, defined in [planner.functions.ts](file:///c:/Users/thati/Desktop/globe-treks-genius-main/src/lib/planner.functions.ts), uses Zod schema validation to verify inputs before passing parameters to the LLM. It generates a day-by-day itinerary structured for budget level, style, and travel duration.

## 14.4 Authentication and Demo Bypass
Authentication uses the `signUp` and `signInWithPassword` methods in the Supabase Client. To ensure the platform functions during presentations where OAuth redirects or email servers are blocked, a Google OAuth bypass is implemented:

```typescript
const onGoogle = async () => {
  setBusy(true);
  try {
    toast.info("Supabase OAuth Bypassed: Signing in as Demo Traveler...");
    const demoEmail = "demo.traveler@heritageverse.com";
    const demoPassword = "DemoPassword123!";
    
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: demoEmail,
      password: demoPassword,
    });
    // Autocreate the Demo account if it does not exist in local Supabase
    if (signInError) {
      await supabase.auth.signUp({
        email: demoEmail,
        password: demoPassword,
        options: { data: { display_name: "Demo Traveler" } }
      });
      await supabase.auth.signInWithPassword({ email: demoEmail, password: demoPassword });
    }
    toast.success("Welcome! Signed in as Demo Traveler.");
  } catch (err: any) {
    toast.error("Login bypass failed: " + err.message);
  } finally {
    setBusy(false);
  }
};
```

## 14.5 Favorites & Reviews
Favorites and reviews sync with Supabase tables via client operations:
* **Writing Reviews:** Inserts rating, content, and place reference records into the `reviews` table.
* **Saving Favorites:** Uses `FavoriteButton.tsx` to toggle entries in the `favorites` table based on user ID and place reference key.

## 14.6 Virtual Tour System
The 360° Virtual Tour is managed by [VirtualTourFrame.tsx](file:///c:/Users/thati/Desktop/globe-treks-genius-main/src/components/site/VirtualTourFrame.tsx). It uses a switchable state between:
* **360° Street View:** Generates a Google Maps iframe panorama pointing to `cbll={latitude},{longitude}&cbp=12,0,0,0,0&output=svembed`.
* **Standard Map:** Embeds the location coordinates using Google Maps standard embeds.

## 14.7 Live Weather Integration
The `WeatherWidget` fetches 7-day meteorological forecasts from Open-Meteo based on latitude and longitude coordinates. If API limits are exceeded or coordinates are missing, it falls back to a dummy forecast generator to maintain UI functionality.

## 14.8 Responsive Layout & Dark Mode
* **Responsive Layout:** Guided by [use-mobile.tsx](file:///c:/Users/thati/Desktop/globe-treks-genius-main/src/hooks/use-mobile.tsx), which monitors screen size changes and adjusts layout wrappers accordingly.
* **Dark Mode Theme:** Controlled by a state manager in the page headers, applying Tailwind variables or custom CSS layout rules to toggle between light parchment and dark themes.
