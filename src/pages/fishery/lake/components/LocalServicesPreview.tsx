import { useState } from "react";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  distance: string;
  status: string;
  statusOpen: boolean;
  phone: string;
  website: string;
  directionsUrl: string;
  preferred: boolean;
  description: string;
}

interface LocalServicesData {
  tackle: ServiceItem[];
  food: ServiceItem[];
  fuel: ServiceItem[];
}

interface LocalServicesPreviewProps {
  services: LocalServicesData;
}

const tabs = [
  { key: "all", label: "All" },
  { key: "tackle", label: "Tackle & Bait" },
  { key: "food", label: "Food Nearby" },
  { key: "fuel", label: "Fuel & Shops" },
];

export default function LocalServicesPreview({ services }: LocalServicesPreviewProps) {
  const [activeTab, setActiveTab] = useState("all");

  const allServices: ServiceItem[] = [...services.tackle, ...services.food, ...services.fuel];

  const filtered = activeTab === "all"
    ? allServices
    : activeTab === "tackle"
      ? services.tackle
      : activeTab === "food"
        ? services.food
        : services.fuel;

  if (allServices.length === 0) {
    return (
      <section id="local-services" className="scroll-mt-28 py-14 md:py-20 bg-background-100/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Local Resupply &amp; Services</h2>
          <p className="text-sm text-foreground-500 max-w-md mx-auto">Local services will appear here soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="local-services" className="scroll-mt-28 py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Local Resupply &amp; Services</h2>
        <p className="text-sm text-foreground-600 max-w-2xl mb-6">Tackle shops, food, fuel, and supplies near the lake.</p>

        <div className="flex items-center gap-1 mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex-shrink-0 ${
                activeTab === tab.key
                  ? "bg-primary-100 text-primary-700"
                  : "text-foreground-600 hover:text-foreground-900 hover:bg-background-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((svc) => (
            <div key={svc.id} className="bg-background-50 rounded-xl border border-background-200/70 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-foreground-900">{svc.name}</h4>
                    {svc.preferred && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-full bg-accent-100 text-accent-700">
                        Preferred
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-foreground-500 mt-0.5">{svc.category} · {svc.distance}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full ${
                  svc.statusOpen ? "bg-accent-100 text-accent-700" : "bg-foreground-100 text-foreground-600"
                }`}>
                  {svc.status}
                </span>
              </div>

              <p className="text-xs text-foreground-600 leading-relaxed mb-3">{svc.description}</p>

              <div className="flex items-center gap-2">
                {svc.phone && (
                  <a
                    href={`tel:${svc.phone}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-phone-line text-xs"></i>
                    Call
                  </a>
                )}
                <a
                  href={svc.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-road-map-line text-xs"></i>
                  Directions
                </a>
                {svc.website && (
                  <a
                    href={svc.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium rounded-lg border border-background-200 text-foreground-600 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-global-line text-xs"></i>
                    Website
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}