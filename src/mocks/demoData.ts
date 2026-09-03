export const demoLandingData = {
  heroHeadline: "See how FisheryHub works for your fishery",
  heroSubtitle: "Explore how you can map swims, take bookings, manage members, track payments, and run your fishery from one dashboard.",
  primaryCTA: "Request Demo Link",
  secondaryCTA: "View Owner Features",
  dashboardPreview: {
    bookingsToday: 14,
    freeSwims: 6,
    revenueToday: 285,
    checkedInAnglers: 8,
    latestCatches: 3,
    alerts: 2,
  },
  previewFeatures: [
    { id: "public-lake", title: "Public lake listing", description: "Beautiful lake profile page with photos, prices, rules, weather, and local services all in one place.", icon: "ri-image-line" },
    { id: "swim-map", title: "Swim map", description: "Interactive drag-and-drop swim map so anglers can see availability and pick their peg.", icon: "ri-map-pin-line" },
    { id: "booking-flow", title: "Booking flow", description: "Smooth booking with date picker, swim selector, rules acceptance, and payment.", icon: "ri-calendar-check-line" },
    { id: "owner-dashboard", title: "Owner dashboard", description: "At-a-glance overview of today's bookings, revenue, free swims, checked-in anglers, and alerts.", icon: "ri-dashboard-line" },
    { id: "calendar", title: "Booking calendar", description: "Month, week, and day views with colour-coded swim statuses and drag-to-move bookings.", icon: "ri-calendar-line" },
    { id: "members", title: "Member management", description: "Manage syndicate members, track payments, control gate access, and handle waiting lists.", icon: "ri-group-line" },
    { id: "bailiff", title: "Bailiff dashboard", description: "Mobile-friendly view for bailiffs — check bookings, verify selfies, release gate codes.", icon: "ri-shield-user-line" },
    { id: "catch-reports", title: "Catch reports", description: "Anglers submit catches with photos. You review and approve before they go public on your lake page.", icon: "ri-camera-line" },
    { id: "local-services", title: "Local services", description: "Tackle shops, food, fuel, and cafés listed on your lake page so anglers know what's nearby.", icon: "ri-store-2-line" },
    { id: "weather", title: "Weather widget", description: "Live weather with sunrise, sunset, wind, and rain forecast built into every lake page.", icon: "ri-cloud-windy-line" },
  ],
  fisheryTypes: [
    { id: "day-ticket", title: "Day-ticket lakes", description: "Take online bookings, set session prices, and let anglers pay before they arrive.", icon: "ri-sun-line" },
    { id: "carp", title: "Carp fisheries", description: "Manage night sessions, specimen lakes, bait rules, and multi-rod bookings.", icon: "ri-anchor-line" },
    { id: "coarse", title: "Coarse fisheries", description: "Match bookings, peg draws, keepnet rules, and day ticket sales.", icon: "ri-drop-line" },
    { id: "syndicate", title: "Syndicate waters", description: "Member-only access, annual payments, gate codes, and waiting list management.", icon: "ri-shield-check-line" },
    { id: "multi-lake", title: "Multi-lake fisheries", description: "Manage multiple lakes under one account — separate pricing, swims, and rules per lake.", icon: "ri-stack-line" },
    { id: "private", title: "Private/member-only lakes", description: "Gated listing with preview mode. Members-only lake pages with exclusive content.", icon: "ri-lock-line" },
  ],
  steps: [
    { step: 1, title: "Fill out the short demo form", description: "Tell us a bit about your fishery — takes about 2 minutes." },
    { step: 2, title: "We email you a secure demo link", description: "Check your inbox for a personal demo link to explore the platform." },
    { step: 3, title: "Explore demo pages with sample data", description: "Browse the owner dashboard, swim map, booking flow, and more using realistic sample data." },
    { step: 4, title: "We help plan your fishery setup", description: "When you are ready, we walk through your lake layout, swims, pricing, and booking setup together." },
  ],
};

