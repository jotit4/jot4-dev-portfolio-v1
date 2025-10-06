"use client"

import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { GoogleCalendarModal } from "@/components/google-calendar-modal"
import heroData from "@/content/hero.json"

export function Hero() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleWhatsApp = () => {
    const phone = process.env.NEXT_PUBLIC_PHONE_E164 || "+5492610000000"
    const message = encodeURIComponent(
      "Hola! Me interesa conocer más sobre tus servicios de desarrollo y automatización.",
    )
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-background/50">
        {/* Fondo animado con partículas */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-primary/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {heroData.h1}
            </motion.h1>

            <motion.h2
              className="mt-6 text-xl sm:text-2xl md:text-3xl text-muted-foreground text-balance leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {heroData.h2}
            </motion.h2>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="w-full sm:w-auto text-base transition-colors hover:bg-primary/90"
                onClick={() => setIsCalendarOpen(true)}
              >
                <Calendar className="mr-2 h-5 w-5" />
                Ver cómo automatizar mi negocio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base bg-transparent transition-colors hover:bg-primary hover:text-primary-foreground"
                onClick={handleWhatsApp}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Consulta rápida por WhatsApp
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <GoogleCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </>
  )
}
