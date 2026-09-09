"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

function CodeLine({ 
  position, 
  width, 
  color, 
  speed,
  delayOffset
}: { 
  position: [number, number, number], 
  width: number, 
  color: string, 
  speed: number,
  delayOffset: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    
    // Y-axis floating
    ref.current.position.y += Math.sin(t * speed + delayOffset) * 0.003
    
    // Slow orbit rotation
    ref.current.rotation.y += delta * speed * 0.15
  })

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[width, 0.15, 0.15]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

export function HeroShapes() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    if (group.current) {
      group.current.position.y = -p * 1.5 + Math.sin(t * 0.2) * 0.1
      group.current.rotation.x = p * 0.1
      group.current.rotation.y = Math.sin(t * 0.1) * 0.1 + p * 0.2
      const s = 1 + p * 0.15
      group.current.scale.setScalar(s)
    }
  })

  // Theme colors
  const primary = "#34d399"
  const cyan = "#22d3ee"
  const amber = "#fbbf24"

  return (
    <group ref={group}>
      {/* 
        Abstract floating "code blocks".
        Looks like an IDE source code floating in 3D.
      */}
      <group position={[-1.5, 0.5, 0]}>
        <CodeLine position={[0, 0, 0]} width={2.5} color={primary} speed={0.8} delayOffset={0} />
        <CodeLine position={[0.2, -0.4, 0]} width={1.8} color={cyan} speed={0.8} delayOffset={1} />
        <CodeLine position={[-0.1, -0.8, 0]} width={2.2} color={primary} speed={0.8} delayOffset={2} />
      </group>

      <group position={[1.5, -0.5, 0.5]} rotation={[0, -0.5, 0]}>
        <CodeLine position={[0, 0, 0]} width={1.5} color={amber} speed={1.1} delayOffset={3} />
        <CodeLine position={[0.3, -0.4, 0]} width={2.8} color={primary} speed={1.1} delayOffset={4} />
      </group>

      <group position={[0, -1.8, -1]} rotation={[0, 0.4, 0]}>
        <CodeLine position={[0, 0, 0]} width={3.5} color={cyan} speed={0.6} delayOffset={5} />
      </group>

      <group position={[-2, -1.5, -0.5]} rotation={[0, 0.2, 0.2]}>
        <CodeLine position={[0, 0, 0]} width={1.2} color={amber} speed={0.9} delayOffset={6} />
      </group>

      <group position={[2.5, 1.2, -1]} rotation={[-0.2, -0.2, 0]}>
        <CodeLine position={[0, 0, 0]} width={2.0} color={cyan} speed={0.7} delayOffset={7} />
        <CodeLine position={[0.2, -0.4, 0]} width={1.5} color={amber} speed={0.7} delayOffset={8} />
        <CodeLine position={[-0.3, -0.8, 0]} width={3.1} color={primary} speed={0.7} delayOffset={9} />
      </group>

      {/* Central glowing core / node */}
      <mesh position={[0, 0, -1]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshBasicMaterial color={cyan} wireframe transparent opacity={0.6} />
      </mesh>

      {/* Add a generic terminal-like window outline frame to give programming feel */}
      <group position={[0, 0, -2]}>
         <mesh position={[0, 3, 0]}>
           <boxGeometry args={[8, 0.1, 0.1]} />
           <meshBasicMaterial color={primary} transparent opacity={0.3} />
         </mesh>
         <mesh position={[0, -3, 0]}>
           <boxGeometry args={[8, 0.1, 0.1]} />
           <meshBasicMaterial color={primary} transparent opacity={0.3} />
         </mesh>
         <mesh position={[-4, 0, 0]}>
           <boxGeometry args={[0.1, 6, 0.1]} />
           <meshBasicMaterial color={primary} transparent opacity={0.3} />
         </mesh>
         <mesh position={[4, 0, 0]}>
           <boxGeometry args={[0.1, 6, 0.1]} />
           <meshBasicMaterial color={primary} transparent opacity={0.3} />
         </mesh>
      </group>
    </group>
  )
}
