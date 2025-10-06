import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const leadSchema = z.object({
  nombre: z.string().min(2),
  email: z.string().email(),
  empresa: z.string().optional(),
  mensaje: z.string().min(20).max(2000),
  fuente: z.enum(["google", "linkedin", "referido", "instagram", "otro"]),
  honeypot: z.string().max(0),
})

// Rate limiting simple (en producción usar Upstash Rate Limit o similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minuto
    return true
  }

  if (limit.count >= 10) {
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { ok: false, error: "Demasiadas solicitudes. Intentá de nuevo en un minuto." },
        { status: 429 },
      )
    }

    const body = await request.json()

    // Validación con Zod
    const validatedData = leadSchema.parse(body)

    // Anti-spam: honeypot
    if (validatedData.honeypot) {
      console.log("[v0] Honeypot triggered, potential spam")
      return NextResponse.json({ ok: true }) // Responder OK pero no procesar
    }

    // Log del lead (en producción, guardar en base de datos)
    console.log("[v0] New lead received:", {
      nombre: validatedData.nombre,
      email: validatedData.email,
      empresa: validatedData.empresa,
      fuente: validatedData.fuente,
      timestamp: new Date().toISOString(),
    })

    // Enviar email (usando Resend o similar)
    if (process.env.RESEND_API_KEY && process.env.LEADS_EMAIL_TO) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "JOT4.DEV <onboarding@resend.dev>",
            to: process.env.LEADS_EMAIL_TO,
            reply_to: "jot4.dev@gmail.com",
            subject: `Nuevo lead: ${validatedData.nombre}`,
            html: `
              <h2>Nuevo contacto desde el sitio web</h2>
              <p><strong>Nombre:</strong> ${validatedData.nombre}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              ${validatedData.empresa ? `<p><strong>Empresa:</strong> ${validatedData.empresa}</p>` : ""}
              <p><strong>Fuente:</strong> ${validatedData.fuente}</p>
              <p><strong>Mensaje:</strong></p>
              <p>${validatedData.mensaje}</p>
            `,
          }),
        })

        if (!emailResponse.ok) {
          const errorText = await emailResponse.text()
          console.error("[v0] Error sending email:", errorText)
        }
      } catch (emailError) {
        console.error("[v0] Error sending email:", emailError)
      }
    }

    if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        const sheetsResponse = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          redirect: "follow",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            nombre: validatedData.nombre,
            email: validatedData.email,
            empresa: validatedData.empresa || "",
            mensaje: validatedData.mensaje,
            fuente: validatedData.fuente,
          }),
        })

        if (!sheetsResponse.ok) {
          console.error("[v0] Error sending to Google Sheets:", await sheetsResponse.text())
        } else {
          console.log("[v0] Successfully sent to Google Sheets")
        }
      } catch (sheetsError) {
        console.error("[v0] Error sending to Google Sheets:", sheetsError)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[v0] Error processing lead:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: "Datos inválidos",
          details: error.errors,
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        ok: false,
        error: "Error al procesar la solicitud",
      },
      { status: 500 },
    )
  }
}
