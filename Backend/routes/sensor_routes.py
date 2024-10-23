from flask import Blueprint, jsonify,request
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId

sensor_bp = Blueprint('sensor', __name__)

#Switch to env var
mongo_uri = "mongodb+srv://defenseAdmin:Mc91089787@cluster0.mtmac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(mongo_uri)
db = client['sensorDataDb']  # Your database name

# Collections
collection = db['SensorData']  # Your collection name
statusTable = db['sensorStatus']



@sensor_bp.route('/sensor-Data', methods=['POST'])
def receive_sensor_data():
    try:
        # Get the JSON data from the request
        data = request.json
        
        # Add a timestamp to the data
        data['timestamp'] = datetime.utcnow()

        # Insert the data into MongoDB
        collection.insert_one(data)

        # Return a success response
        return jsonify({"status": "success", "message": "Data inserted successfully!"}), 201
    
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500


@sensor_bp.route('/status', methods=['GET'])
def get_sensor_status():
    try:
        # Fetch all documents from the statusTable
        data = list(statusTable.find())

        # Format the data to convert ObjectId to string
        formatted_data = []
        for doc in data:
            # Convert ObjectId to string
            doc['_id'] = str(doc['_id'])  # Convert ObjectId to string
            
            formatted_data.append(doc)
            test = str(doc['sensorStatus'])

        # Return the formatted data as JSON
        return jsonify({"sensorStatus": test}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
    


@sensor_bp.route('/startSensor/<string:id>', methods=['PUT'])
def startSensor(id):  # Include the 'id' parameter here
    try:
        # Define the update data
        update_data = {
            "sensorStatus": "on"  # Set the sensor status to 'on'
        }

        # Convert the URL parameter to ObjectId
        object_id = ObjectId(id)

        # Update the document in the database
        result = statusTable.update_one(
            {'_id': object_id},  # Query to find the document
            {'$set': update_data}  # Update operation
        )

        if result.modified_count == 0:
            return jsonify({"status": "error", "message": "No document found with that ID or no changes made."}), 404

        return jsonify({"status": "success", "message": "Sensor status set to 'on' successfully!"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500





@sensor_bp.route('/stopSensor/<string:id>', methods=['PUT'])
def stopSensor(id):  # Include the 'id' parameter here
    try:
        # Define the update data
        update_data = {
            "sensorStatus": "off"  # Set the sensor status to 'on'
        }

        # Convert the URL parameter to ObjectId
        object_id = ObjectId(id)

        # Update the document in the database
        result = statusTable.update_one(
            {'_id': object_id},  # Query to find the document
            {'$set': update_data}  # Update operation
        )

        if result.modified_count == 0:
            return jsonify({"status": "error", "message": "No document found with that ID or no changes made."}), 404

        return jsonify({"status": "success", "message": "Sensor status set to 'off' successfully!"}), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500