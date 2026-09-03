import { useNavigate, Link } from "react-router-dom";

export default function FinalCTASection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="rounded-3xl overflow-hidden">
          <div className="w-full h-[280px] md:h-[360px] overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Golden%20sunset%20over%20a%20peaceful%20UK%20fishing%20lake%2C%20warm%20orange%20and%20pink%20sky%20reflecting%20on%20calm%20water%2C%20silhouettes%20of%20trees%20along%20the%20bank%2C%20two%20fishermen%20in%20the%20distance%2C%20atmospheric%20evening%20light%2C%20beautiful%20English%20countryside%20landscape%20with%20dramatic%20clouds&width=1600&height=720&seq=fisheryhub-final-cta&orientation=landscape"
              alt="Sunset over fishing lake"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        <div className="text-center mt-10 md:mt-14">
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-foreground-900 leading-tight">
            Ready to find your <span className="italic font-normal text-foreground-400">next</span> place to fish?
          </h2>
          <p className="mt-4 text-base text-foreground-600 max-w-xl mx-auto leading-relaxed">
            Search lakes, compare options, and plan your next session with FisheryHub.uk.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/find-fishing")}
            className="px-8 py-3.5 text-sm font-semibold rounded-full bg-foreground-900 text-background-50 hover:bg-foreground-800 transition-colors whitespace-nowrap cursor-pointer"
          >
            Search Lakes
          </button>
          <Link
            to="/demo"
            className="px-8 py-3.5 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer text-center"
          >
            See Owner Demo
          </Link>
          <a
            href="#fishery-owners"
            className="px-8 py-3.5 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer text-center"
          >
            List Your Fishery
          </a>
        </div>
      </div>
    </section>
  );
}