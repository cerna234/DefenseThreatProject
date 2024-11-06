from flask import Flask, jsonify
from routes.sensor_routes import sensor_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Register the sensor routes
app.register_blueprint(sensor_bp)

#Home Route
@app.route("/", methods=['GET'])
def home():
    return jsonify({'HOME': 'HOME TEST'})

if __name__ == '__main__':
    app.run(debug=True)
