import { Link } from "react-router-dom";
import SaveLakeButton from "./SaveLakeButton";

interface LakeResult {
  id: string;
  slug: string;
  lakeSlug: string;
  name: string;
  distance: number;
  town: string;
  county: string;
  description: string;
  species: string[];
  priceFrom: number;
  priceDayTicket: number | null;
  priceNightTicket: number | null;
  availability: string;
  availabilityLabel: string;
  weather: string;
  weatherIcon: string;
  latestCatch: { species: string; weight: string; date: string } | null;
  bookingEnabled: boolean;
  visibilityMode: string;
  swimCount: number;
  rulesPreview: string;
  facilities: string[];
  features: string[];
  image: string;
}

interface LakeResultCardProps {
  lake: LakeResult;
  searchLocation?: string;
}

const facilityIcons: Record<string, string> = {
  "Parking": "ri-car-line",
  "Toilets": "ri-restaurant-line",
  "Disabled access": "ri-wheelchair-line",
  "Café": "ri-cup-line",
  "Night fishing": "ri-moon-line",
  "Tackle shop nearby": "ri-shopping-bag-line",
  "Food nearby": "ri-restaurant-2-line",
  "Petrol nearby": "ri-gas-station-line",
};

const featureIcons: Record<string, string> = {
  "Weather available": "ri-sun-line",
  "Latest catch reports": "ri-camera-line",
  "Online swim map": "ri-map-line",
  "Bailiff on site": "ri-shield-user-line",
  "QR check-in": "ri-qr-code-line",
  "Gate code access": "ri-lock-line",
};

export default function LakeResultCard({ lake, searchLocation }: LakeResultCardProps) {
  const availColor =
    lake.availability === "available-today" ? "bg-accent-100 text-accent-800" :
    lake.availability === "limited" ? "bg-secondary-100 text-secondary-700" :
    lake.availability === "members-only" ? "bg-foreground-100 text-foreground-700" :
    "bg-background-200 text-foreground-600";

  const showBooking = lake.bookingEnabled;
  const showSyndicate = lake.visibilityMode === "syndicate";
  const hasNightTicket = lake.priceNightTicket !== null;

  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden hover:border-background-300/80 transition-all duration-200 group">
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-[240px] lg:w-[280px] flex-shrink-0 h-[200px] sm:h-auto overflow-hidden">
          <img
            src={lake.image}
            alt={lake.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${availColor}`}>
              {lake.availabilityLabel}
            </span>
            {showBooking && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary-100 text-primary-700">
                Online booking
              </span>
            )}
            {showSyndicate && (
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-foreground-100 text-foreground-700">
                Syndicate
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3">
            <SaveLakeButton lakeId={lake.id} lakeName={lake.name} />
          </div>
        </div>

        <div className="flex-1 p-4 md:p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <Link
                to={`/fishery/${lake.slug}/lake/${lake.lakeSlug}`}
                className="font-heading text-lg md:text-xl font-semibold text-foreground-900 hover:text-primary-600 transition-colors cursor-pointer"
              >
                {lake.name}
              </Link>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-xs text-foreground-500">
                  <i className="ri-map-pin-line text-foreground-400"></i>
                  {lake.distance} miles away · {lake.town}, {lake.county}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-foreground-500">
                  <i className="ri-user-line text-foreground-400"></i>
                  {lake.swimCount} swims
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="text-lg font-semibold text-foreground-900">
                {lake.visibilityMode === "syndicate" ? `£${lake.priceFrom}/yr` : `From £${lake.priceFrom}`}
              </div>
              <div className="text-[11px] text-foreground-500">
                {lake.priceDayTicket !== null && `Day £${lake.priceDayTicket}`}
                {lake.priceDayTicket !== null && hasNightTicket && " · "}
                {hasNightTicket && `Night £${lake.priceNightTicket}`}
              </div>
            </div>
          </div>

          <p className="text-sm text-foreground-600 leading-relaxed mt-2 line-clamp-2">{lake.description}</p>

          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            {lake.species.map((s) => (
              <span key={s} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-primary-50 text-primary-700 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-3">
            <div className="flex items-center gap-1.5 text-xs text-foreground-600">
              <i className={`${lake.weatherIcon} text-foreground-400`}></i>
              <span>{lake.weather}</span>
            </div>
            {lake.latestCatch && (
              <div className="flex items-center gap-1.5 text-xs text-foreground-600">
                <i className="ri-camera-line text-foreground-400"></i>
                <span>Latest: {lake.latestCatch.weight} {lake.latestCatch.species.toLowerCase()}</span>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3 border-t border-background-200/60">
            <p className="text-[11px] text-foreground-500 leading-relaxed">
              <span className="font-medium text-foreground-600">Rules: </span>
              {lake.rulesPreview}
            </p>
          </div>

          <div className="mt-auto pt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1 flex-wrap">
              {lake.facilities.slice(0, 4).map((f) => (
                <span key={f} className="w-6 h-6 flex items-center justify-center rounded-md bg-background-100 text-foreground-500" title={f}>
                  <i className={`${facilityIcons[f] || "ri-check-line"} text-xs`}></i>
                </span>
              ))}
              {lake.facilities.length > 4 && (
                <span className="text-[10px] text-foreground-400 ml-1">+{lake.facilities.length - 4}</span>
              )}
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <Link
                to={`/fishery/${lake.slug}/lake/${lake.lakeSlug}`}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                View Lake
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}