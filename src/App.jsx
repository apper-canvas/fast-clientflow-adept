import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  const navigationItems = [
    { key: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/' },
    { key: 'contacts', label: 'Contacts', icon: 'Users', path: '/contacts' },
    { key: 'pipeline', label: 'Pipeline', icon: 'TrendingUp', path: '/pipeline' },
    { key: 'activities', label: 'Activities', icon: 'Calendar', path: '/activities' },
    { key: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
    { key: 'settings', label: 'Settings', icon: 'Settings', path: '/settings' }
  ]

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: 280 }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-surface-800 border-r border-surface-200 dark:border-surface-700 flex flex-col shadow-lg"
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-soft">
                  <ApperIcon name="Users" className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ClientFlow
                </h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.key}>
                    <motion.a
                      href={item.path}
                      className="flex items-center gap-3 px-4 py-3 text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-xl transition-all duration-200 group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ApperIcon name={item.icon} className="w-5 h-5 text-surface-500 dark:text-surface-400 group-hover:text-primary" />
                      <span className="font-medium">{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-surface-200 dark:border-surface-700">
              <div className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-700 rounded-xl">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-surface-900 dark:text-surface-100">John Doe</p>
                  <p className="text-xs text-surface-500 dark:text-surface-400">Sales Manager</p>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-surface-800 border-b border-surface-200 dark:border-surface-700 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <ApperIcon name="Menu" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
              <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">Dashboard</h2>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors">
                <ApperIcon name="Bell" className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-5 h-5 text-surface-600 dark:text-surface-400" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? "dark" : "light"}
        className="mt-20"
        toastClassName="shadow-soft border border-surface-200 dark:border-surface-700"
      />
    </div>
  )
}

export default App