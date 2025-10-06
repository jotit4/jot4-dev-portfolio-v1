"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import projectsData from "@/content/projects.json"

export function PortfolioPreview() {
  const featuredProjects = projectsData.projects.slice(0, 3)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Portfolio</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Proyectos que generaron resultados reales para mis clientes
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/portfolio/${project.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="mb-2">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {project.category}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="text-sm">
                          <div className="font-semibold text-primary">{value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/portfolio">
              Ver todos los proyectos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
