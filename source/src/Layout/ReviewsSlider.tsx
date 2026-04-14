import { useEffect, useState, useRef } from "react"
import { Star, X, ImagePlus, CheckCircle, Loader2, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import {
  subscribeToReviews,
  submitReview,
  getUserLocation,
  type Review,
} from "../lib/reviewService"

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

function InteractiveStarRating({
  rating,
  onRate,
}: {
  rating: number
  onRate: (r: number) => void
}) {
  const [hover, setHover] = useState(0)

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRate(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="focus:outline-none transition-transform hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              star <= (hover || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300"
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ name, location, rating, comment, images }: Review) {
  return (
    <motion.div
      layout
      className="relative w-[320px] bg-white rounded-xl p-6 shadow-sm border border-slate-100 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-[2px] bg-blue-300"></div>
      <div className="absolute top-0 right-0 w-[1px] h-1/2 bg-blue-300"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-[2px] bg-emerald-300"></div>
      <div className="absolute bottom-0 left-0 w-[1px] h-1/2 bg-emerald-300"></div>

      <StarRating rating={rating} />

      <p className="text-slate-600 text-sm mt-3 mb-4">"{comment}"</p>

      {images && images.length > 0 && (
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Review photo ${i + 1}`}
              className="w-16 h-16 rounded-lg object-cover border border-slate-200"
            />
          ))}
        </div>
      )}

      <div>
        <p className="font-semibold text-sm">— {name}</p>
        {location && (
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {location}
          </p>
        )}
      </div>
    </motion.div>
  )
}

function AddReviewDialog({
  open,
  onClose,
  onSubmitted,
}: {
  open: boolean
  onClose: () => void
  onSubmitted: () => void
}) {
  const [name, setName] = useState("")
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [detectedLocation, setDetectedLocation] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      getUserLocation().then((loc) => setDetectedLocation(loc))
    }
  }, [open])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      setImageFiles((prev) => [...prev, file])
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImagePreviews((prev) => [...prev, ev.target!.result as string])
        }
      }
      reader.readAsDataURL(file)
    })
    if (fileRef.current) fileRef.current.value = ""
  }

  const removeImage = (idx: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== idx))
    setImagePreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleSubmit = async () => {
    if (!name.trim() || !comment.trim() || rating === 0) return
    setSubmitting(true)
    setError("")
    try {
      await submitReview(
        {
          name: name.trim(),
          location: detectedLocation,
          rating,
          comment: comment.trim(),
        },
        imageFiles
      )
      setSubmitted(true)
      onSubmitted()
    } catch {
      setError("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setName("")
    setRating(0)
    setComment("")
    setImageFiles([])
    setImagePreviews([])
    setSubmitted(false)
    setSubmitting(false)
    setError("")
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-2xl" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-slate-600 text-sm mb-6">
                  Your review has been submitted successfully.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      Write a Review
                    </h3>
                    <p className="text-xs text-slate-500">
                      Share your experience with Vice Fresh Cleaning
                    </p>
                  </div>
                </div>

                {detectedLocation && (
                  <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Posting from <strong>{detectedLocation}</strong></span>
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Your Rating
                  </label>
                  <InteractiveStarRating rating={rating} onRate={setRating} />
                  {rating > 0 && (
                    <p className="text-xs text-slate-500 mt-1">
                      {rating === 1 && "Poor"}
                      {rating === 2 && "Fair"}
                      {rating === 3 && "Good"}
                      {rating === 4 && "Very Good"}
                      {rating === 5 && "Excellent"}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John D."
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience..."
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Add Photos (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {imagePreviews.map((img, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={img}
                          alt={`Upload ${i + 1}`}
                          className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-colors"
                    >
                      <ImagePlus className="w-5 h-5" />
                      <span className="text-[10px] mt-0.5">Add</span>
                    </button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!name.trim() || !comment.trim() || rating === 0 || submitting}
                  className="w-full py-3 rounded-lg font-medium text-white transition-all bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export function ReviewsSlider() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [startIndex, setStartIndex] = useState(0)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Real-time listener — auto-updates when any review is added/changed
  useEffect(() => {
    const unsubscribe = subscribeToReviews((data) => {
      setReviews(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  // Slider rotation — shift by 1 every 3 seconds
  useEffect(() => {
    if (reviews.length <= 3) return

    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % reviews.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [reviews.length])

  // Pick up to 3 unique reviews starting from startIndex, wrapping around
  const visible: { review: Review; slot: number }[] = []
  const count = Math.min(3, reviews.length)
  for (let i = 0; i < count; i++) {
    const idx = (startIndex + i) % reviews.length
    visible.push({ review: reviews[idx], slot: idx })
  }

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-3xl font-bold">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-slate-500">
          No reviews yet. Be the first to share your experience!
        </p>
      ) : (
        <div className="flex justify-center gap-6 flex-wrap">
          <AnimatePresence mode="popLayout">
            {visible.map(({ review, slot }) => (
              <motion.div
                key={review.id || slot}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
              >
                <ReviewCard
                  name={review.name}
                  location={review.location}
                  rating={review.rating}
                  comment={review.comment}
                  images={review.images}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <div className="flex justify-center mt-10">
        <button
          onClick={() => setDialogOpen(true)}
          className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-600 rounded-full font-semibold hover:bg-emerald-600 hover:text-white transition-all shadow-sm hover:shadow-md"
        >
          <Star className="w-5 h-5 group-hover:fill-white transition-colors" />
          Add Your Review
        </button>
      </div>

      <AnimatePresence>
        {dialogOpen && (
          <AddReviewDialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            onSubmitted={() => {}}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
