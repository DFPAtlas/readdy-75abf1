interface PricePlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  notes: string;
  hasNight: boolean;
  badge: string | null;
}

interface PricesAndPassesSectionProps {
  plans: PricePlan[];
}

export default function PricesAndPassesSection({ plans }: PricesAndPassesSectionProps) {
  return (
    <section id="prices" className="scroll-mt-28 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-3">Prices &amp; Passes</h2>
        <p className="text-sm text-foreground-600 max-w-2xl mb-8">Choose the ticket that suits your session. All prices are per angler unless stated otherwise.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-background-50 rounded-xl border p-5 transition-all hover:border-background-300/80 relative ${
                plan.badge === "Popular" ? "border-primary-300 ring-1 ring-primary-200" : "border-background-200/70"
              }`}
            >
              {plan.badge && (
                <span className={`absolute -top-2.5 left-5 px-3 py-0.5 text-[10px] font-semibold rounded-full ${
                  plan.badge === "Popular" ? "bg-primary-100 text-primary-700" :
                  plan.badge === "Best value" ? "bg-accent-100 text-accent-700" :
                  "bg-foreground-100 text-foreground-600"
                }`}>
                  {plan.badge}
                </span>
              )}

              <div className="flex items-start justify-between mb-2 mt-1">
                <h3 className="text-base font-semibold text-foreground-900">{plan.name}</h3>
                {plan.hasNight && (
                  <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-secondary-100 text-secondary-700 flex-shrink-0">
                    Night fishing
                  </span>
                )}
              </div>

              <div className="mb-3">
                <span className="text-2xl font-semibold text-foreground-900 font-heading">£{plan.price}</span>
                <span className="text-xs text-foreground-500 ml-1">/ session</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-foreground-500 mb-3">
                <i className="ri-time-line"></i>
                <span>{plan.duration}</span>
              </div>

              <p className="text-xs text-foreground-600 leading-relaxed mb-4">{plan.notes}</p>

              <button className="w-full px-4 py-2.5 text-xs font-semibold rounded-lg border border-foreground-200 text-foreground-700 hover:bg-foreground-50 hover:border-foreground-300 transition-colors cursor-pointer whitespace-nowrap">
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}