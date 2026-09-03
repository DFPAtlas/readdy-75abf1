import { popularFisheries } from "@/mocks/homeData";
import { useNavigate } from "react-router-dom";

const fisheryImages = [
  "https://readdy.ai/api/search-image?query=Serene%20UK%20fishing%20lake%20surrounded%20by%20willow%20trees%20on%20a%20sunny%20morning%2C%20calm%20water%20reflecting%20green%20landscape%2C%20peaceful%20countryside%20setting%20with%20soft%20natural%20light%2C%20minimalist%20nature%20photography%20style%20with%20muted%20earthy%20tones&width=800&height=600&seq=fishery-willow-mere-card&orientation=landscape",
  "https://readdy.ai/api/search-image?query=Large%20carp%20fishing%20lake%20with%20oak%20trees%20along%20the%20bank%2C%20misty%20morning%20atmosphere%20over%20dark%20water%2C%20English%20countryside%20landscape%2C%20dramatic%20sky%20with%20soft%20light%2C%20moody%20atmospheric%20photography&width=800&height=600&seq=fishery-oakfield-carp-card&orientation=landscape",
  "https://readdy.ai/api/search-image?query=Small%20charming%20UK%20fishing%20lake%20with%20a%20wooden%20platform%20swim%2C%20clear%20blue%20sky%20reflected%20on%20gentle%20water%2C%20green%20grass%20banks%20with%20wildflowers%2C%20bright%20natural%20daylight%2C%20inviting%20peaceful%20atmosphere&width=800&height=600&seq=fishery-brookside-day-card&orientation=landscape",
  "https://readdy.ai/api/search-image?query=Sprawling%20UK%20reservoir%20fishing%20venue%20with%20distant%20tree%20line%2C%20wide%20open%20water%20under%20soft%20cloudy%20sky%2C%20fisherman%20silhouette%20on%20the%20bank%2C%20natural%20landscape%20with%20earthy%20tones%2C%20tranquil%20atmospheric%20scene&width=800&height=600&seq=fishery-thornwood-card&orientation=landscape",
];

export default function PopularFisheriesSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-12">
          <div className="lg:w-[30%]">
            <span className="text-xs font-medium text-foreground-400 tracking-widest uppercase">
              / Popular near you
            </span>
          </div>
          <div className="lg:w-[70%]">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground-900 leading-tight">
              Popular Fisheries Near You
            </h2>
            <p className="mt-3 text-base text-foreground-600 leading-relaxed max-w-2xl">
              Explore lakes, swims, prices, rules, catches, and availability.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularFisheries.map((fishery, index) => (
            <div
              key={fishery.id}
              className="group bg-background-50 rounded-2xl overflow-hidden border border-background-200/70 hover:border-background-300 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/find-fishing?location=${encodeURIComponent(fishery.name)}`)}
            >
              {index === 0 && (
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary-600 text-background-50">
                    Available today
                  </span>
                </div>
              )}

              <div className="relative aspect-[4/3] overflow-hidden bg-secondary-100">
                <img
                  src={fisheryImages[index] || "https://readdy.ai/api/search-image?query=UK%20fishing%20lake&width=800&height=600&seq=fishery-default-card&orientation=landscape"}
                  alt={fishery.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-heading text-lg font-semibold text-foreground-900 leading-snug">
                    {fishery.name}
                  </h3>
                  <span className="text-xs text-foreground-500 whitespace-nowrap ml-2 mt-0.5">{fishery.distance}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {fishery.species.map((s) => (
                    <span key={s} className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-secondary-100 text-secondary-700">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-foreground-900">From &pound;{fishery.priceFrom}</span>
                  <span className="text-xs text-foreground-400">{fishery.weather}</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                    <i className="ri-image-line text-[10px] text-accent-600"></i>
                  </div>
                  <span className="text-xs text-foreground-500">Latest: {fishery.latestCatch}</span>
                </div>

                <button className="mt-3 w-full py-2.5 text-sm font-semibold rounded-xl border border-foreground-200 text-foreground-700 hover:border-foreground-400 hover:bg-foreground-50 transition-colors cursor-pointer text-center">
                  View Lake
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}