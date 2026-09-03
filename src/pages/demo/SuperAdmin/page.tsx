import { useState } from "react";
import Header from "@/components/feature/Header";
import Footer from "@/components/feature/Footer";
import { demoRequestsSample } from "@/mocks/demoData";

const statusColors: Record<string, string> = {
  new: "bg-secondary-100 text-secondary-700",
  email_sent: "bg-primary-100 text-primary-700",
  viewed_demo: "bg-accent-100 text-accent-800",
  contacted: "bg-primary-100 text-primary-700",
  converted: "bg-primary-100 text-primary-700",
  not_interested: "bg-foreground-100 text-foreground-600",
  expired: "bg-foreground-100 text-foreground-500",
};

export default function DemoRequestsAdminPage() {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<Record<string, string[]>>({});

  const active = selectedRequest
    ? demoRequestsSample.find((r) => r.id === selectedRequest)
    : null;

  const addNote = () => {
    if (!noteText.trim() || !selectedRequest) return;
    setNotes((prev) => ({
      ...prev,
      [selectedRequest]: [...(prev[selectedRequest] || []), noteText],
    }));
    setNoteText("");
  };

  return (
    <div className="min-h-screen bg-background-50">
      <Header />

      <main className="pt-16">
        <section className="py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-semibold text-foreground-900 mb-1">
                  Demo Requests
                </h1>
                <p className="text-sm text-foreground-500">
                  {demoRequestsSample.length} requests · Manage demo access for fishery owners
                </p>
              </div>
              <button
                disabled
                className="px-5 py-2.5 text-xs font-semibold rounded-full border border-background-200 text-foreground-400 cursor-not-allowed whitespace-nowrap"
              >
                Export CSV
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Table */}
              <div className="lg:col-span-3 bg-background-50 border border-background-200 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-background-200 bg-background-100/50">
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Fishery</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Contact</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Email</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Demo</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-foreground-500">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {demoRequestsSample.map((req) => (
                        <tr
                          key={req.id}
                          onClick={() => setSelectedRequest(req.id)}
                          className={`border-b border-background-100 cursor-pointer transition-colors ${
                            selectedRequest === req.id ? "bg-primary-50/50" : "hover:bg-background-50"
                          }`}
                        >
                          <td className="py-3 px-4 text-foreground-900 font-medium">{req.fisheryName}</td>
                          <td className="py-3 px-4 text-foreground-600">{req.contactName}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${statusColors[req.status] || "bg-background-100 text-foreground-600"}`}>
                              {req.status.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {req.emailSent ? (
                              <i className="ri-checkbox-circle-line text-primary-600"></i>
                            ) : (
                              <i className="ri-close-circle-line text-foreground-300"></i>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {req.demoAccessed ? (
                              <i className="ri-checkbox-circle-line text-primary-600"></i>
                            ) : (
                              <i className="ri-time-line text-foreground-300"></i>
                            )}
                          </td>
                          <td className="py-3 px-4 text-xs text-foreground-500">{req.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Detail panel */}
              <div className="lg:col-span-2">
                {active ? (
                  <div className="bg-background-50 border border-background-200 rounded-xl p-5 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="font-heading text-lg font-semibold text-foreground-900">{active.fisheryName}</h3>
                      <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full ${statusColors[active.status] || "bg-background-100 text-foreground-600"}`}>
                        {active.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-xs text-foreground-500">Contact</p>
                        <p className="text-sm text-foreground-900 font-medium">{active.contactName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-500">Email</p>
                        <p className="text-sm text-foreground-900">{active.email}</p>
                      </div>
                      {active.phone && (
                        <div>
                          <p className="text-xs text-foreground-500">Phone</p>
                          <p className="text-sm text-foreground-900">{active.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-foreground-500">Postcode</p>
                        <p className="text-sm text-foreground-900">{active.postcode}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-500">Lakes</p>
                        <p className="text-sm text-foreground-900">{active.numberOfLakes}</p>
                      </div>
                      <div>
                        <p className="text-xs text-foreground-500">Swims</p>
                        <p className="text-sm text-foreground-900">{active.numberOfSwims}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-foreground-500 mb-1">Booking method</p>
                      <p className="text-sm text-foreground-900">{active.bookingMethod}</p>
                    </div>

                    <div>
                      <p className="text-xs text-foreground-500 mb-2">Interests</p>
                      <div className="flex flex-wrap gap-1.5">
                        {active.interests.split(", ").map((interest) => (
                          <span key={interest} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary-50 text-primary-700">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {active.message && (
                      <div>
                        <p className="text-xs text-foreground-500 mb-1">Message</p>
                        <p className="text-sm text-foreground-700 leading-relaxed bg-background-100 rounded-lg p-3">{active.message}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-foreground-500">Email sent</p>
                        <p className={`font-semibold ${active.emailSent ? "text-primary-600" : "text-foreground-400"}`}>
                          {active.emailSent ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground-500">Demo accessed</p>
                        <p className={`font-semibold ${active.demoAccessed ? "text-primary-600" : "text-foreground-400"}`}>
                          {active.demoAccessed ? "Yes" : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground-500">Token status</p>
                        <p className="font-semibold text-foreground-900 capitalize">{active.demoTokenStatus.replace("_", " ")}</p>
                      </div>
                      {active.lastAccessed && (
                        <div>
                          <p className="text-foreground-500">Last accessed</p>
                          <p className="font-semibold text-foreground-900">{active.lastAccessed}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-2 pt-2 border-t border-background-200">
                      <p className="text-xs font-medium text-foreground-500">Actions</p>
                      <div className="flex flex-wrap gap-2">
                        <button disabled className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                          Resend Demo Link
                        </button>
                        <button disabled className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                          New Token
                        </button>
                        <button disabled className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                          Mark Contacted
                        </button>
                        <button disabled className="px-3 py-1.5 text-[10px] font-semibold rounded-full bg-background-100 text-foreground-400 cursor-not-allowed whitespace-nowrap">
                          Mark Converted
                        </button>
                      </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-3 pt-2 border-t border-background-200">
                      <p className="text-xs font-medium text-foreground-500">Notes</p>
                      {(notes[active.id] || []).map((note, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-background-100 text-xs text-foreground-700">
                          {note}
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="Add a note..."
                          className="flex-1 px-3 py-2 text-xs rounded-lg border border-background-200 bg-background-50 text-foreground-900 placeholder:text-foreground-400 focus:outline-none focus:ring-2 focus:ring-primary-400"
                          onKeyDown={(e) => { if (e.key === "Enter") addNote(); }}
                        />
                        <button
                          onClick={addNote}
                          className="px-3 py-2 text-xs font-semibold rounded-lg bg-foreground-900 text-background-50 hover:bg-foreground-800 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-background-50 border border-background-200 rounded-xl p-8 text-center">
                    <i className="ri-user-search-line text-3xl text-foreground-300 block mb-3"></i>
                    <p className="text-sm text-foreground-500">Select a request to view details</p>
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