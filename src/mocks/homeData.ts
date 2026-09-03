export const popularFisheries = [
  {
    id: "willow-mere",
    name: "Willow Mere Fishery",
    distance: "8.4 miles away",
    species: ["Carp", "Tench", "Bream"],
    priceFrom: 15,
    availability: "Available today",
    weather: "17°C, light wind",
    latestCatch: "28lb mirror carp",
    swimCount: 12,
    fishingTypes: ["Carp fishing", "Day Ticket", "Night fishing"],
    imageQuery: "Serene%20UK%20fishing%20lake%20surrounded%20by%20willow%20trees%20on%20a%20sunny%20morning%2C%20calm%20water%20reflecting%20green%20landscape%2C%20peaceful%20countryside%20setting%20with%20soft%20natural%20light%2C%20minimalist%20nature%20photography%20style%20with%20muted%20earthy%20tones",
  },
  {
    id: "oakfield-carp",
    name: "Oakfield Carp Lake",
    distance: "12 miles away",
    species: ["Carp", "Catfish"],
    priceFrom: 20,
    availability: "Limited availability",
    weather: "16°C, overcast",
    latestCatch: "31lb common carp",
    swimCount: 8,
    fishingTypes: ["Carp fishing", "Night fishing", "Syndicate waters"],
    imageQuery: "Large%20carp%20fishing%20lake%20with%20oak%20trees%20along%20the%20bank%2C%20misty%20morning%20atmosphere%20over%20dark%20water%2C%20English%20countryside%20landscape%2C%20dramatic%20sky%20with%20soft%20light%2C%20moody%20atmospheric%20photography",
  },
  {
    id: "brookside-day",
    name: "Brookside Day Ticket Lake",
    distance: "5.7 miles away",
    species: ["Roach", "Perch", "Bream"],
    priceFrom: 10,
    availability: "Day tickets available",
    weather: "18°C, sunny spells",
    latestCatch: "6lb bream",
    swimCount: 15,
    fishingTypes: ["Day Ticket", "Coarse fishing", "Match fishing"],
    imageQuery: "Small%20charming%20UK%20fishing%20lake%20with%20a%20wooden%20platform%20swim%2C%20clear%20blue%20sky%20reflected%20on%20gentle%20water%2C%20green%20grass%20banks%20with%20wildflowers%2C%20bright%20natural%20daylight%2C%20inviting%20peaceful%20atmosphere",
  },
  {
    id: "thornwood",
    name: "Thornwood Reservoir",
    distance: "14 miles away",
    species: ["Pike", "Perch", "Zander"],
    priceFrom: 18,
    availability: "Available today",
    weather: "15°C, breezy",
    latestCatch: "22lb pike",
    swimCount: 20,
    fishingTypes: ["Predator fishing", "Day Ticket", "Night fishing"],
    imageQuery: "Sprawling%20UK%20reservoir%20fishing%20venue%20with%20distant%20tree%20line%2C%20wide%20open%20water%20under%20soft%20cloudy%20sky%2C%20fisherman%20silhouette%20on%20the%20bank%2C%20natural%20landscape%20with%20earthy%20tones%2C%20tranquil%20atmospheric%20scene",
  },
];

export const fishingTypes = [
  {
    id: "carp",
    name: "Carp Fishing",
    icon: "ri-map-pin-line",
    description: "Find specimen carp lakes with day and night fishing across the UK.",
  },
  {
    id: "day-ticket",
    name: "Day Tickets",
    icon: "ri-sun-line",
    description: "No membership needed — pay per session at day ticket waters near you.",
  },
  {
    id: "night",
    name: "Night Fishing",
    icon: "ri-moon-line",
    description: "24-hour and multi-night sessions at lakes that allow overnight stays.",
  },
  {
    id: "match",
    name: "Match Fishing",
    icon: "ri-trophy-line",
    description: "Competition venues with pegged swims and match booking availability.",
  },
  {
    id: "predator",
    name: "Predator Fishing",
    icon: "ri-anchor-line",
    description: "Dedicated pike, perch, and zander waters for lure and deadbait anglers.",
  },
  {
    id: "syndicate",
    name: "Syndicate Waters",
    icon: "ri-shield-check-line",
    description: "Members-only lakes with limited tickets for a quieter fishing experience.",
  },
];

