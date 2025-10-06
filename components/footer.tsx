import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

const footerSections = [
  {
    title: "Servicios",
    links: [
      { href: "/servicios#ecommerce", label: "Ecommerce" },
      { href: "/servicios#automatizacion", label: "Automatización" },
      { href: "/servicios#ia", label: "Inteligencia Artificial" },
      { href: "/servicios#dashboards", label: "Dashboards" },
    ],
  },
  {
    title: "Portfolio",
    links: [
      { href: "/portfolio?filter=ecommerce", label: "Ecommerce" },
      { href: "/portfolio?filter=automatizacion", label: "Automatización" },
      { href: "/portfolio?filter=ia", label: "IA" },
      { href: "/portfolio?filter=dashboards", label: "Dashboards" },
    ],
  },
  {
    title: "Recursos",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/sobre-mi", label: "Sobre mí" },
      { href: "/contacto", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacidad", label: "Privacidad" },
      { href: "/legal/terminos", label: "Términos" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-heading text-sm font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="font-heading text-lg font-bold text-primary">JOT4.DEV</span>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Todos los derechos reservados
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
