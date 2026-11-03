import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Product } from '../data/products';
import { formatCurrency } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickAddToOrder?: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = product.images[0] || '/src/assets/images/kalon_hoodie_nocturne_1793643976853.jpg';
  const secondaryImage = product.images[1];

  return (
    <article
      onClick={() => onOpenDetails(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col cursor-pointer"
    >
      {/* 3:4 High-Resolution Editorial Photography */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {/* Primary Image */}
        <img
          src={primaryImage}
          alt={product.name}
          className={`h-full w-full object-cover object-center transition-all duration-700 ease-out ${
            secondaryImage && isHovered ? 'opacity-0 scale-102' : 'opacity-100 scale-100 group-hover:scale-103'
          }`}
          loading="lazy"
        />

        {/* Alternate Image on Hover (Luxury fashion lookbook effect) */}
        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${product.name} detalle`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out ${
              isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-98 pointer-events-none'
            }`}
            loading="lazy"
          />
        )}

        {/* Minimalist Wishlist Button (Subtle, discreet) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center bg-white/80 backdrop-blur-xs transition-opacity duration-200 active:scale-90 hover:bg-white dark:bg-neutral-900/80 dark:hover:bg-neutral-900 ${
            isWishlisted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isWishlisted ? 'Quitar de favoritos' : 'Guardar en favoritos'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWishlisted
                ? 'fill-neutral-950 text-neutral-950 dark:fill-white dark:text-white'
                : 'text-neutral-700 dark:text-neutral-300'
            }`}
          />
        </button>
      </div>

      {/* Clean Minimal Typography Below Photo (Zero clutter, no cut-off) */}
      <div className="mt-3 flex flex-col gap-1">
        <h3 className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-white group-hover:opacity-75 transition-opacity">
          {product.name}
        </h3>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-mono font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
            {formatCurrency(product.price, product.currency)}
          </span>
          <span className="text-[11px] font-mono tracking-wide text-neutral-400 dark:text-neutral-500 uppercase">
            {product.colors.length} {product.colors.length === 1 ? 'color' : 'colores'}
          </span>
        </div>
      </div>
    </article>
  );
};
