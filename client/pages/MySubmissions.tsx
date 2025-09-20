import { useMemo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SUBMISSIONS, subscribe } from "@/lib/submissions";
import { ChevronLeft } from "lucide-react";

export default function MySubmissions() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = (location.state as any)?.name || null;

  const [submissions, setSubmissions] = useState(() => [...SUBMISSIONS]);

  useEffect(() => {
    const unsub = subscribe(() => setSubmissions([...SUBMISSIONS]));
    return unsub;
  }, []);

  const mySubmissions = useMemo(() => {
    if (!name) return submissions;
    return submissions.filter((s) => String(s.citizen).toLowerCase().includes(String(name).toLowerCase()));
  }, [name, submissions]);

  return (
    <div className="min-h-screen bg-jansoch-cream">
      <header className="bg-jansoch-orange text-white">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={() => navigate(-1)} aria-label="Go back" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-bold">My Submissions</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">Interactive submissions area</h2>
              <p className="text-sm text-gray-600">{name ? `Showing submissions for ${name}` : "Showing all submissions"}</p>
            </div>

            <div className="flex gap-3">
              <Link to="/submit" className="inline-flex items-center px-3 py-2 bg-jansoch-blue text-white rounded">Add New Submission</Link>
              <Link to="/transparency-ledger" className="inline-flex items-center px-3 py-2 border rounded">View All Ledger</Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-sm text-gray-600">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Timestamp</th>
                  <th className="pb-3">Suggestion Summary</th>
                  <th className="pb-3">Department</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mySubmissions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-sm text-gray-600">No submissions found for {name}. <Link to="/submit" className="text-jansoch-blue underline">Create one</Link>.</td>
                  </tr>
                ) : (
                  mySubmissions.map((r) => (
                    <tr key={r.id} className="border-t hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/submission/${r.id}`)} role="button">
                      <td className="py-3 text-sm text-gray-700">{r.id}</td>
                      <td className="py-3 text-sm text-gray-700">{r.timestamp}</td>
                      <td className="py-3 text-sm text-gray-700">{r.summary}</td>
                      <td className="py-3 text-sm text-gray-700">{r.department}</td>
                      <td className="py-3 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${r.status === 'Implemented' ? 'bg-green-100 text-green-800' : r.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
