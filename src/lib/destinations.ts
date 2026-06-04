import charminar from "@/assets/dest-charminar.jpg";
import taj from "@/assets/dest-taj.jpg";
import hampi from "@/assets/dest-hampi.jpg";
import kyoto from "@/assets/dest-kyoto.jpg";
import golconda from "@/assets/dest-golconda.jpg";
import jaipur from "@/assets/dest-jaipur.jpg";
import angkor from "@/assets/dest-angkor.jpg";
import petra from "@/assets/dest-petra.jpg";

export type Category =
  | "Monument"
  | "Fort"
  | "Palace"
  | "Temple"
  | "Museum"
  | "UNESCO Site"
  | "Natural Wonder";

export interface Hotel {
  name: string;
  rating: number;
  pricePerNight: number;
  distanceKm: number;
  tag: string;
}

export interface Destination {
  slug: string;
  name: string;
  city: string;
  country: string;
  category: Category;
  rating: number;
  reviews: number;
  built?: string;
  unesco?: boolean;
  hero: string;
  gallery: string[];
  short: string;
  about: string;
  significance: string;
  architecture: string;
  timeline: { year: string; event: string }[];
  bestTime: string;
  /** Google Maps embed URL (no API key required for basic embed) */
  mapEmbed: string;
  /** Coordinates used for weather + streetview */
  lat: number;
  lng: number;
  nearby: string[]; // slugs
  hotels: Hotel[];
}

const D = (d: Destination) => d;

