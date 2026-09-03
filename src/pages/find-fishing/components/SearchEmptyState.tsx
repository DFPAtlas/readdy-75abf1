interface SearchEmptyStateProps {
  onClearFilters: () => void;
}

export default function SearchEmptyState({ onClearFilters }: SearchEmptyStateProps) {
  return (
    <div className="text-center py-16 md:py-20">
      <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mx-auto mb-5">
        <i className="ri-search-line text-2xl text-secondary-500"></i>
      </div>
      <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">
        No fisheries found for this search
      </h3>
      <p className="text-sm text-foreground-500 max-w-sm mx-auto mb-6 leading-relaxed">
        Try adjusting your filters or searching a different location. More fisheries join FisheryHub every week.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onClearFilters}
          className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Clear all filters
        </button>
        <a
          href="/find-fishing"
          className="px-5 py-2.5 text-sm font-semibold rounded-xl border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          Try another location
        </a>
      </div>
      <div className="mt-5 text-xs text-foreground-400 space-y-1">
        <p>Try increasing your distance range</p>
        <p>View <a href="/find-fishing" className="text-primary-600 hover:underline cursor-pointer">popular fisheries</a> instead</p>
      </div>
    </div>
  );
}