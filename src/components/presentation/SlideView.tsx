'use client';

import type { ReactNode } from 'react';
import { motion, type Variants } from 'motion/react';
import {
  AlertTriangle, Bot, CheckCircle2, Cpu, Code2, FolderUp, Github, GitMerge, Globe, Info, Layers3, Link2,
  Lock, PenLine, Rocket, Send, Sparkles, Star, Terminal, Zap, ArrowRight, Quote, MapPin, XCircle, Server
} from 'lucide-react';
import BlurText from '@/components/reactbits/BlurText/BlurText';
import GradientText from '@/components/reactbits/GradientText/GradientText';
import ShinyText from '@/components/reactbits/ShinyText';
import CountUp from '@/components/reactbits/CountUp/CountUp';
import SpotlightCard from '@/components/reactbits/SpotlightCard';
import DecryptedText from '@/components/reactbits/DecryptedText/DecryptedText';
import { presenters, type Callout, type IconName, type Slide, type Tone } from '@/data/presentation';
import { CodeWindow, Confetti, VisualView } from './Visuals';

const ease = [0.22, 1, 0.36, 1] as const;

export const itemVariants: Variants = {
  enter: { opacity: 0, y: 28, filter: 'blur(10px)' },
  center: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const toneColor: Record<Tone, string> = {
  green: '#3ee8a0', purple: '#9d8cff', cyan: '#4cc9f0', pink: '#ff6b8a', amber: '#ffc861'
};
const toneGradient: Record<Tone, string[]> = {
  green: ['#3ee8a0', '#4cc9f0', '#3ee8a0'],
  purple: ['#9d8cff', '#ff6b8a', '#9d8cff'],
  cyan: ['#4cc9f0', '#9d8cff', '#4cc9f0'],
  pink: ['#ff6b8a', '#ffc861', '#ff6b8a'],
  amber: ['#ffc861', '#ff6b8a', '#ffc861']
};
const ACCENT = ['#3ee8a0', '#4cc9f0', '#9d8cff', '#3ee8a0'];

const icons: Record<IconName, typeof Rocket> = {
  drop: FolderUp, github: Github, terminal: Terminal, pencil: PenLine, send: Send, check: CheckCircle2, link: Link2,
  bot: Bot, merge: GitMerge, rocket: Rocket, globe: Globe, sparkles: Sparkles, cpu: Cpu, code: Code2, star: Star,
  layers: Layers3, zap: Zap
};

function R({ children, className }: { children: ReactNode; className?: string }) {
  return <motion.div variants={itemVariants} className={className}>{children}</motion.div>;
}

function Eyebrow({ text, badge }: { text: string; badge?: string }) {
  return (
    <R className="s-eyebrow-row">
      <span className="s-eyebrow"><ShinyText text={text.toUpperCase()} color="#8f91a8" shineColor="#ffffff" speed={3.5} /></span>
      {badge && <span className="s-badge"><i /> {badge}</span>}
    </R>
  );
}

function Title({ title, accent, tone = 'green', size = 'md' }: { title: string; accent?: string; tone?: Tone; size?: 'md' | 'lg' | 'xl' }) {
  return (
    <div className={`s-title s-title-${size}`}>
      <BlurText text={title} trigger="load" animateBy="words" delay={60} direction="bottom" className="s-title-line" />
      {accent && (
        <motion.div variants={itemVariants}>
          <GradientText colors={tone === 'green' ? ACCENT : toneGradient[tone]} animationSpeed={6} className="s-title-accent">{accent}</GradientText>
        </motion.div>
      )}
    </div>
  );
}

function CalloutBox({ callout }: { callout: Callout }) {
  const Icon = callout.icon === 'lock' ? Lock : callout.icon === 'warning' ? AlertTriangle : Info;
  return (
    <R className={`s-callout tone-${callout.tone}`}>
      <span className="s-callout-icon"><Icon size={24} /></span>
      <div><strong>{callout.title}</strong><p>{callout.text}</p></div>
    </R>
  );
}

export default function SlideView({ slide, index }: { slide: Slide; index: number }) {
  switch (slide.kind) {
    case 'cover':
      return (
        <div className="s-cover">
          <R className="s-cover-kicker">Programación web · Taller práctico</R>
          <R className="s-cover-terminal">
            <span className="v-dots"><i /><i /><i /></span>
            <code>$ git push origin main</code>
            <span className="s-cover-status"><span className="v-spinner" /> Building… <CheckCircle2 size={18} /> Ready</span>
          </R>
          <div className="s-cover-title">
            <BlurText text="Despliega en" trigger="load" animateBy="letters" delay={45} direction="bottom" className="s-title-line" />
            <motion.div variants={itemVariants}>
              <GradientText colors={['#ffffff', '#9d8cff', '#3ee8a0', '#4cc9f0', '#ffffff']} animationSpeed={5} className="s-cover-brand">Vercel</GradientText>
            </motion.div>
          </div>
          <R className="s-cover-sub">De tu computador a internet en minutos</R>
          <R className="s-cover-url"><Globe size={20} /> <DecryptedText text="mi-primer-deploy.vercel.app" animateOn="view" speed={40} sequential /></R>
          <R className="s-cover-people">
            {presenters.map(p => <span key={p}>{p}</span>)}
          </R>
          <R className="s-cover-foot">UPC · Valledupar · 2026</R>
        </div>
      );

    case 'hero':
      return (
        <div className="s-split s-hero">
          <div className="s-col">
            <Eyebrow text={slide.eyebrow} />
            <Title title={slide.title} accent={slide.accent} size="xl" />
            <R className="s-lead">{slide.sub}</R>
            <R className="s-chips">
              {slide.chips.map((c, i) => <span key={c} className="s-chip"><b>{i + 1}</b> {c}</span>)}
            </R>
          </div>
          <div className="s-col s-col-visual"><VisualView visual={slide.visual} /></div>
        </div>
      );

    case 'agenda':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} />
          <div className="s-agenda">
            {slide.items.map((item, i) => (
              <R key={item.title}>
                <SpotlightCard className="s-agenda-card" spotlightColor={`${toneColor[item.tone]}40`}>
                  <span className="s-agenda-num" style={{ color: toneColor[item.tone] }}>0{i + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <span className="s-agenda-speaker"><i style={{ background: toneColor[item.tone] }} /> {item.speaker}</span>
                </SpotlightCard>
              </R>
            ))}
          </div>
        </div>
      );

    case 'section':
      return (
        <div className={`s-section tone-${slide.tone}`}>
          <motion.span
            className="s-section-num"
            variants={{ enter: { opacity: 0, scale: 0.6, filter: 'blur(30px)' }, center: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 1.1, ease } } }}
          >
            {slide.num}
          </motion.span>
          <div className="s-section-body">
            <R className="s-eyebrow">Bloque {slide.num}</R>
            <Title title={slide.title} size="lg" />
            <R className="s-lead">{slide.sub}</R>
          </div>
        </div>
      );

    case 'diagram':
      return (
        <div className="s-stack s-diagram">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} accent={slide.accent} />
          <R className="s-diagram-visual"><VisualView visual={slide.visual} /></R>
          {slide.caption && <R className="s-caption"><AlertTriangle size={20} /> {slide.caption}</R>}
          {slide.chips && (
            <R className="s-chips s-chips-row">
              {slide.chips.map((c, i) => <span key={c} className="s-chip"><b>{i + 1}</b> {c}</span>)}
            </R>
          )}
        </div>
      );

    case 'terms':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} />
          <div className="s-terms">
            {slide.items.map(t => (
              <R key={t.term}>
                <SpotlightCard className="s-term" spotlightColor={`${toneColor[t.tone]}38`}>
                  <code style={{ color: toneColor[t.tone] }}>{t.term}</code>
                  <p>{t.def}</p>
                </SpotlightCard>
              </R>
            ))}
          </div>
          <R className="s-footer-note"><Sparkles size={20} /> {slide.footer}</R>
        </div>
      );

    case 'stats':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} />
          <div className="s-stats">
            {slide.items.map((s, i) => (
              <R key={s.label}>
                <SpotlightCard className="s-stat" spotlightColor={`${toneColor[s.tone]}38`}>
                  <strong style={{ color: toneColor[s.tone] }}>
                    <CountUp to={s.to} from={s.to === 0 ? 0 : 0} prefix={s.prefix} suffix={s.suffix} duration={1.6} delay={0.6 + i * 0.2} trigger="load" />
                  </strong>
                  <p>{s.label}</p>
                </SpotlightCard>
              </R>
            ))}
          </div>
          {slide.footnote && <R className="s-footer-note"><Info size={20} /> {slide.footnote}</R>}
        </div>
      );

    case 'cards':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} badge={slide.badge} />
          <Title title={slide.title} accent={slide.accent} />
          <div className={`s-cards ${slide.flow ? 'is-flow' : ''} count-${slide.items.length}`}>
            {slide.items.map((c, i) => {
              const Icon = icons[c.icon];
              return (
                <R key={c.title} className="s-card-cell">
                  <SpotlightCard className="s-card" spotlightColor={`${toneColor[c.tone]}40`}>
                    <div className="s-card-top">
                      <span className="s-card-icon" style={{ color: toneColor[c.tone], background: `${toneColor[c.tone]}1c`, borderColor: `${toneColor[c.tone]}55` }}>
                        <Icon size={30} />
                      </span>
                      {c.tag && <span className="s-card-tag" style={{ color: toneColor[c.tone] }}>{c.tag}</span>}
                    </div>
                    <h3>{c.title}</h3>
                    <p className={c.text.includes('\n') ? 'is-mono' : ''}>{c.text}</p>
                  </SpotlightCard>
                  {slide.flow && i < slide.items.length - 1 && <span className="s-card-arrow"><ArrowRight size={28} /></span>}
                </R>
              );
            })}
          </div>
          {slide.footer && <R className="s-footer-note"><Sparkles size={20} /> {slide.footer}</R>}
        </div>
      );

    case 'steps': {
      const hasAside = Boolean(slide.code || slide.visual);
      return (
        <div className={hasAside ? 's-split' : 's-stack'}>
          <div className="s-col">
            <Eyebrow text={slide.eyebrow} badge={slide.badge} />
            <Title title={slide.title} />
            {slide.steps.length > 0 && (
              <ol className="s-steps">
                {slide.steps.map((s, i) => (
                  <R key={s.title} className="s-step">
                    <span className="s-step-num">{i + 1}</span>
                    <div><strong>{s.title}</strong>{s.text && <p>{s.text}</p>}</div>
                  </R>
                ))}
              </ol>
            )}
            {slide.callout && <CalloutBox callout={slide.callout} />}
          </div>
          {hasAside && (
            <div className="s-col s-col-visual">
              {slide.code && <R className="s-aside-block"><CodeWindow block={slide.code} /></R>}
              {slide.visual && <R className="s-aside-block"><VisualView visual={slide.visual} /></R>}
            </div>
          )}
        </div>
      );
    }

    case 'checkpoint':
      return (
        <div className={slide.visual ? 's-split s-checkpoint' : 's-stack s-checkpoint'}>
          <div className="s-col">
            <R className="s-check-badge"><CheckCircle2 size={22} /> {slide.eyebrow}</R>
            <Title title={slide.title} size="lg" />
            {slide.text && <R className="s-lead">{slide.text}</R>}
            {slide.hints && (
              <R className="s-chips">
                {slide.hints.map(h => <kbd key={h}>{h}</kbd>)}
              </R>
            )}
          </div>
          {slide.visual && <div className="s-col s-col-visual"><VisualView visual={slide.visual} /></div>}
        </div>
      );

    case 'table':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} />
          <div className="s-table" role="table">
            <R className="s-table-row is-head">
              <span role="columnheader">{slide.head[0]}</span>
              <span role="columnheader">{slide.head[1]}</span>
            </R>
            {slide.rows.map(([a, b]) => (
              <R key={a} className="s-table-row">
                <span role="cell"><AlertTriangle size={18} /> {a}</span>
                <span role="cell"><ArrowRight size={18} /> {b}</span>
              </R>
            ))}
          </div>
        </div>
      );

    case 'timeline':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} accent={slide.accent} />
          <div className="s-timeline">
            <motion.span
              className="s-timeline-line"
              variants={{ enter: { scaleX: 0 }, center: { scaleX: 1, transition: { duration: 1.6, ease, delay: 0.3 } } }}
            />
            {slide.items.map(item => (
              <R key={item.year} className="s-timeline-item">
                <span className="s-timeline-dot" style={{ background: toneColor[item.tone], boxShadow: `0 0 0 8px ${toneColor[item.tone]}22, 0 0 28px ${toneColor[item.tone]}` }} />
                <span className="s-timeline-year" style={{ color: toneColor[item.tone] }}>{item.year}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </R>
            ))}
          </div>
        </div>
      );

    case 'profile':
      return (
        <div className="s-split s-profile">
          <div className="s-col s-col-visual">
            <motion.div
              className="s-portrait"
              variants={{ enter: { opacity: 0, scale: 0.7, rotate: -8 }, center: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 1, ease } } }}
            >
              <span className="s-portrait-ring" />
              <span className="s-portrait-core">GR</span>
              <span className="s-portrait-pin"><MapPin size={18} /> {slide.origin}</span>
            </motion.div>
          </div>
          <div className="s-col">
            <Eyebrow text={slide.eyebrow} />
            <Title title={slide.name} size="lg" />
            <R className="s-role"><GradientText colors={ACCENT} animationSpeed={6}>{slide.role}</GradientText></R>
            <div className="s-facts">
              {slide.facts.map(f => (
                <R key={f.label} className="s-fact">
                  <strong>{f.label}</strong>
                  <p>{f.text}</p>
                </R>
              ))}
            </div>
            <R className="s-quote"><Quote size={22} /> {slide.quote}</R>
          </div>
        </div>
      );

    case 'compare':
      return (
        <div className="s-stack">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} accent={slide.accent} />
          <div className="s-compare">
            <R className="s-compare-col is-before">
              <h3><Server size={26} /> {slide.before.label}</h3>
              <ul>{slide.before.items.map(it => <li key={it}><XCircle size={22} /> {it}</li>)}</ul>
            </R>
            <motion.span className="s-compare-vs" variants={{ enter: { opacity: 0, scale: 0.4 }, center: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 14, delay: 0.5 } } }}>VS</motion.span>
            <R className="s-compare-col is-after">
              <h3><Rocket size={26} /> {slide.after.label}</h3>
              <ul>{slide.after.items.map(it => <li key={it}><CheckCircle2 size={22} /> {it}</li>)}</ul>
            </R>
          </div>
          {slide.footer && <R className="s-footer-note"><Sparkles size={20} /> {slide.footer}</R>}
        </div>
      );

    case 'recap':
      return (
        <div className="s-stack s-recap">
          <Eyebrow text={slide.eyebrow} />
          <Title title={slide.title} size="lg" />
          <div className="s-recap-list">
            {slide.items.map((item, i) => (
              <R key={item} className="s-recap-item">
                <span>0{i + 1}</span>
                <CheckCircle2 size={26} />
                <p>{item}</p>
              </R>
            ))}
          </div>
          <R className="s-challenge"><Star size={26} /> {slide.challenge}</R>
        </div>
      );

    case 'thanks':
      return (
        <div className="s-thanks">
          <Confetti count={60} />
          <R className="s-cover-terminal">
            <span className="v-dots"><i /><i /><i /></span>
            <code>$ vercel --prod</code>
            <span className="s-cover-status"><CheckCircle2 size={18} /> Ready</span>
          </R>
          <div className="s-thanks-title">
            <motion.div variants={itemVariants}>
              <GradientText colors={['#ffffff', '#9d8cff', '#3ee8a0', '#4cc9f0', '#ffffff']} animationSpeed={5}>¡Gracias!</GradientText>
            </motion.div>
          </div>
          <R className="s-thanks-sub">¿Preguntas?</R>
          <R className="s-cover-people">
            {presenters.map(p => <span key={p}>{p}</span>)}
          </R>
        </div>
      );
  }
  return <span data-index={index} />;
}
