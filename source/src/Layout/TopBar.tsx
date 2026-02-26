import React from 'react'
import { Phone, Mail } from 'lucide-react'
export function TopBar() {
  return (
    <div className="hidden sm:block bg-slate-900 text-white py-2 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-row gap-2 items-center justify-end">
        {/* Contact Info */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:+61452240465"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>+61 452 240 465</span>
          </a>
          <a
            href="mailto:info@vicefreshcleaning.com"
            className="flex items-center gap-2 hover:text-blue-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>info@vicefreshcleaning.com</span>
          </a>
        </div>
      </div>
    </div>
  )
}
