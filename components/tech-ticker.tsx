"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"

const techLogos = [
  { name: "Solana", src: "/logos/solanaLogoMark.svg" },
  { name: "Pump.fun", src: "/logos/pump-fun-seeklogo.svg" },
  { name: "Jito", src: "/logos/jito.png" },
  { name: "React", src: "/logos/react-svgrepo-com.svg" },
  { name: "Helius", src: "/logos/Helius-Vertical-Logo.svg" },
  { name: "Privy", src: "/logos/Privy_Brandmark_Black.svg" },
  { name: "SplitNOW", src: "/logos/splitnow-logo.png" },
]

export function TechTicker() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.2, once: false })

  return (
    <section className="py-16 border-y border-border overflow-hidden bg-card/50">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: inView ? 1 : 0 }}
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="flex animate-marquee">
          {[...techLogos, ...techLogos].map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="flex items-center gap-4 px-10 whitespace-nowrap"
            >
              <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/[0.02] backdrop-blur-xl p-2">
                <Image
                  src={tech.src}
                  alt={tech.name}
                  width={48}
                  height={48}
                  className="object-contain max-h-10 w-auto"
                />
              </div>
              <span className="text-muted-foreground font-medium text-sm">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
