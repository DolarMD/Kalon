import test from 'node:test';
import assert from 'node:assert/strict';
import {
  sanitizePhoneNumber,
  formatCurrency,
  buildSingleProductWhatsAppUrl,
  buildMultiItemWhatsAppUrl,
  type OrderItem,
} from './whatsapp';

test('sanitizePhoneNumber strips symbols and spaces', () => {
  assert.equal(sanitizePhoneNumber('+52 (55) 1234-5678'), '525512345678');
  assert.equal(sanitizePhoneNumber(' 5219998887777 '), '5219998887777');
});

test('formatCurrency formats amount nicely', () => {
  const formatted = formatCurrency(850, 'MXN');
  assert.match(formatted, /850/);
});

test('buildSingleProductWhatsAppUrl encodes product details accurately', () => {
  const url = buildSingleProductWhatsAppUrl(
    '+52 55 1234 5678',
    {
      name: 'Oversized Hoodie Nocturne',
      code: 'KLN-01',
      price: 850,
      currency: 'MXN',
    },
    'L',
    'Black'
  );

  assert.ok(url.startsWith('https://wa.me/525512345678?text='));
  const decodedText = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decodedText.includes('Oversized Hoodie Nocturne'));
  assert.ok(decodedText.includes('KLN-01'));
  assert.ok(decodedText.includes('Talla: L'));
  assert.ok(decodedText.includes('Color: Black'));
});

test('buildMultiItemWhatsAppUrl calculates subtotal and lists items', () => {
  const items: OrderItem[] = [
    {
      id: '1',
      name: 'Hoodie Nocturne',
      code: 'KLN-01',
      price: 850,
      size: 'XL',
      color: 'Washed Black',
      quantity: 2,
    },
    {
      id: '2',
      name: 'Acid Wash Tee',
      code: 'KLN-02',
      price: 490,
      size: 'M',
      color: 'Vintage Grey',
      quantity: 1,
    },
  ];

  const url = buildMultiItemWhatsAppUrl('525512345678', items, 'Envío a Ciudad de México');
  assert.ok(url.startsWith('https://wa.me/525512345678?text='));
  const decodedText = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decodedText.includes('Hoodie Nocturne (KLN-01)'));
  assert.ok(decodedText.includes('Acid Wash Tee (KLN-02)'));
  assert.ok(decodedText.includes('Envío a Ciudad de México'));
  // Total is 850*2 + 490 = 2190
  assert.ok(decodedText.includes('2,190') || decodedText.includes('2190'));
});
