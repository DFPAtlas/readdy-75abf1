import { Link, useParams } from "react-router-dom";
import DemoModeBadge from "@/components/base/DemoModeBadge";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";

interface DemoPageWrapperProps {
  children: React.ReactNode;
  title: string;
  showPortalBack?: boolean;
}

export default function DemoPageWrapper({ children, title, showPortalBack = true }: DemoPageWrapperProps) {
  const { token } = useParams<{ token: string }>();

  return (
    <div className="min-h-screen bg-background-50">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {showPortalBack && token && (
                <Link
                  to={`/demo/access/${token}`}
                  className="w-9 h-9 rounded-lg border border-background-300 flex items-center justify-center text-foreground-500 hover:text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-left-line"></i>
                </Link>
              )}
              <div>
                <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900">
                  {title}
                </h1>
              </div>
            </div>
            <DemoModeBadge />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}