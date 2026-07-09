"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import { TiltPhoto } from "@/components/primitives/tilt-photo"
import { Reveal, StaggerGroup, StaggerItem } from "@/components/primitives/reveal"
import { NumberTicker } from "@/components/primitives/number-ticker"
import { Coffee, Heart, Lightbulb, Rocket } from "lucide-react"

const FACTS = [
  { k: "formação", v: "Eng. Computação + 2 técnicos" },
  { k: "cargo atual", v: "Gerente de P&D" },
  { k: "pós", v: "MBA em IA (cursando)" },
  { k: "base", v: "Brasil · remoto / híbrido" },
]

const STATS = [
  { v: 8, suffix: "+", label: "anos com tecnologia" },
  { v: 20, suffix: "+", label: "sistemas entregues" },
  { v: 3, suffix: "", label: "diplomas / técnicos" },
  { v: 100, suffix: "%", label: "nerd assumido" },
]

const TRAITS = [
  { icon: Lightbulb, title: "Curioso por natureza", desc: "Todo problema é um convite para desmontar, entender e reconstruir melhor." },
  { icon: Rocket, title: "Foco em entregar", desc: "Do protótipo ao deploy: gosto de ver a coisa rodando no navegador." },
  { icon: Coffee, title: "Café & código", desc: "Boas ideias costumam chegar entre uma xícara e um `git commit`." },
  { icon: Heart, title: "Tecnologia com afeto", desc: "Construir sistemas é a minha forma de ajudar pessoas a trabalharem melhor." },
]

export function About() {
  return (
    <section
      id="sobre"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeading
        index="01"
        label="Sobre"
        title={
          <>
            Quem está por trás do{" "}
            <span className="text-gradient">código</span>.
          </>
        }
        description="Engenheiro de Computação com passagem por três formações técnicas, hoje liderando P&D e construindo sistemas web que precisam ser confiáveis — de laboratórios de análise a chão de fábrica."
      />

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        {/* photo */}
        <Reveal variant="scale" className="group mx-auto">
          <TiltPhoto size={360} />
        </Reveal>

        {/* bio + terminal card */}
        <div className="flex flex-col gap-8">
          <Reveal>
            <div className="glass-strong overflow-hidden rounded-2xl">
              {/* terminal header */}
              <div className="flex items-center gap-2 border-b border-border/60 bg-void/50 px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  clegivaldo@portfolio: ~/whoami
                </span>
              </div>
              <div className="p-5 font-mono text-sm leading-relaxed">
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> cat profile.md
                </p>
                <p className="mt-3 text-foreground/90">
                  Sou o <span className="text-primary">Clegivaldo Cruz</span> —
                  engenheiro de computação, técnico em desenvolvimento de
                  sistemas e em informática. Nerd assumido, movido a café e
                  curiosidade.
                </p>
                <p className="mt-3 text-foreground/90">
                  Hoje atuo como{" "}
                  <span className="text-accent2">Gerente de Pesquisa &
                  Desenvolvimento</span>, onde conecto engenharia, produto e
                  negócio. Construí sistemas web para{" "}
                  <span className="text-accent3">empresa de metrologia</span> e{" "}
                  <span className="text-accent3">laboratório de análises</span> —
                  muito disso usando <span className="text-primary">vibecode</span>,
                  programação assistida por IA que acelera a entrega sem perder
                  o rigor.
                </p>
                <p className="mt-3 text-foreground/90">
                  Agora cursando{" "}
                  <span className="text-primary">MBA em Inteligência
                  Artificial</span> para levar P&D para o próximo nível: agentes,
                  visão, dados e automação inteligente.
                </p>
                <p className="mt-4 text-muted-foreground">
                  <span className="text-primary">$</span> _{" "}
                  <span className="anim-blink">▋</span>
                </p>
              </div>
            </div>
          </Reveal>

          {/* fact pills */}
          <StaggerGroup className="grid grid-cols-2 gap-3">
            {FACTS.map((f) => (
              <StaggerItem key={f.k}>
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
        {STATS.map((s) => (
          <StaggerItem key={s.label}>
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
        {TRAITS.map((t) => (
          <StaggerItem key={t.title}>
            <div className="group h-full rounded-2xl border border-border/60 bg-elevated/30 p-5 backdrop-blur transition-colors hover:border-primary/40">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold text-foreground">
                {t.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  )
}
