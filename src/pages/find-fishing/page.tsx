import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import FishingSearchBar from "./components/FishingSearchBar";
import FilterSidebar from "./components/FilterSidebar";
import type { FilterState } from "./components/FilterSidebar";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import ActiveFilterChips from "./components/ActiveFilterChips";
import SortDropdown from "./components/SortDropdown";
import LakeResultList from "./components/LakeResultList";
import MapViewPlaceholder from "./components/MapViewPlaceholder";
import SearchEmptyState from "./components/SearchEmptyState";
import SearchLoadingSkeleton from "./components/SearchLoadingSkeleton";
import { lakeResults, sortOptions } from "@/mocks/searchResultsData";

const defaultFilters: FilterState = {
  distance: "25",
  priceRange: "",
  fishingType: "",
  availability: [],
  species: [],
  lakeType: [],
  facilities: [],
  features: [],
  hideFull: false,
};

export default function FindFishing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState("recommended");

  const location = searchParams.get("location") || "";
  const date = searchParams.get("date") || "";
  const fishingType = searchParams.get("type") || searchParams.get("fishing_type") || "";

  const [filters, setFilters] = useState<FilterState>(() => {
    const initial: FilterState = { ...defaultFilters };
    const dist = searchParams.get("distance");
    if (dist) initial.distance = dist;
    return initial;
  });

  const results = useMemo(() => {
    let filtered = [...lakeResults];

    if (filters.distance !== "25" && filters.distance !== "nationwide") {
      const maxDist = parseInt(filters.distance);
      if (!isNaN(maxDist)) {
        filtered = filtered.filter((l) => l.distance <= maxDist);
      }
    }

    if (filters.priceRange) {
      const range = filters.priceRange;
      if (range === "under-10") {
        filtered = filtered.filter((l) => l.priceFrom <= 9);
      } else if (range === "10-20") {
        filtered = filtered.filter((l) => l.priceFrom >= 10 && l.priceFrom <= 20);
      } else if (range === "20-40") {
        filtered = filtered.filter((l) => l.priceFrom >= 20 && l.priceFrom <= 40);
      } else if (range === "40-plus") {
        filtered = filtered.filter((l) => l.priceFrom >= 40);
      }
    }

    if (filters.fishingType) {
      const type = filters.fishingType;
      filtered = filtered.filter((l) => {
        if (type === "carp") return l.species.includes("Carp");
        if (type === "night") return l.priceNightTicket !== null;
        if (type === "day-ticket") return l.priceDayTicket !== null;
        if (type === "syndicate") return l.visibilityMode === "syndicate";
        if (type === "match" || type === "coarse") return l.species.some((s) => ["Roach", "Perch", "Bream", "Tench", "Rudd", "Chub", "Barbel"].includes(s));
        if (type === "predator") return l.species.some((s) => ["Pike", "Perch", "Zander"].includes(s));
        if (type === "fly") return l.species.includes("Trout");
        return true;
      });
    }

    if (filters.species.length > 0) {
      filtered = filtered.filter((l) =>
        filters.species.some((s) => l.species.includes(s))
      );
    }

    if (filters.availability.length > 0) {
      filtered = filtered.filter((l) => {
        return filters.availability.some((a) => {
          if (a === "today") return l.availability === "available-today";
          if (a === "online-booking") return l.bookingEnabled;
          return true;
        });
      });
    }

    if (filters.lakeType.length > 0) {
      filtered = filtered.filter((l) => {
        if (filters.lakeType.includes("public")) return l.visibilityMode === "public";
        if (filters.lakeType.includes("syndicate")) return l.visibilityMode === "syndicate";
        if (filters.lakeType.includes("members")) return l.visibilityMode === "syndicate";
        return true;
      });
    }

    if (filters.facilities.length > 0) {
      filtered = filtered.filter((l) =>
        filters.facilities.every((f) => l.facilities.includes(f))
      );
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter((l) =>
        filters.features.every((f) => l.features.includes(f))
      );
    }

    if (sortBy === "nearest") {
      filtered.sort((a, b) => a.distance - b.distance);
    } else if (sortBy === "price_low") {
      filtered.sort((a, b) => a.priceFrom - b.priceFrom);
    } else if (sortBy === "price_high") {
      filtered.sort((a, b) => b.priceFrom - a.priceFrom);
    }

    return filtered;
  }, [filters, sortBy]);

  const handleApplyFilters = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (filters.distance && filters.distance !== "25") params.set("distance", filters.distance);
    else params.delete("distance");
    if (filters.priceRange) params.set("price_min", filters.priceRange);
    else params.delete("price_min");
    setSearchParams(params, { replace: true });
  }, [filters, searchParams, setSearchParams]);

  const handleClearFilters = useCallback(() => {
    setFilters({ ...defaultFilters });
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (date) params.set("date", date);
    if (fishingType) params.set("type", fishingType);
    setSearchParams(params, { replace: true });
  }, [location, date, fishingType, setSearchParams]);

  const handleRemoveFilter = useCallback((key: keyof FilterState, value?: string) => {
    if (value && Array.isArray(filters[key])) {
      setFilters({
        ...filters,
        [key]: (filters[key] as string[]).filter((v: string) => v !== value),
      });
    } else {
      setFilters({ ...filters, [key]: key === "hideFull" ? false : "" });
    }
  }, [filters]);

  const handleRemoveSearch = useCallback((key: "location" | "date" | "type") => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    setSearchParams(params, { replace: true });
  }, [searchParams, setSearchParams]);

  const headingText = location
    ? `Fishing lakes near ${location}`
    : "Fishing Lakes Near You";

  const activeFilterCount = [
    filters.priceRange ? 1 : 0,
    filters.fishingType ? 1 : 0,
    filters.species.length,
    filters.availability.length,
    filters.lakeType.length,
    filters.facilities.length,
    filters.features.length,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16 md:pt-18">
        <FishingSearchBar variant="sticky" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="mb-6">
            <span className="text-[11px] font-medium text-foreground-400 tracking-widest uppercase">
              / Search results
            </span>
            <h1 className="mt-1.5 font-heading text-2xl md:text-3xl font-semibold text-foreground-900 leading-tight">
              {headingText}
            </h1>
            <p className="mt-1 text-sm text-foreground-500">
              Compare fisheries, prices, rules, catches, weather, and availability.
            </p>
          </div>

          <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              {!loading && !error && (
                <p className="text-sm text-foreground-600">
                  <strong className="text-foreground-900">{results.length}</strong> fisheries found
                  {location && <> within {filters.distance} miles of <strong className="text-foreground-900">{location}</strong></>}
                </p>
              )}
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-equalizer-line"></i>
                Filters
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-primary-600 text-[10px] font-semibold text-background-50">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <div className="hidden lg:flex flex-wrap items-center gap-3">
                <ActiveFilterChips
                  location={location}
                  date={date}
                  fishingType={fishingType}
                  filters={filters}
                  onRemoveFilter={handleRemoveFilter}
                  onRemoveSearch={handleRemoveSearch}
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center bg-background-100 rounded-lg p-0.5">
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === "list" ? "bg-background-50 text-foreground-900" : "text-foreground-500 hover:text-foreground-700"
                  }`}
                >
                  <i className="ri-list-check mr-1"></i>
                  List
                </button>
                <button
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    viewMode === "map" ? "bg-background-50 text-foreground-900" : "text-foreground-500 hover:text-foreground-700"
                  }`}
                >
                  <i className="ri-map-pin-line mr-1"></i>
                  Map
                </button>
              </div>
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="lg:hidden mb-4">
            <ActiveFilterChips
              location={location}
              date={date}
              fishingType={fishingType}
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onRemoveSearch={handleRemoveSearch}
            />
          </div>

          <div className="flex gap-6">
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
              />
            </div>

            <div className="flex-1 min-w-0">
              {loading ? (
                <SearchLoadingSkeleton />
              ) : error ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mx-auto mb-5">
                    <i className="ri-error-warning-line text-2xl text-secondary-500"></i>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">
                    We couldn't load fisheries right now
                  </h3>
                  <p className="text-sm text-foreground-500 max-w-sm mx-auto mb-5">{error}</p>
                  <button
                    onClick={() => { setError(null); setLoading(true); setTimeout(() => setLoading(false), 500); }}
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Try again
                  </button>
                </div>
              ) : results.length === 0 ? (
                <SearchEmptyState onClearFilters={handleClearFilters} />
              ) : viewMode === "map" ? (
                <MapViewPlaceholder lakes={results} />
              ) : (
                <LakeResultList lakes={results} searchLocation={location} viewMode={viewMode} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <MobileFilterDrawer
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
}