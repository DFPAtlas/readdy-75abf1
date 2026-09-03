import { useState } from "react";
import SignupPromptModal from "./SignupPromptModal";

interface SaveLakeButtonProps {
  lakeId: string;
  lakeName: string;
}

export default function SaveLakeButton({ lakeId, lakeName }: SaveLakeButtonProps) {
  const [saved, setSaved] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const handleClick = () => {
    setShowPrompt(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
          saved
            ? "bg-accent-100 text-accent-600"
            : "bg-background-50/90 backdrop-blur-sm text-foreground-500 hover:text-foreground-700 hover:bg-background-50"
        }`}
        title={saved ? "Saved" : "Save lake"}
        aria-label={saved ? `Remove ${lakeName} from saved` : `Save ${lakeName}`}
      >
        <i className={`text-base ${saved ? "ri-heart-fill" : "ri-heart-line"}`}></i>
      </button>

      <SignupPromptModal
        open={showPrompt}
        onClose={() => setShowPrompt(false)}
        title="Save this lake"
        description="Create a free angler account to save lakes, join waiting lists, and get booking updates."
      />
    </>
  );
}