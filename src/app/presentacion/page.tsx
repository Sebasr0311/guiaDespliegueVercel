import type { Metadata } from 'next';
import Presentation from '@/components/presentation/Presentation';
import '@/components/presentation/presentation.css';

export const metadata: Metadata = {
  title: 'Presentación · Despliega en Vercel',
  description: 'Modo presentación del taller práctico: de tu computador a internet en minutos con Vercel.'
};

export default function PresentationPage() {
  return <Presentation />;
}
