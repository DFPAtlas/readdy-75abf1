import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoOwnerDashboard } from "@/mocks/demoData";

function DemoOwnerDashboardContent() {
  const { todayStats, recentBookings, alerts, setupProgress } = demoOwnerDashboard;

  return (
    <DemoPageWrapper title="Demo Owner Dashboard">
      <div className="space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {[
            { label: "Bookings today", value: todayStats.totalBookings, icon: "ri-calendar-check-line", color: "text-primary-600" },
            { label: "Revenue today", value: `£${todayStats.revenue}`, icon: "ri-bank-card-line", color: "text-accent-600" },
            { label: "Free swims", value: todayStats.freeSwims, icon: "ri-checkbox-circle-line", color: "text-primary-600" },
            { label: "Checked in", value: todayStats.checkedInAnglers, icon: "ri-user-location-line", color: "text-accent-600" },
            { label: "Pending waivers", value: todayStats.pendingWaivers, icon: "ri-file-warning-line", color: "text-accent-600" },
            { label: "New catches", value: todayStats.latestCatches, icon: "ri-camera-line", color: "text-primary-600" },
            { label: "Alerts", value: todayStats.alerts, icon: "ri-notification-3-line", color: "text-accent-600" },
          ].map((stat, i) => (
            <div key={i} className="bg-background-50 border border-background-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <i className={`${stat.icon} ${stat.color} text-sm`}></i>
                <span className="text-[11px] text-foreground-500">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent bookings */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Recent Bookings</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-background-200">
                      <th className="text-left py-2 text-xs font-medium text-foreground-500">Angler</th>
                      <th className="text-left py-2 text-xs font-medium text-foreground-500">Swim</th>
                      <th className="text-left py-2 text-xs font-medium text-foreground-500">Time</th>
                      <th className="text-left py-2 text-xs font-medium text-foreground-500">Status</th>
                      <th className="text-right py-2 text-xs font-medium text-foreground-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="border-b border-background-100">
                        <td className="py-3 text-foreground-900 font-medium">{b.angler}</td>
                        <td className="py-3 text-foreground-600">{b.swim}</td>
                        <td className="py-3 text-foreground-600 text-xs">{b.time}</td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                            b.status === "checked-in" ? "bg-primary-100 text-primary-700" :
                            b.status === "confirmed" ? "bg-accent-100 text-accent-800" :
                            "bg-secondary-100 text-secondary-700"
                          }`}>{b.statusLabel}</span>
                        </td>
                        <td className="py-3 text-right text-foreground-900 font-semibold">&pound;{b.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Setup progress */}
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Setup Progress</h3>
              <div className="space-y-3">
                {setupProgress.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      item.complete ? "bg-primary-100 text-primary-600" : "bg-background-100 text-foreground-300"
                    }`}>
                      <i className={`text-xs ${item.complete ? "ri-check-line" : "ri-time-line"}`}></i>
                    </div>
                    <span className={`text-sm ${item.complete ? "text-foreground-900 font-medium" : "text-foreground-500"}`}>{item.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-background-200">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-background-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-primary-500 rounded-full"></div>
                  </div>
                  <span className="text-xs text-foreground-500">50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts sidebar */}
          <div className="space-y-6">
            <div className="bg-background-50 border border-background-200 rounded-xl p-6">
              <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Alerts</h3>
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className={`flex items-start gap-3 p-3 rounded-lg ${
                    alert.priority === "high" ? "bg-accent-50 border border-accent-200" : "bg-secondary-50 border border-secondary-200"
                  }`}>
                    <i className={`${
                      alert.priority === "high" ? "ri-error-warning-line text-accent-600" : "ri-information-line text-secondary-600"
                    } text-sm mt-0.5`}></i>
                    <p className="text-xs text-foreground-800 leading-relaxed">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-foreground-900 rounded-xl p-6">
              <h4 className="text-sm font-semibold text-background-50 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                {["View bookings", "Manage swims", "Approve catches", "Send gate code"].map((action) => (
                  <button
                    key={action}
                    disabled
                    className="w-full py-2.5 text-xs font-semibold rounded-lg bg-background-50/10 text-background-50/40 cursor-not-allowed whitespace-nowrap"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoOwnerDashboardPage() {
  return (
    <DemoAccessGuard>
      <DemoOwnerDashboardContent />
    </DemoAccessGuard>
  );
}