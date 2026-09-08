"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

const SYMBOLS = [
  "{ }", "< />", "=>", "TS", "[]", "&&", "git", "console", "() =>", "P&D"
]

function FloatingSymbol({ 
  text, 
  position, 
  color, 
  speed,
  scale = 1
}: { 
  text: string, 
  position: [number, number, number], 
  color: string, 
  speed: number,
  scale?: number
}) {
  const ref = useRef<THREE.Group>(null)
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])
  
  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y += Math.sin(t * speed + offset) * 0.005
    ref.current.rotation.y += delta * speed * 0.2
    ref.current.rotation.z = Math.sin(t * speed * 0.5 + offset) * 0.1
  })

  return (
    <group ref={ref} position={position} scale={scale}>
      <Text
        color={color}
        fontSize={0.6}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="left"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor={color}
        fillOpacity={0.4}
        outlineOpacity={0.8}
        font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
      >
        {text}
      </Text>
    </group>
  )
}

export function HeroShapes() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    if (group.current) {
      // scroll interaction: subtle tilt & lift
      group.current.position.y = -p * 1.5 + Math.sin(t * 0.2) * 0.1
      group.current.rotation.x = Math.sin(t * 0.3) * 0.05 + p * 0.1
      const s = 1 + p * 0.2
      group.current.scale.setScalar(s)
      group.current.rotation.y = Math.sin(t * 0.1) * 0.1 + p * 0.2
    }
  })

  return (
    <group ref={group}>
      {/* 
        A constellation of programming symbols in 3D space 
        Using theme colors: #34d399 (emerald), #22d3ee (cyan), #fbbf24 (amber)
      */}
      <FloatingSymbol text="{ }" position={[-1.8, 0.5, 0]} color="#34d399" speed={0.8} scale={1.8} />
      <FloatingSymbol text="< />" position={[1.5, -0.2, 0.5]} color="#22d3ee" speed={0.6} scale={1.5} />
      <FloatingSymbol text="=>" position={[-0.8, -1.2, 1.2]} color="#fbbf24" speed={1.1} scale={1.2} />
      <FloatingSymbol text="TS" position={[2.2, 1.2, -0.5]} color="#34d399" speed={0.7} scale={1} />
      <FloatingSymbol text="[]" position={[-2.5, -0.5, -1]} color="#22d3ee" speed={0.9} scale={1.4} />
      <FloatingSymbol text="git" position={[0.5, 1.5, -1.5]} color="#fbbf24" speed={0.5} scale={1.2} />
      <FloatingSymbol text="&&" position={[-0.2, 0.8, 1.5]} color="#34d399" speed={1.2} scale={1.1} />
    </group>
  )
}
