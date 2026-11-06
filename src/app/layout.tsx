import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DeployLab — De localhost a producción',
  description: 'Guía interactiva, visual y completa para desplegar frontend en Vercel y conectarlo con Supabase. Incluye prácticas, código, seguridad, cuestionario y troubleshooting.',
  keywords: ['Vercel', 'Supabase', 'GitHub Pages', 'React', 'Next.js', 'Despliegue', 'Tutorial']
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="es"><body>{children}</body></html>;
}
