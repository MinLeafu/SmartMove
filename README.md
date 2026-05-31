# SmartMove 🚌

Real-time bus arrival web app for Singapore, built with React + Express.js + LTA DataMall API.

---

## Prerequisites

- Node.js installed (https://nodejs.org)

---

## Setup

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on http://localhost:5000

### 2. Start the Frontend

In a new terminal:

```bash
cd frontend
npm create vite@latest . -- --template react
npm install
npm run dev
```

Frontend runs on http://localhost:5173

Open your browser and go to http://localhost:5173 — you're good to go.

---

## How It Works

1. Search for a bus stop by name or stop code
2. Select a stop from the results
3. See real-time arrival times and crowding info for each bus service

---

## Project Structure

```
smartmove/
├── backend/
│   ├── server.js        ← Express API server
│   └── package.json
└── frontend/
    └── src/
        ├── App.jsx      ← Main React component
        └── App.css      ← Styles
```

---

## Deployment

- Frontend → Vercel (connect your GitHub repo)
- Backend → Render (free tier, connect your GitHub repo)