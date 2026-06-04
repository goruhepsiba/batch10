import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  MapPin,
  Star,
  Calendar,
  Globe2,
  Hotel as HotelIcon,
  ArrowRight,
  Loader2,
  Sparkles,
  Clock,
  Coins,
  ShieldAlert,
  Camera,
  Utensils,
  Compass,
  Train,
  MessageSquare,
  Send,
  Award
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { WeatherWidget } from "@/components/site/WeatherWidget";
import { FavoriteButton } from "@/components/site/FavoriteButton";
import { VirtualTourFrame } from "@/components/site/VirtualTourFrame";
import { describePlace, type PlaceInfo } from "@/lib/place.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { destinations } from "@/lib/destinations";
import { geocodePlace } from "@/lib/geocode";

const SearchSchema = z.object({
  lat: z.number().catch(0),
  lng: z.number().catch(0),
  country: z.string().catch(""),
  admin: z.string().catch(""),
});

export const Route = createFileRoute("/place/$name")({
  validateSearch: SearchSchema,
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.name)} · HeritageVerse` },
      { name: "description", content: `Discover ${decodeURIComponent(params.name)} — history, culture, hotels and trip planning.` },
    ],
  }),
  component: PlacePage,
});

interface DBReview {
  id: string;
  user_id: string;
  place_ref: string;
  rating: number;
  content: string;
  display_name: string | null;
  created_at: string;
}

function PlacePage() {
  const { name } = Route.useParams();
  const { lat, lng, country, admin } = Route.useSearch();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(name);
  const { user } = useAuth();

  const describe = useServerFn(describePlace);
  const [info, setInfo] = useState<PlaceInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Database reviews state
  const [dbReviews, setDbReviews] = useState<DBReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // If lat/lng missing (e.g. user typed URL), geocode first.
  const [coords, setCoords] = useState<{ lat: number; lng: number; country: string; admin: string } | null>(
    lat && lng ? { lat, lng, country, admin } : null,
  );

  const refId = useMemo(() => {
    return coords ? `${decoded}|${coords.country}`.toLowerCase() : `${decoded}|${country}`.toLowerCase();
  }, [decoded, coords, country]);

  // Geocoding logic using parallel Nominatim + OpenMeteo resolver
  useEffect(() => {
    if (coords) return;
    (async () => {
      try {
        const results = await geocodePlace(decoded, 1);
        const r = results?.[0];
        if (!r) { setError("We couldn't locate that place."); setLoading(false); return; }
        setCoords({ lat: r.latitude, lng: r.longitude, country: r.country ?? "", admin: r.admin1 ?? "" });
        navigate({
          to: "/place/$name",
          params: { name },
          search: { lat: r.latitude, lng: r.longitude, country: r.country ?? "", admin: r.admin1 ?? "" },
          replace: true,
        });
      } catch {
        setError("Geocoding failed."); setLoading(false);
      }
    })();
  }, [coords, decoded, name, navigate]);

  // Reset coords and states when place name parameter changes
  useEffect(() => {
    setCoords(lat && lng ? { lat, lng, country, admin } : null);
    setInfo(null);
    setError(null);
  }, [name, lat, lng, country, admin]);

  // Fetch AI content
  useEffect(() => {
    if (!coords) return;
    let cancelled = false;
    setLoading(true);
    describe({ data: { name: decoded, country: coords.country, admin: coords.admin } })
      .then((r) => { if (!cancelled) { setInfo(r); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [coords, decoded, describe, name]);

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
    if (!refId) return;
    setReviewsLoading(true);
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("place_ref", refId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDbReviews((data || []) as DBReview[]);
    } catch (err) {
      console.warn("Could not fetch user reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    if (coords) {
      fetchReviews();
    }
  }, [coords, refId]);

  // Submit new review to Supabase
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review.");
      navigate({ to: "/auth" });
      return;
    }
    if (!newComment.trim()) return;
    setSubmittingReview(true);
    try {
      const { data: profile } = await supabase
        .from("profiles")
        .select("display_name")
        .eq("id", user.id)
        .single();

      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        place_ref: refId,
        rating: newRating,
        content: newComment,
        display_name: profile?.display_name || user.email?.split("@")[0] || "Traveler",
      });

      if (error) throw error;
      toast.success("Review submitted!");
      setNewComment("");
      setNewRating(5);
      fetchReviews();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  const locationQuery = useMemo(
    () => decoded + (coords?.admin ? ", " + coords.admin : "") + (coords?.country ? ", " + coords.country : ""),
    [decoded, coords],
  );
  const mapEmbed = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(decoded + (coords?.country ? ", " + coords.country : ""))}&output=embed`,
    [decoded, coords],
  );

  // Fetch Wikipedia image
  const [heroImage, setHeroImage] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setHeroImage(null);
    const candidates = [decoded, `${decoded} ${coords?.admin ?? ""}`.trim(), `${decoded} ${coords?.country ?? ""}`.trim()];
    (async () => {
      for (const q of candidates) {
        try {
          const sr = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original|thumbnail&pithumbsize=1600&generator=search&gsrlimit=1&gsrsearch=${encodeURIComponent(q)}`);
          const j = await sr.json();
          const pages = j?.query?.pages;
          const first = pages ? Object.values(pages)[0] as { original?: { source: string }; thumbnail?: { source: string } } : null;
          const url = first?.original?.source ?? first?.thumbnail?.source;
          if (url && !cancelled) { setHeroImage(url); return; }
        } catch { /* try next */ }
      }
    })();
    return () => { cancelled = true; };
  }, [decoded, coords, name]);

  // Combine DB reviews with AI reviews as fallback
  const reviewsToShow = useMemo(() => {
    if (dbReviews.length > 0) return dbReviews;
    if (info?.reviews) {
      return info.reviews.map((r, i) => ({
        id: `ai-${i}`,
        user_id: "ai",
        place_ref: refId,
        rating: r.rating,
        content: r.text,
        display_name: r.author,
        created_at: r.date || "Just now",
      }));
    }
    return [];
  }, [dbReviews, info, refId]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        {heroImage && (
          <img
            src={heroImage}
            alt={`${decoded}`}
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0 -z-10 opacity-40 mix-blend-multiply" style={{ background: "var(--gradient-amber)" }} />
        <div className="container-prose pt-24 pb-20 md:pt-32 md:pb-28 text-parchment">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber/90 font-medium">
            <Sparkles className="h-3.5 w-3.5" /> <span>AI-Generated Dynamic Profile</span>
            {info?.category && <><span>•</span><span>{info.category}</span></>}
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.02] text-parchment drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] font-bold">{decoded}</h1>
          <p className="mt-4 flex items-center gap-2 text-parchment/85 font-medium">
            <MapPin className="h-4 w-4" />
            {[coords?.admin, coords?.country || country].filter(Boolean).join(", ") || "Locating…"}
          </p>
          {info?.short && <p className="mt-6 max-w-2xl text-lg text-parchment/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] font-light leading-relaxed">{info.short}</p>}
          
          {coords && (
            <div className="mt-8 flex flex-wrap gap-3">
              <FavoriteButton
                kind="place" refId={refId}
                name={decoded} country={coords.country}
                lat={coords.lat} lng={coords.lng}
              />
              <button
                onClick={() => {
                  if (confirm(`Want to plan a trip to ${decoded}? Our AI will draft an itinerary now.`)) {
                    const dest = `${decoded}${coords.country ? ", " + coords.country : ""}`;
                    navigate({ to: "/planner", search: { destination: dest, auto: true } });
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber" /> Plan a trip here
              </button>
            </div>
          )}
        </div>
      </section>

      {/* BODY */}
      <section className="container-prose mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-14">
          {loading && !info && (
            <div className="rounded-2xl border border-border/60 bg-card p-10 flex items-center gap-3 text-muted-foreground shadow-sm">
              <Loader2 className="h-5 w-5 animate-spin text-amber" />
              Composing a comprehensive travel dossier for {decoded}…
            </div>
          )}
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-card p-6 text-sm">
              <p className="font-semibold text-destructive">Something went wrong</p>
              <p className="mt-1 text-muted-foreground">{error}</p>
            </div>
          )}

          {info && (
            <>
              {/* 1. Overview */}
              <article>
                <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Overview</p>
                <h2 className="font-display text-3xl mt-2 font-bold">{decoded}, briefly told</h2>
                <p className="mt-4 leading-relaxed text-foreground/90 whitespace-pre-line text-sm md:text-base font-light">{info.about}</p>
                
                {/* 3. Cultural Significance & Architecture */}
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-all">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Cultural Significance</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground/80 font-light">{info.significance}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-all">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Architecture & Landscape</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-foreground/80 font-light">{info.architecture}</p>
                  </div>
                </div>
              </article>

              {/* 2. Historical Information (Timeline) */}
              {info.timeline?.length > 0 && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">History</p>
                  <h2 className="font-display text-3xl mt-2 font-bold">Historical Timeline</h2>
                  <ol className="mt-6 relative border-l border-border pl-6 space-y-6">
                    {info.timeline.map((t, i) => (
                      <li key={i} className="relative group">
                        <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-background transition group-hover:scale-125" />
                        <p className="font-display text-xl font-semibold text-amber">{t.year}</p>
                        <p className="text-muted-foreground text-sm mt-1 leading-relaxed font-light">{t.event}</p>
                      </li>
                    ))}
                  </ol>
                </article>
              )}

              {/* 15. Transportation Information */}
              {info.transportation && (
                <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5">
                    <Train className="h-4 w-4" /> Transportation Information
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90 font-light">{info.transportation}</p>
                </article>
              )}

              {/* 17. Existing 360° Virtual visit (DO NOT MODIFY) */}
              {coords && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">360° Virtual visit</p>
                  <h2 className="font-display text-3xl mt-2 font-bold">Step inside before you go</h2>
                  <VirtualTourFrame
                    title={decoded}
                    lat={coords.lat}
                    lng={coords.lng}
                    query={locationQuery}
                    mapEmbed={mapEmbed}
                  />
                </article>
              )}

              {/* 10. Nearby Attractions */}
              {(info.nearby?.length ?? 0) > 0 && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Local Guide</p>
                  <h2 className="font-display text-3xl mt-2 font-bold">Nearby Attractions</h2>
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    {info.nearby.map((n) => {
                      const curatedMatch = destinations.find(
                        (d) => d.name.toLowerCase() === n.toLowerCase() || d.slug.toLowerCase() === n.toLowerCase()
                      );
                      return curatedMatch ? (
                        <Link
                          key={n}
                          to="/destination/$slug"
                          params={{ slug: curatedMatch.slug }}
                          className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft hover:border-amber/40 transition group flex justify-between items-center"
                        >
                          <div>
                            <p className="font-display text-lg font-medium group-hover:text-amber transition">{n}</p>
                            <p className="text-xs text-amber mt-1 font-semibold uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="h-3 w-3" /> Curated Heritage
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition" />
                        </Link>
                      ) : (
                        <Link
                          key={n}
                          to="/place/$name"
                          params={{ name: encodeURIComponent(n) }}
                          search={{ lat: 0, lng: 0, country: "", admin: "" }}
                          className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft hover:border-amber/40 transition group flex justify-between items-center"
                        >
                          <div>
                            <p className="font-display text-lg font-medium group-hover:text-amber transition">{n}</p>
                            <p className="text-xs text-muted-foreground mt-1">Heritage landmark</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition" />
                        </Link>
                      );
                    })}
                  </div>
                </article>
              )}

              {/* 11. Nearby Restaurants */}
              {(info.restaurants?.length ?? 0) > 0 && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Dine</p>
                  <h2 className="font-display text-3xl mt-2 flex items-center gap-2 font-bold">
                    <Utensils className="h-6 w-6 text-amber" /> Nearby Restaurants
                  </h2>
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    {info.restaurants.map((r, i) => (
                      <div key={i} className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-all">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-lg font-semibold">{r.name}</p>
                            <p className="text-xs text-amber font-medium uppercase tracking-[0.16em] mt-1">{r.cuisine}</p>
                          </div>
                          <span className="text-sm flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber text-amber" /> {r.rating}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{r.distanceKm} km away</span>
                          <span className="font-semibold text-foreground">{r.priceRange}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 12. Nearby Hotels */}
              {(info.hotels?.length ?? 0) > 0 && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Stay</p>
                  <h2 className="font-display text-3xl mt-2 flex items-center gap-2 font-bold">
                    <HotelIcon className="h-6 w-6 text-amber" strokeWidth={1.6} /> Recommended hotels
                  </h2>
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    {info.hotels.map((h) => (
                      <div key={h.name} className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-display text-lg font-semibold leading-tight">{h.name}</p>
                            <p className="text-xs text-amber uppercase tracking-[0.18em] mt-1">{h.tag}</p>
                          </div>
                          <span className="text-sm flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber text-amber" /> {h.rating}</span>
                        </div>
                        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                          <span>{h.distanceKm} km away</span>
                          <span><span className="font-display text-base text-foreground font-semibold">${h.pricePerNight}</span> /night</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* 13. Local Experiences */}
              {(info.experiences?.length ?? 0) > 0 && (
                <article>
                  <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Activities</p>
                  <h2 className="font-display text-3xl mt-2 font-bold">Local Experiences</h2>
                  <ul className="mt-4 grid sm:grid-cols-3 gap-4">
                    {info.experiences.map((exp, i) => (
                      <li key={i} className="rounded-2xl border border-border/60 bg-card p-5 hover:border-amber/40 transition">
                        <span className="block text-amber text-sm font-semibold mb-2">0{i+1}</span>
                        <p className="text-sm leading-relaxed text-foreground/90 font-light">{exp}</p>
                      </li>
                    ))}
                  </ul>
                </article>
              )}

              {/* 7, 8, 9. Tips (Travel, Safety, Photography) */}
              <article className="space-y-6">
                <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Practicalities</p>
                <h2 className="font-display text-3xl mt-2 font-bold">Traveler Guidelines</h2>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Travel Tips */}
                  <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Travel Tips</p>
                    <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                      {info.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                  </div>

                  {/* Safety Tips */}
                  <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" /> Safety Tips</p>
                    <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                      {info.safetyTips.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                  </div>

                  {/* Photography Tips */}
                  <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                    <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> Photography</p>
                    <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                      {info.photographyTips.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                </div>
              </article>

              {/* 18. User Reviews & Ratings */}
              <article className="space-y-6">
                <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Community</p>
                <h2 className="font-display text-3xl mt-2 flex items-center gap-2 font-bold"><MessageSquare className="h-6 w-6 text-amber" /> Reviews & Ratings</h2>
                
                {/* Submit review */}
                <form onSubmit={handleReviewSubmit} className="rounded-2xl border border-border/60 bg-card p-5 space-y-4 shadow-sm">
                  <p className="text-sm font-semibold">Share your experience</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="hover:scale-110 transition cursor-pointer"
                        >
                          <Star className={`h-5 w-5 ${newRating >= star ? "fill-amber text-amber" : "text-border"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      required
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={user ? "Write your review..." : "Sign in to leave a review"}
                      disabled={!user}
                      className="w-full min-h-[90px] bg-background/60 border border-border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-amber/30 resize-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={submittingReview || !user}
                      className="absolute bottom-3 right-3 rounded-full bg-primary p-2 text-primary-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-soft"
                    >
                      {submittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviewsToShow.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-6">Be the first to review this place!</p>
                  )}
                  {reviewsToShow.map((rev) => (
                    <div key={rev.id} className="rounded-2xl border border-border/60 bg-card p-5 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{rev.display_name}</p>
                          <p className="text-xs text-muted-foreground">{new Date(rev.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`h-3.5 w-3.5 ${rev.rating >= s ? "fill-amber text-amber" : "text-border"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed font-light">{rev.content}</p>
                    </div>
                  ))}
                </div>
              </article>
            </>
          )}
        </div>

        {/* RIGHT (sticky sidebar) */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          {coords && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold">Live Weather</p>
              <div className="mt-4"><WeatherWidget lat={coords.lat} lng={coords.lng} /></div>
            </div>
          )}

          {info && (
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Best time to visit</p>
                <p className="mt-2 font-display text-2xl font-bold">{info.bestTime}</p>
              </div>

              {/* 4. Opening Hours */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4" /> Opening Hours</p>
                <p className="mt-1.5 text-sm font-medium text-foreground/90">{info.openingHours}</p>
              </div>

              {/* 6. Entry Fees */}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Coins className="h-4 w-4" /> Entry Fees</p>
                <p className="mt-1.5 text-sm font-medium text-foreground/90">{info.entryFees}</p>
              </div>

              {/* 19. AI-generated Travel Insights */}
              <div className="rounded-xl bg-amber/10 border border-amber/20 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-amber font-semibold flex items-center gap-1.5"><Sparkles className="h-4 w-4 animate-pulse" /> Travel Insights</p>
                <p className="text-xs text-foreground/80 leading-relaxed font-light">{info.travelInsights}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                  <p className="text-muted-foreground font-medium">Category</p>
                  <p className="mt-1 font-semibold">{info.category}</p>
                </div>
                <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                  <p className="text-muted-foreground font-medium">Country</p>
                  <p className="mt-1 font-semibold flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" /> {info.country}</p>
                </div>
              </div>

              <Link
                to="/planner"
                search={{ destination: `${decoded}${coords?.country ? ", " + coords.country : ""}`, auto: true }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer"
              >
                Plan a trip here <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}

          {/* 16. Interactive Map */}
          {coords && (
            <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Interactive Map</p>
              <div className="overflow-hidden rounded-xl aspect-[4/3] border border-border">
                <iframe
                  title={`${decoded} map`}
                  src={mapEmbed}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
