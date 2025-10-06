export const PRICING_CONFIG = {
  // Rangos de presupuesto por moneda
  ranges: {
    USD: {
      low: "$5k",
      medium: "$15k",
      high: "$30k",
    },
    ARS: {
      low: "$5M",
      medium: "$15M",
      high: "$30M",
    },
  },

  // Precios base por tipo de proyecto (en USD y ARS)
  basePrice: {
    ecommerce: {
      USD: { min: 8000, max: 25000 },
      ARS: { min: 8000000, max: 25000000 },
      description: "Tienda online completa con carrito, pagos y admin",
    },
    automatizacion: {
      USD: { min: 5000, max: 20000 },
      ARS: { min: 5000000, max: 20000000 },
      description: "Automatización de procesos y workflows",
    },
    ia: {
      USD: { min: 10000, max: 35000 },
      ARS: { min: 10000000, max: 35000000 },
      description: "Soluciones con IA, chatbots, RAG, fine-tuning",
    },
    dashboard: {
      USD: { min: 6000, max: 18000 },
      ARS: { min: 6000000, max: 18000000 },
      description: "Dashboard con analytics y visualización de datos",
    },
    api: {
      USD: { min: 4000, max: 15000 },
      ARS: { min: 4000000, max: 15000000 },
      description: "API REST/GraphQL con documentación",
    },
    otro: {
      USD: { min: 5000, max: 30000 },
      ARS: { min: 5000000, max: 30000000 },
      description: "Proyecto personalizado según necesidades",
    },
  },
}

/**
 * Obtiene una estimación de precio basada en el tipo de proyecto y moneda
 */
export function getPriceEstimate(projectType: string, currency: "USD" | "ARS"): string {
  const pricing = PRICING_CONFIG.basePrice[projectType as keyof typeof PRICING_CONFIG.basePrice]

  if (!pricing) {
    return currency === "USD"
      ? "Entre $5,000 - $30,000 USD (según complejidad)"
      : "Entre $5M - $30M ARS (según complejidad)"
  }

  const { min, max } = pricing[currency]
  const currencySymbol = currency === "USD" ? "$" : "$"
  const formattedMin = currency === "USD" ? min.toLocaleString("en-US") : min.toLocaleString("es-AR")
  const formattedMax = currency === "USD" ? max.toLocaleString("en-US") : max.toLocaleString("es-AR")

  return `${currencySymbol}${formattedMin} - ${currencySymbol}${formattedMax} ${currency}`
}

/**
 * Obtiene la descripción de un tipo de proyecto
 */
export function getProjectDescription(projectType: string): string {
  const pricing = PRICING_CONFIG.basePrice[projectType as keyof typeof PRICING_CONFIG.basePrice]
  return pricing?.description || "Proyecto personalizado"
}
