// document.getElementById("predictForm").addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const currentLoad = parseFloat(document.getElementById("current_load").value);
//     const voltageLoad = parseFloat(document.getElementById("voltage_load").value);
//     const capacity = parseFloat(document.getElementById("capacity").value);

//     const data = {
//         current_load: currentLoad,
//         voltage_load: voltageLoad,
//         capacity: capacity,
//     };

//     try {
//         const response = await fetch("http://localhost:5000/predict", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(data),
//         });

//         const result = await response.json();
//         document.getElementById("result").innerText = `Predicted Battery Type: ${result.battery_type}`;
//     } catch (error) {
//         console.error("Error:", error);
//         document.getElementById("result").innerText = "Error occurred while predicting.";
//     }
// });



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
        const response = await fetch("http://localhost:5000/predict", {
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
