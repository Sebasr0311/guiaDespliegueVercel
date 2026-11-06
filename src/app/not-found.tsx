'use client';

import dynamic from 'next/dynamic';
import GlitchText from '@/components/reactbits/GlitchText/GlitchText';

const LetterGlitch = dynamic(() => import('@/components/reactbits/LetterGlitch/LetterGlitch'), { ssr: false });

export default function NotFound() {
  return (
    <main style={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px' }}>
      <div style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
        <LetterGlitch characters="404NOT_FOUND" glitchColors={['#6355d8', '#b0bafe', '#3ecf8e']} lightMode />
      </div>
      <div style={{ position: 'relative', textAlign: 'center', background: 'rgba(255,255,255,0.9)', padding: '32px 28px', borderRadius: '18px', border: '1px solid #e6e8f2', maxWidth: '520px', boxShadow: '0 20px 50px rgba(24,34,57,0.08)' }}>
        <GlitchText fontSize="clamp(64px, 14vw, 120px)" color="#182239">404</GlitchText>
        <p style={{ margin: '12px 0 20px', color: '#4b5266', lineHeight: 1.6 }}>
          Esta ruta no existe. Si te pasa en tu proyecto al recargar una ruta de React Router en Vercel, revisa <code>vercel.json</code>.
        </p>
        <a className="btn primary" href={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/`}>Volver a la guía</a>
      </div>
    </main>
  );
}
