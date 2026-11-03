import React from 'react';
import { Sparkles } from 'lucide-react';

interface CategoryAvatarsProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onViewAll: () => void;
}

export const CategoryAvatars: React.FC<CategoryAvatarsProps> = ({
  activeCategory,
  onSelectCategory,
  onViewAll,
}) => {
  const categoryList = [
    {
      id: 'hoodies',
      label: 'Hoodies',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M7 6L4 9l2 12h12l2-12-3-3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 6a3 3 0 0 1 6 0v2H9V6z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 13h6" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'tees',
      label: 'T-Shirts',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M6 4L2 8l4 2v10h12V10l4-2-4-4-4 2a4 4 0 0 1-8 0L6 4z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'crewnecks',
      label: 'Crewnecks',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <path d="M6 5L2 9l3 1v10h14V10l3-1-4-4a4 4 0 0 1-8 0L6 5z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 5a4 4 0 0 0 8 0" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      id: 'essentials',
      label: 'Sets',
      svg: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
          <rect x="4" y="3" width="16" height="8" rx="2" strokeLinecap="round"/>
          <path d="M6 11v9a1 1 0 0 0 1 1h3l2-7 2 7h3a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 'dtf-service',
      label: 'DTF Tech',
      isSpecial: true,
      svg: <Sparkles className="h-6 w-6" />,
    },
  ];

  return (
    <div className="py-4">
      {/* Header row: Shop by Category | See All > */}
      <div className="flex items-center justify-between px-1 mb-3">
        <h3 className="font-editorial text-sm font-bold tracking-tight text-neutral-900 sm:text-base dark:text-white">
          Shop by Category
        </h3>
        <button
          onClick={onViewAll}
          className="text-xs font-semibold text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
        >
          View all &gt;
        </button>
      </div>

      {/* Horizontal scrollable avatars */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-none px-1">
        {categoryList.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                if (cat.id === 'dtf-service') {
                  const el = document.getElementById('tecnologia-dtf');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  onSelectCategory(cat.id);
                }
              }}
              className="group flex flex-col items-center shrink-0 focus:outline-hidden"
            >
              <div
                className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-200 ${
                  isSelected
                    ? 'border-2 border-neutral-950 bg-neutral-950 text-white shadow-md dark:border-white dark:bg-white dark:text-neutral-950'
                    : 'border border-neutral-200 bg-neutral-100 text-neutral-700 hover:border-neutral-400 hover:bg-neutral-200/80 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-600'
                }`}
              >
                {cat.svg}
              </div>
              <span
                className={`mt-2 text-[11px] font-medium tracking-tight transition-colors ${
                  isSelected
                    ? 'font-bold text-neutral-950 dark:text-white'
                    : 'text-neutral-600 group-hover:text-neutral-950 dark:text-neutral-400 dark:group-hover:text-white'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
