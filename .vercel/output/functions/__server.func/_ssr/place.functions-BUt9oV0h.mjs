import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-gJOel9qO.mjs";
import { c as createSsrRpc, u as useAuth } from "./router-FmIMkaxp.mjs";
import { c as createServerFn } from "./server-DuNsQK3D.mjs";
import { H as Heart, R as Rotate3d, s as Map, J as Maximize2, K as ExternalLink } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
function FavoriteButton({ kind, refId, name, country, lat, lng, size = "md" }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [favored, setFavored] = reactExports.useState(false);
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setFavored(false);
      return;
    }
    let cancelled = false;
    supabase.from("favorites").select("id").eq("user_id", user.id).eq("kind", kind).eq("ref", refId).maybeSingle().then(({ data }) => {
      if (!cancelled) setFavored(!!data);
    });
    return () => {
      cancelled = true;
    };
  }, [user, kind, refId]);
  const toggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    setBusy(true);
    try {
      if (favored) {
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("kind", kind).eq("ref", refId);
        if (error) throw error;
        setFavored(false);
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          kind,
          ref: refId,
          name,
          country: country ?? null,
          lat: lat ?? null,
          lng: lng ?? null
        });
        if (error) throw error;
        setFavored(true);
        toast.success("Saved to favorites");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn't update favorites");
    } finally {
      setBusy(false);
    }
  };
  if (loading) return null;
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconDim = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: toggle,
      disabled: busy,
      "aria-label": favored ? "Remove from favorites" : "Save to favorites",
      className: `inline-flex ${dim} items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur hover:bg-accent transition disabled:opacity-60`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Heart,
        {
          className: `${iconDim} ${favored ? "fill-amber text-amber" : "text-foreground/70"}`,
          strokeWidth: 1.6
        }
      )
    }
  );
}
const buildSearch = (query) => encodeURIComponent(query.trim());
function VirtualTourFrame({ title, lat, lng, query, mapEmbed }) {
  const [mode, setMode] = reactExports.useState("street");
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const links = reactExports.useMemo(() => {
    const streetEmbed = hasCoords ? `https://www.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=12,0,0,0,0&output=svembed` : `https://www.google.com/maps?q=${buildSearch(query)}&layer=c&output=svembed`;
    const streetOpen = hasCoords ? `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${lat},${lng}` : `https://www.google.com/maps/search/?api=1&query=${buildSearch(query)}`;
    const map = mapEmbed ?? `https://www.google.com/maps?q=${buildSearch(query)}&output=embed`;
    return { streetEmbed, streetOpen, map };
  }, [hasCoords, lat, lng, mapEmbed, query]);
  const src = mode === "street" ? links.streetEmbed : links.map;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 overflow-hidden rounded-lg border border-border/70 bg-card shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-background/70 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary", children: mode === "street" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Rotate3d, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: mode === "street" ? "Street View tour" : "Location map" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 overflow-hidden rounded-md border border-border bg-background text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setMode("street"),
              className: `inline-flex h-8 items-center justify-center gap-1.5 px-3 transition-colors ${mode === "street" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Rotate3d, { className: "h-3.5 w-3.5" }),
                "360"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setMode("map"),
              className: `inline-flex h-8 items-center justify-center gap-1.5 px-3 transition-colors ${mode === "map" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-3.5 w-3.5" }),
                "Map"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: mode === "street" ? links.streetOpen : `https://www.google.com/maps/search/?api=1&query=${buildSearch(query)}`,
            target: "_blank",
            rel: "noreferrer",
            className: "inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:bg-accent",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "h-3.5 w-3.5" }),
              "Open",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/9] bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "iframe",
      {
        title: `${title} ${mode === "street" ? "street view" : "map"}`,
        src,
        className: "h-full w-full",
        loading: "lazy",
        referrerPolicy: "no-referrer-when-downgrade",
        allowFullScreen: true
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 bg-background/70 px-4 py-3 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Drag inside the frame to look around." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Some remote sites may only have nearby Street View coverage." })
    ] })
  ] });
}
const Input = objectType({
  name: stringType().min(1).max(160),
  country: stringType().max(120).optional(),
  admin: stringType().max(120).optional()
});
const describePlace = createServerFn({
  method: "POST"
}).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("38c2bd6a11e738a606415250a53c1985f161a3fea2d2dc6fad575c9298e90e87"));
export {
  FavoriteButton as F,
  VirtualTourFrame as V,
  describePlace as d
};
