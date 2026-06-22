import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a as Route$5, u as useAuth, b as useServerFn, c as createSsrRpc } from "./router-FmIMkaxp.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn } from "./server-DuNsQK3D.mjs";
import { s as supabase } from "./client-gJOel9qO.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import "../_libs/seroval.mjs";
import { e as Sparkles, g as MapPin, h as Calendar, W as Wallet, f as LoaderCircle, i as BookmarkCheck, j as BookmarkPlus, S as Sun, k as Layers, l as ChartColumn, m as Sunrise, M as Moon, n as UtensilsCrossed, C as Compass, o as ChevronRight } from "../_libs/lucide-react.mjs";
import { B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, L as LineChart, b as Line, R as ResponsiveContainer } from "../_libs/recharts.mjs";
import { o as objectType, s as stringType, a as arrayType, e as enumType, n as numberType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const Input = objectType({
  destination: stringType().min(1).max(120),
  days: numberType().int().min(1).max(14),
  budget: enumType(["budget", "mid", "luxury"]),
  interests: arrayType(stringType().min(1).max(40)).min(1).max(8),
  style: stringType().min(1).max(40)
});
const generateItinerary = createServerFn({
  method: "POST"
}).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("45c0bfa6d4d83ec62f4f705bbe35b1b56d0e9491031256d2c8e19622c7540154"));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = reactExports.createContext(null);
function useChart() {
  const context = reactExports.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = reactExports.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = reactExports.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, config2]) => config2.theme || config2.color);
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = Tooltip;
const ChartTooltipContent = reactExports.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = reactExports.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
      if (labelFormatter) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      if (!value) {
        return null;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !payload?.length) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  itemConfig?.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                        ] }),
                        item.value && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              item.dataKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegendContent = reactExports.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          item.value
        );
      })
    }
  );
});
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
const interestOptions = ["History", "Architecture", "Food", "Spiritual", "Photography", "Adventure", "Nightlife", "Nature"];
const styles = ["Relaxed", "Balanced", "Packed"];
function Planner() {
  const search = Route$5.useSearch();
  const {
    user
  } = useAuth();
  const generate = useServerFn(generateItinerary);
  const mutation = useMutation({
    mutationFn: (data) => generate({
      data
    })
  });
  const [destination, setDestination] = reactExports.useState(search.destination ?? "Hyderabad, India");
  const [days, setDays] = reactExports.useState(3);
  const [budget, setBudget] = reactExports.useState("mid");
  const [style, setStyle] = reactExports.useState("Balanced");
  const [interests, setInterests] = reactExports.useState(["History", "Architecture", "Food"]);
  const [loadedTrip, setLoadedTrip] = reactExports.useState(null);
  const [loadingSavedTrip, setLoadingSavedTrip] = reactExports.useState(false);
  const toggle = (i) => setInterests((s) => s.includes(i) ? s.filter((x) => x !== i) : [...s, i]);
  const submit = (e) => {
    e.preventDefault();
    if (interests.length === 0) {
      toast.error("Please select at least one interest!");
      return;
    }
    setLoadedTrip(null);
    mutation.mutate({
      destination,
      days,
      budget,
      interests,
      style
    });
  };
  reactExports.useEffect(() => {
    if (!search.tripId) return;
    if (!user) {
      toast.error("Sign in to view saved itineraries.");
      return;
    }
    let cancelled = false;
    setLoadingSavedTrip(true);
    (async () => {
      const {
        data,
        error
      } = await supabase.from("saved_trips").select("destination,days,budget,itinerary").eq("id", search.tripId).eq("user_id", user.id).maybeSingle();
      if (cancelled) return;
      if (error || !data?.itinerary) {
        toast.error(error?.message ?? "Saved itinerary not found.");
        setLoadingSavedTrip(false);
        return;
      }
      const itinerary = data.itinerary;
      setLoadedTrip(itinerary);
      setDestination(data.destination);
      setDays(data.days);
      if (data.budget === "budget" || data.budget === "mid" || data.budget === "luxury") {
        setBudget(data.budget);
      }
      setLoadingSavedTrip(false);
      toast.success("Loaded your saved itinerary.");
    })();
    return () => {
      cancelled = true;
    };
  }, [search.tripId, user]);
  const activeItinerary = loadedTrip ?? mutation.data;
  const isBusy = mutation.isPending || loadingSavedTrip;
  const autoRan = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (search.auto && search.destination && !autoRan.current) {
      autoRan.current = true;
      mutation.mutate({
        destination: search.destination,
        days,
        budget,
        interests,
        style
      });
    }
  }, [search.auto, search.destination]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-prose py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.24em] text-amber inline-flex items-center gap-2 font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 animate-pulse" }),
        " AI Trip Planner"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-5xl md:text-6xl mt-3 leading-[1.02] font-bold", children: [
        "Your heritage trip,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-gradient-amber", children: "drafted in seconds." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-sm md:text-base font-light", children: "Tell us where, how long, and what excites you — we'll craft a day-by-day itinerary with real places, authentic dishes, and geographic planning to optimize travel times." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid lg:grid-cols-5 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "lg:col-span-2 rounded-2xl glass-card p-6 space-y-6 h-fit lg:sticky lg:top-24 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Destination", icon: MapPin, children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", { required: true, value: destination, onChange: (e) => setDestination(e.target.value), placeholder: "e.g. Kyoto, Japan", className: "w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber/30 text-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "Days", icon: Calendar, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 1, max: 10, value: days, onChange: (e) => setDays(Number(e.target.value)), className: "w-full accent-[var(--amber)] cursor-pointer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "1 Day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-amber", children: [
              days,
              " Day",
              days > 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "10 Days" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Budget", icon: Wallet, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: ["budget", "mid", "luxury"].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setBudget(b), className: `rounded-xl border py-2.5 text-xs font-semibold capitalize transition cursor-pointer ${budget === b ? "border-amber bg-amber/10 text-foreground" : "border-border hover:bg-accent/40 text-muted-foreground"}`, children: b === "mid" ? "Mid-range" : b === "budget" ? "Student" : b }, b)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Style", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: styles.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setStyle(s), className: `rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${style === s ? "border-amber bg-amber/10 text-foreground" : "border-border hover:bg-accent/40 text-muted-foreground"}`, children: s }, s)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Interests", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: interestOptions.map((i) => {
          const on = interests.includes(i);
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => toggle(i), className: `rounded-full px-3 py-1.5 text-xs border transition cursor-pointer ${on ? "border-amber bg-amber/15 text-foreground font-medium" : "border-border text-muted-foreground hover:bg-accent/40"}`, children: i }, i);
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: isBusy, className: "w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60 transition shadow-soft cursor-pointer", children: isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
          " Composing Plan…"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-amber" }),
          " Generate Itinerary"
        ] }) }),
        mutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center", children: mutation.error.message })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3", children: [
        !activeItinerary && !isBusy && /* @__PURE__ */ jsxRuntimeExports.jsx(PlaceholderResult, {}),
        isBusy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingResult, {}),
        activeItinerary && /* @__PURE__ */ jsxRuntimeExports.jsx(ItineraryView, { itinerary: activeItinerary, input: {
          destination,
          days,
          budget
        }, alreadySaved: Boolean(search.tripId) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5 font-semibold", children: [
      Icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-amber" }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children })
  ] });
}
function PlaceholderResult() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-dashed border-border glass-card p-10 text-center space-y-4 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-9 w-9 text-amber mx-auto", strokeWidth: 1.5 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold", children: "Your itinerary will appear here" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-sm mx-auto text-sm font-light leading-relaxed", children: "Specify your trip preferences on the left panel, and our AI travel guide will generate a rich heritage-oriented dossier." })
  ] });
}
function LoadingResult() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 animate-pulse space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-20 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-7 w-2/3 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-full bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-24 bg-muted rounded-full" })
    ] }),
    [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-card p-6 animate-pulse space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-16 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-1/2 bg-muted rounded" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-5/6 bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-full bg-muted rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-4/5 bg-muted rounded" })
      ] })
    ] }, i))
  ] });
}
function ItineraryView({
  itinerary,
  input,
  alreadySaved = false
}) {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(alreadySaved);
  reactExports.useEffect(() => {
    setSaved(alreadySaved);
  }, [alreadySaved]);
  const [view, setView] = reactExports.useState("timeline");
  const saveTrip = async () => {
    if (!user) {
      navigate({
        to: "/auth"
      });
      return;
    }
    setSaving(true);
    try {
      const {
        error
      } = await supabase.from("saved_trips").insert({
        user_id: user.id,
        destination: input.destination,
        days: input.days,
        budget: input.budget,
        itinerary: JSON.parse(JSON.stringify(itinerary))
      });
      if (error) throw error;
      setSaved(true);
      toast.success("Itinerary saved successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save itinerary");
    } finally {
      setSaving(false);
    }
  };
  const chartData = itinerary.days.map((d) => ({
    name: `Day ${d.day}`,
    cost: d.estimatedCostUSD
  }));
  let cumulativeSum = 0;
  const cumulativeData = itinerary.days.map((d) => {
    cumulativeSum += d.estimatedCostUSD;
    return {
      name: `Day ${d.day}`,
      cumulative: cumulativeSum
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft relative overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-amber/5 blur-xl group-hover:scale-150 transition duration-500" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber font-semibold", children: "Itinerary dossier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl md:text-4xl mt-1 font-bold", children: itinerary.destination })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: saveTrip, disabled: saving || saved, className: "inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60 cursor-pointer shadow-soft transition", children: [
          saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkCheck, { className: "h-3.5 w-3.5 text-amber" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookmarkPlus, { className: "h-3.5 w-3.5" }),
          saved ? "Saved" : "Save trip"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-foreground/80 font-light", children: itinerary.summary }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-2.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { icon: Wallet, children: [
          "$",
          itinerary.estimatedCostUSD.low,
          "–$",
          itinerary.estimatedCostUSD.high,
          " est. cost"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { icon: Calendar, children: [
          itinerary.days.length,
          " Day",
          itinerary.days.length > 1 ? "s" : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill, { icon: Sun, children: [
          "Best visiting: ",
          itinerary.bestTime
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border-b border-border/60 pb-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setView("timeline"), className: `flex items-center gap-1.5 pb-2 text-sm font-semibold transition border-b-2 outline-none cursor-pointer ${view === "timeline" ? "border-amber text-foreground font-bold" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-4 w-4" }),
        "Itinerary Timeline"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setView("budget"), className: `flex items-center gap-1.5 pb-2 text-sm font-semibold transition border-b-2 outline-none cursor-pointer ${view === "budget" ? "border-amber text-foreground font-bold" : "border-transparent text-muted-foreground hover:text-foreground"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4" }),
        "Budget Analytics"
      ] })
    ] }),
    view === "timeline" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative border-l border-border pl-6 ml-3 space-y-8", children: itinerary.days.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-amber border-4 border-background shadow-soft ring-2 ring-amber/20 group-hover:scale-110 transition" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 border-l-4 border-l-amber/70 shadow-soft hover:shadow-elegant transition-all duration-500 space-y-4 hover:-translate-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-4 border-b border-border/40 pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold", children: [
                "Day ",
                d.day
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl mt-0.5 font-bold", children: d.theme })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-muted-foreground bg-accent/40 px-2 py-1 rounded-md", children: [
              "~$",
              d.estimatedCostUSD,
              " cost"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slot, { icon: Sunrise, label: "Morning", children: d.morning }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slot, { icon: Sun, label: "Afternoon", children: d.afternoon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slot, { icon: Moon, label: "Evening", children: d.evening }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Slot, { icon: UtensilsCrossed, label: "Authentic Dining", children: d.food })
          ] })
        ] })
      ] }, d.day)) }),
      itinerary.tips?.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl glass-card p-6 shadow-soft space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4 w-4" }),
          " Travel Concierge Tips"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid sm:grid-cols-2 gap-3 text-xs leading-relaxed text-foreground/80 font-light", children: itinerary.tips.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5 text-amber shrink-0 mt-0.5" }),
          t
        ] }, i)) })
      ] })
    ] }) : (
      /* Budget Analytics View */
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass-card p-4 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold", children: "Total Trip Cost" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground font-display", children: [
              "$",
              itinerary.days.reduce((sum, d) => sum + d.estimatedCostUSD, 0)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Sum of daily estimates" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass-card p-4 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold", children: "Average / Day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground font-display", children: [
              "$",
              Math.round(itinerary.days.reduce((sum, d) => sum + d.estimatedCostUSD, 0) / itinerary.days.length)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Per day average spend" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl glass-card p-4 space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-wider font-semibold", children: "Peak Day" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground font-display", children: [
              "Day",
              " ",
              itinerary.days.reduce((maxDay, d) => d.estimatedCostUSD > maxDay.cost ? {
                day: d.day,
                cost: d.estimatedCostUSD
              } : maxDay, {
                day: 1,
                cost: 0
              }).day,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-normal text-muted-foreground ml-1", children: [
                "($",
                itinerary.days.reduce((maxCost, d) => Math.max(maxCost, d.estimatedCostUSD), 0),
                ")"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Peak daily expenditure" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Daily Expenditure" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Estimated daily costs over the trip" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[250px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { config: {
              cost: {
                label: "Daily Cost",
                color: "hsl(var(--amber))"
              }
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: chartData, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickLine: false, axisLine: false, tickFormatter: (v) => `$${v}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "cost", fill: "var(--color-cost)", radius: [4, 4, 0, 0] })
            ] }) }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-card p-5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-sm", children: "Cumulative Budget Track" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Total spending projection over time" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[250px] w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { config: {
              cumulative: {
                label: "Total Spend",
                color: "hsl(var(--primary))"
              }
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: cumulativeData, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", vertical: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tickLine: false, axisLine: false }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickLine: false, axisLine: false, tickFormatter: (v) => `$${v}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "cumulative", stroke: "var(--color-cumulative)", strokeWidth: 2, activeDot: {
                r: 6
              } })
            ] }) }) })
          ] })
        ] })
      ] })
    )
  ] });
}
function Pill({
  icon: Icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-background/60 border border-border/60 px-3 py-1.5 text-foreground/90 font-medium", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-amber" }),
    children
  ] });
}
function Slot({
  icon: Icon,
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 h-8 w-8 rounded-full bg-amber/10 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-amber" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1 leading-relaxed text-foreground/90 font-light", children })
    ] })
  ] });
}
export {
  Planner as component
};
