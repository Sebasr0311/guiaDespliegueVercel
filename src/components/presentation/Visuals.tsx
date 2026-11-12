'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Check, CheckCircle2, ChevronRight, Code2, FolderUp, Github, Globe, Lock, Mail, MousePointer2, Sparkles, XCircle
} from 'lucide-react';
import DecryptedText from '@/components/reactbits/DecryptedText/DecryptedText';
import ShinyText from '@/components/reactbits/ShinyText';
import type { CodeBlock, Visual } from '@/data/presentation';

const ease = [0.22, 1, 0.36, 1] as const;

/** Cycles through `count` phases, holding each one for the given duration (ms). */
function usePhase(durations: number[]) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setPhase(p => (p + 1) % durations.length), durations[phase]);
    return () => window.clearTimeout(id);
  }, [phase, durations]);
  return phase;
}

/* ---------------- Confetti ---------------- */
const CONFETTI_COLORS = ['#3ee8a0', '#9d8cff', '#4cc9f0', '#ff6b8a', '#ffc861'];
export function Confetti({ count = 36 }: { count?: number }) {
  return (
    <div className="v-confetti" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const left = (i * 37) % 100;
        const delay = ((i * 53) % 40) / 10;
        const duration = 2.6 + ((i * 17) % 20) / 10;
        const rotate = (i * 47) % 360;
        const style = {
          left: `${left}%`,
          background: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--rot': `${rotate}deg`,
          width: i % 3 === 0 ? 8 : 12,
          height: i % 3 === 0 ? 8 : 6,
          borderRadius: i % 3 === 0 ? '50%' : 2
        } as CSSProperties;
        return <i key={i} style={style} />;
      })}
    </div>
  );
}

/* ---------------- Window chrome ---------------- */
function WindowChrome({ children, title, dark = true, className = '' }: { children: ReactNode; title?: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`v-window ${dark ? 'is-dark' : ''} ${className}`}>
      <div className="v-window-bar">
        <span className="v-dots"><i /><i /><i /></span>
        {title}
      </div>
      {children}
    </div>
  );
}

/* ---------------- Code / terminal ---------------- */
export function CodeWindow({ block }: { block: CodeBlock }) {
  const isTerminal = block.file === 'terminal';
  const lines = block.code.split('\n');
  return (
    <WindowChrome
      className="v-code"
      title={<span className="v-window-title">{isTerminal ? <><ChevronRight size={15} /> terminal</> : <><Code2 size={15} /> {block.file}</>}</span>}
    >
      <pre className={isTerminal ? 'is-terminal' : 'is-editor'}>
        {lines.map((line, i) => {
          const comment = line.trim().startsWith('#') || line.trim().startsWith('//');
          const diff = line.startsWith('+ ') ? 'add' : line.startsWith('- ') ? 'del' : '';
          return (
            <motion.span
              key={i}
              className={`v-line ${comment ? 'is-comment' : ''} ${diff ? `is-${diff}` : ''}`}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.13, duration: 0.45, ease }}
            >
              <em>{isTerminal ? (line && !comment ? '$' : ' ') : String(i + 1).padStart(2, ' ')}</em>
              {line || ' '}
              {i === lines.length - 1 && <b className="v-caret" />}
            </motion.span>
          );
        })}
      </pre>
    </WindowChrome>
  );
}

/* ---------------- Flow: code → GitHub → Vercel → Internet ---------------- */
const flowNodes = [
  { glyph: '</>', title: 'Tu código', sub: 'HTML · CSS · JS · React', tone: 'green' },
  { glyph: 'git', title: 'GitHub', sub: 'repositorio', tone: 'white' },
  { glyph: 'build', title: 'Vercel', sub: 'instala, construye y publica', tone: 'purple' },
  { glyph: 'www', title: 'Internet', sub: 'tu-app.vercel.app', tone: 'cyan' }
];
const flowLinks = ['git push', 'aviso automático', 'deploy'];

