import { useParams, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const SAMPLE = [
  {
    id: 1,
    timestamp: "2024-04-19 14:23:45",
    citizen: "Citizen A",
    summary: "Improve road infrastructure in urban areas",
    department: "Transport",
    status: "Submitted",
    details: "Detailed suggestion to repair potholes and improve public transport connectivity.",
    reviews: [],
  },
  {
    id: 2,
    timestamp: "2024-04-18 09:37:12",
    citizen: "Citizen B",
    summary: "Enhance digital literacy programs in schools",
    department: "Education",
    status: "Under Review",
    details: "Proposal to include basic computer training in school curriculum.",
    reviews: [],
  },
  {
    id: 3,
    timestamp: "2024-04-18 11:09:58",
    citizen: "Citizen C",
    summary: "Implement online payment system for utilities",
    department: "Finance",
    status: "Implemented",
    details: "Request to enable online bill payment and receipts for utilities to reduce cash handling.",
    reviews: [
      { author: "Ministry Review", text: "Feature implemented across major metro cities.", rating: "positive" },
      { author: "Citizen Feedback", text: "Made payments easier, very helpful.", rating: "positive" },
      { author: "NGO Report", text: "Needs wider rollout to rural areas.", rating: "neutral" },
    ],
  },
  {
    id: 4,
    timestamp: "2024-04-15 10:44:37",
    citizen: "Citizen D",
    summary: "Install more street lighting in rural areas",
    department: "Rural Development",
    status: "Submitted",
    details: "Increase street lights in village main roads to improve safety.",
    reviews: [],
  },
];

export default function SubmissionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const record = useMemo(() => SAMPLE.find((s) => String(s.id) === String(id)), [id]);

  if (!record) {
    return (
      <div className="min-h-screen bg-jansoch-cream py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-semibold">Submission not found</h2>
          <p className="mt-2 text-sm text-gray-600">The submission you are looking for does not exist.</p>
        </div>
      </div>
    );
  }

  // Compute sentiment summary from reviews when implemented
  const reviews = record.reviews ?? [];
  const sentimentSummary = useMemo(() => {
    if (record.status !== "Implemented" || reviews.length === 0) return null;
    const counts = reviews.reduce(
      (acc: Record<string, number>, r: any) => {
        acc[r.rating] = (acc[r.rating] || 0) + 1;
        return acc;
      },
      { positive: 0, neutral: 0, negative: 0 },
    );

    // Determine dominant sentiment
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    const map: Record<string, { label: string; emoji: string; color: string }> = {
      positive: { label: "Positive", emoji: "😊", color: "text-green-600" },
      neutral: { label: "Neutral", emoji: "😐", color: "text-yellow-600" },
      negative: { label: "Negative", emoji: "😞", color: "text-red-600" },
    };

    return { counts, dominant: dominant ? dominant[0] : "neutral", ...map[dominant ? dominant[0] : "neutral"] };
  }, [record.status, reviews]);

  return (
    <div className="min-h-screen bg-jansoch-cream py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="px-3 py-1 rounded bg-white shadow-sm">Back</button>
          <h1 className="text-2xl font-bold">Submission #{record.id}</h1>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">{record.summary}</h2>
              <div className="text-sm text-gray-600">Submitted by {record.citizen} • {record.timestamp} • {record.department}</div>

              <div className="mt-4 text-gray-700">{record.details}</div>
            </div>

            <aside className="w-48">
              <div className="bg-gray-50 rounded p-4 text-center">
                {/* Only show sentiment box when implemented */}
                {record.status === "Implemented" ? (
                  <>
                    <div className={`text-4xl ${sentimentSummary?.color || "text-green-600"}`}>{sentimentSummary?.emoji || "😊"}</div>
                    <div className="mt-2 font-semibold">{sentimentSummary?.label || "Positive"}</div>
                    <div className="text-sm text-gray-600 mt-1">Status: {record.status}</div>
                  </>
                ) : (
                  <div className="text-sm text-gray-600">Status: {record.status}</div>
                )}
              </div>
            </aside>
          </div>

          {/* Reviews: show ONLY for implemented */}
          {record.status === "Implemented" && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Reviews</h3>

              {reviews.length === 0 ? (
                <p className="text-sm text-gray-600">No reviews available.</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-700 mb-2">
                    <div className="font-semibold">Summary:</div>
                    <div>Positive: {sentimentSummary?.counts.positive || 0} • Neutral: {sentimentSummary?.counts.neutral || 0} • Negative: {sentimentSummary?.counts.negative || 0}</div>
                  </div>

                  {reviews.map((rv: any, idx: number) => (
                    <div key={idx} className="border rounded p-3 bg-gray-50">
                      <div className="text-sm font-medium">{rv.author}</div>
                      <div className="text-sm text-gray-700 mt-1">{rv.text}</div>
                      <div className="text-xs mt-2 text-gray-500">Rating: {rv.rating}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Discussion / Notes</h3>
            <p className="text-sm text-gray-600">Officials can add notes here about how the submission was processed, comments from reviewers, and links to decisions.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
