interface LakeResult {
  id: string;
  slug: string;
  lakeSlug: string;
  name: string;
  distance: number;
  town: string;
  priceFrom: number;
  availabilityLabel: string;
  species: string[];
  image: string;
}

interface MapViewPlaceholderProps {
  lakes: LakeResult[];
}

export default function MapViewPlaceholder({ lakes }: MapViewPlaceholderProps) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-background-200/70 bg-background-100 h-[calc(100vh-280px)] min-h-[500px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="https://readdy.ai/api/search-image?query=Stylized%20minimalist%20topographic%20map%20of%20Kent%20UK%20region%20with%20soft%20muted%20green%20and%20cream%20color%20palette%2C%20gentle%20contour%20lines%2C%20small%20water%20bodies%20highlighted%2C%20clean%20modern%20cartographic%20design%20with%20subtle%20texture%2C%20light%20background&width=1200&height=800&seq=fishery-map-placeholder-kent&orientation=landscape"
          alt="Map view of fishing lakes in Kent"
          className="w-full h-full object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-background-50/60 via-transparent to-background-50/40"></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="w-14 h-14 rounded-2xl bg-background-50/95 border border-background-200/70 flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
          <i className="ri-map-pin-line text-xl text-foreground-500"></i>
        </div>
        <p className="text-sm text-foreground-600 bg-background-50/90 px-4 py-2 rounded-xl backdrop-blur-sm">
          Map view coming soon
        </p>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
        {lakes.slice(0, 4).map((lake, i) => {
          const positions = [
            "top-[25%] left-[30%]",
            "top-[40%] left-[60%]",
            "top-[55%] left-[20%]",
            "top-[35%] left-[70%]",
          ];
          return (
            <div
              key={lake.id}
              className={`absolute ${positions[i] || ""} hidden lg:flex items-center gap-2 bg-background-50/95 backdrop-blur-sm border border-background-200/70 rounded-xl px-3 py-2 shadow-sm`}
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                <img src={lake.image} alt="" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground-900 whitespace-nowrap">{lake.name}</p>
                <p className="text-[10px] text-foreground-500">{lake.distance} miles · From £{lake.priceFrom}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="absolute top-4 right-4 bg-background-50/95 backdrop-blur-sm border border-background-200/70 rounded-xl px-4 py-2.5">
        <p className="text-xs font-medium text-foreground-700">{lakes.length} fisheries in view</p>
        <p className="text-[10px] text-foreground-500">Full map &amp; pin clustering coming soon</p>
      </div>
    </div>
  );
}