'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, ArrowLeft, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, Cloud, Code2, Copy, Database, ExternalLink,
  FileText, Filter, GitBranch, Github, Globe2, GraduationCap, KeyRound, Layers3,
  Lightbulb, ListChecks, LockKeyhole, Menu, MonitorPlay, MoonStar, Play, Rocket,
  Search, ShieldCheck, Sparkles, Terminal, Trophy, WandSparkles, X, Zap, AlertTriangle,
  ClipboardCheck, Compass, LoaderCircle, Settings2, CheckCircle, RotateCcw
} from 'lucide-react';
import { faqs, lessons, quiz, type Lesson, type Snippet } from '@/data/lessons';
import ShinyText from '@/components/reactbits/ShinyText';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import AnimatedContent from '@/components/reactbits/AnimatedContent';
import ClickSpark from '@/components/reactbits/ClickSpark';
import GradientText from '@/components/reactbits/GradientText';
import TextType from '@/components/reactbits/TextType';
import StarBorder from '@/components/reactbits/StarBorder';
import GlareHover from '@/components/reactbits/GlareHover';
import Magnet from '@/components/reactbits/Magnet';
import FadeContent from '@/components/reactbits/FadeContent';

const icons:Record<string,typeof Rocket>={
  route:Compass, terminal:Terminal, github:Github, database:Database,'shield-check':ShieldCheck,
  braces:Code2,'cloud-upload':Cloud,'key-round':KeyRound,rocket:Rocket,users:GraduationCap,
  wrench:Settings2,'book-open':BookOpen
};
const blocks = [
  {label:'Código local',sub:'React + Vite + TypeScript',icon:Code2,tone:'sky'},
  {label:'GitHub',sub:'Repositorio y commits',icon:Github,tone:'purple'},
  {label:'Vercel',sub:'Frontend en HTTPS',icon:Cloud,tone:'black'},
  {label:'Supabase',sub:'PostgreSQL + RLS',icon:Database,tone:'green'}
];
const simulator = [
  {label:'GitHub',eyebrow:'1 / 5 · SUBIR CÓDIGO',title:'Tu código necesita un origen remoto',hint:'Crea un repositorio, verifica package.json y envía tu rama main.',left:['Repository: mi-primer-frontend','Branch: main','package.json ✓','src/ ✓','Commit: frontend listo ✓'],right:'El repositorio ya puede ser importado por Vercel.'},
  {label:'Supabase',eyebrow:'2 / 5 · CREAR BACKEND',title:'Configura tu proyecto en Supabase',hint:'Crea un proyecto y recupera la URL y la clave publishable.',left:['Project: mi-backend','Status: Healthy','Project URL: https://••••.supabase.co','Publishable key: sb_publishable_•••','Region: seleccionada ✓'],right:'Recuerda: la clave secreta jamás va al frontend.'},
  {label:'RLS',eyebrow:'3 / 5 · SEGURIDAD',title:'Permite leer solo los datos que quieres mostrar',hint:'Crea la tabla demo y habilita una política SELECT para anon.',left:['Table: recursos_demo','RLS: Enabled ✓','Role: anon','Allowed: SELECT ✓','INSERT / UPDATE / DELETE: blocked ✓'],right:'RLS limita las filas; GRANT controla las operaciones.'},
  {label:'Vercel',eyebrow:'4 / 5 · CONFIGURAR DEPLOY',title:'Importa GitHub y establece variables',hint:'Verifica framework, directorio raíz y los valores de Supabase.',left:['Import Git Repository ✓','Framework Preset: Vite','Root Directory: ./','VITE_SUPABASE_URL ✓','VITE_SUPABASE_PUBLISHABLE_KEY ✓'],right:'En React + Vite, ambas variables públicas comienzan por VITE_.'},
  {label:'Producción',eyebrow:'5 / 5 · VERIFICAR',title:'Tu frontend está en producción',hint:'Abre el enlace y comprueba que la consulta funciona desde otra ventana.',left:['Deployment status: READY','Domain: mi-app.vercel.app','HTTPS certificate: ✓','Consulta Supabase: respuesta válida','Records received: 2 ✓'],right:'Esta simulación es didáctica: los estados no consultan servicios reales.'},
];

