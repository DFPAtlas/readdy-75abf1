import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { lakeDetail, visibilityRestrictedData } from "@/mocks/lakeDetailData";
import LakeHeroSection from "./components/LakeHeroSection";
import LakeQuickInfoBar from "./components/LakeQuickInfoBar";
import LakeSectionNav from "./components/LakeSectionNav";
import LakeOverviewSection from "./components/LakeOverviewSection";
import SwimAvailabilityPreview from "./components/SwimAvailabilityPreview";
import WeatherPreviewCard from "./components/WeatherPreviewCard";
import PricesAndPassesSection from "./components/PricesAndPassesSection";
import LakeRulesSection from "./components/LakeRulesSection";
import LatestCatchesSection from "./components/LatestCatchesSection";
import FacilitiesGrid from "./components/FacilitiesGrid";
import LocalServicesPreview from "./components/LocalServicesPreview";
import LocationMapPlaceholder from "./components/LocationMapPlaceholder";
import FisheryContactCard from "./components/FisheryContactCard";
import OwnerCTASection from "./components/OwnerCTASection";
import SignupCTASection from "./components/SignupCTASection";
import VisibilityRestrictedPreview from "./components/VisibilityRestrictedPreview";
import SignupPromptModal from "@/pages/find-fishing/components/SignupPromptModal";

export default function FisheryLakeDetail() {
  const { fisherySlug, lakeSlug } = useParams();

  const data = lakeDetail;
  const { fishery, lake } = data;

  const isPublic = lake.visibilityMode === "public";

  const [showSignup, setShowSignup] = useState(false);
  const [mobileSignupTitle, setMobileSignupTitle] = useState("");

  const handleMobileGated = (action: string) => {
    if (action === "book") {
      setMobileSignupTitle("Book a Swim");
    } else {
      setMobileSignupTitle("Save this lake");
    }
    setShowSignup(true);
  };

  if (!isPublic) {
    const restricted = visibilityRestrictedData;
    return (
      <div className="min-h-screen bg-background-50">
        <Header />
        <main className="pt-16">
          <VisibilityRestrictedPreview
            fisheryName={restricted.fishery.name}
            lakeName={restricted.lake.name}
            lakeDescription={restricted.lake.description}
            town={restricted.lake.location.town}
            county={restricted.lake.location.county}
            species={restricted.lake.species}
            visibilityMode={restricted.lake.visibilityMode}
            heroImage={restricted.lake.heroImage}
            membershipNote={restricted.lake.membershipNote}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <LakeHeroSection
          heroImage={lake.heroImage}
          fisheryName={fishery.name}
          lakeName={lake.name}
          town={lake.location.town}
          county={lake.location.county}
          distanceFromReference={lake.location.distanceFromReference}
          referenceLocation={lake.location.referenceLocation}
          description={lake.description}
          priceFrom={lake.priceFrom}
          priceDayTicket={lake.priceDayTicket}
          priceNightTicket={lake.priceNightTicket}
          availabilityLabel={lake.availabilityLabel}
          availability={lake.availability}
          species={lake.species}
          bookingEnabled={lake.bookingEnabled}
          visibilityMode={lake.visibilityMode}
          lakeTypeLabel={lake.lakeTypeLabel}
          hasNightFishing={lake.nightFishing}
          fisherySlug={fishery.slug}
          lakeSlug={lake.slug}
          images={lake.images}
        />

        <LakeQuickInfoBar
          priceFrom={lake.priceFrom}
          openingTimes={lake.openingTimes}
          lakeTypeLabel={lake.lakeTypeLabel}
          hasNightFishing={lake.nightFishing}
          nightFishingNote={lake.nightFishingNote}
          swimCount={lake.swimCount}
          weatherCurrent={lake.weather.current}
          weatherCondition={lake.weather.condition}
          facilities={lake.facilities}
        />

        <LakeSectionNav />

        <LakeOverviewSection
          lakeDescription={lake.description}
          fisheryName={fishery.name}
          fisheryAbout={fishery.about}
          bestFor={lake.bestFor}
          species={lake.species}
          lakeSize={lake.lakeSize}
          depthRange={lake.depthRange}
          lakeTypeLabel={lake.lakeTypeLabel}
          visibilityMode={lake.visibilityMode}
          accessNote={lake.location.accessNote}
        />

        <SwimAvailabilityPreview
          swims={lake.swims}
          availableSwims={lake.availableSwims}
          bookedSwims={lake.bookedSwims}
          maintenanceSwims={lake.maintenanceSwims}
          availabilityNote={lake.availabilityNote}
        />

        <PricesAndPassesSection plans={lake.pricePlans} />

        <LakeRulesSection
          rules={lake.rules}
          acceptanceNote={lake.rulesAcceptanceNote}
        />

        <LatestCatchesSection catches={lake.latestCatches} />

        <WeatherPreviewCard
          current={lake.weather.current}
          condition={lake.weather.condition}
          windSpeed={lake.weather.windSpeed}
          windDirection={lake.weather.windDirection}
          rainChance={lake.weather.rainChance}
          sunrise={lake.weather.sunrise}
          sunset={lake.weather.sunset}
          forecast={lake.weather.forecast}
          disclaimer={lake.weather.disclaimer}
        />

        <FacilitiesGrid facilities={lake.facilities} />

        <LocalServicesPreview services={data.localServices} />

        <LocationMapPlaceholder
          town={lake.location.town}
          county={lake.location.county}
          accessNote={lake.location.accessNote}
        />

        <FisheryContactCard
          fisheryName={fishery.name}
          ownerDisplayName={fishery.ownerDisplayName}
          websiteUrl={fishery.websiteUrl}
          contactEnabled={fishery.contactEnabled}
          responseNote={fishery.responseNote}
        />

        <SignupCTASection />

        <OwnerCTASection />
      </main>

      <Footer />

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background-50 border-t border-background-200/70 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => handleMobileGated("save")}
          className="flex-1 px-4 py-3 text-sm font-semibold rounded-xl border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-heart-line mr-1.5"></i>
          Save
        </button>
        <button
          onClick={() => handleMobileGated("book")}
          className="flex-1 px-4 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-calendar-check-line mr-1.5"></i>
          Book a Swim
        </button>
      </div>

      <SignupPromptModal
        open={showSignup}
        onClose={() => setShowSignup(false)}
        title={mobileSignupTitle}
        description="Create a free angler account to save lakes, book swims, join waiting lists, and get booking updates."
      />
    </div>
  );
}