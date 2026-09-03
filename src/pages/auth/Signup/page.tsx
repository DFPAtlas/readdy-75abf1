import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import MagicLinkForm from "@/components/base/MagicLinkForm";
import AuthConfirmationCard from "@/components/base/AuthConfirmationCard";
import ConsentCheckbox from "@/components/base/ConsentCheckbox";
import { signInWithMagicLink } from "@/lib/auth";
import { anglerBenefits } from "@/mocks/memberData";

export default function SignupPage() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "";

  const [email, setEmail] = useState("");
  const [termsConsent, setTermsConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [consentError, setConsentError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const validate = (): boolean => {
    if (!email.trim()) {
      setFormError("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError("Please enter a valid email address");
      return false;
    }
    if (!termsConsent) {
      setConsentError("You must accept the Terms and Privacy Policy");
      return false;
    }
    setConsentError("");
    setFormError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setFormError("");

    try {
      const result = await signInWithMagicLink(email);
      if (result.success) {
        setSubmittedEmail(email);
        setSubmitted(true);
      } else {
        setFormError(result.error || "We could not send your login link. Please try again.");
      }
    } catch {
      setFormError("We could not send your login link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
              {/* Left: Form */}
              <div className="lg:w-[45%] w-full">
                <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8">
                  {!submitted ? (
                    <>
                      <div className="text-center mb-8">
                        <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                          / angler signup
                        </span>
                        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mt-3 mb-3">
                          Create your free angler account
                        </h1>
                        <p className="text-sm text-foreground-600 leading-relaxed max-w-sm mx-auto">
                          Save lakes, join waiting lists, get booking updates, and book your next fishing session.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        <div>
                          <label htmlFor="signup-email" className="block text-sm font-medium text-foreground-700 mb-1.5">
                            Email address <span className="text-accent-600">*</span>
                          </label>
                          <input
                            id="signup-email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); setFormError(""); }}
                            placeholder="you@example.com"
                            autoComplete="email"
                            className="w-full px-4 py-3.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                          />
                        </div>

                        <ConsentCheckbox
                          id="terms-consent"
                          checked={termsConsent}
                          onChange={(v) => { setTermsConsent(v); setConsentError(""); }}
                          label="I agree to the Terms of Service and Privacy Policy"
                          required
                          error={consentError}
                          showLinks
                        />

                        <ConsentCheckbox
                          id="marketing-consent"
                          checked={marketingConsent}
                          onChange={setMarketingConsent}
                          label="Send me fishing updates, new lake alerts, and special offers (optional)"
                          showLinks={false}
                        />

                        {formError && (
                          <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
                            <p className="text-sm text-accent-700">{formError}</p>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full py-3.5 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <span className="flex items-center justify-center gap-2">
                              <i className="ri-loader-4-line animate-spin"></i>
                              Sending...
                            </span>
                          ) : (
                            "Send Magic Link"
                          )}
                        </button>

                        <p className="text-sm text-foreground-500 text-center">
                          Already have an account?{" "}
                          <a href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`} className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
                            Login
                          </a>
                        </p>

                        <p className="text-xs text-foreground-400 text-center">
                          No password needed. We will send a secure login link to your email.
                        </p>
                      </form>
                    </>
                  ) : (
                    <AuthConfirmationCard
                      title="Check your email"
                      message="We have sent you a secure login link. Open it to continue setting up your account."
                      email={submittedEmail}
                      tip="If the email does not arrive, check your spam folder or try again."
                      onResend={() => { setSubmitted(false); }}
                      onBack={() => setSubmitted(false)}
                    />
                  )}
                </div>
              </div>

              {/* Right: Benefits */}
              <div className="lg:w-[55%] w-full">
                <div className="lg:pt-10">
                  <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-2">
                    Your free angler account includes
                  </h2>
                  <p className="text-sm text-foreground-600 mb-8">
                    Everything you need to plan, book, and record your fishing.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {anglerBenefits.map((benefit) => (
                      <div
                        key={benefit.title}
                        className="flex items-start gap-3 p-4 rounded-xl bg-background-100 border border-background-200"
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
                          <i className={`${benefit.icon} text-base text-primary-600`}></i>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground-900 mb-1">{benefit.title}</h4>
                          <p className="text-xs text-foreground-600 leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}