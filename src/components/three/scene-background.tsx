"use client"

import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Suspense, useMemo } from "react"
import * as THREE from "three"
import { CodeField } from "./code-field"
import { HeroShapes } from "./hero-shapes"
import { BrowserDeploy } from "./browser-deploy"
import { Dust } from "./dust"
import { ScrollRig } from "./scroll-rig"

/**
 * Small screens and modest CPUs get a lighter scene: no extra geometry and no
 * post-processing. A bloom pass at high dpr is what makes WebGL feel heavy on
 * phones, while the code glyphs + dust still carry the look.
 *
 * Visitors who prefer reduced motion still get the animated scene — it runs
 * slower and with less travel (see `motionScale` / `motionAmount`), never frozen.
 */
function detectTier(): "high" | "low" {
  if (typeof window === "undefined") return "high"
  const small = window.matchMedia("(max-width: 820px)").matches
  const cores = navigator.hardwareConcurrency ?? 8
  return small || cores <= 4 ? "low" : "high"
}

/**
 * Fixed full-viewport WebGL canvas that lives behind all page content.
 * The whole scene reacts to page scroll via the shared `scrollState`.
 */
export function SceneBackground() {
  const low = useMemo(() => detectTier() === "low", [])

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #0c1220 0%, #050609 60%, #03040680 100%)" }}
    >
      <Canvas
        dpr={low ? [1, 1.2] : [1, 1.6]}
        gl={{
          // the composer renders to its own target, so canvas MSAA only costs
          antialias: false,
          alpha: true,
          powerPreference: low ? "default" : "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 14, 38]} />

        <Suspense fallback={null}>
          <ScrollRig />
          <Dust count={low ? 220 : 480} />
          <CodeField count={low ? 12 : 22} />
          {!low && <HeroShapes />}
          {!low && <BrowserDeploy />}
        </Suspense>

        {!low && (
          <EffectComposer multisampling={0}>
            <Bloom
              intensity={0.7}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.5}
              mipmapBlur
              radius={0.65}
            />
          </EffectComposer>
        )}
      </Canvas>

      {/* legibility + depth overlay (plain alpha, cheap to composite) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 38%, transparent 0%, rgba(5,6,10,0.55) 70%, rgba(5,6,10,0.88) 100%)",
        }}
      />
    </div>
  )
}
