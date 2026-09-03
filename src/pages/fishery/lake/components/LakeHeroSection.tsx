import { useState } from "react";
import SignupPromptModal from "@/pages/find-fishing/components/SignupPromptModal";

interface LakeHeroSectionProps {
  heroImage: string;
  fisheryName: string;
  lakeName: string;
  town: string;
  county: string;
  distanceFromReference: number;
  referenceLocation: string;
  description: string;
  priceFrom: number;
  priceDayTicket: number | null;
  priceNightTicket: number | null;
  availabilityLabel: string;
  availability: string;
  species: string[];
  bookingEnabled: boolean;
  visibilityMode: string;
  lakeTypeLabel: string;
  hasNightFishing: boolean;
  fisherySlug: string;
  lakeSlug: string;
  images: string[];
}

export default function LakeHeroSection({
  heroImage,
  fisheryName,
  lakeName,
  town,
  county,
  distanceFromReference,
  referenceLocation,
  description,
  priceFrom,
  priceDayTicket,
  priceNightTicket,
  availabilityLabel,
  availability,
  species,
  bookingEnabled,
  visibilityMode,
  lakeTypeLabel,
  hasNightFishing,
  images,
}: LakeHeroSectionProps) {
  const [showSignup, setShowSignup] = useState(false);
  const [signupTitle, setSignupTitle] = useState("");
  const [signupDesc, setSignupDesc] = useState("");
  const [activeImage, setActiveImage] = useState(0);

  const handleGatedAction = (action: string) => {
    if (action === "book") {
      setSignupTitle("Book a Swim");
      setSignupDesc("Create a free angler account to book swims, save lakes, and get booking updates.");
    } else if (action === "save") {
      setSignupTitle("Save this lake");
      setSignupDesc("Create a free angler account to save favourite lakes, join waiting lists, and track your fishing spots.");
    } else if (action === "waiting") {
      setSignupTitle("Join Waiting List");
      setSignupDesc("Create a free angler account to join waiting lists and get notified when swims become available.");
    }
    setShowSignup(true);
  };

  const availColor =
    availability === "available-today" ? "bg-accent-100 text-accent-800" :
    availability === "limited" ? "bg-secondary-100 text-secondary-700" :
    "bg-foreground-100 text-foreground-700";

  const showSyndicate = visibilityMode === "syndicate";
  const showMembers = visibilityMode === "members-only";

  return (
    <>
      <section className="relative bg-background-900">
        <div className="relative h-[380px] md:h-[520px] overflow-hidden">
          <img
            src={images[activeImage] || heroImage}
            alt={`${lakeName} at ${fisheryName}`}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/50"></div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    i === activeImage ? "bg-background-50 w-6" : "bg-background-50/50 hover:bg-background-50/80"
                  }`}
                />
              ))}
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={() => setActiveImage((p) => (p === 0 ? images.length - 1 : p - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-50/20 backdrop-blur-sm flex items-center justify-center text-background-50 hover:bg-background-50/30 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-left-s-line text-lg"></i>
              </button>
              <button
                onClick={() => setActiveImage((p) => (p === images.length - 1 ? 0 : p + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background-50/20 backdrop-blur-sm flex items-center justify-center text-background-50 hover:bg-background-50/30 transition-colors cursor-pointer"
              >
                <i className="ri-arrow-right-s-line text-lg"></i>
              </button>
            </>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative -mt-20 pb-10">
          <div className="bg-background-50 rounded-2xl p-5 md:p-8 shadow-sm border border-background-200/60">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full ${availColor}`}>
                    {availabilityLabel}
                  </span>
                  {bookingEnabled && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-primary-100 text-primary-700">
                      Online booking
                    </span>
                  )}
                  {showSyndicate && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-foreground-100 text-foreground-700">
                      Syndicate
                    </span>
                  )}
                  {showMembers && (
                    <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-foreground-100 text-foreground-700">
                      Members only
                    </span>
                  )}
                  <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-background-100 text-foreground-600">
                    {lakeTypeLabel}
                  </span>
                  {hasNightFishing && (
                    <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-background-100 text-foreground-600">
                      Night fishing
                    </span>
                  )}
                </div>

                <p className="text-sm text-foreground-500 mb-1">
                  {fisheryName}
                </p>
                <h1 className="font-heading text-2xl md:text-4xl font-semibold text-foreground-900 leading-tight mb-2">
                  {lakeName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-foreground-600 mb-3">
                  <span className="inline-flex items-center gap-1">
                    <i className="ri-map-pin-line text-foreground-400"></i>
                    {town}, {county}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <i className="ri-road-map-line text-foreground-400"></i>
                    {distanceFromReference} miles from {referenceLocation}
                  </span>
                </div>

                <p className="text-sm text-foreground-600 leading-relaxed max-w-2xl">
                  {description}
                </p>

                <div className="flex flex-wrap items-center gap-1.5 mt-4">
                  {species.map((s) => (
                    <span key={s} className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-primary-50 text-primary-700 whitespace-nowrap">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:items-end lg:min-w-[200px]">
                <div className="text-right">
                  <div className="text-3xl font-semibold text-foreground-900 font-heading">
                    From £{priceFrom}
                  </div>
                  <div className="text-xs text-foreground-500 mt-0.5">
                    {priceDayTicket !== null && `Day £${priceDayTicket}`}
                    {priceDayTicket !== null && priceNightTicket !== null && " · "}
                    {priceNightTicket !== null && `Night £${priceNightTicket}`}
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full lg:w-auto">
                  <button
                    onClick={() => handleGatedAction("book")}
                    className="w-full px-6 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-calendar-check-line mr-2"></i>
                    Book a Swim
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleGatedAction("save")}
                      className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-lg border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-heart-line mr-1.5"></i>
                      Save Lake
                    </button>
                    <button
                      onClick={() => handleGatedAction("waiting")}
                      className="flex-1 px-4 py-2.5 text-xs font-semibold rounded-lg border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-user-star-line mr-1.5"></i>
                      Join Waiting List
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SignupPromptModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        title={signupTitle}
        description={signupDesc}
      />
    </>
  );
}