import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoMember } from "@/mocks/demoData";

function DemoMemberContent() {
  const { upcomingBooking, savedLakes, catchReport, vehicleRegistration, rulesAccepted, waiverSigned } = demoMember;

  return (
    <DemoPageWrapper title="Demo Member Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming booking */}
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Upcoming Booking</h3>
            <div className="bg-primary-50/50 border border-primary-200 rounded-xl p-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-foreground-500">Lake</p>
                  <p className="text-sm font-semibold text-foreground-900">{upcomingBooking.lake}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Swim</p>
                  <p className="text-sm font-semibold text-foreground-900">{upcomingBooking.swim}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Date</p>
                  <p className="text-sm font-semibold text-foreground-900">{upcomingBooking.date}</p>
                </div>
                <div>
                  <p className="text-xs text-foreground-500">Time</p>
                  <p className="text-sm font-semibold text-foreground-900">{upcomingBooking.time}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-primary-200 flex items-center gap-3">
                <div className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  upcomingBooking.gateCodeUnlocked
                    ? "bg-primary-600 text-background-50"
                    : "bg-background-100 text-foreground-500"
                }`}>
                  <i className={`${upcomingBooking.gateCodeUnlocked ? "ri-lock-unlock-line" : "ri-lock-line"} mr-1`}></i>
                  Gate Code: {upcomingBooking.gateCodeUnlocked ? upcomingBooking.gateCode : "Locked"}
                </div>
                {upcomingBooking.gateCodeUnlocked && (
                  <span className="text-xs text-foreground-500">Available 1 hour before your session</span>
                )}
              </div>
            </div>
          </div>

          {/* Status cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-background-50 border border-background-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground-900 mb-3">Rules &amp; Waivers</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-600">Lake rules accepted</span>
                  {rulesAccepted ? (
                    <i className="ri-checkbox-circle-line text-primary-600"></i>
                  ) : (
                    <i className="ri-close-circle-line text-foreground-300"></i>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-foreground-600">Waiver signed</span>
                  {waiverSigned ? (
                    <i className="ri-checkbox-circle-line text-primary-600"></i>
                  ) : (
                    <i className="ri-close-circle-line text-foreground-300"></i>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-background-50 border border-background-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-foreground-900 mb-3">Vehicle Registration</h4>
              <p className="text-xl font-mono font-bold text-foreground-900">{vehicleRegistration}</p>
              <button disabled className="mt-3 text-xs font-semibold text-foreground-400 cursor-not-allowed whitespace-nowrap">
                Edit Registration (Demo Only)
              </button>
            </div>
          </div>

          {/* Catch report */}
          <div className="bg-background-50 border border-background-200 rounded-xl p-6">
            <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Latest Catch Report</h3>
            <div className="flex items-center gap-4 p-4 bg-background-50 border border-background-200 rounded-xl">
              <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">
                <i className="ri-drop-line text-2xl text-primary-600"></i>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground-900">{catchReport.weight} {catchReport.species}</p>
                <p className="text-xs text-foreground-500">{catchReport.lake} · {catchReport.date}</p>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-primary-100 text-primary-700">
                {catchReport.status}
              </span>
            </div>
            <button disabled className="mt-3 text-xs font-semibold text-foreground-400 cursor-not-allowed whitespace-nowrap">
              Submit New Report (Demo Only)
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-foreground-900 mb-3">Saved Lakes</h4>
            <div className="space-y-3">
              {savedLakes.map((lake, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-background-200">
                  <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                    <i className="ri-heart-line text-sm text-primary-600"></i>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground-900">{lake.name}</p>
                    <p className="text-[10px] text-foreground-500">{lake.location} · {lake.saved}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button disabled className="w-full py-3 text-xs font-semibold rounded-xl bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
            Book Another Session
          </button>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoMemberPage() {
  return (
    <DemoAccessGuard>
      <DemoMemberContent />
    </DemoAccessGuard>
  );
}