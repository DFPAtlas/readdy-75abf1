import { useEffect } from "react";
import { priceRanges, speciesOptions, facilityOptions, featureOptions } from "@/mocks/searchResultsData";
import type { FilterState } from "./FilterSidebar";

interface MobileFilterDrawerProps {
  open: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApply: () => void;
  onClear: () => void;
}

const fishingTypeFilterOptions = [
  { value: "carp", label: "Carp" },
  { value: "coarse", label: "Coarse" },
  { value: "match", label: "Match" },
  { value: "predator", label: "Predator" },
  { value: "fly", label: "Fly" },
  { value: "night", label: "Night fishing" },
  { value: "day-ticket", label: "Day ticket" },
  { value: "syndicate", label: "Syndicate" },
];

const availabilityOptions = [
  { value: "today", label: "Available today" },
  { value: "weekend", label: "Available this weekend" },
  { value: "online-booking", label: "Online booking available" },
  { value: "waiting-list", label: "Waiting list available" },
];

const lakeTypeOptions = [
  { value: "public", label: "Public day ticket" },
  { value: "members", label: "Members-only" },
  { value: "syndicate", label: "Syndicate" },
  { value: "private", label: "Private link only" },
];

const distanceFilterOptions = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "25", label: "25 miles" },
  { value: "50", label: "50 miles" },
  { value: "100", label: "100 miles" },
];

export default function MobileFilterDrawer({ open, onClose, filters, onFilterChange, onApply, onClear }: MobileFilterDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const update = (patch: Partial<FilterState>) => onFilterChange({ ...filters, ...patch });

  const toggleArray = (arr: string[], value: string): string[] => {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-foreground-900/40" onClick={onClose}></div>
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-[360px] bg-background-50 shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-background-50 border-b border-background-200/70 px-5 py-4 flex items-center justify-between z-10">
          <h3 className="text-sm font-semibold text-foreground-900">Filters</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-100 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-lg text-foreground-700"></i>
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">
          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Distance</h4>
            <div className="flex flex-col gap-1.5">
              {distanceFilterOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="mobile-filter-distance"
                    checked={filters.distance === opt.value}
                    onChange={() => update({ distance: opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Price</h4>
            <div className="flex flex-col gap-1.5">
              {priceRanges.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="mobile-filter-price"
                    checked={filters.priceRange === opt.value}
                    onChange={() => update({ priceRange: filters.priceRange === opt.value ? "" : opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Fishing type</h4>
            <div className="flex flex-col gap-1.5">
              {fishingTypeFilterOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="mobile-filter-fishing-type"
                    checked={filters.fishingType === opt.value}
                    onChange={() => update({ fishingType: filters.fishingType === opt.value ? "" : opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Availability</h4>
            <div className="flex flex-col gap-1.5">
              {availabilityOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.availability.includes(opt.value)}
                    onChange={() => update({ availability: toggleArray(filters.availability, opt.value) })}
                    className="w-3.5 h-3.5 text-primary-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
              <label className="flex items-center gap-2.5 cursor-pointer group mt-1">
                <input
                  type="checkbox"
                  checked={filters.hideFull}
                  onChange={() => update({ hideFull: !filters.hideFull })}
                  className="w-3.5 h-3.5 text-primary-600 rounded cursor-pointer"
                />
                <span className="text-sm text-foreground-500 group-hover:text-foreground-700 transition-colors">Hide fully booked</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Fish species</h4>
            <div className="flex flex-wrap gap-1.5">
              {speciesOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => update({ species: toggleArray(filters.species, s) })}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                    filters.species.includes(s)
                      ? "bg-primary-100 border-primary-300 text-primary-700"
                      : "bg-background-50 border-background-200 text-foreground-600 hover:border-foreground-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Lake type</h4>
            <div className="flex flex-col gap-1.5">
              {lakeTypeOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.lakeType.includes(opt.value)}
                    onChange={() => update({ lakeType: toggleArray(filters.lakeType, opt.value) })}
                    className="w-3.5 h-3.5 text-primary-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Facilities</h4>
            <div className="flex flex-col gap-1.5">
              {facilityOptions.map((f) => (
                <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.facilities.includes(f)}
                    onChange={() => update({ facilities: toggleArray(filters.facilities, f) })}
                    className="w-3.5 h-3.5 text-primary-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{f}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pb-2">
            <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">Features</h4>
            <div className="flex flex-col gap-1.5">
              {featureOptions.map((f) => (
                <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.features.includes(f)}
                    onChange={() => update({ features: toggleArray(filters.features, f) })}
                    className="w-3.5 h-3.5 text-primary-600 rounded cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{f}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-background-50 border-t border-background-200/70 px-5 py-4 flex gap-2">
          <button
            onClick={onClear}
            className="flex-1 px-3 py-3 text-sm font-semibold rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear
          </button>
          <button
            onClick={() => { onApply(); onClose(); }}
            className="flex-1 px-3 py-3 text-sm font-semibold rounded-lg bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}