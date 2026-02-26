import React from 'react'
import { motion } from 'framer-motion'
import {
  Home,
  Building2,
  Sparkles,
  Brush,
  Wind,
  Truck,
  Hammer,
  Utensils,
  Droplets,
  Sofa,
  Flame,
  ArrowLeft,
} from 'lucide-react'
interface ServiceDetailProps {
  onBack: () => void
}
const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description:
      'Comprehensive cleaning for your entire home. We cover everything from dusting and vacuuming to kitchen and bathroom sanitization. Our team ensures your living space is healthy, tidy, and welcoming.',
    features: [
      'Dusting & Vacuuming',
      'Kitchen & Bathroom Sanitization',
      'Floor Mopping',
      'Trash Removal',
    ],
  },
  {
    icon: Building2,
    title: 'Office Cleaning',
    description:
      'Maintain a professional image with our office cleaning services. We create a clean, hygienic workspace that boosts employee productivity and leaves a lasting impression on clients.',
    features: [
      'Desk & Workstation Cleaning',
      'Restroom Sanitization',
      'Common Area Maintenance',
      'Waste Management',
    ],
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description:
      'A thorough top-to-bottom clean that reaches every nook and cranny. Perfect for spring cleaning or when your space needs extra attention to detail.',
    features: [
      'Behind Appliances',
      'Inside Cabinets',
      'Baseboards & Door Frames',
      'Light Fixtures & Fans',
    ],
  },
  {
    icon: Truck,
    title: 'End of Lease Cleaning',
    description:
      'Secure your bond back with our specialized end of lease cleaning. We follow strict agency checklists to ensure the property is returned in pristine condition.',
    features: [
      'Bond Back Guarantee',
      'Checklist Based Cleaning',
      'Real Estate Approved',
      'Key Pick-up/Drop-off',
    ],
  },
  {
    icon: Hammer,
    title: 'Builders Cleaning',
    description:
      'Post-construction cleaning to remove dust, debris, and construction residue. We turn your newly built or renovated property into a sparkling, move-in ready space.',
    features: [
      'Debris Removal',
      'Fine Dust Cleaning',
      'Paint Spot Removal',
      'Window Sticker Removal',
    ],
  },
  {
    icon: Utensils,
    title: 'Restaurant & Cafe Cleaning',
    description:
      'Specialized cleaning for hospitality venues. We ensure your kitchen and dining areas meet strict health and safety standards while looking inviting for customers.',
    features: [
      'Kitchen Degreasing',
      'Floor Scrubbing',
      'Dining Area Sanitization',
      'Health Code Compliance',
    ],
  },
  {
    icon: Droplets,
    title: 'Pressure Washing',
    description:
      'High-pressure cleaning for exterior surfaces. We remove dirt, mold, and grime from driveways, patios, decks, and building exteriors to restore their original look.',
    features: [
      'Driveways & Paths',
      'Patios & Decks',
      'Exterior Walls',
      'Graffiti Removal',
    ],
  },
  {
    icon: Wind,
    title: 'Window Cleaning',
    description:
      'Professional window cleaning for crystal clear views. We clean both interior and exterior windows, including screens and tracks, for a streak-free finish.',
    features: [
      'Interior & Exterior',
      'Screens & Tracks',
      'Streak-Free Finish',
      'High Reach Capability',
    ],
  },
  {
    icon: Sofa,
    title: 'Upholstery Cleaning',
    description:
      'Revitalize your furniture with our upholstery cleaning service. We remove stains, odors, and allergens from sofas, chairs, and other fabric furniture.',
    features: [
      'Stain Removal',
      'Odor Elimination',
      'Fabric Protection',
      'Allergen Reduction',
    ],
  },
  {
    icon: Flame,
    title: 'Oven & BBQ Cleaning',
    description:
      'Tough cleaning for greasy ovens and BBQs. We use specialized products to cut through baked-on grease and carbon, leaving your appliances looking like new.',
    features: [
      'Grease Removal',
      'Rack Soaking',
      'Glass Polishing',
      'Carbon Deposit Removal',
    ],
  },
  {
    icon: Brush,
    title: 'Carpet Cleaning',
    description:
      'Professional steam cleaning to restore your carpets. We remove deep-seated dirt, stains, and allergens, extending the life of your carpets.',
    features: [
      'Steam Cleaning',
      'Stain Treatment',
      'Deodorizing',
      'Quick Drying',
    ],
  },
  {
    icon: Truck,
    title: 'Move-In / Move-Out',
    description:
      'Stress-free cleaning for your move. Whether you are moving in or out, we ensure the property is spotless and ready for the next chapter.',
    features: [
      'Whole House Clean',
      'Cabinet Cleaning',
      'Appliance Cleaning',
      'Floor Care',
    ],
  },
]
export function ServiceDetail({ onBack }: ServiceDetailProps) {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      {/* Hero Header */}
      <div className="bg-blue-600 text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Comprehensive cleaning solutions for every need. From residential to
            commercial, we have you covered with professional excellence.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col md:flex-row gap-6"
            >
              <div className="shrink-0">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <service.icon className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-sm text-slate-700"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
