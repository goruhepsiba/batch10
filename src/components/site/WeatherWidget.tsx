import { useEffect, useState } from "react";
import { Cloud, CloudRain, Droplets, Sun, Wind } from "lucide-react";

interface WeatherDay {
  date: string;
  tmax: number;
  tmin: number;
  precip: number;
  code: number;
}
interface WeatherData {
  current: { temp: number; wind: number; humidity: number; code: number };
  days: WeatherDay[];
}

const codeIcon = (c: number) => {
  if (c === 0 || c === 1) return Sun;
  if (c >= 51 && c <= 67) return CloudRain;
  if (c >= 80) return CloudRain;
  return Cloud;
};

const codeLabel = (c: number) => {
  if (c === 0) return "Clear";
  if (c <= 3) return "Partly cloudy";
  if (c <= 48) return "Foggy";
  if (c <= 67) return "Rain";
  if (c <= 77) return "Snow";
  if (c <= 82) return "Showers";
  return "Storm";
};

export function WeatherWidget({ lat, lng }: { lat: number; lng: number }) {
  const [data, setData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // If coordinates are invalid, missing, or represent default dummy (0, 0) coordinates, load dummy weather immediately.
    if (
      lat === undefined ||
      lng === undefined ||
      isNaN(lat) ||
      isNaN(lng) ||
      (lat === 0 && lng === 0)
    ) {
      loadDummyWeather();
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 2500);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code&forecast_days=7&timezone=auto`;
    
    let active = true;

    fetch(url, { signal: controller.signal })
      .then((r) => {
        clearTimeout(timeoutId);
        if (!r.ok) throw new Error("Weather request failed");
        return r.json();
      })
      .then((j) => {
        if (!active) return;
        if (j.error || !j.current || !j.daily) {
          throw new Error(j.reason || "Invalid response structure");
        }
        setData({
          current: {
            temp: Math.round(j.current.temperature_2m ?? 0),
            wind: Math.round(j.current.wind_speed_10m ?? 0),
            humidity: j.current.relative_humidity_2m ?? 0,
            code: j.current.weather_code ?? 0,
          },
          days: (j.daily.time || []).map((t: string, i: number) => ({
            date: t,
            tmax: Math.round(j.daily.temperature_2m_max?.[i] ?? 0),
            tmin: Math.round(j.daily.temperature_2m_min?.[i] ?? 0),
            precip: j.daily.precipitation_probability_max?.[i] ?? 0,
            code: j.daily.weather_code?.[i] ?? 0,
          })),
        });
      })
      .catch((e) => {
        clearTimeout(timeoutId);
        if (active) {
          console.warn("WeatherWidget API failed or timed out:", e.message, "- Falling back to dummy weather.");
          loadDummyWeather();
        }
      });

    function loadDummyWeather() {
      const today = new Date();
      const dummyDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateStr = date.toISOString().split("T")[0];
        return {
          date: dateStr,
          tmax: 28 + Math.round(Math.sin(i) * 3),
          tmin: 19 + Math.round(Math.cos(i) * 2),
          precip: Math.max(0, Math.round(Math.sin(i) * 40)),
          code: i % 3 === 0 ? 0 : i % 3 === 1 ? 3 : 51,
        };
      });

      setData({
        current: {
          temp: 26,
          wind: 12,
          humidity: 55,
          code: 3,
        },
        days: dummyDays,
      });
    }

    return () => {
      active = false;
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [lat, lng]);

  if (!data) return <div className="h-32 animate-pulse rounded-xl bg-muted" />;

  const Icon = codeIcon(data.current.code);

  return (
    <div>
      <div className="flex items-center gap-5">
        <Icon className="h-14 w-14 text-amber" strokeWidth={1.4} />
        <div>
          <p className="font-display text-5xl leading-none">{data.current.temp}°C</p>
          <p className="text-sm text-muted-foreground mt-1">{codeLabel(data.current.code)}</p>
        </div>
        <div className="ml-auto grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Droplets className="h-3.5 w-3.5" /> {data.current.humidity}%</span>
          <span className="flex items-center gap-1.5"><Wind className="h-3.5 w-3.5" /> {data.current.wind} km/h</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2">
        {data.days.map((d) => {
          const DI = codeIcon(d.code);
          const day = new Date(d.date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short" });
          return (
            <div key={d.date} className="rounded-lg bg-background/60 border border-border/60 p-2 text-center">
              <p className="text-[11px] text-muted-foreground">{day}</p>
              <DI className="h-5 w-5 mx-auto my-1.5 text-amber" strokeWidth={1.6} />
              <p className="text-xs font-medium">{d.tmax}°</p>
              <p className="text-[11px] text-muted-foreground">{d.tmin}°</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
