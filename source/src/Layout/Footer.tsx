import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  MessageCircle,
  CreditCard,
} from 'lucide-react'
interface FooterProps {
  onNavigate?: (page: any) => void
}
// Simple X (Twitter) icon since lucide doesn't have the new X logo
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}
// Payment method card component
function PaymentBadge({ name, icon }: { name: string; icon: React.ReactNode }) {
  return (
    <div className="bg-slate-800 rounded-lg px-3 py-2 flex items-center gap-2 text-slate-300 text-xs font-medium">
      {icon}
      <span>{name}</span>
    </div>
  )
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
            {/* Social Media Icons */}
            <div className="flex space-x-3">
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

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">
              Payment Methods
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <PaymentBadge
                name="Visa"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                  >
                    <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102h2.037zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.48-.013 1.08.963 1.684 1.7 2.044.756.368 1.01.604 1.006.933-.005.504-.603.726-1.16.735-.975.015-1.54-.263-1.992-.474l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.375-2.571zm5.06 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488l.232 1.12zm-2.163-2.656l1.02-2.815.588 2.815h-1.608zm-8.16 2.656l1.603-7.496H11.46l-1.603 7.496h2.025z" />
                  </svg>
                }
              />
              <PaymentBadge
                name="MasterCard"
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                    <circle cx="9" cy="12" r="5" fill="#EB001B" opacity="0.8" />
                    <circle
                      cx="15"
                      cy="12"
                      r="5"
                      fill="#F79E1B"
                      opacity="0.8"
                    />
                  </svg>
                }
              />
              <PaymentBadge
                name="PayPal"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-blue-400"
                    fill="currentColor"
                  >
                    <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944 2.23A.77.77 0 015.704 1.6h6.176c2.05 0 3.592.526 4.578 1.564.436.46.735.984.896 1.562.17.6.183 1.32.042 2.14l-.01.06v.52l.407.23c.35.18.63.39.84.63.34.39.56.87.65 1.42.1.57.07 1.23-.08 1.96-.18.84-.47 1.57-.87 2.17-.37.56-.83 1.01-1.37 1.35-.52.33-1.12.57-1.79.72-.65.14-1.37.21-2.14.21h-.51a1.54 1.54 0 00-1.52 1.3l-.04.21-.64 4.08-.03.15a.15.15 0 01-.15.13H7.076z" />
                  </svg>
                }
              />
              <PaymentBadge
                name="Amex"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-blue-300"
                    fill="currentColor"
                  >
                    <rect
                      x="1"
                      y="4"
                      width="22"
                      height="16"
                      rx="2"
                      fill="currentColor"
                      opacity="0.2"
                    />
                    <text
                      x="12"
                      y="14"
                      textAnchor="middle"
                      fontSize="6"
                      fontWeight="bold"
                      fill="currentColor"
                    >
                      AMEX
                    </text>
                  </svg>
                }
              />
              <PaymentBadge
                name="Apple Pay"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-slate-300"
                    fill="currentColor"
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                }
              />
              <PaymentBadge
                name="Google Pay"
                icon={
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                    <path
                      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      fill="#94A3B8"
                    />
                  </svg>
                }
              />
            </div>
            <div className="mt-4 flex items-center gap-2 text-slate-500 text-xs">
              <CreditCard className="w-4 h-4" />
              <span>Secure payments accepted</span>
            </div>
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
