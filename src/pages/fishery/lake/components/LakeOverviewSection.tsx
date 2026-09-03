interface LakeOverviewSectionProps {
  lakeDescription: string;
  fisheryName: string;
  fisheryAbout: string;
  bestFor: string;
  species: string[];
  lakeSize: string;
  depthRange: string;
  lakeTypeLabel: string;
  visibilityMode: string;
  accessNote: string;
}

export default function LakeOverviewSection({
  lakeDescription,
  fisheryName,
  fisheryAbout,
  bestFor,
  species,
  lakeSize,
  depthRange,
  lakeTypeLabel,
  visibilityMode,
  accessNote,
}: LakeOverviewSectionProps) {
  return (
    <section id="overview" className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-8">Overview</h2>

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground-800 mb-3">About {fisheryName}</h3>
            <p className="text-sm text-foreground-600 leading-relaxed mb-8">{fisheryAbout}</p>

            <h3 className="text-lg font-semibold text-foreground-800 mb-3">About the lake</h3>
            <p className="text-sm text-foreground-600 leading-relaxed mb-6">{lakeDescription}</p>

            <div className="bg-background-100/70 rounded-xl p-5 border border-background-200/50">
              <h4 className="text-sm font-semibold text-foreground-800 mb-3 flex items-center gap-2">
                <i className="ri-car-line text-foreground-500"></i>
                Access & parking
              </h4>
              <p className="text-xs text-foreground-600 leading-relaxed">{accessNote}</p>
            </div>
          </div>

          <div className="lg:w-[320px] flex-shrink-0">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background-100/70 rounded-xl p-4 border border-background-200/50">
                <div className="w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
                  <i className="ri-focus-3-line text-accent-600 text-sm"></i>
                </div>
                <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider mb-1">Best for</p>
                <p className="text-xs text-foreground-800 leading-relaxed">{bestFor}</p>
              </div>
              <div className="bg-background-100/70 rounded-xl p-4 border border-background-200/50">
                <div className="w-8 h-8 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                  <i className="ri-water-flash-line text-primary-600 text-sm"></i>
                </div>
                <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider mb-1">Main species</p>
                <p className="text-xs text-foreground-800 leading-relaxed">{species.join(", ")}</p>
              </div>
              <div className="bg-background-100/70 rounded-xl p-4 border border-background-200/50">
                <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center mb-3">
                  <i className="ri-ruler-line text-secondary-600 text-sm"></i>
                </div>
                <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider mb-1">Lake size</p>
                <p className="text-xs text-foreground-800 leading-relaxed">{lakeSize} · {depthRange}</p>
              </div>
              <div className="bg-background-100/70 rounded-xl p-4 border border-background-200/50">
                <div className="w-8 h-8 rounded-lg bg-secondary-100 flex items-center justify-center mb-3">
                  <i className="ri-shield-line text-secondary-600 text-sm"></i>
                </div>
                <p className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider mb-1">Access level</p>
                <p className="text-xs text-foreground-800 leading-relaxed">{lakeTypeLabel}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}