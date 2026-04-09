import { useState, useEffect } from 'react'
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

type Page = 'home' | 'services' | 'about' | 'contact'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  // ✅ Navigation only updates state
  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
  }

  // ✅ GLOBAL scroll fix (works for ALL pages)
  useEffect(() => {
    // small delay ensures DOM is rendered (important for mobile)
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // change to 'smooth' if you want
      })
    }, 0)
  }, [currentPage])

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSlider />
            <Services onViewAll={() => handleNavigate('services')} />
            <ReviewsSlider />
            <WhyChooseUs />
          </>
        )

      case 'services':
        return <ServiceDetail onBack={() => handleNavigate('home')} />

      case 'about':
        return <AboutUsPage onNavigate={handleNavigate} />

      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      </div>

      {/* Main Content */}
      <main className="pt-16 md:pt-[90px]">
        {renderContent()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* WhatsApp */}
      <WhatsAppWidget />
    </div>
  )
}

export default App