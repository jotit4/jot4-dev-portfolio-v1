import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad - JOT4.DEV",
  description: "Política de privacidad y protección de datos de JOT4.DEV",
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Política de Privacidad</h1>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Última actualización: {new Date().toLocaleDateString("es-AR")}
              </p>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">1. Información que recopilamos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Recopilamos información que nos proporcionás directamente cuando:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Completás el formulario de contacto</li>
                  <li>Interactuás con el chatbot</li>
                  <li>Agendás una reunión</li>
                  <li>Te comunicás por email o WhatsApp</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Esta información puede incluir: nombre, email, empresa, mensaje, presupuesto estimado y fuente de
                  referencia.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">2. Cómo usamos tu información</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Usamos la información recopilada para:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Responder a tus consultas y solicitudes</li>
                  <li>Proporcionar cotizaciones y propuestas</li>
                  <li>Mejorar nuestros servicios</li>
                  <li>Enviar comunicaciones relacionadas con tu proyecto</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">3. Protección de datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal
                  contra acceso no autorizado, pérdida o alteración. No compartimos tu información con terceros sin tu
                  consentimiento explícito.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">4. Retención de datos</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Conservamos tu información personal durante 12 meses desde el último contacto, a menos que solicites
                  su eliminación antes o que exista una obligación legal de conservarla por más tiempo.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">5. Tus derechos</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">Tenés derecho a:</p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Acceder a tu información personal</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tu información</li>
                  <li>Solicitar la portabilidad de tus datos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">6. Cookies y analytics</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Utilizamos Plausible Analytics, una herramienta de análisis que respeta la privacidad y no utiliza
                  cookies. Los datos recopilados son anónimos y agregados.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="font-heading text-2xl font-semibold mb-4">7. Contacto</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Para ejercer tus derechos o realizar consultas sobre esta política, contactame en:{" "}
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
