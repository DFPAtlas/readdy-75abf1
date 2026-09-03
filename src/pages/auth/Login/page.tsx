import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import MagicLinkForm from "@/components/base/MagicLinkForm";
import AuthConfirmationCard from "@/components/base/AuthConfirmationCard";
import { signInWithMagicLink } from "@/lib/auth";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "";

  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleMagicLink = async (email: string) => {
    const result = await signInWithMagicLink(email);
    if (result.success) {
      setSubmittedEmail(email);
      setSubmitted(true);
    } else {
      throw new Error(result.error || "Failed to send login link");
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-12 md:py-20">
          <div className="max-w-lg mx-auto px-4 md:px-6">
            <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8">
              {!submitted ? (
                <>
                  <div className="text-center mb-8">
                    <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                      / login
                    </span>
                    <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mt-3 mb-3">
                      Login to FisheryHub
                    </h1>
                    <p className="text-sm text-foreground-600 leading-relaxed max-w-sm mx-auto">
                      Access your saved lakes, bookings, waiting lists, and member dashboard.
                    </p>
                  </div>

                  <MagicLinkForm
                    onSubmit={handleMagicLink}
                    submitLabel="Send Magic Link"
                    trustText="No password needed. We will send a secure login link to your email."
                    footerLink={{
                      text: "Don't have an account?",
                      label: "Create Free Account",
                      to: `/signup${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`,
                    }}
                  />

                  <div className="mt-8 pt-6 border-t border-background-200">
                    <p className="text-xs text-foreground-400 text-center">
                      Are you a fishery owner? Owner login is coming soon.{" "}
                      <Link to="/demo" className="text-primary-600 hover:text-primary-700 underline transition-colors">
                        Request a demo
                      </Link>
                      {" "}to get early access.
                    </p>
                  </div>
                </>
              ) : (
                <AuthConfirmationCard
                  title="Check your email"
                  message="We have sent you a secure login link. Open it to access your account."
                  email={submittedEmail}
                  onResend={() => setSubmitted(false)}
                  onBack={() => setSubmitted(false)}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}