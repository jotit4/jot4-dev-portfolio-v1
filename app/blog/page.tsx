import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - JOT4.DEV",
  description: "Artículos sobre desarrollo fullstack, IA, automatización y mejores prácticas.",
}

// Placeholder posts - en producción vendrían de un CMS o archivos markdown
const posts = [
  {
    slug: "como-integrar-ia-en-tu-negocio",
    title: "Cómo integrar IA en tu negocio sin morir en el intento",
    excerpt: "Guía práctica para implementar soluciones de IA que realmente aporten valor a tu empresa.",
    date: "2024-01-15",
    category: "IA",
    readTime: "8 min",
  },
  {
    slug: "automatizacion-procesos-n8n",
    title: "Automatización de procesos con n8n: casos de uso reales",
    excerpt: "Ejemplos prácticos de automatizaciones que ahorran horas de trabajo manual cada semana.",
    date: "2024-01-10",
    category: "Automatización",
    readTime: "6 min",
  },
  {
    slug: "nextjs-performance-tips",
    title: "10 tips para optimizar el performance de tu app Next.js",
    excerpt: "Técnicas probadas para mejorar el tiempo de carga y la experiencia de usuario.",
    date: "2024-01-05",
    category: "Desarrollo",
    readTime: "10 min",
  },
]

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Blog</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Artículos sobre desarrollo, IA y automatización
              </p>
            </div>

            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{post.category}</Badge>
                          <span className="text-xs text-muted-foreground">{post.readTime} de lectura</span>
                        </div>
                        <CardTitle className="font-heading text-2xl">{post.title}</CardTitle>
                        <CardDescription className="text-base">{post.excerpt}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <time className="text-sm text-muted-foreground">
                          {new Date(post.date).toLocaleDateString("es-AR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </time>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Pronto publicaremos nuevos artículos. Mientras tanto, podés{" "}
                  <Link href="/contacto" className="text-primary hover:underline">
                    contactarme
                  </Link>{" "}
                  para consultas específicas.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
