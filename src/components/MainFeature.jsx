import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp Inc.',
      position: 'Marketing Director',
      source: 'Website',
      tags: ['VIP', 'Enterprise'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@startup.io',
      phone: '+1 (555) 987-6543',
      company: 'Startup Solutions',
      position: 'CEO',
      source: 'Referral',
      tags: ['Hot Lead'],
      createdAt: new Date('2024-01-10')
    }
  ])

  const [deals, setDeals] = useState([
    {
      id: '1',
      title: 'Enterprise Software License',
      contactId: '1',
      value: 50000,
      stage: 'proposal',
      probability: 75,
      expectedCloseDate: new Date('2024-02-15'),
      description: 'Annual enterprise software license for TechCorp Inc.',
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      title: 'Consulting Services',
      contactId: '2',
      value: 25000,
      stage: 'negotiation',
      probability: 60,
      expectedCloseDate: new Date('2024-02-28'),
      description: 'Strategic consulting for digital transformation',
      assignedTo: 'Jane Smith'
    }
  ])

  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'call',
      subject: 'Follow-up call with Sarah',
      description: 'Discuss enterprise requirements and pricing',
      contactId: '1',
      dealId: '1',
      dueDate: new Date('2024-01-25'),
      completed: false,
      assignedTo: 'John Doe'
    },
    {
      id: '2',
      type: 'email',
      subject: 'Send proposal document',
      description: 'Email detailed proposal to Michael',
      contactId: '2',
      dealId: '2',
      dueDate: new Date('2024-01-23'),
      completed: true,
      assignedTo: 'Jane Smith'
    }
  ])

  const [showContactForm, setShowContactForm] = useState(false)
  const [showDealForm, setShowDealForm] = useState(false)
  const [showActivityForm, setShowActivityForm] = useState(false)

  const [newContact, setNewContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    source: 'Website'
  })

  const [newDeal, setNewDeal] = useState({
    title: '',
    value: '',
    stage: 'lead',
    probability: 25,
    expectedCloseDate: '',
    description: '',
    contactId: ''
  })

  const [newActivity, setNewActivity] = useState({
    type: 'call',
    subject: '',
    description: '',
    contactId: '',
    dueDate: '',
    assignedTo: ''
  })

  const dealStages = [
    { key: 'lead', label: 'Lead', color: 'bg-surface-400' },
    { key: 'qualified', label: 'Qualified', color: 'bg-blue-500' },
    { key: 'proposal', label: 'Proposal', color: 'bg-yellow-500' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
    { key: 'closed-won', label: 'Closed Won', color: 'bg-green-500' },
    { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-500' }
  ]

  const activityTypes = [
    { key: 'call', label: 'Call', icon: 'Phone' },
    { key: 'email', label: 'Email', icon: 'Mail' },
    { key: 'meeting', label: 'Meeting', icon: 'Calendar' },
    { key: 'task', label: 'Task', icon: 'CheckSquare' }
  ]

  const handleAddContact = (e) => {
    e.preventDefault()
    if (!newContact.firstName || !newContact.lastName || !newContact.email) {
      toast.error('Please fill in required fields')
      return
    }

    const contact = {
      ...newContact,
      id: Date.now().toString(),
      tags: [],
      createdAt: new Date()
    }

    setContacts([...contacts, contact])
    setNewContact({ firstName: '', lastName: '', email: '', phone: '', company: '', position: '', source: 'Website' })
    setShowContactForm(false)
    toast.success('Contact added successfully!')
  }

  const handleAddDeal = (e) => {
    e.preventDefault()
    if (!newDeal.title || !newDeal.value || !newDeal.contactId) {
      toast.error('Please fill in required fields')
      return
    }

    const deal = {
      ...newDeal,
      id: Date.now().toString(),
      value: parseFloat(newDeal.value),
      expectedCloseDate: new Date(newDeal.expectedCloseDate),
      assignedTo: 'Current User'
    }

    setDeals([...deals, deal])
    setNewDeal({ title: '', value: '', stage: 'lead', probability: 25, expectedCloseDate: '', description: '', contactId: '' })
    setShowDealForm(false)
    toast.success('Deal created successfully!')
  }

  const handleAddActivity = (e) => {
    e.preventDefault()
    if (!newActivity.subject || !newActivity.contactId || !newActivity.dueDate) {
      toast.error('Please fill in required fields')
      return
    }

    const activity = {
      ...newActivity,
      id: Date.now().toString(),
      dueDate: new Date(newActivity.dueDate),
      completed: false,
      createdAt: new Date()
    }

    setActivities([...activities, activity])
    setNewActivity({ type: 'call', subject: '', description: '', contactId: '', dueDate: '', assignedTo: '' })
    setShowActivityForm(false)
    toast.success('Activity scheduled successfully!')
  }

  const toggleActivityComplete = (activityId) => {
    setActivities(activities.map(activity =>
      activity.id === activityId
        ? { ...activity, completed: !activity.completed }
        : activity
    ))
    toast.success('Activity status updated!')
  }

  const updateDealStage = (dealId, newStage) => {
    setDeals(deals.map(deal =>
      deal.id === dealId
        ? { ...deal, stage: newStage }
        : deal
    ))
    toast.success('Deal stage updated!')
  }

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId)
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown Contact'
  }

  const tabs = [
    { key: 'contacts', label: 'Contacts', icon: 'Users', count: contacts.length },
    { key: 'pipeline', label: 'Pipeline', icon: 'TrendingUp', count: deals.length },
    { key: 'activities', label: 'Activities', icon: 'Calendar', count: activities.filter(a => !a.completed).length }
  ]

  return (
    <div className="w-full">
      <motion.div
        className="bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-soft overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
      >
        {/* Tab Navigation */}
        <div className="border-b border-surface-200 dark:border-surface-700 px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-4 text-sm sm:text-base font-medium whitespace-nowrap border-b-2 transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200 hover:border-surface-300 dark:hover:border-surface-600'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-5 h-5" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="inline sm:hidden">{tab.label}</span>
                <span className="ml-1 px-2 py-1 text-xs bg-surface-200 dark:bg-surface-700 rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <motion.button
                    onClick={() => setShowContactForm(!showContactForm)}
                    className="ml-auto px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>Add Contact</span>
                  </motion.button>
                </div>

                {/* Add Contact Form */}
                <AnimatePresence>
                  {showContactForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleAddContact}
                      className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-4 sm:p-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="First Name *"
                          value={newContact.firstName}
                          onChange={(e) => setNewContact({ ...newContact, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Last Name *"
                          value={newContact.lastName}
                          onChange={(e) => setNewContact({ ...newContact, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email *"
                          value={newContact.email}
                          onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={newContact.company}
                          onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                        <input
                          type="text"
                          placeholder="Position"
                          value={newContact.position}
                          onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft"
                        >
                          Save Contact
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowContactForm(false)}
                          className="flex-1 px-6 py-3 bg-surface-300 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-400 dark:hover:bg-surface-600 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Contacts List */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {contacts.map((contact) => (
                    <motion.div
                      key={contact.id}
                      className="p-4 sm:p-6 bg-white dark:bg-surface-800 rounded-2xl border border-surface-200 dark:border-surface-700 shadow-soft hover:shadow-card transition-all duration-300"
                      whileHover={{ y: -2 }}
                      layout
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </div>
                          <div>
                            <h4 className="font-semibold text-surface-900 dark:text-surface-100">
                              {contact.firstName} {contact.lastName}
                            </h4>
                            <p className="text-sm text-surface-600 dark:text-surface-400">
                              {contact.position} at {contact.company}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {contact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs bg-accent/20 text-accent rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Mail" className="w-4 h-4" />
                          <span className="break-all">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Phone" className="w-4 h-4" />
                          <span>{contact.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-surface-600 dark:text-surface-400">
                          <ApperIcon name="Calendar" className="w-4 h-4" />
                          <span>Added {format(contact.createdAt, 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pipeline Tab */}
            {activeTab === 'pipeline' && (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <motion.button
                    onClick={() => setShowDealForm(!showDealForm)}
                    className="ml-auto px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>Add Deal</span>
                  </motion.button>
                </div>

                {/* Add Deal Form */}
                <AnimatePresence>
                  {showDealForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleAddDeal}
                      className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-4 sm:p-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Deal Title *"
                          value={newDeal.title}
                          onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <input
                          type="number"
                          placeholder="Deal Value *"
                          value={newDeal.value}
                          onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <select
                          value={newDeal.contactId}
                          onChange={(e) => setNewDeal({ ...newDeal, contactId: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        >
                          <option value="">Select Contact *</option>
                          {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                              {contact.firstName} {contact.lastName} - {contact.company}
                            </option>
                          ))}
                        </select>
                        <input
                          type="date"
                          placeholder="Expected Close Date"
                          value={newDeal.expectedCloseDate}
                          onChange={(e) => setNewDeal({ ...newDeal, expectedCloseDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={newDeal.description}
                        onChange={(e) => setNewDeal({ ...newDeal, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      />
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft"
                        >
                          Create Deal
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowDealForm(false)}
                          className="flex-1 px-6 py-3 bg-surface-300 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-400 dark:hover:bg-surface-600 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Pipeline Stages */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 overflow-x-auto">
                  {dealStages.map((stage) => (
                    <div key={stage.key} className="min-w-[280px] sm:min-w-0">
                      <div className={`h-2 ${stage.color} rounded-t-xl`} />
                      <div className="bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-b-xl p-4 min-h-[300px]">
                        <h4 className="font-semibold text-surface-900 dark:text-surface-100 mb-4">
                          {stage.label}
                        </h4>
                        <div className="space-y-3">
                          {deals
                            .filter((deal) => deal.stage === stage.key)
                            .map((deal) => (
                              <motion.div
                                key={deal.id}
                                className="p-3 bg-surface-50 dark:bg-surface-900 rounded-xl cursor-pointer hover:shadow-soft transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                onClick={() => {
                                  const nextStageIndex = dealStages.findIndex(s => s.key === deal.stage) + 1
                                  if (nextStageIndex < dealStages.length) {
                                    updateDealStage(deal.id, dealStages[nextStageIndex].key)
                                  }
                                }}
                              >
                                <h5 className="font-medium text-surface-900 dark:text-surface-100 text-sm mb-2">
                                  {deal.title}
                                </h5>
                                <p className="text-xs text-surface-600 dark:text-surface-400 mb-2">
                                  {getContactName(deal.contactId)}
                                </p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-semibold text-primary">
                                    ${deal.value.toLocaleString()}
                                  </span>
                                  <span className="text-xs text-surface-500 dark:text-surface-400">
                                    {deal.probability}%
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <motion.button
                    onClick={() => setShowActivityForm(!showActivityForm)}
                    className="ml-auto px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft flex items-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ApperIcon name="Plus" className="w-5 h-5" />
                    <span>Add Activity</span>
                  </motion.button>
                </div>

                {/* Add Activity Form */}
                <AnimatePresence>
                  {showActivityForm && (
                    <motion.form
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleAddActivity}
                      className="bg-surface-50 dark:bg-surface-900 rounded-2xl p-4 sm:p-6 space-y-4"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <select
                          value={newActivity.type}
                          onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        >
                          {activityTypes.map((type) => (
                            <option key={type.key} value={type.key}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        <input
                          type="text"
                          placeholder="Subject *"
                          value={newActivity.subject}
                          onChange={(e) => setNewActivity({ ...newActivity, subject: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                        <select
                          value={newActivity.contactId}
                          onChange={(e) => setNewActivity({ ...newActivity, contactId: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        >
                          <option value="">Select Contact *</option>
                          {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                              {contact.firstName} {contact.lastName}
                            </option>
                          ))}
                        </select>
                        <input
                          type="datetime-local"
                          value={newActivity.dueDate}
                          onChange={(e) => setNewActivity({ ...newActivity, dueDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                          required
                        />
                      </div>
                      <textarea
                        placeholder="Description"
                        value={newActivity.description}
                        onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-surface-300 dark:border-surface-600 bg-white dark:bg-surface-800 text-surface-900 dark:text-surface-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      />
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:from-primary-dark hover:to-secondary-dark transition-all duration-300 shadow-soft"
                        >
                          Schedule Activity
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowActivityForm(false)}
                          className="flex-1 px-6 py-3 bg-surface-300 dark:bg-surface-700 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-400 dark:hover:bg-surface-600 transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Activities List */}
                <div className="space-y-4">
                  {activities
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .map((activity) => {
                      const activityType = activityTypes.find(t => t.key === activity.type)
                      return (
                        <motion.div
                          key={activity.id}
                          className={`p-4 sm:p-6 rounded-2xl border transition-all duration-300 ${
                            activity.completed
                              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                              : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 shadow-soft hover:shadow-card'
                          }`}
                          whileHover={{ y: -1 }}
                          layout
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() => toggleActivityComplete(activity.id)}
                                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                                  activity.completed
                                    ? 'bg-green-500 border-green-500'
                                    : 'border-surface-300 dark:border-surface-600 hover:border-primary'
                                }`}
                              >
                                {activity.completed && (
                                  <ApperIcon name="Check" className="w-4 h-4 text-white" />
                                )}
                              </button>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <ApperIcon name={activityType?.icon || 'Calendar'} className="w-5 h-5 text-primary" />
                                  <h4 className={`font-semibold ${
                                    activity.completed
                                      ? 'text-green-700 dark:text-green-300 line-through'
                                      : 'text-surface-900 dark:text-surface-100'
                                  }`}>
                                    {activity.subject}
                                  </h4>
                                </div>
                                <p className="text-sm text-surface-600 dark:text-surface-400 mb-2">
                                  {activity.description}
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-surface-500 dark:text-surface-400">
                                  <span>Contact: {getContactName(activity.contactId)}</span>
                                  <span>Due: {format(activity.dueDate, 'MMM dd, yyyy hh:mm a')}</span>
                                  {activity.assignedTo && <span>Assigned: {activity.assignedTo}</span>}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                activity.type === 'call' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                                activity.type === 'email' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                                activity.type === 'meeting' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                                'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300'
                              }`}>
                                {activityType?.label || activity.type}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature