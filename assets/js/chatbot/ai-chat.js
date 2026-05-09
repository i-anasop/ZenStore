/**
 * PREMIUM Zen AI Chat Widget (v7 - Industrial Transformers.js Edition)
 * Features: True Semantic Intelligence, Local Vector Embeddings, Global & Free
 */
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  const FAQ_DATA = [
    { q: "What is your return policy?", a: "We offer a 30-day money-back guarantee on all unworn footwear. Returns are processed within 5 business days." },
    { q: "How long does shipping take?", a: "Shipping typically takes 3-5 business days. You will receive a tracking number via email once shipped." },
    { q: "Are your shoes authentic?", a: "Every pair in the Zen Store is 100% authentic, sourced directly from official manufacturers." },
    { q: "Can I cancel my order?", a: "Orders can be cancelled within 12 hours. Please visit your dashboard or contact support for assistance." },
    { q: "What payment methods do you accept?", a: "We support EasyPaisa, JazzCash, and all major Debit/Credit cards for a secure checkout experience." }
  ];

  let pipeline = null;
  let faqEmbeddings = [];

  const loadAI = async () => {
    if (pipeline) return;
    const { pipeline: getPipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1');
    pipeline = await getPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    for (const item of FAQ_DATA) {
      const output = await pipeline(item.q, { pooling: 'mean', normalize: true });
      faqEmbeddings.push({ ...item, vector: output.data });
    }
  };

  const cosineSimilarity = (v1, v2) => {
    let dotProduct = 0;
    for (let i = 0; i < v1.length; i++) dotProduct += v1[i] * v2[i];
    return dotProduct;
  };

  const turboMatch = (input) => {
    if (['hi', 'hello', 'hey', 'sup', 'yo'].some(g => input === g || input.startsWith(g + ' '))) {
      return "Hello! I'm your Zen Store AI assistant. How can I help you today?";
    }
    const products = window.ZEN_PRODUCTS || [];
    const found = products.find(p => input.includes(p.name.toLowerCase()) || input.includes(p.category.toLowerCase()));
    if (found) {
      return `The ${found.name} is a great choice! It's currently ${found.price} PKR in our ${found.category} section. Would you like to know more?`;
    }
    if (input.includes('return') || input.includes('money')) return "We offer a 30-day money-back guarantee on all unworn footwear.";
    if (input.includes('shipping')) return "Standard shipping takes 3-5 business days.";
    return null;
  };

  const getAIResponse = async (query) => {
    const input = query.toLowerCase().trim();
    const quick = turboMatch(input);
    if (quick) return quick;

    if (!pipeline) {
      try { await loadAI(); } catch(e) { return "I'm still loading my intelligence. Try asking about our products or returns!"; }
    }

    const inputVector = (await pipeline(query, { pooling: 'mean', normalize: true })).data;
    let highestScore = -1;
    let bestMatch = null;

    for (const item of faqEmbeddings) {
      const score = cosineSimilarity(inputVector, item.vector);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (highestScore > 0.6) return bestMatch.a;
    if (input.includes('agent') || input.includes('human')) return "I'll connect you with a human agent for more help. Please wait!";
    
    return "I'm here to help with your shoe shopping! You can ask about our boots, sneakers, or return policies.";
  };

  const html = `
<div id="zen-ai-widget">
  <button class="zen-orb" id="zen-orb">
    <div class="orb-content"><i class="fas fa-comment-dots"></i></div>
  </button>
  <div class="zen-chat-panel" id="zen-chat-panel">
    <div class="zen-chat-glass">
      <div class="zen-chat-header">
        <strong>Zen Assistant</strong>
        <button id="zen-close-btn" style="color:white; background:none; border:none; cursor:pointer;">&times;</button>
      </div>
      <div class="zen-chat-body" id="zen-chat-body">
        <div class="zen-msg bot">Hi! I'm loading my brain... Ask me anything about sneakers or boots!</div>
      </div>
      <form class="zen-chat-footer" id="zen-chat-form" style="padding:15px; background:white; display:flex;">
        <input type="text" id="zen-input" placeholder="Type..." style="flex:1; border:1px solid #eee; padding:8px; border-radius:8px;">
        <button type="submit" style="margin-left:8px; background:#0f172a; color:white; border:none; border-radius:8px; padding:0 12px;">Send</button>
      </form>
    </div>
  </div>
</div>`;

  const css = `
#zen-ai-widget { position: fixed; bottom: 30px; right: 30px; z-index: 999999; font-family: sans-serif; }
.zen-orb { width: 60px; height: 60px; border-radius: 50%; background: #0f172a; color: white; border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
.zen-chat-panel { position: absolute; bottom: 70px; right: 0; width: 350px; height: 500px; display: none; flex-direction: column; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.2); }
.zen-chat-panel.active { display: flex; }
.zen-chat-glass { height: 100%; display: flex; flex-direction: column; background: #f8fafc; }
.zen-chat-header { background: #0f172a; color: white; padding: 15px; display: flex; justify-content: space-between; align-items: center; }
.zen-chat-body { flex: 1; padding: 15px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
.zen-msg { padding: 10px 14px; border-radius: 12px; font-size: 14px; max-width: 80%; }
.zen-msg.bot { background: white; align-self: flex-start; }
.zen-msg.user { background: #0f172a; color: white; align-self: flex-end; }
`;

  function init() {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', html);
    const orb = document.getElementById('zen-orb');
    const panel = document.getElementById('zen-chat-panel');
    const form = document.getElementById('zen-chat-form');
    const input = document.getElementById('zen-input');
    const body = document.getElementById('zen-chat-body');
    orb.onclick = () => panel.classList.toggle('active');
    document.getElementById('zen-close-btn').onclick = () => panel.classList.remove('active');
    form.onsubmit = async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      const uMsg = document.createElement('div'); uMsg.className = 'zen-msg user'; uMsg.innerText = text; body.appendChild(uMsg);
      input.value = ''; body.scrollTop = body.scrollHeight;
      const response = await getAIResponse(text);
      const bMsg = document.createElement('div'); bMsg.className = 'zen-msg bot'; bMsg.innerText = response; body.appendChild(bMsg);
      body.scrollTop = body.scrollHeight;
    };
    loadAI();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