export const demoPortalCards = [
  { id: "public-lake", title: "Demo Public Lake Page", description: "See how your lake looks to anglers — photos, prices, rules, swim map, weather, and local services.", icon: "ri-image-line", route: "public-lake" },
  { id: "booking-flow", title: "Demo Swim Booking Flow", description: "Walk through the booking process — choose a swim, pick a date, accept rules, and confirm.", icon: "ri-calendar-check-line", route: "booking-flow" },
  { id: "owner-dashboard", title: "Demo Owner Dashboard", description: "View today's bookings, revenue, checked-in anglers, pending waivers, and alerts at a glance.", icon: "ri-dashboard-line", route: "owner-dashboard" },
  { id: "calendar", title: "Demo Booking Calendar", description: "Month, week, and day calendar views with colour-coded bookings by swim.", icon: "ri-calendar-line", route: "calendar" },
  { id: "swim-map", title: "Demo Swim Map Builder", description: "Drag-and-drop swim placement on your lake map with swim detail editing.", icon: "ri-map-pin-line", route: "swim-map-builder" },
  { id: "bailiff", title: "Demo Bailiff Dashboard", description: "Mobile-friendly bailiff view — bookings list, selfie verification, QR check-in, and gate codes.", icon: "ri-shield-user-line", route: "bailiff-dashboard" },
  { id: "member", title: "Demo Member Dashboard", description: "See what members experience — upcoming bookings, saved lakes, catch reports, and gate codes.", icon: "ri-user-star-line", route: "member-dashboard" },
  { id: "local-services", title: "Demo Local Services & Weather", description: "Weather widgets, tackle shops, food, fuel, and cafés displayed on your lake page.", icon: "ri-store-2-line", route: "local-services" },
];

export const demoPublicLake = {
  fishery: {
    name: "Willow Mere Fishery (Demo)",
    ownerDisplayName: "FisheryHub Demo",
    about: "Willow Mere Fishery is a family-run venue established in 2003. We manage three lakes across 40 acres of Kent countryside, with Main Lake being our flagship specimen water. This is a demo listing — all data is sample data only.",
  },
  lake: {
    name: "Main Lake (Demo)",
    description: "A mature 12-acre gravel pit with 18 well-spaced swims, set among ancient willow trees. Known for specimen carp to 30lb+, strong tench, and quality bream. The lake has depths from 4ft in the margins to 14ft in the central bowl.",
    location: { town: "Maidstone", county: "Kent", postcode: "ME15 8LX" },
    priceFrom: 15,
    priceDayTicket: 15,
    priceNightTicket: 30,
    lakeSize: "12 acres",
    depthRange: "4ft – 14ft",
    species: ["Carp", "Tench", "Bream", "Roach"],
    swimCount: 18,
    availableSwims: 4,
    bookedSwims: 12,
    maintenanceSwims: 2,
    availabilityLabel: "Available today",
    openingTimes: "6am – 9pm (day ticket)",
    nightFishing: true,
    weather: {
      current: "17°C",
      condition: "Light wind, sunny spells",
      windSpeed: "8 mph",
      windDirection: "SW",
      rainChance: "20%",
      sunrise: "04:47",
      sunset: "21:12",
      forecast: [
        { day: "Today", temp: "17°C", icon: "ri-sun-line", rain: "20%" },
        { day: "Thu", temp: "18°C", icon: "ri-sun-line", rain: "10%" },
        { day: "Fri", temp: "19°C", icon: "ri-cloudy-line", rain: "30%" },
        { day: "Sat", temp: "16°C", icon: "ri-showers-line", rain: "60%" },
        { day: "Sun", temp: "15°C", icon: "ri-showers-line", rain: "70%" },
      ],
    },
    rules: [
      "Barbless hooks only — no exceptions",
      "Landing mats and unhooking cradles required at all times",
      "No keepnets (match bookings excepted by prior arrangement)",
      "No nuts, pulses, or tiger nuts",
      "Maximum 2 rods per angler",
      "No sacking of fish",
      "No litter — take everything home",
      "Night fishing must be booked at least 48 hours in advance",
    ],
    pricePlans: [
      { id: "day-ticket", name: "Day Ticket", price: 15, duration: "6am – 9pm", badge: "Popular" },
      { id: "24-hour", name: "24 Hour Ticket", price: 28, duration: "24 hours from start", badge: "Best value" },
      { id: "weekend", name: "Weekend Pass", price: 45, duration: "Fri 6pm – Sun 9pm", badge: null },
      { id: "year", name: "Annual Membership", price: 350, duration: "12 months", badge: "Limited" },
    ],
    latestCatches: [
      { species: "Mirror Carp", weight: "28lb", swim: "Swim 4 – Deep Water", bait: "Boilie", date: "2026-07-03", anglerName: "Mark" },
      { species: "Common Carp", weight: "22lb 4oz", swim: "Swim 3 – Oak Bank", bait: "Boilie", date: "2026-06-28", anglerName: "Fishery report" },
      { species: "Tench", weight: "7lb 12oz", swim: "Swim 1 – Reeds", bait: "Maggot", date: "2026-06-25", anglerName: "Sarah" },
      { species: "Bream", weight: "9lb 3oz", swim: "Swim 8 – East Bank", bait: "Feeder", date: "2026-06-20", anglerName: "Fishery report" },
    ],
    localServices: {
      tackle: [{ name: "Joe's Tackle & Bait", distance: "2.4 miles", status: "Open today 8am–6pm", phone: "01622 555123" }],
      food: [{ name: "The Fisherman's Rest", distance: "1.8 miles", status: "Open today 7am–10pm", phone: "01622 456789" }],
      fuel: [{ name: "BP Maidstone Services", distance: "2.0 miles", status: "Open 24 hours", phone: "01622 234567" }],
    },
  },
};

