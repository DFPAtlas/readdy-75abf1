import { anglerBenefits } from "@/mocks/homeData";

export default function AnglerAccountSection() {
  return (
    <section className="py-16 md:py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden">
          <div className="w-full h-[280px] md:h-[360px] overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Angler%20fishing%20at%20a%20misty%20UK%20lake%20at%20sunrise%2C%20silhouette%20of%20fisherman%20with%20rod%20on%20wooden%20platform%2C%20calm%20water%20with%20soft%20reflections%2C%20golden%20morning%20light%20through%20trees%2C%20atmospheric%20and%20peaceful%20landscape%20photography%2C%20fine%20art%20nature%20style%20with%20film%20grain%20texture&width=1600&height=720&seq=fisheryhub-angler-account&orientation=landscape"
              alt="Angler at sunrise lake"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="text-center mt-10 md:mt-14">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground-900 leading-tight">
            Create a <span className="italic font-normal text-foreground-400">free</span> angler account
          </h2>
          <p className="mt-4 text-base text-foreground-600 max-w-2xl mx-auto leading-relaxed">
            Save lakes, join waiting lists, get booking updates, and submit catch reports.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {anglerBenefits.map((benefit) => (
            <div
              key={benefit.text}
              className="bg-background-50 rounded-2xl p-5 border border-background-200/70 flex flex-col items-center text-center gap-3 hover:border-primary-200 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center">
                <i className={`${benefit.icon} text-lg text-primary-600`}></i>
              </div>
              <span className="text-xs md:text-sm font-medium text-foreground-700 leading-snug">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/login"
            className="px-8 py-3.5 text-sm font-semibold rounded-full bg-foreground-900 text-background-50 hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            Create Free Account
          </a>
        </div>
      </div>
    </section>
  );
}