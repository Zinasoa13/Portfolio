"use client"

import { useRef, useEffect, Suspense, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, PresentationControls, Html } from "@react-three/drei"
import * as THREE from "three"

interface ModelProps {
  showContent: boolean
  isDarkMode?: boolean
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
      group.current.position.y = Math.sin(t * 0.8) * 0.1 - 1
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={showContent ? [2, 2, 2] : [0.1, 0.1, 0.1]} position={[0, -1, 0]} />
    </group>
  )
}

useGLTF.preload("/walk.glb")

function CameraController({ showContent }: { showContent: boolean }) {
  const { camera } = useThree()
  const animationRef = useRef({ startTime: 0, isAnimating: false })
  const startPosition = useMemo(() => new THREE.Vector3(8, 3, 8), [])
  const endPosition = useMemo(() => new THREE.Vector3(3, 1, 5), [])

  useEffect(() => {
    if (showContent) {
      animationRef.current.startTime = Date.now()
      animationRef.current.isAnimating = true
    } else {
      camera.position.copy(startPosition)
      camera.lookAt(0, -0.5, 0)
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
      camera.lookAt(0, -0.5, 0)

      if (t >= 1) {
        animationRef.current.isAnimating = false
      }
    }
  })

  return null
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-transparent">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        <p className="text-sm text-gray-600">Chargement du modèle 3D...</p>
      </div>
    </div>
  )
}

export default function Scene3D({ showContent, isDarkMode }: ModelProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [8, 3, 8], fov: 50 }}
        className="rounded-2xl"
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.setClearColor(0x000000, 0)
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={isDarkMode ? 0.3 : 0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={isDarkMode ? 0.5 : 1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 2, -5]} intensity={isDarkMode ? 0.2 : 0.4} />

        {/* Purple "Lightning" Shine for Dark Mode */}
        {isDarkMode && (
          <>
            <spotLight
              position={[0, 6, -1.5]} // More central, above and slightly behind
              angle={0.6} // Wider angle
              penumbra={0.5} // Softer edges
              intensity={400} // Increased intensity
              color="#a855f7" // Purple-500
              castShadow
              target-position={[0, 1.2, 0]} // Target the top of the head
            />
          </>
        )}

        <Environment preset="city" environmentIntensity={isDarkMode ? 0.2 : 1.0} />

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
          <Suspense fallback={<Html center><LoadingFallback /></Html>}>
            <Model showContent={showContent} />
          </Suspense>
        </PresentationControls>
      </Canvas>

    </div>
  )
}
