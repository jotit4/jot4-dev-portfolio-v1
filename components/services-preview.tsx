"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Workflow, Brain, BarChart3, Code2, Lightbulb, ArrowRight } from "lucide-react"
import Link from "next/link"
import servicesData from "@/content/services.json"

const iconMap: Record<string, any> = {
  ShoppingCart,
  Workflow,
  Brain,
  BarChart3,
  Code2,
  Lightbulb,
}

export function ServicesPreview() {
  const featuredServices = servicesData.services.slice(0, 3)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Servicios</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Soluciones tecnológicas que impulsan tu negocio al siguiente nivel
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {featuredServices.map((service, index) => {
            const Icon = iconMap[service.icon]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-heading">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.bullets.slice(0, 3).map((bullet, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start">
                          <span className="mr-2 text-primary">•</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/servicios">
              Ver todos los servicios
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
