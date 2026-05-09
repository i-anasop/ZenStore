# Zen Store: AI-Integrated eCommerce Platform

## Overview
Zen Store is a comprehensive eCommerce solution designed for high-performance footwear retail. The platform integrates a sophisticated AI-driven customer support service with a modular frontend architecture, providing a seamless transition between automated assistance and human agent escalation.

## System Architecture

### 1. Intelligence Layer (Core Service)
The support subsystem utilizes the `all-MiniLM-L6-v2` Sentence-Transformer model for semantic intent classification.
*   **Knowledge Base**: Synchronized with a 78-item product catalog for accurate SKU-level inquiries.
*   **Sentiment Analysis**: Monitors user interaction patterns to facilitate automated escalation to human agents.
*   **Polling Protocol**: Implements a real-time API polling mechanism for live chat synchronization.

### 2. Frontend Infrastructure
Developed using vanilla web technologies (HTML5, CSS3, JavaScript ES6) to ensure maximum compatibility and performance.
*   **UI/UX**: Implements a modern design system with responsive layouts and dynamic UI state management.
*   **Modular Components**: Encapsulated logic for authentication, cart management, and real-time chat widgets.

### 3. Backend API
A FastAPI-based Python service orchestrates the AI logic and data persistence.
*   **Persistence**: SQLite-backed session management for interaction logging and state retention.
*   **Security**: Implementation of auth-ready logic for user and administrative access.

---

## Directory Structure

```text
/
├── index.html          | Primary entry point for the web application
├── assets/             | Compiled resources (CSS, JS, Static Assets)
├── pages/              | Application routing and view modules
│   ├── account/        | User authentication and profile management
│   ├── admin/          | Administrative dashboard and order verification
│   └── errors/         | Standardized error handling views
└── core/               | Internal system components
    ├── server/         | Python FastAPI source and NLP models
    ├── scripts/        | Maintenance and data synchronization utilities
    └── docs/           | System specifications and knowledge datasets
```

---

## Deployment and Installation

### Prerequisites
*   Python 3.8 or higher
*   Modern web browser (Chromium-based recommended)

### Backend Configuration
1. Navigate to the server directory:
   ```bash
   cd core/server
   ```
2. Install dependencies:
   ```bash
   pip install fastapi uvicorn sentence-transformers torch
   ```
3. Execute the service:
   ```bash
   python main.py
   ```

### Frontend Execution
The application is served as a static distribution. For local development, utilize a standard HTTP server:
```bash
python -m http.server 3000
```

---

## Technical Specifications
*   **NLP Model**: Sentence-Transformers (all-MiniLM-L6-v2)
*   **API Framework**: FastAPI v0.100+
*   **Database**: SQLite 3.0
*   **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Custom Design System)

## Authorship
Muhammed Anas - [GitHub Profile](https://github.com/i-anasop)

## License
Licensed under the MIT License. Refer to the LICENSE file for full legal text.
