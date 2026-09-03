interface LakeRulesSectionProps {
  rules: string[];
  acceptanceNote: string;
}

export default function LakeRulesSection({ rules, acceptanceNote }: LakeRulesSectionProps) {
  return (
    <section id="rules" className="scroll-mt-28 py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-2">Lake Rules</h2>
            <p className="text-sm text-foreground-600 max-w-xl">Please read and follow these rules. They're in place to protect the fish, the environment, and everyone's enjoyment.</p>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold rounded-lg border border-foreground-200 text-foreground-700 hover:bg-foreground-50 transition-colors cursor-pointer whitespace-nowrap flex-shrink-0">
            <i className="ri-file-text-line"></i>
            View Full Rules
          </button>
        </div>

        <div className="bg-background-50 rounded-xl border border-background-200/70 p-5 md:p-6">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {rules.map((rule, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground-700">
                <span className="w-5 h-5 rounded-full bg-background-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i className="ri-check-line text-[10px] text-primary-600"></i>
                </span>
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 bg-accent-50/50 rounded-xl border border-accent-200/50 p-4 flex items-start gap-3">
          <i className="ri-information-line text-accent-600 mt-0.5"></i>
          <p className="text-xs text-accent-800 leading-relaxed">{acceptanceNote}</p>
        </div>
      </div>
    </section>
  );
}