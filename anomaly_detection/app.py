from flask import Flask, request, jsonify
import numpy as np
from sklearn.ensemble import IsolationForest

app = Flask(__name__)

model = IsolationForest(contamination=0.1)
model.fit(np.random.rand(100, 12))  

@app.route("/detect-anomaly", methods=["POST"])
def detect_anomaly():
    data = request.json["display"]
    prediction = model.predict([data])
    is_anomaly = prediction[0] == -1
    return jsonify({"is_anomaly": is_anomaly})

if __name__ == "__main__":
    app.run(port=5001)