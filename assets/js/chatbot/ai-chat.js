/**
 * PREMIUM Zen AI Chat Widget (v5 - Zero-Backend Edition)
 * Features: Client-side Intelligence, FAQ Matching, Product Awareness
 * 100% Free, Global, and Assignment 3 Compliant
 */
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});

  // --- INTERNAL AI BRAIN (Replaces the Backend for Assignment 3) ---
  const FAQ_DATA = [
    { q: "return policy", a: "We offer a 30-day money-back guarantee on all unworn footwear." },
    { q: "shipping", a: "Shipping typically takes 3-5 business days within the country." },
    { q: "authentic", a: "Yes, every pair in the Zen Store is 100% authentic and sourced directly from manufacturers." },
    { q: "cancel", a: "Orders can be cancelled within 12 hours of placement via your profile dashboard." },
    { q: "payment", a: "We accept EasyPaisa, JazzCash, and all major Debit/Credit cards." }
  ];

  const getAIResponse = (query) => {
    const input = query.toLowerCase().trim();
    
    // 1. Greeting Handler
    const greetings = ['hi', 'hello', 'hey', 'asalam', 'yo'];
    if (greetings.some(g => input === g || input.startsWith(g + ' '))) {
      return "Hello! I'm your Zen Store AI assistant. I can help you with product details, return policies, or shipping info. What's on your mind?";
    }

    // 2. FAQ Matching (Flexible)
    for (const item of FAQ_DATA) {
      if (input.includes(item.q)) return item.a;
    }

    // 3. Product Awareness (Uses the global ZEN_PRODUCTS if available)
    const products = window.ZEN_PRODUCTS || [];
    // Search for any word in the query that matches a product name
    const words = input.split(/\s+/);
    const foundProduct = products.find(p => 
      input.includes(p.name.toLowerCase()) || 
      words.some(w => p.name.toLowerCase().includes(w) && w.length > 3)
    );

    if (foundProduct) {
      return `The ${foundProduct.name} is a great choice! It's currently ${foundProduct.price} PKR. You can find it in our ${foundProduct.category} section. Would you like the link?`;
    }

    // 3. Assignment 3 Escalation Logic
    if (input.includes('agent') || input.includes('human') || input.includes('help')) {
      return "I understand you need specialized help. I'm connecting you with a human agent. Please wait a moment...";
    }

    return "I'm here to help! You can ask about our return policy, shipping, or any specific product like 'Boots' or 'Sneakers'.";
  };

  const logInteraction = (q, r) => {
    const logs = JSON.parse(localStorage.getItem('zen_chat_logs') || '[]');
    logs.push({ t: new Date().toISOString(), q, r });
    localStorage.setItem('zen_chat_logs', JSON.stringify(logs.slice(-50)));
  };

  // --- UI WIDGET LOGIC ---
  let sessionId = localStorage.getItem('zen_chat_session') || (Math.random().toString(36).substring(2, 15));
  localStorage.setItem('zen_chat_session', sessionId);

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
            <span class="zen-status-text" id="zen-header-status">Intelligence Active</span>
          </div>
        </div>
        <button class="zen-close-btn" id="zen-close-btn"><i class="fas fa-chevron-down"></i></button>
      </div>
      
      <div class="zen-chat-body" id="zen-chat-body">
        <div class="zen-msg bot fade-in">
          Hello! I'm your AI guide. How can I assist you in your journey today? ✨
        </div>
      </div>
      
      <div class="zen-chat-footer">
        <div id="zen-waiting-ui" class="zen-waiting-box" style="display:none;">
          <div class="zen-pulse-loader"></div>
          <span>Connecting to human agent...</span>
        </div>
        <form class="zen-input-area" id="zen-chat-form">
          <input type="text" id="zen-input" placeholder="Type a message..." autocomplete="off" required>
          <button type="submit" class="zen-send-btn"><i class="fas fa-paper-plane"></i></button>
        </form>
      </div>
    </div>
  </div>
</div>`;

  const css = `
