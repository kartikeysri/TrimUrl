import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">TrimUrl</h3>
            <p className="text-gray-400">Modern URL shortener with powerful analytics</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-sky-500 transition-colors">Home</Link></li>
              <li><a href="#features" className="hover:text-sky-500 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-sky-500 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-sky-500 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="flex space-x-4">
              <a href="mailto:hello@trimurl.com" className="hover:text-sky-500 transition-colors">
                <Mail size={20} />
              </a>
              <a href="#" className="hover:text-sky-500 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-sky-500 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-sky-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 TrimUrl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
