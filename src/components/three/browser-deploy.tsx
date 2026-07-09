"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { scrollState } from "@/lib/scroll-state"

/**
 * The "system deploying" metaphor: a wireframe browser window that
 * assembles (parts fade + scale in) as the user scrolls into the
 * Projects/Deploy phase (~60%-95% of the page), then gently floats.
 */
export function BrowserDeploy() {
  const group = useRef<THREE.Group>(null)
  const frame = useRef<THREE.Group>(null)
  const contentLines = useRef<THREE.Group>(null)
  const cursor = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const p = scrollState.progress

    // map scroll 0.55 -> 0.95 to build progress 0 -> 1
    const build = THREE.MathUtils.clamp((p - 0.5) / 0.35, 0, 1)

    if (group.current) {
      group.current.visible = p > 0.45
      // position it to the right, drifting
      group.current.position.x = 3.4 - p * 1.2
      group.current.position.y = 1.6 - p * 1.2
      group.current.position.z = -1.5 + p * 0.5
      group.current.rotation.y = -0.45 + Math.sin(t * 0.3) * 0.05
      group.current.rotation.x = 0.12 + Math.sin(t * 0.25) * 0.04
      // overall scale-in
      const s = 0.6 + build * 0.4
      group.current.scale.setScalar(s)
    }

    if (frame.current) {
      // frame draws in first (0 -> 0.5 of build)
      const f = THREE.MathUtils.clamp(build / 0.5, 0, 1)
      frame.current.children.forEach((child) => {
        const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        m.opacity = f * 0.9
      })
    }

    if (contentLines.current) {
      // content lines type in after frame (0.4 -> 1 of build)
      contentLines.current.children.forEach((child, i) => {
        const local = THREE.MathUtils.clamp((build - 0.4) * 1.6 - i * 0.06, 0, 1)
        const m = (child as THREE.Mesh).material as THREE.MeshBasicMaterial
        m.opacity = local * 0.85
        child.scale.x = local
      })
    }

    if (cursor.current) {
      // blinking cursor moving across content area
      const blink = (Math.sin(t * 5) > 0) ? 1 : 0.1
      const m = cursor.current.material as THREE.MeshBasicMaterial
      m.opacity = build * 0.9 * blink
      cursor.current.position.x = -1.3 + ((t * 0.35) % 2.6)
      cursor.current.position.y = 0.4 - Math.floor((t * 0.35) % 5) * 0.22
    }

    void delta
  })

  return (
    <group ref={group} visible={false}>
      {/* browser frame */}
      <group ref={frame}>
        {/* outer window border */}
        <mesh>
          <planeGeometry args={[3.6, 2.25]} />
          <meshBasicMaterial color="#34d399" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.6, 2.25)]} />
          <lineBasicMaterial color="#34d399" transparent opacity={0} />
        </lineSegments>

        {/* top bar */}
        <mesh position={[0, 1.18, 0.01]}>
          <planeGeometry args={[3.6, 0.28]} />
          <meshBasicMaterial color="#0c1424" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments position={[0, 1.18, 0.02]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.6, 0.28)]} />
          <lineBasicMaterial color="#22d3ee" transparent opacity={0} />
        </lineSegments>

        {/* traffic dots */}
        {[-1.66, -1.5, -1.34].map((x, i) => (
          <mesh key={i} position={[x, 1.18, 0.03]}>
            <circleGeometry args={[0.035, 16]} />
            <meshBasicMaterial
              color={i === 0 ? "#f87171" : i === 1 ? "#fbbf24" : "#34d399"}
              transparent
              opacity={0}
            />
          </mesh>
        ))}

        {/* address bar */}
        <mesh position={[0.3, 0.92, 0.02]}>
          <planeGeometry args={[3.0, 0.18]} />
          <meshBasicMaterial color="#0c1424" transparent opacity={0} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments position={[0.3, 0.92, 0.03]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.0, 0.18)]} />
          <lineBasicMaterial color="#34d399" transparent opacity={0} />
        </lineSegments>

        {/* content area border */}
        <lineSegments position={[0, -0.05, 0.02]}>
          <edgesGeometry args={[new THREE.PlaneGeometry(3.4, 1.7)]} />
          <lineBasicMaterial color="#22d3ee" transparent opacity={0} />
        </lineSegments>
      </group>

      {/* typed content lines (scale-x to simulate typing) */}
      <group ref={contentLines} position={[-1.5, 0.4, 0.04]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[0, -i * 0.22, 0]} scale={[0, 1, 1]}>
            <planeGeometry args={[1.6 + (i % 3) * 0.4 - (i === 5 ? 0.8 : 0), 0.06]} />
            <meshBasicMaterial color="#34d399" transparent opacity={0} />
          </mesh>
        ))}
      </group>

      {/* blinking cursor */}
      <mesh ref={cursor} position={[-1.3, 0.4, 0.05]}>
        <planeGeometry args={[0.03, 0.12]} />
        <meshBasicMaterial color="#a7f3d0" transparent opacity={0} />
      </mesh>
    </group>
  )
}
