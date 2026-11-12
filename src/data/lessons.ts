import type { ScreenId } from '@/components/Screens';
export type Snippet = {label:string; language:string; code:string; note?:string};
export type Step = {title:string; body:string; details?:string[]; tip?:string; warning?:string; screen?:ScreenId};
export type Lesson = {id:string; tag:string; title:string; lead:string; mins:number; kind:'Inicio'|'Preparación'|'Supabase'|'Vercel'|'Producción'|'Extra'; icon:string; illustration:string; steps:Step[]; snippets?:Snippet[]; verify:string[]; resources?:{title:string;url:string}[]};
export const lessons: Lesson[] = [
  {
    id:'mapa',tag:'01 · ORIENTACIÓN',title:'Entiende qué se despliega y dónde',lead:'Antes de pulsar Deploy, separa frontend, hosting, repositorio y base de datos. No son la misma cosa.',mins:5,kind:'Inicio',icon:'route',illustration:'architecture',
    steps:[
      {title:'Identifica las cuatro piezas',body:'Tu computadora ejecuta la app durante el desarrollo. GitHub guarda el código y su historial. Vercel compila y sirve el frontend. Supabase ofrece PostgreSQL, autenticación, almacenamiento y una API.',details:['Frontend: interfaz construida con React + Vite que ve el usuario.','GitHub: repositorio remoto, no es una base de datos.','Vercel: crea un deployment y lo publica en un dominio HTTPS.','Supabase: backend administrado, NO se despliega dentro de Vercel.']},
      {title:'Recorre una petición real',body:'El visitante abre https://mi-app.vercel.app, descarga los archivos del frontend, y su navegador utiliza el SDK de Supabase para consultar filas autorizadas por RLS.',details:['La clave publishable identifica la aplicación, no concede acceso ilimitado.','Las políticas RLS deciden qué datos puede leer o modificar cada rol.','Si el proyecto tiene un servidor propio, no se despliega automáticamente por publicar el frontend.']},
      {title:'Elige tu escenario',body:'Este recorrido es para aplicaciones React (preferentemente con Vite). La plataforma educativa que estás leyendo se creó con Next.js, pero NO necesitas Next.js para seguir los ejercicios.',warning:'GitHub Pages sirve esta guía estática. No reemplaza a Vercel como plataforma donde se desplegará el frontend del ejercicio.'}
    ],verify:['Sé distinguir frontend, repositorio, hosting y backend.','Puedo explicar por qué el navegador se comunica con Supabase.'],resources:[{title:'Vercel: Deploying Git Repositories',url:'https://vercel.com/docs/git'},{title:'Supabase: Quickstart React',url:'https://supabase.com/docs/guides/getting-started/quickstarts/reactjs'}]
  },
  {
    id:'requisitos',tag:'02 · PREPARAR',title:'Prepara tu proyecto local',lead:'Una compilación local sin errores ahorra la mayoría de los problemas al desplegar.',mins:7,kind:'Preparación',icon:'terminal',illustration:'editor',
    steps:[
      {title:'Comprueba que tienes lo necesario',body:'Necesitas Node.js compatible con tu proyecto React, Git, cuentas en GitHub, Vercel y Supabase. Identifica la carpeta que contiene package.json.'},
      {title:'Si aún no tienes un proyecto React, créalo con Vite',body:'Abre la terminal, ejecuta npm create vite@latest mi-proyecto -- --template react-ts, entra a la carpeta con cd mi-proyecto, ejecuta npm install y npm run dev. Si ya tienes tu proyecto React, omite este paso.',details:['react-ts genera React con TypeScript.','npm run dev abre normalmente http://localhost:5173.','Tu proyecto existente puede utilizar otra herramienta; verifica sus scripts en package.json.']},
      {title:'Instala dependencias',body:'Abre la terminal en la carpeta del proyecto (donde existe package.json) y ejecuta npm install. Revisa qué comando de construcción define scripts.build.',tip:'Si tienes package-lock.json, usa npm ci en CI para instalaciones reproducibles.'},
      {title:'Verifica que el frontend compila',body:'Ejecuta npm run build. En React con Vite se creará dist/, que contendrá los archivos de producción que publicará Vercel.',screen:'terminal-build',details:['Revisa errores TypeScript.','Comprueba rutas de importación y mayúsculas/minúsculas.','Evita archivos pesados innecesarios o rutas absolutas a C:\\Users\\...']},
      {title:'Protege las variables locales',body:'Crea .env.local para desarrollo y asegúrate de que esté ignorado por Git. Nunca subas contraseñas, cadenas privadas de conexión ni claves secret/service_role.',warning:'Las variables VITE_ se incorporan al JavaScript del navegador; nunca incluyas secretos. Solo URL y clave publishable de Supabase.'}
    ],snippets:[{label:'Crear React + Vite + TypeScript (si no tienes proyecto)',language:'bash',code:'npm create vite@latest mi-proyecto -- --template react-ts\ncd mi-proyecto\nnpm install\nnpm run dev'},{label:'Verificar tu proyecto React existente',language:'bash',code:'node --version\nnpm --version\ngit --version\nnpm install\nnpm run build\n# Debe generarse dist/'},{label:'.gitignore',language:'gitignore',code:'node_modules/\n.env\n.env.local\n.env.*.local\ndist/\n.next/\nout/'}],verify:['npm run build termina correctamente.','No hay secretos guardados en el repositorio.']
  },
  {
    id:'github',tag:'03 · REPOSITORIO',title:'Publica el código en GitHub',lead:'Vercel importará el repositorio y volverá a desplegar cuando actualices la rama de producción.',mins:8,kind:'Preparación',icon:'github',illustration:'github',
    steps:[
      {title:'Crea un repositorio',body:'Ve a github.com → New repository. Asigna un nombre sencillo, por ejemplo mi-primer-frontend. Puede ser público o privado. No marques README, .gitignore ni licencia. No subas .env.local.',screen:'github-new'},
      {title:'Inicializa y registra tus archivos',body:'Desde la terminal del proyecto usa git init si todavía no hay repositorio. Revisa git status y crea un commit.',details:['git add . incluye archivos no ignorados.','git commit guarda el estado actual.','git branch -M main define la rama de producción habitual.']},
      {title:'Conecta el remoto y envía el código',body:'Copia la dirección HTTPS de tu repositorio nuevo. Sustituye USUARIO y REPOSITORIO en los comandos. Si tu repo ya tiene historial, adapta el flujo y no reinicialices.',warning:'Si GitHub rechaza el push por historial divergente, no utilices --force sin entender la situación.'},
      {title:'Comprueba GitHub',body:'Abre la URL del repositorio y confirma que ves package.json, src/ y el historial del commit. Tu archivo .env.local no debe aparecer.'}
    ],snippets:[{label:'Git / terminal',language:'bash',code:'git init\ngit add .\ngit commit -m "Preparar frontend para despliegue"\ngit branch -M main\ngit remote add origin https://github.com/USUARIO/REPOSITORIO.git\ngit push -u origin main'}],verify:['El repositorio contiene el código actualizado.','El archivo .env.local NO aparece en GitHub.'],resources:[{title:'GitHub: crear repositorio',url:'https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository'}]
  },
  {
    id:'supabase',tag:'04 · BACKEND',title:'Crea un proyecto en Supabase',lead:'Obtendrás un servidor PostgreSQL y las dos piezas de conexión públicas que necesita tu frontend.',mins:9,kind:'Supabase',icon:'database',illustration:'supabase',
    steps:[
      {title:'Inicia sesión y crea un proyecto',body:'Abre supabase.com/dashboard → New project. Selecciona tu organización y completa nombre, contraseña de la base de datos y región cercana a tus usuarios.',screen:'supabase-new',details:['Usa una contraseña fuerte y guárdala de forma segura.','La región influye en la latencia.','Espera que la creación concluya antes de configurar tablas.']},
      {title:'Ubica la URL del proyecto',body:'En el panel Connect o en Project Settings encontrarás la URL con formato https://xxxxxxxx.supabase.co. Copia únicamente la URL pública.'},
      {title:'Localiza la clave publishable',body:'En Connect / API Keys identifica la clave que comienza por sb_publishable_. Esa es la clave destinada a aplicaciones de navegador.',screen:'supabase-keys',tip:'Proyectos antiguos pueden mostrar una clave anon legacy. Para proyectos nuevos, utiliza preferentemente publishable.'},
      {title:'Distingue claves públicas y secretas',body:'publishable se puede integrar al frontend; secret (sb_secret_...) o service_role son exclusivamente para servidores confiables, nunca para un bundle frontend.',warning:'La publishable key NO reemplaza el control de acceso. Debes configurar RLS y permisos SQL.'}
    ],verify:['Tengo identificadas URL y publishable key.','No he copiado ninguna secret key al frontend.'],resources:[{title:'Supabase: API Keys',url:'https://supabase.com/docs/guides/getting-started/api-keys'}]
  },
  {
    id:'rls',tag:'05 · SEGURIDAD',title:'Crea una tabla de prueba y configura RLS',lead:'Prepara una consulta reproducible que sea segura: datos demo públicos, acceso de solo lectura y denegación de escritura anónima.',mins:12,kind:'Supabase',icon:'shield-check',illustration:'security',
    steps:[
      {title:'Abre SQL Editor',body:'En Supabase selecciona SQL Editor → New query. Crearás una tabla de información de prueba, no una tabla de datos personales.'},
      {title:'Ejecuta el SQL de ejemplo',body:'Copia el bloque SQL completo y pulsa Run. Primero crea la tabla public.recursos_demo y dos registros; después activa RLS y revoca permisos generales a los roles de navegador.',screen:'supabase-sql',details:['GRANT SELECT permite consultar la tabla.','La política SELECT para anon habilita la lectura de esta tabla pública de demostración.','INSERT, UPDATE y DELETE no se habilitan para el rol anon.']},
      {title:'Confirma los datos',body:'Ve a Table Editor → recursos_demo. Debes ver dos registros. Esta prueba usa deliberadamente datos públicos e inocuos.',screen:'supabase-table',tip:'Si al crear el proyecto desactivaste la Data API, la app no podrá consultar la tabla. Actívala en Integrations → Data API y expón el esquema public.'},
      {title:'Entiende la diferencia entre permiso y política',body:'Un GRANT permite ejecutar una operación. Una política RLS restringe las filas disponibles para esa operación. En producción debes revisar ambas capas.',warning:'No copies una política USING (true) a tablas con información privada. Esta política solo es adecuada para recursos deliberadamente públicos.'}
    ],snippets:[{label:'SQL seguro para demo pública',language:'sql',code:`create table if not exists public.recursos_demo (
  id bigint generated always as identity primary key,
  titulo text not null,
  descripcion text not null
);

insert into public.recursos_demo (titulo, descripcion)
select 'Mi primer deploy', 'Frontend conectado a Supabase'
where not exists (select 1 from public.recursos_demo where titulo = 'Mi primer deploy');

insert into public.recursos_demo (titulo, descripcion)
select 'Aprendiendo RLS', 'Lectura pública de datos de prueba'
where not exists (select 1 from public.recursos_demo where titulo = 'Aprendiendo RLS');

alter table public.recursos_demo enable row level security;
revoke all on table public.recursos_demo from anon, authenticated;
grant select on table public.recursos_demo to anon;

drop policy if exists "Leer recursos demo publicos" on public.recursos_demo;
create policy "Leer recursos demo publicos"
on public.recursos_demo
for select to anon using (true);` ,note:'Repetible en proyectos nuevos. La consulta WHERE NOT EXISTS evita duplicar los dos títulos de ejemplo.'}],verify:['RLS aparece habilitado.','La tabla solo contiene datos ficticios y públicos.','Los usuarios anónimos solo tienen SELECT.'],resources:[{title:'Supabase: Row Level Security',url:'https://supabase.com/docs/guides/database/postgres/row-level-security'}]
  },
  {
    id:'cliente',tag:'06 · CÓDIGO',title:'Conecta React con Supabase',lead:'Instala la librería oficial, configura variables de entorno locales y haz tu primera lectura de datos.',mins:13,kind:'Supabase',icon:'braces',illustration:'editor',
    steps:[
      {title:'Instala el SDK oficial',body:'En la terminal del frontend ejecuta npm install @supabase/supabase-js. Este paquete crea un cliente para hablar con la API de Supabase.'},
      {title:'Elige tu tipo de aplicación',body:'Utiliza Vite + React: las dos variables públicas comienzan por VITE_. No uses variables de otros frameworks para este ejercicio.',details:['VITE_SUPABASE_URL: URL de tu proyecto Supabase.','VITE_SUPABASE_PUBLISHABLE_KEY: clave que comienza por sb_publishable_.','Las variables VITE_ se exponen al navegador; nunca deben contener secretos.']},
      {title:'Crea .env.local en la raíz',body:'Crea el archivo .env.local al lado de package.json (no dentro de src/) con las dos variables. Usa .env.example como plantilla si existe.',screen:'env-local',warning:'Vite solo lee las variables al arrancar: cada vez que edites .env.local, detén npm run dev con Ctrl + C y vuelve a ejecutarlo.'},
      {title:'Crea el cliente',body:'En src/lib/supabase.ts usa createClient(url, publishableKey). Añade una validación clara si faltan variables para detectar una configuración incorrecta.',tip:'Si TypeScript marca “Property env does not exist on type ImportMeta”, crea src/vite-env.d.ts con la línea /// <reference types="vite/client" />. Sin eso, npm run build falla en Vercel.'},
      {title:'Consulta recursos_demo',body:'Dentro de un componente React carga los registros con supabase.from("recursos_demo").select(...). Muestra también estado de carga y error.'},
      {title:'Prueba el resultado en local',body:'Ejecuta npm run dev y abre la URL local. Debes ver dos títulos de ejemplo provenientes de la base de datos.',screen:'local-result'}
    ],snippets:[{label:'Instalación',language:'bash',code:'npm install @supabase/supabase-js'},{label:'Vite · .env.local',language:'bash',code:'VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REEMPLAZAR'},{label:'Vite · src/lib/supabase.ts',language:'typescript',code:`import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error('Faltan variables de Supabase');
export const supabase = createClient(url, key);`},{label:'React · src/Recursos.tsx',language:'tsx',code:`
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase'; // Ajusta la ruta.

type Recurso = { id: number; titulo: string; descripcion: string };
export default function Recursos() {
  const [datos, setDatos] = useState<Recurso[]>([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    supabase.from('recursos_demo').select('id,titulo,descripcion')
      .then(({ data, error }) => {
        if (error) setError(error.message);
        else setDatos(data ?? []);
        setCargando(false);
      });
  }, []);
  if (cargando) return <p>Cargando datos...</p>;
  if (error) return <p role="alert">Error: {error}</p>;
  return <ul>{datos.map(r => <li key={r.id}>{r.titulo}: {r.descripcion}</li>)}</ul>;
}`}],verify:['La instalación terminó sin errores.','Veo los dos registros en el navegador local.','No aparece secret o service_role en el código.'],resources:[{title:'Supabase: React quickstart',url:'https://supabase.com/docs/guides/getting-started/quickstarts/reactjs'}]
  },
  {
    id:'vercel-importar',tag:'07 · HOSTING',title:'Importa tu repositorio en Vercel',lead:'Conecta GitHub con Vercel y configura correctamente los parámetros del frontend.',mins:9,kind:'Vercel',icon:'cloud-upload',illustration:'vercel',
    steps:[
      {title:'Ingresa en Vercel',body:'Abre vercel.com, inicia sesión y conecta tu cuenta GitHub si es la primera vez. Autoriza el repositorio que quieres desplegar.'},
      {title:'Crea un proyecto nuevo',body:'En el panel de Vercel selecciona Add New → Project o New Project. Busca tu repositorio y pulsa Import.',screen:'vercel-import'},
      {title:'Revisa la carpeta raíz',body:'Si package.json está en la raíz, usa el Root Directory predeterminado. Si está en frontend/ dentro de un monorepo, selecciona esa carpeta.',warning:'Una Root Directory incorrecta suele provocar “No framework detected” o “package.json not found”.'},
      {title:'Selecciona Vite como framework',body:'En Vercel confirma Framework Preset: Vite, Build Command: npm run build y Output Directory: dist. Cuando Vercel autodetecte valores correctos, puedes mantenerlos.',screen:'vercel-config',details:['En Vite: Output Directory dist.','Si package.json está en una subcarpeta, selecciona esa subcarpeta como Root Directory.','Next.js es solo la tecnología de esta plataforma educativa, no de los proyectos de práctica.']},
      {title:'Si utilizas React Router, prepara vercel.json',body:'En una SPA con rutas como /dashboard o /perfil, Vercel puede devolver 404 al recargar una ruta interna. Coloca un archivo vercel.json en la raíz del frontend con una reescritura hacia /index.html. Si tu sitio no tiene rutas internas, puedes omitirlo.',tip:'Prueba siempre una ruta interna pegando su URL directamente en una pestaña nueva.'},
      {title:'No despliegues todavía sin revisar variables',body:'Antes de pulsar Deploy, prepara las variables del siguiente capítulo. En algunos asistentes se pueden introducir durante la importación.'}
    ],snippets:[{label:'vercel.json · para React Router con Vite',language:'json',code:'{\n  "$schema": "https://openapi.vercel.sh/vercel.json",\n  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]\n}'}],verify:['Vercel puede leer mi repositorio.','Framework Preset = Vite y Output Directory = dist.','Si uso React Router, comprobé que una ruta interna carga al recargar.'],resources:[{title:'Vercel: Git deployment',url:'https://vercel.com/docs/git'},{title:'Vercel: Vite / rutas SPA',url:'https://vercel.com/docs/frameworks/frontend/vite'}]
  },
  {
    id:'vercel-env',tag:'08 · VARIABLES',title:'Configura Supabase dentro de Vercel',lead:'En producción, tu .env.local no viaja con Git: tienes que declarar las variables en Vercel.',mins:10,kind:'Vercel',icon:'key-round',illustration:'variables',
    steps:[
      {title:'Abre Environment Variables',body:'En la creación del proyecto, expande Environment Variables. Si ya desplegaste, entra al proyecto → Settings → Environment Variables.'},
      {title:'Agrega las dos variables exactas',body:'Añade la URL y la publishable key del proyecto Supabase utilizando exactamente VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.',details:['Nombre: sin espacios, exactamente como el código.','Valor: pega el dato del panel de Supabase.','Entorno: selecciona Production; agrega Preview/Development si esas ramas deben funcionar.'],screen:'vercel-env'},
      {title:'Guarda y construye una nueva versión',body:'Pulsa Save y posteriormente despliega o haz Redeploy si ya existía un deployment. Las variables nuevas no se incorporan retroactivamente a builds antiguos.',screen:'vercel-redeploy',tip:'Una variable correctamente guardada no garantiza que el deployment anterior ya la utilice. Revisa fecha y estado del último despliegue.'},
      {title:'Cuidado con la integración del Marketplace',body:'Vercel ofrece una integración oficial con Supabase que crea las variables por ti. Es cómoda, pero las nombra para Next.js (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) y además agrega claves secretas y contraseñas de PostgreSQL.',warning:'En un proyecto Vite esas variables NEXT_PUBLIC_ no llegan al navegador: la app dirá que faltan variables. Para este taller crea las dos variables VITE_ a mano.'},
      {title:'Comprueba que no expusiste secretos',body:'Únicamente URL + publishable key son aptas para el bundle web. Si pegaste una secret key, retírala del frontend y rótala según el procedimiento de Supabase.'}
    ],snippets:[{label:'Variables en Vercel (dos filas Name / Value)',language:'env',code:'VITE_SUPABASE_URL = https://TU-PROYECTO.supabase.co\nVITE_SUPABASE_PUBLISHABLE_KEY = sb_publishable_REEMPLAZAR'}],verify:['Ambas variables existen en Production.','Volví a desplegar después de modificar variables.'],resources:[{title:'Vercel: Variables de entorno',url:'https://vercel.com/docs/environment-variables/managing-environment-variables'}]
  },
  {
    id:'produccion',tag:'09 · PUBLICAR',title:'Despliega y comprueba tu sitio real',lead:'Un deployment exitoso no basta: hay que abrir la URL, comprobar los datos y revisar errores.',mins:10,kind:'Producción',icon:'rocket',illustration:'launch',
    steps:[
      {title:'Pulsa Deploy',body:'En Vercel haz clic en Deploy. Sigue el progreso de instalación de dependencias, build y publicación. Si falla, abre los Build Logs.'},
      {title:'Abre el dominio de producción',body:'Cuando veas Ready, abre la URL https://tu-proyecto.vercel.app. Prueba la aplicación desde una ventana privada o desde otro dispositivo.',screen:'vercel-ready',details:['Comprueba que el sitio carga sin pantalla en blanco.','Prueba rutas principales y recursos estáticos.','Verifica que se muestran las filas de recursos_demo.']},
      {title:'Inspecciona errores de red',body:'Abre DevTools → Network y Console. Las consultas a Supabase deben responder correctamente. Si hay 401/403, revisa clave, permisos y RLS.',screen:'devtools-network'},
      {title:'Verifica los próximos cambios',body:'Haz un cambio visible pequeño, crea un commit y envíalo a main. Vercel hará un nuevo despliegue de producción si la integración y rama están configuradas correctamente.'},
      {title:'Comparte el enlace',body:'Copia el dominio HTTPS final. Ahora tu frontend está disponible en internet y la API Supabase responderá conforme a sus políticas.'}
    ],snippets:[{label:'Nueva versión por Git',language:'bash',code:'git add .\ngit commit -m "Actualizar interfaz publicada"\ngit push origin main'}],verify:['El sitio abre por HTTPS.','La consulta muestra datos correctos.','Puedo publicar una actualización desde GitHub.'],resources:[{title:'Vercel: Deployments',url:'https://vercel.com/docs/deployments'}]
  },
  {
    id:'auth',tag:'10 · OPCIONAL',title:'Si tu aplicación tiene inicio de sesión',lead:'El correo de confirmación, enlaces mágicos y proveedores OAuth necesitan URLs correctas después del despliegue.',mins:8,kind:'Producción',icon:'users',illustration:'auth',
    steps:[
      {title:'Define el Site URL de producción',body:'En Supabase → Authentication → URL Configuration define Site URL con el dominio real HTTPS de Vercel.',screen:'supabase-auth-urls'},
      {title:'Permite URLs de redirección necesarias',body:'Añade http://localhost:5173/** para pruebas de React + Vite, además de las rutas de callback HTTPS que uses en el dominio de Vercel.',details:['Para una app con callback /auth/callback, autoriza la ruta exacta.','Si usas OAuth, sigue también la configuración del proveedor.','Para previews en Vercel consulta las reglas oficiales de comodines y limita su alcance.']},
      {title:'Prueba los flujos completos',body:'Regístrate, confirma correo, inicia y cierra sesión, recupera contraseña, recarga la página y verifica rutas protegidas.'},
      {title:'Ajusta RLS para usuarios',body:'Si manejas datos privados, usa políticas por usuario con auth.uid(), y evita usar una política pública para información sensible.',warning:'Nunca consideres el hecho de ocultar un botón como autorización. La base de datos debe rechazar consultas no permitidas.'}
    ],snippets:[{label:'RLS de ejemplo privado',language:'sql',code:`-- Ejemplo conceptual: adapta nombres y columnas a tu esquema.
-- La tabla debe tener una columna user_id uuid.
alter table public.mis_notas enable row level security;
revoke all on table public.mis_notas from anon, authenticated;
grant select on table public.mis_notas to authenticated;
create policy "Cada usuario ve sus notas"
on public.mis_notas for select to authenticated
using ((select auth.uid()) = user_id);`}],verify:['Site URL coincide con el dominio de producción.','Probé inicio, cierre de sesión y redirecciones.','Las tablas privadas tienen RLS restrictivo.'],resources:[{title:'Supabase: Redirect URLs',url:'https://supabase.com/docs/guides/auth/redirect-urls'}]
  },
  {
    id:'errores',tag:'11 · SOLUCIONES',title:'Diagnostica problemas frecuentes',lead:'Aprende a investigar la causa antes de cambiar código a ciegas.',mins:11,kind:'Producción',icon:'wrench',illustration:'debug',
    steps:[
      {title:'Si falla el build, abre los logs',body:'En Vercel → Deployments → deployment fallido → Build Logs. Busca el primer error verdadero: TypeScript, dependencia ausente, ruta o framework.',screen:'vercel-logs-error'},
      {title:'Si aparece pantalla en blanco, revisa Console',body:'Abre las herramientas del navegador. Errores de JavaScript o variables undefined suelen indicar configuración incorrecta, uso de window en el servidor o recursos mal enlazados.'},
      {title:'Si la tabla está vacía, revisa permisos',body:'Verifica datos existentes, nombre de la tabla, GRANT y política RLS, además de la respuesta en Network. Una consulta puede devolver cero filas por políticas, incluso sin excepción.'},
      {title:'Si no se aplicó una variable, redeploy',body:'En Settings → Environment Variables confirma nombres y entorno. Ejecuta un nuevo deployment para que se recompilen los valores del cliente.'},
      {title:'Si falla el login, revisa URLs',body:'Compara Site URL y Redirect URLs con el dominio publicado, protocolo HTTPS y ruta callback exacta.'}
    ],verify:['Sé dónde encontrar Build Logs, Console y Network.','No desactivo RLS para “resolver” un error.'],resources:[{title:'Vercel: Managing Deployments',url:'https://vercel.com/docs/deployments/managing-deployments'}]
  },
  {
    id:'github-pages',tag:'12 · PARA EXPOSITORES',title:'Publica esta guía en GitHub Pages',lead:'Solo para el equipo que comparte la plataforma. Esta plataforma educativa ya está preparada para convertirse en archivos HTML/CSS/JS mediante la exportación estática de Next.js.',mins:10,kind:'Extra',icon:'book-open',illustration:'github',
    steps:[
      {title:'Descarga y descomprime la carpeta del proyecto',body:'Instala dependencias con npm ci (si package-lock.json está disponible) o npm install para generar uno. Inicia con npm run dev y revisa el resultado.'},
      {title:'Crea un repositorio para la guía',body:'Usa, por ejemplo, deploylab-guia. Haz commit y push a main. El archivo .github/workflows/deploy-pages.yml viene incluido.'},
      {title:'Activa GitHub Pages por Actions',body:'En GitHub → Settings → Pages → Build and deployment → Source selecciona GitHub Actions. El workflow construye y publica out/.'},
      {title:'Verifica la URL pública',body:'Abre https://USUARIO.github.io/deploylab-guia/. El workflow establece REPO_NAME automáticamente para que Next.js genere las rutas correctas bajo el subdirectorio del repositorio.',details:['En un repositorio USUARIO.github.io, el sitio se publica en la raíz.','Si cambias manualmente el nombre o usas un dominio propio, revisa basePath y la configuración del DNS.','Esta guía no usa Server Actions ni rutas API: todo funciona como sitio estático.']},
      {title:'Comparte el enlace y el PDF',body:'Entrega a tus compañeros el enlace de la guía y el PDF. Sus avances personales se guardan solo en el almacenamiento local de su navegador.'}
    ],snippets:[{label:'Preparar y probar',language:'bash',code:'npm install\nnpm run dev\nnpm run build\n# La salida estática se genera en la carpeta out/'},{label:'Publicar por Git',language:'bash',code:'git init\ngit add .\ngit commit -m "Publicar guía interactiva"\ngit branch -M main\ngit remote add origin https://github.com/USUARIO/deploylab-guia.git\ngit push -u origin main'}],verify:['GitHub Actions está en verde.','El sitio funciona al entrar por GitHub Pages.','Las imágenes, animaciones y enlaces cargan en la URL pública.'],resources:[{title:'Next.js: static exports',url:'https://nextjs.org/docs/app/guides/static-exports'},{title:'GitHub Pages: GitHub Actions',url:'https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site'}]
  }
];
export const faqs = [
 {q:'¿Qué significa “No Framework Detected”?',a:'Vercel no encuentra el package.json o no identifica el framework. Revisa Root Directory, estructura del repositorio y el script build.',type:'Build'},
 {q:'¿Por qué funciona en local, pero no en Vercel?',a:'Las variables .env.local no se suben al repositorio. Debes configurarlas en Vercel con los nombres exactos y ejecutar un nuevo deployment.',type:'Variables'},
 {q:'¿Por qué Supabase devuelve 401?',a:'Revisa URL, publishable key y cabeceras generadas por supabase-js. Confirma que no usaste una secret key por error ni un proyecto eliminado.',type:'Conexión'},
 {q:'¿Por qué obtengo 403 o error de permisos?',a:'Revisa GRANT y RLS. La política debe permitir la operación al rol correspondiente; un privilegio ausente puede generar el error 42501.',type:'Seguridad'},
 {q:'¿Por qué no aparece ninguna fila?',a:'Puede que la tabla esté vacía, que el nombre sea incorrecto o que RLS filtre todas las filas. Comprueba Table Editor, SQL, respuesta de Network y políticas.',type:'Seguridad'},
 {q:'¿Cómo soluciono un error CORS?',a:'Examina el endpoint concreto que falla. Supabase acepta peticiones del cliente oficial, pero una función propia, API intermedia o Edge Function puede requerir CORS explícito.',type:'Conexión'},
 {q:'¿Por qué el login regresa a localhost?',a:'Actualiza Authentication → URL Configuration: Site URL y Redirect URLs. Verifica que el código use redirectTo con la URL de producción cuando corresponda.',type:'Autenticación'},
 {q:'¿Puedo conectar PostgreSQL directamente desde React?',a:'No expongas cadenas directas de PostgreSQL ni contraseñas en el navegador. Usa supabase-js con una publishable key, permisos mínimos y RLS.',type:'Seguridad'},
 {q:'¿Vercel también publica mi backend Express o Spring Boot?',a:'No por el simple hecho de importar un frontend. Tu backend necesita un despliegue compatible por separado o un diseño adaptado a funciones soportadas.',type:'Arquitectura'},
 {q:'¿Por qué al recargar una ruta de React Router en Vercel sale 404?',a:'En una SPA Vite agrega vercel.json con una rewrite de /(.*) a /index.html, tal como indica la documentación oficial de Vercel.',type:'React Router'},
 {q:'Usé la integración de Supabase del Marketplace de Vercel y la app dice que faltan variables',a:'La integración crea variables con prefijo NEXT_PUBLIC_, pensadas para Next.js. Vite solo expone VITE_. Crea VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY en Settings → Environment Variables y haz Redeploy.',type:'Variables'},
 {q:'El build falla con “Property env does not exist on type ImportMeta”',a:'Falta la referencia de tipos de Vite. Crea src/vite-env.d.ts con /// <reference types="vite/client" /> (o agrega "types": ["vite/client"] en tsconfig.app.json), prueba npm run build y vuelve a hacer push.',type:'Build'},
 {q:'Edité .env.local y la app sigue sin ver los valores',a:'Vite lee las variables solo al arrancar. Detén npm run dev con Ctrl + C y vuelve a iniciarlo. Revisa también que el archivo esté junto a package.json y que los nombres empiecen por VITE_.',type:'Variables'},
 {q:'Funciona en mi PC (Windows) pero en Vercel dice Could not resolve',a:'Vercel compila en Linux, que distingue mayúsculas. Un import "./components/navbar" falla si el archivo es Navbar.tsx. Escribe la ruta exacta; si solo cambiaste mayúsculas del archivo, usa git mv para que Git lo registre.',type:'Build'},
 {q:'¿Por qué GitHub Pages muestra errores 404 en recursos?',a:'En repositorios de proyecto, Next.js necesita basePath acorde al nombre del repo. Este proyecto lo configura con REPO_NAME en el workflow.',type:'GitHub Pages'}
];
export const quiz = [
 {q:'¿Dónde se guarda el código fuente para que Vercel lo importe?',options:['Supabase','GitHub','Chrome','Table Editor'],answer:1,why:'GitHub aloja el repositorio; Vercel importa su código y crea deployments.'},
 {q:'¿Qué clave Supabase puede utilizar el navegador?',options:['sb_secret_...','service_role','sb_publishable_...','Contraseña PostgreSQL'],answer:2,why:'Publishable es la clave prevista para clientes públicos; RLS protege los datos.'},
 {q:'¿Qué cambia en Vercel después de editar una variable de entorno?',options:['Nada, se actualiza el build viejo','Debes generar un nuevo deployment','Se elimina tu repositorio','Se desactiva RLS'],answer:1,why:'Las variables se incorporan a los nuevos deployments, no retroactivamente.'},
 {q:'¿Qué mecanismo protege las filas de la base de datos?',options:['Ocultar botones','Un archivo CSS','RLS y permisos SQL','Nombre secreto del repo'],answer:2,why:'Los controles de interfaz no sustituyen la autorización en PostgreSQL.'},
 {q:'Tu app usa React Router. La portada abre bien, pero al recargar /perfil aparece 404. ¿Qué falta?',options:['Desactivar RLS','Un vercel.json con rewrite a /index.html','Cambiar el Output Directory a build','Hacer la tabla pública'],answer:1,why:'El servidor busca un archivo /perfil que no existe. La reescritura entrega index.html y React Router decide qué mostrar.'},
 {q:'Tu proyecto es React + Vite. ¿Qué nombre de variable sí llega al navegador?',options:['NEXT_PUBLIC_SUPABASE_URL','SUPABASE_URL','VITE_SUPABASE_URL','REACT_APP_SUPABASE_URL'],answer:2,why:'Vite solo incluye en el bundle las variables con prefijo VITE_. NEXT_PUBLIC_ es de Next.js y REACT_APP_ de Create React App.'},
 {q:'En Vercel, ¿qué Build Command y Output Directory corresponden a Vite?',options:['npm run dev · dist','npm run build · dist','npm run build · build','npm start · out'],answer:1,why:'npm run build compila y termina; Vite deja el resultado en dist/. npm run dev nunca termina y build/ es la carpeta de Create React App.'},
 {q:'¿Qué significa que el deployment esté en estado Ready?',options:['Toda la seguridad está verificada','El build y la publicación han terminado','Las políticas RLS se crean solas','El usuario ya ha probado los formularios'],answer:1,why:'Además de estar Ready, debes comprobar cargas, datos, logs, permisos y rutas.'},
 {q:'Haces git push a la rama nueva-funcion (no a main). ¿Qué crea Vercel?',options:['Nada, solo despliega main','Un deployment de preview con su propia URL','Reemplaza producción inmediatamente','Un nuevo proyecto en Vercel'],answer:1,why:'Cada rama distinta de la de producción genera un deployment de preview con URL propia; producción no cambia hasta el merge.'},
 {q:'Publicaste una versión con un error en producción. ¿Cuál es la forma más rápida de volver a la anterior?',options:['Borrar el repositorio y crearlo de nuevo','Esperar a que Vercel lo corrija solo','Instant Rollback desde la tarjeta de producción','Cambiar el nombre del dominio'],answer:2,why:'Instant Rollback apunta el dominio al deployment anterior en segundos y sin reconstruir. En el plan Hobby solo se puede volver al inmediatamente anterior.'},
 {q:'¿Por qué no se sube la carpeta node_modules a GitHub?',options:['Porque .gitignore la excluye y Vercel reinstala las dependencias','Porque GitHub la borra automáticamente','Porque Vercel no soporta JavaScript','Porque contiene las variables de entorno'],answer:0,why:'.gitignore evita subirla; durante el build Vercel ejecuta npm install a partir de package.json y package-lock.json.'},
 {q:'Tu deployment quedó en estado Error. ¿Qué es lo primero que deberías revisar?',options:['Las políticas RLS','Los Build Logs, empezando por la última línea roja','El color del botón principal','La configuración del dominio personalizado'],answer:1,why:'Los Build Logs muestran el comando que falló y su mensaje. Reproducir npm run build en tu computador confirma el problema.'},
 {q:'¿Qué ventaja tiene Vercel Drop frente a conectar un repositorio de GitHub?',options:['Se actualiza solo con cada git push','Permite publicar arrastrando una carpeta, sin Git','Crea previews por cada rama','Configura RLS automáticamente'],answer:1,why:'Drop es el camino más rápido para probar, pero no tiene despliegue continuo: para actualizar debes volver a arrastrar la carpeta.'},
 {q:'¿Qué comando de la Vercel CLI publica directamente en producción?',options:['vercel login','vercel','vercel --prod','vercel dev'],answer:2,why:'vercel crea un deployment de preview; vercel --prod lo publica en producción. vercel login solo inicia sesión.'},
 {q:'¿Qué hay de malo en guardar sb_secret_... en una variable VITE_SUPABASE_SECRET?',options:['Nada, las variables de entorno son privadas','El prefijo VITE_ la incluye en el JavaScript que descarga el navegador','Vite no acepta guiones bajos','Supabase la desactiva al detectar Vite'],answer:1,why:'Todo lo que lleva VITE_ termina dentro del bundle público. Las claves secretas solo deben usarse en código de servidor.'},
 {q:'¿Qué empresa dio origen a Vercel y creó Next.js?',options:['ZEIT, fundada por Guillermo Rauch','Netlify','GitHub','Supabase'],answer:0,why:'Vercel nació en 2015 como ZEIT, fundada por el argentino Guillermo Rauch; en 2016 lanzó Next.js y en 2020 cambió su nombre a Vercel.'}
];
