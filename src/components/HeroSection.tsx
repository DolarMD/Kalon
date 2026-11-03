import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { HeroSlide } from '../types/admin';

interface HeroSectionProps {
  onExploreClick: () => void;
  slides?: HeroSlide[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  slides: propSlides,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const defaultSlides: HeroSlide[] = [
    {
      id: 'slide-1',
      kicker: '',
      watermark: '',
      title: 'STREETWEAR ATELIER',
      subtitle: '',
      image: '/src/assets/images/kalon_hero_editorial_1793643978452.jpg',
      badge: '',
    },
    {
      id: 'slide-2',
      kicker: '',
      watermark: '',
      title: 'ELEVATED ESSENTIALS',
      subtitle: '',
      image: '/assets/aistudio/ba5ab13e7c1c06d05697ff377e4ea0bd_2ab4a93d.jpg',
      badge: '',
    },
  ];

  const slides = propSlides && propSlides.length > 0 ? propSlides : defaultSlides;
  const current = slides[activeSlide] || slides[0] || defaultSlides[0];

  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-200 bg-neutral-950 dark:border-neutral-800">
      {/* Clean Editorial Canvas: Focused photography, no clutter */}
      <div className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] w-full flex items-end">
        
        {/* Background Photography with Filmic Contrast */}
        <img
          src={current.image}
          alt={current.title}
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.80] dark:brightness-[0.70] transition-all duration-700"
        />

        {/* Minimal Smooth Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

        {/* Single Impactful Statement (Clean, Zero Clutter) */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="max-w-2xl">
            
            {/* Solo una frase contundente */}
            <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wide text-white leading-[1.05]">
              {current.title}
            </h1>

            {/* Explorar Catálogo CTA limpio */}
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={onExploreClick}
                className="group inline-flex items-center gap-3 bg-white px-7 py-3.5 text-xs font-bold tracking-widest text-neutral-950 uppercase transition-all hover:bg-neutral-200 active:scale-98"
              >
                <span>EXPLORAR COLECCIÓN</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>

          </div>

          {/* Minimalist Slide Switcher (Only if multiple slides) */}
          {slides.length > 1 && (
            <div className="mt-8 flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`h-0.5 transition-all ${
                    activeSlide === idx
                      ? 'w-10 bg-white'
                      : 'w-4 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
