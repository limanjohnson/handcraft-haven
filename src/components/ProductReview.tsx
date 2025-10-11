
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
    </div>
  )
}