import { useState, type FormEvent } from "react";
import { useState, type FormEvent } from "react";
import { FileText, Eye, TrendingUp } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();
  const goToLedger = () => navigate("/transparency-ledger");

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setEmail("");
    setComment("");
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!name.trim() || !email.trim() || !comment.trim()) {
      toast({ title: "Missing fields", description: "Please fill name, email and comment.", open: true });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed to submit comment");
      }

      await res.json();
      toast({ title: "Comment submitted", description: "Thank you — your comment has been received.", open: true });
      resetForm();
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Submission failed", description: String(err.message || err), open: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Government Header */}
      <header className="bg-jansoch-orange text-white">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-4xl font-bold mb-1">Government of India</h1>
          <p className="text-xl">Ministry of Corporate Affairs</p>
        </div>
      </header>

      {/* JanSoch Navigation */}
      <nav className="bg-jansoch-blue text-white">
        <div className="container mx-auto px-4 py-4">
          <h2 className="text-2xl font-bold">JanSoch</h2>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-jansoch-cream py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-black mb-6">JanSoch</h1>
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-black text-lg leading-relaxed">
              Your voice matters in shaping india's corporate governance. Participate 
              in policy consultations and contribution to transparent, citizen-centric 
              legislation development.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button className="bg-jansoch-orange-dark text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg hover:bg-jansoch-orange transition-colors">
                  Submit Your Comments
                </button>
              </DialogTrigger>

              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Submit Your Comments</DialogTitle>
                  <DialogDescription>
                    Share your feedback on consultations. All fields are required.
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-jansoch-orange"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-jansoch-orange"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Comment</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-jansoch-orange"
                      required
                    />
                  </div>

                  <DialogFooter>
                    <div className="flex justify-end gap-3">
                      <Button variant="outline" onClick={() => setOpen(false)} type="button">Cancel</Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                    </div>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <button
              onClick={goToLedger}
              className="border border-jansoch-orange text-jansoch-orange bg-jansoch-cream-light px-8 py-3 rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors"
            >
              View Transparency Ledger
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-jansoch-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-4">
            Transparent Governance Through Citizen Participation
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* Submit Comments */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-jansoch-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Submit Comments</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Share your views on draft policies and consultations. Your feedback helps shape better governance frameworks.
              </p>
            </div>

            {/* Analysis Dashboard */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Analysis Dashboard</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                View comprehensive analytics on citizen responses and policy impact assessments in real-time.
              </p>
            </div>

            {/* Transparency Ledger */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-black">Transparency Ledger</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Track the complete lifecycle of consultations and see how citizen input influences policy decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Active Consultations */}
      <section className="bg-jansoch-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Active Consultations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Consultation 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-3">
                OPEN
              </span>
              <h3 className="font-semibold text-lg mb-2 text-black">
                Draft Corporate Governance Rules 2024
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Proposed amendments to the existing corporate governance framework to enhance transparency and accountability in corporate operations.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Deadline: 15 Dec 2024</span>
                <button className="text-jansoch-orange text-sm font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>

            {/* Consultation 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-3">
                OPEN
              </span>
              <h3 className="font-semibold text-lg mb-2 text-black">
                Digital Corporate Governance Framework
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Consultation for digital transformation of corporate governance processes and online compliance mechanisms.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Deadline: 30 Dec 2024</span>
                <button className="text-jansoch-orange text-sm font-medium hover:underline">
                  View Details
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="text-jansoch-orange font-medium hover:underline">
              View All Consultations
            </button>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="bg-jansoch-cream py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-black mb-12">
            Impact Through Participation
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-jansoch-orange mb-2">2,847</div>
              <div className="text-gray-600 text-sm">Comments Received</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">156</div>
              <div className="text-gray-600 text-sm">Policy Changes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-gray-600 text-sm">Citizen Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24</div>
              <div className="text-gray-600 text-sm">Active Consultations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-jansoch-blue-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Ministry of Corporate Affairs</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Promoting transparency and good corporate governance through citizen participation and consultation processes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-300 hover:text-white">About JanSoch</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Current Consultations</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Guidelines</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Help & Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              <div className="text-gray-300 text-sm space-y-2">
                <p>Ministry of Corporate Affairs</p>
                <p>Government of India</p>
                <p>Email: info@jansoch.gov.in</p>
                <p>Phone: +91-11-23384659</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-600 mt-8 pt-8 text-center">
            <p className="text-gray-300 text-sm">
              © 2024 Government of India, Ministry of Corporate Affairs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
