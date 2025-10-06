"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 max-w-md">
          <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h1 className="font-heading text-4xl font-bold mb-4">Algo falló</h1>
          <p className="text-muted-foreground mb-8">
            Ocurrió un error inesperado. Intentá de nuevo o contactame si el problema persiste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={reset}>Intentar de nuevo</Button>
            <Button variant="outline" asChild>
              <a href="/">Volver al inicio</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
