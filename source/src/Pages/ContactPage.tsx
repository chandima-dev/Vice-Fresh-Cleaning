import React, { useEffect, useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import {
  Phone,
  Mail,
  Send,
  ArrowLeft,
  Clock,
  ChevronDown,
  XIcon,
} from 'lucide-react'
interface ContactPageProps {
  onNavigate: (page: 'home') => void
}

const serviceOptions = [
  'Residential Cleaning',
  'Office Cleaning',
  'Deep Cleaning',
  'End of Lease Cleaning',
  'Builders Cleaning',
  'Restaurant & Cafe Cleaning',
  'Pressure Washing',
  'Window Cleaning',
  'Upholstery Cleaning',
  'Oven & BBQ Cleaning',
  'Carpet Cleaning',
  'Move-In / Move-Out',
]
export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    selectedServices: [] as string[],
    serviceArea: '',
    message: '',
  })
  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([])
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const addressRef = useRef<HTMLDivElement>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const autocompleteService = useRef<google.maps.places.AutocompleteService | null>(null)
  const googleLoaded = useRef(false)

  // Load Google Maps Places library
  useEffect(() => {
    if (googleLoaded.current) return
    googleLoaded.current = true

    const apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY
    if (!apiKey || apiKey === 'YOUR_GOOGLE_API_KEY_HERE') {
      console.warn('Google Places API key not configured. Falling back to free geocoding.')
      return
    }

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
    script.async = true
    script.onload = () => {
      autocompleteService.current = new google.maps.places.AutocompleteService()
    }
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close address suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (addressRef.current && !addressRef.current.contains(event.target as Node)) {
        setAddressSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchAddressSuggestions = (query: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)

    if (query.length < 3) {
      setAddressSuggestions([])
      setIsLoadingSuggestions(false)
      return
    }

    setIsLoadingSuggestions(true)

    debounceTimer.current = setTimeout(async () => {
      // Use Google Places if available
      if (autocompleteService.current) {
        autocompleteService.current.getPlacePredictions(
          {
            input: query,
            componentRestrictions: { country: 'au' },
            types: ['address'],
          },
          (predictions, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              setAddressSuggestions(predictions.map((p) => p.description))
            } else {
              setAddressSuggestions([])
            }
            setIsLoadingSuggestions(false)
          }
        )
        return
      }

      // Fallback to free Photon API
      try {
        const res = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=6&lang=en&layer=house&layer=street&layer=locality&layer=city&layer=state`
        )
        const data = await res.json()
        const suggestions = data.features.map((f: any) => {
          const p = f.properties
          const parts = [p.name, p.housenumber, p.street, p.city || p.locality, p.state, p.postcode, p.country].filter(Boolean)
          return parts.join(', ')
        })
        setAddressSuggestions(suggestions)
      } catch {
        setAddressSuggestions([])
      } finally {
        setIsLoadingSuggestions(false)
      }
    }, 300)
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }
  const toggleService = (service: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }))
  }
  const removeService = (service: string) => {
    setFormState((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((s) => s !== service),
    }))
  }
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  const templateParams = {
    name: formState.name,
    email: formState.email,
    phone: formState.phone,
    services:
      formState.selectedServices.length > 0
        ? formState.selectedServices.join(', ')
        : 'Not specified',
    service_area: formState.serviceArea || 'Not specified',
    message: formState.message,
  }

  emailjs
    .send(
      'service_ch58b2n',    // replace with EmailJS Service ID
      'template_2t2n7wj',   // replace with EmailJS Template ID
      templateParams,
      'UMxrSyqjPo_LH_Ntr'     // replace with EmailJS Public Key
    )
    .then(
      (response) => {
        console.log('SUCCESS!', response.status, response.text)
        alert('Your message has been sent successfully!')
        setFormState({
          name: '',
          email: '',
          phone: '',
          selectedServices: [],
          serviceArea: '',
          message: '',
        })
        setIsSubmitting(false)
      },
      (err) => {
        console.error('FAILED...', err)
        alert('Failed to send message. Please try again later.')
        setIsSubmitting(false)
      }
    )
}
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Header */}
      <div className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Ready to get started? Get in touch with us today for a free quote or
            to schedule your cleaning service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="space-y-8"
          >
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 h-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Get In Touch
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">Phone</p>
                    <div className="text-lg font-semibold text-slate-900 flex flex-col">
                      <a
                        href="tel:+61423557742"
                        className="hover:text-blue-600 transition-colors"
                      >
                        +61 423 557 742
                      </a>
                      <a
                        href="tel:61422790822"
                        className="hover:text-blue-600 transition-colors"
                      >
                        +61 422 790 822
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@vicfreshcleaning.com.au"
                      className="text-lg font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      info@vicfreshcleaning.com.au
                    </a>
                  </div>
                </div>

                {/* <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">
                      Location
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      15 Collins Street
                    </p>
                    <p className="text-slate-600">
                      Melbourne, VIC 3000, Australia
                    </p>
                  </div>
                </div> */}

                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-lg shadow-sm text-blue-600">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500 mb-1">
                      Business Hours
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      Mon - Sat: 7am - 7pm
                    </p>
                    <p className="text-slate-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send a Message
              </h3>
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      required
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="+61 423 557 742"
                    />
                  </div>
                </div>

                {/* Select Services (Multi-select Dropdown) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Select Service(s)
                  </label>
                  <div ref={dropdownRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white text-left flex items-center justify-between"
                    >
                      <span
                        className={
                          formState.selectedServices.length > 0
                            ? 'text-slate-900'
                            : 'text-slate-400'
                        }
                      >
                        {formState.selectedServices.length > 0
                          ? `${formState.selectedServices.length} service${formState.selectedServices.length > 1 ? 's' : ''} selected`
                          : 'Choose services you need...'}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* Selected service tags */}
                    {formState.selectedServices.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formState.selectedServices.map((service) => (
                          <span
                            key={service}
                            className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-1.5 rounded-full border border-emerald-200"
                          >
                            {service}
                            <button
                              type="button"
                              onClick={() => removeService(service)}
                              className="hover:text-emerald-900 transition-colors"
                            >
                              <XIcon className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Dropdown options */}
                    {isDropdownOpen && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {serviceOptions.map((service) => {
                          const isSelected =
                            formState.selectedServices.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => toggleService(service)}
                              className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors ${isSelected ? 'bg-emerald-50 text-emerald-700' : 'text-slate-700 hover:bg-slate-50'}`}
                            >
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${isSelected ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}
                              >
                                {isSelected && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                              {service}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Service Area with Autocomplete */}
                <div className="relative" ref={addressRef}>
                  <label
                    htmlFor="serviceArea"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Where do you need the service?
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="serviceArea"
                      name="serviceArea"
                      value={formState.serviceArea}
                      onChange={(e) => {
                        const val = e.target.value
                        setFormState({ ...formState, serviceArea: val })
                        fetchAddressSuggestions(val)
                      }}
                      autoComplete="off"
                      placeholder="Start typing an address..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    />
                    {isLoadingSuggestions && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Suggestions Dropdown */}
                  {addressSuggestions.length > 0 && (
                    <ul className="absolute z-20 w-full bg-white border border-slate-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto">
                      {addressSuggestions.map((addr, idx) => (
                        <li
                          key={idx}
                          onClick={() => {
                            setFormState({ ...formState, serviceArea: addr })
                            setAddressSuggestions([])
                          }}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-100 last:border-0 flex items-start gap-2"
                        >
                          <svg className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{addr}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Tell us about your cleaning needs..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:-translate-y-1'}`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
