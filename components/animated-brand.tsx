"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface AnimatedBrandProps {
  animationPhase: "hero" | "transitioning" | "complete"
  targetRef: React.RefObject<HTMLDivElement | null>
}

const HERO_LOGO_SIZE = 96
const NAV_LOGO_SIZE = 48
const HERO_TEXT_SIZE = 30 // text-3xl
const NAV_TEXT_SIZE = 18 // text-lg
const HERO_GAP = 24
const NAV_GAP = 12

function HeroTextReveal() {
  const progress = useMotionValue(0)

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 0.6,
      delay: 0.85,
      ease: [0.25, 0.46, 0.45, 0.94],
    })
    return () => controls.stop()
  }, [])

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
    <motion.span className="block relative" style={{ clipPath }}>
      {/* Sharp layer - ostre litery */}
      <motion.span
        className="block"
        style={{
          maskImage: sharpMask,
          WebkitMaskImage: sharpMask,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      >
        <span className="text-primary">COBRA</span>
        <span className="text-foreground"> TERMINAL</span>
      </motion.span>
      {/* Blurred layer - rozmyta "następna" litera na krawędzi */}
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
        <span className="text-primary">COBRA</span>
        <span className="text-foreground"> TERMINAL</span>
      </motion.span>
    </motion.span>
  )
}

export function AnimatedBrand({ animationPhase, targetRef }: AnimatedBrandProps) {
  const [targetBox, setTargetBox] = useState<{ x: number; y: number } | null>(null)
  const isNavbar = animationPhase === "transitioning" || animationPhase === "complete"

  useEffect(() => {
    if (!isNavbar || !targetRef.current) return

    const updatePosition = () => {
      if (targetRef.current) {
        requestAnimationFrame(() => {
          if (targetRef.current) {
            const rect = targetRef.current.getBoundingClientRect()
            setTargetBox({ x: rect.left, y: rect.top })
          }
        })
      }
    }

    updatePosition()
    const ro = new ResizeObserver(updatePosition)
    ro.observe(targetRef.current)

    return () => ro.disconnect()
  }, [isNavbar, targetRef])

  const logoSize = isNavbar && targetBox ? NAV_LOGO_SIZE : HERO_LOGO_SIZE
  const textSize = isNavbar && targetBox ? NAV_TEXT_SIZE : HERO_TEXT_SIZE
  const gap = isNavbar && targetBox ? NAV_GAP : HERO_GAP

  return (
    <motion.div
      className="fixed z-50 flex items-center pointer-events-none"
      initial={false}
      animate={
        isNavbar && targetBox
          ? { left: targetBox.x, top: targetBox.y, x: 0, y: 0 }
          : { left: "50%", top: "50%", x: "-50%", y: "-50%" }
      }
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <motion.div
        className="relative flex-shrink-0 overflow-hidden bg-transparent"
        initial={false}
        animate={{
          width: logoSize,
          height: logoSize,
        }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <motion.img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/logocobra.svg`}
          alt="Cobra Terminal"
          className="w-full h-full object-contain"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
            opacity: { duration: 0.5, delay: 0.1 },
          }}
        />
      </motion.div>
      <motion.div
        className="font-mono font-bold tracking-wider whitespace-nowrap flex-shrink-0 overflow-hidden relative"
        initial={false}
        animate={{ fontSize: textSize, marginLeft: gap }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {isNavbar && targetBox ? (
          <>
            <span className="text-primary">COBRA</span>
            <span className="text-foreground"> TERMINAL</span>
          </>
        ) : (
          <HeroTextReveal />
        )}
      </motion.div>
    </motion.div>
  )
}
