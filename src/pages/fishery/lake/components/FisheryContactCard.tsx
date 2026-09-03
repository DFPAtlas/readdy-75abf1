interface FisheryContactCardProps {
  fisheryName: string;
  ownerDisplayName: string;
  websiteUrl: string;
  contactEnabled: boolean;
  responseNote: string;
}

export default function FisheryContactCard({
  fisheryName,
  ownerDisplayName,
  websiteUrl,
  contactEnabled,
  responseNote,
}: FisheryContactCardProps) {
  return (
    <section className="py-14 md:py-20 bg-background-100/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mb-8">Fishery Information</h2>

        <div className="bg-background-50 rounded-xl border border-background-200/70 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground-900 mb-1">{fisheryName}</h3>
              <p className="text-sm text-foreground-500 mb-4">Managed by {ownerDisplayName}</p>

              {contactEnabled && (
                <div className="flex items-start gap-2.5 mb-4 bg-background-100/70 rounded-lg p-3 max-w-md">
                  <i className="ri-time-line text-foreground-400 mt-0.5"></i>
                  <p className="text-xs text-foreground-600 leading-relaxed">{responseNote}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 sm:min-w-[140px]">
              {contactEnabled && (
                <button className="px-5 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-mail-line mr-2"></i>
                  Contact Fishery
                </button>
              )}
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-sm font-semibold rounded-xl border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap text-center"
                >
                  <i className="ri-global-line mr-2"></i>
                  Visit Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}