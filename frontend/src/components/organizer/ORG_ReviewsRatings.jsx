import React from "react";
import { Star } from "lucide-react";

export default function ReviewsRatings({ isDark }) {
  const stats = [
    { label: "Average Rating", value: "4.5" },
    { label: "Total Reviews", value: "240", sub: "+12% this month" },
    { label: "5-Star Reviews", value: "156", sub: "65% of total" },
    { label: "Response Rate", value: "89%", sub: "Helpful marks" },
  ];

  const ratingBreakdown = [
    { star: 5, count: 156 },
    { star: 4, count: 52 },
    { star: 3, count: 18 },
    { star: 2, count: 8 },
    { star: 1, count: 6 },
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      initials: "SJ",
      event: "Summer Music Festival 2024",
      date: "2024-06-18",
      text:
        "Amazing event! The organization was flawless and the lineup was incredible. Definitely attending next year!",
      helpful: 24,
    },
    {
      name: "Mike Chen",
      initials: "MC",
      event: "Tech Innovation Summit",
      date: "2024-06-17",
      text:
        "Great speakers and networking opportunities. Venue was a bit crowded but overall excellent experience.",
      helpful: 18,
    },
    {
      name: "Emily Davis",
      initials: "ED",
      event: "Gourmet Food Festival",
      date: "2024-06-16",
      text:
        "Absolutely loved it! So many amazing vendors and the variety was outstanding. Will recommend to friends.",
      helpful: 31,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reviews & Ratings</h1>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          See what attendees are saying about your events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className={`border rounded-xl p-5 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</p>
            <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.value}</p>
            {item.sub && (
              <p className="text-sm text-green-500 mt-1">{item.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Rating Distribution + Recent Reviews */}
      <div className="grid grid-cols-12 gap-6">

        {/* ===== Rating Distribution (4 Columns) ===== */}
        <div className={`col-span-12 lg:col-span-3 border rounded-xl p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`font-semibold text-lg mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Rating Distribution
          </h2>

          <div className="space-y-3">
            {ratingBreakdown.map((r) => (
              <div key={r.star} className="flex items-center gap-3">

                <div className={`flex items-center gap-1 w-12 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
                  <span>{r.star}</span>
                  <Star
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                </div>

                <div className={`flex-1 h-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-2 bg-indigo-500 rounded"
                    style={{ width: `${(r.count / 240) * 100}%` }}
                  />
                </div>

                <span className={`text-sm w-10 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {r.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Recent Reviews (8 Columns) ===== */}
        <div className={`col-span-12 lg:col-span-9 border rounded-xl p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h2 className={`font-semibold text-lg mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Recent Reviews
          </h2>

          <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2">
            {reviews.map((r, i) => (
              <div key={i} className={`border-b pb-6 last:border-b-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex gap-4">

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${isDark ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                    {r.initials}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{r.name}</p>
                        <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                          {r.event}
                        </p>
                      </div>
                      <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        {r.date}
                      </p>
                    </div>

                    <p className={`mt-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {r.text}
                    </p>

                    <div className={`mt-3 flex items-center gap-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>Helpful ({r.helpful})</span>
                      <button className="text-indigo-600 font-medium hover:underline">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Improve Tips */}
      <div className={`border rounded-xl p-6 ${isDark ? 'bg-indigo-900/10 border-indigo-900/30' : 'bg-indigo-50 border-indigo-100'}`}>
        <h3 className={`font-semibold mb-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Improve Your Ratings</h3>
        <ul className={`text-sm space-y-1 list-disc pl-5 ${isDark ? 'text-indigo-200' : 'text-gray-600'}`}>
          <li>Respond to reviews within 24–48 hours</li>
          <li>Thank attendees for positive feedback</li>
          <li>Address concerns from lower-rated reviews</li>
          <li>Use feedback to improve future events</li>
        </ul>
      </div>
    </div>
  );
}
