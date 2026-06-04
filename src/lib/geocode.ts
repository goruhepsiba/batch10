export interface GeoResult {
  id: number;
  name: string;
  country: string;
  country_code?: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  feature_code?: string;
  population?: number;
}

async function fromOpenMeteo(query: string, count: number): Promise<GeoResult[]> {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.results ?? []) as GeoResult[];
  } catch {
    return [];
  }
}

async function fromNominatim(query: string, count: number): Promise<GeoResult[]> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=${count}&accept-language=en`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    const data = (await res.json()) as Array<{
      place_id: number;
      lat: string;
      lon: string;
      display_name: string;
      name?: string;
      address?: { country?: string; country_code?: string; state?: string; city?: string; town?: string; village?: string; suburb?: string };
      type?: string;
      class?: string;
    }>;
    return data.map((r) => {
      const addr = r.address ?? {};
      const niceName =
        r.name ||
        addr.city || addr.town || addr.village || addr.suburb ||
        r.display_name.split(",")[0] ||
        query;
      return {
        id: r.place_id,
        name: niceName,
        country: addr.country ?? "",
        country_code: addr.country_code?.toUpperCase(),
        admin1: addr.state ?? addr.city ?? addr.town ?? "",
        latitude: parseFloat(r.lat),
        longitude: parseFloat(r.lon),
        feature_code: r.type,
      } as GeoResult;
    });
  } catch {
    return [];
  }
}

export async function geocodePlace(query: string, count = 6): Promise<GeoResult[]> {
  const q = query.trim();
  if (!q) return [];

  // Run both providers in parallel and merge — Nominatim knows monuments,
  // temples, neighbourhoods (e.g. "Birla Mandir") that Open-Meteo lacks.
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

export const placeSlug = (g: GeoResult) =>
  encodeURIComponent(`${g.name}-${g.country_code ?? g.country}-${g.id}`);

export function parsePlaceSlug(slug: string): { name: string; country: string } {
  const decoded = decodeURIComponent(slug);
  const parts = decoded.split("-");
  if (parts.length >= 3) {
    parts.pop();
    const cc = parts.pop() ?? "";
    return { name: parts.join("-"), country: cc };
  }
  return { name: decoded, country: "" };
}
