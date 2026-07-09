"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

/**
 * Ambient point-dust for atmosphere. Implemented as a single Points cloud
 * with additive blending for a soft glow.
 */
export function Dust({ count = 800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const c1 = new THREE.Color("#34d399")
    const c2 = new THREE.Color("#22d3ee")
    const c3 = new THREE.Color("#fbbf24")
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 22
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * Math.PI
      positions[i * 3] = Math.cos(theta) * Math.cos(phi) * r
      positions[i * 3 + 1] = Math.sin(phi) * r
      positions[i * 3 + 2] = Math.sin(theta) * Math.cos(phi) * r - 4
      const pick = Math.random()
      const c = pick < 0.6 ? c1 : pick < 0.9 ? c2 : c3
      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }
    return { positions, colors }
  }, [count])

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.015
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.05
    const mat = ref.current.material as THREE.PointsMaterial
    mat.opacity = 0.55 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.6}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
