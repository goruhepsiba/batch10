import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  MapPin,
  Star,
  Calendar,
  Globe2,
  Award,
  Hotel as HotelIcon,
  ArrowRight,
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
  Loader2
} from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

import { destinations, findDestination } from "@/lib/destinations";
import { WeatherWidget } from "@/components/site/WeatherWidget";
import { DestinationCard } from "@/components/site/DestinationCard";
import { FavoriteButton } from "@/components/site/FavoriteButton";
import { VirtualTourFrame } from "@/components/site/VirtualTourFrame";
import { describePlace, type PlaceInfo } from "@/lib/place.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/destination/$slug")({
  loader: ({ params }) => {
    const d = findDestination(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => {
    const d = loaderData;
    if (!d) return { meta: [{ title: "Destination · HeritageVerse" }] };
    return {
      meta: [
        { title: `${d.name} — ${d.city}, ${d.country} · HeritageVerse` },
        { name: "description", content: d.short },
        { property: "og:title", content: `${d.name} · HeritageVerse` },
        { property: "og:description", content: d.short },
        { property: "og:image", content: d.hero },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: d.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-prose py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-amber">404</p>
      <h1 className="font-display text-4xl mt-2">Destination not found</h1>
      <Link to="/search" search={{ q: "" }} className="mt-6 inline-block text-amber underline underline-offset-4">
        Browse destinations
      </Link>
    </div>
  ),
  component: DestinationPage,
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

function DestinationPage() {
  const d = Route.useLoaderData() as NonNullable<ReturnType<typeof findDestination>>;
  const navigate = useNavigate();
  const { user } = useAuth();
  const describe = useServerFn(describePlace);

  const [aiInfo, setAiInfo] = useState<PlaceInfo | null>(null);
  const [loadingAI, setLoadingAI] = useState(true);

  // Reviews state
  const [dbReviews, setDbReviews] = useState<DBReview[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const refId = useMemo(() => d.slug.toLowerCase(), [d.slug]);

  // Load AI extensions for openingHours, entryFees, safety, photography, restaurants, experiences
  useEffect(() => {
    let cancelled = false;
    setLoadingAI(true);
    describe({ data: { name: d.name, country: d.country, admin: d.city } })
      .then((r) => { if (!cancelled) { setAiInfo(r); setLoadingAI(false); } })
      .catch(() => { if (!cancelled) setLoadingAI(false); });
    return () => { cancelled = true; };
  }, [d, describe]);

  // Fetch reviews from Supabase
  const fetchReviews = async () => {
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
    fetchReviews();
  }, [refId]);

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

  const nearby = d.nearby
    .map((s: string) => destinations.find((x) => x.slug === s))
    .filter(Boolean) as typeof destinations;

  const locationQuery = `${d.name}, ${d.city}, ${d.country}`;

  const reviewsToShow = useMemo(() => {
    if (dbReviews.length > 0) return dbReviews;
    if (aiInfo?.reviews) {
      return aiInfo.reviews.map((r, i) => ({
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
  }, [dbReviews, aiInfo, refId]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={d.hero} alt={d.name} width={1920} height={1080} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        </div>
        <div className="container-prose pt-24 pb-20 md:pt-32 md:pb-28 text-parchment">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber/90 font-medium">
            <span>{d.category}</span>
            {d.unesco && <><span>•</span><span className="inline-flex items-center gap-1"><Award className="h-3 w-3" /> UNESCO Site</span></>}
            {d.built && <><span>•</span><span>Built {d.built}</span></>}
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[1.02] text-parchment font-bold drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]">{d.name}</h1>
          <p className="mt-4 flex items-center gap-2 text-parchment/85 font-medium">
            <MapPin className="h-4 w-4" /> {d.city}, {d.country}
            <span className="mx-2">•</span>
            <Star className="h-4 w-4 fill-amber text-amber" /> {d.rating}
          </p>
          <p className="mt-6 max-w-2xl text-lg text-parchment/85 font-light leading-relaxed">{d.short}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <FavoriteButton kind="curated" refId={refId} name={d.name} country={d.country} lat={d.lat} lng={d.lng} />
            <button
              onClick={() => {
                if (confirm(`Want to plan a trip to ${d.name}? Our AI will draft an itinerary now.`)) {
                  navigate({ to: "/planner", search: { destination: `${d.name}, ${d.country}`, auto: true } });
                }
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber" /> Plan a trip here
            </button>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="container-prose mt-16 grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-14">
          <article>
            <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Overview</p>
            <h2 className="font-display text-3xl mt-2 font-bold">{d.name}, briefly told</h2>
            <p className="mt-4 leading-relaxed text-foreground/90 font-light text-sm md:text-base">{d.about}</p>
            
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-all">
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Cultural significance</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80 font-light">{d.significance}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-all">
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Award className="h-3.5 w-3.5" /> Architecture</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80 font-light">{d.architecture}</p>
              </div>
            </div>
          </article>

          {/* Historical timeline */}
          <article>
            <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">History</p>
            <h2 className="font-display text-3xl mt-2 font-bold">A walk through the centuries</h2>
            <ol className="mt-6 relative border-l border-border pl-6 space-y-6">
              {d.timeline.map((t, i) => (
                <li key={i} className="relative group">
                  <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-background transition group-hover:scale-125" />
                  <p className="font-display text-xl font-semibold text-amber">{t.year}</p>
                  <p className="text-muted-foreground text-sm mt-1 leading-relaxed font-light">{t.event}</p>
                </li>
              ))}
            </ol>
          </article>

          {/* Transportation */}
          {aiInfo?.transportation && (
            <article className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5">
                <Train className="h-4 w-4" /> Transportation Information
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground/90 font-light">{aiInfo.transportation}</p>
            </article>
          )}

          {/* 360 tour (DO NOT MODIFY) */}
          <article>
            <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">360° Virtual visit</p>
            <h2 className="font-display text-3xl mt-2 font-bold">Step inside before you go</h2>
            <VirtualTourFrame title={d.name} lat={d.lat} lng={d.lng} query={locationQuery} mapEmbed={d.mapEmbed} />
          </article>

          {/* Nearby Restaurants (AI extension) */}
          {aiInfo?.restaurants && (
            <article>
              <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Dine</p>
              <h2 className="font-display text-3xl mt-2 flex items-center gap-2 font-bold">
                <Utensils className="h-6 w-6 text-amber" /> Nearby Restaurants
              </h2>
              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                {aiInfo.restaurants.map((r, i) => (
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

          {/* Hotels */}
          <article>
            <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Where to stay</p>
            <h2 className="font-display text-3xl mt-2 flex items-center gap-2 font-bold">
              <HotelIcon className="h-6 w-6 text-amber" strokeWidth={1.6} /> Hand-picked hotels
            </h2>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {d.hotels.map((h) => (
                <div key={h.name} className="rounded-2xl border border-border/60 bg-card p-5 hover:shadow-soft transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-semibold leading-tight">{h.name}</p>
                      <p className="text-xs text-amber uppercase tracking-[0.18em] mt-1">{h.tag}</p>
                    </div>
                    <span className="text-sm flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber text-amber" /> {h.rating}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{h.distanceKm} km from {d.name}</span>
                    <span><span className="font-display text-base text-foreground font-semibold">${h.pricePerNight}</span> /night</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Local Experiences */}
          {aiInfo?.experiences && (
            <article>
              <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Activities</p>
              <h2 className="font-display text-3xl mt-2 font-bold">Local Experiences</h2>
              <ul className="mt-4 grid sm:grid-cols-3 gap-4">
                {aiInfo.experiences.map((exp, i) => (
                  <li key={i} className="rounded-2xl border border-border/60 bg-card p-5 hover:border-amber/40 transition">
                    <span className="block text-amber text-sm font-semibold mb-2">0{i+1}</span>
                    <p className="text-sm leading-relaxed text-foreground/90 font-light">{exp}</p>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* Guides & Tips */}
          {aiInfo && (
            <article className="space-y-6">
              <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Practicalities</p>
              <h2 className="font-display text-3xl mt-2 font-bold">Traveler Guidelines</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Compass className="h-3.5 w-3.5" /> Travel Tips</p>
                  <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                    {aiInfo.tips.map((t, i) => <li key={i}>{t}</li>)}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5 text-destructive" /> Safety Tips</p>
                  <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                    {aiInfo.safetyTips.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Camera className="h-3.5 w-3.5" /> Photography</p>
                  <ul className="text-xs space-y-2 text-foreground/90 font-light list-disc pl-3">
                    {aiInfo.photographyTips.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          )}

          {/* User Reviews */}
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
        </div>

        {/* RIGHT (sticky sidebar) */}
        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold">Live Weather</p>
            <div className="mt-4">
              <WeatherWidget lat={d.lat} lng={d.lng} />
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Best time to visit</p>
              <p className="mt-2 flex items-center gap-2 font-display text-2xl font-bold">{d.bestTime}</p>
            </div>

            {/* Opening Hours */}
            {aiInfo?.openingHours && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Clock className="h-4 w-4" /> Opening Hours</p>
                <p className="mt-1.5 text-sm font-medium text-foreground/90">{aiInfo.openingHours}</p>
              </div>
            )}

            {/* Entry Fees */}
            {aiInfo?.entryFees && (
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Coins className="h-4 w-4" /> Entry Fees</p>
                <p className="mt-1.5 text-sm font-medium text-foreground/90">{aiInfo.entryFees}</p>
              </div>
            )}

            {/* AI Travel Insights */}
            {aiInfo?.travelInsights && (
              <div className="rounded-xl bg-amber/10 border border-amber/20 p-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.16em] text-amber font-semibold flex items-center gap-1.5"><Sparkles className="h-4 w-4 animate-pulse" /> Travel Insights</p>
                <p className="text-xs text-foreground/80 leading-relaxed font-light">{aiInfo.travelInsights}</p>
              </div>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                <p className="text-muted-foreground font-medium">Category</p>
                <p className="mt-1 font-semibold">{d.category}</p>
              </div>
              <div className="rounded-xl bg-background/60 border border-border/60 p-3">
                <p className="text-muted-foreground font-medium">Country</p>
                <p className="mt-1 font-semibold flex items-center gap-1"><Globe2 className="h-3.5 w-3.5" /> {d.country}</p>
              </div>
            </div>

            <Link
              to="/planner"
              search={{ destination: `${d.name}, ${d.country}`, auto: true }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer"
            >
              Plan a trip here <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Interactive Map */}
          <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Interactive Map</p>
            <div className="overflow-hidden rounded-xl aspect-[4/3] border border-border">
              <iframe
                title={`${d.name} map`}
                src={d.mapEmbed}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </aside>
      </section>

      {/* NEARBY */}
      {nearby.length > 0 && (
        <section className="container-prose mt-24">
          <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Nearby & similar</p>
          <h2 className="font-display text-4xl mt-2 mb-8 font-bold">More heritage to explore</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {nearby.map((n) => <DestinationCard key={n.slug} d={n} />)}
          </div>
        </section>
      )}
    </>
  );
}
