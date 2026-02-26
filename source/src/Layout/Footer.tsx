import React from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from 'lucide-react'
interface FooterProps {
  onNavigate?: (page: any) => void
}
export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault()
      onNavigate(page)
      window.scrollTo(0, 0)
    }
  }
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <a
              href="#home"
              onClick={(e) => handleNav('home', e)}
              className="text-2xl font-bold text-white tracking-tight inline-block"
            >
              Vice Fresh <span className="text-blue-500">Cleaning</span>
            </a>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              Making your space sparkle since 2020. We provide professional,
              reliable, and eco-friendly cleaning services for homes and
              businesses across Melbourne.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-slate-800 p-2 rounded-full hover:bg-pink-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">
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

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <a
                  href="tel:+61452240465"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  +61 452 240 465
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <a
                  href="mailto:info@vicefreshcleaning.com"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  info@vicefreshcleaning.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <span className="text-slate-400">
                  15 Collins Street
                  <br />
                  Melbourne, VIC 3000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Vice Fresh Cleaning. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
