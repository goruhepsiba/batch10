# Chapter 12: Software Requirement Specification (SRS)

## 12.1 Introduction
This Software Requirement Specification (SRS) document details the functional, non-functional, hardware, software, database, and interface requirements for HeritageVerse.

## 12.2 Functional Requirements
The system must support the following functional capabilities:

* **FR-1: Search and Autocomplete**
  * The search bar must perform client-side matching against curated files and parallel geocoding queries against Nominatim and Open-Meteo.
  * Recent searches must be stored in `localStorage` and synced with the Supabase `search_history` table for logged-in users.
* **FR-2: Dynamic Place Compiler**
  * The system must compile a 19-point profile for any location, including timeline records, hotels, restaurants, local experiences, safety tips, and photography guidelines.
  * The server function `describePlace` must run the sequential fallback chain (Gemini -> Lovable Gateway -> Groq -> OpenRouter -> Local Database Fallbacks).
* **FR-3: Itinerary Planner**
  * Users can input travel preferences (destination, duration, budget, style, and interests).
  * The system must generate day-by-day itineraries mapped out in morning, afternoon, and evening slots.
* **FR-4: Virtual Visualizer**
  * The system must parse geocoded coordinates to embed an iframe showing a 360-degree Google Street View tour, falling back to a location map if coordinates are unavailable.
* **FR-5: Live Weather Widget**
  * The widget must pull weather forecasts from Open-Meteo and display a 7-day temperature, wind speed, humidity, and weather conditions forecast.
* **FR-6: Favorites and Reviews**
  * Users can write reviews (rating 1-5, text, displayName) and save itineraries or locations.
* **FR-7: Authentication Bypass**
  * The sign-in page must provide a Google OAuth bypass that registers or signs in users using a pre-configured "Demo Traveler" profile.

## 12.3 Non-Functional Requirements
* **NFR-1: Performance (Latency)**
  * Autocomplete search suggestions must resolve in under 300ms.
  * AI-generated profiles and itineraries must compile in under 5 seconds (with loading indicators visible to the user).
* **NFR-2: Availability and Resiliency**
  * The system must maintain 99.9% uptime by using a resilient AI API failover structure and local fallback indexes.
* **NFR-3: Security and Privacy**
  * Row Level Security (RLS) must be enabled on all Supabase tables, restricting write/delete actions to authenticated owners.
  * Private API keys must remain hidden on the server.
* **NFR-4: Responsiveness**
  * The UI layout must adapt to viewport widths ranging from mobile screens (320px) to desktops (1920px).

## 12.4 Hardware Requirements
* **Developer/Server System:**
  * CPU: Dual-Core 2.0 GHz or higher.
  * Memory: 8 GB RAM.
  * Disk: 500 MB free space.
* **Client Device:**
  * CPU: Any modern smartphone, tablet, or PC processor.
  * Memory: 2 GB RAM.
  * Network: Standard internet connection (3G/4G/5G or Wi-Fi).

## 12.5 Software Requirements
* **Developer Environment:**
  * Operating System: Windows, macOS, or Linux.
  * Runtimes: Node.js (v18+) or Bun.
  * Build Bundler: Vite 6.
  * Packages: React 19, TanStack Router, TanStack Start, Zod, TailwindCSS, Lucide-React.
* **Database & Hosting Provider:**
  * Relational DB: Supabase (PostgreSQL 15+).
  * Server Runtime: Nitro Serverless functions (Vercel).
* **Client Software:**
  * Web Browsers: Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge.

## 12.6 External Interfaces
* **Geocoding Interface:** OpenStreetMap Nominatim API over HTTPS.
* **Weather Interface:** Open-Meteo Forecast API over HTTPS.
* **Virtual Tour Interface:** Google Maps Street View iframe integration.
* **AI API Interfaces:** Google Gemini, Lovable AI Gateway, Groq Chat Completions, and OpenRouter endpoints.

## 12.7 Database Requirements
* The database engine must support relational mappings, cascade deletions, check constraints (e.g. ratings restricted to 1-5), and jsonb properties for saving complex itineraries.
* Index constraints must be configured on foreign keys (e.g. `user_id`) to optimize query speeds.
