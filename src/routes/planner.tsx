import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import {
  Sparkles,
  MapPin,
  Sun,
  Moon,
  Sunrise,
  UtensilsCrossed,
  Loader2,
  Wallet,
  Calendar,
  BookmarkPlus,
  Compass,
  TrendingUp,
  BookmarkCheck,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

import { generateItinerary, type Itinerary, type PlannerInput } from "@/lib/planner.functions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

const PlannerSearch = z.object({
  destination: z.string().optional().catch(undefined),
  auto: z.coerce.boolean().optional().catch(undefined),
});

export const Route = createFileRoute("/planner")({
  validateSearch: PlannerSearch,
  head: () => ({
    meta: [
      { title: "AI Trip Planner · HeritageVerse" },
      { name: "description", content: "Generate a custom heritage travel itinerary in seconds with AI." },
    ],
  }),
  component: Planner,
});

const interestOptions = ["History", "Architecture", "Food", "Spiritual", "Photography", "Adventure", "Nightlife", "Nature"];
const styles = ["Relaxed", "Balanced", "Packed"];

function Planner() {
  const search = Route.useSearch();
  const generate = useServerFn(generateItinerary);
  const mutation = useMutation<Itinerary, Error, PlannerInput>({
    mutationFn: (data) => generate({ data }),
  });

  const [destination, setDestination] = useState(search.destination ?? "Hyderabad, India");
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState<PlannerInput["budget"]>("mid");
  const [style, setStyle] = useState("Balanced");
  const [interests, setInterests] = useState<string[]>(["History", "Architecture", "Food"]);

  const toggle = (i: string) =>
    setInterests((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (interests.length === 0) {
      toast.error("Please select at least one interest!");
      return;
    }
    mutation.mutate({ destination, days, budget, interests, style });
  };

  // Auto-trigger when arriving via "Plan a trip here" with ?auto=true
  const autoRan = useRef(false);
  useEffect(() => {
    if (search.auto && search.destination && !autoRan.current) {
      autoRan.current = true;
      mutation.mutate({ destination: search.destination, days, budget, interests, style });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.auto, search.destination]);

  return (
    <section className="container-prose py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.24em] text-amber inline-flex items-center gap-2 font-semibold">
          <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI Trip Planner
        </p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 leading-[1.02] font-bold">
          Your heritage trip,<br /><span className="italic text-gradient-amber">drafted in seconds.</span>
        </h1>
        <p className="mt-4 text-muted-foreground text-sm md:text-base font-light">
          Tell us where, how long, and what excites you — we'll craft a day-by-day itinerary
          with real places, authentic dishes, and geographic planning to optimize travel times.
        </p>
      </div>

      <div className="mt-12 grid lg:grid-cols-5 gap-8">
        {/* FORM */}
        <form onSubmit={submit} className="lg:col-span-2 rounded-2xl border border-border/60 bg-card p-6 space-y-6 h-fit lg:sticky lg:top-24 shadow-sm">
          <Field label="Destination" icon={MapPin}>
            <input
              required
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Kyoto, Japan"
              className="w-full bg-background/60 border border-border rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber/30 text-foreground"
            />
          </Field>

          <Field label="Days" icon={Calendar}>
            <input
              type="range" min={1} max={10} value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full accent-[var(--amber)] cursor-pointer"
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-muted-foreground">1 Day</span>
              <span className="text-sm font-semibold text-amber">{days} Day{days > 1 ? "s" : ""}</span>
              <span className="text-xs text-muted-foreground">10 Days</span>
            </div>
          </Field>

          <Field label="Budget" icon={Wallet}>
            <div className="grid grid-cols-3 gap-2">
              {(["budget", "mid", "luxury"] as const).map((b) => (
                <button
                  key={b} type="button"
                  onClick={() => setBudget(b)}
                  className={`rounded-xl border py-2.5 text-xs font-semibold capitalize transition cursor-pointer ${budget === b ? "border-amber bg-amber/10 text-foreground" : "border-border hover:bg-accent/40 text-muted-foreground"}`}
                >
                  {b === "mid" ? "Mid-range" : b === "budget" ? "Student" : b}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Style">
            <div className="grid grid-cols-3 gap-2">
              {styles.map((s) => (
                <button
                  key={s} type="button"
                  onClick={() => setStyle(s)}
                  className={`rounded-xl border py-2.5 text-xs font-semibold transition cursor-pointer ${style === s ? "border-amber bg-amber/10 text-foreground" : "border-border hover:bg-accent/40 text-muted-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </Field>

          <Field label="Interests">
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((i) => {
                const on = interests.includes(i);
                return (
                  <button
                    key={i} type="button"
                    onClick={() => toggle(i)}
                    className={`rounded-full px-3 py-1.5 text-xs border transition cursor-pointer ${on ? "border-amber bg-amber/15 text-foreground font-medium" : "border-border text-muted-foreground hover:bg-accent/40"}`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </Field>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60 transition shadow-soft cursor-pointer"
          >
            {mutation.isPending ? <><Loader2 className="h-4 w-4 animate-spin" /> Composing Plan…</> : <><Sparkles className="h-4 w-4 text-amber" /> Generate Itinerary</>}
          </button>
          {mutation.isError && (
            <p className="text-xs text-destructive text-center">{mutation.error.message}</p>
          )}
        </form>

        {/* RESULT */}
        <div className="lg:col-span-3">
          {!mutation.data && !mutation.isPending && <PlaceholderResult />}
          {mutation.isPending && <LoadingResult />}
          {mutation.data && (
            <ItineraryView
              itinerary={mutation.data}
              input={{ destination, days, budget }}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon: Icon, children }: { label: string; icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5 font-semibold">
        {Icon && <Icon className="h-4 w-4 text-amber" />}
        {label}
      </span>
      <div>{children}</div>
    </div>
  );
}

function PlaceholderResult() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center space-y-4 shadow-sm">
      <Sparkles className="h-9 w-9 text-amber mx-auto" strokeWidth={1.5} />
      <p className="font-display text-2xl font-bold">Your itinerary will appear here</p>
      <p className="text-muted-foreground max-w-sm mx-auto text-sm font-light leading-relaxed">
        Specify your trip preferences on the left panel, and our AI travel guide will generate a rich heritage-oriented dossier.
      </p>
    </div>
  );
}

function LoadingResult() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 animate-pulse space-y-4">
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-7 w-2/3 bg-muted rounded" />
        <div className="h-3.5 w-full bg-muted rounded" />
        <div className="h-8 w-24 bg-muted rounded-full" />
      </div>
      {[0, 1].map((i) => (
        <div key={i} className="rounded-2xl border border-border/60 bg-card p-6 animate-pulse space-y-4">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-6 w-1/2 bg-muted rounded" />
          <div className="space-y-2 pt-2">
            <div className="h-3 w-5/6 bg-muted rounded" />
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-4/5 bg-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ItineraryView({ itinerary, input }: { itinerary: Itinerary; input: { destination: string; days: number; budget: string } }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveTrip = async () => {
    if (!user) { navigate({ to: "/auth" }); return; }
    setSaving(true);
    try {
      const { error } = await supabase.from("saved_trips").insert({
        user_id: user.id,
        destination: input.destination,
        days: input.days,
        budget: input.budget,
        itinerary: JSON.parse(JSON.stringify(itinerary)),
      });
      if (error) throw error;
      setSaved(true);
      toast.success("Itinerary saved successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save itinerary");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Card */}
      <div className="rounded-2xl border border-border/60 bg-[var(--gradient-parchment)] p-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-amber/5 blur-xl group-hover:scale-150 transition duration-500" />
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Itinerary dossier</p>
            <h2 className="font-display text-3xl md:text-4xl mt-1 font-bold">{itinerary.destination}</h2>
          </div>
          <button
            onClick={saveTrip} disabled={saving || saved}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground hover:opacity-95 disabled:opacity-60 cursor-pointer shadow-soft transition"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <BookmarkCheck className="h-3.5 w-3.5 text-amber" /> : <BookmarkPlus className="h-3.5 w-3.5" />}
            {saved ? "Saved" : "Save trip"}
          </button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80 font-light">{itinerary.summary}</p>
        <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
          <Pill icon={Wallet}>${itinerary.estimatedCostUSD.low}–${itinerary.estimatedCostUSD.high} est. cost</Pill>
          <Pill icon={Calendar}>{itinerary.days.length} Day{itinerary.days.length > 1 ? "s" : ""}</Pill>
          <Pill icon={Sun}>Best visiting: {itinerary.bestTime}</Pill>
        </div>
      </div>

      {/* Days Timeline */}
      <div className="relative border-l border-border pl-6 ml-3 space-y-8">
        {itinerary.days.map((d) => (
          <div key={d.day} className="relative group">
            {/* Pulsing dot indicator */}
            <span className="absolute -left-[35px] top-1 h-4 w-4 rounded-full bg-amber border-4 border-background shadow-soft ring-2 ring-amber/20 group-hover:scale-110 transition" />
            
            <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:border-amber/30 hover:shadow-soft transition duration-300 space-y-4">
              <div className="flex items-baseline justify-between gap-4 border-b border-border/40 pb-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold">Day {d.day}</p>
                  <h3 className="font-display text-2xl mt-0.5 font-bold">{d.theme}</h3>
                </div>
                <span className="text-xs font-semibold text-muted-foreground bg-accent/40 px-2 py-1 rounded-md">~${d.estimatedCostUSD} cost</span>
              </div>
              <div className="space-y-4 pt-1">
                <Slot icon={Sunrise} label="Morning">{d.morning}</Slot>
                <Slot icon={Sun} label="Afternoon">{d.afternoon}</Slot>
                <Slot icon={Moon} label="Evening">{d.evening}</Slot>
                <Slot icon={UtensilsCrossed} label="Authentic Dining">{d.food}</Slot>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Concierge Tips */}
      {itinerary.tips?.length > 0 && (
        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-amber font-semibold flex items-center gap-1.5"><Compass className="h-4 w-4" /> Travel Concierge Tips</p>
          <ul className="grid sm:grid-cols-2 gap-3 text-xs leading-relaxed text-foreground/80 font-light">
            {itinerary.tips.map((t, i) => (
              <li key={i} className="flex gap-2 items-start"><ChevronRight className="h-3.5 w-3.5 text-amber shrink-0 mt-0.5" />{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Pill({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-background/60 border border-border/60 px-3 py-1.5 text-foreground/90 font-medium">
      <Icon className="h-3.5 w-3.5 text-amber" />
      {children}
    </span>
  );
}

function Slot({ icon: Icon, label, children }: { icon: React.ComponentType<{ className?: string }>; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 h-8 w-8 rounded-full bg-amber/10 grid place-items-center">
        <Icon className="h-4 w-4 text-amber" />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-semibold">{label}</p>
        <p className="text-sm mt-1 leading-relaxed text-foreground/90 font-light">{children}</p>
      </div>
    </div>
  );
}
