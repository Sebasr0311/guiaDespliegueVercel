export type Tone = 'green' | 'purple' | 'cyan' | 'pink' | 'amber';

export type IconName =
  | 'drop' | 'github' | 'terminal' | 'pencil' | 'send' | 'check' | 'link' | 'bot' | 'merge'
  | 'rocket' | 'globe' | 'sparkles' | 'cpu' | 'code' | 'star' | 'layers' | 'zap';

type Base = {
  /** Short label shown in the footer and overview grid. */
  section: string;
  /** Speaker notes, visible only in presenter mode (key N). */
  notes: string;
};

export type Step = { title: string; text?: string };
export type Callout = { tone: Tone; title: string; text: string; icon?: 'warning' | 'lock' | 'info' };
export type CodeBlock = { file?: string; code: string };

export type Visual =
  | { type: 'flow' }
  | { type: 'states' }
  | { type: 'branches' }
  | { type: 'rollback' }
  | { type: 'phone' }
  | { type: 'dropzone' }
  | { type: 'signup' }
  | { type: 'newProject' }
  | { type: 'browser'; url: string; env?: 'local' | 'preview' | 'production'; heading: string; message?: string; confetti?: boolean };

export type Slide = Base & (
  | { kind: 'cover' }
  | { kind: 'hero'; eyebrow: string; title: string; accent?: string; sub: string; visual: Visual; chips: string[] }
  | { kind: 'agenda'; eyebrow: string; title: string; items: { title: string; detail: string; speaker: string; tone: Tone }[] }
  | { kind: 'section'; num: string; title: string; sub: string; tone: Tone }
  | { kind: 'diagram'; eyebrow: string; title: string; accent?: string; visual: Visual; caption?: string; chips?: string[] }
  | { kind: 'terms'; eyebrow: string; title: string; items: { term: string; def: string; tone: Tone }[]; footer: string }
  | { kind: 'stats'; eyebrow: string; title: string; items: { to: number; prefix?: string; suffix?: string; label: string; tone: Tone }[]; footnote?: string }
  | { kind: 'cards'; eyebrow: string; badge?: string; title: string; accent?: string; flow?: boolean; items: { icon: IconName; tag?: string; title: string; text: string; tone: Tone }[]; footer?: string }
  | { kind: 'steps'; eyebrow: string; badge?: string; title: string; steps: Step[]; callout?: Callout; code?: CodeBlock; visual?: Visual }
  | { kind: 'checkpoint'; eyebrow: string; title: string; text?: string; visual?: Visual; hints?: string[] }
  | { kind: 'table'; eyebrow: string; title: string; head: [string, string]; rows: [string, string][] }
  | { kind: 'timeline'; eyebrow: string; title: string; accent?: string; items: { year: string; title: string; text: string; tone: Tone }[] }
  | { kind: 'profile'; eyebrow: string; name: string; role: string; origin: string; facts: { label: string; text: string }[]; quote: string }
  | { kind: 'compare'; eyebrow: string; title: string; accent?: string; before: { label: string; items: string[] }; after: { label: string; items: string[] }; footer?: string }
  | { kind: 'recap'; eyebrow: string; title: string; items: string[]; challenge: string }
  | { kind: 'thanks' }
);

export const presenters = ['Juan Rincon', 'Sebastian Russo', 'Jose Reales', 'Anghela Gomez'];

