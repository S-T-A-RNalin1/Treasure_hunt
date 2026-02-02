import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function PokeballModel({ erupting, onEruptComplete }) {
  const group = useRef()
  const topHalf = useRef()
  const bottomHalf = useRef()
  const centerBtn = useRef()
  const [erupted, setErupted] = useState(false)

  useFrame((state, delta) => {
    if (!erupting) {
      group.current.rotation.y += delta * 0.5
      group.current.rotation.z += delta * 0.2
    } else {
      // Eruption animation
      if (topHalf.current.position.y < 5) {
        topHalf.current.position.y += delta * 15
        topHalf.current.rotation.x -= delta * 5
        bottomHalf.current.position.y -= delta * 15
        bottomHalf.current.rotation.x += delta * 5
        
        // Scale down and fade out
        group.current.scale.x *= 0.98
        group.current.scale.y *= 0.98
        group.current.scale.z *= 0.98
      } else if (!erupted) {
        setErupted(true)
        if (onEruptComplete) onEruptComplete()
      }
    }
  })

  return (
    <group ref={group}>
      {/* Top Half (Red) */}
      <mesh ref={topHalf} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ff0000" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Bottom Half (White) */}
      <mesh ref={bottomHalf} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Middle Ring (Black) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.01, 0.08, 16, 100]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Center Button */}
      <group position={[0, 0, 2.0]} ref={centerBtn}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 0, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
          <meshStandardMaterial color="#ffffff" emissive={erupting ? "#ffffff" : "#000000"} emissiveIntensity={erupting ? 2 : 0} />
        </mesh>
      </group>
    </group>
  )
}

export default function ThreeDPokeball({ onComplete }) {
  const [erupting, setErupting] = useState(false)
  const [showFlash, setShowFlash] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setErupting(true)
      setTimeout(() => setShowFlash(true), 100)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="landing-container">
      {showFlash && (
        <div className="flash-overlay" />
      )}
      
      <div className="content-overlay">
        <div className="title-section">
          <h1 className="main-title">Treasure Hunt</h1>
          <p className="subtitle">Embark on an Epic Adventure</p>
        </div>
        
        {!erupting && (
          <div className="loading-section">
            <div className="loading-text">Initializing Adventure...</div>
            <div className="progress-bar">
              <div className="progress-fill" />
            </div>
            <div className="loading-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>
        )}
      </div>
      
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <PokeballModel erupting={erupting} onEruptComplete={onComplete} />
        </Float>
        
        <Environment preset="city" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      <style>{`
        .landing-container {
          width: 100vw;
          height: 100vh;
          background: linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0a0a2a 100%);
          position: relative;
          overflow: hidden;
        }

        .flash-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          z-index: 100;
          animation: flashOut 1s forwards;
        }

        @keyframes flashOut {
          0% { opacity: 0; }
          10% { opacity: 1; }
          100% { opacity: 0; }
        }

        .content-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 60px 20px;
          z-index: 10;
        }

        .title-section {
          text-align: center;
          animation: fadeInDown 1s ease-out;
        }

        .main-title {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 4rem;
          font-weight: 800;
          background: linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
          text-shadow: 0 0 30px rgba(255, 107, 107, 0.3);
          margin: 0;
          letter-spacing: 4px;
        }

        .subtitle {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          margin-top: 15px;
          font-weight: 300;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .loading-section {
          text-align: center;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .loading-text {
          color: white;
          font-family: 'Segoe UI', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .progress-bar {
          width: 300px;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          overflow: hidden;
          margin: 0 auto 20px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77);
          border-radius: 2px;
          animation: progressAnimation 2s ease-in-out;
        }

        @keyframes progressAnimation {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .loading-dots {
          display: flex;
          justify-content: center;
          gap: 8px;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          animation: dotPulse 1.4s ease-in-out infinite;
        }

        .dot:nth-child(1) { animation-delay: 0s; }
        .dot:nth-child(2) { animation-delay: 0.2s; }
        .dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotPulse {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
            letter-spacing: 2px;
          }
          .subtitle {
            font-size: 1rem;
            letter-spacing: 2px;
          }
          .progress-bar {
            width: 200px;
          }
        }
      `}</style>
    </div>
  )
}
