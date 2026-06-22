import { Link, useNavigate } from "@tanstack/react-router";
import {
  Compass,
  LogOut,
  User as UserIcon,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { UserButton } from "@clerk/tanstack-react-start";
import { toast } from "sonner";

const navLinks = [
  { to: "/" as const, label: "Explore", exact: true },
  { to: "/planner" as const, label: "AI Planner" },
];

export function Header() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate({ to: "/" });
    } catch (err: any) {
      toast.error(err.message || "Failed to sign out");
    }
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setMobileOpen(false)}>
          <span className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-soft">
            <Compass
              className="h-4.5 w-4.5 sm:h-5 sm:w-5 transition-transform duration-700 group-hover:rotate-[360deg]"
              strokeWidth={1.6}
            />
          </span>
          <span className="font-display text-xl sm:text-2xl tracking-tight">
            Heritage<span className="text-gradient-amber">Verse</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-foreground transition-colors"
              activeOptions={link.exact ? { exact: true } : undefined}
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-foreground transition-colors flex items-center gap-1.5"
                activeProps={{ className: "text-foreground" }}
              >
                <LayoutDashboard className="h-3.5 w-3.5" /> Dashboard
              </Link>
              <Link
                to="/favorites"
                className="hover:text-foreground transition-colors flex items-center gap-1.5"
                activeProps={{ className: "text-foreground" }}
              >
                <Heart className="h-3.5 w-3.5" /> Favorites
              </Link>
              <Link
                to="/profile"
                className="hover:text-foreground transition-colors flex items-center gap-1.5"
                activeProps={{ className: "text-foreground" }}
              >
                <User className="h-3.5 w-3.5" /> Profile
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleTheme}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-amber" />
            ) : (
              <Moon className="h-4 w-4 text-amber" />
            )}
          </button>

          {loading ? null : user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <UserButton />
              </div>
              <button
                onClick={handleSignOut}
                className="hidden sm:inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground hover:opacity-90 whitespace-nowrap cursor-pointer transition"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/sign-in/$"
                className="hidden sm:inline-flex h-9 items-center gap-1 px-3 text-sm font-medium hover:text-amber transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/sign-up/$"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 sm:px-4 text-sm font-medium text-primary-foreground hover:opacity-90 whitespace-nowrap cursor-pointer transition"
              >
                <UserIcon className="h-4 w-4" /> Sign up
              </Link>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
              activeOptions={link.exact ? { exact: true } : undefined}
              activeProps={{ className: "bg-accent text-foreground font-medium" }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/favorites"
                className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>
              <div className="pt-2 border-t border-border/40 flex items-center justify-between px-3">
                <span className="text-xs text-muted-foreground">{user.email}</span>
                <UserButton />
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full text-left rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </>
          ) : (
            <div className="pt-2 border-t border-border/40 space-y-1">
              <Link
                to="/sign-in/$"
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/sign-up/$"
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground bg-primary/10"
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
