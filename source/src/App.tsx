import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { TopBar } from './Layout/TopBar'
import { Navbar } from './Layout/Navbar'
import { HeroSlider } from './Layout/HeroSlider'
import { Services } from './Components/Services/Services'
import { WhyChooseUs } from './Pages/WhyChooseUs'
import { Footer } from './Layout/Footer'
import { WhatsAppWidget } from './Layout/WhatsAppWidget'
import { ServiceDetail } from './Pages/ServicesDetail'
import { AboutUsPage } from './Pages/AboutUsPage'
import { ContactPage } from './Pages/ContactPage'
import { ReviewsSlider } from './Layout/ReviewsSlider'

function HomePage() {
  return (
    <>
      <HeroSlider />
      <Services />
      <ReviewsSlider />
      <WhyChooseUs />
    </>
  )
}

function App() {
  const location = useLocation()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      })
    }, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="pt-16 md:pt-[90px]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceDetail />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  )
}

export default App
