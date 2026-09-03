import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Find a Fishery", href: "/find-fishing" },
    { label: "Latest Catches", href: "#latest-catches" },
    { label: "For Fishery Owners", href: "#fishery-owners" },
    { label: "Request Demo", href: "/demo" },
    { label: "Pricing", href: "/pricing" },
    { label: "Login", href: "/login" },
  ];

  const handleFindLake = () => {
    navigate("/find-fishing");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background-50/95 backdrop-blur-md border-b border-background-200/70"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className={`font-heading text-xl md:text-2xl font-semibold tracking-tight whitespace-nowrap ${scrolled ? "text-foreground-900" : "text-background-50"}`}>
              FisheryHub<span className="text-primary-500">.uk</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  scrolled
                    ? "text-foreground-700 hover:text-foreground-900 hover:bg-background-100"
                    : "text-background-50/80 hover:text-background-50 hover:bg-background-50/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            <button
              onClick={handleFindLake}
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Find a Lake
            </button>
            <Link
              to="/signup"
              className={`px-5 py-2.5 text-sm font-semibold rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                scrolled
                  ? "bg-accent-500 text-foreground-900 hover:bg-accent-400"
                  : "bg-accent-500 text-foreground-900 hover:bg-accent-400"
              }`}
            >
              Create Free Account
            </Link>
            <Link
              to="/demo"
              className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-colors whitespace-nowrap cursor-pointer ${
                scrolled
                  ? "border-primary-300 text-primary-700 hover:border-primary-500 hover:bg-primary-50"
                  : "border-accent-400/70 text-background-50 hover:border-accent-400 hover:bg-accent-500/20"
              }`}
            >
              Request Demo
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              scrolled
                ? "text-foreground-800 hover:bg-background-100"
                : "text-background-50 hover:bg-background-50/10"
            }`}
            aria-label="Toggle menu"
          >
            <i className={`text-xl ${mobileOpen ? "ri-close-line" : "ri-menu-line"}`}></i>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background-50 border-t border-background-200">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium text-foreground-700 hover:text-foreground-900 hover:bg-background-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-background-200 mt-2">
              <button
                onClick={() => { setMobileOpen(false); handleFindLake(); }}
                className="w-full px-5 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Find a Lake
              </button>
              <Link
                to="/signup"
                onClick={() => setMobileOpen(false)}
                className="w-full px-5 py-3 text-sm font-semibold rounded-full bg-accent-500 text-foreground-900 hover:bg-accent-400 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Create Free Account
              </Link>
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="w-full px-5 py-3 text-sm font-semibold rounded-full border border-primary-300 text-primary-700 hover:bg-primary-50 transition-colors whitespace-nowrap cursor-pointer text-center"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}