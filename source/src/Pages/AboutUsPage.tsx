import React from 'react'
import { motion } from 'framer-motion'
import { Users, Leaf, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react'
interface AboutUsPageProps {
  onNavigate: (page: 'home') => void
}
export function AboutUsPage({ onNavigate }: AboutUsPageProps) {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Header */}
      <div className="bg-slate-900 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-blue-400 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Melbourne's trusted cleaning professionals. Dedicated to excellence,
            reliability, and making your space shine.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
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
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Our Story
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Vice Fresh Cleaning started with a simple mission: to provide
              high-quality, reliable cleaning services to Melbourne homes and
              businesses. What began as a small team has grown into one of the
              city's most trusted cleaning providers.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              We understand that inviting someone into your home or office
              requires trust. That's why every member of our team is thoroughly
              vetted, trained, and insured. We treat your space with the same
              care and respect we would our own.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {[
                'Fully Insured',
                'Background Checked',
                'Eco-Friendly Options',
                'Satisfaction Guarantee',
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
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
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
                alt="Cleaning team at work"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-8 rounded-xl shadow-xl hidden md:block">
              <p className="text-4xl font-bold mb-1">5+</p>
              <p className="text-sm font-medium opacity-90">
                Years of Excellence
              </p>
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Professional Team
            </h3>
            <p className="text-slate-600">
              Our cleaners are experienced professionals who take pride in their
              work. Regular training ensures we stay ahead of industry
              standards.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Eco-Friendly
            </h3>
            <p className="text-slate-600">
              We care about your health and the environment. We use safe,
              non-toxic cleaning products that are tough on dirt but gentle on
              your home.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              Quality Guaranteed
            </h3>
            <p className="text-slate-600">
              Your satisfaction is our priority. If you're not completely happy
              with our service, let us know and we'll make it right.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
