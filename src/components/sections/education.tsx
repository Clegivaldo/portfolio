"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/primitives/reveal"
import { MagicCard } from "@/components/primitives/magic-card"
import { BorderBeam } from "@/components/primitives/border-beam"
import { motion } from "framer-motion"
import { GraduationCap, Code2, Monitor, BrainCircuit, BookOpen } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const EDU_ICONS: LucideIcon[] = [GraduationCap, Code2, Monitor, BrainCircuit]

export function Education() {
  const { t } = useLanguage()
  const e = t.education

  return (
    <section
      id="formacao"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index={e.index}
        label={e.label}
        title={e.title}
        description={e.description}
      />

      <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2">
        {e.items.map((item, i) => {
          const Icon = EDU_ICONS[i] ?? GraduationCap
          const accent =
            i % 4 === 0
              ? "var(--primary)"
              : i === 1
              ? "var(--accent2)"
              : i === 2
              ? "var(--accent3)"
              : "var(--primary)"
          const ongoing = item.status === "cursando"
          return (
            <StaggerItem key={i} className="h-full">
              <MagicCard className="relative h-full p-6">
                {i === 3 && (
                  <BorderBeam
                    duration={9}
                    colorFrom="var(--primary)"
                    colorTo="var(--accent3)"
                  />
                )}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/60"
                      style={{
                        background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                        color: accent,
                      }}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {item.field}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                        {item.degree}
                      </h3>
                    </div>
                  </div>

                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      background: ongoing
                        ? "color-mix(in oklab, var(--primary) 18%, transparent)"
                        : "color-mix(in oklab, var(--muted) 40%, transparent)",
                      color: ongoing
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                    }}
                  >
                    {ongoing && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                      </span>
                    )}
                    {ongoing ? e.statusOngoing : e.statusDone}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {item.detail}
                </p>

                {/* progress bar */}
                <div className="mt-5">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-border/60">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: accent }}
                      initial={{ width: 0 }}
                      whileInView={{ width: ongoing ? "62%" : "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
                    <span>{ongoing ? e.progressOngoing : e.progressDone}</span>
                    <span>{ongoing ? "62%" : "100%"}</span>
                  </div>
                </div>
              </MagicCard>
            </StaggerItem>
          )
        })}
      </StaggerGroup>

      <Reveal className="mt-12">
        <div className="flex items-center justify-center gap-2 text-center">
          <BookOpen className="h-4 w-4 text-primary" />
          <p className="font-mono text-sm text-muted-foreground">
            {e.closingPre}{" "}
            <span className="text-foreground">{e.closingHl}</span>.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
