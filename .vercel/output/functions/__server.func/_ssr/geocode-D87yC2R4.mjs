async function fromOpenMeteo(query, count) {
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=${count}&language=en&format=json`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data?.results ?? [];
  } catch {
    return [];
  }
}
async function fromNominatim(query, count) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=${count}&accept-language=en`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "HeritageVerse/1.0 (heritage travel app; contact@heritageverse.app)"
      }
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.map((r) => {
      const addr = r.address ?? {};
      const niceName = r.name || addr.city || addr.town || addr.village || addr.suburb || r.display_name.split(",")[0] || query;
      return {
        id: r.place_id,
        name: niceName,
        country: addr.country ?? "",
        country_code: addr.country_code?.toUpperCase(),
        admin1: addr.state ?? addr.city ?? addr.town ?? "",
        latitude: parseFloat(r.lat),
        longitude: parseFloat(r.lon),
        feature_code: r.type
      };
    });
  } catch {
    return [];
  }
}
async function geocodePlace(query, count = 6) {
  const q = query.trim();
  if (!q) return [];
  const [a, b] = await Promise.all([fromOpenMeteo(q, count), fromNominatim(q, count)]);
  const seen = /* @__PURE__ */ new Set();
  const merged = [];
  for (const r of [...a, ...b]) {
    const key = `${r.name.toLowerCase()}|${r.country}|${r.latitude.toFixed(2)},${r.longitude.toFixed(2)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(r);
    if (merged.length >= count) break;
  }
  return merged;
}
export {
  geocodePlace as g
};
