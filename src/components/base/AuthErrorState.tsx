import { Link } from "react-router-dom";

interface AuthErrorStateProps {
  title?: string;
  message?: string;
  primaryAction?: { label: string; to?: string; onClick?: () => void };
  secondaryAction?: { label: string; to?: string; onClick?: () => void };
}

export default function AuthErrorState({
  title = "Something went wrong",
  message = "We could not complete your request. Please try again.",
  primaryAction,
  secondaryAction,
}: AuthErrorStateProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-accent-50 flex items-center justify-center mx-auto mb-6">
        <i className="ri-error-warning-line text-2xl text-accent-600"></i>
      </div>
      <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-3">
        {title}
      </h2>
      <p className="text-sm text-foreground-600 mb-8 leading-relaxed max-w-sm mx-auto">
        {message}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {primaryAction && (
          primaryAction.to ? (
            <Link
              to={primaryAction.to}
              className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {primaryAction.label}
            </Link>
          ) : (
            <button
              onClick={primaryAction.onClick}
              className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {primaryAction.label}
            </button>
          )
        )}
        {secondaryAction && (
          secondaryAction.to ? (
            <Link
              to={secondaryAction.to}
              className="px-6 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              {secondaryAction.label}
            </Link>
          ) : (
            <button
              onClick={secondaryAction.onClick}
              className="px-6 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
            >
              {secondaryAction.label}
            </button>
          )
        )}
      </div>
    </div>
  );
}