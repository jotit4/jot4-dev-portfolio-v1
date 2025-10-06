"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface GoogleCalendarModalProps {
  isOpen: boolean
  onClose: () => void
}

export function GoogleCalendarModal({ isOpen, onClose }: GoogleCalendarModalProps) {
  const calendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL || "https://calendar.app.google/hzEWd2YZ5AstmDNKA"

  const handleOpenCalendar = () => {
    window.open(calendarUrl, "_blank")
    onClose()

    // Track analytics event
    if (typeof window !== "undefined" && (window as any).plausible) {
      ;(window as any).plausible("calendar_opened")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Agendar reunión gratuita</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-muted-foreground leading-relaxed">
            Te voy a redirigir a mi agenda de Google Calendar donde podés elegir el día y horario que mejor te convenga
            para una reunión de 30 minutos.
          </p>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <h4 className="font-semibold mb-2">En la reunión vamos a:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Conocer tu proyecto y objetivos</li>
              <li>• Analizar las mejores soluciones técnicas</li>
              <li>• Definir alcance, tiempos y presupuesto</li>
              <li>• Responder todas tus preguntas</li>
            </ul>
          </div>
          <Button className="w-full" size="lg" onClick={handleOpenCalendar}>
            <Calendar className="mr-2 h-5 w-5" />
            Abrir Google Calendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
