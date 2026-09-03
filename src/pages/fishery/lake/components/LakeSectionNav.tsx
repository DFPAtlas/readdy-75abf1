import { useState, useEffect } from "react";

const sections = [
  { id: "overview", label: "Overview", icon: "ri-information-line" },
  { id: "availability", label: "Availability", icon: "ri-layout-grid-line" },
  { id: "prices", label: "Prices", icon: "ri-money-pound-circle-line" },
  { id: "rules", label: "Rules", icon: "ri-file-list-3-line" },
  { id: "catches", label: "Catches", icon: "ri-camera-line" },
  { id: "weather", label: "Weather", icon: "ri-sun-line" },
  { id: "facilities", label: "Facilities", icon: "ri-building-line" },
  { id: "local-services", label: "Local Services", icon: "ri-store-2-line" },
  { id: "location", label: "Location", icon: "ri-map-pin-line" },
];

export default function LakeSectionNav() {
  const [activeId, setActiveId] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-16 z-30 bg-background-50 border-b border-background-200/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-hide py-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex-shrink-0 ${
                activeId === s.id
                  ? "text-primary-700 bg-primary-50"
                  : "text-foreground-600 hover:text-foreground-900 hover:bg-background-100"
              }`}
            >
              <i className={`${s.icon} text-sm`}></i>
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}