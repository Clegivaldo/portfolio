"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

/**
 * Client-only loader for the WebGL background. WebGL can't run on the server,
 * so we disable SSR for the whole scene.
 */
const SceneBackground = dynamic(
  () => import("./scene-background").then((m) => m.SceneBackground),
  {
    ssr: false,
    loading: () => <Backdrop />,
  }
)

const BACKDROP =
  "radial-gradient(ellipse at 50% 30%, #0c1220 0%, #050609 60%, #03040680 100%)"

function Backdrop() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0"
      style={{ background: BACKDROP }}
    />
  )
}

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  cancelIdleCallback?: (id: number) => void
}

/**
 * Defers the 3D bundle until the browser is idle, so the hero text paints first
 * instead of competing with three.js for the main thread. The gradient backdrop
 * covers the (short) wait.
 */
export function SceneBackgroundClient() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const show = () => setReady(true)
    const win = window as IdleWindow
    if (typeof win.requestIdleCallback === "function") {
      const id = win.requestIdleCallback(show, { timeout: 1800 })
      return () => win.cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(show, 900)
    return () => window.clearTimeout(id)
  }, [])

  return ready ? <SceneBackground /> : <Backdrop />
}
