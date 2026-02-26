import { motion } from 'framer-motion'
import {
  Home,
  Building2,
  Sparkles,
  Brush,
  Wind,
  Truck,
  ArrowRight,
} from 'lucide-react'
interface ServicesProps {
  onViewAll: () => void
}
const services = [
  {
    icon: Home,
    title: 'Residential Cleaning',
    description:
      'Thorough cleaning for your home, from kitchen to bedroom. We ensure every corner is spotless.',
  },
  {
    icon: Building2,
    title: 'Office Cleaning',
    description:
      'Keep your workspace spotless and professional. Boost productivity with a clean environment.',
  },
  {
    icon: Sparkles,
    title: 'Deep Cleaning',
    description:
      'Intensive cleaning for those hard-to-reach areas. Perfect for spring cleaning or special occasions.',
  },
  {
    icon: Brush,
    title: 'Carpet Cleaning',
    description:
      'Restore your carpets to their original freshness. Remove stains, allergens, and odors effectively.',
  },
  {
    icon: Wind,
    title: 'Window Cleaning',
    description:
      'Crystal clear windows, inside and out. Let the light shine through with our streak-free service.',
  },
  {
    icon: Truck,
    title: 'Move-In / Move-Out',
    description:
      'Complete cleaning for smooth transitions. Ensure you get your deposit back or move into a fresh home.',
  },
]
export function Services({ onViewAll }: ServicesProps) {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
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
            }}
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Our{' '}
            <span className="text-blue-600 border-b-4 border-blue-200">
              Services
            </span>
          </motion.h2>
          <motion.p
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
              delay: 0.2,
            }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Professional cleaning solutions tailored to your needs. We take
            pride in delivering exceptional results every time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.3,
                },
              }}
              onClick={onViewAll}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group cursor-pointer"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={onViewAll}
            className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
          >
            View All Services <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
