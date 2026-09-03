import { Link } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";

const savedLakesData = [
  {
    id: "saved-1",
    lakeId: "willow-mere",
    lakeName: "Willow Mere Fishery",
    location: "Maidstone, Kent",
    species: ["Carp", "Tench", "Bream"],
    priceFrom: 15,
    availability: "Available today",
  },
  {
    id: "saved-2",
    lakeId: "oakfield-carp",
    lakeName: "Oakfield Carp Lake",
    location: "Tonbridge, Kent",
    species: ["Carp", "Catfish"],
    priceFrom: 20,
    availability: "Limited availability",
  },
];

export default function MemberDashboardPage() {
  const savedLakes = savedLakesData;
  const upcomingBookings: Array<{ id: string; lakeName: string; swimName: string; date: string; status: string }> = [];
  const waitingList: Array<{ id: string; lakeName: string; position: number }> = [];
  const catchReports: Array<{ id: string; species: string; lakeName: string }> = [];

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                  / member dashboard
                </span>
                <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mt-2">
                  My Dashboard
                </h1>
                <p className="text-sm text-foreground-600 mt-1">
                  Your fishing hub — saved lakes, bookings, catches, and more.
                </p>
              </div>
              <Link
                to="/find-fishing"
                className="px-5 py-2.5 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Find a Lake
              </Link>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Saved Lakes */}
              <div className="bg-background-50 border border-background-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <i className="ri-heart-line text-lg text-accent-600"></i>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground-900">{savedLakes.length}</p>
                    <p className="text-xs text-foreground-500">Saved Lakes</p>
                  </div>
                </div>
                {savedLakes.length > 0 ? (
                  <div className="space-y-2">
                    {savedLakes.slice(0, 2).map((lake) => (
                      <Link
                        key={lake.id}
                        to={`/fishery/${lake.lakeId}/lake/main-lake`}
                        className="block text-xs text-foreground-600 hover:text-primary-600 transition-colors truncate"
                      >
                        {lake.lakeName}
                      </Link>
                    ))}
                    {savedLakes.length > 2 && (
                      <p className="text-xs text-foreground-400">+{savedLakes.length - 2} more</p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-foreground-400 italic">No saved lakes yet</p>
                )}
              </div>

              {/* Upcoming Bookings */}
              <div className="bg-background-50 border border-background-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                    <i className="ri-calendar-check-line text-lg text-primary-600"></i>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground-900">{upcomingBookings.length}</p>
                    <p className="text-xs text-foreground-500">Upcoming Bookings</p>
                  </div>
                </div>
                {upcomingBookings.length === 0 && (
                  <p className="text-xs text-foreground-400 italic">No bookings yet</p>
                )}
              </div>

              {/* Waiting List */}
              <div className="bg-background-50 border border-background-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary-50 flex items-center justify-center">
                    <i className="ri-user-star-line text-lg text-secondary-600"></i>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground-900">{waitingList.length}</p>
                    <p className="text-xs text-foreground-500">Waiting List</p>
                  </div>
                </div>
                {waitingList.length === 0 && (
                  <p className="text-xs text-foreground-400 italic">No waiting list entries yet</p>
                )}
              </div>

              {/* Catch Reports */}
              <div className="bg-background-50 border border-background-200 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                    <i className="ri-camera-line text-lg text-accent-600"></i>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground-900">{catchReports.length}</p>
                    <p className="text-xs text-foreground-500">Catch Reports</p>
                  </div>
                </div>
                {catchReports.length === 0 && (
                  <p className="text-xs text-foreground-400 italic">No catch reports yet</p>
                )}
              </div>
            </div>

            {/* Saved Lakes Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading text-xl font-semibold text-foreground-900">Saved Lakes</h2>
                <Link
                  to="/find-fishing"
                  className="text-sm text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                  Browse more lakes
                </Link>
              </div>
              {savedLakes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link
                    to="/fishery/willow-mere/lake/main-lake"
                    className="bg-background-50 border border-background-200 rounded-2xl overflow-hidden hover:border-background-300 transition-colors group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Serene%20UK%20fishing%20lake%20surrounded%20by%20willow%20trees%20on%20a%20sunny%20morning%2C%20calm%20water%20reflecting%20green%20landscape%2C%20peaceful%20countryside%20setting%20with%20soft%20natural%20light%2C%20minimalist%20nature%20photography%20style%20with%20muted%20earthy%20tones&width=600&height=400&seq=dash-lake-willow-mere&orientation=landscape"
                        alt="Willow Mere Fishery"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-sm font-semibold text-background-50">Willow Mere Fishery</h3>
                        <p className="text-xs text-background-50/70">Maidstone, Kent</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary-50 text-primary-700">Carp</span>
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary-50 text-primary-700">Tench</span>
                        </div>
                        <span className="text-xs text-foreground-500">From &pound;15</span>
                      </div>
                      <p className="text-[11px] text-primary-600 font-medium">Available today</p>
                    </div>
                  </Link>
                  <Link
                    to="/fishery/oakfield-carp/lake/main-lake"
                    className="bg-background-50 border border-background-200 rounded-2xl overflow-hidden hover:border-background-300 transition-colors group"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src="https://readdy.ai/api/search-image?query=Large%20carp%20fishing%20lake%20with%20oak%20trees%20along%20the%20bank%2C%20misty%20morning%20atmosphere%20over%20dark%20water%2C%20English%20countryside%20landscape%2C%20dramatic%20sky%20with%20soft%20light%2C%20moody%20atmospheric%20photography&width=600&height=400&seq=dash-lake-oakfield&orientation=landscape"
                        alt="Oakfield Carp Lake"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-sm font-semibold text-background-50">Oakfield Carp Lake</h3>
                        <p className="text-xs text-background-50/70">Tonbridge, Kent</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary-50 text-primary-700">Carp</span>
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-primary-50 text-primary-700">Catfish</span>
                        </div>
                        <span className="text-xs text-foreground-500">From &pound;20</span>
                      </div>
                      <p className="text-[11px] text-primary-600 font-medium">Limited availability</p>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-16 bg-background-50 border border-background-200 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-foreground-100 flex items-center justify-center mx-auto mb-4">
                    <i className="ri-heart-line text-xl text-foreground-400"></i>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-2">No saved lakes yet</h3>
                  <p className="text-sm text-foreground-500 mb-6 max-w-sm mx-auto">
                    Browse fisheries and save your favourites to quickly find them later.
                  </p>
                  <Link
                    to="/find-fishing"
                    className="inline-block px-5 py-2.5 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Find a Lake
                  </Link>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link
                to="/member/onboarding"
                className="flex items-center gap-2 p-3 rounded-xl bg-background-100 border border-background-200 hover:border-background-300 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-user-settings-line text-sm text-primary-600"></i>
                </div>
                <span className="text-xs font-medium text-foreground-700">Edit Profile</span>
              </Link>
              <Link
                to="/account/profile"
                className="flex items-center gap-2 p-3 rounded-xl bg-background-100 border border-background-200 hover:border-background-300 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-secondary-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-settings-3-line text-sm text-secondary-600"></i>
                </div>
                <span className="text-xs font-medium text-foreground-700">Account Settings</span>
              </Link>
              <Link
                to="/find-fishing"
                className="flex items-center gap-2 p-3 rounded-xl bg-background-100 border border-background-200 hover:border-background-300 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-search-line text-sm text-accent-600"></i>
                </div>
                <span className="text-xs font-medium text-foreground-700">Find a Lake</span>
              </Link>
              <a
                href="/demo"
                className="flex items-center gap-2 p-3 rounded-xl bg-background-100 border border-background-200 hover:border-background-300 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <i className="ri-information-line text-sm text-primary-600"></i>
                </div>
                <span className="text-xs font-medium text-foreground-700">How it Works</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}