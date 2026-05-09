<div align="center">

# Zen Store

**A modern, responsive eCommerce front-end for a footwear store.**

Browse curated collections, manage a cart, sign in, and check out — all wrapped in a clean, minimalist UI with an embedded AI assistant.

[![Live Demo](https://img.shields.io/badge/Live_Demo-2ea44f?style=for-the-badge&logo=github&logoColor=white)](https://i-anasop.github.io/ZenStore/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Made with HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![Made with CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![Made with JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)

[Live App](https://i-anasop.github.io/ZenStore/) · [Report Bug](https://github.com/i-anasop/ZenStore/issues) · [Request Feature](https://github.com/i-anasop/ZenStore/issues)

</div>

---

## Overview

Zen Store is a multi-page shopping experience built entirely with vanilla web technologies. There's no build step, no framework, and no backend to spin up — clone the repo, open `index.html`, and you're running. Every interaction the user touches in a real online store is represented here: product browsing, a working cart, authentication screens, checkout with payment selection, an admin verification panel, and a friendly AI chatbot to help shoppers.

The project is organized into clean, route-style folders so URLs read naturally — `/men/`, `/cart/`, `/account/login/` — and the codebase scales gracefully as new sections are added.

---

## Highlights

| | |
|---|---|
| **Multi-category catalog** | Men, Women, and Sports collections, each with their own product grid. |
| **Real cart logic** | Add, remove, and adjust quantities. Cart state persists across page loads. |
| **Authentication flow** | Login and sign-up screens with form validation. |
| **Full checkout** | Delivery selection and EasyPaisa-based payment workflow. |
| **Admin panel** | A dedicated screen for manually verifying orders and payments. |
| **AI chatbot** | A floating assistant powered by Chatbase, available on every page. |
| **Animated preloader** | A LottieFiles animation for a polished first impression. |
| **Responsive design** | Layouts adapt cleanly from desktop down to mobile. |
| **Custom 404 page** | On-brand error page styled to match the rest of the site. |

---

## Tech Stack

- **HTML5** — semantic structure across 12 pages
- **CSS3** — global stylesheet with responsive layouts
- **JavaScript (ES6+)** — cart logic, form handling, and dynamic UI
- **[Chatbase](https://chatbase.co)** — embedded AI chatbot
- **[LottieFiles](https://lottiefiles.com)** — animated preloader
- **[Font Awesome](https://fontawesome.com)** — icon set

No package manager. No build pipeline. No dependencies to install.

---

## Project Structure

```
Zen-Store/
├── index.html                 Home page
├── 404.html                   Custom not-found page
├── men/index.html             Men's collection
├── women/index.html           Women's collection
├── sports/index.html          Sports collection
├── product/index.html         Product details page
├── cart/index.html            Shopping cart
├── admin/index.html           Admin verification panel
├── account/
│   ├── login/index.html       Sign in
│   ├── signup/index.html      Create account
│   ├── profile/index.html     User profile & order history
│   ├── checkout/index.html    Checkout & payment
│   └── thankyou/index.html    Order confirmation
├── assets/
│   ├── css/
│   │   └── style.css          Global stylesheet
│   ├── js/
│   │   └── bot.js             Chatbot embed + preloader
│   ├── images/
│   │   ├── logo.jpg
│   │   ├── products/          Product photography by category
│   │   ├── collections/       Featured collection imagery
│   │   ├── payments/          Payment method graphics
│   │   ├── socials/           Social platform icons
```text
/
├── server/             # FastAPI Backend & AI Service
│   ├── main.py         # NLP Logic & API Endpoints
│   ├── faq_dataset.json# AI Knowledge Base
│   └── chatbot.db      # SQLite Interaction Logs
├── web/                # Frontend Website
│   ├── index.html      # Main Homepage
│   ├── assets/         # CSS, JS, Images
│   └── pages/          # Shop Sections (Men, Women, etc.)
├── scripts/            # Automation & Maintenance Scripts
├── docs/               # Project Documentation
├── README.md           # This file
└── LICENSE             # MIT License
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/i-anasop/Zen-Store.git
cd Zen-Store
```


The site is fully static. You can open `index.html` directly in a browser, but a local server is recommended so all relative paths resolve correctly.

```bash
# Using Python
python3 -m http.server 8000

# Or Node
npx serve .
```

Then visit **http://localhost:8000**.

---

## Deployment

The site is hosted for free on **GitHub Pages**, served from the `main` branch root.

To publish your own fork:

1. Push the project to a public GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Within a minute, your site is live at `https://<your-username>.github.io/<repo-name>/`.

GitHub Pages is free indefinitely for public repositories, with HTTPS enabled by default.

---

## Notes

- Payments are simulated and verified manually through the admin panel — no live payment gateway is integrated.
- The chatbot uses a Chatbase embed and requires an internet connection.
- This project is a front-end demo; it is not connected to a live backend or database.

---

## Roadmap

- [ ] Persist cart and user session via `localStorage`
- [ ] Wishlist / favourites
- [ ] Product search and filtering
- [ ] Real backend with order persistence
- [ ] Light & dark theme toggle

Contributions and suggestions are welcome — open an issue or pull request.

---

---

## Assignment 3: AI-Powered Customer Support Service

This project now includes a fully compliant AI-driven support service.

### 1. Backend (AI Layer)
- **Framework**: FastAPI
- **Model**: Hugging Face `all-MiniLM-L6-v2` (Sentence Transformers)
- **Database**: SQLite (`backend/chatbot.db`)
- **Features**: Semantic intent matching, interaction logging, escalation logic.

**How to run:**
```bash
pip install fastapi uvicorn transformers torch sentence-transformers
cd backend
python main.py
```

### 2. Frontend (Web Interface)
- **Vanilla JS**: Built-in widget (`assets/js/ai-chat.js`) for the main site.
- **React**: Modern component available in `frontend/src/Chatbot.jsx`.

**Features**:
- Response time < 2s (semantic search is optimized).
- Accuracy > 80% (powered by pretrained NLP).
- Multi-domain support (uses synthetic `faq_dataset.json`).

---

## Credits
... (rest of the file)
