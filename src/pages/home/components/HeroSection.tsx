import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "@/components/base/DatePicker";

const fishingTypeOptions = [
  "Carp fishing",
  "Coarse fishing",
  "Match fishing",
  "Predator fishing",
  "Fly fishing",
  "Night fishing",
  "Day ticket",
  "Syndicate waters",
];

const quickChips = [
  { label: "Lakes near me", params: {} },
  { label: "Day tickets", params: { type: "Day ticket" } },
  { label: "Night fishing", params: { type: "Night fishing" } },
  { label: "Carp lakes", params: { type: "Carp fishing" } },
  { label: "Members-only", params: { type: "Syndicate waters" } },
  { label: "Available today", params: {} },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [fishingType, setFishingType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    if (fishingType) params.set("type", fishingType);
    navigate(`/find-fishing?${params.toString()}`);
  };

  const handleChipClick = (chip: typeof quickChips[0]) => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (date) params.set("date", date);
    if (chip.params.type) params.set("type", chip.params.type!);
    navigate(`/find-fishing?${params.toString()}`);
  };

  const selectedTypeLabel = fishingType || "Fishing type";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Deep%20emerald%20green%20forest%20canopy%20with%20soft%20mist%20rolling%20over%20a%20hidden%20UK%20fishing%20lake%20at%20dawn%2C%20golden%20morning%20light%20filtering%20through%20trees%2C%20calm%20dark%20water%20surface%2C%20atmospheric%20and%20moody%20natural%20landscape%2C%20rich%20deep%20green%20tones%20with%20warm%20amber%20highlights%2C%20fine%20art%20nature%20photography%20style%20with%20soft%20focus%20edges&width=1800&height=1200&seq=fisheryhub-hero-bg&orientation=landscape"
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          <div className="w-full lg:w-[55%] flex flex-col gap-6">
            <span className="inline-block text-xs md:text-sm font-medium text-background-50/60 tracking-widest uppercase">
              / UK fishing lake search &amp; booking platform
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-background-50 leading-[1.08] tracking-tight">
              Find Somewhere
              <br />
              to Fish
            </h1>

            <p className="text-base md:text-lg text-background-50/80 max-w-xl leading-relaxed">
              Search UK fishing lakes, compare prices, check rules, view catches, see local weather, and book your next session.
            </p>

            <form onSubmit={handleSearch} className="flex flex-col gap-3 mt-2">
              <div className="flex flex-col sm:flex-row gap-0 bg-background-50 rounded-2xl overflow-hidden">
                <div className="flex-1 flex items-center gap-3 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-background-200">
                  <i className="ri-map-pin-line text-lg text-foreground-400"></i>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location, postcode, town, or lake name"
                    className="w-full bg-transparent text-sm text-foreground-900 placeholder:text-foreground-400 focus:outline-none"
                    aria-label="Search location"
                  />
                </div>

                <DatePicker
                  value={date}
                  onChange={setDate}
                  placeholder="Select date"
                  className="flex-1 border-b sm:border-b-0 sm:border-r border-background-200"
                />

                <div className="relative flex-1 flex items-center gap-3 px-5 py-3.5 border-b sm:border-b-0 sm:border-r border-background-200">
                  <i className="ri-drop-line text-lg text-foreground-400"></i>
                  <button
                    type="button"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full text-left bg-transparent text-sm text-foreground-900 focus:outline-none flex items-center justify-between cursor-pointer"
                  >
                    <span className={fishingType ? "text-foreground-900" : "text-foreground-400"}>
                      {selectedTypeLabel}
                    </span>
                    <i className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}></i>
                  </button>

                  {dropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background-50 border border-background-200 rounded-xl shadow-lg z-20 max-h-56 overflow-y-auto">
                      <button
                        type="button"
                        onClick={() => { setFishingType(""); setDropdownOpen(false); }}
                        className="w-full text-left px-5 py-2.5 text-sm text-foreground-400 hover:bg-background-100 transition-colors cursor-pointer"
                      >
                        All types
                      </button>
                      {fishingTypeOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => { setFishingType(option); setDropdownOpen(false); }}
                          className={`w-full text-left px-5 py-2.5 text-sm transition-colors cursor-pointer ${
                            fishingType === option
                              ? "bg-primary-50 text-primary-700 font-medium"
                              : "text-foreground-700 hover:bg-background-100"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 text-sm font-semibold bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-search-line mr-2"></i>
                  Search Lakes
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickChips.map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    onClick={() => handleChipClick(chip)}
                    className="px-4 py-1.5 text-xs font-medium rounded-full bg-background-50/15 text-background-50 hover:bg-background-50/25 transition-colors whitespace-nowrap cursor-pointer backdrop-blur-sm"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate("/find-fishing")}
                className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Find a Lake
              </button>
              <a
                href="#fishery-owners"
                className="px-6 py-3 text-sm font-semibold rounded-full border border-background-50/40 text-background-50 hover:border-background-50 hover:bg-background-50/10 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                List Your Fishery
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm">
              <div className="bg-foreground-900/80 backdrop-blur-md rounded-2xl p-5 border border-foreground-800/50">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary-600/90 text-background-50">
                    Available today
                  </span>
                  <span className="text-xs text-background-50/50">12 swims</span>
                </div>

                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-foreground-800">
                  <img
                    src="https://readdy.ai/api/search-image?query=Beautiful%20UK%20fishing%20lake%20surrounded%20by%20willow%20trees%20on%20a%20misty%20morning%2C%20wooden%20fishing%20platform%20in%20foreground%2C%20calm%20green%20water%20with%20soft%20reflections%2C%20peaceful%20English%20countryside%20scene%2C%20warm%20natural%20light%2C%20atmospheric%20landscape%20photography&width=800&height=600&seq=fisheryhub-lake-preview&orientation=landscape"
                    alt="Willow Mere Fishery"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <h3 className="font-heading text-lg font-semibold text-background-50 mb-1">Willow Mere Fishery</h3>
                <p className="text-xs text-background-50/50 mb-3">8.4 miles away</p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-background-50/10 text-background-50/70">Carp</span>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-background-50/10 text-background-50/70">Day Ticket</span>
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-background-50/10 text-background-50/70">Night Fishing</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-background-50">From &pound;15</span>
                  <span className="text-xs text-background-50/50">Today: 17&deg;C, light wind</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <i className="ri-image-line text-[10px] text-accent-400"></i>
                  </div>
                  <span className="text-xs text-background-50/60">Latest catch: 28lb mirror carp</span>
                </div>

                <button
                  onClick={() => navigate("/find-fishing")}
                  className="w-full py-2.5 text-sm font-semibold rounded-xl bg-primary-600/80 text-background-50 hover:bg-primary-600 transition-colors cursor-pointer"
                >
                  View Lake
                </button>

                <div className="flex gap-2 mt-3 pt-3 border-t border-foreground-800/50">
                  <span className="text-[10px] text-background-50/40 flex items-center gap-1">
                    <i className="ri-checkbox-circle-line"></i> Rules checked
                  </span>
                  <span className="text-[10px] text-background-50/40 flex items-center gap-1">
                    <i className="ri-global-line"></i> Online booking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <span className="block font-heading text-[10vw] md:text-[8vw] font-bold text-background-50/8 leading-none whitespace-nowrap text-center tracking-[0.1em]">
          FISHERYHUB.UK
        </span>
      </div>
    </section>
  );
}