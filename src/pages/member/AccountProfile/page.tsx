import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { getCurrentSession, saveMemberProfile, logout } from "@/lib/auth";
import {
  fishingInterestOptions,
  preferredDistanceOptions,
  preferredBookingOptions,
  mockMemberProfile,
} from "@/mocks/memberData";

export default function AccountProfilePage() {
  const navigate = useNavigate();
  const session = getCurrentSession();

  const [firstName, setFirstName] = useState(mockMemberProfile.firstName);
  const [lastName, setLastName] = useState(mockMemberProfile.lastName);
  const [phone, setPhone] = useState(mockMemberProfile.phone);
  const [postcode, setPostcode] = useState(mockMemberProfile.postcode);
  const [town, setTown] = useState(mockMemberProfile.town);
  const [fishingInterests, setFishingInterests] = useState<string[]>(mockMemberProfile.fishingInterests);
  const [preferredDistance, setPreferredDistance] = useState(String(mockMemberProfile.preferredDistanceMiles));
  const [preferredBookingTypes, setPreferredBookingTypes] = useState<string[]>(mockMemberProfile.preferredBookingTypes);
  const [emailReminders, setEmailReminders] = useState(mockMemberProfile.emailRemindersEnabled);
  const [marketingConsent, setMarketingConsent] = useState(mockMemberProfile.marketingConsent);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleteRequested, setDeleteRequested] = useState(false);

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

  const handleSave = async () => {
    if (!session?.user) {
      setSaveError("Session expired. Please login again.");
      return;
    }

    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

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
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError("We could not save your profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const handleDeleteRequest = () => {
    setDeleteRequested(true);
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-10 md:py-16">
          <div className="max-w-2xl mx-auto px-4 md:px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-medium text-foreground-500 tracking-widest uppercase">
                  / account
                </span>
                <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground-900 mt-2">
                  Account Profile
                </h1>
              </div>
              <Link
                to="/member/dashboard"
                className="px-4 py-2 text-sm font-medium rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
              >
                Back to Dashboard
              </Link>
            </div>

            <div className="bg-background-50 border border-background-200 rounded-2xl p-6 md:p-8 space-y-8">
              {/* Basic Details */}
              <div>
                <h3 className="text-sm font-semibold text-foreground-900 mb-4">Basic Details</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">First name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">Last name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">Email</label>
                      <input
                        type="email"
                        value={mockMemberProfile.email}
                        disabled
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-100 text-foreground-500 cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">Postcode</label>
                      <input
                        type="text"
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-foreground-600 mb-1.5">Town / area</label>
                      <input
                        type="text"
                        value={town}
                        onChange={(e) => setTown(e.target.value)}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-background-200 bg-background-50 text-foreground-900 focus:outline-none focus:ring-2 focus:ring-primary-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-background-200"></div>

              {/* Fishing Interests */}
              <div>
                <h3 className="text-sm font-semibold text-foreground-900 mb-4">Fishing Interests</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {fishingInterestOptions.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer text-left ${
                        fishingInterests.includes(interest)
                          ? "bg-primary-50 border-primary-200 text-primary-700"
                          : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {fishingInterests.includes(interest) && <i className="ri-check-line text-primary-600"></i>}
                        {interest}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-background-200"></div>

              {/* Preferences */}
              <div>
                <h3 className="text-sm font-semibold text-foreground-900 mb-4">Preferences</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-foreground-600 mb-2">Max travel distance</label>
                    <div className="flex flex-wrap gap-2">
                      {preferredDistanceOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setPreferredDistance(opt.value)}
                          className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
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
                    <label className="block text-xs font-medium text-foreground-600 mb-2">Preferred booking types</label>
                    <div className="flex flex-wrap gap-2">
                      {preferredBookingOptions.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => toggleBookingType(type)}
                          className={`px-3 py-2 text-xs font-medium rounded-xl border transition-colors cursor-pointer ${
                            preferredBookingTypes.includes(type)
                              ? "bg-primary-50 border-primary-200 text-primary-700"
                              : "border-background-200 text-foreground-600 hover:border-background-300 hover:bg-background-100"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {preferredBookingTypes.includes(type) && <i className="ri-check-line text-primary-600"></i>}
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
                      <span className="text-sm text-foreground-700">Email reminders for bookings</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => setMarketingConsent(e.target.checked)}
                        className="w-4 h-4 rounded border-background-300 text-primary-600 focus:ring-primary-400"
                      />
                      <span className="text-sm text-foreground-700">Fishing updates and special offers</span>
                    </label>
                  </div>
                </div>
              </div>

              {saveError && (
                <div className="p-3 rounded-xl bg-accent-50 border border-accent-200">
                  <p className="text-sm text-accent-700">{saveError}</p>
                </div>
              )}

              {saveSuccess && (
                <div className="p-3 rounded-xl bg-primary-50 border border-primary-200">
                  <p className="text-sm text-primary-700">Profile updated successfully!</p>
                </div>
              )}

              <div className="border-t border-background-200 pt-6">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full py-3 text-sm font-semibold rounded-full bg-primary-600 text-background-50 hover:bg-primary-700 transition-colors whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      Saving...
                    </span>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </div>

              {/* Account Actions */}
              <div className="border-t border-background-200 pt-6 space-y-3">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 text-sm font-semibold rounded-full border border-foreground-300 text-foreground-700 hover:border-foreground-600 hover:bg-foreground-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Logout
                </button>

                {!deleteRequested ? (
                  <button
                    onClick={handleDeleteRequest}
                    className="w-full py-3 text-sm font-medium text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-full transition-colors cursor-pointer"
                  >
                    Request account deletion
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-accent-50 border border-accent-200 text-center">
                    <p className="text-sm text-accent-700 mb-3">
                      Account deletion requests are processed manually. Please contact us to proceed.
                    </p>
                    <a
                      href="mailto:hello@fisheryhub.uk?subject=Account Deletion Request"
                      className="text-sm font-semibold text-accent-700 hover:text-accent-800 underline transition-colors"
                    >
                      hello@fisheryhub.uk
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}