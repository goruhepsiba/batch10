import { useEffect, useMemo } from "react";
import { useAuth as useClerkAuth, useUser } from "@clerk/tanstack-react-start";

export interface AuthState {
  session: { access_token: string; user: any } | null;
  user: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export function useAuth(): AuthState {
  const { isLoaded, userId, signOut } = useClerkAuth();
  const { user } = useUser();

  const mockUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      fullName: user.fullName ?? "",
      imageUrl: user.imageUrl ?? "",
      role: (user.publicMetadata?.role as string) ?? "tourist",
      user_metadata: {
        display_name:
          user.fullName ||
          user.username ||
          user.primaryEmailAddress?.emailAddress?.split("@")[0] ||
          "Traveler",
      },
    };
  }, [user]);

  const session = useMemo(() => {
    if (!userId) return null;
    return { access_token: "clerk-token", user: mockUser };
  }, [userId, mockUser]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (session) {
        localStorage.setItem("supabase.auth.mock-session", JSON.stringify(session));
      } else {
        localStorage.removeItem("supabase.auth.mock-session");
      }
    }
  }, [session]);

  return {
    session,
    user: mockUser,
    loading: !isLoaded,
    signOut,
  };
}
