import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoBailiff } from "@/mocks/demoData";

function DemoBailiffContent() {
  const { todayBookings, incidents, maintenanceTasks, gateCode } = demoBailiff;

  return (
    <DemoPageWrapper title="Demo Bailiff Dashboard">
      <div className="space-y-8">
        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-background-50 border border-background-200 rounded-xl p-4">
            <p className="text-xs text-foreground-500 mb-1">Today's bookings</p>
            <p className="text-2xl font-bold text-foreground-900">{todayBookings.length}</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-4">
            <p className="text-xs text-foreground-500 mb-1">Incidents</p>
            <p className="text-2xl font-bold text-foreground-900">{incidents}</p>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-4">
            <p className="text-xs text-foreground-500 mb-1">Maintenance</p>
            <p className="text-2xl font-bold text-foreground-900">{maintenanceTasks}</p>
          </div>
          <div className="bg-background-50 border border-primary-200 rounded-xl p-4 bg-primary-50/30">
            <p className="text-xs text-foreground-500 mb-1">Gate Code</p>
            <p className="text-2xl font-bold text-primary-700 font-mono tracking-widest">{gateCode}</p>
          </div>
        </div>

        {/* Bookings table */}
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Today's Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-background-200">
                  <th className="text-left py-2 text-xs font-medium text-foreground-500">Angler</th>
                  <th className="text-left py-2 text-xs font-medium text-foreground-500">Swim</th>
                  <th className="text-left py-2 text-xs font-medium text-foreground-500">Time</th>
                  <th className="text-left py-2 text-xs font-medium text-foreground-500">Vehicle</th>
                  <th className="text-center py-2 text-xs font-medium text-foreground-500">Selfie</th>
                  <th className="text-center py-2 text-xs font-medium text-foreground-500">QR In</th>
                  <th className="text-center py-2 text-xs font-medium text-foreground-500">Gate Code</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map((b) => (
                  <tr key={b.id} className="border-b border-background-100">
                    <td className="py-3 text-foreground-900 font-medium">{b.angler}</td>
                    <td className="py-3 text-foreground-600 text-xs">{b.swim}</td>
                    <td className="py-3 text-foreground-600 text-xs">{b.time}</td>
                    <td className="py-3 text-foreground-600 text-xs font-mono">{b.vehicleReg}</td>
                    <td className="py-3 text-center">
                      {b.selfieVerified ? (
                        <i className="ri-checkbox-circle-line text-primary-600"></i>
                      ) : (
                        <i className="ri-close-circle-line text-foreground-300"></i>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {b.qrCheckedIn ? (
                        <i className="ri-checkbox-circle-line text-primary-600"></i>
                      ) : (
                        <i className="ri-close-circle-line text-foreground-300"></i>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {b.gateCodeReleased ? (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-primary-100 text-primary-700">Released</span>
                      ) : (
                        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-secondary-100 text-secondary-700">Pending</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button disabled className="py-3 text-xs font-semibold rounded-xl bg-accent-50 border border-accent-200 text-accent-400 cursor-not-allowed whitespace-nowrap">
            <i className="ri-error-warning-line block text-lg mb-1"></i>
            Report Incident
          </button>
          <button disabled className="py-3 text-xs font-semibold rounded-xl bg-secondary-50 border border-secondary-200 text-secondary-400 cursor-not-allowed whitespace-nowrap">
            <i className="ri-tools-line block text-lg mb-1"></i>
            Log Maintenance
          </button>
          <button disabled className="py-3 text-xs font-semibold rounded-xl bg-primary-50 border border-primary-200 text-primary-400 cursor-not-allowed whitespace-nowrap">
            <i className="ri-qr-code-line block text-lg mb-1"></i>
            Scan QR Code
          </button>
          <button disabled className="py-3 text-xs font-semibold rounded-xl bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
            <i className="ri-lock-line block text-lg mb-1"></i>
            Release Gate Code
          </button>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoBailiffPage() {
  return (
    <DemoAccessGuard>
      <DemoBailiffContent />
    </DemoAccessGuard>
  );
}