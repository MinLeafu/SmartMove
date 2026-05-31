const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

const LTA_API_KEY = "YOUR_LTA_API_KEY_HERE"; // Get from https://datamall.lta.gov.sg

app.use(cors());
app.use(express.json());

// GET /api/arrivals?busStopCode=83139
app.get("/api/arrivals", async (req, res) => {
  const { busStopCode } = req.query;

  if (!busStopCode) {
    return res.status(400).json({ error: "busStopCode is required" });
  }

  try {
    const response = await axios.get(
      "https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival",
      {
        params: { BusStopCode: busStopCode },
        headers: { AccountKey: LTA_API_KEY },
      }
    );

    const services = response.data.Services.map((svc) => ({
      serviceNo: svc.ServiceNo,
      operator: svc.Operator,
      nextBus: {
        estimatedArrival: svc.NextBus.EstimatedArrival,
        load: svc.NextBus.Load, // SEA = seats available, SDA = standing, LSD = limited
        type: svc.NextBus.Type,
      },
      nextBus2: {
        estimatedArrival: svc.NextBus2.EstimatedArrival,
        load: svc.NextBus2.Load,
      },
    }));

    res.json({ busStopCode, services });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch bus arrivals" });
  }
});

// GET /api/stops?query=tampines
app.get("/api/stops", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      "https://datamall2.mytransport.sg/ltaodataservice/BusStops",
      {
        params: { $skip: 0 },
        headers: { AccountKey: LTA_API_KEY },
      }
    );

    const allStops = response.data.value;
    const filtered = query
      ? allStops.filter(
          (s) =>
            s.Description.toLowerCase().includes(query.toLowerCase()) ||
            s.BusStopCode.includes(query)
        )
      : allStops.slice(0, 20);

    res.json(filtered);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to fetch bus stops" });
  }
});

app.listen(PORT, () => {
  console.log(`SmartMove backend running on http://localhost:${PORT}`);
});
