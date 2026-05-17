export const translations = {
  en: {
    navbar: {
      home: 'Home',
      features: 'Features',
      pricing: 'Pricing',
      about: 'About',
      login: 'Login',
      signup: 'Sign Up',
    },
    hero: {
      heading: 'Shorten Your URLs Instantly',
      subheading: 'Create shorter, memorable links and track detailed analytics',
      placeholder: 'Paste your long URL here',
      cta: 'Shorten Now',
    },
    auth: {
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      login: 'Login',
      signup: 'Sign Up',
      googleLogin: 'Login with Google',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      signIn: 'Sign In',
    },
    dashboard: {
      myUrls: 'My URLs',
      createNew: 'Create New URL',
      totalLinks: 'Total Links',
      totalClicks: 'Total Clicks',
      recentActivity: 'Recent Activity',
      analytics: 'Analytics',
      delete: 'Delete',
      copy: 'Copy',
      search: 'Search URLs',
    },
  },
  es: {
    navbar: {
      home: 'Inicio',
      features: 'Características',
      pricing: 'Precios',
      about: 'Acerca de',
      login: 'Iniciar sesión',
      signup: 'Registrarse',
    },
  },
}

export const getTranslation = (key, language = 'en') => {
  const keys = key.split('.')
  let value = translations[language]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
