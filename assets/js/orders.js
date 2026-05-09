// Orders backed by localStorage. Used by checkout, thank-you, profile, and admin.
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  ZEN.getOrders = () => ZEN.ls.get('orders', []);

  ZEN.createOrder = ({ user, address, payment, items, totals }) => {
    const orders = ZEN.getOrders();
    const id = 'ZEN-' + Date.now().toString(36).toUpperCase().slice(-6);
    // EasyPaisa orders sit in awaiting-review until the team verifies the transfer
    const initialStatus = (payment && payment.method === 'EasyPaisa') ? 'pending' : 'pending';
    const order = {
      id,
      user: user ? { name: user.name, email: user.email } : { name: address.name, email: address.email || '' },
      address,
      payment: payment || {},
      items: items.map(i => ({ id: i.id, name: i.product.name, price: i.product.price, qty: i.qty, size: i.size })),
      totals,
      status: initialStatus,
      paymentStatus: payment && payment.method === 'EasyPaisa' ? 'awaiting-review' : 'cod',
      createdAt: Date.now(),
    };
    orders.unshift(order);
    ZEN.ls.set('orders', orders);
    ZEN.ls.set('lastOrder', order);
    return order;
  };

  ZEN.updateOrderStatus = (id, status) => {
    const orders = ZEN.getOrders();
    const o = orders.find(x => x.id === id);
    if (o) { o.status = status; ZEN.ls.set('orders', orders); }
  };

  ZEN.deleteOrder = (id) => {
    ZEN.ls.set('orders', ZEN.getOrders().filter(o => o.id !== id));
  };
})();
