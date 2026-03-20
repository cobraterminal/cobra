"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Rocket, LineChart, TrendingUp, Zap, Shield, Split, ChevronLeft, ChevronRight } from "lucide-react"
import { TextRevealBlur } from "./text-reveal-blur"

const CARD_WIDTH = 280
const GAP = 24
const SCROLL_AMOUNT = CARD_WIDTH + GAP
const VISIBLE_BOXES = 4
const CONTAINER_WIDTH = VISIBLE_BOXES * CARD_WIDTH + (VISIBLE_BOXES - 1) * GAP

const features = [
  {
    icon: Rocket,
    title: "Token Deployer",
    description: "Launch tokens instantly with Jito bundles. MEV protection and priority execution built-in.",
    tags: ["Jito", "Bundles"],
  },
  {
    icon: LineChart,
    title: "Trade Panel",
    description: "Advanced charting with multi-wallet support. Execute precise entries and exits.",
    tags: ["Charts", "Multi-Wallet"],
  },
  {
    icon: TrendingUp,
    title: "Boost Tools",
    description: "Volume generation, holder accumulation, and market maker tools to dominate the curve.",
    tags: ["Volume", "Holders", "Makers"],
  },
  {
    icon: Split,
    title: "SplitNOW",
    description: "Instant token distribution across multiple wallets with single transaction efficiency.",
    tags: ["Distribution"],
  },
  {
    icon: Shield,
    title: "Sniper Guard",
    description: "Anti-snipe protection and frontrun defense for your token launches.",
    tags: ["Protection"],
  },
  {
    icon: Zap,
    title: "Lightning Execution",
    description: "Sub-10ms execution times with direct Solana RPC connections.",
    tags: ["Speed"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturesGrid() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: "smooth",
    })
  }

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <TextRevealBlur triggerOnView delay={0.5} className="inline-block">
              Everything you need to <span className="text-primary">dominate</span>
            </TextRevealBlur>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            <TextRevealBlur triggerOnView delay={0.7} duration={0.8}>
              Professional-grade tools for token deployment, trading, and market making on Solana.
            </TextRevealBlur>
          </p>
        </motion.div>

        <div className="relative -mx-6 px-12">
          <motion.button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Poprzednie"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/50 hover:text-primary transition-all duration-300 text-foreground"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Następne"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.08] hover:border-primary/50 hover:text-primary transition-all duration-300 text-foreground"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <motion.div
            ref={scrollRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex gap-6 overflow-x-auto overflow-y-hidden pb-2 mx-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ maxWidth: CONTAINER_WIDTH }}
          >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative p-6 w-[280px] h-[280px] shrink-0 flex flex-col bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">{feature.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-secondary text-xs font-mono text-muted-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