function SnippetCard({item}:{item:Snippet}){
  const [copied,setCopied]=useState(false);
  const copy=async()=>{try{await navigator.clipboard.writeText(item.code);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}catch{setCopied(false)}};
  return <div className="snippet">
    <div className="snippet-head"><div className="snippet-dots"><i/><i/><i/></div><span>{item.label}</span><span className="snippet-lang">{item.language}</span><button className="copy-btn" onClick={copy} aria-label={`Copiar ${item.label}`}>{copied?<Check size={15}/>:<Copy size={15}/>} {copied?'Copiado':'Copiar'}</button></div>
    <pre tabIndex={0}><code>{item.code}</code></pre>{item.note&&<p className="snippet-foot">{item.note}</p>}
  </div>
}

function ArchMap(){
  return <div className="arch-map" aria-label="Diagrama: desarrollo local a GitHub, Vercel y Supabase">
    <div className="arch-ambient"/>
    {blocks.map((b,i)=>{const Icon=b.icon;return <div className="arch-piece" key={b.label}>
      <SpotlightCard theme="light" spotlightColor="#6355d8" intensity={0.22} spotlightSize={190} className={`arch-node ${b.tone}`}>
        <div className="arch-symbol"><Icon size={24}/></div><b>{b.label}</b><small>{b.sub}</small>
      </SpotlightCard>
      {i!==blocks.length-1&&<div className="arch-link"><span/><ArrowRight size={19}/></div>}
    </div>})}
    <div className="arch-note"><Zap size={14}/> Consulta segura desde el navegador · HTTPS + políticas RLS</div>
  </div>
}

function SimulatedScreen({index}:{index:number}){
  const s=simulator[index];
  return <div className="sim-screen">
    <div className="sim-windowhead"><span className="dots"><i/><i/><i/></span><div className="sim-address"><LockKeyhole size={11}/> dashboard.{index===0?'github.com':index===1||index===2?'supabase.com':'vercel.com'}</div><div className="sim-windowmenu">•••</div></div>
    <div className="sim-windowbody">
      <div className="sim-screennav"><div className="sim-screenlogo">{index===0?<Github size={22}/>:index===1||index===2?<Database size={22}/>:<Cloud size={22}/>}</div><span className="sim-bar wide"/><span className="sim-bar"/><span className="sim-bar thin"/><span className="sim-bar"/></div>
      <div className="sim-screencontent"><div className="sim-label">WORKSPACE / PROJECT</div><div className="sim-title">{s.label} <span className="sim-status"><CheckCircle2 size={12}/> Demo</span></div><div className="sim-screenrows">{s.left.map((line,k)=><div className="sim-row" key={line}><span className="sim-index">{String(k+1).padStart(2,'0')}</span><span>{line}</span>{k>0&&<Check size={13} className="sim-ok"/>}</div>)}</div><div className="sim-bottom"><span className="sim-pulse"/> {s.right}</div></div>
    </div>
  </div>
}

function QuizPanel(){
 const [answers,setAnswers]=useState<Record<number,number>>({});const [checked,setChecked]=useState(false);
 const score=quiz.reduce((n,q,i)=>n+(answers[i]===q.answer?1:0),0);
 return <div className="assessment">
  <div className="assessment-top"><div><span className="eyebrow">EVALUACIÓN FINAL</span><h2>¿Ya puedes desplegar sin ayuda?</h2><p>Responde estas preguntas para validar lo que aprendiste.</p></div><div className="score-token"><Trophy size={25}/><b>{checked?`${score}/${quiz.length}`:'— / 6'}</b><span>{checked?'respuestas correctas':'tu resultado'}</span></div></div>
  {quiz.map((q,i)=><div key={q.q} className="quiz-question"><div className="quiz-questiontitle"><span>{String(i+1).padStart(2,'0')}</span><b>{q.q}</b></div><div className="quiz-options">{q.options.map((o,j)=><button key={o} className={`quiz-option ${answers[i]===j?'picked':''} ${checked&&j===q.answer?'correct':''} ${checked&&answers[i]===j&&j!==q.answer?'incorrect':''}`} onClick={()=>{if(!checked)setAnswers(a=>({...a,[i]:j}))}} disabled={checked}><span className="radio-dot"/>{o}</button>)}</div>{checked&&<div className="quiz-why"><Lightbulb size={16}/>{q.why}</div>}</div>)}
  <div className="quiz-actions"><button className="btn primary" disabled={Object.keys(answers).length!==quiz.length&&!checked} onClick={()=>{if(checked){setAnswers({});setChecked(false)}else setChecked(true)}}>{checked?<RotateCcw size={17}/>:<ClipboardCheck size={17}/>} {checked?'Reintentar':'Calificar respuestas'}</button><span>{Object.keys(answers).length}/{quiz.length} respondidas</span></div>
  {checked&&<p className="quiz-result">{score===quiz.length?'¡Excelente! Dominaste todos los conceptos.':'Buen trabajo. Revisa las explicaciones y vuelve a intentar.'}</p>}
 </div>
}