export const demoOwnerDashboard = {
  todayStats: {
    totalBookings: 14,
    revenue: 285,
    freeSwims: 6,
    checkedInAnglers: 8,
    pendingWaivers: 2,
    latestCatches: 3,
    alerts: 2,
  },
  recentBookings: [
    { id: "bk-1", angler: "James Wilson", swim: "Swim 4 – Deep Water", time: "6am – 9pm", status: "checked-in", statusLabel: "Checked in", amount: 15 },
    { id: "bk-2", angler: "Tom Harris", swim: "Swim 3 – Oak Bank", time: "6am Fri – 9pm Sun", status: "confirmed", statusLabel: "Confirmed", amount: 45 },
    { id: "bk-3", angler: "Sarah Mitchell", swim: "Swim 1 – Reeds", time: "6am – 9pm", status: "checked-in", statusLabel: "Checked in", amount: 15 },
    { id: "bk-4", angler: "Dave Cooper", swim: "Swim 7 – Carp Bay", time: "6am – 9pm", status: "pending", statusLabel: "Pending", amount: 15 },
    { id: "bk-5", angler: "Mike Brennan", swim: "Swim 5 – Willow Corner", time: "6pm Fri – 9pm Sun", status: "confirmed", statusLabel: "Confirmed", amount: 45 },
  ],
  alerts: [
    { id: "al-1", type: "waiver", message: "2 anglers have not yet accepted the updated lake rules", priority: "high" },
    { id: "al-2", type: "catch", message: "3 new catch reports waiting for approval", priority: "medium" },
  ],
  setupProgress: [
    { label: "Lake profile", complete: true },
    { label: "Swim map", complete: true },
    { label: "Pricing & passes", complete: true },
    { label: "Lake rules", complete: true },
    { label: "Gate code integration", complete: false },
    { label: "Payment setup", complete: false },
    { label: "Bailiff accounts", complete: false },
    { label: "Member import", complete: false },
  ],
};

