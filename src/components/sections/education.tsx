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

type Edu = {
  icon: LucideIcon
  degree: string
  field: string
  status: "concluído" | "cursando"
  detail: string
  accent: string
}

const EDUS: Edu[] = [
  {
    icon: GraduationCap,
    degree: "Engenharia de Computação",
    field: "Graduação · Engenharia",
    status: "concluído",
    detail: "Base sólida em software, hardware e sistemas embarcados — do algoritmo ao silício.",
    accent: "var(--primary)",
  },
  {
    icon: Code2,
    degree: "Técnico em Desenvolvimento de Sistemas",
    field: "Ensino técnico · Software",
    status: "concluído",
    detail: "Lógica de programação, banco de dados, engenharia de software e projeto de aplicações.",
    accent: "var(--accent2)",
  },
  {
    icon: Monitor,
    degree: "Técnico em Informática",
    field: "Ensino técnico · Infra & Redes",
    status: "concluído",
    detail: "Fundamentos de redes, suporte, sistemas operacionais e infraestrutura — visão de sistema.",
    accent: "var(--accent3)",
  },
  {
    icon: BrainCircuit,
    degree: "MBA em Inteligência Artificial",
    field: "Pós-graduação · IA",
    status: "cursando",
    detail: "LLMs, agents, visão computacional e dados — levando P&D para produtos com IA.",
    accent: "var(--primary)",
  },
]

export function Education() {
  return (
    <section
      id="formacao"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index="05"
        label="Formação"
        title={
          <>
            Quatro camadas de{" "}
            <span className="text-gradient">aprendizado</span>.
          </>
        }
        description="Graduação, dois técnicos e agora um MBA em IA — formação contínua é parte do jeito nerd de ver o mundo."
      />

      <StaggerGroup className="mt-16 grid gap-5 sm:grid-cols-2">
        {EDUS.map((e, i) => (
          <StaggerItem key={e.degree} className="h-full">
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
                      background: `color-mix(in oklab, ${e.accent} 14%, transparent)`,
                      color: e.accent,
                    }}
                  >
                    <e.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {e.field}
                    </div>
                    <h3 className="mt-1 font-display text-lg font-semibold text-foreground">
                      {e.degree}
                    </h3>
                  </div>
                </div>

                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    background:
                      e.status === "cursando"
                        ? "color-mix(in oklab, var(--primary) 18%, transparent)"
                        : "color-mix(in oklab, var(--muted) 40%, transparent)",
                    color:
                      e.status === "cursando"
                        ? "var(--primary)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {e.status === "cursando" && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                  )}
                  {e.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {e.detail}
              </p>

              {/* progress bar */}
              <div className="mt-5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-border/60">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: e.accent }}
                    initial={{ width: 0 }}
                    whileInView={{ width: e.status === "cursando" ? "62%" : "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>{e.status === "cursando" ? "em andamento" : "concluído"}</span>
                  <span>{e.status === "cursando" ? "62%" : "100%"}</span>
                </div>
              </div>
            </MagicCard>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-12">
        <div className="flex items-center justify-center gap-2 text-center">
          <BookOpen className="h-4 w-4 text-primary" />
          <p className="font-mono text-sm text-muted-foreground">
            estudo contínuo:{" "}
            <span className="text-foreground">
              sempre há uma próxima coisa para aprender
            </span>
            .
          </p>
        </div>
      </Reveal>
    </section>
  )
}
