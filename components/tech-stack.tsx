"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import heroData from "@/content/hero.json"
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiVercel,
  SiDocker,
  SiOpenai,
  SiPython,
  SiLangchain,
  SiTensorflow,
  SiHuggingface,
} from "react-icons/si"
import { Brain, Sparkles, Zap } from "lucide-react"

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  // Fullstack
  "Next.js": SiNextdotjs,
  React: SiReact,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Prisma: SiPrisma,
  Vercel: SiVercel,
  Docker: SiDocker,
  // IA
  OpenAI: SiOpenai,
  Python: SiPython,
  LangChain: SiLangchain,
  TensorFlow: SiTensorflow,
  "Hugging Face": SiHuggingface,
  // Fallbacks genéricos
  RAG: Brain,
  "Fine-tuning": Sparkles,
  Automation: Zap,
}

export function TechStack() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Fullstack Technologies */}
          <div>
            <motion.h3
              className="font-heading text-lg font-semibold mb-6 text-center text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Stack Fullstack
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-3">
              {heroData.chipsFullstack.map((tech, index) => {
                const Icon = techIcons[tech] || Zap
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-mono flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tech}
                    </Badge>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* AI Technologies */}
          <div>
            <motion.h3
              className="font-heading text-lg font-semibold mb-6 text-center text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Stack Inteligencia Artificial
            </motion.h3>
            <div className="flex flex-wrap justify-center gap-3">
              {heroData.chipsIA.map((tech, index) => {
                const Icon = techIcons[tech] || Brain
                return (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 120,
                    }}
                  >
                    <Badge variant="secondary" className="px-4 py-2 text-sm font-mono flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tech}
                    </Badge>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
