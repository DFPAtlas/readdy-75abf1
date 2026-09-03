export default function SignupCTASection() {
  return (
    <section className="py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://readdy.ai/api/search-image?query=Beautiful%20UK%20fishing%20lake%20at%20golden%20hour%20sunset%2C%20warm%20orange%20and%20amber%20sky%20reflected%20on%20calm%20water%2C%20angler%20silhouette%20on%20wooden%20swim%20platform%2C%20tranquil%20atmospheric%20scene%2C%20cinematic%20outdoor%20photography%20with%20rich%20warm%20tones%20and%20peaceful%20mood&width=1400&height=500&seq=signup-cta-lake-page&orientation=landscape"
            alt="Sunset over fishing lake"
            className="w-full h-[350px] md:h-[400px] object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 max-w-lg">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-background-50 mb-3">
                Want to book or save this lake?
              </h2>
              <p className="text-sm text-background-50/80 mb-6 leading-relaxed">
                Create a free angler account to save lakes, view availability, join waiting lists, and get booking updates.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl bg-background-50 text-foreground-900 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap">
                  Create Free Account
                </button>
                <button className="w-full sm:w-auto px-6 py-3 text-sm font-semibold rounded-xl border border-background-50/40 text-background-50 hover:bg-background-50/10 transition-colors cursor-pointer whitespace-nowrap">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}