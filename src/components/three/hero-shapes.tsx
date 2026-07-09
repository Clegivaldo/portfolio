"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

/**
 * Central hero composition: a counter-rotating wireframe icosahedron +
 * torus-knot + glowing core. Rotation speed, scale and tilt respond to
 * scroll progress so the sculpture "evolves" as the user reads the page.
 */
export function HeroShapes() {
  const group = useRef<THREE.Group>(null)
  const ico = useRef<THREE.Mesh>(null)
  const knot = useRef<THREE.Mesh>(null)
  const octa = useRef<THREE.Mesh>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    if (group.current) {
      // lift & sway with scroll
      group.current.position.y = -p * 0.6 + Math.sin(t * 0.4) * 0.1
      group.current.rotation.y = p * Math.PI * 0.8
      group.current.rotation.x = Math.sin(t * 0.3) * 0.12 + p * 0.3
      const s = 1 + p * 0.15
      group.current.scale.setScalar(s)
    }

    if (ico.current) {
      ico.current.rotation.x += delta * 0.18
      ico.current.rotation.y += delta * 0.22
    }
    if (knot.current) {
      knot.current.rotation.x -= delta * 0.14
      knot.current.rotation.z += delta * 0.2
    }
    if (octa.current) {
      octa.current.rotation.y += delta * 0.35
      octa.current.rotation.z -= delta * 0.18
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.12
      ring.current.rotation.x = Math.PI / 2.2 + Math.sin(t * 0.3) * 0.1
    }
    if (core.current) {
      const m = core.current.material as THREE.MeshStandardMaterial
      const pulse = 0.6 + Math.sin(t * 1.6) * 0.25
      m.emissiveIntensity = pulse + p * 0.4
      core.current.scale.setScalar(0.9 + Math.sin(t * 1.2) * 0.05)
    }
  })

  return (
    <group ref={group}>
      {/* outer wireframe icosahedron */}
      <mesh ref={ico}>
        <icosahedronGeometry args={[2.2, 1]} />
        <meshBasicMaterial
          color="#34d399"
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* mid torus knot */}
      <mesh ref={knot} scale={0.95}>
        <torusKnotGeometry args={[1.4, 0.16, 180, 24, 2, 3]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.42} />
      </mesh>

      {/* orbiting octahedron */}
      <mesh ref={octa} position={[2.6, 0.5, -0.5]} scale={0.32}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#fbbf24" wireframe transparent opacity={0.8} />
      </mesh>

      {/* thin orbit ring */}
      <mesh ref={ring} scale={3.1}>
        <torusGeometry args={[1, 0.008, 8, 120]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.45} />
      </mesh>

      {/* glowing core */}
      <mesh ref={core}>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshStandardMaterial
          color="#a7f3d0"
          emissive="#34d399"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* inner faint glow sphere */}
      <mesh scale={0.7}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}
