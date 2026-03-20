"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

import { HexagonBackground } from "@/components/animate-ui/components/backgrounds/hexagon"
import { NavHeader } from "@/components/nav-header"
import { AnimatedBrand } from "@/components/animated-brand"
import { HeroSection } from "@/components/hero-section"
import { FeaturesGrid } from "@/components/features-grid"
import { TechTicker } from "@/components/tech-ticker"
import { CTASection } from "@/components/cta-section"
import { FAQSection } from "@/components/faq-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [animationPhase, setAnimationPhase] = useState<"hero" | "transitioning" | "complete">("hero")
  const brandTargetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase("transitioning")
    }, 1200)

    const timer2 = setTimeout(() => {
      setAnimationPhase("complete")
    }, 2000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <HexagonBackground
        hexagonSize={75}
        hexagonMargin={3}
        className="fixed inset-0 z-0 bg-[#020202]"
        hexagonProps={{
          className:
            "before:!bg-[#020202] after:!bg-[#0a0a0a] hover:before:!bg-primary/15 hover:after:!bg-[#020202]",
        }}
      />
      <div
        className="relative z-10 pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto [&_[role=button]]:pointer-events-auto"
      >
        <NavHeader animationPhase={animationPhase} brandTargetRef={brandTargetRef} />
        <AnimatedBrand animationPhase={animationPhase} targetRef={brandTargetRef} />
        <div className="pt-20">
          <HeroSection animationPhase={animationPhase} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: animationPhase === "complete" ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FeaturesGrid />
            <TechTicker />
            <CTASection />
            <FAQSection />
            <Footer />
          </motion.div>
        </div>
      </div>
    </main>
  )
}
