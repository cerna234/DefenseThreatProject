from flask import Blueprint, jsonify

# Create a Blueprint for sensor-related routes
sensor_bp = Blueprint('sensor', __name__)

@sensor_bp.route('/status', methods=['GET'])
def get_sensor_status():
    return jsonify({'status': 'Sensor is active'}), 200

@sensor_bp.route('/startSensor',methods=['GET'])
def startSensor():
    return jsonify({'STATUS' : 'SENSOR STARTED'} )