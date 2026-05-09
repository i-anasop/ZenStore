"""
AI-Powered Customer Support Backend (v4 - Real-Time Handover)
============================================================
Features:
  - NLP Intent Matching + Product Knowledge
  - Real-Time Escalation & Handover System
  - Polling API for Human Agent Responses
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3, datetime, json, os, re, uuid
import torch
from sentence_transformers import SentenceTransformer, util

app = FastAPI(title="Zen Live Support API", version="4.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Configuration ────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(__file__)
FAQ_PATH = os.path.join(BASE_DIR, "faq_dataset.json")
PROD_PATH = os.path.join(BASE_DIR, "products.json")
DB_PATH = os.path.join(BASE_DIR, "chatbot.db")

# ─── Load Data & Model ────────────────────────────────────────────────────────
with open(FAQ_PATH, "r", encoding="utf-8") as f:
    FAQ_DATA = json.load(f)
with open(PROD_PATH, "r", encoding="utf-8") as f:
    PROD_DATA = json.load(f)

print("Initializing Intelligence Layer...")
model = SentenceTransformer('all-MiniLM-L6-v2')

FAQ_EXAMPLES = []
FAQ_RESPONSES = []
FAQ_INTENTS = []

for entry in FAQ_DATA:
    for example in entry["examples"]:
        FAQ_EXAMPLES.append(example)
        FAQ_RESPONSES.append(entry["response"])
        FAQ_INTENTS.append(entry["intent"])

for p in PROD_DATA:
    FAQ_EXAMPLES.append(f"Do you have {p['name']}?")
    FAQ_RESPONSES.append(f"Yes, we have the **{p['name']}**! It's in our {p['category']} collection for Rs {p['price']:,}.")
    FAQ_INTENTS.append(f"product_{p['id']}")

EXAMPLE_EMBEDDINGS = model.encode(FAQ_EXAMPLES, convert_to_tensor=True)

# ─── Database with Message History ───────────────────────────────────────────
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute("""CREATE TABLE IF NOT EXISTS messages (
        id         INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT    NOT NULL,
        sender     TEXT    NOT NULL, -- 'user', 'bot', 'agent'
        content    TEXT    NOT NULL,
        timestamp  TEXT    NOT NULL,
        is_read    INTEGER DEFAULT 0
    )""")
    conn.execute("""CREATE TABLE IF NOT EXISTS sessions (
        session_id TEXT PRIMARY KEY,
        status     TEXT DEFAULT 'ai', -- 'ai', 'waiting', 'active'
        last_activity TEXT
    )""")
    conn.commit()
    return conn

# ─── Request Models ──────────────────────────────────────────────────────────
class AskRequest(BaseModel):
    session_id: str
    question: str

class ReplyRequest(BaseModel):
    session_id: str
    content: str

# ─── Logic ───────────────────────────────────────────────────────────────────
def get_ai_response(question: str):
    q_emb = model.encode(question, convert_to_tensor=True)
    scores = util.cos_sim(q_emb, EXAMPLE_EMBEDDINGS)[0]
    best_score = torch.max(scores).item()
    best_idx = torch.argmax(scores).item()
    
    is_frustrated = any(w in question.lower() for w in ["human", "agent", "bad", "sucks", "help", "speak"])
    should_escalate = is_frustrated or (best_score < 0.45)
    
    return {
        "answer": FAQ_RESPONSES[best_idx],
        "intent": FAQ_INTENTS[best_idx],
        "confidence": best_score,
        "escalated": should_escalate
    }

# ─── Endpoints ────────────────────────────────────────────────────────────────

@app.post("/ask")
async def ask(req: AskRequest):
    db = get_db()
    # Check session status
    session = db.execute("SELECT status FROM sessions WHERE session_id = ?", (req.session_id,)).fetchone()
    if not session:
        db.execute("INSERT INTO sessions (session_id, status, last_activity) VALUES (?, 'ai', ?)", (req.session_id, datetime.datetime.utcnow().isoformat()))
        status = 'ai'
    else:
        status = session[0]

    # Log user message
    db.execute("INSERT INTO messages (session_id, sender, content, timestamp) VALUES (?, 'user', ?, ?)", 
               (req.session_id, req.question, datetime.datetime.utcnow().isoformat()))

    # If already escalated/waiting, don't auto-respond
    if status == 'waiting' or status == 'active':
        db.commit()
        db.close()
        return {"answer": None, "status": status, "message": "Waiting for human agent..."}

    # Get AI Response
    ai = get_ai_response(req.question)
    
    if ai["escalated"]:
        db.execute("UPDATE sessions SET status = 'waiting' WHERE session_id = ?", (req.session_id,))
        final_answer = "I'm connecting you to a human agent for better assistance. Please hold on... 🎧"
        final_status = "waiting"
    else:
        final_answer = ai["answer"]
        final_status = "ai"

    # Log bot response
    db.execute("INSERT INTO messages (session_id, sender, content, timestamp) VALUES (?, 'bot', ?, ?)", 
               (req.session_id, final_answer, datetime.datetime.utcnow().isoformat()))
    
    db.commit()
    db.close()
    return {"answer": final_answer, "status": final_status, "confidence": ai["confidence"]}

@app.get("/poll/{session_id}")
async def poll(session_id: str):
    """Check for new messages from the agent."""
    db = get_db()
    msgs = db.execute("SELECT sender, content, timestamp FROM messages WHERE session_id = ? AND sender = 'agent' AND is_read = 0", (session_id,)).fetchall()
    
    # Mark as read
    db.execute("UPDATE messages SET is_read = 1 WHERE session_id = ? AND sender = 'agent'", (session_id,))
    db.commit()
    db.close()
    
    return [{"sender": m[0], "content": m[1], "timestamp": m[2]} for m in msgs]

@app.post("/agent-reply")
async def agent_reply(req: ReplyRequest):
    """Simulate an agent replying to a user."""
    db = get_db()
    db.execute("INSERT INTO messages (session_id, sender, content, timestamp) VALUES (?, 'agent', ?, ?)", 
               (req.session_id, req.content, datetime.datetime.utcnow().isoformat()))
    db.execute("UPDATE sessions SET status = 'active' WHERE session_id = ?", (req.session_id,))
    db.commit()
    db.close()
    return {"status": "sent"}

@app.get("/health")
async def health():
    return {"status": "online", "features": ["Live Handover", "Polling API", "Product Knowledge"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
