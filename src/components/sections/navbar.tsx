"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/providers/language-provider"
import { Globe } from "lucide-react"

export function Navbar() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.3,
  })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useLanguage()

  const LINKS = [
    { href: "#sobre", label: t.nav.sobre },
    { href: "#stack", label: t.nav.stack },
    { href: "#experiencia", label: t.nav.carreira },
    { href: "#projetos", label: t.nav.projetos },
    { href: "#formacao", label: t.nav.formacao },
    { href: "#contato", label: t.nav.contato },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* scroll progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-accent2 to-accent3"
        style={{ scaleX: progress }}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <a
            href="#top"
            className={cn(
              "group flex items-center gap-2.5 rounded-full px-3 py-1.5 transition-all",
              scrolled ? "glass-strong" : ""
            )}
          >
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent2 font-mono text-sm font-bold text-void">
              {"</>"}
              <span className="absolute inset-0 rounded-lg ring-1 ring-primary/40 transition group-hover:ring-primary/80" />
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-foreground">
              Clegivaldo<span className="text-primary">.</span>Cruz
            </span>
          </a>

          {/* desktop links */}
          <div
            className={cn(
              "hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all md:flex",
              scrolled ? "glass-strong" : ""
            )}
          >
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageToggle lang={lang} setLang={setLang} />

            <a
              href="#contato"
              className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-glow active:scale-95 sm:inline-flex"
            >
              {t.nav.cta}
            </a>

            {/* mobile toggle */}
            <button
              type="button"
              aria-label="Abrir menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="glass-strong inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            >
              <div className="relative h-3 w-4">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-0.5 w-full bg-current transition-all",
                    open && "top-1.5 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-0.5 w-full bg-current transition-all",
                    open && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-3 h-0.5 w-full bg-current transition-all",
                    open && "top-1.5 -rotate-45"
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* mobile menu */}
        <motion.div
          initial={false}
          animate={
            open
              ? { opacity: 1, y: 0, pointerEvents: "auto" }
              : { opacity: 0, y: -8, pointerEvents: "none" }
          }
          transition={{ duration: 0.22 }}
          className="mx-4 mt-2 md:hidden"
        >
          <div className="glass-strong rounded-2xl p-3">
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contato"
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-xl bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
                >
                  {t.nav.cta}
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      </header>
    </>
  )
}

/** Segmented PT | EN language switcher. */
function LanguageToggle({
  lang,
  setLang,
}: {
  lang: "pt" | "en"
  setLang: (l: "pt" | "en") => void
}) {
  return (
    <div
      className="glass-strong relative flex items-center rounded-full p-1"
      role="group"
      aria-label="Language switcher"
    >
      <Globe className="ml-1.5 mr-0.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {(["pt", "en"] as const).map((l) => {
        const active = lang === l
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={active}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors",
              active ? "text-void" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        )
      })}
    </div>
  )
}
