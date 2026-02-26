import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80',
    title: 'Professional Cleaning Services',
    subtitle: 'We Make Your Space Sparkle',
    alt: 'Office cleaning service',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80',
    title: 'Residential Cleaning Experts',
    subtitle: 'Coming Home Never Felt So Good',
    alt: 'Home cleaning service',
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=1600&q=80',
    title: 'Deep Cleaning Solutions',
    subtitle: 'Restoring Freshness to Every Corner',
    alt: 'Bathroom deep cleaning',
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1527515637462-cee1395c108c?w=1600&q=80',
    title: 'Trusted Cleaning Team',
    subtitle: 'Reliable, Efficient, and Thorough',
    alt: 'Professional cleaning team',
  },
]
export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000) // Changed to 5s for better readability
    return () => clearInterval(timer)
  }, [currentIndex])
  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }
  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }
  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }
  return (
    <section
      id="home"
      className="relative h-[600px] md:h-screen w-full overflow-hidden bg-slate-900"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: {
              type: 'spring',
              stiffness: 300,
              damping: 30,
            },
            opacity: {
              duration: 0.2,
            },
          }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div className="relative w-full h-full">
            <img
              src={slides[currentIndex].image}
              alt={slides[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="max-w-xl text-center md:text-left text-white z-10">
              <motion.h1
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
                className="text-4xl md:text-6xl font-bold mb-4 leading-tight"
              >
                {slides[currentIndex].title}
              </motion.h1>
              <motion.p
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.5,
                }}
                className="text-xl md:text-2xl text-slate-200 mb-8 font-light"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
              <motion.div
                initial={{
                  y: 20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 0.6,
                  duration: 0.5,
                }}
              >
                <a
                  href="#contact"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
