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

const MARQUEE_ITEMS = [
  "TypeScript", "React", "Next.js", "Node.js", "Three.js", "React Three Fiber",
  "TailwindCSS", "Prisma", "PostgreSQL", "Python", "FastAPI", "Pandas",
  "GSAP", "Framer Motion", "Lenis", "Docker", "Git", "Vibecode",
  "OpenAI", "LangChain", "Vite", "Bun", "REST", "WebSockets",
]

type Category = {
  icon: LucideIcon
  title: string
  desc: string
  items: { name: string; level: number }[]
  accent: string
}

const CATEGORIES: Category[] = [
  {
    icon: Layers,
    title: "Frontend & UI",
    desc: "Interfaces modernas, responsivas e com animação fluida.",
    accent: "var(--primary)",
    items: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "TailwindCSS", level: 94 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    icon: Boxes,
    title: "3D & Motion",
    desc: "Experiências imersivas com WebGL e scroll-driven.",
    accent: "var(--accent2)",
    items: [
      { name: "Three.js / R3F", level: 85 },
      { name: "GSAP + ScrollTrigger", level: 86 },
      { name: "Lenis (smooth scroll)", level: 90 },
      { name: "Shaders / GLSL", level: 70 },
    ],
  },
  {
    icon: Database,
    title: "Backend & Dados",
    desc: "APIs confiáveis, modelagem e persistência.",
    accent: "var(--accent3)",
    items: [
      { name: "Node.js / Bun", level: 88 },
      { name: "Prisma / SQL", level: 86 },
      { name: "REST / WebSockets", level: 84 },
      { name: "Python / FastAPI", level: 78 },
    ],
  },
  {
    icon: BrainCircuit,
    title: "IA & Inovação (P&D)",
    desc: "Onde a pesquisa vira produto inteligente.",
    accent: "var(--primary)",
    items: [
      { name: "LLMs / Agents", level: 80 },
      { name: "Visão computacional", level: 68 },
      { name: "Dados / Pandas", level: 75 },
      { name: "Vibecode (AI-assisted)", level: 93 },
    ],
  },
]

const TOOLS = [
  { icon: GitBranch, name: "Git / GitHub" },
  { icon: Cloud, name: "Docker" },
  { icon: Terminal, name: "Linux" },
  { icon: Cpu, name: "Blender" },
  { icon: Sparkles, name: "Figma" },
  { icon: Boxes, name: "Vite / Bun" },
]

export function Skills() {
  return (
    <section
      id="stack"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index="02"
        label="Stack"
        title={
          <>
            Ferramentas que viram{" "}
            <span className="text-gradient">produto</span>.
          </>
        }
        description="Do pixel ao deploy: uma stack moderna focada em performance, animação e inteligência. Inclui vibecode — programação assistida por IA — como acelerador real de entrega."
      />

      {/* marquee */}
      <Reveal className="mt-12">
        <div className="rounded-2xl border border-border/60 bg-elevated/20 py-5 backdrop-blur">
          <Marquee duration={36}>
            {MARQUEE_ITEMS.map((m) => (
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
        {CATEGORIES.map((c) => (
          <StaggerItem key={c.title}>
            <MagicCard className="h-full p-6">
              <div className="flex items-start gap-4">
                <div
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60"
                  style={{
                    background: `color-mix(in oklab, ${c.accent} 14%, transparent)`,
                    color: c.accent,
                  }}
                >
                  <c.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {c.items.map((it) => (
                  <li key={it.name}>
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
                          background: `linear-gradient(90deg, ${c.accent}, color-mix(in oklab, ${c.accent} 40%, #ffffff))`,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </MagicCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* tools row */}
      <Reveal className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            também no cinto:
          </span>
          {TOOLS.map((t) => (
            <span
              key={t.name}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-elevated/40 px-3 py-1.5 text-sm text-foreground/90 backdrop-blur transition-colors hover:border-primary/40"
            >
              <t.icon className="h-3.5 w-3.5 text-primary" />
              {t.name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