function FlowVisual() {
  return (
    <div className="v-flow">
      <div className="v-flow-head"><ShinyText text="Cada git push = una nueva versión en línea" color="#c9cadb" shineColor="#ffffff" speed={3} /></div>
      <div className="v-flow-row">
        {flowNodes.map((n, i) => (
          <div className="v-flow-piece" key={n.title}>
            <motion.div
              className={`v-flow-node tone-${n.tone}`}
              initial={{ opacity: 0, scale: 0.55, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.32, type: 'spring', stiffness: 160, damping: 16 }}
            >
              <span className="v-flow-ring" style={{ animationDelay: `${i * 0.9}s` }} />
              <b>{n.glyph}</b>
            </motion.div>
            <motion.div className="v-flow-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 + i * 0.32 }}>
              <strong>{n.title}</strong>
              <small>{n.sub}</small>
            </motion.div>
            {i < flowLinks.length && (
              <motion.div
                className="v-flow-link"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.7 + i * 0.32, duration: 0.5, ease }}
              >
                <span>{flowLinks[i]}</span>
                <i className="v-flow-track"><b style={{ animationDelay: `${1.6 + i * 0.6}s` }} /></i>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Deployment states ---------------- */
const stateSteps = [
  { label: 'Queued', sub: 'en cola', logs: ['Cloning github.com/tu-usuario/mi-app (main)'] },
  { label: 'Building', sub: 'construyendo', logs: ['Running "npm install"', 'Running "npm run build"', 'vite v6 building for production…', '✓ built in 1.84s'] },
  { label: 'Deploying', sub: 'publicando', logs: ['Uploading build outputs to the global network…'] },
  { label: 'Ready', sub: 'URL activa', logs: ['✓ Ready  https://mi-app.vercel.app'] }
];
const STATE_DURATIONS = [1300, 2300, 1400, 3200];

function StatesVisual() {
  const phase = usePhase(STATE_DURATIONS);
  const logs = stateSteps.slice(0, phase + 1).flatMap(s => s.logs);
  return (
    <div className="v-states">
      <div className="v-states-row">
        {stateSteps.map((s, i) => {
          const status = i < phase ? 'done' : i === phase ? 'active' : 'idle';
          return (
            <div key={s.label} className={`v-state is-${status} ${s.label === 'Ready' ? 'is-ready' : ''}`}>
              <span className="v-state-dot">{status === 'done' || (status === 'active' && s.label === 'Ready') ? <Check size={16} /> : <i />}</span>
              <div><strong>{s.label}</strong><small>{s.sub}</small></div>
            </div>
          );
        })}
      </div>
      <div className="v-states-progress"><motion.span animate={{ width: `${((phase + 1) / stateSteps.length) * 100}%` }} transition={{ duration: 0.8, ease }} /></div>
      <WindowChrome className="v-logs" title={<span className="v-window-title">Build Logs</span>}>
        <div className="v-logs-body">
          <AnimatePresence initial={false}>
            {logs.map(line => (
              <motion.p
                key={line}
                className={line.startsWith('✓') ? 'is-ok' : ''}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                {line}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </WindowChrome>
    </div>
  );
}

/* ---------------- Branches & previews ---------------- */
const BRANCH_PATH = 'M 330 120 C 400 120 400 300 480 300 L 800 300 C 880 300 880 120 960 120';

function BranchesVisual() {
  return (
    <div className="v-branches">
      <svg viewBox="0 0 1200 420" role="img" aria-label="La rama main publica en producción; la rama nueva-funcion genera una preview y vuelve a main con un merge">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <motion.path d="M 60 120 L 1140 120" stroke="#3ee8a0" strokeWidth="6" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1.4, ease }} />
        <motion.path d={BRANCH_PATH} stroke="#9d8cff" strokeWidth="6" strokeLinecap="round" fill="none" strokeDasharray="1 0"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.6, ease }} />
        {[120, 330].map((x, i) => (
          <motion.circle key={x} cx={x} cy={120} r={16} fill="#0c0c12" stroke="#3ee8a0" strokeWidth="5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.3, type: 'spring' }} style={{ transformOrigin: `${x}px 120px` }} />
        ))}
        {[560, 720].map((x, i) => (
          <motion.circle key={x} cx={x} cy={300} r={16} fill="#0c0c12" stroke="#9d8cff" strokeWidth="5"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2 + i * 0.3, type: 'spring' }} style={{ transformOrigin: `${x}px 300px` }} />
        ))}
        <motion.circle cx={960} cy={120} r={22} fill="#3ee8a0" filter="url(#glow)"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 2.9, type: 'spring' }} style={{ transformOrigin: '960px 120px' }} />
        <circle r="9" fill="#fff" filter="url(#glow)">
          <animateMotion dur="3.4s" begin="3s" repeatCount="indefinite" path={BRANCH_PATH} />
        </circle>
      </svg>
      <motion.div className="v-tag tone-green" style={{ left: '4%', top: '6%' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <b>main</b> → producción · <code>mi-app.vercel.app</code>
      </motion.div>
      <motion.div className="v-tag tone-purple" style={{ left: '38%', top: '82%' }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.3 }}>
        <b>nueva-funcion</b> → preview con su propia URL
      </motion.div>
      <motion.div className="v-tag tone-white" style={{ left: '74%', top: '6%' }} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1 }}>
        <b>merge</b> → se publica
      </motion.div>
    </div>
  );
}

