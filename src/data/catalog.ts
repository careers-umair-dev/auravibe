import type { CategoryTile, Product } from '../types/store';

export const HERO_IMAGE = '/src/assets/images/hero_auravibe_lifestyle_1795094430413.jpg';
export const ABOUT_CRAFT_IMAGE = '/src/assets/images/about_auravibe_craft_1795094431832.jpg';

export const CATEGORIES: CategoryTile[] = [
  {
    id: 'Speakers',
    title: 'Speakers',
    description: 'Powerful sound, everywhere.',
    bgColor: '#F0EDFF',
    iconBg: '#E4DDFB',
    iconColor: '#7138D4',
    image: '/src/assets/images/product_speaker_pulse_1795094431657.jpg',
  },
  {
    id: 'Headphones',
    title: 'Headphones',
    description: 'Comfort meets clarity.',
    bgColor: '#EAF1FF',
    iconBg: '#D8E6FF',
    iconColor: '#4776DF',
    image: '/src/assets/images/product_headphones_studio_1795094431169.jpg',
  },
  {
    id: 'Accessories',
    title: 'Accessories',
    description: 'Everyday audio essentials.',
    bgColor: '#E4F5EF',
    iconBg: '#CCF0E3',
    iconColor: '#16805B',
    image: '/src/assets/images/product_accessories_kit_1795094429982.jpg',
  },
  {
    id: 'Wireless Chargers',
    title: 'Wireless Chargers',
    description: 'Power with modern style.',
    bgColor: '#FCEAF1',
    iconBg: '#F9D6E4',
    iconColor: '#C43874',
    image: '/src/assets/images/product_charger_pad_1795094430444.jpg',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'av-earbuds-pro',
    slug: 'aura-buds-pro-anc',
    name: 'Wireless Earbuds Pro',
    category: 'Earbuds',
    price: 189.0,
    originalPrice: 229.0,
    rating: 4.9,
    reviewCount: 142,
    badge: 'New',
    featured: true,
    bestSeller: true,
    inStock: true,
    stockCount: 28,
    shortDescription:
      'Adaptive hybrid noise cancellation, custom 11mm drivers, and 36-hour pocket charging case.',
    description:
      'Engineered with dual-core acoustic processing, Wireless Earbuds Pro isolate street noise while preserving natural vocal warmth and tight sub-bass response. Sculpted silicone tips seal comfortably for long studio sessions and daily commutes.',
    image: '/src/assets/images/product_earbuds_pro_1795094429860.jpg',
    gallery: [
      '/src/assets/images/product_earbuds_pro_1795094429860.jpg',
      '/src/assets/images/product_earbuds_open_1795094430816.jpg',
    ],
    colors: [
      { name: 'Obsidian Violet', hex: '#23222B' },
      { name: 'Pearl Lavender', hex: '#DCD5F7' },
    ],
    features: [
      'Adaptive Hybrid ANC up to 44 dB depth',
      'Transparency mode with instant voice pass-through',
      '8 hours playback per charge, 36 hours total with case',
      'IPX5 sweat and rain resistance for daily travel',
    ],
    specs: [
      { label: 'Driver Size', value: '11mm Dynamic Titanium' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 Multipoint' },
      { label: 'Battery Life', value: '8h Buds / 36h Total' },
      { label: 'Water Resistance', value: 'IPX5 Rated' },
      { label: 'Charging Port', value: 'USB-C & Qi Wireless' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Nadia Patel',
        role: 'Sound Designer, London',
        rating: 5,
        date: 'October 2026',
        comment:
          'Clean midrange balance and surprisingly natural transparency mode during studio walks.',
      },
      {
        id: 'r2',
        author: 'Marcus Lindqvist',
        role: 'Product Architect, Stockholm',
        rating: 5,
        date: 'September 2026',
        comment:
          'Seamless multipoint switching between laptop and phone. Comfortable even after four hours.',
      },
    ],
    releaseOrder: 1,
  },
  {
    id: 'av-headphones-studio',
    slug: 'aura-studio-anc-headphones',
    name: 'Premium Wireless Headphones',
    category: 'Headphones',
    price: 269.0,
    originalPrice: 319.0,
    rating: 4.9,
    reviewCount: 196,
    badge: 'Best Seller',
    featured: true,
    bestSeller: true,
    inStock: true,
    stockCount: 19,
    shortDescription:
      'Reference-grade 40mm planar-hybrid drivers, memory-protein cushions, and 48-hour wireless endurance.',
    description:
      'Built around lightweight anodized aluminum hinges and breathable memory-protein ear pads, Premium Wireless Headphones deliver expansive soundstage depth without clamping fatigue. Switch effortlessly between USB-C lossless wired audio and low-latency Bluetooth.',
    image: '/src/assets/images/product_headphones_studio_1795094431169.jpg',
    gallery: [
      '/src/assets/images/product_headphones_studio_1795094431169.jpg',
      '/src/assets/images/product_headphones_silver_1795094429970.jpg',
    ],
    colors: [
      { name: 'Charcoal Iris', hex: '#2A2838' },
      { name: 'Mist Silver', hex: '#CFD4DC' },
    ],
    features: [
      '40mm custom acoustic transducers with ultra-low distortion',
      '48-hour battery life with 10-minute rapid boost for 5 hours',
      'Six-microphone beamformed array for clear voice calls',
      'Fold-flat travel architecture with protective shell',
    ],
    specs: [
      { label: 'Frequency Response', value: '10 Hz – 40 kHz' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 + USB-C Audio' },
      { label: 'Battery Life', value: '48 Hours (ANC On)' },
      { label: 'Weight', value: '268g' },
      { label: 'Codecs', value: 'AAC, SBC, LDAC' },
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Hannah Brooks',
        role: 'Mastering Engineer, Toronto',
        rating: 5,
        date: 'October 2026',
        comment:
          'Balanced acoustic tuning without bloated bass. The anodized ring detail feels refined in person.',
      },
      {
        id: 'r4',
        author: 'Devon Sato',
        role: 'Creative Director, Seattle',
        rating: 5,
        date: 'August 2026',
        comment:
          'Wore these on an eleven-hour flight and still had plenty of battery left at landing.',
      },
    ],
    releaseOrder: 2,
  },
  {
    id: 'av-speaker-pulse',
    slug: 'aura-pulse-portable-speaker',
    name: 'Portable Bluetooth Speaker',
    category: 'Speakers',
    price: 159.0,
    originalPrice: 199.0,
    rating: 4.8,
    reviewCount: 89,
    badge: 'Sale',
    featured: true,
    bestSeller: true,
    inStock: true,
    stockCount: 34,
    shortDescription:
      '360-degree omnidirectional dispersion, IP67 rugged acoustic weave, and dual-speaker stereo pairing.',
    description:
      'Compact enough for weekend packs yet tuned for room-filling clarity, Portable Bluetooth Speaker pairs a custom downward passive radiator with an acoustically transparent violet-weave enclosure. Pair two units wirelessly for true left-right stereo separation.',
    image: '/src/assets/images/product_speaker_pulse_1795094431657.jpg',
    gallery: [
      '/src/assets/images/product_speaker_pulse_1795094431657.jpg',
      '/src/assets/images/product_speaker_home_1795094431567.jpg',
    ],
    colors: [
      { name: 'Deep Violet', hex: '#4B2882' },
      { name: 'Slate Gray', hex: '#636873' },
    ],
    features: [
      '360-degree omni-acoustic waveguide dispersion',
      'IP67 dustproof and waterproof construction',
      '20-hour continuous playback per charge',
      'One-tap stereo pairing with a second unit',
    ],
    specs: [
      { label: 'Output Power', value: '30W RMS Class-D' },
      { label: 'Ingress Protection', value: 'IP67 Waterproof' },
      { label: 'Battery Life', value: '20 Hours' },
      { label: 'Dimensions', value: '118 x 96 mm' },
      { label: 'Weight', value: '520g' },
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Liam O’Connor',
        role: 'Architect, Dublin',
        rating: 5,
        date: 'October 2026',
        comment:
          'Punchy acoustic presence on a patio table without harsh treble at higher volumes.',
      },
    ],
    releaseOrder: 3,
  },
  {
    id: 'av-charger-magpad',
    slug: 'aura-magpad-15w-charger',
    name: 'MagPad 15W Wireless Charger',
    category: 'Wireless Chargers',
    price: 59.0,
    originalPrice: 74.0,
    rating: 4.8,
    reviewCount: 64,
    badge: 'Sale',
    bestSeller: false,
    inStock: true,
    stockCount: 42,
    shortDescription:
      'Precision CNC-milled anodized aluminum magnetic wireless pad with 15W fast Qi2 delivery.',
    description:
      'Designed to complement earbuds cases and smartphones on nightstands or studio desks, the MagPad 15W pairs solid thermal-dissipating aluminum with a non-slip matte silicone center ring and a 1.8m braided USB-C cable.',
    image: '/src/assets/images/product_charger_pad_1795094430444.jpg',
    gallery: ['/src/assets/images/product_charger_pad_1795094430444.jpg'],
    colors: [{ name: 'Matte Graphite', hex: '#1F2026' }],
    features: [
      'Qi2 certified 15W magnetic alignment charging',
      'CNC-machined aluminum chassis for cool operation',
      'Foreign object detection and thermal safeguard',
      'Integrated 1.8m woven nylon USB-C lead',
    ],
    specs: [
      { label: 'Max Output', value: '15W Qi2 / 5W Earbuds' },
      { label: 'Material', value: 'Anodized Aluminum' },
      { label: 'Cable Length', value: '1.8m Braided USB-C' },
      { label: 'Thickness', value: '6.4 mm' },
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Claire Bennett',
        role: 'Industrial Designer, Austin',
        rating: 5,
        date: 'September 2026',
        comment:
          'Heavy enough to stay anchored when lifting earbuds off, and stays remarkably cool.',
      },
    ],
    releaseOrder: 4,
  },
  {
    id: 'av-accessories-gan',
    slug: 'aura-65w-gan-power-kit',
    name: '65W GaN Power & Audio Kit',
    category: 'Accessories',
    price: 49.0,
    rating: 4.7,
    reviewCount: 53,
    badge: 'New',
    bestSeller: false,
    inStock: true,
    stockCount: 55,
    shortDescription:
      'Ultra-compact gallium nitride wall charger paired with a studio-shielded braided USB-C cable.',
    description:
      'Keep headphones, speakers, and laptops topped up with a single pocket-sized 65W GaN adapter. Includes an oxygen-free copper braided USB-C cable engineered for zero microphonic interference during wired USB-C DAC listening.',
    image: '/src/assets/images/product_accessories_kit_1795094429982.jpg',
    gallery: ['/src/assets/images/product_accessories_kit_1795094429982.jpg'],
    colors: [{ name: 'Chalk Silver', hex: '#E6E8EE' }],
    features: [
      '65W USB-C PD 3.1 programmable power output',
      'Low-noise braided audio & data USB-C cable included',
      'Foldable prongs for compact carry pouches',
      'Active voltage and surge protection',
    ],
    specs: [
      { label: 'Power Delivery', value: '65W USB-C PD' },
      { label: 'Cable Spec', value: '1.5m Braided Shielded' },
      { label: 'Dimensions', value: '48 x 48 x 29 mm' },
      { label: 'Weight', value: '98g' },
    ],
    reviews: [
      {
        id: 'r7',
        author: 'Jonas Meyer',
        role: 'Photographer, Zurich',
        rating: 5,
        date: 'October 2026',
        comment:
          'Replaced three separate bricks in my camera bag. The cable stiffness is ideal.',
      },
    ],
    releaseOrder: 5,
  },
  {
    id: 'av-speaker-home',
    slug: 'aura-atelier-home-speaker',
    name: 'Atelier Home Acoustic Speaker',
    category: 'Speakers',
    price: 299.0,
    originalPrice: 349.0,
    rating: 4.9,
    reviewCount: 77,
    badge: 'Best Seller',
    bestSeller: true,
    inStock: true,
    stockCount: 14,
    shortDescription:
      'Sculptural room-calibrating Wi-Fi and Bluetooth home speaker wrapped in acoustic wool-weave.',
    description:
      'Designed as an acoustic centerpiece for living spaces and studios, the Atelier Home Speaker maps room reflections automatically to balance low-end resonance and crisp stereo imaging at any listening level.',
    image: '/src/assets/images/product_speaker_home_1795094431567.jpg',
    gallery: [
      '/src/assets/images/product_speaker_home_1795094431567.jpg',
      '/src/assets/images/product_speaker_pulse_1795094431657.jpg',
    ],
    colors: [{ name: 'Stone Gray', hex: '#9DA2AB' }],
    features: [
      'Automatic room-acoustic calibration on placement',
      'AirPlay, Spotify Connect, and Bluetooth 5.4 lossless streaming',
      'Recessed brushed-aluminum capacitive touch crown',
      'Custom 4-inch long-throw woofer + silk-dome tweeter',
    ],
    specs: [
      { label: 'Amplification', value: '80W Bi-Amplified' },
      { label: 'Connectivity', value: 'Wi-Fi 6, Bluetooth 5.4, Aux' },
      { label: 'Materials', value: 'Acoustic Textile & Aluminum' },
      { label: 'Weight', value: '2.1 kg' },
    ],
    reviews: [
      {
        id: 'r8',
        author: 'Elena Morales',
        role: 'Interior Stylist, Madrid',
        rating: 5,
        date: 'September 2026',
        comment:
          'Looks like an architectural object on our bookshelf and fills the whole dining room effortlessly.',
      },
    ],
    releaseOrder: 6,
  },
  {
    id: 'av-earbuds-air',
    slug: 'aura-air-lavender-earbuds',
    name: 'Aura Air Pearl Earbuds',
    category: 'Earbuds',
    price: 129.0,
    rating: 4.7,
    reviewCount: 112,
    badge: 'New',
    bestSeller: false,
    inStock: true,
    stockCount: 31,
    shortDescription:
      'Featherweight ergonomic earbuds in pearl and lavender finish with crisp call clarity.',
    description:
      'Crafted for listeners who prioritize featherlight all-day comfort, Aura Air Pearl Earbuds weigh just 4.1 grams per bud while delivering crisp acoustic separation and clear dual-mic wind reduction.',
    image: '/src/assets/images/product_earbuds_open_1795094430816.jpg',
    gallery: [
      '/src/assets/images/product_earbuds_open_1795094430816.jpg',
      '/src/assets/images/product_earbuds_pro_1795094429860.jpg',
    ],
    colors: [
      { name: 'Pearl Lavender', hex: '#D8CEF6' },
      { name: 'Obsidian Black', hex: '#23222B' },
    ],
    features: [
      '4.1g featherweight ergonomic shell geometry',
      'Dual-beamforming microphones with wind noise filter',
      '30-hour combined charging case autonomy',
      'Low-latency mode for video and gaming sync',
    ],
    specs: [
      { label: 'Driver Size', value: '10mm Bio-Cellulose' },
      { label: 'Weight', value: '4.1g per earbud' },
      { label: 'Battery Life', value: '7h Buds / 30h Total' },
      { label: 'Connectivity', value: 'Bluetooth 5.3' },
    ],
    reviews: [
      {
        id: 'r9',
        author: 'Sofia Lind',
        role: 'UX Researcher, Copenhagen',
        rating: 5,
        date: 'October 2026',
        comment:
          'Finally earbuds that do not ache after back-to-back calls. The lavender hue is subtle and classy.',
      },
    ],
    releaseOrder: 7,
  },
  {
    id: 'av-headphones-silver',
    slug: 'aura-reference-silver-headphones',
    name: 'Reference Silver Headphones',
    category: 'Headphones',
    price: 295.0,
    originalPrice: 345.0,
    rating: 4.8,
    reviewCount: 68,
    badge: 'Sale',
    bestSeller: true,
    inStock: false,
    stockCount: 0,
    shortDescription:
      'Brushed aluminum over-ear reference headphones with breathable woven textile earcups.',
    description:
      'Combining CNC-brushed silver aluminum arms with breathable acoustic fabric cushions, Reference Silver Headphones offer airy, fatigue-free listening across jazz, acoustic, and vocal recordings.',
    image: '/src/assets/images/product_headphones_silver_1795094429970.jpg',
    gallery: [
      '/src/assets/images/product_headphones_silver_1795094429970.jpg',
      '/src/assets/images/product_headphones_studio_1795094431169.jpg',
    ],
    colors: [{ name: 'Brushed Silver', hex: '#CBD0D6' }],
    features: [
      'CNC-machined anodized aluminum yokes and sliders',
      'Breathable woven fabric ear cushions for cool comfort',
      'Spatial head-tracking acoustic preset',
      '42-hour wireless playback',
    ],
    specs: [
      { label: 'Driver Size', value: '42mm Beryllium-Coated' },
      { label: 'Battery Life', value: '42 Hours' },
      { label: 'Weight', value: '275g' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 / 3.5mm / USB-C' },
    ],
    reviews: [
      {
        id: 'r10',
        author: 'Tariq Al-Mansoor',
        role: 'Podcast Producer, Dubai',
        rating: 5,
        date: 'August 2026',
        comment:
          'Woven earpads stay cool during long editing mornings and the aluminum feel is rock solid.',
      },
    ],
    releaseOrder: 8,
  },
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Nadia Patel',
    role: 'Sound Designer · London',
    initials: 'NP',
    rating: 5,
    quote:
      'Switching from bulkier studio cans to the AURAVIBE Wireless Headphones gave me clean transient detail on commutes without sacrificing all-day comfort.',
  },
  {
    id: 't2',
    name: 'Marcus Lindqvist',
    role: 'Product Architect · Stockholm',
    initials: 'ML',
    rating: 5,
    quote:
      'Every material choice feels intentional—from the matte anodized rings on the earbuds case to the silent MagPad weight on my desk.',
  },
  {
    id: 't3',
    name: 'Elena Morales',
    role: 'Interior Stylist · Madrid',
    initials: 'EM',
    rating: 5,
    quote:
      'The Atelier Home Speaker blends quietly into warm neutral interiors while delivering rich room-filling sound at low evening volumes.',
  },
];
