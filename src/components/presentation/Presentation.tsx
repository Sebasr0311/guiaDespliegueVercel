'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, type Variants } from 'motion/react';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Grid3x3, Keyboard, Maximize2, Minimize2, NotebookPen, Timer, X
} from 'lucide-react';
import { slides } from '@/data/presentation';
import SlideView from './SlideView';

const STAGE_W = 1600;
const STAGE_H = 900;
const total = slides.length;

const slideVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 140, scale: 0.96, filter: 'blur(14px)' }),
  center: {
    opacity: 1, x: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.09, delayChildren: 0.2 }
  },
  exit: (dir: number) => ({
    opacity: 0, x: dir * -140, scale: 0.96, filter: 'blur(14px)',
    transition: { duration: 0.45, ease: [0.4, 0, 1, 1] }
  })
};

const clamp = (n: number) => Math.min(Math.max(n, 0), total - 1);

function readHash() {
  if (typeof window === 'undefined') return 0;
  const n = parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isFinite(n) ? clamp(n - 1) : 0;
}

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function Presentation() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [scale, setScale] = useState(0.5);
  const [notes, setNotes] = useState(false);
  const [overview, setOverview] = useState(false);
  const [help, setHelp] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [idle, setIdle] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const touchX = useRef<number | null>(null);
  const idleTimer = useRef<number | undefined>(undefined);

  const go = useCallback((target: number) => {
    setState(([cur]) => {
      const next = clamp(target);
      return next === cur ? [cur, 1] : [next, next > cur ? 1 : -1];
    });
  }, []);
  const next = useCallback(() => setState(([cur]) => [clamp(cur + 1), 1]), []);
  const prev = useCallback(() => setState(([cur]) => [clamp(cur - 1), -1]), []);

  // Initial slide from URL hash (#12) and hash sync.
  useEffect(() => {
    setState([readHash(), 1]);
    const onHash = () => go(readHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [go]);
  useEffect(() => {
    window.history.replaceState(null, '', `#${index + 1}`);
  }, [index]);

  // Fit the 16:9 stage to the viewport.
  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Talk timer.
  useEffect(() => {
    const id = window.setInterval(() => setElapsed(e => e + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Hide controls while presenting.
  useEffect(() => {
    const wake = () => {
      setIdle(false);
      window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setIdle(true), 2600);
    };
    wake();
    window.addEventListener('mousemove', wake);
    return () => {
      window.removeEventListener('mousemove', wake);
      window.clearTimeout(idleTimer.current);
    };
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen?.().catch(() => undefined);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if (['arrowright', 'pagedown', ' ', 'enter', 'arrowdown'].includes(key)) { e.preventDefault(); setBlackout(false); next(); }
      else if (['arrowleft', 'pageup', 'backspace', 'arrowup'].includes(key)) { e.preventDefault(); setBlackout(false); prev(); }
      else if (key === 'home') go(0);
      else if (key === 'end') go(total - 1);
      else if (key === 'f') toggleFullscreen();
      else if (key === 'n') setNotes(v => !v);
      else if (key === 'g' || key === 'o') setOverview(v => !v);
      else if (key === 'b' || key === '.') setBlackout(v => !v);
      else if (key === '?' || key === 'h') setHelp(v => !v);
      else if (key === 'r') setElapsed(0);
      else if (key === 'escape') { setOverview(false); setHelp(false); setBlackout(false); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, toggleFullscreen]);

  const slide = slides[index];
  const progress = ((index + 1) / total) * 100;

  return (
    <div
      className={`deck ${idle ? 'is-idle' : ''}`}
      onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={e => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="deck-bg" aria-hidden="true">
        <div className="deck-aurora"><i /><i /><i /></div>
        <div className="deck-grid" />
        <div className="deck-vignette" />
      </div>

      <div className="deck-stage-wrap">
        <div className="deck-stage" style={{ width: STAGE_W, height: STAGE_H, transform: `translate(-50%, -50%) scale(${scale})` }}>
          <AnimatePresence initial={false} custom={dir}>
            <motion.section
              key={index}
              className={`slide slide-${slide.kind}`}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${total}: ${slide.section}`}
            >
              <SlideView slide={slide} index={index} />
            </motion.section>
          </AnimatePresence>

          <footer className="deck-footer">
            <span className="deck-brand"><i>▲</i> Despliega en Vercel</span>
            <span className="deck-section">{slide.section}</span>
            <span className="deck-count"><b>{String(index + 1).padStart(2, '0')}</b> / {total}</span>
          </footer>
        </div>
      </div>

      <div className="deck-progress" aria-hidden="true"><motion.span animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} /></div>

      <button className="deck-hit deck-hit-prev" onClick={prev} aria-label="Diapositiva anterior" disabled={index === 0} />
      <button className="deck-hit deck-hit-next" onClick={next} aria-label="Diapositiva siguiente" disabled={index === total - 1} />

      <div className="deck-toolbar" role="toolbar" aria-label="Controles de la presentación">
        <Link href="/" className="deck-btn deck-exit"><ArrowLeft size={18} /> Volver a la guía</Link>
        <div className="deck-toolbar-group">
          <button className="deck-btn" onClick={prev} disabled={index === 0} aria-label="Anterior"><ChevronLeft size={20} /></button>
          <span className="deck-toolbar-count">{index + 1} / {total}</span>
          <button className="deck-btn" onClick={next} disabled={index === total - 1} aria-label="Siguiente"><ChevronRight size={20} /></button>
        </div>
        <div className="deck-toolbar-group">
          <span className="deck-timer" title="Tiempo transcurrido (R reinicia)"><Timer size={16} /> {formatTime(elapsed)}</span>
          <button className={`deck-btn ${notes ? 'is-on' : ''}`} onClick={() => setNotes(v => !v)} aria-label="Notas del expositor (N)" title="Notas (N)"><NotebookPen size={18} /></button>
          <button className={`deck-btn ${overview ? 'is-on' : ''}`} onClick={() => setOverview(v => !v)} aria-label="Vista general (G)" title="Vista general (G)"><Grid3x3 size={18} /></button>
          <button className="deck-btn" onClick={() => setHelp(v => !v)} aria-label="Atajos de teclado (?)" title="Atajos (?)"><Keyboard size={18} /></button>
          <button className="deck-btn" onClick={toggleFullscreen} aria-label="Pantalla completa (F)" title="Pantalla completa (F)">
            {fullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {notes && (
          <motion.aside
            className="deck-notes"
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          >
            <div className="deck-notes-head">
              <strong><NotebookPen size={16} /> Notas del expositor · {index + 1}</strong>
              <span>Siguiente: {index < total - 1 ? slides[index + 1].section : 'fin'}</span>
              <button onClick={() => setNotes(false)} aria-label="Cerrar notas"><X size={16} /></button>
            </div>
            <p>{slide.notes}</p>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {overview && (
          <motion.div className="deck-overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="deck-overview-head">
              <strong>Todas las diapositivas</strong>
              <button className="deck-btn" onClick={() => setOverview(false)} aria-label="Cerrar vista general"><X size={18} /></button>
            </div>
            <div className="deck-overview-grid">
              {slides.map((s, i) => (
                <motion.button
                  key={i}
                  className={`deck-thumb ${i === index ? 'is-current' : ''} kind-${s.kind}`}
                  onClick={() => { go(i); setOverview(false); }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.015 }}
                >
                  <span className="deck-thumb-num">{String(i + 1).padStart(2, '0')}</span>
                  <strong>{thumbTitle(s)}</strong>
                  <small>{s.section}</small>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {help && (
          <motion.div className="deck-help" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}>
            <strong>Atajos de teclado</strong>
            <dl>
              <dt>→ · Espacio · Clic derecho de la pantalla</dt><dd>Siguiente</dd>
              <dt>← · Clic izquierdo de la pantalla</dt><dd>Anterior</dd>
              <dt>F</dt><dd>Pantalla completa</dd>
              <dt>N</dt><dd>Notas del expositor</dd>
              <dt>G</dt><dd>Vista general</dd>
              <dt>B</dt><dd>Pantalla en negro</dd>
              <dt>R</dt><dd>Reiniciar cronómetro</dd>
              <dt>Inicio · Fin</dt><dd>Primera · última</dd>
            </dl>
            <button className="deck-btn" onClick={() => setHelp(false)}>Entendido</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {blackout && <motion.div className="deck-blackout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setBlackout(false)} />}
      </AnimatePresence>
    </div>
  );
}

function thumbTitle(s: (typeof slides)[number]) {
  switch (s.kind) {
    case 'cover': return 'Despliega en Vercel';
    case 'thanks': return '¡Gracias!';
    case 'profile': return s.name;
    case 'section': return s.title;
    default: return 'accent' in s && s.accent ? `${s.title} ${s.accent}` : s.title;
  }
}
