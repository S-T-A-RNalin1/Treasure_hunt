import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Pokeball from './Pokeball'

function SplashScreen({ children }) {
  const [showSplash, setShowSplash] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // Show splash screen on mount and when location changes to root
    if (location.pathname === '/') {
      setShowSplash(true)
    }
  }, [location])

  if (showSplash) {
    return <Pokeball onComplete={() => setShowSplash(false)} />
  }

  return children
}

export default SplashScreen
