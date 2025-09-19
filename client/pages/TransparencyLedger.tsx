import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SAMPLE = [
  { id: 1, timestamp: "2024-04-19 14:23:45", citizen: "Citizen A", summary: "Improve road infrastructure in urban areas", department: "Transport", status: "Submitted" },
  { id: 2, timestamp: "2024-04-18 09:37:12", citizen: "Citizen B", summary: "Enhance digital literacy programs in schools", department: "Education", status: "Under Review" },
  { id: 3, timestamp: "2024-04-18 11:09:58", citizen: "Citizen C", summary: "Implement online payment system for utilities", department: "Finance", status: "Implemented" },
  { id: 4, timestamp: "2024-04-15 10:44:37", citizen: "Citizen D", summary: "Install more street lighting in rural areas", department: "Rural Development", status: "Submitted" },
];

export default function TransparencyLedger() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-jansoch-cream">
      <header className="bg-jansoch-orange text-white">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            aria-label="Go back"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </button>
          <h1 className="text-2xl font-bold">Transparency Ledger</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-lg shadow p-6 grid grid-cols-12 gap-6">
          <div className="col-span-9">
            <h2 className="font-semibold text-lg mb-4">Immutable suggestion records</h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-sm text-gray-600">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3">Citizen</th>
                    <th className="pb-3">Suggestion Summary</th>
                    <th className="pb-3">Department</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="py-3 text-sm text-gray-700">{r.id}</td>
                      <td className="py-3 text-sm text-gray-700">{r.timestamp}</td>
                      <td className="py-3 text-sm text-gray-700">{r.citizen}</td>
                      <td className="py-3 text-sm text-gray-700">{r.summary}</td>
                      <td className="py-3 text-sm text-gray-700">{r.department}</td>
                      <td className="py-3 text-sm">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${r.status === 'Implemented' ? 'bg-green-100 text-green-800' : r.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <div>1-4 of 4</div>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 border rounded">&lt;</button>
                <button className="px-3 py-1 border rounded">&gt;</button>
              </div>
            </div>
          </div>

          <aside className="col-span-3">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Search</label>
                <div className="mt-1 relative">
                  <input className="w-full border rounded px-3 py-2 pr-10" placeholder="Search summary, citizen..." />
                  <span className="absolute right-2 top-2 text-gray-400"><Search /></span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Date Range</label>
                <div className="mt-1 flex gap-2">
                  <input type="date" className="border rounded px-3 py-2 w-full" />
                  <input type="date" className="border rounded px-3 py-2 w-full" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>All Departments</option>
                  <option>Transport</option>
                  <option>Education</option>
                  <option>Finance</option>
                  <option>Rural Development</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>All Statuses</option>
                  <option>Submitted</option>
                  <option>Under Review</option>
                  <option>Implemented</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Region</label>
                <select className="mt-1 w-full border rounded px-3 py-2">
                  <option>All Regions</option>
                </select>
              </div>

              <div>
                <button className="w-full bg-jansoch-blue text-white py-2 rounded">Search</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
