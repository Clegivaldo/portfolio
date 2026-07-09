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
