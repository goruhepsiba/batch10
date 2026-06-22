import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-gJOel9qO.mjs";
import { u as useAuth } from "./router-FmIMkaxp.mjs";
import "../_libs/seroval.mjs";
import { p as Mail, q as Lock, f as LoaderCircle, A as ArrowRight } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "./server-DuNsQK3D.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const credentialsSchema = objectType({
  email: stringType().trim().email("Enter a valid email").max(255),
  password: stringType().min(8, "Use at least 8 characters").max(72).regex(/[a-z]/, "Add a lowercase letter").regex(/[A-Z]/, "Add an uppercase letter").regex(/[0-9]/, "Add a number"),
  displayName: stringType().trim().min(1).max(60).optional()
});
function AuthPage() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [mode, setMode] = reactExports.useState("signin");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [displayName, setDisplayName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading && user) navigate({
      to: "/",
      replace: true
    });
  }, [loading, user, navigate]);
  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = credentialsSchema.safeParse({
      email,
      password,
      displayName: mode === "signup" ? displayName : void 0
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const {
          error
        } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              display_name: parsed.data.displayName
            }
          }
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password
        });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };
  const onGoogle = async () => {
    setBusy(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      if (error) throw error;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };
  const onDemoLogin = async () => {
    setBusy(true);
    try {
      const demoEmail = "demo.traveler@heritageverse.com";
      const demoPassword = "DemoPassword123!";
      const {
        error: signInError
      } = await supabase.auth.signInWithPassword({
        email: demoEmail,
        password: demoPassword
      });
      if (signInError) {
        const {
          error: signUpError
        } = await supabase.auth.signUp({
          email: demoEmail,
          password: demoPassword,
          options: {
            data: {
              display_name: "Demo Traveler"
            }
          }
        });
        if (signUpError) throw signUpError;
        const {
          error: retryError
        } = await supabase.auth.signInWithPassword({
          email: demoEmail,
          password: demoPassword
        });
        if (retryError) throw retryError;
      }
      toast.success("Welcome! Signed in as Demo Traveler.");
      navigate({
        to: "/",
        replace: true
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Demo login failed";
      toast.error(message);
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "container-prose pt-16 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-[0.24em] text-amber text-center", children: "HeritageVerse" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 font-display text-4xl md:text-5xl text-center", children: mode === "signin" ? "Welcome back" : "Begin your journey" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-center text-muted-foreground", children: mode === "signin" ? "Sign in to save favorites and AI itineraries." : "Create an account to save trips, favorite places and more." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onGoogle, disabled: busy, className: "w-full inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent transition disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleIcon, {}),
        " Continue with Google"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onDemoLogin, disabled: busy, className: "mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border border-dashed border-amber/40 bg-amber/5 px-5 py-2.5 text-sm font-medium text-foreground hover:bg-amber/10 transition disabled:opacity-60", children: "Try demo account" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        " or email",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-3", children: [
        mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Display name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: displayName, onChange: (e) => setDisplayName(e.target.value), className: "mt-1 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-amber", placeholder: "Ibn Battuta", maxLength: 60 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-amber", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-amber", strokeWidth: 1.6 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full bg-transparent py-2.5 text-sm outline-none", placeholder: "you@traveller.world", maxLength: 255, autoComplete: "email" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-2 rounded-xl border border-border bg-background px-3 focus-within:border-amber", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-4 w-4 text-amber", strokeWidth: 1.6 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full bg-transparent py-2.5 text-sm outline-none", placeholder: "••••••••", minLength: 8, maxLength: 72, autoComplete: mode === "signin" ? "current-password" : "new-password" })
          ] }),
          mode === "signup" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block text-xs text-muted-foreground", children: "Use 8+ characters with uppercase, lowercase and a number." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", disabled: busy, className: "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gradient-amber)] text-primary-foreground px-5 py-2.5 text-sm font-medium hover:opacity-90 transition disabled:opacity-60", children: [
          busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          mode === "signin" ? "Sign in" : "Create account"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-5 text-center text-sm text-muted-foreground", children: [
        mode === "signin" ? "New to HeritageVerse? " : "Already have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode(mode === "signin" ? "signup" : "signin"), className: "text-amber hover:underline underline-offset-4", children: mode === "signin" ? "Create one" : "Sign in" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground", children: "← Back to HeritageVerse" }) })
  ] }) });
}
function GoogleIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "18", height: "18", viewBox: "0 0 48 48", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FFC107", d: "M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#FF3D00", d: "M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#4CAF50", d: "M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.3 35 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8l-6.5 5C9.6 39.6 16.3 44 24 44z" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { fill: "#1976D2", d: "M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.5 35.6 44 30.2 44 24c0-1.2-.1-2.3-.4-3.5z" })
  ] });
}
export {
  AuthPage as component
};
