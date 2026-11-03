import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { OrderItem, formatCurrency, buildMultiItemWhatsAppUrl } from '../utils/whatsapp';

interface OrderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onUpdateQuantity: (id: string, size: string, color: string, qty: number) => void;
  onRemoveItem: (id: string, size: string, color: string) => void;
  onClearOrder: () => void;
  whatsAppNumber: string;
}

export const OrderDrawer: React.FC<OrderDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearOrder,
  whatsAppNumber,
}) => {
  const [customerNote, setCustomerNote] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const whatsAppUrl = buildMultiItemWhatsAppUrl(whatsAppNumber, items, customerNote);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content (Sharp 90-degree lines) */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800">
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-neutral-950 dark:text-white" />
            <h3 className="font-editorial text-base font-bold tracking-widest uppercase text-neutral-950 dark:text-white">
              LISTA DE PEDIDO [{items.length}]
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-neutral-500 hover:text-neutral-950 dark:hover:text-white"
            aria-label="Cerrar pedido"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Body: Items list or empty state */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-neutral-200 text-neutral-400 dark:border-neutral-800 dark:text-neutral-500">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h4 className="mt-4 font-editorial text-sm font-bold tracking-widest uppercase text-neutral-900 dark:text-white">
                TU LISTA ESTÁ VACÍA
              </h4>
              <p className="mt-1 text-xs text-neutral-400 uppercase tracking-wider">
                Toca cualquier prenda para abrir la ficha completa y ordenar.
              </p>
              <button
                onClick={onClose}
                className="mt-6 border border-neutral-950 bg-neutral-950 px-5 py-3 text-xs font-bold tracking-widest text-white uppercase dark:border-white dark:bg-white dark:text-black"
              >
                VER PRENDAS
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-2 dark:border-neutral-800">
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                  Prendas seleccionadas
                </span>
                <button
                  onClick={onClearOrder}
                  className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 hover:text-neutral-950 dark:hover:text-white underline"
                >
                  Vaciar lista
                </button>
              </div>

              {items.map((item, idx) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}-${idx}`}
                  className="flex items-center justify-between gap-3 border-b border-neutral-100 pb-3 dark:border-neutral-850"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-neutral-400">{item.code}</span>
                      <span className="font-editorial text-sm font-bold tracking-tight uppercase text-neutral-900 dark:text-white">
                        {item.name}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-500">
                      <span>Talla: <strong className="font-mono">{item.size}</strong></span>
                      <span>·</span>
                      <span>Color: <strong>{item.color}</strong></span>
                    </div>

                    <div className="mt-1.5 font-mono text-xs font-bold tabular-nums text-neutral-950 dark:text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id, item.size, item.color)}
                      className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>

                    <div className="flex items-center border border-neutral-200 dark:border-neutral-800">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                        className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        aria-label="Restar uno"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                        className="px-2 py-1 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        aria-label="Sumar uno"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Optional customer question/note (No address field) */}
              <div className="mt-6 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                <label className="block text-[11px] font-bold tracking-widest uppercase text-neutral-700 dark:text-neutral-300">
                  Duda o consulta adicional (opcional):
                </label>
                <input
                  type="text"
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="¿Alguna pregunta sobre prendas, disponibilidad o tallas?..."
                  className="mt-2 w-full border border-neutral-300 bg-white px-3 py-2.5 text-xs text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-950 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder:text-neutral-600"
                />
              </div>

              {/* Direct WhatsApp Info Card */}
              <div className="mt-4 border border-neutral-200 bg-neutral-50/80 p-3.5 dark:border-neutral-800 dark:bg-neutral-900/60">
                <p className="text-[11px] font-medium leading-relaxed text-neutral-600 dark:text-neutral-300">
                  <strong className="font-semibold text-neutral-900 dark:text-white uppercase tracking-wider block mb-1">
                    Gestión 100% por WhatsApp
                  </strong>
                  No necesitas ingresar datos de envío aquí. Los detalles de entrega, métodos de pago (transferencia/tarjeta) y despacho se acuerdan directamente en el chat con atención personalizada.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with calculated Total & WhatsApp submit */}
        {items.length > 0 && (
          <div className="border-t border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">
                TOTAL ESTIMADO
              </span>
              <span className="font-mono text-xl font-bold tabular-nums text-neutral-950 dark:text-white">
                {formatCurrency(totalAmount)}
              </span>
            </div>

            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 bg-neutral-950 py-4 text-xs font-bold tracking-widest text-white uppercase hover:opacity-90 dark:bg-white dark:text-neutral-950"
            >
              <MessageCircle className="h-4 w-4" />
              <span>ENVIAR PEDIDO A WHATSAPP</span>
              <ArrowRight className="h-4 w-4" />
            </a>

            <p className="mt-2 text-center text-[10px] text-neutral-400 uppercase tracking-wider">
              Se enviará la lista con cada prenda y talla para coordinar todo en WhatsApp.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
