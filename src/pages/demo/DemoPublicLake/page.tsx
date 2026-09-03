import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoPublicLake } from "@/mocks/demoData";

function DemoPublicLakeContent() {
  const { lake } = demoPublicLake;

  return (
    <DemoPageWrapper title="Demo Public Lake Page">
      <div className="space-y-8">
        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
          <img
            src="https://readdy.ai/api/search-image?query=Beautiful%20UK%20fishing%20lake%20surrounded%20by%20willow%20trees%20on%20a%20misty%20morning%2C%20calm%20green%20water%20with%20soft%20reflections%2C%20wooden%20fishing%20platform%20in%20foreground%2C%20peaceful%20English%20countryside%20scene%20with%20warm%20natural%20light%2C%20atmospheric%20landscape%20photography&width=1400&height=700&seq=demo-public-lake-hero&orientation=landscape"
            alt={`${lake.name}`}
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Lake Info */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary-100 text-primary-700">Available today</span>
                <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-accent-100 text-accent-800">Online booking</span>
                <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-background-100 text-foreground-600">Public day ticket</span>
                {lake.nightFishing && (
                  <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-background-100 text-foreground-600">Night fishing</span>
                )}
              </div>
              <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-1">{lake.name}</h2>
              <div className="flex items-center gap-3 text-sm text-foreground-600 mb-4">
                <span className="inline-flex items-center gap-1"><i className="ri-map-pin-line text-foreground-400"></i>{lake.location.town}, {lake.location.county}</span>
                <span>{lake.location.postcode}</span>
              </div>
              <p className="text-sm text-foreground-600 leading-relaxed">{lake.description}</p>

              <div className="flex flex-wrap gap-1.5 mt-4">
                {lake.species.map((s) => (
                  <span key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-50 text-primary-700">{s}</span>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-background-200">
                <div><p className="text-xs text-foreground-400">Size</p><p className="text-sm font-semibold text-foreground-900">{lake.lakeSize}</p></div>
                <div><p className="text-xs text-foreground-400">Depth</p><p className="text-sm font-semibold text-foreground-900">{lake.depthRange}</p></div>
                <div><p className="text-xs text-foreground-400">Swims</p><p className="text-sm font-semibold text-foreground-900">{lake.swimCount}</p></div>
                <div><p className="text-xs text-foreground-400">Hours</p><p className="text-sm font-semibold text-foreground-900">{lake.openingTimes}</p></div>
              </div>
            </div>

            {/* Prices */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-4">Prices &amp; Passes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lake.pricePlans.map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-3 rounded-lg border border-background-200 bg-background-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground-900">{plan.name}</span>
                        {plan.badge && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-primary-100 text-primary-700">{plan.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-foreground-500">{plan.duration}</p>
                    </div>
                    <span className="text-lg font-bold text-foreground-900">&pound;{plan.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-4">Lake Rules</h3>
              <div className="space-y-2">
                {lake.rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <i className="ri-check-line text-sm text-primary-600 mt-0.5 flex-shrink-0"></i>
                    <span className="text-sm text-foreground-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Latest Catches */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-4">Latest Catches</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lake.latestCatches.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-background-200">
                    <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                      <i className="ri-drop-line text-primary-600"></i>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground-900">{c.weight} {c.species}</p>
                      <p className="text-xs text-foreground-500">{c.swim} · {c.anglerName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price card */}
            <div className="bg-foreground-900 rounded-xl p-6">
              <p className="text-sm text-background-50/60 mb-1">From</p>
              <p className="text-4xl font-bold text-background-50 font-heading">&pound;{lake.priceFrom}</p>
              <p className="text-xs text-background-50/50 mt-1">Day &pound;{lake.priceDayTicket} · Night &pound;{lake.priceNightTicket}</p>
              <button
                disabled
                className="w-full mt-5 py-3 text-sm font-semibold rounded-xl bg-background-50/10 text-background-50/40 cursor-not-allowed whitespace-nowrap"
              >
                Book a Swim (Demo Only)
              </button>
            </div>

            {/* Weather */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground-900 mb-3">Weather</h4>
              <div className="flex items-center gap-3 mb-3">
                <i className="ri-sun-line text-2xl text-accent-500"></i>
                <div>
                  <p className="text-xl font-bold text-foreground-900">{lake.weather.current}</p>
                  <p className="text-xs text-foreground-500">{lake.weather.condition}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-foreground-500"><i className="ri-windy-line"></i> {lake.weather.windSpeed} {lake.weather.windDirection}</div>
                <div className="flex items-center gap-1.5 text-foreground-500"><i className="ri-drizzle-line"></i> {lake.weather.rainChance} rain</div>
                <div className="flex items-center gap-1.5 text-foreground-500"><i className="ri-sun-line"></i> {lake.weather.sunrise}</div>
                <div className="flex items-center gap-1.5 text-foreground-500"><i className="ri-moon-line"></i> {lake.weather.sunset}</div>
              </div>
              <div className="flex justify-between mt-4 pt-3 border-t border-background-200">
                {lake.weather.forecast.slice(0, 4).map((f, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-foreground-500">{f.day}</p>
                    <i className={`${f.icon} text-sm text-foreground-600 block my-1`}></i>
                    <p className="text-[10px] font-semibold text-foreground-900">{f.temp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Services */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground-900 mb-3">Nearby Services</h4>
              <div className="space-y-3">
                {lake.localServices.tackle.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <i className="ri-shopping-bag-line text-sm text-foreground-400 mt-0.5"></i>
                    <div>
                      <p className="text-xs font-semibold text-foreground-900">{s.name}</p>
                      <p className="text-[10px] text-foreground-500">{s.distance} · {s.status}</p>
                    </div>
                  </div>
                ))}
                {lake.localServices.food.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <i className="ri-restaurant-2-line text-sm text-foreground-400 mt-0.5"></i>
                    <div>
                      <p className="text-xs font-semibold text-foreground-900">{s.name}</p>
                      <p className="text-[10px] text-foreground-500">{s.distance} · {s.status}</p>
                    </div>
                  </div>
                ))}
                {lake.localServices.fuel.map((s, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <i className="ri-gas-station-line text-sm text-foreground-400 mt-0.5"></i>
                    <div>
                      <p className="text-xs font-semibold text-foreground-900">{s.name}</p>
                      <p className="text-[10px] text-foreground-500">{s.distance} · {s.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoPublicLakePage() {
  return (
    <DemoAccessGuard>
      <DemoPublicLakeContent />
    </DemoAccessGuard>
  );
}