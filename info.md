# Project Documentation & Architecture Guide: HeritageVerse

This document provides a comprehensive technical breakdown of **HeritageVerse**, an AI-powered heritage tourism platform. It serves as reference material for reports, presentations, and code walk-throughs.

---

## 1. Executive Summary & Tech Stack

HeritageVerse is a full-stack web application designed to bring global heritage sites to life. It features editorial-grade guides, dynamic AI-generated landmark profiles, interactive itinerary planners, custom user reviews, and 360° virtual tours.

### Frontend & Core Shell

- **React 19 & Vite**: Modern rendering framework and high-speed build bundler.
- **TanStack Router**: Type-safe routing engine that parses and loads parameters dynamically.
- **TailwindCSS**: Utility styling layer augmented by custom global museum-grade styles.
- **Lucide React**: Vector icon sets for clean visual design.

### Backend, Database & Server Functions

- **TanStack Start & Nitro Server**: A server engine built on top of Vite and Nitro, allowing client files to invoke secure, server-side functions (`createServerFn`).
- **Supabase**: Real-time database, file storage, and token authentication manager.
- **PostgreSQL**: The relational engine driving Supabase.

---

## 2. Project Folder Structure

Below is the directory structure highlighting key files and their purposes:

```text
globe-treks-genius-main/
├── .env                              # Environment variable keys (Supabase, Groq, OpenRouter)
├── package.json                      # Build scripts, project dependencies, and dev commands
├── vite.config.ts                    # Vite config mapping TanStack Start plug-ins
├── supabase/
│   ├── config.toml                   # Supabase local environment config
│   └── migrations/
│       ├── 20260602170324_...sql     # Base schemas (profiles, favorites, saved_trips)
│       ├── 20260602170413_...sql     # Helper functions security controls
│       └── 20260604140000_schema_extensions.sql # NEW: Bookmarks, Reviews, Ratings, History
├── src/
│   ├── styles.css                    # Custom museum-grade CSS (parchment, golden frames)
│   ├── router.tsx                    # TanStack Router client configuration
│   ├── server.ts                     # Nitro backend server initialization
│   ├── start.ts                      # Client startup entrypoint
│   ├── hooks/
│   │   ├── use-auth.ts               # Exposes Supabase auth user/session states
│   │   └── use-mobile.tsx            # Detects responsive viewport sizes
│   ├── lib/
│   │   ├── destinations.ts           # Curated pre-packed static destinations database
│   │   ├── geocode.ts                # Nominatim + Open-Meteo geocoding resolvers
│   │   ├── place.functions.ts        # Unified AI caller and fallback generator for place profiles
│   │   └── planner.functions.ts      # Unified AI caller and fallback planner for itineraries
│   ├── components/
│   │   ├── site/
│   │   │   ├── Header.tsx            # Top header with dark mode toggle and user sign-in state
│   │   │   ├── Footer.tsx            # Bottom info footer
│   │   │   ├── SearchBar.tsx         # Advanced fuzzy suggestions & history autocomplete
│   │   │   ├── DestinationCard.tsx   # Visual card display for landmarks
│   │   │   ├── FavoriteButton.tsx    # Saves items to Supabase favorites
│   │   │   ├── WeatherWidget.tsx     # Fetches weather data using latitude/longitude
│   │   │   └── VirtualTourFrame.tsx  # 360° Virtual tours container
│   └── routes/
│       ├── __root.tsx                # Root layout wrapper (injects global components & scripts)
│       ├── index.tsx                 # Homepage showing hero search, categories, & featured sites
│       ├── search.tsx                # Main search results page (curated + geocoded sections)
│       ├── auth.tsx                  # Sign-in / Sign-up page with Google auth bypass
│       ├── planner.tsx               # AI Travel Itinerary Planner UI dashboard
│       ├── favorites.tsx             # Saved profiles & travel itineraries list
│       ├── destination.$slug.tsx     # Curated detailed guides
│       └── place.$name.tsx           # Dynamic dynamic profiles for any place on Earth
```

---

## 3. Detailed Explanation of Project Flow

### A. Search & Autocomplete Flow

