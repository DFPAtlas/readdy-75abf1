interface QuickInfo {
  icon: string;
  label: string;
  value: string;
  highlight?: boolean;
}

interface LakeQuickInfoBarProps {
  priceFrom: number;
  openingTimes: string;
  lakeTypeLabel: string;
  hasNightFishing: boolean;
  nightFishingNote: string;
  swimCount: number;
  weatherCurrent: string;
  weatherCondition: string;
  facilities: { name: string; active: boolean; icon: string }[];
}

export default function LakeQuickInfoBar({
  priceFrom,
  openingTimes,
  lakeTypeLabel,
  hasNightFishing,
  nightFishingNote,
  swimCount,
  weatherCurrent,
  weatherCondition,
  facilities,
}: LakeQuickInfoBarProps) {
  const hasParking = facilities.find((f) => f.name === "Parking")?.active;
  const hasToilets = facilities.find((f) => f.name === "Toilets")?.active;

  const items: QuickInfo[] = [
    { icon: "ri-money-pound-circle-line", label: "Price from", value: `£${priceFrom}`, highlight: true },
    { icon: "ri-time-line", label: "Opening times", value: openingTimes },
    { icon: "ri-shield-line", label: "Lake type", value: lakeTypeLabel },
    { icon: "ri-moon-line", label: "Night fishing", value: hasNightFishing ? "Available" : "Not available" },
    { icon: "ri-layout-grid-line", label: "Swims", value: `${swimCount} swims` },
    { icon: "ri-car-line", label: "Parking", value: hasParking ? "On site" : "No" },
    { icon: "ri-restaurant-line", label: "Toilets", value: hasToilets ? "Available" : "No" },
    { icon: "ri-sun-line", label: "Weather today", value: `${weatherCurrent} · ${weatherCondition}` },
  ];

  return (
    <section className="bg-background-50 border-y border-background-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-1 p-2 rounded-lg"
            >
              <i className={`${item.icon} text-lg ${item.highlight ? "text-primary-600" : "text-foreground-400"}`}></i>
              <span className="text-[10px] text-foreground-500 font-medium uppercase tracking-wider">{item.label}</span>
              <span className={`text-xs font-semibold leading-tight ${item.highlight ? "text-primary-700" : "text-foreground-800"}`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}