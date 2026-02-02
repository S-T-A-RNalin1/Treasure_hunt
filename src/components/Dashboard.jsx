import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <div className="dashboard-container">
      {/* Animated Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <nav className="navbar">
        <div className="nav-brand">
          <span className="brand-icon">⚡</span>
          <span className="brand-text">Treasure Hunt</span>
        </div>
        <button 
          className="login-btn"
          onClick={() => setIsAuthOpen(!isAuthOpen)}
        >
          {isAuthOpen ? 'Close' : 'Login'}
        </button>
      </nav>

      {isAuthOpen && (
        <div className="auth-modal-overlay" onClick={() => setIsAuthOpen(false)}>
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            <AuthForm onClose={() => setIsAuthOpen(false)} />
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="hero-section">
          <div className="hero-badge">
            <span className="badge-icon">🎮</span>
            <span className="badge-text">New Adventure Awaits</span>
          </div>
          
          <h1 className="hero-title">
            Welcome to the
            <span className="gradient-text"> Tech Treasure Hunt</span>
          </h1>
          
          <p className="hero-subtitle">
            Embark on an epic adventure to discover hidden treasures, solve puzzles, and compete with players worldwide!
          </p>

          <div className="hero-buttons">
            <button 
              className="cta-btn primary"
              onClick={() => setIsAuthOpen(true)}
            >
              <span className="btn-icon">🚀</span>
              Start Your Journey
            </button>
            <button className="cta-btn secondary">
              <span className="btn-icon">📖</span>
              Learn More
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

function AuthForm({ onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login:', {
        username: formData.username,
        password: formData.password
      })
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!')
        return
      }
      console.log('Signup:', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      })
    }
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    onClose()
  }

  return (
    <div className="auth-form-container">
      <div className="auth-header">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="auth-toggle">
        <button
          className={`toggle-btn ${isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`toggle-btn ${!isLogin ? 'active' : ''}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Dashboard
