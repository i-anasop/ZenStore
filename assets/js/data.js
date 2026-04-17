// Product catalog. Image base is resolved by base.js (window.ZEN.base).
(function () {
  const make = (id, name, cat, sub, price, oldPrice, imgIdx) => ({
    id, name, category: cat, subcategory: sub, price, oldPrice,
    image: `assets/images/products/${cat}/${sub}/${String(imgIdx).padStart(2, '0')}.png`,
    rating: (4 + Math.random()).toFixed(1),
    description: `${name} — premium ${sub.replace(/-/g, ' ')} crafted for everyday comfort and lasting style. Built with breathable materials, a cushioned footbed, and a durable rubber outsole that grips every step.`,
  });

  const PRODUCTS = [
    // Men - Sneakers
    make('m-snk-1', 'Aero Stride',     'men', 'sneakers', 89,  120, 1),
    make('m-snk-2', 'Velocity Mesh',   'men', 'sneakers', 95,  null, 2),
    make('m-snk-3', 'Urban Court',     'men', 'sneakers', 79,  99,   3),
    make('m-snk-4', 'Cloudwalk Pro',   'men', 'sneakers', 109, null, 4),
    make('m-snk-5', 'Metro Runner',    'men', 'sneakers', 85,  null, 5),
    make('m-snk-6', 'Skyline Lite',    'men', 'sneakers', 99,  130, 6),
    // Men - Boots
    make('m-bts-1', 'Trailhead Boot',  'men', 'boots', 139, null, 1),
    make('m-bts-2', 'Highland Chukka', 'men', 'boots', 119, 150, 2),
    make('m-bts-3', 'Ridgeline Mid',   'men', 'boots', 149, null, 3),
    make('m-bts-4', 'Cascade Hiker',   'men', 'boots', 159, null, 4),
    make('m-bts-5', 'Frontier Lace',   'men', 'boots', 129, 165, 5),
    make('m-bts-6', 'Summit Pro',      'men', 'boots', 169, null, 6),
    // Men - Formal Shoes
    make('m-frm-1', 'Oxford Classic',  'men', 'formal-shoes', 119, null, 1),
    make('m-frm-2', 'Mayfair Loafer',  'men', 'formal-shoes', 99,  null, 2),
    make('m-frm-3', 'Belmont Derby',   'men', 'formal-shoes', 129, 159, 3),
    make('m-frm-4', 'Wellington Brogue','men', 'formal-shoes', 139, null, 4),
    make('m-frm-5', 'Heritage Monk',   'men', 'formal-shoes', 149, null, 5),
    make('m-frm-6', 'Kensington Lace', 'men', 'formal-shoes', 109, null, 6),
    // Men - Joggers
    make('m-jog-1', 'Glide Runner',    'men', 'joggers', 75, null, 1),
    make('m-jog-2', 'Pace Knit',       'men', 'joggers', 79, 99, 2),
    make('m-jog-3', 'Drift Trainer',   'men', 'joggers', 85, null, 3),
    make('m-jog-4', 'Tempo Court',     'men', 'joggers', 69, null, 4),
    make('m-jog-5', 'Stride Mesh',     'men', 'joggers', 82, null, 5),
    make('m-jog-6', 'Coast Lite',      'men', 'joggers', 89, null, 6),
    // Men - Loafers
    make('m-lfr-1', 'Capri Loafer',    'men', 'loofers', 95,  null, 1),
    make('m-lfr-2', 'Tuscan Suede',    'men', 'loofers', 109, null, 2),
    make('m-lfr-3', 'Riviera Slip',    'men', 'loofers', 89,  120, 3),
    make('m-lfr-4', 'Coastal Penny',   'men', 'loofers', 99,  null, 4),
    make('m-lfr-5', 'Verona Driver',   'men', 'loofers', 115, null, 5),
    make('m-lfr-6', 'Atlas Bit',       'men', 'loofers', 105, null, 6),
    // Men - Slippers
    make('m-slp-1', 'Hearth Slipper',  'men', 'slippers', 39, null, 1),
    make('m-slp-2', 'Loft Mule',       'men', 'slippers', 45, null, 2),
    make('m-slp-3', 'Cabin Slip',      'men', 'slippers', 49, 65, 3),
    make('m-slp-4', 'Suede Lounge',    'men', 'slippers', 55, null, 4),
    make('m-slp-5', 'Hollow Comfort',  'men', 'slippers', 35, null, 5),
    make('m-slp-6', 'Plush Step',      'men', 'slippers', 42, null, 6),

    // Women - Sneakers
    make('w-snk-1', 'Bloom Pulse',     'women', 'sneakers', 89,  null, 1),
    make('w-snk-2', 'Aurora Light',    'women', 'sneakers', 95,  120, 2),
    make('w-snk-3', 'Coral Court',     'women', 'sneakers', 79,  null, 3),
    make('w-snk-4', 'Lilac Drift',     'women', 'sneakers', 99,  null, 4),
    make('w-snk-5', 'Pearl Step',      'women', 'sneakers', 85,  null, 5),
    make('w-snk-6', 'Halo Runner',     'women', 'sneakers', 105, 135, 6),
    // Women - Fancy
    make('w-fcy-1', 'Stiletto Noir',   'women', 'fancy-shoes', 129, null, 1),
    make('w-fcy-2', 'Crystal Heel',    'women', 'fancy-shoes', 149, null, 2),
    make('w-fcy-3', 'Silk Pump',       'women', 'fancy-shoes', 119, 159, 3),
    make('w-fcy-4', 'Velvet Charm',    'women', 'fancy-shoes', 139, null, 4),
    make('w-fcy-5', 'Pearl Stiletto',  'women', 'fancy-shoes', 165, null, 5),
    make('w-fcy-6', 'Champagne Heel',  'women', 'fancy-shoes', 145, null, 6),
    // Women - Flats
    make('w-flt-1', 'Iris Ballet',     'women', 'flats', 65, null, 1),
    make('w-flt-2', 'Daisy Slip',      'women', 'flats', 59, null, 2),
    make('w-flt-3', 'Rose Pointe',     'women', 'flats', 75, 95, 3),
    make('w-flt-4', 'Petal Loafer',    'women', 'flats', 69, null, 4),
    make('w-flt-5', 'Lily Sandal',     'women', 'flats', 55, null, 5),
    make('w-flt-6', 'Magnolia Mule',   'women', 'flats', 79, null, 6),
    // Women - Joggers
    make('w-jog-1', 'Soft Stride',     'women', 'joggers', 75, null, 1),
    make('w-jog-2', 'Glow Runner',     'women', 'joggers', 79, null, 2),
    make('w-jog-3', 'Pulse Court',     'women', 'joggers', 85, 110, 3),
    make('w-jog-4', 'Featherlight',    'women', 'joggers', 69, null, 4),
    make('w-jog-5', 'Velvet Lite',     'women', 'joggers', 82, null, 5),
    make('w-jog-6', 'Lush Mesh',       'women', 'joggers', 89, null, 6),
    // Women - Sandals
    make('w-snd-1', 'Bay Sandal',      'women', 'sandals', 49, null, 1),
    make('w-snd-2', 'Sun Slide',       'women', 'sandals', 45, 65, 2),
    make('w-snd-3', 'Cove Strap',      'women', 'sandals', 59, null, 3),
    make('w-snd-4', 'Lagoon Buckle',   'women', 'sandals', 65, null, 4),
    make('w-snd-5', 'Coral Slide',     'women', 'sandals', 39, null, 5),
    make('w-snd-6', 'Tide Crisscross', 'women', 'sandals', 55, null, 6),

    // Sports - Basketball
    make('s-bsk-1', 'Slam Dunk Pro',   'sports', 'basketball', 129, null, 1),
    make('s-bsk-2', 'Court King',      'sports', 'basketball', 149, 199, 2),
    make('s-bsk-3', 'Hoop Hi-Top',     'sports', 'basketball', 119, null, 3),
    make('s-bsk-4', 'Rim Crusher',     'sports', 'basketball', 159, null, 4),
    make('s-bsk-5', 'Fast Break',      'sports', 'basketball', 139, null, 5),
    make('s-bsk-6', 'Air Strike',      'sports', 'basketball', 169, 220, 6),
    // Sports - Running
    make('s-run-1', 'Marathon Mesh',   'sports', 'running', 109, null, 1),
    make('s-run-2', 'Pacer Pro',       'sports', 'running', 119, 150, 2),
    make('s-run-3', 'Trail Burst',     'sports', 'running', 129, null, 3),
    make('s-run-4', 'Velocity X',      'sports', 'running', 139, null, 4),
    make('s-run-5', 'Endurance Lite',  'sports', 'running', 99,  null, 5),
    make('s-run-6', 'Sprint Edge',     'sports', 'running', 149, null, 6),
  ];

  window.ZEN = window.ZEN || {};
  window.ZEN.products = PRODUCTS;
  window.ZEN.findProduct = (id) => PRODUCTS.find(p => p.id === id);
  window.ZEN.byCategory = (cat) => PRODUCTS.filter(p => p.category === cat);
  window.ZEN.subcategoriesOf = (cat) => [...new Set(PRODUCTS.filter(p => p.category === cat).map(p => p.subcategory))];
})();
