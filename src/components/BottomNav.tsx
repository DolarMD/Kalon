import React from 'react';
import { Home, LayoutGrid, Heart, ShoppingBag } from 'lucide-react';

interface BottomNavProps {
  currentTab: 'home' | 'catalog' | 'wishlist';
  onSelectTab: (tab: 'home' | 'catalog' | 'wishlist') => void;
  wishlistCount: number;
  orderCount: number;
  onOpenOrderDrawer: () => void;
  whatsAppNumber?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  wishlistCount,
  orderCount,
  onOpenOrderDrawer,
}) => {
  return (
    <nav
      aria-label="Navegación móvil inferior"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-neutral-200 bg-white/95 pb-safe backdrop-blur-md md:hidden dark:border-neutral-800 dark:bg-neutral-950/95"
    >
      <div className="grid h-14 grid-cols-4 items-center px-1">
        
        {/* Tab 1: Home */}
        <button
          onClick={() => {
            onSelectTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'home'
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
          }`}
          aria-label="Ir a Inicio"
        >
          <Home className={`h-4.5 w-4.5 ${currentTab === 'home' ? 'stroke-[2.2]' : 'stroke-[1.5]'}`} />
          <span className="mt-1 text-[9px] font-bold tracking-widest uppercase">Home</span>
        </button>

        {/* Tab 2: Shop / Catalog */}
        <button
          onClick={() => {
            onSelectTab('catalog');
            const el = document.getElementById('grid-prendas');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'catalog'
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
          }`}
          aria-label="Ir al Catálogo"
        >
          <LayoutGrid className={`h-4.5 w-4.5 ${currentTab === 'catalog' ? 'stroke-[2.2]' : 'stroke-[1.5]'}`} />
          <span className="mt-1 text-[9px] font-bold tracking-widest uppercase">Prendas</span>
        </button>

        {/* Tab 3: Wishlist / Favoritos */}
        <button
          onClick={() => onSelectTab('wishlist')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            currentTab === 'wishlist'
              ? 'text-neutral-950 dark:text-white'
              : 'text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
          }`}
          aria-label="Ver Favoritos"
        >
          <div className="relative">
            <Heart className={`h-4.5 w-4.5 ${currentTab === 'wishlist' ? 'fill-neutral-950 stroke-[2] dark:fill-white' : 'stroke-[1.5]'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center bg-neutral-950 font-mono text-[8px] font-bold text-white dark:bg-white dark:text-neutral-950">
                {wishlistCount}
              </span>
            )}
          </div>
          <span className="mt-1 text-[9px] font-bold tracking-widest uppercase">Favoritos</span>
        </button>

        {/* Tab 4: Order Bag */}
        <button
          onClick={onOpenOrderDrawer}
          className="relative flex flex-col items-center justify-center py-1 text-neutral-400 hover:text-neutral-950 dark:text-neutral-500 dark:hover:text-neutral-200"
          aria-label="Abrir pedido"
        >
          <div className="relative">
            <ShoppingBag className="h-4.5 w-4.5 stroke-[1.5]" />
            {orderCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-3.5 w-3.5 items-center justify-center bg-neutral-950 font-mono text-[8px] font-bold text-white dark:bg-white dark:text-neutral-950">
                {orderCount}
              </span>
            )}
          </div>
          <span className="mt-1 text-[9px] font-bold tracking-widest uppercase">Pedido</span>
        </button>

      </div>
    </nav>
  );
};
