# SmartMove 🚌

Real-time bus arrivals for Singapore. No install required.

---

## Usage

**Do not open `index.html` directly** — browsers will block the API calls.

Instead, serve it with Python (comes pre-installed on most computers):

1. Open the folder containing `index.html`
2. Click the address bar in File Explorer, type `cmd`, press Enter
3. Run:
```
python -m http.server 8000
```
4. Open **http://localhost:8000** in your browser

---

## How It Works

1. Search for a bus stop by name or stop code
2. Select a stop from the results
3. See real-time arrival times and crowding info for each bus service

---

## Deployment

Drag and drop `index.html` into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) to host it online for free. It will work once deployed to a proper `https://` domain.