"use client"

import { motion } from "framer-motion"

interface NavHeaderProps {
  animationPhase: "hero" | "transitioning" | "complete"
  brandTargetRef: React.RefObject<HTMLDivElement | null>
}

export function NavHeader({ animationPhase, brandTargetRef }: NavHeaderProps) {
  const showHeader = animationPhase === "transitioning" || animationPhase === "complete"

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: showHeader ? 1 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div
          ref={brandTargetRef}
          className="h-12 flex items-center shrink-0"
          aria-hidden="true"
        />

        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:bg-primary/90 transition-all duration-300 border border-primary/30"
          >
            Launch App
          </motion.button>
        </div>
      </div>
    </motion.header>
  )
}
