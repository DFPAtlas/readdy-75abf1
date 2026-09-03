import { Link } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { demoLandingData } from "@/mocks/demoData";

const { heroHeadline, heroSubtitle, previewFeatures, fisheryTypes, steps, dashboardPreview } = demoLandingData;

export default function DemoLandingPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="relative h-[520px] md:h-[600px] overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Modern%20clean%20fishery%20management%20dashboard%20on%20a%20large%20screen%20showing%20lake%20map%20with%20swim%20markers%20and%20booking%20interface%2C%20professional%20workspace%20with%20warm%20lighting%2C%20wooden%20desk%20with%20coffee%2C%20window%20view%20to%20a%20beautiful%20UK%20fishing%20lake%20at%20golden%20hour%2C%20premium%20sophisticated%20SaaS%20workspace%20aesthetic%20with%20natural%20outdoor%20tones&width=1800&height=1200&seq=fisheryhub-demo-hero&orientation=landscape"
              alt="FisheryHub owner dashboard preview"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/60"></div>
          </div>

          <div className="absolute inset-0 flex items-center">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-2xl">
                <span className="inline-block text-xs md:text-sm font-medium text-background-50/60 tracking-widest uppercase mb-4">
                  / Fishery owner demo
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-semibold text-background-50 leading-tight mb-5">
                  {heroHeadline}
                </h1>
                <p className="text-base md:text-lg text-background-50/80 max-w-xl leading-relaxed mb-8">
                  {heroSubtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/demo/request"
                    className="px-7 py-3.5 text-sm font-semibold rounded-full bg-accent-500 text-foreground-900 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    {demoLandingData.primaryCTA}
                  </Link>
                  <a
                    href="#features"
                    className="px-7 py-3.5 text-sm font-semibold rounded-full border border-background-50/40 text-background-50 hover:border-background-50 hover:bg-background-50/10 transition-colors whitespace-nowrap cursor-pointer text-center"
                  >
                    {demoLandingData.secondaryCTA}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Card */}
        <section className="relative -mt-20 z-10">
          <div className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="bg-foreground-900 rounded-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-lg md:text-xl font-semibold text-background-50">Dashboard Preview</h3>
                <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-accent-500/90 text-foreground-900 whitespace-nowrap">
                  Sample data
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-background-50 mb-1">{dashboardPreview.bookingsToday}</p>
                  <p className="text-xs text-background-50/50">Bookings today</p>
                </div>
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-background-50 mb-1">{dashboardPreview.freeSwims}</p>
                  <p className="text-xs text-background-50/50">Free swims</p>
                </div>
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-background-50 mb-1">&pound;{dashboardPreview.revenueToday}</p>
                  <p className="text-xs text-background-50/50">Revenue today</p>
                </div>
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-background-50 mb-1">{dashboardPreview.checkedInAnglers}</p>
                  <p className="text-xs text-background-50/50">Checked in</p>
                </div>
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-background-50 mb-1">{dashboardPreview.latestCatches}</p>
                  <p className="text-xs text-background-50/50">Latest catches</p>
                </div>
                <div className="bg-background-50/8 rounded-xl p-4">
                  <p className="text-2xl font-bold text-accent-400 mb-1">{dashboardPreview.alerts}</p>
                  <p className="text-xs text-background-50/50">Alerts</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You Can Preview */}
        <section id="features" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-4">
                What you can preview
              </h2>
              <p className="text-base text-foreground-600 max-w-xl mx-auto">
                Explore the complete fishery management toolkit with realistic sample data.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {previewFeatures.map((feature) => (
                <div key={feature.id} className="bg-background-50 border border-background-200 rounded-xl p-5 hover:border-background-300 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <i className={`${feature.icon} text-lg text-primary-600`}></i>
                  </div>
                  <h4 className="text-sm font-semibold text-foreground-900 mb-2">{feature.title}</h4>
                  <p className="text-xs text-foreground-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for Different Fisheries */}
        <section className="py-16 md:py-24 bg-background-100">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-4">
                Built for different fisheries
              </h2>
              <p className="text-base text-foreground-600 max-w-xl mx-auto">
                Whether you run a day-ticket lake or a private syndicate, FisheryHub adapts to how you operate.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fisheryTypes.map((type) => (
                <div key={type.id} className="bg-background-50 rounded-xl p-6 border border-background-200 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                    <i className={`${type.icon} text-lg text-accent-600`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground-900 mb-1.5">{type.title}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Happens Next */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-4">
                What happens next
              </h2>
              <p className="text-base text-foreground-600 max-w-xl mx-auto">
                Getting started is simple — fill out the form and explore the demo at your own pace.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {steps.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-foreground-900 text-background-50 flex items-center justify-center mx-auto mb-4">
                      <span className="text-sm font-bold">{step.step}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-foreground-900 mb-2">{step.title}</h4>
                    <p className="text-xs text-foreground-600 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 bg-foreground-900">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-background-50 mb-4">
              Ready to see it in action?
            </h2>
            <p className="text-base text-background-50/70 max-w-lg mx-auto mb-8">
              Fill out the short form and we will send you a secure demo link to explore FisheryHub with sample data.
            </p>
            <Link
              to="/demo/request"
              className="inline-block px-8 py-3.5 text-sm font-semibold rounded-full bg-accent-500 text-foreground-900 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer"
            >
              Request Demo Link
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}