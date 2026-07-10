"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion"
import { useRef, type MouseEvent } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * "Sensational" portrait treatment:
 *  - hexagon mask (not square)
 *  - 3D tilt that follows the cursor (perspective)
 *  - layered glow + scanline + corner ticks
 *  - hover reveals full color from a subtle duotone
 */
export function TiltPhoto({
  className,
  size = 380,
  nameplate = "clegivaldo.exe",
}: {
  className?: string
  size?: number
  nameplate?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 150, damping: 18 })
  const sry = useSpring(ry, { stiffness: 150, damping: 18 })

  // glow follows the tilt a little
  const glowX = useTransform(sry, [-30, 30], ["60%", "40%"])
  const glowY = useTransform(srx, [-30, 30], ["60%", "40%"])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * 24)
    rx.set(-py * 24)
  }
  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div
      className={cn("relative perspective-1000", className)}
      style={{ width: size, height: size * 1.25 }}
    >
      {/* ambient blurred glow behind */}
      <motion.div
        aria-hidden
        className="absolute -inset-10 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(52,211,153,0.35), rgba(34,211,238,0.15) 60%, transparent 80%)",
          opacity: 0.8,
        }}
      />

      {/* floating accent orbs */}
      <motion.div
        aria-hidden
        className="absolute -left-6 top-10 h-3 w-3 rounded-full bg-accent3 shadow-glow"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-4 top-1/3 h-2 w-2 rounded-full bg-accent2 shadow-glow"
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
      <motion.div
        aria-hidden
        className="absolute -right-8 bottom-16 h-2.5 w-2.5 rounded-full bg-primary shadow-glow"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative h-full w-full preserve-3d"
        style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      >
        {/* outer hexagon frame (border) */}
        <div
          className="absolute inset-0 clip-hex"
          style={{
            background:
              "linear-gradient(140deg, rgba(52,211,153,0.9), rgba(34,211,238,0.5) 50%, rgba(251,191,36,0.6))",
            padding: 2,
          }}
        >
          <div className="h-full w-full clip-hex bg-void" />
        </div>

        {/* portrait image */}
        <div className="absolute inset-[3px] clip-hex overflow-hidden">
          <Image
            src="/profile/portrait.webp"
            alt="Clegivaldo Cruz — Engenheiro de Computação"
            fill
            sizes={`${size}px`}
            priority
            className="object-cover object-top transition-[filter,transform] duration-700 group-hover:scale-[1.04]"
          />
          {/* subtle cursor-tracking glow on top of photo */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background: useMotionTemplate`radial-gradient(50% 45% at ${glowX} ${glowY}, rgba(52,211,153,0.28), transparent 65%)`,
            }}
          />
          {/* very subtle scanline for "screen" feel */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)",
            }}
          />
          {/* gentle bottom vignette for depth + legibility of nameplate */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-void/70 to-transparent" />
        </div>

        {/* corner ticks (HUD-style) */}
        <div className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-primary/80" />
        <div className="absolute -right-2 -top-2 h-5 w-5 border-r-2 border-t-2 border-accent2/80" />
        <div className="absolute -bottom-2 -left-2 h-5 w-5 border-b-2 border-l-2 border-accent2/80" />
        <div className="absolute -right-2 -bottom-2 h-5 w-5 border-b-2 border-r-2 border-primary/80" />

        {/* nameplate floating chip */}
        <motion.div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 glass-strong rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-primary"
          style={{ transform: "translateZ(60px) translateX(-50%)" }}
        >
          {nameplate}
        </motion.div>
      </motion.div>
    </div>
  )
}
