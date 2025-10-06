import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { TechStack } from "@/components/tech-stack"
import { ServicesPreview } from "@/components/services-preview"
import { PortfolioPreview } from "@/components/portfolio-preview"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TechStack />
        <ServicesPreview />
        <PortfolioPreview />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
