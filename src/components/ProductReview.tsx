
'use client'

import { useEffect, useState } from 'react'

interface Rating {
  id: number
  user_id: number
  user_name: string
  product_id: number
  rating: number
  comment: string
  created_at: string
}

export default function ProductReviews({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/ratings?product_id=${productId}`)
        const data = await res.json()
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchReviews()
    }
  }, [productId])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newRating === 0) return alert("Please select a rating");

    setSubmitting(true);
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1, // THIS IS TEMPORARY, REPLACE WITH AUTH LOGIC
          user_name: "John Doe", // THIS IS TEMPORARY, REPLACE WITH AUTH LOGIC
          product_id: productId,
          rating: newRating,
          comment: newComment,
        }),
      });

      if (!res.ok) throw new Error("Error submitting review");

      const newReview = await res.json();
      setReviews([newReview, ...reviews]); // add new review to top
      setNewRating(0);
      setNewComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading reviews...</p>

  if (reviews.length === 0)
    return <div className="bg-white rounded-2xl shadow p-6 transition">
    <p className="text-gray-600">No reviews yet for this product.</p>
    </div>

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="bg-white rounded-2xl shadow p-4 transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{r.user_name}</span>
              <span className="text-yellow-500">
                {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
              </span>
            </div>
            <p className="text-gray-700">{r.comment}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(r.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>

      {/* FORM FOR NEW REVIEWS */}
      <form onSubmit={handleSubmit} className="mt-6 border-t pt-4">
        <h4 className="text-lg font-semibold mb-2">Leave a Review</h4>

        <div className="flex items-center gap-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setNewRating(star)}
              className={`text-2xl ${
                newRating >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </button>
          ))}
        </div>

        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write your review..."
          className="w-full border border-[#D4C5A9] rounded-md p-2 mb-3"
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-[#8B6F47] text-white px-4 py-2 rounded hover:bg-[#7a603e] transition-colors disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  )
}


