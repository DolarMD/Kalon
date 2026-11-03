import React, { useState } from 'react';
import { X, Check, Phone, Info } from 'lucide-react';

interface WhatsAppConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentNumber: string;
  onSaveNumber: (newNumber: string) => void;
}

export const WhatsAppConfigModal: React.FC<WhatsAppConfigModalProps> = ({
  isOpen,
  onClose,
  currentNumber,
  onSaveNumber,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(currentNumber);
  const [successToast, setSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim().length >= 8) {
      onSaveNumber(phoneNumber.trim());
      setSuccessToast(true);
      setTimeout(() => {
        setSuccessToast(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 backdrop-blur-2xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog (Sharp 90-degree rectangle) */}
      <div className="relative z-10 w-full max-w-md border border-neutral-300 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950">
        
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-neutral-950 dark:text-white" />
            <h3 className="font-editorial text-sm font-bold tracking-widest uppercase text-neutral-950 dark:text-white">
              CONFIGURAR WHATSAPP KALON
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold tracking-widest uppercase text-neutral-800 dark:text-neutral-200">
              Número para recibir pedidos:
            </label>
            <p className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider">
              Incluye código de país (ej. +52 para México).
            </p>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+52 55 1234 5678"
              required
              className="mt-2 w-full border border-neutral-300 bg-white px-3.5 py-2.5 font-mono text-xs text-neutral-900 focus:border-neutral-950 focus:outline-hidden dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:focus:border-white"
            />
          </div>

          <div className="border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
            <div className="flex items-start gap-2">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-500" />
              <span className="text-[11px] leading-relaxed">
                Cada botón &quot;Pedir por WhatsApp&quot; del catálogo dirigirá a este número con el producto, talla y color pre-cargados.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="border border-neutral-300 px-4 py-2 text-xs font-bold tracking-widest uppercase text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 border border-neutral-950 bg-neutral-950 px-5 py-2 text-xs font-bold tracking-widest uppercase text-white hover:opacity-90 dark:border-white dark:bg-white dark:text-black"
            >
              {successToast ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>GUARDADO</span>
                </>
              ) : (
                <span>GUARDAR</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
