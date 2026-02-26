import React from 'react'
import { Phone, Mail } from 'lucide-react'

export function TopBar() {
  return (
    <div className="bg-slate-900 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-end items-center h-9">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">

            <a
              href="tel:+61452240465"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>+61 452 240 465</span>
            </a>

            <a
              href="mailto:info@vicefreshcleaning.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@vicefreshcleaning.com</span>
            </a>

          </div>
        </div>

      </div>
    </div>
  )
}