import { Link } from "react-router-dom";

export default function Footer() {
  const column1 = [
    { label: "Find a Fishery", href: "/find-fishing" },
    { label: "Latest Catches", href: "#latest-catches" },
    { label: "Pricing", href: "/pricing" },
    { label: "Request Demo", href: "/demo" },
    { label: "Create Free Account", href: "/signup" },
  ];

  const column2 = [
    { label: "For Fishery Owners", href: "#fishery-owners" },
    { label: "Login", href: "/login" },
    { label: "Contact", href: "mailto:hello@fisheryhub.uk" },
  ];

  const column3 = [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
  ];

  return (
    <footer className="bg-background-100 border-t border-background-200">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-[40%] flex flex-col gap-6">
            <div>
              <Link to="/" className="inline-block">
                <span className="font-heading text-2xl md:text-3xl font-semibold tracking-tight text-foreground-900">
                  FisheryHub<span className="text-primary-600">.uk</span>
                </span>
              </Link>
              <p className="mt-3 text-sm text-foreground-600 leading-relaxed max-w-sm">
                Find somewhere to fish. Search UK fishing lakes, compare prices, check rules, view catches, and book your next session.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xs font-medium text-foreground-500 mb-3 uppercase tracking-wider">Get fishing updates</p>
              <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="flex-1 px-0 py-2.5 text-sm bg-transparent border-0 border-b border-foreground-300 focus:border-primary-500 focus:outline-none transition-colors text-foreground-800 placeholder:text-foreground-400"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="lg:w-[60%] grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              {column1.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-foreground-600 hover:text-foreground-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {column2.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-foreground-600 hover:text-foreground-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {column3.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-foreground-600 hover:text-foreground-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-background-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground-500">
            &copy; {new Date().getFullYear()} FisheryHub.uk. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">Terms</Link>
            <Link to="/privacy" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-xs text-foreground-500 hover:text-foreground-700 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}