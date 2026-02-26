import { motion } from 'framer-motion'
import { DollarSign, GraduationCap, Wallet, Crown } from 'lucide-react'
const features = [
  {
    icon: DollarSign,
    title: 'Starting From $40/hr',
    description:
      'Competitive rates for premium cleaning services across Melbourne. Transparent pricing with no hidden fees.',
  },
  {
    icon: GraduationCap,
    title: 'Highly Trained Professionals',
    description:
      'Our team undergoes rigorous training and background checks to ensure top-quality service and safety.',
  },
  {
    icon: Wallet,
    title: 'Affordable Prices',
    description:
      'Quality cleaning that fits your budget without compromising standards. Value for money guaranteed.',
  },
  {
    icon: Crown,
    title: 'Premium Service',
    description:
      'Five-star rated service with attention to every detail. We treat your home like our own.',
  },
]
export function WhyChooseUs() {
  return (
    <section className="py-20 bg-blue-50">
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
            Why Choose{' '}
            <span className="text-blue-600">Vice Fresh Cleaning?</span>
          </motion.h2>
          <motion.div
            initial={{
              opacity: 0,
              width: 0,
            }}
            whileInView={{
              opacity: 1,
              width: '100px',
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            className="h-1 bg-blue-600 mx-auto rounded-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
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
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-blue-100"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
