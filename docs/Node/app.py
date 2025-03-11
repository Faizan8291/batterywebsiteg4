
import pickle
import sys
import json
import numpy as np

# Load the trained model
model_file = "battery_model.pkl"
with open(model_file, "rb") as file:
    model = pickle.load(file)

try:
    # Read input data from Node.js
    input_data = json.loads(sys.stdin.read())  # Read from stdin instead of sys.argv

    # Extract feature values
    current_load = float(input_data.get("Current_load", 0))
    voltage_load = float(input_data.get("Voltage_load", 0))
    capacity = float(input_data.get("Capacity", 0))

    # Prepare input for model
    input_features = np.array([[current_load, voltage_load, capacity]])

    # Make prediction
    prediction = model.predict(input_features)

    # Return correct JSON response
    print(json.dumps({"Predicted_Battery_Type": prediction[0]}))

except Exception as e:
    print(json.dumps({"error": str(e)}))  # Return error message in JSON format

# import pickle
# import sys
# import json

# # Load the pickle file
# model_file = "battery_model.pkl"  # Update with the actual path
# with open(model_file, "rb") as file:
#     model = pickle.load(file)

# # Parse input data
# input_data = json.loads(sys.argv[1])

# # Predict using the model
# prediction = model.predict([input_data])

# # Output the prediction
# print(json.dumps({"battery_type": prediction[0]}))



# import pickle
# import sys
# import json
# import numpy as np

# # Load the trained model
# model_file = "battery_model.pkl"
# with open(model_file, "rb") as file:
#     model = pickle.load(file)

# try:
#     # Read input data from Node.js
#     input_data = json.loads(sys.argv[1])  

#     # Extract feature values
#     current_load = float(input_data["Current_load"])
#     voltage_load = float(input_data["Voltage_load"])
#     capacity = float(input_data["Capacity"])

#     # Prepare input for model
#     input_features = np.array([[current_load, voltage_load, capacity]])

#     # Make prediction
#     prediction = model.predict(input_features)

#     # Print the JSON response (which will be captured by Node.js)
#     print(json.dumps({"Predicted_Battery_Type": prediction[0]}))

# except Exception as e:
#     print(json.dumps({"error": str(e)}))  # Return error message in JSON format






# import pickle
# import sys
# import json
# import numpy as np

# # Load the trained model
# model_file = "battery_model.pkl"
# with open(model_file, "rb") as file:
#     model = pickle.load(file)

# try:
#     # Read JSON input from Node.js via stdin
#     input_data = json.loads(sys.stdin.read())

#     # Extract feature values
#     current_load = float(input_data.get("Current_load", 0))
#     voltage_load = float(input_data.get("Voltage_load", 0))
#     capacity = float(input_data.get("Capacity", 0))

#     # Prepare input for model
#     input_features = np.array([[current_load, voltage_load, capacity]])

#     # Make prediction
#     prediction = model.predict(input_features)

#     # Print JSON response (Node.js will read this output)
#     print(json.dumps({"Predicted_Battery_Type": prediction[0]}))

# except Exception as e:
#     print(json.dumps({"error": str(e)}))  # Return error in JSON format





