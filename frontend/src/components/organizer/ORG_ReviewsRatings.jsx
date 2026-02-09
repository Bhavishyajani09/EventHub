import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewsRatings({ isDark }) {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    fiveStarCount: 0,
    fiveStarPercentage: 0,
    ratingBreakdown: []
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error('Please login to view reviews');
        return;
      }

      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews/organizer/my-reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setReviews(response.data.reviews);
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      label: "Average Rating",
      value: stats.averageRating > 0 ? stats.averageRating.toFixed(1) : "0.0"
    },
    {
      label: "Total Reviews",
      value: stats.totalReviews.toString(),
      sub: stats.totalReviews > 0 ? `${stats.fiveStarPercentage}% are 5-star` : ""
    },
    {
      label: "5-Star Reviews",
      value: stats.fiveStarCount.toString(),
      sub: stats.totalReviews > 0 ? `${stats.fiveStarPercentage}% of total` : ""
    },
    {
      label: "Recent Activity",
      value: reviews.length > 0 ? "Active" : "No reviews",
      sub: reviews.length > 0 ? "Latest reviews shown" : ""
    },
  ];

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reviews & Ratings</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

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
        {statsCards.map((item, i) => (
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
            {stats.ratingBreakdown.map((r) => (
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
                    style={{ width: stats.totalReviews > 0 ? `${(r.count / stats.totalReviews) * 100}%` : '0%' }}
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

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className={`text-6xl mb-4`}>⭐</div>
              <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No reviews yet
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Reviews from your event attendees will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[480px] overflow-y-auto pr-2">
              {reviews.map((review) => (
                <div key={review._id} className={`border-b pb-6 last:border-b-0 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="flex gap-4">

                    {/* Avatar */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${isDark ? 'bg-indigo-900/50 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                      {review.user?.name ? review.user.name.charAt(0).toUpperCase() : 'U'}
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {review.user?.name || 'Anonymous'}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {review.event?.title || 'Event'}
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                            {new Date(review.createdAt).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      {review.comment && (
                        <p className={`mt-3 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Improve Tips */}
      {reviews.length > 0 && (
        <div className={`border rounded-xl p-6 ${isDark ? 'bg-indigo-900/10 border-indigo-900/30' : 'bg-indigo-50 border-indigo-100'}`}>
          <h3 className={`font-semibold mb-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>Improve Your Ratings</h3>
          <ul className={`text-sm space-y-1 list-disc pl-5 ${isDark ? 'text-indigo-200' : 'text-gray-600'}`}>
            <li>Respond to reviews within 24–48 hours</li>
            <li>Thank attendees for positive feedback</li>
            <li>Address concerns from lower-rated reviews</li>
            <li>Use feedback to improve future events</li>
          </ul>
        </div>
      )}
    </div>
  );
}
