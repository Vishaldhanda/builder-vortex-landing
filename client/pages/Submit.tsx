import { useState, type FormEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export default function Submit() {
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
    } catch (err: any) {
      toast({ title: "Submission failed", description: String(err.message || err), open: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-jansoch-cream py-16">
      <div className="container mx-auto px-4 max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Submit Your Comments</h1>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Comment</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={6} className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2" required />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" type="button" onClick={resetForm}>Reset</Button>
            <Button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
