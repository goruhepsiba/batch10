# System Architecture

HeritageVerse is built on a modern **Serverless-Relational** model. The codebase separates user-facing visual layouts, server-side data processing pipelines, and a persistent database.

```mermaid
graph TD
    subgraph Client Layer (Browser)
        UI[React 19 Components] <--> Router[TanStack Router]
        UI <--> Hooks[useAuth / useMobile]
    end

    subgraph Server Layer (Nitro Serverless)
        Start[TanStack Start Engine] <--> Fn1[describePlace Server Function]
        Start <--> Fn2[generateItinerary Server Function]
    end

    subgraph Database Layer (Supabase)
        Auth[Supabase Auth Service]
        DB[(PostgreSQL Database)]
    end

    subgraph External Services
        AI[AI Fallback Chain: Gemini, Groq, OpenRouter]
        Maps[Google Maps / OpenStreetMap]
        Weather[Open-Meteo Weather API]
    end

    UI <-->|invokeServerFn| Start
    Fn1 <--> AI
    UI <--> Maps
    UI <--> Weather
    Start <--> DB
    UI <--> Auth
```

---

## 1. Client Architecture (Frontend)
The frontend client runs in the user's web browser, using the following key technologies:
* **React 19 & Vite:** Drives UI rendering and asset building.
* **TanStack Router:** Provides type-safe client-side routing, loading matching views for paths like `/favorites`, `/planner`, and `/place/$name`.
* **TailwindCSS & Custom Styles:** Styles components using standard utility classes combined with custom museum-grade visual layout properties defined in `styles.css`.
* **Lucide React:** Renders modern vector icon sets across the platform.

---

## 2. Server Architecture (Backend Functions)
HeritageVerse uses server functions, run via **TanStack Start** and **Nitro Server**, to handle sensitive business logic.
* **API Key Protection:** Server functions (`createServerFn`) run securely on the server side, keeping private API keys (like Gemini or Groq keys) hidden from the client browser.
* **Nitro Server:** Compiles backend code into optimized, serverless lambdas that execute dynamically on-demand.

---

## 3. Database Layer (Supabase & PostgreSQL)
* **PostgreSQL Relational Engine:** Stores profiles, bookmarks, reviews, search histories, and saved itineraries.
* **Supabase Client:** Handles database connections, authentication states, and real-time updates.
* **Row Level Security (RLS):** REST operations are filtered through RLS policies to restrict unauthorized data access or modifications.

---

## 4. Integration Layer (External APIs)
The backend and frontend integrate with the following third-party APIs:
* **AI Processing:** Google Gemini, Lovable Gateway, Groq (Llama models), and OpenRouter.
* **Location Mapping:** OpenStreetMap Nominatim for geocoding lookups, and Google Maps Street View for embedding 360-degree panoramas.
* **Weather Forecasts:** Open-Meteo API for real-time weather forecasts based on coordinates.