/* ---------------- Instant Rollback ---------------- */
const ROLLBACK_DURATIONS = [2400, 3200];
function RollbackVisual() {
  const phase = usePhase(ROLLBACK_DURATIONS);
  const versions = [
    { v: 'v1', ok: true },
    { v: 'v2', ok: true },
    { v: 'v3', ok: false }
  ];
  const target = phase === 0 ? 2 : 1;
  return (
    <div className="v-rollback">
      <div className="v-rollback-row">
        {versions.map((item, i) => (
          <motion.div
            key={item.v}
            className={`v-version ${item.ok ? 'is-ok' : 'is-bad'} ${target === i ? 'is-live' : ''}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.2, duration: 0.5, ease }}
          >
            <strong>{item.v}</strong>
            <span>{item.ok ? <><CheckCircle2 size={18} /> Funciona</> : <><XCircle size={18} /> ¡Error!</>}</span>
          </motion.div>
        ))}
      </div>
      <div className="v-rollback-rail">
        <motion.div
          className={`v-domain ${phase === 0 ? 'is-bad' : 'is-ok'}`}
          animate={{ left: `${(target / 3) * 100 + 100 / 6}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          <Globe size={18} /> mi-app.vercel.app
        </motion.div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={phase}
          className={`v-rollback-caption ${phase === 0 ? 'is-bad' : 'is-ok'}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {phase === 0 ? 'Producción apunta a v3… y tiene un error.' : 'Instant Rollback: el dominio vuelve a v2 en segundos, sin reconstruir.'}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Browser mock ---------------- */
function BrowserVisual({ url, env, heading, message, confetti }: Extract<Visual, { type: 'browser' }>) {
  return (
    <motion.div className="v-browser-wrap" initial={{ opacity: 0, y: 40, rotateX: 12 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.45, duration: 0.9, ease }}>
      <WindowChrome
        className="v-browser"
        title={
          <span className="v-url">
            <Lock size={14} />
            <DecryptedText text={url} animateOn="view" speed={45} sequential revealDirection="start" />
          </span>
        }
      >
        <div className="v-page">
          {confetti && <Confetti />}
          {env && <span className={`v-env env-${env}`}><i /> Entorno {env}</span>}
          <motion.div className="v-page-card" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, duration: 0.6, ease }}>
            <span className="v-avatar"><Sparkles size={26} /></span>
            <h4>{heading}</h4>
            {message && <p>{message}</p>}
            <span className="v-fake-btn">🎉 Lanzar confeti</span>
          </motion.div>
        </div>
      </WindowChrome>
    </motion.div>
  );
}

/* ---------------- Phone mock ---------------- */
function PhoneVisual() {
  return (
    <motion.div className="v-phone-stage" initial={{ opacity: 0, y: 60, rotate: 6 }} animate={{ opacity: 1, y: 0, rotate: -4 }} transition={{ delay: 0.4, duration: 1, ease }}>
      <div className="v-phone">
        <span className="v-phone-notch" />
        <div className="v-phone-screen">
          <Confetti count={30} />
          <span className="v-phone-url"><Lock size={11} /> mi-primer-deploy.vercel.app</span>
          <span className="v-avatar"><Sparkles size={24} /></span>
          <small>Hola, soy</small>
          <strong>Tu nombre</strong>
          <p>Esta página la publiqué yo, en vivo, en el taller.</p>
          <span className="v-fake-btn">🎉 Lanzar confeti</span>
        </div>
      </div>
      <motion.span className="v-float tone-green" style={{ left: -70, top: 120 }} animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
        <CheckCircle2 size={18} /> Ready
      </motion.span>
      <motion.span className="v-float tone-purple" style={{ right: -90, bottom: 150 }} animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 4.6 }}>
        <Globe size={18} /> En línea
      </motion.span>
    </motion.div>
  );
}

/* ---------------- Vercel Drop ---------------- */
const DROP_DURATIONS = [1800, 1800, 3000];
function DropzoneVisual() {
  const phase = usePhase(DROP_DURATIONS);
  return (
    <WindowChrome className="v-drop" title={<span className="v-url"><Lock size={14} /> vercel.com/drop</span>}>
      <div className={`v-drop-zone phase-${phase}`}>
        <motion.div
          key={`folder-${phase === 0}`}
          className="v-drop-folder"
          initial={phase === 0 ? { x: -260, y: -170, rotate: -12, opacity: 0 } : false}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease }}
        >
          <FolderUp size={58} />
          <span>01-pagina-estatica</span>
          {phase === 0 && <MousePointer2 className="v-drop-cursor" size={30} />}
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.div key={phase} className="v-drop-status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {phase === 0 && <>Suelta aquí la carpeta</>}
            {phase === 1 && <><span className="v-spinner" /> Subiendo y desplegando…</>}
            {phase === 2 && <span className="is-ok"><CheckCircle2 size={20} /> Ready · mi-primer-deploy.vercel.app</span>}
          </motion.div>
        </AnimatePresence>
        <div className="v-drop-bar"><motion.span animate={{ width: phase === 0 ? '0%' : phase === 1 ? '70%' : '100%' }} transition={{ duration: 1.4, ease }} /></div>
      </div>
    </WindowChrome>
  );
}

/* ---------------- Sign up ---------------- */
function SignupVisual() {
  return (
    <WindowChrome className="v-signup" title={<span className="v-url"><Lock size={14} /> vercel.com/signup</span>}>
      <div className="v-signup-body">
        <span className="v-triangle" aria-hidden="true" />
        <h4>Crea tu cuenta de Vercel</h4>
        <div className="v-plan-row">
          <motion.div className="v-plan is-picked" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <span className="v-radio" /><div><strong>Hobby</strong><small>Proyectos personales · $0</small></div>
          </motion.div>
          <motion.div className="v-plan" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
            <span className="v-radio" /><div><strong>Pro</strong><small>Equipos y empresas</small></div>
          </motion.div>
        </div>
        <motion.div className="v-gh-btn" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1, type: 'spring' }}>
          <Github size={20} /> Continue with GitHub
          <span className="v-pulse" />
        </motion.div>
        <div className="v-mail-btn"><Mail size={18} /> Continue with Email</div>
      </div>
    </WindowChrome>
  );
}

/* ---------------- New Project form ---------------- */
const formFields = [
  { label: 'Project Name', value: 'mi-primer-deploy' },
  { label: 'Framework Preset', value: 'Other' },
  { label: 'Root Directory', value: './' },
  { label: 'Build and Output Settings', value: '▸' },
  { label: 'Environment Variables', value: '▸' }
];
const FORM_DURATIONS = [1300, 1300, 1300, 1300, 1300, 2000];
function NewProjectVisual() {
  const phase = usePhase(FORM_DURATIONS);
  return (
    <WindowChrome className="v-form" title={<span className="v-url"><Lock size={14} /> vercel.com/new</span>}>
      <div className="v-form-body">
        <div className="v-form-head"><Github size={18} /> Importing from GitHub · <b>tu-usuario/mi-primer-deploy</b></div>
        {formFields.map((f, i) => (
          <div key={f.label} className={`v-field ${phase === i ? 'is-focus' : ''}`}>
            <span className="v-field-num">{i + 1}</span>
            <label>{f.label}</label>
            <span className="v-field-input">{f.value}</span>
          </div>
        ))}
        <div className={`v-deploy-btn ${phase === 5 ? 'is-focus' : ''}`}>
          <span className="v-field-num">6</span> Deploy
        </div>
      </div>
    </WindowChrome>
  );
}

export function VisualView({ visual }: { visual: Visual }) {
  switch (visual.type) {
    case 'flow': return <FlowVisual />;
    case 'states': return <StatesVisual />;
    case 'branches': return <BranchesVisual />;
    case 'rollback': return <RollbackVisual />;
    case 'phone': return <PhoneVisual />;
    case 'dropzone': return <DropzoneVisual />;
    case 'signup': return <SignupVisual />;
    case 'newProject': return <NewProjectVisual />;
    case 'browser': return <BrowserVisual {...visual} />;
  }
}
