import DemoPageWrapper from "@/pages/demo/components/DemoPageWrapper";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import { demoBookingFlow } from "@/mocks/demoData";

function DemoBookingFlowContent() {
  const { steps, selectedSwim, selectedDate, selectedPlan } = demoBookingFlow;

  return (
    <DemoPageWrapper title="Demo Swim Booking Flow">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Steps indicator */}
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <h3 className="text-sm font-semibold text-foreground-900 mb-5">Booking steps</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {steps.map((step, i) => (
              <div key={step.step} className="text-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${
                  i === 2
                    ? "bg-primary-600 text-background-50"
                    : i < 2
                      ? "bg-primary-100 text-primary-600"
                      : "bg-background-100 text-foreground-400"
                }`}>
                  {i < 2 ? <i className="ri-check-line text-sm"></i> : <span className="text-sm font-bold">{step.step}</span>}
                </div>
                <p className={`text-[11px] font-semibold ${i === 2 ? "text-primary-600" : i < 2 ? "text-foreground-600" : "text-foreground-400"}`}>{step.title}</p>
                <p className="text-[10px] text-foreground-500 mt-0.5">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Current step: Rules acceptance */}
        <div className="bg-background-50 border border-background-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-primary-600 text-background-50 flex items-center justify-center font-bold text-sm">3</div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground-900">Accept Lake Rules</h3>
              <p className="text-xs text-foreground-500">Please read and accept the rules before continuing</p>
            </div>
          </div>

          <div className="bg-background-100 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-shield-check-line text-accent-600"></i>
              <span className="text-sm font-semibold text-foreground-900">Lake Rules — Willow Mere Fishery</span>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {["Barbless hooks only — no exceptions", "Landing mats and unhooking cradles required at all times", "No keepnets (match bookings excepted by prior arrangement)", "No nuts, pulses, or tiger nuts", "Maximum 2 rods per angler", "No sacking of fish", "No litter — take everything home", "Night fishing must be booked at least 48 hours in advance", "Gate code must not be shared with non-anglers"].map((rule, i) => (
                <div key={i} className="flex items-start gap-2">
                  <i className="ri-check-line text-xs text-primary-600 mt-0.5 flex-shrink-0"></i>
                  <span className="text-xs text-foreground-700">{rule}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 mb-5">
            <input type="checkbox" checked readOnly className="mt-1 w-4 h-4 rounded border-background-300 text-primary-600 opacity-60 cursor-not-allowed" />
            <span className="text-xs text-foreground-500">I have read and accept the lake rules (demo preview)</span>
          </div>
        </div>

        {/* Booking summary sidebar */}
        <div className="bg-foreground-900 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-background-50 mb-4">Booking Summary</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-background-50/60">Swim</span>
              <span className="text-xs font-semibold text-background-50">{selectedSwim}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-background-50/60">Date</span>
              <span className="text-xs font-semibold text-background-50">{selectedDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-background-50/60">Session</span>
              <span className="text-xs font-semibold text-background-50">{selectedPlan}</span>
            </div>
            <div className="pt-3 border-t border-background-50/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-background-50">Total</span>
              <span className="text-sm font-bold text-background-50">&pound;15</span>
            </div>
          </div>
          <button
            disabled
            className="w-full mt-5 py-3 text-sm font-semibold rounded-xl bg-background-50/10 text-background-50/40 cursor-not-allowed whitespace-nowrap"
          >
            Continue to Payment (Demo Only)
          </button>
        </div>

        {/* Other steps preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-camera-line text-accent-600"></i>
              <span className="text-sm font-semibold text-foreground-900">Selfie Verification</span>
              <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-secondary-100 text-secondary-700">If enabled</span>
            </div>
            <div className="bg-background-100 rounded-lg h-24 flex items-center justify-center">
              <div className="text-center">
                <i className="ri-camera-line text-2xl text-foreground-300 block mb-1"></i>
                <p className="text-xs text-foreground-400">Photo placeholder</p>
              </div>
            </div>
          </div>
          <div className="bg-background-50 border border-background-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <i className="ri-bank-card-line text-accent-600"></i>
              <span className="text-sm font-semibold text-foreground-900">Payment</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="ri-visa-line text-foreground-400"></i>
                <span className="text-xs text-foreground-500">Card payment (demo)</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-smartphone-line text-foreground-400"></i>
                <span className="text-xs text-foreground-500">Apple Pay / Google Pay (demo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DemoPageWrapper>
  );
}

export default function DemoBookingFlowPage() {
  return (
    <DemoAccessGuard>
      <DemoBookingFlowContent />
    </DemoAccessGuard>
  );
}