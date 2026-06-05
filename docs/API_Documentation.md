# API Documentation

This document specifies the serverless functions, database queries, and client-side APIs utilized by the HeritageVerse platform.

---

## 1. Serverless Functions (TanStack Start Server Actions)

### 1.1 `describePlace`
Generates a structured, 19-point profile for a destination using the AI fallback chain.
* **HTTP Method:** `POST`
* **Route Endpoint:** `/_server/describePlace` (Internal server action mapping)
* **Request Arguments:**
  ```json
  {
    "name": "Birla Mandir",
    "country": "India",
    "admin": "Telangana"
  }
  ```
* **Response Payload:**
  ```json
  {
    "name": "Birla Mandir",
    "country": "India",
    "category": "Temple",
    "short": "A spectacular white marble hilltop temple dedicated to Lord Vishnu and Goddess Lakshmi.",
    "about": "Birla Mandir is a majestic Hindu temple built entirely of Rajasthani white marble...",
    "significance": "An active worship site and one of Hyderabad's most iconic landmarks.",
    "architecture": "Integrates Dravidian, Rajasthani, and Oriya architectural styles.",
    "bestTime": "October – March",
    "timeline": [
      { "year": "1966", "event": "Construction initiated by the Birla Foundation." },
      { "year": "1976", "event": "Inaugurated and dedicated to the public." }
    ],
    "hotels": [
      { "name": "The Park Hyderabad", "rating": 4.5, "pricePerNight": 95, "distanceKm": 2.1, "tag": "Luxury Lake View" }
    ],
    "nearby": ["Charminar", "Golconda Fort"],
    "tips": ["Cameras and mobile phones are strictly prohibited inside."],
    "openingHours": "7:00 AM - 12:00 PM daily",
    "entryFees": "Free Admission",
    "safetyTips": ["Dress modestly in accordance with temple customs."],
    "photographyTips": ["Photography is strictly banned inside temple walls."],
    "restaurants": [
      { "name": "Bikanervala", "cuisine": "North Indian", "rating": 4.3, "priceRange": "$$", "distanceKm": 0.8 }
    ],
    "experiences": ["Participate in the evening Aarti service."],
    "transportation": "Assembly Metro Station is 1.5 km away.",
    "travelInsights": "The black granite statue is a replica of Tirupati Lord Venkateswara.",
    "reviews": [
      { "author": "Rahul Sharma", "rating": 5, "text": "Absolutely peaceful place.", "date": "2026-05-15" }
    ]
  }
  ```

---

### 1.2 `generateItinerary`
Creates a day-by-day travel itinerary based on user preferences.
* **HTTP Method:** `POST`
* **Route Endpoint:** `/_server/generateItinerary`
* **Request Arguments:**
  ```json
  {
    "destination": "Hyderabad",
    "days": 2,
    "budget": "mid",
    "interests": ["History", "Architecture"],
    "style": "cultural"
  }
  ```
* **Response Payload:**
  ```json
  {
    "destination": "Hyderabad Heritage Tour",
    "summary": "Explore the historic palaces and fort architectures.",
    "estimatedCostUSD": { "low": 150, "high": 450 },
    "bestTime": "October – March",
    "days": [
      {
        "day": 1,
        "theme": "The Old City & Charminar",
        "morning": "Visit the iconic Charminar and pray at Mecca Masjid.",
        "afternoon": "Walk through Laad Bazaar and have Biryani.",
        "evening": "Explore Chowmahalla Palace.",
        "food": "Hyderabadi Biryani",
        "estimatedCostUSD": 40
      }
    ],
    "tips": [
      "Travel via local auto-rickshaw."
    ]
  }
  ```

---

## 2. Geocoding API (`geocodePlace`)
Resolves coordinates by querying OpenStreetMap Nominatim and Open-Meteo in parallel.
* **Method Call:** `geocodePlace(query: string, count?: number)`
* **Request Arguments:** `"Charminar"`
* **Response Payload:**
  ```json
  [
    {
      "id": 1234567,
      "name": "Charminar",
      "country": "India",
      "country_code": "IN",
      "admin1": "Telangana",
      "latitude": 17.3616,
      "longitude": 78.4747,
      "feature_code": "monument"
    }
  ]
  ```

---

## 3. Database APIs (Supabase Client Queries)

### 3.1 Reviews API
* **Query Reviews:**
  ```typescript
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("place_ref", placeRef)
    .order("created_at", { ascending: false });
  ```
* **Insert Review:**
  ```typescript
  const { error } = await supabase
    .from("reviews")
    .insert({
      place_ref: "India Gate",
      rating: 5,
      content: "Stunning war memorial, beautiful in the evening.",
      display_name: "John Doe",
      user_id: user.id
    });
  ```

### 3.2 Favorites API
* **Add Favorite:**
  ```typescript
  const { error } = await supabase
    .from("favorites")
    .insert({
      kind: "place",
      ref: "India Gate",
      name: "India Gate",
      country: "India",
      lat: 28.6129,
      lng: 77.2295,
      user_id: user.id
    });
  ```
* **Remove Favorite:**
  ```typescript
  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id)
    .eq("ref", ref);
  ```
