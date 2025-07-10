"use client"

import { useRef, useEffect, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, OrbitControls, Environment, PresentationControls } from "@react-three/drei"
import * as THREE from "three"

interface ModelProps {
  showContent: boolean
}

function Model({ showContent }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/walk.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      const firstAction = actions[Object.keys(actions)[0]]
      if (firstAction) firstAction.play()
    }
  }, [actions])

  useFrame((state) => {
    if (group.current && showContent) {
      const t = state.clock.getElapsedTime()
      group.current.rotation.y = Math.sin(t * 0.5) * 0.1
      group.current.position.y = Math.sin(t * 0.8) * 0.1 - 1 // Descendu de 1 unité
    }
  })

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={showContent ? [2, 2, 2] : [0.1, 0.1, 0.1]}
        position={[0, -1, 0]} // Position plus basse
      />
    </group>
  )
}

useGLTF.preload("/walk.glb")

function CameraController({ showContent }: { showContent: boolean }) {
  const { camera } = useThree()
  const animationRef = useRef({ startTime: 0, isAnimating: false })
  const startPosition = useMemo(() => new THREE.Vector3(8, 3, 8), []) // Position plus basse
  const endPosition = useMemo(() => new THREE.Vector3(3, 1, 5), []) // Position plus basse

  useEffect(() => {
    if (showContent) {
      animationRef.current.startTime = Date.now()
      animationRef.current.isAnimating = true
    } else {
      camera.position.copy(startPosition)
      camera.lookAt(0, -0.5, 0) // Regarde légèrement plus bas
      animationRef.current.isAnimating = false
    }
  }, [showContent, camera, startPosition])

  useFrame(() => {
    if (animationRef.current.isAnimating) {
      const elapsed = Date.now() - animationRef.current.startTime
      const duration = 2000
      const t = Math.min(elapsed / duration, 1)
      const ease = t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2

      camera.position.lerpVectors(startPosition, endPosition, ease)
      camera.lookAt(0, -0.5, 0) // Regarde légèrement plus bas

      if (t >= 1) {
        animationRef.current.isAnimating = false
      }
    }
  })

  return null
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Chargement du modèle 3D...</p>
      </div>
    </div>
  )
}

export default function Scene3D({ showContent }: ModelProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [8, 3, 8], fov: 50 }} // Position caméra ajustée
        className="rounded-2xl"
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.setClearColor(0x000000, 0) // Background transparent
        }}
        style={{ background: "transparent" }} // Background transparent
      >
        {/* Lumières optimisées */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 2, -5]} intensity={0.4} />

        {/* Environment plus subtil */}
        <Environment preset="city" />

        <CameraController showContent={showContent} />

        <PresentationControls
          global={false}
          cursor
          speed={1.2}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 3]}
          azimuth={[-Math.PI / 1.2, Math.PI / 1.2]}
        >
          <Suspense fallback={<LoadingFallback />}>
            <Model showContent={showContent} />
          </Suspense>
        </PresentationControls>

        <OrbitControls
          enablePan={false}
          enableZoom
          enableRotate
          minDistance={3}
          maxDistance={12}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI - Math.PI / 8}
          target={[0, -0.5, 0]} // Cible plus basse
        />
      </Canvas>

      {/* Overlay info amélioré */}
      <div
        className={`absolute bottom-6 left-6 bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/10 transform transition-all duration-500 ${
          showContent ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
        }`}
        style={{
          transitionDelay: showContent ? "1200ms" : "0ms",
        }}
      >
        <div className="text-sm text-white font-medium flex items-center gap-2">
          🥰Voici ma représentation en 3D
        </div>
        <div className="text-xs text-white/70 mt-1">Profitez-en !</div>
      </div>
    </div>
  )
}
