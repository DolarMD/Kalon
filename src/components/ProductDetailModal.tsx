import React, { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, ShoppingBag, Sparkles, Check, Ruler, Copy, Heart, X, ShieldCheck, Truck } from 'lucide-react';
import { Product } from '../data/products';
import { formatCurrency, buildSingleProductWhatsAppUrl } from '../utils/whatsapp';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToOrder: (product: Product, size: string, color: string) => void;
  whatsAppNumber: string;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToOrder,
  whatsAppNumber,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'desc' | 'dtf' | 'care'>('desc');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  useEffect(() => {
    if (product) {
      setIsRendered(true);
      setActiveImageIndex(0);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setShowSizeGuide(false);
      setActiveTab('desc');
      const timer = requestAnimationFrame(() => {
        setIsAnimatingIn(true);
      });
      document.body.style.overflow = 'hidden';
      return () => {
        cancelAnimationFrame(timer);
        document.body.style.overflow = '';
      };
    } else {
      setIsAnimatingIn(false);
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsAnimatingIn(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isRendered && !product) return null;
  if (!product) return null;

  const activeImage = product.images[activeImageIndex] || product.images[0];

  const whatsAppUrl = buildSingleProductWhatsAppUrl(
    whatsAppNumber,
    {
      name: product.name,
      code: product.code,
      price: product.price,
      currency: product.currency,
    },
    selectedSize,
    selectedColor
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-out dark:bg-neutral-950 ${
        isAnimatingIn ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Top Navigation Bar: Minimalist Back button, Centered Logo, Action items */}
      <header className="sticky top-0 z-30 flex h-14 sm:h-16 w-full shrink-0 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 sm:px-8 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-neutral-950 transition-opacity hover:opacity-70 dark:text-white"
          aria-label="Volver al catálogo"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Catálogo</span>
          <span className="hidden sm:inline font-mono text-[10px] text-neutral-400">[ESC]</span>
        </button>

        <div className="text-center">
          <span className="font-editorial text-xl sm:text-2xl font-black tracking-widest text-neutral-950 dark:text-white uppercase">
            KALON
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleWishlist(product.id)}
            className="flex h-9 w-9 items-center justify-center text-neutral-950 hover:opacity-70 dark:text-white"
            aria-label="Guardar en favoritos"
            title="Guardar en favoritos"
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? 'fill-neutral-950 text-neutral-950 dark:fill-white dark:text-white' : ''}`}
            />
          </button>

          <button
            onClick={handleCopyLink}
            className="flex h-9 w-9 items-center justify-center text-neutral-950 hover:opacity-70 dark:text-white"
            aria-label="Compartir"
            title="Copiar enlace"
          >
            {copiedLink ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
          </button>

          <button
            onClick={handleClose}
            className="flex h-9 w-9 items-center justify-center text-neutral-950 hover:opacity-70 dark:text-white"
            aria-label="Cerrar ficha"
            title="Cerrar ficha"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Full Screen Scrollable Content Body (Optimized for PC and Mobile) */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-36 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            
            {/* Gallery Column: Large pristine imagery (Desktop 7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-neutral-950 px-3 py-1 text-[10px] font-bold tracking-widest text-white uppercase dark:bg-white dark:text-neutral-950">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Thumbnails row: Sharp, clean horizontal row */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto scrollbar-none py-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-3/4 w-20 lg:w-24 shrink-0 border transition-all ${
                        activeImageIndex === idx
                          ? 'border-neutral-950 opacity-100 dark:border-white'
                          : 'border-transparent opacity-50 hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt={`Vista ${idx + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Desktop Value Assurance Banner */}
              <div className="hidden lg:grid grid-cols-2 gap-4 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
                      FIJACIÓN DTF ULTRA-DURADERA
                    </span>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Garantía contra agrietamiento y desprendimiento por más de 50 lavados.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Truck className="h-4 w-4 text-neutral-800 dark:text-neutral-200 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-950 dark:text-white">
                      ENVÍO EXPRESS ASEGURADO
                    </span>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Despacho en 24 a 48 hrs con número de guía oficial para rastreo en tiempo real.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Product Details & Specifications Column (Desktop 5 cols, sticky on PC) */}
            <div className="lg:col-span-5 lg:sticky lg:top-8 flex flex-col justify-between">
              <div>
                {/* Reference Code & Category */}
                <div className="flex items-center justify-between text-xs font-mono tracking-widest text-neutral-400 uppercase">
                  <span>{product.code}</span>
                  <span>{product.category}</span>
                </div>

                {/* Title */}
                <h1 className="mt-2 font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase dark:text-white">
                  {product.name}
                </h1>

                {/* Subtitle / Spec line */}
                <p className="mt-1.5 text-xs tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
                  {product.subtitle}
                </p>

                {/* Price */}
                <div className="mt-4 font-mono text-2xl lg:text-3xl font-bold tabular-nums text-neutral-950 dark:text-white">
                  {formatCurrency(product.price, product.currency)}
                </div>

                {/* Hairline Divider */}
                <div className="my-6 h-px w-full bg-neutral-200 dark:bg-neutral-800" />

                {/* Color Selector: Pure sharp squares */}
                <div>
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                    <span className="font-bold text-neutral-950 dark:text-white">Color</span>
                    <span className="text-neutral-500 font-medium">{selectedColor}</span>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 border px-3 py-2 text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-black'
                            : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300'
                        }`}
                      >
                        <span
                          className="h-3 w-3 border border-black/20"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="uppercase text-[11px] tracking-wider">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector: Sharp geometric rectangles */}
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs tracking-wider uppercase">
                    <span className="font-bold text-neutral-950 dark:text-white">
                      Talla: <span className="font-mono">{selectedSize}</span>
                    </span>
                    <button
                      onClick={() => setShowSizeGuide(!showSizeGuide)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 underline hover:text-neutral-950 dark:hover:text-white"
                    >
                      <Ruler className="h-3 w-3" />
                      <span>{showSizeGuide ? 'Ocultar medidas' : 'Guía de medidas'}</span>
                    </button>
                  </div>

                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`flex h-11 w-14 items-center justify-center border font-mono text-xs font-bold transition-all ${
                          selectedSize === size
                            ? 'border-neutral-950 bg-neutral-950 text-white dark:border-white dark:bg-white dark:text-black'
                            : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-950 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  {/* Size guide table */}
                  {showSizeGuide && (
                    <div className="mt-3 border border-neutral-200 bg-neutral-50/70 p-4 text-xs dark:border-neutral-800 dark:bg-neutral-900/60">
                      <span className="font-bold text-neutral-950 uppercase tracking-wider dark:text-white text-[11px]">
                        Medidas en cm (en plano):
                      </span>
                      <table className="mt-2 w-full text-left font-mono tabular-nums text-[11px]">
                        <thead>
                          <tr className="border-b border-neutral-200 text-neutral-400 dark:border-neutral-700">
                            <th className="py-1">Talla</th>
                            <th className="py-1">Pecho</th>
                            <th className="py-1">Largo</th>
                            <th className="py-1">Manga</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200/60 dark:divide-neutral-700/60">
                          {product.dimensions.map((d) => (
                            <tr
                              key={d.size}
                              className={d.size === selectedSize ? 'font-bold text-neutral-950 dark:text-white' : ''}
                            >
                              <td className="py-1">{d.size}</td>
                              <td className="py-1">{d.chest}</td>
                              <td className="py-1">{d.length}</td>
                              <td className="py-1">{d.sleeve}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* PC Inline Call to Actions (Convenient ordering right beside specs) */}
                <div className="mt-8 flex flex-col gap-3">
                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 bg-neutral-950 py-4 px-6 text-xs font-bold tracking-widest text-white uppercase transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Ordenar por WhatsApp</span>
                  </a>

                  <button
                    onClick={() => onAddToOrder(product, selectedSize, selectedColor)}
                    className="flex w-full items-center justify-center gap-2 border border-neutral-950 bg-white py-4 px-6 text-xs font-bold tracking-widest text-neutral-950 uppercase transition-colors hover:bg-neutral-100 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Añadir a Pedido</span>
                  </button>
                </div>

                {/* Editorial Information Tabs: Description, DTF, Care */}
                <div className="mt-8 border-t border-neutral-200 pt-5 dark:border-neutral-800">
                  <div className="flex items-center gap-6 border-b border-neutral-200 pb-2 text-xs font-bold tracking-widest uppercase dark:border-neutral-800">
                    <button
                      onClick={() => setActiveTab('desc')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'desc'
                          ? 'border-b-2 border-neutral-950 text-neutral-950 dark:border-white dark:text-white'
                          : 'text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      Descripción
                    </button>
                    <button
                      onClick={() => setActiveTab('dtf')}
                      className={`flex items-center gap-1 pb-1 transition-colors ${
                        activeTab === 'dtf'
                          ? 'border-b-2 border-neutral-950 text-neutral-950 dark:border-white dark:text-white'
                          : 'text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      <Sparkles className="h-3 w-3" />
                      <span>Ficha DTF</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('care')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'care'
                          ? 'border-b-2 border-neutral-950 text-neutral-950 dark:border-white dark:text-white'
                          : 'text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      Cuidados
                    </button>
                  </div>

                  <div className="mt-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {activeTab === 'desc' && (
                      <div className="space-y-3">
                        <p>{product.description}</p>
                        <p className="font-semibold text-neutral-950 dark:text-white">
                          Corte: {product.fit}
                        </p>
                        <p className="text-neutral-500">
                          Textil: {product.fabric}
                        </p>
                      </div>
                    )}

                    {activeTab === 'dtf' && (
                      <div className="space-y-2 font-mono text-[11px]">
                        <div>
                          <strong className="text-neutral-950 uppercase dark:text-white">Resolución: </strong>
                          <span>{product.dtfSpecs.resolution}</span>
                        </div>
                        <div>
                          <strong className="text-neutral-950 uppercase dark:text-white">Acabado: </strong>
                          <span>{product.dtfSpecs.finishing}</span>
                        </div>
                        <div>
                          <strong className="text-neutral-950 uppercase dark:text-white">Elasticidad: </strong>
                          <span>{product.dtfSpecs.stretch}</span>
                        </div>
                        <div>
                          <strong className="text-neutral-950 uppercase dark:text-white">Lavabilidad: </strong>
                          <span>{product.dtfSpecs.durability}</span>
                        </div>
                      </div>
                    )}

                    {activeTab === 'care' && (
                      <ul className="list-inside list-disc space-y-1.5 text-[11px]">
                        {product.careInstructions.map((inst, i) => (
                          <li key={i}>{inst}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile-Only Pinned Bottom Bar */}
      <footer className="md:hidden sticky bottom-0 z-40 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/95">
        <div className="mx-auto flex max-w-6xl flex-col sm:flex-row gap-3">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 bg-neutral-950 py-3.5 text-xs font-bold tracking-widest text-white uppercase transition-opacity hover:opacity-90 dark:bg-white dark:text-neutral-950"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ordenar por WhatsApp</span>
          </a>

          <button
            onClick={() => onAddToOrder(product, selectedSize, selectedColor)}
            className="flex items-center justify-center gap-2 border border-neutral-950 bg-white py-3.5 px-6 text-xs font-bold tracking-widest text-neutral-950 uppercase transition-colors hover:bg-neutral-100 dark:border-white dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-900"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Añadir a Pedido</span>
          </button>
        </div>
      </footer>

    </div>
  );
};
