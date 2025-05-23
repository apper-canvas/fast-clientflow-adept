import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-xl"
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-soft">
              <ApperIcon name="Users" className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ClientFlow
            </h1>
          </motion.div>
          
          <motion.button
            onClick={toggleDarkMode}
            className="p-2 sm:p-3 rounded-xl bg-white/50 dark:bg-surface-800/50 backdrop-blur-sm border border-surface-200 dark:border-surface-700 hover:bg-white/70 dark:hover:bg-surface-700/70 transition-all duration-300 shadow-soft"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5 text-surface-700 dark:text-surface-300" />
          </motion.button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 dark:text-surface-100 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Streamline Your{' '}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Customer Relationships
            </span>
          </motion.h2>
          
          <motion.p
            className="text-lg sm:text-xl text-surface-600 dark:text-surface-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Manage contacts, track deals, and grow your business with our intuitive CRM platform designed for modern teams.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {[
              { icon: "Users", title: "Contact Management", desc: "Organize and track all customer interactions" },
              { icon: "TrendingUp", title: "Sales Pipeline", desc: "Visualize and manage your deals effectively" },
              { icon: "Calendar", title: "Task Scheduling", desc: "Never miss important follow-ups" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-4 sm:p-6 bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-2xl border border-surface-200 dark:border-surface-700 shadow-soft hover:shadow-card transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <ApperIcon name={feature.icon} className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-600 dark:text-surface-400">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 lg:pb-20">
        <MainFeature />
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-surface-200 dark:border-surface-700 bg-white/30 dark:bg-surface-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-surface-600 dark:text-surface-400 text-sm sm:text-base">
            © 2024 ClientFlow. Empowering businesses to build stronger customer relationships.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home