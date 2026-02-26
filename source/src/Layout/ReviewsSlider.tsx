import React, { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const reviews = [
  { name: "Sarah M.", rating: 5, comment: "Absolutely spotless service." },
  { name: "James L.", rating: 5, comment: "Got our full bond back!" },
  { name: "Priya K.", rating: 4, comment: "Very reliable every visit." },
  { name: "Michael T.", rating: 5, comment: "Office looks amazing now." },
  { name: "Emma W.", rating: 5, comment: "Friendly and eco-friendly team." },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-slate-300"
          }`}
        />
      ))}
    </div>
  )
}

function ReviewCard({
  name,
  rating,
  comment,
}: {
  name: string
  rating: number
  comment: string
}) {
  return (
    <motion.div
      layout
      className="w-[320px] bg-white rounded-xl p-6 shadow-sm border border-slate-100"
    >
      <StarRating rating={rating} />
      <p className="text-slate-600 text-sm mt-3 mb-4">
        "{comment}"
      </p>
      <p className="font-semibold text-sm">— {name}</p>
    </motion.div>
  )
}

export function ReviewsSlider() {
  const [visible, setVisible] = useState(reviews.slice(0, 3))
  const [index, setIndex] = useState(3)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prev) => {
        const nextItem = reviews[index % reviews.length]
        setIndex((i) => i + 1)
        return [prev[1], prev[2], nextItem]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [index])

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>
      </div>

      <div className="flex justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {visible.map((review) => (
            <motion.div
              key={review.name + review.comment}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.6 }}
            >
              <ReviewCard
                name={review.name}
                rating={review.rating}
                comment={review.comment}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  )
}