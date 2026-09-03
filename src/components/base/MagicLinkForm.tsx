import { useState } from "react";
import { Link } from "react-router-dom";

interface MagicLinkFormProps {
  onSubmit: (email: string) => Promise<void>;
  submitLabel?: string;
  footerLink?: { label: string; to: string; text: string };
  trustText?: string;
}

export default function MagicLinkForm({
  onSubmit,
  submitLabel = "Send Magic Link",
  footerLink,
  trustText = "No password needed. We will send a secure login link to your email.",
}: MagicLinkFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    if (!email.trim()) {
      setError("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    try {
      await onSubmit(email);
    } catch {
      setError("We could not send your login link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="magic-link-email" className="block text-sm font-medium text-foreground-700 mb-1.5">
          Email address
        </label>
        <input
          id="magic-link-email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full px-4 py-3.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
        />
        {error && <p className="text-xs text-accent-600 mt-1.5">{error}</p>}
      </div>

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
          submitLabel
        )}
      </button>

      <p className="text-xs text-foreground-500 text-center leading-relaxed">
        {trustText}
      </p>

      {footerLink && (
        <p className="text-sm text-foreground-500 text-center">
          {footerLink.text}{" "}
          <Link to={footerLink.to} className="text-primary-600 font-medium hover:text-primary-700 transition-colors">
            {footerLink.label}
          </Link>
        </p>
      )}
    </form>
  );
}