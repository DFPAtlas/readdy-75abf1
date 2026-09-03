import { Link } from "react-router-dom";

export default function OwnerCTASection() {
  return (
    <section className="py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-background-100/70 rounded-2xl border border-background-200/60 p-8 md:p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-secondary-100 flex items-center justify-center mx-auto mb-5">
            <i className="ri-building-2-line text-2xl text-secondary-600"></i>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Own a fishery?</h2>
          <p className="text-sm text-foreground-600 max-w-lg mx-auto mb-6 leading-relaxed">
            List your lake on FisheryHub, manage swims, take bookings, and reach anglers searching in your area.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#fishery-owners"
              className="px-6 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              List Your Fishery
            </a>
            <Link
              to="/demo"
              className="px-6 py-3 text-sm font-semibold rounded-xl border border-foreground-200 text-foreground-700 hover:bg-foreground-50 transition-colors cursor-pointer whitespace-nowrap"
            >
              View Demo Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}