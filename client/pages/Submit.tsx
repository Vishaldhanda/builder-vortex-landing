import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Submit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [comment, setComment] = useState("");
  const [additional, setAdditional] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setEmail("");
    setOrganization("");
    setStateVal("");
    setComment("");
    setAdditional("");
    setAgree(false);
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim() || !agree) {
      toast({ title: "Missing fields", description: "Please fill required fields and accept terms.", open: true });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, state: stateVal, comment, additional }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to submit comment");
      }

      await res.json();
      toast({ title: "Comment submitted", description: "Thank you — your comment has been received.", open: true });
      resetForm();
    } catch (err: any) {
      toast({ title: "Submission failed", description: String(err.message || err), open: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jansoch-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Submit Your Comments</h1>
        <p className="text-center text-gray-700 max-w-2xl mx-auto mb-8">
          Your feedback is valuable in shaping India’s corporate governance policies. Please share your thoughts, suggestions, and concerns on the draft legislations.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form column */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-6">
              <section>
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Full Name" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="you@example.gov.in" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Organization / Company</label>
                    <input value={organization} onChange={(e) => setOrganization(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Organization" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select State</label>
                    <select value={stateVal} onChange={(e) => setStateVal(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2">
                      <option value="">Select State</option>
                      <option>Delhi</option>
                      <option>Maharashtra</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                    </select>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">Your Feedback</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Consultation Comments</label>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Please provide your detailed comments" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specify Your Comments</label>
                    <textarea value={additional} onChange={(e) => setAdditional(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="Use topics/sources/your reference" />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Memo/Representative response</label>
                  <input value={additional} onChange={(e) => setAdditional(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" placeholder="If you have any alternative suggestions or recommendations..." />
                </div>

                <div className="mt-4 flex items-start gap-3">
                  <input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1" />
                  <label htmlFor="agree" className="text-sm text-gray-700">I agree to the terms and conditions and understand that my submission will be recorded and included as the public transparency ledger.</label>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="mr-3" type="button" onClick={resetForm}>Reset</Button>
                  <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit Comments"}</Button>
                </div>
              </section>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Submission Guidelines</h3>
              <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
                <li>Be relevant, clear and concise</li>
                <li>Reference specific sections or clauses where possible</li>
                <li>Provide evidence or examples to support your points</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Privacy & Transparency</h3>
              <p className="text-sm text-gray-700">Your submissions will be acknowledged and may be included in the public transparency ledger to provide an open comment process. Personal data will be handled as per policy.</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700">Email: comments@mca.gov.in</p>
              <p className="text-sm text-gray-700">Phone: 011-5507 5056</p>
              <p className="text-sm text-gray-700">Support hours: Mon-Fri 9AM - 5PM</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
