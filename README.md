# SmartMove 🚌

Real-time bus arrival web app for Singapore, built with React + Express.js + LTA DataMall API.

---

## Prerequisites

- Node.js installed (https://nodejs.org)
- An LTA DataMall API key (free — register at https://datamall.lta.gov.sg)

---

## Setup

### 1. Get your LTA API Key
1. Go to https://datamall.lta.gov.sg
2. Click "Request for API Access"
3. Fill in the form — you'll get a key via email

### 2. Set up the Backend

```bash
cd backend
npm install
```

Open `server.js` and replace `YOUR_LTA_API_KEY_HERE` with your actual key.

Then run:
```bash
npm run dev
```

Backend runs on http://localhost:5000

### 3. Set up the Frontend

In a new terminal:

```bash
cd frontend
npm create vite@latest . -- --template react   # only needed once
npm install
npm run dev
```

Frontend runs on http://localhost:5173

---

## How It Works

1. User searches for a bus stop by name or stop code
2. Frontend calls `GET /api/stops?query=...` on the backend
3. User selects a stop → frontend calls `GET /api/arrivals?busStopCode=...`
4. Backend proxies both calls to LTA DataMall and returns cleaned data
5. Arrival times are shown in minutes with crowding info

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

## Extending This

Ideas to improve the app for SummerBuild:
- Add a map view (Google Maps or Leaflet.js) showing stop locations
- Save favourite stops to localStorage
- Show MRT disruption alerts
- Add crowding heatmap by time of day
- Mobile-first PWA with push notifications for your bus

---

## Deployment

- Frontend → Vercel (drag and drop the `frontend` folder)
- Backend → Render (free tier, connect your GitHub repo)
