/**
 * PREMIUM Zen AI Chat Widget (v4 - Live Handover)
 * Features: Session Persistence, Polling for Human Agents, Real-Time Handover
 */
(function () {
  const ZEN = (window.ZEN = window.ZEN || {});
  const API_BASE = "http://localhost:8000";

  // Persistent Session
  let sessionId = localStorage.getItem('zen_chat_session') || (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  localStorage.setItem('zen_chat_session', sessionId);

  let chatStatus = 'ai'; // ai, waiting, active
  let pollInterval = null;

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
          <span>Waiting for human agent...</span>
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
/* ... (existing styles from v3) ... */
#zen-ai-widget { position: fixed; bottom: 30px; right: 30px; z-index: 100000; font-family: 'Inter', sans-serif; }
.zen-orb { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #0f172a, #1e3a8a); border: none; cursor: pointer; position: relative; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.3); display: flex; align-items: center; justify-content: center; transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
.orb-content { color: white; font-size: 24px; z-index: 2; }
.orb-pulse { position: absolute; inset: 0; border-radius: 50%; border: 2px solid #3b82f6; opacity: 0; animation: orbPulse 2.5s infinite; }
@keyframes orbPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.6); opacity: 0; } }

.zen-chat-panel { position: absolute; bottom: 85px; right: 0; width: 380px; max-width: calc(100vw - 40px); height: 580px; display: none; border-radius: 24px; overflow: hidden; transform-origin: bottom right; }
.zen-chat-panel.active { display: block; animation: zenPanelOpen 0.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
@keyframes zenPanelOpen { from { opacity: 0; transform: translateY(30px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }

.zen-chat-glass { width: 100%; height: 100%; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(255, 255, 255, 0.4); display: flex; flex-direction: column; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); }
.zen-chat-header { padding: 24px; background: rgba(15, 23, 42, 0.03); border-bottom: 1px solid rgba(0, 0, 0, 0.05); display: flex; align-items: center; justify-content: space-between; }
.zen-user-info { display: flex; align-items: center; gap: 14px; }
.zen-avatar { width: 42px; height: 42px; background: #0f172a; border-radius: 12px; display: flex; align-items: center; justify-content: center; transform: rotate(-3deg); }
.zen-status-box strong { display: block; font-size: 15px; color: #0f172a; font-weight: 700; }
.zen-status-text { font-size: 11px; color: #10b981; display: flex; align-items: center; gap: 4px; font-weight: 600; text-transform: uppercase; }
.zen-status-text::before { content: ""; width: 6px; height: 6px; background: #10b981; border-radius: 50%; display: inline-block; animation: statusPulse 1.5s infinite; }
@keyframes statusPulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.4; } 100% { transform: scale(1); opacity: 1; } }

.zen-close-btn { background: none; border: none; color: #64748b; cursor: pointer; font-size: 20px; }
.zen-chat-body { flex: 1; padding: 24px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }
.zen-msg { max-width: 85%; padding: 14px 18px; font-size: 14px; line-height: 1.6; border-radius: 18px; position: relative; }
.zen-msg.bot, .zen-msg.agent { background: white; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
.zen-msg.agent { border-left: 4px solid #3b82f6; }
.zen-msg.user { background: #0f172a; color: white; align-self: flex-end; border-bottom-right-radius: 4px; box-shadow: 0 8px 20px rgba(15, 23, 42, 0.2); }
.fade-in { animation: zenFadeUp 0.4s ease forwards; }
@keyframes zenFadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.zen-chat-footer { padding: 20px 24px; background: rgba(255, 255, 255, 0.5); border-top: 1px solid rgba(0, 0, 0, 0.05); }
.zen-waiting-box { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; color: #1e3a8a; font-size: 12px; font-weight: 600; }
.zen-pulse-loader { width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; animation: zenPulseWait 1s infinite alternate; }
@keyframes zenPulseWait { from { opacity: 0.3; transform: scale(0.8); } to { opacity: 1; transform: scale(1.2); } }

.zen-input-area { display: flex; align-items: center; background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 4px 6px 4px 16px; }
.zen-input-area input { flex: 1; border: none; outline: none; font-size: 14px; padding: 10px 0; background: transparent; }
.zen-send-btn { width: 38px; height: 38px; background: #0f172a; color: white; border: none; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; }

.typing { display: flex; gap: 4px; padding: 6px 0; }
.typing span { width: 5px; height: 5px; background: #94a3b8; border-radius: 50%; animation: zenTyping 1.4s infinite; }
.typing span:nth-child(2) { animation-delay: 0.2s; }
.typing span:nth-child(3) { animation-delay: 0.4s; }
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
    const headerTitle = document.getElementById('zen-header-title');
    const headerStatus = document.getElementById('zen-header-status');
    const headerIcon = document.getElementById('zen-header-icon');

    orb.addEventListener('click', () => {
      panel.classList.toggle('active');
      if (panel.classList.contains('active')) {
        input.focus();
        body.scrollTop = body.scrollHeight;
      }
    });

    closeBtn.addEventListener('click', () => panel.classList.remove('active'));

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      appendMessage(text, 'user');
      input.value = '';

      const typing = appendTyping();
      
      try {
        const response = await fetch(`${API_BASE}/ask`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, question: text })
        });

        const data = await response.json();
        typing.remove();

        if (data.answer) {
          appendMessage(data.answer, 'bot');
        }

        if (data.status === 'waiting' || data.status === 'active') {
          enterWaitingMode(data.status);
        }
      } catch (err) {
        typing.remove();
        appendMessage("I'm momentarily disconnected. Please check back in a few seconds.", 'bot');
      }
    });

    function enterWaitingMode(status) {
      chatStatus = status;
      waitingUI.style.display = 'flex';
      headerStatus.innerText = status === 'waiting' ? 'Waiting for Agent' : 'Live with Agent';
      headerStatus.style.color = status === 'waiting' ? '#3b82f6' : '#10b981';
      
      if (status === 'active') {
        headerTitle.innerText = "Zen Live Support";
        headerIcon.className = "fas fa-user-headset";
      }

      if (!pollInterval) {
        pollInterval = setInterval(pollForMessages, 3000);
      }
    }

    async function pollForMessages() {
      try {
        const response = await fetch(`${API_BASE}/poll/${sessionId}`);
        const newMsgs = await response.json();
        
        if (newMsgs.length > 0) {
          newMsgs.forEach(m => {
            appendMessage(m.content, 'agent');
            // If we got an agent message, update UI to active
            if (chatStatus !== 'active') {
              enterWaitingMode('active');
            }
          });
          body.scrollTop = body.scrollHeight;
        }
      } catch (e) {
        console.error("Polling error", e);
      }
    }

    function appendMessage(text, type) {
      const div = document.createElement('div');
      div.className = `zen-msg ${type} fade-in`;
      div.innerText = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function appendTyping() {
      const div = document.createElement('div');
      div.className = 'zen-msg bot fade-in';
      div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
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
