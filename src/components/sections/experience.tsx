"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/reveal"
import { Badge } from "@/components/ui/badge"
import {
  Briefcase,
  Microscope,
  GraduationCap,
  Wrench,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const STEP_ICONS: LucideIcon[] = [Briefcase, Microscope, Wrench, GraduationCap]
const STEP_ACCENTS = [
  "var(--primary)",
  "var(--accent2)",
  "var(--accent3)",
  "var(--primary)",
]

export function Experience() {
  const { t } = useLanguage()
  const e = t.experience

  return (
    <section
      id="experiencia"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index={e.index}
        label={e.label}
        title={e.title}
        description={e.description}
      />

      <div className="relative mt-16">
        {/* timeline rail */}
        <div
          aria-hidden
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-accent2/40 to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        <StaggerGroup className="flex flex-col gap-10">
          {e.steps.map((s, i) => {
            const left = i % 2 === 0
            const Icon = STEP_ICONS[i] ?? Briefcase
            const accent = STEP_ACCENTS[i] ?? "var(--primary)"
            return (
              <StaggerItem key={i}>
                <div
                  className={`relative flex items-start gap-6 pl-12 md:pl-0 ${
                    left ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* node */}
                  <div className="absolute left-4 top-1 z-10 -translate-x-1/2 md:left-1/2">
                    <span
                      className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-void"
                      style={{
                        background: accent,
                        boxShadow: `0 0 24px -4px ${accent}`,
                      }}
                    >
                      {s.current && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: accent,
                            animation: "pulse-ring 2s ease-out infinite",
                          }}
                        />
                      )}
                      <Icon className="h-3.5 w-3.5 text-void" />
                    </span>
                  </div>

                  {/* card */}
                  <div
                    className={`w-full md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Reveal>
                      <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-elevated/40 p-6 backdrop-blur transition-colors hover:border-primary/40">
                        <div
                          className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]"
                          style={{ color: accent }}
                        >
                          <span>{s.period}</span>
                          {s.current && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] font-bold text-void"
                              style={{ background: accent }}
                            >
                              {t.common.now}
                            </span>
                          )}
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {s.role}
                        </h3>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                          {s.org}
                        </p>

                        <ul
                          className={`mt-4 space-y-2 text-sm leading-relaxed text-foreground/85 ${
                            left ? "md:text-right" : ""
                          }`}
                        >
                          {s.points.map((p, j) => (
                            <li
                              key={j}
                              className={`flex gap-2 ${
                                left ? "md:flex-row-reverse" : ""
                              }`}
                            >
                              <span
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                                style={{ background: accent }}
                              />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>

                        <div
                          className={`mt-4 flex flex-wrap gap-1.5 ${
                            left ? "md:justify-end" : ""
                          }`}
                        >
                          {s.tags.map((tag, j) => (
                            <Badge
                              key={j}
                              variant="outline"
                              className="border-border/60 bg-void/40 font-mono text-[10px] text-muted-foreground"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                          }}
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* spacer */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>

      {/* closing note */}
      <Reveal className="mt-14">
        <div className="flex items-center justify-center gap-3 text-center">
          <Sparkles className="h-4 w-4 text-accent3" />
          <p className="font-mono text-sm text-muted-foreground">
            {e.closingPre}{" "}
            <span className="text-foreground">{e.closingHl}</span>.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
