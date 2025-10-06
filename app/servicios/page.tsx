import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServicesList } from "@/components/services-list"
import { CTASection } from "@/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Servicios - JOT4.DEV",
  description:
    "Desarrollo fullstack, automatización de procesos, soluciones con IA, dashboards y más. Servicios tecnológicos para impulsar tu negocio.",
}

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Servicios</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Soluciones tecnológicas completas para llevar tu negocio al siguiente nivel
              </p>
            </div>
            <ServicesList />
          </div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
