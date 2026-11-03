import React from 'react';
import { MessageCircle } from 'lucide-react';
import { DtfFeature } from '../types/admin';
import { KalonLogo } from './KalonLogo';

interface DtfInfoSectionProps {
  whatsAppNumber: string;
  features?: DtfFeature[];
  customCta?: {
    title: string;
    subtitle: string;
    buttonText: string;
  };
}

export const DtfInfoSection: React.FC<DtfInfoSectionProps> = ({
  whatsAppNumber,
  features: propFeatures,
  customCta,
}) => {
  const defaultFeatures: DtfFeature[] = [
    {
      number: '01 //',
      title: 'TINTAS AL AGUA CERTIFICADAS',
      desc: 'Pigmentos textiles de máxima saturación cromática, con blancos de alta opacidad y sin solventes tóxicos.',
    },
    {
      number: '02 //',
      title: 'POLIAMIDA ULTRA-FLEXIBLE',
      desc: 'El termoadhesivo se fusiona a nivel molecular con el algodón; se estira sin quebrarse ni despegarse.',
    },
    {
      number: '03 //',
      title: 'MICRO-RESOLUCIÓN A 300 DPI',
      desc: 'Detalles hiper-finos, degradados suaves y tipografías nítidas que la serigrafía tradicional no logra igualar.',
    },
    {
      number: '04 //',
      title: 'DURABILIDAD COMPROBADA',
      desc: 'Resiste más de 50 lavados domésticos manteniendo la viveza de los colores y su tacto mate sedoso.',
    },
  ];

  const dtfFeatures = propFeatures && propFeatures.length > 0 ? propFeatures : defaultFeatures;
  const ctaTitle = customCta?.title || '¿Requieres impresión DTF por metro o tirajes especiales?';
  const ctaSubtitle = customCta?.subtitle || 'Imprimimos pliegos continuos y confeccionamos tirajes para marcas y estudios con estándar de lujo.';
  const ctaButton = customCta?.buttonText || 'COTIZAR DTF';

  return (
    <section id="tecnologia-dtf" className="border-t border-neutral-200 bg-white py-16 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
            ESTUDIO TEXTIL DIRECT TO FILM
          </span>
          <h2 className="mt-2 font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase dark:text-white">
            TECNOLOGÍA DE ESTAMPACIÓN KALON
          </h2>
          <p className="mt-3 text-xs sm:text-sm uppercase tracking-wider text-neutral-500 leading-relaxed">
            Resolución fotográfica sobre algodón pesado, tacto elástico y fijación térmica de grado industrial.
          </p>
        </div>

        {/* Feature Grid with Hairline Dividers (No nested rounded cards) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-neutral-200 dark:border-neutral-800 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800">
          {dtfFeatures.map((feat, i) => (
            <div
              key={i}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-neutral-400">0{i + 1} //</span>
                <h3 className="mt-2 text-xs font-bold tracking-widest text-neutral-950 uppercase dark:text-white">
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500 uppercase tracking-wide dark:text-neutral-400">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-neutral-100 font-mono text-[10px] tracking-widest text-neutral-400 uppercase dark:border-neutral-900">
                [ESTÁNDAR KALON]
              </div>
            </div>
          ))}
        </div>

        {/* Custom B2B / Custom Prints CTA Box (Sharp 90-degree rectangle) */}
        <div className="mt-12 border border-neutral-950 bg-neutral-950 p-8 text-white dark:border-white dark:bg-neutral-900">
          <div className="flex flex-col items-start sm:items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-start sm:items-center gap-4">
              <div className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center border border-neutral-700 bg-neutral-900 p-2 shadow-xs">
                <KalonLogo className="h-full w-full text-white" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                  PRODUCCIÓN PERSONALIZADA & MAYOREO
                </span>
                <h3 className="mt-1 font-editorial text-lg sm:text-xl font-bold tracking-tight text-white uppercase">
                  {ctaTitle}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">
                  {ctaSubtitle}
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsAppNumber.replace(/[^\d]/g, '')}?text=${encodeURIComponent('Hola KALON! Me gustaría cotizar un pedido personalizado de DTF / prendas por volumen.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 border border-white bg-white px-6 py-3.5 text-xs font-bold tracking-widest text-neutral-950 uppercase hover:bg-neutral-100 dark:border-white dark:bg-white dark:text-black"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{ctaButton}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
