interface VisibilityRestrictedPreviewProps {
  fisheryName: string;
  lakeName: string;
  lakeDescription: string;
  town: string;
  county: string;
  species: string[];
  visibilityMode: string;
  heroImage: string;
  membershipNote?: string;
}

export default function VisibilityRestrictedPreview({
  fisheryName,
  lakeName,
  lakeDescription,
  town,
  county,
  species,
  visibilityMode,
  heroImage,
  membershipNote,
}: VisibilityRestrictedPreviewProps) {
  const label = visibilityMode === "syndicate" ? "Syndicate only" : "Members only";

  return (
    <>
      <section className="relative bg-background-900">
        <div className="relative h-[300px] md:h-[400px] overflow-hidden">
          <img
            src={heroImage}
            alt={`${lakeName} at ${fisheryName}`}
            className="w-full h-full object-cover object-top opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-lg">
              <div className="w-16 h-16 rounded-2xl bg-foreground-100/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4">
                <i className="ri-lock-line text-2xl text-background-50"></i>
              </div>
              <p className="text-xs font-medium text-background-50/60 uppercase tracking-widest mb-2">{label}</p>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-background-50 mb-2">{lakeName}</h1>
              <p className="text-sm text-background-50/70">{fisheryName} · {town}, {county}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 -mt-16 relative z-10 pb-10">
        <div className="bg-background-50 rounded-2xl p-6 md:p-10 shadow-sm border border-background-200/60 text-center max-w-2xl mx-auto">
          <p className="text-sm text-foreground-600 leading-relaxed mb-6">{lakeDescription}</p>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
            {species.map((s) => (
              <span key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-50 text-primary-700 whitespace-nowrap">
                {s}
              </span>
            ))}
          </div>

          {membershipNote && (
            <div className="bg-accent-50/50 rounded-xl border border-accent-200/50 p-4 mb-6 max-w-md mx-auto">
              <p className="text-xs text-accent-800 leading-relaxed">{membershipNote}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button className="px-6 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap">
              <i className="ri-user-star-line mr-2"></i>
              Request Access
            </button>
            <button className="px-6 py-3 text-sm font-semibold rounded-xl border border-foreground-200 text-foreground-700 hover:bg-foreground-50 transition-colors cursor-pointer whitespace-nowrap">
              Login to View
            </button>
          </div>
        </div>
      </div>
    </>
  );
}