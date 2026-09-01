# Antisilla — Landing del lead magnet

Landing de The Health Dealer que explica el mecanismo del sedentarismo doble (silla trabajo + silla sofá), entrega el protocolo de 5 puntos para cortar la señal, diagnostica el nivel de acumulación y cualifica leads hacia una sesión de valoración por WhatsApp.

Stack: Next.js 14 · TypeScript · Tailwind · Framer Motion · Meta Pixel.
Paleta y tipografía: sistema oficial de The Health Dealer (Cream / Deep Blue / Carbon · Spectral + Lato).

---

## Deploy paso a paso (GitHub + Vercel)

### 1. Crear el repo en GitHub

1. Ve a **github.com/new**
2. Repository name: `antisilla-landing`
3. Private (recomendado)
4. **NO marques** ninguna casilla (Add README, .gitignore, license)
5. Create repository

### 2. Subir el proyecto

Descomprime el zip. Abre la carpeta `antisilla-landing/` en Finder/Explorer.

**Activa archivos ocultos antes de arrastrar:**
- Mac: `Cmd + Shift + .`
- Windows: pestaña Vista → "Elementos ocultos"

En GitHub, click en **"uploading an existing file"** → arrastra **todo el contenido** de dentro de la carpeta (no la carpeta entera, sino lo de dentro): archivos sueltos + carpetas `app/`, `components/`, `lib/`.

Commit changes con mensaje `initial commit`.

### 3. Verifica que subieron los archivos ocultos

En la raíz del repo tienen que aparecer `.gitignore` y `.env.local.example`. Si no los ves, no activaste los ocultos: repite el upload con esos dos.

### 4. Conecta Vercel

1. vercel.com/signup → Continue with GitHub
2. Dashboard → Add New → Project → busca `antisilla-landing` → Import
3. Framework Preset: Next.js (auto)
4. Root Directory: `./` (default)
5. En Environment Variables añade las tres del apartado siguiente
6. Deploy

En 1-2 min tienes URL en producción.

### 5. Variables de entorno en Vercel

En **Settings → Environment Variables**:

| Nombre | Valor | Aplicar a |
|---|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | Tu Pixel ID (Business Manager → Events Manager) | Production, Preview, Development |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `34675975982` | Production, Preview, Development |
| `NEXT_PUBLIC_PLAZAS_DISPONIBLES` | `5` | Production, Preview, Development |

**Después de cambiar cualquier variable:** ve a **Deployments** → ⋯ del último deploy → **Redeploy**.

---

## Editar copy sin tocar código

Toda la copy vive en **`/lib/config.ts`**:

- `hero` — sección 1
- `mecanismo` — sección 2 (párrafos + tabs animados)
- `protocolo` — sección 3 (5 bloques con descripciones y checklists)
- `bloque1..4` — preguntas del score
- `revealQuiereSolucionar` — mensajes según nivel (leve/media/alta)
- `revealNoQuiere` — mensaje si el usuario elige "me da igual seguir así"
- `cta` — bloque de reserva de sesión
- `buildWhatsappMessage` — plantilla del mensaje pre-rellenado

Edita el archivo directamente en la web de GitHub (icono del lápiz) y commit. Vercel redespliega solo en ~1 min.

## Actualizar plazas semanalmente

1. Vercel → Settings → Environment Variables
2. Edita `NEXT_PUBLIC_PLAZAS_DISPONIBLES` → guarda
3. Deployments → ⋯ del último → Redeploy

Si el valor es `0`, el botón de WhatsApp se oculta y aparece "Plazas agotadas este mes".

---

## Eventos Meta Pixel disparados

- `PageView` (auto)
- `AntisillaLead` — al capturar email
- `ScoreStarted` — al ver el bloque 1 del diagnóstico
- `ScoreCompleted` — al terminar (payload: `{ nivel, quiereSolucionar }`)
- `ScoreQualifiedLead` — solo si `quiereSolucionar === true`
- `WhatsAppClick` — al pulsar Reservar sesión

## Estructura

```
antisilla-landing/
├── app/
│   ├── layout.tsx          Fuentes Google + Meta Pixel
│   ├── page.tsx            Orquestador cliente
│   └── globals.css         Tailwind + animaciones 4x4
├── components/
│   ├── Hero.tsx            Sección 1
│   ├── Mecanismo.tsx       Sección 2 con tabs animados
│   ├── Protocolo.tsx       Sección 3 con 5 cards acordeón
│   ├── Score.tsx           Sección 4 (4 bloques)
│   ├── Reveal.tsx          Sección 5 + CTA WhatsApp
│   ├── ContadorPlazas.tsx  Widget plazas
│   ├── LockedOverlay.tsx   Gate del email
│   └── animations/
│       └── Anim01..05.tsx  5 animaciones abstractas 4x4
├── lib/
│   ├── config.ts           TODA la copy + tipos
│   ├── score-logic.ts      Cálculo del nivel
│   └── pixel.ts            Wrapper eventos
└── ...configs
```

## Nota sobre los emails capturados

En esta v1 los emails se guardan solo en localStorage del cliente. Sin backend. Cuando quieras integrar con ActiveCampaign / Systeme.io / Make, dímelo y añadimos el endpoint.
