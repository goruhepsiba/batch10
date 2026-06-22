import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { e as Route$1, u as useAuth, b as useServerFn, d as destinations } from "./router-FmIMkaxp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { d as describePlace, F as FavoriteButton, V as VirtualTourFrame } from "./place.functions-BUt9oV0h.mjs";
import { s as supabase } from "./client-gJOel9qO.mjs";
import { g as geocodePlace } from "./geocode-D87yC2R4.mjs";
import "../_libs/seroval.mjs";
import { e as Sparkles, g as MapPin, f as LoaderCircle, C as Compass, w as Award, x as TramFront, A as ArrowRight, y as Utensils, z as Star, D as Hotel, F as ShieldAlert, G as Camera, d as MessageSquare, c as Send, h as Calendar, u as Clock, I as Coins, E as Earth } from "../_libs/lucide-react.mjs";
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
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DuNsQK3D.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function PlacePage() {
  const {
    name
  } = Route$1.useParams();
  const {
    lat,
    lng,
    country,
    admin
  } = Route$1.useSearch();
  const navigate = useNavigate();
  const decoded = decodeURIComponent(name);
  const {
    user
  } = useAuth();
  const describe = useServerFn(describePlace);
  const [info, setInfo] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [dbReviews, setDbReviews] = reactExports.useState([]);
  const [reviewsLoading, setReviewsLoading] = reactExports.useState(true);
  const [newRating, setNewRating] = reactExports.useState(5);
  const [newComment, setNewComment] = reactExports.useState("");
  const [submittingReview, setSubmittingReview] = reactExports.useState(false);
  const [coords, setCoords] = reactExports.useState(lat && lng ? {
    lat,
    lng,
    country,
    admin
  } : null);
  const refId = reactExports.useMemo(() => {
    return coords ? `${decoded}|${coords.country}`.toLowerCase() : `${decoded}|${country}`.toLowerCase();
  }, [decoded, coords, country]);
  reactExports.useEffect(() => {
    if (coords) return;
    (async () => {
      try {
        const results = await geocodePlace(decoded, 1);
        const r = results?.[0];
        if (!r) {
          setError("We couldn't locate that place.");
          setLoading(false);
          return;
        }
        setCoords({
          lat: r.latitude,
          lng: r.longitude,
          country: r.country ?? "",
          admin: r.admin1 ?? ""
        });
        navigate({
          to: "/place/$name",
          params: {
            name
          },
          search: {
            lat: r.latitude,
            lng: r.longitude,
            country: r.country ?? "",
            admin: r.admin1 ?? ""
          },
          replace: true
        });
      } catch {
        setError("Geocoding failed.");
        setLoading(false);
      }
    })();
  }, [coords, decoded, name, navigate]);
  reactExports.useEffect(() => {
    setCoords(lat && lng ? {
      lat,
      lng,
      country,
      admin
    } : null);
    setInfo(null);
    setError(null);
  }, [name, lat, lng, country, admin]);
  reactExports.useEffect(() => {
    if (!coords) return;
    let cancelled = false;
    setLoading(true);
    describe({
      data: {
        name: decoded,
        country: coords.country,
        admin: coords.admin
      }
    }).then((r) => {
      if (!cancelled) {
        setInfo(r);
        setLoading(false);
      }
    }).catch((e) => {
      if (!cancelled) {
        setError(e.message);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [coords, decoded, describe, name]);
  const fetchReviews = async () => {
    if (!refId) return;
    setReviewsLoading(true);
    try {
      const {
        data,
        error: error2
      } = await supabase.from("reviews").select("*").eq("place_ref", refId).order("created_at", {
        ascending: false
      });
      if (error2) throw error2;
      setDbReviews(data || []);
    } catch (err) {
      console.warn("Could not fetch user reviews:", err);
    } finally {
      setReviewsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (coords) {
      fetchReviews();
    }
  }, [coords, refId]);
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
        data: profile
      } = await supabase.from("profiles").select("display_name").eq("id", user.id).single();
      const {
        error: error2
      } = await supabase.from("reviews").insert({
        user_id: user.id,
        place_ref: refId,
        rating: newRating,
        content: newComment,
        display_name: profile?.display_name || user.email?.split("@")[0] || "Traveler"
      });
      if (error2) throw error2;
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
  const locationQuery = reactExports.useMemo(() => decoded + (coords?.admin ? ", " + coords.admin : "") + (coords?.country ? ", " + coords.country : ""), [decoded, coords]);
  const mapEmbed = reactExports.useMemo(() => `https://www.google.com/maps?q=${encodeURIComponent(decoded + (coords?.country ? ", " + coords.country : ""))}&output=embed`, [decoded, coords]);
  const [heroImage, setHeroImage] = reactExports.useState(null);
  reactExports.useEffect(() => {
    let cancelled = false;
    setHeroImage(null);
    const candidates = [decoded, `${decoded} ${coords?.admin ?? ""}`.trim(), `${decoded} ${coords?.country ?? ""}`.trim()];
    (async () => {
      for (const q of candidates) {
        try {
          const sr = await fetch(`https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=original|thumbnail&pithumbsize=1600&generator=search&gsrlimit=1&gsrsearch=${encodeURIComponent(q)}`);
          const j = await sr.json();
          const pages = j?.query?.pages;
          const first = pages ? Object.values(pages)[0] : null;
          const url = first?.original?.source ?? first?.thumbnail?.source;
          if (url && !cancelled) {
            setHeroImage(url);
            return;
          }
        } catch {
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [decoded, coords, name]);
  const reviewsToShow = reactExports.useMemo(() => {
    if (dbReviews.length > 0) return dbReviews;
    if (info?.reviews) {
      return info.reviews.map((r, i) => ({
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
  }, [dbReviews, info, refId]);
  const usingSampleReviews = dbReviews.length === 0 && Boolean(info?.reviews?.length);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative isolate overflow-hidden", children: [
      heroImage && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: heroImage, alt: `${decoded}`, className: "absolute inset-0 -z-20 h-full w-full object-cover", loading: "eager" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10", style: {
        background: "var(--gradient-hero)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 opacity-40 mix-blend-multiply", style: {
        background: "var(--gradient-amber)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose pt-24 pb-20 md:pt-32 md:pb-28 text-parchment", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.24em] text-amber/90 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI-Generated Dynamic Profile" }),
          info?.category && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: info.category })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-display text-5xl md:text-7xl leading-[1.02] text-parchment drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] font-bold", children: decoded }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 flex items-center gap-2 text-parchment/85 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
          [coords?.admin, coords?.country || country].filter(Boolean).join(", ") || "Locating…"
        ] }),
        info?.short && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 max-w-2xl text-lg text-parchment/90 drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)] font-light leading-relaxed", children: info.short }),
        coords && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FavoriteButton, { kind: "place", refId, name: decoded, country: coords.country, lat: coords.lat, lng: coords.lng }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            if (confirm(`Want to plan a trip to ${decoded}? Our AI will draft an itinerary now.`)) {
              const dest = `${decoded}${coords.country ? ", " + coords.country : ""}`;
              navigate({
                to: "/planner",
                search: {
                  destination: dest,
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
        loading && !info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-10 flex items-center gap-3 text-muted-foreground shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin text-amber" }),
          "Composing a comprehensive travel dossier for ",
          decoded,
          "…"
        ] }),
        error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-destructive/30 bg-card p-6 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-destructive", children: "Something went wrong" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: error })
        ] }),
        info && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 font-bold", children: [
              decoded,
              ", briefly told"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 leading-relaxed text-foreground/90 whitespace-pre-line text-sm md:text-base font-light", children: info.about }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3.5 w-3.5" }),
                  " Cultural Significance"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm leading-relaxed text-foreground/80 font-light", children: info.significance })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "h-3.5 w-3.5" }),
                  " Architecture & Landscape"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2.5 text-sm leading-relaxed text-foreground/80 font-light", children: info.architecture })
              ] })
            ] })
          ] }),
          info.timeline?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "History" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Historical Timeline" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-6 relative border-l border-border pl-6 space-y-6", children: info.timeline.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-amber ring-4 ring-background transition group-hover:scale-125" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold text-amber", children: t.year }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1 leading-relaxed font-light", children: t.event })
            ] }, i)) })
          ] }),
          info.transportation && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl glass-card p-6 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TramFront, { className: "h-4 w-4" }),
              " Transportation Information"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed text-foreground/90 font-light", children: info.transportation })
          ] }),
          coords && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "360° Virtual visit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Step inside before you go" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(VirtualTourFrame, { title: decoded, lat: coords.lat, lng: coords.lng, query: locationQuery, mapEmbed })
          ] }),
          (info.nearby?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Local Guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Nearby Attractions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-4", children: info.nearby.map((n) => {
              const curatedMatch = destinations.find((d) => d.name.toLowerCase() === n.toLowerCase() || d.slug.toLowerCase() === n.toLowerCase());
              return curatedMatch ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/destination/$slug", params: {
                slug: curatedMatch.slug
              }, className: "rounded-2xl glass-card p-5 hover:shadow-elegant hover:border-amber/40 transition-all duration-500 hover:-translate-y-0.5 group flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium group-hover:text-amber transition", children: n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber mt-1 font-semibold uppercase tracking-wider flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3" }),
                    " Curated Heritage"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition" })
              ] }, n) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/place/$name", params: {
                name: n
              }, search: {
                lat: 0,
                lng: 0,
                country: "",
                admin: ""
              }, className: "rounded-2xl glass-card p-5 hover:shadow-elegant hover:border-amber/40 transition-all duration-500 hover:-translate-y-0.5 group flex justify-between items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-medium group-hover:text-amber transition", children: n }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Heritage landmark" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4 text-muted-foreground group-hover:text-amber group-hover:translate-x-1 transition" })
              ] }, n);
            }) })
          ] }),
          (info.restaurants?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Dine" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 flex items-center gap-2 font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Utensils, { className: "h-6 w-6 text-amber" }),
              " Nearby Restaurants"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-4", children: info.restaurants.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
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
          (info.hotels?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Stay" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-3xl mt-2 flex items-center gap-2 font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Hotel, { className: "h-6 w-6 text-amber", strokeWidth: 1.6 }),
              " Recommended hotels"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid sm:grid-cols-2 gap-4", children: info.hotels.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
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
                  " km away"
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
          (info.experiences?.length ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Activities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Local Experiences" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid sm:grid-cols-3 gap-4", children: info.experiences.map((exp, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-2xl glass-card p-5 hover:border-amber/40 hover:shadow-elegant transition-all duration-500 hover:-translate-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block text-amber text-sm font-semibold mb-2", children: [
                "0",
                i + 1
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-foreground/90 font-light", children: exp })
            ] }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Practicalities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl mt-2 font-bold", children: "Traveler Guidelines" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-3.5 w-3.5" }),
                  " Travel Tips"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: info.tips.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: t }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-3.5 w-3.5 text-destructive" }),
                  " Safety Tips"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: info.safetyTips.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-5 space-y-3 shadow-soft", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-3.5 w-3.5" }),
                  " Photography"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "text-xs space-y-2 text-foreground/90 font-light list-disc pl-3", children: info.photographyTips.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: p }, i)) })
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
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-6 lg:sticky lg:top-24 self-start", children: [
        info && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
              " Best time to visit"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-2xl font-bold", children: info.bestTime })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4" }),
              " Opening Hours"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm font-medium text-foreground/90", children: info.openingHours })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4" }),
              " Entry Fees"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm font-medium text-foreground/90", children: info.entryFees })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-amber/10 border border-amber/20 p-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.16em] text-amber font-semibold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 animate-pulse" }),
              " Travel Insights"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed font-light", children: info.travelInsights })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background/60 border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold", children: info.category })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background/60 border border-border/60 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "Country" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-semibold flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "h-3.5 w-3.5" }),
                " ",
                info.country
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/planner", search: {
            destination: `${decoded}${coords?.country ? ", " + coords.country : ""}`,
            auto: true
          }, className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 shadow-soft transition cursor-pointer", children: [
            "Plan a trip here ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] })
        ] }),
        coords && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-4 shadow-soft space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
            " Interactive Map"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-xl aspect-[4/3] border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { title: `${decoded} map`, src: mapEmbed, className: "h-full w-full", loading: "lazy", referrerPolicy: "no-referrer-when-downgrade", allowFullScreen: true }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  PlacePage as component
};
