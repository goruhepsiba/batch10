# Technical Stack Specifications

This document outlines the libraries, tools, frameworks, and APIs powering HeritageVerse.

---

## 1. Frontend Framework & Build Shell
* **React 19:** Utilizes React's rendering lifecycle, hooks (`useEffect`, `useState`, `useMemo`), and components.
* **Vite 6:** A frontend bundler providing fast build speeds and Hot Module Replacement (HMR).
* **TanStack Router:** Provides type-safe routing, mapping paths and parameters for pages like `/place/$name` and `/planner`.
* **Lucide React:** Renders clear vector icon sets across the platform.

---

## 2. Server & Compilation Layer
* **TanStack Start:** Connects the React frontend and server components. It enables secure server-side execution (`createServerFn`) to run backend tasks without requiring a standalone Express backend.
* **Nitro Server:** Compiles backend code into lightweight, serverless routines suitable for deployment on providers like Vercel or Netlify.

---

## 3. Style System
* **TailwindCSS:** Provides utility-first styling classes for layout structure.
* **Custom Museum CSS (`styles.css`):** Defines global custom styles, including amber text highlights, golden card borders, parchment background colors, and transition animations.

---

## 4. Persistent Database & Session State
* **Supabase Client:** Handles authentication flows and database synchronization.
* **PostgreSQL Relational Engine:** A relational database hosting tables for user profiles, reviews, favorites, search history, and saved itineraries.

---

## 5. Artificial Intelligence Services
* **Google Gemini API:** The primary LLM, accessed directly to compile detailed 19-point place guides.
* **Lovable AI Gateway:** First fallback provider, querying `gemini-3-flash-preview` models.
* **Groq API:** Second fallback provider, utilizing Groq's high-speed inference engine with Llama models.
* **OpenRouter API:** Third fallback provider, routing queries through OpenRouter's API gateway.
* **Static Fallback Generator:** The final fallback, returning pre-configured mock data if all API requests fail.

---

## 6. Location & Geocoding Integrations
* **OpenStreetMap Nominatim:** Provides geocoding lookups for monuments and cultural landmarks.
* **Open-Meteo Geocoding:** Optimizes geocoding lookups for cities and regions.
* **Google Maps Embeds:** Embeds interactive maps and Google Street View 360-degree panoramas based on coordinates.
