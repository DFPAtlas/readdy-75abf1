import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoLocalServices } from "@/mocks/demoData";

function DemoLocalServicesContent() {
  const { weather, services } = demoLocalServices;

  return (
    <DemoPageWrapper title="Demo Local Services &amp; Weather">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weather card */}
        <div className="lg:col-span-1">
          <div className="bg-foreground-900 rounded-2xl p-6 sticky top-24">
            <h3 className="text-sm font-semibold text-background-50 mb-1">Weather</h3>
            <p className="text-xs text-background-50/50 mb-5">Willow Mere Fishery area</p>

            <div className="flex items-center gap-4 mb-6">
              <i className="ri-sun-line text-4xl text-accent-400"></i>
              <div>
                <p className="text-4xl font-bold text-background-50">{weather.current}</p>
                <p className="text-sm text-background-50/70">{weather.condition}</p>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex items-center justify-between text-xs text-background-50/60">
                <span><i className="ri-windy-line mr-1"></i> Wind</span>
                <span>{weather.wind}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-background-50/60">
                <span><i className="ri-drizzle-line mr-1"></i> Rain</span>
                <span>{weather.rainChance}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-background-50/60">
                <span><i className="ri-sun-line mr-1"></i> Sunrise</span>
                <span>{weather.sunrise}</span>
              </div>
              <div className="flex items-center justify-between text-xs text-background-50/60">
                <span><i className="ri-moon-line mr-1"></i> Sunset</span>
                <span>{weather.sunset}</span>
              </div>
            </div>

            <div className="border-t border-background-50/10 pt-4">
              <p className="text-[10px] text-background-50/40 mb-3 uppercase tracking-wider">5-Day Forecast</p>
              <div className="flex justify-between">
                {weather.forecast.map((f, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-background-50/50">{f.day}</p>
                    <i className={`${f.icon} text-sm text-background-50/60 block my-1.5`}></i>
                    <p className="text-[10px] font-semibold text-background-50">{f.temp}</p>
                    <p className="text-[9px] text-background-50/40">{f.rain}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="lg:col-span-2">
          <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-5">Nearby Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((service) => (
              <div key={service.id} className="bg-background-50 border border-background-200 rounded-xl p-5 hover:border-background-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <i className={`${service.icon} text-lg text-primary-600`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-foreground-900 truncate">{service.name}</h4>
                      <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-primary-100 text-primary-700 flex-shrink-0">{service.category}</span>
                    </div>
                    <p className="text-xs text-foreground-600 mb-2">{service.description}</p>
                    <div className="flex items-center gap-3 text-xs text-foreground-500">
                      <span className="flex items-center gap-1"><i className="ri-map-pin-line text-[10px]"></i> {service.distance}</span>
                      <span className="flex items-center gap-1"><i className="ri-phone-line text-[10px]"></i> {service.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${service.status.includes("Open") ? "bg-primary-500" : "bg-foreground-300"}`}></span>
                      <span className="text-[10px] text-foreground-500">{service.status}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button disabled className="flex-1 py-1.5 text-[10px] font-semibold rounded-lg bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                        <i className="ri-phone-line mr-1"></i> Call
                      </button>
                      <button disabled className="flex-1 py-1.5 text-[10px] font-semibold rounded-lg bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                        <i className="ri-map-pin-line mr-1"></i> Directions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoLocalServicesPage() {
  return (
    <DemoAccessGuard>
      <DemoLocalServicesContent />
    </DemoAccessGuard>
  );
}