// Cart logic backed by localStorage.
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  ZEN.getCart = () => ZEN.ls.get('cart', []);
  ZEN.setCart = (items) => { ZEN.ls.set('cart', items); ZEN.refreshCartBadge && ZEN.refreshCartBadge(true); };

  ZEN.cartAdd = (productId, qty = 1, size = null) => {
    const cart = ZEN.getCart();
    const existing = cart.find(i => i.id === productId && i.size === size);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty, size });
    ZEN.setCart(cart);
    const p = ZEN.findProduct(productId);
    ZEN.toast(`${p ? p.name : 'Item'} added to cart`, 'success');
  };

  ZEN.cartUpdateQty = (productId, qty, size = null) => {
    let cart = ZEN.getCart();
    if (qty <= 0) {
      cart = cart.filter(i => !(i.id === productId && i.size === size));
    } else {
      const item = cart.find(i => i.id === productId && i.size === size);
      if (item) item.qty = qty;
    }
    ZEN.setCart(cart);
  };

  ZEN.cartRemove = (productId, size = null) => {
    const cart = ZEN.getCart().filter(i => !(i.id === productId && i.size === size));
    ZEN.setCart(cart);
    ZEN.toast('Removed from cart');
  };

  ZEN.cartClear = () => { ZEN.setCart([]); };

  ZEN.cartTotals = () => {
    const items = ZEN.getCart().map(i => ({ ...i, product: ZEN.findProduct(i.id) })).filter(i => i.product);
    const subtotal = items.reduce((a, i) => a + i.product.price * i.qty, 0);
    const shipping = subtotal > 0 && subtotal < 30000 ? 300 : 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + shipping + tax;
    return { items, subtotal, shipping, tax, total };
  };
})();
