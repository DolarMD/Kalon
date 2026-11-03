import React, { useState } from 'react';
import { X, Check, Plus, Trash2, Image, Ruler, Sparkles } from 'lucide-react';
import { Product, ProductColor } from '../../data/products';

interface ProductEditorModalProps {
  product: Product | null; // null if creating new
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

export const ProductEditorModal: React.FC<ProductEditorModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Product>(() => {
    if (product) return { ...product };
    return {
      id: `kln-${Date.now()}`,
      code: `KLN-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      subtitle: '',
      category: 'hoodies',
      price: 850,
      currency: 'MXN',
      tag: 'NUEVO',
      featured: false,
      images: ['/src/assets/images/kalon_hoodie_nocturne_1793643976853.jpg'],
      colors: [
        { name: 'Pitch Black', hex: '#111111' },
        { name: 'Bone White', hex: '#EBEAE5' },
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      dimensions: [
        { size: 'S', chest: '58 cm', length: '68 cm', sleeve: '62 cm' },
        { size: 'M', chest: '61 cm', length: '71 cm', sleeve: '64 cm' },
        { size: 'L', chest: '64 cm', length: '74 cm', sleeve: '66 cm' },
        { size: 'XL', chest: '67 cm', length: '77 cm', sleeve: '68 cm' },
      ],
      description: 'Prenda confeccionada en algodón pesado con estampación textil Direct to Film (DTF) a 300 DPI.',
      fabric: '100% Algodón Peinado Heavyweight 420 GSM',
      fit: 'Boxy / Drop-Shoulder Oversized',
      dtfSpecs: {
        resolution: 'Ultra-HD 300 DPI con tintas textiles al agua',
        finishing: 'Tacto mate sedoso de perfil ultradelgado',
        stretch: 'Poliamida termo-elástica sin fisuras',
        durability: 'Garantía certificada +50 lavados domésticos',
      },
      careInstructions: [
        'Lavar del revés con agua fría (máximo 30°C)',
        'No usar cloro ni blanqueadores agresivos',
        'Secar a la sombra sin retorcer',
        'No planchar directamente sobre el estampado DTF',
      ],
      inStock: true,
    };
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('#000000');

  if (!isOpen) return null;

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, newImageUrl.trim()],
      });
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleAddColor = () => {
    if (newColorName.trim()) {
      setFormData({
        ...formData,
        colors: [...formData.colors, { name: newColorName.trim(), hex: newColorHex }],
      });
      setNewColorName('');
      setNewColorHex('#000000');
    }
  };

  const handleRemoveColor = (name: string) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((c) => c.name !== name),
    });
  };

  const toggleSize = (size: string) => {
    if (formData.sizes.includes(size)) {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== size),
      });
    } else {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, size],
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl border border-neutral-800 bg-neutral-950 text-white shadow-2xl my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 p-5 shrink-0">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-neutral-400 uppercase">
              {product ? 'MODIFICAR PRENDA' : 'NUEVA PRENDA // CATÁLOGO'}
            </span>
            <h2 className="font-editorial text-xl font-bold tracking-tight uppercase">
              {formData.name || 'Título de la prenda'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-neutral-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* General Information */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Nombre de la Prenda *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej. Oversized Hoodie 'Nocturne'"
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Código SKU *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="KLN-H01"
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Product['category'],
                  })
                }
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              >
                <option value="hoodies">HOODIES</option>
                <option value="tees">T-SHIRTS</option>
                <option value="crewnecks">CREWNECKS</option>
                <option value="essentials">SETS & MONOCROMO</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Precio (MXN) *
              </label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs font-mono text-white focus:border-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Insignia / Tag (Opcional)
              </label>
              <input
                type="text"
                value={formData.tag || ''}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                placeholder="EDICIÓN 01, BEST SELLER..."
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Subtitle & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Subtítulo / Kicker
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Heavyweight Fleece & Minimal Chest Typography DTF"
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
                Corte / Fit
              </label>
              <input
                type="text"
                value={formData.fit}
                onChange={(e) => setFormData({ ...formData, fit: e.target.value })}
                placeholder="Boxy / Drop-Shoulder Oversized"
                className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
              Descripción Completa
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider uppercase text-neutral-300">
              Composición Textil
            </label>
            <input
              type="text"
              value={formData.fabric}
              onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
              placeholder="100% Algodón Peinado Heavyweight 420 GSM"
              className="mt-1.5 w-full border border-neutral-800 bg-neutral-900 px-3.5 py-2.5 text-xs text-white focus:border-white focus:outline-hidden"
            />
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-900 p-4">
            <input
              type="checkbox"
              id="inStockCheck"
              checked={formData.inStock}
              onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
              className="h-4 w-4 accent-white"
            />
            <label htmlFor="inStockCheck" className="text-xs font-bold tracking-wider uppercase text-white cursor-pointer">
              Prenda disponible en stock (desmarcar para mostrar como Agotada)
            </label>
          </div>

          {/* Image Gallery */}
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
            <span className="block text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
              Fotografías de la Prenda
            </span>
            <div className="flex flex-wrap gap-3">
              {formData.images.map((img, i) => (
                <div key={i} className="relative aspect-3/4 w-20 border border-neutral-700 bg-neutral-800 group">
                  <img src={img} alt="Preview" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-1 right-1 bg-black/80 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar foto"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-neutral-950/90 text-center text-[8px] font-bold uppercase text-white py-0.5">
                      PORTADA
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Pega URL de imagen o ruta de asset..."
                className="flex-1 border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="flex items-center gap-1.5 border border-white bg-white px-3 py-2 text-xs font-bold text-black uppercase"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Añadir</span>
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
            <span className="block text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
              Variantes de Color
            </span>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 border border-neutral-700 bg-neutral-900 px-2.5 py-1 text-xs"
                >
                  <span className="h-3 w-3 border border-white/20" style={{ backgroundColor: c.hex }} />
                  <span>{c.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveColor(c.name)}
                    className="text-neutral-400 hover:text-white ml-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="color"
                value={newColorHex}
                onChange={(e) => setNewColorHex(e.target.value)}
                className="h-8 w-10 border border-neutral-700 bg-transparent cursor-pointer"
              />
              <input
                type="text"
                value={newColorName}
                onChange={(e) => setNewColorName(e.target.value)}
                placeholder="Nombre (ej. Pitch Black)..."
                className="flex-1 border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-white focus:outline-hidden"
              />
              <button
                type="button"
                onClick={handleAddColor}
                className="border border-white bg-white px-3 py-2 text-xs font-bold text-black uppercase"
              >
                Añadir Color
              </button>
            </div>
          </div>

          {/* Sizes */}
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
            <span className="block text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
              Tallas Disponibles
            </span>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                const isSelected = formData.sizes.includes(size);
                return (
                  <button
                    type="button"
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`h-9 w-12 border font-mono text-xs font-bold transition-colors ${
                      isSelected
                        ? 'border-white bg-white text-black'
                        : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* DTF Specs */}
          <div className="border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
            <span className="block text-xs font-mono font-bold tracking-wider uppercase text-neutral-300">
              Ficha Técnica de Estampación DTF
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-mono">Resolución DTF</label>
                <input
                  type="text"
                  value={formData.dtfSpecs.resolution}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dtfSpecs: { ...formData.dtfSpecs, resolution: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-mono">Acabado Textil</label>
                <input
                  type="text"
                  value={formData.dtfSpecs.finishing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dtfSpecs: { ...formData.dtfSpecs, finishing: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-mono">Elasticidad</label>
                <input
                  type="text"
                  value={formData.dtfSpecs.stretch}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dtfSpecs: { ...formData.dtfSpecs, stretch: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase font-mono">Durabilidad</label>
                <input
                  type="text"
                  value={formData.dtfSpecs.durability}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dtfSpecs: { ...formData.dtfSpecs, durability: e.target.value },
                    })
                  }
                  className="mt-1 w-full border border-neutral-700 bg-neutral-900 px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="border border-neutral-700 px-5 py-3 text-xs font-bold tracking-widest text-neutral-400 uppercase hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 border border-white bg-white px-7 py-3 text-xs font-bold tracking-widest text-black uppercase hover:opacity-90"
            >
              <Check className="h-4 w-4" />
              <span>Guardar Prenda</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
