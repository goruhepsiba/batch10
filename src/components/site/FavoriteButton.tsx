import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";

interface Props {
  kind: "curated" | "place";
  refId: string; // slug for curated, "Name|country" for place
  name: string;
  country?: string;
  lat?: number;
  lng?: number;
  size?: "sm" | "md";
}

export function FavoriteButton({ kind, refId, name, country, lat, lng, size = "md" }: Props) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [favored, setFavored] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) {
      setFavored(false);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("kind", kind)
        .eq("ref", refId)
        .maybeSingle();
      if (!cancelled) setFavored(!!data);
    })();
    return () => {
      cancelled = true;
    };
  }, [user, kind, refId]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }
    setBusy(true);
    try {
      if (favored) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("kind", kind)
          .eq("ref", refId);
        if (error) throw error;
        setFavored(false);
        toast.success("Removed from favorites");
      } else {
        const { error } = await supabase.from("favorites").upsert({
          user_id: user.id,
          kind,
          ref: refId,
          name,
          country: country ?? null,
          lat: lat ?? null,
          lng: lng ?? null,
        });
        if (error) throw error;
        setFavored(true);
        toast.success("Saved to favorites");
      }
    } catch (err: any) {
      console.error("[Favorite Error]", err);
      toast.error(err?.message || String(err) || "Couldn't update favorites");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return null;
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  const iconDim = size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <button
      onClick={toggle}
      disabled={busy}
      aria-label={favored ? "Remove from favorites" : "Save to favorites"}
      className={`inline-flex ${dim} items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur hover:bg-accent transition disabled:opacity-60`}
    >
      <Heart
        className={`${iconDim} ${favored ? "fill-amber text-amber" : "text-foreground/70"}`}
        strokeWidth={1.6}
      />
    </button>
  );
}
