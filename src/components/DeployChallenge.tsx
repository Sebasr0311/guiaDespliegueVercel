'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Dices, FolderTree, Play, RotateCcw, Terminal } from 'lucide-react';
import GlideSelect from '@/components/reactbits/GlideSelect/GlideSelect';
import JellyRadio from '@/components/reactbits/JellyRadio/JellyRadio';
import SpringCheck from '@/components/reactbits/SpringCheck/SpringCheck';
import SlideCommit from '@/components/reactbits/SlideCommit/SlideCommit';
import CallChip, { type CallChipStatus } from '@/components/reactbits/CallChip/CallChip';
import LatticeLoader from '@/components/reactbits/LatticeLoader/LatticeLoader';
import SplitFlapText from '@/components/reactbits/SplitFlapText/SplitFlapText';
import StatusMark from '@/components/reactbits/StatusMark/StatusMark';

/* Reto: el estudiante configura un despliegue ficticio y ve qué habría pasado en Vercel. */

type Scenario = { layout: 'root' | 'frontend'; router: boolean; repo: string };
type Config = {
  preset: string; root: string; build: string; output: string;
  urlName: string; keyName: string; keyType: 'publishable' | 'secret'; vercelJson: boolean;
};
type Outcome = { level: 'ok' | 'warn' | 'fail'; failedStage?: 'Clone' | 'Install' | 'Build' | 'Deploy'; title: string; detail: string; lesson: string; log: string[] };

