"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { getPriceEstimate, PRICING_CONFIG } from "@/lib/pricing"

interface Message {
  id: string
  text: string
  sender: "bot" | "user"
  timestamp: Date
}

interface ChatbotWidgetProps {
  isOpen?: boolean
  onClose?: () => void
  initialContext?: {
    serviceId?: string
  }
}

type FlowType = "faq" | "cotizacion" | "agenda" | "contacto"
type QuoteStep = "moneda" | "nombre" | "email" | "tipo" | "urgencia" | "presupuesto" | "resumen"

export function ChatbotWidget({ isOpen: controlledIsOpen, onClose, initialContext }: ChatbotWidgetProps) {
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [currentFlow, setCurrentFlow] = useState<FlowType | null>(null)
  const [quoteStep, setQuoteStep] = useState<QuoteStep>("moneda")
  const [quoteData, setQuoteData] = useState({
    moneda: "",
    nombre: "",
    email: "",
    tipo: "",
    urgencia: "",
    presupuesto: "",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen)
    }
  }, [controlledIsOpen])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Track analytics event
      if (typeof window !== "undefined" && (window as any).plausible) {
        ;(window as any).plausible("chatbot_opened")
      }

      // Initial greeting
      addBotMessage("¡Hola! Soy el asistente virtual de JOT4.DEV. ¿En qué puedo ayudarte hoy?", [
        { label: "Cotizar un proyecto", value: "cotizacion" },
        { label: "Agendar reunión", value: "agenda" },
        { label: "Preguntas frecuentes", value: "faq" },
        { label: "Hablar con humano", value: "contacto" },
      ])
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addBotMessage = (text: string, options?: Array<{ label: string; value: string }>) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])

    if (options) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-options`,
            text: "",
            sender: "bot",
            timestamp: new Date(),
          } as any,
        ])
      }, 300)
    }
  }

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, message])
  }

  const handleFlowSelection = (flow: FlowType) => {
    setCurrentFlow(flow)

    switch (flow) {
      case "cotizacion":
        addBotMessage("Perfecto, vamos a cotizar tu proyecto. Primero, ¿en qué moneda preferís trabajar?", [
          { label: "USD (Dólares)", value: "USD" },
          { label: "ARS (Pesos argentinos)", value: "ARS" },
        ])
        setQuoteStep("moneda")
        break
      case "agenda":
        addBotMessage("Excelente, podés agendar una reunión gratuita de 30 minutos. Te abro el calendario ahora.", [
          { label: "Abrir calendario", value: "open_calendar" },
          { label: "Volver al menú", value: "menu" },
        ])
        break
      case "faq":
        addBotMessage("¿Qué te gustaría saber?", [
          { label: "¿Qué servicios ofrecés?", value: "faq_servicios" },
          { label: "¿Cuánto tiempo toma un proyecto?", value: "faq_tiempo" },
          { label: "¿Cómo es el proceso?", value: "faq_proceso" },
          { label: "¿Trabajás con startups?", value: "faq_startups" },
          { label: "Volver al menú", value: "menu" },
        ])
        break
      case "contacto":
        addBotMessage("Claro, podés contactarme directamente por:", [
          { label: "WhatsApp", value: "whatsapp" },
          { label: "Email", value: "email" },
          { label: "Agendar reunión", value: "agenda" },
          { label: "Volver al menú", value: "menu" },
        ])
        break
    }
  }

  const handleQuoteFlow = (input: string) => {
    switch (quoteStep) {
      case "moneda":
        setQuoteData((prev) => ({ ...prev, moneda: input }))
        addBotMessage(`Perfecto, trabajaremos en ${input}. ¿Cómo te llamás?`)
        setQuoteStep("nombre")
        break
      case "nombre":
        setQuoteData((prev) => ({ ...prev, nombre: input }))
        addBotMessage(`Encantado, ${input}. ¿Cuál es tu email?`)
        setQuoteStep("email")
        break
      case "email":
        if (!input.includes("@")) {
          addBotMessage("Por favor, ingresá un email válido.")
          return
        }
        setQuoteData((prev) => ({ ...prev, email: input }))
        addBotMessage("¿Qué tipo de proyecto necesitás?", [
          { label: "Ecommerce", value: "ecommerce" },
          { label: "Automatización", value: "automatizacion" },
          { label: "Solución con IA", value: "ia" },
          { label: "Dashboard", value: "dashboard" },
          { label: "API", value: "api" },
          { label: "Otro", value: "otro" },
        ])
        setQuoteStep("tipo")
        break
      case "tipo":
        setQuoteData((prev) => ({ ...prev, tipo: input }))
        addBotMessage("¿Qué urgencia tenés?", [
          { label: "Urgente (1-2 semanas)", value: "urgente" },
          { label: "Normal (1 mes)", value: "normal" },
          { label: "Flexible (2+ meses)", value: "flexible" },
        ])
        setQuoteStep("urgencia")
        break
      case "urgencia":
        setQuoteData((prev) => ({ ...prev, urgencia: input }))
        const currency = quoteData.moneda
        const ranges = PRICING_CONFIG.ranges[currency as "USD" | "ARS"]
        addBotMessage("¿Cuál es tu presupuesto estimado?", [
          { label: `Menos de ${ranges.low}`, value: "bajo" },
          { label: `${ranges.low} - ${ranges.medium}`, value: "medio" },
          { label: `${ranges.medium} - ${ranges.high}`, value: "alto" },
          { label: `${ranges.high}+`, value: "premium" },
          { label: "No estoy seguro", value: "no-seguro" },
        ])
        setQuoteStep("presupuesto")
        break
      case "presupuesto":
        setQuoteData((prev) => ({ ...prev, presupuesto: input }))
        const finalData = { ...quoteData, presupuesto: input }

        const estimate = getPriceEstimate(finalData.tipo, finalData.moneda as "USD" | "ARS")

        addBotMessage(
          `Perfecto, ${finalData.nombre}. Acá está el resumen:\n\n` +
            `📧 Email: ${finalData.email}\n` +
            `💼 Proyecto: ${finalData.tipo}\n` +
            `⏱️ Urgencia: ${finalData.urgencia}\n` +
            `💰 Presupuesto: ${finalData.presupuesto}\n` +
            `💵 Moneda: ${finalData.moneda}\n\n` +
            `📊 Estimación base: ${estimate}\n\n` +
            `¿Qué querés hacer ahora?`,
          [
            { label: "Agendar reunión", value: "agenda" },
            { label: "Escribir por WhatsApp", value: "whatsapp" },
            { label: "Volver al menú", value: "menu" },
          ],
        )

        // Track analytics event
        if (typeof window !== "undefined" && (window as any).plausible) {
          ;(window as any).plausible("lead_completed", {
            props: { tipo: finalData.tipo, presupuesto: finalData.presupuesto },
          })
        }

        setQuoteStep("resumen")
        setCurrentFlow(null)
        break
    }
  }

  const handleFAQ = (question: string) => {
    const answers: Record<string, string> = {
      faq_servicios:
        "Ofrezco desarrollo fullstack, automatización de procesos, soluciones con IA, dashboards, APIs y consultoría técnica. Podés ver más detalles en la página de Servicios.",
      faq_tiempo:
        "Depende del proyecto. Un MVP puede estar en 2-4 semanas, proyectos medianos en 1-2 meses, y proyectos complejos en 2-4 meses. En la reunión inicial definimos tiempos específicos.",
      faq_proceso:
        "1) Reunión inicial gratuita, 2) Propuesta y cotización, 3) Desarrollo iterativo con demos semanales, 4) Testing y ajustes, 5) Deploy y capacitación. Siempre con comunicación constante.",
      faq_startups:
        "Sí, trabajo con startups y ofrezco flexibilidad en pagos. También puedo ayudar a validar ideas técnicamente antes de invertir en desarrollo completo.",
    }

    addBotMessage(answers[question] || "No tengo esa información. ¿Querés hablar directamente conmigo?", [
      { label: "Otra pregunta", value: "faq" },
      { label: "Agendar reunión", value: "agenda" },
      { label: "Volver al menú", value: "menu" },
    ])
  }

  const handleSpecialAction = (action: string) => {
    switch (action) {
      case "open_calendar":
        const calendarUrl = process.env.NEXT_PUBLIC_CALENDAR_URL || "https://calendar.app.google/hzEWd2YZ5AstmDNKA"
        window.open(calendarUrl, "_blank")
        addBotMessage("Abrí el calendario en una nueva pestaña. ¿Algo más en lo que pueda ayudarte?", [
          { label: "Volver al menú", value: "menu" },
        ])
        if (typeof window !== "undefined" && (window as any).plausible) {
          ;(window as any).plausible("agenda_opened", { props: { source: "chatbot" } })
        }
        break
      case "whatsapp":
        const phone = process.env.NEXT_PUBLIC_PHONE_E164 || "+5492610000000"
        const message = encodeURIComponent(
          currentFlow === "cotizacion" && quoteData.nombre
            ? `Hola! Soy ${quoteData.nombre}. Completé el chatbot y quiero conversar sobre mi proyecto de ${quoteData.tipo}.`
            : "Hola! Quiero conversar sobre un proyecto.",
        )
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank")
        addBotMessage("Abrí WhatsApp en una nueva pestaña. ¿Algo más?", [{ label: "Volver al menú", value: "menu" }])
        if (typeof window !== "undefined" && (window as any).plausible) {
          ;(window as any).plausible("whatsapp_opened", { props: { source: "chatbot" } })
        }
        break
      case "email":
        window.location.href = "mailto:contacto@jot4.dev"
        addBotMessage("Abrí tu cliente de email. ¿Algo más?", [{ label: "Volver al menú", value: "menu" }])
        break
      case "menu":
        setCurrentFlow(null)
        setQuoteStep("moneda")
        setQuoteData({ moneda: "", nombre: "", email: "", tipo: "", urgencia: "", presupuesto: "" })
        addBotMessage("¿En qué más puedo ayudarte?", [
          { label: "Cotizar un proyecto", value: "cotizacion" },
          { label: "Agendar reunión", value: "agenda" },
          { label: "Preguntas frecuentes", value: "faq" },
          { label: "Hablar con humano", value: "contacto" },
        ])
        break
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)

    if (currentFlow === "cotizacion") {
      handleQuoteFlow(inputValue)
    } else {
      addBotMessage("Disculpá, no entendí eso. Usá los botones para navegar o escribime directamente por WhatsApp.", [
        { label: "Volver al menú", value: "menu" },
      ])
    }

    setInputValue("")
  }

  const handleOptionClick = (value: string) => {
    addUserMessage(value)

    // Check if it's a flow selection
    if (["cotizacion", "agenda", "faq", "contacto"].includes(value)) {
      handleFlowSelection(value as FlowType)
    }
    // Check if it's a FAQ question
    else if (value.startsWith("faq_")) {
      handleFAQ(value)
    }
    // Check if it's a special action
    else if (["open_calendar", "whatsapp", "email", "menu"].includes(value)) {
      handleSpecialAction(value)
    }
    // Otherwise, it's part of the quote flow
    else if (currentFlow === "cotizacion") {
      handleQuoteFlow(value)
    }
  }

  const handleClose = () => {
    if (onClose) {
      onClose()
    }
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  return (
    <>
      {/* Floating button */}
      {!isOpen && (
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 hover:scale-110 transition-transform"
          onClick={handleOpen}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Abrir chat</span>
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[360px] h-[560px] bg-card border border-border rounded-lg shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary/5">
            <div>
              <h3 className="font-heading font-semibold">Asistente Virtual</h3>
              <p className="text-xs text-muted-foreground">Respuestas en español</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="hover:bg-destructive/10">
              <X className="h-4 w-4" />
              <span className="sr-only">Cerrar chat</span>
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message, index) => {
              const nextMessage = messages[index + 1]
              const hasOptions = nextMessage && (nextMessage as any).text === ""

              return (
                <div key={message.id}>
                  <div className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}>
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-2 text-sm whitespace-pre-line",
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                      )}
                    >
                      {message.text}
                    </div>
                  </div>

                  {/* Options buttons */}
                  {hasOptions && message.sender === "bot" && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-2">
                      {/* Get options from the context - this is a simplified version */}
                      {/* In production, you'd store options with the message */}
                    </div>
                  )}
                </div>
              )
            })}

            {/* Quick action buttons - shown after bot messages */}
            {messages.length > 0 && messages[messages.length - 1].sender === "bot" && (
              <div className="flex flex-wrap gap-2">
                {currentFlow === null && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("cotizacion")}>
                      Cotizar proyecto
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("agenda")}>
                      Agendar reunión
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("faq")}>
                      Preguntas
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("contacto")}>
                      Contacto
                    </Button>
                  </>
                )}
                {currentFlow === "faq" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("faq_servicios")}>
                      Servicios
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("faq_tiempo")}>
                      Tiempos
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("faq_proceso")}>
                      Proceso
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("faq_startups")}>
                      Startups
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("menu")}>
                      Menú
                    </Button>
                  </>
                )}
                {currentFlow === "agenda" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("open_calendar")}>
                      Abrir calendario
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("menu")}>
                      Volver
                    </Button>
                  </>
                )}
                {currentFlow === "contacto" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("whatsapp")}>
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("email")}>
                      Email
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("agenda")}>
                      Agendar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("menu")}>
                      Menú
                    </Button>
                  </>
                )}
                {currentFlow === "cotizacion" && quoteStep === "moneda" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("USD")}>
                      USD (Dólares)
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("ARS")}>
                      ARS (Pesos)
                    </Button>
                  </>
                )}
                {currentFlow === "cotizacion" && quoteStep === "tipo" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("ecommerce")}>
                      Ecommerce
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("automatizacion")}>
                      Automatización
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("ia")}>
                      IA
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("dashboard")}>
                      Dashboard
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("api")}>
                      API
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("otro")}>
                      Otro
                    </Button>
                  </>
                )}
                {currentFlow === "cotizacion" && quoteStep === "urgencia" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("urgente")}>
                      Urgente
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("normal")}>
                      Normal
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("flexible")}>
                      Flexible
                    </Button>
                  </>
                )}
                {currentFlow === "cotizacion" && quoteStep === "presupuesto" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("bajo")}>
                      {"< $5k"}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("medio")}>
                      $5k-15k
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("alto")}>
                      $15k-30k
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("premium")}>
                      $30k+
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("no-seguro")}>
                      No seguro
                    </Button>
                  </>
                )}
                {quoteStep === "resumen" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("agenda")}>
                      Agendar
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("whatsapp")}>
                      WhatsApp
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleOptionClick("menu")}>
                      Menú
                    </Button>
                  </>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {currentFlow === "cotizacion" && ["nombre", "email"].includes(quoteStep) && (
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={quoteStep === "nombre" ? "Tu nombre..." : "tu@email.com"}
                  className="flex-1"
                />
                <Button size="icon" onClick={handleSend}>
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Enviar</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}
