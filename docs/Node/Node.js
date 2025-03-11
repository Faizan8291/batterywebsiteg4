// const express = require("express");
// const bodyParser = require("body-parser");
// const { spawn } = require("child_process");

// const app = express();
// app.use(bodyParser.json());

// // Endpoint for prediction
// app.post("/predict", (req, res) => {
//     const input = req.body;

//     // Spawn a Python process
//     const python = spawn("python", ["predict_battery_type.py", JSON.stringify(input)]);

//     let result = "";

//     python.stdout.on("data", (data) => {
//         result += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//         console.error(`Error: ${data}`);
//     });

//     python.on("close", (code) => {
//         if (code !== 0) {
//             res.status(500).send("Error occurred while predicting.");
//         } else {
//             try {
//                 const prediction = JSON.parse(result);
//                 res.json(prediction);
//             } catch (error) {
//                 res.status(500).json({ error: "Invalid JSON response from Python" });
//             }
//         }
//     });
// });

// const PORT = 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });




// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { spawn } = require("child_process");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// app.post("/predict", (req, res) => {
//     const input = req.body;

//     if (!input.Current_load || !input.Voltage_load || !input.Capacity) {
//         return res.status(400).json({ error: "Missing input values" });
//     }

//     const python = spawn("python", ["app.py"]);

//     python.stdin.write(JSON.stringify(input));
//     python.stdin.end();

//     let result = "";

//     python.stdout.on("data", (data) => {
//         result += data.toString();
//     });

//     python.stderr.on("data", (data) => {
//         console.error(`Python Error: ${data}`);
//     });

//     python.on("close", (code) => {
//         if (code !== 0) {
//             res.status(500).json({ error: "Prediction error." });
//         } else {
//             try {
//                 const prediction = JSON.parse(result);
//                 res.json(prediction);
//             } catch (error) {
//                 res.status(500).json({ error: "Invalid JSON response from Python" });
//             }
//         }
//     });
// });

// const PORT = 5500;
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");  
const { spawn } = require("child_process");

const app = express();

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// Endpoint for prediction
app.post("/predict", (req, res) => {
    const input = req.body;

    // Spawn a Python process
    const python = spawn("python", ["app.py"]);

    // Send JSON input to Python script via stdin
    python.stdin.write(JSON.stringify(input));
    python.stdin.end();

    let result = "";

    python.stdout.on("data", (data) => {
        result += data.toString();
    });

    python.stderr.on("data", (data) => {
        console.error(`Error: ${data}`);
    });

    python.on("close", (code) => {
        if (code !== 0) {
            res.status(500).send({ error: "Prediction failed." });
        } else {
            try {
                const prediction = JSON.parse(result);
                res.json(prediction);
            } catch (e) {
                res.status(500).send({ error: "Invalid response from model." });
            }
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


