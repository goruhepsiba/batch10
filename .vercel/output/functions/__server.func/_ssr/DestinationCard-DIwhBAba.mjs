import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { z as Star, g as MapPin } from "../_libs/lucide-react.mjs";
function DestinationCard({ d, eager = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/destination/$slug",
      params: { slug: d.slug },
      className: "group block overflow-hidden rounded-2xl glass-card hover:shadow-elegant transition-all duration-500 hover:-translate-y-1.5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: d.hero,
            alt: d.name,
            width: 1280,
            height: 896,
            loading: eager ? "eager" : "lazy",
            className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] uppercase tracking-[0.18em] text-amber", children: [
              d.category,
              d.unesco && " • UNESCO"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3.5 w-3.5 fill-amber text-amber" }),
              " ",
              d.rating
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-1.5 leading-tight", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 flex items-center gap-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            d.city,
            ", ",
            d.country
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground line-clamp-2", children: d.short })
        ] })
      ]
    }
  );
}
export {
  DestinationCard as D
};
