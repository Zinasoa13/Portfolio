import { useRef, useEffect, useState, Suspense } from "react"
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
  const [scale, setScale] = useState<[number, number, number]>([2.5, 2.5, 2.5])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale([1.7, 1.7, 1.7])
      } else if (window.innerWidth < 1024) {
        setScale([2, 2, 2])
      } else {
        setScale([2.5, 2.5, 2.5])
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (actions && showContent) {
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
      group.current.position.y = Math.sin(t * 0.5) * 0.1 - 2
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2} floatingRange={[0, 0.2]}>
      <group ref={group}>
        <primitive
          object={scene}
          scale={showContent ? scale : [0.1, 0.1, 0.1]}
          position={[0, -2, 0]}
          rotation={[0, 0, 0]}
          dispose={null}
        />
      </group>
    </Float>
  )
}

useGLTF.preload("/allo.glb")

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
          position: [0, -1.8, 6],
          fov: 50,
        }}
        onCreated={({ gl, camera }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          gl.setClearColor(0x000000, 0)
          camera.lookAt(0, -2, 0)
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[0, 0, 5]}
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
          enableRotate={false}
          autoRotate={false}
          target={[0, -2, 0]}
        />
      </Canvas>
    </div>
  )
}

