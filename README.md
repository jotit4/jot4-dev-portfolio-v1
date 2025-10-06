# JOT4.DEV - Portfolio Profesional

Portfolio de desarrollador fullstack y especialista en IA, construido con Next.js 14, TypeScript, Tailwind CSS y shadcn/ui.

## 🚀 Características

- ✅ Diseño responsive mobile-first
- ✅ Modo claro/oscuro
- ✅ Animaciones con Framer Motion
- ✅ Formulario de contacto con validación Zod
- ✅ Chatbot de leads interactivo
- ✅ Portfolio filtrable por categorías
- ✅ Integración con WhatsApp y Google Calendar
- ✅ Integración con Google Sheets para captura de leads
- ✅ SEO optimizado con sitemap y robots.txt
- ✅ Rate limiting y anti-spam
- ✅ Accesibilidad WCAG AA

## 📋 Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **Animaciones**: Framer Motion
- **Validación**: Zod + React Hook Form
- **Iconos**: Lucide React + React Icons
- **Tipografías**: Inter, Space Grotesk, JetBrains Mono

## 🛠️ Instalación

### Opción 1: Usando shadcn CLI (Recomendado)

\`\`\`bash
npx shadcn@latest init
\`\`\`

### Opción 2: Instalación manual

\`\`\`bash
# Clonar el repositorio
git clone https://github.com/usuario/jot4-portfolio.git
cd jot4-portfolio

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus valores

# Ejecutar en desarrollo
npm run dev
\`\`\`

## 🔧 Configuración

### Variables de Entorno

Configurá las siguientes variables en `.env.local`:

\`\`\`env
NEXT_PUBLIC_PHONE_E164=+5492610000000
NEXT_PUBLIC_CALENDAR_URL=https://calendar.app.google/hzEWd2YZ5AstmDNKA
RESEND_API_KEY=tu_api_key
LEADS_EMAIL_TO=jot4.dev@gmail.com
GOOGLE_SHEETS_WEBHOOK_URL=tu_webhook_url
\`\`\`

#### Cómo obtener cada variable:

1. **NEXT_PUBLIC_PHONE_E164**: Tu número de WhatsApp en formato internacional
   - Ejemplo: `+5491123456789` (Argentina)
   - Formato: `+[código país][número sin 0 inicial]`

2. **NEXT_PUBLIC_CALENDAR_URL**: URL de tu Google Calendar para agendar citas
   - Ve a [Google Calendar](https://calendar.google.com)
   - Crea una página de citas (Appointment Schedule)
   - Copia la URL pública de tu página de citas
   - Ejemplo: `https://calendar.app.google/hzEWd2YZ5AstmDNKA`

