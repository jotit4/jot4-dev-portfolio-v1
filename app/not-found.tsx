import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">No encontramos esto. Volvé al inicio.</p>
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Volver al inicio
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
