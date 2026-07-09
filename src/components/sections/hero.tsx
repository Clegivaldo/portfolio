"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Magnetic } from "@/components/primitives/magnetic"
import { ChevronDown, Terminal, Cpu, Sparkles } from "lucide-react"

const ROLES = [
  "Engenheiro de Computação",
  "Técnico em Desenvolvimento de Sistemas",
  "Técnico em Informática",
  "Gerente de Pesquisa & Desenvolvimento",
  "Cursando MBA em Inteligência Artificial",
]

function useRotator(words: string[], interval = 2600) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(t)
  }, [words.length, interval])
  return i
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const idx = useRotator(ROLES)

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center px-4 pt-24 pb-16 sm:px-6"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        {/* legibility backdrop: soft dark radial behind the text block */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[140%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 45%, rgba(5,6,10,0.78) 0%, rgba(5,6,10,0.45) 45%, transparent 75%)",
            filter: "blur(2px)",
          }}
        />

        {/* availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/60 bg-elevated/40 px-4 py-1.5 font-mono text-xs text-muted-foreground backdrop-blur"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          disponível para projetos & inovação
        </motion.div>

        {/* name */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="block text-foreground">Clegivaldo</span>
          <span className="block text-gradient anim-gradient-pan text-glow">
            Cruz
          </span>
        </motion.h1>

        {/* rotating role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 flex h-9 items-center justify-center gap-2 font-mono text-sm text-muted-foreground sm:text-base"
        >
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-primary">~</span>
          <span className="text-foreground/80">$</span>
          <span className="relative inline-block overflow-hidden">
            <span key={idx} className="inline-block animate-[fadeUp_0.5s_ease]">
              {ROLES[idx]}
            </span>
            <span className="ml-1 inline-block h-4 w-[2px] translate-y-0.5 anim-blink bg-primary align-middle" />
          </span>
        </motion.div>

        {/* subtitle / pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32 }}
          className="mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-foreground/75 sm:text-lg"
        >
          Nerd assumido, amante de tecnologias e construtor de sistemas que
          resolvem problemas reais. Lidero{" "}
          <span className="text-foreground">Pesquisa & Desenvolvimento</span>,
          construo plataformas web para{" "}
          <span className="text-foreground">metrologia</span> e{" "}
          <span className="text-foreground">laboratórios de análise</span>, e
          agora mergulho de cabeça no universo da{" "}
          <span className="text-primary">Inteligência Artificial</span>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.44 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Magnetic>
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow active:scale-95"
            >
              <Cpu className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Ver projetos
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contato"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-elevated/40 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-all hover:border-primary/50 hover:bg-elevated/70 active:scale-95"
            >
              <Sparkles className="h-4 w-4 text-accent2" />
              Falar no WhatsApp
            </a>
          </Magnetic>
        </motion.div>

        {/* mini stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.56 }}
          className="mt-14 grid w-full max-w-2xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60"
        >
          {[
            { k: "Engenharia", v: "Computação" },
            { k: "Liderança", v: "P&D" },
            { k: "Now", v: "MBA · IA" },
          ].map((s) => (
            <div
              key={s.k}
              className="bg-void/60 px-4 py-4 text-center backdrop-blur"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.k}
              </div>
              <div className="mt-1 text-sm font-semibold text-foreground sm:text-base">
                {s.v}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <a
          href="#sobre"
          aria-label="Rolar para baixo"
          className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            scroll
          </span>
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-border/70">
            <span className="absolute top-1.5 h-1.5 w-1 rounded-full bg-primary [animation:scroll-dot_1.8s_ease-in-out_infinite]" />
          </span>
          <ChevronDown className="h-3 w-3 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}
