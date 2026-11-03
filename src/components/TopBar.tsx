import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sun, Moon, Menu, X } from 'lucide-react';

interface TopBarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  orderCount: number;
  onOpenOrderDrawer: () => void;
  whatsAppNumber: string;
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  onToggleSearch?: () => void;
  isSearchOpen?: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  darkMode,
  onToggleTheme,
  orderCount,
  onOpenOrderDrawer,
  onSelectCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dynamic Scroll Listener: Auto-hides on scroll down, reveals on scroll up
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0;

    const handleScroll = () => {
      const currentY = window.scrollY;

      // Track whether page is scrolled for glassmorphic depth
      setIsScrolled(currentY > 20);

      // Keep navbar visible if mobile drawer is currently open
      if (mobileMenuOpen) {
        setIsVisible(true);
        lastY = currentY;
        return;
      }

      // Always show at top of page
      if (currentY <= 60) {
        setIsVisible(true);
      } else if (currentY > lastY + 6) {
        // Scrolling down -> hide smoothly
        setIsVisible(false);
      } else if (currentY < lastY - 6) {
        // Scrolling up -> reveal smoothly
        setIsVisible(true);
      }

      lastY = currentY > 0 ? currentY : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  const handleNavClick = (targetId: string, categoryId?: string) => {
    if (categoryId) {
      onSelectCategory(categoryId);
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Invisible Document Flow Spacer: Preserves the natural space so the Hero banner starts directly below the nav, preserving 100% of the image composition and symmetry */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />

      <header
        className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 ease-in-out ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0 pointer-events-none'
        } ${
          isScrolled
            ? 'border-b border-neutral-200/40 bg-white/60 shadow-xs backdrop-blur-xl backdrop-saturate-150 dark:border-neutral-800/40 dark:bg-neutral-950/60'
            : 'border-b border-neutral-200/60 bg-white dark:border-neutral-800/60 dark:bg-neutral-950'
        }`}
      >
      {/* Main Clean Navigation Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="relative flex h-16 sm:h-20 items-center justify-between">
          
          {/* Left Zone: Minimalist Editorial Links (Desktop) / Hamburger (Mobile) */}
          <div className="flex items-center gap-6 z-10 sm:w-1/3">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden flex h-10 w-10 items-center justify-center -ml-2 text-neutral-950 transition-opacity hover:opacity-70 dark:text-white"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Desktop Clean Nav Links (Refined, no heavy buttons) */}
            <nav className="hidden sm:flex items-center gap-6 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-600 dark:text-neutral-300">
              <button
                onClick={() => handleNavClick('grid-prendas', 'all')}
                className="transition-colors hover:text-neutral-950 dark:hover:text-white"
              >
                Colección
              </button>
              <button
                onClick={() => handleNavClick('lookbook')}
                className="transition-colors hover:text-neutral-950 dark:hover:text-white"
              >
                Lookbook
              </button>
            </nav>
          </div>

          {/* Center Zone: The Clean Iconic KALON Wordmark (Dead-centered across all screen sizes) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto text-center">
            <a href="#" className="inline-block group">
              <span className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[0.22em] text-neutral-950 dark:text-white uppercase transition-opacity hover:opacity-80">
                KALON
              </span>
            </a>
          </div>

          {/* Right Zone: Contact, Theme & Minimal Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-5 z-10 sm:w-1/3">
            {/* Desktop Contact Link */}
            <button
              onClick={() => handleNavClick('contacto')}
              className="hidden md:inline-block text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-600 hover:text-neutral-950 transition-colors dark:text-neutral-300 dark:hover:text-white"
            >
              Contacto
            </button>

            {/* Subtle Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="flex h-9 w-9 items-center justify-center text-neutral-700 transition-opacity hover:opacity-70 dark:text-neutral-300"
              aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Clean Minimal Bag Button */}
            <button
              onClick={onOpenOrderDrawer}
              className="group flex items-center gap-2 py-2 px-1 text-xs font-medium tracking-widest text-neutral-900 transition-opacity hover:opacity-70 dark:text-white"
              aria-label="Ver bolsa de pedidos"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline font-mono text-xs">BOLSA</span>
              <span className="font-mono text-xs">({orderCount})</span>
            </button>
          </div>

        </div>
      </div>

      {/* Clean Mobile Drawer with Glassmorphism */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-neutral-200/60 bg-white/90 px-6 py-8 shadow-xl backdrop-blur-xl dark:border-neutral-800/60 dark:bg-neutral-950/90">
          <nav className="flex flex-col space-y-5 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-800 dark:text-neutral-200">
            <button
              onClick={() => handleNavClick('grid-prendas', 'all')}
              className="text-left py-1 hover:text-black dark:hover:text-white"
            >
              Colección Completa
            </button>
            <button
              onClick={() => handleNavClick('grid-prendas', 'hoodies')}
              className="text-left py-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              — Hoodies
            </button>
            <button
              onClick={() => handleNavClick('grid-prendas', 'tees')}
              className="text-left py-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              — T-Shirts
            </button>
            <button
              onClick={() => handleNavClick('grid-prendas', 'essentials')}
              className="text-left py-1 text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white"
            >
              — Sets Monocromo
            </button>
            <div className="my-2 border-t border-neutral-100 dark:border-neutral-900" />
            <button
              onClick={() => handleNavClick('lookbook')}
              className="text-left py-1 hover:text-black dark:hover:text-white"
            >
              Editorial Lookbook
            </button>
            <button
              onClick={() => handleNavClick('contacto')}
              className="text-left py-1 hover:text-black dark:hover:text-white"
            >
              Contacto Directo
            </button>
          </nav>
        </div>
      )}
    </header>
    </>
  );
};