export const demoCalendar = {
  currentMonth: "July 2026",
  swims: ["Swim 1", "Swim 2", "Swim 3", "Swim 4", "Swim 5", "Swim 6", "Swim 7", "Swim 8"],
  bookings: [
    { id: "cal-1", swim: "Swim 4", date: "2026-07-07", angler: "James Wilson", status: "checked-in", statusColor: "bg-primary-100 text-primary-700" },
    { id: "cal-2", swim: "Swim 3", date: "2026-07-07", angler: "Tom Harris", status: "confirmed", statusColor: "bg-accent-100 text-accent-800" },
    { id: "cal-3", swim: "Swim 1", date: "2026-07-07", angler: "Sarah Mitchell", status: "checked-in", statusColor: "bg-primary-100 text-primary-700" },
    { id: "cal-4", swim: "Swim 7", date: "2026-07-07", angler: "Dave Cooper", status: "pending", statusColor: "bg-secondary-100 text-secondary-700" },
    { id: "cal-5", swim: "Swim 5", date: "2026-07-10", angler: "Mike Brennan", status: "confirmed", statusColor: "bg-accent-100 text-accent-800" },
    { id: "cal-6", swim: "Swim 6", date: "2026-07-10", angler: "Andy Clark", status: "confirmed", statusColor: "bg-accent-100 text-accent-800" },
    { id: "cal-7", swim: "Swim 8", date: "2026-07-11", angler: "Phil Jones", status: "confirmed", statusColor: "bg-accent-100 text-accent-800" },
    { id: "cal-8", swim: "Swim 2", date: "2026-07-12", angler: "Rob Taylor", status: "pending", statusColor: "bg-secondary-100 text-secondary-700" },
  ],
};

export const demoSwimMap = {
  lakeName: "Main Lake (Demo)",
  swims: [
    { id: "s1", name: "Reeds", x: 15, y: 22, status: "free", capacity: 2, description: "Shallow margins with reed beds. Good for tench and bream." },
    { id: "s2", name: "Island Point", x: 38, y: 18, status: "booked", capacity: 2, description: "Casts to the central island. Popular carp swim." },
    { id: "s3", name: "Oak Bank", x: 62, y: 25, status: "free", capacity: 3, description: "Spacious double swim under mature oak. Night fishing allowed." },
    { id: "s4", name: "Deep Water", x: 85, y: 35, status: "free", capacity: 2, description: "Deepest part of the lake at 14ft. Known for big carp." },
    { id: "s5", name: "Willow Corner", x: 78, y: 62, status: "booked", capacity: 2, description: "Secluded corner swim. Night fishing swim." },
    { id: "s6", name: "The Point", x: 55, y: 72, status: "booked", capacity: 2, description: "Peninsula swim with 270° water access. Premium peg." },
    { id: "s7", name: "Carp Bay", x: 30, y: 68, status: "free", capacity: 3, description: "Shallow bay. Night fishing allowed. Bivvy friendly." },
    { id: "s8", name: "East Bank", x: 12, y: 52, status: "booked", capacity: 2, description: "Open water swim. Good all-rounder. Easy access." },
  ],
};

export const demoBailiff = {
  todayBookings: [
    { id: "bf-1", angler: "James Wilson", swim: "Swim 4 – Deep Water", time: "6am – 9pm", selfieVerified: true, qrCheckedIn: true, gateCodeReleased: true, vehicleReg: "AB12 CDE" },
    { id: "bf-2", angler: "Sarah Mitchell", swim: "Swim 1 – Reeds", time: "6am – 9pm", selfieVerified: true, qrCheckedIn: true, gateCodeReleased: true, vehicleReg: "FG34 HIJ" },
    { id: "bf-3", angler: "Dave Cooper", swim: "Swim 7 – Carp Bay", time: "6am – 9pm", selfieVerified: false, qrCheckedIn: false, gateCodeReleased: false, vehicleReg: "KL56 MNO" },
    { id: "bf-4", angler: "Tom Harris", swim: "Swim 3 – Oak Bank", time: "6am Fri – 9pm Sun", selfieVerified: true, qrCheckedIn: true, gateCodeReleased: true, vehicleReg: "PQ78 RST" },
  ],
  incidents: 0,
  maintenanceTasks: 2,
  gateCode: "8472",
};

