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
    make('m-snk-1', 'Aero Stride', 'men', 'sneakers', 24900, 33600, 1),
    make('m-snk-2', 'Velocity Mesh', 'men', 'sneakers', 26600, null, 2),
    make('m-snk-3', 'Urban Court', 'men', 'sneakers', 22100, 27700, 3),
    make('m-snk-4', 'Cloudwalk Pro', 'men', 'sneakers', 30500, null, 4),
    make('m-snk-5', 'Metro Runner', 'men', 'sneakers', 23800, null, 5),
    make('m-snk-6', 'Skyline Lite', 'men', 'sneakers', 27700, 36400, 6),
    // Men - Boots
    make('m-bts-1', 'Trailhead Boot', 'men', 'boots', 38900, null, 1),
    make('m-bts-2', 'Highland Chukka', 'men', 'boots', 33300, 42000, 2),
    make('m-bts-3', 'Ridgeline Mid', 'men', 'boots', 41700, null, 3),
    make('m-bts-4', 'Cascade Hiker', 'men', 'boots', 44500, null, 4),
    make('m-bts-5', 'Frontier Lace', 'men', 'boots', 36100, 46200, 5),
    make('m-bts-6', 'Summit Pro', 'men', 'boots', 47300, null, 6),
    // Men - Formal Shoes
    make('m-frm-1', 'Oxford Classic', 'men', 'formal-shoes', 33300, null, 1),
    make('m-frm-2', 'Mayfair Loafer', 'men', 'formal-shoes', 27700, null, 2),
    make('m-frm-3', 'Belmont Derby', 'men', 'formal-shoes', 36100, 44500, 3),
    make('m-frm-4', 'Wellington Brogue', 'men', 'formal-shoes', 38900, null, 4),
    make('m-frm-5', 'Heritage Monk', 'men', 'formal-shoes', 41700, null, 5),
    make('m-frm-6', 'Kensington Lace', 'men', 'formal-shoes', 30500, null, 6),
    // Men - Joggers
    make('m-jog-1', 'Glide Runner', 'men', 'joggers', 21000, null, 1),
    make('m-jog-2', 'Pace Knit', 'men', 'joggers', 22100, 27700, 2),
    make('m-jog-3', 'Drift Trainer', 'men', 'joggers', 23800, null, 3),
    make('m-jog-4', 'Tempo Court', 'men', 'joggers', 19300, null, 4),
    make('m-jog-5', 'Stride Mesh', 'men', 'joggers', 23000, null, 5),
    make('m-jog-6', 'Coast Lite', 'men', 'joggers', 24900, null, 6),
    // Men - Loafers
    make('m-lfr-1', 'Capri Loafer', 'men', 'loofers', 26600, null, 1),
    make('m-lfr-2', 'Tuscan Suede', 'men', 'loofers', 30500, null, 2),
    make('m-lfr-3', 'Riviera Slip', 'men', 'loofers', 24900, 33600, 3),
    make('m-lfr-4', 'Coastal Penny', 'men', 'loofers', 27700, null, 4),
    make('m-lfr-5', 'Verona Driver', 'men', 'loofers', 32200, null, 5),
    make('m-lfr-6', 'Atlas Bit', 'men', 'loofers', 29400, null, 6),
    // Men - Slippers
    make('m-slp-1', 'Hearth Slipper', 'men', 'slippers', 10900, null, 1),
    make('m-slp-2', 'Loft Mule', 'men', 'slippers', 12600, null, 2),
    make('m-slp-3', 'Cabin Slip', 'men', 'slippers', 13700, 18200, 3),
    make('m-slp-4', 'Suede Lounge', 'men', 'slippers', 15400, null, 4),
    make('m-slp-5', 'Hollow Comfort', 'men', 'slippers', 9800, null, 5),
    make('m-slp-6', 'Plush Step', 'men', 'slippers', 11800, null, 6),

    // Women - Sneakers
    make('w-snk-1', 'Bloom Pulse', 'women', 'sneakers', 24900, null, 1),
    make('w-snk-2', 'Aurora Light', 'women', 'sneakers', 26600, 33600, 2),
    make('w-snk-3', 'Coral Court', 'women', 'sneakers', 22100, null, 3),
    make('w-snk-4', 'Lilac Drift', 'women', 'sneakers', 27700, null, 4),
    make('w-snk-5', 'Pearl Step', 'women', 'sneakers', 23800, null, 5),
    make('w-snk-6', 'Halo Runner', 'women', 'sneakers', 29400, 37800, 6),
    // Women - Fancy
    make('w-fcy-1', 'Stiletto Noir', 'women', 'fancy-shoes', 36100, null, 1),
    make('w-fcy-2', 'Crystal Heel', 'women', 'fancy-shoes', 41700, null, 2),
    make('w-fcy-3', 'Silk Pump', 'women', 'fancy-shoes', 33300, 44500, 3),
    make('w-fcy-4', 'Velvet Charm', 'women', 'fancy-shoes', 38900, null, 4),
    make('w-fcy-5', 'Pearl Stiletto', 'women', 'fancy-shoes', 46200, null, 5),
    make('w-fcy-6', 'Champagne Heel', 'women', 'fancy-shoes', 40600, null, 6),
    // Women - Flats
    make('w-flt-1', 'Iris Ballet', 'women', 'flats', 18200, null, 1),
    make('w-flt-2', 'Daisy Slip', 'women', 'flats', 16500, null, 2),
    make('w-flt-3', 'Rose Pointe', 'women', 'flats', 21000, 26600, 3),
    make('w-flt-4', 'Petal Loafer', 'women', 'flats', 19300, null, 4),
    make('w-flt-5', 'Lily Sandal', 'women', 'flats', 15400, null, 5),
    make('w-flt-6', 'Magnolia Mule', 'women', 'flats', 22100, null, 6),
    // Women - Joggers
    make('w-jog-1', 'Soft Stride', 'women', 'joggers', 21000, null, 1),
    make('w-jog-2', 'Glow Runner', 'women', 'joggers', 22100, null, 2),
    make('w-jog-3', 'Pulse Court', 'women', 'joggers', 23800, 30800, 3),
    make('w-jog-4', 'Featherlight', 'women', 'joggers', 19300, null, 4),
    make('w-jog-5', 'Velvet Lite', 'women', 'joggers', 23000, null, 5),
    make('w-jog-6', 'Lush Mesh', 'women', 'joggers', 24900, null, 6),
    // Women - Sandals
    make('w-snd-1', 'Bay Sandal', 'women', 'sandals', 13700, null, 1),
    make('w-snd-2', 'Sun Slide', 'women', 'sandals', 12600, 18200, 2),
    make('w-snd-3', 'Cove Strap', 'women', 'sandals', 16500, null, 3),
    make('w-snd-4', 'Lagoon Buckle', 'women', 'sandals', 18200, null, 4),
    make('w-snd-5', 'Coral Slide', 'women', 'sandals', 10900, null, 5),
    make('w-snd-6', 'Tide Crisscross', 'women', 'sandals', 15400, null, 6),

    // Sports - Basketball
    make('s-bsk-1', 'Slam Dunk Pro', 'sports', 'basketball', 36100, null, 1),
    make('s-bsk-2', 'Court King', 'sports', 'basketball', 41700, 55700, 2),
    make('s-bsk-3', 'Hoop Hi-Top', 'sports', 'basketball', 33300, null, 3),
    make('s-bsk-4', 'Rim Crusher', 'sports', 'basketball', 44500, null, 4),
    make('s-bsk-5', 'Fast Break', 'sports', 'basketball', 38900, null, 5),
    make('s-bsk-6', 'Air Strike', 'sports', 'basketball', 47300, 61600, 6),
    // Sports - Running
    make('s-run-1', 'Marathon Mesh', 'sports', 'running', 30500, null, 1),
    make('s-run-2', 'Pacer Pro', 'sports', 'running', 33300, 42000, 2),
    make('s-run-3', 'Trail Burst', 'sports', 'running', 36100, null, 3),
    make('s-run-4', 'Velocity X', 'sports', 'running', 38900, null, 4),
    make('s-run-5', 'Endurance Lite', 'sports', 'running', 27700, null, 5),
    make('s-run-6', 'Sprint Edge', 'sports', 'running', 41700, null, 6),
  ];

  window.ZEN = window.ZEN || {};
  window.ZEN.products = PRODUCTS;
  window.ZEN.findProduct = (id) => PRODUCTS.find(p => p.id === id);
  window.ZEN.byCategory = (cat) => PRODUCTS.filter(p => p.category === cat);
  window.ZEN.subcategoriesOf = (cat) => [...new Set(PRODUCTS.filter(p => p.category === cat).map(p => p.subcategory))];
})();
