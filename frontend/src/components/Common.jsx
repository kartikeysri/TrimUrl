import { motion } from 'framer-motion'

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export const Button = ({ children, variant = 'primary', ...props }) => {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
  }
  
  return (
    <button className={variants[variant]} {...props}>
      {children}
    </button>
  )
}

export const Card = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`card-gradient rounded-xl p-6 border border-slate-200 dark:border-gray-700 ${className}`}
    >
      {children}
    </motion.div>
  )
}
