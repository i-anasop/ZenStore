// Built-in chat widget for Zen Store.
// Floating bubble bottom-right. Opens a panel with greeting + suggestion chips.
// Answers from a small FAQ derived from the knowledge base.
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  const FAQ = [
    { q: ['shipping', 'delivery', 'deliver', 'how long', 'arrive'],
      a: 'We deliver across Pakistan in <b>3–5 business days</b>. Shipping is a flat <b>Rs 300</b>, and <b>free</b> on orders over Rs 30,000.' },
    { q: ['return', 'refund', 'exchange', 'send back'],
      a: 'We offer a <b>30-day hassle-free return</b> on unworn items in original packaging. Email <a href="mailto:support@zenstore.example">support@zenstore.example</a> with your order ID to start.' },
    { q: ['payment', 'pay', 'easypaisa', 'cod', 'cash on delivery', 'card'],
      a: 'We accept <b>EasyPaisa</b> and <b>Cash on Delivery</b>. Cards and bank transfer aren\'t supported yet.' },
    { q: ['size', 'sizing', 'fit'],
      a: 'All shoes use <b>EU sizing 38–45</b>. If you\'re between sizes, we recommend going up for sneakers/sports and down for formal/heels.' },
    { q: ['track', 'order status', 'where is my order'],
      a: 'Email <a href="mailto:support@zenstore.example">support@zenstore.example</a> with your order ID (format <code>ZEN-XXXXXX</code>) and we\'ll share the latest status.' },
    { q: ['cancel'],
      a: 'You can cancel before shipment — email us your order ID at <a href="mailto:support@zenstore.example">support@zenstore.example</a> as soon as possible.' },
    { q: ['contact', 'support', 'email', 'phone number', 'help'],
      a: 'You can reach us at <a href="mailto:support@zenstore.example">support@zenstore.example</a>, 9 AM – 9 PM PKT, Mon–Sat.' },
    { q: ['discount', 'sale', 'offer', 'coupon', 'promo'],
      a: 'Look out for items marked <b>Sale</b> on the homepage and category pages — those have a discounted price already applied. We don\'t have promo codes at the moment.' },
    { q: ['account', 'login', 'sign in', 'sign up', 'register', 'password'],
      a: 'Create a free account from the user icon in the header. Need to reset your password? Email <a href="mailto:support@zenstore.example">support@zenstore.example</a>.' },
    { q: ['original', 'authentic', 'real', 'fake'],
      a: 'Yes — every Zen Store product is <b>100% authentic</b> and quality-checked.' },
    { q: ['tax', 'gst', 'vat'],
      a: 'A 5% sales tax is added at checkout, on top of the listed product price.' },
    { q: ['international', 'outside pakistan', 'abroad', 'overseas'],
      a: 'We ship within <b>Pakistan only</b> at this time.' },
    { q: ['stock', 'available', 'in stock'],
      a: 'Everything visible on the site is in stock. If something goes out during checkout, our team will reach out within 24 hours.' },
    { q: ['hi', 'hello', 'hey', 'salam', 'assalam', 'aoa'],
      a: 'Hi! 👋 I\'m the Zen Store assistant. Ask me about shipping, returns, sizes, payment, or anything else about our shoes.' },
    { q: ['thanks', 'thank', 'shukria', 'shukriya'],
      a: 'You\'re very welcome! Anything else I can help with?' },
    { q: ['men', 'mens'],
      a: 'Our men\'s collection includes Sneakers, Boots, Formal Shoes, Joggers, Loafers and Slippers. <a href="/Zen-Store/men/">Browse Men →</a>' },
    { q: ['women', 'womens', 'ladies'],
      a: 'Our women\'s collection includes Sneakers, Fancy Shoes, Flats, Joggers and Sandals. <a href="/Zen-Store/women/">Browse Women →</a>' },
    { q: ['sport', 'sports', 'running', 'basketball', 'gym'],
      a: 'Our sports range covers Basketball and Running shoes. <a href="/Zen-Store/sports/">Browse Sports →</a>' },
    { q: ['price', 'cost', 'how much'],
      a: 'Prices range from about Rs 9,800 (slippers) to Rs 47,300 (premium boots & basketball shoes). Browse a category to see exact prices.' },
  ];

  const SUGGESTIONS = [
    'Shipping & delivery',
    'Returns & refunds',
    'Payment options',
    'Size guide',
    'Track my order',
  ];

  const findAnswer = (text) => {
    const t = text.toLowerCase();
    let best = null, bestScore = 0;
    for (const item of FAQ) {
      let score = 0;
      for (const k of item.q) if (t.includes(k)) score += k.length;
      if (score > bestScore) { bestScore = score; best = item; }
    }
    if (best) return best.a;
    // Product name match
    if (ZEN.products) {
      const hit = ZEN.products.find(p => t.includes(p.name.toLowerCase()));
      if (hit) {
        return `<b>${hit.name}</b> is in our ${hit.category} · ${hit.subcategory.replace(/-/g,' ')} range, priced at <b>Rs ${hit.price.toLocaleString('en-PK')}</b>${hit.oldPrice?` (was Rs ${hit.oldPrice.toLocaleString('en-PK')})`:''}. <a href="/Zen-Store/product/?id=${hit.id}">View product →</a>`;
      }
    }
    return 'I\'m not sure about that one — for the quickest help, please email <a href="mailto:support@zenstore.example">support@zenstore.example</a> and our team will get back to you.';
  };

  const html = `
<button class="zc-bubble" id="zc-bubble" aria-label="Open chat">
  <i class="fas fa-comments"></i>
  <span class="zc-bubble-dot"></span>
</button>
<div class="zc-panel" id="zc-panel" role="dialog" aria-label="Chat with Zen support">
  <div class="zc-head">
    <div class="zc-head-info">
      <div class="zc-head-avatar">Z</div>
      <div>
        <strong>Zen Assistant</strong>
        <span class="zc-head-status"><span class="zc-dot"></span> Online · Replies instantly</span>
      </div>
    </div>
    <button class="zc-close" id="zc-close" aria-label="Close"><i class="fas fa-times"></i></button>
  </div>
  <div class="zc-body" id="zc-body"></div>
  <div class="zc-suggestions" id="zc-suggestions"></div>
  <form class="zc-input" id="zc-form">
    <input type="text" id="zc-text" placeholder="Type your question…" autocomplete="off" required>
    <button type="submit" aria-label="Send"><i class="fas fa-paper-plane"></i></button>
  </form>
</div>`;

  const css = `
.zc-bubble {
  position: fixed; bottom: 22px; right: 22px; z-index: 999;
  width: 60px; height: 60px; border-radius: 50%; border: 0;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: #fff; font-size: 1.4rem; cursor: pointer;
  box-shadow: 0 12px 28px rgba(30,58,138,.4);
  display: grid; place-items: center;
  transition: transform .2s ease, box-shadow .2s ease;
}
.zc-bubble:hover { transform: translateY(-3px) scale(1.05); box-shadow: 0 16px 36px rgba(30,58,138,.5); }
.zc-bubble-dot { position: absolute; top: 10px; right: 12px; width: 10px; height: 10px; border-radius: 50%; background: #f59e0b; border: 2px solid #fff; }
.zc-panel {
  position: fixed; bottom: 96px; right: 22px; z-index: 999;
  width: 360px; max-width: calc(100vw - 24px); height: 540px; max-height: calc(100vh - 130px);
  background: #fff; border-radius: 18px; overflow: hidden;
  box-shadow: 0 24px 60px rgba(15,23,42,.25);
  display: none; flex-direction: column;
  transform-origin: bottom right;
  animation: zcIn .25s ease;
}
.zc-panel.open { display: flex; }
@keyframes zcIn { from { opacity: 0; transform: translateY(12px) scale(.96); } to { opacity: 1; transform: none; } }
.zc-head {
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  color: #fff; padding: 14px 16px;
  display: flex; align-items: center; justify-content: space-between;
}
.zc-head-info { display: flex; align-items: center; gap: 12px; }
.zc-head-avatar {
  width: 40px; height: 40px; border-radius: 50%;
  background: rgba(255,255,255,.2); display: grid; place-items: center;
  font-weight: 800; font-family: 'Plus Jakarta Sans', sans-serif;
}
.zc-head-info strong { display: block; font-size: .95rem; }
.zc-head-status { font-size: .75rem; opacity: .85; display: inline-flex; align-items: center; gap: 6px; }
.zc-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; box-shadow: 0 0 0 2px rgba(52,211,153,.3); }
.zc-close {
  background: rgba(255,255,255,.15); border: 0; color: #fff; cursor: pointer;
  width: 32px; height: 32px; border-radius: 50%; display: grid; place-items: center;
}
.zc-close:hover { background: rgba(255,255,255,.25); }
.zc-body {
  flex: 1; overflow-y: auto; padding: 16px;
  background: #f8fafc;
  display: flex; flex-direction: column; gap: 10px;
}
.zc-msg { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: .9rem; line-height: 1.45; }
.zc-msg a { color: #1e3a8a; font-weight: 600; }
.zc-msg.bot { background: #fff; border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
.zc-msg.user { background: #1e3a8a; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
.zc-msg.user a { color: #fff; text-decoration: underline; }
.zc-typing { display: inline-flex; gap: 4px; padding: 4px 0; }
.zc-typing span { width: 6px; height: 6px; border-radius: 50%; background: #94a3b8; animation: zcBounce 1.2s infinite; }
.zc-typing span:nth-child(2) { animation-delay: .15s; }
.zc-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes zcBounce { 0%, 60%, 100% { transform: translateY(0); opacity: .4; } 30% { transform: translateY(-5px); opacity: 1; } }
.zc-suggestions {
  display: flex; gap: 6px; padding: 10px 12px 0; flex-wrap: wrap;
  background: #f8fafc; border-top: 1px solid #e2e8f0;
}
.zc-chip {
  background: #fff; border: 1px solid #cbd5e1; color: #1e3a8a;
  padding: 6px 12px; border-radius: 999px; font-size: .78rem; cursor: pointer;
  font-weight: 500;
}
.zc-chip:hover { background: #1e3a8a; color: #fff; border-color: #1e3a8a; }
.zc-input {
  display: flex; gap: 8px; padding: 12px;
  background: #f8fafc; border-top: 1px solid #e2e8f0;
}
.zc-input input {
  flex: 1; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 999px;
  font-family: inherit; font-size: .9rem; outline: none; background: #fff;
}
.zc-input input:focus { border-color: #1e3a8a; }
.zc-input button {
  width: 40px; height: 40px; border-radius: 50%; border: 0;
  background: #1e3a8a; color: #fff; cursor: pointer;
  display: grid; place-items: center;
}
.zc-input button:hover { background: #3b82f6; }
@media (max-width: 480px) {
  .zc-panel { width: calc(100vw - 16px); right: 8px; bottom: 84px; height: calc(100vh - 110px); }
  .zc-bubble { right: 16px; bottom: 16px; }
}
`;

  const init = () => {
    if (document.getElementById('zc-bubble')) return;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    document.body.appendChild(wrap);

    const bubble = document.getElementById('zc-bubble');
    const panel = document.getElementById('zc-panel');
    const closeBtn = document.getElementById('zc-close');
    const body = document.getElementById('zc-body');
    const sug = document.getElementById('zc-suggestions');
    const form = document.getElementById('zc-form');
    const input = document.getElementById('zc-text');

    const addMsg = (text, who = 'bot') => {
      const div = document.createElement('div');
      div.className = 'zc-msg ' + who;
      div.innerHTML = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    };

    const addTyping = () => {
      const div = addMsg('<span class="zc-typing"><span></span><span></span><span></span></span>', 'bot');
      return div;
    };

    let opened = false;
    const open = () => {
      panel.classList.add('open');
      bubble.style.display = 'none';
      if (!opened) {
        opened = true;
        addMsg('Hi there! 👋 I\'m the Zen Store assistant. How can I help you today?');
        sug.innerHTML = SUGGESTIONS.map(s => `<button type="button" class="zc-chip" data-s="${s}">${s}</button>`).join('');
        sug.querySelectorAll('.zc-chip').forEach(c => c.addEventListener('click', () => {
          handleSend(c.dataset.s);
        }));
      }
      setTimeout(() => input.focus(), 200);
    };
    const close = () => { panel.classList.remove('open'); bubble.style.display = 'grid'; };

    bubble.addEventListener('click', open);
    closeBtn.addEventListener('click', close);

    const handleSend = (text) => {
      if (!text.trim()) return;
      addMsg(text, 'user');
      input.value = '';
      const t = addTyping();
      setTimeout(() => {
        t.remove();
        addMsg(findAnswer(text));
      }, 500 + Math.random() * 400);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend(input.value);
    });
  };

  ZEN.initChat = init;
})();
