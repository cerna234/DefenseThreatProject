from flask import Flask, jsonify
from routes.sensor_routes import sensor_bp
import os

app = Flask(__name__)

# Register the sensor routes
app.register_blueprint(sensor_bp)

#Home Route
@app.route("/", methods=['GET'])
def home():
    return jsonify({'HOME': 'HOME TEST'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))  # Get the port from the environment or default to 5000
    app.run(host='0.0.0.0', port=port)

