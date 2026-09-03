import { useState } from "react";
import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoCalendar } from "@/mocks/demoData";

function DemoCalendarContent() {
  const [view, setView] = useState<"month" | "week" | "day">("month");
  const { currentMonth, swims, bookings } = demoCalendar;

  const today = new Date();
  const daysInMonth = 31;
  const startDay = 6;

  return (
    <DemoPageWrapper title="Demo Booking Calendar">
      <div className="space-y-6">
        {/* Calendar header */}
        <div className="bg-background-50 border border-background-200 rounded-xl p-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <button className="w-9 h-9 rounded-lg border border-background-200 flex items-center justify-center text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer">
                <i className="ri-arrow-left-s-line"></i>
              </button>
              <h3 className="font-heading text-xl font-semibold text-foreground-900">{currentMonth}</h3>
              <button className="w-9 h-9 rounded-lg border border-background-200 flex items-center justify-center text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer">
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
            <div className="flex items-center bg-background-100 rounded-full p-1">
              {(["month", "week", "day"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-colors cursor-pointer whitespace-nowrap ${
                    view === v ? "bg-background-50 text-foreground-900 border border-background-200" : "text-foreground-500 hover:text-foreground-700"
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-[11px] font-semibold text-foreground-500 py-2">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 7;
              const dateStr = `2026-07-${String(day).padStart(2, "0")}`;
              const dayBookings = bookings.filter((b) => b.date === dateStr);
              const isWeekend = (startDay + day) % 7 === 0 || (startDay + day) % 7 === 6;

              return (
                <div
                  key={day}
                  className={`aspect-square rounded-lg p-1.5 border transition-colors ${
                    isToday ? "border-primary-300 bg-primary-50/50" : isWeekend ? "border-background-100 bg-background-50" : "border-transparent bg-background-50 hover:border-background-200"
                  }`}
                >
                  <p className={`text-xs font-semibold mb-1 ${isToday ? "text-primary-700" : "text-foreground-900"}`}>{day}</p>
                  <div className="space-y-0.5">
                    {dayBookings.map((b) => (
                      <div key={b.id} className={`px-1 py-0.5 text-[9px] font-medium rounded ${b.statusColor} truncate`}>
                        {b.swim}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-primary-100"></span>
            <span className="text-foreground-600">Checked in</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-accent-100"></span>
            <span className="text-foreground-600">Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-secondary-100"></span>
            <span className="text-foreground-600">Pending</span>
          </div>
        </div>

        {/* Today's Bookings List */}
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-4">Today's Bookings by Swim</h3>
          <div className="space-y-3">
            {swims.slice(0, 6).map((swim, i) => {
              const swimBookings = bookings.filter((b) => b.swim === swim);
              return (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-background-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${swimBookings.length > 0 ? "bg-primary-500" : "bg-background-300"}`}></div>
                    <span className="text-sm text-foreground-900 font-medium">{swim}</span>
                  </div>
                  <div>
                    {swimBookings.length > 0 ? (
                      swimBookings.map((b) => (
                        <span key={b.id} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${b.statusColor} ml-1`}>
                          {b.angler}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-foreground-400">Free</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoCalendarPage() {
  return (
    <DemoAccessGuard>
      <DemoCalendarContent />
    </DemoAccessGuard>
  );
}