export const demoMember = {
  upcomingBooking: {
    lake: "Willow Mere Fishery",
    swim: "Swim 4 – Deep Water",
    date: "Saturday 11th July 2026",
    time: "6am – 9pm",
    gateCode: "8472",
    gateCodeUnlocked: true,
  },
  savedLakes: [
    { name: "Willow Mere Fishery", location: "Maidstone, Kent", saved: "2 weeks ago" },
    { name: "Oakfield Carp Lake", location: "Ashford, Kent", saved: "1 month ago" },
    { name: "Brookside Day Ticket Lake", location: "Sevenoaks, Kent", saved: "2 months ago" },
  ],
  catchReport: {
    species: "Mirror Carp",
    weight: "28lb",
    lake: "Willow Mere Fishery",
    date: "3rd July 2026",
    status: "approved",
  },
  vehicleRegistration: "AB12 CDE",
  rulesAccepted: true,
  waiverSigned: true,
};

export const demoLocalServices = {
  weather: {
    current: "17°C",
    condition: "Light wind, sunny spells",
    wind: "8 mph SW",
    rainChance: "20%",
    sunrise: "04:47",
    sunset: "21:12",
    forecast: [
      { day: "Today", temp: "17°C", icon: "ri-sun-line", rain: "20%" },
      { day: "Thu", temp: "18°C", icon: "ri-sun-line", rain: "10%" },
      { day: "Fri", temp: "19°C", icon: "ri-cloudy-line", rain: "30%" },
      { day: "Sat", temp: "16°C", icon: "ri-showers-line", rain: "60%" },
      { day: "Sun", temp: "15°C", icon: "ri-showers-line", rain: "70%" },
    ],
  },
  services: [
    { id: "svc-1", name: "Joe's Tackle & Bait", category: "Tackle & Bait", distance: "2.4 miles", status: "Open today 8am–6pm", phone: "01622 555123", icon: "ri-shopping-bag-line", description: "Family-run tackle shop. Fresh and frozen bait, terminal tackle, and carp gear." },
    { id: "svc-2", name: "The Fisherman's Rest", category: "Food Nearby", distance: "1.8 miles", status: "Open today 7am–10pm", phone: "01622 456789", icon: "ri-restaurant-2-line", description: "Traditional pub. Hot food all day. Takeaway available. Angler discount." },
    { id: "svc-3", name: "BP Maidstone Services", category: "Fuel & Shops", distance: "2.0 miles", status: "Open 24 hours", phone: "01622 234567", icon: "ri-gas-station-line", description: "24-hour petrol station with M&S Simply Food and ATM." },
    { id: "svc-4", name: "Maidstone Fish & Chips", category: "Food Nearby", distance: "3.1 miles", status: "Open today 11:30am–9pm", phone: "01622 345678", icon: "ri-restaurant-line", description: "Award-winning fish and chip shop. Delivery available." },
    { id: "svc-5", name: "Tesco Express", category: "Fuel & Shops", distance: "3.4 miles", status: "Open today 6am–11pm", phone: "01622 890123", icon: "ri-store-line", description: "Supermarket for food, drinks, and essentials." },
    { id: "svc-6", name: "Kent Angling Centre", category: "Tackle & Bait", distance: "5.8 miles", status: "Open today 9am–5:30pm", phone: "01622 789012", icon: "ri-shopping-bag-line", description: "Large angling superstore. Rods, reels, luggage, and bait." },
  ],
};

