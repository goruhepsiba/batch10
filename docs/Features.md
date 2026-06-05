# Product Features Catalog

HeritageVerse offers a complete suite of digital tools for heritage travelers. Here is a catalog of the features implemented in the platform:

---

## 1. Unified Place Search & Autocomplete
* **Search Autocomplete:** Suggests matching sites, temples, cities, and popular categories in a dropdown immediately upon user focus.
* **Fuzzy Suggestions Matching:** Compares query strings against a local curated database and runs queries against Nominatim and Open-Meteo in parallel.
* **Search History Sync:** Stores recent searches in `localStorage` and syncs them with the user's account history.

---

## 2. Dynamic Place Profile
* **19-Point Place Profiles:** Compiles comprehensive guides for landmarks on-demand.
* **Timeline of Historic Events:** Renders historical events chronologically.
* **Travel Logistics:** Displays opening hours, entry fees, and travel instructions.
* **Safety & Photography Guidelines:** Provides safety tips and photography recommendations.
* **Nearby Recommendations:** Recommends nearby attractions, hotels, and authentic regional restaurants.

---

## 3. AI Travel Concierge Itinerary Planner
* **Bespoke Trip Planning:** Creates day-by-day itineraries based on duration (up to 14 days), budget level (budget, mid, luxury), travel style, and specific user interests.
* **Optimized Routing:** Sequences attractions geographically to minimize travel time and transportation costs.
* **Itinerary Dashboard:** Displays morning, afternoon, evening, and dining suggestions for each day.
* **Itinerary Database Sync:** Allows users to save itineraries to their dashboard.

---

## 4. Immersive Virtual Visualizer
* **360° Street View Tours:** Embeds Google Street View panoramas, allowing users to virtually look around the site.
* **Switchable Navigation Maps:** Features a switchable tab bar to view either the 360° panorama or standard Google Maps.
* **External Link Redirection:** Provides external links to open panoramas natively in Google Maps.

---

## 5. Live Weather Widget
* **Real-time Forecasts:** Fetches weather conditions from Open-Meteo based on geocoded coordinates.
* **7-Day Weather Forecasts:** Displays daily temperature limits, wind speed, humidity, and weather conditions.
* **Offline Fallback:** Falls back to simulated weather forecast data if API limits are exceeded or coordinates are missing.

---

## 6. Community Feedback & Favorites System
* **Review Ratings:** Allows users to write reviews, comments, and rate attractions on a 1-to-5 scale.
* **Review Display:** Renders reviewer names and comment timestamps chronologically.
* **Profile Bookmark Toggles:** Allows users to toggle bookmarks for curated or geocoded places.

---

## 7. Authentication & Presentation Sandbox Bypass
* **Secure Session Management:** Uses Zod schema validations on forms, powered by Supabase Auth.
* **Google OAuth Sandbox Bypass:** Allows users to bypass OAuth redirects and email verification by logging into a pre-configured "Demo Traveler" account, ensuring reliable presentation runs.
