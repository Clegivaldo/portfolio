"use client"

import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"
import type { HeadingParts } from "@/lib/i18n/dictionaries"
import type { ReactNode } from "react"

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
  className,
}: {
  index: string
  label: string
  title: ReactNode | HeadingParts
  description?: ReactNode
  align?: "left" | "center"
  className?: string
}) {
  const titleNode =
    typeof title === "object" && title !== null && "pre" in title ? (
      <>
        {title.pre} <span className="text-gradient">{title.hl}</span>
        {title.post ?? ""}
      </>
    ) : (
      title
    )

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.28em] text-primary/90">
          <span className="text-muted-foreground">{index}</span>
          <span className="h-px w-8 bg-primary/40" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
          {titleNode}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
