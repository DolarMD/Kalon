import React, { useState } from 'react';
import {
  Package,
  FileText,
  Sparkles,
  Layers,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  Check,
  Eye,
  EyeOff,
  Phone,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  Search,
} from 'lucide-react';
import { Product, PRODUCTS_DATA } from '../../data/products';
import { SiteSettings } from '../../types/admin';
import { ProductEditorModal } from './ProductEditorModal';
import { formatCurrency } from '../../utils/whatsapp';
import { KalonLogo } from '../KalonLogo';

interface AdminDashboardProps {
  products: Product[];
  onUpdateProducts: (newProducts: Product[]) => void;
  siteSettings: SiteSettings;
  onUpdateSiteSettings: (newSettings: SiteSettings) => void;
  onBackToStore: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  siteSettings,
  onUpdateSiteSettings,
  onBackToStore,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'texts' | 'lookbook' | 'dtf' | 'security'>('products');
  
  // Product editor state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Local copy of site settings for form edits
  const [formSettings, setFormSettings] = useState<SiteSettings>(siteSettings);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Security password state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Product Actions
  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsEditorOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setIsEditorOpen(true);
  };

  const handleSaveProduct = (prod: Product) => {
    const existingIndex = products.findIndex((p) => p.id === prod.id);
    let updated: Product[];
    if (existingIndex >= 0) {
      updated = [...products];
      updated[existingIndex] = prod;
      showToast(`Prenda "${prod.name}" actualizada con éxito.`);
    } else {
      updated = [prod, ...products];
      showToast(`Nueva prenda "${prod.name}" añadida.`);
    }
    onUpdateProducts(updated);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar permanentemente la prenda "${name}"?`)) {
      const updated = products.filter((p) => p.id !== id);
      onUpdateProducts(updated);
      showToast(`Prenda eliminada.`);
    }
  };

  const handleToggleStock = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, inStock: !p.inStock } : p
    );
    onUpdateProducts(updated);
    showToast(`Estado de inventario actualizado.`);
  };

  // Settings Actions
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSiteSettings(formSettings);
    showToast('Configuraciones y textos de marca guardados.');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }
    localStorage.setItem('kalon_admin_pass', newPassword.trim());
    setNewPassword('');
    setConfirmPassword('');
    showToast('Contraseña maestra actualizada.');
  };

  const handleExportData = () => {
    const data = {
      products,
      siteSettings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kalon-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreDefaults = () => {
    if (confirm('¿Restaurar todas las prendas originales y textos iniciales de KALON?')) {
      onUpdateProducts(PRODUCTS_DATA);
      localStorage.removeItem('kalon_custom_products');
      localStorage.removeItem('kalon_site_settings');
      showToast('Datos de fábrica restaurados.');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    const matchesSearch =
      !productSearch ||
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.code.toLowerCase().includes(productSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-white selection:text-black">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 border border-neutral-700 bg-neutral-900 px-5 py-3 text-xs font-mono font-bold text-white shadow-2xl flex items-center gap-2">
          <Check className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Header (Sharp 90 degrees) */}
      <header className="border-b border-neutral-800 bg-neutral-950 sticky top-0 z-40 px-4 sm:px-8 py-4">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center border border-neutral-700 bg-neutral-900 p-1">
              <KalonLogo className="h-full w-full text-white" />
            </div>
            <span className="font-editorial text-2xl font-black tracking-widest text-white uppercase">
              KALON
            </span>
            <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest border-l border-neutral-800 pl-3">
              PANEL DE CONTROL
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 border border-neutral-700 bg-neutral-900 px-4 py-2 text-xs font-bold tracking-widest uppercase text-white hover:border-white transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Ver Tienda</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 border border-rose-900/60 bg-rose-950/20 px-3.5 py-2 text-xs font-bold tracking-widest uppercase text-rose-300 hover:bg-rose-950/50 transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Salir</span>
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Navigation Tabs Strip */}
      <div className="border-b border-neutral-800 bg-neutral-900/50 px-4 sm:px-8">
        <div className="mx-auto max-w-7xl flex gap-6 overflow-x-auto scrollbar-none py-1">
          {[
            { id: 'products', label: 'PRENDAS & CATÁLOGO', icon: Package },
            { id: 'texts', label: 'CAMPAÑAS & TEXTOS', icon: FileText },
            { id: 'lookbook', label: 'LOOKBOOK', icon: Layers },
            { id: 'dtf', label: 'ESTUDIO DTF', icon: Sparkles },
            { id: 'security', label: 'AJUSTES & RESPALDO', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-3.5 text-xs font-bold tracking-widest uppercase transition-colors relative whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {isActive && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Workspace Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        
        {/* ================= TAB 1: PRODUCTS ================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
              <div>
                <h1 className="font-editorial text-2xl font-bold uppercase tracking-tight">
                  Prendas del Catálogo ({products.length})
                </h1>
                <p className="text-xs font-mono uppercase text-neutral-400 mt-1">
                  Gestiona precios, tallas, inventario y especificaciones textiles DTF
                </p>
              </div>

              <button
                onClick={handleCreateProduct}
                className="flex items-center gap-2 border border-white bg-white px-5 py-3 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                <span>Añadir Nueva Prenda</span>
              </button>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 border border-neutral-800 bg-neutral-900/40 p-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Buscar por nombre o código (ej. Hoodie, KLN-H01)..."
                  className="w-full border border-neutral-800 bg-neutral-950 py-2 pr-4 pl-9 text-xs text-white placeholder:text-neutral-500 focus:border-white focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-[10px] font-mono uppercase text-neutral-400 shrink-0">Filtrar:</span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full sm:w-auto border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white focus:border-white focus:outline-hidden"
                >
                  <option value="all">TODAS LAS CATEGORÍAS</option>
                  <option value="hoodies">HOODIES</option>
                  <option value="tees">T-SHIRTS</option>
                  <option value="crewnecks">CREWNECKS</option>
                  <option value="essentials">SETS & MONOCROMO</option>
                </select>
              </div>
            </div>

            {/* Products Table */}
            <div className="border border-neutral-800 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-neutral-800 bg-neutral-900/70 font-mono text-[10px] tracking-widest uppercase text-neutral-400">
                  <tr>
                    <th className="p-4">Prenda</th>
                    <th className="p-4">SKU / Cat</th>
                    <th className="p-4">Precio</th>
                    <th className="p-4">Tallas</th>
                    <th className="p-4">Colores</th>
                    <th className="p-4">Estado</th>
                    <th className="p-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 font-sans">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-neutral-900/40 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-16 w-12 border border-neutral-800 bg-neutral-900 shrink-0 overflow-hidden">
                            <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <span className="font-editorial text-sm font-bold uppercase block text-white">
                              {p.name}
                            </span>
                            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mt-0.5">
                              {p.fit}
                            </span>
                            {p.tag && (
                              <span className="inline-block mt-1 bg-white text-black px-1.5 py-0.5 text-[8px] font-bold tracking-widest uppercase">
                                {p.tag}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-mono text-[11px]">
                        <span className="text-white block font-bold">{p.code}</span>
                        <span className="text-neutral-500 uppercase">{p.category}</span>
                      </td>

                      <td className="p-4 font-mono text-sm font-bold text-white">
                        {formatCurrency(p.price, p.currency)}
                      </td>

                      <td className="p-4 font-mono text-[11px] text-neutral-300">
                        {p.sizes.join(', ')}
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-1.5">
                          {p.colors.map((c) => (
                            <span
                              key={c.name}
                              title={c.name}
                              className="h-3 w-3 border border-white/20 inline-block"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <button
                          type="button"
                          onClick={() => handleToggleStock(p.id)}
                          className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider uppercase border transition-colors ${
                            p.inStock
                              ? 'border-emerald-600 bg-emerald-950/40 text-emerald-300'
                              : 'border-rose-700 bg-rose-950/40 text-rose-300'
                          }`}
                        >
                          {p.inStock ? 'EN STOCK' : 'AGOTADO'}
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditProduct(p)}
                            className="p-2 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-colors"
                            title="Editar prenda"
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-2 border border-rose-900/60 text-rose-400 hover:bg-rose-950 transition-colors"
                            title="Eliminar prenda"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && (
                <div className="p-12 text-center text-neutral-500 text-xs font-mono uppercase">
                  No se encontraron prendas con los filtros actuales.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= TAB 2: TEXTS & CAMPAIGNS ================= */}
        {activeTab === 'texts' && (
          <form onSubmit={handleSaveSettings} className="space-y-8 max-w-4xl">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="font-editorial text-2xl font-bold uppercase tracking-tight">
                Textos de Marca & Campañas
              </h1>
              <p className="text-xs font-mono uppercase text-neutral-400 mt-1">
                Ajusta números de WhatsApp, cintillos publicitarios y portada Hero
              </p>
            </div>

            {/* WhatsApp Config */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>Teléfono de WhatsApp para Pedidos</span>
              </div>
              <div>
                <input
                  type="text"
                  required
                  value={formSettings.whatsAppNumber}
                  onChange={(e) =>
                    setFormSettings({ ...formSettings, whatsAppNumber: e.target.value })
                  }
                  placeholder="+52 55 8124 9301"
                  className="w-full border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm font-mono text-white focus:border-white focus:outline-hidden"
                />
                <p className="mt-2 text-[11px] text-neutral-400">
                  Todos los botones de WhatsApp de la tienda enlazarán inmediatamente a este número con el pedido estructurado.
                </p>
              </div>
            </div>

            {/* Top Announcement Bar */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-white">
                Cintillo Superior de Anuncios
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Texto Izquierdo</label>
                  <input
                    type="text"
                    value={formSettings.announcementBar.left}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        announcementBar: {
                          ...formSettings.announcementBar,
                          left: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Texto Central</label>
                  <input
                    type="text"
                    value={formSettings.announcementBar.center}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        announcementBar: {
                          ...formSettings.announcementBar,
                          center: e.target.value,
                        },
                      })
                    }
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Hero Main Slide */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-white">
                Hero Principal (Slide 1)
              </span>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Kicker / Temporada</label>
                  <input
                    type="text"
                    value={formSettings.heroSlides[0]?.kicker || ''}
                    onChange={(e) => {
                      const updatedSlides = [...formSettings.heroSlides];
                      updatedSlides[0] = { ...updatedSlides[0], kicker: e.target.value };
                      setFormSettings({ ...formSettings, heroSlides: updatedSlides });
                    }}
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Título Principal (H1)</label>
                  <input
                    type="text"
                    value={formSettings.heroSlides[0]?.title || ''}
                    onChange={(e) => {
                      const updatedSlides = [...formSettings.heroSlides];
                      updatedSlides[0] = { ...updatedSlides[0], title: e.target.value };
                      setFormSettings({ ...formSettings, heroSlides: updatedSlides });
                    }}
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-bold text-white font-editorial"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Subtítulo Descriptivo</label>
                  <textarea
                    rows={2}
                    value={formSettings.heroSlides[0]?.subtitle || ''}
                    onChange={(e) => {
                      const updatedSlides = [...formSettings.heroSlides];
                      updatedSlides[0] = { ...updatedSlides[0], subtitle: e.target.value };
                      setFormSettings({ ...formSettings, heroSlides: updatedSlides });
                    }}
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">URL Imagen Editorial</label>
                  <input
                    type="text"
                    value={formSettings.heroSlides[0]?.image || ''}
                    onChange={(e) => {
                      const updatedSlides = [...formSettings.heroSlides];
                      updatedSlides[0] = { ...updatedSlides[0], image: e.target.value };
                      setFormSettings({ ...formSettings, heroSlides: updatedSlides });
                    }}
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Promo Banner */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-white">
                Tira de Promoción de Envíos
              </span>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Título de la Promoción</label>
                  <input
                    type="text"
                    value={formSettings.promoBanner.title}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        promoBanner: { ...formSettings.promoBanner, title: e.target.value },
                      })
                    }
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase">Subtítulo</label>
                  <input
                    type="text"
                    value={formSettings.promoBanner.subtitle}
                    onChange={(e) =>
                      setFormSettings({
                        ...formSettings,
                        promoBanner: { ...formSettings.promoBanner, subtitle: e.target.value },
                      })
                    }
                    className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 border border-white bg-white px-8 py-4 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
            >
              <Check className="h-4 w-4" />
              <span>Guardar Textos de Campaña</span>
            </button>
          </form>
        )}

        {/* ================= TAB 3: LOOKBOOK ================= */}
        {activeTab === 'lookbook' && (
          <div className="space-y-6 max-w-4xl">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="font-editorial text-2xl font-bold uppercase tracking-tight">
                Editorial Lookbook (3 Looks)
              </h1>
              <p className="text-xs font-mono uppercase text-neutral-400 mt-1">
                Actualiza fotografías y leyendas de las 3 imágenes de campaña
              </p>
            </div>

            <div className="space-y-6">
              {formSettings.lookbookItems.map((look, index) => (
                <div key={look.id} className="border border-neutral-800 bg-neutral-900/40 p-6 flex flex-col md:flex-row gap-6">
                  <div className="h-40 w-32 shrink-0 border border-neutral-800 bg-neutral-950 overflow-hidden">
                    <img src={look.image} alt={look.title} className="h-full w-full object-cover" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <span className="font-mono text-xs font-bold text-neutral-400 uppercase">
                      {look.lookNumber}
                    </span>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase">Título del Look</label>
                      <input
                        type="text"
                        value={look.title}
                        onChange={(e) => {
                          const updated = [...formSettings.lookbookItems];
                          updated[index] = { ...updated[index], title: e.target.value };
                          setFormSettings({ ...formSettings, lookbookItems: updated });
                        }}
                        className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-bold text-white font-editorial"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase">Descripción de la Estampa DTF</label>
                      <input
                        type="text"
                        value={look.subtitle}
                        onChange={(e) => {
                          const updated = [...formSettings.lookbookItems];
                          updated[index] = { ...updated[index], subtitle: e.target.value };
                          setFormSettings({ ...formSettings, lookbookItems: updated });
                        }}
                        className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase">URL Imagen</label>
                      <input
                        type="text"
                        value={look.image}
                        onChange={(e) => {
                          const updated = [...formSettings.lookbookItems];
                          updated[index] = { ...updated[index], image: e.target.value };
                          setFormSettings({ ...formSettings, lookbookItems: updated });
                        }}
                        className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono text-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                onUpdateSiteSettings(formSettings);
                showToast('Lookbook actualizado.');
              }}
              className="flex items-center gap-2 border border-white bg-white px-8 py-4 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
            >
              <Check className="h-4 w-4" />
              <span>Guardar Lookbook</span>
            </button>
          </div>
        )}

        {/* ================= TAB 4: DTF STUDIO ================= */}
        {activeTab === 'dtf' && (
          <div className="space-y-6 max-w-4xl">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="font-editorial text-2xl font-bold uppercase tracking-tight">
                Estudio Textil & Especificaciones DTF
              </h1>
              <p className="text-xs font-mono uppercase text-neutral-400 mt-1">
                Configura los 4 puntos técnicos y el llamado de maquila B2B
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formSettings.dtfFeatures.map((feat, index) => (
                <div key={feat.number} className="border border-neutral-800 bg-neutral-900/40 p-4 space-y-2">
                  <span className="font-mono text-[10px] text-neutral-400">{feat.number}</span>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase">Título</label>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) => {
                        const updated = [...formSettings.dtfFeatures];
                        updated[index] = { ...updated[index], title: e.target.value };
                        setFormSettings({ ...formSettings, dtfFeatures: updated });
                      }}
                      className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase">Descripción</label>
                    <textarea
                      rows={2}
                      value={feat.desc}
                      onChange={(e) => {
                        const updated = [...formSettings.dtfFeatures];
                        updated[index] = { ...updated[index], desc: e.target.value };
                        setFormSettings({ ...formSettings, dtfFeatures: updated });
                      }}
                      className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* B2B Callout */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-3">
              <span className="text-xs font-bold tracking-widest uppercase text-white block">
                Caja de Cotización Mayoreo DTF
              </span>
              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase">Pregunta Principal</label>
                <input
                  type="text"
                  value={formSettings.dtfCustomCta.title}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      dtfCustomCta: { ...formSettings.dtfCustomCta, title: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase">Subtítulo</label>
                <input
                  type="text"
                  value={formSettings.dtfCustomCta.subtitle}
                  onChange={(e) =>
                    setFormSettings({
                      ...formSettings,
                      dtfCustomCta: { ...formSettings.dtfCustomCta, subtitle: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            <button
              onClick={() => {
                onUpdateSiteSettings(formSettings);
                showToast('Sección DTF actualizada.');
              }}
              className="flex items-center gap-2 border border-white bg-white px-8 py-4 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
            >
              <Check className="h-4 w-4" />
              <span>Guardar Fichas DTF</span>
            </button>
          </div>
        )}

        {/* ================= TAB 5: SECURITY & BACKUP ================= */}
        {activeTab === 'security' && (
          <div className="space-y-8 max-w-2xl">
            <div className="border-b border-neutral-800 pb-4">
              <h1 className="font-editorial text-2xl font-bold uppercase tracking-tight">
                Seguridad & Respaldos
              </h1>
              <p className="text-xs font-mono uppercase text-neutral-400 mt-1">
                Cambia tu clave de acceso /admin y exporta copias de seguridad
              </p>
            </div>

            {/* Change Password Form */}
            <form onSubmit={handleChangePassword} className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-white">
                Cambiar Contraseña de Acceso (/admin)
              </span>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase">Nueva Contraseña</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Escribe tu nueva clave..."
                  className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-neutral-400 uppercase">Confirmar Contraseña</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite la nueva clave..."
                  className="mt-1 w-full border border-neutral-800 bg-neutral-950 px-3 py-2.5 text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className="border border-white bg-white px-6 py-3 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
              >
                Actualizar Clave Maestra
              </button>
            </form>

            {/* Backup & Restore */}
            <div className="border border-neutral-800 bg-neutral-900/40 p-6 space-y-4">
              <span className="block text-xs font-bold tracking-widest uppercase text-white">
                Respaldo de Datos (JSON)
              </span>
              <p className="text-xs text-neutral-400">
                Descarga una copia completa de tus prendas, fotos, precios y configuraciones. Puedes guardarla en tu computadora en cualquier momento.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExportData}
                  className="flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:border-white"
                >
                  <Download className="h-4 w-4" />
                  <span>Descargar Copia de Seguridad (.json)</span>
                </button>
              </div>
            </div>

            {/* Factory Reset */}
            <div className="border border-rose-900/50 bg-rose-950/20 p-6 space-y-3">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold tracking-widest uppercase">
                  Zona de Riesgo: Restaurar Fábrica
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Si deseas reiniciar el catálogo completo con las prendas y fotos iniciales de KALON, puedes restablecerlo con este botón.
              </p>

              <button
                type="button"
                onClick={handleRestoreDefaults}
                className="flex items-center gap-2 border border-rose-800 bg-rose-950 px-4 py-3 text-xs font-bold uppercase tracking-wider text-rose-300 hover:bg-rose-900"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Restaurar Catálogo Original</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Product Editor Modal */}
      <ProductEditorModal
        product={editingProduct}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSaveProduct}
      />

    </div>
  );
};
