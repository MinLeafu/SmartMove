import { useState } from "react";
import "./App.css";

const LOAD_LABEL = {
  SEA: { text: "Seats available", color: "#2e7d32" },
  SDA: { text: "Standing", color: "#e65100" },
  LSD: { text: "Limited standing", color: "#b71c1c" },
  "": { text: "—", color: "#888" },
};

function getMinutes(isoString) {
  if (!isoString) return null;
  const diff = (new Date(isoString) - new Date()) / 1000 / 60;
  if (diff < 0) return "Arr";
  return `${Math.round(diff)} min`;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [stops, setStops] = useState([]);
  const [selectedStop, setSelectedStop] = useState(null);
  const [arrivals, setArrivals] = useState([]);
  const [loadingStops, setLoadingStops] = useState(false);
  const [loadingArrivals, setLoadingArrivals] = useState(false);
  const [error, setError] = useState("");

  async function searchStops() {
    if (!query.trim()) return;
    setLoadingStops(true);
    setError("");
    setStops([]);
    setSelectedStop(null);
    setArrivals([]);
    try {
      const res = await fetch(
        `http://localhost:5000/api/stops?query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setStops(data);
    } catch (e) {
      setError("Could not fetch bus stops. Is the backend running?");
    } finally {
      setLoadingStops(false);
    }
  }

  async function fetchArrivals(stop) {
    setSelectedStop(stop);
    setArrivals([]);
    setLoadingArrivals(true);
    setError("");
    try {
      const res = await fetch(
        `http://localhost:5000/api/arrivals?busStopCode=${stop.BusStopCode}`
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setArrivals(data.services);
    } catch (e) {
      setError("Could not fetch arrivals. Check your LTA API key.");
    } finally {
      setLoadingArrivals(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🚌 SmartMove</h1>
        <p>Real-time bus arrivals for Singapore</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search bus stop (e.g. Tampines, 83139)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchStops()}
        />
        <button onClick={searchStops} disabled={loadingStops}>
          {loadingStops ? "Searching..." : "Search"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {stops.length > 0 && !selectedStop && (
        <div className="stop-list">
          <h2>Select a stop</h2>
          {stops.map((stop) => (
            <div
              key={stop.BusStopCode}
              className="stop-card"
              onClick={() => fetchArrivals(stop)}
            >
              <span className="stop-code">{stop.BusStopCode}</span>
              <span className="stop-name">{stop.Description}</span>
              <span className="stop-road">{stop.RoadName}</span>
            </div>
          ))}
        </div>
      )}

      {selectedStop && (
        <div className="arrivals-section">
          <button className="back-btn" onClick={() => { setSelectedStop(null); setArrivals([]); }}>
            ← Back
          </button>
          <h2>{selectedStop.Description}</h2>
          <p className="stop-meta">{selectedStop.RoadName} · Stop {selectedStop.BusStopCode}</p>

          {loadingArrivals && <p className="loading">Fetching arrivals...</p>}

          {arrivals.length > 0 && (
            <table className="arrivals-table">
              <thead>
                <tr>
                  <th>Bus</th>
                  <th>Next</th>
                  <th>Following</th>
                  <th>Load</th>
                </tr>
              </thead>
              <tbody>
                {arrivals.map((svc) => (
                  <tr key={svc.serviceNo}>
                    <td className="bus-no">{svc.serviceNo}</td>
                    <td>{getMinutes(svc.nextBus.estimatedArrival)}</td>
                    <td>{getMinutes(svc.nextBus2.estimatedArrival)}</td>
                    <td>
                      <span
                        className="load-badge"
                        style={{ color: LOAD_LABEL[svc.nextBus.load]?.color }}
                      >
                        {LOAD_LABEL[svc.nextBus.load]?.text}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loadingArrivals && arrivals.length === 0 && (
            <p className="empty">No services found for this stop.</p>
          )}
        </div>
      )}
    </div>
  );
}
