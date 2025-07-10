import { useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, OrbitControls, Environment, Float } from "@react-three/drei"
import type * as THREE from "three"

interface Contact3DModelProps {
  showContent: boolean
}

function ContactModel({ showContent }: { showContent: boolean }) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/allo.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions && showContent) {
      // Jouer la première animation disponible
      const firstAction = actions[Object.keys(actions)[0]]
      if (firstAction) {
        firstAction.reset().fadeIn(0.5).play()
      }
      return () => {
        if (firstAction) firstAction.fadeOut(0.5)
      }
    }
  }, [actions, showContent])

  useFrame((state) => {
    if (group.current && showContent) {
      const t = state.clock.getElapsedTime()
      // Seulement le mouvement de flottement vertical léger
      group.current.position.y = Math.sin(t * 0.5) * 0.1 - 2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.2]}>
      <group ref={group}>
        <primitive
          object={scene}
          scale={showContent ? [2.5, 2.5, 2.5] : [0.1, 0.1, 0.1]}
          position={[0, -2, 0]}
          rotation={[0, 0, 0]} // Face à la caméra
          dispose={null}
        />
      </group>
    </Float>
  )
}

// Préchargement du bon modèle
useGLTF.preload("/allo.glb")

// Fallback 3D minimaliste
function LoadingFallback3D() {
  return (
    <mesh rotation={[0, 0, 0]} position={[0, -2, 0]}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  )
}

export default function Contact3DModel({ showContent }: Contact3DModelProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{
          position: [0, -1.8, 6], // Même hauteur que le modèle, vue frontale
          fov: 50,
        }}
        onCreated={({ gl, camera }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.setClearColor(0x000000, 0) // Fond transparent
          // Forcer la caméra à regarder directement le modèle
          camera.lookAt(0, -2, 0)
        }}
        style={{ background: "transparent" }}
      >
        {/* Lumières */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[0, 0, 5]} // Lumière frontale
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, -2, 4]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[3, -2, 4]} intensity={0.4} color="#ec4899" />

        <Environment preset="city" />

        <Suspense fallback={<LoadingFallback3D />}>
          <ContactModel showContent={showContent} />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false} // Pas de rotation manuelle
          autoRotate={false} // Pas d'auto-rotation
          target={[0, -2, 0]} // Cible exactement le centre du modèle
        />
      </Canvas>
    </div>
  )
}
