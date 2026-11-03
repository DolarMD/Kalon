import React from 'react';

interface CategoryBarProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  totalCount: number;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  totalCount,
}) => {
  const categories = [
    { id: 'all', label: 'TODOS' },
    { id: 'hoodies', label: 'HOODIES' },
    { id: 'tees', label: 'T-SHIRTS' },
    { id: 'crewnecks', label: 'CREWNECKS' },
    { id: 'essentials', label: 'SETS & MONOCROMO' },
    { id: 'dtf-tech', label: 'TECNOLOGÍA DTF' },
  ];

  return (
    <div className="border-y border-neutral-200 bg-white py-3.5 my-6 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-none px-1">
        <div className="flex items-center gap-6 whitespace-nowrap">
          {categories.map((cat, idx) => {
            const isSelected = activeCategory === cat.id;
            return (
              <React.Fragment key={cat.id}>
                {idx > 0 && (
                  <span className="text-neutral-300 dark:text-neutral-700 font-mono text-xs" aria-hidden="true">
                    /
                  </span>
                )}
                <button
                  onClick={() => {
                    if (cat.id === 'dtf-tech') {
                      const el = document.getElementById('tecnologia-dtf');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      onSelectCategory(cat.id);
                    }
                  }}
                  className={`relative py-1 text-xs font-bold tracking-widest uppercase transition-colors ${
                    isSelected
                      ? 'text-neutral-950 dark:text-white'
                      : 'text-neutral-400 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                  {isSelected && (
                    <span className="absolute inset-x-0 -bottom-3.5 h-0.5 bg-neutral-950 dark:bg-white" />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        <div className="hidden sm:block text-[11px] font-mono tracking-widest text-neutral-400 uppercase shrink-0">
          [{totalCount} ITEMS]
        </div>
      </div>
    </div>
  );
};
