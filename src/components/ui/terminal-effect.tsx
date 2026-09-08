"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function TerminalEffect({ command, children, prompt }: { command: string, children: React.ReactNode, prompt: string }) {
  const [cmdLength, setCmdLength] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (cmdLength < command.length) {
      const t = setTimeout(() => setCmdLength(c => c + 1), 50)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => setShowContent(true), 400)
      return () => clearTimeout(t)
    }
  }, [cmdLength, command.length])

  return (
    <>
      <p className="text-muted-foreground">
        <span className="text-primary">{command.substring(0, cmdLength)}</span>
        {!showContent && <span className="anim-blink ml-1">▋</span>}
      </p>
      {showContent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
          <p className="mt-4 text-muted-foreground">
            <span className="text-primary">{prompt}</span>{" "}
            <span className="anim-blink">▋</span>
          </p>
        </motion.div>
      )}
    </>
  )
}
