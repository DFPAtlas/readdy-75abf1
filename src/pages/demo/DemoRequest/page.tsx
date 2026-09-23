import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { sendDemoLinkEmail, generateDemoLink, generateDemoToken } from "@/lib/demoEmail";
import { createDemoRequest } from "@/lib/demoDb";

const bookingMethods = [
  "Phone/manual diary",
  "Facebook messages",
  "Website form",
  "Another booking system",
  "Walk-ins only",
  "Club/syndicate only",
  "Not sure",
];

const interestOptions = [
  "Online swim bookings",
  "Drag-and-drop swim map",
  "Member management",
  "Payments",
  "Bailiff dashboard",
  "QR check-in",
  "Gate code after payment",
  "Booking selfie verification",
  "Catch reports",
  "Weather widget",
  "Local tackle/food/fuel services",
  "Syndicate memberships",
  "Multi-lake management",
  "Demand insights",
];

interface FormErrors {
  fisheryName?: string;
  contactName?: string;
  email?: string;
  consent?: string;
}

export default function DemoRequestPage() {
  const navigate = useNavigate();
  const [fisheryName, setFisheryName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [numberOfLakes, setNumberOfLakes] = useState("");
  const [numberOfSwims, setNumberOfSwims] = useState("");
  const [bookingMethod, setBookingMethod] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [bookingDropdownOpen, setBookingDropdownOpen] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fisheryName.trim()) newErrors.fisheryName = "Fishery name is required";
    if (!contactName.trim()) newErrors.contactName = "Contact name is required";
    if (!email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!consent) newErrors.consent = "You must agree to be contacted";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const toggleInterest = (interest: string) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);

    try {
      const formEl = e.currentTarget as HTMLFormElement;
      const formData = new FormData(formEl);

      const honeypotValue = (formData.get("phone_alt") as string || "").trim();
      if (honeypotValue) {
        setSubmitting(false);
        navigate("/demo/thank-you");
        return;
      }

      const demoToken = generateDemoToken();
      const demoLink = generateDemoLink(demoToken);

      // Persist the demo request to the backend database.
      await createDemoRequest({
        fisheryName,
        contactName,
        email,
        phone,
        postcode,
        numberOfLakes,
        numberOfSwims,
        currentBookingMethod: bookingMethod,
        interests,
        message,
        consentToContact: consent,
        sourcePage: "/demo/request",
      });

      await sendDemoLinkEmail({
        to: email,
        contact_name: contactName,
        fishery_name: fisheryName,
        demo_link: demoLink,
      });

      await fetch("https://readdy.ai/api/form/d96jcnnpg5pqhofcupng", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          fishery_name: fisheryName,
          contact_name: contactName,
          email: email,
          phone: phone,
          postcode: postcode,
          number_of_lakes: numberOfLakes,
          number_of_swims: numberOfSwims,
          current_booking_method: bookingMethod,
          interests: interests.join(", "),
          message: message,
          consent_to_contact: consent ? "yes" : "no",
        }).toString(),
      });

      setSubmitting(false);
      navigate("/demo/thank-you");
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us directly.");
      setSubmitting(false);
    }
  };

  const selectedBookingLabel = bookingMethod || "Select booking method";

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10">
              <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                / demo request
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mt-3 mb-4">
                Request your FisheryHub demo
              </h1>
              <p className="text-base text-foreground-600 max-w-md mx-auto leading-relaxed">
                Tell us a little about your fishery and we will send you a secure demo link.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              data-readdy-form
              className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8"
              noValidate
            >
              {/* Honeypot */}
              <input
                type="text"
                name="phone_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                readOnly
                className="absolute opacity-0 pointer-events-none"
                style={{ position: "absolute", left: "-9999px", top: "-9999px" }}
              />

              <div className="space-y-5">
                {/* Fishery name */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Fishery name <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fishery_name"
                    value={fisheryName}
                    onChange={(e) => { setFisheryName(e.target.value); setErrors((p) => ({ ...p, fisheryName: undefined })); }}
                    placeholder="e.g. Willow Mere Fishery"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.fisheryName ? "border-accent-500 focus:ring-accent-400" : "border-background-200 focus:ring-primary-400"
                    }`}
                  />
                  {errors.fisheryName && <p className="text-xs text-accent-600 mt-1">{errors.fisheryName}</p>}
                </div>

                {/* Contact name */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Owner / contact name <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="contact_name"
                    value={contactName}
                    onChange={(e) => { setContactName(e.target.value); setErrors((p) => ({ ...p, contactName: undefined })); }}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.contactName ? "border-accent-500 focus:ring-accent-400" : "border-background-200 focus:ring-primary-400"
                    }`}
                  />
                  {errors.contactName && <p className="text-xs text-accent-600 mt-1">{errors.contactName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Email address <span className="text-accent-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 text-sm rounded-xl border bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 transition-colors ${
                      errors.email ? "border-accent-500 focus:ring-accent-400" : "border-background-200 focus:ring-primary-400"
                    }`}
                  />
                  {errors.email && <p className="text-xs text-accent-600 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Phone number <span className="text-foreground-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 07700 900123"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                  />
                </div>

                {/* Postcode */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Fishery postcode / location
                  </label>
                  <input
                    type="text"
                    name="postcode"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    placeholder="e.g. ME15 8LX"
                    className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                  />
                </div>

                {/* Number of lakes & swims */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Number of lakes
                    </label>
                    <input
                      type="number"
                      name="number_of_lakes"
                      value={numberOfLakes}
                      onChange={(e) => setNumberOfLakes(e.target.value)}
                      placeholder="e.g. 3"
                      min="1"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Approx. swims / pegs
                    </label>
                    <input
                      type="number"
                      name="number_of_swims"
                      value={numberOfSwims}
                      onChange={(e) => setNumberOfSwims(e.target.value)}
                      placeholder="e.g. 45"
                      min="1"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Current booking method */}
                <div className="relative">
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Current booking method
                  </label>
                  <button
                    type="button"
                    onClick={() => setBookingDropdownOpen(!bookingDropdownOpen)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span className={bookingMethod ? "text-foreground-900" : "text-foreground-400"}>
                      {selectedBookingLabel}
                    </span>
                    <i className={`ri-arrow-down-s-line text-foreground-400 transition-transform ${bookingDropdownOpen ? "rotate-180" : ""}`}></i>
                  </button>
                  {bookingDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-background-50 border border-background-200 rounded-xl z-20 max-h-56 overflow-y-auto">
                      {bookingMethods.map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => { setBookingMethod(method); setBookingDropdownOpen(false); }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors cursor-pointer ${
                            bookingMethod === method
                              ? "bg-primary-50 text-primary-700 font-medium"
                              : "text-foreground-700 hover:bg-background-100"
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Main interests */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-3">
                    Main interests
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer whitespace-nowrap ${
                          interests.includes(interest)
                            ? "bg-primary-50 border-primary-200 text-primary-700"
                            : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your fishery and what you are looking for..."
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors resize-none"
                  />
                  <p className="text-xs text-foreground-400 mt-1">{message.length}/500</p>
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent_to_contact"
                    id="consent"
                    checked={consent}
                    onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: undefined })); }}
                    className="mt-1 w-4 h-4 rounded border-background-300 text-primary-600 focus:ring-primary-400 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-foreground-600 leading-relaxed cursor-pointer">
                    I agree to be contacted about FisheryHub and understand my details will be used to send the demo link and follow up about the service.
                  </label>
                </div>
                {errors.consent && <p className="text-xs text-accent-600">{errors.consent}</p>}

                {submitError && (
                  <div className="p-4 rounded-xl bg-accent-50 border border-accent-200">
                    <p className="text-sm text-accent-700">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 text-sm font-semibold rounded-xl bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      Sending...
                    </span>
                  ) : (
                    "Send Demo Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}