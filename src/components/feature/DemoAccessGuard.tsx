import { useParams, Link } from "react-router-dom";
import DemoModeBadge from "@/components/base/DemoModeBadge";

const VALID_DEMO_TOKENS = ["demo", "fisheryhub-demo", "owner-preview"];

interface DemoAccessGuardProps {
  children: React.ReactNode;
}

export default function DemoAccessGuard({ children }: DemoAccessGuardProps) {
  const { token } = useParams<{ token: string }>();

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-foreground-100 flex items-center justify-center mx-auto mb-6">
            <i className="ri-error-warning-line text-2xl text-foreground-500"></i>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-3">
            Invalid demo link
          </h2>
          <p className="text-sm text-foreground-600 mb-8 leading-relaxed">
            This demo link appears to be invalid. Please request a new demo link to access the demo pages.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/demo/request"
              className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Request New Demo Link
            </Link>
            <Link
              to="/"
              className="px-6 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isValidToken = VALID_DEMO_TOKENS.includes(token);

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-2xl bg-accent-100 flex items-center justify-center mx-auto mb-6">
            <i className="ri-timer-line text-2xl text-accent-600"></i>
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-3">
            This demo link has expired or is invalid
          </h2>
          <p className="text-sm text-foreground-600 mb-8 leading-relaxed">
            Demo links are valid for a limited time. Request a new one and we will send it to your email.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/demo/request"
              className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Request New Demo Link
            </Link>
            <Link
              to="/"
              className="px-6 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}