"use client"

import dynamic from "next/dynamic"

/**
 * Client-only loader for the WebGL background. WebGL can't run on the
 * server, so we disable SSR for the whole scene.
 */
export const SceneBackgroundClient = dynamic(
  () => import("./scene-background").then((m) => m.SceneBackground),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #0c1220 0%, #050609 60%, #03040680 100%)",
        }}
      />
    ),
  }
)
