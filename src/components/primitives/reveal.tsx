"use client"

import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
}

type RevealProps = {
  children: ReactNode
  className?: string
  variant?: "up" | "fade" | "scale"
  delay?: number
  amount?: number
  once?: boolean
  as?: "div" | "section" | "li" | "span"
}

export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  amount = 0.3,
  once = true,
  as = "div",
}: RevealProps) {
  const v =
    variant === "fade" ? fadeIn : variant === "scale" ? scaleIn : fadeUp
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      variants={v}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerGroup({
  children,
  className,
  amount = 0.2,
  once = true,
}: {
  children: ReactNode
  className?: string
  amount?: number
  once?: boolean
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
