"use client"

import { ArrowUp } from "lucide-react"
import { Magnetic } from "@/components/primitives/magnetic"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative z-10 mt-auto border-t border-border/60 bg-void/60 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:px-6 md:flex-row md:py-8">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent2 font-mono text-xs font-bold text-void">
            {"</>"}
          </span>
          <div className="text-center md:text-left">
            <div className="font-display text-sm font-semibold text-foreground">
              Clegivaldo Cruz
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              engenheiro · P&D · IA · {year}
            </div>
          </div>
        </div>

        <p className="order-3 max-w-md text-center font-mono text-xs text-muted-foreground md:order-2 md:text-center">
          construído com Next.js, Three.js, R3F, Framer Motion & Lenis —
          muito <span className="text-primary">vibecode</span> no processo.
        </p>

        <Magnetic strength={0.5} className="order-2 md:order-3">
          <a
            href="#top"
            aria-label="Voltar ao topo"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-elevated/50 px-4 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            topo
          </a>
        </Magnetic>
      </div>
    </footer>
  )
}