1. The user focuses the `SearchBar` input.
2. If empty, the dropdown suggests **Popular Destinations** and **Recent Searches** (loaded from `localStorage` and synced with Supabase `search_history`).
3. As the user types, a debounced handler filters the local curated destinations (fuzzy match) and simultaneously queries the `geocodePlace` API.
4. The search returns result candidates from **OpenStreetMap (Nominatim)** (for monuments and temples) and **Open-Meteo** (for cities).
5. Pressing **Enter** navigates to `/search?q=query`. Clicking a suggestion navigates directly to `/destination/$slug` or `/place/$name`.

### B. Place Details Compilation Flow (The 19 Points)

When a user opens `/place/$name` (such as "India Gate") or `/destination/$slug`:

1. If the coordinates are missing from the URL, the page's parallel geocoder queries coordinates dynamically.
2. The page calls the backend server function `describePlace` to generate details.
3. **Provider Fallback Engine**:
   - The server first tries **Gemini (direct API)**.
   - If missing/exhausted, it tries the **Lovable AI Gateway**.
   - If that fails, it tries **Groq API** (`llama-3.3-70b-specdec`).
   - If that fails, it tries **OpenRouter API** (`gemini-2.5-flash`).
   - If _all_ API credentials fail or are out of quota, it intercepts the error and returns a **high-fidelity static mock profile** (specialized for "Birla Mandir", or dynamically formatted for other places).
4. The page compiles and renders the 19 points:
   - **Overview, History Timeline, Cultural Significance, Architecture**: Rich text panels.
   - **Opening Hours, Entry Fees, Weather, Map**: Rendered in the sticky sidebar.
   - **Transportation, Travel Tips, Safety Tips, Photography Guidelines**: Formatted cards.
   - **Restaurants, Hotels, Experiences**: Structured grid arrays.
   - **360° Virtual Visit**: The `VirtualTourFrame` embeds Google Maps panoramas.
   - **User Reviews**: Reads from the Supabase `reviews` table and displays them, falling back to simulated reviews if no database reviews exist yet.
   - **AI-generated Travel Insights**: Specialized key highlights.

### C. Authentication Flow

1. Users visit `/auth` to sign in or create an account.
2. Form fields are validated client-side with **Zod** schema constraints (requiring secure password rules).
3. **Google Auth Bypass**: Clicking "Continue with Google" checks your Supabase project's settings. If Google OAuth is not configured in the Supabase dashboard (common during local hackathons/college runs), it automatically logs the user into a pre-registered **Demo Traveler** account (`demo.traveler@heritageverse.com`), ensuring a smooth presentation.

### D. AI Itinerary Planner Flow

1. The user inputs their destination, budget, style, and travel interests.
2. The form sends the data to the server-side `generateItinerary` function.
3. The prompt instructs the AI to sequence places geographically (to minimize travel time) and to format descriptions in short, concise sentences (5-7 lines max).
4. If AI keys fail, it serves a mock multi-day guide (specialized for Hyderabad/Birla Mandir, or generic templates for other areas).
5. The frontend displays the itinerary on a timeline, permitting users to click "Save Trip" (which pushes the JSON content to Supabase `saved_trips`).

---

## 4. How the 360° Virtual Tour Works

The 360° Tour is powered by the `VirtualTourFrame` component. It renders an `iframe` embedding Google Maps APIs in **Street View Mode** or **Map Mode**:

- **Street View Tour**: If the geocoded coordinates (latitude and longitude) are available, it loads:
  `https://www.google.com/maps?layer=c&cbll={latitude},{longitude}&cbp=12,0,0,0,0&output=svembed`
  The `layer=c` parameter instructs Google Maps to load the interactive 360° Street View panorama directly inside the iframe.
- **Location Map**: If the user toggles to the Map tab, it embeds the standard Google Maps location viewport:
  `https://www.google.com/maps?q={query}&output=embed`
- The frame also provides an external action button to open the panorama natively in a separate tab using Google's direct web url schema.

---

## 5. Free Deployment Architecture

The production deployment runs on a **Serverless-Relational** model:

1. **Frontend & SSR Server Functions**: Deployed on **Vercel** (Hobby tier). Vercel builds the React files into statically optimized assets and sets up serverless lambda functions for the TanStack Start backend Nitro endpoints (`place.functions` and `planner.functions`).
2. **Relational Database & Authentication**: Hosted on **Supabase** (Free tier). Supabase runs the Postgres database, manages Auth login tokens, and handles file tables. Row Level Security (RLS) ensures users cannot delete or write to other users' data rows.
3. **Environment Sync**: Environment keys (Supabase URL, Anon Keys, Groq key) are registered in the Vercel project configuration dashboard.