export const howItWorksSteps = [
  {
    step: 1,
    title: "Search your area",
    description: "Enter your location, pick a date, and choose your fishing type to find nearby lakes.",
    icon: "ri-search-line",
  },
  {
    step: 2,
    title: "Compare lakes and rules",
    description: "Browse lake details, check rules, view swim maps, and compare prices side by side.",
    icon: "ri-scales-line",
  },
  {
    step: 3,
    title: "Choose a swim or pass",
    description: "Pick your preferred swim, grab a day ticket, or join a waiting list for busy venues.",
    icon: "ri-check-double-line",
  },
  {
    step: 4,
    title: "Book and get updates",
    description: "Secure your booking online. Get reminders, weather updates, and gate codes before you go.",
    icon: "ri-notification-3-line",
  },
];

export const latestCatches = [
  {
    id: "catch-1",
    species: "Mirror Carp",
    weight: "28lb",
    lakeName: "Willow Mere Fishery",
    swim: "Swim 4",
    date: "2026-07-03",
    imageQuery: "Large%20mirror%20carp%20being%20held%20by%20angler%20on%20a%20green%20unhooking%20mat%2C%20close-up%20of%20beautiful%20scaled%20fish%2C%20natural%20daylight%2C%20fishing%20catch%20photography%20with%20soft%20background%20blur",
  },
  {
    id: "catch-2",
    species: "Common Carp",
    weight: "31lb",
    lakeName: "Oakfield Carp Lake",
    swim: "Swim 7",
    date: "2026-07-05",
    imageQuery: "Large%20common%20carp%20held%20by%20fisherman%20at%20sunset%20lakeside%2C%20golden%20hour%20light%20on%20fish%20scales%2C%20proud%20catch%20moment%2C%20warm%20atmospheric%20evening%20light%2C%20UK%20fishing",
  },
  {
    id: "catch-3",
    species: "Bream",
    weight: "6lb",
    lakeName: "Brookside Day Ticket Lake",
    swim: "Swim 2",
    date: "2026-07-06",
    imageQuery: "Nice%20bream%20fish%20resting%20on%20unhooking%20mat%20in%20morning%20light%2C%20close-up%20detail%20of%20silver%20scales%20and%20fins%2C%20green%20grass%20background%2C%20clean%20fishing%20catch%20photography",
  },
];

export const anglerBenefits = [
  { icon: "ri-heart-line", text: "Save favourite lakes" },
  { icon: "ri-eye-line", text: "View swim availability" },
  { icon: "ri-user-star-line", text: "Join waiting lists" },
  { icon: "ri-time-line", text: "Get booking reminders" },
  { icon: "ri-camera-line", text: "Submit catch reports" },
  { icon: "ri-lock-line", text: "Access member-only fisheries" },
];

export const fisheryOwnerFeatures = [
  { icon: "ri-layout-masonry-line", title: "Drag-and-drop swim map", description: "Design your lake layout visually — place swims, mark features, and set peg numbers." },
  { icon: "ri-calendar-check-line", title: "Online bookings", description: "Accept bookings 24/7. Set your own availability, pricing, and session types." },
  { icon: "ri-group-line", title: "Member management", description: "Manage syndicate members, track payments, and control access with ease." },
  { icon: "ri-bank-card-line", title: "Payments", description: "Take deposits and full payments online. Automated invoicing and payout tracking." },
  { icon: "ri-shield-user-line", title: "Bailiff dashboard", description: "Give your bailiffs a simple mobile view for checking bookings and gate access." },
  { icon: "ri-image-line", title: "Catch reports", description: "Anglers submit catch reports. You review and approve them before they go public." },
  { icon: "ri-qr-code-line", title: "Gate code & QR check-in", description: "Auto-generate gate codes and QR passes for booked anglers." },
  { icon: "ri-cloud-line", title: "Weather & local services", description: "Live weather widgets and nearby tackle shop listings built into your lake page." },
];