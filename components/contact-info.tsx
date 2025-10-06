"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, MessageCircle, Calendar } from "lucide-react"
import { useState } from "react"
import { GoogleCalendarModal } from "@/components/google-calendar-modal"

export function ContactInfo() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_PHONE_E164 || "+5492610000000"
    const message = encodeURIComponent("Hola! Quiero conversar sobre un proyecto.")
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")

    // Track analytics event
    if (typeof window !== "undefined" && (window as any).plausible) {
      ;(window as any).plausible("whatsapp_opened")
    }
  }

  const handleEmail = () => {
    window.location.href = "mailto:jot4.dev@gmail.com"
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="font-heading text-2xl font-bold mb-4">Otras formas de contacto</h2>
          <p className="text-muted-foreground leading-relaxed">
            Elegí la forma que te resulte más cómoda. Todas las consultas son respondidas en menos de 24 horas.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="font-heading font-semibold mb-2 flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Agendar reunión
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Reunión gratuita de 30 minutos para conversar sobre tu proyecto
              </p>
              <Button className="w-full" onClick={() => setIsCalendarOpen(true)}>
                <Calendar className="mr-2 h-4 w-4" />
                Agendar ahora
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-heading font-semibold mb-2 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                WhatsApp
              </h3>
              <p className="text-sm text-muted-foreground mb-3">Respuesta rápida por mensaje directo</p>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleWhatsApp}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Abrir WhatsApp
              </Button>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-heading font-semibold mb-2 flex items-center">
                <Mail className="mr-2 h-5 w-5 text-primary" />
                Email
              </h3>
              <p className="text-sm text-muted-foreground mb-3">Para consultas más detalladas</p>
              <Button variant="outline" className="w-full bg-transparent" onClick={handleEmail}>
                <Mail className="mr-2 h-4 w-4" />
                jot4.dev@gmail.com
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <h3 className="font-heading font-semibold mb-2">Tiempo de respuesta</h3>
            <p className="text-sm text-muted-foreground">
              Respondo todas las consultas en menos de 24 horas, de lunes a viernes. Los fines de semana pueden demorar
              un poco más.
            </p>
          </CardContent>
        </Card>
      </div>

      <GoogleCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  )
}
