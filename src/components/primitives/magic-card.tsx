"use client"

import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type { ReactNode, MouseEvent } from "react"
import { cn } from "@/lib/utils"

/**
 * Card with a mouse-follow radial spotlight + subtle border highlight.
 * Inspired by Magic UI / 21st.dev "magic-card" pattern, built locally
 * so no registry dependency is required.
 */
export function MagicCard({
  children,
  className,
  spotlightColor = "rgba(52, 211, 153, 0.18)",
}: {
  children: ReactNode
  className?: string
  spotlightColor?: string
}) {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const background = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, ${spotlightColor}, transparent 60%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(-200)
        my.set(-200)
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border/70 bg-elevated/50 backdrop-blur-sm transition-colors duration-300 hover:border-primary/40",
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
