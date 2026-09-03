import { Link } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";

export default function DemoThankYouPage() {
  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-16 md:py-28">
          <div className="max-w-lg mx-auto px-4 md:px-6 text-center">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-8">
              <i className="ri-mail-send-line text-3xl text-primary-600"></i>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-4">
              Your demo link is on its way
            </h1>

            <p className="text-base text-foreground-600 mb-3 leading-relaxed">
              We have sent a secure demo link to your email. You can use it to explore the FisheryHub demo pages.
            </p>

            <p className="text-sm text-foreground-500 mb-10 leading-relaxed">
              If the email does not arrive, check your spam folder or contact us at{" "}
              <a href="mailto:hello@fisheryhub.uk" className="text-primary-600 hover:text-primary-700 underline">hello@fisheryhub.uk</a>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-7 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Back to Homepage
              </Link>
              <Link
                to="/demo/request"
                className="px-7 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Request Another Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}