import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { Compass } from "lucide-react";

export const Route = createFileRoute("/sign-in/$")({
  head: () => ({
    meta: [
      { title: "Sign In · HeritageVerse" },
      { name: "description", content: "Access your HeritageVerse dashboard, favorites, and AI travel planner." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Premium ambient glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.04),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-[440px] relative z-10">
        <div className="flex flex-col items-center mb-6">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-amber)] text-primary-foreground shadow-soft mb-3">
            <Compass className="h-5 w-5 animate-pulse" />
          </span>
          <h2 className="font-display text-3xl font-bold tracking-tight">HeritageVerse</h2>
          <p className="text-sm text-muted-foreground mt-1">Welcome back traveler</p>
        </div>
        
        <div className="w-full flex justify-center bg-card/40 backdrop-blur-md rounded-2xl p-4 border border-border/40 shadow-soft">
          <SignIn routing="path" path="/sign-in" />
        </div>
      </div>
    </div>
  );
}
