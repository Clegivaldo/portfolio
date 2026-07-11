"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import { Marquee } from "@/components/primitives/marquee"
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/primitives/reveal"
import { MagicCard } from "@/components/primitives/magic-card"
import {
  Boxes,
  BrainCircuit,
  Cloud,
  Database,
  Layers,
  Terminal,
  Cpu,
  GitBranch,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const CATEGORY_ICONS: LucideIcon[] = [Layers, Boxes, Database, BrainCircuit]
const CATEGORY_ACCENTS = [
  "var(--primary)",
  "var(--accent2)",
  "var(--accent3)",
  "var(--primary)",
]
const TOOL_ICONS: LucideIcon[] = [GitBranch, Cloud, Terminal, Cpu, Sparkles, Boxes]

export function Skills() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <section
      id="stack"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index={s.index}
        label={s.label}
        title={s.title}
        description={s.description}
      />

      {/* marquee */}
      <Reveal className="mt-12">
        <div className="rounded-2xl border border-border/60 bg-elevated/20 py-5 backdrop-blur">
          <Marquee duration={36}>
            {s.marquee.map((m) => (
              <span
                key={m}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-void/40 px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                <span className="text-primary">{"//"}</span>
                {m}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>

      {/* category cards */}
      <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-2">
        {s.categories.map((c, i) => {
          const Icon = CATEGORY_ICONS[i] ?? Layers
          const accent = CATEGORY_ACCENTS[i] ?? "var(--primary)"
          return (
            <StaggerItem key={i}>
              <MagicCard className="h-full p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60"
                    style={{
                      background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                      color: accent,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {c.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">{c.desc}</p>
                  </div>
                </div>

                <ul className="mt-5 space-y-3">
                  {c.items.map((it, j) => (
                    <li key={j}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground/90">{it.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {it.level}%
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-border/60">
                        <div
                          className="h-full rounded-full transition-[width] duration-700"
                          style={{
                            width: `${it.level}%`,
                            background: `linear-gradient(90deg, ${accent}, color-mix(in oklab, ${accent} 40%, #ffffff))`,
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </MagicCard>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      {/* tools row */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {s.toolsLabel}
          </span>
          {s.tools.map((name, i) => {
            const Icon = TOOL_ICONS[i] ?? Sparkles
            return (
              <span
                key={i}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-elevated/40 px-3 py-1.5 text-sm text-foreground/90 backdrop-blur transition-colors hover:border-primary/40"
              >
                <Icon className="h-3.5 w-3.5 text-primary" />
                {name}
              </span>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
