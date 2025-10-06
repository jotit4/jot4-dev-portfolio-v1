import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PortfolioGrid } from "@/components/portfolio-grid"
import { CTASection } from "@/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Portfolio - JOT4.DEV",
  description:
    "Proyectos de desarrollo fullstack, automatización e IA que generaron resultados reales para mis clientes.",
}

export default function PortfolioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Proyectos que generaron resultados medibles y transformaron negocios
              </p>
            </div>
            <PortfolioGrid />
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
