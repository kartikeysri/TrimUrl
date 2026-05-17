import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Copy, Trash2, QrCode, TrendingUp, Link2, BarChart3,
  Plus, Search, Eye, Download
} from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { urlAPI } from '../services/api'
import { copyToClipboard, isValidUrl, formatDate } from '../utils/helpers'
import { Card } from '../components/Common'

export const DashboardPage = () => {
  const [urls, setUrls] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    originalUrl: '',
    customCode: ''
  })
  const [selectedQR, setSelectedQR] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

const fetchData = async () => {
  try {
    setLoading(true)
    setError('') // Clear any previous errors
    
    const [urlsRes, statsRes] = await Promise.all([
      urlAPI.getUserUrls(),
      urlAPI.getDashboardStats()
    ])
    
    // SAFE PARSING: Extract the nested array if it's wrapped in a Spring Page object
    const incomingData = urlsRes.data
    if (Array.isArray(incomingData)) {
      setUrls(incomingData)
    } else if (incomingData && Array.isArray(incomingData.content)) {
      setUrls(incomingData.content) // Pulls the actual list out of Spring's Page wrapper
    } else {
      setUrls([]) // Emergency fallback to keep your components from crashing
    }
    
    setStats(statsRes.data)
  } catch (err) {
    console.error("Dashboard fetch error:", err)
    setError('Failed to load dashboard data')
    setUrls([]) // Defensive fallback on failure
  } finally {
    setLoading(false)
  }
}
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!isValidUrl(formData.originalUrl)) {
      setError('Please enter a valid URL')
      return
    }

    setCreating(true)

    try {
      const response = await urlAPI.shortenUrl(
        formData.originalUrl,
        formData.customCode || null
      )
      setUrls([response.data, ...urls])
      setFormData({ originalUrl: '', customCode: '' })
      setShowForm(false)
      setSuccess('URL shortened successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten URL')
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (urlId) => {
    if (!confirm('Are you sure you want to delete this shortened URL?')) return

    try {
      await urlAPI.deleteUrl(urlId)
      setUrls(urls.filter(u => u.id !== urlId))
      setSuccess('URL deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError('Failed to delete URL')
    }
  }

  const handleCopy = async (text) => {
    const success = await copyToClipboard(text)
    if (success) {
      setSuccess('Copied to clipboard!')
      setTimeout(() => setSuccess(''), 2000)
    }
  }

  const filteredUrls = urls.filter(url =>
    url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
    url.shortCode.includes(searchTerm)
  )

  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:8080'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and track all your shortened URLs</p>
        </motion.div>

        {/* Messages */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-red-100 dark:bg-red-900/20 border border-red-500 rounded-lg text-red-700 dark:text-red-400"
          >
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-green-100 dark:bg-green-900/20 border border-green-500 rounded-lg text-green-700 dark:text-green-400"
          >
            {success}
          </motion.div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total URLs</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalUrls}</p>
                </div>
                <Link2 className="text-sky-500" size={32} />
              </div>
            </Card>

            <Card className="hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Total Clicks</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalClicks}</p>
                </div>
                <BarChart3 className="text-sky-500" size={32} />
              </div>
            </Card>

            <Card className="hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Avg Clicks/URL</p>
                  <p className="text-3xl font-bold mt-2">{(stats.totalClicks / stats.totalUrls || 0).toFixed(1)}</p>
                </div>
                <TrendingUp className="text-sky-500" size={32} />
              </div>
            </Card>

            <Card className="hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Top URL Clicks</p>
                  <p className="text-3xl font-bold mt-2">{stats.maxClicks || 0}</p>
                </div>
                <Eye className="text-sky-500" size={32} />
              </div>
            </Card>
          </div>
        )}

        {/* Create URL Form */}
        {!showForm ? (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowForm(true)}
            className="mb-8 btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Short URL
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 glass rounded-xl p-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Original URL</label>
                <input
                  type="url"
                  name="originalUrl"
                  value={formData.originalUrl}
                  onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
                  placeholder="https://example.com/very/long/url"
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 input-focus outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Custom Short Code (Optional)</label>
                  <input
                    type="text"
                    name="customCode"
                    value={formData.customCode}
                    onChange={(e) => setFormData({ ...formData, customCode: e.target.value.toLowerCase() })}
                    placeholder="e.g., mycode"
                    maxLength="10"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 input-focus outline-none"
                  />
                </div>

                <div className="flex gap-2 items-end">
                  <button
                    type="submit"
                    disabled={creating}
                    className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creating ? 'Creating...' : 'Create URL'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="btn-secondary px-6"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        )}

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by URL or short code..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 input-focus outline-none"
            />
          </div>
        </div>

        {/* URLs Table/List */}
        <div>
          {filteredUrls.length > 0 ? (
            <div className="space-y-4">
              {filteredUrls.map((url, index) => (
                <motion.div
                  key={url.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                    {/* Short URL */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Short URL</p>
                      <p className="text-lg font-mono font-semibold text-sky-500 break-all">
                        {baseUrl}/r/{url.shortCode}
                      </p>
                    </div>

                    {/* Original URL */}
                    <div className="md:col-span-1">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Original URL</p>
                      <p className="text-sm truncate hover:underline cursor-help" title={url.originalUrl}>
                        {url.originalUrl}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="md:col-span-1">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-2xl font-bold text-sky-500">{url.clicks}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Clicks</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Created</p>
                          <p className="text-xs font-mono">{formatDate(url.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 mt-4 flex-wrap">
                    <button
                      onClick={() => handleCopy(`${baseUrl}/r/${url.shortCode}`)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-500 transition-colors text-sm"
                    >
                      <Copy size={16} />
                      Copy
                    </button>

                    <button
                      onClick={() => setSelectedQR(url)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-500 transition-colors text-sm"
                    >
                      <QrCode size={16} />
                      QR Code
                    </button>

                    <a
                      href={`/analytics/${url.id}`}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors text-sm"
                    >
                      <BarChart3 size={16} />
                      Analytics
                    </a>

                    <button
                      onClick={() => handleDelete(url.id)}
                      className="ml-auto flex items-center gap-1 px-3 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {searchTerm ? 'No URLs found matching your search' : 'No shortened URLs yet'}
              </p>
              {!searchTerm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="mt-4 btn-primary"
                >
                  Create Your First URL
                </button>
              )}
            </div>
          )}
        </div>
      </div>

    {/* QR Code Modal */}
{selectedQR && (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={() => setSelectedQR(null)}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      onClick={(e) => e.stopPropagation()}
      className="glass rounded-2xl p-8 max-w-sm w-full"
    >
      <h3 className="text-2xl font-bold mb-6">QR Code</h3>
      
      <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
        <QRCodeSVG
          value={`${baseUrl}/r/${selectedQR.shortCode}`}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
            <div className="space-y-2 mb-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Short URL</p>
              <p className="text-lg font-mono text-sky-500">{baseUrl}/r/{selectedQR.shortCode}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const qrCode = document.querySelector('canvas')
                  const url = qrCode.toDataURL('image/png')
                  const link = document.createElement('a')
                  link.href = url
                  link.download = `qrcode-${selectedQR.shortCode}.png`
                  link.click()
                }}
                className="flex-1 btn-primary flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download
              </button>
              <button
                onClick={() => setSelectedQR(null)}
                className="flex-1 btn-secondary"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
