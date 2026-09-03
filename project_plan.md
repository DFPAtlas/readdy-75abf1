# FisheryHub.uk

## 1. Project Description
A two-sided UK fishing platform connecting anglers with fishery owners:
- **Anglers** find, compare, and book fishing lakes across the UK
- **Fishery owners** list lakes, manage swims, take bookings, manage members, and run operations from a dashboard
- Premium, modern SaaS marketplace feel with outdoor/fishing aesthetic

## 2. Page Structure
- `/` - Public Homepage (brand + search + explore)
- `/find-fishing` - Search results with query params (location, date, type)
- `/lake/:id` - Lake detail page
- `/demo` - Owner demo landing page
- `/demo/request` - Demo request form
- `/demo/thank-you` - Demo request thank you page
- `/demo/access/:token` - Demo portal (token-gated)
- `/demo/access/:token/public-lake` - Demo public lake page
- `/demo/access/:token/booking-flow` - Demo booking flow
- `/demo/access/:token/owner-dashboard` - Demo owner dashboard
- `/demo/access/:token/calendar` - Demo booking calendar
- `/demo/access/:token/swim-map-builder` - Demo swim map builder
- `/demo/access/:token/bailiff-dashboard` - Demo bailiff dashboard
- `/demo/access/:token/member-dashboard` - Demo member dashboard
- `/demo/access/:token/local-services` - Demo local services & weather
- `/admin/demo-requests` - Super Admin demo requests tracking
- `/login` - Angler login (built, magic link UI)
- `/signup` - Angler signup (built)
- `/auth/callback` - Auth callback handler (built)
- `/member/onboarding` - Member onboarding flow (built)
- `/member/dashboard` - Member dashboard (built)
- `/account/profile` - Account profile page (built)
- `/catches` - Latest catches feed (future)
- `/pricing` - Pricing page (future)
- `/login` - Authentication (built)

## 3. Core Features
- [x] Public homepage with hero search
- [x] Popular fisheries showcase
- [x] Fishing type category cards
- [x] How it works for anglers
- [x] Latest catches display
- [x] Free angler account CTA
- [x] Fishery owner CTA section
- [x] Platform stats strip
- [x] Final CTA section
- [x] Owner demo request feature (landing, form, thank you, token-gated portal)
- [x] Demo subpages (public lake, booking flow, owner dashboard, calendar, swim map, bailiff, member, local services)
- [x] Super admin demo requests tracking page
- [x] Demo email sending placeholder
- [x] Search results page with filters
- [x] Lake detail page with full sections
- [x] "Request Demo" navigation links in Header, Footer, FisheryOwner CTA, Final CTA, Lake detail Owner CTA
- [x] Angler authentication flow (signup, login, auth callback, onboarding, placeholder dashboard, profile)
- [x] Magic link auth UI with placeholder functions ready for Supabase
- [x] SignupPromptModal for gated actions
- [x] Return URL support for auth flow
- [x] Member profile form with fishing interests, preferences
- [ ] User authentication (Supabase)
- [ ] Angler dashboard (saved lakes, bookings, catch reports)
- [ ] Fishery owner dashboard (lake management, bookings, members)
- [ ] Online bookings and payments (Stripe/Shopify)
- [ ] Catch reports system

## 4. Data Model Design
(For Supabase integration later)

### Table: fisheries
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| name | text | Lake/fishery name |
| description | text | Description |
| location | geography | Geolocation |
| postcode | text | UK postcode |
| price_from | integer | Starting price in GBP |
| species | text[] | Fish species available |
| fishing_types | text[] | Types of fishing |
| swim_count | integer | Number of swims |
| rules | text | Fishery rules |
| owner_id | uuid | FK to owners |

### Table: catch_reports
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| fishery_id | uuid | FK to fisheries |
| angler_id | uuid | FK to anglers |
| species | text | Fish species |
| weight_lb | integer | Weight in pounds |
| photo_url | text | Catch photo |
| date | date | Catch date |
| approved | boolean | Moderation status |

### Table: bookings
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| fishery_id | uuid | FK to fisheries |
| swim_id | uuid | FK to swims |
| angler_id | uuid | FK to anglers |
| date | date | Booking date |
| status | text | confirmed/cancelled/completed |

### Table: demo_requests
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| fishery_name | text | Fishery name |
| contact_name | text | Owner/contact name |
| email | text | Email address |
| phone | text | Phone number (optional) |
| postcode | text | Fishery postcode |
| number_of_lakes | integer | Number of lakes |
| number_of_swims | integer | Number of swims |
| current_booking_method | text | Current booking method |
| interests_json | text | Selected interests (JSON array) |
| message | text | Message/notes |
| consent_to_contact | boolean | Contact consent |
| status | text | new/email_sent/viewed_demo/contacted/converted/not_interested/expired |
| source_page | text | Source page |
| created_at | timestamptz | Created at |
| updated_at | timestamptz | Updated at |

### Table: demo_access_tokens
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| demo_request_id | uuid | FK to demo_requests |
| token_hash | text | Hashed token |
| expires_at | timestamptz | Expiry date |
| max_uses | integer | Max number of uses |
| use_count | integer | Current use count |
| is_active | boolean | Active status |
| created_at | timestamptz | Created at |
| updated_at | timestamptz | Updated at |

### Table: demo_access_logs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| demo_request_id | uuid | FK to demo_requests |
| demo_access_token_id | uuid | FK to demo_access_tokens |
| accessed_page | text | Page accessed |
| ip_address | text | IP address |
| user_agent | text | Browser user agent |
| accessed_at | timestamptz | Access timestamp |

### Table: demo_email_logs
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| demo_request_id | uuid | FK to demo_requests |
| recipient_email | text | Recipient email |
| subject | text | Email subject |
| status | text | queued/sent/failed |
| provider_message_id | text | Email provider message ID |
| error_message | text | Error details |
| sent_at | timestamptz | Sent timestamp |
| created_at | timestamptz | Created at |

### Table: member_profiles
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users |
| email | text | Email address |
| first_name | text | First name |
| last_name | text | Last name (optional) |
| phone | text | Phone number (optional) |
| postcode | text | UK postcode (optional) |
| town | text | Town/area (optional) |
| preferred_distance_miles | integer | Max travel distance |
| fishing_interests_json | text | Fishing interests (JSON array) |
| preferred_booking_types_json | text | Preferred booking types (JSON array) |
| email_reminders_enabled | boolean | Email reminders toggle |
| marketing_consent | boolean | Marketing opt-in |
| onboarding_completed | boolean | Onboarding status |
| created_at | timestamptz | Created at |
| updated_at | timestamptz | Updated at |

### Table: member_consents
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users |
| consent_type | text | terms/privacy/marketing/email_reminders |
| consent_given | boolean | Consent status |
| consent_version | text | Version of terms |
| consent_text | text | Snapshot of consent text |
| consented_at | timestamptz | When consent was given |
| ip_address | text | IP address (nullable) |
| user_agent | text | Browser user agent (nullable) |

### Table: saved_lakes
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| member_id | uuid | FK to member_profiles |
| lake_id | text | Lake identifier |
| tenant_id | uuid | Tenant identifier (nullable) |
| created_at | timestamptz | Saved at |

### Table: auth_audit_events
| Field | Type | Description |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | FK to auth.users (nullable) |
| email | text | Email address |
| event_type | text | magic_link_sent/login_success/login_failed/logout/signup_started/onboarding_completed |
| ip_address | text | IP address (nullable) |
| user_agent | text | Browser user agent (nullable) |
| created_at | timestamptz | Created at |

## 5. Backend / Third-party Integration Plan
- **Supabase**: User auth, database for fisheries/catches/bookings, Edge Functions for business logic
- **Stripe**: Online payments for bookings (future phase)
- **Shopify**: Not required

## 6. Development Phase Plan

### Phase 1: Public Homepage & Brand Direction
- Goal: Build complete public homepage with all sections, hero search, and brand identity
- Deliverable: Fully responsive, premium homepage ready to connect to Supabase later

### Phase 2: Search Results Page
- Goal: Build /find-fishing page that accepts query parameters and displays search results
- Deliverable: Functional search results page with filters

### Phase 3: Lake Detail Page
- Goal: Individual lake page with full details, swims, rules, catches, and weather
- Deliverable: Lake detail page with booking CTA

### Phase 4: Authentication & Angler Accounts
- Goal: Supabase auth setup, free account creation, saved lakes, profile
- Deliverable: Full auth flow with angler dashboard

### Phase 5: Fishery Owner Dashboard
- Goal: Owner tools for lake management, bookings, members
- Deliverable: Complete fishery owner dashboard

### Phase 6: Bookings & Payments
- Goal: Online booking flow with Stripe payments
- Deliverable: End-to-end booking system