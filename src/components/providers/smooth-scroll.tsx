"use client"

import { ReactNode, useEffect } from "react"
import Lenis from "lenis"
import { setScroll, tickScrollState } from "@/lib/scroll-state"

/**
 * Smooth-scroll provider built on Lenis.
 * - Drives the shared `scrollState` so React Three Fiber (and any other
 *   non-React consumer) can read scroll progress without re-rendering.
 * - Respects prefers-reduced-motion (disables smoothing).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      lerp: 0.1,
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      tickScrollState()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const onScroll = () => {
      const y = window.scrollY
      setScroll(y, window.innerHeight, document.documentElement.scrollHeight)
    }
    lenis.on("scroll", onScroll)
    onScroll()

    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null
      if (!target) return
      const id = target.getAttribute("href")
      if (!id || id === "#") return
      const el = document.querySelector(id)
      if (el) {
        e.preventDefault()
        lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 })
      }
    }
    document.addEventListener("click", handleAnchorClick)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.off("scroll", onScroll)
      document.removeEventListener("click", handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
