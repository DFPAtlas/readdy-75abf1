import { Link } from "react-router-dom";

interface SignupPromptModalProps {
  open: boolean;
  onClose: () => void;
  returnTo?: string;
  title?: string;
  description?: string;
}

export default function SignupPromptModal({
  open,
  onClose,
  returnTo,
  title = "Create a free angler account",
  description = "Save lakes, book swims, join waiting lists, and get booking updates with a free FisheryHub account.",
}: SignupPromptModalProps) {
  if (!open) return null;

  const signupUrl = returnTo ? `/signup?returnTo=${encodeURIComponent(returnTo)}` : "/signup";
  const loginUrl = returnTo ? `/login?returnTo=${encodeURIComponent(returnTo)}` : "/login";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-foreground-950/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-background-50 rounded-2xl p-6 md:p-8 max-w-md w-full animate-[fadeIn_0.2s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-background-100 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <i className="ri-close-line text-foreground-500"></i>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
            <i className="ri-user-add-line text-xl text-primary-600"></i>
          </div>
          <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">
            {title}
          </h3>
          <p className="text-sm text-foreground-600 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to={signupUrl}
            className="w-full py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors text-center whitespace-nowrap cursor-pointer"
          >
            Create Free Account
          </Link>
          <Link
            to={loginUrl}
            className="w-full py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors text-center whitespace-nowrap cursor-pointer"
          >
            Login
          </Link>
          <button
            onClick={onClose}
            className="w-full py-3 text-sm font-medium text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}

export type { SignupPromptModalProps };