import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { fishingTypeOptions, distanceOptions } from "@/mocks/searchResultsData";
import DatePicker from "@/components/base/DatePicker";

interface FishingSearchBarProps {
  variant?: "hero" | "sticky";
}

export default function FishingSearchBar({ variant = "sticky" }: FishingSearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [date, setDate] = useState(searchParams.get("date") || "");
  const [fishingType, setFishingType] = useState(searchParams.get("type") || searchParams.get("fishing_type") || "");
  const [distance, setDistance] = useState(searchParams.get("distance") || "25");

  const handleSearch = useCallback(() => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    if (fishingType) params.set("type", fishingType);
    if (distance) params.set("distance", distance);
    setSearchParams(params, { replace: true });
  }, [location, date, fishingType, distance, setSearchParams]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const isSticky = variant === "sticky";

  return (
    <div className={`${isSticky ? "sticky top-16 md:top-18 z-30 bg-background-50/95 backdrop-blur-md border-b border-background-200/70 py-4" : "py-0"}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <i className="ri-map-pin-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-base"></i>
            <input
              type="text"
              placeholder="Location, postcode, town, or lake name"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-10 pr-4 py-3 text-sm bg-background-50 border border-background-200 rounded-xl text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              aria-label="Search location"
            />
          </div>

          <DatePicker
            value={date}
            onChange={setDate}
            placeholder="Any date"
            className="flex-shrink-0 sm:w-[170px] border border-background-200 rounded-xl hover:border-primary-400 transition-colors"
          />

          <div className="relative sm:w-[180px]">
            <i className="ri-drop-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-base pointer-events-none"></i>
            <select
              value={fishingType}
              onChange={(e) => setFishingType(e.target.value)}
              className="w-full pl-10 pr-8 py-3 text-sm bg-background-50 border border-background-200 rounded-xl text-foreground-900 appearance-none cursor-pointer focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              aria-label="Fishing type"
            >
              {fishingTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm pointer-events-none"></i>
          </div>

          <div className="relative sm:w-[150px]">
            <i className="ri-pin-distance-line absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-400 text-base pointer-events-none"></i>
            <select
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full pl-10 pr-8 py-3 text-sm bg-background-50 border border-background-200 rounded-xl text-foreground-900 appearance-none cursor-pointer focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100 transition-all"
              aria-label="Distance"
            >
              {distanceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-foreground-400 text-sm pointer-events-none"></i>
          </div>

          <button
            onClick={handleSearch}
            className="flex-shrink-0 px-6 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 justify-center"
          >
            <i className="ri-search-line"></i>
            <span>Search Lakes</span>
          </button>
        </div>
      </div>
    </div>
  );
}