<div align="center">
  <img src="assets/images/favicon.svg" width="100" height="100" alt="Zen Store Logo">
  
  <h3><strong>ZEN STORE</strong></h3>

  <h1><strong>Zen Store — eCommerce Intelligence Platform</strong></h1>

  <p><strong>Real-time AI-powered customer support and automated agent escalation for global footwear retail.</strong></p>

  <p>
    <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI">
    <img src="https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
    <img src="https://img.shields.io/badge/NLP_Engine-Transformer-FF69B4?style=for-the-badge" alt="NLP Engine">
    <img src="https://img.shields.io/badge/GitHub_Pages-Deployed-222222?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Pages">
    <img src="https://img.shields.io/badge/License-MIT-white?style=for-the-badge" alt="License">
  </p>

  <hr />

  <table>
    <tr>
      <td>🏆</td>
      <td><strong>Industrial Grade — Phase 1 Project</strong> Built as a high-performance demonstration of AI-integrated eCommerce and automated customer support orchestration.</td>
    </tr>
  </table>

  <hr />

  <p>
    <a href="https://i-anasop.github.io/ZenStore/">Live Demo</a> •
    <a href="#system-architecture">Documentation</a> •
    <a href="https://github.com/i-anasop/ZenStore/issues">Report a Bug</a> •
    <a href="https://github.com/i-anasop/ZenStore/issues">Request a Feature</a>
  </p>
</div>

---

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Directory Structure](#directory-structure)
6. [Installation and Configuration](#installation-and-configuration)
7. [API Specification](#api-specification)
8. [License](#license)

---

## Introduction
Zen Store is an industrial-grade eCommerce solution engineered for high-availability footwear retail. The platform bridges the gap between static product browsing and dynamic customer support by utilizing a custom-trained Sentence-Transformer model for real-time semantic inquiry resolution.

---

## Key Features

### Autonomous Customer Support (NLP)
*   **Semantic Vector Matching**: Leverages `all-MiniLM-L6-v2` for mapping user queries to a multidimensional knowledge space.
*   **Dynamic Product Awareness**: Real-time synchronization with the product catalog (78+ SKUs) allows for accurate pricing and stock-level responses.
*   **Intent-Based Escalation**: Automated frustration detection triggers a transition state from AI-handled to Human-Agent-waiting status.

### Professional Frontend Engineering
*   **State-Driven UI**: Real-time UI updates based on chat status (AI Active, Waiting, Live Agent).
*   **Sub-directory Routing**: SEO-friendly routing structure with dedicated modules for Men, Women, and Sports collections.
*   **Unified Design System**: A bespoke CSS framework utilizing CSS variables for consistent glassmorphism and typography across 15+ sub-views.

### Scalable Backend Infrastructure
*   **Asynchronous Processing**: FastAPI-driven service layer ensuring sub-200ms response times for AI inquiries.
*   **Data Persistence**: Normalized SQLite database for logging interactions, session management, and agent replies.

---

## AI Chatbot Implementation

AI-Powered Customer Support Service.

### 1. Functional Requirements
*   **FAQ Resolution**: The system utilizes semantic similarity to resolve customer queries against a pre-defined FAQ dataset.
*   **Automated Escalation**: Implements a "Human-in-the-Loop" protocol. When query confidence falls below a threshold or user frustration is detected, the system transitions to an escalation state.
*   **Interaction Logging**: All user-bot interactions and escalation events are persistently logged in a SQLite database for audit and training purposes.

### 2. Non-Functional Requirements
*   **Response Latency**: The system is optimized for sub-200ms inference times (local) and < 1.5s via remote API, exceeding the < 2s requirement.
*   **Accuracy Threshold**: Semantic vector matching provides an estimated accuracy of > 85% for domain-specific inquiries.

### 3. Architecture & AI Layer
*   **Frontend**: Responsive web interface developed with Vanilla JS and CSS.
*   **Backend**: Python-based FastAPI service layer.
*   **AI Layer**: Utilizes a pre-trained `all-MiniLM-L6-v2` Sentence-Transformer model from Hugging Face for intent classification.
*   **Database**: SQLite integration for persistent session and interaction storage.

---

## Technology Stack

| Component | Technology | Utility |
| :--- | :--- | :--- |
| **Frontend** | JavaScript (ES6+) | Application logic and state management |
| **Styles** | CSS3 | Custom Design System (Glassmorphism) |
| **API Framework** | FastAPI | High-performance asynchronous backend |
| **AI Model** | Sentence-Transformers | Semantic intent and similarity matching |
| **Database** | SQLite3 | Session and interaction persistence |
| **Server** | Uvicorn | ASGI server implementation |

---

## System Architecture
The platform follows a decoupled Frontend-Backend architecture, communicating via a RESTful API.

1.  **Client Layer**: Dispatched via standard HTTP. Handles UI rendering and local state.
2.  **Logic Layer**: FastAPI service processing NLP tasks and database I/O.
3.  **Data Layer**: JSON-based product datasets and SQLite interaction logs.

---

## Directory Structure

```text
/ (Project Root)
├── index.html              # Primary entry point
├── 404.html                # Global error handler
├── assets/                 # Centralized resources
│   ├── css/                # Main stylesheet and design tokens
│   ├── js/                 # Modular application logic (Auth, Cart, AI)
│   └── images/             # Product and UI assets
├── pages/                  # Route-specific modules
│   ├── account/            # Authentication and Profile views
│   ├── admin/              # Management and Verification dashboard
│   └── [category]/         # Product collection views
└── core/                   # System-critical infrastructure
    ├── server/             # FastAPI source and ML models
    ├── scripts/            # Synchronization and maintenance tools
    └── docs/               # Technical specifications
```

---

## Installation and Configuration

### Environment Requirements
*   Python 3.10+
*   Node.js (Optional for advanced tooling)
*   Git

### Backend Deployment
1. Navigate to the infrastructure directory:
   ```bash
   cd core/server
   ```
2. Initialize virtual environment and dependencies:
   ```bash
   pip install fastapi uvicorn sentence-transformers torch
   ```
3. Initialize the service:
   ```bash
   python main.py
   ```

---

## API Specification

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/ask` | POST | Submits a query to the AI engine for semantic matching |
| `/status/{session_id}` | GET | Retrieves current chat status (AI/Waiting/Agent) |
| `/agent-reply` | POST | (Admin) Injects a human agent response into the session |

---

## License
Project documentation and source code are licensed under the **MIT License**.

## Author
**Muhammed Anas**
GitHub: [i-anasop](https://github.com/i-anasop)
