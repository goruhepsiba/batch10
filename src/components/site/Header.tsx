import { Link, useNavigate } from "@tanstack/react-router";
import { Compass, LogOut, User as UserIcon, Heart, BookMarked, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function Header() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const isDark =
      document.documentElement.classList.contains("dark") ||
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);
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
    else { toast.success("Signed out"); navigate({ to: "/" }); }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container-prose flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-soft">
            <Compass className="h-5 w-5" strokeWidth={1.6} />
          </span>
          <span className="font-display text-2xl tracking-tight">
            Heritage<span className="text-gradient-amber">Verse</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Explore
          </Link>
          <Link to="/search" search={{ q: "" }} className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            Destinations
          </Link>
          <Link to="/planner" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
            AI Planner
          </Link>
          {user && (
            <Link to="/favorites" className="hover:text-foreground transition-colors flex items-center gap-1.5" activeProps={{ className: "text-foreground" }}>
              <Heart className="h-3.5 w-3.5" /> Favorites
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber" /> : <Moon className="h-4 w-4 text-amber" />}
          </button>

          {loading ? null : user ? (
            <>
              <Link
                to="/favorites"
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-background px-3 text-sm hover:bg-accent"
                title="My favorites & trips"
              >
                <BookMarked className="h-4 w-4 text-amber" />
                <span className="truncate max-w-[120px]">{user.email}</span>
              </Link>
              <button
                onClick={signOut}
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              <UserIcon className="h-4 w-4" /> Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
