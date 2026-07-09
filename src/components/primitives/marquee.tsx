"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

/** Infinite horizontal marquee. Duplicates children for seamless loop. */
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
        className="flex shrink-0 items-center gap-6 pr-6 [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-6 pr-6 [animation-play-state:running] group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-x ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {children}
        {children}
      </div>
      {pauseOnHover ? null : null}
    </div>
  )
}
