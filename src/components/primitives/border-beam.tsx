"use client"

import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/**
 * Animated gradient beam that traces the border of its parent.
 * Pure-CSS conic-gradient animation. Parent should be `relative`.
 */
export function BorderBeam({
  className,
  size = 220,
  duration = 6,
  colorFrom = "var(--primary)",
  colorTo = "var(--accent2)",
  delay = 0,
}: {
  className?: string
  size?: number
  duration?: number
  colorFrom?: string
  colorTo?: string
  delay?: number
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className
      )}
      style={{
        background: `conic-gradient(from ${delay * 360}deg, transparent 0deg, ${colorFrom} 80deg, ${colorTo} 140deg, transparent 220deg)`,
        animation: `border-beam-spin ${duration}s linear infinite`,
        backgroundSize: `${size}% ${size}%`,
      }}
    />
  )
}
