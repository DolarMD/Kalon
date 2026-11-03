import React from 'react';
import { ArrowRight } from 'lucide-react';

interface PromoStripProps {
  whatsAppNumber: string;
  promoBanner?: {
    title: string;
    subtitle: string;
  };
}

export const PromoStrip: React.FC<PromoStripProps> = ({ whatsAppNumber, promoBanner }) => {
  const title = promoBanner?.title || 'ENVÍOS GRATIS EN COMPRAS MAYORES A $999 MXN';
  const subtitle =
    promoBanner?.subtitle ||
    'Atención directa 1 a 1 para coordinar tallas, transferencias y despacho express';

  return (
    <div className="mx-auto max-w-7xl my-8">
      <a
        href={`https://wa.me/${whatsAppNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hola KALON! Quisiera consultar sobre envíos nacionales y cotizaciones especiales.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 border border-neutral-950 bg-neutral-950 px-6 py-4 text-white transition-opacity hover:opacity-90 dark:border-white dark:bg-white dark:text-neutral-950"
      >
        <div>
          <p className="text-xs font-bold tracking-widest uppercase">
            {title}
          </p>
          <p className="text-[11px] text-neutral-400 uppercase tracking-wider dark:text-neutral-600 mt-0.5">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase shrink-0">
          <span className="hidden sm:inline">CONSULTAR</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </a>
    </div>
  );
};
