import { useState } from "react";
import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoSwimMap } from "@/mocks/demoData";

function DemoSwimMapContent() {
  const [selectedSwim, setSelectedSwim] = useState<string | null>(null);
  const { lakeName, swims } = demoSwimMap;
  const activeSwim = swims.find((s) => s.id === selectedSwim);

  return (
    <DemoPageWrapper title="Demo Swim Map Builder">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map area */}
        <div className="lg:col-span-2 bg-background-50 border border-background-200 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-background-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground-900">{lakeName} — Swim Map</h3>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-[10px] font-medium rounded-full bg-background-100 text-foreground-600">
                {swims.length} swims
              </span>
            </div>
          </div>
          <div className="relative h-[480px] bg-background-50">
            {/* Lake outline */}
            <div className="absolute inset-4 rounded-[40%] border-2 border-background-300 bg-background-100/50"></div>

            {/* Swim markers */}
            {swims.map((swim) => (
              <button
                key={swim.id}
                onClick={() => setSelectedSwim(swim.id)}
                className={`absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] font-bold transition-all cursor-pointer ${
                  selectedSwim === swim.id
                    ? "bg-primary-600 text-background-50 ring-4 ring-primary-200 z-10 scale-110"
                    : swim.status === "free"
                      ? "bg-primary-100 text-primary-700 hover:bg-primary-200 border border-primary-300"
                      : "bg-accent-100 text-accent-700 border border-accent-300"
                }`}
                style={{ left: `${swim.x}%`, top: `${swim.y}%` }}
                title={swim.name}
              >
                {swim.name.charAt(0)}
              </button>
            ))}

            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-heading text-foreground-300 italic">Main Lake</span>
            </div>
          </div>
          <div className="p-3 border-t border-background-200 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-primary-100 border border-primary-300"></span>
              <span className="text-foreground-500">Free</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-accent-100 border border-accent-300"></span>
              <span className="text-foreground-500">Booked</span>
            </div>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground-900 mb-4">Swim Details</h4>
            {activeSwim ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-foreground-500">Name</p>
                  <p className="text-sm font-semibold text-foreground-900">{activeSwim.name}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Capacity</p>
                  <p className="text-sm font-semibold text-foreground-900">{activeSwim.capacity} anglers</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Status</p>
                  <span className={`inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full mt-0.5 ${
                    activeSwim.status === "free" ? "bg-primary-100 text-primary-700" : "bg-accent-100 text-accent-800"
                  }`}>
                    {activeSwim.status === "free" ? "Available" : "Booked"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Description</p>
                  <p className="text-xs text-foreground-600 leading-relaxed">{activeSwim.description}</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <button disabled className="flex-1 py-2 text-xs font-semibold rounded-lg bg-primary-100 text-primary-400 cursor-not-allowed whitespace-nowrap">
                    Edit Swim
                  </button>
                  <button disabled className="flex-1 py-2 text-xs font-semibold rounded-lg bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="ri-map-pin-line text-3xl text-foreground-300 block mb-2"></i>
                <p className="text-xs text-foreground-500">Click a swim marker to view details</p>
              </div>
            )}
          </div>

          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground-900 mb-3">Swim List</h4>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {swims.map((swim) => (
                <button
                  key={swim.id}
                  onClick={() => setSelectedSwim(swim.id)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedSwim === swim.id ? "bg-primary-50 text-primary-700" : "text-foreground-600 hover:bg-background-100"
                  }`}
                >
                  <span className="font-medium">{swim.name}</span>
                  <span className={`${swim.status === "free" ? "text-primary-600" : "text-accent-600"}`}>
                    {swim.status === "free" ? "Free" : "Booked"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button disabled className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
              Add Swim
            </button>
            <button disabled className="flex-1 py-2.5 text-xs font-semibold rounded-lg bg-primary-100 text-primary-400 cursor-not-allowed whitespace-nowrap">
              Save Map
            </button>
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoSwimMapPage() {
  return (
    <DemoAccessGuard>
      <DemoSwimMapContent />
    </DemoAccessGuard>
  );
}