"use client"

import { motion } from "framer-motion"
import { Shield, ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative p-12 md:p-16 rounded-2xl bg-gradient-to-br from-card to-secondary border border-border overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.02)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Glow */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Protected by Privy</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-balance">
              Start dominating the curve <span className="text-primary">today</span>
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Join thousands of traders using Cobra Terminal to launch, trade, and boost their tokens on Solana.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-primary text-primary-foreground font-semibold text-lg tracking-wide transition-all duration-300 flex items-center gap-2 mx-auto border border-primary/40 hover:border-primary/60"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
