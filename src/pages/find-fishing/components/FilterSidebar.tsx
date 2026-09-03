import { priceRanges, speciesOptions, facilityOptions, featureOptions } from "@/mocks/searchResultsData";

export interface FilterState {
  distance: string;
  priceRange: string;
  fishingType: string;
  availability: string[];
  species: string[];
  lakeType: string[];
  facilities: string[];
  features: string[];
  hideFull: boolean;
}

interface FilterSidebarProps {
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

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-5 border-b border-background-200/70 last:border-b-0 last:pb-0">
      <h4 className="text-xs font-semibold text-foreground-800 uppercase tracking-wider mb-3">{title}</h4>
      {children}
    </div>
  );
}

export default function FilterSidebar({ filters, onFilterChange, onApply, onClear }: FilterSidebarProps) {
  const update = (patch: Partial<FilterState>) => onFilterChange({ ...filters, ...patch });

  const toggleArray = (arr: string[], value: string): string[] => {
    return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
  };

  return (
    <aside className="w-full lg:w-[260px] flex-shrink-0">
      <div className="bg-background-50 border border-background-200/70 rounded-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-foreground-900">Filters</h3>
          <button
            onClick={onClear}
            className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear all
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <FilterSection title="Distance">
            <div className="flex flex-col gap-1.5">
              {distanceFilterOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-distance"
                    checked={filters.distance === opt.value}
                    onChange={() => update({ distance: opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Price">
            <div className="flex flex-col gap-1.5">
              {priceRanges.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-price"
                    checked={filters.priceRange === opt.value}
                    onChange={() => update({ priceRange: filters.priceRange === opt.value ? "" : opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Fishing type">
            <div className="flex flex-col gap-1.5">
              {fishingTypeFilterOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="radio"
                    name="filter-fishing-type"
                    checked={filters.fishingType === opt.value}
                    onChange={() => update({ fishingType: filters.fishingType === opt.value ? "" : opt.value })}
                    className="w-3.5 h-3.5 text-primary-600 cursor-pointer"
                  />
                  <span className="text-sm text-foreground-700 group-hover:text-foreground-900 transition-colors">{opt.label}</span>
                </label>
              ))}
            </div>
          </FilterSection>

          <FilterSection title="Availability">
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
          </FilterSection>

          <FilterSection title="Fish species">
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
          </FilterSection>

          <FilterSection title="Lake type">
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
          </FilterSection>

          <FilterSection title="Facilities">
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
          </FilterSection>

          <FilterSection title="Features">
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
          </FilterSection>
        </div>

        <div className="flex gap-2 mt-6 pt-4 border-t border-background-200/70">
          <button
            onClick={onClear}
            className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Clear
          </button>
          <button
            onClick={onApply}
            className="flex-1 px-3 py-2.5 text-xs font-semibold rounded-lg bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Apply filters
          </button>
        </div>
      </div>
    </aside>
  );
}