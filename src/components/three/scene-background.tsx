"use client"

import { Canvas } from "@react-three/fiber"
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import { Suspense, useMemo } from "react"
import * as THREE from "three"
import { CodeField } from "./code-field"
import { HeroShapes } from "./hero-shapes"
import { BrowserDeploy } from "./browser-deploy"
import { Dust } from "./dust"
import { ScrollRig } from "./scroll-rig"

/**
 * Fixed full-viewport WebGL canvas that lives behind all page content.
 * The whole scene reacts to page scroll via the shared `scrollState`.
 */
export function SceneBackground() {
  const caOffset = useMemo(() => new THREE.Vector2(0.0006, 0.0009), [])
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ background: "radial-gradient(ellipse at 50% 30%, #0c1220 0%, #050609 60%, #03040680 100%)" }}
    >
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 14, 38]} />

        <ambientLight intensity={0.35} />
        <pointLight position={[6, 6, 6]} intensity={1.4} color="#34d399" />
        <pointLight position={[-6, -4, 4]} intensity={1.0} color="#22d3ee" />
        <pointLight position={[0, 0, -8]} intensity={0.7} color="#fbbf24" />

        <Suspense fallback={null}>
          <ScrollRig />
          <Dust count={700} />
          <CodeField count={34} />
          <HeroShapes />
          <BrowserDeploy />
        </Suspense>

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.7}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={caOffset}
            radialModulation={false}
            modulationOffset={0}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.85} />
        </EffectComposer>
      </Canvas>

      {/* CSS overlays for depth & legibility */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 38%, transparent 0%, rgba(5,6,10,0.55) 70%, rgba(5,6,10,0.85) 100%)",
        }}
      />
    </div>
  )
}
