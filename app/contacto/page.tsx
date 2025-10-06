import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto - JOT4.DEV",
  description: "Contactame para conversar sobre tu proyecto. Reuniones gratuitas, WhatsApp o email.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Conversemos sobre tu proyecto. Te respondo en menos de 24 horas.
              </p>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
              <ContactForm />
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
