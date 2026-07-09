"use client"

/* eslint-disable react-hooks/immutability -- mutating three.js objects inside useFrame is the intended R3F pattern */
import { useFrame, useThree } from "@react-three/fiber"
import { scrollState } from "@/lib/scroll-state"

/**
 * Keeps the shared scrollState.viewport in sync and nudges the camera
 * based on scroll progress. Reading scrollState inside useFrame avoids
 * React re-renders.
 */
export function ScrollRig() {
  const { camera, size } = useThree()

  useFrame((_, delta) => {
    const p = scrollState.progress
    // gentle dolly: start a bit back, push in as user scrolls, ease out near end
    const targetZ = 12 - p * 6.5 + Math.sin(p * Math.PI) * 0.6
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.2)

    // subtle parallax based on pointer? keep minimal — instead drift with scroll
    const targetX = Math.sin(p * Math.PI * 1.4) * 0.9
    const targetY = -p * 0.6 + Math.sin(p * Math.PI * 2) * 0.25
    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 1.6)
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 1.6)
    camera.lookAt(0, 0, 0)

    void size
  })

  return null
}
