interface SignupPromptModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

export default function SignupPromptModal({
  open,
  onClose,
  title = "Create a free angler account",
  description = "Save lakes, join waiting lists, and get booking updates.",
}: SignupPromptModalProps) {
  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="absolute inset-0 bg-foreground-900/40"></div>
      <div className="relative bg-background-50 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-background-100 transition-colors cursor-pointer"
        >
          <i className="ri-close-line text-lg text-foreground-500"></i>
        </button>

        <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
          <i className="ri-user-heart-line text-xl text-accent-600"></i>
        </div>

        <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">{title}</h3>
        <p className="text-sm text-foreground-600 mb-5 leading-relaxed">{description}</p>

        <div className="flex flex-col gap-2 mb-5">
          {[
            { icon: "ri-heart-line", text: "Save favourite lakes" },
            { icon: "ri-eye-line", text: "View swim availability" },
            { icon: "ri-user-star-line", text: "Join waiting lists" },
            { icon: "ri-time-line", text: "Get booking reminders" },
            { icon: "ri-camera-line", text: "Submit catch reports" },
          ].map((benefit) => (
            <div key={benefit.text} className="flex items-center gap-2.5 text-sm text-foreground-700">
              <i className={`${benefit.icon} text-foreground-400 text-sm`}></i>
              {benefit.text}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full px-5 py-3 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Create Free Account
          </button>
          <button
            onClick={onClose}
            className="w-full px-5 py-3 text-sm font-semibold rounded-xl border border-background-200 text-foreground-700 hover:bg-background-100 transition-colors cursor-pointer whitespace-nowrap"
          >
            Login
          </button>
          <button
            onClick={onClose}
            className="w-full px-5 py-2.5 text-xs text-foreground-500 hover:text-foreground-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}