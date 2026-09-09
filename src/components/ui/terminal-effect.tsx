"use client"
import { useEffect, useState, useRef, Children, ReactNode } from "react"
import { motion, useInView } from "framer-motion"

export function TerminalEffect({ command, children, prompt }: { command: string, children: ReactNode, prompt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  
  const [cmdLength, setCmdLength] = useState(0)
  const [step, setStep] = useState(0) 
  // step 0 = typing command
  // step 1 = show output
  // step 2 = show prompt
  
  useEffect(() => {
    if (!isInView) return

    if (step === 0) {
      if (cmdLength < command.length) {
        const t = setTimeout(() => setCmdLength(c => c + 1), Math.random() * 20 + 20)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setStep(1), 300)
        return () => clearTimeout(t)
      }
    } else if (step === 1) {
       const t = setTimeout(() => setStep(2), 600)
       return () => clearTimeout(t)
    }
  }, [cmdLength, command.length, isInView, step])

  // Split children to animate them line by line
  const lines = Children.toArray(children)

  return (
    <div ref={ref} className="min-h-[160px] text-left">
      <p className="text-muted-foreground whitespace-nowrap">
        <span className="text-primary">{command.substring(0, cmdLength)}</span>
        {step === 0 && <span className="anim-blink ml-1">▋</span>}
      </p>

      {step >= 1 && (
        <div className="mt-2">
          {lines.map((child, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.1 }}
            >
              {child}
            </motion.div>
          ))}
        </div>
      )}

      {step >= 2 && (
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="mt-4 text-muted-foreground whitespace-nowrap"
        >
          <span className="text-primary">{prompt}</span>{" "}
          <span className="anim-blink">▋</span>
        </motion.p>
      )}
    </div>
  )
}
