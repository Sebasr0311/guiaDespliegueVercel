import type { ReactNode } from 'react';
import { LockKeyhole, MonitorPlay } from 'lucide-react';

/* Pantallas ilustradas, paso a paso. Son recreaciones didácticas, no capturas oficiales. */

export type ScreenId =
  | 'terminal-build' | 'github-new' | 'supabase-new' | 'supabase-keys' | 'supabase-sql'
  | 'supabase-table' | 'env-local' | 'local-result' | 'vercel-import' | 'vercel-config'
  | 'vercel-env' | 'vercel-redeploy' | 'vercel-ready' | 'devtools-network'
  | 'supabase-auth-urls' | 'vercel-logs-error';

const M = ({ n }: { n: number }) => <span className="sc-mark" aria-label={`Marcador ${n}`}>{n}</span>;

function Frame({ url, dark, children }: { url: string; dark?: boolean; children: ReactNode }) {
  return (
    <div className={`sc-frame ${dark ? 'sc-dark' : 'sc-light'}`}>
      <div className="sc-bar">
        <span className="sc-dots"><i /><i /><i /></span>
        <span className="sc-url"><LockKeyhole size={10} /> {url}</span>
      </div>
      <div className="sc-body">{children}</div>
    </div>
  );
}

function Term({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="sc-frame sc-term">
      <div className="sc-bar"><span className="sc-dots"><i /><i /><i /></span><span className="sc-ttl">{title}</span></div>
      <pre className="sc-termbody">{children}</pre>
    </div>
  );
}

const Field = ({ label, children, hl, mono }: { label: string; children: ReactNode; hl?: boolean; mono?: boolean }) => (
  <div className="sc-field">
    <label>{label}</label>
    <div className={`sc-input ${hl ? 'sc-hl' : ''} ${mono ? 'sc-mono' : ''}`}>{children}</div>
  </div>
);

type ScreenDef = { caption: string; notes: string[]; node: () => ReactNode };

