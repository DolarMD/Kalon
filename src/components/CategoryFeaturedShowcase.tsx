import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryFeaturedShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFeaturedShowcase: React.FC<CategoryFeaturedShowcaseProps> = ({
  onSelectCategory,
}) => {
  const features = [
    {
      id: 'hoodies',
      label: 'HOODIES',
      subtitle: 'Heavyweight fleece 420 GSM & drop-shoulder fit',
      image: '/src/assets/images/kalon_hoodie_nocturne_1793643976853.jpg',
      cta: 'EXPLORAR HOODIES',
    },
    {
      id: 'tees',
      label: 'T-SHIRTS',
      subtitle: 'Acid wash mineral wash & cuello grueso acanalado',
      image: '/src/assets/images/kalon_tee_acidwash_1793643977767.jpg',
      cta: 'EXPLORAR REMERAS',
    },
    {
      id: 'essentials',
      label: 'SETS & MONOCROMO',
      subtitle: 'Conjuntos minimalistas de caída estructurada',
      image: '/src/assets/images/kalon_hero_editorial_1793643978452.jpg',
      cta: 'EXPLORAR CONJUNTOS',
    },
  ];

  return (
    <section className="border-b border-neutral-200 bg-neutral-950 text-white dark:border-neutral-800">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {features.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectCategory(item.id)}
              className="group relative flex cursor-pointer items-center justify-between p-6 lg:p-8 transition-colors hover:bg-neutral-900"
            >
              {/* Left text column */}
              <div className="flex flex-col justify-between pr-4">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
                    COLECCIÓN //
                  </span>
                  <h3 className="mt-1 font-editorial text-lg lg:text-xl font-bold tracking-tight text-white uppercase">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-400 uppercase tracking-wider line-clamp-2">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-white group-hover:underline">
                  <span>{item.cta}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Right thumbnail preview */}
              <div className="relative h-24 w-20 lg:h-28 lg:w-24 shrink-0 overflow-hidden border border-neutral-800 bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
