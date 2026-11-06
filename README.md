# DeployLab — de localhost a producción

Plataforma educativa e interactiva sobre **React + Vite + Vercel + Supabase**, lista para publicar en **GitHub Pages**.

## Incluye

- 12 capítulos con instrucciones detalladas y fuentes oficiales (noviembre de 2026).
- Recorrido de 5 fases con paneles de simulación (imágenes de interfaz ficticias, no capturas oficiales).
- Pasos centrados en React + Vite + TypeScript, SQL de muestra con RLS, permisos y checklist de verificación.
- Buscador, filtros, seguimiento de progreso en `localStorage`, bloques copiables y quiz autocorregible.
- Ilustraciones SVG originales, diseño responsive y animación contenida con **React Bits**.
- Botón para descargar el PDF completo directamente desde el sitio publicado.
- `ejemplo-vite-supabase/`: app React + Vite + TypeScript independiente para practicar con datos de demostración.
- `vercel.json` listo para el caso de React Router (recarga de rutas internas en Vercel).

**Importante:** los proyectos de los alumnos usan **React + Vite**. El uso de **Next.js en esta carpeta es únicamente para construir la plataforma educativa** como exportación estática a GitHub Pages.

## Inicio local

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Compilar para GitHub Pages

El repositorio contiene `next.config.ts` con `output: 'export'`. No usa API Routes, Server Actions ni autenticación que requiera un servidor.

```bash
# Para un repositorio GitHub llamado deploylab-guia:
REPO_NAME=deploylab-guia NEXT_PUBLIC_BASE_PATH=/deploylab-guia npm run build
# Windows PowerShell:
$env:REPO_NAME="deploylab-guia"; $env:NEXT_PUBLIC_BASE_PATH="/deploylab-guia"; npm run build
```

El resultado estará en `out/`. Para ejecutar en raíz en local: `npm run build` (sin las dos variables).

### Publicar automáticamente

1. Crea un repositorio **de proyecto** con un nombre como `deploylab-guia`.
2. Sube el contenido de esta carpeta a `main` (incluyendo `.github/workflows/deploy-pages.yml`).
3. En GitHub entra a **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Abre **Actions** y verifica el flujo `Publicar DeployLab en GitHub Pages`.
5. Visita `https://TUUSUARIO.github.io/deploylab-guia/`.

El workflow detecta automáticamente si publicas en un **sitio de proyecto** (`usuario.github.io/nombre-repo/`) o en el repositorio especial `usuario.github.io` (sitio raíz) y configura el prefijo correcto en cada caso.

**Recomendación:** cuando puedas acceder a npm, ejecuta `npm install` y agrega `package-lock.json` al repositorio para permitir un futuro cambio del workflow a `npm ci`. Este ZIP distribuye código fuente, no incluye `node_modules` ni lockfile.

## Usar el ejemplo para el despliegue verdadero

La guía **se publica en GitHub Pages**, pero el ejemplo dentro de `ejemplo-vite-supabase/` se despliega **en Vercel** y consulta **Supabase**. Lee su propio README y corre SQL en un proyecto de prueba aislado.

## React Bits

Se integraron componentes oficiales desde `react-bits-main.zip`: `ShinyText`, `AnimatedContent`, `SpotlightCard`, `ClickSpark`, `GradientText`, `TextType`, `StarBorder`, `GlareHover`, `Magnet` y `FadeContent`. No se copia el repositorio entero, que contiene recursos de gran peso. La UI respeta reducción de movimiento. Código de React Bits sujeto a sus propias condiciones: https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md .

## Seguridad y límites

- Nunca guardes `sb_secret_...`, `service_role`, contraseñas de PostgreSQL o credenciales privadas en código frontend.
- La `publishable key` es apta para cliente; el control real de acceso lo hacen RLS **y** SQL GRANT.
- Los datos del ejemplo son ficticios y públicos. No uses `using (true)` para una tabla con información privada.
- La simulación es educativa: no conecta ni modifica cuentas reales.
- Los avances se almacenan **solo** en el navegador del visitante y no se envían a terceros.
- Las interfaces de Vercel/Supabase cambian con el tiempo; consulta los links oficiales incluidos en cada lección.

## Documentación oficial

- Vercel: https://vercel.com/docs/git
- Vercel Env vars: https://vercel.com/docs/environment-variables/managing-environment-variables
- Supabase React: https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
- Supabase Keys: https://supabase.com/docs/guides/getting-started/api-keys
- Supabase RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Redirects: https://supabase.com/docs/guides/auth/redirect-urls
- Next.js static export: https://nextjs.org/docs/app/guides/static-exports
- GitHub Pages Actions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
