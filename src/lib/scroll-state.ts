// Lightweight, render-free shared scroll state for cross-tree consumers
// (e.g. React Three Fiber's useFrame loop reads this without triggering React re-renders).
export type ScrollState = {
  /** Whole-page scroll progress in [0, 1] */
  progress: number
  /** Current scroll pixel position */
  y: number
  /** Smoothed velocity (px/frame) — useful for motion blur / parallax */
  velocity: number
  /** Viewport width/height in px */
  width: number
  height: number
}

/**
 * True when the visitor asked the OS for less motion. We do not freeze the
 * scene for them: it keeps moving, just calmer (see `motionScale`).
 */
export const prefersReducedMotion =
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Multiplier applied to every idle animation in the 3D scene.
 * 1 = normal; ~0.25 = slow and discreet, but still alive.
 */
export const motionScale = prefersReducedMotion ? 0.25 : 1

/** Amplitude multiplier for drifts/parallax (also damps distance, not just speed). */
export const motionAmount = prefersReducedMotion ? 0.45 : 1

export const scrollState: ScrollState = {
  progress: 0,
  y: 0,
  velocity: 0,
  width: 0,
  height: 0,
}

let lastY = 0
let velTarget = 0

export function setScroll(y: number, winH: number, docH: number) {
  const max = Math.max(1, docH - winH)
  const progress = Math.min(1, Math.max(0, y / max))
  velTarget = y - lastY
  lastY = y
  scrollState.y = y
  scrollState.progress = progress
  scrollState.width = typeof window !== 'undefined' ? window.innerWidth : 0
  scrollState.height = winH
}

/** Called every animation frame to smooth the velocity value. */
export function tickScrollState() {
  scrollState.velocity += (velTarget - scrollState.velocity) * 0.15
  velTarget *= 0.9
}
