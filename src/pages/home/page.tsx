import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import HeroSection from "./components/HeroSection";
import PopularFisheriesSection from "./components/PopularFisheriesSection";
import FishingTypeSection from "./components/FishingTypeSection";
import HowItWorksSection from "./components/HowItWorksSection";
import LatestCatchesSection from "./components/LatestCatchesSection";
import AnglerAccountSection from "./components/AnglerAccountSection";
import FisheryOwnerSection from "./components/FisheryOwnerSection";
import PlatformStatsSection from "./components/PlatformStatsSection";
import FinalCTASection from "./components/FinalCTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background-50">
      <Header />
      <main>
        <HeroSection />
        <PopularFisheriesSection />
        <FishingTypeSection />
        <HowItWorksSection />
        <LatestCatchesSection />
        <AnglerAccountSection />
        <FisheryOwnerSection />
        <PlatformStatsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}