# the core statement 
Despite the rapid evolution of digital banking, a critical security gap remains: traditional systems are designed to validate transactions, not intentions. In the current landscape of sophisticated social engineering and UPI scams, victims are often manipulated into authorizing fraudulent payments themselves, making standard 2FA and OTPs obsolete. Most financial security ends at the user's phone, leaving the most vulnerable members of society—the elderly and tech-naive—isolated and unprotected during a scam attempt.

The Solution
FinGuard bridges this "Isolation Gap" by creating a real-time bridge between a vulnerable user and a trusted protector. Our platform leverages an advanced XGBoost Machine Learning engine to analyze transaction metadata and detect behavioral anomalies that suggest a user is under duress or being manipulated. Instead of just blocking the transaction, FinGuard proactively routes high-risk alerts to a registered Guardian via a dedicated Telegram Bot, enabling human intervention before the money is gone.

Key Features & USP (Unique Selling Proposition)

Behavioral AI Engine: Moves beyond static spending limits to detect "intent-based" fraud patterns.

The Guardian Circle: A unique human-in-the-loop safety net that alerts family members in real-time.

Dynamic Alerting: Personalized notifications that use the user’s actual name and risk data for maximum clarity.

Frictionless Integration: Guardians receive alerts via Telegram, requiring no extra app installations for the protector.

Technical Stack

Frontend: React.js, Tailwind CSS, and Framer Motion for a smooth, responsive, and cinematic UI/UX.

Backend: Python and FastAPI for high-performance, asynchronous API management.

Machine Learning: Scikit-learn and XGBoost for predictive risk scoring.

Cloud Infrastructure: Hosted on Vercel (Frontend) and Render (Backend) to ensure 24/7 global availability.

The Future Roadmap
Our vision is to move from a prototype to a production-ready ecosystem by integrating with the RBI Account Aggregator (AA) framework, allowing for consent-based, live bank data monitoring. We aim to scale our "Guardian Network" to include WhatsApp Business and automated voice calls, creating a comprehensive digital safety net for every Indian household.

Project Credits
Team Name: 404 Found

Lead Developer: Jayaprakash Dey

Full Stack & Research: Saswat Rout

Contact for Registration: deyjaypraksh123@gmail.com

# Technical Solution Overview
The solution provided by 404 Found is a multi-layered financial safety ecosystem designed to act as a "Digital Fire Alarm." Unlike traditional banking security that relies on static rules (like daily limits), our solution is dynamic, predictive, and social.1. The Intelligence Layer (AI-Driven Detection)At the heart of FinGuard is a custom-trained XGBoost Machine Learning model.How it works: Instead of looking at balance alone, the model analyzes transaction metadata—including velocity, merchant risk, and time-based anomalies.The Goal: It identifies "Authorized Push Payment" (APP) fraud patterns, where a user is being tricked into sending money themselves. It generates a Risk Score ($0-100$) that dictates the severity of the intervention.2. The Orchestration Layer (FastAPI & Render)The backend, built with FastAPI and hosted on Render, serves as the central nervous system.Asynchronous Processing: It receives transaction data from the frontend and simultaneously runs the ML inference while managing communication channels.Dynamic Routing: This layer retrieves the registered Guardian ID and user's name to personalize the emergency alert, ensuring the protector knows exactly who is at risk and why.3. The Intervention Layer (The Guardian Network)This is our core innovation. When a high-risk score is detected, the system bypasses the potentially manipulated user and triggers the Telegram Bot API.Real-Time Alerting: A notification is sent instantly to the Guardian’s phone.Human-in-the-loop: By providing the Guardian with a risk score and a breakdown of the "signals" (e.g., "High velocity" or "Unknown merchant"), we empower them to call the user and stop the transaction before it is finalized.4. The Experience Layer (React & Framer Motion)The frontend isn't just a dashboard; it’s a transparency tool.Clarity: Using Glassmorphism and Water-Flow animations, we make complex financial data easy to understand for non-technical users.Transparency: We explicitly map our infrastructure (Vercel/Render) so users understand where their data is being processed, building the trust necessary for a security application.Why this Solution is UniqueMost fintech solutions are "User vs. Scammer." Ours is "User + Guardian vs. Scammer." We take the isolation out of digital banking, ensuring that no user has to face a sophisticated fraudster alone.




<img width="1909" height="880" alt="Screenshot 2026-04-22 014726" src="https://github.com/user-attachments/assets/41b80c60-7794-4742-b7b9-1acc50b9338e" />
<img width="1855" height="805" alt="Screenshot 2026-04-22 014753" src="https://github.com/user-attachments/assets/3fbdb284-f925-4e26-a34f-ec5fa7715fd1" />






















# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
