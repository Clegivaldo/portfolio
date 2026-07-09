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

type Step = {
  period: string
  role: string
  org: string
  icon: LucideIcon
  current?: boolean
  accent: string
  points: string[]
  tags: string[]
}

const STEPS: Step[] = [
  {
    period: "Atual",
    role: "Gerente de Pesquisa & Desenvolvimento",
    org: "Liderança técnica · Inovação · IA",
    icon: Briefcase,
    current: true,
    accent: "var(--primary)",
    points: [
      "Lidero o time de P&D, do conceeto ao deploy, conectando engenharia e negócio.",
      "Defino roadmap técnico e processo de inovação, com foco em IA aplicada.",
      "Mentoria técnica e code review em stack moderna (React, Node, Python).",
    ],
    tags: ["Liderança", "Roadmap", "IA aplicada", "Vibecode"],
  },
  {
    period: "Trajetória de engenharia",
    role: "Sistemas web para metrologia & laboratório",
    org: "Indústria · Engenharia de Computação",
    icon: Microscope,
    accent: "var(--accent2)",
    points: [
      "Construí plataformas web para empresa de metrologia — rastreabilidade, calibração e relatórios.",
      "Desenvolvi sistema para laboratório de análises — fluxo de amostras, laudos e dashboards.",
      "Usei vibecode (programação assistida por IA) para acelerar entrega mantendo qualidade.",
    ],
    tags: ["Metrologia", "Laboratório", "SaaS", "Vibecode", "Dashboards"],
  },
  {
    period: "Formação técnica",
    role: "Técnico em Desenvolvimento de Sistemas & Informática",
    org: "Base sólida em lógica, redes e software",
    icon: Wrench,
    accent: "var(--accent3)",
    points: [
      "Fundamentos de programação, banco de dados e engenharia de software.",
      "Suporte, redes e infraestrutura — visão completa do sistema, não só do código.",
    ],
    tags: ["Lógica", "Redes", "Infra"],
  },
  {
    period: "Em curso",
    role: "MBA em Inteligência Artificial",
    org: "Pós-graduação · IA aplicada",
    icon: GraduationCap,
    current: true,
    accent: "var(--primary)",
    points: [
      "Aprofundando LLMs, agents, visão computacional e dados.",
      "Levando P&D para o próximo nível: automação inteligente e produtos com IA.",
    ],
    tags: ["LLMs", "Agents", "Visão", "Dados"],
  },
]

export function Experience() {
  return (
    <section
      id="experiencia"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index="03"
        label="Carreira"
        title={
          <>
            Uma linha do tempo em{" "}
            <span className="text-gradient">construção</span>.
          </>
        }
        description="Do técnico à gerência de P&D — cada etapa somou uma camada: fundamentos, engenharia, liderança e agora inteligência artificial."
      />

      <div className="relative mt-16">
        {/* timeline rail */}
        <div
          aria-hidden
          className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-primary/60 via-accent2/40 to-transparent md:left-1/2 md:-translate-x-1/2"
        />

        <StaggerGroup className="flex flex-col gap-10">
          {STEPS.map((s, i) => {
            const left = i % 2 === 0
            return (
              <StaggerItem key={s.role}>
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
                        background: s.accent,
                        boxShadow: `0 0 24px -4px ${s.accent}`,
                      }}
                    >
                      {s.current && (
                        <span
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: s.accent,
                            animation: "pulse-ring 2s ease-out infinite",
                          }}
                        />
                      )}
                      <s.icon className="h-3.5 w-3.5 text-void" />
                    </span>
                  </div>

                  {/* card (one side) */}
                  <div
                    className={`w-full md:w-1/2 ${
                      left ? "md:pr-12 md:text-right" : "md:pl-12"
                    }`}
                  >
                    <Reveal>
                      <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-elevated/40 p-6 backdrop-blur transition-colors hover:border-primary/40">
                        <div
                          className="mb-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em]"
                          style={{ color: s.accent }}
                        >
                          <span>{s.period}</span>
                          {s.current && (
                            <span
                              className="rounded-full px-2 py-0.5 text-[9px] font-bold text-void"
                              style={{ background: s.accent }}
                            >
                              NOW
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
                                style={{ background: s.accent }}
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
                          {s.tags.map((t) => (
                            <Badge
                              key={t}
                              variant="outline"
                              className="border-border/60 bg-void/40 font-mono text-[10px] text-muted-foreground"
                            >
                              {t}
                            </Badge>
                          ))}
                        </div>

                        {/* hover glow line */}
                        <div
                          aria-hidden
                          className="absolute inset-x-0 bottom-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                          style={{
                            background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)`,
                          }}
                        />
                      </div>
                    </Reveal>
                  </div>

                  {/* spacer on the other side (desktop) */}
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
            próxima parada:{" "}
            <span className="text-foreground">produtos com IA de verdade</span>.
          </p>
        </div>
      </Reveal>
    </section>
  )
}
