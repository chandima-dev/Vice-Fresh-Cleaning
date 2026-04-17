import { useEffect, useState } from 'react'
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
    if (isOpen) {
      setIsOpen(false)
      setTimeout(() => onNavigate(page), 300)
    } else {
      onNavigate(page)
    }
  }

  const navLinks = [
    { name: 'Home', page: 'home' as const },
    { name: 'Services', page: 'services' as const },
    { name: 'About Us', page: 'about' as const },
    { name: 'Contact', page: 'contact' as const },
  ]

  return (
    <nav
      className={`fixed top-0 sm:top-[32px] left-0 right-0 z-40 transition-all duration-300 overflow-hidden ${
        scrolled
          ? 'bg-white shadow-md py-0'
          : 'bg-white/95 backdrop-blur-sm py-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center"
            >
              <img
                src="/v_fresh.svg"
                alt="Vic Fresh Cleaning"
                className="h-16 sm:h-20 w-auto object-contain -my-2"
              />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page)}
                className={`font-medium transition-colors duration-200 ${
                  currentPage === link.page
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-blue-600'
                }`}
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('contact')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Get a Free Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex items-center justify-center text-slate-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.span
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <X className="w-6 h-6" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <Menu className="w-6 h-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden bg-slate-900 border-t border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-3 pb-5 space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.page)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    currentPage === link.page
                      ? 'text-emerald-400 bg-slate-800'
                      : 'text-slate-200 hover:text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <div className="pt-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                >
                  Get a Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}