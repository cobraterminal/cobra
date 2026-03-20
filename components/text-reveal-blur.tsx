"use client"

import React, { useEffect } from "react"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"

interface TextRevealBlurProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
  triggerOnView?: boolean
}

export function TextRevealBlur({
  children,
  delay = 0,
  duration = 0.6,
  className,
  triggerOnView = false,
}: TextRevealBlurProps) {
  const progress = useMotionValue(0)
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    const shouldStart = triggerOnView ? inView : true
    if (!shouldStart) return

    const controls = animate(progress, 1, {
      duration,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    return () => controls.stop()
  }, [progress, delay, duration, triggerOnView, inView])

  const clipPath = useTransform(progress, (p) => `inset(0 ${(1 - p) * 100}% 0 0)`)
  const sharpMask = useTransform(progress, (p) => {
    const edge = p * 100
    const bandWidth = Math.min(8, (1 - p) * 100)
    const sharpEnd = Math.max(0, edge - bandWidth)
    if (p >= 1) return "none"
    return `linear-gradient(to right, black 0%, black ${sharpEnd}%, transparent ${sharpEnd}%)`
  })
  const blurMask = useTransform(progress, (p) => {
    const edge = p * 100
    const bandWidth = Math.min(8, (1 - p) * 100)
    const blurStart = Math.max(0, edge - bandWidth)
    if (p >= 1 || bandWidth <= 0) return "linear-gradient(to right, transparent 0%, transparent 100%)"
    return `linear-gradient(to right, transparent 0%, transparent ${blurStart}%, black ${blurStart}%, black ${edge}%, transparent ${edge}%)`
  })

  return (
    <motion.span
      ref={ref}
      className={`block relative overflow-hidden ${className ?? ""}`}
      style={{ clipPath }}
    >
      <motion.span
        className="block"
        style={{
          maskImage: sharpMask,
          WebkitMaskImage: sharpMask,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      >
        {children}
      </motion.span>
      <motion.span
        className="block absolute inset-0"
        style={{
          maskImage: blurMask,
          WebkitMaskImage: blurMask,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          filter: "blur(4px)",
        }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
