"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import { TiltPhoto } from "@/components/primitives/tilt-photo"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/reveal"
import { NumberTicker } from "@/components/primitives/number-ticker"
import { Coffee, Heart, Lightbulb, Rocket } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"
import type { Segment } from "@/lib/i18n/dictionaries"

const TRAIT_ICONS = [Lightbulb, Rocket, Coffee, Heart]

const SEGMENT_COLOR: Record<NonNullable<Segment["hl"]>, string> = {
  fg: "text-foreground",
  primary: "text-primary",
  accent2: "text-accent2",
  accent3: "text-accent3",
}

function SegmentedText({ segments }: { segments: readonly any[] }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span key={i} className={seg.hl ? SEGMENT_COLOR[seg.hl] : ""}>
          {seg.text}
        </span>
      ))}
    </>
  )
}

export function About() {
  const { t } = useLanguage()
  const a = t.about

  return (
    <section
      id="sobre"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index={a.index}
        label={a.label}
        title={a.title}
        description={a.description}
      />

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        {/* photo */}
        <Reveal variant="scale" className="group mx-auto">
          <TiltPhoto size={360} nameplate={a.nameplate} />
        </Reveal>

        {/* bio + terminal card */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <div className="glass-strong overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border/60 bg-void/50 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {a.terminal.user}
                </span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="text-primary">{a.terminal.cat}</span>
                </p>
                <p className="mt-3 text-foreground/90">
                  <SegmentedText segments={a.terminal.p1} />
                </p>
                <p className="mt-3 text-foreground/90">
                  <SegmentedText segments={a.terminal.p2} />
                </p>
                <p className="mt-3 text-foreground/90">
                  <SegmentedText segments={a.terminal.p3} />
                </p>
                <p className="mt-4 text-muted-foreground">
                  <span className="text-primary">{a.terminal.prompt}</span>{" "}
                  <span className="anim-blink">▋</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* fact pills */}
          <StaggerGroup className="grid grid-cols-2 gap-3">
            {a.facts.map((f, i) => (
              <StaggerItem key={i}>
                <div className="rounded-xl border border-border/60 bg-elevated/40 px-4 py-3 backdrop-blur">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {f.k}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-foreground">
                    {f.v}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>

      {/* stats */}
      <StaggerGroup className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {a.stats.map((s, i) => (
          <StaggerItem key={i}>
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-elevated/30 p-6 text-center backdrop-blur">
              <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                <NumberTicker value={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* traits */}
      <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {a.traits.map((tr, i) => {
          const Icon = TRAIT_ICONS[i] ?? Lightbulb
          return (
            <StaggerItem key={i}>
              <div className="group h-full rounded-2xl border border-border/60 bg-elevated/30 p-5 backdrop-blur transition-colors hover:border-primary/40">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">
                  {tr.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {tr.desc}
                </p>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}
