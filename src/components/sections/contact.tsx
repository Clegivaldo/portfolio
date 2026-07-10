"use client"

import { SectionHeading } from "@/components/primitives/section-heading"
import { Reveal } from "@/components/primitives/reveal"
import { Magnetic } from "@/components/primitives/magnetic"
import { BorderBeam } from "@/components/primitives/border-beam"
import { motion } from "framer-motion"
import { MessageCircle, Mail, ArrowUpRight, Phone, MapPin, Sparkles } from "lucide-react"
import { useLanguage } from "@/components/providers/language-provider"

const PHONE_DISPLAY = "(93) 99208-9384"
const EMAIL_DISPLAY = "clegivaldocruz@hotmail.com"
const PHONE_DIGITS = "5593992089384"

export function Contact() {
  const { t, lang } = useLanguage()
  const c = t.contact

  const whatsappUrl = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    c.whatsappMessage
  )}`
  const emailUrl = `mailto:${EMAIL_DISPLAY}?subject=${encodeURIComponent(
    c.emailSubject
  )}`

  return (
    <section
      id="contato"
      className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-elevated/40 p-8 backdrop-blur md:p-14">
        <BorderBeam duration={10} colorFrom="var(--primary)" colorTo="var(--accent2)" />
        {/* glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(52,211,153,0.35), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(34,211,238,0.3), transparent)",
          }}
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* left: pitch */}
          <div>
            <SectionHeading
              index={c.index}
              label={c.label}
              title={c.title}
              description={c.description}
            />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={0.4}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground transition-all hover:shadow-glow active:scale-95"
                >
                  <MessageCircle className="h-5 w-5 transition-transform group-hover:rotate-[-8deg]" />
                  {c.ctaWhatsapp}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic strength={0.4}>
                <a
                  href={emailUrl}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-void/40 px-7 py-4 text-base font-semibold text-foreground backdrop-blur transition-all hover:border-primary/50 hover:bg-void/70 active:scale-95"
                >
                  <Mail className="h-5 w-5 text-accent2" />
                  {c.ctaEmail}
                </a>
              </Magnetic>
            </div>

            <Reveal delay={0.1} className="mt-6">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                  </span>
                  {c.statusResponding}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" /> {c.statusLocation}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-accent3" /> {c.statusOpenTo}
                </span>
              </div>
            </Reveal>
          </div>

          {/* right: contact card (terminal style) */}
          <Reveal variant="scale">
            <div className="glass-strong overflow-hidden rounded-2xl">
              <div className="flex items-center gap-2 border-b border-border/60 bg-void/60 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-400/80" />
                <span className="h-3 w-3 rounded-full bg-primary/80" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">
                  {c.cardTitle}
                </span>
              </div>
              <div className="space-y-1 p-5 font-mono text-sm">
                <p className="text-muted-foreground">
                  <span className="text-primary">{c.cardPrompt}</span>
                </p>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-3 space-y-2"
                >
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-void/40 px-3 py-2.5 transition-colors hover:border-primary/50"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    <div className="flex-1">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {c.phoneLabel}
                      </div>
                      <div className="text-foreground">{PHONE_DISPLAY}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                  <a
                    href={emailUrl}
                    className="flex items-center gap-3 rounded-lg border border-border/50 bg-void/40 px-3 py-2.5 transition-colors hover:border-accent2/50"
                  >
                    <Mail className="h-4 w-4 text-accent2" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {c.emailLabel}
                      </div>
                      <div className="truncate text-foreground">{EMAIL_DISPLAY}</div>
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </a>
                </motion.div>
                <p className="mt-3 text-muted-foreground">
                  <span className="text-primary">{c.cardPromptEnd}</span>{" "}
                  <span className="anim-blink">▋</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
