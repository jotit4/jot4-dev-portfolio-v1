"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ShoppingCart, Workflow, Brain, BarChart3, Code2, Lightbulb } from "lucide-react"
import servicesData from "@/content/services.json"
import { useState } from "react"
import { ChatbotWidget } from "@/components/chatbot-widget"

const iconMap: Record<string, any> = {
  ShoppingCart,
  Workflow,
  Brain,
  BarChart3,
  Code2,
  Lightbulb,
}

export function ServicesList() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const handleQuoteService = (serviceId: string) => {
    setSelectedService(serviceId)
    setIsChatbotOpen(true)
  }

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {servicesData.services.map((service, index) => {
          const Icon = iconMap[service.icon]
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col" id={service.id}>
                <CardHeader>
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start leading-relaxed">
                        <span className="mr-2 text-primary font-bold">✓</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {service.faq && service.faq.length > 0 && (
                    <Accordion type="single" collapsible className="mb-6">
                      {service.faq.map((faqItem, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                          <AccordionTrigger className="text-sm text-left">{faqItem.question}</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {faqItem.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}

                  <Button className="w-full" onClick={() => handleQuoteService(service.id)}>
                    Cotizar este servicio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <ChatbotWidget
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        initialContext={selectedService ? { serviceId: selectedService } : undefined}
      />
    </>
  )
}