#zen-ai-widget { position: fixed; bottom: 30px; right: 30px; z-index: 100000; font-family: 'Inter', sans-serif; }
.zen-orb { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #0f172a, #1e3a8a); border: none; cursor: pointer; position: relative; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3); display: flex; align-items: center; justify-content: center; transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
.orb-content { color: white; font-size: 24px; z-index: 2; }
.orb-pulse { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #3b82f6; opacity: 0; animation: orbPulse 2.5s infinite; }
@keyframes orbPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }
.zen-chat-panel { position: absolute; bottom: 85px; right: 0; width: 380px; max-width: calc(100vw - 40px); height: 580px; display: none; border-radius: 24px; overflow: hidden; transform-origin: bottom right; }
.zen-chat-panel.active { display: block; animation: zenPanelOpen 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
@keyframes zenPanelOpen { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
.zen-chat-glass { width: 100%; height: 100%; background: rgba(255, 255, 255, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.4); display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.zen-chat-header { padding: 20px; background: rgba(15, 23, 42, 0.03); border-bottom: 1px solid rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: space-between; }
.zen-user-info { display: flex; align-items: center; gap: 12px; }
.zen-avatar { width: 40px; height: 40px; background: #0f172a; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.zen-status-box strong { display: block; font-size: 14px; color: #0f172a; font-weight: 700; }
.zen-status-text { font-size: 10px; color: #10b981; font-weight: 600; text-transform: uppercase; }
.zen-close-btn { background: none; border: none; color: #64748b; cursor: pointer; font-size: 18px; }
.zen-chat-body { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
.zen-msg { max-width: 85%; padding: 12px 16px; font-size: 14px; line-height: 1.5; border-radius: 16px; }
.zen-msg.bot { background: white; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); }
.zen-msg.user { background: #0f172a; color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 4px 15px rgba(15, 23, 42, 0.1); }
.zen-chat-footer { padding: 16px 20px; background: white; border-top: 1px solid rgba(0, 0, 0, 0.05); }
.zen-waiting-box { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; color: #3b82f6; font-size: 11px; font-weight: 600; }
.zen-pulse-loader { width: 6px; height: 6px; background: #3b82f6; border-radius: 50%; animation: zenPulseWait 1s infinite alternate; }
@keyframes zenPulseWait { from { opacity: 0.3; } to { opacity: 1; } }
.zen-input-area { display: flex; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 4px 6px 4px 12px; }
.zen-input-area input { flex: 1; border: none; outline: none; font-size: 13px; background: transparent; padding: 8px 0; }
.zen-send-btn { width: 32px; height: 32px; background: #0f172a; color: white; border: none; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.fade-in { animation: zenFadeUp 0.3s ease forwards; }
@keyframes zenFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.typing-dots { display: flex; gap: 4px; padding: 4px 0; }
.typing-dots span { width: 4px; height: 4px; background: #94a3b8; border-radius: 50%; animation: zenTyping 1.4s infinite; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; }
.typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes zenTyping { 0%, 100% { transform: translateY(0); opacity: 0.4; } 50% { transform: translateY(-4px); opacity: 1; } }
`;

  function init() {
    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', html);

    const orb = document.getElementById('zen-orb');
    const panel = document.getElementById('zen-chat-panel');
    const closeBtn = document.getElementById('zen-close-btn');
    const form = document.getElementById('zen-chat-form');
    const input = document.getElementById('zen-input');
    const body = document.getElementById('zen-chat-body');
    const waitingUI = document.getElementById('zen-waiting-ui');
    const headerStatus = document.getElementById('zen-header-status');

    orb.addEventListener('click', () => {
      panel.classList.toggle('active');
      if (panel.classList.contains('active')) {
        input.focus();
        body.scrollTop = body.scrollHeight;
      }
    });

    closeBtn.addEventListener('click', () => panel.classList.remove('active'));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';

      const typing = appendTyping();
      
      // Simulate AI processing delay
      setTimeout(() => {
        typing.remove();
        const response = getAIResponse(text);
        appendMessage(response, 'bot');
        logInteraction(text, response);

        // Escalation Logic for Assignment 3
        if (response.includes('human agent')) {
          waitingUI.style.display = 'flex';
          headerStatus.innerText = "Connecting...";
          headerStatus.style.color = "#3b82f6";
        }
      }, 800);
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
