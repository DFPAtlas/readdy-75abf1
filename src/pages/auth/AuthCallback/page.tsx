import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import AuthErrorState from "@/components/base/AuthErrorState";
import { handleAuthCallback, getMemberProfile, hasCompletedOnboarding } from "@/lib/auth";

type CallbackState = "loading" | "processing" | "error" | "success";

export default function AuthCallbackPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<CallbackState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const processAuth = async () => {
      setState("processing");
      try {
        const result = await handleAuthCallback();

        if (cancelled) return;

        if (!result.user) {
          setErrorMessage(result.error || "This login link has expired. Request a new one.");
          setState("error");
          return;
        }

        const profile = await getMemberProfile(result.user.id);

        if (cancelled) return;

        if (hasCompletedOnboarding(profile)) {
          navigate("/member/dashboard", { replace: true });
        } else {
          navigate("/member/onboarding", { replace: true });
        }
      } catch {
        if (!cancelled) {
          setErrorMessage("We could not process your login. Please try requesting a new login link.");
          setState("error");
        }
      }
    };

    processAuth();

    return () => { cancelled = true; };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="min-h-[60vh] flex items-center justify-center py-12 md:py-20">
          <div className="max-w-md w-full mx-auto px-4">
            {state === "loading" || state === "processing" ? (
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
                  <i className="ri-loader-4-line text-2xl text-primary-600 animate-spin"></i>
                </div>
                <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-3">
                  {state === "loading" ? "Verifying your login link..." : "Setting up your account..."}
                </h2>
                <p className="text-sm text-foreground-600 leading-relaxed">
                  {state === "loading"
                    ? "Please wait while we verify your secure login link."
                    : "Almost there — we are preparing your account."}
                </p>
              </div>
            ) : state === "error" ? (
              <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8">
                <AuthErrorState
                  title="Login link expired or invalid"
                  message={errorMessage}
                  primaryAction={{ label: "Request New Link", to: "/login" }}
                  secondaryAction={{ label: "Back to Homepage", to: "/" }}
                />
              </div>
            ) : null}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}