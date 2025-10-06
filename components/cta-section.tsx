"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { GoogleCalendarModal } from "@/components/google-calendar-modal"

export function CTASection() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_PHONE_E164 || "+5492610000000"
    const message = encodeURIComponent("Hola! Quiero conversar sobre un proyecto.")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para transformar tu negocio con tecnología?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              Agendá una reunión gratuita de 30 minutos para conversar sobre tu proyecto y cómo puedo ayudarte a
              alcanzar tus objetivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="w-full sm:w-auto" onClick={() => setIsCalendarOpen(true)}>
                <Calendar className="mr-2 h-5 w-5" />
                Agendar reunión gratuita
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Escribir por WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <GoogleCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  )
}
