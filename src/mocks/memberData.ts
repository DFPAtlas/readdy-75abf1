export const anglerBenefits = [
  { icon: "ri-heart-line", title: "Save favourite lakes", description: "Build your personal list of go-to waters across the UK." },
  { icon: "ri-eye-line", title: "View swim availability", description: "Check which swims are free before you head out." },
  { icon: "ri-user-star-line", title: "Join waiting lists", description: "Get notified when a swim opens up at busy venues." },
  { icon: "ri-time-line", title: "Get booking reminders", description: "Never miss a session with email and in-app reminders." },
  { icon: "ri-camera-line", title: "Submit catch reports", description: "Share your catches and build your angling record." },
  { icon: "ri-lock-line", title: "Access member-only fisheries", description: "Unlock private and syndicate waters where permitted." },
];

export const fishingInterestOptions = [
  "Carp fishing",
  "Coarse fishing",
  "Match fishing",
  "Predator fishing",
  "Fly fishing",
  "Night fishing",
  "Day tickets",
  "Syndicate waters",
  "Members-only lakes",
];

export const preferredDistanceOptions = [
  { value: "10", label: "Up to 10 miles" },
  { value: "25", label: "Up to 25 miles" },
  { value: "50", label: "Up to 50 miles" },
  { value: "100", label: "Up to 100 miles" },
  { value: "any", label: "Any distance" },
];

export const preferredBookingOptions = [
  "Day tickets",
  "Night sessions",
  "24-hour sessions",
  "Weekend sessions",
  "Weekly bookings",
  "Match bookings",
];

export const mockMemberProfile = {
  id: "member-001",
  userId: "user-abc-123",
  email: "angler@example.com",
  firstName: "James",
  lastName: "Thompson",
  phone: "",
  postcode: "ME15 8LX",
  town: "Maidstone",
  preferredDistanceMiles: 50,
  fishingInterests: ["Carp fishing", "Night fishing", "Day tickets"],
  preferredBookingTypes: ["Day tickets", "Night sessions"],
  emailRemindersEnabled: true,
  marketingConsent: false,
  onboardingCompleted: true,
  createdAt: "2026-06-15T10:30:00Z",
  updatedAt: "2026-07-02T14:20:00Z",
};

export const mockSavedLakes = [
  {
    id: "saved-1",
    lakeId: "willow-mere",
    lakeName: "Willow Mere Fishery",
    location: "Maidstone, Kent",
    species: ["Carp", "Tench", "Bream"],
    priceFrom: 15,
    savedAt: "2026-06-20T08:00:00Z",
    imageQuery: "Serene UK fishing lake surrounded by willow trees on a sunny morning, calm water reflecting green landscape, peaceful countryside setting with soft natural light, minimalist nature photography style with muted earthy tones",
    availability: "Available today",
  },
  {
    id: "saved-2",
    lakeId: "oakfield-carp",
    lakeName: "Oakfield Carp Lake",
    location: "Tonbridge, Kent",
    species: ["Carp", "Catfish"],
    priceFrom: 20,
    savedAt: "2026-06-18T12:00:00Z",
    imageQuery: "Large carp fishing lake with oak trees along the bank, misty morning atmosphere over dark water, English countryside landscape, dramatic sky with soft light, moody atmospheric photography",
    availability: "Limited availability",
  },
];

export const mockUpcomingBookings: Array<{
  id: string;
  lakeName: string;
  swimName: string;
  date: string;
  time: string;
  price: number;
  status: string;
}> = [];

export const mockWaitingList: Array<{
  id: string;
  lakeName: string;
  swimName: string;
  joinedAt: string;
  position: number;
}> = [];

export const mockCatchReports: Array<{
  id: string;
  species: string;
  weight: string;
  lakeName: string;
  date: string;
  approved: boolean;
}> = [];

export const mockDemoAccessTokens = {
  activeTokens: [
    { token: "demo-angler-abc", expiresAt: "2026-08-07T00:00:00Z", usesRemaining: 10 },
    { token: "demo-angler-xyz", expiresAt: "2026-08-14T00:00:00Z", usesRemaining: 5 },
  ],
};