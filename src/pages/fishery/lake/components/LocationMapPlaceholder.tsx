interface LocationMapPlaceholderProps {
  town: string;
  county: string;
  accessNote: string;
}

export default function LocationMapPlaceholder({
  town,
  county,
  accessNote,
}: LocationMapPlaceholderProps) {
  return (
    <section id="location" className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Location</h2>
        <p className="text-sm text-foreground-600 max-w-2xl mb-8">
          {town}, {county}. Full directions and gate access details are provided after booking.
        </p>

        <div className="flex flex-col lg:flex-row gap-5">
          <div className="flex-1">
            <div className="bg-background-100 rounded-xl border border-background-200/60 h-[300px] md:h-[400px] overflow-hidden relative">
              <img
                src="https://readdy.ai/api/search-image?query=Minimalist%20stylized%20map%20showing%20Kent%20countryside%20with%20a%20blue%20lake%20marker%20pin%2C%20green%20rural%20landscape%20with%20roads%20and%20small%20towns%2C%20clean%20modern%20cartographic%20style%2C%20soft%20natural%20color%20palette%20with%20muted%20greens%20and%20cream%20tones%2C%20abstract%20geographic%20illustration&width=1200&height=800&seq=willow-mere-location-map&orientation=landscape"
                alt={`Map showing location of lake in ${town}, ${county}`}
                className="w-full h-full object-cover object-top opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-background-50/90 backdrop-blur-sm flex items-center justify-center mx-auto mb-3">
                    <i className="ri-map-pin-line text-2xl text-primary-600"></i>
                  </div>
                  <p className="text-sm font-semibold text-foreground-800">{town}, {county}</p>
                  <p className="text-xs text-foreground-500 mt-1">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-[340px] flex-shrink-0">
            <div className="bg-background-100/70 rounded-xl border border-background-200/60 p-5">
              <h3 className="text-sm font-semibold text-foreground-800 mb-3 flex items-center gap-2">
                <i className="ri-information-line text-foreground-500"></i>
                Access &amp; directions
              </h3>
              <p className="text-xs text-foreground-600 leading-relaxed mb-4">{accessNote}</p>

              <div className="bg-accent-50/50 rounded-lg border border-accent-200/50 p-3 flex items-start gap-2.5">
                <i className="ri-lock-line text-accent-600 mt-0.5 flex-shrink-0"></i>
                <p className="text-[11px] text-accent-800 leading-relaxed">
                  Exact gate access details and codes are only shown after confirmed booking and payment where required.
                </p>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(town + " " + county + " fishing lake")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center mt-4 px-5 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-road-map-line"></i>
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}