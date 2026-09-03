const stats = [
  {
    icon: "ri-user-search-line",
    title: "Anglers searching",
    description: "Demand insights will appear here as anglers search and fisheries join.",
  },
  {
    icon: "ri-eye-line",
    title: "Lake views",
    description: "Demand insights will appear here as anglers search and fisheries join.",
  },
  {
    icon: "ri-calendar-check-line",
    title: "Booking interest",
    description: "Demand insights will appear here as anglers search and fisheries join.",
  },
  {
    icon: "ri-camera-line",
    title: "Catch reports",
    description: "Demand insights will appear here as anglers search and fisheries join.",
  },
  {
    icon: "ri-building-line",
    title: "Fisheries listed",
    description: "Demand insights will appear here as anglers search and fisheries join.",
  },
];

export default function PlatformStatsSection() {
  return (
    <section className="py-16 md:py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-foreground-400 tracking-widest uppercase">
            Platform activity
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl font-semibold text-foreground-900 leading-tight">
            Anglers are searching.
            <br />
            Fisheries are growing.
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-background-50 rounded-2xl p-5 md:p-6 border border-background-200/70 flex flex-col items-center text-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-secondary-100 flex items-center justify-center">
                <i className={`${stat.icon} text-lg text-secondary-600`}></i>
              </div>
              <h4 className="text-sm font-semibold text-foreground-900">{stat.title}</h4>
              <p className="text-xs text-foreground-400 leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}