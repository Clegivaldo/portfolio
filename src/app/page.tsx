import { SceneBackgroundClient } from "@/components/three/scene-background-client"
import { Navbar } from "@/components/sections/navbar"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Education } from "@/components/sections/education"
import { Contact } from "@/components/sections/contact"
import { SiteFooter } from "@/components/sections/site-footer"

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* fixed WebGL background (code cosmos) */}
      <SceneBackgroundClient />

      {/* top progress bar + nav */}
      <Navbar />

      {/* subtle page-level overlays for legibility on top of canvas */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5] grid-bg opacity-[0.18] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent_70%)]"
      />

      <main className="relative z-10 flex-1">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <SiteFooter />
    </div>
  )
}
