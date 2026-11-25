"use client"

import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * Animated light that travels along the border of its parent.
 * The conic gradient is masked down to a 1px ring (padding + content-box mask)
 * and its angle is animated through a registered custom property, so nothing
 * repaints outside the border and the card itself never rotates.
 * Parent should be `relative`.
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
      className={cn("border-beam pointer-events-none absolute inset-0 rounded-[inherit] p-px", className)}
      style={
        {
          "--beam-from": colorFrom,
          "--beam-to": colorTo,
          "--beam-size": `${size}%`,
          "--beam-delay": `${delay * -6}s`,
          backgroundImage: `conic-gradient(from var(--beam-angle), transparent 0deg, var(--beam-from) 80deg, var(--beam-to) 140deg, transparent 220deg)`,
          backgroundSize: "var(--beam-size) var(--beam-size)",
          animation: `border-beam-rotate ${duration}s linear infinite`,
          animationDelay: "var(--beam-delay)",
        } as CSSProperties
      }
    />
  )
}
