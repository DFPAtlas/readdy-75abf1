interface Facility {
  name: string;
  active: boolean;
  icon: string;
}

interface FacilitiesGridProps {
  facilities: Facility[];
}

export default function FacilitiesGrid({ facilities }: FacilitiesGridProps) {
  return (
    <section id="facilities" className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Facilities</h2>
        <p className="text-sm text-foreground-600 max-w-2xl mb-8">What's available on site and nearby.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {facilities.map((f) => (
            <div
              key={f.name}
              className={`rounded-xl border p-4 text-center transition-all ${
                f.active
                  ? "bg-background-50 border-background-200/70 hover:border-background-300/80"
                  : "bg-background-100/50 border-background-200/40 opacity-50"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2 ${
                f.active ? "bg-primary-50" : "bg-background-200"
              }`}>
                <i className={`${f.icon} text-lg ${f.active ? "text-primary-600" : "text-foreground-400"}`}></i>
              </div>
              <span className={`text-xs font-medium ${f.active ? "text-foreground-800" : "text-foreground-500"}`}>
                {f.name}
              </span>
              {!f.active && (
                <span className="block text-[10px] text-foreground-400 mt-0.5">Not available</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}