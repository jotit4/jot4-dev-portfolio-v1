import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { ChatbotWidget } from "@/components/chatbot-widget"
import "./globals.css"

import { JetBrains_Mono, Inter, Space_Grotesk, Geist as V0_Font_Geist, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _geist = V0_Font_Geist({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-geist' })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"], variable: '--v0-font-geist-mono' })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"], variable: '--v0-font-source-serif-4' })
const _v0_fontVariables = `${_geist.variable} ${_geistMono.variable} ${_sourceSerif_4.variable}`

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
      <body className={`font-sans ${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased ${_v0_fontVariables}`}>
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