export const slides: Slide[] = [
  {
    kind: 'cover',
    section: 'Inicio',
    notes: 'Expositor 1 saluda y presenta al grupo. Mensaje clave: hoy no es una charla, es un taller. Nosotros explicamos un paso y ustedes lo hacen de inmediato en su computador. En una hora cada uno va a tener dos páginas publicadas en internet.'
  },
  {
    kind: 'hero',
    section: 'Inicio',
    eyebrow: 'El reto de hoy',
    title: 'En 60 minutos,',
    accent: 'dos sitios tuyos en internet.',
    sub: 'Un enlace que puedes abrir en tu celular y mandarle a quien quieras.',
    visual: { type: 'phone' },
    chips: ['Explicamos un paso', 'Tú lo haces'],
    notes: 'Muestra en tu celular la página ya desplegada y lanza el confeti. Di: hoy cada uno va a salir con dos páginas publicadas, con un enlace que pueden mandarle a quien quieran. La dinámica es simple: explicamos un paso corto y ustedes lo hacen enseguida. Mientras uno explica, los otros tres caminamos por el salón ayudando.'
  },
  {
    kind: 'agenda',
    section: 'Agenda',
    eyebrow: 'Agenda',
    title: 'Cuatro bloques, cuatro expositores',
    items: [
      { title: 'Conceptos y primer deploy', detail: 'Historia de Vercel, cuenta y una página en línea arrastrando una carpeta', speaker: 'Jose Reales', tone: 'green' },
      { title: 'HTML + GitHub', detail: 'Tu página se actualiza sola con cada git push', speaker: 'Juan Rincon', tone: 'purple' },
      { title: 'React con Vite', detail: 'Build automático y variables de entorno', speaker: 'Sebastian Russo', tone: 'cyan' },
      { title: 'Ramas, previews y rollback', detail: 'Trabajar como un equipo profesional', speaker: 'Anghela Gomez', tone: 'pink' }
    ],
    notes: 'Recorrer los cuatro bloques en 30 segundos. Preguntar: ¿todos tienen el kit descomprimido y Git instalado? Quien no tenga Git, que levante la mano: los compañeros de apoyo le muestran el plan B, que es subir los archivos por la web de GitHub.'
  },

  /* ---------- Bloque 1 ---------- */
  {
    kind: 'section',
    section: 'Bloque 1',
    num: '01',
    title: 'Qué es Vercel y tu primer deploy',
    sub: 'De dónde viene, qué hace y tu primera página en línea.',
    tone: 'green',
    notes: 'Expositor 1 toma la palabra. Este bloque dura unos 13 minutos: 3 de historia, 3 de conceptos y 7 de práctica (crear la cuenta y desplegar con Vercel Drop).'
  },
  {
    kind: 'cards',
    section: 'Bloque 1 · ¿Qué es?',
    eyebrow: 'Bloque 1 · Introducción',
    title: '¿Qué es Vercel?',
    accent: 'Tu sitio en internet, sin servidores',
    items: [
      { icon: 'globe', tag: 'Nube', title: 'Plataforma en la nube', text: 'Publica sitios y apps web en internet, con HTTPS y una URL gratis .vercel.app.', tone: 'cyan' },
      { icon: 'zap', tag: 'Cero config', title: 'Sin servidores que configurar', text: 'No instalas ni mantienes máquinas: subes tu código y Vercel se encarga del resto.', tone: 'green' },
      { icon: 'rocket', tag: 'Automático', title: 'Despliegue continuo', text: 'Conectado a GitHub, cada git push publica una versión nueva sola.', tone: 'purple' },
      { icon: 'layers', tag: 'Frameworks', title: 'Entiende tu proyecto', text: 'Detecta HTML, React, Vite, Next.js y más, y sabe cómo construirlos.', tone: 'pink' }
    ],
    footer: 'En una frase: tú escribes el código, Vercel lo construye y lo publica para todo el mundo.',
    notes: 'Introducción conceptual antes de cualquier práctica. Vercel es una plataforma en la nube para publicar sitios y aplicaciones web. Lo importante: no hay que configurar servidores; detecta el tipo de proyecto, lo construye y lo publica con HTTPS. Si se conecta a GitHub, cada push genera una nueva versión publicada.'
  },
  {
    kind: 'compare',
    section: 'Bloque 1 · ¿Por qué Vercel?',
    eyebrow: 'Bloque 1 · ¿Por qué Vercel?',
    title: 'Publicar una web:',
    accent: 'antes vs. con Vercel',
    before: { label: 'Hosting tradicional', items: ['Alquilar y configurar un servidor', 'Subir archivos a mano por FTP', 'Instalar y renovar el certificado HTTPS', 'Si algo falla, arreglarlo en vivo'] },
    after: { label: 'Con Vercel', items: ['Conectas tu repositorio de GitHub', 'git push y se publica solo', 'HTTPS y red global incluidos', 'Previews por rama y rollback en segundos'] },
    footer: 'Por eso lo usan desde estudiantes hasta empresas: menos infraestructura, más tiempo para programar.',
    notes: 'Contrastar con el hosting tradicional para que se entienda el valor. Antes había que alquilar un servidor, configurarlo, subir archivos por FTP y manejar certificados. Con Vercel todo eso queda automatizado. Hoy van a vivir cada una de estas ventajas en la práctica.'
  },
  {
    kind: 'diagram',
    section: 'Bloque 1 · ¿Qué es?',
    eyebrow: 'Bloque 1 · ¿Qué es?',
    title: 'Tú pones el código.',
    accent: 'Vercel lo pone en internet.',
    visual: { type: 'flow' },
    notes: 'Vercel es una plataforma en la nube para publicar sitios y aplicaciones web. Ustedes no configuran servidores: suben su código y Vercel lo instala, lo construye y lo publica en una red de servidores en todo el mundo. Lo más útil: si conectan GitHub, cada vez que hagan git push se publica una nueva versión sola. Eso es lo que vamos a lograr hoy.'
  },
  {
    kind: 'timeline',
    section: 'Bloque 1 · Historia',
    eyebrow: 'Bloque 1 · Historia',
    title: 'De ZEIT a Vercel:',
    accent: 'una década llevando código a internet',
    items: [
      { year: '2015', title: 'Nace ZEIT', text: 'Guillermo Rauch funda la empresa en San Francisco con una idea: publicar debería ser tan fácil como guardar un archivo.', tone: 'green' },
      { year: '2016', title: 'now y Next.js', text: 'Lanzan la herramienta now (deploy con un solo comando) y el framework open source Next.js.', tone: 'purple' },
      { year: '2020', title: 'ZEIT pasa a ser Vercel', text: 'Cambian de nombre, reciben su primera gran inversión y se enfocan en la experiencia del desarrollador frontend.', tone: 'cyan' },
      { year: '2021', title: 'Unicornio', text: 'Superan los mil millones de dólares de valoración. Next.js se vuelve uno de los frameworks de React más usados.', tone: 'amber' },
      { year: '2023+', title: 'La nube para la IA', text: 'Lanzan v0, el AI SDK y Fluid Compute: Vercel pasa de hosting frontend a plataforma completa para apps con IA.', tone: 'pink' }
    ],
    notes: 'Contar la historia rápido, como relato. Vercel no nació como Vercel: nació en 2015 como ZEIT. Su primer producto, now, permitía desplegar con un solo comando, que es justo lo que hoy hace la CLI de Vercel. En 2016 crearon Next.js. En abril de 2020 la empresa cambió su nombre a Vercel. Desde 2023 apuestan fuerte por la IA con v0 y el AI SDK. (Completar o ajustar con los datos de la investigación de la compañera.)'
  },
  {
    kind: 'profile',
    section: 'Bloque 1 · Historia',
    eyebrow: 'Bloque 1 · El creador',
    name: 'Guillermo Rauch',
    role: 'Fundador y CEO de Vercel',
    origin: 'Lanús, Argentina',
    facts: [
      { label: 'Autodidacta', text: 'Empezó a programar de niño en Argentina y se mudó a San Francisco muy joven.' },
      { label: 'Open source', text: 'Creó Socket.IO y trabajó en Mongoose, librerías que usan millones de desarrolladores.' },
      { label: 'Emprendedor', text: 'Cofundó Cloudup, adquirida por Automattic (la empresa detrás de WordPress.com) en 2013.' }
    ],
    quote: 'Un latinoamericano detrás de una de las plataformas que más usan los desarrolladores web.',
    notes: 'Punto de conexión con el público: el fundador es latinoamericano. Guillermo Rauch es argentino, empezó como autodidacta, creó Socket.IO y luego fundó ZEIT, hoy Vercel. Mensaje: lo que hoy van a usar lo diseñó alguien que también empezó aprendiendo solo.'
  },
  {
    kind: 'cards',
    section: 'Bloque 1 · Historia',
    eyebrow: 'Bloque 1 · Evolución',
    title: 'Lo que Vercel creó',
    accent: 'en el camino',
    items: [
      { icon: 'layers', tag: '2016', title: 'Next.js', text: 'Framework de React para sitios rápidos con renderizado en el servidor. Open source.', tone: 'purple' },
      { icon: 'globe', tag: 'Global', title: 'Red global', text: 'Tu sitio se sirve desde servidores repartidos por el mundo, cerca de cada visitante.', tone: 'cyan' },
      { icon: 'sparkles', tag: '2023', title: 'v0 y AI SDK', text: 'v0 genera interfaces a partir de texto; el AI SDK conecta tu app con modelos de IA.', tone: 'pink' },
      { icon: 'cpu', tag: '2025', title: 'Fluid Compute', text: 'Funciones de servidor que reutilizan instancias: menos arranques en frío y menor costo.', tone: 'green' }
    ],
    footer: 'De “hosting para frontend” a plataforma completa para apps web y de IA.',
    notes: 'Explicar la evolución: empezó publicando sitios estáticos, luego creó Next.js, construyó su red global, y hoy también corre backends y apps con IA. Hoy solo vamos a usar la parte de publicar sitios, que es la base de todo lo demás.'
  },
  {
    kind: 'terms',
    section: 'Bloque 1 · Vocabulario',
    eyebrow: 'Bloque 1 · Vocabulario',
    title: 'Cinco palabras que vas a escuchar hoy',
    items: [
      { term: 'deploy', def: 'Publicar una versión de tu proyecto en internet.', tone: 'green' },
      { term: 'build', def: 'Convertir tu código en archivos listos para el navegador.', tone: 'purple' },
      { term: 'dominio', def: 'La dirección del sitio. Gratis: tu-proyecto.vercel.app', tone: 'cyan' },
      { term: 'producción', def: 'La versión oficial que ve todo el mundo (rama main).', tone: 'amber' },
      { term: 'preview', def: 'Una versión de prueba, con su propia URL.', tone: 'pink' }
    ],
    footer: 'El resto lo aprendemos haciendo.',
    notes: 'Una frase por palabra, sin detenerse. Deploy: publicar una versión. Build: el paso donde, por ejemplo, npm run build convierte React en HTML, CSS y JS. Dominio: la dirección; Vercel regala una .vercel.app. Producción: lo oficial, sale de la rama main. Preview: una versión de prueba de otra rama con URL aparte.'
  },
  {
    kind: 'stats',
    section: 'Bloque 1 · Plan Hobby',
    eyebrow: 'Bloque 1 · Plan Hobby',
    title: 'Gratis para proyectos personales y de clase',
    items: [
      { to: 0, prefix: '$', label: 'con el plan Hobby', tone: 'green' },
      { to: 100, label: 'despliegues por día, de sobra para practicar', tone: 'purple' },
      { to: 100, suffix: ' GB', label: 'de transferencia de datos al mes', tone: 'cyan' }
    ],
    footnote: 'Condición: uso personal, no comercial. Para empresas existe el plan Pro.',
    notes: 'Mensaje corto: todo lo de hoy es gratis. El plan Hobby incluye 100 GB de transferencia al mes y hasta 100 despliegues diarios. La condición es que sea para uso personal, no comercial.'
  },
  {
    kind: 'cards',
    section: 'Bloque 1 · Opciones',
    eyebrow: 'Bloque 1 · Opciones',
    title: 'Tres formas de desplegar',
    items: [
      { icon: 'drop', tag: 'Sin Git', title: 'Vercel Drop', text: 'Arrastras la carpeta al navegador y listo. Ideal para probar, pero no se actualiza solo.', tone: 'green' },
      { icon: 'github', tag: 'Profesional', title: 'Git + GitHub', text: 'Conectas tu repositorio y cada git push publica una versión nueva.', tone: 'purple' },
      { icon: 'terminal', tag: 'Automatizar', title: 'Vercel CLI', text: 'Comandos desde la terminal, útil para scripts y automatización.', tone: 'cyan' }
    ],
    footer: 'Vamos en ese orden: primero Drop, para tener algo publicado ya mismo.',
    notes: 'Vercel Drop: arrastras la carpeta y listo; sirve para probar, pero no se actualiza solo. Git con GitHub: la forma profesional, cada push publica una versión. CLI: comandos en la terminal, útil para automatizar.'
  },
  {
    kind: 'steps',
    section: 'Bloque 1 · Paso 1',
    eyebrow: 'Bloque 1 · Paso 1',
    badge: 'Todos hacen · 2 min',
    title: 'Crea tu cuenta de Vercel',
    steps: [
      { title: 'Entra a vercel.com/signup' },
      { title: 'Elige el plan Hobby (gratis)' },
      { title: 'Pulsa Continue with GitHub y autoriza' }
    ],
    callout: { tone: 'amber', icon: 'warning', title: 'Usa GitHub, no el correo', text: 'Así Vercel ya puede ver tus repositorios en la práctica 1.' },
    visual: { type: 'signup' },
    notes: 'Hazlo en el proyector al mismo tiempo que ellos. Insiste en registrarse con GitHub: si alguien usa el correo, después tendrá que conectar GitHub aparte. Espera a que la mayoría vea el panel de Vercel antes de avanzar.'
  },
  {
    kind: 'steps',
    section: 'Bloque 1 · Paso 2',
    eyebrow: 'Bloque 1 · Paso 2',
    badge: 'Todos hacen · 3 min',
    title: 'Primer deploy: arrastra y suelta',
    steps: [
      { title: 'Abre vercel.com/drop' },
      { title: 'Arrastra la carpeta del kit', text: '01-pagina-estatica' },
      { title: 'Escribe un nombre y pulsa Deploy' },
      { title: 'Abre tu URL en el celular' }
    ],
    callout: { tone: 'green', icon: 'info', title: 'Sin instalar nada', text: 'Sin Git ni terminal: el camino más rápido que existe.' },
    visual: { type: 'dropzone' },
    notes: 'Di: antes de usar Git, el camino más rápido que existe: arrastrar una carpeta. Haz el paso en el proyector con la carpeta 01-pagina-estatica. Al terminar, Vercel muestra la URL: ábrela en tu celular y lanza el confeti. Pide que cada uno comparta su URL en el chat del curso.'
  },
  {
    kind: 'checkpoint',
    section: 'Punto de control 1',
    eyebrow: 'Punto de control 1',
    title: '¿Todos tienen su URL .vercel.app?',
    visual: { type: 'browser', url: 'mi-primer-deploy.vercel.app', heading: 'Hola, soy Ana Pérez', message: 'Mi primera página en internet', confetti: true },
    notes: 'Pregunta en voz alta: ¿a quién no le abrió? Los compañeros de apoyo atienden a esas personas. Cierre del bloque 1: funciona, pero si cambian algo tienen que volver a arrastrar la carpeta. Ahora conectamos GitHub para que se actualice sola. Paso al Expositor 2.'
  },

  /* ---------- Bloque 2 ---------- */
  {
    kind: 'section',
    section: 'Bloque 2',
    num: '02',
    title: 'Práctica 1: HTML con GitHub',
    sub: 'Haz git push y tu página se actualiza sola.',
    tone: 'purple',
    notes: 'Expositor 2 toma la palabra. Objetivo del bloque: conectar un repositorio de GitHub a Vercel para lograr despliegue continuo. 15 minutos.'
  },
  {
    kind: 'steps',
    section: 'Bloque 2 · Paso 1',
    eyebrow: 'Bloque 2 · Paso 1',
    badge: 'Todos hacen · 4 min',
    title: 'Personaliza y crea el repositorio',
    steps: [
      { title: 'En VS Code: abre 01-pagina-estatica/index.html', text: 'Cambia tu nombre y guarda.' },
      { title: 'En GitHub: botón + → New repository', text: 'Nombre: mi-primer-deploy' },
      { title: 'Public y sin README', text: 'Luego pulsa Create repository.' }
    ],
    code: { file: 'index.html', code: '- <h1>Hola, soy [Tu nombre]</h1>\n+ <h1>Hola, soy Ana Pérez</h1>' },
    notes: 'Primero que personalicen la página: es más motivador desplegar algo con su nombre. Luego crear el repositorio vacío en GitHub: si marcan README, el push siguiente puede dar conflicto. Que dejen abierta la página del repositorio: ahí está la URL del siguiente paso.'
  },
  {
    kind: 'steps',
    section: 'Bloque 2 · Paso 2',
    eyebrow: 'Bloque 2 · Paso 2',
    badge: 'Todos hacen · 4 min',
    title: 'Sube tu código a GitHub',
    steps: [
      { title: 'add + commit', text: 'guardan una versión de tus archivos' },
      { title: 'push', text: 'la envía a GitHub' }
    ],
    code: {
      file: 'terminal',
      code: 'git init\ngit add .\ngit commit -m "Mi primer deploy"\ngit branch -M main\ngit remote add origin https://github.com/TU-USUARIO/mi-primer-deploy.git\ngit push -u origin main'
    },
    callout: { tone: 'cyan', icon: 'info', title: '¿Sin Git?', text: 'En GitHub: Add file → Upload files.' },
    notes: 'Escribe los comandos uno por uno, dentro de la carpeta 01-pagina-estatica. git init convierte la carpeta en repositorio, add prepara los archivos, commit guarda una versión, branch -M main nombra la rama principal, remote add conecta con GitHub y push sube el código. Errores típicos: Git pide nombre y correo la primera vez (git config) y al hacer push se abre el navegador para iniciar sesión.'
  },
  {
    kind: 'steps',
    section: 'Bloque 2 · Paso 3',
    eyebrow: 'Bloque 2 · Paso 3',
    badge: 'Todos hacen · 3 min',
    title: 'Importa el repositorio en Vercel',
    steps: [
      { title: 'Add New… → Project' },
      { title: 'Busca tu repo → Import' },
      { title: 'Preset: Other (es HTML puro)' },
      { title: 'Deploy y nada más' }
    ],
    callout: { tone: 'amber', icon: 'warning', title: '¿No aparece el repo?', text: 'Adjust GitHub App Permissions.' },
    visual: { type: 'newProject' },
    notes: 'En Vercel: Add New, Project. Import en mi-primer-deploy. Explica la pantalla con los números: nombre del proyecto (parte de la URL), preset (Other porque es HTML puro), carpeta raíz, ajustes de build (no aplica) y variables de entorno (las usaremos en React). Deploy.'
  },
  {
    kind: 'diagram',
    section: 'Bloque 2 · Mientras esperan',
    eyebrow: 'Bloque 2 · Mientras esperan',
    title: 'Qué pasa cuando pulsas Deploy',
    visual: { type: 'states' },
    caption: 'Si algo falla, el despliegue queda en Error: abre los Build Logs y lee la última línea roja.',
    notes: 'Muestra esta diapositiva mientras se despliegan los proyectos. En HTML puro el build casi no hace nada; en React verán npm install y npm run build. Cuando dice Ready, Vercel muestra la vista previa. Si sale Error, los Build Logs dicen exactamente qué falló.'
  },
  {
    kind: 'cards',
    section: 'Bloque 2 · Paso 4',
    eyebrow: 'Bloque 2 · Paso 4',
    badge: 'Todos hacen · 3 min',
    title: 'La magia:',
    accent: 'cambia algo y haz push',
    flow: true,
    items: [
      { icon: 'pencil', tag: '1 · Edita', title: 'Cambia tu color favorito', text: 'En index.html, y guarda el archivo.', tone: 'green' },
      { icon: 'send', tag: '2 · Envía', title: 'git add · commit · push', text: 'git add .\ngit commit -m "Cambio"\ngit push', tone: 'purple' },
      { icon: 'check', tag: '3 · Listo', title: 'Vercel despliega solo', text: 'Recarga tu URL en unos segundos.', tone: 'cyan' }
    ],
    footer: 'No tocaste Vercel. Esto se llama despliegue continuo.',
    notes: 'Di: ahora vamos a cambiar algo y no vamos a tocar Vercel. Cambia el color, haz add, commit y push, y muestra en el panel de Vercel cómo aparece un despliegue nuevo por sí solo. Esto es despliegue continuo: cada push a main publica en producción.'
  },
  {
    kind: 'checkpoint',
    section: 'Punto de control 2',
    eyebrow: 'Punto de control 2',
    title: '¿Ves tu cambio en la URL sin haber tocado Vercel?',
    text: '¿No? Revisa que guardaste el archivo.',
    hints: ['git status', 'Ctrl + Shift + R'],
    visual: { type: 'browser', url: 'mi-primer-deploy.vercel.app', heading: 'Hola, soy Ana Pérez', message: 'Ahora con mi color favorito' },
    notes: 'Pregunta: ¿a quién no se le actualizó? Causas típicas: no guardó el archivo, olvidó git add, o el navegador tiene la versión anterior en caché. Cierre del bloque 2: con HTML Vercel solo copia los archivos; con React hay un paso extra, el build. Paso al Expositor 3.'
  },

  /* ---------- Bloque 3 ---------- */
  {
    kind: 'section',
    section: 'Bloque 3',
    num: '03',
    title: 'Práctica 2: React con Vite',
    sub: 'Build automático y variables de entorno.',
    tone: 'cyan',
    notes: 'Expositor 3 toma la palabra. Objetivo: desplegar una app que necesita build y configurar una variable de entorno desde Vercel. 18 minutos.'
  },
  {
    kind: 'steps',
    section: 'Bloque 3 · Paso 1',
    eyebrow: 'Bloque 3 · Paso 1',
    badge: 'Todos hacen · 4 min',
    title: 'Prueba la app React en tu computador',
    steps: [
      { title: 'npm run build', text: 'Convierte React en HTML, CSS y JS dentro de la carpeta dist. Vercel lo hará por ti.' },
      { title: 'Fíjate en la etiqueta', text: 'Hoy dice local. En Vercel dirá production.' }
    ],
    code: { file: 'terminal', code: 'cd 02-react-vite\nnpm install\nnpm run dev\n# abre http://localhost:5173\n\n# edita src/App.jsx: [Tu nombre]' },
    notes: 'Mientras corre npm install explica qué es el build: Vite toma los componentes de React y genera en dist archivos HTML, CSS y JS optimizados. Esa carpeta es la que Vercel publica. Abran localhost:5173: la etiqueta dice local. Ctrl + C detiene el servidor.'
  },
  {
    kind: 'cards',
    section: 'Bloque 3 · Paso 2',
    eyebrow: 'Bloque 3 · Paso 2',
    badge: 'Todos hacen · 7 min',
    title: 'Súbela y despliégala:',
    accent: 'Vercel detecta Vite',
    flow: true,
    items: [
      { icon: 'github', tag: '1 · GitHub', title: 'Repo nuevo mi-app-react', text: 'Mismos comandos de la práctica 1. node_modules no se sube: lo evita .gitignore.', tone: 'purple' },
      { icon: 'zap', tag: '2 · Vercel', title: 'Add New… → Project → Import', text: 'Preset detectado: Vite\nbuild: npm run build\nsalida: dist', tone: 'cyan' },
      { icon: 'rocket', tag: '3 · Deploy', title: 'Abre tu URL: dice production', text: 'El mensaje avisa que falta configurar una variable.', tone: 'green' }
    ],
    footer: 'Falta una variable de entorno. Vamos a eso.',
    notes: 'Crear el repositorio mi-app-react y subir con los mismos comandos. Pregunta: ¿se dieron cuenta de que node_modules no se subió? Lo evita .gitignore; Vercel vuelve a instalar las dependencias. Al importar, abre Build and Output Settings para mostrar que detectó Vite.'
  },
  {
    kind: 'steps',
    section: 'Bloque 3 · Paso 3',
    eyebrow: 'Bloque 3 · Paso 3',
    badge: 'Todos hacen · 5 min',
    title: 'Variables de entorno',
    steps: [
      { title: 'Settings → Environment Variables', text: 'Valores que no van en el código: claves de API, URLs, mensajes.' },
      { title: 'Key VITE_MENSAJE + tu mensaje → Save' },
      { title: 'Deployments → … → Redeploy' }
    ],
    code: { file: 'Settings › Environment Variables', code: '# Key\nVITE_MENSAJE\n\n# Value\nHola desde las variables de entorno de Vercel\n\n# Environments\n[x] Production   [x] Preview' },
    callout: { tone: 'pink', icon: 'warning', title: 'Los 2 errores típicos', text: 'En Vite debe empezar por VITE_, o no llega al navegador. Y solo aplica en un deploy nuevo: por eso el Redeploy.' },
    notes: 'Una variable de entorno guarda valores que cambian según el entorno, sin escribirlos en el código. Settings, Environment Variables. Key VITE_MENSAJE, marcar Production y Preview, Save. Luego Deployments, tres puntos, Redeploy. Recalca: sin VITE_ no llega al navegador, y sin Redeploy no se aplica.'
  },
  {
    kind: 'steps',
    section: 'Bloque 3 · En el código',
    eyebrow: 'Bloque 3 · En el código',
    title: 'Así lee React la variable',
    steps: [
      { title: 'import.meta.env', text: 'Así se leen las variables en Vite.' },
      { title: 'VITE_VERCEL_ENV', text: 'Vercel la llena sola: production, preview o development.' }
    ],
    code: { file: 'src/App.jsx', code: 'const mensaje =\n  import.meta.env.VITE_MENSAJE\n\n// Vercel la llena sola:\n// production, preview o development\nconst entorno =\n  import.meta.env.VITE_VERCEL_ENV' },
    callout: { tone: 'amber', icon: 'lock', title: 'Ojo con los secretos', text: 'Todo lo que empieza por VITE_ queda visible en el navegador. Nunca pongas ahí contraseñas ni claves privadas.' },
    notes: 'Muestra el código mientras se hace el Redeploy. VITE_VERCEL_ENV la llena Vercel automáticamente; por eso la etiqueta cambia sola. Advertencia: lo que lleva VITE_ termina dentro del JavaScript que descarga el navegador. Las claves secretas solo se usan en código de servidor.'
  },
  {
    kind: 'checkpoint',
    section: 'Punto de control 3',
    eyebrow: 'Punto de control 3',
    title: '¿Tu app muestra tu mensaje?',
    text: '¿Sigue diciendo “Aún no has configurado”? Revisa el nombre exacto de la variable y haz Redeploy.',
    visual: { type: 'browser', url: 'mi-app-react.vercel.app', env: 'production', heading: 'Mensaje desde Vercel', message: 'Hola desde las variables de entorno de Vercel' },
    notes: 'Pregunta: ¿a quién no le aparece su mensaje? Casi siempre es una de dos cosas: el nombre no es exactamente VITE_MENSAJE (mayúsculas incluidas) o no hicieron Redeploy después de guardar la variable.'
  },
  {
    kind: 'steps',
    section: 'Bloque 3 · Un detalle más',
    eyebrow: 'Bloque 3 · Un detalle más',
    title: '¿Error 404 al recargar una página?',
    steps: [
      { title: 'El problema', text: 'Si usas React Router y alguien recarga /contacto, Vercel busca ese archivo y no existe.' },
      { title: 'La solución', text: 'Decirle que siempre entregue index.html y que React decida qué mostrar.' }
    ],
    code: { file: 'vercel.json (raíz del proyecto)', code: '{\n  "rewrites": [{\n    "source": "/(.*)",\n    "destination": "/index.html"\n  }]\n}' },
    callout: { tone: 'green', icon: 'info', title: 'Ya viene en el kit', text: 'No tienes que hacer nada.' },
    notes: 'Un minuto, solo para que lo sepan. Si alguien recarga directamente una ruta, el servidor busca un archivo con ese nombre, no lo encuentra y responde 404. Este archivo le dice a Vercel que entregue index.html. Fin del bloque 3 y paso al Expositor 4.'
  },

  /* ---------- Bloque 4 ---------- */
  {
    kind: 'section',
    section: 'Bloque 4',
    num: '04',
    title: 'Trabaja como un equipo profesional',
    sub: 'Ramas, previews, pull requests y volver atrás.',
    tone: 'pink',
    notes: 'Expositor 4 toma la palabra. Objetivo: probar cambios en una URL de preview antes de publicarlos y saber deshacer un despliegue. 17 minutos, incluido el cierre.'
  },
  {
    kind: 'diagram',
    section: 'Bloque 4 · La idea',
    eyebrow: 'Bloque 4 · La idea',
    title: 'main es producción.',
    accent: 'Cada rama es una preview.',
    visual: { type: 'branches' },
    notes: 'En un equipo nadie cambia producción directamente. Se crea una rama, se trabaja ahí y Vercel genera una URL de preview para revisar el cambio. Cuando está aprobado se hace merge a main y ahí sí se publica. La producción nunca se rompe mientras se prueba.'
  },
  {
    kind: 'steps',
    section: 'Bloque 4 · Paso 1',
    eyebrow: 'Bloque 4 · Paso 1',
    badge: 'Todos hacen · 5 min',
    title: 'Crea una rama y mira tu preview',
    steps: [
      { title: 'Crea la rama y cambia el título' },
      { title: 'Haz push de la rama', text: 'Vercel crea un deploy Preview.' },
      { title: 'Abre la URL: dice preview', text: 'Producción sigue igual.' }
    ],
    code: { file: 'terminal', code: 'git checkout -b nueva-funcion\n# cambia el título en App.jsx\ngit add .\ngit commit -m "Nuevo título"\ngit push -u origin nueva-funcion' },
    visual: { type: 'browser', url: 'mi-app-react-git-nueva-funcion.vercel.app', env: 'preview', heading: 'Nuevo título', message: 'Probando sin tocar producción' },
    notes: 'En mi-app-react: crea la rama nueva-funcion, cambia el título, commit y push de la rama. En Vercel aparece un despliegue Preview con su propia URL. Ábrela: dice preview. Luego abre producción y muestra que sigue igual.'
  },
  {
    kind: 'cards',
    section: 'Bloque 4 · Paso 2',
    eyebrow: 'Bloque 4 · Paso 2',
    badge: 'Todos hacen · 3 min',
    title: 'Pull request y merge:',
    accent: 'a producción',
    flow: true,
    items: [
      { icon: 'github', tag: 'En GitHub', title: 'Abre el pull request', text: 'Compare & pull request → Create pull request', tone: 'purple' },
      { icon: 'bot', tag: 'El bot de Vercel', title: 'Comenta la preview', text: 'Deja en el PR el enlace de la preview para revisarla.', tone: 'cyan' },
      { icon: 'merge', tag: 'Merge', title: 'Se publica en producción', text: 'Merge pull request y Vercel despliega main.', tone: 'green' }
    ],
    notes: 'En GitHub aparece el botón Compare and pull request. Muestra el comentario automático del bot de Vercel con el enlace de la preview. Merge pull request. En Vercel aparece un despliegue de producción nuevo. Punto de control: la URL de producción ya muestra el título nuevo.'
  },
  {
    kind: 'diagram',
    section: 'Bloque 4 · Paso 3',
    eyebrow: 'Bloque 4 · Paso 3',
    title: '¿Publicaste un error?',
    accent: 'Instant Rollback',
    visual: { type: 'rollback' },
    chips: ['Tarjeta de producción → Instant Rollback', 'Elige la anterior → Continue → Confirm', 'Plan gratis: solo al deploy anterior'],
    notes: 'Demostración en el proyector. En la tarjeta de producción, Instant Rollback, elegir el despliegue anterior, Continue, Confirm Rollback. El dominio vuelve en segundos, sin reconstruir. En el plan gratis solo se puede volver al anterior, y después del rollback los nuevos push no se publican hasta pulsar Undo Rollback.'
  },
  {
    kind: 'steps',
    section: 'Bloque 4 · Bonus',
    eyebrow: 'Bloque 4 · Bonus',
    badge: 'Solo mira · 2 min',
    title: 'La tercera forma: la terminal',
    steps: [
      { title: 'npm i -g vercel', text: 'Instala la herramienta (una vez)' },
      { title: 'vercel login', text: 'Inicia sesión' },
      { title: 'vercel', text: 'Despliega una preview' },
      { title: 'vercel --prod', text: 'Despliega a producción' }
    ],
    code: { file: 'terminal', code: 'npm i -g vercel\nvercel login\nvercel\nvercel --prod' },
    notes: 'Solo demostración. La CLI sirve cuando no quieren usar GitHub o para automatizar. vercel despliega una preview y vercel --prod a producción. Dato: es la heredera directa de now, la herramienta con la que nació ZEIT en 2016. Si el tiempo está justo, este paso se puede saltar.'
  },
  {
    kind: 'table',
    section: 'Bloque 4 · Para llevar',
    eyebrow: 'Bloque 4 · Para llevar',
    title: 'Si algo falla, casi siempre es esto',
    head: ['Lo que ves', 'Qué hacer'],
    rows: [
      ['El repo no aparece en Vercel', 'Adjust GitHub App Permissions al importar'],
      ['Build failed', 'Abre los Build Logs y prueba npm run build en tu computador'],
      ['Página en blanco', 'Revisa que el preset sea Vite (salida dist) y la consola con F12'],
      ['Variable vacía', '¿Empieza por VITE_? ¿Hiciste Redeploy?'],
      ['404 al recargar una ruta', 'Agrega vercel.json con el rewrite a /index.html'],
      ['El cambio no aparece', 'git status, push y recarga con Ctrl + Shift + R']
    ],
    notes: 'Recorrer la tabla en un minuto. Mensaje clave: el error casi siempre dice qué pasó; hay que leer los Build Logs o la consola del navegador con F12. La guía tiene la tabla completa.'
  },
  {
    kind: 'recap',
    section: 'Cierre',
    eyebrow: 'Lo que lograste hoy',
    title: 'Ya sabes publicar cualquier proyecto web.',
    items: [
      'Desplegaste de 3 formas: Drop, GitHub y CLI',
      'Publicaste HTML y React con build automático',
      'Usaste variables de entorno, previews y rollback'
    ],
    challenge: 'Reto para casa: despliega un proyecto tuyo de la materia y comparte la URL en el chat.',
    notes: 'Cierre. Hoy desplegaron de tres formas, conectaron GitHub para que cada push publique solo, desplegaron React con build automático, usaron variables de entorno, previews y rollback. Reto: desplegar un proyecto propio y compartir la URL.'
  },
  {
    kind: 'thanks',
    section: 'Cierre',
    notes: 'Agradecer y abrir la ronda de preguntas. Cada expositor responde las de su bloque. Recordar que la guía en PDF y el kit quedan disponibles.'
  }
];
