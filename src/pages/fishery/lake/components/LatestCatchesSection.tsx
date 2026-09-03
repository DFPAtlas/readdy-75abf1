interface CatchReport {
  id: string;
  species: string;
  weight: string;
  swim: string;
  bait: string;
  date: string;
  anglerName: string;
  anglerPrivacy: string;
  images: string[];
}

interface LatestCatchesSectionProps {
  catches: CatchReport[];
}

export default function LatestCatchesSection({ catches }: LatestCatchesSectionProps) {
  if (catches.length === 0) {
    return (
      <section id="catches" className="scroll-mt-28 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Latest Catches</h2>
          <div className="max-w-md mx-auto py-12">
            <div className="w-16 h-16 rounded-2xl bg-background-100 flex items-center justify-center mx-auto mb-4">
              <i className="ri-camera-line text-2xl text-foreground-400"></i>
            </div>
            <p className="text-sm font-medium text-foreground-700 mb-1">No catch reports yet</p>
            <p className="text-xs text-foreground-500">Catch reports will appear here once approved by the fishery.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="catches" className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Latest Catches</h2>
        <p className="text-sm text-foreground-600 max-w-2xl mb-8">Approved catch reports from this lake. Tight lines!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {catches.map((c) => (
            <div key={c.id} className="bg-background-50 rounded-xl border border-background-200/70 overflow-hidden hover:border-background-300/80 transition-all group">
              <div className="h-[200px] overflow-hidden">
                <img
                  src={c.images[0]}
                  alt={`${c.weight} ${c.species}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground-900">{c.weight} {c.species}</h3>
                  <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary-50 text-primary-600">
                    Verified
                  </span>
                </div>
                <div className="space-y-1 text-xs text-foreground-500">
                  <div className="flex items-center gap-1.5">
                    <i className="ri-map-pin-line text-foreground-400"></i>
                    {c.swim}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-drop-line text-foreground-400"></i>
                    {c.bait}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-calendar-line text-foreground-400"></i>
                    {c.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <i className="ri-user-line text-foreground-400"></i>
                    {c.anglerName}
                  </div>
                </div>
                <button className="mt-3 w-full px-3 py-2 text-[11px] font-semibold rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                  View details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}