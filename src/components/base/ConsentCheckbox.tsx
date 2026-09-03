import { Link } from "react-router-dom";

interface ConsentCheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  required?: boolean;
  error?: string;
  showLinks?: boolean;
}

export default function ConsentCheckbox({
  id,
  checked,
  onChange,
  label,
  required = false,
  error,
  showLinks = true,
}: ConsentCheckboxProps) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-background-300 text-primary-600 focus:ring-primary-400 cursor-pointer flex-shrink-0"
        />
        <label htmlFor={id} className="text-xs text-foreground-600 leading-relaxed cursor-pointer">
          {label}
          {required && <span className="text-accent-600 ml-0.5">*</span>}
        </label>
      </div>
      {showLinks && (
        <p className="text-xs text-foreground-400 mt-1.5 ml-7">
          Read our{" "}
          <Link to="/terms" className="text-primary-600 hover:text-primary-700 underline transition-colors">
            Terms
          </Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-primary-600 hover:text-primary-700 underline transition-colors">
            Privacy Policy
          </Link>
        </p>
      )}
      {error && <p className="text-xs text-accent-600 mt-1">{error}</p>}
    </div>
  );
}