import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Zap, Lock, Share2, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, Button } from '../components/Common'

export const HomePage = () => {
  const stats = [
    { value: '5M+', label: 'URLs Shortened' },
    { value: '50M+', label: 'Clicks Tracked' },
    { value: '100K+', label: 'Active Users' },
  ]

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Shorten your URLs instantly with our optimized infrastructure'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Detailed Analytics',
      description: 'Track clicks, geographic data, and referrers in real-time'
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Easy Sharing',
      description: 'Generate QR codes and share on social media instantly'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Smart Insights',
      description: 'Get actionable insights from your link performance data'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'API Access',
      description: 'Integrate TrimUrl into your applications with our REST API'
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Manager',
      content: 'TrimUrl has transformed how we track our marketing campaigns. The analytics are incredibly detailed!',
      avatar: '👩‍💼'
    },
    {
      name: 'Mike Chen',
      role: 'Content Creator',
      content: 'Simple, fast, and reliable. TrimUrl is the only URL shortener I use now.',
      avatar: '👨‍💻'
    },
    {
      name: 'Emma Davis',
      role: 'Business Owner',
      content: 'The customer support is amazing and the platform is so easy to use. Highly recommended!',
      avatar: '👩‍🔬'
    },
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Shorten Your URLs</span>
                <br />
                In Seconds
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Create memorable short links, track analytics, and boost your digital presence with TrimUrl
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link to="/signup" className="btn-primary flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={20} />
                </Link>
                <button className="btn-secondary">
                  Learn More
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <p className="font-semibold">⭐ 4.9/5</p>
                  <p className="text-gray-600 dark:text-gray-400">1000+ reviews</p>
                </div>
                <div className="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
                <div>
                  <p className="font-semibold">🚀 Free to start</p>
                  <p className="text-gray-600 dark:text-gray-400">No credit card required</p>
                </div>
              </div>
            </motion.div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-sky-400 to-blue-600 rounded-3xl flex items-center justify-center text-white text-6xl">
                🔗
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-4xl"
              >
                📊
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Demo */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Try it now</h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="https://your-very-long-url.com/path"
                className="flex-1 px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 input-focus outline-none"
              />
              <Link to="/login" className="btn-primary whitespace-nowrap">
                Shorten Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-5xl font-bold gradient-text">{stat.value}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white dark:from-gray-900 dark:to-dark-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Powerful Features</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-16">Everything you need to shorten, track, and share your links</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl">
                  <div className="text-sky-500 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl">
                  <p className="text-lg mb-4">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{testimonial.avatar}</span>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-sky-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of users who are already shortening URLs with TrimUrl</p>
          <Link to="/signup" className="inline-block px-8 py-4 bg-white text-sky-600 font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all">
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
