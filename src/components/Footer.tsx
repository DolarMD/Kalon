import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND_CONFIG } from '../data/products';
import { KalonLogo } from './KalonLogo';

interface FooterProps {
  whatsAppNumber?: string;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="garantia" className="border-t border-neutral-200 bg-white pt-16 pb-12 transition-colors dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Col 1: Brand Info & Monogram */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-neutral-300 bg-white p-1.5 shadow-xs dark:border-neutral-700 dark:bg-neutral-900">
                <KalonLogo className="h-full w-full text-neutral-950 dark:text-white" />
              </div>
              <span className="font-editorial text-2xl font-bold tracking-widest text-neutral-950 dark:text-white">
                KALON
              </span>
            </div>
            <p className="mt-4 text-xs font-mono tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
              Indumentaria de confección pesada y corte editorial contemporáneo.
            </p>
          </div>

          {/* Col 2: Colecciones */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-neutral-950 uppercase dark:text-white">
              Colecciones
            </h4>
            <ul className="mt-4 space-y-2 text-xs font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
              <li><a href="#grid-prendas" className="hover:text-neutral-950 dark:hover:text-white">Heavyweight Hoodies</a></li>
              <li><a href="#grid-prendas" className="hover:text-neutral-950 dark:hover:text-white">Acid Wash Tees</a></li>
              <li><a href="#grid-prendas" className="hover:text-neutral-950 dark:hover:text-white">Boxy Crewnecks</a></li>
              <li><a href="#grid-prendas" className="hover:text-neutral-950 dark:hover:text-white">Monochrome Sets</a></li>
            </ul>
          </div>

          {/* Col 3: Despachos */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-neutral-950 uppercase dark:text-white">
              Despachos & Envíos
            </h4>
            <div className="mt-4 space-y-2 text-xs font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
              <p>Envíos nacionales con rastreo directo a domicilio.</p>
              <p className="text-[11px] text-neutral-400">Lunes a Sábado · 09:00 - 20:00 hrs</p>
            </div>
          </div>

          {/* Col 4: Atención */}
          <div>
            <h4 className="text-xs font-bold tracking-widest text-neutral-950 uppercase dark:text-white">
              Atención
            </h4>
            <div className="mt-4 space-y-2 text-xs font-mono tracking-wider uppercase text-neutral-600 dark:text-neutral-400">
              <p>Asesoría exclusiva de prendas y tallas.</p>
              <a href="#contacto" className="inline-block text-neutral-950 font-bold underline dark:text-white">
                Ir al apartado de contacto →
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 sm:flex-row dark:border-neutral-800">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()} KALON. Todos los derechos reservados. Diseñado para amantes del streetwear y DTF.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <span>Volver arriba</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
