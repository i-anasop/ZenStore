// Shared layout, base path detection, header/footer injection, toast, search.
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  // --- Base path detection (works at /Zen-Store/ or local /) ---
  const findBase = () => {
    const scripts = document.getElementsByTagName('script');
    for (const s of scripts) {
      const m = s.src && s.src.match(/^(.*\/)assets\/js\/base\.js/);
      if (m) {
        try {
          const u = new URL(m[1]);
          return u.pathname;
        } catch { return m[1]; }
      }
    }
    return '/';
  };
  ZEN.base = findBase(); // ends with /

  const url = (p) => ZEN.base + p.replace(/^\//, '');
  ZEN.url = url;

  // --- Storage helpers ---
  const ls = {
    get: (k, d) => { try { const v = localStorage.getItem('zen.' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set: (k, v) => { try { localStorage.setItem('zen.' + k, JSON.stringify(v)); } catch {} },
    del: (k) => { try { localStorage.removeItem('zen.' + k); } catch {} },
  };
  ZEN.ls = ls;

  // --- Toast ---
  const toast = (msg, type = 'info') => {
    let wrap = document.querySelector('.toast-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.className = 'toast-wrap';
      document.body.appendChild(wrap);
    }
    const el = document.createElement('div');
    el.className = 'toast ' + type;
    el.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i><span>${msg}</span>`;
    wrap.appendChild(el);
    setTimeout(() => { el.classList.add('fading'); setTimeout(() => el.remove(), 300); }, 2800);
  };
  ZEN.toast = toast;

  // --- Currency ---
  ZEN.fmt = (n) => 'Rs ' + Math.round(Number(n)).toLocaleString('en-PK');
  ZEN.currency = 'PKR';

  // --- Layout: build header + footer ---
  const navItem = (label, href, active) => `<a href="${href}"${active ? ' class="active"' : ''}>${label}</a>`;

  const buildHeader = (active) => {
    const cartCount = (ZEN.getCart ? ZEN.getCart() : []).reduce((a, b) => a + b.qty, 0);
    const user = ZEN.getUser ? ZEN.getUser() : null;
    return `
<header class="site-header">
  <div class="container">
    <a href="${url('')}" class="brand">
      <span class="brand-mark">Z</span>
      <span>Zen</span>
    </a>
    <nav class="nav-main" id="nav-main">
      ${navItem('Home',   url(''),       active === 'home')}
      ${navItem('Men',    url('men/'),   active === 'men')}
      ${navItem('Women',  url('women/'), active === 'women')}
      ${navItem('Sports', url('sports/'),active === 'sports')}
    </nav>
    <div class="nav-actions">
      <button class="icon-btn" id="search-btn" aria-label="Search"><i class="fas fa-search"></i></button>
      <a href="${url('cart/')}" class="icon-btn" aria-label="Cart">
        <i class="fas fa-shopping-bag"></i>
        <span class="cart-badge" data-count="${cartCount}">${cartCount || ''}</span>
      </a>
      <a href="${url(user ? 'account/profile/' : 'account/login/')}" class="icon-btn" aria-label="Account"><i class="fas fa-user"></i></a>
      <button class="icon-btn menu-toggle" id="menu-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
    </div>
  </div>
</header>
<div class="search-overlay" id="search-overlay">
  <div class="search-panel">
    <input type="text" id="search-input" placeholder="Search for shoes, brands, categories..." autocomplete="off">
    <div class="search-results" id="search-results"></div>
  </div>
</div>`;
  };

  const buildFooter = () => `
<footer class="site-footer">
  <div class="container">
    <div class="foot-grid">
      <div class="foot-brand">
        <a href="${url('')}" class="brand">
          <span class="brand-mark">Z</span>
          <span>Zen</span>
        </a>
        <p>Modern footwear for every step of your journey. Crafted to last, designed to inspire.</p>
        <div class="foot-socials">
          <a href="#" data-social="Facebook" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" data-social="Instagram" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
          <a href="#" data-social="Twitter" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" data-social="YouTube" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
      <div class="foot-col">
        <h4>Shop</h4>
        <a href="${url('men/')}">Men</a>
        <a href="${url('women/')}">Women</a>
        <a href="${url('sports/')}">Sports</a>
        <a href="${url('cart/')}">Cart</a>
      </div>
      <div class="foot-col">
        <h4>Account</h4>
        <a href="${url('account/login/')}">Sign In</a>
        <a href="${url('account/signup/')}">Create Account</a>
        <a href="${url('account/profile/')}">My Profile</a>
        <a href="${url('account/checkout/')}">Checkout</a>
      </div>
      <div class="foot-col">
        <h4>Help</h4>
        <a href="#" data-info="shipping">Shipping</a>
        <a href="#" data-info="returns">Returns</a>
        <a href="#" data-info="size-guide">Size Guide</a>
        <a href="#" data-info="contact">Contact</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© ${new Date().getFullYear()} Zen Store. All rights reserved.</span>
      <span>Crafted with care.</span>
    </div>
  </div>
</footer>`;

  // --- Wire up: search, mobile menu ---
  const wireHeader = () => {
    const menuBtn = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav-main');
    if (menuBtn) menuBtn.addEventListener('click', () => nav.classList.toggle('open'));

    const searchBtn = document.getElementById('search-btn');
    const overlay = document.getElementById('search-overlay');
    const input = document.getElementById('search-input');
    const results = document.getElementById('search-results');

    const openSearch = () => { overlay.classList.add('open'); setTimeout(() => input.focus(), 50); renderResults(''); };
    const closeSearch = () => { overlay.classList.remove('open'); input.value = ''; };

    if (searchBtn) searchBtn.addEventListener('click', openSearch);
    if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    const renderResults = (q) => {
      if (!ZEN.products) return;
      const term = q.trim().toLowerCase();
      const list = term
        ? ZEN.products.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.subcategory.includes(term) ||
            p.category.includes(term)
          ).slice(0, 8)
        : ZEN.products.slice(0, 6);
      if (!list.length) { results.innerHTML = '<div class="search-empty">No products match "' + q + '"</div>'; return; }
      results.innerHTML = list.map(p => `
        <a class="search-result" href="${url('product/?id=' + p.id)}">
          <img src="${url(p.image)}" alt="${p.name}">
          <div class="search-result-info">
            <strong>${p.name}</strong>
            <span>${cap(p.category)} · ${cap(p.subcategory.replace(/-/g, ' '))}</span>
          </div>
          <div class="search-result-price">${ZEN.fmt(p.price)}</div>
        </a>`).join('');
    };
    if (input) input.addEventListener('input', (e) => renderResults(e.target.value));
  };

  const wireFooter = () => {
    const infoText = {
      'shipping': 'Free shipping on orders over Rs 30,000. Standard delivery in 3–5 business days.',
      'returns': '30-day hassle-free returns. Items must be unworn with original packaging.',
      'size-guide': 'EU sizing. For best fit, measure your foot length and refer to our size chart.',
      'contact': 'Questions? Use the chat in the corner or email support@zenstore.example.',
    };
    document.querySelectorAll('a[data-info]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        toast(infoText[a.dataset.info] || 'Coming soon', 'info');
      });
    });
    document.querySelectorAll('a[data-social]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        toast('Follow us on ' + a.dataset.social + ' — link coming soon!', 'info');
      });
    });
  };

  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  ZEN.cap = cap;

  // --- Reveal on scroll ---
  const setupReveal = () => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('visible')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(e => io.observe(e));
  };

  // --- Chatbase chatbot ---
  const loadChatbase = () => {
    if (window.chatbase && window.chatbase('getState') === 'initialized') return;
    window.chatbase = (...args) => {
      if (!window.chatbase.q) window.chatbase.q = [];
      window.chatbase.q.push(args);
    };
    window.chatbase = new Proxy(window.chatbase, {
      get(t, p) { if (p === 'q') return t.q; return (...a) => t(p, ...a); }
    });
    const onLoad = () => {
      const s = document.createElement('script');
      s.src = 'https://www.chatbase.co/embed.min.js';
      s.id = 'unEJS8Y20W90Uwi1uxa9v';
      s.domain = 'www.chatbase.co';
      document.body.appendChild(s);
    };
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
  };

  // --- Favicon ---
  const setFavicon = () => {
    const href = url('assets/images/favicon.svg');
    let link = document.querySelector('link[rel~="icon"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.type = 'image/svg+xml';
    link.href = href;
  };

  // --- Image perf: lazy + async decode for all images ---
  const wireImagePerf = () => {
    const apply = (img) => {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
    };
    document.querySelectorAll('img').forEach(apply);
    const mo = new MutationObserver(muts => {
      muts.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType !== 1) return;
        if (n.tagName === 'IMG') apply(n);
        n.querySelectorAll && n.querySelectorAll('img').forEach(apply);
      }));
    });
    mo.observe(document.body, { childList: true, subtree: true });
  };

  // --- Init ---
  ZEN.initLayout = (active) => {
    setFavicon();
    document.body.insertAdjacentHTML('afterbegin', buildHeader(active));
    document.body.insertAdjacentHTML('beforeend', buildFooter());
    wireHeader();
    wireFooter();
    setupReveal();
    wireImagePerf();
    loadChatbase();
  };

  // Update cart badge
  ZEN.refreshCartBadge = (bump) => {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    const n = (ZEN.getCart ? ZEN.getCart() : []).reduce((a, b) => a + b.qty, 0);
    badge.dataset.count = n;
    badge.textContent = n || '';
    if (bump) { badge.classList.remove('bump'); void badge.offsetWidth; badge.classList.add('bump'); }
  };
})();
