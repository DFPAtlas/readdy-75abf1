import LakeResultCard from "./LakeResultCard";

interface LakeResult {
  id: string;
  slug: string;
  lakeSlug: string;
  name: string;
  distance: number;
  town: string;
  county: string;
  description: string;
  species: string[];
  priceFrom: number;
  priceDayTicket: number | null;
  priceNightTicket: number | null;
  availability: string;
  availabilityLabel: string;
  weather: string;
  weatherIcon: string;
  latestCatch: { species: string; weight: string; date: string } | null;
  bookingEnabled: boolean;
  visibilityMode: string;
  swimCount: number;
  rulesPreview: string;
  facilities: string[];
  features: string[];
  image: string;
}

interface LakeResultListProps {
  lakes: LakeResult[];
  searchLocation?: string;
  viewMode: "list" | "map";
}

export default function LakeResultList({ lakes, searchLocation, viewMode }: LakeResultListProps) {
  return (
    <div className="flex flex-col gap-4">
      {lakes.map((lake) => (
        <LakeResultCard key={lake.id} lake={lake} searchLocation={searchLocation} />
      ))}
    </div>
  );
}