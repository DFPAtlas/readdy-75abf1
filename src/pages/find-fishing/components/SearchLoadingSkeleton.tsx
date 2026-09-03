function SkeletonCard() {
  return (
    <div className="bg-background-50 border border-background-200/70 rounded-xl overflow-hidden animate-pulse">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-[240px] lg:w-[280px] h-[200px] sm:h-auto bg-background-200 flex-shrink-0"></div>
        <div className="flex-1 p-5">
          <div className="h-6 bg-background-200 rounded-lg w-2/3 mb-3"></div>
          <div className="h-4 bg-background-200 rounded-lg w-1/3 mb-4"></div>
          <div className="h-4 bg-background-200 rounded-lg w-full mb-2"></div>
          <div className="h-4 bg-background-200 rounded-lg w-4/5 mb-4"></div>
          <div className="flex gap-2 mb-4">
            <div className="h-6 bg-background-200 rounded-full w-16"></div>
            <div className="h-6 bg-background-200 rounded-full w-16"></div>
            <div className="h-6 bg-background-200 rounded-full w-16"></div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="h-4 bg-background-200 rounded-lg w-28"></div>
            <div className="h-4 bg-background-200 rounded-lg w-36"></div>
          </div>
          <div className="h-3 bg-background-200 rounded-lg w-full mb-3"></div>
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-6 h-6 bg-background-200 rounded-md"></div>
              <div className="w-6 h-6 bg-background-200 rounded-md"></div>
              <div className="w-6 h-6 bg-background-200 rounded-md"></div>
            </div>
            <div className="h-8 bg-background-200 rounded-lg w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchLoadingSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}