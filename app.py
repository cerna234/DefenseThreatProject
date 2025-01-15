from flask import Flask, jsonify
from routes.sensor_routes import sensor_bp
from routes.threatAnalysis_routes import threat_bp
from routes.authentication_routes import authentication_bp
from flask_cors import CORS
import os

from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)


app = Flask(__name__)
CORS(app)
CORS(app, supports_credentials=True)
app.config['JWT_SECRET_KEY'] = 'test'  # Replace with a strong key
jwt = JWTManager(app)

# Register the sensor routes
app.register_blueprint(sensor_bp)
app.register_blueprint(threat_bp)
app.register_blueprint(authentication_bp)

#Home Route
@app.route("/", methods=['GET','POST','PUT','DELETE'])
def home():
    return jsonify({'HOME': 'HOME TEST'})

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000)) 
    app.run(host="0.0.0.0", port=port, debug=True)  