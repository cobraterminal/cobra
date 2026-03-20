"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Cobra Terminal?",
    answer:
      "Cobra Terminal is the ultimate Pump.fun toolkit for Solana. Launch tokens instantly with Jito bundles, execute trades with MEV protection, and use professional-grade tools for token deployment, trading, and market making.",
  },
  {
    question: "How is it different from other token tools?",
    answer:
      "We combine Jito bundles for MEV protection, multi-wallet charting, volume generation tools, and sub-10ms execution in one platform. Everything you need to dominate the curve is built-in with priority execution and sniper protection.",
  },
  {
    question: "Is Cobra Terminal free to use?",
    answer:
      "Get started free and scale as you grow. We offer flexible pricing for traders and token launchers. Join thousands of traders using Cobra Terminal on Solana mainnet.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about Cobra Terminal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-3 last:mb-0 overflow-hidden border-0 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.04] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-semibold hover:no-underline hover:text-primary [&[data-state=open]]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
