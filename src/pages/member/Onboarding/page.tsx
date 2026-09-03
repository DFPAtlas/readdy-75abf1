import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import AuthErrorState from "@/components/base/AuthErrorState";
import { getCurrentSession, saveMemberProfile, getMemberProfile } from "@/lib/auth";
import {
  fishingInterestOptions,
  preferredDistanceOptions,
  preferredBookingOptions,
} from "@/mocks/memberData";

export default function MemberOnboardingPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [postcode, setPostcode] = useState("");
  const [town, setTown] = useState("");
  const [fishingInterests, setFishingInterests] = useState<string[]>([]);
  const [preferredDistance, setPreferredDistance] = useState("50");
  const [preferredBookingTypes, setPreferredBookingTypes] = useState<string[]>([]);
  const [emailReminders, setEmailReminders] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const session = getCurrentSession();

  const toggleInterest = (interest: string) => {
    setFishingInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest],
    );
  };

  const toggleBookingType = (type: string) => {
    setPreferredBookingTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = async () => {
    if (!session?.user) {
      setSaveError("Your session has expired. Please login again.");
      return;
    }

    setSaving(true);
    setSaveError("");

    try {
      await saveMemberProfile(session.user.id, {
        firstName,
        lastName,
        phone,
        postcode,
        town,
        preferredDistanceMiles: parseInt(preferredDistance === "any" ? "100" : preferredDistance, 10),
        fishingInterests,
        preferredBookingTypes,
        emailRemindersEnabled: emailReminders,
        marketingConsent,
        onboardingCompleted: true,
      });

      // Refresh the profile cache
      await getMemberProfile(session.user.id);

      navigate("/member/dashboard", { replace: true });
    } catch {
      setSaveError("We could not save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-background-50">
        <Header />
        <main className="pt-16">
          <section className="min-h-[60vh] flex items-center justify-center py-12 md:py-20">
            <div className="max-w-md w-full mx-auto px-4">
              <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8">
                <AuthErrorState
                  title="Session expired"
                  message="Your login session has expired. Please login again to continue."
                  primaryAction={{ label: "Login", to: "/login" }}
                  secondaryAction={{ label: "Back to Homepage", to: "/" }}
                />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            {/* Progress */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                      s <= step
                        ? "bg-primary-600 text-background-50"
                        : "bg-background-200 text-foreground-500"
                    }`}
                  >
                    {s < step ? <i className="ri-check-line"></i> : s}
                  </div>
                  {s < 4 && (
                    <div className={`w-8 h-0.5 rounded-full ${s < step ? "bg-primary-600" : "bg-background-200"}`}></div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mb-8">
              <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                / set up profile
              </span>
              <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mt-3 mb-2">
                Set up your angler profile
              </h1>
              <p className="text-sm text-foreground-600">
                {step === 1 && "Let us start with the basics."}
                {step === 2 && "What kind of fishing are you into?"}
                {step === 3 && "Help us tailor your experience."}
                {step === 4 && "You are all set!"}
              </p>
            </div>

            <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8">
              {/* Step 1: Basic Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                      First name <span className="text-accent-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setErrors((p) => ({ ...p, firstName: "" })); }}
                      placeholder="Your first name"
                      className={`w-full px-4 py-3 text-sm rounded-xl border bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 transition-colors ${
                        errors.firstName ? "border-accent-500 focus:ring-accent-400" : "border-background-200 focus:ring-primary-400"
                      }`}
                    />
                    {errors.firstName && <p className="text-xs text-accent-600 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Last name <span className="text-foreground-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Your last name"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                      Phone number <span className="text-foreground-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 07700 900123"
                      className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Postcode
                      </label>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        placeholder="e.g. ME15 8LX"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground-700 mb-1.5">
                        Town / area
                      </label>
                      <input
                        type="text"
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                        placeholder="e.g. Maidstone"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => { if (validateStep1()) setStep(2); }}
                    className="w-full py-3.5 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              )}

              {/* Step 2: Fishing Interests */}
              {step === 2 && (
                <div className="space-y-5">
                  <p className="text-sm text-foreground-600">Select all that apply — you can change these later.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {fishingInterestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-3 text-sm font-medium rounded-xl border transition-colors cursor-pointer text-left ${
                          fishingInterests.includes(interest)
                            ? "bg-primary-50 border-primary-200 text-primary-700"
                            : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {fishingInterests.includes(interest) && (
                            <i className="ri-check-line text-primary-600"></i>
                          )}
                          {interest}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">
                      Maximum travel distance
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {preferredDistanceOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPreferredDistance(opt.value)}
                          className={`px-3 py-2.5 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                            preferredDistance === opt.value
                              ? "bg-primary-50 border-primary-200 text-primary-700"
                              : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground-700 mb-2">
                      Preferred booking types
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {preferredBookingOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleBookingType(type)}
                          className={`px-3 py-2.5 text-sm font-medium rounded-xl border transition-colors cursor-pointer ${
                            preferredBookingTypes.includes(type)
                              ? "bg-primary-50 border-primary-200 text-primary-700"
                              : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {preferredBookingTypes.includes(type) && (
                              <i className="ri-check-line text-primary-600"></i>
                            )}
                            {type}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailReminders}
                        onChange={(e) => setEmailReminders(e.target.checked)}
                        className="w-4 h-4 rounded border-background-300 text-primary-600 focus:ring-primary-400"
                      />
                      <span className="text-sm text-foreground-700">Send me booking reminders by email</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="w-4 h-4 rounded border-background-300 text-primary-600 focus:ring-primary-400"
                      />
                      <span className="text-sm text-foreground-700">Send me fishing updates and special offers</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Review
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Finish */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="text-center mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                      <i className="ri-user-heart-line text-xl text-primary-600"></i>
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground-900 mb-2">
                      Ready to go, {firstName || "angler"}!
                    </h3>
                    <p className="text-sm text-foreground-600">
                      Here is a summary of your profile. You can edit it any time.
                    </p>
                  </div>

                  <div className="bg-background-100 rounded-xl p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-500">Name</span>
                      <span className="text-foreground-900 font-medium">{firstName} {lastName}</span>
                    </div>
                    {phone && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Phone</span>
                        <span className="text-foreground-900">{phone}</span>
                      </div>
                    )}
                    {(postcode || town) && (
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground-500">Location</span>
                        <span className="text-foreground-900">{[town, postcode].filter(Boolean).join(", ")}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground-500">Max distance</span>
                      <span className="text-foreground-900">{preferredDistance === "any" ? "Any" : `Up to ${preferredDistance} miles`}</span>
                    </div>
                    {fishingInterests.length > 0 && (
                      <div className="text-sm">
                        <span className="text-foreground-500 block mb-1.5">Fishing interests</span>
                        <div className="flex flex-wrap gap-1.5">
                          {fishingInterests.map((i) => (
                            <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-primary-50 text-primary-700">{i}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {preferredBookingTypes.length > 0 && (
                      <div className="text-sm">
                        <span className="text-foreground-500 block mb-1.5">Preferred bookings</span>
                        <div className="flex flex-wrap gap-1.5">
                          {preferredBookingTypes.map((t) => (
                            <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-secondary-50 text-secondary-700">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {saveError && (
                    <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
                      <p className="text-sm text-accent-700">{saveError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleFinish}
                      disabled={saving}
                      className="flex-1 py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <span className="flex items-center justify-center gap-2">
                          <i className="ri-loader-4-line animate-spin"></i>
                          Saving...
                        </span>
                      ) : (
                        "Go to My Dashboard"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}