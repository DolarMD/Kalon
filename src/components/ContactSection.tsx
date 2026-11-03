import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  whatsAppNumber: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ whatsAppNumber }) => {
  const cleanNumber = whatsAppNumber.replace(/[^\d]/g, '');

  return (
    <section id="contacto" className="border-t border-neutral-200 bg-neutral-50/60 py-16 dark:border-neutral-800 dark:bg-neutral-900/40">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 uppercase">
          APARTADO DE CONTACTO
        </span>

        <h2 className="mt-2 font-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-950 uppercase dark:text-white">
          ATENCIÓN PERSONALIZADA
        </h2>

        <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm font-mono tracking-wider text-neutral-500 uppercase dark:text-neutral-400">
          Coordinación de pedidos, confirmación de tallas y despachos nacionales.
        </p>

        <div className="mt-8 flex justify-center">
          <a
            href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hola KALON! Quisiera información directa sobre pedidos y asesoría.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-neutral-950 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition-opacity hover:opacity-85 dark:bg-white dark:text-neutral-950"
          >
            <MessageCircle className="h-4 w-4 text-emerald-500" />
            <span>CONTACTAR POR WHATSAPP ({whatsAppNumber})</span>
          </a>
        </div>

        <p className="mt-4 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          TALLER KALON · LUNES A SÁBADO · 09:00 - 20:00 HRS
        </p>

      </div>
    </section>
  );
};