export const demoBookingFlow = {
  steps: [
    { step: 1, title: "Choose a swim", description: "Pick your swim from the interactive lake map", icon: "ri-map-pin-line" },
    { step: 2, title: "Select date & time", description: "Choose your session type and date", icon: "ri-calendar-line" },
    { step: 3, title: "Accept rules", description: "Read and accept the latest lake rules", icon: "ri-file-text-line" },
    { step: 4, title: "Verification", description: "Submit a booking selfie if required by the fishery", icon: "ri-camera-line" },
    { step: 5, title: "Payment", description: "Pay online securely to confirm your booking", icon: "ri-bank-card-line" },
    { step: 6, title: "Confirmation", description: "Receive gate code, QR pass, and booking details", icon: "ri-check-double-line" },
  ],
  selectedSwim: "Swim 4 – Deep Water",
  selectedDate: "Saturday 11th July 2026",
  selectedPlan: "Day Ticket (£15)",
  rulesAccepted: true,
};

export const demoRequestsSample = [
  { id: "dr-1", fisheryName: "Willow Mere Fishery", contactName: "John Pearson", email: "john@willowmere.co.uk", phone: "07700 900123", postcode: "ME15 8LX", numberOfLakes: 3, numberOfSwims: 45, bookingMethod: "Phone/manual diary", interests: "Online swim bookings, Drag-and-drop swim map, Payments, QR check-in", message: "Looking to move our three lakes online. Currently manage everything by phone which takes hours every day.", status: "new", demoTokenStatus: "not_created", emailSent: false, demoAccessed: false, consentToContact: true, createdAt: "2026-07-06", requestStatus: "new" },
  { id: "dr-2", fisheryName: "Oakfield Carp Lake", contactName: "Sarah Jennings", email: "sarah@oakfieldcarp.co.uk", phone: "", postcode: "TN24 0AB", numberOfLakes: 1, numberOfSwims: 8, bookingMethod: "Facebook messages", interests: "Online swim bookings, Member management, Catch reports, Weather widget", message: "I run a small carp lake. Most bookings come through Facebook which is getting hard to manage.", status: "email_sent", demoTokenStatus: "active", emailSent: true, demoAccessed: true, consentToContact: true, createdAt: "2026-07-04", requestStatus: "email_sent", lastAccessed: "2026-07-06" },
  { id: "dr-3", fisheryName: "Kingfisher Syndicate", contactName: "Mike Robinson", email: "mike@kingfishersyndicate.org", phone: "07700 900456", postcode: "TN27 8CD", numberOfLakes: 1, numberOfSwims: 10, bookingMethod: "Club/syndicate only", interests: "Member management, Syndicate memberships, Gate code after payment, Demand insights", message: "We are a small syndicate with 45 members. Need a better way to manage renewals and gate codes.", status: "viewed_demo", demoTokenStatus: "active", emailSent: true, demoAccessed: true, consentToContact: true, createdAt: "2026-07-02", requestStatus: "viewed_demo", lastAccessed: "2026-07-05" },
  { id: "dr-4", fisheryName: "Brookside Lakes", contactName: "Alan Briggs", email: "alan@brookside-lakes.co.uk", phone: "07700 900789", postcode: "TN13 1EF", numberOfLakes: 2, numberOfSwims: 30, bookingMethod: "Website form", interests: "Online swim bookings, Bailiff dashboard, Payments, Multi-lake management", message: "Two coarse lakes near Sevenoaks. We take bookings on our website but want something more professional.", status: "converted", demoTokenStatus: "expired", emailSent: true, demoAccessed: true, consentToContact: true, createdAt: "2026-06-28", requestStatus: "converted", lastAccessed: "2026-07-01" },
  { id: "dr-5", fisheryName: "Thornwood Reservoir", contactName: "Claire Hughes", email: "claire@thornwoodfishing.co.uk", phone: "", postcode: "TN14 5GH", numberOfLakes: 1, numberOfSwims: 20, bookingMethod: "Walk-ins only", interests: "Online swim bookings, QR check-in, Gate code after payment, Weather widget, Local services", message: "We are a day ticket reservoir. Currently walk-ins only — would like to take bookings online.", status: "new", demoTokenStatus: "not_created", emailSent: false, demoAccessed: false, consentToContact: true, createdAt: "2026-07-07", requestStatus: "new" },
];