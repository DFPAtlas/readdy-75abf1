import { supabase } from "./supabase";

export interface AuthUser {
  id: string;
  email: string;
}

export interface MemberProfile {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postcode: string;
  town: string;
  preferredDistanceMiles: number;
  fishingInterests: string[];
  preferredBookingTypes: string[];
  emailRemindersEnabled: boolean;
  marketingConsent: boolean;
  onboardingCompleted: boolean;
}

// Module-level cached session so the rest of the app can read auth state synchronously.
let cachedUser: AuthUser | null = null;

function toAuthUser(user: { id: string; email?: string | null } | null): AuthUser | null {
  if (!user) return null;
  return { id: user.id, email: user.email ?? "" };
}

// Hydrate the cached session on load.
supabase.auth.getSession().then(({ data }) => {
  cachedUser = toAuthUser(data.session?.user ?? null);
});

// Keep the cache in sync. This callback must stay synchronous (no awaited supabase calls).
supabase.auth.onAuthStateChange((_event, session) => {
  cachedUser = toAuthUser(session?.user ?? null);
});

function getAuthCallbackUrl(): string {
  const basePath = __BASE_PATH__.split("/").filter(Boolean).join("/");
  const pathPrefix = basePath ? `/${basePath}` : "";
  return `${window.location.origin}${pathPrefix}/auth/callback`;
}

export function getCurrentUser(): AuthUser | null {
  return cachedUser;
}

export function getCurrentSession(): { user: AuthUser | null } {
  return { user: cachedUser };
}

export function isAuthenticated(): boolean {
  return cachedUser !== null;
}

export function hasCompletedOnboarding(profile: MemberProfile | null): boolean {
  return profile?.onboardingCompleted ?? false;
}

// Wait briefly for the SIGNED_IN event after a magic-link redirect.
function waitForSignedIn(timeoutMs: number): Promise<AuthUser | null> {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (user: AuthUser | null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      subscription.unsubscribe();
      resolve(user);
    };
    const timer = setTimeout(() => finish(null), timeoutMs);
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        finish(toAuthUser(session.user));
      }
    });
  });
}

export async function signInWithMagicLink(
  email: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: getAuthCallbackUrl(),
        shouldCreateUser: true,
      },
    });

    if (error) {
      return { success: false, error: "We couldn't send your login link. Please try again." };
    }

    recordAuthEvent("magic_link_sent", email);
    return { success: true };
  } catch {
    return { success: false, error: "We couldn't send your login link. Please try again." };
  }
}

export async function handleAuthCallback(): Promise<{ user: AuthUser | null; error?: string }> {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      return { user: null, error: "This login link has expired. Request a new one." };
    }

    let user = toAuthUser(data.session?.user ?? null);

    // If the session isn't ready yet (auth code still exchanging), wait for SIGNED_IN.
    if (!user) {
      user = await waitForSignedIn(10000);
    }

    if (!user) {
      return { user: null, error: "This login link has expired or is invalid. Request a new one." };
    }

    cachedUser = user;
    recordAuthEvent("login_success", user.email, user.id);
    return { user };
  } catch {
    return { user: null, error: "We could not process your login. Please try again." };
  }
}

interface DbProfileRow {
  id: string;
  user_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  postcode: string | null;
  town: string | null;
  preferred_distance_miles: number | null;
  fishing_interests_json: string[] | null;
  preferred_booking_types_json: string[] | null;
  email_reminders_enabled: boolean | null;
  marketing_consent: boolean | null;
  onboarding_completed: boolean | null;
}

function mapProfileFromDb(row: DbProfileRow): MemberProfile {
  return {
    id: row.id,
    userId: row.user_id,
    email: row.email ?? "",
    firstName: row.first_name ?? "",
    lastName: row.last_name ?? "",
    phone: row.phone ?? "",
    postcode: row.postcode ?? "",
    town: row.town ?? "",
    preferredDistanceMiles: row.preferred_distance_miles ?? 50,
    fishingInterests: row.fishing_interests_json ?? [],
    preferredBookingTypes: row.preferred_booking_types_json ?? [],
    emailRemindersEnabled: row.email_reminders_enabled ?? true,
    marketingConsent: row.marketing_consent ?? false,
    onboardingCompleted: row.onboarding_completed ?? false,
  };
}

export async function getMemberProfile(userId: string): Promise<MemberProfile | null> {
  try {
    const { data, error } = await supabase
      .from("member_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) return null;
    if (!data) return null;
    return mapProfileFromDb(data as DbProfileRow);
  } catch {
    return null;
  }
}

export async function saveMemberProfile(
  userId: string,
  profile: Partial<MemberProfile>,
): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      user_id: userId,
      email: profile.email,
      first_name: profile.firstName,
      last_name: profile.lastName,
      phone: profile.phone,
      postcode: profile.postcode,
      town: profile.town,
      preferred_distance_miles: profile.preferredDistanceMiles,
      fishing_interests_json: profile.fishingInterests ?? [],
      preferred_booking_types_json: profile.preferredBookingTypes ?? [],
      email_reminders_enabled: profile.emailRemindersEnabled,
      marketing_consent: profile.marketingConsent,
      onboarding_completed: profile.onboardingCompleted,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
      .from("member_profiles")
      .upsert(payload, { onConflict: "user_id" });

    if (error) {
      return { success: false, error: "We couldn't save your profile. Please try again." };
    }

    if (profile.onboardingCompleted) {
      recordAuthEvent("onboarding_completed", profile.email ?? "", userId);
    }

    return { success: true };
  } catch {
    return { success: false, error: "We couldn't save your profile. Please try again." };
  }
}

export async function logout(): Promise<void> {
  try {
    recordAuthEvent("logout", cachedUser?.email ?? "");
    await supabase.auth.signOut();
  } catch {
    // signOut can throw if there is no session — ignore.
  }
  cachedUser = null;
}

// --- Saved lakes ---

export interface SavedLake {
  id: string;
  lakeId: string;
  tenantId: string | null;
  createdAt: string;
}

export async function saveLake(userId: string, lakeId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from("saved_lakes").insert({ user_id: userId, lake_id: lakeId });
    return !error;
  } catch {
    return false;
  }
}

export async function unsaveLake(userId: string, lakeId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("saved_lakes")
      .delete()
      .eq("user_id", userId)
      .eq("lake_id", lakeId);
    return !error;
  } catch {
    return false;
  }
}

export async function getSavedLakes(userId: string): Promise<SavedLake[]> {
  try {
    const { data, error } = await supabase
      .from("saved_lakes")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return (data as Array<{ id: string; lake_id: string; tenant_id: string | null; created_at: string }>).map(
      (row) => ({
        id: row.id,
        lakeId: row.lake_id,
        tenantId: row.tenant_id,
        createdAt: row.created_at,
      }),
    );
  } catch {
    return [];
  }
}

// --- Consent + audit helpers ---

export async function recordConsent(
  userId: string,
  consentType: string,
  consentGiven: boolean,
): Promise<void> {
  try {
    await supabase.from("member_consents").insert({
      user_id: userId,
      consent_type: consentType,
      consent_given: consentGiven,
      consented_at: new Date().toISOString(),
    });
  } catch {
    // Best-effort — never block the auth flow on consent logging.
  }
}

export function recordAuthEvent(
  eventType: string,
  email?: string,
  userId?: string,
): void {
  try {
    void supabase.from("auth_audit_events").insert({
      user_id: userId ?? null,
      email: email ?? null,
      event_type: eventType,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
    });
  } catch {
    // Best-effort audit logging.
  }
}