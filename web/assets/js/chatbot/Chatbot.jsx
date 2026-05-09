import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, ChevronDown, User, Bot, Headset, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * PREMIUM Zen AI Chatbot (v4 - Live Handover)
 * Features: Session Persistence, Polling for Agent, Real-Time Handover
 */

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('zen_chat_session');
    if (saved) return saved;
    const newId = Math.random().toString(36).substring(7);
    localStorage.setItem('zen_chat_session', newId);
    return newId;
  });

  const [status, setStatus] = useState('ai'); // ai, waiting, active
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hello! I'm your AI guide. How can I assist you in your journey today? ✨" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Polling for Agent Messages
  useEffect(() => {
    let interval;
    if (status === 'waiting' || status === 'active') {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`http://localhost:8000/poll/${sessionId}`);
          const data = await res.json();
          if (data.length > 0) {
            data.forEach(m => {
              setMessages(prev => [...prev, { role: 'agent', content: m.content }]);
            });
            setStatus('active');
          }
        } catch (e) {
          console.error("Polling failed");
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status, sessionId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, question: userMessage })
      });

      const data = await response.json();
      
      if (data.answer) {
        setMessages(prev => [...prev, { role: 'bot', content: data.answer }]);
      }

      if (data.status === 'waiting' || data.status === 'active') {
        setStatus(data.status);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "I'm having a brief moment of silence (server offline). Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 100000, fontFamily: 'Inter, sans-serif' }}>
      {/* Orb Launcher */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
          color: 'white', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.3)',
          position: 'relative'
        }}
      >
        <MessageSquare size={24} />
        {!isOpen && (
           <motion.div
             animate={{ scale: [1, 1.6], opacity: [0.8, 0] }}
             transition={{ duration: 2.5, repeat: Infinity }}
             style={{ position: 'absolute', inset: 0, border: '2px solid #3b82f6', borderRadius: '50%' }}
           />
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            style={{
              position: 'absolute', bottom: '85px', right: 0,
              width: '380px', height: '580px', 
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              display: 'flex', flexDirection: 'column', overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ padding: '24px', background: 'rgba(15, 23, 42, 0.03)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', background: '#0f172a', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(-3deg)' }}>
                  {status === 'active' ? <Headset size={22} color="white" /> : <Bot size={22} color="white" />}
                </div>
                <div>
                  <div style={{ fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>
                    {status === 'active' ? 'Zen Live Support' : 'Zen Assistant'}
                  </div>
                  <div style={{ fontSize: '11px', color: status === 'active' ? '#10b981' : '#3b82f6', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {status === 'ai' ? 'Intelligence Active' : status === 'waiting' ? 'Waiting for Agent' : 'Live with Agent'}
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><ChevronDown size={20} /></button>
            </div>

            {/* Messages Area */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '85%', padding: '14px 18px', borderRadius: '18px',
                    fontSize: '14px', lineHeight: '1.6',
                    background: msg.role === 'user' ? '#0f172a' : 'white',
                    color: msg.role === 'user' ? 'white' : '#1e293b',
                    boxShadow: msg.role === 'user' ? '0 8px 20px rgba(15, 23, 42, 0.2)' : '0 4px 15px rgba(0,0,0,0.03)',
                    borderLeft: msg.role === 'agent' ? '4px solid #3b82f6' : 'none',
                    borderBottomLeftRadius: msg.role === 'user' ? '18px' : '4px',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px'
                  }}
                >
                  {msg.content}
                </motion.div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: 'white', padding: '14px 18px', borderRadius: '18px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                        style={{ width: '5px', height: '5px', background: '#94a3b8', borderRadius: '50%' }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 24px', background: 'rgba(255, 255, 255, 0.5)', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
              {status === 'waiting' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', color: '#1e3a8a', fontSize: '12px', fontWeight: '600' }}>
                  <Loader2 className="animate-spin" size={14} />
                  <span>Waiting for human agent...</span>
                </motion.div>
              )}
              <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '4px 6px 4px 16px' }}>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  style={{ flex: 1, border: 'none', outline: 'none', fontSzie: '14px', padding: '10px 0', background: 'transparent' }}
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  style={{ width: '38px', height: '38px', background: '#0f172a', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
