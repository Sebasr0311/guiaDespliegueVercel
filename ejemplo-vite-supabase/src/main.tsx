import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './style.css';

type Recurso = { id: number; titulo: string; descripcion: string };
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const configurado = Boolean(url && key && !url.includes('TU-PROYECTO') && !key.includes('REEMPLAZAR'));
const supabase = configurado ? createClient(url, key) : null;

function App() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!supabase) {setCargando(false);return;}
    supabase.from('recursos_demo').select('id,titulo,descripcion').order('id')
      .then(({data,error})=>{if(error)setError(error.message);else setRecursos(data??[]);setCargando(false);});
  },[]);
  return <main className="container"><div className="badge">● VERCEL + SUPABASE · EJEMPLO DIDÁCTICO</div>
    <h1>Tu frontend, <em>en internet.</em></h1><p>Esta app React consulta datos de prueba alojados en Supabase.</p>
    <section className="panel"><h2>Recursos desde PostgreSQL</h2>
      {!configurado&&<p className="warning">Configura <code>.env.local</code> con las dos variables públicas de Supabase y reinicia el servidor.</p>}
      {cargando&&<p>Cargando…</p>}{error&&<p className="warning" role="alert">Error: {error}</p>}
      {!cargando&&!error&&recursos.length===0&&configurado&&<p>Sin registros visibles. Revisa la tabla, GRANT y las políticas RLS.</p>}
      {recursos.map(r=><article key={r.id}><strong>{r.titulo}</strong><span>{r.descripcion}</span></article>)}
    </section><footer>Ejemplo: usa solo la clave publishable; jamás una secret key.</footer>
  </main>;
}
createRoot(document.getElementById('root')!).render(<App/>);
