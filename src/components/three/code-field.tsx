"use client"

import { useEffect, useMemo, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  motionAmount,
  motionScale,
  prefersReducedMotion,
  scrollState,
} from "@/lib/scroll-state"

const GLYPHS = [
  "{", "}", "<", ">", "</", "/>", "()", "[]", "=>", "fn", "if", "for",
  "const", "let", "var", "01", "10", "0x", "&&", "||", "==", "!=",
  "++", "--", "...", "?.", "await", "async", "import", "export",
  "return", "class", "new", "try", "catch", "#",
  "def", "print", "self", "->", "::", ";", "/*", "*/", "//",
  "React", "TS", "JS", "AI", "ML", "API", "DB", "3D",
]

const COLORS = ["#34d399", "#22d3ee", "#a7f3d0", "#67e8f9", "#fbbf24", "#e8edf5"]
const FONT_STACK =
  'ui-monospace, SFMono-Regular, Menlo, Consolas, "JetBrains Mono", monospace'

type Glyph = {
  text: string
  position: [number, number, number]
  scale: number
  color: string
  spin: number
  phase: number
}

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
 * Draws a single glyph into a small canvas texture. This replaces SDF text
 * (troika), which pulled a web font and built one font atlas per glyph —
 * by far the heaviest part of the old background.
 */
function makeGlyphSprite(text: string, color: string) {
  if (typeof document === "undefined") return null
  const fontSize = 64
  const canvas = document.createElement("canvas")
  const measure = canvas.getContext("2d")
  if (!measure) return null

  measure.font = `600 ${fontSize}px ${FONT_STACK}`
  canvas.width = Math.ceil(measure.measureText(text).width) + 24
  canvas.height = Math.round(fontSize * 1.5)

  const ctx = canvas.getContext("2d")
  if (!ctx) return null
  ctx.font = `600 ${fontSize}px ${FONT_STACK}`
  ctx.fillStyle = color
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillText(text, canvas.width / 2, canvas.height / 2)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = false

  return { texture, aspect: canvas.width / canvas.height }
}

/**
 * Field of floating code glyphs. Sprites are billboards, so they always face
 * the camera, drift slowly and fade into the fog — same look as before, a
 * fraction of the cost.
 */
export function CodeField({ count = 22 }: { count?: number }) {
  const group = useRef<THREE.Group>(null)

  const glyphs = useMemo(
    () =>
      makeGlyphs(count).map((g) => {
        const sprite = makeGlyphSprite(g.text, g.color)
        return { ...g, texture: sprite?.texture ?? null, aspect: sprite?.aspect ?? 1 }
      }),
    [count]
  )

  useEffect(
    () => () => {
      glyphs.forEach((g) => g.texture?.dispose())
    },
    [glyphs]
  )

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    node.rotation.y += delta * 0.03 * motionScale
    node.rotation.x = Math.sin(t * 0.12 * motionScale) * 0.05 * motionAmount
    node.scale.setScalar(1 + p * 0.22)

    node.children.forEach((child, i) => {
      const g = glyphs[i]
      if (!g) return
      const sprite = child as THREE.Sprite
      sprite.position.y =
        g.position[1] +
        Math.sin(t * 0.5 * motionScale + g.phase) * 0.35 * motionAmount
      sprite.position.x =
        g.position[0] +
        Math.cos(t * 0.4 * motionScale + g.phase) * 0.2 * motionAmount
      const mat = sprite.material as THREE.SpriteMaterial
      mat.rotation = g.spin * t * motionScale + g.phase
    })
  })

  return (
    <group ref={group}>
      {glyphs.map((g, i) =>
        g.texture ? (
          <sprite
            key={i}
            position={g.position}
            scale={[g.scale * 1.05 * g.aspect, g.scale * 1.05, 1]}
          >
            <spriteMaterial
              map={g.texture}
              transparent
              opacity={prefersReducedMotion ? 0.45 : 0.7}
              depthWrite={false}
              toneMapped={false}
            />
          </sprite>
        ) : null
      )}
    </group>
  )
}
