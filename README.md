# 👟 Zen Store | AI-Powered eCommerce Experience

![Zen Store Header](https://raw.githubusercontent.com/i-anasop/ZenStore/main/assets/images/logo.jpg)

Zen Store is a premium, professional eCommerce platform integrated with a state-of-the-art **AI Customer Support Service**. Built with a focus on high-end glassmorphism UI/UX and intelligent interaction.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Zen_Store-brightgreen?style=for-the-badge&logo=github)](https://i-anasop.github.io/ZenStore/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![AI-Powered](https://img.shields.io/badge/AI-SentenceTransformers-ff69b4?style=for-the-badge&logo=huggingface)](https://huggingface.co/)

---

## ✨ Key Features

### 🤖 Intelligent AI Support
*   **Semantic Understanding**: Powered by `all-MiniLM-L6-v2` for high-accuracy intent matching.
*   **Product Aware**: The bot knows every one of the **78 products** in the catalog, including pricing and category details.
*   **Frustration Detection**: Automatically detects user frustration and offers a **Live Human Handover**.
*   **Real-time Polling**: Supports a polling-based API for seamless communication with a human agent.

### 🎨 Premium UI/UX
*   **Glassmorphism Design**: High-end frosted glass effects and floating orb animations.
*   **Responsive Layout**: Fully optimized for Desktop, Tablet, and Mobile.
*   **Dynamic States**: The chat widget updates visually based on status (AI, Waiting, or Live with Agent).

### 🏗️ Enterprise Architecture
*   **Modular JS**: Organized into `base`, `auth`, `cart`, and `ai-chat` modules.
*   **FastAPI Backend**: Asynchronous Python backend for lightning-fast AI responses.
*   **Persistent Sessions**: SQLite-backed session tracking for interaction logs and chat history.

---

## 📂 Project Structure

```text
/ (Root)
├── index.html          # Professional Homepage
├── assets/             # Global CSS, Images, and JS Modules
├── pages/              # Organized Shop Sections (Men, Women, Account, etc.)
├── core/               # THE BRAIN (Internal Project Files)
│   ├── server/         # FastAPI Backend & AI NLP Service
│   ├── scripts/        # Maintainence & Sync Tools
│   └── docs/           # Project Knowledge Base & Specs
├── README.md           # This Document
└── LICENSE             # MIT License
```

---

## 🚀 Getting Started

### 1. The Website (Frontend)
The frontend is 100% static and ready to go.
```bash
# Serve locally
python -m http.server 3000
```
Visit `http://localhost:3000` to view the store.

### 2. The AI Service (Backend)
Navigate to the `core/server` folder to launch the AI brain.
```bash
cd core/server
pip install -r requirements.txt # if available
python main.py
```
The backend runs at `localhost:8000`.

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author
**Muhammed Anas** - [GitHub](https://github.com/i-anasop)

*Zen Store — Stepping into the future of eCommerce.*
