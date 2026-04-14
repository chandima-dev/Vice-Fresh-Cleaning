import { ref as dbRef, push, query, orderByChild, onValue } from "firebase/database"
import { rtdb } from "./firebase"

export interface Review {
  id?: string
  name: string
  location: string
  rating: number
  comment: string
  images?: string[]
  createdAt?: number
}

function compressImage(file: File, maxWidth = 400, quality = 0.6): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL("image/jpeg", quality))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export async function getUserLocation(): Promise<string> {
  try {
    const res = await fetch("https://ipapi.co/json/")
    if (!res.ok) throw new Error("Failed")
    const data = await res.json()
    const city = data.city || ""
    const region = data.region || ""
    const country = data.country_name || ""
    const parts = [city, region, country].filter(Boolean)
    return parts.join(", ")
  } catch {
    return ""
  }
}

export async function submitReview(
  review: Omit<Review, "id" | "createdAt">,
  imageFiles: File[]
): Promise<void> {
  const images: string[] = []

  for (const file of imageFiles) {
    const compressed = await compressImage(file)
    images.push(compressed)
  }

  const reviewsRef = dbRef(rtdb, "reviews")
  await push(reviewsRef, {
    name: review.name,
    location: review.location,
    rating: review.rating,
    comment: review.comment,
    images,
    createdAt: Date.now(),
  })
}

export function subscribeToReviews(
  callback: (reviews: Review[]) => void
): () => void {
  const reviewsRef = dbRef(rtdb, "reviews")
  const q = query(reviewsRef, orderByChild("createdAt"))

  const unsubscribe = onValue(q, (snapshot) => {
    if (!snapshot.exists()) {
      callback([])
      return
    }

    const reviews: Review[] = []
    snapshot.forEach((child) => {
      reviews.push({ id: child.key!, ...child.val() })
    })

    callback(reviews.reverse())
  })

  return unsubscribe
}
