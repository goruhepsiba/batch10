# Chapter 4: Scope of the Project

## 4.1 Current Scope
The current iteration of HeritageVerse is designed as a fully functional, browser-native web application. It addresses the end-to-end journey of a heritage traveler: from initial site discovery via autocompleted search and category filtering, to deep contextual learning using AI-generated place profiles and 360° virtual street tours, to planning and saving multi-day itineraries.

## 4.2 Functional Scope
The functional boundaries of the system encompass the following modules:
1. **Interactive Search & Autocomplete:** Support for fuzzy text matching against a curated local database, while simultaneously making API requests to OpenStreetMap Nominatim and Open-Meteo Geocoding.
2. **AI-Orchestrated Place Profiles:** Dynamic synthesis of a 19-point guide for any typed landmark on Earth, detailing historical facts, timeline logs, safety tips, photography spots, regional restaurants, and hotel grids.
3. **AI Concierge Trip Planner:** Creation of day-by-day itineraries showing mornings, afternoons, and evenings. Features are integrated with interactive cost estimations.
4. **360° Virtual Tours & Maps:** Direct street view iframe embeds linked to coordinates, with standard location maps and native Google Maps open-redirection hooks.
5. **Interactive Weather Widget:** Real-time extraction of 7-day meteorological forecasts, temperature limits, humidity, wind conditions, and weather states.
6. **Favorites and Reviews:** Relational storage in Postgres allowing users to save plans, write feedback, and rate locations on a 1-to-5 scale.
7. **Authentication:** Standard authentication (Sign Up / Sign In) using Zod validation and a Google OAuth Demo Traveler bypass mode.

## 4.3 Technical Scope
* **Language Support:** Written entirely in type-safe TypeScript, HTML5, and customized CSS layout sheets.
* **Core Libraries:** Built upon React 19 and Vite.
* **Routing:** Managed via TanStack Router for client routes and parameters.
* **Database & APIs:** Hosted on Supabase (Postgres relational engine), communicating over REST and RPC.
* **AI Pipelines:** Direct API fetch calls to Gemini, Lovable Gateway, Groq, and OpenRouter backend endpoints, using customized JSON instructions to lock down outputs.
* **Environment Limits:** Secured via Vercel serverless functions, restricting direct database or API key exposures to the public client.

## 4.4 Tourism Scope
The tourism scope focuses on cultural tourism, architectural tourism, and educational trips. It is optimized to:
* Guide travelers to heritage monuments, museums, historical temples, forts, ruins, and heritage cities.
* Showcase local businesses (pure-vegetarian Udupi hotels, regional craft markets, local heritage stays) over standardized global hotel chains.
* Educate travelers on local customs, clothing standards, and photography guidelines to protect local cultural sensitivities.

## 4.5 Future Expansion Scope
In future updates, the scope of HeritageVerse can be extended to include:
1. **Augmented Reality (AR) On-Site Guides:** Mobile AR integrations showing digital historical plaques when travelers scan monuments with their smartphone cameras.
2. **Immersive Audio Guides:** Multi-lingual voice readouts generated using Text-to-Speech (TTS) models to provide active narrations during physical tours.
3. **Crowdsourced Historical Verification:** A peer-review module permitting academic historians to verify AI-generated timelines and add physical archival documents.
4. **Offline Mobile Applications:** Hybrid React Native application support with local SQLite caching for travelers exploring remote heritage sites without cellular network access.
5. **Direct Tour Booking Integrations:** APIs linking travelers directly with local government guides, regional ticketing counters, and verified cultural tour operators.