3. **RESEND_API_KEY**: API key de Resend para envío de emails
   - Registrate en [resend.com](https://resend.com)
   - Ve a "API Keys" y crea una nueva
   - Copia la key (solo se muestra una vez)
   - **Nota**: El email se enviará desde `onboarding@resend.dev` con reply-to configurado a tu email

4. **LEADS_EMAIL_TO**: Tu email donde recibirás los leads
   - Ejemplo: `jot4.dev@gmail.com`

5. **GOOGLE_SHEETS_WEBHOOK_URL** (Opcional): URL del webhook de Google Sheets
   - Sigue las instrucciones detalladas en la sección "Integración con Google Sheets" más abajo

### Integración con Google Sheets

Para que los datos del formulario de contacto se guarden automáticamente en Google Sheets, seguí estos pasos:

#### Paso 1: Preparar la Hoja de Cálculo

1. Abrí tu hoja de cálculo: https://docs.google.com/spreadsheets/d/1ZJsItK6RMXRO-hUNCxKAsDSJ0qw5DDzjI8gkPmW-TyU/edit
2. Asegurate de que la primera fila tenga estos encabezados exactos:
   - `Timestamp` | `Nombre` | `Email` | `Empresa` | `Mensaje` | `Presupuesto` | `Fuente`

#### Paso 2: Crear el Script de Apps Script

1. En tu hoja de cálculo, andá a **Extensiones** → **Apps Script**
2. Borrá el código por defecto y pegá este código:

\`\`\`javascript
function doPost(e) {
  try {
    // Obtener la hoja activa
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parsear los datos recibidos
    var data = JSON.parse(e.postData.contents);
    
    // Crear una nueva fila con los datos
    var newRow = [
      data.timestamp || new Date().toISOString(),
      data.nombre || '',
      data.email || '',
      data.empresa || '',
      data.mensaje || '',
      data.presupuesto_estimado || '',
      data.fuente || ''
    ];
    
    // Agregar la fila a la hoja
    sheet.appendRow(newRow);
    
    // Responder con éxito
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Datos guardados correctamente'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Responder con error
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
\`\`\`

3. Guardá el script con un nombre (ej: "Webhook Formulario Contacto")

#### Paso 3: Desplegar como Web App

1. En Apps Script, hacé clic en **Implementar** → **Nueva implementación**
2. Seleccioná el tipo: **Aplicación web**
3. Configurá:
   - **Descripción**: "Webhook para formulario de contacto"
   - **Ejecutar como**: "Yo" (tu cuenta)
   - **Quién tiene acceso**: "Cualquier usuario" (importante para que funcione)
4. Hacé clic en **Implementar**
5. Autorizá los permisos cuando te lo pida
6. **Copiá la URL de la aplicación web** que aparece (algo como: `https://script.google.com/macros/s/AKfycby.../exec`)

#### Paso 4: Configurar la Variable de Entorno

1. En tu proyecto de Vercel, andá a **Settings** → **Environment Variables**
2. Agregá una nueva variable:
   - **Name**: `GOOGLE_SHEETS_WEBHOOK_URL`
   - **Value**: La URL que copiaste en el paso anterior
3. Guardá y redeploy tu aplicación

#### Paso 5: Probar la Integración

1. Enviá un mensaje de prueba desde tu formulario de contacto
2. Verificá que aparezca una nueva fila en tu hoja de cálculo
3. Si no funciona, revisá los logs en Apps Script: **Ejecuciones** para ver errores

**Nota**: Cada vez que envíes un formulario, los datos se guardarán automáticamente en Google Sheets además de enviarse por email.

### Contenido

El contenido del sitio se gestiona mediante archivos JSON en `/content`:

- `hero.json` - Textos del hero y chips de tecnologías
- `services.json` - Servicios ofrecidos
- `projects.json` - Portfolio de proyectos
- `testimonials.json` - Testimonios de clientes

## 📦 Build y Deploy

\`\`\`bash
# Build de producción
npm run build

# Ejecutar build localmente
npm start
\`\`\`

### Deploy en Vercel

1. Conectá tu repositorio en Vercel
2. Configurá las variables de entorno
3. Deploy automático en cada push

## 📊 Performance

- Lighthouse Score: 90+/95+/95+/95+
- P95 TTFB: < 0.8s
- P95 Carga completa: < 2.5s
- CLS: < 0.1

## 🔒 Seguridad

- Rate limiting: 10 req/min por IP
- Honeypot anti-spam en formularios
- Validación de datos con Zod
- No PII en logs
- Headers de seguridad configurados

## 📱 Responsive

- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Wide: 1280px+

## ♿ Accesibilidad

- Navegación por teclado completa
- Contraste AA (WCAG 2.1)
- Landmarks semánticos
- Alt text en imágenes
- Focus visible
- Respeta prefers-reduced-motion

## 📄 Licencia

© 2025 JOT4.DEV - Todos los derechos reservados

## 📞 Contacto

- Email: jot4.dev@gmail.com
- WhatsApp: [Link]
- LinkedIn: [Link]
- GitHub: [Link]
