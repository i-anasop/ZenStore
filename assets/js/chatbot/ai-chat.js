/**
 * PREMIUM Zen AI Chat Widget (v6 - Industrial Transformers.js Edition)
 * Features: True Semantic Intelligence, Local Vector Embeddings, Global & Free
 * Model: Xenova/all-MiniLM-L6-v2 (Industry Standard)
 */
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  // --- INDUSTRIAL AI KNOWLEDGE ---
  const FAQ_DATA = [
    { q: "What is your return policy?", a: "We offer a 30-day money-back guarantee on all unworn footwear. Returns are processed within 5 business days." },
    { q: "How long does shipping take?", a: "Shipping typically takes 3-5 business days. You will receive a tracking number via email once shipped." },
    { q: "Are your shoes authentic?", a: "Every pair in the Zen Store is 100% authentic, sourced directly from official manufacturers." },
    { q: "Can I cancel my order?", a: "Orders can be cancelled within 12 hours. Please visit your dashboard or contact support for assistance." },
    { q: "What payment methods do you accept?", a: "We support EasyPaisa, JazzCash, and all major Debit/Credit cards for a secure checkout experience." }
  ];

  // --- TRANSFORMERS.JS INTEGRATION ---
  let pipeline = null;
  let faqEmbeddings = [];

  const loadAI = async () => {
    if (pipeline) return;
    
    // Load Transformers.js from CDN
    const { pipeline: getPipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1');
    
    // Initialize Semantic Extraction Pipeline
    pipeline = await getPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    
    // Pre-calculate FAQ Embeddings for instant matching
    for (const item of FAQ_DATA) {
      const output = await pipeline(item.q, { pooling: 'mean', normalize: true });
      faqEmbeddings.push({ ...item, vector: output.data });
    }
    console.log("Zen AI: Intelligence Layer Fully Initialized.");
  };

  const cosineSimilarity = (v1, v2) => {
    let dotProduct = 0;
    for (let i = 0; i < v1.length; i++) dotProduct += v1[i] * v2[i];
    return dotProduct; // Vectors are normalized, so dot product = cosine similarity
  };

  const turboMatch = (input) => {
    // Greetings
    if (['hi', 'hello', 'hey', 'sup', 'yo'].some(g => input === g || input.startsWith(g + ' '))) {
      return "Hello! I'm your Zen Store AI assistant. I'm currently loading my deep intelligence layer, but I can already help you with product info and policies. What can I do for you?";
    }
    
    // Product Quick-Check
    const products = window.ZEN_PRODUCTS || [];
    const found = products.find(p => input.includes(p.name.toLowerCase()) || input.includes(p.category.toLowerCase()));
    if (found) {
      return `We have a great selection of ${found.category}! For example, the ${found.name} is very popular right now. You can check it out in our store!`;
    }

    // Policy Quick-Check
    if (input.includes('return') || input.includes('money')) return "We offer a 30-day money-back guarantee on all unworn footwear. No questions asked!";
    if (input.includes('shipping') || input.includes('delivery')) return "Standard shipping takes 3-5 business days. We provide tracking for all orders.";
    
    return null;
  };

  const getAIResponse = async (query) => {
    const input = query.toLowerCase().trim();
    
    // 1. Turbo Match (Instant)
    const quickReply = turboMatch(input);
    if (quickReply) return quickReply;

    // 2. Deep Semantic Match (Requires loading)
    if (!pipeline) {
      try { await loadAI(); } catch(e) { return "I'm still waking up my brain. Could you ask me about sneakers or our return policy in the meantime?"; }
    }

    // 2. Fallback to Product Aware Keyword Matching (for speed)
    const input = query.toLowerCase();
    const products = window.ZEN_PRODUCTS || [];
    const foundProduct = products.find(p => input.includes(p.name.toLowerCase()));
    if (foundProduct) {
      return `The ${foundProduct.name} is currently available for ${foundProduct.price} PKR in our ${foundProduct.category} section. It is one of our best-sellers!`;
    }

    // 3. Escalation
    if (highestScore < 0.4 || input.includes('agent') || input.includes('human')) {
      return "I'm not exactly sure about that, but I can connect you with a human agent for more specific details. Would you like to proceed?";
    }

    return "I'm your Zen Store AI assistant. I specialize in footwear, shipping, and order inquiries. How can I help you today?";
  };

  // --- UI & LOGGING (Condensed) ---
  const logInteraction = (q, r) => {
    const logs = JSON.parse(localStorage.getItem('zen_chat_logs') || '[]');
    logs.push({ t: new Date().toISOString(), q, r });
    localStorage.setItem('zen_chat_logs', JSON.stringify(logs.slice(-50)));
  };

  const html = `
<div id="zen-ai-widget">
  <button class="zen-orb" id="zen-orb" aria-label="Open support">
    <div class="orb-content"><i class="fas fa-comment-dots"></i></div>
    <div class="orb-pulse"></div>
  </button>
  
  <div class="zen-chat-panel" id="zen-chat-panel">
    <div class="zen-chat-glass">
      <div class="zen-chat-header">
        <div class="zen-user-info">
          <div class="zen-avatar"><i class="fas fa-robot" id="zen-header-icon" style="color:white; font-size: 18px;"></i></div>
          <div class="zen-status-box">
            <strong id="zen-header-title">Zen Assistant</strong>
            <span class="zen-status-text" id="zen-header-status">Initializing AI...</span>
          </div>
        </div>
        <button class="zen-close-btn" id="zen-close-btn"><i class="fas fa-chevron-down"></i></button>
      </div>
      
      <div class="zen-chat-body" id="zen-chat-body">
        <div class="zen-msg bot fade-in" id="zen-welcome-msg">
          Loading my intelligence layer... Please wait a moment. ✨
        </div>
      </div>
      
      <div class="zen-chat-footer">
        <div id="zen-waiting-ui" class="zen-waiting-box" style="display:none;">
          <div class="zen-pulse-loader"></div>
          <span>Escalating to human agent...</span>
        </div>
        <form class="zen-input-area" id="zen-chat-form">
          <input type="text" id="zen-input" placeholder="Ask anything..." autocomplete="off" required disabled>
          <button type="submit" id="zen-send-btn" class="zen-send-btn" disabled><i class="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  </div>
</div>`;

  const css = `
#zen-ai-widget { position: fixed; bottom: 30px; right: 30px; z-index: 100000; font-family: 'Inter', sans-serif; }
.zen-orb { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #0f172a, #1e3a8a); border: none; cursor: pointer; position: relative; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3); display: flex; align-items: center; justify-content: center; }
.orb-content { color: white; font-size: 24px; z-index: 2; }
.orb-pulse { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #3b82f6; opacity: 0; animation: orbPulse 2.5s infinite; }
@keyframes orbPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
.zen-chat-panel { position: absolute; bottom: 85px; right: 0; width: 380px; max-width: calc(100vw - 40px); height: 580px; display: none; border-radius: 24px; overflow: hidden; transform-origin: bottom right; }
.zen-chat-panel.active { display: block; animation: zenPanelOpen 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
@keyframes zenPanelOpen { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
.zen-chat-glass { width: 100%; height: 100%; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.zen-chat-header { padding: 20px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: space-between; }
.zen-user-info { display: flex; align-items: center; gap: 12px; }
.zen-avatar { width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.zen-status-box strong { display: block; font-size: 14px; font-weight: 700; }
.zen-status-text { font-size: 10px; color: #10b981; font-weight: 600; text-transform: uppercase; }
.zen-close-btn { background: none; border: none; color: white; cursor: pointer; font-size: 18px; opacity: 0.7; }
.zen-chat-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.zen-msg { max-width: 85%; padding: 12px 16px; font-size: 14px; line-height: 1.5; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
.zen-msg.bot { background: white; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; }
.zen-msg.user { background: #0f172a; color: white; align-self: flex-end; border-bottom-right-radius: 4px; }
.zen-chat-footer { padding: 16px 20px; background: white; border-top: 1px solid rgba(0, 0, 0, 0.05); }
.zen-input-area { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 4px 6px 4px 12px; }
.zen-input-area input { flex: 1; border: none; outline: none; font-size: 13px; background: transparent; padding: 8px 0; }
.zen-send-btn { width: 32px; height: 32px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.zen-send-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.fade-in { animation: zenFadeUp 0.3s ease forwards; }
@keyframes zenFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.typing-dots { display: flex; gap: 4px; padding: 4px 0; }
.typing-dots span { width: 4px; height: 4px; background: #94a3b8; border-radius: 50%; animation: zenTyping 1.4s infinite; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes zenTyping { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
`;

  async function init() {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', html);

    const orb = document.getElementById('zen-orb');
    const panel = document.getElementById('zen-chat-panel');
    const form = document.getElementById('zen-chat-form');
    const input = document.getElementById('zen-input');
    const sendBtn = document.getElementById('zen-send-btn');
    const body = document.getElementById('zen-chat-body');
    const headerStatus = document.getElementById('zen-header-status');
    const welcomeMsg = document.getElementById('zen-welcome-msg');

    orb.addEventListener('click', () => {
      panel.classList.toggle('active');
      if (panel.classList.contains('active')) {
        input.focus();
        body.scrollTop = body.scrollHeight;
      }
    });

    document.getElementById('zen-close-btn').addEventListener('click', () => panel.classList.remove('active'));

    // --- AUTO-LOAD AI ---
    try {
      await loadAI();
      headerStatus.innerText = "Intelligence Active";
      welcomeMsg.innerText = "Intelligence Layer Loaded. I'm ready to assist you! ✨";
      input.disabled = false;
      sendBtn.disabled = false;
    } catch (e) {
      headerStatus.innerText = "Local Mode";
      welcomeMsg.innerText = "Hello! I'm here to help with your footwear journey.";
      input.disabled = false;
      sendBtn.disabled = false;
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';

      const typing = appendTyping();
      
      try {
        const response = await getAIResponse(text);
        typing.remove();
        appendMessage(response, 'bot');
        logInteraction(text, response);
      } catch (err) {
        typing.remove();
        appendMessage("I had a small glitch in my semantic processor. Could you repeat that?", 'bot');
      }
    });

    function appendMessage(text, type) {
      const div = document.createElement('div');
      div.className = `zen-msg ${type} fade-in`;
      div.innerText = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
    }

    function appendTyping() {
      const div = document.createElement('div');
      div.className = 'zen-msg bot fade-in';
      div.innerHTML = `<div class="typing-dots"><span></span><span></span><span></span></div>`;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
