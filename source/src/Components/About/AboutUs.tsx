import { motion } from 'framer-motion'
import { Users, Leaf, ShieldCheck } from 'lucide-react'
export function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
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
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80"
                alt="Our professional cleaning team"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-100 rounded-full -z-10 blur-xl opacity-70" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-50 rounded-full -z-10 blur-2xl opacity-70" />
          </motion.div>

          {/* Content Side */}
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
              delay: 0.2,
            }}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              About <span className="text-blue-600">Vice Fresh Cleaning</span>
            </h2>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Founded with a passion for pristine spaces, Vice Fresh Cleaning
              has been transforming homes and offices since 2020. We believe
              that a clean environment is the foundation for a happy, productive
              life.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Our team of dedicated professionals is committed to delivering
              top-tier cleaning services with a personal touch. We treat every
              space as if it were our own, ensuring meticulous attention to
              detail and using only the best practices in the industry.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg shrink-0">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Trusted Team
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Background-checked, trained, and insured professionals you
                    can rely on.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg shrink-0">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Eco-Friendly Products
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Safe for your family, pets, and the environment without
                    compromising on quality.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg shrink-0">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    Quality Guaranteed
                  </h3>
                  <p className="text-slate-600 text-sm">
                    100% satisfaction guarantee. If you're not happy, we'll make
                    it right.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
