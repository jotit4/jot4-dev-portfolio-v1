"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const contactSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  empresa: z.string().optional(),
  mensaje: z.string().min(20, "El mensaje debe tener al menos 20 caracteres").max(2000, "Máximo 2000 caracteres"),
  fuente: z.enum(["google", "linkedin", "referido", "instagram", "otro"]),
  honeypot: z.string().max(0),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitTime] = useState(Date.now())
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      honeypot: "",
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    // Anti-spam: tiempo mínimo de envío (3 segundos)
    const timeDiff = Date.now() - submitTime
    if (timeDiff < 3000) {
      toast({
        title: "Error",
        description: "Por favor, completá el formulario con más cuidado.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (result.ok) {
        setIsSuccess(true)
        reset()
        toast({
          title: "¡Mensaje enviado!",
          description: "Te responderé en menos de 24 horas.",
        })

        // Track analytics event
        if (typeof window !== "undefined" && (window as any).plausible) {
          ;(window as any).plausible("lead_created", {
            props: { source: data.fuente },
          })
        }

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error(result.error || "Error al enviar el mensaje")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Hubo un problema al enviar el mensaje. Intentá de nuevo o escribime por WhatsApp.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-2xl">Enviame un mensaje</CardTitle>
        <CardDescription>Completá el formulario y te respondo a la brevedad</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Honeypot field - hidden from users */}
          <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="space-y-2">
            <Label htmlFor="nombre">
              Nombre <span className="text-destructive">*</span>
            </Label>
            <Input id="nombre" {...register("nombre")} placeholder="Tu nombre" />
            {errors.nombre && <p className="text-sm text-destructive">{errors.nombre.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-destructive">*</span>
            </Label>
            <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="empresa">Empresa (opcional)</Label>
            <Input id="empresa" {...register("empresa")} placeholder="Nombre de tu empresa" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuente">
              ¿Cómo me conociste? <span className="text-destructive">*</span>
            </Label>
            <Select onValueChange={(value) => setValue("fuente", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="referido">Referido</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
            {errors.fuente && <p className="text-sm text-destructive">{errors.fuente.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">
              Mensaje <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="mensaje"
              {...register("mensaje")}
              placeholder="Contame sobre tu proyecto..."
              rows={6}
              className="resize-none"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{errors.mensaje?.message || "Mínimo 20 caracteres"}</span>
              <span>{watch("mensaje")?.length || 0} / 2000</span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || isSuccess}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSuccess && <CheckCircle2 className="mr-2 h-4 w-4" />}
            {isSuccess ? "¡Mensaje enviado!" : isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
