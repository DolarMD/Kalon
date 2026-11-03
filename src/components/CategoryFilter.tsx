import React from 'react';
import { Search, X } from 'lucide-react';

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalCount: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalCount,
}) => {
  return (
    <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6 dark:border-neutral-800">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto p-1 text-xs">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`rounded-lg px-4 py-2 font-semibold tracking-wider uppercase transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-neutral-950 text-white shadow-xs dark:bg-white dark:text-neutral-950'
                    : 'text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por prenda o código..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-2 pr-9 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-white"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results counter metadata */}
      <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
        <span className="font-mono tabular-nums">
          Mostrando {totalCount} {totalCount === 1 ? 'prenda' : 'prendas'} en el catálogo
        </span>
        {searchQuery && (
          <span className="italic">
            Filtrando por: &quot;{searchQuery}&quot;
          </span>
        )}
      </div>
    </div>
  );
};
