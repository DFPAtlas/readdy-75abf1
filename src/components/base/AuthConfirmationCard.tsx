interface AuthConfirmationCardProps {
  title: string;
  message: string;
  email: string;
  tip?: string;
  onResend?: () => void;
  onBack?: () => void;
}

export default function AuthConfirmationCard({
  title,
  message,
  email,
  tip = "If the email does not arrive, check your spam folder or try again.",
  onResend,
  onBack,
}: AuthConfirmationCardProps) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-6">
        <i className="ri-mail-send-line text-2xl text-primary-600"></i>
      </div>
      <h2 className="font-heading text-2xl font-semibold text-foreground-900 mb-3">
        {title}
      </h2>
      <p className="text-sm text-foreground-600 mb-2 leading-relaxed">
        {message}
      </p>
      <p className="text-sm font-medium text-foreground-800 mb-6">
        {email}
      </p>
      <p className="text-xs text-foreground-500 mb-8 leading-relaxed max-w-sm mx-auto">
        {tip}
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onResend && (
          <button
            onClick={onResend}
            className="px-6 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            Resend Link
          </button>
        )}
        {onBack && (
          <button
            onClick={onBack}
            className="px-6 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}