"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Menu, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { GoogleCalendarModal } from "@/components/google-calendar-modal"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/sobre-mi", label: "Sobre mí" },
  { href: "/contacto", label: "Contacto" },
]

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-heading text-xl font-bold text-primary">JOT4.DEV</span>
            <Image src="/solo_tools.svg" alt="Solo Tools" width={24} height={24} className="ml-2" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:inline-flex"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Cambiar tema</span>
            </Button>

            <Button className="hidden md:inline-flex" size="sm" onClick={() => setIsCalendarOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              Agendar
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-4 border-t">
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => {
                        setIsOpen(false)
                        setIsCalendarOpen(true)
                      }}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Agendar reunión
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <GoogleCalendarModal isOpen={isCalendarOpen} onClose={() => setIsCalendarOpen(false)} />
    </nav>
  )
}
