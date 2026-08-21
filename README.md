# PIB Cross-Lingual Text-to-Video Synthesis Portal (Frontend)

Modern React + Vite Single Page Application for synthesizing, previewing, and reviewing Press Information Bureau (PIB) multilingual video releases.

## Features
- **Multilingual Support**: Supports 14 Indian regional languages & English.
- **AI Anchor Presenter Toggle**: Interactive PIP anchor overlay toggle.
- **Officer Review & Audit**: Inline scene preview, text & keyword regeneration, and publish simulation.
- **Real-time Connectivity Indicator**: Automatic health check status indicator.

## Tech Stack
- **Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios

## Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create `.env` based on `.env.example`:
```env
VITE_API_URL=http://localhost:5001
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
