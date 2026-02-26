import React, { useEffect, useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
interface NavbarProps {
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void
  currentPage: 'home' | 'services' | 'about' | 'contact'
}
export function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const handleNavClick = (page: 'home' | 'services' | 'about' | 'contact') => {
    setIsOpen(false)
    onNavigate(page)
    window.scrollTo(0, 0)
  }
  const navLinks = [
    {
      name: 'Home',
      page: 'home' as const,
    },
    {
      name: 'Services',
      page: 'services' as const,
    },
    {
      name: 'About Us',
      page: 'about' as const,
    },
    {
      name: 'Contact',
      page: 'contact' as const,
    },
  ]
  return (
    <nav
      className={`fixed top-[36px] sm:top-[40px] left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3' : 'bg-white/95 backdrop-blur-sm py-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold text-slate-900 tracking-tight"
            >
              Vice Fresh <span className="text-blue-600">Cleaning</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`font-medium transition-colors duration-200 ${currentPage === link.page ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-blue-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 'auto',
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 shadow-inner">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.page)}
                  className={`block w-full text-left px-3 py-3 text-base font-medium rounded-lg transition-colors ${currentPage === link.page ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'}`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors shadow-sm"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
