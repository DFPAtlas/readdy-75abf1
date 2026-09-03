interface DemoModeBadgeProps {
  className?: string;
}

export default function DemoModeBadge({ className = "" }: DemoModeBadgeProps) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-100/80 text-accent-800 text-xs font-semibold whitespace-nowrap ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
      Demo Mode — sample data only
    </div>
  );
}