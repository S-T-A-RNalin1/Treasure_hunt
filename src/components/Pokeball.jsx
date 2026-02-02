import { useState, useEffect } from 'react'
import './Pokeball.css'

function Pokeball({ onComplete }) {
  const [isOpen, setIsOpen] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    // Trigger the animation after component mounts
    setTimeout(() => setIsOpen(true), 300)

    // Show flash at eruption peak
    setTimeout(() => setShowFlash(true), 1800)

    // Complete animation
    setTimeout(() => {
      if (onComplete) {
        onComplete()
      }
    }, 3000)
  }, [onComplete])

  return (
    <div className="pokeball-container">
      {showFlash && <div className="flash-light"></div>}
      
      <div className={`pokeball ${isOpen ? 'erupting' : ''}`}>
        <div className="pokeball-top"></div>
        <div className="pokeball-middle"></div>
        <div className="pokeball-bottom"></div>
        <div className="pokeball-center"></div>
        
        {isOpen && (
          <>
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
            <div className="particle particle-6"></div>
          </>
        )}
      </div>
      
      <p className="loading-text">Loading your adventure...</p>
    </div>
  )
}

export default Pokeball
