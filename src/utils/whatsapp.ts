/**
 * Utility functions for formatting WhatsApp messages and managing contact URLs
 */

export interface OrderItem {
  id: string;
  name: string;
  code: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

/**
 * Sanitizes a phone number to only digits without symbols
 */
export function sanitizePhoneNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

/**
 * Formats currency in MXN or configured currency
 */
export function formatCurrency(amount: number, currency: string = 'MXN'): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds a direct WhatsApp chat URL with a single product inquiry/order
 */
export function buildSingleProductWhatsAppUrl(
  phone: string,
  product: {
    name: string;
    code: string;
    price: number;
    currency?: string;
  },
  selectedSize: string,
  selectedColor: string
): string {
  const cleanPhone = sanitizePhoneNumber(phone);
  const formattedPrice = formatCurrency(product.price, product.currency || 'MXN');

  const messageLines = [
    'Hola KALON! 👋',
    'Me interesa ordenar esta prenda de su catálogo:',
    '',
    `• Prenda: ${product.name}`,
    `• Código: ${product.code}`,
    `• Talla: ${selectedSize}`,
    `• Color: ${selectedColor}`,
    `• Precio: ${formattedPrice}`,
    '',
    '¿Tienen disponibilidad inmediata para coordinar envío y pago? Gracias.',
  ];

  const encodedMessage = encodeURIComponent(messageLines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Builds a WhatsApp URL for multiple items in the order bag
 */
export function buildMultiItemWhatsAppUrl(
  phone: string,
  items: OrderItem[],
  customerNote?: string
): string {
  const cleanPhone = sanitizePhoneNumber(phone);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const lines: string[] = [
    'Hola KALON! 👋',
    'Deseo realizar un pedido con las siguientes prendas del catálogo:',
    '',
  ];

  items.forEach((item, index) => {
    lines.push(
      `${index + 1}. ${item.name} (${item.code})` +
      `\n   • Talla: ${item.size} | Color: ${item.color} | Cantidad: ${item.quantity}` +
      `\n   • Subtotal: ${formatCurrency(item.price * item.quantity)}`
    );
  });

  lines.push('');
  lines.push(`• Total estimado: ${formatCurrency(total)}`);

  if (customerNote && customerNote.trim().length > 0) {
    lines.push(`• Consulta o duda: ${customerNote.trim()}`);
  }

  lines.push('');
  lines.push('¿Me podrían confirmar disponibilidad para coordinar el pago y envío por aquí? Muchas gracias.');

  const encodedMessage = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
