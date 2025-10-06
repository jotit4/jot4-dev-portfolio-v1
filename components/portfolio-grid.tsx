"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import projectsData from "@/content/projects.json"

const categories = [
  { id: "all", label: "Todos" },
  { id: "ecommerce", label: "Ecommerce" },
  { id: "automatizacion", label: "Automatización" },
  { id: "ia", label: "IA" },
  { id: "dashboards", label: "Dashboards" },
]

export function PortfolioGrid() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredProjects =
    selectedCategory === "all"
      ? projectsData.projects
      : projectsData.projects.filter((project) => project.category === selectedCategory)

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            size="sm"
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Projects grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              layout
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
                    <div className="space-y-2">
                      {Object.entries(project.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{key}:</span>
                          <span className="font-semibold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs font-mono">
                          {tech}
                        </Badge>
                      ))}
                      {project.stack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.stack.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Pronto publicaremos nuevos casos. ¿Querés ver uno en vivo?{" "}
            <Link href="/contacto" className="text-primary hover:underline">
              Escribime
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  )
}
