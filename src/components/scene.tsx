import { useRef, useEffect, Suspense, useState, memo, useCallback } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useGLTF, useAnimations, Environment, OrbitControls, Html } from "@react-three/drei"
import * as THREE from "three"

interface SceneProps {
  showContent: boolean
  isDarkMode: boolean
}

const isMobileDevice = () => {
  if (typeof window === "undefined") return false
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 1024
  )
}

function Model({ showContent }: { showContent: boolean }) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF("/walk.glb")
  const { actions } = useAnimations(animations, group)
  const [scale, setScale] = useState<[number, number, number]>([1.3, 1.3, 1.3])
  const [posY, setPosY] = useState<number>(-1.3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScale([1.2, 1.2, 1.2])
        setPosY(-1.1)
      } else if (window.innerWidth < 1024) {
        setScale([1.4, 1.4, 1.4])
        setPosY(-1.2)
      } else {
        // Desktop : échelle agrandie mais position remontée pour garder les pieds visibles dans le cadre
        setScale([1.6, 1.6, 1.6])
        setPosY(-1.15)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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
      group.current.position.y = Math.sin(t * 0.8) * 0.08 + posY
    }
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={showContent ? scale : [0.1, 0.1, 0.1]} position={[0, posY, 0]} />
    </group>
  )
}

useGLTF.preload("/walk.glb")

function CameraController({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree()

  useEffect(() => {
    if (isMobile) {
      camera.position.set(0, 0.2, 4.5)
      camera.lookAt(0, -0.2, 0)
    } else {
      // Éloignement de la caméra sur Z (5.5) pour voir le personnage en entier sans rognage
      camera.position.set(0, 0, 5.5)
      camera.lookAt(0, -0.15, 0)
    }
    camera.updateProjectionMatrix()
  }, [camera, isMobile])

  return null
}

const LoadingFallback = memo(() => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="flex flex-col items-center gap-2">
      <div className="w-8 h-8 border-4 border-purple-200 dark:border-purple-800 border-t-purple-600 dark:border-t-purple-400 rounded-full animate-spin" />
      <p className="text-xs text-gray-500 dark:text-gray-400">Chargement 3D...</p>
    </div>
  </div>
))
LoadingFallback.displayName = "LoadingFallback"

export default function Scene3D({ showContent, isDarkMode }: SceneProps) {
  const [isMobile, setIsMobile] = useState<boolean>(() => isMobileDevice())
  const glRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    const handleResize = () => setIsMobile(isMobileDevice())
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    glRef.current = gl
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    gl.setClearColor(0x000000, 0)

    const canvasEl = gl.domElement

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn("[Scene3D] WebGL context lost — tentative de restauration automatique.")
    }

    const handleContextRestored = () => {
      console.info("[Scene3D] WebGL context restored — re-initialisation du renderer.")
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      gl.setClearColor(0x000000, 0)
    }

    canvasEl.addEventListener("webglcontextlost", handleContextLost, false)
    canvasEl.addEventListener("webglcontextrestored", handleContextRestored, false)

    ;(canvasEl as any).__contextLostHandler = handleContextLost
    ;(canvasEl as any).__contextRestoredHandler = handleContextRestored
  }, [])

  useEffect(() => {
    return () => {
      const gl = glRef.current
      if (gl) {
        const canvasEl = gl.domElement as any
        if (canvasEl.__contextLostHandler) {
          canvasEl.removeEventListener("webglcontextlost", canvasEl.__contextLostHandler)
        }
        if (canvasEl.__contextRestoredHandler) {
          canvasEl.removeEventListener("webglcontextrestored", canvasEl.__contextRestoredHandler)
        }
        gl.dispose()
      }
    }
  }, [])

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        className="pointer-events-auto"
        camera={{
          position: isMobile ? [0, 0.2, 4.5] : [0, 0, 5.5],
          fov: 45,
        }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        dpr={[1, 1.5]}
        gl={{
          preserveDrawingBuffer: true,
          powerPreference: "high-performance",
          antialias: true,
        }}
        onCreated={handleCreated}
      >
        <CameraController isMobile={isMobile} />
        <ambientLight intensity={isDarkMode ? 0.6 : 0.8} />
        <directionalLight position={[5, 8, 5]} intensity={isDarkMode ? 1.0 : 1.4} castShadow />
        {/* Soft prestige amethyst rim light in dark mode */}
        <pointLight position={[-4, 3, -2]} intensity={isDarkMode ? 1.5 : 0.6} color={isDarkMode ? "#c084fc" : "#e9d5ff"} />
        <pointLight position={[4, -1, 3]} intensity={isDarkMode ? 1.2 : 0.4} color={isDarkMode ? "#a855f7" : "#cbd5e1"} />

        <Environment preset={isDarkMode ? "city" : "studio"} />

        <Suspense fallback={<Html center><LoadingFallback /></Html>}>
          <Model showContent={showContent} />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
          autoRotate={false}
          autoRotateSpeed={isMobile ? 1.5 : 3}
          target={isMobile ? [0, -0.2, 0] : [0, -0.15, 0]}
        />
      </Canvas>
    </div>
  )
}