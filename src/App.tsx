import React, { useState, useEffect, useMemo } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CategoryBar } from './components/CategoryBar';
import { CategoryFeaturedShowcase } from './components/CategoryFeaturedShowcase';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { OrderDrawer } from './components/OrderDrawer';
import { ContactSection } from './components/ContactSection';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { PRODUCTS_DATA, Product } from './data/products';
import { DEFAULT_SITE_SETTINGS } from './data/defaultSettings';
import { SiteSettings } from './types/admin';
import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { OrderItem } from './utils/whatsapp';
import { Check, Search, X, Heart } from 'lucide-react';

export default function App() {
  // Routing state for /admin (accessed directly by URL path or hash, no public button)
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      return path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash.startsWith('#/admin');
    }
    return false;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kalon_admin_session') === 'authenticated';
    }
    return false;
  });

  useEffect(() => {
    const handleLocationCheck = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const onAdmin = path === '/admin' || path.startsWith('/admin') || hash === '#/admin' || hash.startsWith('#/admin');
      setIsAdminRoute(onAdmin);
    };

    window.addEventListener('popstate', handleLocationCheck);
    window.addEventListener('hashchange', handleLocationCheck);
    return () => {
      window.removeEventListener('popstate', handleLocationCheck);
      window.removeEventListener('hashchange', handleLocationCheck);
    };
  }, []);

  const navigateToStore = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setIsAdminRoute(false);
    }
  };

  const handleLogoutAdmin = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kalon_admin_session');
      setIsAdminAuthenticated(false);
      navigateToStore();
    }
  };

  // Products Database State (Initialized from localStorage or default products)
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_custom_products');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((p: Product) => {
            if (p.id === 'kln-tee-sculptural') {
              return { ...p, images: ['/images/kalon_tee_white_1793722594473.jpg', '/images/kalon_tee_acidwash_1793643977767.jpg'] };
            }
            if (p.id === 'kln-hoodie-architect') {
              return { ...p, images: ['/images/kalon_hoodie_graphite_1793722613699.jpg', '/images/kalon_hoodie_nocturne_1793643976853.jpg'] };
            }
            return p;
          });
        } catch {
          return PRODUCTS_DATA;
        }
      }
    }
    return PRODUCTS_DATA;
  });

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('kalon_custom_products', JSON.stringify(newProducts));
  };

  // Site Settings & Editable Content State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_site_settings');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEFAULT_SITE_SETTINGS;
        }
      }
    }
    return DEFAULT_SITE_SETTINGS;
  });

  const handleUpdateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('kalon_site_settings', JSON.stringify(newSettings));
  };

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('kalon_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('kalon_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('kalon_theme', 'light');
    }
  }, [darkMode]);

  // WhatsApp number shortcut synced with siteSettings
  const whatsAppNumber = siteSettings.whatsAppNumber;

  // Mobile Bottom Nav Active Tab
  const [currentTab, setCurrentTab] = useState<'home' | 'catalog' | 'wishlist'>('home');

  // Category & Search
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('kalon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Order items bag
  const [orderItems, setOrderItems] = useState<OrderItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kalon_order_items');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('kalon_order_items', JSON.stringify(orderItems));
  }, [orderItems]);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast('Eliminado de favoritos');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Guardado en favoritos');
        return [...prev, id];
      }
    });
  };

  const handleAddToOrder = (product: Product, size: string, color: string) => {
    setOrderItems((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            code: product.code,
            price: product.price,
            size,
            color,
            quantity: 1,
          },
        ];
      }
    });

    showToast(`"${product.name}" añadido a la lista`);
  };

  const handleQuickAddToOrder = (product: Product, size: string, color: string) => {
    handleAddToOrder(product, size, color);
  };

  const handleUpdateQuantity = (id: string, size: string, color: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(id, size, color);
      return;
    }
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.color === color
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string, size: string, color: string) => {
    setOrderItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size && item.color === color))
    );
  };

  const handleClearOrder = () => {
    setOrderItems([]);
    showToast('Lista de pedidos vaciada');
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (currentTab === 'wishlist' && !wishlist.includes(p.id)) {
        return false;
      }

      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.code.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q);

      return matchesCat && matchesSearch;
    });
  }, [products, activeCategory, searchQuery, currentTab, wishlist]);

  const scrollToCatalog = () => {
    setCurrentTab('catalog');
    const el = document.getElementById('grid-prendas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // ================= ADMIN ROUTE RENDERING =================
  if (isAdminRoute) {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onBackToStore={navigateToStore}
        />
      );
    }

    return (
      <AdminDashboard
        products={products}
        onUpdateProducts={handleUpdateProducts}
        siteSettings={siteSettings}
        onUpdateSiteSettings={handleUpdateSiteSettings}
        onBackToStore={navigateToStore}
        onLogout={handleLogoutAdmin}
      />
    );
  }

  // ================= PUBLIC STOREFRONT (ZERO ADMIN LOGOS/BUTTONS) =================
  return (
    <div className="min-h-screen bg-white text-neutral-900 transition-colors duration-200 pb-20 md:pb-0 dark:bg-neutral-950 dark:text-neutral-100">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 left-1/2 z-50 -translate-x-1/2 border border-neutral-300 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-md dark:border-neutral-700 dark:bg-white dark:text-neutral-950">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-500" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* TopBar with Centered KALON Serif Logo and Balanced 3-Zone Architecture */}
      <TopBar
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
        orderCount={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        whatsAppNumber={whatsAppNumber}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (currentTab === 'wishlist') setCurrentTab('catalog');
          scrollToCatalog();
        }}
        onToggleSearch={() => setIsSearchOpen(!isSearchOpen)}
        isSearchOpen={isSearchOpen}
      />

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="border-b border-neutral-200 bg-white p-3 shadow-xs dark:border-neutral-800 dark:bg-neutral-900">
          <div className="mx-auto flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por prenda, hoodie, remera o código..."
                className="w-full border border-neutral-300 bg-neutral-50 py-2 pr-9 pl-9 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2 text-xs font-semibold text-neutral-600 dark:text-neutral-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Hero Section (Driven by dynamic siteSettings slides) */}
      {currentTab !== 'wishlist' && (
        <HeroSection
          onExploreClick={scrollToCatalog}
          slides={siteSettings.heroSlides}
        />
      )}

      {/* GAZU-Style 3-Column Category Split Showcase */}
      {currentTab !== 'wishlist' && (
        <CategoryFeaturedShowcase
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCatalog();
          }}
        />
      )}

      {/* Main Catalog Viewport */}
      <main className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        
        {/* Wishlist Header if on Wishlist Tab */}
        {currentTab === 'wishlist' && (
          <div className="my-6 flex items-center justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
                MIS PRENDAS GUARDADAS
              </span>
              <h2 className="mt-1 font-editorial text-2xl sm:text-3xl font-extrabold text-neutral-950 dark:text-white">
                Favoritos ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={() => setCurrentTab('catalog')}
              className="text-xs font-semibold text-neutral-600 underline dark:text-neutral-300"
            >
              Ver catálogo completo
            </button>
          </div>
        )}

        {/* Minimal Typographic Category Strip */}
        {currentTab !== 'wishlist' && (
          <CategoryBar
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              scrollToCatalog();
            }}
            totalCount={filteredProducts.length}
          />
        )}

        {/* Section Header */}
        <div id="grid-prendas" className="mt-8 mb-4 flex items-center justify-between px-1">
          <div>
            <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-tight text-neutral-950 dark:text-white">
              {currentTab === 'wishlist'
                ? 'Prendas Favoritas'
                : activeCategory === 'all'
                ? 'Catálogo General'
                : `Colección ${activeCategory.toUpperCase()}`}
            </h2>
            <span className="text-[11px] font-mono text-neutral-400">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'PRENDA' : 'PRENDAS'}
            </span>
          </div>

          {activeCategory !== 'all' && (
            <button
              onClick={() => setActiveCategory('all')}
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            >
              Ver todo &gt;
            </button>
          )}
        </div>

        {/* 2-Column Mobile Grid / 3-Column Tablet / 4-Column Desktop Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setSelectedProduct}
                onQuickAddToOrder={handleQuickAddToOrder}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="my-12 flex flex-col items-center justify-center border border-neutral-200 bg-white p-8 text-center dark:border-neutral-800 dark:bg-neutral-900">
            {currentTab === 'wishlist' ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center border border-neutral-200 bg-neutral-100 text-neutral-400 dark:border-neutral-800 dark:bg-neutral-800">
                  <Heart className="h-6 w-6" />
                </div>
                <p className="mt-3 font-editorial text-base font-bold text-neutral-900 dark:text-white">
                  Aún no tienes favoritos guardados
                </p>
                <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                  Toca el icono del corazón en cualquier prenda para guardarla aquí.
                </p>
                <button
                  onClick={() => setCurrentTab('catalog')}
                  className="mt-4 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider dark:bg-white dark:text-neutral-950"
                >
                  Explorar Prendas
                </button>
              </>
            ) : (
              <>
                <p className="font-editorial text-base font-bold text-neutral-900 dark:text-white">
                  No se encontraron prendas con &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-white uppercase tracking-wider dark:bg-white dark:text-neutral-950"
                >
                  Ver todo el catálogo
                </button>
              </>
            )}
          </div>
        )}

      </main>

      {/* Editorial Lookbook Section (Driven by siteSettings.lookbookItems) */}
      <section id="lookbook" className="border-t border-neutral-200 bg-neutral-50/60 py-16 dark:border-neutral-800 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
                EDITORIAL
              </span>
              <h3 className="font-editorial text-lg sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white uppercase">
                Lookbook & Streetwear
              </h3>
            </div>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
              [EDICIÓN 2025]
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteSettings.lookbookItems.map((look) => (
              <div key={look.id} className="group relative overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800">
                <img
                  src={look.image}
                  alt={look.title}
                  className="h-80 sm:h-96 lg:h-[460px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 text-white">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-neutral-300">
                    {look.lookNumber}
                  </span>
                  <p className="mt-1 font-editorial text-base lg:text-lg font-bold">
                    {look.title}
                  </p>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-0.5">
                    {look.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Designated Contact Section */}
      <ContactSection whatsAppNumber={whatsAppNumber} />

      {/* Footer */}
      <Footer whatsAppNumber={whatsAppNumber} />

      {/* Fixed Bottom Navigation Bar on Mobile */}
      <BottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        wishlistCount={wishlist.length}
        orderCount={orderItems.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        whatsAppNumber={whatsAppNumber}
      />

      {/* Product Detail Sheet / Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToOrder={handleAddToOrder}
        whatsAppNumber={whatsAppNumber}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Multi-Item Order Drawer */}
      <OrderDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        items={orderItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearOrder={handleClearOrder}
        whatsAppNumber={whatsAppNumber}
      />

    </div>
  );
}
