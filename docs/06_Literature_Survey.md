# Chapter 6: Literature Survey

## 6.1 Heritage Tourism Systems
Research in heritage tourism systems highlights a distinct focus shift from transactional booking engines to information-rich digital archives. Early portals functioned as digital brochures. Scholars like Buhalis (2003) noted that "eTourism" platforms initially failed to convey the "sense of place," which is critical for cultural sites. Modern research emphasizes the role of narratives in cultural heritage. Platforms must go beyond geographical coordinates and ticket price details to convey the socio-historical narrative of a landmark.

## 6.2 Virtual Tourism Platforms
Virtual tourism has gained prominence as high-bandwidth internet and browser-native rendering engines have matured. The literature categorizes virtual tourism into:
1. **Fully Immersive VR:** Requiring specialized hardware (such as Oculus Rift/HTC Vive). While highly engaging, these systems suffer from low accessibility due to hardware costs.
2. **Web-Based Panoramic Systems (WebVR/Street View):** Using 360-degree cylindrical or spherical projections. These are highly accessible, cross-platform, and run on any browser. Integrating Web-based Street View structures directly with metadata blocks has been shown to increase user engagement by up to 60% (Guttentag, 2010).

## 6.3 AI Travel Assistants
The advent of Generative Pre-trained Transformers (GPTs) has revolutionized travel assistant architectures. Traditional conversational agents were built on top of rigid, rule-based decision trees. If a user asked a question outside the pre-programmed tree, the bot failed.
* **Modern LLM-powered assistants:** Capable of synthesizing text on-demand, answering open-ended queries, and drafting complex, multi-day itineraries.
* **Challenges:** Hallucinations (generating incorrect historical facts) and rate-limiting/quota exhaustion of AI APIs. This highlights the need for multi-provider failover chains and static local fallbacks.

## 6.4 Smart Tourism Systems
Smart Tourism Destinations (STDs) leverage technology to enrich visitor experiences and improve resource management. This involves integrating real-time environmental APIs (like weather engines) and geocoding directories. Research indicates that combining real-time geocoding with local weather tracking helps travelers adjust their travel schedules dynamically, minimizing discomfort from harsh weather.

## 6.5 Recommendation Systems
Tourism recommendation models have evolved from collaborative filtering to hybrid content-aware engines. In heritage tourism, recommendations must prioritize cultural relevance, physical proximity, and regional uniqueness over purely commercial metrics. For instance, suggesting an authentic Udupi restaurant near a temple yields a better user experience than recommending a global fast-food chain.

## 6.6 Digital Cultural Preservation
Digital cultural preservation studies focus on creating digital twins and historical timeline archives. Scholars argue that digital preservation must be open and accessible. Storing historical documentation in closed silos limits its educational value. Modern systems must utilize open-web standards (HTML, CSS, JSON) to ensure information is freely discoverable by users and search crawlers.

## 6.7 Comparison of Existing Systems
The following table summarizes the comparison between current commercial platforms and HeritageVerse:

| Feature / Metric | TripAdvisor | Google Travel | Lonely Planet | UNESCO Portal | HeritageVerse |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Focus** | Commercial Bookings & User Reviews | Flight & Hotel Search Aggregator | Editorial travel articles & books | Historical preservation archives | Cultural Education & AI Itinerary planning |
| **Itinerary Model** | Static, user-generated | Basic automated suggestions | Static book-style guides | None | Dynamic AI Itinerary (Geographically optimized) |
| **Virtual Tours** | Static user photos | Standard Google Map view | None | Limited photo galleries | Embedded 360° Street View & Map framework |
| **Data Sourcing** | Crowdsourced reviews | Google Maps databases | Paid travel writers | Historical researchers | Hybrid (Curated DB + Real-time Geocoding + LLMs) |
| **Real-time Weather** | No | Basic weather card | No | No | Integrated 7-day Open-Meteo Widget |
| **Uptime Resiliency** | High | High | High | High | Failover API Chain + Local Database Fallback |
| **Presenter Sandbox** | N/A | N/A | N/A | N/A | Google OAuth Demo Traveler Bypass Mode |
