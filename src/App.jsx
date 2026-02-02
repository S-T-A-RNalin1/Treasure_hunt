import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ThreeDPokeball from './components/ThreeDPokeball'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ThreeDPokeball onComplete={() => window.location.href = '/dashboard'} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
