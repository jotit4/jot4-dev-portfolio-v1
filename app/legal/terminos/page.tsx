import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones - JOT4.DEV",
  description: "Términos y condiciones de uso de JOT4.DEV",
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Términos y Condiciones</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Última actualización: {new Date().toLocaleDateString("es-AR")}
              </p>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">1. Aceptación de términos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Al acceder y utilizar este sitio web, aceptás estar sujeto a estos términos y condiciones. Si no estás
                  de acuerdo con alguna parte de estos términos, no deberías usar este sitio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">2. Servicios</h2>
                <p className="text-muted-foreground leading-relaxed">
                  JOT4.DEV ofrece servicios de desarrollo de software, automatización y consultoría técnica. Los
                  detalles específicos de cada proyecto se acuerdan mediante propuestas individuales y contratos
                  separados.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">3. Propiedad intelectual</h2>
                <p className="text-muted-foreground leading-relaxed">
                  El contenido de este sitio web, incluyendo textos, gráficos, logos y código, es propiedad de JOT4.DEV
                  y está protegido por leyes de propiedad intelectual. Los derechos sobre el código desarrollado para
                  clientes se especifican en cada contrato individual.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">4. Limitación de responsabilidad</h2>
                <p className="text-muted-foreground leading-relaxed">
                  JOT4.DEV no será responsable por daños indirectos, incidentales o consecuentes que resulten del uso o
                  la imposibilidad de usar este sitio web o los servicios ofrecidos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">5. Modificaciones</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en
                  vigencia inmediatamente después de su publicación en este sitio.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">6. Ley aplicable</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Estos términos se rigen por las leyes de la República Argentina. Cualquier disputa se resolverá en los
                  tribunales competentes de Argentina.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">7. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para consultas sobre estos términos, contactame en:{" "}
                  <a href="mailto:contacto@jot4.dev" className="text-primary hover:underline">
                    contacto@jot4.dev
                  </a>
                </p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
