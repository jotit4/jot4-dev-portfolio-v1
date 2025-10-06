import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotWidget } from "@/components/chatbot-widget"
import "./globals.css"

import { JetBrains_Mono, Inter, Space_Grotesk } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

// Variables de Geist (via paquete geist)
const geistVariables = `${GeistSans.variable} ${GeistMono.variable}`

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "JOT4.DEV - Desarrollo Fullstack & IA Ops",
  description:
    "Diseño y desarrollo arquitecturas de sistemas con IA integrada para ecommerce y empresas. Automatizaciones y plataformas a medida.",
  generator: "v0.app",
  keywords: ["desarrollo fullstack", "IA", "automatización", "ecommerce", "Next.js", "React"],
  authors: [{ name: "JOT4.DEV" }],
  openGraph: {
    title: "JOT4.DEV - Desarrollo Fullstack & IA Ops",
    description:
      "Desarrollo soluciones con Inteligencia Artificial integrada, flujos de trabajo automatizados y sistemas agénticos.",
    type: "website",
    locale: "es_AR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        {/* {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )} */}
      </head>
      <body className={`font-sans ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased ${geistVariables}`}>
        <Suspense>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
            <ChatbotWidget />
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
