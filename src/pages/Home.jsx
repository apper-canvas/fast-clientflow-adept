import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  const stats = [
    { label: 'Total Contacts', value: '2,847', icon: 'Users', color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'Active Deals', value: '156', icon: 'TrendingUp', color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'Revenue', value: '$847K', icon: 'DollarSign', color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'Tasks Due', value: '23', icon: 'Clock', color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' }
  ]

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">Welcome back, John</h1>
          <p className="text-surface-600 dark:text-surface-400">Here's what's happening with your business today.</p>
        </div>
        <motion.button
          className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span>Quick Add</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-soft hover:shadow-card transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-surface-600 dark:text-surface-400 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-surface-900 dark:text-surface-100">{stat.value}</p>
              </motion.div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <ApperIcon name={stat.icon} className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-surface-800 rounded-2xl p-6 border border-surface-200 dark:border-surface-700 shadow-soft">
        <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon: 'UserPlus', label: 'Add Contact', color: 'text-blue-600' },
            { icon: 'Plus', label: 'New Deal', color: 'text-green-600' },
            { icon: 'Calendar', label: 'Schedule Call', color: 'text-purple-600' },
            { icon: 'FileText', label: 'Create Report', color: 'text-orange-600' }
          ].map((action) => (
            <motion.button
              key={action.label}
              className="p-4 text-center hover:bg-surface-50 dark:hover:bg-surface-700 rounded-xl transition-all duration-200 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ApperIcon name={action.icon} className={`w-8 h-8 ${action.color} mx-auto mb-2 group-hover:scale-110 transition-transform`} />
              <p className="text-sm font-medium text-surface-700 dark:text-surface-300">{action.label}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main CRM Features */}
      <div>
        <MainFeature />
      </div>
    </div>
  )
}

export default Home