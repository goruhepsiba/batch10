import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useNavigate, e as useLocation } from "../_libs/tanstack__react-router.mjs";
import { S as notFound, m as isRedirect } from "../_libs/tanstack__router-core.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-gJOel9qO.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-DuNsQK3D.mjs";
import { C as Compass, H as Heart, S as Sun, M as Moon, B as BookMarked, L as LogOut, U as User, X, a as Menu, b as CircleQuestionMark, c as Send, d as MessageSquare } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, n as numberType, c as coerce, a as arrayType, e as enumType } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
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
function useServerFn(serverFn) {
  const router2 = useRouter();
  return reactExports.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router2.stores.location.get();
        return router2.navigate(router2.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router2, serverFn]);
}
const appCss = "/assets/styles-exrvBFj5.css";
function useAuth() {
  const [state, setState] = reactExports.useState({ session: null, user: null, loading: true });
  reactExports.useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ session, user: session?.user ?? null, loading: false });
    });
    supabase.auth.getSession().then(({ data }) => {
      setState({ session: data.session, user: data.session?.user ?? null, loading: false });
    });
    return () => subscription.unsubscribe();
  }, []);
  return state;
}
const navLinks = [
  { to: "/", label: "Explore", exact: true },
  { to: "/search", label: "Destinations", search: { q: "" } },
  { to: "/planner", label: "AI Planner" }
];
function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = reactExports.useState("light");
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || localStorage.theme === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(isDark ? "dark" : "light");
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setTheme("dark");
    }
  };
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) toast.error(error.message);
    else {
      toast.success("Signed out");
      navigate({ to: "/" });
    }
    setMobileOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[1200px] mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-2 sm:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", onClick: () => setMobileOpen(false), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Compass,
          {
            className: "h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-700 group-hover:rotate-[360deg]",
            strokeWidth: 1.6
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-xl sm:text-2xl tracking-tight", children: [
          "Heritage",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-amber", children: "Verse" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-7 text-sm text-muted-foreground", children: [
        navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: link.to,
            search: "search" in link ? link.search : void 0,
            className: "hover:text-foreground transition-colors",
            activeOptions: link.exact ? { exact: true } : void 0,
            activeProps: { className: "text-foreground" },
            children: link.label
          },
          link.to
        )),
        user && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/favorites",
            className: "hover:text-foreground transition-colors flex items-center gap-1.5",
            activeProps: { className: "text-foreground" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-3.5 w-3.5" }),
              " Favorites"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: toggleTheme,
            className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
            "aria-label": "Toggle theme",
            children: theme === "dark" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-4 w-4 text-amber" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-4 w-4 text-amber" })
          }
        ),
        loading ? null : user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/favorites",
              className: "hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-sm hover:bg-accent whitespace-nowrap",
              title: "My favorites & trips",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BookMarked, { className: "h-4 w-4 text-amber" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: user.email })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: signOut,
              className: "hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground hover:opacity-90 whitespace-nowrap cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign out" })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/auth",
            className: "hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground hover:opacity-90 whitespace-nowrap cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-4 w-4" }),
              " Sign in"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setMobileOpen((open) => !open),
            className: "md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground",
            "aria-label": mobileOpen ? "Close menu" : "Open menu",
            children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-4 w-4" })
          }
        )
      ] })
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:hidden border-t border-border/60 bg-background/95 backdrop-blur px-4 py-4 space-y-1", children: [
      navLinks.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: link.to,
          search: "search" in link ? link.search : void 0,
          className: "block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
          activeOptions: link.exact ? { exact: true } : void 0,
          activeProps: { className: "bg-accent text-foreground font-medium" },
          onClick: () => setMobileOpen(false),
          children: link.label
        },
        link.to
      )),
      user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/favorites",
            className: "block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
            onClick: () => setMobileOpen(false),
            children: "Favorites"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: signOut,
            className: "w-full text-left rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground",
            children: "Sign out"
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/auth",
          className: "block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground bg-primary/10",
          onClick: () => setMobileOpen(false),
          children: "Sign in"
        }
      )
    ] })
  ] });
}
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-24 border-t border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-prose py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg text-foreground", children: [
      "Heritage",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient-amber", children: "Verse" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Crafted for travellers who chase history. © ",
      (/* @__PURE__ */ new Date()).getFullYear()
    ] })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const Input = objectType({
  message: stringType().min(1).max(2e3),
  history: arrayType(objectType({
    role: enumType(["user", "assistant"]),
    content: stringType()
  })).optional(),
  contextPage: stringType().optional()
});
const askAssistant = createServerFn({
  method: "POST"
}).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("d3bfb29af9397275fb28e3d92ee57346e58f10677fecede46abec9f537989187"));
function parseInlineStyles(text) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold text-amber-deep dark:text-amber", children: part.slice(2, -2) }, i);
    }
    return part;
  });
}
function formatMessageContent(content) {
  const lines = content.split("\n");
  return lines.map((line, idx) => {
    const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const text = parseInlineStyles(headerMatch[2]);
      if (level === 3 || level === 4) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h4",
          {
            className: "font-display font-semibold text-amber mt-3 mb-1.5 text-sm uppercase tracking-wider",
            children: text
          },
          idx
        );
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h5",
        {
          className: "font-display font-medium text-foreground mt-2 mb-1 text-xs uppercase tracking-wider",
          children: text
        },
        idx
      );
    }
    const bulletMatch = line.match(/^[-*]\s+(.*)$/);
    if (bulletMatch) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "list-disc ml-4 mt-1 pl-1 text-xs font-light text-foreground/90", children: parseInlineStyles(bulletMatch[1]) }, idx);
    }
    const numberMatch = line.match(/^(\d+)\.\s+(.*)$/);
    if (numberMatch) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "list-decimal ml-4 mt-1 pl-1 text-xs font-light text-foreground/90", children: parseInlineStyles(numberMatch[2]) }, idx);
    }
    if (!line.trim()) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2" }, idx);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-light leading-relaxed mb-1.5 text-foreground/90", children: parseInlineStyles(line) }, idx);
  });
}
const suggestions = [
  "Tell me about Taj Mahal",
  "Itinerary tips for Kyoto",
  "History of Charminar",
  "How does this site work?"
];
function ChatbotWidget() {
  const ask = useServerFn(askAssistant);
  const location = useLocation();
  const [open, setOpen] = reactExports.useState(false);
  const [input, setInput] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [messages, setMessages] = reactExports.useState([
    {
      role: "assistant",
      content: "Hello traveler! I am your HeritageVerse Travel Concierge. Ask me anything about historical sites, local culture, travel guides, or itinerary details. What is your next destination?"
    }
  ]);
  const messagesEndRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);
  const handleSend = async (textToSend) => {
    if (!textToSend.trim() || loading) return;
    const userMessage = { role: "user", content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const response = await ask({
        data: {
          message: textToSend,
          history: messages.slice(-10),
          // Send last 10 turns for context
          contextPage: location.pathname
        }
      });
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (err) {
      console.error("Chatbot request failed", err);
      toast.error("Failed to connect to the assistant.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered a connection error. Please try again or ask something else!"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed bottom-6 right-6 z-50 flex flex-col items-end", children: [
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 w-[340px] sm:w-[380px] h-[480px] rounded-2xl glass-card shadow-elegant flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[var(--gradient-amber)] p-4 flex items-center justify-between text-primary-foreground shadow-sm z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-8 w-8 place-items-center rounded-full bg-background/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Compass, { className: "h-4.5 w-4.5 text-primary-foreground animate-spin-slow" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm", children: "Travel Concierge" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] opacity-90", children: "Powered by HeritageVerse AI" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setOpen(false),
            className: "text-primary-foreground/85 hover:text-primary-foreground hover:bg-background/20 p-1.5 rounded-full transition-colors cursor-pointer",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4.5 w-4.5" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4 bg-[var(--gradient-parchment)]/30", children: [
        messages.map((m, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex ${m.role === "user" ? "justify-end" : "justify-start"}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm font-light leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground rounded-tr-none shadow-soft" : "glass-card text-foreground rounded-tl-none shadow-soft"}`,
                children: m.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "whitespace-pre-line text-xs font-light", children: m.content }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: formatMessageContent(m.content) })
              }
            )
          },
          idx
        )),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-card rounded-2xl rounded-tl-none px-3.5 py-2.5 text-sm text-muted-foreground flex items-center gap-1.5 shadow-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-2 w-2 bg-amber rounded-full animate-bounce",
              style: { animationDelay: "0ms" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-2 w-2 bg-amber rounded-full animate-bounce",
              style: { animationDelay: "150ms" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "h-2 w-2 bg-amber rounded-full animate-bounce",
              style: { animationDelay: "300ms" }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: messagesEndRef })
      ] }),
      messages.length === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-2.5 border-t border-border/40 bg-card/60 backdrop-blur-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-2 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-3 w-3 text-amber" }),
          " Suggested Prompts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: suggestions.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => handleSend(s),
            className: "text-[11px] bg-background/80 border border-border/60 hover:border-amber/55 hover:bg-amber/10 text-muted-foreground hover:text-foreground rounded-full px-2.5 py-1.5 transition-colors cursor-pointer",
            children: s
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit,
          className: "p-3 border-t border-border/60 bg-card/80 backdrop-blur-md flex gap-2 z-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: input,
                onChange: (e) => setInput(e.target.value),
                placeholder: "Ask about Taj Mahal, Kyoto...",
                className: "flex-1 bg-background/60 border border-border rounded-xl px-3 py-2 text-sm outline-none focus:border-amber text-foreground",
                disabled: loading,
                maxLength: 1e3
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "submit",
                disabled: loading || !input.trim(),
                className: "bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 h-9 w-9 rounded-xl grid place-items-center transition cursor-pointer",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" })
              }
            )
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "h-14 w-14 rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 relative group",
        "aria-label": "Ask Travel AI",
        children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-6 w-6 group-hover:scale-115 transition duration-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute -top-1 -right-1 flex h-4 w-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex rounded-full h-4 w-4 bg-amber text-[9px] text-primary font-bold items-center justify-center", children: "AI" })
          ] })
        ] })
      }
    )
  ] });
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm uppercase tracking-[0.2em] text-amber", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl mt-2", children: "Lost on the trail" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "That destination isn't on our map yet. Head back home to keep exploring." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
        children: "Back to HeritageVerse"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[70vh] items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Something went wrong. Try again or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "HeritageVerse — Discover the world's heritage" },
      {
        name: "description",
        content: "Explore cultural and historical destinations worldwide with rich guides, 360° views, weather, hotels and AI trip planning."
      },
      { property: "og:title", content: "HeritageVerse — Discover the world's heritage" },
      { property: "og:description", content: "AI-powered heritage tourism platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Karla:wght@300;400;500;600;700&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          dangerouslySetInnerHTML: {
            __html: `
              (function() {
                var isDark = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              })();
            `
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ChatbotWidget, {})
  ] }) });
}
const $$splitComponentImporter$6 = () => import("./search-Bp8fHhdQ.mjs");
const SearchSchema$1 = objectType({
  q: stringType().catch("")
});
const Route$6 = createFileRoute("/search")({
  validateSearch: SearchSchema$1,
  head: ({
    match
  }) => ({
    meta: [{
      title: `Search${match.search.q ? ` — ${match.search.q}` : ""} · HeritageVerse`
    }, {
      name: "description",
      content: "Search heritage destinations worldwide."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./planner-Bo02cDlG.mjs");
const PlannerSearch = objectType({
  destination: stringType().optional().catch(void 0),
  auto: coerce.boolean().optional().catch(void 0),
  tripId: stringType().uuid().optional().catch(void 0)
});
const Route$5 = createFileRoute("/planner")({
  validateSearch: PlannerSearch,
  head: () => ({
    meta: [{
      title: "AI Trip Planner · HeritageVerse"
    }, {
      name: "description",
      content: "Generate a custom heritage travel itinerary in seconds with AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./favorites-B5OtW6jE.mjs");
const Route$4 = createFileRoute("/favorites")({
  head: () => ({
    meta: [{
      title: "My favorites · HeritageVerse"
    }, {
      name: "description",
      content: "Your saved heritage places and AI-generated itineraries."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./auth-lJ_PI19t.mjs");
const Route$3 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Sign in · HeritageVerse"
    }, {
      name: "description",
      content: "Sign in or create an account to save heritage places and AI itineraries."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-DN3UnZgz.mjs");
const Route$2 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "HeritageVerse — Discover the world's heritage"
    }, {
      name: "description",
      content: "Search forts, palaces, temples and UNESCO sites. Read rich guides, view hotels, weather and 360° tours. Generate AI itineraries in seconds."
    }, {
      property: "og:title",
      content: "HeritageVerse — Discover the world's heritage"
    }, {
      property: "og:description",
      content: "AI-powered heritage tourism: search, plan, and explore."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./place._name-Bmm3UICE.mjs");
const SearchSchema = objectType({
  lat: numberType().catch(0),
  lng: numberType().catch(0),
  country: stringType().catch(""),
  admin: stringType().catch("")
});
const Route$1 = createFileRoute("/place/$name")({
  validateSearch: SearchSchema,
  head: ({
    params
  }) => ({
    meta: [{
      title: `${decodeURIComponent(params.name)} · HeritageVerse`
    }, {
      name: "description",
      content: `Discover ${decodeURIComponent(params.name)} — history, culture, hotels and trip planning.`
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const charminar = "/assets/dest-charminar-BQfToxs0.jpg";
const taj = "/assets/dest-taj-BtASStgL.jpg";
const hampi = "/assets/dest-hampi-Jq2wcrK1.jpg";
const kyoto = "/assets/dest-kyoto-xqipYrIQ.jpg";
const golconda = "/assets/dest-golconda-B1KIl-Oe.jpg";
const jaipur = "/assets/dest-jaipur-CMP51II7.jpg";
const angkor = "/assets/dest-angkor-Bap_7Imh.jpg";
const petra = "/assets/dest-petra-CJRJq1jD.jpg";
const D = (d) => d;
const destinations = [
  D({
    slug: "charminar",
    name: "Charminar",
    city: "Hyderabad",
    country: "India",
    category: "Monument",
    rating: 4.6,
    reviews: 92345,
    built: "1591 CE",
    hero: charminar,
    gallery: [charminar, golconda, jaipur],
    short: "The four-minaret icon of Hyderabad — a 16th-century marvel at the heart of the old city.",
    about: "Charminar is the soul of Hyderabad, built in 1591 by Sultan Muhammad Quli Qutb Shah to commemorate the end of a deadly plague and the founding of his new city. Its four grand minarets rise 56 meters into the sky, framing the bustling bazaars of Laad and Pathar Gatti below.",
    significance: "A symbol of Hyderabad and one of India's most recognised monuments — featured on the state emblem of Telangana.",
    architecture: "Indo-Islamic Qutb Shahi style fusing Persian, Hindu and Mughal influences. Built of granite, lime mortar and pulverised marble; the four arches face the cardinal directions.",
    timeline: [
      { year: "1591", event: "Founded by Sultan Muhammad Quli Qutb Shah." },
      { year: "1687", event: "Mughal conquest of Golconda; Charminar passes to the Mughals." },
      { year: "1724", event: "Becomes part of the Nizam's Hyderabad State." },
      { year: "Today", event: "Protected monument under the Archaeological Survey of India." }
    ],
    bestTime: "October – February",
    mapEmbed: "https://www.google.com/maps?q=Charminar,Hyderabad&output=embed",
    lat: 17.3616,
    lng: 78.4747,
    nearby: ["golconda", "jaipur"],
    hotels: [
      {
        name: "Taj Falaknuma Palace",
        rating: 4.8,
        pricePerNight: 480,
        distanceKm: 6.2,
        tag: "Heritage Luxury"
      },
      { name: "ITC Kohenur", rating: 4.7, pricePerNight: 210, distanceKm: 11.5, tag: "5-star" },
      {
        name: "Park Hyatt Hyderabad",
        rating: 4.6,
        pricePerNight: 190,
        distanceKm: 9.8,
        tag: "5-star"
      },
      {
        name: "Hotel Shadab",
        rating: 4.2,
        pricePerNight: 38,
        distanceKm: 0.4,
        tag: "Local favourite"
      }
    ]
  }),
  D({
    slug: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.9,
    reviews: 421873,
    built: "1632 – 1653 CE",
    hero: taj,
    gallery: [taj, jaipur, charminar],
    short: "The marble poem on the Yamuna — Mughal architecture at its most transcendent.",
    about: "Commissioned by Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the Taj Mahal is the crown jewel of Mughal architecture and one of the New Seven Wonders of the World.",
    significance: "UNESCO World Heritage Site since 1983. A universally admired masterpiece of the world's heritage.",
    architecture: "White Makrana marble inlaid with semi-precious stones, perfectly symmetrical layout with a 300m reflecting pool and four flanking minarets each tilted slightly outward.",
    timeline: [
      { year: "1632", event: "Construction begins under Shah Jahan." },
      { year: "1653", event: "Main mausoleum completed after 22 years and 20,000 artisans." },
      { year: "1983", event: "Inscribed as a UNESCO World Heritage Site." }
    ],
    bestTime: "November – February",
    mapEmbed: "https://www.google.com/maps?q=Taj+Mahal,Agra&output=embed",
    lat: 27.1751,
    lng: 78.0421,
    nearby: ["jaipur", "charminar"],
    hotels: [
      {
        name: "The Oberoi Amarvilas",
        rating: 4.9,
        pricePerNight: 720,
        distanceKm: 0.6,
        tag: "Iconic view"
      },
      { name: "ITC Mughal", rating: 4.6, pricePerNight: 240, distanceKm: 2.1, tag: "5-star" },
      { name: "Trident Agra", rating: 4.5, pricePerNight: 160, distanceKm: 2.8, tag: "4-star" }
    ]
  }),
  D({
    slug: "hampi",
    name: "Hampi",
    city: "Hampi",
    country: "India",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.7,
    reviews: 38219,
    built: "14th century",
    hero: hampi,
    gallery: [hampi, golconda, jaipur],
    short: "Ruins of the once-glorious Vijayanagara empire scattered across a surreal boulder landscape.",
    about: "Hampi was the capital of the Vijayanagara empire in the 14th century, once second only to Beijing as the largest medieval-era city. Today its temples, palaces and aqueducts sprawl across 4,100 hectares of granite hills and banana groves.",
    significance: "UNESCO World Heritage Site. One of the largest open-air heritage complexes in the world.",
    architecture: "Dravidian temple architecture with intricately carved gopurams, monolithic sculptures and a stepped tank fed by aqueducts.",
    timeline: [
      { year: "1336", event: "Vijayanagara empire founded." },
      { year: "1500s", event: "City peaks with half a million inhabitants." },
      { year: "1565", event: "Sacked after the Battle of Talikota." },
      { year: "1986", event: "Inscribed by UNESCO." }
    ],
    bestTime: "October – February",
    mapEmbed: "https://www.google.com/maps?q=Hampi,Karnataka&output=embed",
    lat: 15.335,
    lng: 76.46,
    nearby: ["golconda", "charminar"],
    hotels: [
      {
        name: "Evolve Back Kamalapura Palace",
        rating: 4.8,
        pricePerNight: 380,
        distanceKm: 4.5,
        tag: "Heritage Luxury"
      },
      {
        name: "Heritage Resort Hampi",
        rating: 4.4,
        pricePerNight: 95,
        distanceKm: 3,
        tag: "4-star"
      },
      { name: "Hampi's Boulders", rating: 4.3, pricePerNight: 110, distanceKm: 6.8, tag: "Eco" }
    ]
  }),
  D({
    slug: "kyoto",
    name: "Kinkaku-ji (Kyoto)",
    city: "Kyoto",
    country: "Japan",
    category: "Temple",
    unesco: true,
    rating: 4.7,
    reviews: 156932,
    built: "1397 CE",
    hero: kyoto,
    gallery: [kyoto, angkor, taj],
    short: "The Golden Pavilion — a Zen temple wrapped in gold leaf, mirrored in a still mountain pond.",
    about: "Kinkaku-ji, the Temple of the Golden Pavilion, is a Zen Buddhist temple whose top two floors are entirely covered in pure gold leaf. Originally a retirement villa for shogun Ashikaga Yoshimitsu, it became a temple after his death.",
    significance: "Designated a UNESCO World Heritage Site as part of Historic Monuments of Ancient Kyoto.",
    architecture: "Three floors each in a different architectural style: Shinden, Samurai and Zen. A bronze phoenix crowns the rooftop.",
    timeline: [
      { year: "1397", event: "Built as retirement villa." },
      { year: "1408", event: "Converted to a Zen temple." },
      { year: "1950", event: "Burned down; rebuilt in 1955." },
      { year: "1994", event: "Listed as UNESCO heritage." }
    ],
    bestTime: "March – May or October – November",
    mapEmbed: "https://www.google.com/maps?q=Kinkaku-ji,Kyoto&output=embed",
    lat: 35.0394,
    lng: 135.7292,
    nearby: ["angkor", "taj-mahal"],
    hotels: [
      {
        name: "The Ritz-Carlton Kyoto",
        rating: 4.9,
        pricePerNight: 950,
        distanceKm: 5.5,
        tag: "Luxury"
      },
      { name: "Hoshinoya Kyoto", rating: 4.8, pricePerNight: 720, distanceKm: 8, tag: "Ryokan" },
      {
        name: "Hotel Granvia Kyoto",
        rating: 4.5,
        pricePerNight: 220,
        distanceKm: 6.2,
        tag: "4-star"
      }
    ]
  }),
  D({
    slug: "golconda",
    name: "Golconda Fort",
    city: "Hyderabad",
    country: "India",
    category: "Fort",
    rating: 4.5,
    reviews: 41218,
    built: "13th century",
    hero: golconda,
    gallery: [golconda, charminar, jaipur],
    short: "A granite citadel famed for its acoustics, diamond vaults and panoramic sunsets.",
    about: "Originally a mud fort of the Kakatiya kings, Golconda was rebuilt in granite by the Qutb Shahi dynasty. At its peak it was the diamond capital of the world — both the Koh-i-Noor and Hope diamonds passed through its vaults.",
    significance: "One of India's most striking medieval forts and the cradle of Hyderabad's heritage.",
    architecture: "Concentric fortifications, eight monumental gateways, and acoustic engineering so refined that a handclap at Fateh Darwaza can be heard a kilometre away atop Bala Hisar.",
    timeline: [
      { year: "1200s", event: "Original mud fort built by Kakatiyas." },
      { year: "1518", event: "Rebuilt in granite by the Qutb Shahis." },
      { year: "1687", event: "Captured after an 8-month siege by Aurangzeb." }
    ],
    bestTime: "November – February",
    mapEmbed: "https://www.google.com/maps?q=Golconda+Fort,Hyderabad&output=embed",
    lat: 17.3833,
    lng: 78.4011,
    nearby: ["charminar", "hampi"],
    hotels: [
      { name: "Taj Krishna", rating: 4.6, pricePerNight: 170, distanceKm: 9.2, tag: "5-star" },
      { name: "Novotel HICC", rating: 4.4, pricePerNight: 120, distanceKm: 14, tag: "4-star" }
    ]
  }),
  D({
    slug: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    country: "India",
    category: "Palace",
    rating: 4.4,
    reviews: 62110,
    built: "1799 CE",
    hero: jaipur,
    gallery: [jaipur, taj, charminar],
    short: "The 'Palace of Winds' — a five-storey pink sandstone facade of 953 honeycombed jharokhas.",
    about: "Built by Maharaja Sawai Pratap Singh, Hawa Mahal was designed so that royal ladies of the zenana could watch street processions from behind ornate windows without being seen. The latticework keeps the interior breezy even in Rajasthan's heat.",
    significance: "Icon of Jaipur and a masterpiece of Rajput architecture.",
    architecture: "Pink sandstone in the shape of Krishna's crown. 953 small windows (jharokhas) with intricate latticework create a natural cooling system — the namesake palace of winds.",
    timeline: [
      { year: "1799", event: "Commissioned by Maharaja Sawai Pratap Singh." },
      { year: "2006", event: "Major restoration completed." }
    ],
    bestTime: "October – March",
    mapEmbed: "https://www.google.com/maps?q=Hawa+Mahal,Jaipur&output=embed",
    lat: 26.9239,
    lng: 75.8267,
    nearby: ["taj-mahal", "charminar"],
    hotels: [
      {
        name: "Rambagh Palace",
        rating: 4.9,
        pricePerNight: 620,
        distanceKm: 4,
        tag: "Heritage Luxury"
      },
      {
        name: "Samode Haveli",
        rating: 4.7,
        pricePerNight: 280,
        distanceKm: 2.3,
        tag: "Boutique heritage"
      },
      { name: "ITC Rajputana", rating: 4.5, pricePerNight: 180, distanceKm: 3.8, tag: "5-star" }
    ]
  }),
  D({
    slug: "angkor-wat",
    name: "Angkor Wat",
    city: "Siem Reap",
    country: "Cambodia",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.8,
    reviews: 198400,
    built: "12th century",
    hero: angkor,
    gallery: [angkor, kyoto, taj],
    short: "The largest religious monument on Earth — sandstone temples wrapped in jungle.",
    about: "Built by King Suryavarman II in the early 12th century as a Hindu temple dedicated to Vishnu, Angkor Wat later transformed into a Buddhist site. It covers 162.6 hectares — the largest religious structure in the world.",
    significance: "UNESCO World Heritage Site and national symbol of Cambodia, featured on the country's flag.",
    architecture: "Classical Khmer architecture, five lotus-shaped towers, vast galleries of bas-reliefs depicting Hindu epics.",
    timeline: [
      { year: "1113-1150", event: "Built by King Suryavarman II." },
      { year: "1400s", event: "Transformed into a Buddhist temple." },
      { year: "1992", event: "Inscribed by UNESCO." }
    ],
    bestTime: "November – March",
    mapEmbed: "https://www.google.com/maps?q=Angkor+Wat,Cambodia&output=embed",
    lat: 13.4125,
    lng: 103.8667,
    nearby: ["kyoto", "petra"],
    hotels: [
      {
        name: "Raffles Grand Hotel d'Angkor",
        rating: 4.8,
        pricePerNight: 420,
        distanceKm: 6.5,
        tag: "Heritage Luxury"
      },
      {
        name: "Park Hyatt Siem Reap",
        rating: 4.7,
        pricePerNight: 260,
        distanceKm: 7,
        tag: "5-star"
      },
      {
        name: "Jaya House RiverPark",
        rating: 4.9,
        pricePerNight: 180,
        distanceKm: 8.2,
        tag: "Boutique"
      }
    ]
  }),
  D({
    slug: "petra",
    name: "Petra",
    city: "Ma'an",
    country: "Jordan",
    category: "UNESCO Site",
    unesco: true,
    rating: 4.8,
    reviews: 87421,
    built: "5th century BCE",
    hero: petra,
    gallery: [petra, angkor, hampi],
    short: "The rose-red city half as old as time, carved into sheer sandstone cliffs.",
    about: "Petra was the capital of the Nabatean kingdom — a desert trading hub linking Arabia, Egypt and Syria-Phoenicia. Its monuments are carved directly into vivid sandstone cliffs, the most famous being Al-Khazneh, the Treasury.",
    significance: "UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    architecture: "Rock-cut Nabatean architecture blending Hellenistic facades with eastern motifs.",
    timeline: [
      { year: "400 BCE", event: "Established as Nabatean capital." },
      { year: "106 CE", event: "Absorbed into the Roman Empire." },
      { year: "1812", event: "Rediscovered by Johann Ludwig Burckhardt." },
      { year: "1985", event: "Listed by UNESCO." }
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Petra,Jordan&output=embed",
    lat: 30.3285,
    lng: 35.4444,
    nearby: ["angkor-wat", "taj-mahal"],
    hotels: [
      {
        name: "Mövenpick Resort Petra",
        rating: 4.6,
        pricePerNight: 220,
        distanceKm: 0.1,
        tag: "5-star, gate-front"
      },
      { name: "Petra Marriott", rating: 4.5, pricePerNight: 180, distanceKm: 3, tag: "5-star" },
      {
        name: "Petra Guest House Hotel",
        rating: 4.3,
        pricePerNight: 130,
        distanceKm: 0.2,
        tag: "Closest to entrance"
      }
    ]
  }),
  // ===== Additional hand-picked destinations across categories =====
  D({
    slug: "colosseum",
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    category: "Monument",
    unesco: true,
    rating: 4.8,
    reviews: 312e3,
    built: "70 – 80 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1280px-Colosseo_2020.jpg",
    gallery: [],
    short: "The mighty Flavian amphitheatre — Rome's enduring symbol of imperial spectacle.",
    about: "The Colosseum is the largest ancient amphitheatre ever built, commissioned under Emperor Vespasian and completed by his son Titus in 80 CE. It hosted gladiatorial contests, mock sea battles and public spectacles for nearly four centuries.",
    significance: "UNESCO World Heritage Site and one of the New Seven Wonders of the World.",
    architecture: "Travertine limestone, tuff and brick-faced concrete; four stories of arches with Doric, Ionic and Corinthian columns.",
    timeline: [
      { year: "70 CE", event: "Construction begins under Vespasian." },
      { year: "80 CE", event: "Inaugurated with 100 days of games by Titus." },
      { year: "1980", event: "Inscribed by UNESCO." }
    ],
    bestTime: "April – June, September – October",
    mapEmbed: "https://www.google.com/maps?q=Colosseum,Rome&output=embed",
    lat: 41.8902,
    lng: 12.4922,
    nearby: ["petra", "taj-mahal"],
    hotels: [
      {
        name: "Hotel Palazzo Manfredi",
        rating: 4.9,
        pricePerNight: 520,
        distanceKm: 0.1,
        tag: "Colosseum view"
      },
      {
        name: "The Inn at the Roman Forum",
        rating: 4.7,
        pricePerNight: 320,
        distanceKm: 0.6,
        tag: "Boutique"
      }
    ]
  }),
  D({
    slug: "stonehenge",
    name: "Stonehenge",
    city: "Wiltshire",
    country: "United Kingdom",
    category: "Monument",
    unesco: true,
    rating: 4.4,
    reviews: 64210,
    built: "c. 3000 BCE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Stonehenge2007_07_30.jpg/1280px-Stonehenge2007_07_30.jpg",
    gallery: [],
    short: "Neolithic stone circle aligned to the sun — a 5,000-year-old riddle on Salisbury Plain.",
    about: "Stonehenge is a prehistoric monument of standing sarsen stones and bluestones arranged in a circle, built in several phases beginning around 3000 BCE. Its astronomical alignments mark the summer and winter solstices.",
    significance: "UNESCO World Heritage Site; one of the most famous prehistoric monuments in the world.",
    architecture: "Concentric circles of sarsen trilithons and smaller bluestones brought from Wales over 200 km away.",
    timeline: [
      { year: "3000 BCE", event: "Earthwork bank and ditch constructed." },
      { year: "2500 BCE", event: "Sarsen stones raised into trilithons." },
      { year: "1986", event: "Inscribed by UNESCO." }
    ],
    bestTime: "May – September",
    mapEmbed: "https://www.google.com/maps?q=Stonehenge&output=embed",
    lat: 51.1789,
    lng: -1.8262,
    nearby: ["colosseum", "petra"],
    hotels: [
      {
        name: "The Lamb at Hindon",
        rating: 4.6,
        pricePerNight: 180,
        distanceKm: 19,
        tag: "Countryside inn"
      },
      {
        name: "Howard's House Hotel",
        rating: 4.5,
        pricePerNight: 210,
        distanceKm: 17,
        tag: "Boutique"
      }
    ]
  }),
  D({
    slug: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    country: "India",
    category: "Fort",
    unesco: true,
    rating: 4.5,
    reviews: 78400,
    built: "1648 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Fort_in_Delhi_03-2016.jpg/1280px-Red_Fort_in_Delhi_03-2016.jpg",
    gallery: [],
    short: "The crimson sandstone seat of Mughal power — and the heart of modern India's Independence Day.",
    about: "Built by Emperor Shah Jahan as the palace fort of his new capital Shahjahanabad, the Red Fort served as the main residence of Mughal emperors for nearly 200 years. The Prime Minister of India addresses the nation from its ramparts every August 15.",
    significance: "UNESCO World Heritage Site and the symbolic centre of India's sovereignty.",
    architecture: "Red sandstone walls 33m high enclosing pavilions of white marble inlaid with precious stones — a fusion of Persian, Timurid and Indian styles.",
    timeline: [
      { year: "1638", event: "Construction begins under Shah Jahan." },
      { year: "1648", event: "Completed as imperial residence." },
      { year: "2007", event: "Inscribed by UNESCO." }
    ],
    bestTime: "October – March",
    mapEmbed: "https://www.google.com/maps?q=Red+Fort,Delhi&output=embed",
    lat: 28.6562,
    lng: 77.241,
    nearby: ["taj-mahal", "hawa-mahal"],
    hotels: [
      {
        name: "The Imperial New Delhi",
        rating: 4.8,
        pricePerNight: 320,
        distanceKm: 6.5,
        tag: "Heritage Luxury"
      },
      {
        name: "Haveli Dharampura",
        rating: 4.7,
        pricePerNight: 180,
        distanceKm: 1,
        tag: "Heritage haveli"
      }
    ]
  }),
  D({
    slug: "versailles",
    name: "Palace of Versailles",
    city: "Versailles",
    country: "France",
    category: "Palace",
    unesco: true,
    rating: 4.7,
    reviews: 198300,
    built: "1661 – 1715 CE",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Chateau_Versailles_Galerie_des_Glaces.jpg/1280px-Chateau_Versailles_Galerie_des_Glaces.jpg",
    gallery: [],
    short: "The Sun King's gilded palace — Baroque grandeur and the Hall of Mirrors.",
    about: "Originally a hunting lodge, Versailles was transformed by Louis XIV into the principal royal residence of France from 1682 until the French Revolution. Its Hall of Mirrors witnessed the signing of the 1919 Treaty that ended the First World War.",
    significance: "UNESCO World Heritage Site; epitome of French Baroque architecture and absolute monarchy.",
    architecture: "Baroque facades, 700 rooms, formal French gardens by André Le Nôtre, and the famed 73m Hall of Mirrors lined with 357 mirrors.",
    timeline: [
      { year: "1661", event: "Louis XIV begins expansion of his father's hunting lodge." },
      { year: "1682", event: "Court of France moves to Versailles." },
      { year: "1979", event: "Inscribed by UNESCO." }
    ],
    bestTime: "April – June, September – October",
    mapEmbed: "https://www.google.com/maps?q=Palace+of+Versailles&output=embed",
    lat: 48.8049,
    lng: 2.1204,
    nearby: ["colosseum", "hawa-mahal"],
    hotels: [
      {
        name: "Airelles Château de Versailles, Le Grand Contrôle",
        rating: 4.9,
        pricePerNight: 1900,
        distanceKm: 0.2,
        tag: "Inside the estate"
      },
      {
        name: "Waldorf Astoria Trianon Palace",
        rating: 4.7,
        pricePerNight: 430,
        distanceKm: 1,
        tag: "5-star"
      }
    ]
  }),
  D({
    slug: "borobudur",
    name: "Borobudur",
    city: "Magelang",
    country: "Indonesia",
    category: "Temple",
    unesco: true,
    rating: 4.8,
    reviews: 54200,
    built: "9th century",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Borobudur-Nothwest-view.jpg/1280px-Borobudur-Nothwest-view.jpg",
    gallery: [],
    short: "The world's largest Buddhist temple — a stepped stone mandala rising from Java's jungle.",
    about: "Borobudur is a 9th-century Mahayana Buddhist temple built in nine stacked platforms, topped by a central dome surrounded by 72 perforated stupas, each enshrining a Buddha statue. Pilgrims circumambulate upward through three levels symbolising the Buddhist cosmology.",
    significance: "UNESCO World Heritage Site and the single largest Buddhist monument on Earth.",
    architecture: "2,672 relief panels and 504 Buddha statues carved into volcanic andesite — a three-dimensional mandala.",
    timeline: [
      { year: "750-825", event: "Built under the Sailendra dynasty." },
      { year: "1814", event: "Rediscovered under volcanic ash by Sir Stamford Raffles." },
      { year: "1991", event: "Inscribed by UNESCO." }
    ],
    bestTime: "May – September",
    mapEmbed: "https://www.google.com/maps?q=Borobudur&output=embed",
    lat: -7.6079,
    lng: 110.2038,
    nearby: ["angkor-wat", "kyoto"],
    hotels: [
      { name: "Amanjiwo", rating: 4.9, pricePerNight: 1200, distanceKm: 2.5, tag: "Iconic luxury" },
      {
        name: "Plataran Borobudur Resort",
        rating: 4.7,
        pricePerNight: 280,
        distanceKm: 3,
        tag: "5-star"
      }
    ]
  }),
  D({
    slug: "louvre",
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    category: "Museum",
    rating: 4.7,
    reviews: 412e3,
    built: "1793 (museum)",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Louvre_Museum_Wikimedia_Commons.jpg/1280px-Louvre_Museum_Wikimedia_Commons.jpg",
    gallery: [],
    short: "The world's most visited museum — a former royal palace housing the Mona Lisa.",
    about: "The Louvre began as a 12th-century fortress, became a royal residence, and opened as a public museum in 1793. It holds over 35,000 works spanning prehistory to the 21st century, including the Mona Lisa, Venus de Milo and Winged Victory of Samothrace.",
    significance: "Most-visited museum in the world; cultural heart of Paris.",
    architecture: "French Renaissance palace wings around the Cour Napoléon, with I. M. Pei's 1989 glass pyramid as its modern entrance.",
    timeline: [
      { year: "1190", event: "Built as a fortress by Philip II." },
      { year: "1793", event: "Opened as a public museum during the Revolution." },
      { year: "1989", event: "Glass Pyramid inaugurated." }
    ],
    bestTime: "October – April (fewer crowds)",
    mapEmbed: "https://www.google.com/maps?q=Louvre+Museum,Paris&output=embed",
    lat: 48.8606,
    lng: 2.3376,
    nearby: ["versailles", "colosseum"],
    hotels: [
      {
        name: "Le Meurice",
        rating: 4.8,
        pricePerNight: 1400,
        distanceKm: 0.4,
        tag: "Palace hotel"
      },
      { name: "Hôtel du Louvre", rating: 4.6, pricePerNight: 480, distanceKm: 0.1, tag: "5-star" }
    ]
  }),
  D({
    slug: "british-museum",
    name: "The British Museum",
    city: "London",
    country: "United Kingdom",
    category: "Museum",
    rating: 4.7,
    reviews: 256e3,
    built: "1753",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/British_Museum_from_NE_2.JPG/1280px-British_Museum_from_NE_2.JPG",
    gallery: [],
    short: "Two million years of human history under one Bloomsbury roof — and entry is free.",
    about: "Founded in 1753 around the collection of Sir Hans Sloane, the British Museum was the world's first national public museum. Its galleries span the Rosetta Stone, Parthenon Marbles, Assyrian reliefs and Egyptian mummies.",
    significance: "One of the most comprehensive collections of human history and culture in existence.",
    architecture: "Greek Revival exterior by Sir Robert Smirke; the soaring glass-roofed Great Court was designed by Norman Foster in 2000.",
    timeline: [
      { year: "1753", event: "Founded by Act of Parliament." },
      { year: "1759", event: "Opened to the public — free of charge." },
      { year: "2000", event: "Great Court opens, Europe's largest covered square." }
    ],
    bestTime: "Year-round (weekday mornings)",
    mapEmbed: "https://www.google.com/maps?q=British+Museum,London&output=embed",
    lat: 51.5194,
    lng: -0.127,
    nearby: ["stonehenge", "louvre"],
    hotels: [
      {
        name: "The Bloomsbury Hotel",
        rating: 4.6,
        pricePerNight: 360,
        distanceKm: 0.2,
        tag: "5-star"
      },
      {
        name: "The Montague on the Gardens",
        rating: 4.7,
        pricePerNight: 320,
        distanceKm: 0.1,
        tag: "Boutique"
      }
    ]
  }),
  D({
    slug: "grand-canyon",
    name: "Grand Canyon",
    city: "Arizona",
    country: "United States",
    category: "Natural Wonder",
    unesco: true,
    rating: 4.9,
    reviews: 287e3,
    built: "~6 million years ago",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Grand_Canyon_NP-Arizona-USA.jpg/1280px-Grand_Canyon_NP-Arizona-USA.jpg",
    gallery: [],
    short: "A mile-deep gorge carved by the Colorado River — a layered chronicle of Earth's history.",
    about: "The Grand Canyon is 446 km long, up to 29 km wide, and over 1.6 km deep. Its exposed strata record nearly two billion years of geological history, sculpted by the Colorado River over the last six million years.",
    significance: "UNESCO World Heritage Site and one of the most studied geological landscapes on Earth.",
    architecture: "Layered red and ochre sedimentary cliffs of limestone, sandstone and shale.",
    timeline: [
      { year: "6 Mya", event: "Colorado River begins carving the canyon." },
      { year: "1919", event: "Designated a US National Park." },
      { year: "1979", event: "Inscribed by UNESCO." }
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Grand+Canyon&output=embed",
    lat: 36.1069,
    lng: -112.1129,
    nearby: ["petra", "stonehenge"],
    hotels: [
      {
        name: "El Tovar Hotel",
        rating: 4.6,
        pricePerNight: 280,
        distanceKm: 0.1,
        tag: "Historic rim-side"
      },
      {
        name: "Bright Angel Lodge",
        rating: 4.4,
        pricePerNight: 170,
        distanceKm: 0.1,
        tag: "Rim cabins"
      }
    ]
  }),
  D({
    slug: "iguazu-falls",
    name: "Iguazú Falls",
    city: "Misiones",
    country: "Argentina",
    category: "Natural Wonder",
    unesco: true,
    rating: 4.9,
    reviews: 132e3,
    built: "Prehistoric",
    hero: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Iguazu_Decembre_2007_-_Panorama_4.jpg/1280px-Iguazu_Decembre_2007_-_Panorama_4.jpg",
    gallery: [],
    short: "275 cascades thundering across the jungle on the Argentina–Brazil border.",
    about: "The Iguazú Falls form the largest waterfall system in the world, stretching 2.7 km across the basalt edge of the Paraná Plateau. The most dramatic drop is Devil's Throat — a 82m U-shaped chasm where half the river's flow plunges over the edge.",
    significance: "UNESCO World Heritage Site and one of the New Seven Wonders of Nature.",
    architecture: "Natural basalt cliffs sculpted over millions of years; surrounded by Atlantic rainforest teeming with toucans and coatis.",
    timeline: [
      { year: "1541", event: "First seen by Europeans (Cabeza de Vaca)." },
      { year: "1934", event: "Argentine national park established." },
      { year: "1984", event: "Inscribed by UNESCO." }
    ],
    bestTime: "March – May, September – November",
    mapEmbed: "https://www.google.com/maps?q=Iguazu+Falls&output=embed",
    lat: -25.6953,
    lng: -54.4367,
    nearby: ["grand-canyon", "angkor-wat"],
    hotels: [
      {
        name: "Gran Meliá Iguazú",
        rating: 4.7,
        pricePerNight: 420,
        distanceKm: 0.3,
        tag: "Inside the park"
      },
      {
        name: "Loi Suites Iguazú",
        rating: 4.6,
        pricePerNight: 260,
        distanceKm: 12,
        tag: "Jungle resort"
      }
    ]
  })
];
const findDestination = (slug) => destinations.find((d) => d.slug === slug);
const searchDestinations = (query) => {
  const q = query.trim().toLowerCase();
  if (!q) return destinations;
  const qSingular = q.endsWith("s") ? q.slice(0, -1) : q;
  return destinations.filter(
    (d) => [d.name, d.city, d.country, d.category].some((f) => {
      const v = f.toLowerCase();
      return v.includes(q) || v.includes(qSingular);
    })
  );
};
const $$splitComponentImporter = () => import("./destination._slug-D0qqw9LR.mjs");
const $$splitNotFoundComponentImporter = () => import("./destination._slug-O434pOW2.mjs");
const Route = createFileRoute("/destination/$slug")({
  loader: ({
    params
  }) => {
    const d = findDestination(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({
    loaderData
  }) => {
    const d = loaderData;
    if (!d) return {
      meta: [{
        title: "Destination · HeritageVerse"
      }]
    };
    return {
      meta: [{
        title: `${d.name} — ${d.city}, ${d.country} · HeritageVerse`
      }, {
        name: "description",
        content: d.short
      }, {
        property: "og:title",
        content: `${d.name} · HeritageVerse`
      }, {
        property: "og:description",
        content: d.short
      }, {
        property: "og:image",
        content: d.hero
      }, {
        name: "twitter:card",
        content: "summary_large_image"
      }, {
        name: "twitter:image",
        content: d.hero
      }]
    };
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SearchRoute = Route$6.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => Route$7
});
const PlannerRoute = Route$5.update({
  id: "/planner",
  path: "/planner",
  getParentRoute: () => Route$7
});
const FavoritesRoute = Route$4.update({
  id: "/favorites",
  path: "/favorites",
  getParentRoute: () => Route$7
});
const AuthRoute = Route$3.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$7
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const PlaceNameRoute = Route$1.update({
  id: "/place/$name",
  path: "/place/$name",
  getParentRoute: () => Route$7
});
const DestinationSlugRoute = Route.update({
  id: "/destination/$slug",
  path: "/destination/$slug",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AuthRoute,
  FavoritesRoute,
  PlannerRoute,
  SearchRoute,
  DestinationSlugRoute,
  PlaceNameRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$6 as R,
  Route$5 as a,
  useServerFn as b,
  createSsrRpc as c,
  destinations as d,
  Route$1 as e,
  findDestination as f,
  Route as g,
  router as r,
  searchDestinations as s,
  useAuth as u
};
