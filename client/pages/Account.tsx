import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Account() {
  const [name, setName] = useState("swati");
  const [email, setEmail] = useState("swati@gmail.com");
  const [orgType, setOrgType] = useState("Company");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing fields",
        description: "Full name and email are required.",
        open: true,
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app you'd call an API to update profile. We'll simulate success.
      await new Promise((r) => setTimeout(r, 600));
      toast({
        title: "Profile updated",
        description: "Your profile has been saved.",
        open: true,
      });
    } catch (err: any) {
      toast({
        title: "Update failed",
        description: String(err?.message || err),
        open: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jansoch-cream py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">User Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2">
            <form
              onSubmit={handleUpdate}
              className="bg-white p-6 rounded shadow space-y-6"
            >
              <section>
                <h2 className="text-lg font-semibold mb-4">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Organization Type
                    </label>
                    <select
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    >
                      <option>Company</option>
                      <option>Individual</option>
                      <option>NGO</option>
                      <option>Government</option>
                    </select>
                  </div>

                  <div />
                </div>
              </section>

              <section>
                <h2 className="text-lg font-semibold mb-4">Account Actions</h2>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setName("");
                      setEmail("");
                      toast({
                        title: "Cleared",
                        description: "Form cleared.",
                        open: true,
                      });
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Update Profile"}
                  </Button>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to="/my-submissions"
                    state={{ name }}
                    className="inline-flex items-center px-3 py-2 bg-jansoch-blue text-white rounded"
                  >
                    View Your Submissions
                  </Link>
                  <Link
                    to="/submit"
                    className="inline-flex items-center px-3 py-2 border rounded"
                  >
                    Add New Submission
                  </Link>
                </div>
              </section>
            </form>
          </main>

          <aside className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Update Profile</h3>
              <p className="text-sm text-gray-700 mb-4">
                Keep your profile information up to date to ensure effective
                communication.
              </p>
              <Button onClick={handleUpdate}>
                {loading ? "Saving..." : "Update Profile"}
              </Button>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Privacy & Transparency</h3>
              <p className="text-sm text-gray-700">
                Your information in this profile will be anonymized and not
                publicly accessible. Please review our privacy policy for more
                information.
              </p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-gray-700">Email: support@mca.gov.in</p>
              <p className="text-sm text-gray-700">Phone: 011-2307 5024</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
