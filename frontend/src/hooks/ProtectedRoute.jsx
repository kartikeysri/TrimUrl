import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  return token ? children : <Navigate to="/login" />
}
