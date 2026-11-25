"use client"

/* eslint-disable react-hooks/immutability -- mutating three.js objects inside useFrame is the intended R3F pattern */
import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { motionAmount, scrollState } from "@/lib/scroll-state"

/**
 * Drives the camera from scroll progress plus a very light pointer parallax.
 * Reading shared values inside useFrame keeps this free of React re-renders.
 */
export function ScrollRig() {
  const { camera } = useThree()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  useFrame((_, delta) => {
    const p = scrollState.progress
    const k = Math.min(1, delta * 2)

    // gentle dolly: start a bit back, push in as the user scrolls
    const targetZ = 12 - p * 5.5 + Math.sin(p * Math.PI) * 0.5
    const targetX =
      Math.sin(p * Math.PI * 1.2) * 0.8 * motionAmount +
      pointer.current.x * 0.55 * motionAmount
    const targetY =
      -p * 0.5 +
      Math.sin(p * Math.PI * 2) * 0.2 * motionAmount -
      pointer.current.y * 0.3 * motionAmount

    camera.position.x += (targetX - camera.position.x) * k
    camera.position.y += (targetY - camera.position.y) * k
    camera.position.z += (targetZ - camera.position.z) * k
    camera.lookAt(0, 0, 0)
  })

  return null
}
