import { latestCatches } from "@/mocks/homeData";
import { useNavigate } from "react-router-dom";

const catchImages = [
  "https://readdy.ai/api/search-image?query=Large%20mirror%20carp%20being%20held%20by%20angler%20on%20a%20green%20unhooking%20mat%2C%20close-up%20of%20beautiful%20scaled%20fish%2C%20natural%20daylight%2C%20fishing%20catch%20photography%20with%20soft%20background%20blur&width=800&height=600&seq=catch-mirror-carp&orientation=landscape",
  "https://readdy.ai/api/search-image?query=Large%20common%20carp%20held%20by%20fisherman%20at%20sunset%20lakeside%2C%20golden%20hour%20light%20on%20fish%20scales%2C%20proud%20catch%20moment%2C%20warm%20atmospheric%20evening%20light%2C%20UK%20fishing&width=800&height=600&seq=catch-common-carp&orientation=landscape",
  "https://readdy.ai/api/search-image?query=Nice%20bream%20fish%20resting%20on%20unhooking%20mat%20in%20morning%20light%2C%20close-up%20detail%20of%20silver%20scales%20and%20fins%2C%20green%20grass%20background%2C%20clean%20fishing%20catch%20photography&width=800&height=600&seq=catch-bream&orientation=landscape",
];

export default function LatestCatchesSection() {
  const navigate = useNavigate();

  return (
    <section id="latest-catches" className="py-16 md:py-24 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-foreground-400 tracking-widest uppercase">
            Community
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl font-semibold text-foreground-900 leading-tight">
            Latest Catches
          </h2>
          <p className="mt-3 text-base text-foreground-500 max-w-xl mx-auto">
            Catch reports will appear here as fisheries join FisheryHub.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestCatches.map((c, index) => (
            <div
              key={c.id}
              className="bg-background-100 rounded-2xl overflow-hidden border border-background-200/70 hover:border-background-300 transition-all duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary-100">
                <img
                  src={catchImages[index] || "https://readdy.ai/api/search-image?query=Freshly%20caught%20fish%20on%20a%20green%20unhooking%20mat%20by%20a%20UK%20lake%2C%20soft%20natural%20light%2C%20clean%20photography&width=800&height=600&seq=catch-default&orientation=landscape"}
                  alt={`${c.weight} ${c.species}`}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-5 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground-900">
                      {c.weight} {c.species}
                    </h3>
                    <p className="text-sm text-foreground-500">{c.lakeName}</p>
                  </div>
                  <span className="text-xs text-foreground-400 whitespace-nowrap mt-1">
                    {new Date(c.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-foreground-400">{c.swim}</span>
                  <span className="text-xs text-accent-600 font-medium">Verified</span>
                </div>

                <button
                  onClick={() => navigate(`/find-fishing?location=${encodeURIComponent(c.lakeName)}`)}
                  className="mt-3 w-full py-2.5 text-sm font-semibold rounded-xl border border-foreground-200 text-foreground-700 hover:border-foreground-400 hover:bg-foreground-50 transition-colors cursor-pointer text-center"
                >
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