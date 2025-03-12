const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

document.getElementById("predictForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const currentLoad = document.getElementById("current_load").value;
    const voltageLoad = document.getElementById("voltage_load").value;
    const capacity = document.getElementById("capacity").value;

    const inputData = {
        Current_load: parseFloat(currentLoad),
        Voltage_load: parseFloat(voltageLoad),
        Capacity: parseFloat(capacity)
    };

    try {
        const response = await fetch("https://batterywebsiteg4.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputData)
        });

        const result = await response.json();
        document.getElementById("result").innerText = result.Predicted_Battery_Type || result.error;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("result").innerText = "Failed to fetch prediction.";
    }
});


