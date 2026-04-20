import React from 'react'
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// Simple X (Twitter) icon since lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const pageToPath: Record<string, string> = {
  home: '/',
  services: '/services',
  about: '/about',
  contact: '/contact',
}

export function Footer() {
  const navigate = useNavigate()

  const handleNav = (page: string, e: React.MouseEvent) => {
    e.preventDefault()
    navigate(pageToPath[page] || '/')
    window.scrollTo(0, 0)
  }

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left Column: Brand + Social */}
          <div className="space-y-6">
            <a
              href="#home"
              onClick={(e) => handleNav('home', e)}
              className="text-2xl font-bold text-white tracking-tight inline-block"
            >
              Vic Fresh <span className="text-emerald-400">Cleaning</span>
            </a>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Making your space sparkle since 2020. We provide professional,
              reliable, and eco-friendly cleaning services for homes and
              businesses across Melbourne.
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5 text-white" />
              </a>

              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-slate-600 transition-colors duration-300"
                aria-label="X (Twitter)"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/61452240465"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-full hover:bg-green-600 transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Center Column: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNav('home', e)}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNav('services', e)}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNav('about', e)}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNav('contact', e)}
                  className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Right Column: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-emerald-400">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+61423557742"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    +61 423 557 742
                  </a>
                  <a
                    href="tel:+61422790822"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    +61 422 790 822
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                <a
                  href="mailto:info@vicfreshcleaning.com.au"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  info@vicfreshcleaning.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400">
                  7/597-605, Clayton Road
                  <br />
                  Clarinda
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Vic Fresh Cleaning. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}