export default function Guide(){
 const [active,setActive]=useState('mapa');const [tab,setTab]=useState<'guia'|'simulador'|'problemas'|'evaluacion'>('guia');
 const [query,setQuery]=useState('');const [category,setCategory]=useState('Todos');const [done,setDone]=useState<string[]>([]);
 const [menu,setMenu]=useState(false);const [sim,setSim]=useState(0);const [faqOpen,setFaqOpen]=useState<number[]>([0]);const [faqFilter,setFaqFilter]=useState('Todos');
 const [started,setStarted]=useState(false);
 useEffect(()=>{try{const saved=localStorage.getItem('deploylab-progress-v1');if(saved){const parsed=JSON.parse(saved);if(Array.isArray(parsed))setDone(parsed.filter((v):v is string=>typeof v==='string'))}}catch{}},[]);
 useEffect(()=>{try{localStorage.setItem('deploylab-progress-v1',JSON.stringify(done))}catch{}},[done]);
 const current=lessons.find(l=>l.id===active)??lessons[0];const currentIndex=lessons.findIndex(l=>l.id===current.id);
 const filtered=useMemo(()=>lessons.filter(l=>(category==='Todos'||l.kind===category)&&(`${l.title} ${l.lead} ${l.tag}`.toLowerCase().includes(query.trim().toLowerCase()))),[query,category]);
 const progress=Math.round(done.length/lessons.length*100);
 const select=(id:string)=>{setActive(id);setTab('guia');setMenu(false);setStarted(true);window.scrollTo({top:0,behavior:'smooth'})};
 const toggle=(id:string)=>setDone(d=>d.includes(id)?d.filter(x=>x!==id):[...d,id]);
 const setView=(view:typeof tab)=>{setTab(view);setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
 const IconCurrent=icons[current.icon]??BookOpen;
 return <ClickSpark sparkColor={['#8873ff', '#3ecaba', '#6355d8']} sparkSize={10} sparkRadius={20} sparkCount={8} duration={420}>
 <div className="app-shell">
  <aside className={`sidebar ${menu?'is-open':''}`}>
    <div className="brand"><span className="brand-logo"><Layers3 size={23}/></span><div><strong>deploy<span>lab.</span></strong><small>THE BUILD-TO-LAUNCH GUIDE</small></div><button className="mobile-close" onClick={()=>setMenu(false)} aria-label="Cerrar menú"><X size={20}/></button></div>
    <div className="sidebar-core"><p className="side-caption">TU AULA DIGITAL</p><button className={`side-primary ${tab==='guia'?'active':''}`} onClick={()=>setView('guia')}><BookOpen size={17}/> Ruta de aprendizaje <span>{lessons.length}</span></button><button className={`side-primary ${tab==='simulador'?'active':''}`} onClick={()=>setView('simulador')}><MonitorPlay size={17}/> Simulador interactivo</button><button className={`side-primary ${tab==='problemas'?'active':''}`} onClick={()=>setView('problemas')}><CircleHelp size={17}/> Centro de soluciones</button><button className={`side-primary ${tab==='evaluacion'?'active':''}`} onClick={()=>setView('evaluacion')}><Trophy size={17}/> Pon a prueba lo aprendido</button>
     <div className="sidebar-divide"/><p className="side-caption">CAPÍTULOS DEL CURSO</p>
     <div className="side-chapters">{lessons.map((l,i)=>{const I=icons[l.icon]??BookOpen;return <button key={l.id} onClick={()=>select(l.id)} className={`chapter-link ${l.id===active&&tab==='guia'?'chosen':''}`}><span className="chapter-num">{String(i+1).padStart(2,'0')}</span><span className="chapter-text">{l.title}</span>{done.includes(l.id)?<CheckCircle2 size={15} className="chapter-done"/>:<I size={15} className="chapter-idle"/>}</button>})}</div>
    </div>
    <div className="sidebar-bottom"><div className="sidebar-progress-head"><span>Tu progreso</span><strong>{progress}%</strong></div><div className="progress-track"><span style={{width:`${progress}%`}}/></div><small>{done.length} de {lessons.length} capítulos completados</small><div className="sidebar-brandnote"><ShieldCheck size={14}/> Sin cuenta ni registro · avances locales</div></div>
  </aside>
  {menu&&<button className="mobile-overlay" onClick={()=>setMenu(false)} aria-label="Cerrar menú"/>}
  <main className="main-panel">
    <div className="topbar"><button className="mobile-menu" onClick={()=>setMenu(true)} aria-label="Abrir menú"><Menu size={21}/></button><span className="breadcrumb"><span>ACADEMIA</span> <ChevronRight size={14}/> {tab==='guia'?'Ruta de despliegue':tab==='simulador'?'Simulación':tab==='problemas'?'Solución de errores':'Evaluación'}</span><div className="topbar-right"><span className="live-indicator"><i/> <ShinyText text="GUÍA ACTUALIZADA · NOV 2026" color="#788094" shineColor="#554ad4" speed={4}/></span><a className="top-link" href="https://vercel.com/docs/git" target="_blank" rel="noopener noreferrer">Documentación <ArrowUpRight size={15}/></a></div></div>
    <div className="content-wrap">
    {tab==='guia'&&<>
      <section className="hero" aria-labelledby="hero-title"><div className="hero-grid"/><div className="hero-glow"/>
       <AnimatedContent trigger="mount" distance={20} duration={0.6} initialOpacity={0}>
       <div className="hero-content"><div className="hero-badge"><span className="tiny-spark"><Sparkles size={13}/></span> TU GUÍA DE DESPLIEGUE, DE CERO A PRODUCCIÓN</div>
        <h1 id="hero-title">De localhost<br/>a <span><ShinyText text="producción." color="#b0bafe" shineColor="#ffffff" speed={5} glow={0.15}/></span></h1>
        <p>Aprende a publicar tu aplicación <strong>React + Vite</strong> en <strong>Vercel</strong>, conectarla con <strong>Supabase</strong> y comprobar que tus datos se consultan de forma segura.</p>
        <div className="hero-ctas"><StarBorder as="button" className="btn hero-btn" color="#dcd7ff" trailColor="#3ecaba" radius={11} duration={5} backgroundColor="#6d5ce8" textColor="#ffffff" onClick={()=>select(started?active:'requisitos')}><Play size={17} fill="currentColor"/> {started?'Continuar aprendiendo':'Comenzar el recorrido'} <ArrowRight size={17}/></StarBorder><button className="btn outline-light" onClick={()=>setView('simulador')}><MonitorPlay size={17}/> Probar simulador</button><a className="btn outline-light" href={`${process.env.NEXT_PUBLIC_BASE_PATH||''}/guia-react-vercel-supabase.pdf`} download><FileText size={17}/> Descargar PDF</a></div>
        <div className="hero-stats"><div><strong>12</strong><span>capítulos prácticos</span></div><i/><div><strong>02</strong><span>servicios conectados</span></div><i/><div><strong>100%</strong><span>aprende a tu ritmo</span></div></div>
       </div></AnimatedContent>
       <div className="hero-art" aria-hidden="true"><SpotlightCard theme="dark" spotlightColor="#8873ff" intensity={0.28} spotlightSize={220} className="hero-codecard"><div className="hero-codehead"><span><i/><i/><i/></span><b>deploy.config.ts</b><CheckCircle2 size={15}/></div><div className="hero-codelines"><p><em>01</em><span className="syntax-purple">const</span> launch = <span className="syntax-cyan">&#123;</span></p><p><em>02</em>&nbsp; frontend: <span className="syntax-green">'vercel'</span>,</p><p><em>03</em>&nbsp; database: <span className="syntax-green">'supabase'</span>,</p><p><em>04</em>&nbsp; status: <span className="syntax-green">'ready'</span></p><p><em>05</em><span className="syntax-cyan">&#125;</span>;</p></div><div className="hero-codefoot"><span className="ready-dot"/> <TextType text={['DEPLOYMENT SUCCESSFUL', 'SUPABASE RLS ACTIVE', 'HTTPS READY · 200 OK']} typingSpeed={55} pauseDuration={2200} deletingSpeed={28} loop cursorCharacter="▋" cursorColor="#50d6a6"/> <span>●●●</span></div></SpotlightCard><Magnet padding={40} magnetStrength={4} wrapperClassName="floating-pill pill-supa"><span className="pill-inner"><Database size={17}/> Supabase <Check size={15}/></span></Magnet><Magnet padding={40} magnetStrength={4} wrapperClassName="floating-pill pill-vercel"><span className="pill-inner"><Cloud size={17}/> Vercel <Check size={15}/></span></Magnet></div>
      </section>
      <section className="overview" aria-labelledby="overview-title"><div className="section-heading"><span className="eyebrow">ENTIENDE EL PANORAMA</span><h2 id="overview-title"><GradientText colors={['#182239', '#6355d8', '#22a978', '#182239']} animationSpeed={7}>Cuatro piezas. Un proyecto publicado.</GradientText></h2><p>Visualiza el flujo que seguirán tus compañeros cuando lleven su aplicación a internet.</p></div><ArchMap/></section>
      <section className="course-browser" aria-labelledby="lessons-title"><div className="section-heading heading-with-aside"><div><span className="eyebrow">TU RUTA DE APRENDIZAJE</span><h2 id="lessons-title"><GradientText colors={['#182239', '#6355d8', '#318ae4', '#182239']} animationSpeed={7}>Aprende construyendo.</GradientText></h2><p>Elige cualquier capítulo o síguelos en orden. Marca cada uno cuando termines.</p></div><div className="course-bubble"><CheckCircle2 size={23}/><span>{done.length} / {lessons.length}<small>COMPLETADOS</small></span></div></div>
       <div className="filter-row"><div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar un tema..." aria-label="Buscar capítulos"/>{query&&<button onClick={()=>setQuery('')} aria-label="Limpiar búsqueda"><X size={15}/></button>}</div><div className="filters">{['Todos','Inicio','Preparación','Supabase','Vercel','Producción'].map(c=><button key={c} onClick={()=>setCategory(c)} className={c===category?'selected':''}>{c}</button>)}</div></div>
       <div className="lesson-grid">{filtered.map((l)=>{const I=icons[l.icon]??BookOpen;return <SpotlightCard theme="light" spotlightColor="#6859d0" intensity={0.22} spotlightSize={240} role="button" tabIndex={0} className={`lesson-card ${active===l.id?'is-current':''}`} onClick={()=>select(l.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(l.id)}}} key={l.id}><div className="lesson-cardtop"><span className="lesson-icon"><I size={20}/></span><span className="lesson-time">{l.mins} MIN</span></div><div className="lesson-cardbody"><span className="lesson-tag">{l.tag}</span><h3>{l.title}</h3><p>{l.lead}</p></div><div className="lesson-cardbottom"><span>{done.includes(l.id)?<><CheckCircle2 size={15}/> Completado</>:<>Abrir lección <ArrowRight size={15}/></>}</span><span className="lesson-number">{String(lessons.indexOf(l)+1).padStart(2,'0')}</span></div></SpotlightCard>})}</div>
       {filtered.length===0&&<p className="empty-state">No encontramos capítulos con ese término. Prueba otra búsqueda.</p>}
      </section>
      <FadeContent key={current.id} effect="focus" duration={0.4} trigger="mount">
      <section className="lesson-reader" id="lesson-reader" aria-labelledby="reader-title"><div className="reader-top"><div className="reader-corner"><span className="eyebrow">LECCIÓN ABIERTA</span><span className="reader-order">{String(currentIndex+1).padStart(2,'0')} / {String(lessons.length).padStart(2,'0')}</span></div><div className="reader-heading"><div className="reader-bigicon"><IconCurrent size={25}/></div><div><span className="reader-kicker">{current.tag} · {current.mins} minutos de lectura</span><h2 id="reader-title">{current.title}</h2><p>{current.lead}</p></div></div></div>
       <div className="reader-body"><div className="reader-steps"><div className="readersub"><ListChecks size={19}/> Paso a paso <small>{current.steps.length} acciones</small></div>{current.steps.map((step,i)=><div className="instruction" key={`${current.id}-${i}`}><div className="instruction-line"><div className="step-circle">{String(i+1).padStart(2,'0')}</div><div className="instruction-content"><h3>{step.title}</h3><p>{step.body}</p>{step.details&&<ul>{step.details.map(t=><li key={t}>{t}</li>)}</ul>}{step.tip&&<div className="learning-note"><Lightbulb size={17}/><span>{step.tip}</span></div>}{step.warning&&<div className="learning-warning"><AlertTriangle size={17}/><span>{step.warning}</span></div>}</div></div></div>)}</div>
        <div className="reader-visual"><div className="visual-card"><div className="visual-label"><MonitorPlay size={16}/> VISUALIZACIÓN DIDÁCTICA</div><GlareHover width="100%" height="auto" background="transparent" borderRadius="11px" glareColor="#ffffff" glareOpacity={0.36} variant="sheen" className="visual-glare"><img src={`${process.env.NEXT_PUBLIC_BASE_PATH||''}/illustrations/${current.illustration}.svg`} alt={`Ilustración explicativa: ${current.title}`}/></GlareHover><p>Representación creada para el aprendizaje. No es una captura oficial de la interfaz actual.</p></div><div className="help-card"><div className="help-card-head"><Lightbulb size={20}/><b>Aprende a tu ritmo</b></div><p>Lee cada paso, copia los ejemplos y verifica el resultado en tu propio proyecto antes de continuar.</p><button onClick={()=>setView('simulador')}>Practicar en el simulador <ArrowUpRight size={15}/></button></div></div>
       </div>
       {current.snippets&&<div className="reader-codes"><div className="readersub"><Code2 size={19}/> Código listo para adaptar <small>Ejemplos copiables</small></div><div className="code-grid">{current.snippets.map((s,i)=><SnippetCard item={s} key={`${s.label}-${i}`}/>)}</div></div>}
       <div className="reader-footer"><div className="verify"><div className="readersub"><ClipboardCheck size={19}/> Comprueba antes de seguir</div>{current.verify.map(x=><div className="verify-row" key={x}><CheckCircle2 size={17}/>{x}</div>)}{current.resources&&<div className="resources"><b>Consulta fuentes oficiales</b>{current.resources.map(r=><a href={r.url} key={r.url} target="_blank" rel="noopener noreferrer">{r.title}<ExternalLink size={13}/></a>)}</div>}</div><button className={`complete-btn ${done.includes(current.id)?'complete':''}`} onClick={()=>toggle(current.id)}>{done.includes(current.id)?<CheckCircle2 size={19}/>:<Check size={19}/>} {done.includes(current.id)?'Capítulo completado · Desmarcar':'Marcar capítulo como completado'}</button></div>
       <div className="reader-navigation"><button disabled={currentIndex===0} onClick={()=>select(lessons[currentIndex-1].id)}><ArrowLeft size={17}/><span>Lección anterior</span></button><span>{String(currentIndex+1).padStart(2,'0')} / {lessons.length}</span><button onClick={()=>currentIndex===lessons.length-1?setView('evaluacion'):select(lessons[currentIndex+1].id)}><span>{currentIndex===lessons.length-1?'Hacer evaluación':'Siguiente lección'}</span><ArrowRight size={17}/></button></div>
      </section>
      </FadeContent>
    </>}
    {tab==='simulador'&&<FadeContent key="simulador" effect="focus" duration={0.4} trigger="mount"><section className="single-view"><div className="single-header"><span className="eyebrow">PRACTICA SIN CREDENCIALES</span><h1><GradientText colors={['#182239', '#6355d8', '#22a978', '#182239']} animationSpeed={7}>Simula tu primer despliegue.</GradientText></h1><p>Una actividad interactiva que reproduce el orden lógico de trabajo. Puedes practicar las decisiones, pero no realiza cambios en tus cuentas.</p></div><div className="simulator"><div className="sim-guide"><span className="sim-eyebrow">{simulator[sim].eyebrow}</span><h2>{simulator[sim].title}</h2><p>{simulator[sim].hint}</p><div className="sim-milestones">{simulator.map((s,i)=><button key={s.label} onClick={()=>setSim(i)} className={`milestone ${i===sim?'active':''} ${i<sim?'passed':''}`}><span>{i<sim?<Check size={16}/>:i+1}</span><b>{s.label}</b></button>)}</div><div className="sim-info"><Lightbulb size={18}/><p>{simulator[sim].right}</p></div><div className="sim-controls"><button className="btn secondary" onClick={()=>setSim(Math.max(0,sim-1))} disabled={sim===0}><ChevronLeft size={17}/> Anterior</button><button className="btn primary" onClick={()=>setSim((sim+1)%simulator.length)}>{sim===simulator.length-1?'Repetir experiencia':'Continuar'} <ChevronRight size={17}/></button></div></div><SimulatedScreen index={sim}/></div><div className="sim-bottomnote"><ShieldCheck size={18}/> Datos y resultados ficticios. El objetivo es mostrar el flujo; para el despliegue real debes seguir los 12 capítulos.</div></section></FadeContent>}
    {tab==='problemas'&&<FadeContent key="problemas" effect="focus" duration={0.4} trigger="mount"><section className="single-view"><div className="single-header"><span className="eyebrow">CENTRO DE SOLUCIONES</span><h1><GradientText colors={['#182239', '#6355d8', '#318ae4', '#182239']} animationSpeed={7}>Los errores también enseñan.</GradientText></h1><p>Encuentra la explicación probable, identifica qué revisar y evita soluciones inseguras.</p></div><div className="faq-category-row">{['Todos',...new Set(faqs.map(f=>f.type))].map(c=><button key={c} onClick={()=>setFaqFilter(c)} className={faqFilter===c?'selected':''}>{c}</button>)}</div><div className="faq-list">{faqs.map((f,i)=>faqFilter==='Todos'||faqFilter===f.type?<div className={`faq-item ${faqOpen.includes(i)?'expanded':''}`} key={f.q}><button onClick={()=>setFaqOpen(x=>x.includes(i)?x.filter(j=>j!==i):[...x,i])} aria-expanded={faqOpen.includes(i)}><span className="faq-category">{f.type}</span><b>{f.q}</b><ChevronDown size={19}/></button>{faqOpen.includes(i)&&<p>{f.a}</p>}</div>:null)}</div><div className="faq-deep"><ShieldCheck size={24}/><div><h3>Regla de oro para producción</h3><p>Nunca apagues RLS, compartas contraseñas o publiques una secret key solo para hacer que una consulta funcione. Resuelve el problema desde los logs, los permisos y la configuración.</p></div></div></section></FadeContent>}
    {tab==='evaluacion'&&<FadeContent key="evaluacion" effect="focus" duration={0.4} trigger="mount"><section className="single-view"><div className="single-header"><span className="eyebrow">DEMUESTRA LO APRENDIDO</span><h1><GradientText colors={['#182239', '#6355d8', '#22a978', '#182239']} animationSpeed={7}>Valida tus conocimientos.</GradientText></h1><p>Un cuestionario interactivo para reforzar lo esencial antes de presentar un despliegue real.</p></div><QuizPanel/></section></FadeContent>}
    <footer className="site-footer"><div className="footer-logo"><span className="brand-logo small"><Layers3 size={16}/></span><b>deploylab.</b><span>Aprende · construye · publica.</span></div><div className="footer-links"><a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer">Vercel Docs</a><a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer">Supabase Docs</a><a href="https://docs.github.com/en/pages" target="_blank" rel="noopener noreferrer">GitHub Pages</a><a href="https://reactbits.dev" target="_blank" rel="noopener noreferrer">React Bits</a></div><small>Revisado en noviembre de 2026 · Material educativo no afiliado a las plataformas.</small></footer>
    </div>
  </main>
 </div>
 </ClickSpark>
}
