import { sortOptions } from "@/mocks/searchResultsData";

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const currentLabel = sortOptions.find((o) => o.value === value)?.label || "Recommended";

  return (
    <div className="relative inline-flex items-center gap-2">
      <span className="text-xs text-foreground-500 whitespace-nowrap">Sort by:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent text-xs font-medium text-foreground-800 pr-5 py-1 cursor-pointer focus:outline-none border-b border-transparent hover:border-foreground-300 transition-colors"
        aria-label="Sort results"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <i className="ri-arrow-down-s-line absolute right-0 top-1/2 -translate-y-1/2 text-foreground-400 text-xs pointer-events-none"></i>
    </div>
  );
}