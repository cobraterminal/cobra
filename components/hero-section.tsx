"use client"

import { motion } from "framer-motion"
import { ArrowRight, BookOpen } from "lucide-react"

interface HeroSectionProps {
  animationPhase: "hero" | "transitioning" | "complete"
}

export function HeroSection({ animationPhase }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="relative z-10 max-w-4xl mx-auto text-center -translate-y-[77px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: animationPhase === "complete" ? 1 : 0, 
            y: animationPhase === "complete" ? 0 : 30 
          }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-mono text-primary">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Now Live on Mainnet
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: animationPhase === "complete" ? 1 : 0, 
            y: animationPhase === "complete" ? 0 : 30 
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-balance"
        >
          <span className="text-foreground">Deploy. Trade. </span>
          <span className="text-primary">Boost.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: animationPhase === "complete" ? 1 : 0, 
            y: animationPhase === "complete" ? 0 : 30 
          }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty"
        >
          The ultimate Pump.fun toolkit. Launch tokens, execute trades with Jito bundles, and dominate the curve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: animationPhase === "complete" ? 1 : 0, 
            y: animationPhase === "complete" ? 0 : 30 
          }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group min-w-[200px] px-6 py-3 bg-primary text-primary-foreground font-semibold text-base tracking-wide transition-all duration-300 flex items-center justify-center gap-2 border border-primary/40 hover:border-primary/60"
          >
            Start Building
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="min-w-[200px] px-6 py-3 bg-white/[0.02] backdrop-blur-sm font-semibold text-base tracking-wide border border-white/[0.08] text-foreground hover:bg-white/[0.06] hover:border-primary/40 hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            View Docs
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: animationPhase === "complete" ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "50K+", label: "Tokens Launched" },
            { value: "99.9%", label: "Uptime" },
            { value: "<10ms", label: "Latency" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold font-mono text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
