import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, Globe } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { getTranslation } from '../utils/translations'

export const Navbar = () => {
  const { isDark, setIsDark, language, setLanguage } = useTheme()
  const { token, logout, user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="gradient-text font-bold text-xl hidden sm:inline">TrimUrl</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-sky-500 transition-colors">
              {getTranslation('navbar.home', language)}
            </Link>
            <a href="#features" className="hover:text-sky-500 transition-colors">
              {getTranslation('navbar.features', language)}
            </a>
            <a href="#pricing" className="hover:text-sky-500 transition-colors">
              {getTranslation('navbar.pricing', language)}
            </a>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors">
                <Globe size={20} />
              </button>
              <div className="absolute right-0 mt-2 w-32 rounded-lg glass opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`block w-full text-left px-4 py-2 hover:bg-sky-500/20 ${language === 'en' ? 'text-sky-500' : ''}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`block w-full text-left px-4 py-2 hover:bg-sky-500/20 ${language === 'es' ? 'text-sky-500' : ''}`}
                >
                  Español
                </button>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-white/5 transition-colors"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Auth Buttons */}
            {token ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="btn-secondary text-sm">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-primary text-sm">
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login" className="btn-secondary text-sm">
                  {getTranslation('navbar.login', language)}
                </Link>
                <Link to="/signup" className="btn-primary text-sm">
                  {getTranslation('navbar.signup', language)}
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block px-4 py-2 hover:bg-white/10 rounded-lg">
              {getTranslation('navbar.home', language)}
            </Link>
            <a href="#features" className="block px-4 py-2 hover:bg-white/10 rounded-lg">
              {getTranslation('navbar.features', language)}
            </a>
            {!token && (
              <>
                <Link to="/login" className="block px-4 py-2 hover:bg-white/10 rounded-lg">
                  {getTranslation('navbar.login', language)}
                </Link>
                <Link to="/signup" className="block px-4 py-2 hover:bg-white/10 rounded-lg">
                  {getTranslation('navbar.signup', language)}
                </Link>
              </>
            )}
            {token && (
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-white/10 rounded-lg">
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
