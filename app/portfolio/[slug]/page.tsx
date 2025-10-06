import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import projectsData from "@/content/projects.json"
import type { Metadata } from "next"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return projectsData.projects.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.projects.find((p) => p.slug === params.slug)

  if (!project) {
    return {
      title: "Proyecto no encontrado - JOT4.DEV",
    }
  }

  return {
    title: `${project.title} - Portfolio JOT4.DEV`,
    description: project.description,
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al portfolio
            </Link>

            <div className="mb-6">
              <Badge variant="secondary" className="font-mono mb-4">
                {project.category}
              </Badge>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
              <p className="text-xl text-muted-foreground text-pretty">{project.description}</p>
            </div>

            <div className="relative h-[400px] rounded-lg overflow-hidden mb-12">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
            </div>

            <div className="grid gap-8 md:grid-cols-2 mb-12">
              <Card>
                <CardContent className="pt-6">
                  <h2 className="font-heading text-xl font-semibold mb-3">El Problema</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h2 className="font-heading text-xl font-semibold mb-3">La Solución</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                </CardContent>
              </Card>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold mb-6">Resultados</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <Card key={key}>
                    <CardContent className="pt-6 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
                      <div className="text-sm text-muted-foreground capitalize">{key}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="font-heading text-2xl font-semibold mb-6">Stack Tecnológico</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-4 py-2 text-sm font-mono">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {project.link && (
              <div className="text-center">
                <Button asChild size="lg">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer">
                    Ver proyecto en vivo
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
