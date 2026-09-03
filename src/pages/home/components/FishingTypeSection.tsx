import { fishingTypes } from "@/mocks/homeData";
import { useNavigate } from "react-router-dom";

export default function FishingTypeSection() {
  const navigate = useNavigate();

  const handleExplore = (typeName: string) => {
    navigate(`/find-fishing?type=${encodeURIComponent(typeName)}`);
  };

  return (
    <section className="py-16 md:py-24 bg-background-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-medium text-foreground-400 tracking-widest uppercase">
            Browse by style
          </span>
          <h2 className="mt-3 font-heading text-3xl md:text-5xl font-semibold text-foreground-900 leading-tight">
            Search by Fishing Type
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fishingTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => handleExplore(type.name)}
              className="group bg-background-100 rounded-2xl p-6 md:p-7 border border-background-200/70 hover:border-primary-200 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-100 transition-colors">
                <i className={`${type.icon} text-xl text-primary-600`}></i>
              </div>

              <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">
                {type.name}
              </h3>

              <p className="text-sm text-foreground-500 leading-relaxed mb-5">
                {type.description}
              </p>

              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                Explore
                <i className="ri-arrow-right-line text-sm"></i>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}