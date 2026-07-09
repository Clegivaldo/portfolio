"use client"

import { useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Billboard } from "@react-three/drei"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

const GLYPHS = [
  "{", "}", "<", ">", "</", "/>", "()", "[]", "=>", "fn", "if", "for",
  "const", "let", "var", "01", "10", "0x", "&&", "||", "==", "!=",
  "++", "--", "...", "?.", "await", "async", "import", "export",
  "return", "class", "new", "try", "catch", "&&", "||", "#",
  "def", "print", "self", "->", "::", ";", "/*", "*/", "//",
  "React", "TS", "JS", "AI", "ML", "API", "DB", "3D",
]

type Glyph = {
  text: string
  position: [number, number, number]
  scale: number
  color: string
  spin: number
  phase: number
}

const COLORS = ["#34d399", "#22d3ee", "#a7f3d0", "#67e8f9", "#fbbf24", "#e8edf5"]

function makeGlyphs(count: number): Glyph[] {
  const out: Glyph[] = []
  let seed = 1337
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < count; i++) {
    const r = 5 + rand() * 9
    const theta = rand() * Math.PI * 2
    const phi = (rand() - 0.5) * Math.PI * 0.9
    out.push({
      text: GLYPHS[Math.floor(rand() * GLYPHS.length)],
      position: [
        Math.cos(theta) * Math.cos(phi) * r,
        Math.sin(phi) * r * 0.8,
        Math.sin(theta) * Math.cos(phi) * r - 3,
      ],
      scale: 0.22 + rand() * 0.5,
      color: COLORS[Math.floor(rand() * COLORS.length)],
      spin: (rand() - 0.5) * 0.4,
      phase: rand() * Math.PI * 2,
    })
  }
  return out
}

/**
 * Field of floating code glyphs (Text billboards) that drift, rotate
 * slowly and fade based on scroll progress.
 */
export function CodeField({ count = 46 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)
  const glyphs = useMemo(() => makeGlyphs(count), [count])

  useFrame((state, delta) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    group.current.rotation.y += delta * 0.04
    group.current.rotation.x = Math.sin(t * 0.12) * 0.06

    // gently scatter glyphs further as we scroll
    const s = 1 + p * 0.25
    group.current.scale.setScalar(s)

    group.current.children.forEach((child, i) => {
      const g = glyphs[i]
      if (!g) return
      const m = child as THREE.Object3D
      m.position.y =
        g.position[1] + Math.sin(t * 0.5 + g.phase) * 0.35
      m.position.x =
        g.position[0] + Math.cos(t * 0.4 + g.phase) * 0.2
      m.rotation.z = g.spin * t + g.phase
    })
  })

  return (
    <group ref={group}>
      {glyphs.map((g, i) => (
        <Billboard key={i} position={g.position}>
          <Text
            font={undefined}
            fontSize={g.scale}
            color={g.color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.004}
            outlineColor="#05060a"
            fillOpacity={0.7}
            material-transparent
            material-opacity={0.7}
          >
            {g.text}
          </Text>
        </Billboard>
      ))}
    </group>
  )
}