const presets = ['Vite', 'Next.js', 'Create React App', 'Other'];
const roots = ['./', 'frontend', 'src'];
const builds = ['npm run build', 'npm run dev', 'vite'];
const outputs = ['dist', 'build', 'out', 'public'];
const urlNames = ['VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL'];
const keyNames = ['VITE_SUPABASE_PUBLISHABLE_KEY', 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_PUBLISHABLE_KEY'];

const initial: Config = { preset: 'Other', root: './', build: 'npm run dev', output: 'build', urlName: 'SUPABASE_URL', keyName: 'SUPABASE_PUBLISHABLE_KEY', keyType: 'publishable', vercelJson: false };

function randomScenario(prev?: Scenario): Scenario {
  const options: Scenario[] = [
    { layout: 'root', router: false, repo: 'mi-primer-frontend' },
    { layout: 'root', router: true, repo: 'tienda-react' },
    { layout: 'frontend', router: false, repo: 'proyecto-final' },
    { layout: 'frontend', router: true, repo: 'saas-edificios' },
  ];
  const pool = prev ? options.filter(o => o.repo !== prev.repo) : options;
  return pool[Math.floor(Math.random() * pool.length)];
}

function evaluate(s: Scenario, c: Config): Outcome {
  const base = [`Cloning github.com/tu-usuario/${s.repo} (Branch: main)`, 'Cloning completed: 402ms'];
  const expectedRoot = s.layout === 'root' ? './' : 'frontend';
  if (c.root !== expectedRoot) {
    return { level: 'fail', failedStage: 'Install', title: 'No se encontró el proyecto', lesson: 'Lección 07',
      detail: s.layout === 'root'
        ? `En este repositorio package.json está en la raíz. Con Root Directory "${c.root}", Vercel busca en una carpeta equivocada.`
        : 'En este repositorio el frontend vive en frontend/. Root Directory debe apuntar a esa carpeta, porque allí está package.json.',
      log: [...base, `Root Directory: ${c.root}`, 'Error: No package.json found in the project root directory.'] };
  }
  if (c.preset === 'Next.js') {
    return { level: 'fail', failedStage: 'Build', title: 'Preset de framework incorrecto', lesson: 'Lección 07',
      detail: 'El proyecto es React + Vite, no Next.js. El preset Next.js espera la dependencia next y su propio build. Elige Vite.',
      log: [...base, 'Running "install" command: npm install', 'added 214 packages in 8s', 'Error: No Next.js version could be detected in your project.'] };
  }
  if (c.build === 'npm run dev') {
    return { level: 'fail', failedStage: 'Build', title: 'El build nunca termina', lesson: 'Lección 02',
      detail: 'npm run dev arranca un servidor de desarrollo que se queda escuchando para siempre. Vercel necesita un comando que compile y termine: npm run build.',
      log: [...base, 'Running "npm run dev"', '  VITE v8.3.4  ready in 290 ms', '  ➜  Local:   http://localhost:5173/', '…', 'Error: Build exceeded maximum duration and was cancelled.'] };
  }
  const buildLog = [...base, 'Running "install" command: npm install', 'added 214 packages in 8s', `Running "${c.build}"`];
  if (c.build === 'vite') buildLog.push('vite v8.3.4 building for production... (sin revisar tipos con tsc)');
  else buildLog.push('> tsc -b && vite build');
  buildLog.push('✓ 41 modules transformed.', 'dist/index.html  0.46 kB', '✓ built in 1.62s');
  if (c.output !== 'dist') {
    return { level: 'fail', failedStage: 'Deploy', title: 'Carpeta de salida equivocada', lesson: 'Lección 07',
      detail: `Vite escribe el resultado en dist/. Con Output Directory "${c.output}", Vercel no encuentra nada que publicar. (build/ es de Create React App; out/ es de exportaciones de Next.js).`,
      log: [...buildLog, `Error: No Output Directory named "${c.output}" found after the Build completed.`] };
  }
  const deployLog = [...buildLog, 'Build Completed in /vercel/output [14s]', 'Deploying outputs...', 'Deployment completed · Status: Ready'];
  if (c.keyType === 'secret') {
    return { level: 'fail', failedStage: 'Deploy', title: 'Funciona… pero expusiste una clave secreta', lesson: 'Lección 04',
      detail: 'La app carga, pero la secret key quedó dentro del JavaScript público: cualquiera puede verla con F12 y saltarse RLS. En un caso real tendrías que rotarla de inmediato. Usa la publishable key.',
      log: [...deployLog, '⚠ Bundle contiene una cadena "sb_secret_…" visible para cualquier visitante'] };
  }
  if (c.urlName !== 'VITE_SUPABASE_URL' || c.keyName !== 'VITE_SUPABASE_PUBLISHABLE_KEY') {
    const nextNames = c.urlName.startsWith('NEXT_PUBLIC_') || c.keyName.startsWith('NEXT_PUBLIC_');
    return { level: 'fail', failedStage: 'Deploy', title: 'Despliega, pero la app muestra “Faltan variables de Supabase”', lesson: 'Lección 08',
      detail: nextNames
        ? 'NEXT_PUBLIC_ es el prefijo de Next.js (y el que crea la integración de Supabase del Marketplace de Vercel). Vite solo entrega al navegador variables que empiezan por VITE_, así que import.meta.env.VITE_SUPABASE_URL queda undefined.'
        : 'Sin el prefijo VITE_, Vite no incluye la variable en el código del navegador. El build pasa, pero en producción import.meta.env.VITE_SUPABASE_URL es undefined.',
      log: [...deployLog, 'Browser console › Uncaught Error: Faltan variables de Supabase'] };
  }
  if (s.router && !c.vercelJson) {
    return { level: 'warn', title: 'Casi: la portada funciona, pero recargar /perfil da 404', lesson: 'Lección 07',
      detail: 'Este proyecto usa React Router. Sin vercel.json con la reescritura a /index.html, cualquier ruta interna devuelve 404: NOT_FOUND al recargar o al abrir el enlace directo.',
      log: [...deployLog, 'GET /           200', 'GET /perfil     404 NOT_FOUND'] };
  }
  const extra = c.build === 'vite'
    ? 'Funcionó, aunque con "vite" a secas te saltas la revisión de tipos (tsc -b). Lo recomendable es npm run build.'
    : 'Framework, carpeta, comando, salida y variables son correctos. Así se configura un proyecto React + Vite + Supabase en Vercel.';
  return { level: c.build === 'vite' ? 'warn' : 'ok', title: c.build === 'vite' ? 'Desplegado, con un detalle' : '¡Despliegue perfecto!', lesson: '',
    detail: extra, log: [...deployLog, 'GET /recursos_demo  200 · 2 filas', s.router ? 'GET /perfil  200 (rewrite → /index.html)' : 'GET /  200'] };
}

function Choice({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="dc-field">
      <span>{label}</span>
      <GlideSelect ariaLabel={label} options={options} value={value} onChange={onChange} accentColor="#6355d8" surfaceColor="#ffffff" textColor="#182239" />
    </div>
  );
}

const STAGE_NAMES = ['Clone', 'Install', 'Build', 'Deploy'] as const;

export default function DeployChallenge() {
  const [scenario, setScenario] = useState<Scenario>({ layout: 'root', router: true, repo: 'tienda-react' });
  const [config, setConfig] = useState<Config>(initial);
  const [lines, setLines] = useState<string[]>([]);
  const [result, setResult] = useState<Outcome | null>(null);
  const [running, setRunning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => timers.current.forEach(t => window.clearTimeout(t)), []);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight }); }, [lines]);
  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (result) resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, [result]);

  const set = <K extends keyof Config>(k: K, v: Config[K]) => { setConfig(c => ({ ...c, [k]: v })); setResult(null); setLines([]); };
  const outcome = useMemo(() => evaluate(scenario, config), [scenario, config]);

  const runDeploy = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      timers.current.forEach(t => window.clearTimeout(t));
      setLines([]); setResult(null); setRunning(true); setAttempts(a => a + 1);
      const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      const step = reduced ? 0 : 220;
      outcome.log.forEach((line, i) => {
        timers.current.push(window.setTimeout(() => setLines(l => [...l, line]), step * (i + 1)));
      });
      timers.current.push(window.setTimeout(() => {
        setResult(outcome);
        setRunning(false);
        if (outcome.level === 'fail') reject(new Error(outcome.title));
        else resolve();
      }, step * (outcome.log.length + 1) + 50));
    });
  };

  const deploy = () => {
    runDeploy().catch(() => {});
  };

  const newScenario = () => {
    timers.current.forEach(t => window.clearTimeout(t));
    setScenario(s => randomScenario(s)); setConfig(initial); setLines([]); setResult(null); setRunning(false); setAttempts(0);
  };

  const phases = useMemo(() => {
    const failedIdx = outcome.failedStage ? STAGE_NAMES.indexOf(outcome.failedStage) : -1;
    return STAGE_NAMES.map((name, idx): { name: string; status: CallChipStatus } => {
      if (!running && !result) return { name, status: 'idle' };
      if (running) {
        if (idx === 0) return { name, status: lines.length >= 2 ? 'done' : 'running' };
        if (idx === 1) return { name, status: lines.length >= 4 ? 'done' : lines.length >= 2 ? 'running' : 'idle' };
        if (idx === 2) return { name, status: lines.length >= 7 ? 'done' : lines.length >= 4 ? 'running' : 'idle' };
        return { name, status: lines.length >= 7 ? 'running' : 'idle' };
      }
      if (result?.level === 'fail') {
        if (idx < failedIdx) return { name, status: 'done' };
        if (idx === failedIdx) return { name, status: 'error' };
        return { name, status: 'idle' };
      }
      return { name, status: 'done' };
    });
  }, [running, result, lines.length, outcome.failedStage]);

  const tree = scenario.layout === 'root'
    ? ['📁 ' + scenario.repo + '/', '├─ src/', '├─ public/', '├─ index.html', '├─ package.json', '├─ vite.config.ts', '└─ .env.local  (no se sube)']
    : ['📁 ' + scenario.repo + '/', '├─ docs/', '├─ frontend/', '│  ├─ src/', '│  ├─ index.html', '│  ├─ package.json', '│  └─ vite.config.ts', '└─ README.md'];

  return (
    <div className="dc">
      <div className="dc-head">
        <div>
          <span className="eyebrow">RETO PRÁCTICO</span>
          <h2>Configura el despliegue y pulsa Deploy</h2>
          <p>Mira cómo está organizado el repositorio, completa la pantalla de Vercel y descubre qué habría pasado. Cada error es uno de los que más se ven en clase.</p>
        </div>
        <button className="btn secondary" onClick={newScenario}><Dices size={16} /> Otro proyecto</button>
      </div>

      <div className="dc-grid">
        <div className="dc-card">
          <div className="dc-cardh"><FolderTree size={16} /> El repositorio</div>
          <pre className="dc-tree">{tree.join('\n')}</pre>
          <ul className="dc-facts">
            <li>React + Vite + TypeScript</li>
            <li>Lee datos de Supabase con <code>import.meta.env.VITE_SUPABASE_URL</code> y <code>…VITE_SUPABASE_PUBLISHABLE_KEY</code></li>
            <li>{scenario.router ? 'Usa React Router (rutas como /perfil y /login)' : 'Una sola página, sin rutas internas'}</li>
          </ul>
        </div>

        <div className="dc-card">
          <div className="dc-cardh">Pantalla “New Project” de Vercel</div>
          <div className="dc-form">
            <Choice label="Framework Preset" value={config.preset} options={presets} onChange={v => set('preset', v)} />
            <Choice label="Root Directory" value={config.root} options={roots} onChange={v => set('root', v)} />
            <Choice label="Build Command" value={config.build} options={builds} onChange={v => set('build', v)} />
            <Choice label="Output Directory" value={config.output} options={outputs} onChange={v => set('output', v)} />
          </div>
          <div className="dc-cardh dc-sep">Environment Variables</div>
          <div className="dc-form">
            <Choice label="Nombre para la URL" value={config.urlName} options={urlNames} onChange={v => set('urlName', v)} />
            <Choice label="Nombre para la clave" value={config.keyName} options={keyNames} onChange={v => set('keyName', v)} />
            <div className="dc-field dc-wide">
              <span>Valor de la clave que pegaste</span>
              <JellyRadio
                ariaLabel="Valor de la clave que pegaste"
                value={config.keyType}
                onChange={v => set('keyType', v as Config['keyType'])}
                items={[{ value: 'publishable', label: 'sb_publishable_…' }, { value: 'secret', label: 'sb_secret_…' }]}
                chipColor="#eef0f8"
                activeColor="#6355d8"
                activeTextColor="#ffffff"
              />
            </div>
          </div>
          <div className="dc-check">
            <SpringCheck
              label="El repositorio incluye vercel.json con rewrite a /index.html"
              color="#182239"
              fillColor="#6355d8"
              checkColor="#ffffff"
              checked={config.vercelJson}
              onChange={c => set('vercelJson', c)}
            />
          </div>
          <div className="dc-deploy-actions">
            <button className="btn primary dc-deploy" onClick={deploy} disabled={running}><Play size={16} fill="currentColor" /> {running ? 'Desplegando…' : 'Deploy'}</button>
            <div className="dc-slide-wrap">
              <SlideCommit
                key={`${scenario.repo}-${attempts}`}
                label="O desliza para desplegar"
                doneLabel="Ready"
                errorLabel="Error en el deploy"
                handleColor="#6355d8"
                successColor="#16a36a"
                dangerColor="#d93a4a"
                onConfirm={runDeploy}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="dc-phases" aria-label="Fases del despliegue">
        {phases.map(p => (
          <CallChip
            key={p.name}
            name={p.name}
            status={p.status}
            expectedMs={900}
            surfaceColor="#f1f0fb"
            color="#182239"
            progressColor="#6355d8"
            doneColor="#16a36a"
            errorColor="#d93a4a"
          />
        ))}
      </div>

      <div className="dc-log" ref={logRef} aria-live="polite">
        <div className="dc-logh">
          <Terminal size={14} /> Build Logs
          {(running || result) && (
            <span className="dc-loader-badge">
              <LatticeLoader
                label="Desplegando…"
                doneLabel="Listo"
                errorLabel="Falló"
                status={running ? 'working' : result?.level === 'fail' ? 'error' : 'done'}
                color="#8873ff"
                showTimer
              />
            </span>
          )}
          {attempts > 0 && <small>intento {attempts}</small>}
        </div>
        {lines.length === 0 && !running && <p className="dc-empty">Pulsa Deploy para ver el registro.</p>}
        {lines.map((l, i) => <div key={i} className={/Error|Uncaught|404 NOT/.test(l) ? 'dc-err' : /⚠/.test(l) ? 'dc-warnl' : /✓|Ready|200/.test(l) ? 'dc-okl' : ''}>{l}</div>)}
      </div>

      {result && (
        <div ref={resultRef} className={`dc-result dc-${result.level}`} role="status">
          <StatusMark
            status={result.level === 'fail' ? 'failed' : 'done'}
            color="#6355d8"
            doneColor="#16a36a"
            errorColor="#d93a4a"
            size={28}
          />
          <div>
            <div className="dc-result-head">
              <b>{result.title}</b>
              <SplitFlapText
                words={[result.level === 'fail' ? 'ERROR' : result.level === 'warn' ? 'WARN' : 'READY']}
                fontSize={16}
                tileColor="#182239"
                textColor="#ffffff"
              />
            </div>
            <p>{result.detail}</p>
            {result.lesson && <small>Repasa: {result.lesson}. Cambia la configuración y vuelve a pulsar Deploy.</small>}
            {result.level === 'ok' && <small>Lo lograste en {attempts} {attempts === 1 ? 'intento' : 'intentos'}. Prueba con otro proyecto.</small>}
          </div>
          {result.level !== 'ok' && <button className="btn secondary" onClick={() => { setResult(null); setLines([]); }}><RotateCcw size={15} /> Corregir</button>}
        </div>
      )}
    </div>
  );
}
