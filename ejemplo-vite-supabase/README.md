# Ejemplo desplegable en Vercel (Vite + React + Supabase)

1. Abre Supabase SQL Editor, ejecuta `sql/recursos_demo.sql` en un proyecto de prueba sin datos privados.
2. Copia `.env.example` a `.env.local`, rellena URL y `sb_publishable_...` del panel Supabase.
3. Ejecuta `npm install`, `npm run dev` y `npm run build`.
4. Sube esta carpeta como repositorio GitHub independiente, o en Vercel configúrala como `Root Directory` si mantienes el monorepo.
5. En Vercel: Framework = Vite, Build Command = `npm run build`, Output Directory = `dist`.
6. Agrega las mismas variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` en Environment Variables → Production.
7. Pulsa Deploy. Deberían aparecer los dos registros de demostración. No uses secret keys ni datos reales para esta prueba.

**Nota:** la clave publishable es visible en el navegador por diseño; la protección efectiva depende de permisos mínimos y Row Level Security.

Si agregas React Router más adelante, deja `vercel.json` incluido: resuelve la recarga de rutas internas en una SPA Vite. En proyectos multi-página o con funciones propias, ajusta esta regla a su arquitectura.
