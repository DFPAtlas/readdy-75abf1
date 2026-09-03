import { howItWorksSteps } from "@/mocks/homeData";

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-background-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 mb-14">
          <div className="lg:w-[30%]">
            <span className="text-xs font-medium text-foreground-400 tracking-widest uppercase">
              / How it works
            </span>
          </div>
          <div className="lg:w-[70%]">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground-900 leading-tight">
              Book your next session in minutes
            </h2>
            <p className="mt-3 text-base text-foreground-600 leading-relaxed max-w-2xl">
              Search your area, compare lakes and rules, choose a swim or pass, then book and get updates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((step) => (
            <div
              key={step.step}
              className="bg-background-50 rounded-2xl p-6 md:p-7 border border-background-200/70 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-background-50 text-sm font-semibold flex-shrink-0">
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <i className={`${step.icon} text-lg text-primary-600`}></i>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}