const screens: Record<ScreenId, ScreenDef> = {
  'terminal-build': {
    caption: 'Resultado de npm run build en tu terminal',
    notes: [
      'tsc -b revisa los tipos de TypeScript antes de compilar. Si hay un error, el build se detiene aquí, igual que en Vercel.',
      'Si ves “built in…”, la carpeta dist/ está lista. Vercel generará la suya; tú no la subes.',
    ],
    node: () => (
      <Term title="Terminal — mi-proyecto">
<span className="t-p">$</span> npm run build{'\n'}
<span className="t-o">&gt; tsc -b &amp;&amp; vite build</span> <M n={1} />{'\n\n'}
vite v8.3.4 building for production...{'\n'}
<span className="t-g">✓</span> 34 modules transformed.{'\n'}
dist/index.html               <span className="t-o">0.46 kB</span>{'\n'}
dist/assets/index-B1x8.css    <span className="t-o">1.39 kB</span>{'\n'}
dist/assets/index-Cq2v.js   <span className="t-o">196.20 kB</span>{'\n'}
<span className="t-g">✓ built in 1.21s</span> <M n={2} />
      </Term>
    ),
  },

  'github-new': {
    caption: 'Formulario “Create a new repository” en GitHub',
    notes: [
      'Nombre corto, en minúsculas y con guiones.',
      'Público o privado: ambos funcionan con Vercel.',
      'No marques README, .gitignore ni licencia: tu proyecto local ya tiene archivos y el primer push sería rechazado.',
    ],
    node: () => (
      <Frame url="github.com/new">
        <div className="sc-h">Create a new repository</div>
        <div className="sc-row">
          <Field label="Owner">tu-usuario ▾</Field>
          <Field label="Repository name *" hl>mi-primer-frontend <M n={1} /></Field>
        </div>
        <Field label="Visibility" hl>◉ Public&nbsp;&nbsp;○ Private <M n={2} /></Field>
        <Field label="Initialize this repository with" hl>☐ Add a README · .gitignore: None · License: None <M n={3} /></Field>
        <div className="sc-right"><span className="sc-btn sc-btn-green">Create repository</span></div>
      </Frame>
    ),
  },

  'supabase-new': {
    caption: 'Creación de un proyecto nuevo en Supabase',
    notes: [
      'Nombre del proyecto: solo lo ves tú en el panel.',
      'Contraseña de la base de datos: usa “Generate” y guárdala en un lugar seguro. Nunca va en el frontend.',
      'Región: elige la más cercana a tus usuarios (para Colombia, una región de EE. UU. Este o São Paulo suele ir bien).',
      'Pulsa “Create new project” y espera a que el estado deje de decir “Setting up”.',
    ],
    node: () => (
      <Frame url="supabase.com/dashboard/new" dark>
        <div className="sc-h">Create a new project</div>
        <Field label="Organization">Mi organización ▾</Field>
        <Field label="Project name" hl>mi-backend <M n={1} /></Field>
        <Field label="Database password" hl><span>••••••••••••••••</span><span className="sc-chip">Generate a password</span> <M n={2} /></Field>
        <Field label="Region" hl>East US (North Virginia) ▾ <M n={3} /></Field>
        <div className="sc-right"><span className="sc-btn sc-btn-supa">Create new project</span> <M n={4} /></div>
      </Frame>
    ),
  },

  'supabase-keys': {
    caption: 'Project URL y claves de API (botón Connect o Project Settings → API Keys)',
    notes: [
      'Project URL: va en VITE_SUPABASE_URL.',
      'Publishable key (sb_publishable_…): va en VITE_SUPABASE_PUBLISHABLE_KEY. Está pensada para el navegador.',
      'Secret key (sb_secret_…): NUNCA en el frontend ni en variables VITE_. Si la expones, rótala.',
    ],
    node: () => (
      <Frame url="supabase.com/dashboard/project/abcd…/settings/api-keys" dark>
        <div className="sc-h">API Keys</div>
        <Field label="Project URL" hl mono>https://abcdefghijkl.supabase.co <span className="sc-chip">Copy</span> <M n={1} /></Field>
        <div className="sc-sub">Publishable key <span className="sc-tag sc-tag-ok">Safe to use in a browser</span></div>
        <Field label="default" hl mono>sb_publishable_7Hk2…Qw9 <span className="sc-chip">Copy</span> <M n={2} /></Field>
        <div className="sc-sub">Secret keys <span className="sc-tag sc-tag-bad">Never expose</span></div>
        <Field label="default" mono><span className="sc-dim">sb_secret_••••••••••••••••</span> <span className="sc-chip">Reveal</span> <M n={3} /></Field>
      </Frame>
    ),
  },

  'supabase-sql': {
    caption: 'SQL Editor: pega el script y ejecútalo',
    notes: [
      'Abre SQL Editor en el menú lateral y crea una consulta nueva.',
      'Pega el SQL completo de la lección.',
      'Pulsa Run (o Ctrl + Enter).',
      '“Success. No rows returned” es el resultado correcto: el script crea cosas, no consulta filas.',
    ],
    node: () => (
      <Frame url="supabase.com/dashboard/project/abcd…/sql/new" dark>
        <div className="sc-split">
          <div className="sc-side"><b>SQL Editor</b> <M n={1} /><span className="sc-sideitem sc-active">+ New query</span><span className="sc-sideitem">recursos_demo</span></div>
          <div className="sc-main">
            <pre className="sc-code sc-hl">{`create table if not exists public.recursos_demo (
  id bigint generated always as identity primary key,
  titulo text not null, …
alter table public.recursos_demo enable row level security;
grant select on table public.recursos_demo to anon;`}</pre>
            <div className="sc-mark-float"><M n={2} /></div>
            <div className="sc-right"><span className="sc-btn sc-btn-supa">Run ⌘↵</span> <M n={3} /></div>
            <div className="sc-result sc-hl"><b>Results</b><span className="sc-okline">Success. No rows returned</span> <M n={4} /></div>
          </div>
        </div>
      </Frame>
    ),
  },

  'supabase-table': {
    caption: 'Table Editor: comprueba la tabla y que RLS está activo',
    notes: [
      'Abre Table Editor y selecciona recursos_demo.',
      'Debe decir que RLS está habilitado. Si dice “RLS disabled”, vuelve a ejecutar el script.',
      'Verás las dos filas de prueba.',
    ],
    node: () => (
      <Frame url="supabase.com/dashboard/project/abcd…/editor" dark>
        <div className="sc-split">
          <div className="sc-side"><b>Table Editor</b> <M n={1} /><span className="sc-sideitem">schema: public</span><span className="sc-sideitem sc-active">recursos_demo</span></div>
          <div className="sc-main">
            <div className="sc-tablehead">recursos_demo <span className="sc-tag sc-tag-ok sc-hl">RLS enabled · 1 policy</span> <M n={2} /></div>
            <table className="sc-table sc-hl">
              <thead><tr><th>id</th><th>titulo</th><th>descripcion</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Mi primer deploy</td><td>Frontend conectado a Supabase</td></tr>
                <tr><td>2</td><td>Aprendiendo RLS</td><td>Lectura pública de datos de prueba</td></tr>
              </tbody>
            </table>
            <div className="sc-right"><M n={3} /></div>
          </div>
        </div>
      </Frame>
    ),
  },

  'env-local': {
    caption: 'Dónde va el archivo .env.local (VS Code)',
    notes: [
      'En la raíz del proyecto, al lado de package.json. No dentro de src/.',
      'Los nombres deben empezar por VITE_ para que Vite los entregue al navegador.',
      'Después de crear o editar .env.local, detén npm run dev (Ctrl + C) y vuelve a ejecutarlo.',
    ],
    node: () => (
      <Frame url="VS Code — mi-primer-frontend">
        <div className="sc-split">
          <div className="sc-side sc-tree">
            <b>EXPLORER</b>
            <span>▸ node_modules</span><span>▸ public</span><span>▾ src</span>
            <span className="sc-indent">▸ lib</span><span className="sc-indent">App.tsx</span><span className="sc-indent">main.tsx</span>
            <span className="sc-active sc-hl">.env.local <M n={1} /></span>
            <span>.gitignore</span><span>index.html</span><span>package.json</span><span>vite.config.ts</span>
          </div>
          <div className="sc-main">
            <div className="sc-tabbar"><span className="sc-active">.env.local</span></div>
            <pre className="sc-code sc-hl">{`VITE_SUPABASE_URL=https://abcdefghijkl.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_7Hk2…Qw9`}</pre>
            <div className="sc-right"><M n={2} /></div>
            <pre className="sc-code sc-termmini">{`$ npm run dev     ← reinícialo después de editar`}<M n={3} /></pre>
          </div>
        </div>
      </Frame>
    ),
  },

  'local-result': {
    caption: 'Tu app en localhost mostrando datos de Supabase',
    notes: [
      'Debe ser la dirección de npm run dev (normalmente localhost:5173).',
      'Si ves las dos filas, la conexión con Supabase funciona. Si ves “Faltan variables”, revisa .env.local y reinicia el servidor.',
    ],
    node: () => (
      <Frame url="localhost:5173">
        <div className="sc-app">
          <span className="sc-chip">● VERCEL + SUPABASE</span> <M n={1} />
          <div className="sc-apph">Recursos desde PostgreSQL</div>
          <div className="sc-card sc-hl"><b>Mi primer deploy</b><span>Frontend conectado a Supabase</span></div>
          <div className="sc-card sc-hl"><b>Aprendiendo RLS</b><span>Lectura pública de datos de prueba</span> <M n={2} /></div>
        </div>
      </Frame>
    ),
  },

  'vercel-import': {
    caption: 'Add New → Project: lista de repositorios de GitHub',
    notes: [
      'Busca tu repositorio por nombre.',
      'Pulsa Import en el correcto.',
      '¿No aparece? Usa “Adjust GitHub App Permissions” y da acceso a ese repositorio.',
    ],
    node: () => (
      <Frame url="vercel.com/new" dark>
        <div className="sc-h">Import Git Repository</div>
        <div className="sc-row"><Field label="Cuenta">tu-usuario ▾</Field><Field label="Buscar" hl>🔍 mi-primer… <M n={1} /></Field></div>
        <div className="sc-list">
          <div className="sc-li sc-hl"><span><b>mi-primer-frontend</b> · 3m ago</span><span><span className="sc-btn sc-btn-white">Import</span> <M n={2} /></span></div>
          <div className="sc-li"><span>taller-css · 2d ago</span><span className="sc-btn sc-btn-ghost">Import</span></div>
        </div>
        <div className="sc-link">Adjust GitHub App Permissions → <M n={3} /></div>
      </Frame>
    ),
  },

  'vercel-config': {
    caption: 'New Project: configuración del build',
    notes: [
      'Framework Preset debe decir Vite. Si dice Other, cámbialo.',
      'Root Directory: ./ si package.json está en la raíz del repo. Si está en frontend/, pulsa Edit y elígela.',
      'Build Command npm run build · Output Directory dist. Son los valores del preset; no los cambies.',
    ],
    node: () => (
      <Frame url="vercel.com/new/import?s=github.com/tu-usuario/mi-primer-frontend" dark>
        <div className="sc-h">New Project</div>
        <div className="sc-row">
          <Field label="Project Name">mi-primer-frontend</Field>
          <Field label="Framework Preset" hl>⚡ Vite ▾ <M n={1} /></Field>
        </div>
        <Field label="Root Directory" hl>./ <span className="sc-chip">Edit</span> <M n={2} /></Field>
        <div className="sc-fold sc-hl">
          <div className="sc-foldh">▾ Build and Output Settings <M n={3} /></div>
          <div className="sc-row">
            <Field label="Build Command" mono>npm run build</Field>
            <Field label="Output Directory" mono>dist</Field>
            <Field label="Install Command" mono>npm install</Field>
          </div>
        </div>
      </Frame>
    ),
  },

  'vercel-env': {
    caption: 'Environment Variables (al importar, o en Settings → Environment Variables)',
    notes: [
      'Key: el nombre exacto que usa tu código, con prefijo VITE_.',
      'Value: lo que copiaste del panel de Supabase.',
      'Entornos: marca al menos Production. Agrega Preview si quieres que las ramas también funcionen.',
      'Pulsa Add / Save. Si el proyecto ya estaba desplegado, luego haz Redeploy.',
    ],
    node: () => (
      <Frame url="vercel.com/tu-usuario/mi-primer-frontend/settings/environment-variables" dark>
        <div className="sc-h">Environment Variables</div>
        <div className="sc-row sc-end">
          <Field label="Key" mono hl>VITE_SUPABASE_URL <M n={1} /></Field>
          <Field label="Value" mono hl>https://abcdefghijkl.supabase.co <M n={2} /></Field>
        </div>
        <div className="sc-row sc-end">
          <Field label="Key" mono hl>VITE_SUPABASE_PUBLISHABLE_KEY</Field>
          <Field label="Value" mono hl>sb_publishable_7Hk2…Qw9</Field>
        </div>
        <div className="sc-envs sc-hl">Environments: ☑ Production&nbsp;&nbsp;☑ Preview&nbsp;&nbsp;☐ Development <M n={3} /></div>
        <div className="sc-right"><span className="sc-btn sc-btn-white">Save</span> <M n={4} /></div>
      </Frame>
    ),
  },

  'vercel-redeploy': {
    caption: 'Deployments → ⋯ → Redeploy (necesario tras cambiar variables)',
    notes: [
      'Abre la pestaña Deployments del proyecto.',
      'En el despliegue más reciente pulsa el menú ⋯ y elige Redeploy.',
      'Las variables VITE_ se “hornean” en el JavaScript durante el build: un despliegue viejo no ve las nuevas.',
    ],
    node: () => (
      <Frame url="vercel.com/tu-usuario/mi-primer-frontend/deployments" dark>
        <div className="sc-tabs"><span>Overview</span><span className="sc-active sc-hl">Deployments <M n={1} /></span><span>Logs</span><span>Settings</span></div>
        <div className="sc-list">
          <div className="sc-li"><span><span className="sc-dot sc-dot-ok" /> <b>Ready</b> · Production · main · 12m ago</span>
            <span className="sc-menuwrap"><span className="sc-chip sc-hl">⋯ <M n={2} /></span>
              <span className="sc-menu"><span>Inspect Deployment</span><span className="sc-active">Redeploy</span><span>Promote</span></span></span></div>
          <div className="sc-li"><span><span className="sc-dot sc-dot-ok" /> Ready · Preview · rama-login · 1d ago</span><span className="sc-chip">⋯</span></div>
        </div>
        <div className="sc-note">Variables nuevas → nuevo build <M n={3} /></div>
      </Frame>
    ),
  },

  'vercel-ready': {
    caption: 'Despliegue terminado: estado Ready y dominio público',
    notes: [
      'El estado debe ser Ready. Si dice Error, abre Build Logs.',
      'Este es el dominio que compartes: https://tu-proyecto.vercel.app.',
      'Ábrelo en una ventana privada o desde el celular con datos móviles para confirmar que funciona fuera de tu PC.',
    ],
    node: () => (
      <Frame url="vercel.com/tu-usuario/mi-primer-frontend" dark>
        <div className="sc-h">Production Deployment</div>
        <div className="sc-ready">
          <div className="sc-preview"><b>Recursos desde PostgreSQL</b><span>Mi primer deploy</span><span>Aprendiendo RLS</span></div>
          <div className="sc-readyinfo">
            <Field label="Status" hl><span><span className="sc-dot sc-dot-ok" /> Ready</span> <M n={1} /></Field>
            <Field label="Domains" hl>mi-primer-frontend.vercel.app <M n={2} /></Field>
            <Field label="Source">main · “Conectar Supabase”</Field>
            <div className="sc-right"><span className="sc-btn sc-btn-white">Visit</span> <M n={3} /></div>
          </div>
        </div>
      </Frame>
    ),
  },

  'devtools-network': {
    caption: 'DevTools (F12) → pestaña Network, filtrando por “rest”',
    notes: [
      'Filtra por “rest” para ver solo las consultas a Supabase.',
      '200 = la consulta funcionó. Revisa en Response que traiga filas.',
      '401 = clave incorrecta o vacía (variables mal configuradas). 403 / 42501 = falta GRANT o política RLS.',
    ],
    node: () => (
      <Frame url="DevTools — mi-primer-frontend.vercel.app">
        <div className="sc-tabs sc-tabs-light"><span>Elements</span><span>Console</span><span className="sc-active">Network</span><span>Application</span></div>
        <div className="sc-filter sc-hl">Filter: rest <M n={1} /></div>
        <table className="sc-table sc-net">
          <thead><tr><th>Name</th><th>Status</th><th>Type</th><th>Time</th></tr></thead>
          <tbody>
            <tr className="sc-hl"><td>recursos_demo?select=id,titulo,descripcion</td><td className="sc-ok">200 <M n={2} /></td><td>fetch</td><td>143 ms</td></tr>
            <tr><td>recursos_demo?select=… <span className="sc-dim">(ejemplo de fallo)</span></td><td className="sc-bad">401 <M n={3} /></td><td>fetch</td><td>88 ms</td></tr>
          </tbody>
        </table>
      </Frame>
    ),
  },

  'supabase-auth-urls': {
    caption: 'Authentication → URL Configuration en Supabase',
    notes: [
      'Site URL: tu dominio de producción en Vercel, con https://.',
      'Redirect URLs: agrega localhost para desarrollo y las rutas de callback de producción.',
    ],
    node: () => (
      <Frame url="supabase.com/dashboard/project/abcd…/auth/url-configuration" dark>
        <div className="sc-h">URL Configuration</div>
        <Field label="Site URL" hl mono>https://mi-primer-frontend.vercel.app <M n={1} /></Field>
        <div className="sc-sub">Redirect URLs</div>
        <div className="sc-list sc-hl">
          <div className="sc-li sc-mono"><span>http://localhost:5173/**</span></div>
          <div className="sc-li sc-mono"><span>https://mi-primer-frontend.vercel.app/auth/callback</span><M n={2} /></div>
        </div>
        <div className="sc-right"><span className="sc-btn sc-btn-supa">Save changes</span></div>
      </Frame>
    ),
  },

  'vercel-logs-error': {
    caption: 'Build Logs de un despliegue fallido',
    notes: [
      'Ignora las advertencias (warn) y busca la PRIMERA línea de error real.',
      'Este error indica archivo:línea:columna. Corrígelo en tu PC, prueba npm run build y vuelve a hacer push.',
      '“Command exited with 2” es la consecuencia, no la causa.',
    ],
    node: () => (
      <Term title="Deployment · Build Logs · Error">
<span className="t-o">Cloning github.com/tu-usuario/mi-primer-frontend (Branch: main)</span>{'\n'}
Running "install" command: <span className="t-y">npm install</span>{'\n'}
<span className="t-y">npm warn deprecated inflight@1.0.6</span> <M n={1} />{'\n'}
Running "<span className="t-y">npm run build</span>"{'\n'}
<span className="t-o">&gt; tsc -b &amp;&amp; vite build</span>{'\n'}
<span className="t-b">src/App.tsx</span>(4,10): <span className="t-r">error TS6133: 'useEffect' is declared</span>{'\n'}
<span className="t-r">but its value is never read.</span> <M n={2} />{'\n'}
<span className="t-r">Error: Command "npm run build" exited with 2</span> <M n={3} />
      </Term>
    ),
  },
};

export function Screen({ id }: { id: ScreenId }) {
  const s = screens[id];
  if (!s) return null;
  return (
    <figure className="sc-figure">
      <figcaption className="sc-cap"><MonitorPlay size={14} /> ASÍ SE VE · {s.caption}</figcaption>
      <div className="sc-scroll">{s.node()}</div>
      <ol className="sc-notes">
        {s.notes.map((n, i) => <li key={n}><M n={i + 1} /><span>{n}</span></li>)}
      </ol>
    </figure>
  );
}
