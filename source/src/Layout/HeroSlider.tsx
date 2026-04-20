import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface Slide {
  id: number
  image: string
  title: string
  subtitle: string
  alt: string
}

const slides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80",
    title: "Professional Cleaning Services",
    subtitle: "We Make Your Space Sparkle",
    alt: "Office cleaning service",
  },
  {
    id: 2,
    image: "/Images/home-nav-1.jpg",
    title: "Residential Cleaning Experts",
    subtitle: "Coming Home Never Felt So Good",
    alt: "Home cleaning service",
  },
  {
    id: 3,
    image: "/Images/home-nav-3.jpg",
    title: "Deep Cleaning Solutions",
    subtitle: "Restoring Freshness to Every Corner",
    alt: "Bathroom deep cleaning",
  },
  {
    id: 4,
    image: "/Images/home-nav-2.jpg",
    title: "Trusted Cleaning Team",
    subtitle: "Reliable, Efficient, and Thorough",
    alt: "Professional cleaning team",
  },
]

export function HeroSlider() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [direction, setDirection] = useState<number>(0)

  const timerRef = useRef<number | null>(null)

  /* ---------------- Image Preload ---------------- */
  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image()
      img.src = slide.image
    })
  }, [])

  /* ---------------- Auto Slide ---------------- */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [currentIndex])

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  /* ---------------- Animation ---------------- */

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  return (
    <section className="relative h-[600px] md:h-screen w-full overflow-hidden bg-slate-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="absolute inset-0 will-change-transform"
        >
          {/* Background */}
          <div className="relative w-full h-full">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start px-8 max-w-7xl mx-auto">
            <div className="max-w-xl text-white">
              <motion.h1
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {slides[currentIndex].title}
              </motion.h1>

              <motion.p
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl mb-8 text-slate-200"
              >
                {slides[currentIndex].subtitle}
              </motion.p>

              <motion.button
                onClick={() => navigate("/contact")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-full font-semibold"
              >
                Get a Free Quote
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 text-white items-center justify-center"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 text-white items-center justify-center"
      >
        <ChevronRight size={32} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-full transition-all ${
              currentIndex === index
                ? "w-8 bg-emerald-500"
                : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  )
}