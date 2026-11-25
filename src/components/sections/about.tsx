"use client"
import { TerminalEffect } from "@/components/ui/terminal-effect"

import { SectionHeading } from "@/components/primitives/section-heading"
import { TiltPhoto } from "@/components/primitives/tilt-photo"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/reveal"
import { useLanguage } from "@/components/providers/language-provider"
import type { Segment } from "@/lib/i18n/dictionaries"

const SEGMENT_COLOR: Record<NonNullable<Segment["hl"]>, string> = {
  fg: "text-foreground",
  primary: "text-primary",
  accent2: "text-accent2",
  accent3: "text-accent3",
}

function TypewriterParagraph({
  segments,
  progress,
  offset
}: {
  segments: readonly Segment[],
  progress: number,
  offset: number
}) {
  let count = offset;

  if (progress <= offset) return null;

  return (
    <p className="mt-3 text-foreground/90">
      {segments.map((seg, i) => {
        const segLen = seg.text.length;
        if (count >= progress) return null;
        const charsToShow = Math.min(segLen, progress - count);
        count += segLen;

        // Render either the full segment (if completed) or a partial one
        return (
          <span key={i} className={seg.hl ? SEGMENT_COLOR[seg.hl] : ""}>
            {seg.text.substring(0, charsToShow)}
          </span>
        );
      })}
    </p>
  )
}

export function About() {
  const { t } = useLanguage()
  const a = t.about

  const p1Len = a.terminal.p1.reduce((acc, s) => acc + s.text.length, 0)
  const p2Len = a.terminal.p2.reduce((acc, s) => acc + s.text.length, 0)
  const p3Len = a.terminal.p3.reduce((acc, s) => acc + s.text.length, 0)
  const totalChars = p1Len + p2Len + p3Len

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
                <TerminalEffect
                  command={a.terminal.cat}
                  prompt={a.terminal.prompt}
                  totalOutputChars={totalChars}
                >
                  {(progress) => (
                    <>
                      <TypewriterParagraph segments={a.terminal.p1} progress={progress} offset={0} />
                      <TypewriterParagraph segments={a.terminal.p2} progress={progress} offset={p1Len} />
                      <TypewriterParagraph segments={a.terminal.p3} progress={progress} offset={p1Len + p2Len} />
                    </>
                  )}
                </TerminalEffect>
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
    </section>
  )
}