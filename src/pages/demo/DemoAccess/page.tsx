import { Link, useParams } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import DemoAccessGuard from "@/components/feature/DemoAccessGuard";
import DemoModeBadge from "@/components/base/DemoModeBadge";
import { demoPortalCards } from "@/mocks/demoData";

function DemoPortalContent() {
  const { token } = useParams<{ token: string }>();

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-2">
                  FisheryHub Demo Portal
                </h1>
                <p className="text-base text-foreground-600">
                  Explore the fishery owner tools using sample data.
                </p>
              </div>
              <DemoModeBadge />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {demoPortalCards.map((card) => (
                <Link
                  key={card.id}
                  to={`/demo/access/${token}/${card.route}`}
                  className="bg-background-50 border border-background-200 rounded-xl p-5 hover:border-primary-300 hover:bg-primary-50/30 transition-all group cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                    <i className={`${card.icon} text-xl text-primary-600`}></i>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground-900 mb-2">{card.title}</h3>
                  <p className="text-xs text-foreground-600 leading-relaxed mb-4">{card.description}</p>
                  <span className="text-xs font-semibold text-primary-600 group-hover:text-primary-700 inline-flex items-center gap-1">
                    View Demo <i className="ri-arrow-right-line text-[10px]"></i>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function DemoAccessPage() {
  return (
    <DemoAccessGuard>
      <DemoPortalContent />
    </DemoAccessGuard>
  );
}