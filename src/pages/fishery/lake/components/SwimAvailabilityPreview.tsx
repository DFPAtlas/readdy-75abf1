import { useState } from "react";

interface Swim {
  id: string;
  name: string;
  capacity: number;
  status: string;
  statusLabel: string;
  nextAvailable: string;
  priceFrom: number;
  description: string;
}

interface SwimAvailabilityPreviewProps {
  swims: Swim[];
  availableSwims: number;
  bookedSwims: number;
  maintenanceSwims: number;
  availabilityNote: string;
}

const statusColors: Record<string, string> = {
  free: "bg-accent-100 border-accent-300 text-accent-700",
  booked: "bg-foreground-100 border-foreground-300 text-foreground-600",
  maintenance: "bg-foreground-100 border-foreground-300 text-foreground-500",
  limited: "bg-secondary-100 border-secondary-300 text-secondary-700",
};

const dotColors: Record<string, string> = {
  free: "bg-accent-500",
  booked: "bg-foreground-400",
  maintenance: "bg-foreground-300",
  limited: "bg-secondary-500",
};

export default function SwimAvailabilityPreview({
  swims,
  availableSwims,
  bookedSwims,
  maintenanceSwims,
  availabilityNote,
}: SwimAvailabilityPreviewProps) {
  const [selectedSwim, setSelectedSwim] = useState<Swim | null>(null);

  return (
    <section id="availability" className="scroll-mt-28 py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Swims &amp; Availability</h2>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-1.5 text-xs text-foreground-600">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
            Available today: {availableSwims}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground-600">
            <span className="w-2.5 h-2.5 rounded-full bg-foreground-400"></span>
            Booked today: {bookedSwims}
          </div>
          {maintenanceSwims > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-foreground-600">
              <span className="w-2.5 h-2.5 rounded-full bg-foreground-300"></span>
              Maintenance: {maintenanceSwims}
            </div>
          )}
        </div>

        <p className="text-sm text-foreground-600 mb-8">{availabilityNote}</p>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-[65%]">
            <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 md:p-6">
              <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-6 bg-background-100">
                <img
                  src="https://readdy.ai/api/search-image?query=Top-down%20aerial%20map%20view%20of%20a%20mature%20UK%20fishing%20lake%20with%20numbered%20swim%20markers%20positioned%20around%20the%20perimeter%2C%20green%20tree%20canopy%20surrounding%20the%20water%2C%20visible%20gravel%20paths%20between%20swims%2C%20clean%20minimalist%20lake%20map%20style%20with%20natural%20earth%20tones%2C%20overhead%20satellite%20photography%20aesthetic&width=1200&height=750&seq=willow-mere-swim-map&orientation=landscape"
                  alt="Lake swim map"
                  className="w-full h-full object-cover object-top opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-background-50/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                      <i className="ri-map-line text-2xl text-foreground-500"></i>
                    </div>
                    <p className="text-sm font-medium text-foreground-700">Interactive swim map</p>
                    <p className="text-xs text-foreground-500 mt-1">Full map with live availability coming soon</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                {swims.map((swim) => (
                  <button
                    key={swim.id}
                    onClick={() => setSelectedSwim(selectedSwim?.id === swim.id ? null : swim)}
                    className={`text-left p-3 rounded-lg border transition-all cursor-pointer ${
                      statusColors[swim.status] || "bg-background-50 border-background-200"
                    } ${selectedSwim?.id === swim.id ? "ring-2 ring-primary-300 border-primary-300" : ""}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dotColors[swim.status] || "bg-foreground-400"}`}></span>
                      <span className="text-xs font-semibold text-foreground-800 truncate">{swim.name}</span>
                    </div>
                    <p className="text-[10px] text-foreground-500 pl-4">{swim.statusLabel}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-[35%]">
            {selectedSwim ? (
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 sticky top-28">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-foreground-900">{selectedSwim.name}</h3>
                  <button
                    onClick={() => setSelectedSwim(null)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-background-100 transition-colors cursor-pointer"
                  >
                    <i className="ri-close-line text-foreground-500"></i>
                  </button>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-500">Capacity</span>
                    <span className="font-medium text-foreground-800">{selectedSwim.capacity} anglers</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-500">Status</span>
                    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${selectedSwim.status === "free" ? "bg-accent-100 text-accent-700" : selectedSwim.status === "booked" ? "bg-foreground-100 text-foreground-600" : "bg-foreground-100 text-foreground-500"}`}>
                      {selectedSwim.statusLabel}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-500">Next available</span>
                    <span className="font-medium text-foreground-800">{selectedSwim.nextAvailable}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground-500">Price from</span>
                    <span className="font-semibold text-primary-700">£{selectedSwim.priceFrom}</span>
                  </div>
                </div>
                <p className="text-xs text-foreground-600 leading-relaxed mb-4">{selectedSwim.description}</p>
                <button className="w-full px-5 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-calendar-check-line mr-2"></i>
                  Book This Swim
                </button>
                <p className="text-[10px] text-foreground-500 text-center mt-2">Booking flow coming next</p>
              </div>
            ) : (
              <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 text-center">
                <div className="w-12 h-12 rounded-xl bg-background-100 flex items-center justify-center mx-auto mb-3">
                  <i className="ri-cursor-line text-xl text-foreground-400"></i>
                </div>
                <p className="text-sm font-medium text-foreground-700 mb-1">Select a swim</p>
                <p className="text-xs text-foreground-500">Click any swim marker to see details and book</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}