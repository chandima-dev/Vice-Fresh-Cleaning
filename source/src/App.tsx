import { useState } from 'react'
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
// import { ReviewsSlider } from './Layout/ReviewsSlider.tsx'


type Page = 'home' | 'services' | 'about' | 'contact'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const handleNavigate = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <HeroSlider />
            <Services onViewAll={() => handleNavigate('services')} />
            <WhyChooseUs />
            {/* <ReviewsSlider /> */}
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

      {/* TopBar visible only on desktop */}
      <div className="hidden md:block fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* Navbar fixed at the very top */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      </div>

      {/* Main content padding */}
      <main className="pt-14 md:pt-[90px]">
        {renderContent()}
      </main>

      <Footer onNavigate={handleNavigate} />
      <WhatsAppWidget />
    </div>
  )
}

export default App