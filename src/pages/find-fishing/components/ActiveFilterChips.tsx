import type { FilterState } from "./FilterSidebar";
import { priceRanges } from "@/mocks/searchResultsData";

interface ActiveFilterChipsProps {
  location: string;
  date: string;
  fishingType: string;
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: string) => void;
  onRemoveSearch: (key: "location" | "date" | "type") => void;
}

export default function ActiveFilterChips({ location, date, fishingType, filters, onRemoveFilter, onRemoveSearch }: ActiveFilterChipsProps) {
  const chips: { label: string; onRemove: () => void; key: string }[] = [];

  if (location) {
    chips.push({ label: location, onRemove: () => onRemoveSearch("location"), key: "location" });
  }
  if (date) {
    chips.push({ label: date, onRemove: () => onRemoveSearch("date"), key: "date" });
  }
  if (fishingType) {
    chips.push({ label: fishingType.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), onRemove: () => onRemoveSearch("type"), key: "type" });
  }
  if (filters.priceRange) {
    const range = priceRanges.find((r) => r.value === filters.priceRange);
    if (range) chips.push({ label: range.label, onRemove: () => onRemoveFilter("priceRange"), key: "price" });
  }
  filters.species.forEach((s) => {
    chips.push({ label: s, onRemove: () => onRemoveFilter("species", s), key: `species-${s}` });
  });
  filters.lakeType.forEach((t) => {
    const label = t === "public" ? "Public day ticket" : t === "members" ? "Members-only" : t === "syndicate" ? "Syndicate" : "Private";
    chips.push({ label, onRemove: () => onRemoveFilter("lakeType", t), key: `lake-${t}` });
  });
  filters.facilities.forEach((f) => {
    chips.push({ label: f, onRemove: () => onRemoveFilter("facilities", f), key: `fac-${f}` });
  });
  filters.features.forEach((f) => {
    chips.push({ label: f, onRemove: () => onRemoveFilter("features", f), key: `feat-${f}` });
  });
  filters.availability.forEach((a) => {
    const label = a === "today" ? "Available today" : a === "weekend" ? "This weekend" : a === "online-booking" ? "Online booking" : "Waiting list";
    chips.push({ label, onRemove: () => onRemoveFilter("availability", a), key: `avail-${a}` });
  });

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-secondary-100 text-secondary-700"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-secondary-200 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xs"></i>
          </button>
        </span>
      ))}
    </div>
  );
}