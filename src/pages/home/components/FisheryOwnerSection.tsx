import { fisheryOwnerFeatures } from "@/mocks/homeData";
import { Link } from "react-router-dom";

export default function FisheryOwnerSection() {
  return (
    <section id="fishery-owners" className="py-16 md:py-24 bg-background-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none opacity-[0.04]">
        <div className="w-full h-full">
          <svg viewBox="0 0 200 200" className="w-full h-full text-foreground-900">
            <path
              d="M40,180 Q60,120 100,80 Q140,40 180,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M20,160 Q60,140 100,100 Q140,60 160,20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M60,190 Q80,150 120,110 Q150,70 180,40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="bg-foreground-900 rounded-3xl overflow-hidden flex flex-col lg:flex-row">
          <div className="lg:w-[38%] relative">
            <div className="h-[300px] lg:h-full overflow-hidden">
              <img
                src="https://readdy.ai/api/search-image?query=Modern%20fishery%20management%20dashboard%20on%20a%20laptop%20screen%20showing%20lake%20map%20and%20booking%20interface%2C%20wooden%20desk%20with%20coffee%2C%20fishing%20magazine%20nearby%2C%20warm%20indoor%20lighting%20with%20window%20view%20to%20a%20lake%2C%20clean%20professional%20workspace%20aesthetic&width=900&height=1200&seq=fisheryhub-owner-dashboard&orientation=portrait"
                alt="Fishery owner dashboard"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="lg:w-[62%] p-8 md:p-12 lg:p-14 flex flex-col justify-center">
            <div className="mb-10">
              <span className="text-5xl font-heading text-background-50/15 leading-none select-none">&ldquo;</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-background-50 leading-tight mb-5">
              Own a fishery?
            </h2>

            <p className="text-base md:text-lg text-background-50/70 leading-relaxed max-w-xl mb-10">
              List your lake, manage swims, take bookings, track members, and reach anglers already searching in your area.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {fisheryOwnerFeatures.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-background-50/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className={`${feature.icon} text-sm text-background-50/70`}></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-background-50 mb-1">{feature.title}</h4>
                    <p className="text-xs text-background-50/50 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/login"
                className="px-6 py-3 text-sm font-semibold rounded-full bg-accent-500 text-foreground-900 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                List Your Fishery
              </a>
              <Link
                to="/demo"
                className="px-6 py-3 text-sm font-semibold rounded-full border border-background-50/30 text-background-50 hover:border-background-50/60 hover:bg-background-50/5 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                See Owner Demo
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-background-50/10">
              <p className="text-xs text-background-50/40">
                Join growing fisheries across the UK
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}