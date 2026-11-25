"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/**
 * Infinite horizontal marquee. The children are rendered twice inside a single
 * track, so translateX(-50%) loops seamlessly with half the DOM it used to have.
 */
export function Marquee({
  children,
  className,
  duration = 28,
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode
  className?: string
  duration?: number
  reverse?: boolean
  pauseOnHover?: boolean
}) {
  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-6 pr-6",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  )
}
