import { createFileRoute, Link } from "@tanstack/react-router";
import { checkAuth } from "@/lib/auth.fns";
import { useAuth } from "@/hooks/use-auth";
import { Plane, Hotel, Calendar, CreditCard, ArrowRight, Compass } from "lucide-react";

export const Route = createFileRoute("/bookings")({
  beforeLoad: async () => {
    await checkAuth();
  },
  head: () => ({
    meta: [
      { title: "My Bookings · HeritageVerse" },
      { name: "description", content: "Your booked flights, hotels, and tours to historical destinations." },
    ],
  }),
  component: BookingsPage,
});

const mockBookings = [
  {
    id: "bk-102",
    type: "flight",
    destination: "Rome, Italy (FCO)",
    date: "July 12, 2026",
    status: "Confirmed",
    airline: "Heritage Airways",
    price: "$540.00",
  },
  {
    id: "bk-103",
    type: "hotel",
    destination: "Colosseum Grand Suites, Rome",
    date: "July 12 - July 18, 2026",
    status: "Confirmed",
    details: "1 Room, Double Bed",
    price: "$820.00",
  },
];

function BookingsPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <section className="container-prose pt-12 pb-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.05),transparent_50%)] pointer-events-none -z-10" />

      <p className="text-xs uppercase tracking-[0.24em] text-amber font-semibold">Itinerary details</p>
      <h1 className="font-display text-4xl md:text-5xl mt-2 font-bold">My Bookings</h1>
      <p className="mt-2 text-muted-foreground">Manage your flight and hotel bookings for upcoming trips.</p>

      <div className="mt-10 space-y-6">
        {mockBookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft hover:shadow-elegant transition duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-amber/10 text-amber mt-1 shrink-0">
                {booking.type === "flight" ? (
                  <Plane className="h-5.5 w-5.5" />
                ) : (
                  <Hotel className="h-5.5 w-5.5" />
                )}
              </span>
              <div>
                <p className="font-display text-xl font-bold leading-tight">{booking.destination}</p>
                <p className="text-xs font-semibold text-amber uppercase tracking-wider mt-1.5 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> {booking.date}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {booking.type === "flight" ? booking.airline : booking.details}
                </p>
              </div>
            </div>

            <div className="flex items-center md:flex-col items-start md:items-end justify-between md:justify-center border-t md:border-t-0 pt-4 md:pt-0 border-border/60">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider md:text-right">Price</p>
                <p className="font-display text-lg font-bold text-foreground mt-0.5">{booking.price}</p>
              </div>
              <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">
                {booking.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center rounded-2xl bg-amber/5 border border-amber/15 p-8">
        <Compass className="mx-auto h-8 w-8 text-amber animate-spin" style={{ animationDuration: '8s' }} />
        <h3 className="font-display text-xl font-bold mt-4">Planning another heritage tour?</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-sm mx-auto font-light">
          Use the AI Itinerary Planner to draft day-by-day itineraries and explore hotels in Rome, Kyoto, and more.
        </p>
        <Link
          to="/planner"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft transition cursor-pointer"
        >
          Plan new trip <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
