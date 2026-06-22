import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { g as Route, u as useAuth, b as useServerFn, d as destinations } from "./router-BAKaFseM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as DestinationCard } from "./DestinationCard-DIwhBAba.mjs";
import { d as describePlace, F as FavoriteButton, V as VirtualTourFrame } from "./place.functions-3wyGJ7yP.mjs";
import { s as supabase } from "./client-DwzOaH6b.mjs";
import "../_libs/clerk__react.mjs";
import "../_libs/clerk__shared.mjs";
import "../_libs/seroval.mjs";
import { D as Award, h as MapPin, I as Star, f as Sparkles, C as Compass, F as TramFront, G as Utensils, t as Hotel, u as ShieldAlert, J as Camera, e as MessageSquare, g as LoaderCircle, d as Send, k as Calendar, y as Clock, K as Coins, E as Earth, A as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./env-CeXi8rGa.mjs";
import "./server-rHDi7l_h.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "./env-Bu12Jr7a.mjs";
import "./getGlobalStartContext-DRMFhrIa.mjs";
import "../_libs/zod.mjs";
import "../_libs/dequal.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function DestinationPage() {
  const d = Route.useLoaderData();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const describe = useServerFn(describePlace);
  const [aiInfo, setAiInfo] = reactExports.useState(null);
  const [loadingAI, setLoadingAI] = reactExports.useState(true);
  const [dbReviews, setDbReviews] = reactExports.useState([]);
  const [reviewsLoading, setReviewsLoading] = reactExports.useState(true);
  const [newRating, setNewRating] = reactExports.useState(5);
  const [newComment, setNewComment] = reactExports.useState("");
  const [submittingReview, setSubmittingReview] = reactExports.useState(false);
  const refId = reactExports.useMemo(() => d.slug.toLowerCase(), [d.slug]);
  reactExports.useEffect(() => {
    let cancelled = false;
    setLoadingAI(true);
    describe({
      data: {
        name: d.name,
        country: d.country,
        admin: d.city
      }
    }).then((r) => {
      if (!cancelled) {
        setAiInfo(r);
        setLoadingAI(false);
      }
    }).catch(() => {
      if (!cancelled) setLoadingAI(false);
    });
    return () => {
      cancelled = true;
    };
  }, [d, describe]);
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const {
        data,
        error
      } = await supabase.from("reviews").select("*").eq("place_ref", refId).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      setDbReviews(data || []);
    } catch (err) {
      console.warn("Could not fetch user reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchReviews();
  }, [refId]);
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to leave a review.");
      navigate({
        to: "/auth"
      });
      return;
    }
    if (!newComment.trim()) return;
    setSubmittingReview(true);
    try {
      const {
        data: dbUser
      } = await supabase.from("users").select("full_name").eq("clerk_user_id", user.id).maybeSingle();
      const {
        error
      } = await supabase.from("reviews").insert({
        user_id: user.id,
        place_ref: refId,
        rating: newRating,
        content: newComment,
        display_name: dbUser?.full_name || user.email?.split("@")[0] || "Traveler"
      });
      if (error) throw error;
      toast.success("Review submitted!");
      setNewComment("");
      setNewRating(5);
      fetchReviews();
    } catch (err) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };
  const nearby = d.nearby.map((s) => destinations.find((x) => x.slug === s)).filter(Boolean);
  const locationQuery = `${d.name}, ${d.city}, ${d.country}`;
  const reviewsToShow = reactExports.useMemo(() => {
    if (dbReviews.length > 0) return dbReviews;
    if (aiInfo?.reviews) {
      return aiInfo.reviews.map((r, i) => ({
        id: `ai-${i}`,
        user_id: "ai",
        place_ref: refId,
        rating: r.rating,
        content: r.text,
        display_name: r.author,
        created_at: r.date || "Just now"
      }));
    }
    return [];
  }, [dbReviews, aiInfo, refId]);
  const usingSampleReviews = dbReviews.length === 0 && Boolean(aiInfo?.reviews?.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 -z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.hero, alt: d.name, width: 1920, height: 1080, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          background: "var(--gradient-hero)"
        } })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose pt-24 pb-20 md:pt-32 md:pb-28 text-parchment", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber/90 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.category }),
          d.unesco && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3 w-3" }),
              " UNESCO Site"
            ] })
          ] }),
          d.built && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Built ",
              d.built
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl md:text-7xl leading-[1.02] text-parchment font-bold drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)]", children: d.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 flex items-center gap-2 text-parchment/85 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          " ",
          d.city,
          ", ",
          d.country,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-2", children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 fill-amber text-amber" }),
          " ",
          d.rating
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-parchment/85 font-light leading-relaxed", children: d.short }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { kind: "curated", refId, name: d.name, country: d.country, lat: d.lat, lng: d.lng }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            if (confirm(`Want to plan a trip to ${d.name}? Our AI will draft an itinerary now.`)) {
              navigate({
                to: "/planner",
                search: {
                  destination: `${d.name}, ${d.country}`,
                  auto: true
                }
              });
            }
          }, className: "inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-amber" }),
            " Plan a trip here"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose mt-16 grid lg:grid-cols-3 gap-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 font-bold", children: [
            d.name,
            ", briefly told"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 leading-relaxed text-foreground/90 font-light text-sm md:text-base", children: d.about }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3.5 w-3.5" }),
                " Cultural significance"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-foreground/80 font-light", children: d.significance })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-300", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                " Architecture"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm leading-relaxed text-foreground/80 font-light", children: d.architecture })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "A walk through the centuries" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-6 relative border-l border-border pl-6 space-y-6", children: d.timeline.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-background transition group-hover:scale-125" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-amber", children: t.year }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed font-light", children: t.event })
          ] }, i)) })
        ] }),
        aiInfo?.transportation && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl glass-card p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TramFront, { className: "h-4 w-4" }),
            " Transportation Information"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground/90 font-light", children: aiInfo.transportation })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "360° Virtual visit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Step inside before you go" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualTourFrame, { title: d.name, lat: d.lat, lng: d.lng, query: locationQuery, mapEmbed: d.mapEmbed })
        ] }),
        aiInfo?.restaurants && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Dine" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "h-6 w-6 text-amber" }),
            " Nearby Restaurants"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-4", children: aiInfo.restaurants.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold", children: r.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber font-medium uppercase tracking-[0.16em] mt-1", children: r.cuisine })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber text-amber" }),
                " ",
                r.rating
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                r.distanceKm,
                " km away"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: r.priceRange })
            ] })
          ] }, i)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Where to stay" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Hotel, { className: "h-6 w-6 text-amber", strokeWidth: 1.6 }),
            " Hand-picked hotels"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-4", children: d.hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold leading-tight", children: h.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-amber uppercase tracking-[0.18em] mt-1", children: h.tag })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber text-amber" }),
                " ",
                h.rating
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                h.distanceKm,
                " km from ",
                d.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-base text-foreground font-semibold", children: [
                  "$",
                  h.pricePerNight
                ] }),
                " ",
                "/night"
              ] })
            ] })
          ] }, h.name)) })
        ] }),
        aiInfo?.experiences && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Activities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Local Experiences" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid sm:grid-cols-3 gap-4", children: aiInfo.experiences.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl glass-card p-5 hover:border-amber/40 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-amber text-sm font-semibold mb-2", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90 font-light", children: exp })
          ] }, i)) })
        ] }),
        aiInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Practicalities" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Traveler Guidelines" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3.5 w-3.5" }),
                " Travel Tips"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: aiInfo.tips.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3.5 w-3.5 text-destructive" }),
                " Safety Tips"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: aiInfo.safetyTips.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5" }),
                " Photography"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: aiInfo.photographyTips.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: p }, i)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Community" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-6 w-6 text-amber" }),
            " Reviews & Ratings"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleReviewSubmit, className: "rounded-2xl glass-card p-5 space-y-4 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "Share your experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Rating:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setNewRating(star), className: "hover:scale-110 transition cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-5 w-5 ${newRating >= star ? "fill-amber text-amber" : "text-border"}` }) }, star)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { required: true, value: newComment, onChange: (e) => setNewComment(e.target.value), placeholder: user ? "Write your review..." : "Sign in to leave a review", disabled: !user, className: "w-full min-h-[90px] bg-background/60 border border-border rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-amber/30 resize-none disabled:opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: submittingReview || !user, className: "absolute bottom-3 right-3 rounded-full bg-primary p-2 text-primary-foreground hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-soft", children: submittingReview ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            usingSampleReviews && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sample reviews for preview — sign in to share your experience." }),
            reviewsToShow.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center py-6", children: "Be the first to review this place!" }),
            reviewsToShow.map((rev) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-2 shadow-soft", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: rev.display_name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(rev.created_at).toLocaleDateString() })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${rev.rating >= s ? "fill-amber text-amber" : "text-border"}` }, s)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed font-light", children: rev.content })
            ] }, rev.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6 lg:sticky lg:top-24 self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
              " Best time to visit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 flex items-center gap-2 font-display text-2xl font-bold", children: d.bestTime })
          ] }),
          aiInfo?.openingHours && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              " Opening Hours"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm font-medium text-foreground/90", children: aiInfo.openingHours })
          ] }),
          aiInfo?.entryFees && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4" }),
              " Entry Fees"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm font-medium text-foreground/90", children: aiInfo.entryFees })
          ] }),
          aiInfo?.travelInsights && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-amber/10 border border-amber/20 p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 animate-pulse" }),
              " Travel Insights"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed font-light", children: aiInfo.travelInsights })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-2 gap-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background/60 border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", children: d.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background/60 border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-3.5 w-3.5" }),
                " ",
                d.country
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", search: {
            destination: `${d.name}, ${d.country}`,
            auto: true
          }, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer", children: [
            "Plan a trip here ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-4 shadow-soft space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
            " Interactive Map"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl aspect-[4/3] border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: `${d.name} map`, src: d.mapEmbed, className: "h-full w-full", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", allowFullScreen: true }) })
        ] })
      ] })
    ] }),
    nearby.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose mt-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Nearby & similar" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl mt-2 mb-8 font-bold", children: "More heritage to explore" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: nearby.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(DestinationCard, { d: n }, n.slug)) })
    ] })
  ] });
}
export {
  DestinationPage as component
};