export const destinations: Destination[] = [
  D({
    slug: "charminar",
    name: "Charminar",
    city: "Hyderabad",
    country: "India",
    category: "Monument",
    rating: 4.6,
    reviews: 92345,
    built: "1591 CE",
    hero: charminar,
    gallery: [charminar, golconda, jaipur],
    short:
      "The four-minaret icon of Hyderabad — a 16th-century marvel at the heart of the old city.",
    about:
      "Charminar is the soul of Hyderabad, built in 1591 by Sultan Muhammad Quli Qutb Shah to commemorate the end of a deadly plague and the founding of his new city. Its four grand minarets rise 56 meters into the sky, framing the bustling bazaars of Laad and Pathar Gatti below.",
    significance:
      "A symbol of Hyderabad and one of India's most recognised monuments — featured on the state emblem of Telangana.",
    architecture:
      "Indo-Islamic Qutb Shahi style fusing Persian, Hindu and Mughal influences. Built of granite, lime mortar and pulverised marble; the four arches face the cardinal directions.",
    timeline: [
      { year: "1591", event: "Founded by Sultan Muhammad Quli Qutb Shah." },
      { year: "1687", event: "Mughal conquest of Golconda; Charminar passes to the Mughals." },
      { year: "1724", event: "Becomes part of the Nizam's Hyderabad State." },
      { year: "Today", event: "Protected monument under the Archaeological Survey of India." },
    ],
    bestTime: "October – February",
    mapEmbed:
      "https://www.google.com/maps?q=Charminar,Hyderabad&output=embed",
    lat: 17.3616,
    lng: 78.4747,
    nearby: ["golconda", "jaipur"],
    hotels: [
      { name: "Taj Falaknuma Palace", rating: 4.8, pricePerNight: 480, distanceKm: 6.2, tag: "Heritage Luxury" },
      { name: "ITC Kohenur", rating: 4.7, pricePerNight: 210, distanceKm: 11.5, tag: "5-star" },
      { name: "Park Hyatt Hyderabad", rating: 4.6, pricePerNight: 190, distanceKm: 9.8, tag: "5-star" },
      { name: "Hotel Shadab", rating: 4.2, pricePerNight: 38, distanceKm: 0.4, tag: "Local favourite" },
    ],
  }),
  D({
    slug: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.9,
    reviews: 421873,
    built: "1632 – 1653 CE",
    hero: taj,
    gallery: [taj, jaipur, charminar],
    short: "The marble poem on the Yamuna — Mughal architecture at its most transcendent.",
    about:
      "Commissioned by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is the crown jewel of Mughal architecture and one of the New Seven Wonders of the World.",
    significance:
      "UNESCO World Heritage Site since 1983. A universally admired masterpiece of the world's heritage.",
    architecture:
      "White Makrana marble inlaid with semi-precious stones, perfectly symmetrical layout with a 300m reflecting pool and four flanking minarets each tilted slightly outward.",
    timeline: [
      { year: "1632", event: "Construction begins under Shah Jahan." },
      { year: "1653", event: "Main mausoleum completed after 22 years and 20,000 artisans." },
      { year: "1983", event: "Inscribed as a UNESCO World Heritage Site." },
    ],
    bestTime: "November – February",
    mapEmbed: "https://www.google.com/maps?q=Taj+Mahal,Agra&output=embed",
    lat: 27.1751,
    lng: 78.0421,
    nearby: ["jaipur", "charminar"],
    hotels: [
      { name: "The Oberoi Amarvilas", rating: 4.9, pricePerNight: 720, distanceKm: 0.6, tag: "Iconic view" },
      { name: "ITC Mughal", rating: 4.6, pricePerNight: 240, distanceKm: 2.1, tag: "5-star" },
      { name: "Trident Agra", rating: 4.5, pricePerNight: 160, distanceKm: 2.8, tag: "4-star" },
    ],
  }),
  D({
    slug: "hampi",
    name: "Hampi",
    city: "Hampi",
    country: "India",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.7,
    reviews: 38219,
    built: "14th century",
    hero: hampi,
    gallery: [hampi, golconda, jaipur],
    short: "Ruins of the once-glorious Vijayanagara empire scattered across a surreal boulder landscape.",
    about:
      "Hampi was the capital of the Vijayanagara empire in the 14th century, once second only to Beijing as the largest medieval-era city. Today its temples, palaces and aqueducts sprawl across 4,100 hectares of granite hills and banana groves.",
    significance: "UNESCO World Heritage Site. One of the largest open-air heritage complexes in the world.",
    architecture:
      "Dravidian temple architecture with intricately carved gopurams, monolithic sculptures and a stepped tank fed by aqueducts.",
    timeline: [
      { year: "1336", event: "Vijayanagara empire founded." },
      { year: "1500s", event: "City peaks with half a million inhabitants." },
      { year: "1565", event: "Sacked after the Battle of Talikota." },
      { year: "1986", event: "Inscribed by UNESCO." },
    ],
    bestTime: "October – February",
    mapEmbed: "https://www.google.com/maps?q=Hampi,Karnataka&output=embed",
    lat: 15.335,
    lng: 76.46,
    nearby: ["golconda", "charminar"],
    hotels: [
      { name: "Evolve Back Kamalapura Palace", rating: 4.8, pricePerNight: 380, distanceKm: 4.5, tag: "Heritage Luxury" },
      { name: "Heritage Resort Hampi", rating: 4.4, pricePerNight: 95, distanceKm: 3.0, tag: "4-star" },
      { name: "Hampi's Boulders", rating: 4.3, pricePerNight: 110, distanceKm: 6.8, tag: "Eco" },
    ],
  }),
  D({
    slug: "kyoto",
    name: "Kinkaku-ji (Kyoto)",
    city: "Kyoto",
    country: "Japan",
    category: "Temple",
    unesco: true,
    rating: 4.7,
    reviews: 156932,
    built: "1397 CE",
    hero: kyoto,
    gallery: [kyoto, angkor, taj],
    short: "The Golden Pavilion — a Zen temple wrapped in gold leaf, mirrored in a still mountain pond.",
    about:
      "Kinkaku-ji, the Temple of the Golden Pavilion, is a Zen Buddhist temple whose top two floors are entirely covered in pure gold leaf. Originally a retirement villa for shogun Ashikaga Yoshimitsu, it became a temple after his death.",
    significance: "Designated a UNESCO World Heritage Site as part of Historic Monuments of Ancient Kyoto.",
    architecture:
      "Three floors each in a different architectural style: Shinden, Samurai and Zen. A bronze phoenix crowns the rooftop.",
    timeline: [
      { year: "1397", event: "Built as retirement villa." },
      { year: "1408", event: "Converted to a Zen temple." },
      { year: "1950", event: "Burned down; rebuilt in 1955." },
      { year: "1994", event: "Listed as UNESCO heritage." },
    ],
    bestTime: "March – May or October – November",
    mapEmbed: "https://www.google.com/maps?q=Kinkaku-ji,Kyoto&output=embed",
    lat: 35.0394,
    lng: 135.7292,
    nearby: ["angkor", "taj-mahal"],
    hotels: [
      { name: "The Ritz-Carlton Kyoto", rating: 4.9, pricePerNight: 950, distanceKm: 5.5, tag: "Luxury" },
      { name: "Hoshinoya Kyoto", rating: 4.8, pricePerNight: 720, distanceKm: 8.0, tag: "Ryokan" },
      { name: "Hotel Granvia Kyoto", rating: 4.5, pricePerNight: 220, distanceKm: 6.2, tag: "4-star" },
    ],
  }),
  D({
    slug: "golconda",
    name: "Golconda Fort",
    city: "Hyderabad",
    country: "India",
    category: "Fort",
    rating: 4.5,
    reviews: 41218,
    built: "13th century",
    hero: golconda,
    gallery: [golconda, charminar, jaipur],
    short: "A granite citadel famed for its acoustics, diamond vaults and panoramic sunsets.",
    about:
      "Originally a mud fort of the Kakatiya kings, Golconda was rebuilt in granite by the Qutb Shahi dynasty. At its peak it was the diamond capital of the world — both the Koh-i-Noor and Hope diamonds passed through its vaults.",
    significance: "One of India's most striking medieval forts and the cradle of Hyderabad's heritage.",
    architecture:
      "Concentric fortifications, eight monumental gateways, and acoustic engineering so refined that a handclap at Fateh Darwaza can be heard a kilometre away atop Bala Hisar.",
    timeline: [
      { year: "1200s", event: "Original mud fort built by Kakatiyas." },
      { year: "1518", event: "Rebuilt in granite by the Qutb Shahis." },
      { year: "1687", event: "Captured after an 8-month siege by Aurangzeb." },
    ],
    bestTime: "November – February",
    mapEmbed: "https://www.google.com/maps?q=Golconda+Fort,Hyderabad&output=embed",
    lat: 17.3833,
    lng: 78.4011,
    nearby: ["charminar", "hampi"],
    hotels: [
      { name: "Taj Krishna", rating: 4.6, pricePerNight: 170, distanceKm: 9.2, tag: "5-star" },
      { name: "Novotel HICC", rating: 4.4, pricePerNight: 120, distanceKm: 14.0, tag: "4-star" },
    ],
  }),
  D({
    slug: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    country: "India",
    category: "Palace",
    rating: 4.4,
    reviews: 62110,
    built: "1799 CE",
    hero: jaipur,
    gallery: [jaipur, taj, charminar],
    short: "The 'Palace of Winds' — a five-storey pink sandstone facade of 953 honeycombed jharokhas.",
    about:
      "Built by Maharaja Sawai Pratap Singh, Hawa Mahal was designed so that royal ladies of the zenana could watch street processions from behind ornate windows without being seen. The latticework keeps the interior breezy even in Rajasthan's heat.",
    significance: "Icon of Jaipur and a masterpiece of Rajput architecture.",
    architecture:
      "Pink sandstone in the shape of Krishna's crown. 953 small windows (jharokhas) with intricate latticework create a natural cooling system — the namesake palace of winds.",
    timeline: [
      { year: "1799", event: "Commissioned by Maharaja Sawai Pratap Singh." },
      { year: "2006", event: "Major restoration completed." },
    ],
    bestTime: "October – March",
    mapEmbed: "https://www.google.com/maps?q=Hawa+Mahal,Jaipur&output=embed",
    lat: 26.9239,
    lng: 75.8267,
    nearby: ["taj-mahal", "charminar"],
    hotels: [
      { name: "Rambagh Palace", rating: 4.9, pricePerNight: 620, distanceKm: 4.0, tag: "Heritage Luxury" },
      { name: "Samode Haveli", rating: 4.7, pricePerNight: 280, distanceKm: 2.3, tag: "Boutique heritage" },
      { name: "ITC Rajputana", rating: 4.5, pricePerNight: 180, distanceKm: 3.8, tag: "5-star" },
    ],
  }),
  D({
    slug: "angkor-wat",
    name: "Angkor Wat",
    city: "Siem Reap",
    country: "Cambodia",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.8,
    reviews: 198400,
    built: "12th century",
    hero: angkor,
    gallery: [angkor, kyoto, taj],
    short: "The largest religious monument on Earth — sandstone temples wrapped in jungle.",
    about:
      "Built by King Suryavarman II in the early 12th century as a Hindu temple dedicated to Vishnu, Angkor Wat later transformed into a Buddhist site. It covers 162.6 hectares — the largest religious structure in the world.",
    significance: "UNESCO World Heritage Site and national symbol of Cambodia, featured on the country's flag.",
    architecture: "Classical Khmer architecture, five lotus-shaped towers, vast galleries of bas-reliefs depicting Hindu epics.",
    timeline: [
      { year: "1113-1150", event: "Built by King Suryavarman II." },
      { year: "1400s", event: "Transformed into a Buddhist temple." },
      { year: "1992", event: "Inscribed by UNESCO." },
    ],
    bestTime: "November – March",
    mapEmbed: "https://www.google.com/maps?q=Angkor+Wat,Cambodia&output=embed",
    lat: 13.4125,
    lng: 103.8667,
    nearby: ["kyoto", "petra"],
    hotels: [
      { name: "Raffles Grand Hotel d'Angkor", rating: 4.8, pricePerNight: 420, distanceKm: 6.5, tag: "Heritage Luxury" },
      { name: "Park Hyatt Siem Reap", rating: 4.7, pricePerNight: 260, distanceKm: 7.0, tag: "5-star" },
      { name: "Jaya House RiverPark", rating: 4.9, pricePerNight: 180, distanceKm: 8.2, tag: "Boutique" },
    ],
  }),
  D({
    slug: "petra",
    name: "Petra",
    city: "Ma'an",
    country: "Jordan",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.8,
    reviews: 87421,
    built: "5th century BCE",
    hero: petra,
    gallery: [petra, angkor, hampi],
    short: "The rose-red city half as old as time, carved into sheer sandstone cliffs.",
    about:
      "Petra was the capital of the Nabatean kingdom — a desert trading hub linking Arabia, Egypt and Syria-Phoenicia. Its monuments are carved directly into vivid sandstone cliffs, the most famous being Al-Khazneh, the Treasury.",
    significance:
      "UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    architecture: "Rock-cut Nabatean architecture blending Hellenistic facades with eastern motifs.",
    timeline: [
      { year: "400 BCE", event: "Established as Nabatean capital." },
      { year: "106 CE", event: "Absorbed into the Roman Empire." },
      { year: "1812", event: "Rediscovered by Johann Ludwig Burckhardt." },
      { year: "1985", event: "Listed by UNESCO." },
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Petra,Jordan&output=embed",
    lat: 30.3285,
    lng: 35.4444,
    nearby: ["angkor-wat", "taj-mahal"],
    hotels: [
      { name: "Mövenpick Resort Petra", rating: 4.6, pricePerNight: 220, distanceKm: 0.1, tag: "5-star, gate-front" },
      { name: "Petra Marriott", rating: 4.5, pricePerNight: 180, distanceKm: 3.0, tag: "5-star" },
      { name: "Petra Guest House Hotel", rating: 4.3, pricePerNight: 130, distanceKm: 0.2, tag: "Closest to entrance" },
    ],
  }),
  // ===== Additional hand-picked destinations across categories =====
  D({
    slug: "colosseum",
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    category: "Monument",
    unesco: true,
    rating: 4.8,
    reviews: 312000,
    built: "70 – 80 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    gallery: [],
    short: "The mighty Flavian amphitheatre — Rome's enduring symbol of imperial spectacle.",
    about:
      "The Colosseum is the largest ancient amphitheatre ever built, commissioned under Emperor Vespasian and completed by his son Titus in 80 CE. It hosted gladiatorial contests, mock sea battles and public spectacles for nearly four centuries.",
    significance: "UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    architecture: "Travertine limestone, tuff and brick-faced concrete; four stories of arches with Doric, Ionic and Corinthian columns.",
    timeline: [
      { year: "70 CE", event: "Construction begins under Vespasian." },
      { year: "80 CE", event: "Inaugurated with 100 days of games by Titus." },
      { year: "1980", event: "Inscribed by UNESCO." },
    ],
    bestTime: "April – June, September – October",
    mapEmbed: "https://www.google.com/maps?q=Colosseum,Rome&output=embed",
    lat: 41.8902, lng: 12.4922,
    nearby: ["petra", "taj-mahal"],
    hotels: [
      { name: "Hotel Palazzo Manfredi", rating: 4.9, pricePerNight: 520, distanceKm: 0.1, tag: "Colosseum view" },
      { name: "The Inn at the Roman Forum", rating: 4.7, pricePerNight: 320, distanceKm: 0.6, tag: "Boutique" },
    ],
  }),
  D({
    slug: "stonehenge",
    name: "Stonehenge",
    city: "Wiltshire",
    country: "United Kingdom",
    category: "Monument",
    unesco: true,
    rating: 4.4,
    reviews: 64210,
    built: "c. 3000 BCE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Stonehenge2007_07_30.jpg/1280px-Stonehenge2007_07_30.jpg",
    gallery: [],
    short: "Neolithic stone circle aligned to the sun — a 5,000-year-old riddle on Salisbury Plain.",
    about: "Stonehenge is a prehistoric monument of standing sarsen stones and bluestones arranged in a circle, built in several phases beginning around 3000 BCE. Its astronomical alignments mark the summer and winter solstices.",
    significance: "UNESCO World Heritage Site; one of the most famous prehistoric monuments in the world.",
    architecture: "Concentric circles of sarsen trilithons and smaller bluestones brought from Wales over 200 km away.",
    timeline: [
      { year: "3000 BCE", event: "Earthwork bank and ditch constructed." },
      { year: "2500 BCE", event: "Sarsen stones raised into trilithons." },
      { year: "1986", event: "Inscribed by UNESCO." },
    ],
    bestTime: "May – September",
    mapEmbed: "https://www.google.com/maps?q=Stonehenge&output=embed",
    lat: 51.1789, lng: -1.8262,
    nearby: ["colosseum", "petra"],
    hotels: [
      { name: "The Lamb at Hindon", rating: 4.6, pricePerNight: 180, distanceKm: 19, tag: "Countryside inn" },
      { name: "Howard's House Hotel", rating: 4.5, pricePerNight: 210, distanceKm: 17, tag: "Boutique" },
    ],
  }),
  D({
    slug: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    country: "India",
    category: "Fort",
    unesco: true,
    rating: 4.5,
    reviews: 78400,
    built: "1648 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Fort_in_Delhi_03-2016.jpg/1280px-Red_Fort_in_Delhi_03-2016.jpg",
    gallery: [],
    short: "The crimson sandstone seat of Mughal power — and the heart of modern India's Independence Day.",
    about: "Built by Emperor Shah Jahan as the palace fort of his new capital Shahjahanabad, the Red Fort served as the main residence of Mughal emperors for nearly 200 years. The Prime Minister of India addresses the nation from its ramparts every August 15.",
    significance: "UNESCO World Heritage Site and the symbolic centre of India's sovereignty.",
    architecture: "Red sandstone walls 33m high enclosing pavilions of white marble inlaid with precious stones — a fusion of Persian, Timurid and Indian styles.",
    timeline: [
      { year: "1638", event: "Construction begins under Shah Jahan." },
      { year: "1648", event: "Completed as imperial residence." },
      { year: "2007", event: "Inscribed by UNESCO." },
    ],
    bestTime: "October – March",
    mapEmbed: "https://www.google.com/maps?q=Red+Fort,Delhi&output=embed",
    lat: 28.6562, lng: 77.2410,
    nearby: ["taj-mahal", "hawa-mahal"],
    hotels: [
      { name: "The Imperial New Delhi", rating: 4.8, pricePerNight: 320, distanceKm: 6.5, tag: "Heritage Luxury" },
      { name: "Haveli Dharampura", rating: 4.7, pricePerNight: 180, distanceKm: 1.0, tag: "Heritage haveli" },
    ],
  }),
  D({
    slug: "versailles",
    name: "Palace of Versailles",
    city: "Versailles",
    country: "France",
    category: "Palace",
    unesco: true,
    rating: 4.7,
    reviews: 198300,
    built: "1661 – 1715 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chateau_Versailles_Galerie_des_Glaces.jpg/1280px-Chateau_Versailles_Galerie_des_Glaces.jpg",
    gallery: [],
    short: "The Sun King's gilded palace — Baroque grandeur and the Hall of Mirrors.",
    about: "Originally a hunting lodge, Versailles was transformed by Louis XIV into the principal royal residence of France from 1682 until the French Revolution. Its Hall of Mirrors witnessed the signing of the 1919 Treaty that ended the First World War.",
    significance: "UNESCO World Heritage Site; epitome of French Baroque architecture and absolute monarchy.",
    architecture: "Baroque facades, 700 rooms, formal French gardens by André Le Nôtre, and the famed 73m Hall of Mirrors lined with 357 mirrors.",
    timeline: [
      { year: "1661", event: "Louis XIV begins expansion of his father's hunting lodge." },
      { year: "1682", event: "Court of France moves to Versailles." },
      { year: "1979", event: "Inscribed by UNESCO." },
    ],
    bestTime: "April – June, September – October",
    mapEmbed: "https://www.google.com/maps?q=Palace+of+Versailles&output=embed",
    lat: 48.8049, lng: 2.1204,
    nearby: ["colosseum", "hawa-mahal"],
    hotels: [
      { name: "Airelles Château de Versailles, Le Grand Contrôle", rating: 4.9, pricePerNight: 1900, distanceKm: 0.2, tag: "Inside the estate" },
      { name: "Waldorf Astoria Trianon Palace", rating: 4.7, pricePerNight: 430, distanceKm: 1.0, tag: "5-star" },
    ],
  }),
  D({
    slug: "borobudur",
    name: "Borobudur",
    city: "Magelang",
    country: "Indonesia",
    category: "Temple",
    unesco: true,
    rating: 4.8,
    reviews: 54200,
    built: "9th century",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Borobudur-Nothwest-view.jpg/1280px-Borobudur-Nothwest-view.jpg",
    gallery: [],
    short: "The world's largest Buddhist temple — a stepped stone mandala rising from Java's jungle.",
    about: "Borobudur is a 9th-century Mahayana Buddhist temple built in nine stacked platforms, topped by a central dome surrounded by 72 perforated stupas, each enshrining a Buddha statue. Pilgrims circumambulate upward through three levels symbolising the Buddhist cosmology.",
    significance: "UNESCO World Heritage Site and the single largest Buddhist monument on Earth.",
    architecture: "2,672 relief panels and 504 Buddha statues carved into volcanic andesite — a three-dimensional mandala.",
    timeline: [
      { year: "750-825", event: "Built under the Sailendra dynasty." },
      { year: "1814", event: "Rediscovered under volcanic ash by Sir Stamford Raffles." },
      { year: "1991", event: "Inscribed by UNESCO." },
    ],
    bestTime: "May – September",
    mapEmbed: "https://www.google.com/maps?q=Borobudur&output=embed",
    lat: -7.6079, lng: 110.2038,
    nearby: ["angkor-wat", "kyoto"],
    hotels: [
      { name: "Amanjiwo", rating: 4.9, pricePerNight: 1200, distanceKm: 2.5, tag: "Iconic luxury" },
      { name: "Plataran Borobudur Resort", rating: 4.7, pricePerNight: 280, distanceKm: 3.0, tag: "5-star" },
    ],
  }),
  D({
    slug: "louvre",
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    category: "Museum",
    rating: 4.7,
    reviews: 412000,
    built: "1793 (museum)",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1280px-Louvre_Museum_Wikimedia_Commons.jpg",
    gallery: [],
    short: "The world's most visited museum — a former royal palace housing the Mona Lisa.",
    about: "The Louvre began as a 12th-century fortress, became a royal residence, and opened as a public museum in 1793. It holds over 35,000 works spanning prehistory to the 21st century, including the Mona Lisa, Venus de Milo and Winged Victory of Samothrace.",
    significance: "Most-visited museum in the world; cultural heart of Paris.",
    architecture: "French Renaissance palace wings around the Cour Napoléon, with I. M. Pei's 1989 glass pyramid as its modern entrance.",
    timeline: [
      { year: "1190", event: "Built as a fortress by Philip II." },
      { year: "1793", event: "Opened as a public museum during the Revolution." },
      { year: "1989", event: "Glass Pyramid inaugurated." },
    ],
    bestTime: "October – April (fewer crowds)",
    mapEmbed: "https://www.google.com/maps?q=Louvre+Museum,Paris&output=embed",
    lat: 48.8606, lng: 2.3376,
    nearby: ["versailles", "colosseum"],
    hotels: [
      { name: "Le Meurice", rating: 4.8, pricePerNight: 1400, distanceKm: 0.4, tag: "Palace hotel" },
      { name: "Hôtel du Louvre", rating: 4.6, pricePerNight: 480, distanceKm: 0.1, tag: "5-star" },
    ],
  }),
  D({
    slug: "british-museum",
    name: "The British Museum",
    city: "London",
    country: "United Kingdom",
    category: "Museum",
    rating: 4.7,
    reviews: 256000,
    built: "1753",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/British_Museum_from_NE_2.JPG/1280px-British_Museum_from_NE_2.JPG",
    gallery: [],
    short: "Two million years of human history under one Bloomsbury roof — and entry is free.",
    about: "Founded in 1753 around the collection of Sir Hans Sloane, the British Museum was the world's first national public museum. Its galleries span the Rosetta Stone, Parthenon Marbles, Assyrian reliefs and Egyptian mummies.",
    significance: "One of the most comprehensive collections of human history and culture in existence.",
    architecture: "Greek Revival exterior by Sir Robert Smirke; the soaring glass-roofed Great Court was designed by Norman Foster in 2000.",
    timeline: [
      { year: "1753", event: "Founded by Act of Parliament." },
      { year: "1759", event: "Opened to the public — free of charge." },
      { year: "2000", event: "Great Court opens, Europe's largest covered square." },
    ],
    bestTime: "Year-round (weekday mornings)",
    mapEmbed: "https://www.google.com/maps?q=British+Museum,London&output=embed",
    lat: 51.5194, lng: -0.1270,
    nearby: ["stonehenge", "louvre"],
    hotels: [
      { name: "The Bloomsbury Hotel", rating: 4.6, pricePerNight: 360, distanceKm: 0.2, tag: "5-star" },
      { name: "The Montague on the Gardens", rating: 4.7, pricePerNight: 320, distanceKm: 0.1, tag: "Boutique" },
    ],
  }),
  D({
    slug: "grand-canyon",
    name: "Grand Canyon",
    city: "Arizona",
    country: "United States",
    category: "Natural Wonder",
    unesco: true,
    rating: 4.9,
    reviews: 287000,
    built: "~6 million years ago",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Grand_Canyon_NP-Arizona-USA.jpg/1280px-Grand_Canyon_NP-Arizona-USA.jpg",
    gallery: [],
    short: "A mile-deep gorge carved by the Colorado River — a layered chronicle of Earth's history.",
    about: "The Grand Canyon is 446 km long, up to 29 km wide, and over 1.6 km deep. Its exposed strata record nearly two billion years of geological history, sculpted by the Colorado River over the last six million years.",
    significance: "UNESCO World Heritage Site and one of the most studied geological landscapes on Earth.",
    architecture: "Layered red and ochre sedimentary cliffs of limestone, sandstone and shale.",
    timeline: [
      { year: "6 Mya", event: "Colorado River begins carving the canyon." },
      { year: "1919", event: "Designated a US National Park." },
      { year: "1979", event: "Inscribed by UNESCO." },
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Grand+Canyon&output=embed",
    lat: 36.1069, lng: -112.1129,
    nearby: ["petra", "stonehenge"],
    hotels: [
      { name: "El Tovar Hotel", rating: 4.6, pricePerNight: 280, distanceKm: 0.1, tag: "Historic rim-side" },
      { name: "Bright Angel Lodge", rating: 4.4, pricePerNight: 170, distanceKm: 0.1, tag: "Rim cabins" },
    ],
  }),
  D({
    slug: "iguazu-falls",
    name: "Iguazú Falls",
    city: "Misiones",
    country: "Argentina",
    category: "Natural Wonder",
    unesco: true,
    rating: 4.9,
    reviews: 132000,
    built: "Prehistoric",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Iguazu_Decembre_2007_-_Panorama_4.jpg/1280px-Iguazu_Decembre_2007_-_Panorama_4.jpg",
    gallery: [],
    short: "275 cascades thundering across the jungle on the Argentina–Brazil border.",
    about: "The Iguazú Falls form the largest waterfall system in the world, stretching 2.7 km across the basalt edge of the Paraná Plateau. The most dramatic drop is Devil's Throat — a 82m U-shaped chasm where half the river's flow plunges over the edge.",
    significance: "UNESCO World Heritage Site and one of the New Seven Wonders of Nature.",
    architecture: "Natural basalt cliffs sculpted over millions of years; surrounded by Atlantic rainforest teeming with toucans and coatis.",
    timeline: [
      { year: "1541", event: "First seen by Europeans (Cabeza de Vaca)." },
      { year: "1934", event: "Argentine national park established." },
      { year: "1984", event: "Inscribed by UNESCO." },
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Iguazu+Falls&output=embed",
    lat: -25.6953, lng: -54.4367,
    nearby: ["grand-canyon", "angkor-wat"],
    hotels: [
      { name: "Gran Meliá Iguazú", rating: 4.7, pricePerNight: 420, distanceKm: 0.3, tag: "Inside the park" },
      { name: "Loi Suites Iguazú", rating: 4.6, pricePerNight: 260, distanceKm: 12, tag: "Jungle resort" },
    ],
  }),
];


export const findDestination = (slug: string) =>
  destinations.find((d) => d.slug === slug);

export const searchDestinations = (query: string) => {
  const q = query.trim().toLowerCase();
  if (!q) return destinations;
  // Allow plural collection labels (e.g. "Forts") to match singular categories ("Fort").
  const qSingular = q.endsWith("s") ? q.slice(0, -1) : q;
  return destinations.filter((d) =>
    [d.name, d.city, d.country, d.category].some((f) => {
      const v = f.toLowerCase();
      return v.includes(q) || v.includes(qSingular);
    }),
  );
};

