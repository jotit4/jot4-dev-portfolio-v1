import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CTASection } from "@/components/cta-section"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre mí - JOT4.DEV",
  description:
    "Desarrollador fullstack y especialista en IA con experiencia en ecommerce, automatización y soluciones empresariales.",
}

export default function AboutPage() {
  const skills = {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Python", "PostgreSQL", "MongoDB", "Redis"],
    ia: ["OpenAI API", "LangChain", "RAG", "PyTorch", "Hugging Face"],
    tools: ["Docker", "Git", "n8n", "Vercel", "AWS"],
  }

  const certifications = [
    "AWS Certified Solutions Architect",
    "Google Cloud Professional",
    "Meta React Advanced",
    "OpenAI API Specialist",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Sobre mí</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Desarrollador fullstack y especialista en IA apasionado por crear soluciones que transforman negocios
              </p>
            </div>

            {/* Photo and intro */}
            <Card className="mb-12">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 mx-auto md:mx-0">
                    <Image
                      src="/juani.jpg"
                      alt="Juan Ignacio - Desarrollador Fullstack e IA Ops"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      Soy desarrollador fullstack con más de 5 años de experiencia creando soluciones digitales para
                      ecommerce y empresas. Me especializo en integrar inteligencia artificial y automatización para
                      resolver problemas reales de negocio.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Mi enfoque es pragmático: uso la tecnología adecuada para cada problema, sin complicaciones
                      innecesarias. Trabajo de forma transparente, con comunicación constante y entregas iterativas.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      He ayudado a startups a lanzar sus MVPs, a empresas medianas a automatizar procesos que les
                      ahorraron cientos de horas, y a ecommerce a escalar sus ventas con plataformas optimizadas.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6">Stack Tecnológico</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-4">Frontend</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-mono">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-4">Backend</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-mono">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-4">Inteligencia Artificial</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.ia.map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-mono">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-4">Herramientas</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill) => (
                        <Badge key={skill} variant="secondary" className="font-mono">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6">Certificaciones</h2>
              <Card>
                <CardContent className="pt-6">
                  <ul className="space-y-3">
                    {certifications.map((cert) => (
                      <li key={cert} className="flex items-start">
                        <span className="mr-2 text-primary font-bold">✓</span>
                        <span className="text-muted-foreground">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Approach */}
            <div>
              <h2 className="font-heading text-2xl font-bold mb-6">Mi Enfoque</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-2">Comunicación</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Actualizaciones constantes, demos semanales y disponibilidad para resolver dudas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-2">Calidad</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Código limpio, testeado y documentado. Performance y seguridad desde el día uno.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-heading font-semibold mb-2">Resultados</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Foco en métricas de negocio. No solo código que funciona, sino que genera valor.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
