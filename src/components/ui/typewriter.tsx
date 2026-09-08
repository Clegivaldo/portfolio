"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function TypewriterText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    if (delay > 0 && count === 0) {
      timeout = setTimeout(() => {
        setCount(1)
      }, delay)
    } else if (count > 0 && count < text.length) {
      timeout = setTimeout(() => {
        setCount((c) => c + 1)
      }, speed)
    } else if (count === 0 && delay === 0) {
      setCount(1)
    }
    return () => clearTimeout(timeout)
  }, [count, delay, speed, text.length])

  return <span>{text.substring(0, count)}</span>
}
