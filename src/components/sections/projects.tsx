"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
} from "@/components/primitives/reveal"
import { MagicCard } from "@/components/primitives/magic-card"
import { BorderBeam } from "@/components/primitives/border-beam"
import { Badge } from "@/components/ui/badge"
import {
  Ruler,
  FlaskConical,
  Box,
  BrainCircuit,
  ArrowUpRight,
  CheckCircle2,
  Github,
  ExternalLink,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/providers/language-provider"
import type { Dict } from "@/lib/i18n/dictionaries"

const PROJECT_ICONS: LucideIcon[] = [Ruler, FlaskConical, Box, BrainCircuit]
const PROJECT_ACCENTS = [
  "var(--primary)",
  "var(--accent2)",
  "var(--accent3)",
  "var(--primary)",
]

type PreviewKind = "metrology" | "lab" | "portfolio" | "ai"

export function Projects() {
  const { t } = useLanguage()
  const p = t.projects

  return (
    <section
      id="projetos"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index={p.index}
        label={p.label}
        title={p.title}
        description={p.description}
      />

      <StaggerGroup className="mt-16 grid gap-6 lg:grid-cols-2">
        {p.items.map((item, i) => {
          const Icon = PROJECT_ICONS[i] ?? Box
          const accent = PROJECT_ACCENTS[i] ?? "var(--primary)"
          const kind: PreviewKind =
            i === 0 ? "metrology" : i === 1 ? "lab" : i === 2 ? "portfolio" : "ai"
          return (
            <StaggerItem key={i} className="h-full">
              <MagicCard className="h-full">
                {item.featured && <BorderBeam duration={8} />}
                <Preview kind={kind} accent={accent} t={t} />

                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60"
                        style={{
                          background: `color-mix(in oklab, ${accent} 14%, transparent)`,
                          color: accent,
                        }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-border/60 bg-void/40 font-mono text-[10px]"
                      style={{ color: accent }}
                    >
                      {item.year}
                    </Badge>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>

                  <ul className="mt-4 space-y-1.5">
                    {item.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-foreground/85"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3.5 w-3.5 shrink-0"
                          style={{ color: accent }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.stack.map((st, j) => (
                      <Badge
                        key={j}
                        variant="outline"
                        className="border-border/60 bg-void/40 font-mono text-[10px] text-muted-foreground"
                      >
                        {st}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-3 border-t border-border/60 pt-4">
                    <a
                      href="#contato"
                      className="inline-flex items-center gap-1 text-sm font-medium text-foreground transition-colors hover:text-primary"
                    >
                      {p.footerLearnMore} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                    <span className="text-border">·</span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Github className="h-3.5 w-3.5" /> {p.footerNda}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <ExternalLink className="h-3.5 w-3.5" /> {p.footerProduction}
                    </span>
                  </div>
                </div>
              </MagicCard>
            </StaggerItem>
          )
        })}
      </StaggerGroup>
    </section>
  )
}

function Preview({
  kind,
  accent,
  t,
}: {
  kind: PreviewKind
  accent: string
  t: Dict
}) {
  const p = t.projects
  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60"
      style={{
        background: `radial-gradient(120% 100% at 0% 0%, color-mix(in oklab, ${accent} 18%, transparent), transparent 50%), linear-gradient(180deg, #0a0e18, #05060a)`,
      }}
    >
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="absolute inset-0 p-4">
        {kind === "metrology" && <MetrologyPreview accent={accent} t={t} />}
        {kind === "lab" && <LabPreview accent={accent} t={t} />}
        {kind === "portfolio" && <PortfolioPreview accent={accent} />}
        {kind === "ai" && <AiPreview accent={accent} t={t} />}
      </div>

      <div className="absolute right-3 top-3 rounded-full border border-border/60 bg-void/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground backdrop-blur">
        {p.preview.liveBadge}
      </div>
    </div>
  )
}

function WinDots() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rounded-full bg-red-400/80" />
      <span className="h-1.5 w-1.5 rounded-full bg-amber-400/80" />
      <span className="h-1.5 w-1.5 rounded-full bg-primary/80" />
    </div>
  )
}

function MetrologyPreview({ accent, t }: { accent: string; t: Dict }) {
  const cards = t.projects.preview.metrologyCards
  const url = t.projects.preview.metrologyUrl
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <WinDots />
        <div className="font-mono text-[8px] text-muted-foreground">{url}</div>
        <div className="w-6" />
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {cards.map((c, i) => (
          <div key={i} className="rounded-md border border-border/50 bg-void/50 p-2">
            <div className="font-mono text-[7px] uppercase text-muted-foreground">
              {c.l}
            </div>
            <div
              className="mt-1 font-display text-sm font-bold"
              style={{ color: i === 0 ? accent : "var(--foreground)" }}
            >
              {c.v}
            </div>
            <div className="mt-1.5 h-0.5 w-full rounded-full bg-border/60">
              <motion.div
                className="h-full rounded-full"
                style={{ background: accent }}
                initial={{ width: 0 }}
                whileInView={{ width: i === 2 ? "98%" : i === 0 ? "64%" : "82%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-border/50 bg-void/50 p-2">
        <div className="flex items-end gap-1.5">
          {[40, 65, 50, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                background: `color-mix(in oklab, ${accent} ${50 + i * 4}%, transparent)`,
              }}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function LabPreview({ accent, t }: { accent: string; t: Dict }) {
  const rows = t.projects.preview.labRows
  const url = t.projects.preview.labUrl
  const realtime = t.projects.preview.labRealtime
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <WinDots />
        <div className="font-mono text-[8px] text-muted-foreground">{url}</div>
        <div className="w-6" />
      </div>
      <div className="grid flex-1 grid-cols-[1fr_auto] gap-2">
        <div className="space-y-1.5">
          {rows.map((r, i) => (
            <motion.div
              key={r.id}
              className="flex items-center justify-between rounded-md border border-border/50 bg-void/50 px-2 py-1.5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <span className="font-mono text-[8px] text-foreground/90">{r.id}</span>
              <span
                className="rounded-full px-1.5 py-0.5 text-[7px] font-bold text-void"
                style={{
                  background:
                    i === 0 ? accent : i === 2 ? "var(--accent3)" : "var(--primary)",
                }}
              >
                {r.s}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center rounded-md border border-border/50 bg-void/50 p-3">
          <motion.div
            className="h-12 w-12 rounded-full border-2 border-dashed"
            style={{ borderColor: accent }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <div className="mt-2 font-mono text-[8px] text-muted-foreground">
            {realtime}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioPreview({ accent }: { accent: string }) {
  return (
    <div className="relative flex h-full items-center justify-center">
      <motion.div
        className="absolute h-20 w-20 rounded-full border"
        style={{ borderColor: `color-mix(in oklab, ${accent} 50%, transparent)` }}
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute h-14 w-14 rounded-md border-2"
        style={{ borderColor: accent }}
        animate={{ rotate: -360 }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />
      <div
        className="h-3 w-3 rounded-full"
        style={{ background: accent, boxShadow: `0 0 20px ${accent}` }}
      />
      {["{", "}", "</>", "01", "AI"].map((g, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-[10px]"
          style={{ color: `color-mix(in oklab, ${accent} 70%, #fff)` }}
          animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          initial={{ x: `${(i - 2) * 30 - 10}px`, y: `${(i % 2 ? 1 : -1) * 22}px` }}
        >
          {g}
        </motion.span>
      ))}
    </div>
  )
}

function AiPreview({ accent, t }: { accent: string; t: Dict }) {
  const url = t.projects.preview.aiUrl
  const log = t.projects.preview.aiLog
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="flex items-center justify-between">
        <WinDots />
        <div className="font-mono text-[8px] text-muted-foreground">{url}</div>
        <div className="w-6" />
      </div>
      <div className="flex flex-1 items-center justify-center gap-2">
        {["input", "agent", "tool", "output"].map((n, i) => (
          <div key={n} className="flex items-center gap-2">
            <motion.div
              className="rounded-md border border-border/50 bg-void/60 px-2 py-1.5 font-mono text-[8px]"
              style={{ color: i === 1 ? accent : "var(--foreground)" }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(52,211,153,0)",
                  "0 0 12px 1px rgba(52,211,153,0.55)",
                  "0 0 0 0 rgba(52,211,153,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            >
              {n}
            </motion.div>
            {i < 3 && (
              <motion.div
                className="h-px w-3"
                style={{ background: accent }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="space-y-1">
        {log.map((line, i) => (
          <motion.div
            key={i}
            className="font-mono text-[8px] text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3 }}
          >
            <span className="text-primary">›</span> {line}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
