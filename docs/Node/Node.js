const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch"); // Add this
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// API Route to Forward Requests to Python Backend
app.post("/predict", async (req, res) => {
    try {
        console.log("Received request:", req.body);

        const response = await fetch("https://batterywebsiteg4-python.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        console.log("Python backend response:", data);
        res.json(data);
    } catch (error) {
        console.error("Error calling Python backend:", error);
        res.status(500).json({ error: "Failed to get prediction." });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
