// FisheryHub Auth Library — Placeholder for Supabase Auth integration
// TODO: Connect Supabase Auth when ready. Currently mocked for UI development.

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

// Simulates a logged-in user in memory for demo/development
let mockSession: AuthUser | null = null;

export function getCurrentUser(): AuthUser | null {
  // TODO: Replace with supabase.auth.getUser()
  return mockSession;
}

export function getCurrentSession(): { user: AuthUser | null } {
  return { user: mockSession };
}

export async function signInWithMagicLink(email: string): Promise<{ success: boolean; error?: string }> {
  // TODO: Replace with supabase.auth.signInWithOtp({ email })
  console.log("[Auth Placeholder] Magic link requested for:", email);
  mockSession = { id: "user-abc-123", email };
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1500);
  });
}

export async function handleAuthCallback(): Promise<{ user: AuthUser | null; error?: string }> {
  // TODO: Replace with supabase.auth.onAuthStateChange or verifyOtp
  console.log("[Auth Placeholder] Processing auth callback");
  return new Promise((resolve) => {
    setTimeout(() => {
      if (mockSession) {
        resolve({ user: mockSession });
      } else {
        resolve({ user: null, error: "No session found. The login link may have expired." });
      }
    }, 2000);
  });
}

export async function getMemberProfile(userId: string): Promise<MemberProfile | null> {
  // TODO: Replace with supabase.from("member_profiles").select().eq("user_id", userId).maybeSingle()
  console.log("[Auth Placeholder] Fetching profile for:", userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: "member-001",
        userId,
        email: mockSession?.email || "angler@example.com",
        firstName: "",
        lastName: "",
        phone: "",
        postcode: "",
        town: "",
        preferredDistanceMiles: 50,
        fishingInterests: [],
        preferredBookingTypes: [],
        emailRemindersEnabled: true,
        marketingConsent: false,
        onboardingCompleted: false,
      });
    }, 300);
  });
}

export async function saveMemberProfile(
  userId: string,
  profile: Partial<MemberProfile>,
): Promise<{ success: boolean; error?: string }> {
  // TODO: Replace with supabase.from("member_profiles").upsert(...)
  console.log("[Auth Placeholder] Saving profile for:", userId, profile);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export async function logout(): Promise<void> {
  // TODO: Replace with supabase.auth.signOut()
  mockSession = null;
  console.log("[Auth Placeholder] Logged out");
}

export function isAuthenticated(): boolean {
  return mockSession !== null;
}

export function hasCompletedOnboarding(profile: MemberProfile | null): boolean {
  return profile?.onboardingCompleted ?? false;
}