import React from "react";
import { Star } from "lucide-react";

export default function ReviewsRatings() {
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
        <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
        <p className="text-gray-500">
          See what attendees are saying about your events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((item, i) => (
          <div key={i} className="bg-white border rounded-xl p-5">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
            {item.sub && (
              <p className="text-sm text-green-500 mt-1">{item.sub}</p>
            )}
          </div>
        ))}
      </div>

      {/* Rating Distribution */}
      {/* <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-4">Rating Distribution</h2>

        <div className="space-y-3">
          {ratingBreakdown.map((r) => (
            <div key={r.star} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-12">
                <span>{r.star}</span>
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
              </div>

              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-indigo-500 rounded"
                  style={{ width: `${(r.count / 240) * 100}%` }}
                />
              </div>

              <span className="text-sm text-gray-600 w-10">{r.count}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Recent Reviews */}
      {/* <div className="bg-white border rounded-xl p-6">
        <h2 className="font-semibold text-lg mb-6">Recent Reviews</h2>

        <div className="space-y-6">
          {reviews.map((r, i) => (
            <div key={i} className="border-b pb-6 last:border-b-0">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
                  {r.initials}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{r.name}</p>
                      <p className="text-sm text-gray-500">{r.event}</p>
                    </div>
                    <p className="text-sm text-gray-400">{r.date}</p>
                  </div>

                  <p className="mt-3 text-gray-700">{r.text}</p>

                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
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
      </div>  */}


{/* Rating Distribution + Recent Reviews */}
<div className="grid grid-cols-12 gap-6">

  {/* ===== Rating Distribution (4 Columns) ===== */}
  <div className="col-span-12 lg:col-span-3 bg-white border rounded-xl p-6">
    <h2 className="font-semibold text-lg mb-4">
      Rating Distribution
    </h2>

    <div className="space-y-3">
      {ratingBreakdown.map((r) => (
        <div key={r.star} className="flex items-center gap-3">
          
          <div className="flex items-center gap-1 w-12">
            <span>{r.star}</span>
            <Star
              size={14}
              className="text-yellow-400 fill-yellow-400"
            />
          </div>

          <div className="flex-1 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-indigo-500 rounded"
              style={{ width: `${(r.count / 240) * 100}%` }}
            />
          </div>

          <span className="text-sm text-gray-600 w-10">
            {r.count}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* ===== Recent Reviews (8 Columns) ===== */}
  <div className="col-span-12 lg:col-span-9 bg-white border rounded-xl p-6">
    <h2 className="font-semibold text-lg mb-6">
      Recent Reviews
    </h2>

    <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2">
      {reviews.map((r, i) => (
        <div key={i} className="border-b pb-6 last:border-b-0">
          <div className="flex gap-4">
            
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
              {r.initials}
            </div>

            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{r.name}</p>
                  <p className="text-sm text-gray-500">
                    {r.event}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {r.date}
                </p>
              </div>

              <p className="mt-3 text-gray-700 text-sm">
                {r.text}
              </p>

              <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
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
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <h3 className="font-semibold mb-2">Improve Your Ratings</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc pl-5">
          <li>Respond to reviews within 24–48 hours</li>
          <li>Thank attendees for positive feedback</li>
          <li>Address concerns from lower-rated reviews</li>
          <li>Use feedback to improve future events</li>
        </ul>
      </div>
    </div>
  );
}
