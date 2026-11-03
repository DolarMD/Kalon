export interface ProductColor {
  name: string;
  hex: string;
}

export interface DTFSpecs {
  resolution: string;
  finishing: string;
  stretch: string;
  durability: string;
}

export interface SizeDimension {
  size: string;
  chest: string;
  length: string;
  sleeve: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  category: 'hoodies' | 'tees' | 'crewnecks' | 'essentials';
  price: number;
  currency: string;
  tag?: string;
  featured?: boolean;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  dimensions: SizeDimension[];
  description: string;
  fabric: string;
  fit: string;
  dtfSpecs: DTFSpecs;
  careInstructions: string[];
  inStock: boolean;
}

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'kln-hoodie-nocturne',
    code: 'KLN-H01',
    name: 'Oversized Hoodie "Nocturne"',
    subtitle: 'Heavyweight Fleece & Minimal Chest Typography DTF',
    category: 'hoodies',
    price: 890,
    currency: 'MXN',
    tag: 'EDICIÓN 01',
    featured: true,
    images: [
      '/images/kalon_hoodie_nocturne_1793643976853.jpg',
      '/assets/aistudio/604d1c40b09155ff5b16ae20efac2880_aa3fe14d.jpg',
      '/assets/aistudio/a5606fe086f9fe2e32bff25510d2a7e7_a365da45.jpg',
    ],
    colors: [
      { name: 'Pitch Black', hex: '#111111' },
      { name: 'Washed Charcoal', hex: '#2A2A2A' },
      { name: 'Bone White', hex: '#ECEAE4' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '58 cm', length: '70 cm', sleeve: '62 cm' },
      { size: 'M', chest: '61 cm', length: '73 cm', sleeve: '64 cm' },
      { size: 'L', chest: '64 cm', length: '76 cm', sleeve: '66 cm' },
      { size: 'XL', chest: '67 cm', length: '78 cm', sleeve: '68 cm' },
      { size: 'XXL', chest: '70 cm', length: '80 cm', sleeve: '69 cm' },
    ],
    description:
      'Buzo con capucha de corte oversized contemporáneo, confeccionado con felpa perchada de 420 GSM para máxima estructura y caída. Gráfico tipográfico frontal realizado con tecnología DTF HD de perfil ultradelgado, sin rigidez ni efecto plástico al tacto.',
    fabric: '100% Algodón Peinado Heavyweight 420 GSM, interior perchado térmico',
    fit: 'Boxy / Drop-Shoulder Oversized',
    dtfSpecs: {
      resolution: 'Estampado digital DTF a 300 DPI de máxima nitidez',
      finishing: 'Polvo de poliamida elástica de tacto suave mate sin brillo artificial',
      stretch: 'Resistencia a tracción elástica sin cuarteado ni fisuras',
      durability: 'Garantizado por más de 50 ciclos de lavado continuo sin pérdida de color',
    },
    careInstructions: [
      'Lavar la prenda del revés con agua fría (máx 30°C)',
      'No usar blanqueadores ni detergentes abrasivos',
      'Secado en sombra o tender en plano',
      'Planchar siempre del revés o colocar un paño sobre el estampado',
    ],
    inStock: true,
  },
  {
    id: 'kln-tee-urban-rebirth',
    code: 'KLN-T02',
    name: 'Vintage Acid Wash Tee "Rebirth"',
    subtitle: 'Backprint Artístico DTF Ultra-HD sobre Textil Deslavado',
    category: 'tees',
    price: 520,
    currency: 'MXN',
    tag: 'BEST SELLER',
    featured: true,
    images: [
      '/images/kalon_tee_acidwash_1793643977767.jpg',
      '/assets/aistudio/604d1c40b09155ff5b16ae20efac2880_aa3fe14d.jpg',
    ],
    colors: [
      { name: 'Acid Mineral Grey', hex: '#3B3B3B' },
      { name: 'Faded Black', hex: '#1C1C1E' },
      { name: 'Sand Washed', hex: '#9E9484' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '54 cm', length: '72 cm', sleeve: '22 cm' },
      { size: 'M', chest: '57 cm', length: '74 cm', sleeve: '23 cm' },
      { size: 'L', chest: '60 cm', length: '76 cm', sleeve: '24 cm' },
      { size: 'XL', chest: '63 cm', length: '78 cm', sleeve: '25 cm' },
      { size: 'XXL', chest: '66 cm', length: '80 cm', sleeve: '26 cm' },
    ],
    description:
      'Remera manga corta confeccionada en algodón preencogido de 240 GSM con proceso artesanal de lavado ácido que aporta un tono mineral único a cada unidad. Dorso con ilustración artística impresa en DTF con gradientes suaves y blancos de alta opacidad.',
    fabric: '100% Algodón Ring-Spun 240 GSM, tratamiento acid wash vintage',
    fit: 'Relaxed Streetwear Fit con cuello acanalado de 3 cm',
    dtfSpecs: {
      resolution: 'Micro-gotas de tinta CMYK + Doble capa de blanco de alta cobertura',
      finishing: 'Fijación por prensa neumática a 160°C con acabado sedoso mate',
      stretch: 'Adhesión molecular flexible a fibras de algodón grueso',
      durability: 'Colores inalterables frente a sudor, sol y lavados constantes',
    },
    careInstructions: [
      'Lavar con prendas oscuras o similares',
      'No retorcer en el área del estampado',
      'Evitar el uso de secadora mecánica',
    ],
    inStock: true,
  },
  {
    id: 'kln-crewneck-bone',
    code: 'KLN-C03',
    name: 'Boxy Minimal Crewneck "M1.24"',
    subtitle: 'Brutalist Geometry Chest Print & Clean Monochrome Lines',
    category: 'crewnecks',
    price: 780,
    currency: 'MXN',
    tag: 'EDITORIAL',
    featured: true,
    images: [
      '/images/kalon_crewneck_bone_1793643978140.jpg',
      '/assets/aistudio/a5606fe086f9fe2e32bff25510d2a7e7_a365da45.jpg',
    ],
    colors: [
      { name: 'Bone Chalk', hex: '#E6E4DD' },
      { name: 'Slate Heather', hex: '#7D8287' },
      { name: 'Pure Onyx', hex: '#0D0D0E' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    dimensions: [
      { size: 'S', chest: '56 cm', length: '68 cm', sleeve: '61 cm' },
      { size: 'M', chest: '59 cm', length: '71 cm', sleeve: '63 cm' },
      { size: 'L', chest: '62 cm', length: '74 cm', sleeve: '65 cm' },
      { size: 'XL', chest: '65 cm', length: '76 cm', sleeve: '66 cm' },
    ],
    description:
      'Sudadera de cuello redondo con proporciones arquitectónicas inspiradas en el minimalismo industrial. Estampado geométrico central en tinta negra mate profunda con líneas de 0.5 mm perfectamente definidas gracias a la micro-precisión DTF.',
    fabric: '80% Algodón Peinado / 20% Poliéster Antipilling 380 GSM',
    fit: 'Boxy cropped length, hombros caídos sutiles',
    dtfSpecs: {
      resolution: 'Vectorización precisa con definición de líneas ultrafinas de 0.4mm',
      finishing: 'Tacto imperceptible sobre tejido de punto cerrado',
      stretch: 'Curado en túnel infrarrojo para máxima cohesión de película',
      durability: 'Garantía antimanchas y anti-desprendimiento',
    },
    careInstructions: [
      'Lavado a máquina ciclo delicado',
      'Secado en percha a la sombra',
      'No aplicar plancha directa sobre el diseño',
    ],
    inStock: true,
  },
  {
    id: 'kln-set-monochrome',
    code: 'KLN-S04',
    name: 'Editorial Layering Oversized Set',
    subtitle: 'Overcoat & Streetwear Hoodie Combo with Kalon Monogram',
    category: 'essentials',
    price: 1250,
    currency: 'MXN',
    tag: 'CAMPAÑA',
    featured: true,
    images: [
      '/images/kalon_hero_editorial_1793643978452.jpg',
      '/assets/aistudio/ba5ab13e7c1c06d05697ff377e4ea0bd_2ab4a93d.jpg',
    ],
    colors: [
      { name: 'Monochrome Noir', hex: '#141414' },
      { name: 'Smoked Cement', hex: '#48494B' },
    ],
    sizes: ['M', 'L', 'XL'],
    dimensions: [
      { size: 'M', chest: '64 cm', length: '108 cm', sleeve: '66 cm' },
      { size: 'L', chest: '68 cm', length: '112 cm', sleeve: '68 cm' },
      { size: 'XL', chest: '72 cm', length: '115 cm', sleeve: '70 cm' },
    ],
    description:
      'Conjunto insignia de la pasarela editorial KALON. Pieza superior de corte sastre oversized combinable con hoodie técnico interior con el monograma K/I grabado en DTF microtexturizado.',
    fabric: 'Mezcla de paño liviano estructurado y algodón premium',
    fit: 'Tailored Avant-Garde Oversized',
    dtfSpecs: {
      resolution: 'Monograma KALON aplicado en film mate de alta densidad',
      finishing: 'Tacto satinado de lujo, tacto zero-feel al contacto directo',
      stretch: 'Apto para prendas elásticas y de roce constante',
      durability: 'Certificación Oeko-Tex de tintas libres de solventes',
    },
    careInstructions: [
      'Limpieza en seco o lavado manual muy suave',
      'Guardar en percha ancha',
    ],
    inStock: true,
  },
  {
    id: 'kln-tee-sculptural',
    code: 'KLN-T05',
    name: 'Heavyweight Tee "Atelier Form"',
    subtitle: 'Drop-Shoulder Boxy Tee with Minimalist Sleeve & Chest Print',
    category: 'tees',
    price: 480,
    currency: 'MXN',
    tag: 'NUEVO',
    featured: false,
    images: [
      '/images/kalon_tee_white_1793722594473.jpg',
      '/images/kalon_tee_acidwash_1793643977767.jpg',
    ],
    colors: [
      { name: 'Optic Pure White', hex: '#F9F9F9' },
      { name: 'Cast Iron Black', hex: '#18181A' },
      { name: 'Concrete Grey', hex: '#A8A8A6' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    dimensions: [
      { size: 'S', chest: '55 cm', length: '71 cm', sleeve: '23 cm' },
      { size: 'M', chest: '58 cm', length: '73 cm', sleeve: '24 cm' },
      { size: 'L', chest: '61 cm', length: '75 cm', sleeve: '25 cm' },
      { size: 'XL', chest: '64 cm', length: '77 cm', sleeve: '26 cm' },
      { size: 'XXL', chest: '67 cm', length: '79 cm', sleeve: '27 cm' },
    ],
    description:
      'La remera esencial definitiva. 260 GSM de algodón grueso que no se deforma tras lavados continuos. Cuello grueso indeformable con micro estampados en manga y pecho con el sello de calidad KALON.',
    fabric: '100% Algodón Cardado Grueso 260 GSM',
    fit: 'Boxy Heavyweight',
    dtfSpecs: {
      resolution: 'Estampado DTF con calibración cromática exacta',
      finishing: 'Acabado mate de tacto natural',
      stretch: 'Sin rigidez en las fibras textiles',
      durability: 'Máxima resistencia al pilling y lavado diario',
    },
    careInstructions: ['Lavar en frío', 'No usar lejía', 'Secado al aire libre'],
    inStock: true,
  },
  {
    id: 'kln-hoodie-architect',
    code: 'KLN-H06',
    name: 'Raw Seam Hoodie "Architectural"',
    subtitle: 'French Terry & Reverse Seam Construction with DTF Detail',
    category: 'hoodies',
    price: 920,
    currency: 'MXN',
    tag: 'PREMIUM',
    featured: false,
    images: [
      '/images/kalon_hoodie_graphite_1793722613699.jpg',
      '/images/kalon_hoodie_nocturne_1793643976853.jpg',
    ],
    colors: [
      { name: 'Graphite Dark', hex: '#212124' },
      { name: 'Olive Shadow', hex: '#3B3D37' },
    ],
    sizes: ['M', 'L', 'XL'],
    dimensions: [
      { size: 'M', chest: '62 cm', length: '72 cm', sleeve: '65 cm' },
      { size: 'L', chest: '65 cm', length: '75 cm', sleeve: '67 cm' },
      { size: 'XL', chest: '68 cm', length: '77 cm', sleeve: '68 cm' },
    ],
    description:
      'Hoodie con costuras a la vista y puños acanalados de alta elasticidad. Bolsillo canguro geométrico con termo-adhesión DTF interior y exterior.',
    fabric: 'French Terry 100% Algodón 400 GSM',
    fit: 'Relaxed Drop Oversized',
    dtfSpecs: {
      resolution: 'DTF de alta penetración en bucles de rizo francés',
      finishing: 'Poliamida microfina para un acabado sedoso',
      stretch: 'Elongación multidireccional',
      durability: 'Aprobado para uso intensivo en calle y deporte urbano',
    },
    careInstructions: ['Lavar del revés', 'Secar en plano', 'Plancha tibia'],
    inStock: true,
  },
];

export const BRAND_CONFIG = {
  name: 'KALON',
  tagline: 'DIRECT TO FILM TEXTILE & MODERN STREETWEAR',
  currency: 'MXN',
  defaultWhatsApp: '+52 55 8124 9301',
  shippingPolicy: 'Envíos a todo el país. Entrega express de 2 a 5 días hábiles.',
  dtfQualityBadge: 'TECNOLOGÍA DTF ULTRA-HD CERTIFICADA',
  logoAsset: '/logo.svg',
};
